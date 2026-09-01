"""Oncology cohorts.

Five public, cited cancer datasets covering four distinct clinical questions:
diagnosis (is this mass malignant), recurrence, surgical survival, and screening
(does this patient have biopsy-confirmed disease).

Kept separate from `schema.py` only for length — the registry in `schema.py`
merges them, and they are ordinary `Dataset` objects with no special handling.

Two candidates were considered and rejected, recorded here so the omission reads
as a decision:

* **UCI 62, "Lung Cancer"** — 32 patients against 56 features across three
  classes. Any model fits noise, and a reported accuracy would be theatre.
* **UCI 83, "Primary Tumor"** — 21 tumour-site classes, several with a single
  case. This pipeline is binary throughout, and collapsing 21 sites into two
  would invent a clinical question nobody asked.
"""

from __future__ import annotations

from .schema import YES_NO, Dataset, _f

# ---------------------------------------------------------------------------
# 1. Breast Cancer Wisconsin (Diagnostic)
# ---------------------------------------------------------------------------
# Ten nucleus measurements, each reported three ways: mean, standard error and
# "worst" (mean of the three largest values). The suffixes 1/2/3 in the raw file
# are those three statistics, which is why the labels below disambiguate them —
# "radius3" tells a clinician nothing.
#
# (stem, label, unit, (mean range, se range, worst range), higher_is_worse)
_MORPHOLOGY = [
    ("radius", "Radius", "µm", ((6, 30), (0.1, 3.5), (7, 40)), True),
    ("texture", "Texture (grey-scale s.d.)", "", ((9, 42), (0.3, 5.5), (12, 55)), True),
    ("perimeter", "Perimeter", "µm", ((40, 200), (0.7, 25), (50, 275)), True),
    ("area", "Area", "µm²", ((140, 2600), (6, 600), (185, 4500)), True),
    ("smoothness", "Smoothness", "", ((0.04, 0.18), (0.001, 0.04), (0.07, 0.25)), True),
    ("compactness", "Compactness", "", ((0.01, 0.4), (0.002, 0.15), (0.02, 1.2)), True),
    ("concavity", "Concavity", "", ((0, 0.5), (0, 0.45), (0, 1.35)), True),
    ("concave_points", "Concave points", "", ((0, 0.25), (0, 0.06), (0, 0.32)), True),
    ("symmetry", "Symmetry", "", ((0.09, 0.35), (0.007, 0.09), (0.15, 0.7)), None),
    ("fractal_dimension", "Fractal dimension", "",
     ((0.04, 0.11), (0.0008, 0.035), (0.05, 0.22)), None),
]

_MORPH_DEFAULTS = {
    # Cohort medians, so the form opens on a plausible mass.
    "radius1": 13.37, "texture1": 18.84, "perimeter1": 86.24, "area1": 551,
    "smoothness1": 0.0959, "compactness1": 0.0926, "concavity1": 0.0615,
    "concave_points1": 0.0335, "symmetry1": 0.1792, "fractal_dimension1": 0.0615,
    "radius2": 0.324, "texture2": 1.108, "perimeter2": 2.287, "area2": 24.53,
    "smoothness2": 0.0064, "compactness2": 0.0205, "concavity2": 0.0259,
    "concave_points2": 0.0109, "symmetry2": 0.0187, "fractal_dimension2": 0.0032,
    "radius3": 14.97, "texture3": 25.41, "perimeter3": 97.66, "area3": 686,
    "smoothness3": 0.1313, "compactness3": 0.2119, "concavity3": 0.2267,
    "concave_points3": 0.0999, "symmetry3": 0.2822, "fractal_dimension3": 0.0800,
}

_MORPH_STATS = {
    1: ("mean", "morphology_mean", "mean across the nuclei in the image"),
    2: ("variability", "morphology_se", "standard error across the nuclei"),
    3: ("worst", "morphology_worst", "mean of the three largest values"),
}


def _precision(lo: float, hi: float) -> int:
    """Decimal places that make a range enterable without a useless step size.

    The three statistics span very different magnitudes for the same quantity —
    nucleus area runs 140-2600 as a mean and 0.0008-0.03 as a fractal-dimension
    standard error — so precision is derived from the range rather than hard-coded
    per feature. A fixed value gives either an unusable spinner step (0.00001 on a
    600-wide range) or a field that cannot express its own smallest value.
    """
    span = hi - lo
    if span >= 100:
        return 0
    if span >= 10:
        return 1
    if span >= 1:
        return 2
    if span >= 0.1:
        return 3
    if span >= 0.01:
        return 4
    return 5


