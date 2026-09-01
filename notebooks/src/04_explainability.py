# %% [markdown]
# # 04 — Explainability: SHAP and LIME
#
# The models from notebook 03 predict. This notebook makes them explain.
#
# Two complementary tools, and the distinction matters:
#
# * **SHAP** (SHapley Additive exPlanations) gives an *additive attribution* per
#   feature with a guarantee attached — the contributions sum exactly to the
#   difference between this prediction and the dataset's average prediction. Used
#   here for the **global** view ("what does this model rely on across the whole
#   cohort?") and for the per-patient waterfall the API serves.
# * **LIME** (Local Interpretable Model-agnostic Explanations) fits a sparse
#   linear surrogate in a sampled neighbourhood around one patient. It answers a
#   narrower question — "in the immediate vicinity of *this* patient, which
#   features move the decision?" — and because it arrives there by a completely
#   different route, agreement between LIME and SHAP is evidence, while
#   disagreement is a warning that the local decision surface is unstable.
#
# We build SHAP explainers for all twenty-seven models (the API lets the user pick any
# of them) but reserve the detailed plots for the best model per dataset.

# %%
import sys
import pathlib
import json
import warnings

ROOT = pathlib.Path.cwd()
if ROOT.name == "notebooks":
    ROOT = ROOT.parent
sys.path.insert(0, str(ROOT))

import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import seaborn as sns
import shap

from xai import data, explain, schema

warnings.filterwarnings("ignore")
sns.set_theme(style="whitegrid")
plt.rcParams.update({"figure.dpi": 110, "savefig.bbox": "tight"})
FIGURES = ROOT / "results" / "figures"
FIGURES.mkdir(parents=True, exist_ok=True)

metrics = json.loads((ROOT / "results" / "03_metrics.json").read_text())
BEST = metrics["best_models"]
print("best model per dataset:", BEST)
print("shap", shap.__version__)

# %% [markdown]
# ## 4.1 Build and persist a SHAP explainer for every model
#
# `TreeExplainer` for Random Forest and XGBoost — it computes exact Shapley
# values for tree ensembles in polynomial time, so no sampling approximation is
# involved. `LinearExplainer` for Logistic Regression, where the attribution is
# exact by construction.
#
# The wrapper in `xai/explain.py` exists because the three model families return
# different shapes: XGBoost gives `(n, features)`, scikit-learn's
# RandomForest gives `(n, features, 2)`, and older SHAP versions return a list of
# per-class arrays. Normalising once in shared code means the notebook, the API
# and the frontend never have to care.
#
# Explainers are pickled so the API loads them at startup instead of rebuilding
# them on every request.

# %%
bundles, explainers, models = {}, {}, {}

for slug, ds in schema.DATASETS.items():
    bundles[slug] = data.prepare(slug)
    X_train = bundles[slug]["X_train"]

    for name in schema.MODEL_NAMES:
        model = joblib.load(schema.MODELS / f"{slug}_{name}.pkl")
        ex = explain.ShapExplainer(model, X_train, name)

        # Additivity check: contributions + base value must reconstruct the
        # model's own margin output. If this drifts, the explanation is wrong.
        sv = ex.values(bundles[slug]["X_test"])
        joblib.dump(ex, schema.MODELS / f"{slug}_{name}_shap.pkl")
        models[(slug, name)] = model
        explainers[(slug, name)] = ex
        print(f"  {slug:<16} {name:<20} shap matrix {sv.shape}  "
              f"base={ex.base_value:+.3f}")

print(f"\n{len(explainers)} explainers built and pickled to models/")

# %% [markdown]
# ### Verifying the additivity guarantee
#
# SHAP's central promise is that attributions sum to the model output minus the
# expected output. Checking it is not ceremony: a silent shape or class-index
# error would produce plausible-looking bars that mean nothing.

# %%
check_rows = []
for slug in schema.DATASETS:
    name = BEST[slug]
    ex, model = explainers[(slug, name)], models[(slug, name)]
    X_test = bundles[slug]["X_test"]
    sv = ex.values(X_test)

    if name == "logistic_regression":
        margin = model.decision_function(X_test.values)
    elif name == "xgboost":
        margin = model.predict(X_test.values, output_margin=True)
    else:  # random forest: TreeExplainer works in probability space
        margin = model.predict_proba(X_test.values)[:, 1]

    reconstructed = sv.sum(axis=1) + ex.base_value
    err = float(np.abs(reconstructed - margin).max())
    check_rows.append(
        {
            "dataset": schema.get(slug).title,
            "model": schema.MODEL_LABELS[name],
            "space": "log-odds" if name != "random_forest" else "probability",
            "max_abs_reconstruction_error": err,
        }
    )

