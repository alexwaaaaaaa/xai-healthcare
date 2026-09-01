"""Single source of truth for dataset and feature metadata.

Everything downstream reads from here:
  * notebooks 01-05 (encoding, grouping, plain-English factor text)
  * the FastAPI request validators (`lo`/`hi` become Pydantic range checks)
  * the Next.js form (served as JSON from `GET /datasets`)

Keeping one registry is why the form, the validator and the SHAP labels can
never drift apart.
"""

from __future__ import annotations

from dataclasses import asdict, dataclass, field
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw"
PROCESSED = ROOT / "data" / "processed"
MODELS = ROOT / "models"
RESULTS = ROOT / "results"

GROUPS = [
    "demographics",
    "history",
    "sti_history",
    "diagnoses",
    "vitals",
    "tumour",
    "labs",
    "morphology_mean",
    "morphology_se",
    "morphology_worst",
]
GROUP_LABELS = {
    "demographics": "Demographics",
    "history": "Medical history",
    "sti_history": "Sexual & STI history",
    "diagnoses": "Prior diagnoses",
    "vitals": "Vitals & examination",
    "tumour": "Tumour characteristics",
    "labs": "Laboratory results",
    "morphology_mean": "Nucleus morphology — mean",
    "morphology_se": "Nucleus morphology — variability",
    "morphology_worst": "Nucleus morphology — worst",
}


@dataclass(frozen=True)
class Feature:
    name: str
    label: str
    group: str
    lo: float
    hi: float
    kind: str = "numeric"  # numeric | binary | ordinal
    unit: str = ""
    decimals: int = 0
    choices: dict[int, str] | None = None
    # Direction used to phrase plain-English explanations. True when a high
    # value is clinically concerning, False when a low value is.
    higher_is_worse: bool | None = None
    description: str = ""
    default: float | None = None


@dataclass(frozen=True)
class Dataset:
    slug: str
    title: str
    source: str
    citation: str
    rows: int
    positive_label: str
    negative_label: str
    outcome: str
    features: list[Feature]
    clinical_context: str
    # Preprocessing decisions, documented here so notebook 02 and the API agree.
    imputer: str = "median"  # median | knn
    # Columns where 0 is a sentinel for "not recorded" rather than a real value.
    # Values outside a Feature's declared [lo, hi] are handled generically in
    # `xai.data.load_raw`, so there is no separate implausible-value list.
    zero_as_missing: tuple[str, ...] = ()
    drop_columns: tuple[str, ...] = ()
    string_encodings: dict[str, dict[str, int]] = field(default_factory=dict)
    preprocessing_note: str = ""
    primary: bool = False

    @property
    def feature_names(self) -> list[str]:
        return [f.name for f in self.features]

    def feature(self, name: str) -> Feature:
        return next(f for f in self.features if f.name == name)


def _f(name, label, group, lo, hi, **kw) -> Feature:
    return Feature(name=name, label=label, group=group, lo=lo, hi=hi, **kw)


YES_NO = {0: "No", 1: "Yes"}

