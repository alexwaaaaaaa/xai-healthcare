# Explainable AI for Healthcare Diagnosis using Machine Learning

Minor project — **MDS-391**, Department of Computer Engineering, Jamia Millia Islamia.

Three classifiers (Logistic Regression, Random Forest, XGBoost) trained across four
real clinical cohorts, where every prediction is returned with a SHAP attribution, a
LIME local surrogate and a plain-English summary. The explanations are then
**measured** — for fidelity, stability and comprehensibility — rather than assumed to
be good because they render as a chart.

```
┌──────────────────┐    artefacts     ┌──────────────┐    REST     ┌──────────────┐
│  notebooks/ 01-05│ ───────────────▶ │  api/ FastAPI│ ──────────▶ │ web/ Next.js │
│  Jupyter research│  models/*.pkl    │  loads once  │   JSON      │  dashboard   │
│                  │  results/*.json  │  at startup  │             │              │
└──────────────────┘                  └──────────────┘             └──────────────┘
                            ▲
                   xai/ — shared package imported by both,
                   so training and inference cannot disagree
```

---

## Results

Selected model per dataset, scored once on a held-out stratified 20% split.
`Baseline` is the accuracy of always predicting the majority class.

**Cardiometabolic and renal**

| Dataset | n | Selected model | AUC-ROC | F1 | Recall | Baseline |
|---|---|---|---|---|---|---|
| Heart Disease (Cleveland) | 303 | Logistic Regression | **0.958** | 0.867 | 0.929 | 0.541 |
| Heart Failure Clinical Records | 299 | Random Forest | **0.789** | 0.529 | 0.474 | 0.683 |
| Pima Indians Diabetes | 768 | Random Forest | **0.818** | 0.694 | 0.778 | 0.649 |
| Chronic Kidney Disease | 400 | Random Forest | **1.000** | 1.000 | 1.000 | 0.625 |

**Oncology**

| Dataset | n | Selected model | AUC-ROC | F1 | Recall | Baseline |
|---|---|---|---|---|---|---|
| Breast Cancer Wisconsin (Diagnostic) | 569 | Logistic Regression | **0.996** | 0.964 | 0.952 | 0.632 |
| Breast Cancer Recurrence (Ljubljana) | 286 | Random Forest | **0.666** | 0.519 | 0.412 | 0.707 |
| Breast Cancer Surgical Survival (Haberman) | 306 | Random Forest | **0.594** | 0.200 | 0.188 | 0.742 |
| Cervical Cancer (Risk Factors) | 858 | Logistic Regression | **0.631** | 0.133 | 0.273 | 0.936 |
| Lung Cancer Thoracic Surgery | 470 | Logistic Regression | **0.621** | 0.276 | 0.571 | 0.851 |

Selection is on test AUC-ROC with a documented tie-break: within 0.01 AUC, the
simpler model wins — which is why heart disease and breast-cancer diagnosis both
ship Logistic Regression despite an ensemble edging them by 0.001.

### Three of the five cancer models largely fail, and that is reported

This is the most important result in the project and it is a negative one.

- **Cervical cancer**: Random Forest and XGBoost reach **0.94 and 0.92 accuracy
  with recall of exactly 0.000** — they answer "no cancer" for every patient and
  find none of the 11 cancers in the test split. Their accuracy is *identical to
  the majority baseline*: the model is the baseline wearing 600 decision trees.
  Logistic Regression, selected here, manages recall 0.27.
- **Lung cancer surgery**: same collapse. Random Forest returns recall 0.000 at
  0.84 accuracy, which is **below** the 0.851 baseline — worse than a constant
  predictor on the very metric it appears to win on.
- **Breast cancer surgical survival**: 0.59 AUC from three features. There is not
  enough signal in age, operation year and node count, and no hyperparameter
  search invents any.

These cohorts are kept because a portfolio of only separable datasets would
misrepresent how clinical prediction actually behaves.

### Explanation quality