def _morphology_features() -> list:
    out = []
    for suffix, (stat_label, group, stat_desc) in _MORPH_STATS.items():
        for stem, label, unit, ranges, worse_high in _MORPHOLOGY:
            lo, hi = ranges[suffix - 1]
            out.append(
                _f(
                    f"{stem}{suffix}",
                    f"{label} ({stat_label})",
                    group,
                    lo,
                    hi,
                    unit=unit,
                    decimals=_precision(lo, hi),
                    higher_is_worse=worse_high,
                    default=_MORPH_DEFAULTS[f"{stem}{suffix}"],
                    description=f"{label}, {stat_desc}.",
                )
            )
    return out


BREAST_CANCER = Dataset(
    slug="breast_cancer",
    title="Breast Cancer Wisconsin (Diagnostic)",
    source="https://archive.ics.uci.edu/dataset/17",
    citation=(
        "Wolberg, W. H., Street, W. N., & Mangasarian, O. L. (1995). Breast "
        "Cancer Wisconsin (Diagnostic). UCI Machine Learning Repository."
    ),
    rows=569,
    positive_label="Malignant",
    negative_label="Benign",
    outcome="Malignancy of a breast mass, established by biopsy",
    clinical_context=(
        "569 fine-needle aspirates of breast masses, digitised and measured. Ten "
        "nucleus features are each reported three ways — mean, standard error and "
        "worst — giving 30 columns describing only ten underlying quantities. That "
        "redundancy is the interesting part: radius, perimeter and area are three "
        "measurements of one thing and correlate above 0.98, so SHAP must split "
        "credit between them."
    ),
    imputer="median",
    preprocessing_note=(
        "No missing values and no sentinel codes — unusually clean. Median "
        "imputation is fitted anyway so the pipeline shape is uniform across "
        "datasets, but it has nothing to do. The real caution here is collinearity, "
        "not missingness: radius, perimeter and area are geometrically dependent "
        "(area grows with the square of radius), so their individual SHAP values "
        "each understate the importance of 'nucleus size' as a concept."
    ),
    features=_morphology_features(),
)