# ---------------------------------------------------------------------------
# 1. Heart Disease (Cleveland) — primary dataset
# ---------------------------------------------------------------------------
HEART_DISEASE = Dataset(
    slug="heart_disease",
    title="Heart Disease (Cleveland)",
    source="https://archive.ics.uci.edu/dataset/45/heart+disease",
    citation=(
        "Janosi, A., Steinbrunn, W., Pfisterer, M., & Detrano, R. (1989). "
        "Heart Disease. UCI Machine Learning Repository."
    ),
    rows=303,
    positive_label="Heart disease present",
    negative_label="No heart disease",
    outcome="Angiographic coronary artery disease (>50% narrowing in any major vessel)",
    clinical_context=(
        "The most widely benchmarked cardiology dataset in the interpretable-ML "
        "literature. 303 patients from the Cleveland Clinic Foundation, with the "
        "outcome established by cardiac catheterisation rather than by clinician "
        "impression, which is why it is a credible reference standard."
    ),
    imputer="median",
    preprocessing_note=(
        "Only `ca` (4 rows) and `thal` (2 rows) are missing, so median imputation "
        "is sufficient; a KNN imputer would add cost with nothing to gain. The UCI "
        "target `num` encodes severity 0-4 and is binarised as num > 0, the "
        "standard framing in the literature."
    ),
    primary=True,
    features=[
        _f("age", "Age", "demographics", 20, 100, unit="years",
           higher_is_worse=True, default=54,
           description="Patient age at presentation."),
        _f("sex", "Sex", "demographics", 0, 1, kind="binary",
           choices={0: "Female", 1: "Male"}, default=1,
           description="Male sex carries higher baseline coronary risk."),
        _f("cp", "Chest pain type", "vitals", 1, 4, kind="ordinal",
           choices={1: "Typical angina", 2: "Atypical angina",
                    3: "Non-anginal pain", 4: "Asymptomatic"}, default=4,
           description="Character of presenting chest pain."),
        _f("trestbps", "Resting blood pressure", "vitals", 80, 220, unit="mm Hg",
           higher_is_worse=True, default=131,
           description="Systolic blood pressure on admission."),
        _f("chol", "Serum cholesterol", "labs", 100, 600, unit="mg/dL",
           higher_is_worse=True, default=246,
           description="Total serum cholesterol."),
        _f("fbs", "Fasting blood sugar > 120 mg/dL", "labs", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0,
           description="Proxy marker for diabetes."),
        _f("restecg", "Resting ECG", "vitals", 0, 2, kind="ordinal",
           choices={0: "Normal", 1: "ST-T wave abnormality",
                    2: "Left ventricular hypertrophy"}, default=1,
           description="Resting electrocardiogram findings."),
        _f("thalach", "Maximum heart rate achieved", "vitals", 60, 220, unit="bpm",
           higher_is_worse=False, default=150,
           description="Peak heart rate during exercise testing. A blunted peak "
                       "suggests impaired coronary reserve."),
        _f("exang", "Exercise-induced angina", "vitals", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0,
           description="Chest pain provoked by the exercise test."),
        _f("oldpeak", "ST depression (exercise vs rest)", "vitals", 0, 7,
           unit="mm", decimals=1, higher_is_worse=True, default=1.0,
           description="Magnitude of exercise-induced ST-segment depression."),
        _f("slope", "ST segment slope at peak exercise", "vitals", 1, 3,
           kind="ordinal",
           choices={1: "Upsloping", 2: "Flat", 3: "Downsloping"}, default=2,
           description="Shape of the ST segment at peak exercise."),
        _f("ca", "Major vessels coloured by fluoroscopy", "labs", 0, 3,
           kind="ordinal", choices={0: "0", 1: "1", 2: "2", 3: "3"},
           higher_is_worse=True, default=0,
           description="Number of major vessels with visible narrowing."),
        _f("thal", "Thallium perfusion scan", "labs", 3, 7, kind="ordinal",
           choices={3: "Normal", 6: "Fixed defect", 7: "Reversible defect"},
           default=3,
           description="Myocardial perfusion imaging result."),
    ],
)