| Dataset | Fidelity | Stability (vs random) | Clinical top-3 | SHAP ≈ LIME |
|---|---|---|---|---|
| Heart Disease | 2.40× | 0.571 vs −0.027 | 84.7% | 80.8% |
| Heart Failure | 2.44× | 0.338 vs 0.105 | 85.0% | 68.8% |
| Diabetes | 2.22× | 0.623 vs 0.013 | 98.9% | 87.2% |
| Chronic Kidney Disease | 3.21× | 0.667 vs 0.013 | 79.6% | 48.8% |
| Breast Cancer (Diagnostic) | 3.82× | 0.761 vs 0.039 | 59.6% | 68.8% |
| Breast Cancer Recurrence | 1.86× | 0.515 vs 0.044 | 91.4% | 72.0% |
| Breast Cancer Survival | 1.29× | 0.708 vs 0.292 | 66.7% | 60.0% |
| Cervical Cancer | **4.43×** | **0.813** vs 0.077 | 73.8% | **4.8%** |
| Lung Cancer Surgery | 2.74× | 0.646 vs −0.002 | 84.4% | 43.2% |

- **Fidelity** — removing the features SHAP ranked highest moves the prediction
  this many times more than removing the same number of random features. Above 1
  means the ranking carries real information.
- **Stability** — cosine similarity between the SHAP vectors of each patient and
  its 5 nearest neighbours, against a random-pair control.
- **Clinical top-3** — share of each patient's top-3 factors appearing on a
  literature-derived risk-factor list fixed *before* the scores were computed.
- **SHAP ≈ LIME** — mean top-5 feature overlap between the two methods.

SHAP's additivity guarantee is verified per model in notebook 04: contributions
reconstruct the model output to within 8.9e-16.

### The most important row in that table is a trap

**Cervical cancer has the highest fidelity (4.43×) and the highest stability
(0.81) in the entire project — and an F1 of 0.13.** By the explanation-quality
metrics alone it is the best work here. Clinically it is close to useless.

The numbers are not in conflict:

- **Fidelity measures loyalty to the model, not to medicine.** A model leaning
  hard on two features loses a lot of output when you ablate them, which scores as
  high fidelity. It says the explanation is an honest account of the model's
  reasoning; it says nothing about whether that reasoning is any good.
- **A nearly-constant model is extremely stable.** When a classifier is close to
  predicting one class for everyone, neighbouring patients trivially get
  near-identical attributions.

Its **SHAP/LIME overlap of 0.048** is the tell: the two methods essentially never
name the same features, so the explanation is method-dependent and should not be
put in front of a clinician. Read against 0.87 on the diabetes model, the contrast
is unmistakable. **Had this project reported only fidelity and stability, as a good
deal of applied XAI work does, cervical cancer would have looked like its
strongest result.**

### Calibration: three models return a ranking score, not a risk

Class weighting was tuned as a hyperparameter and the search chose it on the
imbalanced cohorts. That improves recall and quietly breaks the meaning of the
output number, scaling probabilities toward 50% instead of toward true prevalence.

| Dataset | Prevalence | Mean predicted p | Inflation | Readable as risk |
|---|---|---|---|---|
| Cervical Cancer | 6.4% | 44.3% | **6.9×** | no |
| Lung Cancer Surgery | 14.9% | 48.9% | **3.3×** | no |
| Breast Cancer Survival | 25.8% | 39.2% | 1.5× | no |
| *the other six* | — | — | 0.95–1.20× | yes |

The API returns this beside every prediction and the dashboard renders a caution
banner when `calibrated` is false, because "37% likelihood of cervical cancer" read
as an absolute risk is a clinically misleading statement. It is **not** fixed by
Platt scaling: the cervical cohort has 55 positives in total, so a calibration fold
would hold about 11 events, and a calibration curve fitted on 11 events trades a
visible problem for an invisible one.

---

> **Full operating guide: [RUNBOOK.md](RUNBOOK.md)** — every command, all nine
> datasets in detail, troubleshooting for every error we actually hit, how to add a
> tenth dataset, and a demo script.

## Quick start

### Docker (full stack, one command)

Requires the artefacts to exist — the API refuses to start without them rather than
serving fabricated numbers. Run the pipeline once, then:

```bash
docker compose up --build
```

- Dashboard → <http://localhost:3000>
- API → <http://localhost:8000>, interactive docs at <http://localhost:8000/docs>

Compose waits for the API's health check (which asserts all 27 models and 27
explainers actually loaded) before starting the dashboard.

### Local development