# ---------------------------------------------------------------------------
# 2. Breast Cancer Recurrence (Ljubljana)
# ---------------------------------------------------------------------------
# The raw file stores banded values as strings ("20-24"). They are encoded to the
# band midpoint in real units rather than to an ordinal index, so a SHAP
# explanation reads "tumour size of 22 mm" instead of "tumour-size category 5".
BREAST_CANCER_RECURRENCE = Dataset(
    slug="breast_cancer_recurrence",
    title="Breast Cancer Recurrence (Ljubljana)",
    source="https://archive.ics.uci.edu/dataset/14",
    citation=(
        "Zwitter, M., & Soklic, M. (1988). Breast Cancer. University Medical "
        "Centre, Institute of Oncology, Ljubljana. UCI Machine Learning Repository."
    ),
    rows=286,
    positive_label="Recurrence",
    negative_label="No recurrence",
    outcome="Recurrence of breast cancer during the follow-up period",
    clinical_context=(
        "286 patients followed after treatment. Everything is recorded in bands "
        "rather than exact values — age in decades, tumour size in 5 mm bins — "
        "which caps how precise any explanation can be: the model cannot "
        "distinguish a 20 mm tumour from a 24 mm one because the data does not."
    ),
    imputer="median",
    string_encodings={
        # Bands mapped to their midpoint in clinical units.
        "age": {"20-29": 25, "30-39": 35, "40-49": 45, "50-59": 55,
                "60-69": 65, "70-79": 75},
        "tumor-size": {"0-4": 2, "5-9": 7, "10-14": 12, "15-19": 17, "20-24": 22,
                       "25-29": 27, "30-34": 32, "35-39": 37, "40-44": 42,
                       "45-49": 47, "50-54": 52},
        "inv-nodes": {"0-2": 1, "3-5": 4, "6-8": 7, "9-11": 10, "12-14": 13,
                      "15-17": 16, "24-26": 25},
        "menopause": {"lt40": 0, "premeno": 1, "ge40": 2},
        "node-caps": {"no": 0, "yes": 1},
        "breast": {"left": 0, "right": 1},
        "breast-quad": {"central": 0, "left_low": 1, "left_up": 2,
                        "right_low": 3, "right_up": 4},
        "irradiat": {"no": 0, "yes": 1},
    },
    preprocessing_note=(
        "The UCI-hosted copy of this file has been through Excel, which converted "
        "numeric ranges into dates: `tumor-size` contained '14-Oct' where the "
        "value is '10-14', and `inv-nodes` contained '5-Mar' for '3-5'. "
        "`scripts/download_data.py` repairs six such values and raises if it meets "
        "an unrepaired one, because an ordinal encoder would otherwise rank the "
        "mangled strings and train on nonsense. Banded values are then mapped to "
        "their midpoint in real units so explanations read in millimetres and node "
        "counts. Nine missing `node-caps` and one `breast-quad` are median-imputed."
    ),
    features=[
        _f("age", "Age band (midpoint)", "demographics", 25, 75, unit="years",
           higher_is_worse=None, default=55,
           description="Recorded in decades; shown as the band midpoint."),
        _f("menopause", "Menopausal status", "demographics", 0, 2, kind="ordinal",
           choices={0: "Pre-40 menopause", 1: "Premenopausal",
                    2: "Menopause at 40 or later"}, default=1),
        _f("tumor-size", "Tumour size (band midpoint)", "tumour", 2, 52,
           unit="mm", higher_is_worse=True, default=22,
           description="Greatest diameter of the excised tumour."),
        _f("inv-nodes", "Involved axillary nodes (band midpoint)", "tumour", 1, 25,
           higher_is_worse=True, default=1,
           description="Number of axillary lymph nodes containing metastatic "
                       "disease — the strongest classical prognostic factor."),
        _f("node-caps", "Node capsular invasion", "tumour", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0,
           description="Tumour has broken through the lymph node capsule."),
        _f("deg-malig", "Histological grade", "tumour", 1, 3, kind="ordinal",
           choices={1: "Grade 1 (well differentiated)",
                    2: "Grade 2 (moderately differentiated)",
                    3: "Grade 3 (poorly differentiated)"},
           higher_is_worse=True, default=2),
        _f("breast", "Affected breast", "tumour", 0, 1, kind="binary",
           choices={0: "Left", 1: "Right"}, default=0,
           description="Laterality carries no prognostic meaning; kept as a "
                       "control feature that SHAP should rank near zero."),
        _f("breast-quad", "Quadrant", "tumour", 0, 4, kind="ordinal",
           choices={0: "Central", 1: "Lower left", 2: "Upper left",
                    3: "Lower right", 4: "Upper right"}, default=2),
        _f("irradiat", "Received radiotherapy", "history", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=None, default=0),
    ],
)

# ---------------------------------------------------------------------------
# 3. Breast Cancer Surgical Survival (Haberman)
# ---------------------------------------------------------------------------
BREAST_CANCER_SURVIVAL = Dataset(
    slug="breast_cancer_survival",
    title="Breast Cancer Surgical Survival (Haberman)",
    source="https://archive.ics.uci.edu/dataset/43",
    citation=(
        "Haberman, S. J. (1976). Generalized Residuals for Log-Linear Models. "
        "Proceedings of the 9th International Biometrics Conference. UCI Machine "
        "Learning Repository."
    ),
    rows=306,
    positive_label="Died within five years",
    negative_label="Survived five years",
    outcome="Death within five years of surgery for breast cancer",
    clinical_context=(
        "306 patients operated on between 1958 and 1969 at the University of "
        "Chicago. Only three features, which makes it the honest counter-example "
        "in this collection: there is a ceiling on how well any model can do, and "
        "an explainability method that produces confident narratives from three "
        "columns is telling you more about itself than about the patient."
    ),
    imputer="median",
    preprocessing_note=(
        "No missing values. `operation_year` is deliberately KEPT, unlike the "
        "`time` column dropped from the heart-failure dataset, and the distinction "
        "is worth stating: `time` was determined by the outcome (patients who died "
        "early were observed for less time), which is leakage. `operation_year` is "
        "a treatment-era covariate that exists before the outcome and is known at "
        "prediction time. It does limit generalisation — nothing here transfers to "
        "modern oncology — but that is a validity limit, not leakage."
    ),
    features=[
        _f("age", "Age at operation", "demographics", 30, 83, unit="years",
           higher_is_worse=True, default=52),
        _f("operation_year", "Year of operation", "demographics", 58, 69,
           unit="19xx", higher_is_worse=None, default=63,
           description="Two-digit year, 1958-1969. A proxy for treatment era, not "
                       "a patient characteristic."),
        _f("positive_auxillary_nodes", "Positive axillary nodes", "tumour", 0, 52,
           higher_is_worse=True, default=1,
           description="Number of axillary lymph nodes found to contain disease."),
    ],
)