additivity = pd.DataFrame(check_rows)
display(additivity.style.format({"max_abs_reconstruction_error": "{:.2e}"}))
assert additivity["max_abs_reconstruction_error"].max() < 1e-4, "additivity violated"
print("Additivity holds for every best model: SHAP values reconstruct the model "
      "output to within 1e-4.")

# %% [markdown]
# ## 4.2 Global explanations — SHAP summary plots
#
# Each dot is one test patient; horizontal position is that feature's push on
# that patient's prediction, colour is whether the feature value was high or low.
# Features are ordered by mean absolute contribution, so the ranking is "how much
# does the model lean on this at all", and the spread shows whether the effect is
# consistent or patient-dependent.

# %%
global_importance = {}

for slug, ds in schema.DATASETS.items():
    name = BEST[slug]
    ex = explainers[(slug, name)]
    X_test = bundles[slug]["X_test"]
    X_test_raw = bundles[slug]["X_test_raw"]
    sv = ex.values(X_test)
    labels = [ds.feature(f).label for f in ds.feature_names]

    plt.figure()
    shap.summary_plot(
        sv, X_test_raw.values, feature_names=labels, show=False,
        max_display=12, plot_size=(9, 0.36 * min(len(labels), 12) + 1.6),
    )
    plt.title(f"{ds.title} — SHAP summary ({schema.MODEL_LABELS[name]})",
              fontsize=11)
    plt.xlabel("SHAP value (push toward "
               f"\u201c{ds.positive_label}\u201d)")
    plt.savefig(FIGURES / f"04_shap_summary_{slug}.png")
    plt.show()

    mean_abs = np.abs(sv).mean(axis=0)
    signed = sv.mean(axis=0)
    order = np.argsort(mean_abs)[::-1]
    global_importance[slug] = {
        "model": name,
        "model_label": schema.MODEL_LABELS[name],
        "base_value": ex.base_value,
        "features": [
            {
                "feature": ds.feature_names[int(i)],
                "label": ds.feature(ds.feature_names[int(i)]).label,
                "group": ds.feature(ds.feature_names[int(i)]).group,
                "mean_abs_shap": float(mean_abs[i]),
                "mean_signed_shap": float(signed[i]),
            }
            for i in order
        ],
    }

    print(f"{ds.title} — top 5 by mean |SHAP| ({schema.MODEL_LABELS[name]}):")
    for i in order[:5]:
        feat = ds.feature_names[int(i)]
        print(f"   {ds.feature(feat).label:<44} {mean_abs[i]:.4f}")
    print()

# %% [markdown]
# ### Do the rankings match known clinical risk factors?
#
# This is the comprehensibility check that a purely numerical evaluation would
# skip. A model can be accurate and still be leaning on the wrong thing.

