"""Pydantic v2 request and response models.

The validation here is the trust boundary. A model trained on adults aged 29-77
will happily return a confident probability for an age of 900, and SHAP will
happily explain it — the explanation would be internally consistent and clinically
meaningless. Rejecting out-of-range input with a specific 422 is the only honest
behaviour, so the ranges in `xai/schema.py` are enforced rather than advisory.
"""

from __future__ import annotations

from typing import Annotated, Any, Literal

from pydantic import BaseModel, Field, model_validator

from xai import schema

DatasetSlug = Literal[
    "heart_disease",
    "heart_failure",
    "diabetes",
    "kidney_disease",
    "breast_cancer",
    "breast_cancer_recurrence",
    "breast_cancer_survival",
    "cervical_cancer",
    "lung_cancer_surgery",
]
ModelName = Literal["logistic_regression", "random_forest", "xgboost"]

# The Literal is spelled out because it is what gives the OpenAPI schema (and the
# generated client) a real enum. This assertion is what stops it drifting from the
# registry: add a dataset to `xai/schema.py` and forget this list, and the API
# fails at import rather than 404-ing at runtime.
_declared = set(DatasetSlug.__args__)
_registered = set(schema.DATASETS)
if _declared != _registered:
    raise RuntimeError(
        "DatasetSlug is out of sync with xai.schema.DATASETS: "
        f"missing here {sorted(_registered - _declared)}, "
        f"unknown to the registry {sorted(_declared - _registered)}"
    )


# --------------------------------------------------------------------------
# metadata
# --------------------------------------------------------------------------

class FeatureOut(BaseModel):
    name: str
    label: str
    group: str
    kind: str
    lo: float
    hi: float
    unit: str
    decimals: int
    choices: dict[int, str] | None = None
    higher_is_worse: bool | None = None
    description: str
    default: float | None = None


class FeatureGroupOut(BaseModel):
    key: str
    label: str
    features: list[FeatureOut]


class DatasetOut(BaseModel):
    slug: str
    title: str
    source: str
    citation: str
    rows: int
    positive_label: str
    negative_label: str
    outcome: str
    clinical_context: str
    preprocessing_note: str
    imputer: str
    primary: bool
    dropped_columns: list[str]
    feature_count: int
    feature_groups: list[FeatureGroupOut]
    best_model: str
    best_model_label: str


class CalibrationOut(BaseModel):
    """Whether the returned probability can be read as an absolute risk.

    Class weighting was tuned as a hyperparameter, and the search chose it on the
    imbalanced cohorts. That helps recall and leaves the probability scaled toward
    50% instead of toward the cohort's prevalence, so the number becomes a ranking
    score rather than a risk. Shipping this beside every prediction is what stops
    the dashboard quietly overstating a patient's risk.
    """

    class_weighted: bool
    test_prevalence: float
    mean_predicted_probability: float
    inflation_ratio: float
    calibrated: bool
    note: str


class ModelSummaryOut(BaseModel):
    dataset: str
    model: ModelName
    label: str
    is_best: bool
    best_params: dict[str, Any]
    cv_roc_auc: float
    metrics: dict[str, float]
    confusion_matrix: dict[str, int]
    calibration: CalibrationOut
    test_n: int


# --------------------------------------------------------------------------
# prediction
# --------------------------------------------------------------------------

class PredictRequest(BaseModel):
    dataset: DatasetSlug
    model: ModelName = "random_forest"
    patient_features: dict[str, float] = Field(
        ...,
        description="Every feature of the chosen dataset, in its clinical unit "
                    "(not standardised). Use GET /datasets/{slug} for the "
                    "expected names and ranges.",
    )
    include_lime: bool = Field(
        True, description="Set false to skip LIME, which is the slow part."
    )

    @model_validator(mode="after")
    def check_against_training_schema(self) -> "PredictRequest":
        ds = schema.get(self.dataset)
        expected = set(ds.feature_names)
        supplied = set(self.patient_features)

        problems: list[str] = []
        if missing := sorted(expected - supplied):
            problems.append(f"missing features: {', '.join(missing)}")
        if unknown := sorted(supplied - expected):
            problems.append(
                f"unknown features for '{self.dataset}': {', '.join(unknown)}"
            )

        for name in sorted(expected & supplied):
            feature = ds.feature(name)
            value = self.patient_features[name]
            if value != value:  # NaN
                problems.append(f"{name}: NaN is not accepted")
                continue
            if not (feature.lo <= value <= feature.hi):
                unit = f" {feature.unit}" if feature.unit else ""
                problems.append(
                    f"{name} ({feature.label}) = {value}{unit} is outside the "
                    f"plausible range {feature.lo}-{feature.hi}{unit} the model "
                    f"was trained on"
                )
            elif feature.choices and name != "sg":
                allowed = sorted(feature.choices)
                if int(round(value)) not in allowed:
                    problems.append(
                        f"{name} ({feature.label}) = {value} is not one of the "
                        f"permitted categories {allowed}"
                    )

        if problems:
            raise ValueError("; ".join(problems))
        return self


class FactorOut(BaseModel):
    feature: str
    label: str
    value: float
    value_display: str
    shap_value: float
    direction: Literal["increases", "decreases"]
    level: str
    sentence: str


class ContributionOut(BaseModel):
    feature: str
    label: str
    group: str
    value: float
    value_display: str
    shap_value: float


class PredictResponse(BaseModel):
    dataset: str
    dataset_title: str
    model: str
    model_label: str
    prediction: int
    prediction_label: str
    probability: float = Field(..., ge=0.0, le=1.0)
    risk_band: Literal["low", "moderate", "high"]
    threshold: float
    base_value: float
    shap_values: dict[str, float]
    contributions: list[ContributionOut]
    lime_explanation: list[tuple[str, float]]
    lime_labelled: list[ContributionOut]
    top_factors: list[FactorOut]
    summary: str
    model_metrics: dict[str, float]
    calibration: CalibrationOut
    caveat: str


# --------------------------------------------------------------------------
# evaluation / explainability
# --------------------------------------------------------------------------

class CurvePoint(BaseModel):
    x: float
    y: float


class EvaluationOut(BaseModel):
    dataset: str
    dataset_title: str
    model: str
    model_label: str
    is_best: bool
    metrics: dict[str, float]
    confusion_matrix: dict[str, int]
    calibration: CalibrationOut
    roc_curve: list[dict[str, float]]
    pr_curve: list[dict[str, float]]
    best_params: dict[str, Any]
    cv_roc_auc: float
    test_n: int
    fidelity: dict[str, Any] | None = None
    stability: dict[str, Any] | None = None
    comprehensibility: dict[str, Any] | None = None


class HealthOut(BaseModel):
    status: Literal["ok", "loading"]
    models_loaded: int
    explainers_loaded: int
    datasets: list[str]
    version: str


Probability = Annotated[float, Field(ge=0.0, le=1.0)]