# ---------------------------------------------------------------------------
# 4. Cervical Cancer (Risk Factors)
# ---------------------------------------------------------------------------
_STD_CONDITIONS = [
    ("STDs:condylomatosis", "Condylomatosis"),
    ("STDs:vaginal condylomatosis", "Vaginal condylomatosis"),
    ("STDs:vulvo-perineal condylomatosis", "Vulvo-perineal condylomatosis"),
    ("STDs:syphilis", "Syphilis"),
    ("STDs:pelvic inflammatory disease", "Pelvic inflammatory disease"),
    ("STDs:genital herpes", "Genital herpes"),
    ("STDs:molluscum contagiosum", "Molluscum contagiosum"),
    ("STDs:HIV", "HIV"),
    ("STDs:Hepatitis B", "Hepatitis B"),
    ("STDs:HPV", "HPV"),
]

CERVICAL_CANCER = Dataset(
    slug="cervical_cancer",
    title="Cervical Cancer (Risk Factors)",
    source="https://archive.ics.uci.edu/dataset/383",
    citation=(
        "Fernandes, K., Cardoso, J. S., & Fernandes, J. (2017). Transfer Learning "
        "with Partial Observability Applied to Cervical Cancer Screening. Iberian "
        "Conference on Pattern Recognition and Image Analysis. UCI ML Repository."
    ),
    rows=858,
    positive_label="Biopsy-confirmed cervical cancer",
    negative_label="Negative biopsy",
    outcome="Cervical cancer confirmed on biopsy",
    clinical_context=(
        "858 patients at Hospital Universitario de Caracas. The largest cohort in "
        "this project and the most imbalanced: 55 positive biopsies, 6.4%. A model "
        "that predicts 'negative' for everybody scores 93.6% accuracy and finds no "
        "cancer at all, which makes this the clearest demonstration in the whole "
        "project of why accuracy is the wrong headline metric."
    ),
    imputer="knn",
    drop_columns=(
        # 91.7% missing — 787 of 858 rows. Imputing 787 values from 71 observed
        # ones does not recover the variable, it fabricates it.
        "STDs: Time since first diagnosis",
        "STDs: Time since last diagnosis",
        # Provably constant (every value 0), so zero variance and zero
        # information. Kept out of the form rather than shown as a field that
        # cannot affect any prediction.
        "STDs:cervical condylomatosis",
        "STDs:AIDS",
    ),
    preprocessing_note=(
        "The file ships four outcome columns — Hinselmann, Schiller, Citology and "
        "Biopsy — recorded at the same visit. Biopsy is the histological gold "
        "standard and is used as the target; the other three are dropped, because "
        "they are alternative measurements of the same event rather than "
        "predictors of it, and keeping them is textbook leakage. Two columns are "
        "91.7% missing and two are constant; all four such columns are dropped for the reasons "
        "given above. KNN imputation (k=5) is used for the remainder because "
        "missingness here is a patient declining to answer, which is not random. "
        "Six STD columns have a single positive case each and are kept but cannot "
        "generalise — treat any SHAP attribution to them as noise."
    ),
    features=[
        _f("Age", "Age", "demographics", 13, 85, unit="years",
           higher_is_worse=True, default=25),
        _f("Number of sexual partners", "Number of sexual partners",
           "sti_history", 1, 30, higher_is_worse=True, default=2),
        _f("First sexual intercourse", "Age at first intercourse", "sti_history",
           10, 35, unit="years", higher_is_worse=False, default=17),
        _f("Num of pregnancies", "Number of pregnancies", "demographics", 0, 12,
           higher_is_worse=True, default=2),
        _f("Smokes", "Smokes", "history", 0, 1, kind="binary", choices=YES_NO,
           higher_is_worse=True, default=0),
        _f("Smokes (years)", "Years smoked", "history", 0, 40, unit="years",
           decimals=1, higher_is_worse=True, default=0),
        _f("Smokes (packs/year)", "Pack-years", "history", 0, 40, decimals=1,
           higher_is_worse=True, default=0),
        _f("Hormonal Contraceptives", "Hormonal contraceptives", "history", 0, 1,
           kind="binary", choices=YES_NO, higher_is_worse=None, default=1),
        _f("Hormonal Contraceptives (years)", "Years on hormonal contraceptives",
           "history", 0, 32, unit="years", decimals=1, higher_is_worse=None,
           default=0.5),
        _f("IUD", "Intrauterine device", "history", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=None, default=0),
        _f("IUD (years)", "Years with an IUD", "history", 0, 20, unit="years",
           decimals=1, higher_is_worse=None, default=0),
        _f("STDs", "Any sexually transmitted infection", "sti_history", 0, 1,
           kind="binary", choices=YES_NO, higher_is_worse=True, default=0),
        _f("STDs (number)", "Number of STIs", "sti_history", 0, 4,
           higher_is_worse=True, default=0),
        *[
            _f(name, label, "sti_history", 0, 1, kind="binary", choices=YES_NO,
               higher_is_worse=True, default=0)
            for name, label in _STD_CONDITIONS
        ],
        _f("STDs: Number of diagnosis", "Number of STI diagnoses", "sti_history",
           0, 3, higher_is_worse=True, default=0),
        _f("Dx:Cancer", "Previous cancer diagnosis", "diagnoses", 0, 1,
           kind="binary", choices=YES_NO, higher_is_worse=True, default=0,
           description="A prior diagnosis. Watch this one in the SHAP output: it "
                       "sits close to the outcome and a high ranking may indicate "
                       "the model is reading the answer rather than predicting it."),
        _f("Dx:CIN", "Previous cervical intraepithelial neoplasia", "diagnoses",
           0, 1, kind="binary", choices=YES_NO, higher_is_worse=True, default=0),
        _f("Dx:HPV", "Previous HPV diagnosis", "diagnoses", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0),
        _f("Dx", "Any previous diagnosis", "diagnoses", 0, 1, kind="binary",
           choices=YES_NO, higher_is_worse=True, default=0),
    ],
)