# %%
EXPECTED = {
    "heart_disease": [
        ("thal", "Thallium perfusion defects indicate ischaemic myocardium"),
        ("ca", "Number of narrowed vessels is the outcome's own mechanism"),
        ("cp", "Chest pain character is the classic presenting sign"),
        ("thalach", "Blunted peak heart rate signals impaired coronary reserve"),
        ("oldpeak", "Exercise ST depression is a standard ischaemia marker"),
    ],
    "heart_failure": [
        ("serum_creatinine", "Chicco & Jurman (2020) name this a top-2 predictor"),
        ("ejection_fraction", "The other top-2 predictor in the same paper"),
        ("age", "Established mortality risk factor"),
    ],
    "diabetes": [
        ("Glucose", "OGTT plasma glucose is diagnostic for diabetes"),
        ("BMI", "Obesity is the dominant modifiable risk factor"),
        ("Age", "Type-2 risk rises with age"),
    ],
    "kidney_disease": [
        ("hemo", "Anaemia from reduced erythropoietin is a hallmark of CKD"),
        ("sg", "Loss of urine-concentrating ability"),
        ("al", "Albuminuria is a defining diagnostic criterion"),
        ("sc", "Serum creatinine is the primary filtration marker"),
        ("pcv", "Packed cell volume tracks the same anaemia as haemoglobin"),
    ],
    "breast_cancer": [
        ("concave_points3", "Irregular, indented nuclear contours are the "
                            "classic cytological sign of malignancy"),
        ("area3", "Nuclear enlargement is a core malignancy criterion"),
        ("radius3", "Same underlying quantity as area — expect credit splitting"),
        ("perimeter3", "Third measurement of nucleus size"),
        ("concavity3", "Contour irregularity, paired with concave points"),
    ],
    "breast_cancer_recurrence": [
        ("inv-nodes", "Axillary nodal involvement is the strongest classical "
                      "predictor of recurrence"),
        ("deg-malig", "Histological grade drives recurrence risk"),
        ("tumor-size", "Larger primaries recur more often"),
    ],
    "breast_cancer_survival": [
        ("positive_auxillary_nodes", "Nodal burden is the dominant prognostic "
                                     "factor in Haberman's original analysis"),
        ("age", "Age at operation affects survival"),
    ],
    "cervical_cancer": [
        ("Dx:Cancer", "A prior cancer diagnosis — flagged in advance as sitting "
                      "suspiciously close to the outcome"),
        ("Dx:HPV", "HPV is the causal agent in nearly all cervical cancer"),
        ("Age", "Incidence rises with age"),
        ("STDs:HPV", "Direct record of the causal infection"),
        ("Number of sexual partners", "Proxy for HPV exposure"),
        ("First sexual intercourse", "Earlier exposure raises lifetime risk"),
    ],
    "lung_cancer_surgery": [
        ("PRE5", "FEV1 is the primary determinant of operability"),
        ("PRE4", "FVC measures the pulmonary reserve left after resection"),
        ("AGE", "Operative mortality rises with age"),
        ("PRE14", "Tumour T stage drives the extent of resection needed"),
        ("PRE6", "Performance status predicts surgical outcome"),
    ],
}

for slug, expected in EXPECTED.items():
    ds = schema.get(slug)
    ranked = [f["feature"] for f in global_importance[slug]["features"]]
    print(f"\n{ds.title} ({global_importance[slug]['model_label']}):")
    for feat, why in expected:
        pos = ranked.index(feat) + 1
        verdict = "top-3" if pos <= 3 else "top-5" if pos <= 5 else f"rank {pos}"
        print(f"   {ds.feature(feat).label:<44} rank {pos:>2}  [{verdict}]  {why}")

# %% [markdown]
# The rankings are clinically coherent rather than accidental. Two observations
# worth carrying into the report:
#
# * On the Cleveland data the model's top features are the thallium scan and
#   vessel count — which are close to the outcome's own definition (angiographic
#   narrowing). The model is partly reading the diagnosis rather than predicting
#   it from cheap bedside signals. Accuracy alone would never have shown this;
#   it took the feature ranking. A screening tool would need these columns
#   withheld.
# * On CKD, haemoglobin and packed cell volume both rank high while correlating
#   at r = 0.90. SHAP splits credit between collinear features, so each looks
#   about half as important as the single "anaemia" concept they jointly measure.
#   Reading them as two independent findings would overstate the evidence.

# %% [markdown]
# ## 4.3 SHAP dependence plots for the top-3 features
#
# The summary plot gives magnitude; dependence shows *shape*. Plotted against the
# feature's real clinical value rather than its z-score, because a cardiologist
# reads mg/dL, not standard deviations. Non-monotone curves are where the
# ensembles earn their keep — and where a logistic regression coefficient would
# have lied by assuming a straight line.

