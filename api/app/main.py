"""FastAPI service for Explainable AI for Healthcare Diagnosis.

Serves the artefacts produced by notebooks 01-05: twenty-seven trained classifiers,
their SHAP explainers, and the precomputed evaluation and explanation-quality
results.

Design notes
------------
* All artefacts load once in the lifespan handler. A SHAP explainer is expensive
  to construct and stateless to use, so per-request construction would be pure
  waste.
* Inference reuses `xai.data` / `xai.explain` — the same code the notebooks ran.
  A reimplementation here would be a silent-skew bug waiting to happen.
* Precomputed metrics are served from JSON rather than recomputed. The notebook
  is the source of truth for every number in the report and the dashboard.

SECURITY: this service is unauthenticated by design — it is an academic
demonstrator serving public research datasets and holds no patient data. Do not
expose it to a public network without adding authentication and rate limiting.
"""

from __future__ import annotations

import logging
import os
from contextlib import asynccontextmanager

# pyrefly: ignore [missing-import]
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from xai import explain, schema

from .schemas import (
    DatasetOut,
    EvaluationOut,
    HealthOut,
    ModelSummaryOut,
    PredictRequest,
    PredictResponse,
)
from .store import ArtefactsMissing, registry

VERSION = "1.0.0"
THRESHOLD = 0.5

logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
log = logging.getLogger("xai.api")