# ---------------------------------------------------------------------------
# 5. Lung Cancer Thoracic Surgery
# ---------------------------------------------------------------------------
# The raw column names are opaque codes (PRE4, PRE14, DGN). The meanings come
# from Zieba et al. (2013) and the UCI description; using them as labels is the
# difference between an explanation and a riddle.
TF = {0: "No", 1: "Yes"}

LUNG_CANCER_SURGERY = Dataset(
    slug="lung_cancer_surgery",
    title="Lung Cancer Thoracic Surgery",
    source="https://archive.ics.uci.edu/dataset/277",
    citation=(
        "Zieba, M., Tomczak, J. M., Lubicz, M., & Swiatek, J. (2013). Boosted "
        "SVM for extracting rules from imbalanced data in application to "
        "prediction of the post-operative life expectancy in the lung cancer "
        "patients. Applied Soft Computing. UCI Machine Learning Repository."
    ),
    rows=470,
    positive_label="Died within one year",
    negative_label="Survived one year",
    outcome="Death within one year of major lung resection",
    clinical_context=(
        "470 patients who underwent lung resection at Wroclaw Thoracic Surgery "
        "Centre, 2007-2011. The question is post-operative risk, so the features "
        "are all pre-operative: lung function, symptoms, comorbidities and tumour "
        "stage. 70 deaths, 14.9% — imbalanced enough that recall matters far more "
        "than accuracy."
    ),
    imputer="median",
    string_encodings={
        "DGN": {f"dgn{i}": i for i in range(1, 9)},
        "PRE6": {"prz0": 0, "prz1": 1, "prz2": 2},
        "PRE14": {"oc11": 11, "oc12": 12, "oc13": 13, "oc14": 14},
        **{
            col: {"f": 0, "t": 1}
            for col in ("PRE7", "PRE8", "PRE9", "PRE10", "PRE11", "PRE17",
                        "PRE19", "PRE25", "PRE30", "PRE32")
        },
    },
    preprocessing_note=(
        "The raw columns are opaque codes; they are relabelled from the source "
        "publication so an explanation names a clinical finding rather than "
        "'PRE9'. `PRE5` (FEV1, litres) contains 14 physiologically impossible "
        "values between 52 and 86 L — no lung holds 86 litres — which fall "
        "outside the declared 0.5-9 L range and are therefore treated as missing "
        "rather than trained on. The upper bound is 9 rather than a tidier 7 "
        "because one genuine record reads 8.56 L: extreme, but possible, and "
        "discarding a real value to keep a round number would be the wrong trade. "
        "Median imputation suffices; after that correction the dataset is "
        "otherwise complete."
    ),
    features=[
        _f("AGE", "Age at surgery", "demographics", 21, 87, unit="years",
           higher_is_worse=True, default=62),
        _f("PRE30", "Smoker", "history", 0, 1, kind="binary", choices=TF,
           higher_is_worse=True, default=1),
        _f("PRE17", "Type 2 diabetes", "history", 0, 1, kind="binary",
           choices=TF, higher_is_worse=True, default=0),
        _f("PRE19", "Myocardial infarction within 6 months", "history", 0, 1,
           kind="binary", choices=TF, higher_is_worse=True, default=0),
        _f("PRE25", "Peripheral arterial disease", "history", 0, 1, kind="binary",
           choices=TF, higher_is_worse=True, default=0),
        _f("PRE32", "Asthma", "history", 0, 1, kind="binary", choices=TF,
           higher_is_worse=True, default=0),
        _f("PRE4", "Forced vital capacity (FVC)", "vitals", 1.0, 7.0, unit="L",
           decimals=2, higher_is_worse=False, default=3.16,
           description="Total volume exhalable in one breath. Low FVC means less "
                       "pulmonary reserve to survive losing lung tissue."),
        _f("PRE5", "FEV1", "vitals", 0.5, 9.0, unit="L", decimals=2,
           higher_is_worse=False, default=2.40,
           description="Volume exhaled in the first second. The key measure of "
                       "operability in thoracic surgery. The upper bound is 9 L "
                       "rather than a tidier 7 because one training record holds "
                       "8.56 L — extreme but possible — and a validator that "
                       "rejects a value the model was trained on is simply wrong."),
        _f("PRE6", "Performance status (Zubrod)", "vitals", 0, 2, kind="ordinal",
           choices={0: "0 — fully active", 1: "1 — restricted but ambulatory",
                    2: "2 — ambulatory, no work"},
           higher_is_worse=True, default=1),
        _f("PRE7", "Pain before surgery", "vitals", 0, 1, kind="binary",
           choices=TF, higher_is_worse=True, default=0),
        _f("PRE8", "Haemoptysis before surgery", "vitals", 0, 1, kind="binary",
           choices=TF, higher_is_worse=True, default=0,
           description="Coughing blood."),
        _f("PRE9", "Dyspnoea before surgery", "vitals", 0, 1, kind="binary",
           choices=TF, higher_is_worse=True, default=0,
           description="Breathlessness at rest or on mild exertion."),
        _f("PRE10", "Cough before surgery", "vitals", 0, 1, kind="binary",
           choices=TF, higher_is_worse=True, default=1),
        _f("PRE11", "Weakness before surgery", "vitals", 0, 1, kind="binary",
           choices=TF, higher_is_worse=True, default=0),
        _f("DGN", "Diagnosis (ICD-10 group)", "tumour", 1, 8, kind="ordinal",
           # DGN7 is deliberately absent: it never occurs in the 470 records, so
           # offering it would invite a selection the model has never seen and
           # then silently extrapolate. The API's category check rejects it.
           choices={1: "DGN1", 2: "DGN2", 3: "DGN3", 4: "DGN4", 5: "DGN5",
                    6: "DGN6", 8: "DGN8"},
           higher_is_worse=None, default=3,
           description="Primary and secondary tumour ICD-10 grouping as coded by "
                       "the source registry."),
        _f("PRE14", "Tumour size (clinical T stage)", "tumour", 11, 14,
           kind="ordinal",
           choices={11: "T1 — smallest", 12: "T2", 13: "T3", 14: "T4 — largest"},
           higher_is_worse=True, default=12),
    ],
)

CANCER_DATASETS = [
    BREAST_CANCER,
    BREAST_CANCER_RECURRENCE,
    BREAST_CANCER_SURVIVAL,
    CERVICAL_CANCER,
    LUNG_CANCER_SURGERY,
]