# ---------------------------------------------------------------------------
# 2. Heart Failure Clinical Records
# ---------------------------------------------------------------------------
HEART_FAILURE = Dataset(
    slug="heart_failure",
    title="Heart Failure Clinical Records",
    source="https://archive.ics.uci.edu/dataset/519",
    citation=(
        "Chicco, D., & Jurman, G. (2020). Machine learning can predict survival "
        "of patients with heart failure from serum creatinine and ejection "
        "fraction alone. BMC Medical Informatics and Decision Making, 20(1), 16."
    ),
    rows=299,
    positive_label="Death during follow-up",
    negative_label="Survived follow-up",
    outcome="All-cause death within the follow-up period",
    clinical_context=(
        "299 patients with left-ventricular systolic dysfunction. Chicco & Jurman "
        "showed serum creatinine and ejection fraction alone carry most of the "
        "predictive signal, which gives this dataset a published ground truth to "
        "check our SHAP rankings against."
    ),
    imputer="median",
    drop_columns=("time",),
    preprocessing_note=(
        "`time` (days of follow-up) is dropped. It is not a patient characteristic "
        "but an artefact of when observation stopped: short follow-up correlates "
        "with early death, so keeping it inflates AUC to ~0.9 through target "
        "leakage and produces an explanation ('this patient was observed for a "
        "short time') that is useless at the bedside. Dropping it is the honest "
        "choice and is exactly the shortcut-learning failure mode this project "
        "exists to surface."
    ),
    features=[
        _f("age", "Age", "demographics", 40, 100, unit="years",
           higher_is_worse=True, default=60,
           description="Patient age."),
        _f("sex", "Sex", "demographics", 0, 1, kind="binary",
           choices={0: "Female", 1: "Male"}, default=1),
        _f("smoking", "Smoker", "history", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0),
        _f("diabetes", "Diabetes", "history", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0),
        _f("high_blood_pressure", "Hypertension", "history", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0),
        _f("anaemia", "Anaemia", "labs", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0,
           description="Haematocrit or haemoglobin below the reference range."),
        _f("ejection_fraction", "Ejection fraction", "vitals", 10, 80, unit="%",
           higher_is_worse=False, default=38,
           description="Percentage of blood leaving the heart per contraction. "
                       "Below 40% indicates systolic heart failure."),
        _f("serum_creatinine", "Serum creatinine", "labs", 0.4, 10, unit="mg/dL",
           decimals=2, higher_is_worse=True, default=1.1,
           description="Kidney function marker; rises as renal perfusion falls."),
        _f("serum_sodium", "Serum sodium", "labs", 110, 150, unit="mEq/L",
           higher_is_worse=False, default=137,
           description="Hyponatraemia is an adverse prognostic sign in heart failure."),
        _f("creatinine_phosphokinase", "Creatinine phosphokinase (CPK)", "labs",
           20, 8000, unit="mcg/L", higher_is_worse=True, default=250,
           description="Enzyme released when muscle tissue is damaged."),
        _f("platelets", "Platelet count", "labs", 25000, 850000,
           unit="platelets/mL", higher_is_worse=None, default=262000,
           description="Platelet concentration in the blood."),
    ],
)

# ---------------------------------------------------------------------------
# 3. Pima Indians Diabetes
# ---------------------------------------------------------------------------
DIABETES = Dataset(
    slug="diabetes",
    title="Pima Indians Diabetes",
    source="https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database",
    citation=(
        "Smith, J. W., Everhart, J. E., Dickson, W. C., Knowler, W. C., & "
        "Johannes, R. S. (1988). Using the ADAP learning algorithm to forecast "
        "the onset of diabetes mellitus. Proc. Symp. Comp. Appl. Med. Care."
    ),
    rows=768,
    positive_label="Diabetes onset",
    negative_label="No diabetes onset",
    outcome="Onset of type-2 diabetes within five years of examination",
    clinical_context=(
        "768 female patients of Pima heritage aged 21 and over. Widely used, and "
        "widely mis-used: five columns encode missing measurements as 0, so any "
        "pipeline that takes the file at face value trains on physiologically "
        "impossible patients."
    ),
    imputer="median",
    zero_as_missing=("Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI"),
    preprocessing_note=(
        "Glucose, BloodPressure, SkinThickness, Insulin and BMI use 0 as a missing "
        "marker (a BMI of 0 is not a patient). These zeros are converted to NaN "
        "before imputation; Insulin alone is 48.7% missing. Four further "
        "BloodPressure values survive that filter but are still impossible — 24, "
        "30, 30 and 38 mm Hg diastolic, which is shock territory, not an "
        "outpatient — and are dropped by the out-of-range rule. Median imputation "
        "is used because these lab distributions are right-skewed, so the mean "
        "would be dragged upward by outliers."
    ),
    features=[
        _f("Age", "Age", "demographics", 21, 90, unit="years",
           higher_is_worse=True, default=33),
        _f("Pregnancies", "Number of pregnancies", "demographics", 0, 20,
           higher_is_worse=True, default=3,
           description="Gestational history is an established risk factor."),
        _f("DiabetesPedigreeFunction", "Diabetes pedigree function",
           "demographics", 0.05, 2.5, decimals=3, higher_is_worse=True,
           default=0.47,
           description="Synthesised score for family history of diabetes."),
        _f("BMI", "Body mass index", "vitals", 15, 70, unit="kg/m²", decimals=1,
           higher_is_worse=True, default=32.0),
        _f("BloodPressure", "Diastolic blood pressure", "vitals", 40, 140,
           unit="mm Hg", higher_is_worse=True, default=72),
        _f("SkinThickness", "Triceps skin fold thickness", "vitals", 5, 100,
           unit="mm", higher_is_worse=True, default=23,
           description="Proxy measure for subcutaneous body fat."),
        _f("Glucose", "Plasma glucose (2-hour OGTT)", "labs", 40, 250,
           unit="mg/dL", higher_is_worse=True, default=117,
           description="Plasma glucose two hours into an oral tolerance test. "
                       "The single strongest predictor in this cohort."),
        _f("Insulin", "2-hour serum insulin", "labs", 10, 900, unit="mu U/mL",
           higher_is_worse=True, default=125),
    ],
)