```bash
# 1. environment
python3.11 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# 2. data — four real cohorts, row counts verified against published figures
python scripts/download_data.py            # --force to re-download

# 3. research pipeline — builds notebooks/*.ipynb from notebooks/src/*.py and runs them
python scripts/build_notebooks.py --execute
#   ...or one at a time:
python scripts/build_notebooks.py --execute --only 03_model_training

# 4. API
uvicorn api.app.main:app --reload --port 8000

# 5. dashboard
cd web && npm install && npm run dev
```

Step 3 takes roughly 40 minutes end to end, about 27 of them in the grid searches in
notebook 03 (27 models).

---

## Verification (Reticle)

The dashboard carries a dev-only verification layer ([Reticle](https://docs.reticle.sh))
so behaviour can be checked by driving the real app and reading program truth —
network calls, store state, signals, console — rather than by eyeballing
screenshots.

```bash
cd web && npm run dev      # the SDK connects only in development
npx @reticlehq/server status
```

Instrumentation lives in two files:

- `web/src/lib/reticle-dev.ts` — a subscribable `predictFlow` store mirroring what
  the predict flow believes (step, model, pending, probability, risk band, factor
  counts, last error), plus the domain signals `predict:submitted`,
  `predict:explained`, `predict:rejected`, `predict:blocked` and `predict:step`.
- `web/src/app/reticle-dev.tsx` — connects, registers the store, and advertises
  the testable surface (16 testids, 5 signals, 2 flows).

Everything is behind `process.env.NODE_ENV === "development"`, which is statically
false in a production build: there are **zero** Reticle references in the
production client bundle, and `@reticlehq/*` are devDependencies only.

### Verdicts on record

| Flow | Verdict | Evidence |
|---|---|---|
| Step 1 → 2 advance | **pass** (signal grade) | `predictFlow.step` 0→1, `stepLabel` → "Vitals & examination", `predict:step` fired |
| Step 2 → 3 advance | **pass** (state grade) | `step` 1→2, `stepLabel` → "Laboratory results", clean console |
| Select accessible names | **pass** | `combobox "Sex"` resolves after the fix (was `name: ""`) |
| Predict & explain (heart disease) | 8/8 predicates pass, verdict **contradicted** | `POST /predict` ×1 → 200 with `shap_values` + `lime_explanation`, `predict:explained`, panels visible, clean console. See the caveat below. |
| UI matches API response | 8/8 predicates pass | store `probability` = `0.6553942734702953`, gauge settled at "66%", summary and top-factor sentence identical to the response body |
| Out-of-range blocked | **pass** (signal grade, clean) | `predict:blocked {fields:["chol"]}` with **zero** POST requests, range message shown, `hasResult` false |
| **Breast cancer 30-feature form** | **pass** (signal grade, clean) | `stepLabel` → "Nucleus morphology — variability"; submit returns `shapFeatureCount: 30`, Benign at p=0.048, waterfall and LIME panels visible |
| **Cervical calibration warning** | **pass** (signal grade, clean) | `shapFeatureCount: 28`; caution banner renders with "6.9×" and "6.4%" |
| **Model switch re-predicts** | **pass** (signal grade) | `predict:model_switched {rerunning:true}` → 1 POST → `predict:explained`; probability moves 0.3883 → 0.3999 (XGBoost's own value) in 173 ms |
| **Model switch with no result** | **pass** (signal grade, clean) | `rerunning:false`, **zero** POST requests — no spurious call before first submit |
| **Negative control: no false warning** | 5/5 predicates pass | on the recurrence model (inflation 1.05×) the caution is **absent**, proving the banner is conditional on measured inflation rather than always rendered |

**Two defects Reticle caught that a headless screenshot pass had missed:**

1. **Every `<Select>` had an empty accessible name.** A `<label for>` does not name a
   Radix trigger, because `<label>` only names form-associated elements and the
   trigger is a `<button>`. All four comboboxes announced as a bare "combobox".
   Fixed with explicit `aria-label` in `predict-flow.tsx`.
2. **A blocked submit was unobservable.** Reticle returned `already_true` rather
   than a pass, correctly refusing to credit the click for a validation message
   that blur had already rendered. That is why `predict:blocked` now exists — the
   block is provable, including the fact that it fires **no** network request.

**Caveat on the predict verdict.** All eight predicates pass with evidence, but
Reticle reports `contradicted` via a `write-field-ignored` heuristic: it compares
request `patient_features` keys against same-named `shap_values` keys in the
response and reads "asked `age: 54`, got `age: 0.0000418`" as a half-applied
write. `POST /predict` computes rather than persists, and `shap_values` is a
per-feature attribution map, so a different value is the entire point. Reported
upstream via `reticle_feedback`; recorded here rather than presented as a green.

---

## Repository layout

```
xai-healthcare/
├── scripts/
│   ├── download_data.py        # fetches + verifies the nine cohorts
│   └── build_notebooks.py      # .py sources -> executed .ipynb
├── xai/                        # shared package: notebooks AND api import this
│   ├── schema.py               # single source of truth: datasets, features, ranges
│   ├── cancer.py               # the five oncology cohort specs (length, not magic)
│   ├── data.py                 # load, encode, split, preprocess
│   └── explain.py              # SHAP/LIME wrappers + plain-English rendering
├── notebooks/
│   ├── src/*.py                # percent-format sources (this is what you review)
│   └── *.ipynb                 # executed artefacts (this is what you submit)
├── api/app/                    # FastAPI: main, schemas, store
├── web/src/                    # Next.js App Router dashboard
├── data/{raw,processed}/       # downloaded and preprocessed CSVs
├── models/                     # 27 models + 27 SHAP explainers + 9 preprocessors
└── results/                    # metrics JSON + ~25 figures
```

### Why notebooks are generated from `.py`

Notebook JSON is unreviewable in a diff. The percent-format files in
`notebooks/src/` are the editable source; `build_notebooks.py --execute` converts and
runs them, which also guarantees every notebook is reproducible top-to-bottom rather
than being a record of cells run out of order.

---

## The notebooks

| Notebook | What it establishes |
|---|---|
| `01_eda` | Class balance, missingness, correlation structure, per-feature distributions. Quantifies the heart-failure leakage column. |
| `02_preprocessing` | Imputation strategy per dataset with justification, encoding, scaling, stratified 80:20 split. |
| `03_model_training` | 27 models via 5-fold cross-validated grid search; hyperparameters and metrics recorded. |
| `04_explainability` | SHAP global summaries and dependence plots, LIME on five representative patients per dataset, additivity verification. |
| `05_evaluation` | Full metrics, ROC/PR curves, confusion matrices, calibration, plus the three explanation-quality metrics. |

### Findings worth reading the notebooks for

**A leakage column that improved every metric.** The heart-failure dataset ships
`time` — days of follow-up. Training on it lifts AUC from 0.795 to 0.893 and it
becomes the single most important feature. It is also useless: patients who died
early were, by construction, observed for less time. The model learned the study's
censoring pattern, and its explanation ("this patient was observed for 30 days")
cannot inform a decision at admission because the follow-up duration does not exist
yet. **Accuracy metrics did not merely miss this, they rewarded it.** Only the
feature ranking exposed it. That asymmetry is the argument for this whole project.

**Hidden missingness in the Pima dataset.** The raw file reports zero nulls, yet
`Insulin` is 0 in 374 of 768 rows and `BMI` is 0 in 11 — sentinel values for
unrecorded measurements. Taken literally, they understate mean serum insulin by 76
mu U/mL and train the model on physiologically impossible patients. Converted to NaN
before imputation.

**Non-random missingness in the CKD dataset.** Red-cell morphology is absent in 38%
of records, missing precisely because a clinician chose not to order the test. Median
imputation would fill 152 rows with one identical value; KNN (k=5) is used instead.

**The Cleveland model partly reads the diagnosis.** Its top features are the
thallium scan and vessel count, which are close to the outcome's own definition
(angiographic narrowing). A screening tool would need those columns withheld — a
limitation that only surfaced from the feature ranking.

**A file silently corrupted by Excel.** The UCI-hosted Ljubljana breast-cancer
copy has had numeric ranges converted into dates: `tumor-size` contains `'14-Oct'`
where the value is `10-14`, and `inv-nodes` contains `'5-Mar'` for `3-5`. Six such
values are repaired in `download_data.py`, which raises if it meets an unrepaired
one. Left alone, an ordinal encoder ranks the mangled strings and trains on
nonsense — and nothing downstream would ever complain.

**Four columns dropped from the cervical dataset, for four different reasons.**
The file ships *four* outcome columns recorded at the same visit (Hinselmann,
Schiller, Citology, Biopsy). Biopsy is the histological gold standard and is used
as the target; the other three are alternative measurements of the same event, so
keeping them is textbook leakage. Two more columns are 91.7% missing (787 of 858
rows — imputing that does not recover a variable, it fabricates one) and two are
provably constant, carrying zero variance and zero information.

**A lung with an 86-litre FEV1.** The thoracic-surgery dataset records FEV1 values
between 52 and 86 litres in 14 rows; a human FEV1 does not exceed about 6. These
are treated as missing and imputed, exactly as the Pima sentinel zeros are, via a
general `implausible_above` mechanism rather than a one-off patch.

**Opaque column names are relabelled from the source publication.** The
thoracic-surgery file ships `PRE4`, `PRE9`, `DGN`. An explanation that names
"PRE9" is a riddle; the same explanation naming "dyspnoea before surgery" is
clinically actionable. The mapping comes from Zieba et al. (2013).

---

## API

| Endpoint | Purpose |
|---|---|
| `GET /health` | Status plus how many models and explainers actually loaded |
| `GET /datasets` | All nine datasets with the full feature schema that drives the form |
| `GET /datasets/{dataset}` | One dataset |
| `GET /models/{dataset}` | The three models with held-out metrics and tuned hyperparameters |
| `POST /predict` | Prediction + SHAP values + LIME weights + top factors + summary |
| `GET /evaluation/{dataset}/{model}` | ROC/PR curves, confusion matrix, and (for the selected model) the quality scores |
| `GET /explainability` | Quality metrics and global importance for all nine datasets |
| `GET /explainability/{dataset}/cases` | The five representative patients from notebook 04 |

```bash
curl -X POST localhost:8000/predict -H 'content-type: application/json' -d '{
  "dataset": "heart_disease", "model": "logistic_regression",
  "patient_features": {"age":63,"sex":1,"cp":4,"trestbps":150,"chol":300,"fbs":1,
    "restecg":2,"thalach":110,"exang":1,"oldpeak":3.2,"slope":3,"ca":3,"thal":7}}'
```

All 27 models, 27 SHAP explainers and 9 LIME explainers load once in the FastAPI
lifespan handler. Incoming features are validated against the exact ranges the model was
trained on, and an implausible value gets a specific 422:

```
age (Age) = 500.0 years is outside the plausible range 20-100 years
the model was trained on
```

That matters more than it looks. Without it the model returns a confident
probability and SHAP a perfectly coherent explanation for a patient who cannot
exist.

---

## Dashboard

| Route | Contents |
|---|---|
| `/` | Project overview, the nine cohorts grouped as cards, aggregate quality summary |
| `/predict/[dataset]` | Multi-step form (demographics → history → vitals → labs), animated probability gauge, SHAP waterfall, LIME bars, plain-English top-3 |
| `/models/[dataset]` | Model comparison table, ROC overlay, confusion matrices with clinical labelling |
| `/explainability` | Fidelity, stability and comprehensibility framed for a non-technical reader |
| `/about` | The research gap, the decisions that cost a metric, data provenance |

Server components fetch from the API; client components are limited to the form and
the charts. The data pages render at request time rather than at build time — the web
image is built before the API container exists, so a build-time prerender would bake
an "API unreachable" page into static HTML. Fetches are still cached for 300s at the
data layer. Every chart carries an `aria-label` summarising its data — a bar chart is
invisible to a screen reader, and this is a healthcare tool. TypeScript strict mode,
no `any`.

The form's zod schema is generated from the API's own feature metadata rather than a
second hard-coded copy of the bounds, so the client cannot accept what the server
would reject.

---

## Reproducibility

- `random_state=42` throughout; `StratifiedKFold(n_splits=5, shuffle=True)`.
- Dependencies pinned in `requirements.txt` and `web/package-lock.json`.
- `download_data.py` asserts each row count against the published figure and exits
  non-zero on a mismatch rather than continuing with unexpected data.
- Imputers and scalers are fitted on the training split only and persisted, so the
  transform applied at inference is the one fitted during training.
- The API imports the same `xai` package the notebooks used. There is no
  reimplementation of preprocessing on the serving side.

### Data sources

All nine are downloaded programmatically; nothing is synthetic or hand-entered.

| Dataset | Source | Citation |
|---|---|---|
| Heart Disease (Cleveland) | [UCI 45](https://archive.ics.uci.edu/dataset/45/heart+disease) | Janosi, Steinbrunn, Pfisterer & Detrano (1989) |
| Heart Failure Clinical Records | [UCI 519](https://archive.ics.uci.edu/dataset/519) | Chicco & Jurman, *BMC Med Inform Decis Mak* 20:16 (2020) |
| Pima Indians Diabetes | [Kaggle `uciml/pima-indians-diabetes-database`](https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database) | Smith, Everhart, Dickson, Knowler & Johannes (1988) |
| Chronic Kidney Disease | [UCI 336](https://archive.ics.uci.edu/dataset/336) | Rubini, Soundarapandian & Eswaran (2015) |
| Breast Cancer Wisconsin (Diagnostic) | [UCI 17](https://archive.ics.uci.edu/dataset/17) | Wolberg, Street & Mangasarian (1995) |
| Breast Cancer Recurrence (Ljubljana) | [UCI 14](https://archive.ics.uci.edu/dataset/14) | Zwitter & Soklic (1988), Institute of Oncology Ljubljana |
| Breast Cancer Surgical Survival | [UCI 43](https://archive.ics.uci.edu/dataset/43) | Haberman (1976) |
| Cervical Cancer (Risk Factors) | [UCI 383](https://archive.ics.uci.edu/dataset/383) | Fernandes, Cardoso & Fernandes (2017) |
| Lung Cancer Thoracic Surgery | [UCI 277](https://archive.ics.uci.edu/dataset/277) | Zieba, Tomczak, Lubicz & Swiatek (2013) |

**Two cancer datasets were considered and rejected**, recorded so the omission
reads as a decision rather than an oversight. UCI 62 ("Lung Cancer") has 32
patients against 56 features across three classes — any model fits noise. UCI 83
("Primary Tumor") has 21 tumour-site classes, several with a single case, and this
pipeline is binary throughout.

The Pima loader tries `kagglehub` first. Kaggle now requires authentication even for
public datasets, so without credentials it falls back to an identical UCI-origin
mirror of the same 768 records and **logs the substitution loudly**. Set
`KAGGLE_USERNAME` / `KAGGLE_KEY` to use the Kaggle path.

---

## Limitations and safety

**Not a medical device. Not for clinical use.**

- Small, retrospective, single-centre cohorts from the 1950s–2010s. No prospective
  validation.
- The CKD and breast-cancer-diagnosis cohorts are close to linearly separable; a
  near-perfect test score on 80–114 patients describes an easy task, not a superior
  model.
- **Three of the five oncology models are near chance** (cervical 0.63, lung 0.62,
  Haberman 0.59 AUC), and on two of them the tree ensembles collapse to predicting
  the majority class with recall 0.000. Reported, not hidden.
- **Three models return probabilities inflated 1.5–6.9× above true prevalence**
  because class weighting was tuned in. Those numbers are ranking scores, not
  absolute risks, and the API and dashboard both say so.
- The explanations are **faithful to the model**, which is a materially weaker
  claim than **clinically correct** — as the cervical row demonstrates concretely,
  a faithful and stable explanation of a nearly-useless model is still faithful and
  stable.
- Where a feature was imputed, part of its attribution reflects our imputation
  choice rather than the patient.
- Heart-failure recall is 0.47 at the default 0.5 threshold — it misses over half
  the deaths. Notebook 05 tabulates the threshold trade-off; the API returns a
  probability rather than a hard label so the choice stays with the clinician.
- Two cervical STI columns and one lung comorbidity column have a single positive
  case in the whole cohort, so any SHAP attribution to them is noise.

**The API is unauthenticated and has no rate limiting.** That is acceptable for a
local academic demonstrator serving public research data and holding no patient
records. Do not expose it to a public network without adding authentication,
authorisation and rate limiting first.

---

## Licence

Academic coursework. The nine datasets remain under their own licences; cite the
original publications above when reusing any of them.
