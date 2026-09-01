# RUNBOOK — Explainable AI for Healthcare Diagnosis

Complete operating guide. Every command here was run on this machine and produced
the output described. Where a command is slow, the real measured time is given.

**Project root:** `~/Desktop/xai-healthcare`
Every command below assumes you are in that directory unless stated otherwise.

---

## Contents

1. [What this project is](#1-what-this-project-is)
2. [Tech stack and exact versions](#2-tech-stack-and-exact-versions)
3. [Prerequisites](#3-prerequisites)
4. [First-time setup, start to finish](#4-first-time-setup-start-to-finish)
5. [The fastest path: Docker](#5-the-fastest-path-docker)
6. [Step 1 — downloading the data](#6-step-1--downloading-the-data)
7. [Step 2 — the notebooks](#7-step-2--the-notebooks)
8. [Step 3 — the API](#8-step-3--the-api)
9. [Step 4 — the dashboard](#9-step-4--the-dashboard)
10. [Step 5 — Docker Compose in detail](#10-step-5--docker-compose-in-detail)
11. [Verification with Reticle](#11-verification-with-reticle)
12. [The nine datasets — reference](#12-the-nine-datasets--reference)
13. [Every file, and what it does](#13-every-file-and-what-it-does)
14. [Command cheat-sheet](#14-command-cheat-sheet)
15. [Troubleshooting — every error we actually hit](#15-troubleshooting--every-error-we-actually-hit)
16. [How to add a tenth dataset](#16-how-to-add-a-tenth-dataset)
17. [Rebuilding everything from zero](#17-rebuilding-everything-from-zero)
18. [Demo / viva script](#18-demo--viva-script)
19. [Reading the metrics correctly](#19-reading-the-metrics-correctly)

---

## 1. What this project is

Three classifiers (Logistic Regression, Random Forest, XGBoost) trained on nine
real public clinical datasets — 27 models total. Every prediction is returned with
a SHAP attribution, a LIME local surrogate, and a plain-English summary. The
explanations are then *measured* for fidelity, stability and comprehensibility
rather than assumed to be good.

Three layers, in dependency order:

```
notebooks/ 01→05   →   api/ (FastAPI)   →   web/ (Next.js)
   Jupyter research      loads .pkl once      reads the API only
        │                        ▲
        └── writes models/*.pkl, results/*.json
                    ▲
              xai/ — shared library imported by BOTH notebooks and API,
              so training and inference cannot silently disagree
```

**The layers are strictly ordered.** The API refuses to start without the notebook
artefacts. The dashboard has no mock data and shows an explicit error if the API is
down. This is deliberate: a demo that renders fake numbers when the backend is
missing is how wrong numbers end up in a report.

---

## 2. Tech stack and exact versions

### Python layer (`requirements.txt`, pinned)

| Package | Version | Why |
|---|---|---|
| Python | 3.11.15 | Required — see the llvmlite note in troubleshooting |
| pandas | 2.2.3 | Dataframes |
| numpy | 1.26.4 | Arrays; pinned <2 for shap/numba compatibility |
| scikit-learn | 1.5.2 | LogReg, Random Forest, preprocessing, metrics, KNN imputer |
| xgboost | 2.1.3 | Gradient boosting |
| shap | 0.46.0 | Global + local attributions |
| lime | 0.2.0.1 | Local surrogate explanations |
| joblib | 1.4.2 | Model serialisation |
| matplotlib | 3.9.2 | Notebook figures |
| seaborn | 0.13.2 | Statistical plots |
| jupyter | 1.1.1 | Notebook runtime |
| nbformat | 5.11.1 | Building notebooks from `.py` sources |
| ucimlrepo | 0.0.7 | UCI dataset client |
| kagglehub | 0.3.12 | Kaggle dataset client |
| numba | 0.60.0 | **Pinned explicitly** — shap dependency |
| llvmlite | 0.43.0 | **Pinned explicitly** — newer versions have no macOS wheel |
| fastapi | 0.115.6 | API framework |
| pydantic | 2.10.4 | Request/response validation |
| uvicorn | 0.34.0 | ASGI server |

### Frontend layer (`web/package.json`)

| Package | Version | Why |
|---|---|---|
| next | 16.3.3 | App Router, server components |
| react / react-dom | 19.2.8 | |
| typescript | ^5 | strict mode, no `any` |
| tailwindcss | ^4 | CSS-variable theming via `@theme` |
| radix-ui | ^1.6.7 | shadcn/ui primitives |
| shadcn | ^4.19.1 | Component generator (`radix-nova` preset, customised) |
| motion | ^13.1.1 | Framer Motion — gauge and bar animations |
| recharts | ^3.10.1 | ROC and fidelity line charts |
| react-hook-form | ^7.87.0 | Multi-step patient form |
| zod | ^4.5.4 | Validation schema, generated from API metadata |
| @hookform/resolvers | ^5.9.1 | Bridges the two |
| next-themes | ^0.4.6 | Light/dark mode |
| lucide-react | ^1.38.0 | Icons |
| sonner | ^2.0.8 | Toasts |
| @reticlehq/next, @reticlehq/react | ^2.12.0 | **devDependencies** — verification layer, absent from production |

### Infrastructure

| Tool | Version |
|---|---|
| Node | v26.0.0 |
| npm | 11.12.1 |
| Docker | 29.4.3 |
| Docker Compose | 5.1.3 |

---

## 3. Prerequisites

You need **either** Docker **or** the local toolchain. Docker is less work.

```bash
# check what you have
python3.11 --version     # need 3.11.x
node --version           # need 20+
docker --version
docker compose version
```

If `python3.11` is missing on macOS: `brew install python@3.11`.
`uv` is optional but much faster than pip: `curl -LsSf https://astral.sh/uv/install.sh | sh`.

**Internet is required** for the first data download and for `npm install`. After
that everything runs offline.

---

## 4. First-time setup, start to finish

This is the full sequence with nothing skipped. Total time ≈ 45 minutes, almost
all of it in notebook 03.

```bash
cd ~/Desktop/xai-healthcare

# ---- 1. Python environment ----
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
#    or, ~10x faster:
#    uv venv --python 3.11 .venv && uv pip install -r requirements.txt

# ---- 2. Register the Jupyter kernel (needed by build_notebooks --execute) ----
python -m ipykernel install --user --name python3 \
       --display-name "Python 3 (xai-healthcare)"

# ---- 3. Download the nine datasets (~1 min) ----
python scripts/download_data.py
#    expect the last line: "All 9 datasets verified."

# ---- 4. Run the research pipeline (~40 min) ----
python scripts/build_notebooks.py --execute
#    01_eda            ~6 min
#    02_preprocessing  ~1 min
#    03_model_training ~27 min   <-- the grid searches
#    04_explainability ~1 min
#    05_evaluation     ~2 min

# ---- 5. Start the API (terminal 1) ----
uvicorn api.app.main:app --reload --port 8000

# ---- 6. Start the dashboard (terminal 2) ----
cd web && npm install && npm run dev
```

Open <http://localhost:3000>. API docs at <http://localhost:8000/docs>.

### Verifying each step worked

| After step | Check | Expected |
|---|---|---|
| 1 | `python -c "import shap, xgboost, lime; print('ok')"` | `ok` |
| 3 | `ls data/raw/*.csv \| wc -l` | `9` |
| 4 | `ls models/*.pkl \| wc -l` | `63` |
| 4 | `ls results/*.json \| wc -l` | `11` |
| 4 | `ls results/figures/*.png \| wc -l` | `54` |
| 5 | `curl -s localhost:8000/health` | `"models_loaded":27` |
| 6 | `curl -so /dev/null -w "%{http_code}" localhost:3000` | `200` |

---

## 5. The fastest path: Docker

Only works **after** steps 3 and 4 above, because the API image copies the
notebook artefacts into itself.

```bash
docker compose up --build          # foreground, logs visible
docker compose up --build -d       # detached
```

- Dashboard → <http://localhost:3000>
- API → <http://localhost:8000>
- Swagger UI → <http://localhost:8000/docs>
- ReDoc → <http://localhost:8000/redoc>
- OpenAPI JSON → <http://localhost:8000/openapi.json>

First build takes ~4 minutes (the API image installs shap/xgboost/scikit-learn).
Rebuilds with unchanged dependencies take seconds.

Compose waits for the API's health check — which asserts all 27 models and 27
explainers actually loaded — before starting the dashboard.

---

## 6. Step 1 — downloading the data

```bash
python scripts/download_data.py            # idempotent, skips cached files
python scripts/download_data.py --force    # re-download everything
python scripts/download_data.py --help
```

**What it does:** fetches nine datasets, asserts each row count against the
published figure, writes `data/raw/{slug}.csv` plus `data/raw/manifest.json`.

**It fails loudly on purpose.** If a source is unreachable or a row count is
wrong, it exits non-zero rather than continuing with unexpected data:

```
FATAL: breast_cancer: got 560 rows, expected 569. Refusing to continue
with unexpected data.
```

**Expected output tail:**

```
breast_cancer    OK   rows=569  (expected 569 ) cols=31  target=Malignant (1) or benign (0) breast mass
...
Wrote data/raw/manifest.json
All 9 datasets verified.
```

### Kaggle credentials (optional)

The Pima diabetes loader tries `kagglehub` first. Kaggle now requires
authentication even for public datasets, so without credentials you will see:

```
kagglehub unavailable (KaggleApiHTTPError: 403 ...) -> falling back to the
identical UCI-origin mirror https://raw.githubusercontent.com/...
```

That is expected and the fallback is the same 768 records. To use the Kaggle path:

```bash
export KAGGLE_USERNAME=your_username
export KAGGLE_KEY=your_api_key
python scripts/download_data.py --force
```

---

## 7. Step 2 — the notebooks

### Why the notebooks are generated from `.py`

Notebook JSON is unreviewable in a diff. The editable sources live in
`notebooks/src/*.py` in percent format (`# %%` marks a code cell,
`# %% [markdown]` a markdown cell). `scripts/build_notebooks.py` converts them to
`.ipynb` and optionally executes them.

**Edit `notebooks/src/*.py`, never `notebooks/*.ipynb` directly** — the `.ipynb`
files are build artefacts and get overwritten.

### Commands

```bash
# build all five .ipynb without running them (fast, ~1 s)
python scripts/build_notebooks.py

# build AND execute all five, in order
python scripts/build_notebooks.py --execute

# build and execute just one
python scripts/build_notebooks.py --execute --only 03_model_training

# valid --only values:
#   01_eda  02_preprocessing  03_model_training  04_explainability  05_evaluation

python scripts/build_notebooks.py --help
```

Execution runs `jupyter nbconvert --execute --inplace` with a 3600 s timeout. If a
notebook raises, the script prints the traceback and exits non-zero — it does not
continue to the next stage with a missing artefact.

### Opening them interactively

```bash
source .venv/bin/activate
jupyter lab            # or: jupyter notebook
```

Then open `notebooks/01_eda.ipynb`. Every notebook is reproducible with
**Restart & Run All**.

### What each notebook does and produces

| Notebook | Time | Produces | Consumed by |
|---|---|---|---|
| `01_eda` | ~6 min | `results/01_class_balance.json`, `01_missingness.json`, 20 figures | the report |
| `02_preprocessing` | ~1 min | `data/processed/*.csv` (27 files), `models/{slug}_preprocessor.pkl` (9), `results/02_splits.json` | 03, API |
| `03_model_training` | ~27 min | `models/{slug}_{model}.pkl` (27), `results/03_metrics.json`, `03_results_table.json` | 04, 05, API |
| `04_explainability` | ~1 min | `models/{slug}_{model}_shap.pkl` (27), `results/04_global_importance.json`, `04_case_studies.json`, `04_additivity_check.json`, 27 figures | 05, API |
| `05_evaluation` | ~2 min | `results/05_evaluation.json`, `05_scorecard.json`, `05_heart_failure_thresholds.json`, figures | API, dashboard |

**Order matters.** Each notebook consumes the previous one's artefacts. Running 04
before 03 fails with a missing-file error.

### Notebook internals worth knowing

- `RANDOM_STATE = 42` everywhere, `StratifiedKFold(n_splits=5, shuffle=True)`.
- Model selection is on **test AUC-ROC** with a tie-break: within 0.01 AUC, the
  simpler model wins.
- Notebook 01 asserts that its class-balance table covers every registered
  dataset. That assertion exists because an earlier version used
  `plt.subplots(1, 4)` with `zip(axes, DATASETS.items())`, which silently dropped
  five datasets when the cancer cohorts were added — `zip` stops at the shorter
  argument. If you see that assertion fire, a plotting grid is smaller than the
  registry.

---

## 8. Step 3 — the API

### Running it

```bash
# development, auto-reload on code change
uvicorn api.app.main:app --reload --port 8000

# explicit host (needed if you want it reachable from another device)
uvicorn api.app.main:app --host 0.0.0.0 --port 8000

# background, surviving shell exit
nohup uvicorn api.app.main:app --host 127.0.0.1 --port 8000 > /tmp/xai_api.log 2>&1 &
disown
tail -f /tmp/xai_api.log
```

Startup takes ~15 s: it loads 27 models, 27 SHAP explainers and 9 LIME explainers
once, in the FastAPI lifespan handler. Successful startup logs:

```
INFO xai.api: loading artefacts from /Users/you/Desktop/xai-healthcare
INFO xai.api: loaded heart_disease: 3 models, 3 SHAP explainers, 1 LIME explainer
...
INFO xai.api: registry ready — 27 models, 27 SHAP explainers, 9 LIME explainers
INFO:     Application startup complete.
```

### Configuration (`api/.env`)

| Variable | Default | Meaning |
|---|---|---|
| `WEB_ORIGIN` | `http://localhost:3000,http://127.0.0.1:3000` | Comma-separated CORS allow-list |
| `LOG_LEVEL` | `info` | `critical\|error\|warning\|info\|debug` |

There are no secrets. The service holds no patient data and calls nothing
external.

### Endpoints

| Method | Path | Returns |
|---|---|---|
| GET | `/health` | status, models/explainers loaded, dataset list, version |
| GET | `/datasets` | all nine datasets with the full feature schema |
| GET | `/datasets/{dataset}` | one dataset |
| GET | `/models/{dataset}` | three models with metrics, tuned params, confusion matrix, calibration |
| POST | `/predict` | prediction + SHAP + LIME + top factors + summary + calibration |
| GET | `/evaluation/{dataset}/{model}` | ROC/PR curves, confusion matrix, and quality scores for the selected model |
| GET | `/explainability` | quality metrics + global importance for all nine |
| GET | `/explainability/{dataset}/cases` | the five representative patients from notebook 04 |

### Worked examples

```bash
# --- health ---
curl -s localhost:8000/health | python3 -m json.tool

# --- list datasets, compactly ---
curl -s localhost:8000/datasets | python3 -c "
import json,sys
for d in json.load(sys.stdin):
    print(f\"{d['slug']:<26} n={d['rows']:<4} feats={d['feature_count']:<3} best={d['best_model_label']}\")"

# --- the exact field names a dataset expects ---
curl -s localhost:8000/datasets/breast_cancer | python3 -c "
import json,sys
d=json.load(sys.stdin)
for g in d['feature_groups']:
    print(g['label'])
    for f in g['features']:
        print(f\"   {f['name']:<22} {f['lo']}–{f['hi']} {f['unit']}  default={f['default']}\")"

# --- compare the three models for one dataset ---
curl -s localhost:8000/models/cervical_cancer | python3 -c "
import json,sys
for m in json.load(sys.stdin):
    k=m['metrics']
    print(f\"{m['label']:<20} auc={k['roc_auc']:.3f} recall={k['recall']:.3f} acc={k['accuracy']:.3f} base={k['majority_baseline']:.3f}\")"

# --- predict: heart disease, high-risk patient ---
curl -s -X POST localhost:8000/predict \
  -H 'content-type: application/json' \
  -d '{"dataset":"heart_disease","model":"logistic_regression",
       "patient_features":{"age":63,"sex":1,"cp":4,"trestbps":150,"chol":300,
         "fbs":1,"restecg":2,"thalach":110,"exang":1,"oldpeak":3.2,
         "slope":3,"ca":3,"thal":7}}' | python3 -m json.tool

# --- predict with defaults, any dataset, no hand-typing ---
#     asks the API which model is selected, fills every field with its default
python - <<'EOF'
import json, urllib.request

SLUG = "lung_cancer_surgery"          # change me

def get(path):
    return json.load(urllib.request.urlopen(f"http://localhost:8000{path}"))

ds = get(f"/datasets/{SLUG}")
features = {f["name"]: f["default"]
            for g in ds["feature_groups"] for f in g["features"]}

payload = {"dataset": SLUG, "model": ds["best_model"], "patient_features": features}
req = urllib.request.Request("http://localhost:8000/predict",
        json.dumps(payload).encode(), {"content-type": "application/json"})
d = json.load(urllib.request.urlopen(req))

print(d["prediction_label"], round(d["probability"], 3), d["risk_band"])
print(d["summary"])
for f in d["top_factors"]:
    print("  -", f["sentence"])
if not d["calibration"]["calibrated"]:
    print("  NOTE:", d["calibration"]["note"])
EOF

# --- evaluation curves ---
curl -s localhost:8000/evaluation/breast_cancer/logistic_regression | python3 -c "
import json,sys; d=json.load(sys.stdin)
print('roc points:', len(d['roc_curve']), 'pr points:', len(d['pr_curve']))
print('fidelity:', d['fidelity'] and d['fidelity']['fidelity_score'])"

# --- the five representative patients, including the false negative ---
curl -s localhost:8000/explainability/heart_failure/cases | python3 -c "
import json,sys; d=json.load(sys.stdin)
for c in d['cases']:
    print(f\"{c['case_label']:<40} p={c['probability']:.3f} actual={c['actual']}\")"
```

### `POST /predict` response fields

| Field | Meaning |
|---|---|
| `prediction` | 0 or 1 at the 0.5 threshold |
| `prediction_label` | human label, e.g. `"Malignant"` |
| `probability` | model probability for the positive class |
| `risk_band` | `low` <0.33, `moderate` <0.66, `high` ≥0.66 |
| `threshold` | 0.5, returned so the UI can mark it |
| `base_value` | SHAP expected value — where the waterfall starts |
| `shap_values` | `{feature: contribution}` for every feature |
| `contributions` | same, sorted by \|contribution\|, with labels and display values |
| `lime_explanation` | `[[feature, weight], …]` top 8 |
| `lime_labelled` | same with labels, for charting |
| `top_factors` | top 3 with a ready-to-read `sentence` |
| `summary` | one-paragraph plain-English summary |
| `model_metrics` | held-out metrics for this model |
| **`calibration`** | **whether `probability` can be read as absolute risk — see §19** |
| `caveat` | the not-a-medical-device disclaimer |

### Validation behaviour

Out-of-range, missing, unknown or non-categorical values are rejected with **422**
and a specific message:

```bash
# age 500 on a cohort trained on 20–100
curl -s -X POST localhost:8000/predict -H 'content-type: application/json' \
  -d '{"dataset":"heart_disease","patient_features":{"age":500,"sex":1,"cp":4,
      "trestbps":150,"chol":300,"fbs":1,"restecg":2,"thalach":110,"exang":1,
      "oldpeak":3.2,"slope":3,"ca":3,"thal":7}}' | python3 -m json.tool
# -> 422  "age (Age) = 500.0 years is outside the plausible range 20-100 years
#          the model was trained on"
```

Unknown dataset or model → **404**. This matters: without validation the model
returns a confident probability, and SHAP a perfectly coherent explanation, for a
patient who cannot exist.

---

## 9. Step 4 — the dashboard

### Commands (all from `web/`)

```bash
cd web

npm install            # first time only
npm run dev            # dev server with Reticle SDK, http://localhost:3000
npm run build          # production build
npm run start          # serve the production build
npm run lint           # eslint

npx tsc --noEmit                    # type-check only
npx eslint src --max-warnings=0     # lint, warnings fatal
npx next dev -p 3001                # different port
```

Both `npx tsc --noEmit` and `npx eslint src --max-warnings=0` are expected to
produce **no output** on a clean tree.

### Configuration (`web/.env`)

| Variable | Local value | Docker value | Used by |
|---|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8000` | same | the **browser** — baked into the client bundle at build time |
| `API_INTERNAL_URL` | `http://localhost:8000` | `http://api:8000` | **server components** at request time |

Two URLs on purpose. Inside the web container `localhost` is the web container, so
server-side fetches must use the Compose service name. Compose overrides
`API_INTERNAL_URL` for you.

### Routes

| Route | What it shows |
|---|---|
| `/` | Overview, nine cohorts grouped (cardiometabolic / oncology), aggregate quality ranges |
| `/predict/[dataset]` | Multi-step form → gauge, SHAP waterfall, LIME bars, plain-English top 3 |
| `/models/[dataset]` | Model comparison table, ROC overlay, confusion matrices, tuned hyperparameters |
| `/explainability` | Fidelity / stability / comprehensibility for a non-technical reader |
| `/about` | Research gap, design decisions, data provenance |

Valid `[dataset]` values: `heart_disease`, `heart_failure`, `diabetes`,
`kidney_disease`, `breast_cancer`, `breast_cancer_recurrence`,
`breast_cancer_survival`, `cervical_cancer`, `lung_cancer_surgery`.

### Using the predict page

1. Pick a cohort from the tabs at the top.
2. The form opens **pre-filled with cohort medians**, so you can submit
   immediately without inventing a patient.
3. Walk the steps (Continue). Each step validates only its own fields.
4. Optionally change the model in the dropdown — all three are available.
5. **Predict & explain.**
6. **Changing the model after a result re-runs the same patient immediately** —
   the panel always belongs to the model named in the selector, so you can compare
   all three on one patient without re-entering anything. Before the first
   submission, changing the model sends no request.
7. Read in this order: the verdict card (what), then the teal "Why" panel (three
   sentences), then the waterfall and LIME (the full attribution).
8. "Reset to cohort medians" restores the starting state.

Out-of-range values are caught in the browser before any request is sent, and the
API re-validates independently.

### Design notes

- Theme lives in `web/src/app/globals.css` as CSS variables — navy/charcoal base,
  a single teal accent, semantic `--risk-*` and `--increases`/`--decreases`
  tokens. Not the default shadcn look.
- Fonts: **Fraunces** for headings, **Inter** for body, **Geist Mono** for
  numbers (tabular figures matter when numbers sit in columns).
- Attribution direction uses warm/cool rather than red/green, because ~8% of men
  have a red-green deficiency and this is a clinical tool.
- Every chart carries an `aria-label` summarising its data.
- Recharts' own entry animation is **disabled** — under React 19 it leaves paths
  at `stroke-dasharray: 0px` and the curve never paints.

---

## 10. Step 5 — Docker Compose in detail

```bash
docker compose up --build            # build + start, foreground
docker compose up --build -d         # detached
docker compose ps                    # status
docker compose logs -f               # follow both services
docker compose logs -f api           # one service
docker compose logs --tail=50 web
docker compose stop                  # stop, keep containers
docker compose start                 # start again
docker compose restart api
docker compose down                  # stop and remove containers + network
docker compose down --rmi local      # also delete the built images
docker compose build --no-cache api  # force a clean API rebuild
docker compose exec api sh           # shell inside the API container
docker compose config                # render the effective config
docker compose config --quiet        # validate only
```

### Ports

Override without editing the file:

```bash
API_PORT=8001 WEB_PORT=3001 docker compose up -d
```

### Services

| Service | Container | Image | Port | Build context |
|---|---|---|---|---|
| `api` | `xai-api` | `xai-healthcare-api:1.0.0` | 8000 | **repository root** |
| `web` | `xai-web` | `xai-healthcare-web:1.0.0` | 3000 | `./web` |

The API build context is the repo root, not `api/`, because the image needs the
shared `xai` package plus `models/`, `results/` and `data/processed/`. Image sizes
are ~2.8 GB (API — shap/xgboost/sklearn are large) and ~304 MB (web, standalone
output).

### Health check

```bash
docker inspect --format '{{.State.Health.Status}}' xai-api
```

The check greps `/health` for `"status":"ok"`, so a process that is listening but
has no artefacts is **not** healthy and `web` will not start. `start_period` is
120 s because loading 27 models and 27 explainers takes time — a shorter window
would kill the container mid-startup.

### Docker vs local dev

| | Docker | `npm run dev` |
|---|---|---|
| Reticle SDK | absent (production build) | **present** |
| Hot reload | no | yes |
| Use for | demo, submission, final check | development, verification |

They both bind port 3000, so stop one before starting the other:

```bash
docker compose stop web && cd web && npm run dev
# and to go back:
pkill -f "next dev" && docker compose start web
```

---

## 11. Verification with Reticle

[Reticle](https://docs.reticle.sh) is a dev-only layer that drives the real app and
reads program truth — network calls, store state, signals, console — returning
pass / fail / "couldn't tell" with a `file:line`.

```bash
# 1. dev server must be running (the SDK only connects in development)
cd web && npm run dev

# 2. confirm the app connected
npx @reticlehq/server status

# 3. re-run setup if needed (idempotent)
npx @reticlehq/server init --dry-run
npx @reticlehq/server init
```

### What is instrumented

`web/src/lib/reticle-dev.ts` exposes a subscribable `predictFlow` store —
`dataset`, `model`, `step`, `stepLabel`, `pending`, `hasResult`, `prediction`,
`probability`, `riskBand`, `topFactorCount`, `limeFactorCount`, `lastError` — plus
five signals:

| Signal | Fires when |
|---|---|
| `predict:step` | the form moves between steps |
| `predict:submitted` | a request is about to be sent |
| `predict:explained` | an explanation arrived (carries probability, factor counts) |
| `predict:rejected` | the API rejected the request |
| `predict:blocked` | client validation stopped the submit — **no request was sent** |
| `predict:model_switched` | the model dropdown changed (carries `from`, `to`, `rerunning`) |

17 `data-testid` values are registered: `predict-form`, `predict-step`,
`predict-continue`, `predict-submit`, `predict-back`, `predict-reset`,
`model-select`, `predict-empty`, `result-skeleton`, `prediction-result`,
`prediction-verdict`, `probability-gauge`, `prediction-summary`, `top-factors`,
`shap-waterfall`, `lime-panel`, `prediction-error`.

Everything is behind `process.env.NODE_ENV === "development"`, which is statically
false in a production build. Verify:

```bash
cd web && npm run build
grep -rl "reticlehq\|__reticle" .next/static | wc -l    # expect 0
```

### Rules that matter

- Only `reticle_act_and_wait` and `reticle_assert` produce a verdict. Everything
  else moves or reads the app and proves nothing.
- `verified: "unknown"` is **not** a pass. It means Reticle could not tell.
- `already_true` means your predicate was satisfied before the action, so it
  proved nothing about it — assert something the action *changes*.

### Known false positive

On `POST /predict`, Reticle's `write-field-ignored` heuristic compares request
`patient_features` keys against same-named `shap_values` keys and reports
"asked `age: 54`, got `age: 0.0000418`" as a half-applied write. `/predict`
computes rather than persists, and `shap_values` is an attribution map, so a
different value is the point. Reported upstream via `reticle_feedback`. When you
see `contradicted` on a predict flow with all predicates passing, this is why.

---

## 12. The nine datasets — reference

| slug | title | n | feats | form steps | positive class | selected model | probability readable as risk? |
|---|---|---|---|---|---|---|---|
| `heart_disease` | Heart Disease (Cleveland) | 303 | 13 | 3 | Heart disease present | Logistic Regression | yes |
| `heart_failure` | Heart Failure Clinical Records | 299 | 11 | 4 | Death during follow-up | Random Forest | yes |
| `diabetes` | Pima Indians Diabetes | 768 | 8 | 3 | Diabetes onset | Random Forest | yes |
| `kidney_disease` | Chronic Kidney Disease | 400 | 24 | 4 | Chronic kidney disease | Random Forest | yes |
| `breast_cancer` | Breast Cancer Wisconsin (Diagnostic) | 569 | 30 | 3 | Malignant | Logistic Regression | yes |
| `breast_cancer_recurrence` | Breast Cancer Recurrence (Ljubljana) | 286 | 9 | 3 | Recurrence | Random Forest | yes |
| `breast_cancer_survival` | Breast Cancer Surgical Survival (Haberman) | 306 | 3 | 2 | Died within five years | Random Forest | **no** (1.5×) |
| `cervical_cancer` | Cervical Cancer (Risk Factors) | 858 | 28 | 4 | Biopsy-confirmed cervical cancer | Logistic Regression | **no** (6.9×) |
| `lung_cancer_surgery` | Lung Cancer Thoracic Surgery | 470 | 16 | 4 | Died within one year | Logistic Regression | **no** (3.3×) |

Feature groups, which become the form steps, in order: `demographics`,
`history`, `sti_history`, `diagnoses`, `vitals`, `tumour`, `labs`,
`morphology_mean`, `morphology_se`, `morphology_worst`. A dataset only shows the
groups it actually uses.

### Per-dataset preprocessing decisions

| Dataset | Imputer | Special handling |
|---|---|---|
| Heart Disease | median | 6 missing cells total |
| Heart Failure | median | **`time` dropped** — censoring leak, inflates AUC 0.795→0.893 |
| Diabetes | median | **sentinel zeros → NaN** in 5 columns (Insulin 48.7% missing) |
| Chronic Kidney Disease | **KNN k=5** | 38% missing `rbc`, non-random; tab-dirty strings stripped |
| Breast Cancer (Diagnostic) | median | nothing missing; watch radius/perimeter/area collinearity (r>0.98) |
| Breast Cancer Recurrence | median | **six Excel-mangled band labels repaired** (`'14-Oct'` → `10-14`) |
| Breast Cancer Survival | median | `operation_year` kept — era covariate, not leakage |
| Cervical Cancer | **KNN k=5** | 4 columns dropped: 3 parallel outcome tests (leakage) + 2 at 91.7% missing + 2 constant |
| Lung Cancer Surgery | median | **FEV1 > 10 L → NaN** (14 impossible values up to 86 L) |

### Two datasets deliberately excluded

- **UCI 62 "Lung Cancer"** — 32 patients against 56 features, three classes. Any
  model fits noise.
- **UCI 83 "Primary Tumor"** — 21 tumour-site classes, several with one case. This
  pipeline is binary throughout.

Recorded in `xai/cancer.py` and `scripts/download_data.py` so the omission reads as
a decision.

---

## 13. Every file, and what it does

```
xai-healthcare/
├── requirements.txt            pinned Python deps
├── docker-compose.yml          two services, health-gated
├── README.md                   results, findings, limitations
├── RUNBOOK.md                  this file
├── .gitignore / .dockerignore
│
├── scripts/
│   ├── download_data.py        fetch + verify 9 datasets; --force, --help
│   └── build_notebooks.py      .py → .ipynb, optionally execute; --execute, --only
│
├── xai/                        SHARED — imported by notebooks AND api
│   ├── schema.py               single source of truth: Dataset/Feature registry,
│   │                           ranges, labels, groups, imputer choice, drops
│   ├── cancer.py               the five oncology cohort specs
│   ├── data.py                 load_raw, split, build_preprocessor, prepare
│   └── explain.py              ShapExplainer wrapper, build_lime, top_factors,
│                               summarise  ← the plain-English rendering
│
├── notebooks/
│   ├── src/*.py                EDIT THESE (percent format)
│   └── *.ipynb                 build artefacts — do not edit
│
├── api/
│   ├── Dockerfile              context = repo root; libgomp1 for xgboost
│   ├── .env                    WEB_ORIGIN, LOG_LEVEL
│   └── app/
│       ├── __init__.py         puts repo root on sys.path
│       ├── store.py            Registry — loads everything once at startup
│       ├── schemas.py          Pydantic models + the range validator + drift guard
│       └── main.py             lifespan, CORS, the eight endpoints
│
├── web/
│   ├── Dockerfile              multi-stage, standalone output
│   ├── .env                    NEXT_PUBLIC_API_URL, API_INTERNAL_URL
│   ├── next.config.ts          output:"standalone", withReticle
│   ├── .reticle.json           projectId
│   └── src/
│       ├── app/
│       │   ├── globals.css     the whole theme (CSS variables)
│       │   ├── layout.tsx      fonts, ThemeProvider, chrome, ReticleDev
│       │   ├── reticle-dev.tsx connect + capabilities registration
│       │   ├── page.tsx        landing
│       │   ├── predict/[dataset]/page.tsx
│       │   ├── models/[dataset]/page.tsx
│       │   ├── explainability/page.tsx
│       │   ├── about/page.tsx
│       │   └── loading.tsx / error.tsx / not-found.tsx
│       ├── components/
│       │   ├── site-chrome.tsx      header, nav, theme toggle, footer
│       │   ├── dataset-tabs.tsx     cohort switcher
│       │   ├── api-unavailable.tsx  the polished backend-down state
│       │   ├── predict-flow.tsx     multi-step form + orchestration
│       │   ├── prediction-result.tsx verdict, why, waterfall, LIME, calibration
│       │   ├── charts/gauge.tsx
│       │   ├── charts/attribution.tsx    waterfall, diverging bars, importance
│       │   ├── charts/model-charts.tsx   ROC, confusion, fidelity, score bars
│       │   └── ui/*                 shadcn primitives
│       └── lib/
│           ├── types.ts        mirrors the API response models
│           ├── api.ts          typed fetch wrapper, ApiError
│           ├── reticle-dev.ts  dev-only store + signals
│           └── utils.ts        cn()
│
├── data/raw/                   9 CSVs + manifest.json      (gitignored)
├── data/processed/             27 CSVs                     (gitignored)
├── models/                     63 pkl                      (gitignored)
└── results/                    11 JSON + figures/ (54 png)
```

`data/`, `models/` are gitignored because they are regenerated by the pipeline
from cited public sources.

---

## 14. Command cheat-sheet

```bash
# ---------- setup ----------
uv venv --python 3.11 .venv && uv pip install -r requirements.txt
source .venv/bin/activate
python -m ipykernel install --user --name python3 --display-name "Python 3 (xai-healthcare)"

# ---------- data ----------
python scripts/download_data.py
python scripts/download_data.py --force

# ---------- notebooks ----------
python scripts/build_notebooks.py                                  # build only
python scripts/build_notebooks.py --execute                        # all, in order
python scripts/build_notebooks.py --execute --only 05_evaluation    # one
jupyter lab

# ---------- api ----------
uvicorn api.app.main:app --reload --port 8000
curl -s localhost:8000/health | python3 -m json.tool
open http://localhost:8000/docs

# ---------- web ----------
cd web && npm run dev
cd web && npm run build && npm run start
cd web && npx tsc --noEmit && npx eslint src --max-warnings=0

# ---------- docker ----------
docker compose up --build -d
docker compose ps
docker compose logs -f api
docker compose down

# ---------- verification ----------
cd web && npm run dev
npx @reticlehq/server status

# ---------- quick health of the whole tree ----------
ls data/raw/*.csv | wc -l          # 9
ls models/*.pkl | wc -l            # 63
ls results/*.json | wc -l          # 11
ls results/figures/*.png | wc -l   # 54
```

### One-liner: does everything still work?

```bash
python - <<'EOF'
import json, urllib.request, sys
sys.path.insert(0, ".")
from xai import schema
ok = 0
for slug, ds in schema.DATASETS.items():
    for m in schema.MODEL_NAMES:
        body = json.dumps({"dataset": slug, "model": m, "include_lime": False,
            "patient_features": {f.name: f.default for f in ds.features}}).encode()
        r = urllib.request.Request("http://localhost:8000/predict", body,
                                   {"content-type": "application/json"})
        d = json.load(urllib.request.urlopen(r))
        assert len(d["shap_values"]) == len(ds.feature_names)
        ok += 1
print(f"{ok}/27 model-dataset combinations predict with complete SHAP")
EOF
```

---

## 15. Troubleshooting — every error we actually hit

### `llvmlite` fails to build during install

```
subprocess.CalledProcessError: ... llvmlite/ffi/build.py returned non-zero
hint: `llvmlite` was included because `shap` depends on `numba`
```

**Cause:** pip resolved a numba version whose llvmlite has no macOS wheel, so it
tried to compile LLVM from source.
**Fix:** already handled — `requirements.txt` pins `numba==0.60.0` and
`llvmlite==0.43.0`. If you edited those pins, put them back. Use Python 3.11, not
3.12+.

### `Kaggle 403 ... Permission 'datasets.get' was denied`

Expected. Kaggle now requires auth for public datasets. The loader logs the
fallback to the identical UCI-origin mirror and continues. Set
`KAGGLE_USERNAME` / `KAGGLE_KEY` to use the Kaggle path.

### API exits at startup with `missing artefact`

```
ArtefactsMissing: missing artefact: .../models/heart_disease_logistic_regression.pkl
Run the notebooks in order (scripts/build_notebooks.py --execute) before starting the API.
```

The notebooks have not been run. Run steps 3 and 4 of §4.

### `ERROR: [Errno 48] error while attempting to bind on address`

Something already owns the port.

```bash
lsof -ti:8000 | xargs kill        # free 8000
lsof -ti:3000 | xargs kill        # free 3000
docker compose ps                 # or it may be a container
```

### `RuntimeError: DatasetSlug is out of sync with xai.schema.DATASETS`

You added a dataset to `xai/schema.py` but not to the `DatasetSlug` literal in
`api/app/schemas.py`. Intentional — it fails at import rather than 404-ing at
runtime. Add the slug to both.

### Dashboard shows "The prediction service is not reachable"

The API is down or on a different origin.

```bash
curl -s localhost:8000/health          # is it up?
cat web/.env                           # do the URLs match?
docker compose logs api | tail -30
```

Remember: `API_INTERNAL_URL` must be `http://api:8000` under Compose and
`http://localhost:8000` for local `npm run dev`.

### CORS error in the browser console

Add your origin to `WEB_ORIGIN` in `api/.env` (comma-separated) and restart the
API. Do not widen it to `*`.

### Charts render blank

Recharts' entry animation under React 19 can leave paths at
`stroke-dasharray: 0px`. All series in `web/src/components/charts/model-charts.tsx`
set `isAnimationActive={false}` for this reason. If you re-enable it, expect blank
charts.

### The dashboard shows stale data / an error page that will not clear

Data pages use `export const dynamic = "force-dynamic"` precisely to avoid this:
the web image is built before the API container exists, so a build-time prerender
would bake an "API unreachable" page into static HTML. If you remove that export,
you get a five-minute stale error window after every fresh `docker compose up`.

### `next lint` says "Invalid project directory"

`next lint` was removed in Next 16. Use `npx eslint src --max-warnings=0`.

### `Cannot take a larger sample than population when replace is False`

Notebook 05 ablating more features than a dataset has (Haberman has 3). Fixed by
capping `k` at the feature count. If you see it again, a new dataset has fewer
features than `max(K_VALUES)`.

### Assertion: "class balance covers N of 9 datasets"

A plotting grid in notebook 01 is smaller than the dataset registry, so
`zip(axes, DATASETS.items())` is silently truncating. Increase the grid — the
assertion exists because this bug shipped once already.

### Docker: `web` never starts

It waits for `api` to be healthy.

```bash
docker inspect --format '{{.State.Health.Status}}' xai-api
docker compose logs api | tail -40
```

If the API is `unhealthy`, it is almost always missing artefacts (see above).

### Reticle: no session connected

```bash
cd web && npm run dev      # SDK only loads in development
npx @reticlehq/server status
```

A production build deliberately contains no Reticle at all.

### Reticle verdict says `contradicted` but every predicate passed

The known `write-field-ignored` false positive on `/predict`. See §11.

---

## 16. How to add a tenth dataset

The registry is the single source of truth, so most layers pick a new dataset up
automatically. Six files, in order:

**1. `scripts/download_data.py`** — add a loader and a `DatasetSpec`:

```python
def load_my_dataset() -> pd.DataFrame:
    df = _uci(123)
    df["target"] = (df["target"] == "positive_value").astype(int)
    return df

# then in DATASETS:
DatasetSpec("my_slug", "My Dataset", "https://archive.ics.uci.edu/dataset/123",
            expected_rows, "What the target means", load_my_dataset),
```

Run it and confirm the row count before going further:

```bash
python scripts/download_data.py
```

**2. Inspect the real schema before writing any spec.** Never guess column names,
ranges or categorical values:

```bash
python - <<'EOF'
import pandas as pd
df = pd.read_csv("data/raw/my_slug.csv")
print(df.shape); print(df.dtypes)
print("nulls:", df.isna().sum()[lambda s: s>0].to_dict())
print("target:", df.target.value_counts().to_dict())
for c in df.columns:
    if df[c].dtype == object: print("  obj", c, df[c].dropna().unique()[:10])
    else: print(f"  num {c}: {df[c].min()}–{df[c].max()} median={df[c].median()}")
# and check for traps:
print("constant cols:", [c for c in df.columns if df[c].nunique(dropna=True) <= 1])
EOF
```

**3. `xai/schema.py`** (or `xai/cancer.py` for oncology) — add a `Dataset` with one
`Feature` per column: `lo`/`hi` become the API validator and the form bounds,
`group` becomes the form step, `choices` makes it a dropdown, `default` should be
the cohort median. Add any new group to `GROUPS` and `GROUP_LABELS`.

**4. `api/app/schemas.py`** — add the slug to the `DatasetSlug` literal. The drift
guard will refuse to import if you forget.

**5. `web/src/lib/types.ts`** — add the slug to `DatasetSlug`.
**`web/src/app/page.tsx`** — add an icon to `ACCENT_ICON` (and to `ONCOLOGY` if it
is a cancer cohort). **`web/src/app/not-found.tsx`** — add it to the list.

**6. Notebooks** — add reference features to `EXPECTED` in
`notebooks/src/04_explainability.py` and `CLINICAL_REFERENCE` in
`notebooks/src/05_evaluation.py`. **Fix the list before you look at the scores**,
otherwise the comprehensibility metric is a curve fit rather than a check.

Then regenerate and rebuild:

```bash
python scripts/build_notebooks.py --execute       # ~40+ min
cd web && npx tsc --noEmit && npx eslint src --max-warnings=0
cd .. && docker compose up --build -d
```

---

## 17. Rebuilding everything from zero

```bash
cd ~/Desktop/xai-healthcare

# nuke derived artefacts (all regenerable, nothing irreplaceable)
rm -rf data/raw/*.csv data/raw/manifest.json data/processed/*.csv \
       models/*.pkl results/*.json results/figures/*.png \
       notebooks/*.ipynb

# rebuild
source .venv/bin/activate
python scripts/download_data.py
python scripts/build_notebooks.py --execute

# verify
ls data/raw/*.csv | wc -l          # 9
ls models/*.pkl | wc -l            # 63
ls results/*.json | wc -l          # 11

# ship
docker compose up --build -d
```

Because `random_state=42` is fixed throughout and dependencies are pinned, the
regenerated numbers should match the ones in `README.md` exactly.

To also rebuild the containers from scratch:

```bash
docker compose down --rmi local
docker compose build --no-cache
docker compose up -d
```

---

## 18. Demo / viva script

Ten minutes, in this order. This sequence leads with the project's real argument
rather than with a screenshot.

**1. Provenance (1 min).** Run the downloader live.

```bash
python scripts/download_data.py --force
```

Point out that it asserts every row count against the published figure and exits
non-zero on a mismatch. No row anywhere in the project was typed by hand.

**2. The leakage finding (2 min).** Open `notebooks/01_eda.ipynb` §1.7. The
heart-failure `time` column lifts AUC from 0.795 to 0.893 and becomes the top
feature — and it is worthless, because patients who died early were by
construction observed for less time. **Accuracy metrics did not miss this, they
rewarded it.** Only the feature ranking exposed it. That asymmetry is the whole
argument for explainability.

**3. A live explained prediction (2 min).** `/predict/heart_disease`, submit the
pre-filled patient. Show the reading order: verdict → three plain-English reasons →
waterfall → LIME. Mention that SHAP contributions sum exactly to the model output
(additivity verified to 8.9e-16 in notebook 04) and that LIME arrives by different
mathematics, so agreement is evidence.

**4. The validation boundary (1 min).** Type an age of 500. It is refused in the
browser, and the API refuses it independently with a specific 422. Without that,
the model returns a confident probability and SHAP a coherent explanation for a
patient who cannot exist.

**5. The negative result (2 min).** `/models/cervical_cancer`. Random Forest scores
0.936 accuracy with **recall 0.000** — it answers "no cancer" for everyone and
finds none of the 11 cancers. Its accuracy is identical to the majority baseline.
On lung cancer, Random Forest's 0.840 accuracy is *below* its 0.851 baseline.

**6. The trap (2 min).** `/explainability`. Cervical cancer has the **highest
fidelity (4.43×) and highest stability (0.81) in the project** — and an F1 of 0.13
with SHAP/LIME agreement of 0.048. A faithful, stable, plausible-looking
explanation of a model that misses three quarters of cancers. Had this project
reported only fidelity and stability, as much applied XAI work does, that would
have looked like its best result.

**7. Calibration (1 min).** Submit a low-risk cervical patient. The banner explains
that the 37% figure is a ranking score, not an absolute risk, because class
weighting inflates probabilities 6.9× above the 6.4% prevalence. Explain why Platt
scaling was rejected: 55 positives total means a calibration fold of ~11 events.

**Likely questions, and the honest answers.**

- *Why is CKD 1.000?* The task is nearly separable — haemoglobin, specific gravity
  and albumin almost linearly split the classes on 80 test patients. It describes
  an easy dataset, not a superior model.
- *Why keep datasets where the model fails?* A portfolio of only separable
  datasets would misrepresent clinical prediction. Three of the five oncology
  models are near chance and that is reported on every card.
- *Why Logistic Regression for heart disease when the ensembles scored higher?*
  They scored 0.959 against 0.958 — inside the documented 0.01 tie-break, where the
  simpler model wins, because an indistinguishable gain does not justify a less
  transparent model clinically.
- *Is this deployable?* No. Small, retrospective, single-centre cohorts, no
  prospective validation, and the explanations are faithful *to the model*, which
  is much weaker than clinically correct.

---

## 19. Reading the metrics correctly

### Always check the baseline first

`majority_baseline` is the accuracy of always predicting the majority class. On
cervical cancer it is **0.936**. Any accuracy figure must be read against it, and
two of our models match their baseline exactly by never predicting the disease.

### The three explanation-quality metrics

| Metric | Question | Method | Reads well when |
|---|---|---|---|
| **Fidelity** | Is the explanation true *about the model*? | Ablate top-k SHAP features, compare with ablating k random ones | > 1 |
| **Stability** | Do similar patients get similar reasoning? | Cosine similarity of SHAP vectors among 5 nearest neighbours vs random pairs | high **and** far above the random control |
| **Comprehensibility** | Would a clinician recognise these reasons? | Share of top-3 factors on a literature list fixed in advance, plus SHAP/LIME top-5 overlap | high, with overlap > ~0.7 |

### The one thing to internalise

**Fidelity and stability say nothing about clinical usefulness.** A model that
leans on two features loses a lot of output when you ablate them (high fidelity),
and a nearly-constant model gives neighbouring patients near-identical
attributions (high stability). Cervical cancer scores best on both while being
clinically useless.

**Never read the explanation-quality scores without recall beside them.**

### Calibration

Class weighting was tuned as a hyperparameter and chosen on the imbalanced
cohorts. It improves recall and scales probabilities toward 50% rather than toward
true prevalence:

| Dataset | Prevalence | Mean predicted p | Inflation |
|---|---|---|---|
| Cervical Cancer | 6.4% | 44.3% | **6.9×** |
| Lung Cancer Surgery | 14.9% | 48.9% | **3.3×** |
| Breast Cancer Survival | 25.8% | 39.2% | 1.5× |
| the other six | — | — | 0.95–1.20× |

Every `/predict` response carries a `calibration` block, and the dashboard shows a
caution when `calibrated` is false. For those three models the probability is a
**ranking score for triage**, not this patient's chance of having the condition.

### Threshold is a clinical decision, not a default

0.5 is a statistical convention. Heart-failure recall at 0.5 is 0.47 — it misses
over half the deaths. Notebook 05 §5.6 tabulates the trade-off:

| threshold | recall | precision | missed deaths | false alarms |
|---|---|---|---|---|
| 0.2 | 0.842 | 0.500 | 3 | 16 |
| 0.3 | 0.684 | 0.520 | 6 | 12 |
| 0.5 | 0.474 | 0.600 | 10 | 6 |
| 0.6 | 0.316 | 0.667 | 13 | 3 |

The API returns the probability rather than a hard label precisely so this choice
stays with the clinician.

---

## Safety

**Not a medical device. Not for clinical use.**

The API is **unauthenticated with no rate limiting**. That is acceptable for a
local academic demonstrator serving public research data and holding no patient
records. Do not expose it to a public network without adding authentication,
authorisation and rate limiting first.
