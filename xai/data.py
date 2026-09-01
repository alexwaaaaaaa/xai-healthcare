"""Loading, encoding, splitting and preprocessing.

Imported by notebooks 01-05 and by the API, so the transform applied at
inference time is byte-for-byte the one fitted during training.
"""

from __future__ import annotations

import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.impute import KNNImputer, SimpleImputer
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

from .schema import PROCESSED, RAW, Dataset, get

RANDOM_STATE = 42
TEST_SIZE = 0.2


def load_raw(slug: str) -> tuple[pd.DataFrame, pd.Series]:
    """Read `data/raw/{slug}.csv` and apply the dataset's documented cleaning:
    string encoding, zero-as-missing conversion, leakage column drops.

    Returns features (original units, missing values still NaN) and the target.
    """
    ds = get(slug)
    df = pd.read_csv(RAW / f"{slug}.csv")

    y = df["target"].astype(int)
    X = df.drop(columns=["target"])

    for col, mapping in ds.string_encodings.items():
        # The raw CKD file contains '\tno' / '\tyes' — strip before mapping.
        X[col] = X[col].astype(str).str.strip().str.lower().map(mapping)

    for col in ds.zero_as_missing:
        X[col] = X[col].replace(0, np.nan)

    # Values outside a feature's declared plausible range are treated as missing.
    #
    # The declared [lo, hi] is already the range the API validates against, so
    # using it here too means one number governs both "what a caller may send" and
    # "what we are willing to learn from" — a validator that rejects a value the
    # model trained on, or a model that trains on a value the validator rejects,
    # is incoherent either way.
    #
    # This is the same judgement applied to the Pima sentinel zeros, generalised:
    # a diastolic blood pressure of 24 mm Hg, a serum sodium of 4.5 mEq/L and an
    # FEV1 of 86 L are data-entry errors, not patients. Notebook 02 reports every
    # value this rule touches, so a genuinely real out-of-range value shows up as
    # a range to widen rather than being silently destroyed.
    for feature in ds.features:
        outside = (X[feature.name] < feature.lo) | (X[feature.name] > feature.hi)
        X.loc[outside.fillna(False), feature.name] = np.nan

    if ds.drop_columns:
        X = X.drop(columns=list(ds.drop_columns))

    # Enforce schema order so column index == SHAP index everywhere.
    X = X[ds.feature_names].astype(float)
    return X, y


def split(X: pd.DataFrame, y: pd.Series):
    """Stratified 80:20 split. Stratified because most of the datasets are
    imbalanced (cervical cancer is 6.4% positive), and an unstratified split can
    leave the test set with a materially different prevalence than training."""
    return train_test_split(
        X, y, test_size=TEST_SIZE, random_state=RANDOM_STATE, stratify=y
    )


def build_preprocessor(ds: Dataset) -> Pipeline:
    """Impute then scale. Scaling matters for Logistic Regression convergence and
    for LIME's neighbourhood sampling; the trees are indifferent to it, but using
    one shared transform keeps a single SHAP feature space for all three models."""
    imputer = (
        KNNImputer(n_neighbors=5)
        if ds.imputer == "knn"
        else SimpleImputer(strategy="median")
    )
    return Pipeline(
        [
            (
                "columns",
                ColumnTransformer(
                    [("all", imputer, ds.feature_names)],
                    remainder="drop",
                    verbose_feature_names_out=False,
                ),
            ),
            ("scale", StandardScaler()),
        ]
    )


def prepare(slug: str):
    """Full path from raw CSV to fitted preprocessor plus scaled splits."""
    ds = get(slug)
    X, y = load_raw(slug)
    X_train, X_test, y_train, y_test = split(X, y)

    pre = build_preprocessor(ds).fit(X_train)
    to_df = lambda A, idx: pd.DataFrame(A, columns=ds.feature_names, index=idx)  # noqa: E731
    return {
        "dataset": ds,
        "pre": pre,
        "X_train_raw": X_train,
        "X_test_raw": X_test,
        "X_train": to_df(pre.transform(X_train), X_train.index),
        "X_test": to_df(pre.transform(X_test), X_test.index),
        "y_train": y_train,
        "y_test": y_test,
    }


def save_processed(slug: str, bundle: dict) -> list[str]:
    PROCESSED.mkdir(parents=True, exist_ok=True)
    written = []
    for name in ("X_train", "X_test"):
        frame = bundle[name].copy()
        frame["target"] = bundle["y_train" if name == "X_train" else "y_test"]
        path = PROCESSED / f"{slug}_{name.lower()}.csv"
        frame.to_csv(path, index=False)
        written.append(path.name)
    # Unscaled test features are kept too: the notebooks and the UI report values
    # in clinical units, not z-scores.
    bundle["X_test_raw"].to_csv(PROCESSED / f"{slug}_x_test_raw.csv", index=False)
    written.append(f"{slug}_x_test_raw.csv")
    return written
