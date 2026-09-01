"""SHAP and LIME wrappers plus the plain-English rendering of attributions.

The whole project turns on the last part: a SHAP vector is not an explanation
until somebody who is not a data scientist can read it. `top_factors` is the
function that does that translation, and it is shared by notebook 04/05 and by
the API so the report and the UI say the same thing.
"""

from __future__ import annotations

import numpy as np
import pandas as pd

from .schema import Dataset, display_value


class ShapExplainer:
    """Normalises SHAP output to one positive-class attribution vector.

    Needed because the three model families disagree on output shape: XGBoost's
    TreeExplainer returns (n, features), scikit-learn's RandomForest returns
    (n, features, n_classes), and LinearExplainer returns (n, features).
    """

    def __init__(self, model, X_train: pd.DataFrame, kind: str):
        import shap

        self.kind = kind
        self.feature_names = list(X_train.columns)
        if kind == "logistic_regression":
            self.explainer = shap.LinearExplainer(model, X_train.values)
        else:
            self.explainer = shap.TreeExplainer(model)

    def values(self, X: pd.DataFrame | np.ndarray) -> np.ndarray:
        """(n_samples, n_features) contributions toward the positive class."""
        A = np.asarray(X, dtype=float)
        raw = self.explainer.shap_values(A, check_additivity=False) if self.kind != (
            "logistic_regression"
        ) else self.explainer.shap_values(A)
        if isinstance(raw, list):  # older shap: [class0, class1]
            raw = raw[1] if len(raw) > 1 else raw[0]
        raw = np.asarray(raw)
        if raw.ndim == 3:  # (n, features, classes)
            raw = raw[:, :, 1] if raw.shape[2] > 1 else raw[:, :, 0]
        return raw.reshape(len(A), len(self.feature_names))

    @property
    def base_value(self) -> float:
        ev = self.explainer.expected_value
        ev = np.asarray(ev).ravel()
        return float(ev[1] if ev.size > 1 else ev[0])


def build_lime(X_train: pd.DataFrame, ds: Dataset):
    """LIME operates on the same scaled space the models were trained on."""
    from lime.lime_tabular import LimeTabularExplainer

    return LimeTabularExplainer(
        training_data=X_train.values,
        feature_names=list(X_train.columns),
        class_names=[ds.negative_label, ds.positive_label],
        mode="classification",
        discretize_continuous=True,
        random_state=42,
    )


def lime_weights(explainer, x_scaled: np.ndarray, predict_proba, n: int = 8):
    """[(feature_name, weight)] toward the positive class, largest first."""
    exp = explainer.explain_instance(
        np.asarray(x_scaled, dtype=float).ravel(),
        predict_proba,
        num_features=n,
        labels=(1,),
    )
    names = explainer.feature_names
    return [(names[i], float(w)) for i, w in exp.as_map()[1]]


# ---------------------------------------------------------------------------
# plain English
# ---------------------------------------------------------------------------

def _level(ds: Dataset, name: str, value: float) -> str:
    """Rough position of a value inside its plausible clinical range."""
    f = ds.feature(name)
    if f.choices:
        return ""
    span = f.hi - f.lo
    if span <= 0:
        return ""
    pos = (float(value) - f.lo) / span
    if pos >= 0.66:
        return "high"
    if pos <= 0.33:
        return "low"
    return "mid-range"


def top_factors(
    ds: Dataset,
    shap_row: np.ndarray,
    patient: dict[str, float],
    k: int = 3,
) -> list[dict]:
    """The k strongest drivers of this single prediction, as readable sentences."""
    order = np.argsort(np.abs(np.asarray(shap_row)))[::-1][:k]
    out = []
    for idx in order:
        name = ds.feature_names[int(idx)]
        contribution = float(shap_row[int(idx)])
        value = patient[name]
        toward = ds.positive_label if contribution > 0 else ds.negative_label
        level = _level(ds, name, value)
        shown = display_value(ds, name, value)
        qualifier = f" ({level} for this range)" if level else ""
        out.append(
            {
                "feature": name,
                "label": ds.feature(name).label,
                "value": float(value),
                "value_display": shown,
                "shap_value": contribution,
                "direction": "increases" if contribution > 0 else "decreases",
                "level": level,
                "sentence": (
                    f"{ds.feature(name).label} of {shown}{qualifier} pushed this "
                    f"prediction toward \u201c{toward}\u201d."
                ),
            }
        )
    return out


def summarise(ds: Dataset, probability: float, factors: list[dict]) -> str:
    """One-paragraph summary a clinician can read in about five seconds."""
    band = "high" if probability >= 0.66 else "moderate" if probability >= 0.33 else "low"
    lead = (
        f"The model estimates a {band} likelihood of \u201c{ds.positive_label}\u201d "
        f"({probability * 100:.0f}%)."
    )
    if not factors:
        return lead
    drivers = ", ".join(
        f"{f['label']} ({f['value_display']})"
        for f in factors
        if f["direction"] == "increases"
    )
    against = ", ".join(
        f"{f['label']} ({f['value_display']})"
        for f in factors
        if f["direction"] == "decreases"
    )
    parts = [lead]
    if drivers:
        parts.append(f"Raising the estimate: {drivers}.")
    if against:
        parts.append(f"Lowering it: {against}.")
    return " ".join(parts)