# ---------------------------------------------------------------------------
# 4. Chronic Kidney Disease
# ---------------------------------------------------------------------------
NORMAL_ABNORMAL = {0: "Normal", 1: "Abnormal"}
ABSENT_PRESENT = {0: "Not present", 1: "Present"}

KIDNEY_DISEASE = Dataset(
    slug="kidney_disease",
    title="Chronic Kidney Disease",
    source="https://archive.ics.uci.edu/dataset/336",
    citation=(
        "Rubini, L., Soundarapandian, P., & Eswaran, P. (2015). Chronic Kidney "
        "Disease. UCI Machine Learning Repository."
    ),
    rows=400,
    positive_label="Chronic kidney disease",
    negative_label="No chronic kidney disease",
    outcome="Clinical diagnosis of chronic kidney disease",
    clinical_context=(
        "400 records collected over two months at an Indian hospital. Among the "
        "harder cohorts to handle honestly: 24 features and heavy, non-random "
        "missingness (red blood cell morphology absent in 38% of records), because "
        "clinicians only order a test when they already suspect something."
    ),
    imputer="knn",
    preprocessing_note=(
        "KNN imputation (k=5) rather than median. Missingness reaches 38% for `rbc` "
        "and 33% for `rbcc`, and it is not random: a test is ordered because the "
        "clinician already suspects disease. Filling 152 rows with one median value "
        "would collapse that variance and manufacture a fake modal patient, so "
        "neighbouring complete records are used instead. Categorical strings are "
        "whitespace-stripped first (the raw file contains '\\tno' and '\\tyes'). One "
        "serum sodium reads 4.5 mEq/L against a human range of 135-145; it is a "
        "data-entry error and is dropped by the out-of-range rule rather than "
        "imputed from."
    ),
    string_encodings={
        "rbc": {"normal": 0, "abnormal": 1},
        "pc": {"normal": 0, "abnormal": 1},
        "pcc": {"notpresent": 0, "present": 1},
        "ba": {"notpresent": 0, "present": 1},
        "htn": {"no": 0, "yes": 1},
        "dm": {"no": 0, "yes": 1},
        "cad": {"no": 0, "yes": 1},
        "appet": {"good": 0, "poor": 1},
        "pe": {"no": 0, "yes": 1},
        "ane": {"no": 0, "yes": 1},
    },
    features=[
        _f("age", "Age", "demographics", 1, 100, unit="years",
           higher_is_worse=True, default=51),
        _f("htn", "Hypertension", "history", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0),
        _f("dm", "Diabetes mellitus", "history", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0),
        _f("cad", "Coronary artery disease", "history", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0),
        _f("bp", "Blood pressure", "vitals", 40, 200, unit="mm Hg",
           higher_is_worse=True, default=76),
        _f("appet", "Appetite", "vitals", 0, 1, kind="binary",
           choices={0: "Good", 1: "Poor"}, higher_is_worse=True, default=0),
        _f("pe", "Pedal oedema", "vitals", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0,
           description="Swelling of the feet from fluid retention."),
        _f("ane", "Anaemia", "labs", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0),
        _f("sg", "Urine specific gravity", "labs", 1.005, 1.025, decimals=3,
           kind="ordinal", higher_is_worse=False, default=1.02,
           description="Urine concentration; falls as the kidney loses its "
                       "ability to concentrate urine."),
        _f("al", "Urine albumin", "labs", 0, 5, kind="ordinal",
           higher_is_worse=True, default=0,
           description="Graded 0-5. Protein in urine is a core marker of "
                       "glomerular damage."),
        _f("su", "Urine sugar", "labs", 0, 5, kind="ordinal",
           higher_is_worse=True, default=0, description="Graded 0-5."),
        _f("rbc", "Red blood cells (urine microscopy)", "labs", 0, 1,
           kind="binary", choices=NORMAL_ABNORMAL, higher_is_worse=True,
           default=0),
        _f("pc", "Pus cells", "labs", 0, 1, kind="binary",
           choices=NORMAL_ABNORMAL, higher_is_worse=True, default=0),
        _f("pcc", "Pus cell clumps", "labs", 0, 1, kind="binary",
           choices=ABSENT_PRESENT, higher_is_worse=True, default=0),
        _f("ba", "Bacteria", "labs", 0, 1, kind="binary",
           choices=ABSENT_PRESENT, higher_is_worse=True, default=0),
        _f("bgr", "Random blood glucose", "labs", 20, 500, unit="mg/dL",
           higher_is_worse=True, default=121),
        _f("bu", "Blood urea", "labs", 1, 400, unit="mg/dL",
           higher_is_worse=True, default=44),
        _f("sc", "Serum creatinine", "labs", 0.4, 80, unit="mg/dL", decimals=2,
           higher_is_worse=True, default=1.3,
           description="Primary marker of glomerular filtration."),
        _f("sod", "Serum sodium", "labs", 100, 165, unit="mEq/L",
           higher_is_worse=False, default=137),
        _f("pot", "Serum potassium", "labs", 2, 50, unit="mEq/L", decimals=1,
           higher_is_worse=True, default=4.6),
        _f("hemo", "Haemoglobin", "labs", 3, 18, unit="g/dL", decimals=1,
           higher_is_worse=False, default=12.5,
           description="Falls in chronic kidney disease as erythropoietin "
                       "production declines."),
        _f("pcv", "Packed cell volume", "labs", 9, 55, unit="%",
           higher_is_worse=False, default=38),
        _f("wbcc", "White blood cell count", "labs", 2000, 27000,
           unit="cells/cumm", higher_is_worse=True, default=8000),
        _f("rbcc", "Red blood cell count", "labs", 2, 8, unit="millions/cmm",
           decimals=1, higher_is_worse=False, default=4.7),
    ],
)