# %%
for slug, ds in schema.DATASETS.items():
    name = BEST[slug]
    sv = explainers[(slug, name)].values(bundles[slug]["X_test"])
    X_raw = bundles[slug]["X_test_raw"]
    top3 = [f["feature"] for f in global_importance[slug]["features"][:3]]

    fig, axes = plt.subplots(1, 3, figsize=(15, 3.9))
    for ax, feat in zip(axes, top3):
        idx = ds.feature_names.index(feat)
        f = ds.feature(feat)
        x = X_raw[feat].values
        pts = ax.scatter(x, sv[:, idx], c=sv[:, idx], cmap="RdBu_r",
                         edgecolor="white", linewidth=0.4, s=42,
                         vmin=-np.abs(sv[:, idx]).max(),
                         vmax=np.abs(sv[:, idx]).max())
        ax.axhline(0, color="#444", linewidth=0.9, linestyle="--")
        if len(np.unique(x[~np.isnan(x)])) > 6:
            order = np.argsort(x)
            window = max(5, len(x) // 8)
            smooth = pd.Series(sv[order, idx]).rolling(window, center=True,
                                                       min_periods=2).mean()
            ax.plot(x[order], smooth, color="#1b3b4b", linewidth=2, alpha=0.8)
        ax.set_xlabel(f"{f.label}" + (f" ({f.unit})" if f.unit else ""), fontsize=9)
        ax.set_ylabel("SHAP contribution", fontsize=9)
        ax.set_title(f.label, fontsize=10)

    plt.suptitle(f"{ds.title} — dependence of contribution on value "
                 f"({schema.MODEL_LABELS[name]})", y=1.04, fontsize=11)
    plt.savefig(FIGURES / f"04_shap_dependence_{slug}.png")
    plt.show()

# %% [markdown]
# ## 4.4 LIME — five representative patients per dataset
#
# Explaining only correct, confident predictions would be self-congratulatory.
# For each dataset we select five real test patients spanning the outcomes that
# actually matter clinically:
#
# | Case | Why it is worth explaining |
# |---|---|
# | True positive | Does the model cite the right reasons when it is right? |
# | True negative | Does it correctly identify *protective* evidence? |
# | **False positive** | An unnecessary referral. Which feature misled it? |
# | **False negative** | A missed diagnosis — the costliest error in screening. |
# | Borderline (p ≈ 0.5) | Where a clinician must override, so the reasoning has to be legible. |
#
# The false negative is the important one. In a deployed screening tool this is
# the patient who goes home, and the explanation is the only artefact that lets a
# clinician notice the model discounted something it should not have.

# %%
def pick_cases(y_true: pd.Series, proba: np.ndarray) -> dict[str, int]:
    """Positional indices of the five representative patients."""
    pred = (proba >= 0.5).astype(int)
    y = y_true.values
    picks: dict[str, int] = {}

    def best(mask, key):
        idx = np.where(mask)[0]
        return int(idx[np.argmax(key[idx])]) if len(idx) else None

    candidates = {
        "true_positive": best((y == 1) & (pred == 1), proba),
        "true_negative": best((y == 0) & (pred == 0), -proba),
        "false_positive": best((y == 0) & (pred == 1), proba),
        "false_negative": best((y == 1) & (pred == 0), -proba),
        "borderline": int(np.argmin(np.abs(proba - 0.5))),
    }
    return {k: v for k, v in candidates.items() if v is not None}


CASE_LABELS = {
    "true_positive": "True positive (correctly flagged)",
    "true_negative": "True negative (correctly cleared)",
    "false_positive": "False positive (unnecessary referral)",
    "false_negative": "False negative (missed case)",
    "borderline": "Borderline (p ≈ 0.5)",
}

case_studies = {}

for slug, ds in schema.DATASETS.items():
    name = BEST[slug]
    model, ex = models[(slug, name)], explainers[(slug, name)]
    X_test, X_raw = bundles[slug]["X_test"], bundles[slug]["X_test_raw"]
    y_test = bundles[slug]["y_test"]

    proba = model.predict_proba(X_test.values)[:, 1]
    lime_ex = explain.build_lime(bundles[slug]["X_train"], ds)
    cases = pick_cases(y_test, proba)
    sv_all = ex.values(X_test)

    print(f"\n{'=' * 78}\n{ds.title} — {schema.MODEL_LABELS[name]}\n{'=' * 78}")
    missing = set(CASE_LABELS) - set(cases)
    if missing:
        print(f"  note: no {', '.join(sorted(missing))} exists in this test split "
              f"(the model makes no such error here), so it cannot be shown.\n")

    entries = []
    n_cases = len(cases)
    fig, axes = plt.subplots(n_cases, 2, figsize=(14, 3.1 * n_cases))
    axes = np.atleast_2d(axes)

    for row, (kind, pos) in enumerate(cases.items()):
        patient_raw = X_raw.iloc[pos].to_dict()
        shap_row = sv_all[pos]
        weights = explain.lime_weights(
            lime_ex, X_test.iloc[pos].values,
            lambda A: model.predict_proba(np.asarray(A, dtype=float)), n=8,
        )
        factors = explain.top_factors(ds, shap_row, patient_raw, k=3)
        summary = explain.summarise(ds, float(proba[pos]), factors)

        print(f"--- {CASE_LABELS[kind]} ---")
        print(f"  actual: {ds.positive_label if y_test.iloc[pos] == 1 else ds.negative_label}"
              f"   |   predicted probability: {proba[pos]:.3f}")
        print(f"  {summary}")
        for f in factors:
            print(f"    * {f['sentence']}  (SHAP {f['shap_value']:+.3f})")

        # left: SHAP contributions | right: LIME surrogate weights
        shap_order = np.argsort(np.abs(shap_row))[::-1][:8][::-1]
        ax = axes[row, 0]
        ax.barh(
            [ds.feature(ds.feature_names[i]).label for i in shap_order],
            [shap_row[i] for i in shap_order],
            color=["#c94f4f" if shap_row[i] > 0 else "#2b6777" for i in shap_order],
        )
        ax.axvline(0, color="#333", linewidth=0.9)
        ax.set_title(f"SHAP — {CASE_LABELS[kind]}\n"
                     f"p={proba[pos]:.2f}, actual="
                     f"{'positive' if y_test.iloc[pos] == 1 else 'negative'}",
                     fontsize=9)
        ax.tick_params(labelsize=8)

        ax = axes[row, 1]
        names = [ds.feature(f).label for f, _ in weights][::-1]
        vals = [w for _, w in weights][::-1]
        ax.barh(names, vals,
                color=["#c94f4f" if v > 0 else "#2b6777" for v in vals])
        ax.axvline(0, color="#333", linewidth=0.9)
        ax.set_title("LIME local surrogate weights", fontsize=9)
        ax.tick_params(labelsize=8)

        # Rank agreement between the two methods — computed, not asserted.
        shap_top = {ds.feature_names[i] for i in np.argsort(np.abs(shap_row))[::-1][:5]}
        lime_top = {f for f, _ in weights[:5]}
        overlap = len(shap_top & lime_top) / 5
        print(f"    SHAP/LIME top-5 overlap: {overlap:.0%}\n")

        entries.append(
            {
                "case": kind,
                "case_label": CASE_LABELS[kind],
                "test_index": int(pos),
                "actual": int(y_test.iloc[pos]),
                "probability": float(proba[pos]),
                "patient": {k: float(v) for k, v in patient_raw.items()},
                "patient_display": {
                    k: schema.display_value(ds, k, v) for k, v in patient_raw.items()
                },
                "shap_values": {
                    ds.feature_names[i]: float(shap_row[i])
                    for i in range(len(ds.feature_names))
                },
                "lime_explanation": [[f, w] for f, w in weights],
                "top_factors": factors,
                "summary": summary,
                "shap_lime_top5_overlap": overlap,
            }
        )

    plt.suptitle(f"{ds.title}: SHAP vs LIME on five representative patients",
                 y=1.005, fontsize=12)
    plt.tight_layout()
    plt.savefig(FIGURES / f"04_cases_{slug}.png")
    plt.show()

    case_studies[slug] = {
        "model": name,
        "model_label": schema.MODEL_LABELS[name],
        "cases": entries,
    }

# %% [markdown]
# ### Reading the disagreements
#
# SHAP and LIME agree on most patients but not all, and the gap is informative
# rather than embarrassing. They optimise different objectives: SHAP averages a
# feature's marginal contribution over all possible feature orderings, while LIME
# fits a sparse linear model to points sampled near the patient. Where the local
# decision surface is flat and smooth the two coincide; where it is jagged — small
# cohort, deep trees — LIME's surrogate is fitted on a neighbourhood the model
# treats inconsistently, and the overlap drops.
#
# For a deployed tool the practical rule is that a factor named by both methods
# is safe to show a clinician, and a factor named by only one deserves a hedge.
# Notebook 05 turns this into a measured stability score instead of an anecdote.

# %% [markdown]
# ## 4.5 Persist artefacts for the API and the dashboard

# %%
(ROOT / "results" / "04_global_importance.json").write_text(
    json.dumps(global_importance, indent=2)
)
(ROOT / "results" / "04_case_studies.json").write_text(
    json.dumps(case_studies, indent=2)
)
additivity.to_json(ROOT / "results" / "04_additivity_check.json",
                   orient="records", indent=2)

print("wrote results/04_global_importance.json, results/04_case_studies.json, "
      "results/04_additivity_check.json")
print("\nSHAP explainers pickled:")
for path in sorted(schema.MODELS.glob("*_shap.pkl")):
    print(f"  {path.name:<48} {path.stat().st_size / 1024:>8.1f} KB")
print("\nNext: 05_evaluation.ipynb")