CAVEAT = (
    "Research demonstrator trained on small, retrospective, single-centre public "
    "datasets. The explanation is faithful to the model, which is a weaker claim "
    "than clinically correct. Not a medical device and not for clinical use."
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    log.info("loading artefacts from %s", schema.ROOT)
    try:
        registry.load()
    except ArtefactsMissing as exc:
        log.error("%s", exc)
        raise
    yield
    log.info("shutting down")


app = FastAPI(
    title="Explainable AI for Healthcare Diagnosis",
    description=(
        "Clinical risk prediction with a SHAP and LIME explanation attached to "
        "every response. Jamia Millia Islamia, Department of Computer "
        "Engineering (MDS-391)."
    ),
    version=VERSION,
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        o.strip()
        for o in os.getenv(
            "WEB_ORIGIN", "http://localhost:3000,http://127.0.0.1:3000"
        ).split(",")
        if o.strip()
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


# --------------------------------------------------------------------------
# helpers
# --------------------------------------------------------------------------

def _dataset_or_404(slug: str) -> schema.Dataset:
    try:
        return schema.get(slug)
    except KeyError:
        raise HTTPException(
            404, f"unknown dataset '{slug}'. available: {list(schema.DATASETS)}"
        ) from None


def _model_or_404(slug: str, model: str) -> None:
    if model not in schema.MODEL_NAMES:
        raise HTTPException(
            404, f"unknown model '{model}'. available: {schema.MODEL_NAMES}"
        )
    if (slug, model) not in registry.models:
        raise HTTPException(503, "artefacts not loaded yet")


def _dataset_payload(ds: schema.Dataset) -> dict:
    body = schema.as_dict(ds)
    best = registry.best_models.get(ds.slug, "random_forest")
    return {
        **{
            k: body[k]
            for k in (
                "slug", "title", "source", "citation", "rows", "positive_label",
                "negative_label", "outcome", "clinical_context",
                "preprocessing_note", "imputer", "primary", "feature_groups",
            )
        },
        "dropped_columns": list(ds.drop_columns),
        "feature_count": len(ds.feature_names),
        "best_model": best,
        "best_model_label": schema.MODEL_LABELS[best],
    }


# --------------------------------------------------------------------------
# endpoints
# --------------------------------------------------------------------------

@app.get("/health", response_model=HealthOut, tags=["meta"])
def health() -> dict:
    return {
        "status": "ok" if registry.ready else "loading",
        "models_loaded": len(registry.models),
        "explainers_loaded": len(registry.shap),
        "datasets": list(schema.DATASETS),
        "version": VERSION,
    }


@app.get("/datasets", response_model=list[DatasetOut], tags=["metadata"])
def list_datasets() -> list[dict]:
    """Every dataset with its full feature schema — this is what the
    frontend builds its input form from."""
    return [_dataset_payload(ds) for ds in schema.DATASETS.values()]


@app.get("/datasets/{dataset}", response_model=DatasetOut, tags=["metadata"])
def get_dataset(dataset: str) -> dict:
    return _dataset_payload(_dataset_or_404(dataset))


@app.get("/models/{dataset}", response_model=list[ModelSummaryOut], tags=["models"])
def list_models(dataset: str) -> list[dict]:
    """The three trained models for a dataset with their held-out metrics."""
    _dataset_or_404(dataset)
    out = []
    for name in schema.MODEL_NAMES:
        e = registry.metrics(dataset, name)
        out.append(
            {
                "dataset": dataset,
                "model": name,
                "label": e["model_label"],
                "is_best": e["is_best"],
                "best_params": e["best_params"],
                "cv_roc_auc": e["cv_roc_auc"],
                "metrics": e["metrics"],
                "confusion_matrix": e["confusion_matrix"],
                "calibration": e["calibration"],
                "test_n": e["test_n"],
            }
        )
    return out


@app.post("/predict", response_model=PredictResponse, tags=["prediction"])
def predict(request: PredictRequest) -> dict:
    """Predict, then explain. Out-of-range features are rejected with 422 rather
    than silently producing a confident answer about an impossible patient."""
    ds = _dataset_or_404(request.dataset)
    _model_or_404(request.dataset, request.model)

    model = registry.model(request.dataset, request.model)
    shap_explainer = registry.explainer(request.dataset, request.model)
    pre = registry.preprocessors[request.dataset]

    # Schema order, so column index == SHAP index, exactly as in training.
    raw = pd.DataFrame(
        [[float(request.patient_features[f]) for f in ds.feature_names]],
        columns=ds.feature_names,
    )
    scaled = pre.transform(raw)
    scaled_df = pd.DataFrame(scaled, columns=ds.feature_names)

    probability = float(model.predict_proba(scaled_df)[0, 1])
    prediction = int(probability >= THRESHOLD)

    shap_row = shap_explainer.values(scaled_df)[0]
    patient = {f: float(raw.iloc[0][f]) for f in ds.feature_names}

    contributions = sorted(
        (
            {
                "feature": name,
                "label": ds.feature(name).label,
                "group": ds.feature(name).group,
                "value": patient[name],
                "value_display": schema.display_value(ds, name, patient[name]),
                "shap_value": float(shap_row[i]),
            }
            for i, name in enumerate(ds.feature_names)
        ),
        key=lambda c: abs(c["shap_value"]),
        reverse=True,
    )

    lime_pairs: list[tuple[str, float]] = []
    lime_labelled: list[dict] = []
    if request.include_lime:
        lime_pairs = explain.lime_weights(
            registry.lime[request.dataset],
            scaled[0],
            lambda A: model.predict_proba(pd.DataFrame(A, columns=ds.feature_names)),
            n=8,
        )
        lime_labelled = [
            {
                "feature": name,
                "label": ds.feature(name).label,
                "group": ds.feature(name).group,
                "value": patient[name],
                "value_display": schema.display_value(ds, name, patient[name]),
                "shap_value": weight,  # reused field: the LIME surrogate weight
            }
            for name, weight in lime_pairs
        ]

    factors = explain.top_factors(ds, shap_row, patient, k=3)

    return {
        "dataset": ds.slug,
        "dataset_title": ds.title,
        "model": request.model,
        "model_label": schema.MODEL_LABELS[request.model],
        "prediction": prediction,
        "prediction_label": ds.positive_label if prediction else ds.negative_label,
        "probability": probability,
        "risk_band": (
            "high" if probability >= 0.66 else "moderate" if probability >= 0.33
            else "low"
        ),
        "threshold": THRESHOLD,
        "base_value": float(shap_explainer.base_value),
        "shap_values": {
            name: float(shap_row[i]) for i, name in enumerate(ds.feature_names)
        },
        "contributions": contributions,
        "lime_explanation": lime_pairs,
        "lime_labelled": lime_labelled,
        "top_factors": factors,
        "summary": explain.summarise(ds, probability, factors),
        "model_metrics": registry.metrics(request.dataset, request.model)["metrics"],
        "calibration": registry.metrics(request.dataset, request.model)["calibration"],
        "caveat": CAVEAT,
    }


@app.get(
    "/evaluation/{dataset}/{model}", response_model=EvaluationOut, tags=["evaluation"]
)
def evaluation(dataset: str, model: str) -> dict:
    """ROC and PR curves, confusion matrix, and — for the dataset's selected
    model — the fidelity, stability and comprehensibility scores from
    notebook 05."""
    _dataset_or_404(dataset)
    _model_or_404(dataset, model)
    e = dict(registry.metrics(dataset, model))
    quality = registry.explanation_quality
    if e["is_best"]:
        e["fidelity"] = quality["fidelity"][dataset]
        e["stability"] = quality["stability"][dataset]
        e["comprehensibility"] = quality["comprehensibility"][dataset]
    return e


@app.get("/explainability", tags=["explainability"])
def explainability() -> dict:
    """Everything the dedicated explainability page needs: the three quality
    metrics per dataset, global SHAP importance, and the method notes."""
    return {
        "method_notes": registry.method_notes,
        "best_models": registry.best_models,
        "datasets": {
            slug: {
                "slug": slug,
                "title": ds.title,
                "positive_label": ds.positive_label,
                "model_label": schema.MODEL_LABELS[registry.best_models[slug]],
                "fidelity": registry.explanation_quality["fidelity"][slug],
                "stability": registry.explanation_quality["stability"][slug],
                "comprehensibility": registry.explanation_quality[
                    "comprehensibility"
                ][slug],
                "global_importance": registry.global_importance[slug],
                "metrics": registry.metrics(slug, registry.best_models[slug])[
                    "metrics"
                ],
            }
            for slug, ds in schema.DATASETS.items()
        },
    }


@app.get("/explainability/{dataset}/cases", tags=["explainability"])
def cases(dataset: str) -> dict:
    """The five representative test patients from notebook 04 — including the
    false negative, which is the case a clinician most needs to interrogate."""
    _dataset_or_404(dataset)
    return registry.case_studies[dataset]