from .cancer import CANCER_DATASETS  # noqa: E402  (needs the types defined above)

DATASETS: dict[str, Dataset] = {
    d.slug: d
    for d in (
        HEART_DISEASE,
        HEART_FAILURE,
        DIABETES,
        KIDNEY_DISEASE,
        *CANCER_DATASETS,
    )
}

#: Datasets whose outcome is an oncological one, used to group them in the UI.
ONCOLOGY = tuple(d.slug for d in CANCER_DATASETS)

MODEL_NAMES = ["logistic_regression", "random_forest", "xgboost"]
MODEL_LABELS = {
    "logistic_regression": "Logistic Regression",
    "random_forest": "Random Forest",
    "xgboost": "XGBoost",
}


def get(slug: str) -> Dataset:
    if slug not in DATASETS:
        raise KeyError(f"unknown dataset '{slug}'. known: {list(DATASETS)}")
    return DATASETS[slug]


def as_dict(ds: Dataset) -> dict:
    """JSON-serialisable view, used by `GET /datasets` and the Next.js form."""
    d = asdict(ds)
    d["feature_groups"] = [
        {
            "key": g,
            "label": GROUP_LABELS[g],
            "features": [asdict(f) for f in ds.features if f.group == g],
        }
        for g in GROUPS
        if any(f.group == g for f in ds.features)
    ]
    return d


def display_value(ds: Dataset, name: str, value: float) -> str:
    """Human-readable rendering of one feature value, e.g. 246 -> '246 mg/dL'."""
    f = ds.feature(name)
    if f.choices:
        key = round(float(value), 3) if f.name == "sg" else int(round(float(value)))
        if key in f.choices:
            return f.choices[key]
    txt = f"{float(value):.{f.decimals}f}"
    return f"{txt} {f.unit}".strip()
