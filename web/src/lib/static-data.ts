// Auto-generated static fallback dataset & evaluation registry
import type { Dataset, ExplainabilityOverview, Evaluation, CaseStudies, GlobalImportance, ModelSummary } from './types';

export const STATIC_DATASETS: Dataset[] = [
  {
    "slug": "heart_disease",
    "title": "Heart Disease (Cleveland)",
    "source": "https://archive.ics.uci.edu/dataset/45/heart+disease",
    "citation": "Janosi, A., Steinbrunn, W., Pfisterer, M., & Detrano, R. (1989). Heart Disease. UCI Machine Learning Repository.",
    "rows": 303,
    "positive_label": "Heart disease present",
    "negative_label": "No heart disease",
    "outcome": "Angiographic coronary artery disease (>50% narrowing in any major vessel)",
    "clinical_context": "The most widely benchmarked cardiology dataset in the interpretable-ML literature. 303 patients from the Cleveland Clinic Foundation, with the outcome established by cardiac catheterisation rather than by clinician impression, which is why it is a credible reference standard.",
    "preprocessing_note": "Only `ca` (4 rows) and `thal` (2 rows) are missing, so median imputation is sufficient; a KNN imputer would add cost with nothing to gain. The UCI target `num` encodes severity 0-4 and is binarised as num > 0, the standard framing in the literature.",
    "imputer": "median",
    "primary": true,
    "feature_groups": [
      {
        "key": "demographics",
        "label": "Demographics",
        "features": [
          {
            "name": "age",
            "label": "Age",
            "group": "demographics",
            "lo": 20,
            "hi": 100,
            "kind": "numeric",
            "unit": "years",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Patient age at presentation.",
            "default": 54
          },
          {
            "name": "sex",
            "label": "Sex",
            "group": "demographics",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "Female",
              "1": "Male"
            },
            "higher_is_worse": null,
            "description": "Male sex carries higher baseline coronary risk.",
            "default": 1
          }
        ]
      },
      {
        "key": "vitals",
        "label": "Vitals & examination",
        "features": [
          {
            "name": "cp",
            "label": "Chest pain type",
            "group": "vitals",
            "lo": 1,
            "hi": 4,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": {
              "1": "Typical angina",
              "2": "Atypical angina",
              "3": "Non-anginal pain",
              "4": "Asymptomatic"
            },
            "higher_is_worse": null,
            "description": "Character of presenting chest pain.",
            "default": 4
          },
          {
            "name": "trestbps",
            "label": "Resting blood pressure",
            "group": "vitals",
            "lo": 80,
            "hi": 220,
            "kind": "numeric",
            "unit": "mm Hg",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Systolic blood pressure on admission.",
            "default": 131
          },
          {
            "name": "restecg",
            "label": "Resting ECG",
            "group": "vitals",
            "lo": 0,
            "hi": 2,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "Normal",
              "1": "ST-T wave abnormality",
              "2": "Left ventricular hypertrophy"
            },
            "higher_is_worse": null,
            "description": "Resting electrocardiogram findings.",
            "default": 1
          },
          {
            "name": "thalach",
            "label": "Maximum heart rate achieved",
            "group": "vitals",
            "lo": 60,
            "hi": 220,
            "kind": "numeric",
            "unit": "bpm",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": false,
            "description": "Peak heart rate during exercise testing. A blunted peak suggests impaired coronary reserve.",
            "default": 150
          },
          {
            "name": "exang",
            "label": "Exercise-induced angina",
            "group": "vitals",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "Chest pain provoked by the exercise test.",
            "default": 0
          },
          {
            "name": "oldpeak",
            "label": "ST depression (exercise vs rest)",
            "group": "vitals",
            "lo": 0,
            "hi": 7,
            "kind": "numeric",
            "unit": "mm",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": true,
            "description": "Magnitude of exercise-induced ST-segment depression.",
            "default": 1.0
          },
          {
            "name": "slope",
            "label": "ST segment slope at peak exercise",
            "group": "vitals",
            "lo": 1,
            "hi": 3,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": {
              "1": "Upsloping",
              "2": "Flat",
              "3": "Downsloping"
            },
            "higher_is_worse": null,
            "description": "Shape of the ST segment at peak exercise.",
            "default": 2
          }
        ]
      },
      {
        "key": "labs",
        "label": "Laboratory results",
        "features": [
          {
            "name": "chol",
            "label": "Serum cholesterol",
            "group": "labs",
            "lo": 100,
            "hi": 600,
            "kind": "numeric",
            "unit": "mg/dL",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Total serum cholesterol.",
            "default": 246
          },
          {
            "name": "fbs",
            "label": "Fasting blood sugar > 120 mg/dL",
            "group": "labs",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "Proxy marker for diabetes.",
            "default": 0
          },
          {
            "name": "ca",
            "label": "Major vessels coloured by fluoroscopy",
            "group": "labs",
            "lo": 0,
            "hi": 3,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "0",
              "1": "1",
              "2": "2",
              "3": "3"
            },
            "higher_is_worse": true,
            "description": "Number of major vessels with visible narrowing.",
            "default": 0
          },
          {
            "name": "thal",
            "label": "Thallium perfusion scan",
            "group": "labs",
            "lo": 3,
            "hi": 7,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": {
              "3": "Normal",
              "6": "Fixed defect",
              "7": "Reversible defect"
            },
            "higher_is_worse": null,
            "description": "Myocardial perfusion imaging result.",
            "default": 3
          }
        ]
      }
    ],
    "dropped_columns": [],
    "feature_count": 13,
    "best_model": "logistic_regression",
    "best_model_label": "Logistic Regression"
  },
  {
    "slug": "heart_failure",
    "title": "Heart Failure Clinical Records",
    "source": "https://archive.ics.uci.edu/dataset/519",
    "citation": "Chicco, D., & Jurman, G. (2020). Machine learning can predict survival of patients with heart failure from serum creatinine and ejection fraction alone. BMC Medical Informatics and Decision Making, 20(1), 16.",
    "rows": 299,
    "positive_label": "Death during follow-up",
    "negative_label": "Survived follow-up",
    "outcome": "All-cause death within the follow-up period",
    "clinical_context": "299 patients with left-ventricular systolic dysfunction. Chicco & Jurman showed serum creatinine and ejection fraction alone carry most of the predictive signal, which gives this dataset a published ground truth to check our SHAP rankings against.",
    "preprocessing_note": "`time` (days of follow-up) is dropped. It is not a patient characteristic but an artefact of when observation stopped: short follow-up correlates with early death, so keeping it inflates AUC to ~0.9 through target leakage and produces an explanation ('this patient was observed for a short time') that is useless at the bedside. Dropping it is the honest choice and is exactly the shortcut-learning failure mode this project exists to surface.",
    "imputer": "median",
    "primary": false,
    "feature_groups": [
      {
        "key": "demographics",
        "label": "Demographics",
        "features": [
          {
            "name": "age",
            "label": "Age",
            "group": "demographics",
            "lo": 40,
            "hi": 100,
            "kind": "numeric",
            "unit": "years",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Patient age.",
            "default": 60
          },
          {
            "name": "sex",
            "label": "Sex",
            "group": "demographics",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "Female",
              "1": "Male"
            },
            "higher_is_worse": null,
            "description": "",
            "default": 1
          }
        ]
      },
      {
        "key": "history",
        "label": "Medical history",
        "features": [
          {
            "name": "smoking",
            "label": "Smoker",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "diabetes",
            "label": "Diabetes",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "high_blood_pressure",
            "label": "Hypertension",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          }
        ]
      },
      {
        "key": "vitals",
        "label": "Vitals & examination",
        "features": [
          {
            "name": "ejection_fraction",
            "label": "Ejection fraction",
            "group": "vitals",
            "lo": 10,
            "hi": 80,
            "kind": "numeric",
            "unit": "%",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": false,
            "description": "Percentage of blood leaving the heart per contraction. Below 40% indicates systolic heart failure.",
            "default": 38
          }
        ]
      },
      {
        "key": "labs",
        "label": "Laboratory results",
        "features": [
          {
            "name": "anaemia",
            "label": "Anaemia",
            "group": "labs",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "Haematocrit or haemoglobin below the reference range.",
            "default": 0
          },
          {
            "name": "serum_creatinine",
            "label": "Serum creatinine",
            "group": "labs",
            "lo": 0.4,
            "hi": 10,
            "kind": "numeric",
            "unit": "mg/dL",
            "decimals": 2,
            "choices": null,
            "higher_is_worse": true,
            "description": "Kidney function marker; rises as renal perfusion falls.",
            "default": 1.1
          },
          {
            "name": "serum_sodium",
            "label": "Serum sodium",
            "group": "labs",
            "lo": 110,
            "hi": 150,
            "kind": "numeric",
            "unit": "mEq/L",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": false,
            "description": "Hyponatraemia is an adverse prognostic sign in heart failure.",
            "default": 137
          },
          {
            "name": "creatinine_phosphokinase",
            "label": "Creatinine phosphokinase (CPK)",
            "group": "labs",
            "lo": 20,
            "hi": 8000,
            "kind": "numeric",
            "unit": "mcg/L",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Enzyme released when muscle tissue is damaged.",
            "default": 250
          },
          {
            "name": "platelets",
            "label": "Platelet count",
            "group": "labs",
            "lo": 25000,
            "hi": 850000,
            "kind": "numeric",
            "unit": "platelets/mL",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": null,
            "description": "Platelet concentration in the blood.",
            "default": 262000
          }
        ]
      }
    ],
    "dropped_columns": [
      "time"
    ],
    "feature_count": 11,
    "best_model": "random_forest",
    "best_model_label": "Random Forest"
  },
  {
    "slug": "diabetes",
    "title": "Pima Indians Diabetes",
    "source": "https://www.kaggle.com/datasets/uciml/pima-indians-diabetes-database",
    "citation": "Smith, J. W., Everhart, J. E., Dickson, W. C., Knowler, W. C., & Johannes, R. S. (1988). Using the ADAP learning algorithm to forecast the onset of diabetes mellitus. Proc. Symp. Comp. Appl. Med. Care.",
    "rows": 768,
    "positive_label": "Diabetes onset",
    "negative_label": "No diabetes onset",
    "outcome": "Onset of type-2 diabetes within five years of examination",
    "clinical_context": "768 female patients of Pima heritage aged 21 and over. Widely used, and widely mis-used: five columns encode missing measurements as 0, so any pipeline that takes the file at face value trains on physiologically impossible patients.",
    "preprocessing_note": "Glucose, BloodPressure, SkinThickness, Insulin and BMI use 0 as a missing marker (a BMI of 0 is not a patient). These zeros are converted to NaN before imputation; Insulin alone is 48.7% missing. Four further BloodPressure values survive that filter but are still impossible \u2014 24, 30, 30 and 38 mm Hg diastolic, which is shock territory, not an outpatient \u2014 and are dropped by the out-of-range rule. Median imputation is used because these lab distributions are right-skewed, so the mean would be dragged upward by outliers.",
    "imputer": "median",
    "primary": false,
    "feature_groups": [
      {
        "key": "demographics",
        "label": "Demographics",
        "features": [
          {
            "name": "Age",
            "label": "Age",
            "group": "demographics",
            "lo": 21,
            "hi": 90,
            "kind": "numeric",
            "unit": "years",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 33
          },
          {
            "name": "Pregnancies",
            "label": "Number of pregnancies",
            "group": "demographics",
            "lo": 0,
            "hi": 20,
            "kind": "numeric",
            "unit": "",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Gestational history is an established risk factor.",
            "default": 3
          },
          {
            "name": "DiabetesPedigreeFunction",
            "label": "Diabetes pedigree function",
            "group": "demographics",
            "lo": 0.05,
            "hi": 2.5,
            "kind": "numeric",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": true,
            "description": "Synthesised score for family history of diabetes.",
            "default": 0.47
          }
        ]
      },
      {
        "key": "vitals",
        "label": "Vitals & examination",
        "features": [
          {
            "name": "BMI",
            "label": "Body mass index",
            "group": "vitals",
            "lo": 15,
            "hi": 70,
            "kind": "numeric",
            "unit": "kg/m\u00b2",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 32.0
          },
          {
            "name": "BloodPressure",
            "label": "Diastolic blood pressure",
            "group": "vitals",
            "lo": 40,
            "hi": 140,
            "kind": "numeric",
            "unit": "mm Hg",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 72
          },
          {
            "name": "SkinThickness",
            "label": "Triceps skin fold thickness",
            "group": "vitals",
            "lo": 5,
            "hi": 100,
            "kind": "numeric",
            "unit": "mm",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Proxy measure for subcutaneous body fat.",
            "default": 23
          }
        ]
      },
      {
        "key": "labs",
        "label": "Laboratory results",
        "features": [
          {
            "name": "Glucose",
            "label": "Plasma glucose (2-hour OGTT)",
            "group": "labs",
            "lo": 40,
            "hi": 250,
            "kind": "numeric",
            "unit": "mg/dL",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Plasma glucose two hours into an oral tolerance test. The single strongest predictor in this cohort.",
            "default": 117
          },
          {
            "name": "Insulin",
            "label": "2-hour serum insulin",
            "group": "labs",
            "lo": 10,
            "hi": 900,
            "kind": "numeric",
            "unit": "mu U/mL",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 125
          }
        ]
      }
    ],
    "dropped_columns": [],
    "feature_count": 8,
    "best_model": "random_forest",
    "best_model_label": "Random Forest"
  },
  {
    "slug": "kidney_disease",
    "title": "Chronic Kidney Disease",
    "source": "https://archive.ics.uci.edu/dataset/336",
    "citation": "Rubini, L., Soundarapandian, P., & Eswaran, P. (2015). Chronic Kidney Disease. UCI Machine Learning Repository.",
    "rows": 400,
    "positive_label": "Chronic kidney disease",
    "negative_label": "No chronic kidney disease",
    "outcome": "Clinical diagnosis of chronic kidney disease",
    "clinical_context": "400 records collected over two months at an Indian hospital. Among the harder cohorts to handle honestly: 24 features and heavy, non-random missingness (red blood cell morphology absent in 38% of records), because clinicians only order a test when they already suspect something.",
    "preprocessing_note": "KNN imputation (k=5) rather than median. Missingness reaches 38% for `rbc` and 33% for `rbcc`, and it is not random: a test is ordered because the clinician already suspects disease. Filling 152 rows with one median value would collapse that variance and manufacture a fake modal patient, so neighbouring complete records are used instead. Categorical strings are whitespace-stripped first (the raw file contains '\\tno' and '\\tyes'). One serum sodium reads 4.5 mEq/L against a human range of 135-145; it is a data-entry error and is dropped by the out-of-range rule rather than imputed from.",
    "imputer": "knn",
    "primary": false,
    "feature_groups": [
      {
        "key": "demographics",
        "label": "Demographics",
        "features": [
          {
            "name": "age",
            "label": "Age",
            "group": "demographics",
            "lo": 1,
            "hi": 100,
            "kind": "numeric",
            "unit": "years",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 51
          }
        ]
      },
      {
        "key": "history",
        "label": "Medical history",
        "features": [
          {
            "name": "htn",
            "label": "Hypertension",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "dm",
            "label": "Diabetes mellitus",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "cad",
            "label": "Coronary artery disease",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          }
        ]
      },
      {
        "key": "vitals",
        "label": "Vitals & examination",
        "features": [
          {
            "name": "bp",
            "label": "Blood pressure",
            "group": "vitals",
            "lo": 40,
            "hi": 200,
            "kind": "numeric",
            "unit": "mm Hg",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 76
          },
          {
            "name": "appet",
            "label": "Appetite",
            "group": "vitals",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "Good",
              "1": "Poor"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "pe",
            "label": "Pedal oedema",
            "group": "vitals",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "Swelling of the feet from fluid retention.",
            "default": 0
          }
        ]
      },
      {
        "key": "labs",
        "label": "Laboratory results",
        "features": [
          {
            "name": "ane",
            "label": "Anaemia",
            "group": "labs",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "sg",
            "label": "Urine specific gravity",
            "group": "labs",
            "lo": 1.005,
            "hi": 1.025,
            "kind": "ordinal",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": false,
            "description": "Urine concentration; falls as the kidney loses its ability to concentrate urine.",
            "default": 1.02
          },
          {
            "name": "al",
            "label": "Urine albumin",
            "group": "labs",
            "lo": 0,
            "hi": 5,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Graded 0-5. Protein in urine is a core marker of glomerular damage.",
            "default": 0
          },
          {
            "name": "su",
            "label": "Urine sugar",
            "group": "labs",
            "lo": 0,
            "hi": 5,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Graded 0-5.",
            "default": 0
          },
          {
            "name": "rbc",
            "label": "Red blood cells (urine microscopy)",
            "group": "labs",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "Normal",
              "1": "Abnormal"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "pc",
            "label": "Pus cells",
            "group": "labs",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "Normal",
              "1": "Abnormal"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "pcc",
            "label": "Pus cell clumps",
            "group": "labs",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "Not present",
              "1": "Present"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "ba",
            "label": "Bacteria",
            "group": "labs",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "Not present",
              "1": "Present"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "bgr",
            "label": "Random blood glucose",
            "group": "labs",
            "lo": 20,
            "hi": 500,
            "kind": "numeric",
            "unit": "mg/dL",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 121
          },
          {
            "name": "bu",
            "label": "Blood urea",
            "group": "labs",
            "lo": 1,
            "hi": 400,
            "kind": "numeric",
            "unit": "mg/dL",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 44
          },
          {
            "name": "sc",
            "label": "Serum creatinine",
            "group": "labs",
            "lo": 0.4,
            "hi": 80,
            "kind": "numeric",
            "unit": "mg/dL",
            "decimals": 2,
            "choices": null,
            "higher_is_worse": true,
            "description": "Primary marker of glomerular filtration.",
            "default": 1.3
          },
          {
            "name": "sod",
            "label": "Serum sodium",
            "group": "labs",
            "lo": 100,
            "hi": 165,
            "kind": "numeric",
            "unit": "mEq/L",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": false,
            "description": "",
            "default": 137
          },
          {
            "name": "pot",
            "label": "Serum potassium",
            "group": "labs",
            "lo": 2,
            "hi": 50,
            "kind": "numeric",
            "unit": "mEq/L",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 4.6
          },
          {
            "name": "hemo",
            "label": "Haemoglobin",
            "group": "labs",
            "lo": 3,
            "hi": 18,
            "kind": "numeric",
            "unit": "g/dL",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": false,
            "description": "Falls in chronic kidney disease as erythropoietin production declines.",
            "default": 12.5
          },
          {
            "name": "pcv",
            "label": "Packed cell volume",
            "group": "labs",
            "lo": 9,
            "hi": 55,
            "kind": "numeric",
            "unit": "%",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": false,
            "description": "",
            "default": 38
          },
          {
            "name": "wbcc",
            "label": "White blood cell count",
            "group": "labs",
            "lo": 2000,
            "hi": 27000,
            "kind": "numeric",
            "unit": "cells/cumm",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 8000
          },
          {
            "name": "rbcc",
            "label": "Red blood cell count",
            "group": "labs",
            "lo": 2,
            "hi": 8,
            "kind": "numeric",
            "unit": "millions/cmm",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": false,
            "description": "",
            "default": 4.7
          }
        ]
      }
    ],
    "dropped_columns": [],
    "feature_count": 24,
    "best_model": "random_forest",
    "best_model_label": "Random Forest"
  },
  {
    "slug": "breast_cancer",
    "title": "Breast Cancer Wisconsin (Diagnostic)",
    "source": "https://archive.ics.uci.edu/dataset/17",
    "citation": "Wolberg, W. H., Street, W. N., & Mangasarian, O. L. (1995). Breast Cancer Wisconsin (Diagnostic). UCI Machine Learning Repository.",
    "rows": 569,
    "positive_label": "Malignant",
    "negative_label": "Benign",
    "outcome": "Malignancy of a breast mass, established by biopsy",
    "clinical_context": "569 fine-needle aspirates of breast masses, digitised and measured. Ten nucleus features are each reported three ways \u2014 mean, standard error and worst \u2014 giving 30 columns describing only ten underlying quantities. That redundancy is the interesting part: radius, perimeter and area are three measurements of one thing and correlate above 0.98, so SHAP must split credit between them.",
    "preprocessing_note": "No missing values and no sentinel codes \u2014 unusually clean. Median imputation is fitted anyway so the pipeline shape is uniform across datasets, but it has nothing to do. The real caution here is collinearity, not missingness: radius, perimeter and area are geometrically dependent (area grows with the square of radius), so their individual SHAP values each understate the importance of 'nucleus size' as a concept.",
    "imputer": "median",
    "primary": false,
    "feature_groups": [
      {
        "key": "morphology_mean",
        "label": "Nucleus morphology \u2014 mean",
        "features": [
          {
            "name": "radius1",
            "label": "Radius (mean)",
            "group": "morphology_mean",
            "lo": 6,
            "hi": 30,
            "kind": "numeric",
            "unit": "\u00b5m",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": true,
            "description": "Radius, mean across the nuclei in the image.",
            "default": 13.37
          },
          {
            "name": "texture1",
            "label": "Texture (grey-scale s.d.) (mean)",
            "group": "morphology_mean",
            "lo": 9,
            "hi": 42,
            "kind": "numeric",
            "unit": "",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": true,
            "description": "Texture (grey-scale s.d.), mean across the nuclei in the image.",
            "default": 18.84
          },
          {
            "name": "perimeter1",
            "label": "Perimeter (mean)",
            "group": "morphology_mean",
            "lo": 40,
            "hi": 200,
            "kind": "numeric",
            "unit": "\u00b5m",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Perimeter, mean across the nuclei in the image.",
            "default": 86.24
          },
          {
            "name": "area1",
            "label": "Area (mean)",
            "group": "morphology_mean",
            "lo": 140,
            "hi": 2600,
            "kind": "numeric",
            "unit": "\u00b5m\u00b2",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Area, mean across the nuclei in the image.",
            "default": 551
          },
          {
            "name": "smoothness1",
            "label": "Smoothness (mean)",
            "group": "morphology_mean",
            "lo": 0.04,
            "hi": 0.18,
            "kind": "numeric",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": true,
            "description": "Smoothness, mean across the nuclei in the image.",
            "default": 0.0959
          },
          {
            "name": "compactness1",
            "label": "Compactness (mean)",
            "group": "morphology_mean",
            "lo": 0.01,
            "hi": 0.4,
            "kind": "numeric",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": true,
            "description": "Compactness, mean across the nuclei in the image.",
            "default": 0.0926
          },
          {
            "name": "concavity1",
            "label": "Concavity (mean)",
            "group": "morphology_mean",
            "lo": 0,
            "hi": 0.5,
            "kind": "numeric",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": true,
            "description": "Concavity, mean across the nuclei in the image.",
            "default": 0.0615
          },
          {
            "name": "concave_points1",
            "label": "Concave points (mean)",
            "group": "morphology_mean",
            "lo": 0,
            "hi": 0.25,
            "kind": "numeric",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": true,
            "description": "Concave points, mean across the nuclei in the image.",
            "default": 0.0335
          },
          {
            "name": "symmetry1",
            "label": "Symmetry (mean)",
            "group": "morphology_mean",
            "lo": 0.09,
            "hi": 0.35,
            "kind": "numeric",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": null,
            "description": "Symmetry, mean across the nuclei in the image.",
            "default": 0.1792
          },
          {
            "name": "fractal_dimension1",
            "label": "Fractal dimension (mean)",
            "group": "morphology_mean",
            "lo": 0.04,
            "hi": 0.11,
            "kind": "numeric",
            "unit": "",
            "decimals": 4,
            "choices": null,
            "higher_is_worse": null,
            "description": "Fractal dimension, mean across the nuclei in the image.",
            "default": 0.0615
          }
        ]
      },
      {
        "key": "morphology_se",
        "label": "Nucleus morphology \u2014 variability",
        "features": [
          {
            "name": "radius2",
            "label": "Radius (variability)",
            "group": "morphology_se",
            "lo": 0.1,
            "hi": 3.5,
            "kind": "numeric",
            "unit": "\u00b5m",
            "decimals": 2,
            "choices": null,
            "higher_is_worse": true,
            "description": "Radius, standard error across the nuclei.",
            "default": 0.324
          },
          {
            "name": "texture2",
            "label": "Texture (grey-scale s.d.) (variability)",
            "group": "morphology_se",
            "lo": 0.3,
            "hi": 5.5,
            "kind": "numeric",
            "unit": "",
            "decimals": 2,
            "choices": null,
            "higher_is_worse": true,
            "description": "Texture (grey-scale s.d.), standard error across the nuclei.",
            "default": 1.108
          },
          {
            "name": "perimeter2",
            "label": "Perimeter (variability)",
            "group": "morphology_se",
            "lo": 0.7,
            "hi": 25,
            "kind": "numeric",
            "unit": "\u00b5m",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": true,
            "description": "Perimeter, standard error across the nuclei.",
            "default": 2.287
          },
          {
            "name": "area2",
            "label": "Area (variability)",
            "group": "morphology_se",
            "lo": 6,
            "hi": 600,
            "kind": "numeric",
            "unit": "\u00b5m\u00b2",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Area, standard error across the nuclei.",
            "default": 24.53
          },
          {
            "name": "smoothness2",
            "label": "Smoothness (variability)",
            "group": "morphology_se",
            "lo": 0.001,
            "hi": 0.04,
            "kind": "numeric",
            "unit": "",
            "decimals": 4,
            "choices": null,
            "higher_is_worse": true,
            "description": "Smoothness, standard error across the nuclei.",
            "default": 0.0064
          },
          {
            "name": "compactness2",
            "label": "Compactness (variability)",
            "group": "morphology_se",
            "lo": 0.002,
            "hi": 0.15,
            "kind": "numeric",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": true,
            "description": "Compactness, standard error across the nuclei.",
            "default": 0.0205
          },
          {
            "name": "concavity2",
            "label": "Concavity (variability)",
            "group": "morphology_se",
            "lo": 0,
            "hi": 0.45,
            "kind": "numeric",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": true,
            "description": "Concavity, standard error across the nuclei.",
            "default": 0.0259
          },
          {
            "name": "concave_points2",
            "label": "Concave points (variability)",
            "group": "morphology_se",
            "lo": 0,
            "hi": 0.06,
            "kind": "numeric",
            "unit": "",
            "decimals": 4,
            "choices": null,
            "higher_is_worse": true,
            "description": "Concave points, standard error across the nuclei.",
            "default": 0.0109
          },
          {
            "name": "symmetry2",
            "label": "Symmetry (variability)",
            "group": "morphology_se",
            "lo": 0.007,
            "hi": 0.09,
            "kind": "numeric",
            "unit": "",
            "decimals": 4,
            "choices": null,
            "higher_is_worse": null,
            "description": "Symmetry, standard error across the nuclei.",
            "default": 0.0187
          },
          {
            "name": "fractal_dimension2",
            "label": "Fractal dimension (variability)",
            "group": "morphology_se",
            "lo": 0.0008,
            "hi": 0.035,
            "kind": "numeric",
            "unit": "",
            "decimals": 4,
            "choices": null,
            "higher_is_worse": null,
            "description": "Fractal dimension, standard error across the nuclei.",
            "default": 0.0032
          }
        ]
      },
      {
        "key": "morphology_worst",
        "label": "Nucleus morphology \u2014 worst",
        "features": [
          {
            "name": "radius3",
            "label": "Radius (worst)",
            "group": "morphology_worst",
            "lo": 7,
            "hi": 40,
            "kind": "numeric",
            "unit": "\u00b5m",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": true,
            "description": "Radius, mean of the three largest values.",
            "default": 14.97
          },
          {
            "name": "texture3",
            "label": "Texture (grey-scale s.d.) (worst)",
            "group": "morphology_worst",
            "lo": 12,
            "hi": 55,
            "kind": "numeric",
            "unit": "",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": true,
            "description": "Texture (grey-scale s.d.), mean of the three largest values.",
            "default": 25.41
          },
          {
            "name": "perimeter3",
            "label": "Perimeter (worst)",
            "group": "morphology_worst",
            "lo": 50,
            "hi": 275,
            "kind": "numeric",
            "unit": "\u00b5m",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Perimeter, mean of the three largest values.",
            "default": 97.66
          },
          {
            "name": "area3",
            "label": "Area (worst)",
            "group": "morphology_worst",
            "lo": 185,
            "hi": 4500,
            "kind": "numeric",
            "unit": "\u00b5m\u00b2",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Area, mean of the three largest values.",
            "default": 686
          },
          {
            "name": "smoothness3",
            "label": "Smoothness (worst)",
            "group": "morphology_worst",
            "lo": 0.07,
            "hi": 0.25,
            "kind": "numeric",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": true,
            "description": "Smoothness, mean of the three largest values.",
            "default": 0.1313
          },
          {
            "name": "compactness3",
            "label": "Compactness (worst)",
            "group": "morphology_worst",
            "lo": 0.02,
            "hi": 1.2,
            "kind": "numeric",
            "unit": "",
            "decimals": 2,
            "choices": null,
            "higher_is_worse": true,
            "description": "Compactness, mean of the three largest values.",
            "default": 0.2119
          },
          {
            "name": "concavity3",
            "label": "Concavity (worst)",
            "group": "morphology_worst",
            "lo": 0,
            "hi": 1.35,
            "kind": "numeric",
            "unit": "",
            "decimals": 2,
            "choices": null,
            "higher_is_worse": true,
            "description": "Concavity, mean of the three largest values.",
            "default": 0.2267
          },
          {
            "name": "concave_points3",
            "label": "Concave points (worst)",
            "group": "morphology_worst",
            "lo": 0,
            "hi": 0.32,
            "kind": "numeric",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": true,
            "description": "Concave points, mean of the three largest values.",
            "default": 0.0999
          },
          {
            "name": "symmetry3",
            "label": "Symmetry (worst)",
            "group": "morphology_worst",
            "lo": 0.15,
            "hi": 0.7,
            "kind": "numeric",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": null,
            "description": "Symmetry, mean of the three largest values.",
            "default": 0.2822
          },
          {
            "name": "fractal_dimension3",
            "label": "Fractal dimension (worst)",
            "group": "morphology_worst",
            "lo": 0.05,
            "hi": 0.22,
            "kind": "numeric",
            "unit": "",
            "decimals": 3,
            "choices": null,
            "higher_is_worse": null,
            "description": "Fractal dimension, mean of the three largest values.",
            "default": 0.08
          }
        ]
      }
    ],
    "dropped_columns": [],
    "feature_count": 30,
    "best_model": "logistic_regression",
    "best_model_label": "Logistic Regression"
  },
  {
    "slug": "breast_cancer_recurrence",
    "title": "Breast Cancer Recurrence (Ljubljana)",
    "source": "https://archive.ics.uci.edu/dataset/14",
    "citation": "Zwitter, M., & Soklic, M. (1988). Breast Cancer. University Medical Centre, Institute of Oncology, Ljubljana. UCI Machine Learning Repository.",
    "rows": 286,
    "positive_label": "Recurrence",
    "negative_label": "No recurrence",
    "outcome": "Recurrence of breast cancer during the follow-up period",
    "clinical_context": "286 patients followed after treatment. Everything is recorded in bands rather than exact values \u2014 age in decades, tumour size in 5 mm bins \u2014 which caps how precise any explanation can be: the model cannot distinguish a 20 mm tumour from a 24 mm one because the data does not.",
    "preprocessing_note": "The UCI-hosted copy of this file has been through Excel, which converted numeric ranges into dates: `tumor-size` contained '14-Oct' where the value is '10-14', and `inv-nodes` contained '5-Mar' for '3-5'. `scripts/download_data.py` repairs six such values and raises if it meets an unrepaired one, because an ordinal encoder would otherwise rank the mangled strings and train on nonsense. Banded values are then mapped to their midpoint in real units so explanations read in millimetres and node counts. Nine missing `node-caps` and one `breast-quad` are median-imputed.",
    "imputer": "median",
    "primary": false,
    "feature_groups": [
      {
        "key": "demographics",
        "label": "Demographics",
        "features": [
          {
            "name": "age",
            "label": "Age band (midpoint)",
            "group": "demographics",
            "lo": 25,
            "hi": 75,
            "kind": "numeric",
            "unit": "years",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": null,
            "description": "Recorded in decades; shown as the band midpoint.",
            "default": 55
          },
          {
            "name": "menopause",
            "label": "Menopausal status",
            "group": "demographics",
            "lo": 0,
            "hi": 2,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "Pre-40 menopause",
              "1": "Premenopausal",
              "2": "Menopause at 40 or later"
            },
            "higher_is_worse": null,
            "description": "",
            "default": 1
          }
        ]
      },
      {
        "key": "history",
        "label": "Medical history",
        "features": [
          {
            "name": "irradiat",
            "label": "Received radiotherapy",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": null,
            "description": "",
            "default": 0
          }
        ]
      },
      {
        "key": "tumour",
        "label": "Tumour characteristics",
        "features": [
          {
            "name": "tumor-size",
            "label": "Tumour size (band midpoint)",
            "group": "tumour",
            "lo": 2,
            "hi": 52,
            "kind": "numeric",
            "unit": "mm",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Greatest diameter of the excised tumour.",
            "default": 22
          },
          {
            "name": "inv-nodes",
            "label": "Involved axillary nodes (band midpoint)",
            "group": "tumour",
            "lo": 1,
            "hi": 25,
            "kind": "numeric",
            "unit": "",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Number of axillary lymph nodes containing metastatic disease \u2014 the strongest classical prognostic factor.",
            "default": 1
          },
          {
            "name": "node-caps",
            "label": "Node capsular invasion",
            "group": "tumour",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "Tumour has broken through the lymph node capsule.",
            "default": 0
          },
          {
            "name": "deg-malig",
            "label": "Histological grade",
            "group": "tumour",
            "lo": 1,
            "hi": 3,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": {
              "1": "Grade 1 (well differentiated)",
              "2": "Grade 2 (moderately differentiated)",
              "3": "Grade 3 (poorly differentiated)"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 2
          },
          {
            "name": "breast",
            "label": "Affected breast",
            "group": "tumour",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "Left",
              "1": "Right"
            },
            "higher_is_worse": null,
            "description": "Laterality carries no prognostic meaning; kept as a control feature that SHAP should rank near zero.",
            "default": 0
          },
          {
            "name": "breast-quad",
            "label": "Quadrant",
            "group": "tumour",
            "lo": 0,
            "hi": 4,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "Central",
              "1": "Lower left",
              "2": "Upper left",
              "3": "Lower right",
              "4": "Upper right"
            },
            "higher_is_worse": null,
            "description": "",
            "default": 2
          }
        ]
      }
    ],
    "dropped_columns": [],
    "feature_count": 9,
    "best_model": "random_forest",
    "best_model_label": "Random Forest"
  },
  {
    "slug": "breast_cancer_survival",
    "title": "Breast Cancer Surgical Survival (Haberman)",
    "source": "https://archive.ics.uci.edu/dataset/43",
    "citation": "Haberman, S. J. (1976). Generalized Residuals for Log-Linear Models. Proceedings of the 9th International Biometrics Conference. UCI Machine Learning Repository.",
    "rows": 306,
    "positive_label": "Died within five years",
    "negative_label": "Survived five years",
    "outcome": "Death within five years of surgery for breast cancer",
    "clinical_context": "306 patients operated on between 1958 and 1969 at the University of Chicago. Only three features, which makes it the honest counter-example in this collection: there is a ceiling on how well any model can do, and an explainability method that produces confident narratives from three columns is telling you more about itself than about the patient.",
    "preprocessing_note": "No missing values. `operation_year` is deliberately KEPT, unlike the `time` column dropped from the heart-failure dataset, and the distinction is worth stating: `time` was determined by the outcome (patients who died early were observed for less time), which is leakage. `operation_year` is a treatment-era covariate that exists before the outcome and is known at prediction time. It does limit generalisation \u2014 nothing here transfers to modern oncology \u2014 but that is a validity limit, not leakage.",
    "imputer": "median",
    "primary": false,
    "feature_groups": [
      {
        "key": "demographics",
        "label": "Demographics",
        "features": [
          {
            "name": "age",
            "label": "Age at operation",
            "group": "demographics",
            "lo": 30,
            "hi": 83,
            "kind": "numeric",
            "unit": "years",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 52
          },
          {
            "name": "operation_year",
            "label": "Year of operation",
            "group": "demographics",
            "lo": 58,
            "hi": 69,
            "kind": "numeric",
            "unit": "19xx",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": null,
            "description": "Two-digit year, 1958-1969. A proxy for treatment era, not a patient characteristic.",
            "default": 63
          }
        ]
      },
      {
        "key": "tumour",
        "label": "Tumour characteristics",
        "features": [
          {
            "name": "positive_auxillary_nodes",
            "label": "Positive axillary nodes",
            "group": "tumour",
            "lo": 0,
            "hi": 52,
            "kind": "numeric",
            "unit": "",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "Number of axillary lymph nodes found to contain disease.",
            "default": 1
          }
        ]
      }
    ],
    "dropped_columns": [],
    "feature_count": 3,
    "best_model": "random_forest",
    "best_model_label": "Random Forest"
  },
  {
    "slug": "cervical_cancer",
    "title": "Cervical Cancer (Risk Factors)",
    "source": "https://archive.ics.uci.edu/dataset/383",
    "citation": "Fernandes, K., Cardoso, J. S., & Fernandes, J. (2017). Transfer Learning with Partial Observability Applied to Cervical Cancer Screening. Iberian Conference on Pattern Recognition and Image Analysis. UCI ML Repository.",
    "rows": 858,
    "positive_label": "Biopsy-confirmed cervical cancer",
    "negative_label": "Negative biopsy",
    "outcome": "Cervical cancer confirmed on biopsy",
    "clinical_context": "858 patients at Hospital Universitario de Caracas. The largest cohort in this project and the most imbalanced: 55 positive biopsies, 6.4%. A model that predicts 'negative' for everybody scores 93.6% accuracy and finds no cancer at all, which makes this the clearest demonstration in the whole project of why accuracy is the wrong headline metric.",
    "preprocessing_note": "The file ships four outcome columns \u2014 Hinselmann, Schiller, Citology and Biopsy \u2014 recorded at the same visit. Biopsy is the histological gold standard and is used as the target; the other three are dropped, because they are alternative measurements of the same event rather than predictors of it, and keeping them is textbook leakage. Two columns are 91.7% missing and two are constant; all four such columns are dropped for the reasons given above. KNN imputation (k=5) is used for the remainder because missingness here is a patient declining to answer, which is not random. Six STD columns have a single positive case each and are kept but cannot generalise \u2014 treat any SHAP attribution to them as noise.",
    "imputer": "knn",
    "primary": false,
    "feature_groups": [
      {
        "key": "demographics",
        "label": "Demographics",
        "features": [
          {
            "name": "Age",
            "label": "Age",
            "group": "demographics",
            "lo": 13,
            "hi": 85,
            "kind": "numeric",
            "unit": "years",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 25
          },
          {
            "name": "Num of pregnancies",
            "label": "Number of pregnancies",
            "group": "demographics",
            "lo": 0,
            "hi": 12,
            "kind": "numeric",
            "unit": "",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 2
          }
        ]
      },
      {
        "key": "history",
        "label": "Medical history",
        "features": [
          {
            "name": "Smokes",
            "label": "Smokes",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "Smokes (years)",
            "label": "Years smoked",
            "group": "history",
            "lo": 0,
            "hi": 40,
            "kind": "numeric",
            "unit": "years",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "Smokes (packs/year)",
            "label": "Pack-years",
            "group": "history",
            "lo": 0,
            "hi": 40,
            "kind": "numeric",
            "unit": "",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "Hormonal Contraceptives",
            "label": "Hormonal contraceptives",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": null,
            "description": "",
            "default": 1
          },
          {
            "name": "Hormonal Contraceptives (years)",
            "label": "Years on hormonal contraceptives",
            "group": "history",
            "lo": 0,
            "hi": 32,
            "kind": "numeric",
            "unit": "years",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": null,
            "description": "",
            "default": 0.5
          },
          {
            "name": "IUD",
            "label": "Intrauterine device",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": null,
            "description": "",
            "default": 0
          },
          {
            "name": "IUD (years)",
            "label": "Years with an IUD",
            "group": "history",
            "lo": 0,
            "hi": 20,
            "kind": "numeric",
            "unit": "years",
            "decimals": 1,
            "choices": null,
            "higher_is_worse": null,
            "description": "",
            "default": 0
          }
        ]
      },
      {
        "key": "sti_history",
        "label": "Sexual & STI history",
        "features": [
          {
            "name": "Number of sexual partners",
            "label": "Number of sexual partners",
            "group": "sti_history",
            "lo": 1,
            "hi": 30,
            "kind": "numeric",
            "unit": "",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 2
          },
          {
            "name": "First sexual intercourse",
            "label": "Age at first intercourse",
            "group": "sti_history",
            "lo": 10,
            "hi": 35,
            "kind": "numeric",
            "unit": "years",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": false,
            "description": "",
            "default": 17
          },
          {
            "name": "STDs",
            "label": "Any sexually transmitted infection",
            "group": "sti_history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "STDs (number)",
            "label": "Number of STIs",
            "group": "sti_history",
            "lo": 0,
            "hi": 4,
            "kind": "numeric",
            "unit": "",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "STDs:condylomatosis",
            "label": "Condylomatosis",
            "group": "sti_history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "STDs:vaginal condylomatosis",
            "label": "Vaginal condylomatosis",
            "group": "sti_history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "STDs:vulvo-perineal condylomatosis",
            "label": "Vulvo-perineal condylomatosis",
            "group": "sti_history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "STDs:syphilis",
            "label": "Syphilis",
            "group": "sti_history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "STDs:pelvic inflammatory disease",
            "label": "Pelvic inflammatory disease",
            "group": "sti_history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "STDs:genital herpes",
            "label": "Genital herpes",
            "group": "sti_history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "STDs:molluscum contagiosum",
            "label": "Molluscum contagiosum",
            "group": "sti_history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "STDs:HIV",
            "label": "HIV",
            "group": "sti_history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "STDs:Hepatitis B",
            "label": "Hepatitis B",
            "group": "sti_history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "STDs:HPV",
            "label": "HPV",
            "group": "sti_history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "STDs: Number of diagnosis",
            "label": "Number of STI diagnoses",
            "group": "sti_history",
            "lo": 0,
            "hi": 3,
            "kind": "numeric",
            "unit": "",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 0
          }
        ]
      },
      {
        "key": "diagnoses",
        "label": "Prior diagnoses",
        "features": [
          {
            "name": "Dx:Cancer",
            "label": "Previous cancer diagnosis",
            "group": "diagnoses",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "A prior diagnosis. Watch this one in the SHAP output: it sits close to the outcome and a high ranking may indicate the model is reading the answer rather than predicting it.",
            "default": 0
          },
          {
            "name": "Dx:CIN",
            "label": "Previous cervical intraepithelial neoplasia",
            "group": "diagnoses",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "Dx:HPV",
            "label": "Previous HPV diagnosis",
            "group": "diagnoses",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "Dx",
            "label": "Any previous diagnosis",
            "group": "diagnoses",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          }
        ]
      }
    ],
    "dropped_columns": [
      "STDs: Time since first diagnosis",
      "STDs: Time since last diagnosis",
      "STDs:cervical condylomatosis",
      "STDs:AIDS"
    ],
    "feature_count": 28,
    "best_model": "logistic_regression",
    "best_model_label": "Logistic Regression"
  },
  {
    "slug": "lung_cancer_surgery",
    "title": "Lung Cancer Thoracic Surgery",
    "source": "https://archive.ics.uci.edu/dataset/277",
    "citation": "Zieba, M., Tomczak, J. M., Lubicz, M., & Swiatek, J. (2013). Boosted SVM for extracting rules from imbalanced data in application to prediction of the post-operative life expectancy in the lung cancer patients. Applied Soft Computing. UCI Machine Learning Repository.",
    "rows": 470,
    "positive_label": "Died within one year",
    "negative_label": "Survived one year",
    "outcome": "Death within one year of major lung resection",
    "clinical_context": "470 patients who underwent lung resection at Wroclaw Thoracic Surgery Centre, 2007-2011. The question is post-operative risk, so the features are all pre-operative: lung function, symptoms, comorbidities and tumour stage. 70 deaths, 14.9% \u2014 imbalanced enough that recall matters far more than accuracy.",
    "preprocessing_note": "The raw columns are opaque codes; they are relabelled from the source publication so an explanation names a clinical finding rather than 'PRE9'. `PRE5` (FEV1, litres) contains 14 physiologically impossible values between 52 and 86 L \u2014 no lung holds 86 litres \u2014 which fall outside the declared 0.5-9 L range and are therefore treated as missing rather than trained on. The upper bound is 9 rather than a tidier 7 because one genuine record reads 8.56 L: extreme, but possible, and discarding a real value to keep a round number would be the wrong trade. Median imputation suffices; after that correction the dataset is otherwise complete.",
    "imputer": "median",
    "primary": false,
    "feature_groups": [
      {
        "key": "demographics",
        "label": "Demographics",
        "features": [
          {
            "name": "AGE",
            "label": "Age at surgery",
            "group": "demographics",
            "lo": 21,
            "hi": 87,
            "kind": "numeric",
            "unit": "years",
            "decimals": 0,
            "choices": null,
            "higher_is_worse": true,
            "description": "",
            "default": 62
          }
        ]
      },
      {
        "key": "history",
        "label": "Medical history",
        "features": [
          {
            "name": "PRE30",
            "label": "Smoker",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 1
          },
          {
            "name": "PRE17",
            "label": "Type 2 diabetes",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "PRE19",
            "label": "Myocardial infarction within 6 months",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "PRE25",
            "label": "Peripheral arterial disease",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "PRE32",
            "label": "Asthma",
            "group": "history",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          }
        ]
      },
      {
        "key": "vitals",
        "label": "Vitals & examination",
        "features": [
          {
            "name": "PRE4",
            "label": "Forced vital capacity (FVC)",
            "group": "vitals",
            "lo": 1.0,
            "hi": 7.0,
            "kind": "numeric",
            "unit": "L",
            "decimals": 2,
            "choices": null,
            "higher_is_worse": false,
            "description": "Total volume exhalable in one breath. Low FVC means less pulmonary reserve to survive losing lung tissue.",
            "default": 3.16
          },
          {
            "name": "PRE5",
            "label": "FEV1",
            "group": "vitals",
            "lo": 0.5,
            "hi": 9.0,
            "kind": "numeric",
            "unit": "L",
            "decimals": 2,
            "choices": null,
            "higher_is_worse": false,
            "description": "Volume exhaled in the first second. The key measure of operability in thoracic surgery. The upper bound is 9 L rather than a tidier 7 because one training record holds 8.56 L \u2014 extreme but possible \u2014 and a validator that rejects a value the model was trained on is simply wrong.",
            "default": 2.4
          },
          {
            "name": "PRE6",
            "label": "Performance status (Zubrod)",
            "group": "vitals",
            "lo": 0,
            "hi": 2,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "0 \u2014 fully active",
              "1": "1 \u2014 restricted but ambulatory",
              "2": "2 \u2014 ambulatory, no work"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 1
          },
          {
            "name": "PRE7",
            "label": "Pain before surgery",
            "group": "vitals",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          },
          {
            "name": "PRE8",
            "label": "Haemoptysis before surgery",
            "group": "vitals",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "Coughing blood.",
            "default": 0
          },
          {
            "name": "PRE9",
            "label": "Dyspnoea before surgery",
            "group": "vitals",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "Breathlessness at rest or on mild exertion.",
            "default": 0
          },
          {
            "name": "PRE10",
            "label": "Cough before surgery",
            "group": "vitals",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 1
          },
          {
            "name": "PRE11",
            "label": "Weakness before surgery",
            "group": "vitals",
            "lo": 0,
            "hi": 1,
            "kind": "binary",
            "unit": "",
            "decimals": 0,
            "choices": {
              "0": "No",
              "1": "Yes"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 0
          }
        ]
      },
      {
        "key": "tumour",
        "label": "Tumour characteristics",
        "features": [
          {
            "name": "DGN",
            "label": "Diagnosis (ICD-10 group)",
            "group": "tumour",
            "lo": 1,
            "hi": 8,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": {
              "1": "DGN1",
              "2": "DGN2",
              "3": "DGN3",
              "4": "DGN4",
              "5": "DGN5",
              "6": "DGN6",
              "8": "DGN8"
            },
            "higher_is_worse": null,
            "description": "Primary and secondary tumour ICD-10 grouping as coded by the source registry.",
            "default": 3
          },
          {
            "name": "PRE14",
            "label": "Tumour size (clinical T stage)",
            "group": "tumour",
            "lo": 11,
            "hi": 14,
            "kind": "ordinal",
            "unit": "",
            "decimals": 0,
            "choices": {
              "11": "T1 \u2014 smallest",
              "12": "T2",
              "13": "T3",
              "14": "T4 \u2014 largest"
            },
            "higher_is_worse": true,
            "description": "",
            "default": 12
          }
        ]
      }
    ],
    "dropped_columns": [],
    "feature_count": 16,
    "best_model": "logistic_regression",
    "best_model_label": "Logistic Regression"
  }
];

export const STATIC_OVERVIEW: ExplainabilityOverview = {
  "method_notes": {
    "fidelity": "Top-k highest-|SHAP| features replaced with the training mean (0 in standardised space), mean |delta probability| compared with the same number of randomly chosen features over 3 draws. Score is the ratio of the two averages across k = 1..5.",
    "stability": "Cosine similarity between SHAP attribution vectors of each test patient and its 5 nearest neighbours in standardised feature space, against a random-pair baseline.",
    "comprehensibility": "Fraction of each patient's top-3 SHAP features appearing in a literature-derived risk-factor list fixed in advance, plus mean top-5 overlap between SHAP and LIME on a 25-patient sample."
  },
  "best_models": {
    "heart_disease": "logistic_regression",
    "heart_failure": "random_forest",
    "diabetes": "random_forest",
    "kidney_disease": "random_forest",
    "breast_cancer": "logistic_regression",
    "breast_cancer_recurrence": "random_forest",
    "breast_cancer_survival": "random_forest",
    "cervical_cancer": "logistic_regression",
    "lung_cancer_surgery": "logistic_regression"
  },
  "datasets": {
    "heart_disease": {
      "slug": "heart_disease",
      "title": "Heart Disease (Cleveland)",
      "positive_label": "Heart disease present",
      "model_label": "Logistic Regression",
      "fidelity": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 13,
        "top_k_probability_drop": [
          0.1269,
          0.1648,
          0.1999,
          0.2213,
          0.2538
        ],
        "random_k_probability_drop": [
          0.0375,
          0.0599,
          0.0773,
          0.1,
          0.1277
        ],
        "fidelity_score": 2.402,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 2.4x more than ablating the same number of random features."
      },
      "stability": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.5708,
        "std_neighbour_cosine": 0.2924,
        "mean_random_cosine": -0.0272,
        "stability_gap": 0.5979,
        "pairs_compared": 305,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.57 versus -0.03 for unrelated patients (gap +0.60)."
      },
      "comprehensibility": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "clinical_reference_features": [
          "age",
          "ca",
          "chol",
          "cp",
          "exang",
          "oldpeak",
          "slope",
          "thal",
          "thalach",
          "trestbps"
        ],
        "top3_clinical_hit_rate": 0.847,
        "shap_lime_top5_overlap": 0.808,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a low likelihood of \u201cHeart disease present\u201d (25%). Lowering it: Thallium perfusion scan (Normal), Major vessels coloured by fluoroscopy (0), Maximum heart rate achieved (182 bpm)."
      },
      "global_importance": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "base_value": -0.16728130677594882,
        "features": [
          {
            "feature": "ca",
            "label": "Major vessels coloured by fluoroscopy",
            "group": "labs",
            "mean_abs_shap": 0.7468918189793898,
            "mean_signed_shap": 0.2744642892745467
          },
          {
            "feature": "thal",
            "label": "Thallium perfusion scan",
            "group": "labs",
            "mean_abs_shap": 0.5565421812855329,
            "mean_signed_shap": -0.006857681338919941
          },
          {
            "feature": "sex",
            "label": "Sex",
            "group": "demographics",
            "mean_abs_shap": 0.43459745359486246,
            "mean_signed_shap": 0.002097945375690008
          },
          {
            "feature": "cp",
            "label": "Chest pain type",
            "group": "vitals",
            "mean_abs_shap": 0.3224055004710325,
            "mean_signed_shap": -0.008713662174892748
          },
          {
            "feature": "exang",
            "label": "Exercise-induced angina",
            "group": "vitals",
            "mean_abs_shap": 0.3055373497290126,
            "mean_signed_shap": 0.005488694905311586
          },
          {
            "feature": "thalach",
            "label": "Maximum heart rate achieved",
            "group": "vitals",
            "mean_abs_shap": 0.2379162050146027,
            "mean_signed_shap": 0.035113581814875616
          },
          {
            "feature": "slope",
            "label": "ST segment slope at peak exercise",
            "group": "vitals",
            "mean_abs_shap": 0.21471733192378198,
            "mean_signed_shap": 0.046746577798904614
          },
          {
            "feature": "oldpeak",
            "label": "ST depression (exercise vs rest)",
            "group": "vitals",
            "mean_abs_shap": 0.20483661068704564,
            "mean_signed_shap": 0.06074180262370184
          },
          {
            "feature": "restecg",
            "label": "Resting ECG",
            "group": "vitals",
            "mean_abs_shap": 0.17244896267535875,
            "mean_signed_shap": 0.014950510927219959
          },
          {
            "feature": "trestbps",
            "label": "Resting blood pressure",
            "group": "vitals",
            "mean_abs_shap": 0.12723155514363638,
            "mean_signed_shap": 0.038663597343961104
          },
          {
            "feature": "chol",
            "label": "Serum cholesterol",
            "group": "labs",
            "mean_abs_shap": 0.09714978166064031,
            "mean_signed_shap": -0.04621538426824853
          },
          {
            "feature": "fbs",
            "label": "Fasting blood sugar > 120 mg/dL",
            "group": "labs",
            "mean_abs_shap": 0.0774998311522798,
            "mean_signed_shap": -0.01046475215167771
          },
          {
            "feature": "age",
            "label": "Age",
            "group": "demographics",
            "mean_abs_shap": 0.00019459722509580774,
            "mean_signed_shap": 4.187100786893923e-05
          }
        ]
      },
      "metrics": {
        "accuracy": 0.8688524590163934,
        "precision": 0.8125,
        "recall": 0.9285714285714286,
        "f1": 0.8666666666666667,
        "roc_auc": 0.9577922077922079,
        "average_precision": 0.9396597328991854,
        "majority_baseline": 0.540983606557377
      }
    },
    "heart_failure": {
      "slug": "heart_failure",
      "title": "Heart Failure Clinical Records",
      "positive_label": "Death during follow-up",
      "model_label": "Random Forest",
      "fidelity": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 11,
        "top_k_probability_drop": [
          0.1399,
          0.1744,
          0.1873,
          0.1962,
          0.2084
        ],
        "random_k_probability_drop": [
          0.0272,
          0.0502,
          0.0767,
          0.0895,
          0.1277
        ],
        "fidelity_score": 2.441,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 2.4x more than ablating the same number of random features."
      },
      "stability": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.3383,
        "std_neighbour_cosine": 0.5146,
        "mean_random_cosine": 0.1046,
        "stability_gap": 0.2338,
        "pairs_compared": 300,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.34 versus 0.10 for unrelated patients (gap +0.23)."
      },
      "comprehensibility": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "clinical_reference_features": [
          "age",
          "anaemia",
          "ejection_fraction",
          "high_blood_pressure",
          "serum_creatinine",
          "serum_sodium"
        ],
        "top3_clinical_hit_rate": 0.85,
        "shap_lime_top5_overlap": 0.688,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a moderate likelihood of \u201cDeath during follow-up\u201d (34%). Raising the estimate: Platelet count (150000 platelets/mL), Anaemia (Yes). Lowering it: Serum creatinine (1.00 mg/dL)."
      },
      "global_importance": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "base_value": 0.3201255230125521,
        "features": [
          {
            "feature": "serum_creatinine",
            "label": "Serum creatinine",
            "group": "labs",
            "mean_abs_shap": 0.10945085296312536,
            "mean_signed_shap": 0.011694842302649798
          },
          {
            "feature": "ejection_fraction",
            "label": "Ejection fraction",
            "group": "vitals",
            "mean_abs_shap": 0.07762181757870984,
            "mean_signed_shap": -0.02186972388738755
          },
          {
            "feature": "age",
            "label": "Age",
            "group": "demographics",
            "mean_abs_shap": 0.042364730520133606,
            "mean_signed_shap": 0.006729940895866497
          },
          {
            "feature": "serum_sodium",
            "label": "Serum sodium",
            "group": "labs",
            "mean_abs_shap": 0.03631826972521232,
            "mean_signed_shap": 0.003075480086802791
          },
          {
            "feature": "platelets",
            "label": "Platelet count",
            "group": "labs",
            "mean_abs_shap": 0.0297005817383844,
            "mean_signed_shap": -0.0014905271464906457
          },
          {
            "feature": "high_blood_pressure",
            "label": "Hypertension",
            "group": "history",
            "mean_abs_shap": 0.018747600508566407,
            "mean_signed_shap": -0.004818721598148689
          },
          {
            "feature": "anaemia",
            "label": "Anaemia",
            "group": "labs",
            "mean_abs_shap": 0.015988885486035137,
            "mean_signed_shap": -0.0021766879791541034
          },
          {
            "feature": "creatinine_phosphokinase",
            "label": "Creatinine phosphokinase (CPK)",
            "group": "labs",
            "mean_abs_shap": 0.014097609730383234,
            "mean_signed_shap": -0.0008343920169856633
          },
          {
            "feature": "diabetes",
            "label": "Diabetes",
            "group": "history",
            "mean_abs_shap": 0.011249451520181865,
            "mean_signed_shap": -0.004445476787550812
          },
          {
            "feature": "smoking",
            "label": "Smoker",
            "group": "history",
            "mean_abs_shap": 0.008278210192192884,
            "mean_signed_shap": -0.00039846971718854416
          },
          {
            "feature": "sex",
            "label": "Sex",
            "group": "demographics",
            "mean_abs_shap": 0.005242550419216044,
            "mean_signed_shap": -0.0017794544879995073
          }
        ]
      },
      "metrics": {
        "accuracy": 0.7333333333333333,
        "precision": 0.6,
        "recall": 0.47368421052631576,
        "f1": 0.5294117647058824,
        "roc_auc": 0.7894736842105263,
        "average_precision": 0.5750079355342512,
        "majority_baseline": 0.6833333333333333
      }
    },
    "diabetes": {
      "slug": "diabetes",
      "title": "Pima Indians Diabetes",
      "positive_label": "Diabetes onset",
      "model_label": "Random Forest",
      "fidelity": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 8,
        "top_k_probability_drop": [
          0.1493,
          0.1976,
          0.2435,
          0.2627,
          0.2634
        ],
        "random_k_probability_drop": [
          0.0384,
          0.072,
          0.1022,
          0.1268,
          0.167
        ],
        "fidelity_score": 2.205,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 2.2x more than ablating the same number of random features."
      },
      "stability": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.6155,
        "std_neighbour_cosine": 0.4717,
        "mean_random_cosine": 0.0134,
        "stability_gap": 0.6021,
        "pairs_compared": 770,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.62 versus 0.01 for unrelated patients (gap +0.60)."
      },
      "comprehensibility": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "clinical_reference_features": [
          "Age",
          "BMI",
          "DiabetesPedigreeFunction",
          "Glucose",
          "Insulin",
          "Pregnancies"
        ],
        "top3_clinical_hit_rate": 0.991,
        "shap_lime_top5_overlap": 0.864,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a high likelihood of \u201cDiabetes onset\u201d (77%). Raising the estimate: Plasma glucose (2-hour OGTT) (159 mg/dL), Age (40 years). Lowering it: Body mass index (27.4 kg/m\u00b2)."
      },
      "global_importance": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "base_value": 0.49705329323273545,
        "features": [
          {
            "feature": "Glucose",
            "label": "Plasma glucose (2-hour OGTT)",
            "group": "labs",
            "mean_abs_shap": 0.16183296005132017,
            "mean_signed_shap": -0.03275906213408813
          },
          {
            "feature": "BMI",
            "label": "Body mass index",
            "group": "vitals",
            "mean_abs_shap": 0.08767731298011937,
            "mean_signed_shap": -0.022154480962009435
          },
          {
            "feature": "Age",
            "label": "Age",
            "group": "demographics",
            "mean_abs_shap": 0.06132192398702352,
            "mean_signed_shap": -0.009096432019234543
          },
          {
            "feature": "Insulin",
            "label": "2-hour serum insulin",
            "group": "labs",
            "mean_abs_shap": 0.03057469071831055,
            "mean_signed_shap": -0.005010454563073612
          },
          {
            "feature": "DiabetesPedigreeFunction",
            "label": "Diabetes pedigree function",
            "group": "demographics",
            "mean_abs_shap": 0.02600705316495469,
            "mean_signed_shap": -0.0070289512370251975
          },
          {
            "feature": "Pregnancies",
            "label": "Number of pregnancies",
            "group": "demographics",
            "mean_abs_shap": 0.015329371962772701,
            "mean_signed_shap": -0.0004623688367246847
          },
          {
            "feature": "SkinThickness",
            "label": "Triceps skin fold thickness",
            "group": "vitals",
            "mean_abs_shap": 0.012586361145584188,
            "mean_signed_shap": -0.0014886825770464803
          },
          {
            "feature": "BloodPressure",
            "label": "Diastolic blood pressure",
            "group": "vitals",
            "mean_abs_shap": 0.004781984445322373,
            "mean_signed_shap": -0.0003959580420888059
          }
        ]
      },
      "metrics": {
        "accuracy": 0.7532467532467533,
        "precision": 0.6212121212121212,
        "recall": 0.7592592592592593,
        "f1": 0.6833333333333333,
        "roc_auc": 0.8142592592592592,
        "average_precision": 0.6964473561262843,
        "majority_baseline": 0.6493506493506493
      }
    },
    "kidney_disease": {
      "slug": "kidney_disease",
      "title": "Chronic Kidney Disease",
      "positive_label": "Chronic kidney disease",
      "model_label": "Random Forest",
      "fidelity": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 24,
        "top_k_probability_drop": [
          0.0941,
          0.182,
          0.2596,
          0.3135,
          0.3424
        ],
        "random_k_probability_drop": [
          0.0259,
          0.0466,
          0.0689,
          0.108,
          0.1221
        ],
        "fidelity_score": 3.207,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 3.2x more than ablating the same number of random features."
      },
      "stability": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.6638,
        "std_neighbour_cosine": 0.433,
        "mean_random_cosine": 0.0129,
        "stability_gap": 0.6508,
        "pairs_compared": 400,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.66 versus 0.01 for unrelated patients (gap +0.65)."
      },
      "comprehensibility": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "clinical_reference_features": [
          "al",
          "ane",
          "bu",
          "dm",
          "hemo",
          "htn",
          "pcv",
          "rbcc",
          "sc",
          "sg"
        ],
        "top3_clinical_hit_rate": 0.796,
        "shap_lime_top5_overlap": 0.488,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a low likelihood of \u201cChronic kidney disease\u201d (1%). Lowering it: Packed cell volume (50 %), Urine specific gravity (1.020), Haemoglobin (15.0 g/dL)."
      },
      "global_importance": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "base_value": 0.6251666666666666,
        "features": [
          {
            "feature": "sg",
            "label": "Urine specific gravity",
            "group": "labs",
            "mean_abs_shap": 0.079473790124266,
            "mean_signed_shap": -0.008236328505197633
          },
          {
            "feature": "rbc",
            "label": "Red blood cells (urine microscopy)",
            "group": "labs",
            "mean_abs_shap": 0.06652798208913394,
            "mean_signed_shap": -0.0018864241923695715
          },
          {
            "feature": "hemo",
            "label": "Haemoglobin",
            "group": "labs",
            "mean_abs_shap": 0.06590528824812454,
            "mean_signed_shap": -0.007697188777825326
          },
          {
            "feature": "pcv",
            "label": "Packed cell volume",
            "group": "labs",
            "mean_abs_shap": 0.058667979144210534,
            "mean_signed_shap": -0.015310337456767183
          },
          {
            "feature": "al",
            "label": "Urine albumin",
            "group": "labs",
            "mean_abs_shap": 0.057777838967961515,
            "mean_signed_shap": 0.004668574567142322
          },
          {
            "feature": "sc",
            "label": "Serum creatinine",
            "group": "labs",
            "mean_abs_shap": 0.05504010567222524,
            "mean_signed_shap": -0.00458749284792434
          },
          {
            "feature": "htn",
            "label": "Hypertension",
            "group": "history",
            "mean_abs_shap": 0.031250098103633245,
            "mean_signed_shap": -0.0026340101520218257
          },
          {
            "feature": "dm",
            "label": "Diabetes mellitus",
            "group": "history",
            "mean_abs_shap": 0.02511372073545808,
            "mean_signed_shap": 0.004158374853001359
          },
          {
            "feature": "bgr",
            "label": "Random blood glucose",
            "group": "labs",
            "mean_abs_shap": 0.019294508103816322,
            "mean_signed_shap": 0.003950206119796433
          },
          {
            "feature": "rbcc",
            "label": "Red blood cell count",
            "group": "labs",
            "mean_abs_shap": 0.01560482362075603,
            "mean_signed_shap": -0.0022637534133484825
          },
          {
            "feature": "sod",
            "label": "Serum sodium",
            "group": "labs",
            "mean_abs_shap": 0.015033728272723354,
            "mean_signed_shap": -0.003947809588149951
          },
          {
            "feature": "pc",
            "label": "Pus cells",
            "group": "labs",
            "mean_abs_shap": 0.009843524686080655,
            "mean_signed_shap": -0.000815655736525972
          },
          {
            "feature": "bu",
            "label": "Blood urea",
            "group": "labs",
            "mean_abs_shap": 0.008050410808497287,
            "mean_signed_shap": -0.0024978031572058792
          },
          {
            "feature": "appet",
            "label": "Appetite",
            "group": "vitals",
            "mean_abs_shap": 0.0068446449527051435,
            "mean_signed_shap": 0.0021132390799875086
          },
          {
            "feature": "pe",
            "label": "Pedal oedema",
            "group": "vitals",
            "mean_abs_shap": 0.00486224418122601,
            "mean_signed_shap": 0.002522365788010963
          },
          {
            "feature": "bp",
            "label": "Blood pressure",
            "group": "vitals",
            "mean_abs_shap": 0.003942301999857776,
            "mean_signed_shap": -0.0005649511966420763
          },
          {
            "feature": "su",
            "label": "Urine sugar",
            "group": "labs",
            "mean_abs_shap": 0.003486576962962362,
            "mean_signed_shap": 0.0012036590282899413
          },
          {
            "feature": "pot",
            "label": "Serum potassium",
            "group": "labs",
            "mean_abs_shap": 0.0028545987994711155,
            "mean_signed_shap": -0.000523187650842634
          },
          {
            "feature": "age",
            "label": "Age",
            "group": "demographics",
            "mean_abs_shap": 0.002421331011405201,
            "mean_signed_shap": -0.0007486493571286373
          },
          {
            "feature": "wbcc",
            "label": "White blood cell count",
            "group": "labs",
            "mean_abs_shap": 0.0016549249357772412,
            "mean_signed_shap": -0.00028497954206552846
          },
          {
            "feature": "ane",
            "label": "Anaemia",
            "group": "labs",
            "mean_abs_shap": 0.0013347189816284354,
            "mean_signed_shap": 5.6727859777820676e-05
          },
          {
            "feature": "pcc",
            "label": "Pus cell clumps",
            "group": "labs",
            "mean_abs_shap": 0.0006084129921186808,
            "mean_signed_shap": -0.0003594341575096169
          },
          {
            "feature": "cad",
            "label": "Coronary artery disease",
            "group": "history",
            "mean_abs_shap": 0.00033461118049602574,
            "mean_signed_shap": -0.00010618271333629075
          },
          {
            "feature": "ba",
            "label": "Bacteria",
            "group": "labs",
            "mean_abs_shap": 0.0002813136549020641,
            "mean_signed_shap": -2.745909739759876e-05
          }
        ]
      },
      "metrics": {
        "accuracy": 1.0,
        "precision": 1.0,
        "recall": 1.0,
        "f1": 1.0,
        "roc_auc": 1.0,
        "average_precision": 1.0,
        "majority_baseline": 0.625
      }
    },
    "breast_cancer": {
      "slug": "breast_cancer",
      "title": "Breast Cancer Wisconsin (Diagnostic)",
      "positive_label": "Malignant",
      "model_label": "Logistic Regression",
      "fidelity": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 30,
        "top_k_probability_drop": [
          0.0519,
          0.0618,
          0.0738,
          0.0894,
          0.1047
        ],
        "random_k_probability_drop": [
          0.0083,
          0.0158,
          0.0222,
          0.0241,
          0.0295
        ],
        "fidelity_score": 3.824,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 3.8x more than ablating the same number of random features."
      },
      "stability": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.7611,
        "std_neighbour_cosine": 0.1932,
        "mean_random_cosine": 0.0385,
        "stability_gap": 0.7226,
        "pairs_compared": 570,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.76 versus 0.04 for unrelated patients (gap +0.72)."
      },
      "comprehensibility": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "clinical_reference_features": [
          "area1",
          "area3",
          "compactness1",
          "compactness3",
          "concave_points1",
          "concave_points3",
          "concavity1",
          "concavity3",
          "perimeter1",
          "perimeter3",
          "radius1",
          "radius3",
          "texture1",
          "texture3"
        ],
        "top3_clinical_hit_rate": 0.596,
        "shap_lime_top5_overlap": 0.688,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a low likelihood of \u201cMalignant\u201d (0%). Lowering it: Texture (grey-scale s.d.) (worst) (16.0), Radius (variability) (0.14 \u00b5m), Texture (grey-scale s.d.) (mean) (10.8)."
      },
      "global_importance": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "base_value": 0.9557150398937644,
        "features": [
          {
            "feature": "texture3",
            "label": "Texture (grey-scale s.d.) (worst)",
            "group": "morphology_worst",
            "mean_abs_shap": 1.2417737887968778,
            "mean_signed_shap": -0.3815753722277295
          },
          {
            "feature": "radius2",
            "label": "Radius (variability)",
            "group": "morphology_se",
            "mean_abs_shap": 0.7674147442981099,
            "mean_signed_shap": -0.16100581743181555
          },
          {
            "feature": "symmetry3",
            "label": "Symmetry (worst)",
            "group": "morphology_worst",
            "mean_abs_shap": 0.7391408591432406,
            "mean_signed_shap": -0.08997309307686842
          },
          {
            "feature": "concave_points1",
            "label": "Concave points (mean)",
            "group": "morphology_mean",
            "mean_abs_shap": 0.7242774055271437,
            "mean_signed_shap": -0.12570437335208062
          },
          {
            "feature": "radius3",
            "label": "Radius (worst)",
            "group": "morphology_worst",
            "mean_abs_shap": 0.7122307120047473,
            "mean_signed_shap": -0.21048845539655378
          },
          {
            "feature": "area3",
            "label": "Area (worst)",
            "group": "morphology_worst",
            "mean_abs_shap": 0.7025224731697136,
            "mean_signed_shap": -0.21232564999453393
          },
          {
            "feature": "compactness2",
            "label": "Compactness (variability)",
            "group": "morphology_se",
            "mean_abs_shap": 0.6954892744346172,
            "mean_signed_shap": -0.04790580098167834
          },
          {
            "feature": "concavity3",
            "label": "Concavity (worst)",
            "group": "morphology_worst",
            "mean_abs_shap": 0.6930946004214622,
            "mean_signed_shap": -0.1292048721456778
          },
          {
            "feature": "concave_points3",
            "label": "Concave points (worst)",
            "group": "morphology_worst",
            "mean_abs_shap": 0.5699027200006797,
            "mean_signed_shap": -0.16144698401488145
          },
          {
            "feature": "concavity1",
            "label": "Concavity (mean)",
            "group": "morphology_mean",
            "mean_abs_shap": 0.5662404937986272,
            "mean_signed_shap": -0.0621215779921513
          },
          {
            "feature": "perimeter3",
            "label": "Perimeter (worst)",
            "group": "morphology_worst",
            "mean_abs_shap": 0.5636839125894146,
            "mean_signed_shap": -0.1588394708485024
          },
          {
            "feature": "area2",
            "label": "Area (variability)",
            "group": "morphology_se",
            "mean_abs_shap": 0.495502422351412,
            "mean_signed_shap": -0.12475313954378936
          },
          {
            "feature": "perimeter2",
            "label": "Perimeter (variability)",
            "group": "morphology_se",
            "mean_abs_shap": 0.43246141769296376,
            "mean_signed_shap": -0.07522521694668145
          },
          {
            "feature": "texture1",
            "label": "Texture (grey-scale s.d.) (mean)",
            "group": "morphology_mean",
            "mean_abs_shap": 0.39179121624713653,
            "mean_signed_shap": -0.08194250866844828
          },
          {
            "feature": "fractal_dimension2",
            "label": "Fractal dimension (variability)",
            "group": "morphology_se",
            "mean_abs_shap": 0.3821033948327859,
            "mean_signed_shap": -0.01237797855839867
          },
          {
            "feature": "concave_points2",
            "label": "Concave points (variability)",
            "group": "morphology_se",
            "mean_abs_shap": 0.34486073266942513,
            "mean_signed_shap": -0.0019074239722634177
          },
          {
            "feature": "compactness1",
            "label": "Compactness (mean)",
            "group": "morphology_mean",
            "mean_abs_shap": 0.33269190617249444,
            "mean_signed_shap": 0.02788903170236679
          },
          {
            "feature": "area1",
            "label": "Area (mean)",
            "group": "morphology_mean",
            "mean_abs_shap": 0.33026914759964787,
            "mean_signed_shap": -0.07313956579314901
          },
          {
            "feature": "texture2",
            "label": "Texture (grey-scale s.d.) (variability)",
            "group": "morphology_se",
            "mean_abs_shap": 0.32016833661751676,
            "mean_signed_shap": 0.003351454638066943
          },
          {
            "feature": "smoothness3",
            "label": "Smoothness (worst)",
            "group": "morphology_worst",
            "mean_abs_shap": 0.2783441456910257,
            "mean_signed_shap": -0.05223626889223574
          },
          {
            "feature": "radius1",
            "label": "Radius (mean)",
            "group": "morphology_mean",
            "mean_abs_shap": 0.2702450270744507,
            "mean_signed_shap": -0.06074828394437086
          },
          {
            "feature": "perimeter1",
            "label": "Perimeter (mean)",
            "group": "morphology_mean",
            "mean_abs_shap": 0.2635689011613589,
            "mean_signed_shap": -0.057188101305771864
          },
          {
            "feature": "smoothness1",
            "label": "Smoothness (mean)",
            "group": "morphology_mean",
            "mean_abs_shap": 0.24742491830271854,
            "mean_signed_shap": -0.007562348481969198
          },
          {
            "feature": "symmetry2",
            "label": "Symmetry (variability)",
            "group": "morphology_se",
            "mean_abs_shap": 0.21731216790563765,
            "mean_signed_shap": -0.08122984126099796
          },
          {
            "feature": "smoothness2",
            "label": "Smoothness (variability)",
            "group": "morphology_se",
            "mean_abs_shap": 0.2087386753750365,
            "mean_signed_shap": 0.062477153086021114
          },
          {
            "feature": "compactness3",
            "label": "Compactness (worst)",
            "group": "morphology_worst",
            "mean_abs_shap": 0.13121546935966263,
            "mean_signed_shap": 0.021774980449759253
          },
          {
            "feature": "symmetry1",
            "label": "Symmetry (mean)",
            "group": "morphology_mean",
            "mean_abs_shap": 0.12798429902125597,
            "mean_signed_shap": 0.017044123400876465
          },
          {
            "feature": "concavity2",
            "label": "Concavity (variability)",
            "group": "morphology_se",
            "mean_abs_shap": 0.056699884440473254,
            "mean_signed_shap": -0.0014035914101759635
          },
          {
            "feature": "fractal_dimension1",
            "label": "Fractal dimension (mean)",
            "group": "morphology_mean",
            "mean_abs_shap": 0.05176523790573582,
            "mean_signed_shap": -0.003948559881976766
          },
          {
            "feature": "fractal_dimension3",
            "label": "Fractal dimension (worst)",
            "group": "morphology_worst",
            "mean_abs_shap": 0.045340133369262056,
            "mean_signed_shap": -0.007812247270146501
          }
        ]
      },
      "metrics": {
        "accuracy": 0.9736842105263158,
        "precision": 0.975609756097561,
        "recall": 0.9523809523809523,
        "f1": 0.963855421686747,
        "roc_auc": 0.996031746031746,
        "average_precision": 0.994273631904294,
        "majority_baseline": 0.631578947368421
      }
    },
    "breast_cancer_recurrence": {
      "slug": "breast_cancer_recurrence",
      "title": "Breast Cancer Recurrence (Ljubljana)",
      "positive_label": "Recurrence",
      "model_label": "Random Forest",
      "fidelity": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 9,
        "top_k_probability_drop": [
          0.0869,
          0.1252,
          0.1477,
          0.1455,
          0.1455
        ],
        "random_k_probability_drop": [
          0.0269,
          0.0516,
          0.0771,
          0.0919,
          0.1027
        ],
        "fidelity_score": 1.859,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 1.9x more than ablating the same number of random features."
      },
      "stability": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.5149,
        "std_neighbour_cosine": 0.4781,
        "mean_random_cosine": 0.0443,
        "stability_gap": 0.4706,
        "pairs_compared": 290,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.51 versus 0.04 for unrelated patients (gap +0.47)."
      },
      "comprehensibility": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "clinical_reference_features": [
          "age",
          "deg-malig",
          "inv-nodes",
          "menopause",
          "node-caps",
          "tumor-size"
        ],
        "top3_clinical_hit_rate": 0.914,
        "shap_lime_top5_overlap": 0.72,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a low likelihood of \u201cRecurrence\u201d (13%). Lowering it: Tumour size (band midpoint) (7 mm), Involved axillary nodes (band midpoint) (1), Histological grade (Grade 2 (moderately differentiated))."
      },
      "global_importance": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "base_value": 0.30095029239766086,
        "features": [
          {
            "feature": "deg-malig",
            "label": "Histological grade",
            "group": "tumour",
            "mean_abs_shap": 0.06743752577525455,
            "mean_signed_shap": 0.0075112643759101694
          },
          {
            "feature": "inv-nodes",
            "label": "Involved axillary nodes (band midpoint)",
            "group": "tumour",
            "mean_abs_shap": 0.053625206512244276,
            "mean_signed_shap": -0.0020418522472661167
          },
          {
            "feature": "tumor-size",
            "label": "Tumour size (band midpoint)",
            "group": "tumour",
            "mean_abs_shap": 0.0377622833100287,
            "mean_signed_shap": 0.004259614311478081
          },
          {
            "feature": "node-caps",
            "label": "Node capsular invasion",
            "group": "tumour",
            "mean_abs_shap": 0.03316255309705939,
            "mean_signed_shap": -0.003297675810229878
          },
          {
            "feature": "irradiat",
            "label": "Received radiotherapy",
            "group": "history",
            "mean_abs_shap": 0.023446997090579787,
            "mean_signed_shap": 0.001719187436991561
          },
          {
            "feature": "breast-quad",
            "label": "Quadrant",
            "group": "tumour",
            "mean_abs_shap": 0.022427707768657257,
            "mean_signed_shap": -0.0009699967530193373
          },
          {
            "feature": "age",
            "label": "Age band (midpoint)",
            "group": "demographics",
            "mean_abs_shap": 0.007565846291942595,
            "mean_signed_shap": 0.001648191390133291
          },
          {
            "feature": "breast",
            "label": "Affected breast",
            "group": "tumour",
            "mean_abs_shap": 0.007453311268800377,
            "mean_signed_shap": -0.0013055285727988162
          },
          {
            "feature": "menopause",
            "label": "Menopausal status",
            "group": "demographics",
            "mean_abs_shap": 0.005006363498740653,
            "mean_signed_shap": 0.0004092822112027732
          }
        ]
      },
      "metrics": {
        "accuracy": 0.7758620689655172,
        "precision": 0.7,
        "recall": 0.4117647058823529,
        "f1": 0.5185185185185185,
        "roc_auc": 0.6657101865136298,
        "average_precision": 0.5730217350375719,
        "majority_baseline": 0.7068965517241379
      }
    },
    "breast_cancer_survival": {
      "slug": "breast_cancer_survival",
      "title": "Breast Cancer Surgical Survival (Haberman)",
      "positive_label": "Died within five years",
      "model_label": "Random Forest",
      "fidelity": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_values": [
          1,
          2,
          3
        ],
        "n_features": 3,
        "top_k_probability_drop": [
          0.1474,
          0.1609,
          0.1632
        ],
        "random_k_probability_drop": [
          0.077,
          0.1267,
          0.1632
        ],
        "fidelity_score": 1.285,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 1.3x more than ablating the same number of random features."
      },
      "stability": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.7075,
        "std_neighbour_cosine": 0.4801,
        "mean_random_cosine": 0.2922,
        "stability_gap": 0.4153,
        "pairs_compared": 310,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.71 versus 0.29 for unrelated patients (gap +0.42)."
      },
      "comprehensibility": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "clinical_reference_features": [
          "age",
          "positive_auxillary_nodes"
        ],
        "top3_clinical_hit_rate": 0.667,
        "shap_lime_top5_overlap": 0.6,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a low likelihood of \u201cDied within five years\u201d (26%). Lowering it: Positive axillary nodes (0), Year of operation (68 19xx), Age at operation (61 years)."
      },
      "global_importance": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "base_value": 0.4971965337278609,
        "features": [
          {
            "feature": "positive_auxillary_nodes",
            "label": "Positive axillary nodes",
            "group": "tumour",
            "mean_abs_shap": 0.14344029287658405,
            "mean_signed_shap": -0.07214901217596124
          },
          {
            "feature": "age",
            "label": "Age at operation",
            "group": "demographics",
            "mean_abs_shap": 0.044206653582785034,
            "mean_signed_shap": -0.026308727499778896
          },
          {
            "feature": "operation_year",
            "label": "Year of operation",
            "group": "demographics",
            "mean_abs_shap": 0.033649399130293904,
            "mean_signed_shap": -0.007271915712017363
          }
        ]
      },
      "metrics": {
        "accuracy": 0.6129032258064516,
        "precision": 0.21428571428571427,
        "recall": 0.1875,
        "f1": 0.2,
        "roc_auc": 0.594429347826087,
        "average_precision": 0.3153713413083017,
        "majority_baseline": 0.7419354838709677
      }
    },
    "cervical_cancer": {
      "slug": "cervical_cancer",
      "title": "Cervical Cancer (Risk Factors)",
      "positive_label": "Biopsy-confirmed cervical cancer",
      "model_label": "Logistic Regression",
      "fidelity": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 28,
        "top_k_probability_drop": [
          0.0445,
          0.0587,
          0.0658,
          0.0691,
          0.0708
        ],
        "random_k_probability_drop": [
          0.0051,
          0.0106,
          0.0139,
          0.0174,
          0.0228
        ],
        "fidelity_score": 4.43,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 4.4x more than ablating the same number of random features."
      },
      "stability": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.8127,
        "std_neighbour_cosine": 0.2302,
        "mean_random_cosine": 0.0767,
        "stability_gap": 0.736,
        "pairs_compared": 860,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.81 versus 0.08 for unrelated patients (gap +0.74)."
      },
      "comprehensibility": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "clinical_reference_features": [
          "Age",
          "Dx",
          "Dx:CIN",
          "Dx:Cancer",
          "Dx:HPV",
          "First sexual intercourse",
          "Hormonal Contraceptives (years)",
          "Num of pregnancies",
          "Number of sexual partners",
          "STDs",
          "STDs:HPV",
          "Smokes",
          "Smokes (packs/year)",
          "Smokes (years)"
        ],
        "top3_clinical_hit_rate": 0.738,
        "shap_lime_top5_overlap": 0.048,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a moderate likelihood of \u201cBiopsy-confirmed cervical cancer\u201d (39%). Raising the estimate: Age at first intercourse (15 years). Lowering it: Age (17 years), Intrauterine device (No)."
      },
      "global_importance": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "base_value": -0.20398080595925236,
        "features": [
          {
            "feature": "Hormonal Contraceptives (years)",
            "label": "Years on hormonal contraceptives",
            "group": "history",
            "mean_abs_shap": 0.07273099861601544,
            "mean_signed_shap": 0.015522974816729679
          },
          {
            "feature": "Num of pregnancies",
            "label": "Number of pregnancies",
            "group": "demographics",
            "mean_abs_shap": 0.07164440760780104,
            "mean_signed_shap": -0.0015145628425366296
          },
          {
            "feature": "IUD",
            "label": "Intrauterine device",
            "group": "history",
            "mean_abs_shap": 0.05938020483944963,
            "mean_signed_shap": -0.002579399391479387
          },
          {
            "feature": "Age",
            "label": "Age",
            "group": "demographics",
            "mean_abs_shap": 0.04967891719126661,
            "mean_signed_shap": -0.001163757295240851
          },
          {
            "feature": "STDs:vulvo-perineal condylomatosis",
            "label": "Vulvo-perineal condylomatosis",
            "group": "sti_history",
            "mean_abs_shap": 0.039264467585706044,
            "mean_signed_shap": 0.013658070496901292
          },
          {
            "feature": "Smokes (years)",
            "label": "Years smoked",
            "group": "history",
            "mean_abs_shap": 0.03781167850232726,
            "mean_signed_shap": -0.007824329634449153
          },
          {
            "feature": "STDs:condylomatosis",
            "label": "Condylomatosis",
            "group": "sti_history",
            "mean_abs_shap": 0.03465806572144292,
            "mean_signed_shap": 0.012055742354750038
          },
          {
            "feature": "STDs",
            "label": "Any sexually transmitted infection",
            "group": "sti_history",
            "mean_abs_shap": 0.028073080625032356,
            "mean_signed_shap": 0.010671111501149882
          },
          {
            "feature": "STDs:syphilis",
            "label": "Syphilis",
            "group": "sti_history",
            "mean_abs_shap": 0.024697207538333654,
            "mean_signed_shap": -0.02120488437245591
          },
          {
            "feature": "STDs (number)",
            "label": "Number of STIs",
            "group": "sti_history",
            "mean_abs_shap": 0.022534273479976403,
            "mean_signed_shap": 0.00914843696728068
          },
          {
            "feature": "STDs: Number of diagnosis",
            "label": "Number of STI diagnoses",
            "group": "sti_history",
            "mean_abs_shap": 0.022505111948388855,
            "mean_signed_shap": 0.00880257750582455
          },
          {
            "feature": "First sexual intercourse",
            "label": "Age at first intercourse",
            "group": "sti_history",
            "mean_abs_shap": 0.022439714410531164,
            "mean_signed_shap": 0.0038422076882562357
          },
          {
            "feature": "IUD (years)",
            "label": "Years with an IUD",
            "group": "history",
            "mean_abs_shap": 0.02238584429374139,
            "mean_signed_shap": -0.0018626137340844325
          },
          {
            "feature": "Dx:HPV",
            "label": "Previous HPV diagnosis",
            "group": "diagnoses",
            "mean_abs_shap": 0.021785851600602632,
            "mean_signed_shap": -0.012081244978515994
          },
          {
            "feature": "Dx:CIN",
            "label": "Previous cervical intraepithelial neoplasia",
            "group": "diagnoses",
            "mean_abs_shap": 0.02172468291863277,
            "mean_signed_shap": -0.00579324877830208
          },
          {
            "feature": "Dx",
            "label": "Any previous diagnosis",
            "group": "diagnoses",
            "mean_abs_shap": 0.020771369534082585,
            "mean_signed_shap": -0.00932351246132117
          },
          {
            "feature": "Dx:Cancer",
            "label": "Previous cancer diagnosis",
            "group": "diagnoses",
            "mean_abs_shap": 0.02068894320913932,
            "mean_signed_shap": -0.011472959415977245
          },
          {
            "feature": "STDs:HIV",
            "label": "HIV",
            "group": "sti_history",
            "mean_abs_shap": 0.016026497982462275,
            "mean_signed_shap": -0.004305626323646585
          },
          {
            "feature": "STDs:vaginal condylomatosis",
            "label": "Vaginal condylomatosis",
            "group": "sti_history",
            "mean_abs_shap": 0.01580629817684684,
            "mean_signed_shap": -0.015806298176846822
          },
          {
            "feature": "Number of sexual partners",
            "label": "Number of sexual partners",
            "group": "sti_history",
            "mean_abs_shap": 0.005069705573003354,
            "mean_signed_shap": -0.00020597043417827667
          },
          {
            "feature": "Hormonal Contraceptives",
            "label": "Hormonal contraceptives",
            "group": "history",
            "mean_abs_shap": 0.003441791174386885,
            "mean_signed_shap": -0.00017046155510319017
          },
          {
            "feature": "Smokes",
            "label": "Smokes",
            "group": "history",
            "mean_abs_shap": 0.0027718235716641133,
            "mean_signed_shap": -4.245681619616777e-05
          },
          {
            "feature": "STDs:molluscum contagiosum",
            "label": "Molluscum contagiosum",
            "group": "sti_history",
            "mean_abs_shap": 0.0021816195960096692,
            "mean_signed_shap": 0.0021816195960096692
          },
          {
            "feature": "Smokes (packs/year)",
            "label": "Pack-years",
            "group": "history",
            "mean_abs_shap": 0.00084885071219616,
            "mean_signed_shap": 0.00023813018328638932
          },
          {
            "feature": "STDs:HPV",
            "label": "HPV",
            "group": "sti_history",
            "mean_abs_shap": 1.1247331666311871e-17,
            "mean_signed_shap": 1.1247331666311871e-17
          },
          {
            "feature": "STDs:Hepatitis B",
            "label": "Hepatitis B",
            "group": "sti_history",
            "mean_abs_shap": 3.2977424140203673e-18,
            "mean_signed_shap": 3.2977424140203673e-18
          },
          {
            "feature": "STDs:pelvic inflammatory disease",
            "label": "Pelvic inflammatory disease",
            "group": "sti_history",
            "mean_abs_shap": 2.09274943662965e-18,
            "mean_signed_shap": 2.09274943662965e-18
          },
          {
            "feature": "STDs:genital herpes",
            "label": "Genital herpes",
            "group": "sti_history",
            "mean_abs_shap": 0.0,
            "mean_signed_shap": 0.0
          }
        ]
      },
      "metrics": {
        "accuracy": 0.7732558139534884,
        "precision": 0.08823529411764706,
        "recall": 0.2727272727272727,
        "f1": 0.13333333333333333,
        "roc_auc": 0.6307171089779786,
        "average_precision": 0.10003325343770988,
        "majority_baseline": 0.936046511627907
      }
    },
    "lung_cancer_surgery": {
      "slug": "lung_cancer_surgery",
      "title": "Lung Cancer Thoracic Surgery",
      "positive_label": "Died within one year",
      "model_label": "Logistic Regression",
      "fidelity": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 16,
        "top_k_probability_drop": [
          0.0593,
          0.0647,
          0.0729,
          0.0751,
          0.0784
        ],
        "random_k_probability_drop": [
          0.0104,
          0.0226,
          0.0241,
          0.0357,
          0.0352
        ],
        "fidelity_score": 2.736,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 2.7x more than ablating the same number of random features."
      },
      "stability": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.6455,
        "std_neighbour_cosine": 0.3299,
        "mean_random_cosine": -0.0023,
        "stability_gap": 0.6478,
        "pairs_compared": 470,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.65 versus -0.00 for unrelated patients (gap +0.65)."
      },
      "comprehensibility": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "clinical_reference_features": [
          "AGE",
          "DGN",
          "PRE14",
          "PRE17",
          "PRE30",
          "PRE4",
          "PRE5",
          "PRE6",
          "PRE9"
        ],
        "top3_clinical_hit_rate": 0.844,
        "shap_lime_top5_overlap": 0.432,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a moderate likelihood of \u201cDied within one year\u201d (52%). Raising the estimate: Tumour size (clinical T stage) (T2), Smoker (Yes). Lowering it: Dyspnoea before surgery (No)."
      },
      "global_importance": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "base_value": -0.02452589160461008,
        "features": [
          {
            "feature": "PRE14",
            "label": "Tumour size (clinical T stage)",
            "group": "tumour",
            "mean_abs_shap": 0.15049900692471727,
            "mean_signed_shap": -0.0022541701477710742
          },
          {
            "feature": "PRE30",
            "label": "Smoker",
            "group": "history",
            "mean_abs_shap": 0.09845693602711168,
            "mean_signed_shap": -0.00028332931230824364
          },
          {
            "feature": "PRE9",
            "label": "Dyspnoea before surgery",
            "group": "vitals",
            "mean_abs_shap": 0.09359537816851117,
            "mean_signed_shap": -0.009623186769438456
          },
          {
            "feature": "PRE5",
            "label": "FEV1",
            "group": "vitals",
            "mean_abs_shap": 0.06343373261914713,
            "mean_signed_shap": -0.001297859788578521
          },
          {
            "feature": "PRE8",
            "label": "Haemoptysis before surgery",
            "group": "vitals",
            "mean_abs_shap": 0.06283986379465108,
            "mean_signed_shap": 0.01030706760653008
          },
          {
            "feature": "PRE17",
            "label": "Type 2 diabetes",
            "group": "history",
            "mean_abs_shap": 0.05683234965888327,
            "mean_signed_shap": 0.01576023141800964
          },
          {
            "feature": "PRE11",
            "label": "Weakness before surgery",
            "group": "vitals",
            "mean_abs_shap": 0.05563507730636327,
            "mean_signed_shap": 0.0020605584187542063
          },
          {
            "feature": "PRE6",
            "label": "Performance status (Zubrod)",
            "group": "vitals",
            "mean_abs_shap": 0.050671640969854596,
            "mean_signed_shap": -0.011913226228019
          },
          {
            "feature": "PRE10",
            "label": "Cough before surgery",
            "group": "vitals",
            "mean_abs_shap": 0.03608268720784712,
            "mean_signed_shap": -0.00522249420113576
          },
          {
            "feature": "PRE4",
            "label": "Forced vital capacity (FVC)",
            "group": "vitals",
            "mean_abs_shap": 0.03466584200056073,
            "mean_signed_shap": -0.0025540054868671467
          },
          {
            "feature": "DGN",
            "label": "Diagnosis (ICD-10 group)",
            "group": "tumour",
            "mean_abs_shap": 0.03305376982749373,
            "mean_signed_shap": -0.011223058545052986
          },
          {
            "feature": "PRE7",
            "label": "Pain before surgery",
            "group": "vitals",
            "mean_abs_shap": 0.03097849851272714,
            "mean_signed_shap": 0.010406839344119269
          },
          {
            "feature": "PRE25",
            "label": "Peripheral arterial disease",
            "group": "history",
            "mean_abs_shap": 0.01869145467216845,
            "mean_signed_shap": -0.011023165575894217
          },
          {
            "feature": "AGE",
            "label": "Age at surgery",
            "group": "demographics",
            "mean_abs_shap": 0.015564694170000235,
            "mean_signed_shap": -0.00449149048390894
          },
          {
            "feature": "PRE32",
            "label": "Asthma",
            "group": "history",
            "mean_abs_shap": 4.72070803678739e-18,
            "mean_signed_shap": -4.72070803678739e-18
          },
          {
            "feature": "PRE19",
            "label": "Myocardial infarction within 6 months",
            "group": "history",
            "mean_abs_shap": 0.0,
            "mean_signed_shap": 0.0
          }
        ]
      },
      "metrics": {
        "accuracy": 0.5531914893617021,
        "precision": 0.18181818181818182,
        "recall": 0.5714285714285714,
        "f1": 0.27586206896551724,
        "roc_auc": 0.6214285714285714,
        "average_precision": 0.23098732604580371,
        "majority_baseline": 0.851063829787234
      }
    }
  }
};

export const STATIC_MODELS: Record<string, ModelSummary[]> = {
  "heart_disease": [
    {
      "dataset": "heart_disease",
      "model": "logistic_regression",
      "label": "Logistic Regression",
      "is_best": true,
      "best_params": {
        "C": 0.1,
        "class_weight": null,
        "penalty": "l2",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.9000754479015349,
      "metrics": {
        "accuracy": 0.8688524590163934,
        "precision": 0.8125,
        "recall": 0.9285714285714286,
        "f1": 0.8666666666666667,
        "roc_auc": 0.9577922077922079,
        "average_precision": 0.9396597328991854,
        "majority_baseline": 0.540983606557377
      },
      "confusion_matrix": {
        "true_negative": 27,
        "false_positive": 6,
        "false_negative": 2,
        "true_positive": 26
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.459,
        "mean_predicted_probability": 0.5253,
        "inflation_ratio": 1.14,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 61
    },
    {
      "dataset": "heart_disease",
      "model": "random_forest",
      "label": "Random Forest",
      "is_best": false,
      "best_params": {
        "class_weight": "balanced",
        "max_depth": 4,
        "max_features": "sqrt",
        "min_samples_leaf": 1,
        "n_estimators": 600
      },
      "cv_roc_auc": 0.8958593741202436,
      "metrics": {
        "accuracy": 0.9016393442622951,
        "precision": 0.8666666666666667,
        "recall": 0.9285714285714286,
        "f1": 0.896551724137931,
        "roc_auc": 0.9588744588744589,
        "average_precision": 0.9490929820637742,
        "majority_baseline": 0.540983606557377
      },
      "confusion_matrix": {
        "true_negative": 29,
        "false_positive": 4,
        "false_negative": 2,
        "true_positive": 26
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.459,
        "mean_predicted_probability": 0.5066,
        "inflation_ratio": 1.1,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 61
    },
    {
      "dataset": "heart_disease",
      "model": "xgboost",
      "label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 0.8,
        "learning_rate": 0.03,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 1.18,
        "subsample": 1.0
      },
      "cv_roc_auc": 0.8847381282163891,
      "metrics": {
        "accuracy": 0.9016393442622951,
        "precision": 0.8666666666666667,
        "recall": 0.9285714285714286,
        "f1": 0.896551724137931,
        "roc_auc": 0.9588744588744589,
        "average_precision": 0.9553109200445952,
        "majority_baseline": 0.540983606557377
      },
      "confusion_matrix": {
        "true_negative": 29,
        "false_positive": 4,
        "false_negative": 2,
        "true_positive": 26
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.459,
        "mean_predicted_probability": 0.5143,
        "inflation_ratio": 1.12,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 61
    }
  ],
  "heart_failure": [
    {
      "dataset": "heart_failure",
      "model": "logistic_regression",
      "label": "Logistic Regression",
      "is_best": false,
      "best_params": {
        "C": 1.0,
        "class_weight": null,
        "penalty": "l2",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.8056983901515151,
      "metrics": {
        "accuracy": 0.7,
        "precision": 0.5384615384615384,
        "recall": 0.3684210526315789,
        "f1": 0.4375,
        "roc_auc": 0.7432605905006419,
        "average_precision": 0.5971564106574303,
        "majority_baseline": 0.6833333333333333
      },
      "confusion_matrix": {
        "true_negative": 35,
        "false_positive": 6,
        "false_negative": 12,
        "true_positive": 7
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.3167,
        "mean_predicted_probability": 0.2764,
        "inflation_ratio": 0.87,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 60
    },
    {
      "dataset": "heart_failure",
      "model": "random_forest",
      "label": "Random Forest",
      "is_best": true,
      "best_params": {
        "class_weight": null,
        "max_depth": 8,
        "max_features": "sqrt",
        "min_samples_leaf": 1,
        "n_estimators": 600
      },
      "cv_roc_auc": 0.7911710858585859,
      "metrics": {
        "accuracy": 0.7333333333333333,
        "precision": 0.6,
        "recall": 0.47368421052631576,
        "f1": 0.5294117647058824,
        "roc_auc": 0.7894736842105263,
        "average_precision": 0.5750079355342512,
        "majority_baseline": 0.6833333333333333
      },
      "confusion_matrix": {
        "true_negative": 35,
        "false_positive": 6,
        "false_negative": 10,
        "true_positive": 9
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.3167,
        "mean_predicted_probability": 0.3038,
        "inflation_ratio": 0.96,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 60
    },
    {
      "dataset": "heart_failure",
      "model": "xgboost",
      "label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 0.8,
        "learning_rate": 0.03,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 1.0,
        "subsample": 0.8
      },
      "cv_roc_auc": 0.7823768939393939,
      "metrics": {
        "accuracy": 0.7666666666666667,
        "precision": 0.6923076923076923,
        "recall": 0.47368421052631576,
        "f1": 0.5625,
        "roc_auc": 0.7881899871630296,
        "average_precision": 0.5446061407490775,
        "majority_baseline": 0.6833333333333333
      },
      "confusion_matrix": {
        "true_negative": 37,
        "false_positive": 4,
        "false_negative": 10,
        "true_positive": 9
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.3167,
        "mean_predicted_probability": 0.3065,
        "inflation_ratio": 0.97,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 60
    }
  ],
  "diabetes": [
    {
      "dataset": "diabetes",
      "model": "logistic_regression",
      "label": "Logistic Regression",
      "is_best": false,
      "best_params": {
        "C": 0.1,
        "class_weight": "balanced",
        "penalty": "l1",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.8448366555924695,
      "metrics": {
        "accuracy": 0.7272727272727273,
        "precision": 0.5909090909090909,
        "recall": 0.7222222222222222,
        "f1": 0.65,
        "roc_auc": 0.8081481481481482,
        "average_precision": 0.6587425548370516,
        "majority_baseline": 0.6493506493506493
      },
      "confusion_matrix": {
        "true_negative": 73,
        "false_positive": 27,
        "false_negative": 15,
        "true_positive": 39
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.3506,
        "mean_predicted_probability": 0.4665,
        "inflation_ratio": 1.33,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 154
    },
    {
      "dataset": "diabetes",
      "model": "random_forest",
      "label": "Random Forest",
      "is_best": true,
      "best_params": {
        "class_weight": "balanced",
        "max_depth": 4,
        "max_features": 0.5,
        "min_samples_leaf": 1,
        "n_estimators": 300
      },
      "cv_roc_auc": 0.8404222037652269,
      "metrics": {
        "accuracy": 0.7532467532467533,
        "precision": 0.6212121212121212,
        "recall": 0.7592592592592593,
        "f1": 0.6833333333333333,
        "roc_auc": 0.8142592592592592,
        "average_precision": 0.6964473561262843,
        "majority_baseline": 0.6493506493506493
      },
      "confusion_matrix": {
        "true_negative": 75,
        "false_positive": 25,
        "false_negative": 13,
        "true_positive": 41
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.3506,
        "mean_predicted_probability": 0.4187,
        "inflation_ratio": 1.19,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 154
    },
    {
      "dataset": "diabetes",
      "model": "xgboost",
      "label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 0.8,
        "learning_rate": 0.03,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 1.0,
        "subsample": 0.8
      },
      "cv_roc_auc": 0.8379858803986711,
      "metrics": {
        "accuracy": 0.7532467532467533,
        "precision": 0.6666666666666666,
        "recall": 0.5925925925925926,
        "f1": 0.6274509803921569,
        "roc_auc": 0.8192592592592594,
        "average_precision": 0.6760455972851597,
        "majority_baseline": 0.6493506493506493
      },
      "confusion_matrix": {
        "true_negative": 84,
        "false_positive": 16,
        "false_negative": 22,
        "true_positive": 32
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.3506,
        "mean_predicted_probability": 0.35,
        "inflation_ratio": 1.0,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 154
    }
  ],
  "kidney_disease": [
    {
      "dataset": "kidney_disease",
      "model": "logistic_regression",
      "label": "Logistic Regression",
      "is_best": false,
      "best_params": {
        "C": 0.01,
        "class_weight": null,
        "penalty": "l2",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.9995833333333334,
      "metrics": {
        "accuracy": 0.8875,
        "precision": 1.0,
        "recall": 0.82,
        "f1": 0.9010989010989011,
        "roc_auc": 0.984,
        "average_precision": 0.9935135135135135,
        "majority_baseline": 0.625
      },
      "confusion_matrix": {
        "true_negative": 30,
        "false_positive": 0,
        "false_negative": 9,
        "true_positive": 41
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.625,
        "mean_predicted_probability": 0.5183,
        "inflation_ratio": 0.83,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 80
    },
    {
      "dataset": "kidney_disease",
      "model": "random_forest",
      "label": "Random Forest",
      "is_best": true,
      "best_params": {
        "class_weight": null,
        "max_depth": 8,
        "max_features": "sqrt",
        "min_samples_leaf": 1,
        "n_estimators": 300
      },
      "cv_roc_auc": 0.9997916666666666,
      "metrics": {
        "accuracy": 1.0,
        "precision": 1.0,
        "recall": 1.0,
        "f1": 1.0,
        "roc_auc": 1.0,
        "average_precision": 1.0,
        "majority_baseline": 0.625
      },
      "confusion_matrix": {
        "true_negative": 30,
        "false_positive": 0,
        "false_negative": 0,
        "true_positive": 50
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.625,
        "mean_predicted_probability": 0.5913,
        "inflation_ratio": 0.95,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 80
    },
    {
      "dataset": "kidney_disease",
      "model": "xgboost",
      "label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 1.0,
        "learning_rate": 0.1,
        "max_depth": 5,
        "n_estimators": 200,
        "scale_pos_weight": 1.0,
        "subsample": 0.8
      },
      "cv_roc_auc": 0.9989583333333334,
      "metrics": {
        "accuracy": 1.0,
        "precision": 1.0,
        "recall": 1.0,
        "f1": 1.0,
        "roc_auc": 1.0,
        "average_precision": 1.0,
        "majority_baseline": 0.625
      },
      "confusion_matrix": {
        "true_negative": 30,
        "false_positive": 0,
        "false_negative": 0,
        "true_positive": 50
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.625,
        "mean_predicted_probability": 0.6117,
        "inflation_ratio": 0.98,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 80
    }
  ],
  "breast_cancer": [
    {
      "dataset": "breast_cancer",
      "model": "logistic_regression",
      "label": "Logistic Regression",
      "is_best": true,
      "best_params": {
        "C": 1.0,
        "class_weight": null,
        "penalty": "l2",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.9957688338493291,
      "metrics": {
        "accuracy": 0.9736842105263158,
        "precision": 0.975609756097561,
        "recall": 0.9523809523809523,
        "f1": 0.963855421686747,
        "roc_auc": 0.996031746031746,
        "average_precision": 0.994273631904294,
        "majority_baseline": 0.631578947368421
      },
      "confusion_matrix": {
        "true_negative": 71,
        "false_positive": 1,
        "false_negative": 2,
        "true_positive": 40
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.3684,
        "mean_predicted_probability": 0.3539,
        "inflation_ratio": 0.96,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 114
    },
    {
      "dataset": "breast_cancer",
      "model": "random_forest",
      "label": "Random Forest",
      "is_best": false,
      "best_params": {
        "class_weight": "balanced",
        "max_depth": null,
        "max_features": "sqrt",
        "min_samples_leaf": 1,
        "n_estimators": 600
      },
      "cv_roc_auc": 0.9892672858617131,
      "metrics": {
        "accuracy": 0.9736842105263158,
        "precision": 1.0,
        "recall": 0.9285714285714286,
        "f1": 0.9629629629629629,
        "roc_auc": 0.9973544973544973,
        "average_precision": 0.9957789321301711,
        "majority_baseline": 0.631578947368421
      },
      "confusion_matrix": {
        "true_negative": 72,
        "false_positive": 0,
        "false_negative": 3,
        "true_positive": 39
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.3684,
        "mean_predicted_probability": 0.3472,
        "inflation_ratio": 0.94,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 114
    },
    {
      "dataset": "breast_cancer",
      "model": "xgboost",
      "label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 1.0,
        "learning_rate": 0.1,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 1.676,
        "subsample": 0.8
      },
      "cv_roc_auc": 0.9951496388028895,
      "metrics": {
        "accuracy": 0.9736842105263158,
        "precision": 1.0,
        "recall": 0.9285714285714286,
        "f1": 0.9629629629629629,
        "roc_auc": 0.9914021164021164,
        "average_precision": 0.9905489559007683,
        "majority_baseline": 0.631578947368421
      },
      "confusion_matrix": {
        "true_negative": 72,
        "false_positive": 0,
        "false_negative": 3,
        "true_positive": 39
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.3684,
        "mean_predicted_probability": 0.3484,
        "inflation_ratio": 0.95,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 114
    }
  ],
  "breast_cancer_recurrence": [
    {
      "dataset": "breast_cancer_recurrence",
      "model": "logistic_regression",
      "label": "Logistic Regression",
      "is_best": false,
      "best_params": {
        "C": 0.1,
        "class_weight": "balanced",
        "penalty": "l1",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.6999313186813187,
      "metrics": {
        "accuracy": 0.6551724137931034,
        "precision": 0.43478260869565216,
        "recall": 0.5882352941176471,
        "f1": 0.5,
        "roc_auc": 0.648493543758967,
        "average_precision": 0.5268617896406802,
        "majority_baseline": 0.7068965517241379
      },
      "confusion_matrix": {
        "true_negative": 28,
        "false_positive": 13,
        "false_negative": 7,
        "true_positive": 10
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.2931,
        "mean_predicted_probability": 0.5101,
        "inflation_ratio": 1.74,
        "calibrated": false,
        "note": "Probabilities are inflated roughly 1.7x relative to the cohort prevalence of 29.3%, because class weighting was tuned in. Read the number as a relative risk score for ranking patients, not as this patient's absolute probability."
      },
      "test_n": 58
    },
    {
      "dataset": "breast_cancer_recurrence",
      "model": "random_forest",
      "label": "Random Forest",
      "is_best": true,
      "best_params": {
        "class_weight": null,
        "max_depth": 4,
        "max_features": "sqrt",
        "min_samples_leaf": 3,
        "n_estimators": 300
      },
      "cv_roc_auc": 0.6903159340659342,
      "metrics": {
        "accuracy": 0.7758620689655172,
        "precision": 0.7,
        "recall": 0.4117647058823529,
        "f1": 0.5185185185185185,
        "roc_auc": 0.6657101865136298,
        "average_precision": 0.5730217350375719,
        "majority_baseline": 0.7068965517241379
      },
      "confusion_matrix": {
        "true_negative": 38,
        "false_positive": 3,
        "false_negative": 10,
        "true_positive": 7
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.2931,
        "mean_predicted_probability": 0.3089,
        "inflation_ratio": 1.05,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 58
    },
    {
      "dataset": "breast_cancer_recurrence",
      "model": "xgboost",
      "label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 1.0,
        "learning_rate": 0.1,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 1.0,
        "subsample": 1.0
      },
      "cv_roc_auc": 0.6736950549450549,
      "metrics": {
        "accuracy": 0.6896551724137931,
        "precision": 0.4666666666666667,
        "recall": 0.4117647058823529,
        "f1": 0.4375,
        "roc_auc": 0.6657101865136299,
        "average_precision": 0.5214494174100885,
        "majority_baseline": 0.7068965517241379
      },
      "confusion_matrix": {
        "true_negative": 33,
        "false_positive": 8,
        "false_negative": 10,
        "true_positive": 7
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.2931,
        "mean_predicted_probability": 0.3353,
        "inflation_ratio": 1.14,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 58
    }
  ],
  "breast_cancer_survival": [
    {
      "dataset": "breast_cancer_survival",
      "model": "logistic_regression",
      "label": "Logistic Regression",
      "is_best": false,
      "best_params": {
        "C": 0.1,
        "class_weight": null,
        "penalty": "l1",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.7382112332112332,
      "metrics": {
        "accuracy": 0.7096774193548387,
        "precision": 0.25,
        "recall": 0.0625,
        "f1": 0.1,
        "roc_auc": 0.5563858695652174,
        "average_precision": 0.2982796776583604,
        "majority_baseline": 0.7419354838709677
      },
      "confusion_matrix": {
        "true_negative": 43,
        "false_positive": 3,
        "false_negative": 15,
        "true_positive": 1
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.2581,
        "mean_predicted_probability": 0.294,
        "inflation_ratio": 1.14,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 62
    },
    {
      "dataset": "breast_cancer_survival",
      "model": "random_forest",
      "label": "Random Forest",
      "is_best": true,
      "best_params": {
        "class_weight": "balanced",
        "max_depth": 4,
        "max_features": "sqrt",
        "min_samples_leaf": 3,
        "n_estimators": 300
      },
      "cv_roc_auc": 0.7428388278388279,
      "metrics": {
        "accuracy": 0.6129032258064516,
        "precision": 0.21428571428571427,
        "recall": 0.1875,
        "f1": 0.2,
        "roc_auc": 0.594429347826087,
        "average_precision": 0.3153713413083017,
        "majority_baseline": 0.7419354838709677
      },
      "confusion_matrix": {
        "true_negative": 35,
        "false_positive": 11,
        "false_negative": 13,
        "true_positive": 3
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.2581,
        "mean_predicted_probability": 0.3915,
        "inflation_ratio": 1.52,
        "calibrated": false,
        "note": "Probabilities are inflated roughly 1.5x relative to the cohort prevalence of 25.8%, because class weighting was tuned in. Read the number as a relative risk score for ranking patients, not as this patient's absolute probability."
      },
      "test_n": 62
    },
    {
      "dataset": "breast_cancer_survival",
      "model": "xgboost",
      "label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 1.0,
        "learning_rate": 0.03,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 2.754,
        "subsample": 1.0
      },
      "cv_roc_auc": 0.7374175824175825,
      "metrics": {
        "accuracy": 0.5645161290322581,
        "precision": 0.17647058823529413,
        "recall": 0.1875,
        "f1": 0.18181818181818182,
        "roc_auc": 0.5652173913043478,
        "average_precision": 0.2911842286644686,
        "majority_baseline": 0.7419354838709677
      },
      "confusion_matrix": {
        "true_negative": 32,
        "false_positive": 14,
        "false_negative": 13,
        "true_positive": 3
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.2581,
        "mean_predicted_probability": 0.3911,
        "inflation_ratio": 1.52,
        "calibrated": false,
        "note": "Probabilities are inflated roughly 1.5x relative to the cohort prevalence of 25.8%, because class weighting was tuned in. Read the number as a relative risk score for ranking patients, not as this patient's absolute probability."
      },
      "test_n": 62
    }
  ],
  "cervical_cancer": [
    {
      "dataset": "cervical_cancer",
      "model": "logistic_regression",
      "label": "Logistic Regression",
      "is_best": true,
      "best_params": {
        "C": 0.01,
        "class_weight": "balanced",
        "penalty": "l2",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.6818300495262705,
      "metrics": {
        "accuracy": 0.7732558139534884,
        "precision": 0.08823529411764706,
        "recall": 0.2727272727272727,
        "f1": 0.13333333333333333,
        "roc_auc": 0.6307171089779786,
        "average_precision": 0.10003325343770988,
        "majority_baseline": 0.936046511627907
      },
      "confusion_matrix": {
        "true_negative": 130,
        "false_positive": 31,
        "false_negative": 8,
        "true_positive": 3
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.064,
        "mean_predicted_probability": 0.4426,
        "inflation_ratio": 6.92,
        "calibrated": false,
        "note": "Probabilities are inflated roughly 6.9x relative to the cohort prevalence of 6.4%, because class weighting was tuned in. Read the number as a relative risk score for ranking patients, not as this patient's absolute probability."
      },
      "test_n": 172
    },
    {
      "dataset": "cervical_cancer",
      "model": "random_forest",
      "label": "Random Forest",
      "is_best": false,
      "best_params": {
        "class_weight": null,
        "max_depth": 4,
        "max_features": 0.5,
        "min_samples_leaf": 1,
        "n_estimators": 300
      },
      "cv_roc_auc": 0.7055326765719206,
      "metrics": {
        "accuracy": 0.936046511627907,
        "precision": 0.0,
        "recall": 0.0,
        "f1": 0.0,
        "roc_auc": 0.6245059288537549,
        "average_precision": 0.1066674855990298,
        "majority_baseline": 0.936046511627907
      },
      "confusion_matrix": {
        "true_negative": 161,
        "false_positive": 0,
        "false_negative": 11,
        "true_positive": 0
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.064,
        "mean_predicted_probability": 0.0595,
        "inflation_ratio": 0.93,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 172
    },
    {
      "dataset": "cervical_cancer",
      "model": "xgboost",
      "label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 1.0,
        "learning_rate": 0.1,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 1.0,
        "subsample": 1.0
      },
      "cv_roc_auc": 0.7226118378552971,
      "metrics": {
        "accuracy": 0.9244186046511628,
        "precision": 0.0,
        "recall": 0.0,
        "f1": 0.0,
        "roc_auc": 0.6250705815923208,
        "average_precision": 0.12292053724046272,
        "majority_baseline": 0.936046511627907
      },
      "confusion_matrix": {
        "true_negative": 159,
        "false_positive": 2,
        "false_negative": 11,
        "true_positive": 0
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.064,
        "mean_predicted_probability": 0.0638,
        "inflation_ratio": 1.0,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 172
    }
  ],
  "lung_cancer_surgery": [
    {
      "dataset": "lung_cancer_surgery",
      "model": "logistic_regression",
      "label": "Logistic Regression",
      "is_best": true,
      "best_params": {
        "C": 0.01,
        "class_weight": "balanced",
        "penalty": "l2",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.6618371212121212,
      "metrics": {
        "accuracy": 0.5531914893617021,
        "precision": 0.18181818181818182,
        "recall": 0.5714285714285714,
        "f1": 0.27586206896551724,
        "roc_auc": 0.6214285714285714,
        "average_precision": 0.23098732604580371,
        "majority_baseline": 0.851063829787234
      },
      "confusion_matrix": {
        "true_negative": 44,
        "false_positive": 36,
        "false_negative": 6,
        "true_positive": 8
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.1489,
        "mean_predicted_probability": 0.4889,
        "inflation_ratio": 3.28,
        "calibrated": false,
        "note": "Probabilities are inflated roughly 3.3x relative to the cohort prevalence of 14.9%, because class weighting was tuned in. Read the number as a relative risk score for ranking patients, not as this patient's absolute probability."
      },
      "test_n": 94
    },
    {
      "dataset": "lung_cancer_surgery",
      "model": "random_forest",
      "label": "Random Forest",
      "is_best": false,
      "best_params": {
        "class_weight": null,
        "max_depth": null,
        "max_features": 0.5,
        "min_samples_leaf": 1,
        "n_estimators": 300
      },
      "cv_roc_auc": 0.685357481060606,
      "metrics": {
        "accuracy": 0.8404255319148937,
        "precision": 0.0,
        "recall": 0.0,
        "f1": 0.0,
        "roc_auc": 0.5924107142857142,
        "average_precision": 0.20580602045022806,
        "majority_baseline": 0.851063829787234
      },
      "confusion_matrix": {
        "true_negative": 79,
        "false_positive": 1,
        "false_negative": 14,
        "true_positive": 0
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.1489,
        "mean_predicted_probability": 0.1796,
        "inflation_ratio": 1.21,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "test_n": 94
    },
    {
      "dataset": "lung_cancer_surgery",
      "model": "xgboost",
      "label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 1.0,
        "learning_rate": 0.03,
        "max_depth": 5,
        "n_estimators": 500,
        "scale_pos_weight": 5.714,
        "subsample": 1.0
      },
      "cv_roc_auc": 0.6389914772727272,
      "metrics": {
        "accuracy": 0.7446808510638298,
        "precision": 0.2222222222222222,
        "recall": 0.2857142857142857,
        "f1": 0.25,
        "roc_auc": 0.5991071428571428,
        "average_precision": 0.1915602796827407,
        "majority_baseline": 0.851063829787234
      },
      "confusion_matrix": {
        "true_negative": 66,
        "false_positive": 14,
        "false_negative": 10,
        "true_positive": 4
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.1489,
        "mean_predicted_probability": 0.2356,
        "inflation_ratio": 1.58,
        "calibrated": false,
        "note": "Probabilities are inflated roughly 1.6x relative to the cohort prevalence of 14.9%, because class weighting was tuned in. Read the number as a relative risk score for ranking patients, not as this patient's absolute probability."
      },
      "test_n": 94
    }
  ]
};

export const STATIC_EVALUATION: Record<string, Record<string, Evaluation>> = {
  "heart_disease": {
    "logistic_regression": {
      "dataset": "heart_disease",
      "dataset_title": "Heart Disease (Cleveland)",
      "model": "logistic_regression",
      "model_label": "Logistic Regression",
      "is_best": true,
      "best_params": {
        "C": 0.1,
        "class_weight": null,
        "penalty": "l2",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.9000754479015349,
      "metrics": {
        "accuracy": 0.8688524590163934,
        "precision": 0.8125,
        "recall": 0.9285714285714286,
        "f1": 0.8666666666666667,
        "roc_auc": 0.9577922077922079,
        "average_precision": 0.9396597328991854,
        "majority_baseline": 0.540983606557377
      },
      "confusion_matrix": {
        "true_negative": 27,
        "false_positive": 6,
        "false_negative": 2,
        "true_positive": 26
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.459,
        "mean_predicted_probability": 0.5253,
        "inflation_ratio": 1.14,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.0357
        },
        {
          "fpr": 0.0,
          "tpr": 0.2857
        },
        {
          "fpr": 0.0303,
          "tpr": 0.2857
        },
        {
          "fpr": 0.0303,
          "tpr": 0.8214
        },
        {
          "fpr": 0.0606,
          "tpr": 0.8214
        },
        {
          "fpr": 0.0606,
          "tpr": 0.8929
        },
        {
          "fpr": 0.1818,
          "tpr": 0.8929
        },
        {
          "fpr": 0.1818,
          "tpr": 0.9643
        },
        {
          "fpr": 0.2424,
          "tpr": 0.9643
        },
        {
          "fpr": 0.2424,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.459
        },
        {
          "recall": 1.0,
          "precision": 0.4667
        },
        {
          "recall": 1.0,
          "precision": 0.4746
        },
        {
          "recall": 1.0,
          "precision": 0.4828
        },
        {
          "recall": 1.0,
          "precision": 0.4912
        },
        {
          "recall": 1.0,
          "precision": 0.5
        },
        {
          "recall": 1.0,
          "precision": 0.5091
        },
        {
          "recall": 1.0,
          "precision": 0.5185
        },
        {
          "recall": 1.0,
          "precision": 0.5283
        },
        {
          "recall": 1.0,
          "precision": 0.5385
        },
        {
          "recall": 1.0,
          "precision": 0.549
        },
        {
          "recall": 1.0,
          "precision": 0.56
        },
        {
          "recall": 1.0,
          "precision": 0.5714
        },
        {
          "recall": 1.0,
          "precision": 0.5833
        },
        {
          "recall": 1.0,
          "precision": 0.5957
        },
        {
          "recall": 1.0,
          "precision": 0.6087
        },
        {
          "recall": 1.0,
          "precision": 0.6222
        },
        {
          "recall": 1.0,
          "precision": 0.6364
        },
        {
          "recall": 1.0,
          "precision": 0.6512
        },
        {
          "recall": 1.0,
          "precision": 0.6667
        },
        {
          "recall": 1.0,
          "precision": 0.6829
        },
        {
          "recall": 1.0,
          "precision": 0.7
        },
        {
          "recall": 1.0,
          "precision": 0.7179
        },
        {
          "recall": 1.0,
          "precision": 0.7368
        },
        {
          "recall": 1.0,
          "precision": 0.7568
        },
        {
          "recall": 1.0,
          "precision": 0.7778
        },
        {
          "recall": 0.9643,
          "precision": 0.7714
        },
        {
          "recall": 0.9643,
          "precision": 0.7941
        },
        {
          "recall": 0.9643,
          "precision": 0.8182
        },
        {
          "recall": 0.9286,
          "precision": 0.8125
        },
        {
          "recall": 0.8929,
          "precision": 0.8065
        },
        {
          "recall": 0.8929,
          "precision": 0.8333
        },
        {
          "recall": 0.8929,
          "precision": 0.8621
        },
        {
          "recall": 0.8929,
          "precision": 0.8929
        },
        {
          "recall": 0.8929,
          "precision": 0.9259
        },
        {
          "recall": 0.8571,
          "precision": 0.9231
        },
        {
          "recall": 0.8214,
          "precision": 0.92
        },
        {
          "recall": 0.8214,
          "precision": 0.9583
        },
        {
          "recall": 0.7857,
          "precision": 0.9565
        },
        {
          "recall": 0.75,
          "precision": 0.9545
        },
        {
          "recall": 0.7143,
          "precision": 0.9524
        },
        {
          "recall": 0.6786,
          "precision": 0.95
        },
        {
          "recall": 0.6429,
          "precision": 0.9474
        },
        {
          "recall": 0.6071,
          "precision": 0.9444
        },
        {
          "recall": 0.5714,
          "precision": 0.9412
        },
        {
          "recall": 0.5357,
          "precision": 0.9375
        },
        {
          "recall": 0.5,
          "precision": 0.9333
        },
        {
          "recall": 0.4643,
          "precision": 0.9286
        },
        {
          "recall": 0.4286,
          "precision": 0.9231
        },
        {
          "recall": 0.3929,
          "precision": 0.9167
        },
        {
          "recall": 0.3571,
          "precision": 0.9091
        },
        {
          "recall": 0.3214,
          "precision": 0.9
        },
        {
          "recall": 0.2857,
          "precision": 0.8889
        },
        {
          "recall": 0.2857,
          "precision": 1.0
        },
        {
          "recall": 0.25,
          "precision": 1.0
        },
        {
          "recall": 0.2143,
          "precision": 1.0
        },
        {
          "recall": 0.1786,
          "precision": 1.0
        },
        {
          "recall": 0.1429,
          "precision": 1.0
        },
        {
          "recall": 0.1071,
          "precision": 1.0
        },
        {
          "recall": 0.0714,
          "precision": 1.0
        },
        {
          "recall": 0.0357,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 61,
      "fidelity": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 13,
        "top_k_probability_drop": [
          0.1269,
          0.1648,
          0.1999,
          0.2213,
          0.2538
        ],
        "random_k_probability_drop": [
          0.0375,
          0.0599,
          0.0773,
          0.1,
          0.1277
        ],
        "fidelity_score": 2.402,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 2.4x more than ablating the same number of random features."
      },
      "stability": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.5708,
        "std_neighbour_cosine": 0.2924,
        "mean_random_cosine": -0.0272,
        "stability_gap": 0.5979,
        "pairs_compared": 305,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.57 versus -0.03 for unrelated patients (gap +0.60)."
      },
      "comprehensibility": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "clinical_reference_features": [
          "age",
          "ca",
          "chol",
          "cp",
          "exang",
          "oldpeak",
          "slope",
          "thal",
          "thalach",
          "trestbps"
        ],
        "top3_clinical_hit_rate": 0.847,
        "shap_lime_top5_overlap": 0.808,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a low likelihood of \u201cHeart disease present\u201d (25%). Lowering it: Thallium perfusion scan (Normal), Major vessels coloured by fluoroscopy (0), Maximum heart rate achieved (182 bpm)."
      }
    },
    "random_forest": {
      "dataset": "heart_disease",
      "dataset_title": "Heart Disease (Cleveland)",
      "model": "random_forest",
      "model_label": "Random Forest",
      "is_best": false,
      "best_params": {
        "class_weight": "balanced",
        "max_depth": 4,
        "max_features": "sqrt",
        "min_samples_leaf": 1,
        "n_estimators": 600
      },
      "cv_roc_auc": 0.8958593741202436,
      "metrics": {
        "accuracy": 0.9016393442622951,
        "precision": 0.8666666666666667,
        "recall": 0.9285714285714286,
        "f1": 0.896551724137931,
        "roc_auc": 0.9588744588744589,
        "average_precision": 0.9490929820637742,
        "majority_baseline": 0.540983606557377
      },
      "confusion_matrix": {
        "true_negative": 29,
        "false_positive": 4,
        "false_negative": 2,
        "true_positive": 26
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.459,
        "mean_predicted_probability": 0.5066,
        "inflation_ratio": 1.1,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.0357
        },
        {
          "fpr": 0.0,
          "tpr": 0.4286
        },
        {
          "fpr": 0.0303,
          "tpr": 0.4286
        },
        {
          "fpr": 0.0303,
          "tpr": 0.75
        },
        {
          "fpr": 0.0606,
          "tpr": 0.75
        },
        {
          "fpr": 0.0606,
          "tpr": 0.8571
        },
        {
          "fpr": 0.0909,
          "tpr": 0.8571
        },
        {
          "fpr": 0.0909,
          "tpr": 0.9286
        },
        {
          "fpr": 0.1818,
          "tpr": 0.9286
        },
        {
          "fpr": 0.1818,
          "tpr": 0.9643
        },
        {
          "fpr": 0.3333,
          "tpr": 0.9643
        },
        {
          "fpr": 0.3333,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.459
        },
        {
          "recall": 1.0,
          "precision": 0.4667
        },
        {
          "recall": 1.0,
          "precision": 0.4746
        },
        {
          "recall": 1.0,
          "precision": 0.4828
        },
        {
          "recall": 1.0,
          "precision": 0.4912
        },
        {
          "recall": 1.0,
          "precision": 0.5
        },
        {
          "recall": 1.0,
          "precision": 0.5091
        },
        {
          "recall": 1.0,
          "precision": 0.5185
        },
        {
          "recall": 1.0,
          "precision": 0.5283
        },
        {
          "recall": 1.0,
          "precision": 0.5385
        },
        {
          "recall": 1.0,
          "precision": 0.549
        },
        {
          "recall": 1.0,
          "precision": 0.56
        },
        {
          "recall": 1.0,
          "precision": 0.5714
        },
        {
          "recall": 1.0,
          "precision": 0.5833
        },
        {
          "recall": 1.0,
          "precision": 0.5957
        },
        {
          "recall": 1.0,
          "precision": 0.6087
        },
        {
          "recall": 1.0,
          "precision": 0.6222
        },
        {
          "recall": 1.0,
          "precision": 0.6364
        },
        {
          "recall": 1.0,
          "precision": 0.6512
        },
        {
          "recall": 1.0,
          "precision": 0.6667
        },
        {
          "recall": 1.0,
          "precision": 0.6829
        },
        {
          "recall": 1.0,
          "precision": 0.7
        },
        {
          "recall": 1.0,
          "precision": 0.7179
        },
        {
          "recall": 0.9643,
          "precision": 0.7105
        },
        {
          "recall": 0.9643,
          "precision": 0.7297
        },
        {
          "recall": 0.9643,
          "precision": 0.75
        },
        {
          "recall": 0.9643,
          "precision": 0.7714
        },
        {
          "recall": 0.9643,
          "precision": 0.7941
        },
        {
          "recall": 0.9643,
          "precision": 0.8182
        },
        {
          "recall": 0.9286,
          "precision": 0.8125
        },
        {
          "recall": 0.9286,
          "precision": 0.8387
        },
        {
          "recall": 0.9286,
          "precision": 0.8667
        },
        {
          "recall": 0.9286,
          "precision": 0.8966
        },
        {
          "recall": 0.8929,
          "precision": 0.8929
        },
        {
          "recall": 0.8571,
          "precision": 0.8889
        },
        {
          "recall": 0.8571,
          "precision": 0.9231
        },
        {
          "recall": 0.8214,
          "precision": 0.92
        },
        {
          "recall": 0.7857,
          "precision": 0.9167
        },
        {
          "recall": 0.75,
          "precision": 0.913
        },
        {
          "recall": 0.75,
          "precision": 0.9545
        },
        {
          "recall": 0.7143,
          "precision": 0.9524
        },
        {
          "recall": 0.6786,
          "precision": 0.95
        },
        {
          "recall": 0.6429,
          "precision": 0.9474
        },
        {
          "recall": 0.6071,
          "precision": 0.9444
        },
        {
          "recall": 0.5714,
          "precision": 0.9412
        },
        {
          "recall": 0.5357,
          "precision": 0.9375
        },
        {
          "recall": 0.5,
          "precision": 0.9333
        },
        {
          "recall": 0.4643,
          "precision": 0.9286
        },
        {
          "recall": 0.4286,
          "precision": 0.9231
        },
        {
          "recall": 0.4286,
          "precision": 1.0
        },
        {
          "recall": 0.3929,
          "precision": 1.0
        },
        {
          "recall": 0.3571,
          "precision": 1.0
        },
        {
          "recall": 0.3214,
          "precision": 1.0
        },
        {
          "recall": 0.2857,
          "precision": 1.0
        },
        {
          "recall": 0.25,
          "precision": 1.0
        },
        {
          "recall": 0.2143,
          "precision": 1.0
        },
        {
          "recall": 0.1786,
          "precision": 1.0
        },
        {
          "recall": 0.1429,
          "precision": 1.0
        },
        {
          "recall": 0.1071,
          "precision": 1.0
        },
        {
          "recall": 0.0714,
          "precision": 1.0
        },
        {
          "recall": 0.0357,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 61
    },
    "xgboost": {
      "dataset": "heart_disease",
      "dataset_title": "Heart Disease (Cleveland)",
      "model": "xgboost",
      "model_label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 0.8,
        "learning_rate": 0.03,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 1.18,
        "subsample": 1.0
      },
      "cv_roc_auc": 0.8847381282163891,
      "metrics": {
        "accuracy": 0.9016393442622951,
        "precision": 0.8666666666666667,
        "recall": 0.9285714285714286,
        "f1": 0.896551724137931,
        "roc_auc": 0.9588744588744589,
        "average_precision": 0.9553109200445952,
        "majority_baseline": 0.540983606557377
      },
      "confusion_matrix": {
        "true_negative": 29,
        "false_positive": 4,
        "false_negative": 2,
        "true_positive": 26
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.459,
        "mean_predicted_probability": 0.5143,
        "inflation_ratio": 1.12,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.0357
        },
        {
          "fpr": 0.0,
          "tpr": 0.5714
        },
        {
          "fpr": 0.0303,
          "tpr": 0.5714
        },
        {
          "fpr": 0.0303,
          "tpr": 0.7857
        },
        {
          "fpr": 0.0909,
          "tpr": 0.7857
        },
        {
          "fpr": 0.0909,
          "tpr": 0.8929
        },
        {
          "fpr": 0.1212,
          "tpr": 0.8929
        },
        {
          "fpr": 0.1212,
          "tpr": 0.9286
        },
        {
          "fpr": 0.1515,
          "tpr": 0.9286
        },
        {
          "fpr": 0.1515,
          "tpr": 0.9643
        },
        {
          "fpr": 0.4242,
          "tpr": 0.9643
        },
        {
          "fpr": 0.4242,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.459
        },
        {
          "recall": 1.0,
          "precision": 0.4667
        },
        {
          "recall": 1.0,
          "precision": 0.4746
        },
        {
          "recall": 1.0,
          "precision": 0.4828
        },
        {
          "recall": 1.0,
          "precision": 0.4912
        },
        {
          "recall": 1.0,
          "precision": 0.5
        },
        {
          "recall": 1.0,
          "precision": 0.5091
        },
        {
          "recall": 1.0,
          "precision": 0.5185
        },
        {
          "recall": 1.0,
          "precision": 0.5283
        },
        {
          "recall": 1.0,
          "precision": 0.5385
        },
        {
          "recall": 1.0,
          "precision": 0.549
        },
        {
          "recall": 1.0,
          "precision": 0.56
        },
        {
          "recall": 1.0,
          "precision": 0.5714
        },
        {
          "recall": 1.0,
          "precision": 0.5833
        },
        {
          "recall": 1.0,
          "precision": 0.5957
        },
        {
          "recall": 1.0,
          "precision": 0.6087
        },
        {
          "recall": 1.0,
          "precision": 0.6222
        },
        {
          "recall": 1.0,
          "precision": 0.6364
        },
        {
          "recall": 1.0,
          "precision": 0.6512
        },
        {
          "recall": 1.0,
          "precision": 0.6667
        },
        {
          "recall": 0.9643,
          "precision": 0.6585
        },
        {
          "recall": 0.9643,
          "precision": 0.675
        },
        {
          "recall": 0.9643,
          "precision": 0.6923
        },
        {
          "recall": 0.9643,
          "precision": 0.7105
        },
        {
          "recall": 0.9643,
          "precision": 0.7297
        },
        {
          "recall": 0.9643,
          "precision": 0.75
        },
        {
          "recall": 0.9643,
          "precision": 0.7714
        },
        {
          "recall": 0.9643,
          "precision": 0.7941
        },
        {
          "recall": 0.9643,
          "precision": 0.8182
        },
        {
          "recall": 0.9643,
          "precision": 0.8438
        },
        {
          "recall": 0.9286,
          "precision": 0.8387
        },
        {
          "recall": 0.9286,
          "precision": 0.8667
        },
        {
          "recall": 0.8929,
          "precision": 0.8621
        },
        {
          "recall": 0.8929,
          "precision": 0.8929
        },
        {
          "recall": 0.8571,
          "precision": 0.8889
        },
        {
          "recall": 0.8214,
          "precision": 0.8846
        },
        {
          "recall": 0.7857,
          "precision": 0.88
        },
        {
          "recall": 0.7857,
          "precision": 0.9167
        },
        {
          "recall": 0.7857,
          "precision": 0.9565
        },
        {
          "recall": 0.75,
          "precision": 0.9545
        },
        {
          "recall": 0.7143,
          "precision": 0.9524
        },
        {
          "recall": 0.6786,
          "precision": 0.95
        },
        {
          "recall": 0.6429,
          "precision": 0.9474
        },
        {
          "recall": 0.6071,
          "precision": 0.9444
        },
        {
          "recall": 0.5714,
          "precision": 0.9412
        },
        {
          "recall": 0.5714,
          "precision": 1.0
        },
        {
          "recall": 0.5357,
          "precision": 1.0
        },
        {
          "recall": 0.5,
          "precision": 1.0
        },
        {
          "recall": 0.4643,
          "precision": 1.0
        },
        {
          "recall": 0.4286,
          "precision": 1.0
        },
        {
          "recall": 0.3929,
          "precision": 1.0
        },
        {
          "recall": 0.3571,
          "precision": 1.0
        },
        {
          "recall": 0.3214,
          "precision": 1.0
        },
        {
          "recall": 0.2857,
          "precision": 1.0
        },
        {
          "recall": 0.25,
          "precision": 1.0
        },
        {
          "recall": 0.2143,
          "precision": 1.0
        },
        {
          "recall": 0.1786,
          "precision": 1.0
        },
        {
          "recall": 0.1429,
          "precision": 1.0
        },
        {
          "recall": 0.1071,
          "precision": 1.0
        },
        {
          "recall": 0.0714,
          "precision": 1.0
        },
        {
          "recall": 0.0357,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 61
    }
  },
  "heart_failure": {
    "logistic_regression": {
      "dataset": "heart_failure",
      "dataset_title": "Heart Failure Clinical Records",
      "model": "logistic_regression",
      "model_label": "Logistic Regression",
      "is_best": false,
      "best_params": {
        "C": 1.0,
        "class_weight": null,
        "penalty": "l2",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.8056983901515151,
      "metrics": {
        "accuracy": 0.7,
        "precision": 0.5384615384615384,
        "recall": 0.3684210526315789,
        "f1": 0.4375,
        "roc_auc": 0.7432605905006419,
        "average_precision": 0.5971564106574303,
        "majority_baseline": 0.6833333333333333
      },
      "confusion_matrix": {
        "true_negative": 35,
        "false_positive": 6,
        "false_negative": 12,
        "true_positive": 7
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.3167,
        "mean_predicted_probability": 0.2764,
        "inflation_ratio": 0.87,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.0526
        },
        {
          "fpr": 0.0,
          "tpr": 0.1053
        },
        {
          "fpr": 0.0244,
          "tpr": 0.1053
        },
        {
          "fpr": 0.0244,
          "tpr": 0.2105
        },
        {
          "fpr": 0.0732,
          "tpr": 0.2105
        },
        {
          "fpr": 0.0732,
          "tpr": 0.3158
        },
        {
          "fpr": 0.1463,
          "tpr": 0.3158
        },
        {
          "fpr": 0.1463,
          "tpr": 0.4211
        },
        {
          "fpr": 0.1951,
          "tpr": 0.4211
        },
        {
          "fpr": 0.1951,
          "tpr": 0.4737
        },
        {
          "fpr": 0.2195,
          "tpr": 0.4737
        },
        {
          "fpr": 0.2195,
          "tpr": 0.5263
        },
        {
          "fpr": 0.2439,
          "tpr": 0.5263
        },
        {
          "fpr": 0.2439,
          "tpr": 0.6316
        },
        {
          "fpr": 0.2927,
          "tpr": 0.6316
        },
        {
          "fpr": 0.2927,
          "tpr": 0.7895
        },
        {
          "fpr": 0.3171,
          "tpr": 0.7895
        },
        {
          "fpr": 0.3171,
          "tpr": 0.8421
        },
        {
          "fpr": 0.6341,
          "tpr": 0.8421
        },
        {
          "fpr": 0.6341,
          "tpr": 0.8947
        },
        {
          "fpr": 0.7317,
          "tpr": 0.8947
        },
        {
          "fpr": 0.7317,
          "tpr": 0.9474
        },
        {
          "fpr": 0.9268,
          "tpr": 0.9474
        },
        {
          "fpr": 0.9268,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.3167
        },
        {
          "recall": 1.0,
          "precision": 0.322
        },
        {
          "recall": 1.0,
          "precision": 0.3276
        },
        {
          "recall": 1.0,
          "precision": 0.3333
        },
        {
          "recall": 0.9474,
          "precision": 0.3214
        },
        {
          "recall": 0.9474,
          "precision": 0.3273
        },
        {
          "recall": 0.9474,
          "precision": 0.3333
        },
        {
          "recall": 0.9474,
          "precision": 0.3396
        },
        {
          "recall": 0.9474,
          "precision": 0.3462
        },
        {
          "recall": 0.9474,
          "precision": 0.3529
        },
        {
          "recall": 0.9474,
          "precision": 0.36
        },
        {
          "recall": 0.9474,
          "precision": 0.3673
        },
        {
          "recall": 0.9474,
          "precision": 0.375
        },
        {
          "recall": 0.8947,
          "precision": 0.3617
        },
        {
          "recall": 0.8947,
          "precision": 0.3696
        },
        {
          "recall": 0.8947,
          "precision": 0.3778
        },
        {
          "recall": 0.8947,
          "precision": 0.3864
        },
        {
          "recall": 0.8947,
          "precision": 0.3953
        },
        {
          "recall": 0.8421,
          "precision": 0.381
        },
        {
          "recall": 0.8421,
          "precision": 0.3902
        },
        {
          "recall": 0.8421,
          "precision": 0.4
        },
        {
          "recall": 0.8421,
          "precision": 0.4103
        },
        {
          "recall": 0.8421,
          "precision": 0.4211
        },
        {
          "recall": 0.8421,
          "precision": 0.4324
        },
        {
          "recall": 0.8421,
          "precision": 0.4444
        },
        {
          "recall": 0.8421,
          "precision": 0.4571
        },
        {
          "recall": 0.8421,
          "precision": 0.4706
        },
        {
          "recall": 0.8421,
          "precision": 0.4848
        },
        {
          "recall": 0.8421,
          "precision": 0.5
        },
        {
          "recall": 0.8421,
          "precision": 0.5161
        },
        {
          "recall": 0.8421,
          "precision": 0.5333
        },
        {
          "recall": 0.8421,
          "precision": 0.5517
        },
        {
          "recall": 0.7895,
          "precision": 0.5357
        },
        {
          "recall": 0.7895,
          "precision": 0.5556
        },
        {
          "recall": 0.7368,
          "precision": 0.5385
        },
        {
          "recall": 0.6842,
          "precision": 0.52
        },
        {
          "recall": 0.6316,
          "precision": 0.5
        },
        {
          "recall": 0.6316,
          "precision": 0.5217
        },
        {
          "recall": 0.6316,
          "precision": 0.5455
        },
        {
          "recall": 0.5789,
          "precision": 0.5238
        },
        {
          "recall": 0.5263,
          "precision": 0.5
        },
        {
          "recall": 0.5263,
          "precision": 0.5263
        },
        {
          "recall": 0.4737,
          "precision": 0.5
        },
        {
          "recall": 0.4737,
          "precision": 0.5294
        },
        {
          "recall": 0.4211,
          "precision": 0.5
        },
        {
          "recall": 0.4211,
          "precision": 0.5333
        },
        {
          "recall": 0.4211,
          "precision": 0.5714
        },
        {
          "recall": 0.3684,
          "precision": 0.5385
        },
        {
          "recall": 0.3158,
          "precision": 0.5
        },
        {
          "recall": 0.3158,
          "precision": 0.5455
        },
        {
          "recall": 0.3158,
          "precision": 0.6
        },
        {
          "recall": 0.3158,
          "precision": 0.6667
        },
        {
          "recall": 0.2632,
          "precision": 0.625
        },
        {
          "recall": 0.2105,
          "precision": 0.5714
        },
        {
          "recall": 0.2105,
          "precision": 0.6667
        },
        {
          "recall": 0.2105,
          "precision": 0.8
        },
        {
          "recall": 0.1579,
          "precision": 0.75
        },
        {
          "recall": 0.1053,
          "precision": 0.6667
        },
        {
          "recall": 0.1053,
          "precision": 1.0
        },
        {
          "recall": 0.0526,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 60
    },
    "random_forest": {
      "dataset": "heart_failure",
      "dataset_title": "Heart Failure Clinical Records",
      "model": "random_forest",
      "model_label": "Random Forest",
      "is_best": true,
      "best_params": {
        "class_weight": null,
        "max_depth": 8,
        "max_features": "sqrt",
        "min_samples_leaf": 1,
        "n_estimators": 600
      },
      "cv_roc_auc": 0.7911710858585859,
      "metrics": {
        "accuracy": 0.7333333333333333,
        "precision": 0.6,
        "recall": 0.47368421052631576,
        "f1": 0.5294117647058824,
        "roc_auc": 0.7894736842105263,
        "average_precision": 0.5750079355342512,
        "majority_baseline": 0.6833333333333333
      },
      "confusion_matrix": {
        "true_negative": 35,
        "false_positive": 6,
        "false_negative": 10,
        "true_positive": 9
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.3167,
        "mean_predicted_probability": 0.3038,
        "inflation_ratio": 0.96,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0244,
          "tpr": 0.0
        },
        {
          "fpr": 0.0244,
          "tpr": 0.1053
        },
        {
          "fpr": 0.0488,
          "tpr": 0.1053
        },
        {
          "fpr": 0.0488,
          "tpr": 0.2632
        },
        {
          "fpr": 0.0732,
          "tpr": 0.2632
        },
        {
          "fpr": 0.0732,
          "tpr": 0.3158
        },
        {
          "fpr": 0.0976,
          "tpr": 0.3158
        },
        {
          "fpr": 0.0976,
          "tpr": 0.3684
        },
        {
          "fpr": 0.1463,
          "tpr": 0.3684
        },
        {
          "fpr": 0.1463,
          "tpr": 0.5263
        },
        {
          "fpr": 0.1707,
          "tpr": 0.5263
        },
        {
          "fpr": 0.1707,
          "tpr": 0.5789
        },
        {
          "fpr": 0.2195,
          "tpr": 0.5789
        },
        {
          "fpr": 0.2195,
          "tpr": 0.6316
        },
        {
          "fpr": 0.2683,
          "tpr": 0.6316
        },
        {
          "fpr": 0.2683,
          "tpr": 0.6842
        },
        {
          "fpr": 0.3171,
          "tpr": 0.6842
        },
        {
          "fpr": 0.3171,
          "tpr": 0.7895
        },
        {
          "fpr": 0.3902,
          "tpr": 0.7895
        },
        {
          "fpr": 0.3902,
          "tpr": 0.8421
        },
        {
          "fpr": 0.439,
          "tpr": 0.8421
        },
        {
          "fpr": 0.439,
          "tpr": 0.8947
        },
        {
          "fpr": 0.5122,
          "tpr": 0.8947
        },
        {
          "fpr": 0.5122,
          "tpr": 0.9474
        },
        {
          "fpr": 0.561,
          "tpr": 0.9474
        },
        {
          "fpr": 0.561,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.3167
        },
        {
          "recall": 1.0,
          "precision": 0.322
        },
        {
          "recall": 1.0,
          "precision": 0.3276
        },
        {
          "recall": 1.0,
          "precision": 0.3333
        },
        {
          "recall": 1.0,
          "precision": 0.3393
        },
        {
          "recall": 1.0,
          "precision": 0.3455
        },
        {
          "recall": 1.0,
          "precision": 0.3519
        },
        {
          "recall": 1.0,
          "precision": 0.3585
        },
        {
          "recall": 1.0,
          "precision": 0.3654
        },
        {
          "recall": 1.0,
          "precision": 0.3725
        },
        {
          "recall": 1.0,
          "precision": 0.38
        },
        {
          "recall": 1.0,
          "precision": 0.3878
        },
        {
          "recall": 1.0,
          "precision": 0.3958
        },
        {
          "recall": 1.0,
          "precision": 0.4043
        },
        {
          "recall": 1.0,
          "precision": 0.413
        },
        {
          "recall": 1.0,
          "precision": 0.4222
        },
        {
          "recall": 1.0,
          "precision": 0.4318
        },
        {
          "recall": 1.0,
          "precision": 0.4419
        },
        {
          "recall": 1.0,
          "precision": 0.4524
        },
        {
          "recall": 0.9474,
          "precision": 0.439
        },
        {
          "recall": 0.9474,
          "precision": 0.45
        },
        {
          "recall": 0.9474,
          "precision": 0.4615
        },
        {
          "recall": 0.8947,
          "precision": 0.4474
        },
        {
          "recall": 0.8947,
          "precision": 0.4595
        },
        {
          "recall": 0.8947,
          "precision": 0.4722
        },
        {
          "recall": 0.8947,
          "precision": 0.4857
        },
        {
          "recall": 0.8421,
          "precision": 0.4706
        },
        {
          "recall": 0.8421,
          "precision": 0.4848
        },
        {
          "recall": 0.8421,
          "precision": 0.5
        },
        {
          "recall": 0.7895,
          "precision": 0.4839
        },
        {
          "recall": 0.7895,
          "precision": 0.5
        },
        {
          "recall": 0.7895,
          "precision": 0.5172
        },
        {
          "recall": 0.7895,
          "precision": 0.5357
        },
        {
          "recall": 0.7368,
          "precision": 0.5185
        },
        {
          "recall": 0.6842,
          "precision": 0.5
        },
        {
          "recall": 0.6842,
          "precision": 0.52
        },
        {
          "recall": 0.6842,
          "precision": 0.5417
        },
        {
          "recall": 0.6316,
          "precision": 0.5217
        },
        {
          "recall": 0.6316,
          "precision": 0.5455
        },
        {
          "recall": 0.6316,
          "precision": 0.5714
        },
        {
          "recall": 0.5789,
          "precision": 0.55
        },
        {
          "recall": 0.5789,
          "precision": 0.5789
        },
        {
          "recall": 0.5789,
          "precision": 0.6111
        },
        {
          "recall": 0.5263,
          "precision": 0.5882
        },
        {
          "recall": 0.5263,
          "precision": 0.625
        },
        {
          "recall": 0.4737,
          "precision": 0.6
        },
        {
          "recall": 0.4211,
          "precision": 0.5714
        },
        {
          "recall": 0.3684,
          "precision": 0.5385
        },
        {
          "recall": 0.3684,
          "precision": 0.5833
        },
        {
          "recall": 0.3684,
          "precision": 0.6364
        },
        {
          "recall": 0.3158,
          "precision": 0.6
        },
        {
          "recall": 0.3158,
          "precision": 0.6667
        },
        {
          "recall": 0.2632,
          "precision": 0.625
        },
        {
          "recall": 0.2632,
          "precision": 0.7143
        },
        {
          "recall": 0.2105,
          "precision": 0.6667
        },
        {
          "recall": 0.1579,
          "precision": 0.6
        },
        {
          "recall": 0.1053,
          "precision": 0.5
        },
        {
          "recall": 0.1053,
          "precision": 0.6667
        },
        {
          "recall": 0.0526,
          "precision": 0.5
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 60,
      "fidelity": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 11,
        "top_k_probability_drop": [
          0.1399,
          0.1744,
          0.1873,
          0.1962,
          0.2084
        ],
        "random_k_probability_drop": [
          0.0272,
          0.0502,
          0.0767,
          0.0895,
          0.1277
        ],
        "fidelity_score": 2.441,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 2.4x more than ablating the same number of random features."
      },
      "stability": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.3383,
        "std_neighbour_cosine": 0.5146,
        "mean_random_cosine": 0.1046,
        "stability_gap": 0.2338,
        "pairs_compared": 300,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.34 versus 0.10 for unrelated patients (gap +0.23)."
      },
      "comprehensibility": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "clinical_reference_features": [
          "age",
          "anaemia",
          "ejection_fraction",
          "high_blood_pressure",
          "serum_creatinine",
          "serum_sodium"
        ],
        "top3_clinical_hit_rate": 0.85,
        "shap_lime_top5_overlap": 0.688,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a moderate likelihood of \u201cDeath during follow-up\u201d (34%). Raising the estimate: Platelet count (150000 platelets/mL), Anaemia (Yes). Lowering it: Serum creatinine (1.00 mg/dL)."
      }
    },
    "xgboost": {
      "dataset": "heart_failure",
      "dataset_title": "Heart Failure Clinical Records",
      "model": "xgboost",
      "model_label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 0.8,
        "learning_rate": 0.03,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 1.0,
        "subsample": 0.8
      },
      "cv_roc_auc": 0.7823768939393939,
      "metrics": {
        "accuracy": 0.7666666666666667,
        "precision": 0.6923076923076923,
        "recall": 0.47368421052631576,
        "f1": 0.5625,
        "roc_auc": 0.7881899871630296,
        "average_precision": 0.5446061407490775,
        "majority_baseline": 0.6833333333333333
      },
      "confusion_matrix": {
        "true_negative": 37,
        "false_positive": 4,
        "false_negative": 10,
        "true_positive": 9
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.3167,
        "mean_predicted_probability": 0.3065,
        "inflation_ratio": 0.97,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0244,
          "tpr": 0.0
        },
        {
          "fpr": 0.0732,
          "tpr": 0.0
        },
        {
          "fpr": 0.0732,
          "tpr": 0.3158
        },
        {
          "fpr": 0.0976,
          "tpr": 0.3158
        },
        {
          "fpr": 0.0976,
          "tpr": 0.5263
        },
        {
          "fpr": 0.1951,
          "tpr": 0.5263
        },
        {
          "fpr": 0.1951,
          "tpr": 0.5789
        },
        {
          "fpr": 0.2927,
          "tpr": 0.5789
        },
        {
          "fpr": 0.2927,
          "tpr": 0.6842
        },
        {
          "fpr": 0.3415,
          "tpr": 0.6842
        },
        {
          "fpr": 0.3415,
          "tpr": 0.7895
        },
        {
          "fpr": 0.3659,
          "tpr": 0.7895
        },
        {
          "fpr": 0.3659,
          "tpr": 0.8947
        },
        {
          "fpr": 0.3902,
          "tpr": 0.8947
        },
        {
          "fpr": 0.3902,
          "tpr": 0.9474
        },
        {
          "fpr": 0.6098,
          "tpr": 0.9474
        },
        {
          "fpr": 0.6098,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.3167
        },
        {
          "recall": 1.0,
          "precision": 0.322
        },
        {
          "recall": 1.0,
          "precision": 0.3276
        },
        {
          "recall": 1.0,
          "precision": 0.3333
        },
        {
          "recall": 1.0,
          "precision": 0.3393
        },
        {
          "recall": 1.0,
          "precision": 0.3455
        },
        {
          "recall": 1.0,
          "precision": 0.3519
        },
        {
          "recall": 1.0,
          "precision": 0.3585
        },
        {
          "recall": 1.0,
          "precision": 0.3654
        },
        {
          "recall": 1.0,
          "precision": 0.3725
        },
        {
          "recall": 1.0,
          "precision": 0.38
        },
        {
          "recall": 1.0,
          "precision": 0.3878
        },
        {
          "recall": 1.0,
          "precision": 0.3958
        },
        {
          "recall": 1.0,
          "precision": 0.4043
        },
        {
          "recall": 1.0,
          "precision": 0.413
        },
        {
          "recall": 1.0,
          "precision": 0.4222
        },
        {
          "recall": 1.0,
          "precision": 0.4318
        },
        {
          "recall": 0.9474,
          "precision": 0.4186
        },
        {
          "recall": 0.9474,
          "precision": 0.4286
        },
        {
          "recall": 0.9474,
          "precision": 0.439
        },
        {
          "recall": 0.9474,
          "precision": 0.45
        },
        {
          "recall": 0.9474,
          "precision": 0.4615
        },
        {
          "recall": 0.9474,
          "precision": 0.4737
        },
        {
          "recall": 0.9474,
          "precision": 0.4865
        },
        {
          "recall": 0.9474,
          "precision": 0.5
        },
        {
          "recall": 0.9474,
          "precision": 0.5143
        },
        {
          "recall": 0.9474,
          "precision": 0.5294
        },
        {
          "recall": 0.8947,
          "precision": 0.5152
        },
        {
          "recall": 0.8947,
          "precision": 0.5312
        },
        {
          "recall": 0.8421,
          "precision": 0.5161
        },
        {
          "recall": 0.7895,
          "precision": 0.5
        },
        {
          "recall": 0.7895,
          "precision": 0.5172
        },
        {
          "recall": 0.7368,
          "precision": 0.5
        },
        {
          "recall": 0.6842,
          "precision": 0.4815
        },
        {
          "recall": 0.6842,
          "precision": 0.5
        },
        {
          "recall": 0.6842,
          "precision": 0.52
        },
        {
          "recall": 0.6316,
          "precision": 0.5
        },
        {
          "recall": 0.5789,
          "precision": 0.4783
        },
        {
          "recall": 0.5789,
          "precision": 0.5
        },
        {
          "recall": 0.5789,
          "precision": 0.5238
        },
        {
          "recall": 0.5789,
          "precision": 0.55
        },
        {
          "recall": 0.5789,
          "precision": 0.5789
        },
        {
          "recall": 0.5263,
          "precision": 0.5556
        },
        {
          "recall": 0.5263,
          "precision": 0.5882
        },
        {
          "recall": 0.5263,
          "precision": 0.625
        },
        {
          "recall": 0.5263,
          "precision": 0.6667
        },
        {
          "recall": 0.5263,
          "precision": 0.7143
        },
        {
          "recall": 0.4737,
          "precision": 0.6923
        },
        {
          "recall": 0.4211,
          "precision": 0.6667
        },
        {
          "recall": 0.3684,
          "precision": 0.6364
        },
        {
          "recall": 0.3158,
          "precision": 0.6
        },
        {
          "recall": 0.3158,
          "precision": 0.6667
        },
        {
          "recall": 0.2632,
          "precision": 0.625
        },
        {
          "recall": 0.2105,
          "precision": 0.5714
        },
        {
          "recall": 0.1579,
          "precision": 0.5
        },
        {
          "recall": 0.1053,
          "precision": 0.4
        },
        {
          "recall": 0.0526,
          "precision": 0.25
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 60
    }
  },
  "diabetes": {
    "logistic_regression": {
      "dataset": "diabetes",
      "dataset_title": "Pima Indians Diabetes",
      "model": "logistic_regression",
      "model_label": "Logistic Regression",
      "is_best": false,
      "best_params": {
        "C": 0.1,
        "class_weight": "balanced",
        "penalty": "l1",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.8448366555924695,
      "metrics": {
        "accuracy": 0.7272727272727273,
        "precision": 0.5909090909090909,
        "recall": 0.7222222222222222,
        "f1": 0.65,
        "roc_auc": 0.8081481481481482,
        "average_precision": 0.6587425548370516,
        "majority_baseline": 0.6493506493506493
      },
      "confusion_matrix": {
        "true_negative": 73,
        "false_positive": 27,
        "false_negative": 15,
        "true_positive": 39
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.3506,
        "mean_predicted_probability": 0.4665,
        "inflation_ratio": 1.33,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.0185
        },
        {
          "fpr": 0.0,
          "tpr": 0.0741
        },
        {
          "fpr": 0.02,
          "tpr": 0.0741
        },
        {
          "fpr": 0.02,
          "tpr": 0.1296
        },
        {
          "fpr": 0.04,
          "tpr": 0.1296
        },
        {
          "fpr": 0.04,
          "tpr": 0.1852
        },
        {
          "fpr": 0.05,
          "tpr": 0.1852
        },
        {
          "fpr": 0.05,
          "tpr": 0.2222
        },
        {
          "fpr": 0.06,
          "tpr": 0.2222
        },
        {
          "fpr": 0.06,
          "tpr": 0.3333
        },
        {
          "fpr": 0.08,
          "tpr": 0.3333
        },
        {
          "fpr": 0.08,
          "tpr": 0.3519
        },
        {
          "fpr": 0.1,
          "tpr": 0.3519
        },
        {
          "fpr": 0.1,
          "tpr": 0.463
        },
        {
          "fpr": 0.12,
          "tpr": 0.463
        },
        {
          "fpr": 0.12,
          "tpr": 0.4815
        },
        {
          "fpr": 0.19,
          "tpr": 0.4815
        },
        {
          "fpr": 0.19,
          "tpr": 0.5185
        },
        {
          "fpr": 0.2,
          "tpr": 0.5185
        },
        {
          "fpr": 0.2,
          "tpr": 0.537
        },
        {
          "fpr": 0.21,
          "tpr": 0.537
        },
        {
          "fpr": 0.21,
          "tpr": 0.5741
        },
        {
          "fpr": 0.22,
          "tpr": 0.5741
        },
        {
          "fpr": 0.22,
          "tpr": 0.6481
        },
        {
          "fpr": 0.23,
          "tpr": 0.6481
        },
        {
          "fpr": 0.23,
          "tpr": 0.6667
        },
        {
          "fpr": 0.25,
          "tpr": 0.6667
        },
        {
          "fpr": 0.25,
          "tpr": 0.6852
        },
        {
          "fpr": 0.26,
          "tpr": 0.6852
        },
        {
          "fpr": 0.26,
          "tpr": 0.7037
        },
        {
          "fpr": 0.27,
          "tpr": 0.7037
        },
        {
          "fpr": 0.27,
          "tpr": 0.7222
        },
        {
          "fpr": 0.28,
          "tpr": 0.7222
        },
        {
          "fpr": 0.28,
          "tpr": 0.7593
        },
        {
          "fpr": 0.29,
          "tpr": 0.7593
        },
        {
          "fpr": 0.29,
          "tpr": 0.7963
        },
        {
          "fpr": 0.32,
          "tpr": 0.7963
        },
        {
          "fpr": 0.32,
          "tpr": 0.8148
        },
        {
          "fpr": 0.33,
          "tpr": 0.8148
        },
        {
          "fpr": 0.33,
          "tpr": 0.8519
        },
        {
          "fpr": 0.37,
          "tpr": 0.8519
        },
        {
          "fpr": 0.37,
          "tpr": 0.8889
        },
        {
          "fpr": 0.39,
          "tpr": 0.8889
        },
        {
          "fpr": 0.39,
          "tpr": 0.9074
        },
        {
          "fpr": 0.44,
          "tpr": 0.9074
        },
        {
          "fpr": 0.44,
          "tpr": 0.9259
        },
        {
          "fpr": 0.48,
          "tpr": 0.9259
        },
        {
          "fpr": 0.48,
          "tpr": 0.9444
        },
        {
          "fpr": 0.5,
          "tpr": 0.9444
        },
        {
          "fpr": 0.5,
          "tpr": 0.9815
        },
        {
          "fpr": 0.86,
          "tpr": 0.9815
        },
        {
          "fpr": 0.86,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.3506
        },
        {
          "recall": 1.0,
          "precision": 0.3529
        },
        {
          "recall": 1.0,
          "precision": 0.3553
        },
        {
          "recall": 1.0,
          "precision": 0.3576
        },
        {
          "recall": 1.0,
          "precision": 0.36
        },
        {
          "recall": 1.0,
          "precision": 0.3624
        },
        {
          "recall": 1.0,
          "precision": 0.3649
        },
        {
          "recall": 1.0,
          "precision": 0.3673
        },
        {
          "recall": 1.0,
          "precision": 0.3699
        },
        {
          "recall": 1.0,
          "precision": 0.3724
        },
        {
          "recall": 1.0,
          "precision": 0.375
        },
        {
          "recall": 1.0,
          "precision": 0.3776
        },
        {
          "recall": 1.0,
          "precision": 0.3803
        },
        {
          "recall": 1.0,
          "precision": 0.383
        },
        {
          "recall": 1.0,
          "precision": 0.3857
        },
        {
          "recall": 0.9815,
          "precision": 0.3813
        },
        {
          "recall": 0.9815,
          "precision": 0.3841
        },
        {
          "recall": 0.9815,
          "precision": 0.3869
        },
        {
          "recall": 0.9815,
          "precision": 0.3897
        },
        {
          "recall": 0.9815,
          "precision": 0.3926
        },
        {
          "recall": 0.9815,
          "precision": 0.3955
        },
        {
          "recall": 0.9815,
          "precision": 0.3985
        },
        {
          "recall": 0.9815,
          "precision": 0.4015
        },
        {
          "recall": 0.9815,
          "precision": 0.4046
        },
        {
          "recall": 0.9815,
          "precision": 0.4077
        },
        {
          "recall": 0.9815,
          "precision": 0.4109
        },
        {
          "recall": 0.9815,
          "precision": 0.4141
        },
        {
          "recall": 0.9815,
          "precision": 0.4173
        },
        {
          "recall": 0.9815,
          "precision": 0.4206
        },
        {
          "recall": 0.9815,
          "precision": 0.424
        },
        {
          "recall": 0.9815,
          "precision": 0.4274
        },
        {
          "recall": 0.9815,
          "precision": 0.4309
        },
        {
          "recall": 0.9815,
          "precision": 0.4344
        },
        {
          "recall": 0.9815,
          "precision": 0.438
        },
        {
          "recall": 0.9815,
          "precision": 0.4417
        },
        {
          "recall": 0.9815,
          "precision": 0.4454
        },
        {
          "recall": 0.9815,
          "precision": 0.4492
        },
        {
          "recall": 0.9815,
          "precision": 0.453
        },
        {
          "recall": 0.9815,
          "precision": 0.4569
        },
        {
          "recall": 0.9815,
          "precision": 0.4609
        },
        {
          "recall": 0.9815,
          "precision": 0.4649
        },
        {
          "recall": 0.9815,
          "precision": 0.469
        },
        {
          "recall": 0.9815,
          "precision": 0.4732
        },
        {
          "recall": 0.9815,
          "precision": 0.4775
        },
        {
          "recall": 0.9815,
          "precision": 0.4818
        },
        {
          "recall": 0.9815,
          "precision": 0.4862
        },
        {
          "recall": 0.9815,
          "precision": 0.4907
        },
        {
          "recall": 0.9815,
          "precision": 0.4953
        },
        {
          "recall": 0.9815,
          "precision": 0.5
        },
        {
          "recall": 0.9815,
          "precision": 0.5048
        },
        {
          "recall": 0.9815,
          "precision": 0.5096
        },
        {
          "recall": 0.9815,
          "precision": 0.5146
        },
        {
          "recall": 0.963,
          "precision": 0.5098
        },
        {
          "recall": 0.9444,
          "precision": 0.505
        },
        {
          "recall": 0.9444,
          "precision": 0.51
        },
        {
          "recall": 0.9444,
          "precision": 0.5152
        },
        {
          "recall": 0.9259,
          "precision": 0.5102
        },
        {
          "recall": 0.9259,
          "precision": 0.5155
        },
        {
          "recall": 0.9259,
          "precision": 0.5208
        },
        {
          "recall": 0.9259,
          "precision": 0.5263
        },
        {
          "recall": 0.9259,
          "precision": 0.5319
        },
        {
          "recall": 0.9074,
          "precision": 0.5269
        },
        {
          "recall": 0.9074,
          "precision": 0.5326
        },
        {
          "recall": 0.9074,
          "precision": 0.5385
        },
        {
          "recall": 0.9074,
          "precision": 0.5444
        },
        {
          "recall": 0.9074,
          "precision": 0.5506
        },
        {
          "recall": 0.9074,
          "precision": 0.5568
        },
        {
          "recall": 0.8889,
          "precision": 0.5517
        },
        {
          "recall": 0.8889,
          "precision": 0.5581
        },
        {
          "recall": 0.8889,
          "precision": 0.5647
        },
        {
          "recall": 0.8704,
          "precision": 0.5595
        },
        {
          "recall": 0.8519,
          "precision": 0.5542
        },
        {
          "recall": 0.8519,
          "precision": 0.561
        },
        {
          "recall": 0.8519,
          "precision": 0.5679
        },
        {
          "recall": 0.8519,
          "precision": 0.575
        },
        {
          "recall": 0.8519,
          "precision": 0.5823
        },
        {
          "recall": 0.8333,
          "precision": 0.5769
        },
        {
          "recall": 0.8148,
          "precision": 0.5714
        },
        {
          "recall": 0.8148,
          "precision": 0.5789
        },
        {
          "recall": 0.7963,
          "precision": 0.5733
        },
        {
          "recall": 0.7963,
          "precision": 0.5811
        },
        {
          "recall": 0.7963,
          "precision": 0.589
        },
        {
          "recall": 0.7963,
          "precision": 0.5972
        },
        {
          "recall": 0.7778,
          "precision": 0.5915
        },
        {
          "recall": 0.7593,
          "precision": 0.5857
        },
        {
          "recall": 0.7593,
          "precision": 0.5942
        },
        {
          "recall": 0.7407,
          "precision": 0.5882
        },
        {
          "recall": 0.7222,
          "precision": 0.5821
        },
        {
          "recall": 0.7222,
          "precision": 0.5909
        },
        {
          "recall": 0.7037,
          "precision": 0.5846
        },
        {
          "recall": 0.7037,
          "precision": 0.5938
        },
        {
          "recall": 0.6852,
          "precision": 0.5873
        },
        {
          "recall": 0.6852,
          "precision": 0.5968
        },
        {
          "recall": 0.6667,
          "precision": 0.5902
        },
        {
          "recall": 0.6667,
          "precision": 0.6
        },
        {
          "recall": 0.6667,
          "precision": 0.6102
        },
        {
          "recall": 0.6481,
          "precision": 0.6034
        },
        {
          "recall": 0.6481,
          "precision": 0.614
        },
        {
          "recall": 0.6296,
          "precision": 0.6071
        },
        {
          "recall": 0.6111,
          "precision": 0.6
        },
        {
          "recall": 0.5926,
          "precision": 0.5926
        },
        {
          "recall": 0.5741,
          "precision": 0.5849
        },
        {
          "recall": 0.5741,
          "precision": 0.5962
        },
        {
          "recall": 0.5556,
          "precision": 0.5882
        },
        {
          "recall": 0.537,
          "precision": 0.58
        },
        {
          "recall": 0.537,
          "precision": 0.5918
        },
        {
          "recall": 0.5185,
          "precision": 0.5833
        },
        {
          "recall": 0.5185,
          "precision": 0.5957
        },
        {
          "recall": 0.5,
          "precision": 0.587
        },
        {
          "recall": 0.4815,
          "precision": 0.5778
        },
        {
          "recall": 0.4815,
          "precision": 0.5909
        },
        {
          "recall": 0.4815,
          "precision": 0.6047
        },
        {
          "recall": 0.4815,
          "precision": 0.619
        },
        {
          "recall": 0.4815,
          "precision": 0.6341
        },
        {
          "recall": 0.4815,
          "precision": 0.65
        },
        {
          "recall": 0.4815,
          "precision": 0.6667
        },
        {
          "recall": 0.4815,
          "precision": 0.6842
        },
        {
          "recall": 0.463,
          "precision": 0.6757
        },
        {
          "recall": 0.463,
          "precision": 0.6944
        },
        {
          "recall": 0.463,
          "precision": 0.7143
        },
        {
          "recall": 0.4444,
          "precision": 0.7059
        },
        {
          "recall": 0.4259,
          "precision": 0.697
        },
        {
          "recall": 0.4074,
          "precision": 0.6875
        },
        {
          "recall": 0.3889,
          "precision": 0.6774
        },
        {
          "recall": 0.3704,
          "precision": 0.6667
        },
        {
          "recall": 0.3519,
          "precision": 0.6552
        },
        {
          "recall": 0.3519,
          "precision": 0.6786
        },
        {
          "recall": 0.3519,
          "precision": 0.7037
        },
        {
          "recall": 0.3333,
          "precision": 0.6923
        },
        {
          "recall": 0.3333,
          "precision": 0.72
        },
        {
          "recall": 0.3333,
          "precision": 0.75
        },
        {
          "recall": 0.3148,
          "precision": 0.7391
        },
        {
          "recall": 0.2963,
          "precision": 0.7273
        },
        {
          "recall": 0.2778,
          "precision": 0.7143
        },
        {
          "recall": 0.2593,
          "precision": 0.7
        },
        {
          "recall": 0.2407,
          "precision": 0.6842
        },
        {
          "recall": 0.2222,
          "precision": 0.6667
        },
        {
          "recall": 0.2222,
          "precision": 0.7059
        },
        {
          "recall": 0.2037,
          "precision": 0.6875
        },
        {
          "recall": 0.1852,
          "precision": 0.6667
        },
        {
          "recall": 0.1852,
          "precision": 0.7143
        },
        {
          "recall": 0.1667,
          "precision": 0.6923
        },
        {
          "recall": 0.1481,
          "precision": 0.6667
        },
        {
          "recall": 0.1296,
          "precision": 0.6364
        },
        {
          "recall": 0.1296,
          "precision": 0.7
        },
        {
          "recall": 0.1296,
          "precision": 0.7778
        },
        {
          "recall": 0.1111,
          "precision": 0.75
        },
        {
          "recall": 0.0926,
          "precision": 0.7143
        },
        {
          "recall": 0.0741,
          "precision": 0.6667
        },
        {
          "recall": 0.0741,
          "precision": 0.8
        },
        {
          "recall": 0.0741,
          "precision": 1.0
        },
        {
          "recall": 0.0556,
          "precision": 1.0
        },
        {
          "recall": 0.037,
          "precision": 1.0
        },
        {
          "recall": 0.0185,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 154
    },
    "random_forest": {
      "dataset": "diabetes",
      "dataset_title": "Pima Indians Diabetes",
      "model": "random_forest",
      "model_label": "Random Forest",
      "is_best": true,
      "best_params": {
        "class_weight": "balanced",
        "max_depth": 4,
        "max_features": 0.5,
        "min_samples_leaf": 1,
        "n_estimators": 300
      },
      "cv_roc_auc": 0.8404222037652269,
      "metrics": {
        "accuracy": 0.7532467532467533,
        "precision": 0.6212121212121212,
        "recall": 0.7592592592592593,
        "f1": 0.6833333333333333,
        "roc_auc": 0.8142592592592592,
        "average_precision": 0.6964473561262843,
        "majority_baseline": 0.6493506493506493
      },
      "confusion_matrix": {
        "true_negative": 75,
        "false_positive": 25,
        "false_negative": 13,
        "true_positive": 41
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.3506,
        "mean_predicted_probability": 0.4187,
        "inflation_ratio": 1.19,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.0185
        },
        {
          "fpr": 0.0,
          "tpr": 0.1481
        },
        {
          "fpr": 0.01,
          "tpr": 0.1481
        },
        {
          "fpr": 0.01,
          "tpr": 0.1667
        },
        {
          "fpr": 0.02,
          "tpr": 0.1667
        },
        {
          "fpr": 0.02,
          "tpr": 0.1852
        },
        {
          "fpr": 0.03,
          "tpr": 0.1852
        },
        {
          "fpr": 0.03,
          "tpr": 0.2222
        },
        {
          "fpr": 0.04,
          "tpr": 0.2222
        },
        {
          "fpr": 0.04,
          "tpr": 0.2593
        },
        {
          "fpr": 0.05,
          "tpr": 0.2593
        },
        {
          "fpr": 0.05,
          "tpr": 0.2963
        },
        {
          "fpr": 0.07,
          "tpr": 0.2963
        },
        {
          "fpr": 0.07,
          "tpr": 0.3519
        },
        {
          "fpr": 0.09,
          "tpr": 0.3519
        },
        {
          "fpr": 0.09,
          "tpr": 0.3889
        },
        {
          "fpr": 0.1,
          "tpr": 0.3889
        },
        {
          "fpr": 0.1,
          "tpr": 0.4444
        },
        {
          "fpr": 0.11,
          "tpr": 0.4444
        },
        {
          "fpr": 0.11,
          "tpr": 0.463
        },
        {
          "fpr": 0.17,
          "tpr": 0.463
        },
        {
          "fpr": 0.17,
          "tpr": 0.5185
        },
        {
          "fpr": 0.19,
          "tpr": 0.5185
        },
        {
          "fpr": 0.19,
          "tpr": 0.537
        },
        {
          "fpr": 0.2,
          "tpr": 0.537
        },
        {
          "fpr": 0.2,
          "tpr": 0.5556
        },
        {
          "fpr": 0.21,
          "tpr": 0.5556
        },
        {
          "fpr": 0.21,
          "tpr": 0.6852
        },
        {
          "fpr": 0.22,
          "tpr": 0.6852
        },
        {
          "fpr": 0.22,
          "tpr": 0.7222
        },
        {
          "fpr": 0.23,
          "tpr": 0.7222
        },
        {
          "fpr": 0.23,
          "tpr": 0.7593
        },
        {
          "fpr": 0.25,
          "tpr": 0.7593
        },
        {
          "fpr": 0.25,
          "tpr": 0.7778
        },
        {
          "fpr": 0.27,
          "tpr": 0.7778
        },
        {
          "fpr": 0.27,
          "tpr": 0.7963
        },
        {
          "fpr": 0.3,
          "tpr": 0.7963
        },
        {
          "fpr": 0.3,
          "tpr": 0.8148
        },
        {
          "fpr": 0.31,
          "tpr": 0.8148
        },
        {
          "fpr": 0.31,
          "tpr": 0.8333
        },
        {
          "fpr": 0.35,
          "tpr": 0.8333
        },
        {
          "fpr": 0.35,
          "tpr": 0.8519
        },
        {
          "fpr": 0.36,
          "tpr": 0.8519
        },
        {
          "fpr": 0.36,
          "tpr": 0.8704
        },
        {
          "fpr": 0.38,
          "tpr": 0.8704
        },
        {
          "fpr": 0.38,
          "tpr": 0.8889
        },
        {
          "fpr": 0.41,
          "tpr": 0.8889
        },
        {
          "fpr": 0.41,
          "tpr": 0.9074
        },
        {
          "fpr": 0.48,
          "tpr": 0.9074
        },
        {
          "fpr": 0.48,
          "tpr": 0.9259
        },
        {
          "fpr": 0.51,
          "tpr": 0.9259
        },
        {
          "fpr": 0.51,
          "tpr": 0.9444
        },
        {
          "fpr": 0.57,
          "tpr": 0.9444
        },
        {
          "fpr": 0.57,
          "tpr": 0.963
        },
        {
          "fpr": 0.75,
          "tpr": 0.963
        },
        {
          "fpr": 0.75,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.3506
        },
        {
          "recall": 1.0,
          "precision": 0.3529
        },
        {
          "recall": 1.0,
          "precision": 0.3553
        },
        {
          "recall": 1.0,
          "precision": 0.3576
        },
        {
          "recall": 1.0,
          "precision": 0.36
        },
        {
          "recall": 1.0,
          "precision": 0.3624
        },
        {
          "recall": 1.0,
          "precision": 0.3649
        },
        {
          "recall": 1.0,
          "precision": 0.3673
        },
        {
          "recall": 1.0,
          "precision": 0.3699
        },
        {
          "recall": 1.0,
          "precision": 0.3724
        },
        {
          "recall": 1.0,
          "precision": 0.375
        },
        {
          "recall": 1.0,
          "precision": 0.3776
        },
        {
          "recall": 1.0,
          "precision": 0.3803
        },
        {
          "recall": 1.0,
          "precision": 0.383
        },
        {
          "recall": 1.0,
          "precision": 0.3857
        },
        {
          "recall": 1.0,
          "precision": 0.3885
        },
        {
          "recall": 1.0,
          "precision": 0.3913
        },
        {
          "recall": 1.0,
          "precision": 0.3942
        },
        {
          "recall": 1.0,
          "precision": 0.3971
        },
        {
          "recall": 1.0,
          "precision": 0.4
        },
        {
          "recall": 1.0,
          "precision": 0.403
        },
        {
          "recall": 1.0,
          "precision": 0.406
        },
        {
          "recall": 1.0,
          "precision": 0.4091
        },
        {
          "recall": 1.0,
          "precision": 0.4122
        },
        {
          "recall": 1.0,
          "precision": 0.4154
        },
        {
          "recall": 1.0,
          "precision": 0.4186
        },
        {
          "recall": 0.9815,
          "precision": 0.4141
        },
        {
          "recall": 0.963,
          "precision": 0.4094
        },
        {
          "recall": 0.963,
          "precision": 0.4127
        },
        {
          "recall": 0.963,
          "precision": 0.416
        },
        {
          "recall": 0.963,
          "precision": 0.4194
        },
        {
          "recall": 0.963,
          "precision": 0.4228
        },
        {
          "recall": 0.963,
          "precision": 0.4262
        },
        {
          "recall": 0.963,
          "precision": 0.4298
        },
        {
          "recall": 0.963,
          "precision": 0.4333
        },
        {
          "recall": 0.963,
          "precision": 0.437
        },
        {
          "recall": 0.963,
          "precision": 0.4407
        },
        {
          "recall": 0.963,
          "precision": 0.4444
        },
        {
          "recall": 0.963,
          "precision": 0.4483
        },
        {
          "recall": 0.963,
          "precision": 0.4522
        },
        {
          "recall": 0.963,
          "precision": 0.4561
        },
        {
          "recall": 0.963,
          "precision": 0.4602
        },
        {
          "recall": 0.963,
          "precision": 0.4643
        },
        {
          "recall": 0.963,
          "precision": 0.4685
        },
        {
          "recall": 0.963,
          "precision": 0.4727
        },
        {
          "recall": 0.963,
          "precision": 0.4771
        },
        {
          "recall": 0.9444,
          "precision": 0.4722
        },
        {
          "recall": 0.9444,
          "precision": 0.4766
        },
        {
          "recall": 0.9444,
          "precision": 0.4811
        },
        {
          "recall": 0.9444,
          "precision": 0.4857
        },
        {
          "recall": 0.9444,
          "precision": 0.4904
        },
        {
          "recall": 0.9444,
          "precision": 0.4951
        },
        {
          "recall": 0.9444,
          "precision": 0.5
        },
        {
          "recall": 0.9259,
          "precision": 0.495
        },
        {
          "recall": 0.9259,
          "precision": 0.5
        },
        {
          "recall": 0.9259,
          "precision": 0.5051
        },
        {
          "recall": 0.9259,
          "precision": 0.5102
        },
        {
          "recall": 0.9074,
          "precision": 0.5052
        },
        {
          "recall": 0.9074,
          "precision": 0.5104
        },
        {
          "recall": 0.9074,
          "precision": 0.5158
        },
        {
          "recall": 0.9074,
          "precision": 0.5213
        },
        {
          "recall": 0.9074,
          "precision": 0.5269
        },
        {
          "recall": 0.9074,
          "precision": 0.5326
        },
        {
          "recall": 0.9074,
          "precision": 0.5385
        },
        {
          "recall": 0.9074,
          "precision": 0.5444
        },
        {
          "recall": 0.8889,
          "precision": 0.5393
        },
        {
          "recall": 0.8889,
          "precision": 0.5455
        },
        {
          "recall": 0.8889,
          "precision": 0.5517
        },
        {
          "recall": 0.8889,
          "precision": 0.5581
        },
        {
          "recall": 0.8704,
          "precision": 0.5529
        },
        {
          "recall": 0.8704,
          "precision": 0.5595
        },
        {
          "recall": 0.8704,
          "precision": 0.5663
        },
        {
          "recall": 0.8519,
          "precision": 0.561
        },
        {
          "recall": 0.8519,
          "precision": 0.5679
        },
        {
          "recall": 0.8333,
          "precision": 0.5625
        },
        {
          "recall": 0.8333,
          "precision": 0.5696
        },
        {
          "recall": 0.8333,
          "precision": 0.5769
        },
        {
          "recall": 0.8333,
          "precision": 0.5844
        },
        {
          "recall": 0.8333,
          "precision": 0.5921
        },
        {
          "recall": 0.8148,
          "precision": 0.5867
        },
        {
          "recall": 0.8148,
          "precision": 0.5946
        },
        {
          "recall": 0.7963,
          "precision": 0.589
        },
        {
          "recall": 0.7963,
          "precision": 0.5972
        },
        {
          "recall": 0.7963,
          "precision": 0.6056
        },
        {
          "recall": 0.7963,
          "precision": 0.6143
        },
        {
          "recall": 0.7778,
          "precision": 0.6087
        },
        {
          "recall": 0.7778,
          "precision": 0.6176
        },
        {
          "recall": 0.7778,
          "precision": 0.6269
        },
        {
          "recall": 0.7593,
          "precision": 0.6212
        },
        {
          "recall": 0.7593,
          "precision": 0.6308
        },
        {
          "recall": 0.7593,
          "precision": 0.6406
        },
        {
          "recall": 0.7407,
          "precision": 0.6349
        },
        {
          "recall": 0.7222,
          "precision": 0.629
        },
        {
          "recall": 0.7222,
          "precision": 0.6393
        },
        {
          "recall": 0.7037,
          "precision": 0.6333
        },
        {
          "recall": 0.6852,
          "precision": 0.6271
        },
        {
          "recall": 0.6852,
          "precision": 0.6379
        },
        {
          "recall": 0.6667,
          "precision": 0.6316
        },
        {
          "recall": 0.6481,
          "precision": 0.625
        },
        {
          "recall": 0.6296,
          "precision": 0.6182
        },
        {
          "recall": 0.6111,
          "precision": 0.6111
        },
        {
          "recall": 0.5926,
          "precision": 0.6038
        },
        {
          "recall": 0.5741,
          "precision": 0.5962
        },
        {
          "recall": 0.5556,
          "precision": 0.5882
        },
        {
          "recall": 0.5556,
          "precision": 0.6
        },
        {
          "recall": 0.537,
          "precision": 0.5918
        },
        {
          "recall": 0.537,
          "precision": 0.6042
        },
        {
          "recall": 0.5185,
          "precision": 0.5957
        },
        {
          "recall": 0.5185,
          "precision": 0.6087
        },
        {
          "recall": 0.5185,
          "precision": 0.6222
        },
        {
          "recall": 0.5,
          "precision": 0.6136
        },
        {
          "recall": 0.4815,
          "precision": 0.6047
        },
        {
          "recall": 0.463,
          "precision": 0.5952
        },
        {
          "recall": 0.463,
          "precision": 0.6098
        },
        {
          "recall": 0.463,
          "precision": 0.625
        },
        {
          "recall": 0.463,
          "precision": 0.641
        },
        {
          "recall": 0.463,
          "precision": 0.6579
        },
        {
          "recall": 0.463,
          "precision": 0.6757
        },
        {
          "recall": 0.463,
          "precision": 0.6944
        },
        {
          "recall": 0.4444,
          "precision": 0.6857
        },
        {
          "recall": 0.4444,
          "precision": 0.7059
        },
        {
          "recall": 0.4259,
          "precision": 0.697
        },
        {
          "recall": 0.4074,
          "precision": 0.6875
        },
        {
          "recall": 0.3889,
          "precision": 0.6774
        },
        {
          "recall": 0.3889,
          "precision": 0.7
        },
        {
          "recall": 0.3704,
          "precision": 0.6897
        },
        {
          "recall": 0.3519,
          "precision": 0.6786
        },
        {
          "recall": 0.3519,
          "precision": 0.7037
        },
        {
          "recall": 0.3519,
          "precision": 0.7308
        },
        {
          "recall": 0.3333,
          "precision": 0.72
        },
        {
          "recall": 0.3148,
          "precision": 0.7083
        },
        {
          "recall": 0.2963,
          "precision": 0.6957
        },
        {
          "recall": 0.2963,
          "precision": 0.7273
        },
        {
          "recall": 0.2963,
          "precision": 0.7619
        },
        {
          "recall": 0.2778,
          "precision": 0.75
        },
        {
          "recall": 0.2593,
          "precision": 0.7368
        },
        {
          "recall": 0.2593,
          "precision": 0.7778
        },
        {
          "recall": 0.2407,
          "precision": 0.7647
        },
        {
          "recall": 0.2222,
          "precision": 0.75
        },
        {
          "recall": 0.2222,
          "precision": 0.8
        },
        {
          "recall": 0.2037,
          "precision": 0.7857
        },
        {
          "recall": 0.1852,
          "precision": 0.7692
        },
        {
          "recall": 0.1852,
          "precision": 0.8333
        },
        {
          "recall": 0.1667,
          "precision": 0.8182
        },
        {
          "recall": 0.1667,
          "precision": 0.9
        },
        {
          "recall": 0.1481,
          "precision": 0.8889
        },
        {
          "recall": 0.1481,
          "precision": 1.0
        },
        {
          "recall": 0.1296,
          "precision": 1.0
        },
        {
          "recall": 0.1111,
          "precision": 1.0
        },
        {
          "recall": 0.0926,
          "precision": 1.0
        },
        {
          "recall": 0.0741,
          "precision": 1.0
        },
        {
          "recall": 0.0556,
          "precision": 1.0
        },
        {
          "recall": 0.037,
          "precision": 1.0
        },
        {
          "recall": 0.0185,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 154,
      "fidelity": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 8,
        "top_k_probability_drop": [
          0.1493,
          0.1976,
          0.2435,
          0.2627,
          0.2634
        ],
        "random_k_probability_drop": [
          0.0384,
          0.072,
          0.1022,
          0.1268,
          0.167
        ],
        "fidelity_score": 2.205,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 2.2x more than ablating the same number of random features."
      },
      "stability": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.6155,
        "std_neighbour_cosine": 0.4717,
        "mean_random_cosine": 0.0134,
        "stability_gap": 0.6021,
        "pairs_compared": 770,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.62 versus 0.01 for unrelated patients (gap +0.60)."
      },
      "comprehensibility": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "clinical_reference_features": [
          "Age",
          "BMI",
          "DiabetesPedigreeFunction",
          "Glucose",
          "Insulin",
          "Pregnancies"
        ],
        "top3_clinical_hit_rate": 0.991,
        "shap_lime_top5_overlap": 0.864,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a high likelihood of \u201cDiabetes onset\u201d (77%). Raising the estimate: Plasma glucose (2-hour OGTT) (159 mg/dL), Age (40 years). Lowering it: Body mass index (27.4 kg/m\u00b2)."
      }
    },
    "xgboost": {
      "dataset": "diabetes",
      "dataset_title": "Pima Indians Diabetes",
      "model": "xgboost",
      "model_label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 0.8,
        "learning_rate": 0.03,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 1.0,
        "subsample": 0.8
      },
      "cv_roc_auc": 0.8379858803986711,
      "metrics": {
        "accuracy": 0.7532467532467533,
        "precision": 0.6666666666666666,
        "recall": 0.5925925925925926,
        "f1": 0.6274509803921569,
        "roc_auc": 0.8192592592592594,
        "average_precision": 0.6760455972851597,
        "majority_baseline": 0.6493506493506493
      },
      "confusion_matrix": {
        "true_negative": 84,
        "false_positive": 16,
        "false_negative": 22,
        "true_positive": 32
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.3506,
        "mean_predicted_probability": 0.35,
        "inflation_ratio": 1.0,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.0185
        },
        {
          "fpr": 0.0,
          "tpr": 0.0556
        },
        {
          "fpr": 0.01,
          "tpr": 0.0556
        },
        {
          "fpr": 0.01,
          "tpr": 0.0741
        },
        {
          "fpr": 0.02,
          "tpr": 0.0741
        },
        {
          "fpr": 0.02,
          "tpr": 0.1481
        },
        {
          "fpr": 0.03,
          "tpr": 0.1481
        },
        {
          "fpr": 0.03,
          "tpr": 0.1667
        },
        {
          "fpr": 0.05,
          "tpr": 0.1667
        },
        {
          "fpr": 0.05,
          "tpr": 0.1852
        },
        {
          "fpr": 0.06,
          "tpr": 0.1852
        },
        {
          "fpr": 0.06,
          "tpr": 0.2778
        },
        {
          "fpr": 0.07,
          "tpr": 0.2778
        },
        {
          "fpr": 0.07,
          "tpr": 0.4074
        },
        {
          "fpr": 0.08,
          "tpr": 0.4074
        },
        {
          "fpr": 0.08,
          "tpr": 0.4259
        },
        {
          "fpr": 0.09,
          "tpr": 0.4259
        },
        {
          "fpr": 0.09,
          "tpr": 0.4444
        },
        {
          "fpr": 0.11,
          "tpr": 0.4444
        },
        {
          "fpr": 0.11,
          "tpr": 0.4815
        },
        {
          "fpr": 0.12,
          "tpr": 0.4815
        },
        {
          "fpr": 0.12,
          "tpr": 0.5
        },
        {
          "fpr": 0.13,
          "tpr": 0.5
        },
        {
          "fpr": 0.13,
          "tpr": 0.5556
        },
        {
          "fpr": 0.16,
          "tpr": 0.5556
        },
        {
          "fpr": 0.16,
          "tpr": 0.6111
        },
        {
          "fpr": 0.18,
          "tpr": 0.6111
        },
        {
          "fpr": 0.18,
          "tpr": 0.6296
        },
        {
          "fpr": 0.2,
          "tpr": 0.6296
        },
        {
          "fpr": 0.2,
          "tpr": 0.6667
        },
        {
          "fpr": 0.21,
          "tpr": 0.6667
        },
        {
          "fpr": 0.21,
          "tpr": 0.6852
        },
        {
          "fpr": 0.22,
          "tpr": 0.6852
        },
        {
          "fpr": 0.22,
          "tpr": 0.7037
        },
        {
          "fpr": 0.24,
          "tpr": 0.7037
        },
        {
          "fpr": 0.24,
          "tpr": 0.7407
        },
        {
          "fpr": 0.27,
          "tpr": 0.7407
        },
        {
          "fpr": 0.27,
          "tpr": 0.8148
        },
        {
          "fpr": 0.28,
          "tpr": 0.8148
        },
        {
          "fpr": 0.28,
          "tpr": 0.8333
        },
        {
          "fpr": 0.31,
          "tpr": 0.8333
        },
        {
          "fpr": 0.31,
          "tpr": 0.8519
        },
        {
          "fpr": 0.36,
          "tpr": 0.8519
        },
        {
          "fpr": 0.36,
          "tpr": 0.8704
        },
        {
          "fpr": 0.37,
          "tpr": 0.8704
        },
        {
          "fpr": 0.37,
          "tpr": 0.8889
        },
        {
          "fpr": 0.4,
          "tpr": 0.8889
        },
        {
          "fpr": 0.4,
          "tpr": 0.9074
        },
        {
          "fpr": 0.44,
          "tpr": 0.9074
        },
        {
          "fpr": 0.44,
          "tpr": 0.9259
        },
        {
          "fpr": 0.54,
          "tpr": 0.9259
        },
        {
          "fpr": 0.54,
          "tpr": 0.9444
        },
        {
          "fpr": 0.57,
          "tpr": 0.9444
        },
        {
          "fpr": 0.57,
          "tpr": 0.963
        },
        {
          "fpr": 0.64,
          "tpr": 0.963
        },
        {
          "fpr": 0.64,
          "tpr": 0.9815
        },
        {
          "fpr": 0.94,
          "tpr": 0.9815
        },
        {
          "fpr": 0.94,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.3506
        },
        {
          "recall": 1.0,
          "precision": 0.3529
        },
        {
          "recall": 1.0,
          "precision": 0.3553
        },
        {
          "recall": 1.0,
          "precision": 0.3576
        },
        {
          "recall": 1.0,
          "precision": 0.36
        },
        {
          "recall": 1.0,
          "precision": 0.3624
        },
        {
          "recall": 1.0,
          "precision": 0.3649
        },
        {
          "recall": 0.9815,
          "precision": 0.3605
        },
        {
          "recall": 0.9815,
          "precision": 0.363
        },
        {
          "recall": 0.9815,
          "precision": 0.3655
        },
        {
          "recall": 0.9815,
          "precision": 0.3681
        },
        {
          "recall": 0.9815,
          "precision": 0.3706
        },
        {
          "recall": 0.9815,
          "precision": 0.3732
        },
        {
          "recall": 0.9815,
          "precision": 0.3759
        },
        {
          "recall": 0.9815,
          "precision": 0.3786
        },
        {
          "recall": 0.9815,
          "precision": 0.3813
        },
        {
          "recall": 0.9815,
          "precision": 0.3841
        },
        {
          "recall": 0.9815,
          "precision": 0.3869
        },
        {
          "recall": 0.9815,
          "precision": 0.3897
        },
        {
          "recall": 0.9815,
          "precision": 0.3926
        },
        {
          "recall": 0.9815,
          "precision": 0.3955
        },
        {
          "recall": 0.9815,
          "precision": 0.3985
        },
        {
          "recall": 0.9815,
          "precision": 0.4015
        },
        {
          "recall": 0.9815,
          "precision": 0.4046
        },
        {
          "recall": 0.9815,
          "precision": 0.4077
        },
        {
          "recall": 0.9815,
          "precision": 0.4109
        },
        {
          "recall": 0.9815,
          "precision": 0.4141
        },
        {
          "recall": 0.9815,
          "precision": 0.4173
        },
        {
          "recall": 0.9815,
          "precision": 0.4206
        },
        {
          "recall": 0.9815,
          "precision": 0.424
        },
        {
          "recall": 0.9815,
          "precision": 0.4274
        },
        {
          "recall": 0.9815,
          "precision": 0.4309
        },
        {
          "recall": 0.9815,
          "precision": 0.4344
        },
        {
          "recall": 0.9815,
          "precision": 0.438
        },
        {
          "recall": 0.9815,
          "precision": 0.4417
        },
        {
          "recall": 0.9815,
          "precision": 0.4454
        },
        {
          "recall": 0.9815,
          "precision": 0.4492
        },
        {
          "recall": 0.9815,
          "precision": 0.453
        },
        {
          "recall": 0.963,
          "precision": 0.4483
        },
        {
          "recall": 0.963,
          "precision": 0.4522
        },
        {
          "recall": 0.963,
          "precision": 0.4561
        },
        {
          "recall": 0.963,
          "precision": 0.4602
        },
        {
          "recall": 0.963,
          "precision": 0.4643
        },
        {
          "recall": 0.963,
          "precision": 0.4685
        },
        {
          "recall": 0.963,
          "precision": 0.4727
        },
        {
          "recall": 0.963,
          "precision": 0.4771
        },
        {
          "recall": 0.9444,
          "precision": 0.4722
        },
        {
          "recall": 0.9444,
          "precision": 0.4766
        },
        {
          "recall": 0.9444,
          "precision": 0.4811
        },
        {
          "recall": 0.9444,
          "precision": 0.4857
        },
        {
          "recall": 0.9259,
          "precision": 0.4808
        },
        {
          "recall": 0.9259,
          "precision": 0.4854
        },
        {
          "recall": 0.9259,
          "precision": 0.4902
        },
        {
          "recall": 0.9259,
          "precision": 0.495
        },
        {
          "recall": 0.9259,
          "precision": 0.5
        },
        {
          "recall": 0.9259,
          "precision": 0.5051
        },
        {
          "recall": 0.9259,
          "precision": 0.5102
        },
        {
          "recall": 0.9259,
          "precision": 0.5155
        },
        {
          "recall": 0.9259,
          "precision": 0.5208
        },
        {
          "recall": 0.9259,
          "precision": 0.5263
        },
        {
          "recall": 0.9259,
          "precision": 0.5319
        },
        {
          "recall": 0.9074,
          "precision": 0.5269
        },
        {
          "recall": 0.9074,
          "precision": 0.5326
        },
        {
          "recall": 0.9074,
          "precision": 0.5385
        },
        {
          "recall": 0.9074,
          "precision": 0.5444
        },
        {
          "recall": 0.9074,
          "precision": 0.5506
        },
        {
          "recall": 0.8889,
          "precision": 0.5455
        },
        {
          "recall": 0.8889,
          "precision": 0.5517
        },
        {
          "recall": 0.8889,
          "precision": 0.5581
        },
        {
          "recall": 0.8889,
          "precision": 0.5647
        },
        {
          "recall": 0.8704,
          "precision": 0.5595
        },
        {
          "recall": 0.8704,
          "precision": 0.5663
        },
        {
          "recall": 0.8519,
          "precision": 0.561
        },
        {
          "recall": 0.8519,
          "precision": 0.5679
        },
        {
          "recall": 0.8519,
          "precision": 0.575
        },
        {
          "recall": 0.8519,
          "precision": 0.5823
        },
        {
          "recall": 0.8519,
          "precision": 0.5897
        },
        {
          "recall": 0.8519,
          "precision": 0.5974
        },
        {
          "recall": 0.8333,
          "precision": 0.5921
        },
        {
          "recall": 0.8333,
          "precision": 0.6
        },
        {
          "recall": 0.8333,
          "precision": 0.6081
        },
        {
          "recall": 0.8333,
          "precision": 0.6164
        },
        {
          "recall": 0.8148,
          "precision": 0.6111
        },
        {
          "recall": 0.8148,
          "precision": 0.6197
        },
        {
          "recall": 0.7963,
          "precision": 0.6143
        },
        {
          "recall": 0.7778,
          "precision": 0.6087
        },
        {
          "recall": 0.7593,
          "precision": 0.6029
        },
        {
          "recall": 0.7407,
          "precision": 0.597
        },
        {
          "recall": 0.7407,
          "precision": 0.6061
        },
        {
          "recall": 0.7407,
          "precision": 0.6154
        },
        {
          "recall": 0.7407,
          "precision": 0.625
        },
        {
          "recall": 0.7222,
          "precision": 0.619
        },
        {
          "recall": 0.7037,
          "precision": 0.6129
        },
        {
          "recall": 0.7037,
          "precision": 0.623
        },
        {
          "recall": 0.7037,
          "precision": 0.6333
        },
        {
          "recall": 0.6852,
          "precision": 0.6271
        },
        {
          "recall": 0.6852,
          "precision": 0.6379
        },
        {
          "recall": 0.6667,
          "precision": 0.6316
        },
        {
          "recall": 0.6667,
          "precision": 0.6429
        },
        {
          "recall": 0.6481,
          "precision": 0.6364
        },
        {
          "recall": 0.6296,
          "precision": 0.6296
        },
        {
          "recall": 0.6296,
          "precision": 0.6415
        },
        {
          "recall": 0.6296,
          "precision": 0.6538
        },
        {
          "recall": 0.6111,
          "precision": 0.6471
        },
        {
          "recall": 0.6111,
          "precision": 0.66
        },
        {
          "recall": 0.6111,
          "precision": 0.6735
        },
        {
          "recall": 0.5926,
          "precision": 0.6667
        },
        {
          "recall": 0.5741,
          "precision": 0.6596
        },
        {
          "recall": 0.5556,
          "precision": 0.6522
        },
        {
          "recall": 0.5556,
          "precision": 0.6667
        },
        {
          "recall": 0.5556,
          "precision": 0.6818
        },
        {
          "recall": 0.5556,
          "precision": 0.6977
        },
        {
          "recall": 0.537,
          "precision": 0.6905
        },
        {
          "recall": 0.5185,
          "precision": 0.6829
        },
        {
          "recall": 0.5,
          "precision": 0.675
        },
        {
          "recall": 0.5,
          "precision": 0.6923
        },
        {
          "recall": 0.4815,
          "precision": 0.6842
        },
        {
          "recall": 0.4815,
          "precision": 0.7027
        },
        {
          "recall": 0.463,
          "precision": 0.6944
        },
        {
          "recall": 0.4444,
          "precision": 0.6857
        },
        {
          "recall": 0.4444,
          "precision": 0.7059
        },
        {
          "recall": 0.4444,
          "precision": 0.7273
        },
        {
          "recall": 0.4259,
          "precision": 0.7188
        },
        {
          "recall": 0.4259,
          "precision": 0.7419
        },
        {
          "recall": 0.4074,
          "precision": 0.7333
        },
        {
          "recall": 0.4074,
          "precision": 0.7586
        },
        {
          "recall": 0.3889,
          "precision": 0.75
        },
        {
          "recall": 0.3704,
          "precision": 0.7407
        },
        {
          "recall": 0.3519,
          "precision": 0.7308
        },
        {
          "recall": 0.3333,
          "precision": 0.72
        },
        {
          "recall": 0.3148,
          "precision": 0.7083
        },
        {
          "recall": 0.2963,
          "precision": 0.6957
        },
        {
          "recall": 0.2778,
          "precision": 0.6818
        },
        {
          "recall": 0.2778,
          "precision": 0.7143
        },
        {
          "recall": 0.2593,
          "precision": 0.7
        },
        {
          "recall": 0.2407,
          "precision": 0.6842
        },
        {
          "recall": 0.2222,
          "precision": 0.6667
        },
        {
          "recall": 0.2037,
          "precision": 0.6471
        },
        {
          "recall": 0.1852,
          "precision": 0.625
        },
        {
          "recall": 0.1852,
          "precision": 0.6667
        },
        {
          "recall": 0.1667,
          "precision": 0.6429
        },
        {
          "recall": 0.1667,
          "precision": 0.6923
        },
        {
          "recall": 0.1667,
          "precision": 0.75
        },
        {
          "recall": 0.1481,
          "precision": 0.7273
        },
        {
          "recall": 0.1481,
          "precision": 0.8
        },
        {
          "recall": 0.1296,
          "precision": 0.7778
        },
        {
          "recall": 0.1111,
          "precision": 0.75
        },
        {
          "recall": 0.0926,
          "precision": 0.7143
        },
        {
          "recall": 0.0741,
          "precision": 0.6667
        },
        {
          "recall": 0.0741,
          "precision": 0.8
        },
        {
          "recall": 0.0556,
          "precision": 0.75
        },
        {
          "recall": 0.0556,
          "precision": 1.0
        },
        {
          "recall": 0.037,
          "precision": 1.0
        },
        {
          "recall": 0.0185,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 154
    }
  },
  "kidney_disease": {
    "logistic_regression": {
      "dataset": "kidney_disease",
      "dataset_title": "Chronic Kidney Disease",
      "model": "logistic_regression",
      "model_label": "Logistic Regression",
      "is_best": false,
      "best_params": {
        "C": 0.01,
        "class_weight": null,
        "penalty": "l2",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.9995833333333334,
      "metrics": {
        "accuracy": 0.8875,
        "precision": 1.0,
        "recall": 0.82,
        "f1": 0.9010989010989011,
        "roc_auc": 0.984,
        "average_precision": 0.9935135135135135,
        "majority_baseline": 0.625
      },
      "confusion_matrix": {
        "true_negative": 30,
        "false_positive": 0,
        "false_negative": 9,
        "true_positive": 41
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.625,
        "mean_predicted_probability": 0.5183,
        "inflation_ratio": 0.83,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.02
        },
        {
          "fpr": 0.0,
          "tpr": 0.98
        },
        {
          "fpr": 0.8,
          "tpr": 0.98
        },
        {
          "fpr": 0.8,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.625
        },
        {
          "recall": 1.0,
          "precision": 0.6329
        },
        {
          "recall": 1.0,
          "precision": 0.641
        },
        {
          "recall": 1.0,
          "precision": 0.6494
        },
        {
          "recall": 1.0,
          "precision": 0.6579
        },
        {
          "recall": 1.0,
          "precision": 0.6667
        },
        {
          "recall": 1.0,
          "precision": 0.6757
        },
        {
          "recall": 0.98,
          "precision": 0.6712
        },
        {
          "recall": 0.98,
          "precision": 0.6806
        },
        {
          "recall": 0.98,
          "precision": 0.6901
        },
        {
          "recall": 0.98,
          "precision": 0.7
        },
        {
          "recall": 0.98,
          "precision": 0.7101
        },
        {
          "recall": 0.98,
          "precision": 0.7206
        },
        {
          "recall": 0.98,
          "precision": 0.7313
        },
        {
          "recall": 0.98,
          "precision": 0.7424
        },
        {
          "recall": 0.98,
          "precision": 0.7538
        },
        {
          "recall": 0.98,
          "precision": 0.7656
        },
        {
          "recall": 0.98,
          "precision": 0.7778
        },
        {
          "recall": 0.98,
          "precision": 0.7903
        },
        {
          "recall": 0.98,
          "precision": 0.8033
        },
        {
          "recall": 0.98,
          "precision": 0.8167
        },
        {
          "recall": 0.98,
          "precision": 0.8305
        },
        {
          "recall": 0.98,
          "precision": 0.8448
        },
        {
          "recall": 0.98,
          "precision": 0.8596
        },
        {
          "recall": 0.98,
          "precision": 0.875
        },
        {
          "recall": 0.98,
          "precision": 0.8909
        },
        {
          "recall": 0.98,
          "precision": 0.9074
        },
        {
          "recall": 0.98,
          "precision": 0.9245
        },
        {
          "recall": 0.98,
          "precision": 0.9423
        },
        {
          "recall": 0.98,
          "precision": 0.9608
        },
        {
          "recall": 0.98,
          "precision": 0.98
        },
        {
          "recall": 0.98,
          "precision": 1.0
        },
        {
          "recall": 0.96,
          "precision": 1.0
        },
        {
          "recall": 0.94,
          "precision": 1.0
        },
        {
          "recall": 0.92,
          "precision": 1.0
        },
        {
          "recall": 0.9,
          "precision": 1.0
        },
        {
          "recall": 0.88,
          "precision": 1.0
        },
        {
          "recall": 0.86,
          "precision": 1.0
        },
        {
          "recall": 0.84,
          "precision": 1.0
        },
        {
          "recall": 0.82,
          "precision": 1.0
        },
        {
          "recall": 0.8,
          "precision": 1.0
        },
        {
          "recall": 0.78,
          "precision": 1.0
        },
        {
          "recall": 0.76,
          "precision": 1.0
        },
        {
          "recall": 0.74,
          "precision": 1.0
        },
        {
          "recall": 0.72,
          "precision": 1.0
        },
        {
          "recall": 0.7,
          "precision": 1.0
        },
        {
          "recall": 0.68,
          "precision": 1.0
        },
        {
          "recall": 0.66,
          "precision": 1.0
        },
        {
          "recall": 0.64,
          "precision": 1.0
        },
        {
          "recall": 0.62,
          "precision": 1.0
        },
        {
          "recall": 0.6,
          "precision": 1.0
        },
        {
          "recall": 0.58,
          "precision": 1.0
        },
        {
          "recall": 0.56,
          "precision": 1.0
        },
        {
          "recall": 0.54,
          "precision": 1.0
        },
        {
          "recall": 0.52,
          "precision": 1.0
        },
        {
          "recall": 0.5,
          "precision": 1.0
        },
        {
          "recall": 0.48,
          "precision": 1.0
        },
        {
          "recall": 0.46,
          "precision": 1.0
        },
        {
          "recall": 0.44,
          "precision": 1.0
        },
        {
          "recall": 0.42,
          "precision": 1.0
        },
        {
          "recall": 0.4,
          "precision": 1.0
        },
        {
          "recall": 0.38,
          "precision": 1.0
        },
        {
          "recall": 0.36,
          "precision": 1.0
        },
        {
          "recall": 0.34,
          "precision": 1.0
        },
        {
          "recall": 0.32,
          "precision": 1.0
        },
        {
          "recall": 0.3,
          "precision": 1.0
        },
        {
          "recall": 0.28,
          "precision": 1.0
        },
        {
          "recall": 0.26,
          "precision": 1.0
        },
        {
          "recall": 0.24,
          "precision": 1.0
        },
        {
          "recall": 0.22,
          "precision": 1.0
        },
        {
          "recall": 0.2,
          "precision": 1.0
        },
        {
          "recall": 0.18,
          "precision": 1.0
        },
        {
          "recall": 0.16,
          "precision": 1.0
        },
        {
          "recall": 0.14,
          "precision": 1.0
        },
        {
          "recall": 0.12,
          "precision": 1.0
        },
        {
          "recall": 0.1,
          "precision": 1.0
        },
        {
          "recall": 0.08,
          "precision": 1.0
        },
        {
          "recall": 0.06,
          "precision": 1.0
        },
        {
          "recall": 0.04,
          "precision": 1.0
        },
        {
          "recall": 0.02,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 80
    },
    "random_forest": {
      "dataset": "kidney_disease",
      "dataset_title": "Chronic Kidney Disease",
      "model": "random_forest",
      "model_label": "Random Forest",
      "is_best": true,
      "best_params": {
        "class_weight": null,
        "max_depth": 8,
        "max_features": "sqrt",
        "min_samples_leaf": 1,
        "n_estimators": 300
      },
      "cv_roc_auc": 0.9997916666666666,
      "metrics": {
        "accuracy": 1.0,
        "precision": 1.0,
        "recall": 1.0,
        "f1": 1.0,
        "roc_auc": 1.0,
        "average_precision": 1.0,
        "majority_baseline": 0.625
      },
      "confusion_matrix": {
        "true_negative": 30,
        "false_positive": 0,
        "false_negative": 0,
        "true_positive": 50
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.625,
        "mean_predicted_probability": 0.5913,
        "inflation_ratio": 0.95,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.22
        },
        {
          "fpr": 0.0,
          "tpr": 0.38
        },
        {
          "fpr": 0.0,
          "tpr": 0.46
        },
        {
          "fpr": 0.0,
          "tpr": 0.54
        },
        {
          "fpr": 0.0,
          "tpr": 0.56
        },
        {
          "fpr": 0.0,
          "tpr": 0.6
        },
        {
          "fpr": 0.0,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.625
        },
        {
          "recall": 1.0,
          "precision": 0.6329
        },
        {
          "recall": 1.0,
          "precision": 0.641
        },
        {
          "recall": 1.0,
          "precision": 0.6494
        },
        {
          "recall": 1.0,
          "precision": 0.6579
        },
        {
          "recall": 1.0,
          "precision": 0.6667
        },
        {
          "recall": 1.0,
          "precision": 0.6757
        },
        {
          "recall": 1.0,
          "precision": 0.6849
        },
        {
          "recall": 1.0,
          "precision": 0.6944
        },
        {
          "recall": 1.0,
          "precision": 0.7042
        },
        {
          "recall": 1.0,
          "precision": 0.7143
        },
        {
          "recall": 1.0,
          "precision": 0.7246
        },
        {
          "recall": 1.0,
          "precision": 0.7353
        },
        {
          "recall": 1.0,
          "precision": 0.7463
        },
        {
          "recall": 1.0,
          "precision": 0.7576
        },
        {
          "recall": 1.0,
          "precision": 0.7692
        },
        {
          "recall": 1.0,
          "precision": 0.7812
        },
        {
          "recall": 1.0,
          "precision": 0.7937
        },
        {
          "recall": 1.0,
          "precision": 0.8065
        },
        {
          "recall": 1.0,
          "precision": 0.8197
        },
        {
          "recall": 1.0,
          "precision": 0.8333
        },
        {
          "recall": 1.0,
          "precision": 0.8475
        },
        {
          "recall": 1.0,
          "precision": 0.8621
        },
        {
          "recall": 1.0,
          "precision": 0.8772
        },
        {
          "recall": 1.0,
          "precision": 0.8929
        },
        {
          "recall": 1.0,
          "precision": 0.9091
        },
        {
          "recall": 1.0,
          "precision": 0.9259
        },
        {
          "recall": 1.0,
          "precision": 0.9434
        },
        {
          "recall": 1.0,
          "precision": 0.9615
        },
        {
          "recall": 1.0,
          "precision": 0.9804
        },
        {
          "recall": 1.0,
          "precision": 1.0
        },
        {
          "recall": 0.98,
          "precision": 1.0
        },
        {
          "recall": 0.96,
          "precision": 1.0
        },
        {
          "recall": 0.94,
          "precision": 1.0
        },
        {
          "recall": 0.92,
          "precision": 1.0
        },
        {
          "recall": 0.9,
          "precision": 1.0
        },
        {
          "recall": 0.88,
          "precision": 1.0
        },
        {
          "recall": 0.86,
          "precision": 1.0
        },
        {
          "recall": 0.84,
          "precision": 1.0
        },
        {
          "recall": 0.82,
          "precision": 1.0
        },
        {
          "recall": 0.8,
          "precision": 1.0
        },
        {
          "recall": 0.78,
          "precision": 1.0
        },
        {
          "recall": 0.76,
          "precision": 1.0
        },
        {
          "recall": 0.74,
          "precision": 1.0
        },
        {
          "recall": 0.72,
          "precision": 1.0
        },
        {
          "recall": 0.7,
          "precision": 1.0
        },
        {
          "recall": 0.68,
          "precision": 1.0
        },
        {
          "recall": 0.66,
          "precision": 1.0
        },
        {
          "recall": 0.64,
          "precision": 1.0
        },
        {
          "recall": 0.62,
          "precision": 1.0
        },
        {
          "recall": 0.6,
          "precision": 1.0
        },
        {
          "recall": 0.56,
          "precision": 1.0
        },
        {
          "recall": 0.54,
          "precision": 1.0
        },
        {
          "recall": 0.5,
          "precision": 1.0
        },
        {
          "recall": 0.46,
          "precision": 1.0
        },
        {
          "recall": 0.38,
          "precision": 1.0
        },
        {
          "recall": 0.22,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 80,
      "fidelity": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 24,
        "top_k_probability_drop": [
          0.0941,
          0.182,
          0.2596,
          0.3135,
          0.3424
        ],
        "random_k_probability_drop": [
          0.0259,
          0.0466,
          0.0689,
          0.108,
          0.1221
        ],
        "fidelity_score": 3.207,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 3.2x more than ablating the same number of random features."
      },
      "stability": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.6638,
        "std_neighbour_cosine": 0.433,
        "mean_random_cosine": 0.0129,
        "stability_gap": 0.6508,
        "pairs_compared": 400,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.66 versus 0.01 for unrelated patients (gap +0.65)."
      },
      "comprehensibility": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "clinical_reference_features": [
          "al",
          "ane",
          "bu",
          "dm",
          "hemo",
          "htn",
          "pcv",
          "rbcc",
          "sc",
          "sg"
        ],
        "top3_clinical_hit_rate": 0.796,
        "shap_lime_top5_overlap": 0.488,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a low likelihood of \u201cChronic kidney disease\u201d (1%). Lowering it: Packed cell volume (50 %), Urine specific gravity (1.020), Haemoglobin (15.0 g/dL)."
      }
    },
    "xgboost": {
      "dataset": "kidney_disease",
      "dataset_title": "Chronic Kidney Disease",
      "model": "xgboost",
      "model_label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 1.0,
        "learning_rate": 0.1,
        "max_depth": 5,
        "n_estimators": 200,
        "scale_pos_weight": 1.0,
        "subsample": 0.8
      },
      "cv_roc_auc": 0.9989583333333334,
      "metrics": {
        "accuracy": 1.0,
        "precision": 1.0,
        "recall": 1.0,
        "f1": 1.0,
        "roc_auc": 1.0,
        "average_precision": 1.0,
        "majority_baseline": 0.625
      },
      "confusion_matrix": {
        "true_negative": 30,
        "false_positive": 0,
        "false_negative": 0,
        "true_positive": 50
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.625,
        "mean_predicted_probability": 0.6117,
        "inflation_ratio": 0.98,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.02
        },
        {
          "fpr": 0.0,
          "tpr": 0.06
        },
        {
          "fpr": 0.0,
          "tpr": 0.14
        },
        {
          "fpr": 0.0,
          "tpr": 0.2
        },
        {
          "fpr": 0.0,
          "tpr": 1.0
        },
        {
          "fpr": 0.9,
          "tpr": 1.0
        },
        {
          "fpr": 0.9667,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.625
        },
        {
          "recall": 1.0,
          "precision": 0.6329
        },
        {
          "recall": 1.0,
          "precision": 0.6494
        },
        {
          "recall": 1.0,
          "precision": 0.6579
        },
        {
          "recall": 1.0,
          "precision": 0.6667
        },
        {
          "recall": 1.0,
          "precision": 0.6757
        },
        {
          "recall": 1.0,
          "precision": 0.6849
        },
        {
          "recall": 1.0,
          "precision": 0.6944
        },
        {
          "recall": 1.0,
          "precision": 0.7042
        },
        {
          "recall": 1.0,
          "precision": 0.7143
        },
        {
          "recall": 1.0,
          "precision": 0.7246
        },
        {
          "recall": 1.0,
          "precision": 0.7353
        },
        {
          "recall": 1.0,
          "precision": 0.7463
        },
        {
          "recall": 1.0,
          "precision": 0.7576
        },
        {
          "recall": 1.0,
          "precision": 0.7692
        },
        {
          "recall": 1.0,
          "precision": 0.7812
        },
        {
          "recall": 1.0,
          "precision": 0.7937
        },
        {
          "recall": 1.0,
          "precision": 0.8065
        },
        {
          "recall": 1.0,
          "precision": 0.8197
        },
        {
          "recall": 1.0,
          "precision": 0.8333
        },
        {
          "recall": 1.0,
          "precision": 0.8475
        },
        {
          "recall": 1.0,
          "precision": 0.8621
        },
        {
          "recall": 1.0,
          "precision": 0.8772
        },
        {
          "recall": 1.0,
          "precision": 0.8929
        },
        {
          "recall": 1.0,
          "precision": 0.9091
        },
        {
          "recall": 1.0,
          "precision": 0.9259
        },
        {
          "recall": 1.0,
          "precision": 0.9434
        },
        {
          "recall": 1.0,
          "precision": 0.9615
        },
        {
          "recall": 1.0,
          "precision": 0.9804
        },
        {
          "recall": 1.0,
          "precision": 1.0
        },
        {
          "recall": 0.98,
          "precision": 1.0
        },
        {
          "recall": 0.96,
          "precision": 1.0
        },
        {
          "recall": 0.94,
          "precision": 1.0
        },
        {
          "recall": 0.92,
          "precision": 1.0
        },
        {
          "recall": 0.9,
          "precision": 1.0
        },
        {
          "recall": 0.88,
          "precision": 1.0
        },
        {
          "recall": 0.86,
          "precision": 1.0
        },
        {
          "recall": 0.84,
          "precision": 1.0
        },
        {
          "recall": 0.82,
          "precision": 1.0
        },
        {
          "recall": 0.8,
          "precision": 1.0
        },
        {
          "recall": 0.78,
          "precision": 1.0
        },
        {
          "recall": 0.76,
          "precision": 1.0
        },
        {
          "recall": 0.74,
          "precision": 1.0
        },
        {
          "recall": 0.72,
          "precision": 1.0
        },
        {
          "recall": 0.7,
          "precision": 1.0
        },
        {
          "recall": 0.68,
          "precision": 1.0
        },
        {
          "recall": 0.66,
          "precision": 1.0
        },
        {
          "recall": 0.64,
          "precision": 1.0
        },
        {
          "recall": 0.62,
          "precision": 1.0
        },
        {
          "recall": 0.6,
          "precision": 1.0
        },
        {
          "recall": 0.58,
          "precision": 1.0
        },
        {
          "recall": 0.56,
          "precision": 1.0
        },
        {
          "recall": 0.54,
          "precision": 1.0
        },
        {
          "recall": 0.52,
          "precision": 1.0
        },
        {
          "recall": 0.5,
          "precision": 1.0
        },
        {
          "recall": 0.48,
          "precision": 1.0
        },
        {
          "recall": 0.46,
          "precision": 1.0
        },
        {
          "recall": 0.44,
          "precision": 1.0
        },
        {
          "recall": 0.42,
          "precision": 1.0
        },
        {
          "recall": 0.4,
          "precision": 1.0
        },
        {
          "recall": 0.38,
          "precision": 1.0
        },
        {
          "recall": 0.36,
          "precision": 1.0
        },
        {
          "recall": 0.34,
          "precision": 1.0
        },
        {
          "recall": 0.32,
          "precision": 1.0
        },
        {
          "recall": 0.3,
          "precision": 1.0
        },
        {
          "recall": 0.28,
          "precision": 1.0
        },
        {
          "recall": 0.26,
          "precision": 1.0
        },
        {
          "recall": 0.24,
          "precision": 1.0
        },
        {
          "recall": 0.22,
          "precision": 1.0
        },
        {
          "recall": 0.2,
          "precision": 1.0
        },
        {
          "recall": 0.14,
          "precision": 1.0
        },
        {
          "recall": 0.06,
          "precision": 1.0
        },
        {
          "recall": 0.04,
          "precision": 1.0
        },
        {
          "recall": 0.02,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 80
    }
  },
  "breast_cancer": {
    "logistic_regression": {
      "dataset": "breast_cancer",
      "dataset_title": "Breast Cancer Wisconsin (Diagnostic)",
      "model": "logistic_regression",
      "model_label": "Logistic Regression",
      "is_best": true,
      "best_params": {
        "C": 1.0,
        "class_weight": null,
        "penalty": "l2",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.9957688338493291,
      "metrics": {
        "accuracy": 0.9736842105263158,
        "precision": 0.975609756097561,
        "recall": 0.9523809523809523,
        "f1": 0.963855421686747,
        "roc_auc": 0.996031746031746,
        "average_precision": 0.994273631904294,
        "majority_baseline": 0.631578947368421
      },
      "confusion_matrix": {
        "true_negative": 71,
        "false_positive": 1,
        "false_negative": 2,
        "true_positive": 40
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.3684,
        "mean_predicted_probability": 0.3539,
        "inflation_ratio": 0.96,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.0238
        },
        {
          "fpr": 0.0,
          "tpr": 0.9286
        },
        {
          "fpr": 0.0139,
          "tpr": 0.9286
        },
        {
          "fpr": 0.0139,
          "tpr": 0.9762
        },
        {
          "fpr": 0.1389,
          "tpr": 0.9762
        },
        {
          "fpr": 0.1389,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.3684
        },
        {
          "recall": 1.0,
          "precision": 0.3717
        },
        {
          "recall": 1.0,
          "precision": 0.375
        },
        {
          "recall": 1.0,
          "precision": 0.3784
        },
        {
          "recall": 1.0,
          "precision": 0.3818
        },
        {
          "recall": 1.0,
          "precision": 0.3853
        },
        {
          "recall": 1.0,
          "precision": 0.3889
        },
        {
          "recall": 1.0,
          "precision": 0.3925
        },
        {
          "recall": 1.0,
          "precision": 0.3962
        },
        {
          "recall": 1.0,
          "precision": 0.4
        },
        {
          "recall": 1.0,
          "precision": 0.4038
        },
        {
          "recall": 1.0,
          "precision": 0.4078
        },
        {
          "recall": 1.0,
          "precision": 0.4118
        },
        {
          "recall": 1.0,
          "precision": 0.4158
        },
        {
          "recall": 1.0,
          "precision": 0.42
        },
        {
          "recall": 1.0,
          "precision": 0.4242
        },
        {
          "recall": 1.0,
          "precision": 0.4286
        },
        {
          "recall": 1.0,
          "precision": 0.433
        },
        {
          "recall": 1.0,
          "precision": 0.4375
        },
        {
          "recall": 1.0,
          "precision": 0.4421
        },
        {
          "recall": 1.0,
          "precision": 0.4468
        },
        {
          "recall": 1.0,
          "precision": 0.4516
        },
        {
          "recall": 1.0,
          "precision": 0.4565
        },
        {
          "recall": 1.0,
          "precision": 0.4615
        },
        {
          "recall": 1.0,
          "precision": 0.4667
        },
        {
          "recall": 1.0,
          "precision": 0.4719
        },
        {
          "recall": 1.0,
          "precision": 0.4773
        },
        {
          "recall": 1.0,
          "precision": 0.4828
        },
        {
          "recall": 1.0,
          "precision": 0.4884
        },
        {
          "recall": 1.0,
          "precision": 0.4941
        },
        {
          "recall": 1.0,
          "precision": 0.5
        },
        {
          "recall": 1.0,
          "precision": 0.506
        },
        {
          "recall": 1.0,
          "precision": 0.5122
        },
        {
          "recall": 1.0,
          "precision": 0.5185
        },
        {
          "recall": 1.0,
          "precision": 0.525
        },
        {
          "recall": 1.0,
          "precision": 0.5316
        },
        {
          "recall": 1.0,
          "precision": 0.5385
        },
        {
          "recall": 1.0,
          "precision": 0.5455
        },
        {
          "recall": 1.0,
          "precision": 0.5526
        },
        {
          "recall": 1.0,
          "precision": 0.56
        },
        {
          "recall": 1.0,
          "precision": 0.5676
        },
        {
          "recall": 1.0,
          "precision": 0.5753
        },
        {
          "recall": 1.0,
          "precision": 0.5833
        },
        {
          "recall": 1.0,
          "precision": 0.5915
        },
        {
          "recall": 1.0,
          "precision": 0.6
        },
        {
          "recall": 1.0,
          "precision": 0.6087
        },
        {
          "recall": 1.0,
          "precision": 0.6176
        },
        {
          "recall": 1.0,
          "precision": 0.6269
        },
        {
          "recall": 1.0,
          "precision": 0.6364
        },
        {
          "recall": 1.0,
          "precision": 0.6462
        },
        {
          "recall": 1.0,
          "precision": 0.6562
        },
        {
          "recall": 1.0,
          "precision": 0.6667
        },
        {
          "recall": 1.0,
          "precision": 0.6774
        },
        {
          "recall": 1.0,
          "precision": 0.6885
        },
        {
          "recall": 1.0,
          "precision": 0.7
        },
        {
          "recall": 1.0,
          "precision": 0.7119
        },
        {
          "recall": 1.0,
          "precision": 0.7241
        },
        {
          "recall": 1.0,
          "precision": 0.7368
        },
        {
          "recall": 1.0,
          "precision": 0.75
        },
        {
          "recall": 1.0,
          "precision": 0.7636
        },
        {
          "recall": 1.0,
          "precision": 0.7778
        },
        {
          "recall": 1.0,
          "precision": 0.7925
        },
        {
          "recall": 1.0,
          "precision": 0.8077
        },
        {
          "recall": 0.9762,
          "precision": 0.8039
        },
        {
          "recall": 0.9762,
          "precision": 0.82
        },
        {
          "recall": 0.9762,
          "precision": 0.8367
        },
        {
          "recall": 0.9762,
          "precision": 0.8542
        },
        {
          "recall": 0.9762,
          "precision": 0.8723
        },
        {
          "recall": 0.9762,
          "precision": 0.8913
        },
        {
          "recall": 0.9762,
          "precision": 0.9111
        },
        {
          "recall": 0.9762,
          "precision": 0.9318
        },
        {
          "recall": 0.9762,
          "precision": 0.9535
        },
        {
          "recall": 0.9762,
          "precision": 0.9762
        },
        {
          "recall": 0.9524,
          "precision": 0.9756
        },
        {
          "recall": 0.9286,
          "precision": 0.975
        },
        {
          "recall": 0.9286,
          "precision": 1.0
        },
        {
          "recall": 0.9048,
          "precision": 1.0
        },
        {
          "recall": 0.881,
          "precision": 1.0
        },
        {
          "recall": 0.8571,
          "precision": 1.0
        },
        {
          "recall": 0.8333,
          "precision": 1.0
        },
        {
          "recall": 0.8095,
          "precision": 1.0
        },
        {
          "recall": 0.7857,
          "precision": 1.0
        },
        {
          "recall": 0.7619,
          "precision": 1.0
        },
        {
          "recall": 0.7381,
          "precision": 1.0
        },
        {
          "recall": 0.7143,
          "precision": 1.0
        },
        {
          "recall": 0.6905,
          "precision": 1.0
        },
        {
          "recall": 0.6667,
          "precision": 1.0
        },
        {
          "recall": 0.6429,
          "precision": 1.0
        },
        {
          "recall": 0.619,
          "precision": 1.0
        },
        {
          "recall": 0.5952,
          "precision": 1.0
        },
        {
          "recall": 0.5714,
          "precision": 1.0
        },
        {
          "recall": 0.5476,
          "precision": 1.0
        },
        {
          "recall": 0.5238,
          "precision": 1.0
        },
        {
          "recall": 0.5,
          "precision": 1.0
        },
        {
          "recall": 0.4762,
          "precision": 1.0
        },
        {
          "recall": 0.4524,
          "precision": 1.0
        },
        {
          "recall": 0.4286,
          "precision": 1.0
        },
        {
          "recall": 0.4048,
          "precision": 1.0
        },
        {
          "recall": 0.381,
          "precision": 1.0
        },
        {
          "recall": 0.3571,
          "precision": 1.0
        },
        {
          "recall": 0.3333,
          "precision": 1.0
        },
        {
          "recall": 0.3095,
          "precision": 1.0
        },
        {
          "recall": 0.2857,
          "precision": 1.0
        },
        {
          "recall": 0.2619,
          "precision": 1.0
        },
        {
          "recall": 0.2381,
          "precision": 1.0
        },
        {
          "recall": 0.2143,
          "precision": 1.0
        },
        {
          "recall": 0.1905,
          "precision": 1.0
        },
        {
          "recall": 0.1667,
          "precision": 1.0
        },
        {
          "recall": 0.1429,
          "precision": 1.0
        },
        {
          "recall": 0.119,
          "precision": 1.0
        },
        {
          "recall": 0.0952,
          "precision": 1.0
        },
        {
          "recall": 0.0714,
          "precision": 1.0
        },
        {
          "recall": 0.0476,
          "precision": 1.0
        },
        {
          "recall": 0.0238,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 114,
      "fidelity": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 30,
        "top_k_probability_drop": [
          0.0519,
          0.0618,
          0.0738,
          0.0894,
          0.1047
        ],
        "random_k_probability_drop": [
          0.0083,
          0.0158,
          0.0222,
          0.0241,
          0.0295
        ],
        "fidelity_score": 3.824,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 3.8x more than ablating the same number of random features."
      },
      "stability": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.7611,
        "std_neighbour_cosine": 0.1932,
        "mean_random_cosine": 0.0385,
        "stability_gap": 0.7226,
        "pairs_compared": 570,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.76 versus 0.04 for unrelated patients (gap +0.72)."
      },
      "comprehensibility": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "clinical_reference_features": [
          "area1",
          "area3",
          "compactness1",
          "compactness3",
          "concave_points1",
          "concave_points3",
          "concavity1",
          "concavity3",
          "perimeter1",
          "perimeter3",
          "radius1",
          "radius3",
          "texture1",
          "texture3"
        ],
        "top3_clinical_hit_rate": 0.596,
        "shap_lime_top5_overlap": 0.688,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a low likelihood of \u201cMalignant\u201d (0%). Lowering it: Texture (grey-scale s.d.) (worst) (16.0), Radius (variability) (0.14 \u00b5m), Texture (grey-scale s.d.) (mean) (10.8)."
      }
    },
    "random_forest": {
      "dataset": "breast_cancer",
      "dataset_title": "Breast Cancer Wisconsin (Diagnostic)",
      "model": "random_forest",
      "model_label": "Random Forest",
      "is_best": false,
      "best_params": {
        "class_weight": "balanced",
        "max_depth": null,
        "max_features": "sqrt",
        "min_samples_leaf": 1,
        "n_estimators": 600
      },
      "cv_roc_auc": 0.9892672858617131,
      "metrics": {
        "accuracy": 0.9736842105263158,
        "precision": 1.0,
        "recall": 0.9285714285714286,
        "f1": 0.9629629629629629,
        "roc_auc": 0.9973544973544973,
        "average_precision": 0.9957789321301711,
        "majority_baseline": 0.631578947368421
      },
      "confusion_matrix": {
        "true_negative": 72,
        "false_positive": 0,
        "false_negative": 3,
        "true_positive": 39
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.3684,
        "mean_predicted_probability": 0.3472,
        "inflation_ratio": 0.94,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.2381
        },
        {
          "fpr": 0.0,
          "tpr": 0.3333
        },
        {
          "fpr": 0.0,
          "tpr": 0.3571
        },
        {
          "fpr": 0.0,
          "tpr": 0.4048
        },
        {
          "fpr": 0.0,
          "tpr": 0.9286
        },
        {
          "fpr": 0.0139,
          "tpr": 0.9286
        },
        {
          "fpr": 0.0139,
          "tpr": 0.9524
        },
        {
          "fpr": 0.0278,
          "tpr": 0.9524
        },
        {
          "fpr": 0.0278,
          "tpr": 0.9762
        },
        {
          "fpr": 0.0694,
          "tpr": 0.9762
        },
        {
          "fpr": 0.0694,
          "tpr": 1.0
        },
        {
          "fpr": 0.1389,
          "tpr": 1.0
        },
        {
          "fpr": 0.1667,
          "tpr": 1.0
        },
        {
          "fpr": 0.1806,
          "tpr": 1.0
        },
        {
          "fpr": 0.2083,
          "tpr": 1.0
        },
        {
          "fpr": 0.2639,
          "tpr": 1.0
        },
        {
          "fpr": 0.2917,
          "tpr": 1.0
        },
        {
          "fpr": 0.3333,
          "tpr": 1.0
        },
        {
          "fpr": 0.3611,
          "tpr": 1.0
        },
        {
          "fpr": 0.375,
          "tpr": 1.0
        },
        {
          "fpr": 0.4167,
          "tpr": 1.0
        },
        {
          "fpr": 0.4306,
          "tpr": 1.0
        },
        {
          "fpr": 0.4861,
          "tpr": 1.0
        },
        {
          "fpr": 0.5694,
          "tpr": 1.0
        },
        {
          "fpr": 0.6667,
          "tpr": 1.0
        },
        {
          "fpr": 0.7083,
          "tpr": 1.0
        },
        {
          "fpr": 0.8611,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.3684
        },
        {
          "recall": 1.0,
          "precision": 0.4038
        },
        {
          "recall": 1.0,
          "precision": 0.4516
        },
        {
          "recall": 1.0,
          "precision": 0.4667
        },
        {
          "recall": 1.0,
          "precision": 0.506
        },
        {
          "recall": 1.0,
          "precision": 0.525
        },
        {
          "recall": 1.0,
          "precision": 0.5455
        },
        {
          "recall": 1.0,
          "precision": 0.5753
        },
        {
          "recall": 1.0,
          "precision": 0.5833
        },
        {
          "recall": 1.0,
          "precision": 0.6087
        },
        {
          "recall": 1.0,
          "precision": 0.6176
        },
        {
          "recall": 1.0,
          "precision": 0.6364
        },
        {
          "recall": 1.0,
          "precision": 0.6462
        },
        {
          "recall": 1.0,
          "precision": 0.6562
        },
        {
          "recall": 1.0,
          "precision": 0.6667
        },
        {
          "recall": 1.0,
          "precision": 0.6885
        },
        {
          "recall": 1.0,
          "precision": 0.7
        },
        {
          "recall": 1.0,
          "precision": 0.7119
        },
        {
          "recall": 1.0,
          "precision": 0.7241
        },
        {
          "recall": 1.0,
          "precision": 0.7368
        },
        {
          "recall": 1.0,
          "precision": 0.7636
        },
        {
          "recall": 1.0,
          "precision": 0.7778
        },
        {
          "recall": 1.0,
          "precision": 0.8077
        },
        {
          "recall": 1.0,
          "precision": 0.8235
        },
        {
          "recall": 1.0,
          "precision": 0.84
        },
        {
          "recall": 1.0,
          "precision": 0.8571
        },
        {
          "recall": 1.0,
          "precision": 0.875
        },
        {
          "recall": 1.0,
          "precision": 0.8936
        },
        {
          "recall": 0.9762,
          "precision": 0.8913
        },
        {
          "recall": 0.9762,
          "precision": 0.9111
        },
        {
          "recall": 0.9762,
          "precision": 0.9318
        },
        {
          "recall": 0.9762,
          "precision": 0.9535
        },
        {
          "recall": 0.9524,
          "precision": 0.9524
        },
        {
          "recall": 0.9524,
          "precision": 0.9756
        },
        {
          "recall": 0.9286,
          "precision": 0.975
        },
        {
          "recall": 0.9286,
          "precision": 1.0
        },
        {
          "recall": 0.9048,
          "precision": 1.0
        },
        {
          "recall": 0.881,
          "precision": 1.0
        },
        {
          "recall": 0.8571,
          "precision": 1.0
        },
        {
          "recall": 0.8333,
          "precision": 1.0
        },
        {
          "recall": 0.8095,
          "precision": 1.0
        },
        {
          "recall": 0.7857,
          "precision": 1.0
        },
        {
          "recall": 0.7619,
          "precision": 1.0
        },
        {
          "recall": 0.7381,
          "precision": 1.0
        },
        {
          "recall": 0.7143,
          "precision": 1.0
        },
        {
          "recall": 0.6905,
          "precision": 1.0
        },
        {
          "recall": 0.6667,
          "precision": 1.0
        },
        {
          "recall": 0.6429,
          "precision": 1.0
        },
        {
          "recall": 0.619,
          "precision": 1.0
        },
        {
          "recall": 0.5952,
          "precision": 1.0
        },
        {
          "recall": 0.5714,
          "precision": 1.0
        },
        {
          "recall": 0.5476,
          "precision": 1.0
        },
        {
          "recall": 0.5238,
          "precision": 1.0
        },
        {
          "recall": 0.5,
          "precision": 1.0
        },
        {
          "recall": 0.4762,
          "precision": 1.0
        },
        {
          "recall": 0.4524,
          "precision": 1.0
        },
        {
          "recall": 0.4286,
          "precision": 1.0
        },
        {
          "recall": 0.4048,
          "precision": 1.0
        },
        {
          "recall": 0.3571,
          "precision": 1.0
        },
        {
          "recall": 0.3333,
          "precision": 1.0
        },
        {
          "recall": 0.2857,
          "precision": 1.0
        },
        {
          "recall": 0.2381,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 114
    },
    "xgboost": {
      "dataset": "breast_cancer",
      "dataset_title": "Breast Cancer Wisconsin (Diagnostic)",
      "model": "xgboost",
      "model_label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 1.0,
        "learning_rate": 0.1,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 1.676,
        "subsample": 0.8
      },
      "cv_roc_auc": 0.9951496388028895,
      "metrics": {
        "accuracy": 0.9736842105263158,
        "precision": 1.0,
        "recall": 0.9285714285714286,
        "f1": 0.9629629629629629,
        "roc_auc": 0.9914021164021164,
        "average_precision": 0.9905489559007683,
        "majority_baseline": 0.631578947368421
      },
      "confusion_matrix": {
        "true_negative": 72,
        "false_positive": 0,
        "false_negative": 3,
        "true_positive": 39
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.3684,
        "mean_predicted_probability": 0.3484,
        "inflation_ratio": 0.95,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.0238
        },
        {
          "fpr": 0.0,
          "tpr": 0.9524
        },
        {
          "fpr": 0.0139,
          "tpr": 0.9524
        },
        {
          "fpr": 0.0139,
          "tpr": 0.9762
        },
        {
          "fpr": 0.3472,
          "tpr": 0.9762
        },
        {
          "fpr": 0.3472,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.3684
        },
        {
          "recall": 1.0,
          "precision": 0.3717
        },
        {
          "recall": 1.0,
          "precision": 0.375
        },
        {
          "recall": 1.0,
          "precision": 0.3784
        },
        {
          "recall": 1.0,
          "precision": 0.3818
        },
        {
          "recall": 1.0,
          "precision": 0.3853
        },
        {
          "recall": 1.0,
          "precision": 0.3889
        },
        {
          "recall": 1.0,
          "precision": 0.3925
        },
        {
          "recall": 1.0,
          "precision": 0.3962
        },
        {
          "recall": 1.0,
          "precision": 0.4
        },
        {
          "recall": 1.0,
          "precision": 0.4038
        },
        {
          "recall": 1.0,
          "precision": 0.4078
        },
        {
          "recall": 1.0,
          "precision": 0.4118
        },
        {
          "recall": 1.0,
          "precision": 0.4158
        },
        {
          "recall": 1.0,
          "precision": 0.42
        },
        {
          "recall": 1.0,
          "precision": 0.4242
        },
        {
          "recall": 1.0,
          "precision": 0.4286
        },
        {
          "recall": 1.0,
          "precision": 0.433
        },
        {
          "recall": 1.0,
          "precision": 0.4375
        },
        {
          "recall": 1.0,
          "precision": 0.4421
        },
        {
          "recall": 1.0,
          "precision": 0.4468
        },
        {
          "recall": 1.0,
          "precision": 0.4516
        },
        {
          "recall": 1.0,
          "precision": 0.4565
        },
        {
          "recall": 1.0,
          "precision": 0.4615
        },
        {
          "recall": 1.0,
          "precision": 0.4667
        },
        {
          "recall": 1.0,
          "precision": 0.4719
        },
        {
          "recall": 1.0,
          "precision": 0.4773
        },
        {
          "recall": 1.0,
          "precision": 0.4828
        },
        {
          "recall": 1.0,
          "precision": 0.4884
        },
        {
          "recall": 1.0,
          "precision": 0.4941
        },
        {
          "recall": 1.0,
          "precision": 0.5
        },
        {
          "recall": 1.0,
          "precision": 0.506
        },
        {
          "recall": 1.0,
          "precision": 0.5122
        },
        {
          "recall": 1.0,
          "precision": 0.5185
        },
        {
          "recall": 1.0,
          "precision": 0.525
        },
        {
          "recall": 1.0,
          "precision": 0.5316
        },
        {
          "recall": 1.0,
          "precision": 0.5385
        },
        {
          "recall": 1.0,
          "precision": 0.5455
        },
        {
          "recall": 1.0,
          "precision": 0.5526
        },
        {
          "recall": 1.0,
          "precision": 0.56
        },
        {
          "recall": 1.0,
          "precision": 0.5676
        },
        {
          "recall": 1.0,
          "precision": 0.5753
        },
        {
          "recall": 1.0,
          "precision": 0.5833
        },
        {
          "recall": 1.0,
          "precision": 0.5915
        },
        {
          "recall": 1.0,
          "precision": 0.6
        },
        {
          "recall": 1.0,
          "precision": 0.6087
        },
        {
          "recall": 1.0,
          "precision": 0.6176
        },
        {
          "recall": 1.0,
          "precision": 0.6269
        },
        {
          "recall": 0.9762,
          "precision": 0.6212
        },
        {
          "recall": 0.9762,
          "precision": 0.6308
        },
        {
          "recall": 0.9762,
          "precision": 0.6406
        },
        {
          "recall": 0.9762,
          "precision": 0.6508
        },
        {
          "recall": 0.9762,
          "precision": 0.6613
        },
        {
          "recall": 0.9762,
          "precision": 0.6721
        },
        {
          "recall": 0.9762,
          "precision": 0.6833
        },
        {
          "recall": 0.9762,
          "precision": 0.6949
        },
        {
          "recall": 0.9762,
          "precision": 0.7069
        },
        {
          "recall": 0.9762,
          "precision": 0.7193
        },
        {
          "recall": 0.9762,
          "precision": 0.7321
        },
        {
          "recall": 0.9762,
          "precision": 0.7455
        },
        {
          "recall": 0.9762,
          "precision": 0.7593
        },
        {
          "recall": 0.9762,
          "precision": 0.7736
        },
        {
          "recall": 0.9762,
          "precision": 0.7885
        },
        {
          "recall": 0.9762,
          "precision": 0.8039
        },
        {
          "recall": 0.9762,
          "precision": 0.82
        },
        {
          "recall": 0.9762,
          "precision": 0.8367
        },
        {
          "recall": 0.9762,
          "precision": 0.8542
        },
        {
          "recall": 0.9762,
          "precision": 0.8723
        },
        {
          "recall": 0.9762,
          "precision": 0.8913
        },
        {
          "recall": 0.9762,
          "precision": 0.9111
        },
        {
          "recall": 0.9762,
          "precision": 0.9318
        },
        {
          "recall": 0.9762,
          "precision": 0.9535
        },
        {
          "recall": 0.9762,
          "precision": 0.9762
        },
        {
          "recall": 0.9524,
          "precision": 0.9756
        },
        {
          "recall": 0.9524,
          "precision": 1.0
        },
        {
          "recall": 0.9286,
          "precision": 1.0
        },
        {
          "recall": 0.9048,
          "precision": 1.0
        },
        {
          "recall": 0.881,
          "precision": 1.0
        },
        {
          "recall": 0.8571,
          "precision": 1.0
        },
        {
          "recall": 0.8333,
          "precision": 1.0
        },
        {
          "recall": 0.8095,
          "precision": 1.0
        },
        {
          "recall": 0.7857,
          "precision": 1.0
        },
        {
          "recall": 0.7619,
          "precision": 1.0
        },
        {
          "recall": 0.7381,
          "precision": 1.0
        },
        {
          "recall": 0.7143,
          "precision": 1.0
        },
        {
          "recall": 0.6905,
          "precision": 1.0
        },
        {
          "recall": 0.6667,
          "precision": 1.0
        },
        {
          "recall": 0.6429,
          "precision": 1.0
        },
        {
          "recall": 0.619,
          "precision": 1.0
        },
        {
          "recall": 0.5952,
          "precision": 1.0
        },
        {
          "recall": 0.5714,
          "precision": 1.0
        },
        {
          "recall": 0.5476,
          "precision": 1.0
        },
        {
          "recall": 0.5238,
          "precision": 1.0
        },
        {
          "recall": 0.5,
          "precision": 1.0
        },
        {
          "recall": 0.4762,
          "precision": 1.0
        },
        {
          "recall": 0.4524,
          "precision": 1.0
        },
        {
          "recall": 0.4286,
          "precision": 1.0
        },
        {
          "recall": 0.4048,
          "precision": 1.0
        },
        {
          "recall": 0.381,
          "precision": 1.0
        },
        {
          "recall": 0.3571,
          "precision": 1.0
        },
        {
          "recall": 0.3333,
          "precision": 1.0
        },
        {
          "recall": 0.3095,
          "precision": 1.0
        },
        {
          "recall": 0.2857,
          "precision": 1.0
        },
        {
          "recall": 0.2619,
          "precision": 1.0
        },
        {
          "recall": 0.2381,
          "precision": 1.0
        },
        {
          "recall": 0.2143,
          "precision": 1.0
        },
        {
          "recall": 0.1905,
          "precision": 1.0
        },
        {
          "recall": 0.1667,
          "precision": 1.0
        },
        {
          "recall": 0.1429,
          "precision": 1.0
        },
        {
          "recall": 0.119,
          "precision": 1.0
        },
        {
          "recall": 0.0952,
          "precision": 1.0
        },
        {
          "recall": 0.0714,
          "precision": 1.0
        },
        {
          "recall": 0.0476,
          "precision": 1.0
        },
        {
          "recall": 0.0238,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 114
    }
  },
  "breast_cancer_recurrence": {
    "logistic_regression": {
      "dataset": "breast_cancer_recurrence",
      "dataset_title": "Breast Cancer Recurrence (Ljubljana)",
      "model": "logistic_regression",
      "model_label": "Logistic Regression",
      "is_best": false,
      "best_params": {
        "C": 0.1,
        "class_weight": "balanced",
        "penalty": "l1",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.6999313186813187,
      "metrics": {
        "accuracy": 0.6551724137931034,
        "precision": 0.43478260869565216,
        "recall": 0.5882352941176471,
        "f1": 0.5,
        "roc_auc": 0.648493543758967,
        "average_precision": 0.5268617896406802,
        "majority_baseline": 0.7068965517241379
      },
      "confusion_matrix": {
        "true_negative": 28,
        "false_positive": 13,
        "false_negative": 7,
        "true_positive": 10
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.2931,
        "mean_predicted_probability": 0.5101,
        "inflation_ratio": 1.74,
        "calibrated": false,
        "note": "Probabilities are inflated roughly 1.7x relative to the cohort prevalence of 29.3%, because class weighting was tuned in. Read the number as a relative risk score for ranking patients, not as this patient's absolute probability."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.0588
        },
        {
          "fpr": 0.0244,
          "tpr": 0.0588
        },
        {
          "fpr": 0.0244,
          "tpr": 0.2353
        },
        {
          "fpr": 0.0732,
          "tpr": 0.2353
        },
        {
          "fpr": 0.0732,
          "tpr": 0.3529
        },
        {
          "fpr": 0.122,
          "tpr": 0.3529
        },
        {
          "fpr": 0.122,
          "tpr": 0.4118
        },
        {
          "fpr": 0.1707,
          "tpr": 0.4118
        },
        {
          "fpr": 0.1707,
          "tpr": 0.4706
        },
        {
          "fpr": 0.2195,
          "tpr": 0.4706
        },
        {
          "fpr": 0.2439,
          "tpr": 0.4706
        },
        {
          "fpr": 0.2439,
          "tpr": 0.5882
        },
        {
          "fpr": 0.3415,
          "tpr": 0.5882
        },
        {
          "fpr": 0.3415,
          "tpr": 0.6471
        },
        {
          "fpr": 0.5366,
          "tpr": 0.6471
        },
        {
          "fpr": 0.5366,
          "tpr": 0.7059
        },
        {
          "fpr": 0.561,
          "tpr": 0.7059
        },
        {
          "fpr": 0.6098,
          "tpr": 0.7059
        },
        {
          "fpr": 0.6829,
          "tpr": 0.7059
        },
        {
          "fpr": 0.6829,
          "tpr": 0.7647
        },
        {
          "fpr": 0.7073,
          "tpr": 0.7647
        },
        {
          "fpr": 0.8049,
          "tpr": 0.7647
        },
        {
          "fpr": 0.8049,
          "tpr": 0.8824
        },
        {
          "fpr": 0.878,
          "tpr": 0.8824
        },
        {
          "fpr": 0.878,
          "tpr": 0.9412
        },
        {
          "fpr": 0.9024,
          "tpr": 0.9412
        },
        {
          "fpr": 0.9512,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.2931
        },
        {
          "recall": 1.0,
          "precision": 0.2982
        },
        {
          "recall": 1.0,
          "precision": 0.3036
        },
        {
          "recall": 0.9412,
          "precision": 0.3019
        },
        {
          "recall": 0.9412,
          "precision": 0.3077
        },
        {
          "recall": 0.8824,
          "precision": 0.2941
        },
        {
          "recall": 0.8824,
          "precision": 0.3
        },
        {
          "recall": 0.8824,
          "precision": 0.3061
        },
        {
          "recall": 0.8824,
          "precision": 0.3125
        },
        {
          "recall": 0.8235,
          "precision": 0.2979
        },
        {
          "recall": 0.7647,
          "precision": 0.2826
        },
        {
          "recall": 0.7647,
          "precision": 0.2955
        },
        {
          "recall": 0.7647,
          "precision": 0.3095
        },
        {
          "recall": 0.7647,
          "precision": 0.3171
        },
        {
          "recall": 0.7059,
          "precision": 0.3
        },
        {
          "recall": 0.7059,
          "precision": 0.3077
        },
        {
          "recall": 0.7059,
          "precision": 0.3158
        },
        {
          "recall": 0.7059,
          "precision": 0.3243
        },
        {
          "recall": 0.7059,
          "precision": 0.3429
        },
        {
          "recall": 0.7059,
          "precision": 0.3529
        },
        {
          "recall": 0.6471,
          "precision": 0.3333
        },
        {
          "recall": 0.6471,
          "precision": 0.3438
        },
        {
          "recall": 0.6471,
          "precision": 0.3548
        },
        {
          "recall": 0.6471,
          "precision": 0.3667
        },
        {
          "recall": 0.6471,
          "precision": 0.3793
        },
        {
          "recall": 0.6471,
          "precision": 0.3929
        },
        {
          "recall": 0.6471,
          "precision": 0.4074
        },
        {
          "recall": 0.6471,
          "precision": 0.4231
        },
        {
          "recall": 0.6471,
          "precision": 0.44
        },
        {
          "recall": 0.5882,
          "precision": 0.4167
        },
        {
          "recall": 0.5882,
          "precision": 0.4348
        },
        {
          "recall": 0.5882,
          "precision": 0.4545
        },
        {
          "recall": 0.5882,
          "precision": 0.4762
        },
        {
          "recall": 0.5882,
          "precision": 0.5
        },
        {
          "recall": 0.4706,
          "precision": 0.4444
        },
        {
          "recall": 0.4706,
          "precision": 0.4706
        },
        {
          "recall": 0.4706,
          "precision": 0.5333
        },
        {
          "recall": 0.4118,
          "precision": 0.5
        },
        {
          "recall": 0.4118,
          "precision": 0.5385
        },
        {
          "recall": 0.4118,
          "precision": 0.5833
        },
        {
          "recall": 0.3529,
          "precision": 0.5455
        },
        {
          "recall": 0.3529,
          "precision": 0.6
        },
        {
          "recall": 0.3529,
          "precision": 0.6667
        },
        {
          "recall": 0.2941,
          "precision": 0.625
        },
        {
          "recall": 0.2353,
          "precision": 0.5714
        },
        {
          "recall": 0.2353,
          "precision": 0.6667
        },
        {
          "recall": 0.2353,
          "precision": 0.8
        },
        {
          "recall": 0.1765,
          "precision": 0.75
        },
        {
          "recall": 0.1176,
          "precision": 0.6667
        },
        {
          "recall": 0.0588,
          "precision": 0.5
        },
        {
          "recall": 0.0588,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 58
    },
    "random_forest": {
      "dataset": "breast_cancer_recurrence",
      "dataset_title": "Breast Cancer Recurrence (Ljubljana)",
      "model": "random_forest",
      "model_label": "Random Forest",
      "is_best": true,
      "best_params": {
        "class_weight": null,
        "max_depth": 4,
        "max_features": "sqrt",
        "min_samples_leaf": 3,
        "n_estimators": 300
      },
      "cv_roc_auc": 0.6903159340659342,
      "metrics": {
        "accuracy": 0.7758620689655172,
        "precision": 0.7,
        "recall": 0.4117647058823529,
        "f1": 0.5185185185185185,
        "roc_auc": 0.6657101865136298,
        "average_precision": 0.5730217350375719,
        "majority_baseline": 0.7068965517241379
      },
      "confusion_matrix": {
        "true_negative": 38,
        "false_positive": 3,
        "false_negative": 10,
        "true_positive": 7
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.2931,
        "mean_predicted_probability": 0.3089,
        "inflation_ratio": 1.05,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.0588
        },
        {
          "fpr": 0.0,
          "tpr": 0.2353
        },
        {
          "fpr": 0.0488,
          "tpr": 0.2353
        },
        {
          "fpr": 0.0488,
          "tpr": 0.2941
        },
        {
          "fpr": 0.0732,
          "tpr": 0.2941
        },
        {
          "fpr": 0.0732,
          "tpr": 0.4118
        },
        {
          "fpr": 0.3415,
          "tpr": 0.4118
        },
        {
          "fpr": 0.3415,
          "tpr": 0.4706
        },
        {
          "fpr": 0.3902,
          "tpr": 0.4706
        },
        {
          "fpr": 0.3902,
          "tpr": 0.5882
        },
        {
          "fpr": 0.439,
          "tpr": 0.5882
        },
        {
          "fpr": 0.439,
          "tpr": 0.7647
        },
        {
          "fpr": 0.6585,
          "tpr": 0.7647
        },
        {
          "fpr": 0.6585,
          "tpr": 0.8235
        },
        {
          "fpr": 0.7317,
          "tpr": 0.8235
        },
        {
          "fpr": 0.7317,
          "tpr": 0.8824
        },
        {
          "fpr": 0.7805,
          "tpr": 0.8824
        },
        {
          "fpr": 0.7805,
          "tpr": 0.9412
        },
        {
          "fpr": 0.878,
          "tpr": 0.9412
        },
        {
          "fpr": 0.878,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.2931
        },
        {
          "recall": 1.0,
          "precision": 0.2982
        },
        {
          "recall": 1.0,
          "precision": 0.3036
        },
        {
          "recall": 1.0,
          "precision": 0.3091
        },
        {
          "recall": 1.0,
          "precision": 0.3148
        },
        {
          "recall": 1.0,
          "precision": 0.3208
        },
        {
          "recall": 0.9412,
          "precision": 0.3077
        },
        {
          "recall": 0.9412,
          "precision": 0.3137
        },
        {
          "recall": 0.9412,
          "precision": 0.32
        },
        {
          "recall": 0.9412,
          "precision": 0.3265
        },
        {
          "recall": 0.9412,
          "precision": 0.3333
        },
        {
          "recall": 0.8824,
          "precision": 0.3191
        },
        {
          "recall": 0.8824,
          "precision": 0.3261
        },
        {
          "recall": 0.8824,
          "precision": 0.3333
        },
        {
          "recall": 0.8235,
          "precision": 0.3182
        },
        {
          "recall": 0.8235,
          "precision": 0.3256
        },
        {
          "recall": 0.8235,
          "precision": 0.3333
        },
        {
          "recall": 0.8235,
          "precision": 0.3415
        },
        {
          "recall": 0.7647,
          "precision": 0.325
        },
        {
          "recall": 0.7647,
          "precision": 0.3333
        },
        {
          "recall": 0.7647,
          "precision": 0.3421
        },
        {
          "recall": 0.7647,
          "precision": 0.3514
        },
        {
          "recall": 0.7647,
          "precision": 0.3611
        },
        {
          "recall": 0.7647,
          "precision": 0.3714
        },
        {
          "recall": 0.7647,
          "precision": 0.3824
        },
        {
          "recall": 0.7647,
          "precision": 0.3939
        },
        {
          "recall": 0.7647,
          "precision": 0.4062
        },
        {
          "recall": 0.7647,
          "precision": 0.4194
        },
        {
          "recall": 0.7059,
          "precision": 0.4
        },
        {
          "recall": 0.6471,
          "precision": 0.3793
        },
        {
          "recall": 0.5882,
          "precision": 0.3571
        },
        {
          "recall": 0.5882,
          "precision": 0.3704
        },
        {
          "recall": 0.5882,
          "precision": 0.3846
        },
        {
          "recall": 0.4706,
          "precision": 0.3333
        },
        {
          "recall": 0.4706,
          "precision": 0.3478
        },
        {
          "recall": 0.4706,
          "precision": 0.3636
        },
        {
          "recall": 0.4118,
          "precision": 0.3333
        },
        {
          "recall": 0.4118,
          "precision": 0.35
        },
        {
          "recall": 0.4118,
          "precision": 0.3684
        },
        {
          "recall": 0.4118,
          "precision": 0.3889
        },
        {
          "recall": 0.4118,
          "precision": 0.4118
        },
        {
          "recall": 0.4118,
          "precision": 0.4375
        },
        {
          "recall": 0.4118,
          "precision": 0.4667
        },
        {
          "recall": 0.4118,
          "precision": 0.5
        },
        {
          "recall": 0.4118,
          "precision": 0.5385
        },
        {
          "recall": 0.4118,
          "precision": 0.5833
        },
        {
          "recall": 0.4118,
          "precision": 0.6364
        },
        {
          "recall": 0.4118,
          "precision": 0.7
        },
        {
          "recall": 0.3529,
          "precision": 0.6667
        },
        {
          "recall": 0.2941,
          "precision": 0.625
        },
        {
          "recall": 0.2941,
          "precision": 0.7143
        },
        {
          "recall": 0.2353,
          "precision": 0.6667
        },
        {
          "recall": 0.2353,
          "precision": 0.8
        },
        {
          "recall": 0.2353,
          "precision": 1.0
        },
        {
          "recall": 0.1765,
          "precision": 1.0
        },
        {
          "recall": 0.1176,
          "precision": 1.0
        },
        {
          "recall": 0.0588,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 58,
      "fidelity": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 9,
        "top_k_probability_drop": [
          0.0869,
          0.1252,
          0.1477,
          0.1455,
          0.1455
        ],
        "random_k_probability_drop": [
          0.0269,
          0.0516,
          0.0771,
          0.0919,
          0.1027
        ],
        "fidelity_score": 1.859,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 1.9x more than ablating the same number of random features."
      },
      "stability": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.5149,
        "std_neighbour_cosine": 0.4781,
        "mean_random_cosine": 0.0443,
        "stability_gap": 0.4706,
        "pairs_compared": 290,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.51 versus 0.04 for unrelated patients (gap +0.47)."
      },
      "comprehensibility": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "clinical_reference_features": [
          "age",
          "deg-malig",
          "inv-nodes",
          "menopause",
          "node-caps",
          "tumor-size"
        ],
        "top3_clinical_hit_rate": 0.914,
        "shap_lime_top5_overlap": 0.72,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a low likelihood of \u201cRecurrence\u201d (13%). Lowering it: Tumour size (band midpoint) (7 mm), Involved axillary nodes (band midpoint) (1), Histological grade (Grade 2 (moderately differentiated))."
      }
    },
    "xgboost": {
      "dataset": "breast_cancer_recurrence",
      "dataset_title": "Breast Cancer Recurrence (Ljubljana)",
      "model": "xgboost",
      "model_label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 1.0,
        "learning_rate": 0.1,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 1.0,
        "subsample": 1.0
      },
      "cv_roc_auc": 0.6736950549450549,
      "metrics": {
        "accuracy": 0.6896551724137931,
        "precision": 0.4666666666666667,
        "recall": 0.4117647058823529,
        "f1": 0.4375,
        "roc_auc": 0.6657101865136299,
        "average_precision": 0.5214494174100885,
        "majority_baseline": 0.7068965517241379
      },
      "confusion_matrix": {
        "true_negative": 33,
        "false_positive": 8,
        "false_negative": 10,
        "true_positive": 7
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.2931,
        "mean_predicted_probability": 0.3353,
        "inflation_ratio": 1.14,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0,
          "tpr": 0.0588
        },
        {
          "fpr": 0.0,
          "tpr": 0.1765
        },
        {
          "fpr": 0.0732,
          "tpr": 0.1765
        },
        {
          "fpr": 0.0732,
          "tpr": 0.2353
        },
        {
          "fpr": 0.1463,
          "tpr": 0.2353
        },
        {
          "fpr": 0.1463,
          "tpr": 0.3529
        },
        {
          "fpr": 0.1707,
          "tpr": 0.3529
        },
        {
          "fpr": 0.1707,
          "tpr": 0.4118
        },
        {
          "fpr": 0.3171,
          "tpr": 0.4118
        },
        {
          "fpr": 0.3171,
          "tpr": 0.5294
        },
        {
          "fpr": 0.3171,
          "tpr": 0.5882
        },
        {
          "fpr": 0.4146,
          "tpr": 0.5882
        },
        {
          "fpr": 0.4146,
          "tpr": 0.6471
        },
        {
          "fpr": 0.4878,
          "tpr": 0.6471
        },
        {
          "fpr": 0.4878,
          "tpr": 0.7059
        },
        {
          "fpr": 0.5122,
          "tpr": 0.7059
        },
        {
          "fpr": 0.5122,
          "tpr": 0.8235
        },
        {
          "fpr": 0.561,
          "tpr": 0.8235
        },
        {
          "fpr": 0.561,
          "tpr": 0.8824
        },
        {
          "fpr": 0.8293,
          "tpr": 0.8824
        },
        {
          "fpr": 0.8293,
          "tpr": 0.9412
        },
        {
          "fpr": 0.878,
          "tpr": 0.9412
        },
        {
          "fpr": 0.878,
          "tpr": 1.0
        },
        {
          "fpr": 0.9268,
          "tpr": 1.0
        },
        {
          "fpr": 0.9756,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.2931
        },
        {
          "recall": 1.0,
          "precision": 0.2982
        },
        {
          "recall": 1.0,
          "precision": 0.3091
        },
        {
          "recall": 1.0,
          "precision": 0.3148
        },
        {
          "recall": 1.0,
          "precision": 0.3208
        },
        {
          "recall": 0.9412,
          "precision": 0.3077
        },
        {
          "recall": 0.9412,
          "precision": 0.3137
        },
        {
          "recall": 0.9412,
          "precision": 0.32
        },
        {
          "recall": 0.8824,
          "precision": 0.3061
        },
        {
          "recall": 0.8824,
          "precision": 0.3125
        },
        {
          "recall": 0.8824,
          "precision": 0.3191
        },
        {
          "recall": 0.8824,
          "precision": 0.3261
        },
        {
          "recall": 0.8824,
          "precision": 0.3333
        },
        {
          "recall": 0.8824,
          "precision": 0.3409
        },
        {
          "recall": 0.8824,
          "precision": 0.3488
        },
        {
          "recall": 0.8824,
          "precision": 0.3571
        },
        {
          "recall": 0.8824,
          "precision": 0.3659
        },
        {
          "recall": 0.8824,
          "precision": 0.375
        },
        {
          "recall": 0.8824,
          "precision": 0.3846
        },
        {
          "recall": 0.8824,
          "precision": 0.3947
        },
        {
          "recall": 0.8235,
          "precision": 0.3784
        },
        {
          "recall": 0.8235,
          "precision": 0.3889
        },
        {
          "recall": 0.8235,
          "precision": 0.4
        },
        {
          "recall": 0.7647,
          "precision": 0.3824
        },
        {
          "recall": 0.7059,
          "precision": 0.3636
        },
        {
          "recall": 0.7059,
          "precision": 0.375
        },
        {
          "recall": 0.6471,
          "precision": 0.3548
        },
        {
          "recall": 0.6471,
          "precision": 0.3667
        },
        {
          "recall": 0.6471,
          "precision": 0.3793
        },
        {
          "recall": 0.6471,
          "precision": 0.3929
        },
        {
          "recall": 0.5882,
          "precision": 0.3704
        },
        {
          "recall": 0.5882,
          "precision": 0.3846
        },
        {
          "recall": 0.5882,
          "precision": 0.4
        },
        {
          "recall": 0.5882,
          "precision": 0.4167
        },
        {
          "recall": 0.5882,
          "precision": 0.4348
        },
        {
          "recall": 0.5294,
          "precision": 0.4091
        },
        {
          "recall": 0.4118,
          "precision": 0.35
        },
        {
          "recall": 0.4118,
          "precision": 0.3684
        },
        {
          "recall": 0.4118,
          "precision": 0.3889
        },
        {
          "recall": 0.4118,
          "precision": 0.4118
        },
        {
          "recall": 0.4118,
          "precision": 0.4375
        },
        {
          "recall": 0.4118,
          "precision": 0.4667
        },
        {
          "recall": 0.4118,
          "precision": 0.5
        },
        {
          "recall": 0.3529,
          "precision": 0.4615
        },
        {
          "recall": 0.3529,
          "precision": 0.5
        },
        {
          "recall": 0.2941,
          "precision": 0.4545
        },
        {
          "recall": 0.2353,
          "precision": 0.4
        },
        {
          "recall": 0.2353,
          "precision": 0.4444
        },
        {
          "recall": 0.2353,
          "precision": 0.5
        },
        {
          "recall": 0.2353,
          "precision": 0.5714
        },
        {
          "recall": 0.1765,
          "precision": 0.5
        },
        {
          "recall": 0.1765,
          "precision": 0.6
        },
        {
          "recall": 0.1765,
          "precision": 0.75
        },
        {
          "recall": 0.1765,
          "precision": 1.0
        },
        {
          "recall": 0.1176,
          "precision": 1.0
        },
        {
          "recall": 0.0588,
          "precision": 1.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 58
    }
  },
  "breast_cancer_survival": {
    "logistic_regression": {
      "dataset": "breast_cancer_survival",
      "dataset_title": "Breast Cancer Surgical Survival (Haberman)",
      "model": "logistic_regression",
      "model_label": "Logistic Regression",
      "is_best": false,
      "best_params": {
        "C": 0.1,
        "class_weight": null,
        "penalty": "l1",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.7382112332112332,
      "metrics": {
        "accuracy": 0.7096774193548387,
        "precision": 0.25,
        "recall": 0.0625,
        "f1": 0.1,
        "roc_auc": 0.5563858695652174,
        "average_precision": 0.2982796776583604,
        "majority_baseline": 0.7419354838709677
      },
      "confusion_matrix": {
        "true_negative": 43,
        "false_positive": 3,
        "false_negative": 15,
        "true_positive": 1
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.2581,
        "mean_predicted_probability": 0.294,
        "inflation_ratio": 1.14,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0217,
          "tpr": 0.0
        },
        {
          "fpr": 0.0217,
          "tpr": 0.0625
        },
        {
          "fpr": 0.1304,
          "tpr": 0.0625
        },
        {
          "fpr": 0.1522,
          "tpr": 0.125
        },
        {
          "fpr": 0.1957,
          "tpr": 0.125
        },
        {
          "fpr": 0.1957,
          "tpr": 0.25
        },
        {
          "fpr": 0.2826,
          "tpr": 0.375
        },
        {
          "fpr": 0.3478,
          "tpr": 0.5
        },
        {
          "fpr": 0.5217,
          "tpr": 0.625
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.2581
        },
        {
          "recall": 0.625,
          "precision": 0.2941
        },
        {
          "recall": 0.5,
          "precision": 0.3333
        },
        {
          "recall": 0.375,
          "precision": 0.3158
        },
        {
          "recall": 0.25,
          "precision": 0.3077
        },
        {
          "recall": 0.125,
          "precision": 0.1818
        },
        {
          "recall": 0.125,
          "precision": 0.2
        },
        {
          "recall": 0.125,
          "precision": 0.2222
        },
        {
          "recall": 0.0625,
          "precision": 0.1429
        },
        {
          "recall": 0.0625,
          "precision": 0.1667
        },
        {
          "recall": 0.0625,
          "precision": 0.2
        },
        {
          "recall": 0.0625,
          "precision": 0.25
        },
        {
          "recall": 0.0625,
          "precision": 0.3333
        },
        {
          "recall": 0.0625,
          "precision": 0.5
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 62
    },
    "random_forest": {
      "dataset": "breast_cancer_survival",
      "dataset_title": "Breast Cancer Surgical Survival (Haberman)",
      "model": "random_forest",
      "model_label": "Random Forest",
      "is_best": true,
      "best_params": {
        "class_weight": "balanced",
        "max_depth": 4,
        "max_features": "sqrt",
        "min_samples_leaf": 3,
        "n_estimators": 300
      },
      "cv_roc_auc": 0.7428388278388279,
      "metrics": {
        "accuracy": 0.6129032258064516,
        "precision": 0.21428571428571427,
        "recall": 0.1875,
        "f1": 0.2,
        "roc_auc": 0.594429347826087,
        "average_precision": 0.3153713413083017,
        "majority_baseline": 0.7419354838709677
      },
      "confusion_matrix": {
        "true_negative": 35,
        "false_positive": 11,
        "false_negative": 13,
        "true_positive": 3
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.2581,
        "mean_predicted_probability": 0.3915,
        "inflation_ratio": 1.52,
        "calibrated": false,
        "note": "Probabilities are inflated roughly 1.5x relative to the cohort prevalence of 25.8%, because class weighting was tuned in. Read the number as a relative risk score for ranking patients, not as this patient's absolute probability."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0217,
          "tpr": 0.0
        },
        {
          "fpr": 0.0217,
          "tpr": 0.0625
        },
        {
          "fpr": 0.1739,
          "tpr": 0.0625
        },
        {
          "fpr": 0.1739,
          "tpr": 0.125
        },
        {
          "fpr": 0.2174,
          "tpr": 0.125
        },
        {
          "fpr": 0.2391,
          "tpr": 0.1875
        },
        {
          "fpr": 0.2609,
          "tpr": 0.1875
        },
        {
          "fpr": 0.2609,
          "tpr": 0.25
        },
        {
          "fpr": 0.3043,
          "tpr": 0.25
        },
        {
          "fpr": 0.3043,
          "tpr": 0.4375
        },
        {
          "fpr": 0.3261,
          "tpr": 0.4375
        },
        {
          "fpr": 0.3261,
          "tpr": 0.5625
        },
        {
          "fpr": 0.4348,
          "tpr": 0.5625
        },
        {
          "fpr": 0.4348,
          "tpr": 0.625
        },
        {
          "fpr": 0.4565,
          "tpr": 0.625
        },
        {
          "fpr": 0.4565,
          "tpr": 0.6875
        },
        {
          "fpr": 0.5652,
          "tpr": 0.6875
        },
        {
          "fpr": 0.5652,
          "tpr": 0.75
        },
        {
          "fpr": 0.587,
          "tpr": 0.75
        },
        {
          "fpr": 0.587,
          "tpr": 0.8125
        },
        {
          "fpr": 0.6087,
          "tpr": 0.8125
        },
        {
          "fpr": 0.6087,
          "tpr": 0.9375
        },
        {
          "fpr": 0.9783,
          "tpr": 0.9375
        },
        {
          "fpr": 0.9783,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.2581
        },
        {
          "recall": 1.0,
          "precision": 0.2623
        },
        {
          "recall": 0.9375,
          "precision": 0.25
        },
        {
          "recall": 0.9375,
          "precision": 0.2542
        },
        {
          "recall": 0.9375,
          "precision": 0.2586
        },
        {
          "recall": 0.9375,
          "precision": 0.2632
        },
        {
          "recall": 0.9375,
          "precision": 0.2679
        },
        {
          "recall": 0.9375,
          "precision": 0.2727
        },
        {
          "recall": 0.9375,
          "precision": 0.2778
        },
        {
          "recall": 0.9375,
          "precision": 0.283
        },
        {
          "recall": 0.9375,
          "precision": 0.2885
        },
        {
          "recall": 0.9375,
          "precision": 0.2941
        },
        {
          "recall": 0.9375,
          "precision": 0.3
        },
        {
          "recall": 0.9375,
          "precision": 0.3061
        },
        {
          "recall": 0.9375,
          "precision": 0.3125
        },
        {
          "recall": 0.9375,
          "precision": 0.3191
        },
        {
          "recall": 0.9375,
          "precision": 0.3261
        },
        {
          "recall": 0.9375,
          "precision": 0.3333
        },
        {
          "recall": 0.9375,
          "precision": 0.3409
        },
        {
          "recall": 0.9375,
          "precision": 0.3488
        },
        {
          "recall": 0.875,
          "precision": 0.3333
        },
        {
          "recall": 0.8125,
          "precision": 0.3171
        },
        {
          "recall": 0.8125,
          "precision": 0.325
        },
        {
          "recall": 0.75,
          "precision": 0.3077
        },
        {
          "recall": 0.75,
          "precision": 0.3158
        },
        {
          "recall": 0.6875,
          "precision": 0.2973
        },
        {
          "recall": 0.6875,
          "precision": 0.3056
        },
        {
          "recall": 0.6875,
          "precision": 0.3143
        },
        {
          "recall": 0.6875,
          "precision": 0.3235
        },
        {
          "recall": 0.6875,
          "precision": 0.3333
        },
        {
          "recall": 0.6875,
          "precision": 0.3438
        },
        {
          "recall": 0.625,
          "precision": 0.3226
        },
        {
          "recall": 0.625,
          "precision": 0.3333
        },
        {
          "recall": 0.5625,
          "precision": 0.3103
        },
        {
          "recall": 0.5625,
          "precision": 0.3214
        },
        {
          "recall": 0.5625,
          "precision": 0.3333
        },
        {
          "recall": 0.5625,
          "precision": 0.3462
        },
        {
          "recall": 0.5625,
          "precision": 0.36
        },
        {
          "recall": 0.5625,
          "precision": 0.375
        },
        {
          "recall": 0.5,
          "precision": 0.3478
        },
        {
          "recall": 0.4375,
          "precision": 0.3182
        },
        {
          "recall": 0.4375,
          "precision": 0.3333
        },
        {
          "recall": 0.375,
          "precision": 0.3
        },
        {
          "recall": 0.3125,
          "precision": 0.2632
        },
        {
          "recall": 0.25,
          "precision": 0.2222
        },
        {
          "recall": 0.25,
          "precision": 0.2353
        },
        {
          "recall": 0.25,
          "precision": 0.25
        },
        {
          "recall": 0.1875,
          "precision": 0.2
        },
        {
          "recall": 0.1875,
          "precision": 0.2143
        },
        {
          "recall": 0.125,
          "precision": 0.1667
        },
        {
          "recall": 0.125,
          "precision": 0.1818
        },
        {
          "recall": 0.125,
          "precision": 0.2
        },
        {
          "recall": 0.0625,
          "precision": 0.1111
        },
        {
          "recall": 0.0625,
          "precision": 0.125
        },
        {
          "recall": 0.0625,
          "precision": 0.1429
        },
        {
          "recall": 0.0625,
          "precision": 0.1667
        },
        {
          "recall": 0.0625,
          "precision": 0.2
        },
        {
          "recall": 0.0625,
          "precision": 0.25
        },
        {
          "recall": 0.0625,
          "precision": 0.3333
        },
        {
          "recall": 0.0625,
          "precision": 0.5
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 62,
      "fidelity": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_values": [
          1,
          2,
          3
        ],
        "n_features": 3,
        "top_k_probability_drop": [
          0.1474,
          0.1609,
          0.1632
        ],
        "random_k_probability_drop": [
          0.077,
          0.1267,
          0.1632
        ],
        "fidelity_score": 1.285,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 1.3x more than ablating the same number of random features."
      },
      "stability": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.7075,
        "std_neighbour_cosine": 0.4801,
        "mean_random_cosine": 0.2922,
        "stability_gap": 0.4153,
        "pairs_compared": 310,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.71 versus 0.29 for unrelated patients (gap +0.42)."
      },
      "comprehensibility": {
        "model": "random_forest",
        "model_label": "Random Forest",
        "clinical_reference_features": [
          "age",
          "positive_auxillary_nodes"
        ],
        "top3_clinical_hit_rate": 0.667,
        "shap_lime_top5_overlap": 0.6,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a low likelihood of \u201cDied within five years\u201d (26%). Lowering it: Positive axillary nodes (0), Year of operation (68 19xx), Age at operation (61 years)."
      }
    },
    "xgboost": {
      "dataset": "breast_cancer_survival",
      "dataset_title": "Breast Cancer Surgical Survival (Haberman)",
      "model": "xgboost",
      "model_label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 1.0,
        "learning_rate": 0.03,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 2.754,
        "subsample": 1.0
      },
      "cv_roc_auc": 0.7374175824175825,
      "metrics": {
        "accuracy": 0.5645161290322581,
        "precision": 0.17647058823529413,
        "recall": 0.1875,
        "f1": 0.18181818181818182,
        "roc_auc": 0.5652173913043478,
        "average_precision": 0.2911842286644686,
        "majority_baseline": 0.7419354838709677
      },
      "confusion_matrix": {
        "true_negative": 32,
        "false_positive": 14,
        "false_negative": 13,
        "true_positive": 3
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.2581,
        "mean_predicted_probability": 0.3911,
        "inflation_ratio": 1.52,
        "calibrated": false,
        "note": "Probabilities are inflated roughly 1.5x relative to the cohort prevalence of 25.8%, because class weighting was tuned in. Read the number as a relative risk score for ranking patients, not as this patient's absolute probability."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0217,
          "tpr": 0.0
        },
        {
          "fpr": 0.0652,
          "tpr": 0.0
        },
        {
          "fpr": 0.0652,
          "tpr": 0.0625
        },
        {
          "fpr": 0.1739,
          "tpr": 0.0625
        },
        {
          "fpr": 0.1957,
          "tpr": 0.125
        },
        {
          "fpr": 0.1957,
          "tpr": 0.1875
        },
        {
          "fpr": 0.2609,
          "tpr": 0.1875
        },
        {
          "fpr": 0.3043,
          "tpr": 0.1875
        },
        {
          "fpr": 0.3043,
          "tpr": 0.4375
        },
        {
          "fpr": 0.3261,
          "tpr": 0.4375
        },
        {
          "fpr": 0.3261,
          "tpr": 0.5
        },
        {
          "fpr": 0.3696,
          "tpr": 0.5
        },
        {
          "fpr": 0.3696,
          "tpr": 0.5625
        },
        {
          "fpr": 0.413,
          "tpr": 0.5625
        },
        {
          "fpr": 0.4348,
          "tpr": 0.625
        },
        {
          "fpr": 0.5,
          "tpr": 0.625
        },
        {
          "fpr": 0.5217,
          "tpr": 0.6875
        },
        {
          "fpr": 0.5652,
          "tpr": 0.6875
        },
        {
          "fpr": 0.6087,
          "tpr": 0.6875
        },
        {
          "fpr": 0.6304,
          "tpr": 0.875
        },
        {
          "fpr": 0.7391,
          "tpr": 0.875
        },
        {
          "fpr": 0.8043,
          "tpr": 0.875
        },
        {
          "fpr": 0.8478,
          "tpr": 0.9375
        },
        {
          "fpr": 0.8696,
          "tpr": 0.9375
        },
        {
          "fpr": 0.913,
          "tpr": 0.9375
        },
        {
          "fpr": 0.9783,
          "tpr": 0.9375
        },
        {
          "fpr": 0.9783,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.2581
        },
        {
          "recall": 1.0,
          "precision": 0.2623
        },
        {
          "recall": 0.9375,
          "precision": 0.25
        },
        {
          "recall": 0.9375,
          "precision": 0.2542
        },
        {
          "recall": 0.9375,
          "precision": 0.2586
        },
        {
          "recall": 0.9375,
          "precision": 0.2632
        },
        {
          "recall": 0.9375,
          "precision": 0.2727
        },
        {
          "recall": 0.9375,
          "precision": 0.2778
        },
        {
          "recall": 0.875,
          "precision": 0.2745
        },
        {
          "recall": 0.875,
          "precision": 0.2917
        },
        {
          "recall": 0.875,
          "precision": 0.2979
        },
        {
          "recall": 0.875,
          "precision": 0.3043
        },
        {
          "recall": 0.875,
          "precision": 0.3111
        },
        {
          "recall": 0.875,
          "precision": 0.3182
        },
        {
          "recall": 0.875,
          "precision": 0.3256
        },
        {
          "recall": 0.6875,
          "precision": 0.2821
        },
        {
          "recall": 0.6875,
          "precision": 0.2895
        },
        {
          "recall": 0.6875,
          "precision": 0.2973
        },
        {
          "recall": 0.6875,
          "precision": 0.3143
        },
        {
          "recall": 0.625,
          "precision": 0.303
        },
        {
          "recall": 0.625,
          "precision": 0.3125
        },
        {
          "recall": 0.625,
          "precision": 0.3226
        },
        {
          "recall": 0.625,
          "precision": 0.3333
        },
        {
          "recall": 0.5625,
          "precision": 0.3214
        },
        {
          "recall": 0.5625,
          "precision": 0.3333
        },
        {
          "recall": 0.5625,
          "precision": 0.3462
        },
        {
          "recall": 0.5,
          "precision": 0.32
        },
        {
          "recall": 0.5,
          "precision": 0.3333
        },
        {
          "recall": 0.5,
          "precision": 0.3478
        },
        {
          "recall": 0.4375,
          "precision": 0.3182
        },
        {
          "recall": 0.4375,
          "precision": 0.3333
        },
        {
          "recall": 0.375,
          "precision": 0.3
        },
        {
          "recall": 0.3125,
          "precision": 0.2632
        },
        {
          "recall": 0.25,
          "precision": 0.2222
        },
        {
          "recall": 0.1875,
          "precision": 0.1765
        },
        {
          "recall": 0.1875,
          "precision": 0.2
        },
        {
          "recall": 0.1875,
          "precision": 0.2143
        },
        {
          "recall": 0.1875,
          "precision": 0.2308
        },
        {
          "recall": 0.1875,
          "precision": 0.25
        },
        {
          "recall": 0.125,
          "precision": 0.1818
        },
        {
          "recall": 0.0625,
          "precision": 0.1111
        },
        {
          "recall": 0.0625,
          "precision": 0.125
        },
        {
          "recall": 0.0625,
          "precision": 0.1429
        },
        {
          "recall": 0.0625,
          "precision": 0.1667
        },
        {
          "recall": 0.0625,
          "precision": 0.2
        },
        {
          "recall": 0.0625,
          "precision": 0.25
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 62
    }
  },
  "cervical_cancer": {
    "logistic_regression": {
      "dataset": "cervical_cancer",
      "dataset_title": "Cervical Cancer (Risk Factors)",
      "model": "logistic_regression",
      "model_label": "Logistic Regression",
      "is_best": true,
      "best_params": {
        "C": 0.01,
        "class_weight": "balanced",
        "penalty": "l2",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.6818300495262705,
      "metrics": {
        "accuracy": 0.7732558139534884,
        "precision": 0.08823529411764706,
        "recall": 0.2727272727272727,
        "f1": 0.13333333333333333,
        "roc_auc": 0.6307171089779786,
        "average_precision": 0.10003325343770988,
        "majority_baseline": 0.936046511627907
      },
      "confusion_matrix": {
        "true_negative": 130,
        "false_positive": 31,
        "false_negative": 8,
        "true_positive": 3
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.064,
        "mean_predicted_probability": 0.4426,
        "inflation_ratio": 6.92,
        "calibrated": false,
        "note": "Probabilities are inflated roughly 6.9x relative to the cohort prevalence of 6.4%, because class weighting was tuned in. Read the number as a relative risk score for ranking patients, not as this patient's absolute probability."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0062,
          "tpr": 0.0
        },
        {
          "fpr": 0.0621,
          "tpr": 0.0
        },
        {
          "fpr": 0.0621,
          "tpr": 0.0909
        },
        {
          "fpr": 0.1056,
          "tpr": 0.0909
        },
        {
          "fpr": 0.1056,
          "tpr": 0.2727
        },
        {
          "fpr": 0.2174,
          "tpr": 0.2727
        },
        {
          "fpr": 0.2174,
          "tpr": 0.3636
        },
        {
          "fpr": 0.3043,
          "tpr": 0.3636
        },
        {
          "fpr": 0.3043,
          "tpr": 0.4545
        },
        {
          "fpr": 0.3292,
          "tpr": 0.4545
        },
        {
          "fpr": 0.3292,
          "tpr": 0.6364
        },
        {
          "fpr": 0.4224,
          "tpr": 0.6364
        },
        {
          "fpr": 0.4224,
          "tpr": 0.7273
        },
        {
          "fpr": 0.6832,
          "tpr": 0.7273
        },
        {
          "fpr": 0.6832,
          "tpr": 0.8182
        },
        {
          "fpr": 0.7081,
          "tpr": 0.8182
        },
        {
          "fpr": 0.7081,
          "tpr": 0.9091
        },
        {
          "fpr": 0.795,
          "tpr": 0.9091
        },
        {
          "fpr": 0.795,
          "tpr": 1.0
        },
        {
          "fpr": 0.8323,
          "tpr": 1.0
        },
        {
          "fpr": 0.8447,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.064
        },
        {
          "recall": 1.0,
          "precision": 0.0643
        },
        {
          "recall": 1.0,
          "precision": 0.0647
        },
        {
          "recall": 1.0,
          "precision": 0.0651
        },
        {
          "recall": 1.0,
          "precision": 0.0655
        },
        {
          "recall": 1.0,
          "precision": 0.0659
        },
        {
          "recall": 1.0,
          "precision": 0.0663
        },
        {
          "recall": 1.0,
          "precision": 0.0667
        },
        {
          "recall": 1.0,
          "precision": 0.0671
        },
        {
          "recall": 1.0,
          "precision": 0.0675
        },
        {
          "recall": 1.0,
          "precision": 0.0679
        },
        {
          "recall": 1.0,
          "precision": 0.0683
        },
        {
          "recall": 1.0,
          "precision": 0.0688
        },
        {
          "recall": 1.0,
          "precision": 0.0692
        },
        {
          "recall": 1.0,
          "precision": 0.0696
        },
        {
          "recall": 1.0,
          "precision": 0.0701
        },
        {
          "recall": 1.0,
          "precision": 0.0705
        },
        {
          "recall": 1.0,
          "precision": 0.071
        },
        {
          "recall": 1.0,
          "precision": 0.0714
        },
        {
          "recall": 1.0,
          "precision": 0.0719
        },
        {
          "recall": 1.0,
          "precision": 0.0724
        },
        {
          "recall": 1.0,
          "precision": 0.0728
        },
        {
          "recall": 1.0,
          "precision": 0.0733
        },
        {
          "recall": 1.0,
          "precision": 0.0738
        },
        {
          "recall": 1.0,
          "precision": 0.0743
        },
        {
          "recall": 1.0,
          "precision": 0.0748
        },
        {
          "recall": 1.0,
          "precision": 0.0759
        },
        {
          "recall": 1.0,
          "precision": 0.0764
        },
        {
          "recall": 1.0,
          "precision": 0.0769
        },
        {
          "recall": 1.0,
          "precision": 0.0775
        },
        {
          "recall": 1.0,
          "precision": 0.078
        },
        {
          "recall": 1.0,
          "precision": 0.0786
        },
        {
          "recall": 1.0,
          "precision": 0.0791
        },
        {
          "recall": 0.9091,
          "precision": 0.0725
        },
        {
          "recall": 0.9091,
          "precision": 0.073
        },
        {
          "recall": 0.9091,
          "precision": 0.0735
        },
        {
          "recall": 0.9091,
          "precision": 0.0741
        },
        {
          "recall": 0.9091,
          "precision": 0.0746
        },
        {
          "recall": 0.9091,
          "precision": 0.0752
        },
        {
          "recall": 0.9091,
          "precision": 0.0758
        },
        {
          "recall": 0.9091,
          "precision": 0.0763
        },
        {
          "recall": 0.9091,
          "precision": 0.0769
        },
        {
          "recall": 0.9091,
          "precision": 0.0775
        },
        {
          "recall": 0.9091,
          "precision": 0.0781
        },
        {
          "recall": 0.9091,
          "precision": 0.0787
        },
        {
          "recall": 0.9091,
          "precision": 0.0794
        },
        {
          "recall": 0.9091,
          "precision": 0.08
        },
        {
          "recall": 0.9091,
          "precision": 0.0806
        },
        {
          "recall": 0.8182,
          "precision": 0.0732
        },
        {
          "recall": 0.8182,
          "precision": 0.0738
        },
        {
          "recall": 0.8182,
          "precision": 0.0744
        },
        {
          "recall": 0.8182,
          "precision": 0.075
        },
        {
          "recall": 0.8182,
          "precision": 0.0756
        },
        {
          "recall": 0.7273,
          "precision": 0.0678
        },
        {
          "recall": 0.7273,
          "precision": 0.0684
        },
        {
          "recall": 0.7273,
          "precision": 0.069
        },
        {
          "recall": 0.7273,
          "precision": 0.0696
        },
        {
          "recall": 0.7273,
          "precision": 0.0702
        },
        {
          "recall": 0.7273,
          "precision": 0.0708
        },
        {
          "recall": 0.7273,
          "precision": 0.0714
        },
        {
          "recall": 0.7273,
          "precision": 0.0721
        },
        {
          "recall": 0.7273,
          "precision": 0.0727
        },
        {
          "recall": 0.7273,
          "precision": 0.0734
        },
        {
          "recall": 0.7273,
          "precision": 0.0741
        },
        {
          "recall": 0.7273,
          "precision": 0.0748
        },
        {
          "recall": 0.7273,
          "precision": 0.0755
        },
        {
          "recall": 0.7273,
          "precision": 0.0762
        },
        {
          "recall": 0.7273,
          "precision": 0.0769
        },
        {
          "recall": 0.7273,
          "precision": 0.0777
        },
        {
          "recall": 0.7273,
          "precision": 0.0784
        },
        {
          "recall": 0.7273,
          "precision": 0.0792
        },
        {
          "recall": 0.7273,
          "precision": 0.08
        },
        {
          "recall": 0.7273,
          "precision": 0.0808
        },
        {
          "recall": 0.7273,
          "precision": 0.0816
        },
        {
          "recall": 0.7273,
          "precision": 0.0825
        },
        {
          "recall": 0.7273,
          "precision": 0.0833
        },
        {
          "recall": 0.7273,
          "precision": 0.0842
        },
        {
          "recall": 0.7273,
          "precision": 0.0851
        },
        {
          "recall": 0.7273,
          "precision": 0.086
        },
        {
          "recall": 0.7273,
          "precision": 0.087
        },
        {
          "recall": 0.7273,
          "precision": 0.0879
        },
        {
          "recall": 0.7273,
          "precision": 0.0889
        },
        {
          "recall": 0.7273,
          "precision": 0.0899
        },
        {
          "recall": 0.7273,
          "precision": 0.0909
        },
        {
          "recall": 0.7273,
          "precision": 0.092
        },
        {
          "recall": 0.7273,
          "precision": 0.093
        },
        {
          "recall": 0.7273,
          "precision": 0.0941
        },
        {
          "recall": 0.7273,
          "precision": 0.0952
        },
        {
          "recall": 0.7273,
          "precision": 0.0964
        },
        {
          "recall": 0.7273,
          "precision": 0.0976
        },
        {
          "recall": 0.7273,
          "precision": 0.0988
        },
        {
          "recall": 0.7273,
          "precision": 0.1
        },
        {
          "recall": 0.7273,
          "precision": 0.1013
        },
        {
          "recall": 0.7273,
          "precision": 0.1026
        },
        {
          "recall": 0.7273,
          "precision": 0.1039
        },
        {
          "recall": 0.7273,
          "precision": 0.1053
        },
        {
          "recall": 0.6364,
          "precision": 0.0933
        },
        {
          "recall": 0.6364,
          "precision": 0.0946
        },
        {
          "recall": 0.6364,
          "precision": 0.0959
        },
        {
          "recall": 0.6364,
          "precision": 0.0972
        },
        {
          "recall": 0.6364,
          "precision": 0.0986
        },
        {
          "recall": 0.6364,
          "precision": 0.1
        },
        {
          "recall": 0.6364,
          "precision": 0.1014
        },
        {
          "recall": 0.6364,
          "precision": 0.1029
        },
        {
          "recall": 0.6364,
          "precision": 0.1045
        },
        {
          "recall": 0.6364,
          "precision": 0.1061
        },
        {
          "recall": 0.6364,
          "precision": 0.1077
        },
        {
          "recall": 0.6364,
          "precision": 0.1094
        },
        {
          "recall": 0.6364,
          "precision": 0.1111
        },
        {
          "recall": 0.6364,
          "precision": 0.1129
        },
        {
          "recall": 0.6364,
          "precision": 0.1148
        },
        {
          "recall": 0.6364,
          "precision": 0.1167
        },
        {
          "recall": 0.5455,
          "precision": 0.1017
        },
        {
          "recall": 0.4545,
          "precision": 0.0862
        },
        {
          "recall": 0.4545,
          "precision": 0.0877
        },
        {
          "recall": 0.4545,
          "precision": 0.0893
        },
        {
          "recall": 0.4545,
          "precision": 0.0909
        },
        {
          "recall": 0.4545,
          "precision": 0.0926
        },
        {
          "recall": 0.3636,
          "precision": 0.0755
        },
        {
          "recall": 0.3636,
          "precision": 0.0769
        },
        {
          "recall": 0.3636,
          "precision": 0.0784
        },
        {
          "recall": 0.3636,
          "precision": 0.08
        },
        {
          "recall": 0.3636,
          "precision": 0.0816
        },
        {
          "recall": 0.3636,
          "precision": 0.0833
        },
        {
          "recall": 0.3636,
          "precision": 0.0851
        },
        {
          "recall": 0.3636,
          "precision": 0.087
        },
        {
          "recall": 0.3636,
          "precision": 0.0889
        },
        {
          "recall": 0.3636,
          "precision": 0.0909
        },
        {
          "recall": 0.3636,
          "precision": 0.093
        },
        {
          "recall": 0.3636,
          "precision": 0.0952
        },
        {
          "recall": 0.3636,
          "precision": 0.0976
        },
        {
          "recall": 0.3636,
          "precision": 0.1
        },
        {
          "recall": 0.3636,
          "precision": 0.1026
        },
        {
          "recall": 0.2727,
          "precision": 0.0789
        },
        {
          "recall": 0.2727,
          "precision": 0.0811
        },
        {
          "recall": 0.2727,
          "precision": 0.0833
        },
        {
          "recall": 0.2727,
          "precision": 0.0857
        },
        {
          "recall": 0.2727,
          "precision": 0.0882
        },
        {
          "recall": 0.2727,
          "precision": 0.0909
        },
        {
          "recall": 0.2727,
          "precision": 0.0938
        },
        {
          "recall": 0.2727,
          "precision": 0.0968
        },
        {
          "recall": 0.2727,
          "precision": 0.1
        },
        {
          "recall": 0.2727,
          "precision": 0.1034
        },
        {
          "recall": 0.2727,
          "precision": 0.1071
        },
        {
          "recall": 0.2727,
          "precision": 0.1111
        },
        {
          "recall": 0.2727,
          "precision": 0.1154
        },
        {
          "recall": 0.2727,
          "precision": 0.12
        },
        {
          "recall": 0.2727,
          "precision": 0.125
        },
        {
          "recall": 0.2727,
          "precision": 0.1304
        },
        {
          "recall": 0.2727,
          "precision": 0.1364
        },
        {
          "recall": 0.2727,
          "precision": 0.1429
        },
        {
          "recall": 0.2727,
          "precision": 0.15
        },
        {
          "recall": 0.1818,
          "precision": 0.1053
        },
        {
          "recall": 0.0909,
          "precision": 0.0556
        },
        {
          "recall": 0.0909,
          "precision": 0.0588
        },
        {
          "recall": 0.0909,
          "precision": 0.0625
        },
        {
          "recall": 0.0909,
          "precision": 0.0667
        },
        {
          "recall": 0.0909,
          "precision": 0.0714
        },
        {
          "recall": 0.0909,
          "precision": 0.0769
        },
        {
          "recall": 0.0909,
          "precision": 0.0833
        },
        {
          "recall": 0.0909,
          "precision": 0.0909
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 172,
      "fidelity": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 28,
        "top_k_probability_drop": [
          0.0445,
          0.0587,
          0.0658,
          0.0691,
          0.0708
        ],
        "random_k_probability_drop": [
          0.0051,
          0.0106,
          0.0139,
          0.0174,
          0.0228
        ],
        "fidelity_score": 4.43,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 4.4x more than ablating the same number of random features."
      },
      "stability": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.8127,
        "std_neighbour_cosine": 0.2302,
        "mean_random_cosine": 0.0767,
        "stability_gap": 0.736,
        "pairs_compared": 860,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.81 versus 0.08 for unrelated patients (gap +0.74)."
      },
      "comprehensibility": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "clinical_reference_features": [
          "Age",
          "Dx",
          "Dx:CIN",
          "Dx:Cancer",
          "Dx:HPV",
          "First sexual intercourse",
          "Hormonal Contraceptives (years)",
          "Num of pregnancies",
          "Number of sexual partners",
          "STDs",
          "STDs:HPV",
          "Smokes",
          "Smokes (packs/year)",
          "Smokes (years)"
        ],
        "top3_clinical_hit_rate": 0.738,
        "shap_lime_top5_overlap": 0.048,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a moderate likelihood of \u201cBiopsy-confirmed cervical cancer\u201d (39%). Raising the estimate: Age at first intercourse (15 years). Lowering it: Age (17 years), Intrauterine device (No)."
      }
    },
    "random_forest": {
      "dataset": "cervical_cancer",
      "dataset_title": "Cervical Cancer (Risk Factors)",
      "model": "random_forest",
      "model_label": "Random Forest",
      "is_best": false,
      "best_params": {
        "class_weight": null,
        "max_depth": 4,
        "max_features": 0.5,
        "min_samples_leaf": 1,
        "n_estimators": 300
      },
      "cv_roc_auc": 0.7055326765719206,
      "metrics": {
        "accuracy": 0.936046511627907,
        "precision": 0.0,
        "recall": 0.0,
        "f1": 0.0,
        "roc_auc": 0.6245059288537549,
        "average_precision": 0.1066674855990298,
        "majority_baseline": 0.936046511627907
      },
      "confusion_matrix": {
        "true_negative": 161,
        "false_positive": 0,
        "false_negative": 11,
        "true_positive": 0
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.064,
        "mean_predicted_probability": 0.0595,
        "inflation_ratio": 0.93,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0062,
          "tpr": 0.0
        },
        {
          "fpr": 0.0932,
          "tpr": 0.0
        },
        {
          "fpr": 0.0932,
          "tpr": 0.0909
        },
        {
          "fpr": 0.1118,
          "tpr": 0.0909
        },
        {
          "fpr": 0.1118,
          "tpr": 0.1818
        },
        {
          "fpr": 0.1242,
          "tpr": 0.1818
        },
        {
          "fpr": 0.1242,
          "tpr": 0.4545
        },
        {
          "fpr": 0.3043,
          "tpr": 0.4545
        },
        {
          "fpr": 0.3043,
          "tpr": 0.5455
        },
        {
          "fpr": 0.5342,
          "tpr": 0.5455
        },
        {
          "fpr": 0.5342,
          "tpr": 0.6364
        },
        {
          "fpr": 0.5528,
          "tpr": 0.6364
        },
        {
          "fpr": 0.5528,
          "tpr": 0.7273
        },
        {
          "fpr": 0.559,
          "tpr": 0.7273
        },
        {
          "fpr": 0.559,
          "tpr": 0.8182
        },
        {
          "fpr": 0.6211,
          "tpr": 0.8182
        },
        {
          "fpr": 0.6211,
          "tpr": 0.9091
        },
        {
          "fpr": 0.6273,
          "tpr": 0.9091
        },
        {
          "fpr": 0.6398,
          "tpr": 0.9091
        },
        {
          "fpr": 0.7267,
          "tpr": 0.9091
        },
        {
          "fpr": 0.7391,
          "tpr": 0.9091
        },
        {
          "fpr": 0.8385,
          "tpr": 0.9091
        },
        {
          "fpr": 0.8509,
          "tpr": 0.9091
        },
        {
          "fpr": 0.8571,
          "tpr": 0.9091
        },
        {
          "fpr": 0.882,
          "tpr": 0.9091
        },
        {
          "fpr": 0.8882,
          "tpr": 0.9091
        },
        {
          "fpr": 0.9255,
          "tpr": 0.9091
        },
        {
          "fpr": 0.9317,
          "tpr": 0.9091
        },
        {
          "fpr": 0.9441,
          "tpr": 0.9091
        },
        {
          "fpr": 0.9503,
          "tpr": 0.9091
        },
        {
          "fpr": 0.9627,
          "tpr": 0.9091
        },
        {
          "fpr": 0.9814,
          "tpr": 0.9091
        },
        {
          "fpr": 0.9814,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.064
        },
        {
          "recall": 1.0,
          "precision": 0.0643
        },
        {
          "recall": 1.0,
          "precision": 0.0647
        },
        {
          "recall": 1.0,
          "precision": 0.0651
        },
        {
          "recall": 0.9091,
          "precision": 0.0595
        },
        {
          "recall": 0.9091,
          "precision": 0.0606
        },
        {
          "recall": 0.9091,
          "precision": 0.0613
        },
        {
          "recall": 0.9091,
          "precision": 0.0617
        },
        {
          "recall": 0.9091,
          "precision": 0.0625
        },
        {
          "recall": 0.9091,
          "precision": 0.0629
        },
        {
          "recall": 0.9091,
          "precision": 0.0654
        },
        {
          "recall": 0.9091,
          "precision": 0.0658
        },
        {
          "recall": 0.9091,
          "precision": 0.0667
        },
        {
          "recall": 0.9091,
          "precision": 0.0676
        },
        {
          "recall": 0.9091,
          "precision": 0.068
        },
        {
          "recall": 0.9091,
          "precision": 0.069
        },
        {
          "recall": 0.9091,
          "precision": 0.0694
        },
        {
          "recall": 0.9091,
          "precision": 0.0699
        },
        {
          "recall": 0.9091,
          "precision": 0.0704
        },
        {
          "recall": 0.9091,
          "precision": 0.0709
        },
        {
          "recall": 0.9091,
          "precision": 0.0714
        },
        {
          "recall": 0.9091,
          "precision": 0.0719
        },
        {
          "recall": 0.9091,
          "precision": 0.0725
        },
        {
          "recall": 0.9091,
          "precision": 0.073
        },
        {
          "recall": 0.9091,
          "precision": 0.0735
        },
        {
          "recall": 0.9091,
          "precision": 0.0741
        },
        {
          "recall": 0.9091,
          "precision": 0.0746
        },
        {
          "recall": 0.9091,
          "precision": 0.0752
        },
        {
          "recall": 0.9091,
          "precision": 0.0758
        },
        {
          "recall": 0.9091,
          "precision": 0.0763
        },
        {
          "recall": 0.9091,
          "precision": 0.0769
        },
        {
          "recall": 0.9091,
          "precision": 0.0775
        },
        {
          "recall": 0.9091,
          "precision": 0.0787
        },
        {
          "recall": 0.9091,
          "precision": 0.0794
        },
        {
          "recall": 0.9091,
          "precision": 0.08
        },
        {
          "recall": 0.9091,
          "precision": 0.0806
        },
        {
          "recall": 0.9091,
          "precision": 0.0813
        },
        {
          "recall": 0.9091,
          "precision": 0.082
        },
        {
          "recall": 0.9091,
          "precision": 0.0826
        },
        {
          "recall": 0.9091,
          "precision": 0.0833
        },
        {
          "recall": 0.9091,
          "precision": 0.084
        },
        {
          "recall": 0.9091,
          "precision": 0.0847
        },
        {
          "recall": 0.9091,
          "precision": 0.0855
        },
        {
          "recall": 0.9091,
          "precision": 0.0862
        },
        {
          "recall": 0.9091,
          "precision": 0.087
        },
        {
          "recall": 0.9091,
          "precision": 0.0877
        },
        {
          "recall": 0.9091,
          "precision": 0.0885
        },
        {
          "recall": 0.9091,
          "precision": 0.0901
        },
        {
          "recall": 0.9091,
          "precision": 0.0909
        },
        {
          "recall": 0.8182,
          "precision": 0.0826
        },
        {
          "recall": 0.8182,
          "precision": 0.0833
        },
        {
          "recall": 0.8182,
          "precision": 0.0841
        },
        {
          "recall": 0.8182,
          "precision": 0.0849
        },
        {
          "recall": 0.8182,
          "precision": 0.0857
        },
        {
          "recall": 0.8182,
          "precision": 0.0865
        },
        {
          "recall": 0.8182,
          "precision": 0.0874
        },
        {
          "recall": 0.8182,
          "precision": 0.0882
        },
        {
          "recall": 0.8182,
          "precision": 0.0891
        },
        {
          "recall": 0.8182,
          "precision": 0.09
        },
        {
          "recall": 0.8182,
          "precision": 0.0909
        },
        {
          "recall": 0.7273,
          "precision": 0.0816
        },
        {
          "recall": 0.7273,
          "precision": 0.0825
        },
        {
          "recall": 0.6364,
          "precision": 0.0729
        },
        {
          "recall": 0.6364,
          "precision": 0.0737
        },
        {
          "recall": 0.6364,
          "precision": 0.0745
        },
        {
          "recall": 0.6364,
          "precision": 0.0753
        },
        {
          "recall": 0.5455,
          "precision": 0.0652
        },
        {
          "recall": 0.5455,
          "precision": 0.0659
        },
        {
          "recall": 0.5455,
          "precision": 0.0667
        },
        {
          "recall": 0.5455,
          "precision": 0.0674
        },
        {
          "recall": 0.5455,
          "precision": 0.0682
        },
        {
          "recall": 0.5455,
          "precision": 0.069
        },
        {
          "recall": 0.5455,
          "precision": 0.0698
        },
        {
          "recall": 0.5455,
          "precision": 0.0706
        },
        {
          "recall": 0.5455,
          "precision": 0.0714
        },
        {
          "recall": 0.5455,
          "precision": 0.0723
        },
        {
          "recall": 0.5455,
          "precision": 0.0732
        },
        {
          "recall": 0.5455,
          "precision": 0.0741
        },
        {
          "recall": 0.5455,
          "precision": 0.075
        },
        {
          "recall": 0.5455,
          "precision": 0.0759
        },
        {
          "recall": 0.5455,
          "precision": 0.0769
        },
        {
          "recall": 0.5455,
          "precision": 0.0779
        },
        {
          "recall": 0.5455,
          "precision": 0.0789
        },
        {
          "recall": 0.5455,
          "precision": 0.08
        },
        {
          "recall": 0.5455,
          "precision": 0.0811
        },
        {
          "recall": 0.5455,
          "precision": 0.0822
        },
        {
          "recall": 0.5455,
          "precision": 0.0833
        },
        {
          "recall": 0.5455,
          "precision": 0.0845
        },
        {
          "recall": 0.5455,
          "precision": 0.0857
        },
        {
          "recall": 0.5455,
          "precision": 0.087
        },
        {
          "recall": 0.5455,
          "precision": 0.0882
        },
        {
          "recall": 0.5455,
          "precision": 0.0896
        },
        {
          "recall": 0.5455,
          "precision": 0.0909
        },
        {
          "recall": 0.5455,
          "precision": 0.0923
        },
        {
          "recall": 0.5455,
          "precision": 0.0938
        },
        {
          "recall": 0.5455,
          "precision": 0.0952
        },
        {
          "recall": 0.5455,
          "precision": 0.0968
        },
        {
          "recall": 0.5455,
          "precision": 0.0984
        },
        {
          "recall": 0.5455,
          "precision": 0.1
        },
        {
          "recall": 0.5455,
          "precision": 0.1017
        },
        {
          "recall": 0.5455,
          "precision": 0.1034
        },
        {
          "recall": 0.5455,
          "precision": 0.1053
        },
        {
          "recall": 0.5455,
          "precision": 0.1071
        },
        {
          "recall": 0.5455,
          "precision": 0.1091
        },
        {
          "recall": 0.4545,
          "precision": 0.0926
        },
        {
          "recall": 0.4545,
          "precision": 0.0943
        },
        {
          "recall": 0.4545,
          "precision": 0.0962
        },
        {
          "recall": 0.4545,
          "precision": 0.098
        },
        {
          "recall": 0.4545,
          "precision": 0.1
        },
        {
          "recall": 0.4545,
          "precision": 0.102
        },
        {
          "recall": 0.4545,
          "precision": 0.1042
        },
        {
          "recall": 0.4545,
          "precision": 0.1064
        },
        {
          "recall": 0.4545,
          "precision": 0.1087
        },
        {
          "recall": 0.4545,
          "precision": 0.1111
        },
        {
          "recall": 0.4545,
          "precision": 0.1136
        },
        {
          "recall": 0.4545,
          "precision": 0.1163
        },
        {
          "recall": 0.4545,
          "precision": 0.119
        },
        {
          "recall": 0.4545,
          "precision": 0.122
        },
        {
          "recall": 0.4545,
          "precision": 0.125
        },
        {
          "recall": 0.4545,
          "precision": 0.1282
        },
        {
          "recall": 0.4545,
          "precision": 0.1316
        },
        {
          "recall": 0.4545,
          "precision": 0.1351
        },
        {
          "recall": 0.4545,
          "precision": 0.1389
        },
        {
          "recall": 0.4545,
          "precision": 0.1429
        },
        {
          "recall": 0.4545,
          "precision": 0.1471
        },
        {
          "recall": 0.4545,
          "precision": 0.1515
        },
        {
          "recall": 0.4545,
          "precision": 0.1562
        },
        {
          "recall": 0.4545,
          "precision": 0.1613
        },
        {
          "recall": 0.4545,
          "precision": 0.1667
        },
        {
          "recall": 0.4545,
          "precision": 0.1724
        },
        {
          "recall": 0.4545,
          "precision": 0.1786
        },
        {
          "recall": 0.4545,
          "precision": 0.1852
        },
        {
          "recall": 0.4545,
          "precision": 0.1923
        },
        {
          "recall": 0.4545,
          "precision": 0.2
        },
        {
          "recall": 0.3636,
          "precision": 0.1667
        },
        {
          "recall": 0.2727,
          "precision": 0.1304
        },
        {
          "recall": 0.1818,
          "precision": 0.0909
        },
        {
          "recall": 0.1818,
          "precision": 0.0952
        },
        {
          "recall": 0.1818,
          "precision": 0.1
        },
        {
          "recall": 0.0909,
          "precision": 0.0526
        },
        {
          "recall": 0.0909,
          "precision": 0.0556
        },
        {
          "recall": 0.0909,
          "precision": 0.0588
        },
        {
          "recall": 0.0909,
          "precision": 0.0625
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 172
    },
    "xgboost": {
      "dataset": "cervical_cancer",
      "dataset_title": "Cervical Cancer (Risk Factors)",
      "model": "xgboost",
      "model_label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 1.0,
        "learning_rate": 0.1,
        "max_depth": 2,
        "n_estimators": 200,
        "scale_pos_weight": 1.0,
        "subsample": 1.0
      },
      "cv_roc_auc": 0.7226118378552971,
      "metrics": {
        "accuracy": 0.9244186046511628,
        "precision": 0.0,
        "recall": 0.0,
        "f1": 0.0,
        "roc_auc": 0.6250705815923208,
        "average_precision": 0.12292053724046272,
        "majority_baseline": 0.936046511627907
      },
      "confusion_matrix": {
        "true_negative": 159,
        "false_positive": 2,
        "false_negative": 11,
        "true_positive": 0
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.064,
        "mean_predicted_probability": 0.0638,
        "inflation_ratio": 1.0,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0062,
          "tpr": 0.0
        },
        {
          "fpr": 0.0497,
          "tpr": 0.0
        },
        {
          "fpr": 0.0497,
          "tpr": 0.0909
        },
        {
          "fpr": 0.0683,
          "tpr": 0.0909
        },
        {
          "fpr": 0.0683,
          "tpr": 0.1818
        },
        {
          "fpr": 0.0994,
          "tpr": 0.1818
        },
        {
          "fpr": 0.0994,
          "tpr": 0.2727
        },
        {
          "fpr": 0.1118,
          "tpr": 0.2727
        },
        {
          "fpr": 0.1118,
          "tpr": 0.3636
        },
        {
          "fpr": 0.1677,
          "tpr": 0.3636
        },
        {
          "fpr": 0.1677,
          "tpr": 0.4545
        },
        {
          "fpr": 0.1988,
          "tpr": 0.4545
        },
        {
          "fpr": 0.1988,
          "tpr": 0.5455
        },
        {
          "fpr": 0.3292,
          "tpr": 0.5455
        },
        {
          "fpr": 0.3292,
          "tpr": 0.6364
        },
        {
          "fpr": 0.3416,
          "tpr": 0.6364
        },
        {
          "fpr": 0.3416,
          "tpr": 0.7273
        },
        {
          "fpr": 0.4286,
          "tpr": 0.7273
        },
        {
          "fpr": 0.441,
          "tpr": 0.7273
        },
        {
          "fpr": 0.4969,
          "tpr": 0.7273
        },
        {
          "fpr": 0.5217,
          "tpr": 0.7273
        },
        {
          "fpr": 0.5342,
          "tpr": 0.7273
        },
        {
          "fpr": 0.5466,
          "tpr": 0.7273
        },
        {
          "fpr": 0.5776,
          "tpr": 0.7273
        },
        {
          "fpr": 0.5901,
          "tpr": 0.7273
        },
        {
          "fpr": 0.6522,
          "tpr": 0.7273
        },
        {
          "fpr": 0.6894,
          "tpr": 0.7273
        },
        {
          "fpr": 0.7081,
          "tpr": 0.7273
        },
        {
          "fpr": 0.7267,
          "tpr": 0.7273
        },
        {
          "fpr": 0.7516,
          "tpr": 0.7273
        },
        {
          "fpr": 0.764,
          "tpr": 0.7273
        },
        {
          "fpr": 0.7764,
          "tpr": 0.7273
        },
        {
          "fpr": 0.8012,
          "tpr": 0.7273
        },
        {
          "fpr": 0.8137,
          "tpr": 0.7273
        },
        {
          "fpr": 0.8509,
          "tpr": 0.7273
        },
        {
          "fpr": 0.8509,
          "tpr": 0.8182
        },
        {
          "fpr": 0.9503,
          "tpr": 0.8182
        },
        {
          "fpr": 0.9503,
          "tpr": 0.9091
        },
        {
          "fpr": 0.9565,
          "tpr": 0.9091
        },
        {
          "fpr": 0.9565,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.064
        },
        {
          "recall": 1.0,
          "precision": 0.0643
        },
        {
          "recall": 1.0,
          "precision": 0.0647
        },
        {
          "recall": 1.0,
          "precision": 0.0651
        },
        {
          "recall": 1.0,
          "precision": 0.0655
        },
        {
          "recall": 1.0,
          "precision": 0.0659
        },
        {
          "recall": 1.0,
          "precision": 0.0663
        },
        {
          "recall": 1.0,
          "precision": 0.0667
        },
        {
          "recall": 0.9091,
          "precision": 0.061
        },
        {
          "recall": 0.9091,
          "precision": 0.0613
        },
        {
          "recall": 0.8182,
          "precision": 0.0556
        },
        {
          "recall": 0.8182,
          "precision": 0.0559
        },
        {
          "recall": 0.8182,
          "precision": 0.0563
        },
        {
          "recall": 0.8182,
          "precision": 0.0566
        },
        {
          "recall": 0.8182,
          "precision": 0.057
        },
        {
          "recall": 0.8182,
          "precision": 0.0573
        },
        {
          "recall": 0.8182,
          "precision": 0.0577
        },
        {
          "recall": 0.8182,
          "precision": 0.0581
        },
        {
          "recall": 0.8182,
          "precision": 0.0584
        },
        {
          "recall": 0.8182,
          "precision": 0.0588
        },
        {
          "recall": 0.8182,
          "precision": 0.0592
        },
        {
          "recall": 0.8182,
          "precision": 0.0596
        },
        {
          "recall": 0.8182,
          "precision": 0.06
        },
        {
          "recall": 0.8182,
          "precision": 0.0604
        },
        {
          "recall": 0.8182,
          "precision": 0.0608
        },
        {
          "recall": 0.8182,
          "precision": 0.0612
        },
        {
          "recall": 0.8182,
          "precision": 0.0616
        },
        {
          "recall": 0.7273,
          "precision": 0.0552
        },
        {
          "recall": 0.7273,
          "precision": 0.0556
        },
        {
          "recall": 0.7273,
          "precision": 0.0559
        },
        {
          "recall": 0.7273,
          "precision": 0.0563
        },
        {
          "recall": 0.7273,
          "precision": 0.0567
        },
        {
          "recall": 0.7273,
          "precision": 0.0571
        },
        {
          "recall": 0.7273,
          "precision": 0.0576
        },
        {
          "recall": 0.7273,
          "precision": 0.0584
        },
        {
          "recall": 0.7273,
          "precision": 0.0588
        },
        {
          "recall": 0.7273,
          "precision": 0.0593
        },
        {
          "recall": 0.7273,
          "precision": 0.0597
        },
        {
          "recall": 0.7273,
          "precision": 0.0602
        },
        {
          "recall": 0.7273,
          "precision": 0.0611
        },
        {
          "recall": 0.7273,
          "precision": 0.0615
        },
        {
          "recall": 0.7273,
          "precision": 0.062
        },
        {
          "recall": 0.7273,
          "precision": 0.063
        },
        {
          "recall": 0.7273,
          "precision": 0.064
        },
        {
          "recall": 0.7273,
          "precision": 0.0656
        },
        {
          "recall": 0.7273,
          "precision": 0.0661
        },
        {
          "recall": 0.7273,
          "precision": 0.0667
        },
        {
          "recall": 0.7273,
          "precision": 0.0672
        },
        {
          "recall": 0.7273,
          "precision": 0.0708
        },
        {
          "recall": 0.7273,
          "precision": 0.0714
        },
        {
          "recall": 0.7273,
          "precision": 0.0721
        },
        {
          "recall": 0.7273,
          "precision": 0.0727
        },
        {
          "recall": 0.7273,
          "precision": 0.0734
        },
        {
          "recall": 0.7273,
          "precision": 0.0741
        },
        {
          "recall": 0.7273,
          "precision": 0.0748
        },
        {
          "recall": 0.7273,
          "precision": 0.0755
        },
        {
          "recall": 0.7273,
          "precision": 0.0762
        },
        {
          "recall": 0.7273,
          "precision": 0.0769
        },
        {
          "recall": 0.7273,
          "precision": 0.0777
        },
        {
          "recall": 0.7273,
          "precision": 0.0792
        },
        {
          "recall": 0.7273,
          "precision": 0.08
        },
        {
          "recall": 0.7273,
          "precision": 0.0808
        },
        {
          "recall": 0.7273,
          "precision": 0.0816
        },
        {
          "recall": 0.7273,
          "precision": 0.0825
        },
        {
          "recall": 0.7273,
          "precision": 0.0833
        },
        {
          "recall": 0.7273,
          "precision": 0.0851
        },
        {
          "recall": 0.7273,
          "precision": 0.086
        },
        {
          "recall": 0.7273,
          "precision": 0.087
        },
        {
          "recall": 0.7273,
          "precision": 0.0889
        },
        {
          "recall": 0.7273,
          "precision": 0.0909
        },
        {
          "recall": 0.7273,
          "precision": 0.092
        },
        {
          "recall": 0.7273,
          "precision": 0.093
        },
        {
          "recall": 0.7273,
          "precision": 0.0941
        },
        {
          "recall": 0.7273,
          "precision": 0.0952
        },
        {
          "recall": 0.7273,
          "precision": 0.0964
        },
        {
          "recall": 0.7273,
          "precision": 0.0976
        },
        {
          "recall": 0.7273,
          "precision": 0.0988
        },
        {
          "recall": 0.7273,
          "precision": 0.1
        },
        {
          "recall": 0.7273,
          "precision": 0.1013
        },
        {
          "recall": 0.7273,
          "precision": 0.1039
        },
        {
          "recall": 0.7273,
          "precision": 0.1053
        },
        {
          "recall": 0.7273,
          "precision": 0.1067
        },
        {
          "recall": 0.7273,
          "precision": 0.1081
        },
        {
          "recall": 0.7273,
          "precision": 0.1096
        },
        {
          "recall": 0.7273,
          "precision": 0.1111
        },
        {
          "recall": 0.7273,
          "precision": 0.1127
        },
        {
          "recall": 0.7273,
          "precision": 0.1143
        },
        {
          "recall": 0.7273,
          "precision": 0.1159
        },
        {
          "recall": 0.7273,
          "precision": 0.1176
        },
        {
          "recall": 0.7273,
          "precision": 0.1194
        },
        {
          "recall": 0.7273,
          "precision": 0.1212
        },
        {
          "recall": 0.7273,
          "precision": 0.1231
        },
        {
          "recall": 0.7273,
          "precision": 0.125
        },
        {
          "recall": 0.7273,
          "precision": 0.127
        },
        {
          "recall": 0.6364,
          "precision": 0.1129
        },
        {
          "recall": 0.6364,
          "precision": 0.1148
        },
        {
          "recall": 0.6364,
          "precision": 0.1167
        },
        {
          "recall": 0.5455,
          "precision": 0.1017
        },
        {
          "recall": 0.5455,
          "precision": 0.1034
        },
        {
          "recall": 0.5455,
          "precision": 0.1053
        },
        {
          "recall": 0.5455,
          "precision": 0.1071
        },
        {
          "recall": 0.5455,
          "precision": 0.1091
        },
        {
          "recall": 0.5455,
          "precision": 0.1111
        },
        {
          "recall": 0.5455,
          "precision": 0.1132
        },
        {
          "recall": 0.5455,
          "precision": 0.1154
        },
        {
          "recall": 0.5455,
          "precision": 0.1176
        },
        {
          "recall": 0.5455,
          "precision": 0.12
        },
        {
          "recall": 0.5455,
          "precision": 0.1224
        },
        {
          "recall": 0.5455,
          "precision": 0.125
        },
        {
          "recall": 0.5455,
          "precision": 0.1277
        },
        {
          "recall": 0.5455,
          "precision": 0.1304
        },
        {
          "recall": 0.5455,
          "precision": 0.1333
        },
        {
          "recall": 0.5455,
          "precision": 0.1364
        },
        {
          "recall": 0.5455,
          "precision": 0.1395
        },
        {
          "recall": 0.5455,
          "precision": 0.1429
        },
        {
          "recall": 0.5455,
          "precision": 0.1463
        },
        {
          "recall": 0.5455,
          "precision": 0.15
        },
        {
          "recall": 0.5455,
          "precision": 0.1538
        },
        {
          "recall": 0.5455,
          "precision": 0.1579
        },
        {
          "recall": 0.4545,
          "precision": 0.1351
        },
        {
          "recall": 0.4545,
          "precision": 0.1389
        },
        {
          "recall": 0.4545,
          "precision": 0.1429
        },
        {
          "recall": 0.4545,
          "precision": 0.1471
        },
        {
          "recall": 0.4545,
          "precision": 0.1515
        },
        {
          "recall": 0.4545,
          "precision": 0.1562
        },
        {
          "recall": 0.3636,
          "precision": 0.129
        },
        {
          "recall": 0.3636,
          "precision": 0.1333
        },
        {
          "recall": 0.3636,
          "precision": 0.1379
        },
        {
          "recall": 0.3636,
          "precision": 0.1429
        },
        {
          "recall": 0.3636,
          "precision": 0.1481
        },
        {
          "recall": 0.3636,
          "precision": 0.1538
        },
        {
          "recall": 0.3636,
          "precision": 0.16
        },
        {
          "recall": 0.3636,
          "precision": 0.1667
        },
        {
          "recall": 0.3636,
          "precision": 0.1739
        },
        {
          "recall": 0.3636,
          "precision": 0.1818
        },
        {
          "recall": 0.2727,
          "precision": 0.1429
        },
        {
          "recall": 0.2727,
          "precision": 0.15
        },
        {
          "recall": 0.2727,
          "precision": 0.1579
        },
        {
          "recall": 0.1818,
          "precision": 0.1111
        },
        {
          "recall": 0.1818,
          "precision": 0.1176
        },
        {
          "recall": 0.1818,
          "precision": 0.125
        },
        {
          "recall": 0.1818,
          "precision": 0.1333
        },
        {
          "recall": 0.1818,
          "precision": 0.1429
        },
        {
          "recall": 0.1818,
          "precision": 0.1538
        },
        {
          "recall": 0.0909,
          "precision": 0.0833
        },
        {
          "recall": 0.0909,
          "precision": 0.0909
        },
        {
          "recall": 0.0909,
          "precision": 0.1
        },
        {
          "recall": 0.0909,
          "precision": 0.1111
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 172
    }
  },
  "lung_cancer_surgery": {
    "logistic_regression": {
      "dataset": "lung_cancer_surgery",
      "dataset_title": "Lung Cancer Thoracic Surgery",
      "model": "logistic_regression",
      "model_label": "Logistic Regression",
      "is_best": true,
      "best_params": {
        "C": 0.01,
        "class_weight": "balanced",
        "penalty": "l2",
        "solver": "liblinear"
      },
      "cv_roc_auc": 0.6618371212121212,
      "metrics": {
        "accuracy": 0.5531914893617021,
        "precision": 0.18181818181818182,
        "recall": 0.5714285714285714,
        "f1": 0.27586206896551724,
        "roc_auc": 0.6214285714285714,
        "average_precision": 0.23098732604580371,
        "majority_baseline": 0.851063829787234
      },
      "confusion_matrix": {
        "true_negative": 44,
        "false_positive": 36,
        "false_negative": 6,
        "true_positive": 8
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.1489,
        "mean_predicted_probability": 0.4889,
        "inflation_ratio": 3.28,
        "calibrated": false,
        "note": "Probabilities are inflated roughly 3.3x relative to the cohort prevalence of 14.9%, because class weighting was tuned in. Read the number as a relative risk score for ranking patients, not as this patient's absolute probability."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0125,
          "tpr": 0.0
        },
        {
          "fpr": 0.0375,
          "tpr": 0.0
        },
        {
          "fpr": 0.0375,
          "tpr": 0.0714
        },
        {
          "fpr": 0.05,
          "tpr": 0.0714
        },
        {
          "fpr": 0.05,
          "tpr": 0.1429
        },
        {
          "fpr": 0.075,
          "tpr": 0.1429
        },
        {
          "fpr": 0.075,
          "tpr": 0.2143
        },
        {
          "fpr": 0.0875,
          "tpr": 0.2143
        },
        {
          "fpr": 0.0875,
          "tpr": 0.2857
        },
        {
          "fpr": 0.2,
          "tpr": 0.2857
        },
        {
          "fpr": 0.2,
          "tpr": 0.3571
        },
        {
          "fpr": 0.3125,
          "tpr": 0.3571
        },
        {
          "fpr": 0.3125,
          "tpr": 0.4286
        },
        {
          "fpr": 0.35,
          "tpr": 0.4286
        },
        {
          "fpr": 0.35,
          "tpr": 0.5
        },
        {
          "fpr": 0.4125,
          "tpr": 0.5
        },
        {
          "fpr": 0.4125,
          "tpr": 0.5714
        },
        {
          "fpr": 0.4875,
          "tpr": 0.5714
        },
        {
          "fpr": 0.4875,
          "tpr": 0.6429
        },
        {
          "fpr": 0.5375,
          "tpr": 0.6429
        },
        {
          "fpr": 0.5375,
          "tpr": 0.7143
        },
        {
          "fpr": 0.5875,
          "tpr": 0.7143
        },
        {
          "fpr": 0.5875,
          "tpr": 0.7857
        },
        {
          "fpr": 0.6,
          "tpr": 0.7857
        },
        {
          "fpr": 0.6,
          "tpr": 0.8571
        },
        {
          "fpr": 0.65,
          "tpr": 0.8571
        },
        {
          "fpr": 0.65,
          "tpr": 0.9286
        },
        {
          "fpr": 0.9125,
          "tpr": 0.9286
        },
        {
          "fpr": 0.9125,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.1489
        },
        {
          "recall": 1.0,
          "precision": 0.1505
        },
        {
          "recall": 1.0,
          "precision": 0.1522
        },
        {
          "recall": 1.0,
          "precision": 0.1538
        },
        {
          "recall": 1.0,
          "precision": 0.1556
        },
        {
          "recall": 1.0,
          "precision": 0.1573
        },
        {
          "recall": 1.0,
          "precision": 0.1591
        },
        {
          "recall": 1.0,
          "precision": 0.1609
        },
        {
          "recall": 0.9286,
          "precision": 0.1512
        },
        {
          "recall": 0.9286,
          "precision": 0.1529
        },
        {
          "recall": 0.9286,
          "precision": 0.1548
        },
        {
          "recall": 0.9286,
          "precision": 0.1566
        },
        {
          "recall": 0.9286,
          "precision": 0.1585
        },
        {
          "recall": 0.9286,
          "precision": 0.1605
        },
        {
          "recall": 0.9286,
          "precision": 0.1625
        },
        {
          "recall": 0.9286,
          "precision": 0.1646
        },
        {
          "recall": 0.9286,
          "precision": 0.1667
        },
        {
          "recall": 0.9286,
          "precision": 0.1688
        },
        {
          "recall": 0.9286,
          "precision": 0.1711
        },
        {
          "recall": 0.9286,
          "precision": 0.1733
        },
        {
          "recall": 0.9286,
          "precision": 0.1757
        },
        {
          "recall": 0.9286,
          "precision": 0.1781
        },
        {
          "recall": 0.9286,
          "precision": 0.1806
        },
        {
          "recall": 0.9286,
          "precision": 0.1831
        },
        {
          "recall": 0.9286,
          "precision": 0.1857
        },
        {
          "recall": 0.9286,
          "precision": 0.1884
        },
        {
          "recall": 0.9286,
          "precision": 0.1912
        },
        {
          "recall": 0.9286,
          "precision": 0.194
        },
        {
          "recall": 0.9286,
          "precision": 0.197
        },
        {
          "recall": 0.9286,
          "precision": 0.2
        },
        {
          "recall": 0.8571,
          "precision": 0.1875
        },
        {
          "recall": 0.8571,
          "precision": 0.1905
        },
        {
          "recall": 0.8571,
          "precision": 0.1935
        },
        {
          "recall": 0.8571,
          "precision": 0.1967
        },
        {
          "recall": 0.8571,
          "precision": 0.2
        },
        {
          "recall": 0.7857,
          "precision": 0.1864
        },
        {
          "recall": 0.7857,
          "precision": 0.1897
        },
        {
          "recall": 0.7143,
          "precision": 0.1754
        },
        {
          "recall": 0.7143,
          "precision": 0.1786
        },
        {
          "recall": 0.7143,
          "precision": 0.1818
        },
        {
          "recall": 0.7143,
          "precision": 0.1852
        },
        {
          "recall": 0.7143,
          "precision": 0.1887
        },
        {
          "recall": 0.6429,
          "precision": 0.1731
        },
        {
          "recall": 0.6429,
          "precision": 0.1765
        },
        {
          "recall": 0.6429,
          "precision": 0.18
        },
        {
          "recall": 0.6429,
          "precision": 0.1837
        },
        {
          "recall": 0.6429,
          "precision": 0.1875
        },
        {
          "recall": 0.5714,
          "precision": 0.1702
        },
        {
          "recall": 0.5714,
          "precision": 0.1739
        },
        {
          "recall": 0.5714,
          "precision": 0.1778
        },
        {
          "recall": 0.5714,
          "precision": 0.1818
        },
        {
          "recall": 0.5714,
          "precision": 0.186
        },
        {
          "recall": 0.5714,
          "precision": 0.1905
        },
        {
          "recall": 0.5714,
          "precision": 0.1951
        },
        {
          "recall": 0.5,
          "precision": 0.175
        },
        {
          "recall": 0.5,
          "precision": 0.1795
        },
        {
          "recall": 0.5,
          "precision": 0.1842
        },
        {
          "recall": 0.5,
          "precision": 0.1892
        },
        {
          "recall": 0.5,
          "precision": 0.1944
        },
        {
          "recall": 0.5,
          "precision": 0.2
        },
        {
          "recall": 0.4286,
          "precision": 0.1765
        },
        {
          "recall": 0.4286,
          "precision": 0.1818
        },
        {
          "recall": 0.4286,
          "precision": 0.1875
        },
        {
          "recall": 0.4286,
          "precision": 0.1935
        },
        {
          "recall": 0.3571,
          "precision": 0.1667
        },
        {
          "recall": 0.3571,
          "precision": 0.1724
        },
        {
          "recall": 0.3571,
          "precision": 0.1786
        },
        {
          "recall": 0.3571,
          "precision": 0.1852
        },
        {
          "recall": 0.3571,
          "precision": 0.1923
        },
        {
          "recall": 0.3571,
          "precision": 0.2
        },
        {
          "recall": 0.3571,
          "precision": 0.2083
        },
        {
          "recall": 0.3571,
          "precision": 0.2174
        },
        {
          "recall": 0.3571,
          "precision": 0.2273
        },
        {
          "recall": 0.3571,
          "precision": 0.2381
        },
        {
          "recall": 0.2857,
          "precision": 0.2
        },
        {
          "recall": 0.2857,
          "precision": 0.2105
        },
        {
          "recall": 0.2857,
          "precision": 0.2222
        },
        {
          "recall": 0.2857,
          "precision": 0.2353
        },
        {
          "recall": 0.2857,
          "precision": 0.25
        },
        {
          "recall": 0.2857,
          "precision": 0.2667
        },
        {
          "recall": 0.2857,
          "precision": 0.2857
        },
        {
          "recall": 0.2857,
          "precision": 0.3077
        },
        {
          "recall": 0.2857,
          "precision": 0.3333
        },
        {
          "recall": 0.2857,
          "precision": 0.3636
        },
        {
          "recall": 0.2143,
          "precision": 0.3
        },
        {
          "recall": 0.2143,
          "precision": 0.3333
        },
        {
          "recall": 0.1429,
          "precision": 0.25
        },
        {
          "recall": 0.1429,
          "precision": 0.2857
        },
        {
          "recall": 0.1429,
          "precision": 0.3333
        },
        {
          "recall": 0.0714,
          "precision": 0.2
        },
        {
          "recall": 0.0714,
          "precision": 0.25
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 94,
      "fidelity": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_values": [
          1,
          2,
          3,
          4,
          5
        ],
        "n_features": 16,
        "top_k_probability_drop": [
          0.0593,
          0.0647,
          0.0729,
          0.0751,
          0.0784
        ],
        "random_k_probability_drop": [
          0.0104,
          0.0226,
          0.0241,
          0.0357,
          0.0352
        ],
        "fidelity_score": 2.736,
        "interpretation": "Ablating the features SHAP ranked highest moves the prediction 2.7x more than ablating the same number of random features."
      },
      "stability": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "k_neighbours": 5,
        "mean_neighbour_cosine": 0.6455,
        "std_neighbour_cosine": 0.3299,
        "mean_random_cosine": -0.0023,
        "stability_gap": 0.6478,
        "pairs_compared": 470,
        "interpretation": "Neighbouring patients' explanations agree at cosine 0.65 versus -0.00 for unrelated patients (gap +0.65)."
      },
      "comprehensibility": {
        "model": "logistic_regression",
        "model_label": "Logistic Regression",
        "clinical_reference_features": [
          "AGE",
          "DGN",
          "PRE14",
          "PRE17",
          "PRE30",
          "PRE4",
          "PRE5",
          "PRE6",
          "PRE9"
        ],
        "top3_clinical_hit_rate": 0.844,
        "shap_lime_top5_overlap": 0.432,
        "lime_sample_size": 25,
        "example_summary": "The model estimates a moderate likelihood of \u201cDied within one year\u201d (52%). Raising the estimate: Tumour size (clinical T stage) (T2), Smoker (Yes). Lowering it: Dyspnoea before surgery (No)."
      }
    },
    "random_forest": {
      "dataset": "lung_cancer_surgery",
      "dataset_title": "Lung Cancer Thoracic Surgery",
      "model": "random_forest",
      "model_label": "Random Forest",
      "is_best": false,
      "best_params": {
        "class_weight": null,
        "max_depth": null,
        "max_features": 0.5,
        "min_samples_leaf": 1,
        "n_estimators": 300
      },
      "cv_roc_auc": 0.685357481060606,
      "metrics": {
        "accuracy": 0.8404255319148937,
        "precision": 0.0,
        "recall": 0.0,
        "f1": 0.0,
        "roc_auc": 0.5924107142857142,
        "average_precision": 0.20580602045022806,
        "majority_baseline": 0.851063829787234
      },
      "confusion_matrix": {
        "true_negative": 79,
        "false_positive": 1,
        "false_negative": 14,
        "true_positive": 0
      },
      "calibration": {
        "class_weighted": false,
        "test_prevalence": 0.1489,
        "mean_predicted_probability": 0.1796,
        "inflation_ratio": 1.21,
        "calibrated": true,
        "note": "Mean predicted probability tracks cohort prevalence; the probability can be read directly."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0125,
          "tpr": 0.0
        },
        {
          "fpr": 0.0375,
          "tpr": 0.0
        },
        {
          "fpr": 0.0375,
          "tpr": 0.0714
        },
        {
          "fpr": 0.05,
          "tpr": 0.0714
        },
        {
          "fpr": 0.075,
          "tpr": 0.0714
        },
        {
          "fpr": 0.075,
          "tpr": 0.1429
        },
        {
          "fpr": 0.0875,
          "tpr": 0.1429
        },
        {
          "fpr": 0.0875,
          "tpr": 0.2143
        },
        {
          "fpr": 0.1875,
          "tpr": 0.2143
        },
        {
          "fpr": 0.2125,
          "tpr": 0.2143
        },
        {
          "fpr": 0.225,
          "tpr": 0.2857
        },
        {
          "fpr": 0.225,
          "tpr": 0.3571
        },
        {
          "fpr": 0.2875,
          "tpr": 0.3571
        },
        {
          "fpr": 0.3125,
          "tpr": 0.5
        },
        {
          "fpr": 0.3375,
          "tpr": 0.5714
        },
        {
          "fpr": 0.475,
          "tpr": 0.5714
        },
        {
          "fpr": 0.5,
          "tpr": 0.5714
        },
        {
          "fpr": 0.5,
          "tpr": 0.6429
        },
        {
          "fpr": 0.5375,
          "tpr": 0.7143
        },
        {
          "fpr": 0.5625,
          "tpr": 0.7143
        },
        {
          "fpr": 0.6,
          "tpr": 0.7143
        },
        {
          "fpr": 0.65,
          "tpr": 0.7143
        },
        {
          "fpr": 0.675,
          "tpr": 0.7143
        },
        {
          "fpr": 0.7,
          "tpr": 0.7143
        },
        {
          "fpr": 0.7125,
          "tpr": 0.7857
        },
        {
          "fpr": 0.725,
          "tpr": 0.7857
        },
        {
          "fpr": 0.7375,
          "tpr": 0.8571
        },
        {
          "fpr": 0.7625,
          "tpr": 0.8571
        },
        {
          "fpr": 0.7875,
          "tpr": 0.8571
        },
        {
          "fpr": 0.8,
          "tpr": 0.9286
        },
        {
          "fpr": 0.8125,
          "tpr": 0.9286
        },
        {
          "fpr": 0.8375,
          "tpr": 0.9286
        },
        {
          "fpr": 0.85,
          "tpr": 0.9286
        },
        {
          "fpr": 0.875,
          "tpr": 0.9286
        },
        {
          "fpr": 0.9,
          "tpr": 1.0
        },
        {
          "fpr": 0.925,
          "tpr": 1.0
        },
        {
          "fpr": 0.95,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.1489
        },
        {
          "recall": 1.0,
          "precision": 0.1522
        },
        {
          "recall": 1.0,
          "precision": 0.1556
        },
        {
          "recall": 1.0,
          "precision": 0.1573
        },
        {
          "recall": 1.0,
          "precision": 0.1591
        },
        {
          "recall": 1.0,
          "precision": 0.1628
        },
        {
          "recall": 0.9286,
          "precision": 0.1566
        },
        {
          "recall": 0.9286,
          "precision": 0.1605
        },
        {
          "recall": 0.9286,
          "precision": 0.1625
        },
        {
          "recall": 0.9286,
          "precision": 0.1667
        },
        {
          "recall": 0.9286,
          "precision": 0.1688
        },
        {
          "recall": 0.8571,
          "precision": 0.16
        },
        {
          "recall": 0.8571,
          "precision": 0.1644
        },
        {
          "recall": 0.8571,
          "precision": 0.1667
        },
        {
          "recall": 0.8571,
          "precision": 0.169
        },
        {
          "recall": 0.7857,
          "precision": 0.1594
        },
        {
          "recall": 0.7857,
          "precision": 0.1618
        },
        {
          "recall": 0.7143,
          "precision": 0.1515
        },
        {
          "recall": 0.7143,
          "precision": 0.1562
        },
        {
          "recall": 0.7143,
          "precision": 0.1587
        },
        {
          "recall": 0.7143,
          "precision": 0.1613
        },
        {
          "recall": 0.7143,
          "precision": 0.1667
        },
        {
          "recall": 0.7143,
          "precision": 0.1724
        },
        {
          "recall": 0.7143,
          "precision": 0.1818
        },
        {
          "recall": 0.7143,
          "precision": 0.1852
        },
        {
          "recall": 0.7143,
          "precision": 0.1887
        },
        {
          "recall": 0.6429,
          "precision": 0.1837
        },
        {
          "recall": 0.5714,
          "precision": 0.1667
        },
        {
          "recall": 0.5714,
          "precision": 0.1739
        },
        {
          "recall": 0.5714,
          "precision": 0.1778
        },
        {
          "recall": 0.5714,
          "precision": 0.1818
        },
        {
          "recall": 0.5714,
          "precision": 0.186
        },
        {
          "recall": 0.5714,
          "precision": 0.1905
        },
        {
          "recall": 0.5714,
          "precision": 0.1951
        },
        {
          "recall": 0.5714,
          "precision": 0.2
        },
        {
          "recall": 0.5714,
          "precision": 0.2051
        },
        {
          "recall": 0.5714,
          "precision": 0.2105
        },
        {
          "recall": 0.5714,
          "precision": 0.2162
        },
        {
          "recall": 0.5714,
          "precision": 0.2222
        },
        {
          "recall": 0.5714,
          "precision": 0.2286
        },
        {
          "recall": 0.5,
          "precision": 0.2188
        },
        {
          "recall": 0.4286,
          "precision": 0.2
        },
        {
          "recall": 0.3571,
          "precision": 0.1786
        },
        {
          "recall": 0.3571,
          "precision": 0.1852
        },
        {
          "recall": 0.3571,
          "precision": 0.1923
        },
        {
          "recall": 0.3571,
          "precision": 0.2
        },
        {
          "recall": 0.3571,
          "precision": 0.2083
        },
        {
          "recall": 0.3571,
          "precision": 0.2174
        },
        {
          "recall": 0.2857,
          "precision": 0.1818
        },
        {
          "recall": 0.2143,
          "precision": 0.15
        },
        {
          "recall": 0.2143,
          "precision": 0.1667
        },
        {
          "recall": 0.2143,
          "precision": 0.1765
        },
        {
          "recall": 0.2143,
          "precision": 0.1875
        },
        {
          "recall": 0.2143,
          "precision": 0.2
        },
        {
          "recall": 0.2143,
          "precision": 0.2143
        },
        {
          "recall": 0.2143,
          "precision": 0.2308
        },
        {
          "recall": 0.2143,
          "precision": 0.25
        },
        {
          "recall": 0.2143,
          "precision": 0.2727
        },
        {
          "recall": 0.2143,
          "precision": 0.3
        },
        {
          "recall": 0.1429,
          "precision": 0.2222
        },
        {
          "recall": 0.1429,
          "precision": 0.25
        },
        {
          "recall": 0.0714,
          "precision": 0.1429
        },
        {
          "recall": 0.0714,
          "precision": 0.2
        },
        {
          "recall": 0.0714,
          "precision": 0.25
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 94
    },
    "xgboost": {
      "dataset": "lung_cancer_surgery",
      "dataset_title": "Lung Cancer Thoracic Surgery",
      "model": "xgboost",
      "model_label": "XGBoost",
      "is_best": false,
      "best_params": {
        "colsample_bytree": 1.0,
        "learning_rate": 0.03,
        "max_depth": 5,
        "n_estimators": 500,
        "scale_pos_weight": 5.714,
        "subsample": 1.0
      },
      "cv_roc_auc": 0.6389914772727272,
      "metrics": {
        "accuracy": 0.7446808510638298,
        "precision": 0.2222222222222222,
        "recall": 0.2857142857142857,
        "f1": 0.25,
        "roc_auc": 0.5991071428571428,
        "average_precision": 0.1915602796827407,
        "majority_baseline": 0.851063829787234
      },
      "confusion_matrix": {
        "true_negative": 66,
        "false_positive": 14,
        "false_negative": 10,
        "true_positive": 4
      },
      "calibration": {
        "class_weighted": true,
        "test_prevalence": 0.1489,
        "mean_predicted_probability": 0.2356,
        "inflation_ratio": 1.58,
        "calibrated": false,
        "note": "Probabilities are inflated roughly 1.6x relative to the cohort prevalence of 14.9%, because class weighting was tuned in. Read the number as a relative risk score for ranking patients, not as this patient's absolute probability."
      },
      "roc_curve": [
        {
          "fpr": 0.0,
          "tpr": 0.0
        },
        {
          "fpr": 0.0125,
          "tpr": 0.0
        },
        {
          "fpr": 0.1125,
          "tpr": 0.0
        },
        {
          "fpr": 0.1125,
          "tpr": 0.0714
        },
        {
          "fpr": 0.1375,
          "tpr": 0.0714
        },
        {
          "fpr": 0.1375,
          "tpr": 0.1429
        },
        {
          "fpr": 0.1625,
          "tpr": 0.1429
        },
        {
          "fpr": 0.1625,
          "tpr": 0.2143
        },
        {
          "fpr": 0.175,
          "tpr": 0.2143
        },
        {
          "fpr": 0.175,
          "tpr": 0.3571
        },
        {
          "fpr": 0.25,
          "tpr": 0.3571
        },
        {
          "fpr": 0.25,
          "tpr": 0.4286
        },
        {
          "fpr": 0.325,
          "tpr": 0.4286
        },
        {
          "fpr": 0.325,
          "tpr": 0.5
        },
        {
          "fpr": 0.35,
          "tpr": 0.5
        },
        {
          "fpr": 0.35,
          "tpr": 0.5714
        },
        {
          "fpr": 0.425,
          "tpr": 0.5714
        },
        {
          "fpr": 0.45,
          "tpr": 0.5714
        },
        {
          "fpr": 0.4625,
          "tpr": 0.5714
        },
        {
          "fpr": 0.4625,
          "tpr": 0.6429
        },
        {
          "fpr": 0.55,
          "tpr": 0.6429
        },
        {
          "fpr": 0.55,
          "tpr": 0.7143
        },
        {
          "fpr": 0.6,
          "tpr": 0.7143
        },
        {
          "fpr": 0.6,
          "tpr": 0.7857
        },
        {
          "fpr": 0.7125,
          "tpr": 0.7857
        },
        {
          "fpr": 0.7125,
          "tpr": 0.8571
        },
        {
          "fpr": 0.75,
          "tpr": 0.8571
        },
        {
          "fpr": 0.75,
          "tpr": 0.9286
        },
        {
          "fpr": 0.85,
          "tpr": 0.9286
        },
        {
          "fpr": 0.85,
          "tpr": 1.0
        },
        {
          "fpr": 1.0,
          "tpr": 1.0
        }
      ],
      "pr_curve": [
        {
          "recall": 1.0,
          "precision": 0.1489
        },
        {
          "recall": 1.0,
          "precision": 0.1505
        },
        {
          "recall": 1.0,
          "precision": 0.1522
        },
        {
          "recall": 1.0,
          "precision": 0.1538
        },
        {
          "recall": 1.0,
          "precision": 0.1556
        },
        {
          "recall": 1.0,
          "precision": 0.1573
        },
        {
          "recall": 1.0,
          "precision": 0.1591
        },
        {
          "recall": 1.0,
          "precision": 0.1609
        },
        {
          "recall": 1.0,
          "precision": 0.1628
        },
        {
          "recall": 1.0,
          "precision": 0.1647
        },
        {
          "recall": 1.0,
          "precision": 0.1667
        },
        {
          "recall": 1.0,
          "precision": 0.1687
        },
        {
          "recall": 1.0,
          "precision": 0.1707
        },
        {
          "recall": 0.9286,
          "precision": 0.1605
        },
        {
          "recall": 0.9286,
          "precision": 0.1625
        },
        {
          "recall": 0.9286,
          "precision": 0.1646
        },
        {
          "recall": 0.9286,
          "precision": 0.1667
        },
        {
          "recall": 0.9286,
          "precision": 0.1688
        },
        {
          "recall": 0.9286,
          "precision": 0.1711
        },
        {
          "recall": 0.9286,
          "precision": 0.1733
        },
        {
          "recall": 0.9286,
          "precision": 0.1757
        },
        {
          "recall": 0.9286,
          "precision": 0.1781
        },
        {
          "recall": 0.8571,
          "precision": 0.1667
        },
        {
          "recall": 0.8571,
          "precision": 0.169
        },
        {
          "recall": 0.8571,
          "precision": 0.1714
        },
        {
          "recall": 0.8571,
          "precision": 0.1739
        },
        {
          "recall": 0.7857,
          "precision": 0.1618
        },
        {
          "recall": 0.7857,
          "precision": 0.1642
        },
        {
          "recall": 0.7857,
          "precision": 0.1667
        },
        {
          "recall": 0.7857,
          "precision": 0.1692
        },
        {
          "recall": 0.7857,
          "precision": 0.1719
        },
        {
          "recall": 0.7857,
          "precision": 0.1746
        },
        {
          "recall": 0.7857,
          "precision": 0.1774
        },
        {
          "recall": 0.7857,
          "precision": 0.1803
        },
        {
          "recall": 0.7857,
          "precision": 0.1833
        },
        {
          "recall": 0.7857,
          "precision": 0.1864
        },
        {
          "recall": 0.7143,
          "precision": 0.1724
        },
        {
          "recall": 0.7143,
          "precision": 0.1754
        },
        {
          "recall": 0.7143,
          "precision": 0.1786
        },
        {
          "recall": 0.7143,
          "precision": 0.1818
        },
        {
          "recall": 0.7143,
          "precision": 0.1852
        },
        {
          "recall": 0.6429,
          "precision": 0.1698
        },
        {
          "recall": 0.6429,
          "precision": 0.1731
        },
        {
          "recall": 0.6429,
          "precision": 0.1765
        },
        {
          "recall": 0.6429,
          "precision": 0.18
        },
        {
          "recall": 0.6429,
          "precision": 0.1837
        },
        {
          "recall": 0.6429,
          "precision": 0.1875
        },
        {
          "recall": 0.6429,
          "precision": 0.1915
        },
        {
          "recall": 0.6429,
          "precision": 0.1957
        },
        {
          "recall": 0.5714,
          "precision": 0.1778
        },
        {
          "recall": 0.5714,
          "precision": 0.1818
        },
        {
          "recall": 0.5714,
          "precision": 0.1905
        },
        {
          "recall": 0.5714,
          "precision": 0.1951
        },
        {
          "recall": 0.5714,
          "precision": 0.2
        },
        {
          "recall": 0.5714,
          "precision": 0.2051
        },
        {
          "recall": 0.5714,
          "precision": 0.2105
        },
        {
          "recall": 0.5714,
          "precision": 0.2162
        },
        {
          "recall": 0.5714,
          "precision": 0.2222
        },
        {
          "recall": 0.5,
          "precision": 0.2
        },
        {
          "recall": 0.5,
          "precision": 0.2059
        },
        {
          "recall": 0.5,
          "precision": 0.2121
        },
        {
          "recall": 0.4286,
          "precision": 0.1875
        },
        {
          "recall": 0.4286,
          "precision": 0.1935
        },
        {
          "recall": 0.4286,
          "precision": 0.2
        },
        {
          "recall": 0.4286,
          "precision": 0.2069
        },
        {
          "recall": 0.4286,
          "precision": 0.2143
        },
        {
          "recall": 0.4286,
          "precision": 0.2222
        },
        {
          "recall": 0.4286,
          "precision": 0.2308
        },
        {
          "recall": 0.3571,
          "precision": 0.2
        },
        {
          "recall": 0.3571,
          "precision": 0.2083
        },
        {
          "recall": 0.3571,
          "precision": 0.2174
        },
        {
          "recall": 0.3571,
          "precision": 0.2273
        },
        {
          "recall": 0.3571,
          "precision": 0.2381
        },
        {
          "recall": 0.3571,
          "precision": 0.25
        },
        {
          "recall": 0.3571,
          "precision": 0.2632
        },
        {
          "recall": 0.2857,
          "precision": 0.2222
        },
        {
          "recall": 0.2143,
          "precision": 0.1765
        },
        {
          "recall": 0.2143,
          "precision": 0.1875
        },
        {
          "recall": 0.1429,
          "precision": 0.1333
        },
        {
          "recall": 0.1429,
          "precision": 0.1429
        },
        {
          "recall": 0.1429,
          "precision": 0.1538
        },
        {
          "recall": 0.0714,
          "precision": 0.0833
        },
        {
          "recall": 0.0714,
          "precision": 0.0909
        },
        {
          "recall": 0.0714,
          "precision": 0.1
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 0.0
        },
        {
          "recall": 0.0,
          "precision": 1.0
        }
      ],
      "test_n": 94
    }
  }
};

export const STATIC_GLOBAL_IMPORTANCE: Record<string, GlobalImportance> = {
  "heart_disease": {
    "model": "logistic_regression",
    "model_label": "Logistic Regression",
    "base_value": -0.16728130677594882,
    "features": [
      {
        "feature": "ca",
        "label": "Major vessels coloured by fluoroscopy",
        "group": "labs",
        "mean_abs_shap": 0.7468918189793898,
        "mean_signed_shap": 0.2744642892745467
      },
      {
        "feature": "thal",
        "label": "Thallium perfusion scan",
        "group": "labs",
        "mean_abs_shap": 0.5565421812855329,
        "mean_signed_shap": -0.006857681338919941
      },
      {
        "feature": "sex",
        "label": "Sex",
        "group": "demographics",
        "mean_abs_shap": 0.43459745359486246,
        "mean_signed_shap": 0.002097945375690008
      },
      {
        "feature": "cp",
        "label": "Chest pain type",
        "group": "vitals",
        "mean_abs_shap": 0.3224055004710325,
        "mean_signed_shap": -0.008713662174892748
      },
      {
        "feature": "exang",
        "label": "Exercise-induced angina",
        "group": "vitals",
        "mean_abs_shap": 0.3055373497290126,
        "mean_signed_shap": 0.005488694905311586
      },
      {
        "feature": "thalach",
        "label": "Maximum heart rate achieved",
        "group": "vitals",
        "mean_abs_shap": 0.2379162050146027,
        "mean_signed_shap": 0.035113581814875616
      },
      {
        "feature": "slope",
        "label": "ST segment slope at peak exercise",
        "group": "vitals",
        "mean_abs_shap": 0.21471733192378198,
        "mean_signed_shap": 0.046746577798904614
      },
      {
        "feature": "oldpeak",
        "label": "ST depression (exercise vs rest)",
        "group": "vitals",
        "mean_abs_shap": 0.20483661068704564,
        "mean_signed_shap": 0.06074180262370184
      },
      {
        "feature": "restecg",
        "label": "Resting ECG",
        "group": "vitals",
        "mean_abs_shap": 0.17244896267535875,
        "mean_signed_shap": 0.014950510927219959
      },
      {
        "feature": "trestbps",
        "label": "Resting blood pressure",
        "group": "vitals",
        "mean_abs_shap": 0.12723155514363638,
        "mean_signed_shap": 0.038663597343961104
      },
      {
        "feature": "chol",
        "label": "Serum cholesterol",
        "group": "labs",
        "mean_abs_shap": 0.09714978166064031,
        "mean_signed_shap": -0.04621538426824853
      },
      {
        "feature": "fbs",
        "label": "Fasting blood sugar > 120 mg/dL",
        "group": "labs",
        "mean_abs_shap": 0.0774998311522798,
        "mean_signed_shap": -0.01046475215167771
      },
      {
        "feature": "age",
        "label": "Age",
        "group": "demographics",
        "mean_abs_shap": 0.00019459722509580774,
        "mean_signed_shap": 4.187100786893923e-05
      }
    ]
  },
  "heart_failure": {
    "model": "random_forest",
    "model_label": "Random Forest",
    "base_value": 0.3201255230125521,
    "features": [
      {
        "feature": "serum_creatinine",
        "label": "Serum creatinine",
        "group": "labs",
        "mean_abs_shap": 0.10945085296312536,
        "mean_signed_shap": 0.011694842302649798
      },
      {
        "feature": "ejection_fraction",
        "label": "Ejection fraction",
        "group": "vitals",
        "mean_abs_shap": 0.07762181757870984,
        "mean_signed_shap": -0.02186972388738755
      },
      {
        "feature": "age",
        "label": "Age",
        "group": "demographics",
        "mean_abs_shap": 0.042364730520133606,
        "mean_signed_shap": 0.006729940895866497
      },
      {
        "feature": "serum_sodium",
        "label": "Serum sodium",
        "group": "labs",
        "mean_abs_shap": 0.03631826972521232,
        "mean_signed_shap": 0.003075480086802791
      },
      {
        "feature": "platelets",
        "label": "Platelet count",
        "group": "labs",
        "mean_abs_shap": 0.0297005817383844,
        "mean_signed_shap": -0.0014905271464906457
      },
      {
        "feature": "high_blood_pressure",
        "label": "Hypertension",
        "group": "history",
        "mean_abs_shap": 0.018747600508566407,
        "mean_signed_shap": -0.004818721598148689
      },
      {
        "feature": "anaemia",
        "label": "Anaemia",
        "group": "labs",
        "mean_abs_shap": 0.015988885486035137,
        "mean_signed_shap": -0.0021766879791541034
      },
      {
        "feature": "creatinine_phosphokinase",
        "label": "Creatinine phosphokinase (CPK)",
        "group": "labs",
        "mean_abs_shap": 0.014097609730383234,
        "mean_signed_shap": -0.0008343920169856633
      },
      {
        "feature": "diabetes",
        "label": "Diabetes",
        "group": "history",
        "mean_abs_shap": 0.011249451520181865,
        "mean_signed_shap": -0.004445476787550812
      },
      {
        "feature": "smoking",
        "label": "Smoker",
        "group": "history",
        "mean_abs_shap": 0.008278210192192884,
        "mean_signed_shap": -0.00039846971718854416
      },
      {
        "feature": "sex",
        "label": "Sex",
        "group": "demographics",
        "mean_abs_shap": 0.005242550419216044,
        "mean_signed_shap": -0.0017794544879995073
      }
    ]
  },
  "diabetes": {
    "model": "random_forest",
    "model_label": "Random Forest",
    "base_value": 0.49705329323273545,
    "features": [
      {
        "feature": "Glucose",
        "label": "Plasma glucose (2-hour OGTT)",
        "group": "labs",
        "mean_abs_shap": 0.16183296005132017,
        "mean_signed_shap": -0.03275906213408813
      },
      {
        "feature": "BMI",
        "label": "Body mass index",
        "group": "vitals",
        "mean_abs_shap": 0.08767731298011937,
        "mean_signed_shap": -0.022154480962009435
      },
      {
        "feature": "Age",
        "label": "Age",
        "group": "demographics",
        "mean_abs_shap": 0.06132192398702352,
        "mean_signed_shap": -0.009096432019234543
      },
      {
        "feature": "Insulin",
        "label": "2-hour serum insulin",
        "group": "labs",
        "mean_abs_shap": 0.03057469071831055,
        "mean_signed_shap": -0.005010454563073612
      },
      {
        "feature": "DiabetesPedigreeFunction",
        "label": "Diabetes pedigree function",
        "group": "demographics",
        "mean_abs_shap": 0.02600705316495469,
        "mean_signed_shap": -0.0070289512370251975
      },
      {
        "feature": "Pregnancies",
        "label": "Number of pregnancies",
        "group": "demographics",
        "mean_abs_shap": 0.015329371962772701,
        "mean_signed_shap": -0.0004623688367246847
      },
      {
        "feature": "SkinThickness",
        "label": "Triceps skin fold thickness",
        "group": "vitals",
        "mean_abs_shap": 0.012586361145584188,
        "mean_signed_shap": -0.0014886825770464803
      },
      {
        "feature": "BloodPressure",
        "label": "Diastolic blood pressure",
        "group": "vitals",
        "mean_abs_shap": 0.004781984445322373,
        "mean_signed_shap": -0.0003959580420888059
      }
    ]
  },
  "kidney_disease": {
    "model": "random_forest",
    "model_label": "Random Forest",
    "base_value": 0.6251666666666666,
    "features": [
      {
        "feature": "sg",
        "label": "Urine specific gravity",
        "group": "labs",
        "mean_abs_shap": 0.079473790124266,
        "mean_signed_shap": -0.008236328505197633
      },
      {
        "feature": "rbc",
        "label": "Red blood cells (urine microscopy)",
        "group": "labs",
        "mean_abs_shap": 0.06652798208913394,
        "mean_signed_shap": -0.0018864241923695715
      },
      {
        "feature": "hemo",
        "label": "Haemoglobin",
        "group": "labs",
        "mean_abs_shap": 0.06590528824812454,
        "mean_signed_shap": -0.007697188777825326
      },
      {
        "feature": "pcv",
        "label": "Packed cell volume",
        "group": "labs",
        "mean_abs_shap": 0.058667979144210534,
        "mean_signed_shap": -0.015310337456767183
      },
      {
        "feature": "al",
        "label": "Urine albumin",
        "group": "labs",
        "mean_abs_shap": 0.057777838967961515,
        "mean_signed_shap": 0.004668574567142322
      },
      {
        "feature": "sc",
        "label": "Serum creatinine",
        "group": "labs",
        "mean_abs_shap": 0.05504010567222524,
        "mean_signed_shap": -0.00458749284792434
      },
      {
        "feature": "htn",
        "label": "Hypertension",
        "group": "history",
        "mean_abs_shap": 0.031250098103633245,
        "mean_signed_shap": -0.0026340101520218257
      },
      {
        "feature": "dm",
        "label": "Diabetes mellitus",
        "group": "history",
        "mean_abs_shap": 0.02511372073545808,
        "mean_signed_shap": 0.004158374853001359
      },
      {
        "feature": "bgr",
        "label": "Random blood glucose",
        "group": "labs",
        "mean_abs_shap": 0.019294508103816322,
        "mean_signed_shap": 0.003950206119796433
      },
      {
        "feature": "rbcc",
        "label": "Red blood cell count",
        "group": "labs",
        "mean_abs_shap": 0.01560482362075603,
        "mean_signed_shap": -0.0022637534133484825
      },
      {
        "feature": "sod",
        "label": "Serum sodium",
        "group": "labs",
        "mean_abs_shap": 0.015033728272723354,
        "mean_signed_shap": -0.003947809588149951
      },
      {
        "feature": "pc",
        "label": "Pus cells",
        "group": "labs",
        "mean_abs_shap": 0.009843524686080655,
        "mean_signed_shap": -0.000815655736525972
      },
      {
        "feature": "bu",
        "label": "Blood urea",
        "group": "labs",
        "mean_abs_shap": 0.008050410808497287,
        "mean_signed_shap": -0.0024978031572058792
      },
      {
        "feature": "appet",
        "label": "Appetite",
        "group": "vitals",
        "mean_abs_shap": 0.0068446449527051435,
        "mean_signed_shap": 0.0021132390799875086
      },
      {
        "feature": "pe",
        "label": "Pedal oedema",
        "group": "vitals",
        "mean_abs_shap": 0.00486224418122601,
        "mean_signed_shap": 0.002522365788010963
      },
      {
        "feature": "bp",
        "label": "Blood pressure",
        "group": "vitals",
        "mean_abs_shap": 0.003942301999857776,
        "mean_signed_shap": -0.0005649511966420763
      },
      {
        "feature": "su",
        "label": "Urine sugar",
        "group": "labs",
        "mean_abs_shap": 0.003486576962962362,
        "mean_signed_shap": 0.0012036590282899413
      },
      {
        "feature": "pot",
        "label": "Serum potassium",
        "group": "labs",
        "mean_abs_shap": 0.0028545987994711155,
        "mean_signed_shap": -0.000523187650842634
      },
      {
        "feature": "age",
        "label": "Age",
        "group": "demographics",
        "mean_abs_shap": 0.002421331011405201,
        "mean_signed_shap": -0.0007486493571286373
      },
      {
        "feature": "wbcc",
        "label": "White blood cell count",
        "group": "labs",
        "mean_abs_shap": 0.0016549249357772412,
        "mean_signed_shap": -0.00028497954206552846
      },
      {
        "feature": "ane",
        "label": "Anaemia",
        "group": "labs",
        "mean_abs_shap": 0.0013347189816284354,
        "mean_signed_shap": 5.6727859777820676e-05
      },
      {
        "feature": "pcc",
        "label": "Pus cell clumps",
        "group": "labs",
        "mean_abs_shap": 0.0006084129921186808,
        "mean_signed_shap": -0.0003594341575096169
      },
      {
        "feature": "cad",
        "label": "Coronary artery disease",
        "group": "history",
        "mean_abs_shap": 0.00033461118049602574,
        "mean_signed_shap": -0.00010618271333629075
      },
      {
        "feature": "ba",
        "label": "Bacteria",
        "group": "labs",
        "mean_abs_shap": 0.0002813136549020641,
        "mean_signed_shap": -2.745909739759876e-05
      }
    ]
  },
  "breast_cancer": {
    "model": "logistic_regression",
    "model_label": "Logistic Regression",
    "base_value": 0.9557150398937644,
    "features": [
      {
        "feature": "texture3",
        "label": "Texture (grey-scale s.d.) (worst)",
        "group": "morphology_worst",
        "mean_abs_shap": 1.2417737887968778,
        "mean_signed_shap": -0.3815753722277295
      },
      {
        "feature": "radius2",
        "label": "Radius (variability)",
        "group": "morphology_se",
        "mean_abs_shap": 0.7674147442981099,
        "mean_signed_shap": -0.16100581743181555
      },
      {
        "feature": "symmetry3",
        "label": "Symmetry (worst)",
        "group": "morphology_worst",
        "mean_abs_shap": 0.7391408591432406,
        "mean_signed_shap": -0.08997309307686842
      },
      {
        "feature": "concave_points1",
        "label": "Concave points (mean)",
        "group": "morphology_mean",
        "mean_abs_shap": 0.7242774055271437,
        "mean_signed_shap": -0.12570437335208062
      },
      {
        "feature": "radius3",
        "label": "Radius (worst)",
        "group": "morphology_worst",
        "mean_abs_shap": 0.7122307120047473,
        "mean_signed_shap": -0.21048845539655378
      },
      {
        "feature": "area3",
        "label": "Area (worst)",
        "group": "morphology_worst",
        "mean_abs_shap": 0.7025224731697136,
        "mean_signed_shap": -0.21232564999453393
      },
      {
        "feature": "compactness2",
        "label": "Compactness (variability)",
        "group": "morphology_se",
        "mean_abs_shap": 0.6954892744346172,
        "mean_signed_shap": -0.04790580098167834
      },
      {
        "feature": "concavity3",
        "label": "Concavity (worst)",
        "group": "morphology_worst",
        "mean_abs_shap": 0.6930946004214622,
        "mean_signed_shap": -0.1292048721456778
      },
      {
        "feature": "concave_points3",
        "label": "Concave points (worst)",
        "group": "morphology_worst",
        "mean_abs_shap": 0.5699027200006797,
        "mean_signed_shap": -0.16144698401488145
      },
      {
        "feature": "concavity1",
        "label": "Concavity (mean)",
        "group": "morphology_mean",
        "mean_abs_shap": 0.5662404937986272,
        "mean_signed_shap": -0.0621215779921513
      },
      {
        "feature": "perimeter3",
        "label": "Perimeter (worst)",
        "group": "morphology_worst",
        "mean_abs_shap": 0.5636839125894146,
        "mean_signed_shap": -0.1588394708485024
      },
      {
        "feature": "area2",
        "label": "Area (variability)",
        "group": "morphology_se",
        "mean_abs_shap": 0.495502422351412,
        "mean_signed_shap": -0.12475313954378936
      },
      {
        "feature": "perimeter2",
        "label": "Perimeter (variability)",
        "group": "morphology_se",
        "mean_abs_shap": 0.43246141769296376,
        "mean_signed_shap": -0.07522521694668145
      },
      {
        "feature": "texture1",
        "label": "Texture (grey-scale s.d.) (mean)",
        "group": "morphology_mean",
        "mean_abs_shap": 0.39179121624713653,
        "mean_signed_shap": -0.08194250866844828
      },
      {
        "feature": "fractal_dimension2",
        "label": "Fractal dimension (variability)",
        "group": "morphology_se",
        "mean_abs_shap": 0.3821033948327859,
        "mean_signed_shap": -0.01237797855839867
      },
      {
        "feature": "concave_points2",
        "label": "Concave points (variability)",
        "group": "morphology_se",
        "mean_abs_shap": 0.34486073266942513,
        "mean_signed_shap": -0.0019074239722634177
      },
      {
        "feature": "compactness1",
        "label": "Compactness (mean)",
        "group": "morphology_mean",
        "mean_abs_shap": 0.33269190617249444,
        "mean_signed_shap": 0.02788903170236679
      },
      {
        "feature": "area1",
        "label": "Area (mean)",
        "group": "morphology_mean",
        "mean_abs_shap": 0.33026914759964787,
        "mean_signed_shap": -0.07313956579314901
      },
      {
        "feature": "texture2",
        "label": "Texture (grey-scale s.d.) (variability)",
        "group": "morphology_se",
        "mean_abs_shap": 0.32016833661751676,
        "mean_signed_shap": 0.003351454638066943
      },
      {
        "feature": "smoothness3",
        "label": "Smoothness (worst)",
        "group": "morphology_worst",
        "mean_abs_shap": 0.2783441456910257,
        "mean_signed_shap": -0.05223626889223574
      },
      {
        "feature": "radius1",
        "label": "Radius (mean)",
        "group": "morphology_mean",
        "mean_abs_shap": 0.2702450270744507,
        "mean_signed_shap": -0.06074828394437086
      },
      {
        "feature": "perimeter1",
        "label": "Perimeter (mean)",
        "group": "morphology_mean",
        "mean_abs_shap": 0.2635689011613589,
        "mean_signed_shap": -0.057188101305771864
      },
      {
        "feature": "smoothness1",
        "label": "Smoothness (mean)",
        "group": "morphology_mean",
        "mean_abs_shap": 0.24742491830271854,
        "mean_signed_shap": -0.007562348481969198
      },
      {
        "feature": "symmetry2",
        "label": "Symmetry (variability)",
        "group": "morphology_se",
        "mean_abs_shap": 0.21731216790563765,
        "mean_signed_shap": -0.08122984126099796
      },
      {
        "feature": "smoothness2",
        "label": "Smoothness (variability)",
        "group": "morphology_se",
        "mean_abs_shap": 0.2087386753750365,
        "mean_signed_shap": 0.062477153086021114
      },
      {
        "feature": "compactness3",
        "label": "Compactness (worst)",
        "group": "morphology_worst",
        "mean_abs_shap": 0.13121546935966263,
        "mean_signed_shap": 0.021774980449759253
      },
      {
        "feature": "symmetry1",
        "label": "Symmetry (mean)",
        "group": "morphology_mean",
        "mean_abs_shap": 0.12798429902125597,
        "mean_signed_shap": 0.017044123400876465
      },
      {
        "feature": "concavity2",
        "label": "Concavity (variability)",
        "group": "morphology_se",
        "mean_abs_shap": 0.056699884440473254,
        "mean_signed_shap": -0.0014035914101759635
      },
      {
        "feature": "fractal_dimension1",
        "label": "Fractal dimension (mean)",
        "group": "morphology_mean",
        "mean_abs_shap": 0.05176523790573582,
        "mean_signed_shap": -0.003948559881976766
      },
      {
        "feature": "fractal_dimension3",
        "label": "Fractal dimension (worst)",
        "group": "morphology_worst",
        "mean_abs_shap": 0.045340133369262056,
        "mean_signed_shap": -0.007812247270146501
      }
    ]
  },
  "breast_cancer_recurrence": {
    "model": "random_forest",
    "model_label": "Random Forest",
    "base_value": 0.30095029239766086,
    "features": [
      {
        "feature": "deg-malig",
        "label": "Histological grade",
        "group": "tumour",
        "mean_abs_shap": 0.06743752577525455,
        "mean_signed_shap": 0.0075112643759101694
      },
      {
        "feature": "inv-nodes",
        "label": "Involved axillary nodes (band midpoint)",
        "group": "tumour",
        "mean_abs_shap": 0.053625206512244276,
        "mean_signed_shap": -0.0020418522472661167
      },
      {
        "feature": "tumor-size",
        "label": "Tumour size (band midpoint)",
        "group": "tumour",
        "mean_abs_shap": 0.0377622833100287,
        "mean_signed_shap": 0.004259614311478081
      },
      {
        "feature": "node-caps",
        "label": "Node capsular invasion",
        "group": "tumour",
        "mean_abs_shap": 0.03316255309705939,
        "mean_signed_shap": -0.003297675810229878
      },
      {
        "feature": "irradiat",
        "label": "Received radiotherapy",
        "group": "history",
        "mean_abs_shap": 0.023446997090579787,
        "mean_signed_shap": 0.001719187436991561
      },
      {
        "feature": "breast-quad",
        "label": "Quadrant",
        "group": "tumour",
        "mean_abs_shap": 0.022427707768657257,
        "mean_signed_shap": -0.0009699967530193373
      },
      {
        "feature": "age",
        "label": "Age band (midpoint)",
        "group": "demographics",
        "mean_abs_shap": 0.007565846291942595,
        "mean_signed_shap": 0.001648191390133291
      },
      {
        "feature": "breast",
        "label": "Affected breast",
        "group": "tumour",
        "mean_abs_shap": 0.007453311268800377,
        "mean_signed_shap": -0.0013055285727988162
      },
      {
        "feature": "menopause",
        "label": "Menopausal status",
        "group": "demographics",
        "mean_abs_shap": 0.005006363498740653,
        "mean_signed_shap": 0.0004092822112027732
      }
    ]
  },
  "breast_cancer_survival": {
    "model": "random_forest",
    "model_label": "Random Forest",
    "base_value": 0.4971965337278609,
    "features": [
      {
        "feature": "positive_auxillary_nodes",
        "label": "Positive axillary nodes",
        "group": "tumour",
        "mean_abs_shap": 0.14344029287658405,
        "mean_signed_shap": -0.07214901217596124
      },
      {
        "feature": "age",
        "label": "Age at operation",
        "group": "demographics",
        "mean_abs_shap": 0.044206653582785034,
        "mean_signed_shap": -0.026308727499778896
      },
      {
        "feature": "operation_year",
        "label": "Year of operation",
        "group": "demographics",
        "mean_abs_shap": 0.033649399130293904,
        "mean_signed_shap": -0.007271915712017363
      }
    ]
  },
  "cervical_cancer": {
    "model": "logistic_regression",
    "model_label": "Logistic Regression",
    "base_value": -0.20398080595925236,
    "features": [
      {
        "feature": "Hormonal Contraceptives (years)",
        "label": "Years on hormonal contraceptives",
        "group": "history",
        "mean_abs_shap": 0.07273099861601544,
        "mean_signed_shap": 0.015522974816729679
      },
      {
        "feature": "Num of pregnancies",
        "label": "Number of pregnancies",
        "group": "demographics",
        "mean_abs_shap": 0.07164440760780104,
        "mean_signed_shap": -0.0015145628425366296
      },
      {
        "feature": "IUD",
        "label": "Intrauterine device",
        "group": "history",
        "mean_abs_shap": 0.05938020483944963,
        "mean_signed_shap": -0.002579399391479387
      },
      {
        "feature": "Age",
        "label": "Age",
        "group": "demographics",
        "mean_abs_shap": 0.04967891719126661,
        "mean_signed_shap": -0.001163757295240851
      },
      {
        "feature": "STDs:vulvo-perineal condylomatosis",
        "label": "Vulvo-perineal condylomatosis",
        "group": "sti_history",
        "mean_abs_shap": 0.039264467585706044,
        "mean_signed_shap": 0.013658070496901292
      },
      {
        "feature": "Smokes (years)",
        "label": "Years smoked",
        "group": "history",
        "mean_abs_shap": 0.03781167850232726,
        "mean_signed_shap": -0.007824329634449153
      },
      {
        "feature": "STDs:condylomatosis",
        "label": "Condylomatosis",
        "group": "sti_history",
        "mean_abs_shap": 0.03465806572144292,
        "mean_signed_shap": 0.012055742354750038
      },
      {
        "feature": "STDs",
        "label": "Any sexually transmitted infection",
        "group": "sti_history",
        "mean_abs_shap": 0.028073080625032356,
        "mean_signed_shap": 0.010671111501149882
      },
      {
        "feature": "STDs:syphilis",
        "label": "Syphilis",
        "group": "sti_history",
        "mean_abs_shap": 0.024697207538333654,
        "mean_signed_shap": -0.02120488437245591
      },
      {
        "feature": "STDs (number)",
        "label": "Number of STIs",
        "group": "sti_history",
        "mean_abs_shap": 0.022534273479976403,
        "mean_signed_shap": 0.00914843696728068
      },
      {
        "feature": "STDs: Number of diagnosis",
        "label": "Number of STI diagnoses",
        "group": "sti_history",
        "mean_abs_shap": 0.022505111948388855,
        "mean_signed_shap": 0.00880257750582455
      },
      {
        "feature": "First sexual intercourse",
        "label": "Age at first intercourse",
        "group": "sti_history",
        "mean_abs_shap": 0.022439714410531164,
        "mean_signed_shap": 0.0038422076882562357
      },
      {
        "feature": "IUD (years)",
        "label": "Years with an IUD",
        "group": "history",
        "mean_abs_shap": 0.02238584429374139,
        "mean_signed_shap": -0.0018626137340844325
      },
      {
        "feature": "Dx:HPV",
        "label": "Previous HPV diagnosis",
        "group": "diagnoses",
        "mean_abs_shap": 0.021785851600602632,
        "mean_signed_shap": -0.012081244978515994
      },
      {
        "feature": "Dx:CIN",
        "label": "Previous cervical intraepithelial neoplasia",
        "group": "diagnoses",
        "mean_abs_shap": 0.02172468291863277,
        "mean_signed_shap": -0.00579324877830208
      },
      {
        "feature": "Dx",
        "label": "Any previous diagnosis",
        "group": "diagnoses",
        "mean_abs_shap": 0.020771369534082585,
        "mean_signed_shap": -0.00932351246132117
      },
      {
        "feature": "Dx:Cancer",
        "label": "Previous cancer diagnosis",
        "group": "diagnoses",
        "mean_abs_shap": 0.02068894320913932,
        "mean_signed_shap": -0.011472959415977245
      },
      {
        "feature": "STDs:HIV",
        "label": "HIV",
        "group": "sti_history",
        "mean_abs_shap": 0.016026497982462275,
        "mean_signed_shap": -0.004305626323646585
      },
      {
        "feature": "STDs:vaginal condylomatosis",
        "label": "Vaginal condylomatosis",
        "group": "sti_history",
        "mean_abs_shap": 0.01580629817684684,
        "mean_signed_shap": -0.015806298176846822
      },
      {
        "feature": "Number of sexual partners",
        "label": "Number of sexual partners",
        "group": "sti_history",
        "mean_abs_shap": 0.005069705573003354,
        "mean_signed_shap": -0.00020597043417827667
      },
      {
        "feature": "Hormonal Contraceptives",
        "label": "Hormonal contraceptives",
        "group": "history",
        "mean_abs_shap": 0.003441791174386885,
        "mean_signed_shap": -0.00017046155510319017
      },
      {
        "feature": "Smokes",
        "label": "Smokes",
        "group": "history",
        "mean_abs_shap": 0.0027718235716641133,
        "mean_signed_shap": -4.245681619616777e-05
      },
      {
        "feature": "STDs:molluscum contagiosum",
        "label": "Molluscum contagiosum",
        "group": "sti_history",
        "mean_abs_shap": 0.0021816195960096692,
        "mean_signed_shap": 0.0021816195960096692
      },
      {
        "feature": "Smokes (packs/year)",
        "label": "Pack-years",
        "group": "history",
        "mean_abs_shap": 0.00084885071219616,
        "mean_signed_shap": 0.00023813018328638932
      },
      {
        "feature": "STDs:HPV",
        "label": "HPV",
        "group": "sti_history",
        "mean_abs_shap": 1.1247331666311871e-17,
        "mean_signed_shap": 1.1247331666311871e-17
      },
      {
        "feature": "STDs:Hepatitis B",
        "label": "Hepatitis B",
        "group": "sti_history",
        "mean_abs_shap": 3.2977424140203673e-18,
        "mean_signed_shap": 3.2977424140203673e-18
      },
      {
        "feature": "STDs:pelvic inflammatory disease",
        "label": "Pelvic inflammatory disease",
        "group": "sti_history",
        "mean_abs_shap": 2.09274943662965e-18,
        "mean_signed_shap": 2.09274943662965e-18
      },
      {
        "feature": "STDs:genital herpes",
        "label": "Genital herpes",
        "group": "sti_history",
        "mean_abs_shap": 0.0,
        "mean_signed_shap": 0.0
      }
    ]
  },
  "lung_cancer_surgery": {
    "model": "logistic_regression",
    "model_label": "Logistic Regression",
    "base_value": -0.02452589160461008,
    "features": [
      {
        "feature": "PRE14",
        "label": "Tumour size (clinical T stage)",
        "group": "tumour",
        "mean_abs_shap": 0.15049900692471727,
        "mean_signed_shap": -0.0022541701477710742
      },
      {
        "feature": "PRE30",
        "label": "Smoker",
        "group": "history",
        "mean_abs_shap": 0.09845693602711168,
        "mean_signed_shap": -0.00028332931230824364
      },
      {
        "feature": "PRE9",
        "label": "Dyspnoea before surgery",
        "group": "vitals",
        "mean_abs_shap": 0.09359537816851117,
        "mean_signed_shap": -0.009623186769438456
      },
      {
        "feature": "PRE5",
        "label": "FEV1",
        "group": "vitals",
        "mean_abs_shap": 0.06343373261914713,
        "mean_signed_shap": -0.001297859788578521
      },
      {
        "feature": "PRE8",
        "label": "Haemoptysis before surgery",
        "group": "vitals",
        "mean_abs_shap": 0.06283986379465108,
        "mean_signed_shap": 0.01030706760653008
      },
      {
        "feature": "PRE17",
        "label": "Type 2 diabetes",
        "group": "history",
        "mean_abs_shap": 0.05683234965888327,
        "mean_signed_shap": 0.01576023141800964
      },
      {
        "feature": "PRE11",
        "label": "Weakness before surgery",
        "group": "vitals",
        "mean_abs_shap": 0.05563507730636327,
        "mean_signed_shap": 0.0020605584187542063
      },
      {
        "feature": "PRE6",
        "label": "Performance status (Zubrod)",
        "group": "vitals",
        "mean_abs_shap": 0.050671640969854596,
        "mean_signed_shap": -0.011913226228019
      },
      {
        "feature": "PRE10",
        "label": "Cough before surgery",
        "group": "vitals",
        "mean_abs_shap": 0.03608268720784712,
        "mean_signed_shap": -0.00522249420113576
      },
      {
        "feature": "PRE4",
        "label": "Forced vital capacity (FVC)",
        "group": "vitals",
        "mean_abs_shap": 0.03466584200056073,
        "mean_signed_shap": -0.0025540054868671467
      },
      {
        "feature": "DGN",
        "label": "Diagnosis (ICD-10 group)",
        "group": "tumour",
        "mean_abs_shap": 0.03305376982749373,
        "mean_signed_shap": -0.011223058545052986
      },
      {
        "feature": "PRE7",
        "label": "Pain before surgery",
        "group": "vitals",
        "mean_abs_shap": 0.03097849851272714,
        "mean_signed_shap": 0.010406839344119269
      },
      {
        "feature": "PRE25",
        "label": "Peripheral arterial disease",
        "group": "history",
        "mean_abs_shap": 0.01869145467216845,
        "mean_signed_shap": -0.011023165575894217
      },
      {
        "feature": "AGE",
        "label": "Age at surgery",
        "group": "demographics",
        "mean_abs_shap": 0.015564694170000235,
        "mean_signed_shap": -0.00449149048390894
      },
      {
        "feature": "PRE32",
        "label": "Asthma",
        "group": "history",
        "mean_abs_shap": 4.72070803678739e-18,
        "mean_signed_shap": -4.72070803678739e-18
      },
      {
        "feature": "PRE19",
        "label": "Myocardial infarction within 6 months",
        "group": "history",
        "mean_abs_shap": 0.0,
        "mean_signed_shap": 0.0
      }
    ]
  }
};

export const STATIC_CASE_STUDIES: Record<string, CaseStudies> = {
  "heart_disease": {
    "model": "logistic_regression",
    "model_label": "Logistic Regression",
    "cases": [
      {
        "case": "true_positive",
        "case_label": "True positive (correctly flagged)",
        "test_index": 41,
        "actual": 1,
        "probability": 0.9881370378457519,
        "patient": {
          "age": 58.0,
          "sex": 1.0,
          "cp": 4.0,
          "trestbps": 128.0,
          "chol": 216.0,
          "fbs": 0.0,
          "restecg": 2.0,
          "thalach": 131.0,
          "exang": 1.0,
          "oldpeak": 2.2,
          "slope": 2.0,
          "ca": 3.0,
          "thal": 7.0
        },
        "patient_display": {
          "age": "58 years",
          "sex": "Male",
          "cp": "Asymptomatic",
          "trestbps": "128 mm Hg",
          "chol": "216 mg/dL",
          "fbs": "No",
          "restecg": "Left ventricular hypertrophy",
          "thalach": "131 bpm",
          "exang": "Yes",
          "oldpeak": "2.2 mm",
          "slope": "Flat",
          "ca": "3",
          "thal": "Reversible defect"
        },
        "shap_values": {
          "age": -6.280651180340883e-05,
          "sex": 0.32485877240492317,
          "cp": 0.35435559511230597,
          "trestbps": -0.028740739931169483,
          "chol": -0.08918934804630689,
          "fbs": 0.04008960606898751,
          "restecg": 0.18961984651256183,
          "thalach": 0.24823715598489532,
          "exang": 0.47431471806734454,
          "oldpeak": 0.24593022525693914,
          "slope": 0.17473590423658333,
          "ca": 2.0058038157496823,
          "thal": 0.6497288298342598
        },
        "lime_explanation": [
          [
            "ca",
            0.17924836215076828
          ],
          [
            "cp",
            0.13406403893711105
          ],
          [
            "thal",
            0.1071658668424556
          ],
          [
            "thalach",
            0.09903320560055921
          ],
          [
            "exang",
            0.07753494961062858
          ],
          [
            "oldpeak",
            0.06013551416879203
          ],
          [
            "sex",
            0.052618535389389515
          ],
          [
            "fbs",
            0.052488758417520306
          ]
        ],
        "top_factors": [
          {
            "feature": "ca",
            "label": "Major vessels coloured by fluoroscopy",
            "value": 3.0,
            "value_display": "3",
            "shap_value": 2.0058038157496823,
            "direction": "increases",
            "level": "",
            "sentence": "Major vessels coloured by fluoroscopy of 3 pushed this prediction toward \u201cHeart disease present\u201d."
          },
          {
            "feature": "thal",
            "label": "Thallium perfusion scan",
            "value": 7.0,
            "value_display": "Reversible defect",
            "shap_value": 0.6497288298342598,
            "direction": "increases",
            "level": "",
            "sentence": "Thallium perfusion scan of Reversible defect pushed this prediction toward \u201cHeart disease present\u201d."
          },
          {
            "feature": "exang",
            "label": "Exercise-induced angina",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.47431471806734454,
            "direction": "increases",
            "level": "",
            "sentence": "Exercise-induced angina of Yes pushed this prediction toward \u201cHeart disease present\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cHeart disease present\u201d (99%). Raising the estimate: Major vessels coloured by fluoroscopy (3), Thallium perfusion scan (Reversible defect), Exercise-induced angina (Yes).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "true_negative",
        "case_label": "True negative (correctly cleared)",
        "test_index": 11,
        "actual": 0,
        "probability": 0.04170018523518834,
        "patient": {
          "age": 58.0,
          "sex": 0.0,
          "cp": 1.0,
          "trestbps": 150.0,
          "chol": 283.0,
          "fbs": 1.0,
          "restecg": 2.0,
          "thalach": 162.0,
          "exang": 0.0,
          "oldpeak": 1.0,
          "slope": 1.0,
          "ca": 0.0,
          "thal": 3.0
        },
        "patient_display": {
          "age": "58 years",
          "sex": "Female",
          "cp": "Typical angina",
          "trestbps": "150 mm Hg",
          "chol": "283 mg/dL",
          "fbs": "Yes",
          "restecg": "Left ventricular hypertrophy",
          "thalach": "162 bpm",
          "exang": "No",
          "oldpeak": "1.0 mm",
          "slope": "Upsloping",
          "ca": "0",
          "thal": "Normal"
        },
        "shap_values": {
          "age": -6.280651180340883e-05,
          "sex": -0.659561750034238,
          "cp": -0.9744778865588413,
          "trestbps": 0.19627572928083356,
          "chol": 0.06889759161249104,
          "fbs": -0.2682919790770703,
          "restecg": 0.18961984651256183,
          "thalach": -0.13595414883446338,
          "exang": -0.22320692614933865,
          "oldpeak": 0.023704118097054378,
          "slope": -0.19704261541572154,
          "ca": -0.45028248924992864,
          "thal": -0.5369904940639317
        },
        "lime_explanation": [
          [
            "cp",
            -0.1702359648363683
          ],
          [
            "ca",
            -0.12666723406123176
          ],
          [
            "thal",
            -0.10637660017099729
          ],
          [
            "exang",
            -0.08817607364745117
          ],
          [
            "sex",
            -0.06713742857499393
          ],
          [
            "trestbps",
            0.06356105849279228
          ],
          [
            "fbs",
            -0.057847688886074985
          ],
          [
            "chol",
            0.049611611744464136
          ]
        ],
        "top_factors": [
          {
            "feature": "cp",
            "label": "Chest pain type",
            "value": 1.0,
            "value_display": "Typical angina",
            "shap_value": -0.9744778865588413,
            "direction": "decreases",
            "level": "",
            "sentence": "Chest pain type of Typical angina pushed this prediction toward \u201cNo heart disease\u201d."
          },
          {
            "feature": "sex",
            "label": "Sex",
            "value": 0.0,
            "value_display": "Female",
            "shap_value": -0.659561750034238,
            "direction": "decreases",
            "level": "",
            "sentence": "Sex of Female pushed this prediction toward \u201cNo heart disease\u201d."
          },
          {
            "feature": "thal",
            "label": "Thallium perfusion scan",
            "value": 3.0,
            "value_display": "Normal",
            "shap_value": -0.5369904940639317,
            "direction": "decreases",
            "level": "",
            "sentence": "Thallium perfusion scan of Normal pushed this prediction toward \u201cNo heart disease\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cHeart disease present\u201d (4%). Lowering it: Chest pain type (Typical angina), Sex (Female), Thallium perfusion scan (Normal).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "false_positive",
        "case_label": "False positive (unnecessary referral)",
        "test_index": 40,
        "actual": 0,
        "probability": 0.937994619300728,
        "patient": {
          "age": 62.0,
          "sex": 1.0,
          "cp": 3.0,
          "trestbps": 130.0,
          "chol": 231.0,
          "fbs": 0.0,
          "restecg": 0.0,
          "thalach": 146.0,
          "exang": 0.0,
          "oldpeak": 1.8,
          "slope": 2.0,
          "ca": 3.0,
          "thal": 7.0
        },
        "patient_display": {
          "age": "62 years",
          "sex": "Male",
          "cp": "Non-anginal pain",
          "trestbps": "130 mm Hg",
          "chol": "231 mg/dL",
          "fbs": "No",
          "restecg": "Normal",
          "thalach": "146 bpm",
          "exang": "No",
          "oldpeak": "1.8 mm",
          "slope": "Flat",
          "ca": "3",
          "thal": "Reversible defect"
        },
        "shap_values": {
          "age": -0.0001674840314757569,
          "sex": 0.32485877240492317,
          "cp": -0.08858889877807648,
          "trestbps": -0.008284697275532842,
          "chol": -0.05379674961523273,
          "fbs": 0.04008960606898751,
          "restecg": -0.17156081351136543,
          "thalach": 0.0623381375239153,
          "exang": -0.22320692614933865,
          "oldpeak": 0.1718548562036442,
          "slope": 0.17473590423658333,
          "ca": 2.0058038157496823,
          "thal": 0.6497288298342598
        },
        "lime_explanation": [
          [
            "ca",
            0.1875834892768204
          ],
          [
            "thal",
            0.10722821304007668
          ],
          [
            "exang",
            -0.08612370962104757
          ],
          [
            "oldpeak",
            0.06017712816299793
          ],
          [
            "sex",
            0.057332605576014946
          ],
          [
            "fbs",
            0.04918480742375727
          ],
          [
            "restecg",
            -0.02888599189958899
          ],
          [
            "thalach",
            0.018739875564992025
          ]
        ],
        "top_factors": [
          {
            "feature": "ca",
            "label": "Major vessels coloured by fluoroscopy",
            "value": 3.0,
            "value_display": "3",
            "shap_value": 2.0058038157496823,
            "direction": "increases",
            "level": "",
            "sentence": "Major vessels coloured by fluoroscopy of 3 pushed this prediction toward \u201cHeart disease present\u201d."
          },
          {
            "feature": "thal",
            "label": "Thallium perfusion scan",
            "value": 7.0,
            "value_display": "Reversible defect",
            "shap_value": 0.6497288298342598,
            "direction": "increases",
            "level": "",
            "sentence": "Thallium perfusion scan of Reversible defect pushed this prediction toward \u201cHeart disease present\u201d."
          },
          {
            "feature": "sex",
            "label": "Sex",
            "value": 1.0,
            "value_display": "Male",
            "shap_value": 0.32485877240492317,
            "direction": "increases",
            "level": "",
            "sentence": "Sex of Male pushed this prediction toward \u201cHeart disease present\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cHeart disease present\u201d (94%). Raising the estimate: Major vessels coloured by fluoroscopy (3), Thallium perfusion scan (Reversible defect), Sex (Male).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "false_negative",
        "case_label": "False negative (missed case)",
        "test_index": 54,
        "actual": 1,
        "probability": 0.3603572862270728,
        "patient": {
          "age": 59.0,
          "sex": 0.0,
          "cp": 4.0,
          "trestbps": 174.0,
          "chol": 249.0,
          "fbs": 0.0,
          "restecg": 0.0,
          "thalach": 143.0,
          "exang": 1.0,
          "oldpeak": 0.0,
          "slope": 2.0,
          "ca": 0.0,
          "thal": 3.0
        },
        "patient_display": {
          "age": "59 years",
          "sex": "Female",
          "cp": "Asymptomatic",
          "trestbps": "174 mm Hg",
          "chol": "249 mg/dL",
          "fbs": "No",
          "restecg": "Normal",
          "thalach": "143 bpm",
          "exang": "Yes",
          "oldpeak": "0.0 mm",
          "slope": "Flat",
          "ca": "0",
          "thal": "Normal"
        },
        "shap_values": {
          "age": -8.897589172149583e-05,
          "sex": -0.659561750034238,
          "cp": 0.35435559511230597,
          "trestbps": 0.4417482411484733,
          "chol": -0.011325631497943734,
          "fbs": 0.04008960606898751,
          "restecg": -0.17156081351136543,
          "thalach": 0.09951794121611132,
          "exang": 0.47431471806734454,
          "oldpeak": -0.16148430453618287,
          "slope": 0.17473590423658333,
          "ca": -0.45028248924992864,
          "thal": -0.5369904940639317
        },
        "lime_explanation": [
          [
            "cp",
            0.13655394411970098
          ],
          [
            "ca",
            -0.12437273180282472
          ],
          [
            "thal",
            -0.10622164823793187
          ],
          [
            "exang",
            0.08303646647008378
          ],
          [
            "trestbps",
            0.06449691766959792
          ],
          [
            "sex",
            -0.058453251873355434
          ],
          [
            "fbs",
            0.04662247156845643
          ],
          [
            "restecg",
            -0.03136758306380214
          ]
        ],
        "top_factors": [
          {
            "feature": "sex",
            "label": "Sex",
            "value": 0.0,
            "value_display": "Female",
            "shap_value": -0.659561750034238,
            "direction": "decreases",
            "level": "",
            "sentence": "Sex of Female pushed this prediction toward \u201cNo heart disease\u201d."
          },
          {
            "feature": "thal",
            "label": "Thallium perfusion scan",
            "value": 3.0,
            "value_display": "Normal",
            "shap_value": -0.5369904940639317,
            "direction": "decreases",
            "level": "",
            "sentence": "Thallium perfusion scan of Normal pushed this prediction toward \u201cNo heart disease\u201d."
          },
          {
            "feature": "exang",
            "label": "Exercise-induced angina",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.47431471806734454,
            "direction": "increases",
            "level": "",
            "sentence": "Exercise-induced angina of Yes pushed this prediction toward \u201cHeart disease present\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cHeart disease present\u201d (36%). Raising the estimate: Exercise-induced angina (Yes). Lowering it: Sex (Female), Thallium perfusion scan (Normal).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "borderline",
        "case_label": "Borderline (p \u2248 0.5)",
        "test_index": 57,
        "actual": 1,
        "probability": 0.5084442169418854,
        "patient": {
          "age": 61.0,
          "sex": 1.0,
          "cp": 1.0,
          "trestbps": 134.0,
          "chol": 234.0,
          "fbs": 0.0,
          "restecg": 0.0,
          "thalach": 145.0,
          "exang": 0.0,
          "oldpeak": 2.6,
          "slope": 2.0,
          "ca": 2.0,
          "thal": 3.0
        },
        "patient_display": {
          "age": "61 years",
          "sex": "Male",
          "cp": "Typical angina",
          "trestbps": "134 mm Hg",
          "chol": "234 mg/dL",
          "fbs": "No",
          "restecg": "Normal",
          "thalach": "145 bpm",
          "exang": "No",
          "oldpeak": "2.6 mm",
          "slope": "Flat",
          "ca": "2",
          "thal": "Normal"
        },
        "shap_values": {
          "age": -0.00014131465155766987,
          "sex": 0.32485877240492317,
          "cp": -0.9744778865588413,
          "trestbps": 0.032627388035740446,
          "chol": -0.0467182299290179,
          "fbs": 0.04008960606898751,
          "restecg": -0.17156081351136543,
          "thalach": 0.07473140542131397,
          "exang": -0.22320692614933865,
          "oldpeak": 0.320005594310234,
          "slope": 0.17473590423658333,
          "ca": 1.187108380749812,
          "thal": -0.5369904940639317
        },
        "lime_explanation": [
          [
            "ca",
            0.18837973929422794
          ],
          [
            "cp",
            -0.17904504639937258
          ],
          [
            "thal",
            -0.10576537033080588
          ],
          [
            "exang",
            -0.08526491371565957
          ],
          [
            "oldpeak",
            0.06770043954729972
          ],
          [
            "sex",
            0.0559167712486213
          ],
          [
            "fbs",
            0.052789862046764405
          ],
          [
            "restecg",
            -0.03431973590733647
          ]
        ],
        "top_factors": [
          {
            "feature": "ca",
            "label": "Major vessels coloured by fluoroscopy",
            "value": 2.0,
            "value_display": "2",
            "shap_value": 1.187108380749812,
            "direction": "increases",
            "level": "",
            "sentence": "Major vessels coloured by fluoroscopy of 2 pushed this prediction toward \u201cHeart disease present\u201d."
          },
          {
            "feature": "cp",
            "label": "Chest pain type",
            "value": 1.0,
            "value_display": "Typical angina",
            "shap_value": -0.9744778865588413,
            "direction": "decreases",
            "level": "",
            "sentence": "Chest pain type of Typical angina pushed this prediction toward \u201cNo heart disease\u201d."
          },
          {
            "feature": "thal",
            "label": "Thallium perfusion scan",
            "value": 3.0,
            "value_display": "Normal",
            "shap_value": -0.5369904940639317,
            "direction": "decreases",
            "level": "",
            "sentence": "Thallium perfusion scan of Normal pushed this prediction toward \u201cNo heart disease\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cHeart disease present\u201d (51%). Raising the estimate: Major vessels coloured by fluoroscopy (2). Lowering it: Chest pain type (Typical angina), Thallium perfusion scan (Normal).",
        "shap_lime_top5_overlap": 0.8
      }
    ]
  },
  "heart_failure": {
    "model": "random_forest",
    "model_label": "Random Forest",
    "cases": [
      {
        "case": "true_positive",
        "case_label": "True positive (correctly flagged)",
        "test_index": 33,
        "actual": 1,
        "probability": 0.7986865079365079,
        "patient": {
          "age": 60.0,
          "sex": 1.0,
          "smoking": 1.0,
          "diabetes": 0.0,
          "high_blood_pressure": 0.0,
          "anaemia": 0.0,
          "ejection_fraction": 20.0,
          "serum_creatinine": 2.9,
          "serum_sodium": 127.0,
          "creatinine_phosphokinase": 68.0,
          "platelets": 119000.0
        },
        "patient_display": {
          "age": "60 years",
          "sex": "Male",
          "smoking": "Yes",
          "diabetes": "No",
          "high_blood_pressure": "No",
          "anaemia": "No",
          "ejection_fraction": "20 %",
          "serum_creatinine": "2.90 mg/dL",
          "serum_sodium": "127 mEq/L",
          "creatinine_phosphokinase": "68 mcg/L",
          "platelets": "119000 platelets/mL"
        },
        "shap_values": {
          "age": -0.009587634762751521,
          "sex": -0.004039994761214772,
          "smoking": -0.0017287551168797635,
          "diabetes": -0.009570223280741277,
          "high_blood_pressure": -0.0026718636024458636,
          "anaemia": -0.00932252797431047,
          "ejection_fraction": 0.2673715790257652,
          "serum_creatinine": 0.14643399458365527,
          "serum_sodium": 0.0859942699974865,
          "creatinine_phosphokinase": -0.022236238184506256,
          "platelets": 0.03791837899989883
        },
        "lime_explanation": [
          [
            "serum_creatinine",
            0.2673448828666052
          ],
          [
            "ejection_fraction",
            0.207072051778631
          ],
          [
            "serum_sodium",
            0.08772774799909257
          ],
          [
            "platelets",
            0.045197049995712175
          ],
          [
            "high_blood_pressure",
            -0.03695486100270013
          ],
          [
            "anaemia",
            -0.02896862499898308
          ],
          [
            "age",
            -0.027847134001188382
          ],
          [
            "smoking",
            0.022788346828829582
          ]
        ],
        "top_factors": [
          {
            "feature": "ejection_fraction",
            "label": "Ejection fraction",
            "value": 20.0,
            "value_display": "20 %",
            "shap_value": 0.2673715790257652,
            "direction": "increases",
            "level": "low",
            "sentence": "Ejection fraction of 20 % (low for this range) pushed this prediction toward \u201cDeath during follow-up\u201d."
          },
          {
            "feature": "serum_creatinine",
            "label": "Serum creatinine",
            "value": 2.9,
            "value_display": "2.90 mg/dL",
            "shap_value": 0.14643399458365527,
            "direction": "increases",
            "level": "low",
            "sentence": "Serum creatinine of 2.90 mg/dL (low for this range) pushed this prediction toward \u201cDeath during follow-up\u201d."
          },
          {
            "feature": "serum_sodium",
            "label": "Serum sodium",
            "value": 127.0,
            "value_display": "127 mEq/L",
            "shap_value": 0.0859942699974865,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Serum sodium of 127 mEq/L (mid-range for this range) pushed this prediction toward \u201cDeath during follow-up\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cDeath during follow-up\u201d (80%). Raising the estimate: Ejection fraction (20 %), Serum creatinine (2.90 mg/dL), Serum sodium (127 mEq/L).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "true_negative",
        "case_label": "True negative (correctly cleared)",
        "test_index": 30,
        "actual": 0,
        "probability": 0.029597425073364346,
        "patient": {
          "age": 55.0,
          "sex": 1.0,
          "smoking": 1.0,
          "diabetes": 0.0,
          "high_blood_pressure": 0.0,
          "anaemia": 0.0,
          "ejection_fraction": 40.0,
          "serum_creatinine": 0.7,
          "serum_sodium": 140.0,
          "creatinine_phosphokinase": 835.0,
          "platelets": 279000.0
        },
        "patient_display": {
          "age": "55 years",
          "sex": "Male",
          "smoking": "Yes",
          "diabetes": "No",
          "high_blood_pressure": "No",
          "anaemia": "No",
          "ejection_fraction": "40 %",
          "serum_creatinine": "0.70 mg/dL",
          "serum_sodium": "140 mEq/L",
          "creatinine_phosphokinase": "835 mcg/L",
          "platelets": "279000 platelets/mL"
        },
        "shap_values": {
          "age": -0.02801720223233386,
          "sex": -0.0021157372582216367,
          "smoking": 0.009484439618328061,
          "diabetes": -0.006545320674372399,
          "high_blood_pressure": -0.01981691348635939,
          "anaemia": -0.009407910837166366,
          "ejection_fraction": -0.08295865518217596,
          "serum_creatinine": -0.09147248454959324,
          "serum_sodium": -0.025368149682723464,
          "creatinine_phosphokinase": -0.011415462728481297,
          "platelets": -0.022894700926088078
        },
        "lime_explanation": [
          [
            "serum_creatinine",
            -0.14300365885692448
          ],
          [
            "ejection_fraction",
            -0.09093919871691518
          ],
          [
            "platelets",
            -0.047529122492267276
          ],
          [
            "high_blood_pressure",
            -0.04050442108752153
          ],
          [
            "serum_sodium",
            -0.03914922117052516
          ],
          [
            "age",
            -0.038576720893230144
          ],
          [
            "anaemia",
            -0.03580244596626739
          ],
          [
            "creatinine_phosphokinase",
            0.017434612439678702
          ]
        ],
        "top_factors": [
          {
            "feature": "serum_creatinine",
            "label": "Serum creatinine",
            "value": 0.7,
            "value_display": "0.70 mg/dL",
            "shap_value": -0.09147248454959324,
            "direction": "decreases",
            "level": "low",
            "sentence": "Serum creatinine of 0.70 mg/dL (low for this range) pushed this prediction toward \u201cSurvived follow-up\u201d."
          },
          {
            "feature": "ejection_fraction",
            "label": "Ejection fraction",
            "value": 40.0,
            "value_display": "40 %",
            "shap_value": -0.08295865518217596,
            "direction": "decreases",
            "level": "mid-range",
            "sentence": "Ejection fraction of 40 % (mid-range for this range) pushed this prediction toward \u201cSurvived follow-up\u201d."
          },
          {
            "feature": "age",
            "label": "Age",
            "value": 55.0,
            "value_display": "55 years",
            "shap_value": -0.02801720223233386,
            "direction": "decreases",
            "level": "low",
            "sentence": "Age of 55 years (low for this range) pushed this prediction toward \u201cSurvived follow-up\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cDeath during follow-up\u201d (3%). Lowering it: Serum creatinine (0.70 mg/dL), Ejection fraction (40 %), Age (55 years).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "false_positive",
        "case_label": "False positive (unnecessary referral)",
        "test_index": 9,
        "actual": 0,
        "probability": 0.8424530492996656,
        "patient": {
          "age": 80.0,
          "sex": 1.0,
          "smoking": 0.0,
          "diabetes": 1.0,
          "high_blood_pressure": 0.0,
          "anaemia": 0.0,
          "ejection_fraction": 35.0,
          "serum_creatinine": 2.1,
          "serum_sodium": 134.0,
          "creatinine_phosphokinase": 582.0,
          "platelets": 350000.0
        },
        "patient_display": {
          "age": "80 years",
          "sex": "Male",
          "smoking": "No",
          "diabetes": "Yes",
          "high_blood_pressure": "No",
          "anaemia": "No",
          "ejection_fraction": "35 %",
          "serum_creatinine": "2.10 mg/dL",
          "serum_sodium": "134 mEq/L",
          "creatinine_phosphokinase": "582 mcg/L",
          "platelets": "350000 platelets/mL"
        },
        "shap_values": {
          "age": 0.13637011471210425,
          "sex": -0.006308304344810676,
          "smoking": -0.0032220339745999303,
          "diabetes": 0.020948217981669483,
          "high_blood_pressure": -0.017988006010593232,
          "anaemia": -0.005429894460527366,
          "ejection_fraction": -0.03577303047841301,
          "serum_creatinine": 0.32743259571472294,
          "serum_sodium": 0.06431015733047385,
          "creatinine_phosphokinase": 0.01297000068338158,
          "platelets": 0.029017709133707468
        },
        "lime_explanation": [
          [
            "serum_creatinine",
            0.2704064604888884
          ],
          [
            "age",
            0.09387924760417427
          ],
          [
            "ejection_fraction",
            -0.08923792099489157
          ],
          [
            "serum_sodium",
            0.08861854154640454
          ],
          [
            "high_blood_pressure",
            -0.03921321669953166
          ],
          [
            "platelets",
            0.03885467373423464
          ],
          [
            "anaemia",
            -0.028686185926805562
          ],
          [
            "smoking",
            -0.024330163036841483
          ]
        ],
        "top_factors": [
          {
            "feature": "serum_creatinine",
            "label": "Serum creatinine",
            "value": 2.1,
            "value_display": "2.10 mg/dL",
            "shap_value": 0.32743259571472294,
            "direction": "increases",
            "level": "low",
            "sentence": "Serum creatinine of 2.10 mg/dL (low for this range) pushed this prediction toward \u201cDeath during follow-up\u201d."
          },
          {
            "feature": "age",
            "label": "Age",
            "value": 80.0,
            "value_display": "80 years",
            "shap_value": 0.13637011471210425,
            "direction": "increases",
            "level": "high",
            "sentence": "Age of 80 years (high for this range) pushed this prediction toward \u201cDeath during follow-up\u201d."
          },
          {
            "feature": "serum_sodium",
            "label": "Serum sodium",
            "value": 134.0,
            "value_display": "134 mEq/L",
            "shap_value": 0.06431015733047385,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Serum sodium of 134 mEq/L (mid-range for this range) pushed this prediction toward \u201cDeath during follow-up\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cDeath during follow-up\u201d (84%). Raising the estimate: Serum creatinine (2.10 mg/dL), Age (80 years), Serum sodium (134 mEq/L).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "false_negative",
        "case_label": "False negative (missed case)",
        "test_index": 47,
        "actual": 1,
        "probability": 0.12044339613651675,
        "patient": {
          "age": 45.0,
          "sex": 1.0,
          "smoking": 0.0,
          "diabetes": 0.0,
          "high_blood_pressure": 0.0,
          "anaemia": 0.0,
          "ejection_fraction": 35.0,
          "serum_creatinine": 1.0,
          "serum_sodium": 145.0,
          "creatinine_phosphokinase": 582.0,
          "platelets": 385000.0
        },
        "patient_display": {
          "age": "45 years",
          "sex": "Male",
          "smoking": "No",
          "diabetes": "No",
          "high_blood_pressure": "No",
          "anaemia": "No",
          "ejection_fraction": "35 %",
          "serum_creatinine": "1.00 mg/dL",
          "serum_sodium": "145 mEq/L",
          "creatinine_phosphokinase": "582 mcg/L",
          "platelets": "385000 platelets/mL"
        },
        "shap_values": {
          "age": -0.02623854789243921,
          "sex": -0.0017469940075018628,
          "smoking": -0.0011523712284413528,
          "diabetes": -0.01311364863022421,
          "high_blood_pressure": -0.016244964238924766,
          "anaemia": -0.018079233246976783,
          "ejection_fraction": -0.060177733856725896,
          "serum_creatinine": -0.07749776314433385,
          "serum_sodium": 0.014555936100818663,
          "creatinine_phosphokinase": -0.006381084585013252,
          "platelets": 0.006394277853726808
        },
        "lime_explanation": [
          [
            "ejection_fraction",
            -0.09536771814473058
          ],
          [
            "serum_creatinine",
            -0.06481317134276228
          ],
          [
            "high_blood_pressure",
            -0.048356764673437615
          ],
          [
            "platelets",
            0.044272998930250385
          ],
          [
            "age",
            -0.04029545576913318
          ],
          [
            "serum_sodium",
            -0.034170177680791225
          ],
          [
            "anaemia",
            -0.03193132864834006
          ],
          [
            "smoking",
            -0.021594060375512175
          ]
        ],
        "top_factors": [
          {
            "feature": "serum_creatinine",
            "label": "Serum creatinine",
            "value": 1.0,
            "value_display": "1.00 mg/dL",
            "shap_value": -0.07749776314433385,
            "direction": "decreases",
            "level": "low",
            "sentence": "Serum creatinine of 1.00 mg/dL (low for this range) pushed this prediction toward \u201cSurvived follow-up\u201d."
          },
          {
            "feature": "ejection_fraction",
            "label": "Ejection fraction",
            "value": 35.0,
            "value_display": "35 %",
            "shap_value": -0.060177733856725896,
            "direction": "decreases",
            "level": "mid-range",
            "sentence": "Ejection fraction of 35 % (mid-range for this range) pushed this prediction toward \u201cSurvived follow-up\u201d."
          },
          {
            "feature": "age",
            "label": "Age",
            "value": 45.0,
            "value_display": "45 years",
            "shap_value": -0.02623854789243921,
            "direction": "decreases",
            "level": "low",
            "sentence": "Age of 45 years (low for this range) pushed this prediction toward \u201cSurvived follow-up\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cDeath during follow-up\u201d (12%). Lowering it: Serum creatinine (1.00 mg/dL), Ejection fraction (35 %), Age (45 years).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "borderline",
        "case_label": "Borderline (p \u2248 0.5)",
        "test_index": 7,
        "actual": 1,
        "probability": 0.5017804769513796,
        "patient": {
          "age": 85.0,
          "sex": 1.0,
          "smoking": 1.0,
          "diabetes": 0.0,
          "high_blood_pressure": 0.0,
          "anaemia": 0.0,
          "ejection_fraction": 60.0,
          "serum_creatinine": 1.2,
          "serum_sodium": 132.0,
          "creatinine_phosphokinase": 129.0,
          "platelets": 306000.0
        },
        "patient_display": {
          "age": "85 years",
          "sex": "Male",
          "smoking": "Yes",
          "diabetes": "No",
          "high_blood_pressure": "No",
          "anaemia": "No",
          "ejection_fraction": "60 %",
          "serum_creatinine": "1.20 mg/dL",
          "serum_sodium": "132 mEq/L",
          "creatinine_phosphokinase": "129 mcg/L",
          "platelets": "306000 platelets/mL"
        },
        "shap_values": {
          "age": 0.23910400958473899,
          "sex": 0.000666019643755855,
          "smoking": 0.02407284535807419,
          "diabetes": -0.015363848247886176,
          "high_blood_pressure": -0.013982553657653048,
          "anaemia": -0.011623285878809293,
          "ejection_fraction": -0.0703815321351079,
          "serum_creatinine": -0.030445901914931087,
          "serum_sodium": 0.07627209559266923,
          "creatinine_phosphokinase": 0.007346643173567874,
          "platelets": -0.0240095375795905
        },
        "lime_explanation": [
          [
            "age",
            0.08831119413870495
          ],
          [
            "serum_sodium",
            0.0822594330957954
          ],
          [
            "ejection_fraction",
            -0.06790774430495422
          ],
          [
            "high_blood_pressure",
            -0.04080712992049196
          ],
          [
            "serum_creatinine",
            -0.03445851643934765
          ],
          [
            "anaemia",
            -0.030233096559864312
          ],
          [
            "platelets",
            0.02935328488178643
          ],
          [
            "diabetes",
            -0.02545215029321652
          ]
        ],
        "top_factors": [
          {
            "feature": "age",
            "label": "Age",
            "value": 85.0,
            "value_display": "85 years",
            "shap_value": 0.23910400958473899,
            "direction": "increases",
            "level": "high",
            "sentence": "Age of 85 years (high for this range) pushed this prediction toward \u201cDeath during follow-up\u201d."
          },
          {
            "feature": "serum_sodium",
            "label": "Serum sodium",
            "value": 132.0,
            "value_display": "132 mEq/L",
            "shap_value": 0.07627209559266923,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Serum sodium of 132 mEq/L (mid-range for this range) pushed this prediction toward \u201cDeath during follow-up\u201d."
          },
          {
            "feature": "ejection_fraction",
            "label": "Ejection fraction",
            "value": 60.0,
            "value_display": "60 %",
            "shap_value": -0.0703815321351079,
            "direction": "decreases",
            "level": "high",
            "sentence": "Ejection fraction of 60 % (high for this range) pushed this prediction toward \u201cSurvived follow-up\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cDeath during follow-up\u201d (50%). Raising the estimate: Age (85 years), Serum sodium (132 mEq/L). Lowering it: Ejection fraction (60 %).",
        "shap_lime_top5_overlap": 0.8
      }
    ]
  },
  "diabetes": {
    "model": "random_forest",
    "model_label": "Random Forest",
    "cases": [
      {
        "case": "true_positive",
        "case_label": "True positive (correctly flagged)",
        "test_index": 111,
        "actual": 1,
        "probability": 0.9141695262543204,
        "patient": {
          "Age": 41.0,
          "Pregnancies": 7.0,
          "DiabetesPedigreeFunction": 0.745,
          "BMI": 35.9,
          "BloodPressure": 68.0,
          "SkinThickness": 28.0,
          "Glucose": 194.0,
          "Insulin": NaN
        },
        "patient_display": {
          "Age": "41 years",
          "Pregnancies": "7",
          "DiabetesPedigreeFunction": "0.745",
          "BMI": "35.9 kg/m\u00b2",
          "BloodPressure": "68 mm Hg",
          "SkinThickness": "28 mm",
          "Glucose": "194 mg/dL",
          "Insulin": "nan mu U/mL"
        },
        "shap_values": {
          "Age": 0.043437534363378376,
          "Pregnancies": 0.01824134264684433,
          "DiabetesPedigreeFunction": 0.0241181576591503,
          "BMI": 0.045855350412500974,
          "BloodPressure": -0.00012616049586589397,
          "SkinThickness": -0.003562144247018401,
          "Glucose": 0.27049511868806214,
          "Insulin": 0.018657033994533688
        },
        "lime_explanation": [
          [
            "Glucose",
            0.34115309987715314
          ],
          [
            "Age",
            0.0723600420818017
          ],
          [
            "BMI",
            0.06958895519682567
          ],
          [
            "DiabetesPedigreeFunction",
            0.06025620361071846
          ],
          [
            "Insulin",
            0.05222535391563242
          ],
          [
            "Pregnancies",
            0.044823486476721984
          ],
          [
            "BloodPressure",
            0.005555106839875277
          ],
          [
            "SkinThickness",
            -0.0013780061405775995
          ]
        ],
        "top_factors": [
          {
            "feature": "Glucose",
            "label": "Plasma glucose (2-hour OGTT)",
            "value": 194.0,
            "value_display": "194 mg/dL",
            "shap_value": 0.27049511868806214,
            "direction": "increases",
            "level": "high",
            "sentence": "Plasma glucose (2-hour OGTT) of 194 mg/dL (high for this range) pushed this prediction toward \u201cDiabetes onset\u201d."
          },
          {
            "feature": "BMI",
            "label": "Body mass index",
            "value": 35.9,
            "value_display": "35.9 kg/m\u00b2",
            "shap_value": 0.045855350412500974,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Body mass index of 35.9 kg/m\u00b2 (mid-range for this range) pushed this prediction toward \u201cDiabetes onset\u201d."
          },
          {
            "feature": "Age",
            "label": "Age",
            "value": 41.0,
            "value_display": "41 years",
            "shap_value": 0.043437534363378376,
            "direction": "increases",
            "level": "low",
            "sentence": "Age of 41 years (low for this range) pushed this prediction toward \u201cDiabetes onset\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cDiabetes onset\u201d (91%). Raising the estimate: Plasma glucose (2-hour OGTT) (194 mg/dL), Body mass index (35.9 kg/m\u00b2), Age (41 years).",
        "shap_lime_top5_overlap": 1.0
      },
      {
        "case": "true_negative",
        "case_label": "True negative (correctly cleared)",
        "test_index": 64,
        "actual": 0,
        "probability": 0.03428240106768417,
        "patient": {
          "Age": 23.0,
          "Pregnancies": 1.0,
          "DiabetesPedigreeFunction": 0.234,
          "BMI": 25.2,
          "BloodPressure": 54.0,
          "SkinThickness": 25.0,
          "Glucose": 91.0,
          "Insulin": 100.0
        },
        "patient_display": {
          "Age": "23 years",
          "Pregnancies": "1",
          "DiabetesPedigreeFunction": "0.234",
          "BMI": "25.2 kg/m\u00b2",
          "BloodPressure": "54 mm Hg",
          "SkinThickness": "25 mm",
          "Glucose": "91 mg/dL",
          "Insulin": "100 mu U/mL"
        },
        "shap_values": {
          "Age": -0.06328806332145002,
          "Pregnancies": -0.01424799368114265,
          "DiabetesPedigreeFunction": -0.021463627910632072,
          "BMI": -0.1367807330370796,
          "BloodPressure": -0.01005875398006966,
          "SkinThickness": -0.0153199869625546,
          "Glucose": -0.1768835489815268,
          "Insulin": -0.0247281842905941
        },
        "lime_explanation": [
          [
            "Glucose",
            -0.22394000008918086
          ],
          [
            "BMI",
            -0.21109483699204076
          ],
          [
            "Insulin",
            -0.10638390297642147
          ],
          [
            "Age",
            -0.10297305429434228
          ],
          [
            "DiabetesPedigreeFunction",
            -0.05276319932354503
          ],
          [
            "Pregnancies",
            -0.029774879782593997
          ],
          [
            "SkinThickness",
            -0.02461471141459803
          ],
          [
            "BloodPressure",
            -0.013320121169070904
          ]
        ],
        "top_factors": [
          {
            "feature": "Glucose",
            "label": "Plasma glucose (2-hour OGTT)",
            "value": 91.0,
            "value_display": "91 mg/dL",
            "shap_value": -0.1768835489815268,
            "direction": "decreases",
            "level": "low",
            "sentence": "Plasma glucose (2-hour OGTT) of 91 mg/dL (low for this range) pushed this prediction toward \u201cNo diabetes onset\u201d."
          },
          {
            "feature": "BMI",
            "label": "Body mass index",
            "value": 25.2,
            "value_display": "25.2 kg/m\u00b2",
            "shap_value": -0.1367807330370796,
            "direction": "decreases",
            "level": "low",
            "sentence": "Body mass index of 25.2 kg/m\u00b2 (low for this range) pushed this prediction toward \u201cNo diabetes onset\u201d."
          },
          {
            "feature": "Age",
            "label": "Age",
            "value": 23.0,
            "value_display": "23 years",
            "shap_value": -0.06328806332145002,
            "direction": "decreases",
            "level": "low",
            "sentence": "Age of 23 years (low for this range) pushed this prediction toward \u201cNo diabetes onset\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cDiabetes onset\u201d (3%). Lowering it: Plasma glucose (2-hour OGTT) (91 mg/dL), Body mass index (25.2 kg/m\u00b2), Age (23 years).",
        "shap_lime_top5_overlap": 1.0
      },
      {
        "case": "false_positive",
        "case_label": "False positive (unnecessary referral)",
        "test_index": 134,
        "actual": 0,
        "probability": 0.8525636888392737,
        "patient": {
          "Age": 60.0,
          "Pregnancies": 7.0,
          "DiabetesPedigreeFunction": 0.164,
          "BMI": 34.2,
          "BloodPressure": 95.0,
          "SkinThickness": 31.0,
          "Glucose": 179.0,
          "Insulin": NaN
        },
        "patient_display": {
          "Age": "60 years",
          "Pregnancies": "7",
          "DiabetesPedigreeFunction": "0.164",
          "BMI": "34.2 kg/m\u00b2",
          "BloodPressure": "95 mm Hg",
          "SkinThickness": "31 mm",
          "Glucose": "179 mg/dL",
          "Insulin": "nan mu U/mL"
        },
        "shap_values": {
          "Age": 0.03848188887311929,
          "Pregnancies": 0.0162673099425047,
          "DiabetesPedigreeFunction": -0.02695782948713481,
          "BMI": 0.0429447604165597,
          "BloodPressure": -0.006281639342902654,
          "SkinThickness": 0.003029974040703529,
          "Glucose": 0.2696940636932204,
          "Insulin": 0.018331867470469485
        },
        "lime_explanation": [
          [
            "Glucose",
            0.3508878682249327
          ],
          [
            "Age",
            0.08087473430154611
          ],
          [
            "BMI",
            0.07394950372124938
          ],
          [
            "Insulin",
            0.05445776273153915
          ],
          [
            "Pregnancies",
            0.047433071107207146
          ],
          [
            "DiabetesPedigreeFunction",
            -0.04414940903783627
          ],
          [
            "SkinThickness",
            0.015227742600735044
          ],
          [
            "BloodPressure",
            0.013067340146896908
          ]
        ],
        "top_factors": [
          {
            "feature": "Glucose",
            "label": "Plasma glucose (2-hour OGTT)",
            "value": 179.0,
            "value_display": "179 mg/dL",
            "shap_value": 0.2696940636932204,
            "direction": "increases",
            "level": "high",
            "sentence": "Plasma glucose (2-hour OGTT) of 179 mg/dL (high for this range) pushed this prediction toward \u201cDiabetes onset\u201d."
          },
          {
            "feature": "BMI",
            "label": "Body mass index",
            "value": 34.2,
            "value_display": "34.2 kg/m\u00b2",
            "shap_value": 0.0429447604165597,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Body mass index of 34.2 kg/m\u00b2 (mid-range for this range) pushed this prediction toward \u201cDiabetes onset\u201d."
          },
          {
            "feature": "Age",
            "label": "Age",
            "value": 60.0,
            "value_display": "60 years",
            "shap_value": 0.03848188887311929,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Age of 60 years (mid-range for this range) pushed this prediction toward \u201cDiabetes onset\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cDiabetes onset\u201d (85%). Raising the estimate: Plasma glucose (2-hour OGTT) (179 mg/dL), Body mass index (34.2 kg/m\u00b2), Age (60 years).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "false_negative",
        "case_label": "False negative (missed case)",
        "test_index": 121,
        "actual": 1,
        "probability": 0.10256294705483462,
        "patient": {
          "Age": 26.0,
          "Pregnancies": 3.0,
          "DiabetesPedigreeFunction": 0.248,
          "BMI": 31.0,
          "BloodPressure": 50.0,
          "SkinThickness": 32.0,
          "Glucose": 78.0,
          "Insulin": 88.0
        },
        "patient_display": {
          "Age": "26 years",
          "Pregnancies": "3",
          "DiabetesPedigreeFunction": "0.248",
          "BMI": "31.0 kg/m\u00b2",
          "BloodPressure": "50 mm Hg",
          "SkinThickness": "32 mm",
          "Glucose": "78 mg/dL",
          "Insulin": "88 mu U/mL"
        },
        "shap_values": {
          "Age": -0.06932163206282851,
          "Pregnancies": -0.0099847875818476,
          "DiabetesPedigreeFunction": -0.032408986875245564,
          "BMI": 0.019182776534385926,
          "BloodPressure": -0.013521398254470364,
          "SkinThickness": 0.008456548544687727,
          "Glucose": -0.21913197900442044,
          "Insulin": -0.07776088747816039
        },
        "lime_explanation": [
          [
            "Glucose",
            -0.22921993264667104
          ],
          [
            "Insulin",
            -0.10769172332183564
          ],
          [
            "Age",
            -0.054193805018707214
          ],
          [
            "BloodPressure",
            -0.03919522655137005
          ],
          [
            "BMI",
            0.03537944316308591
          ],
          [
            "DiabetesPedigreeFunction",
            -0.024887535382213638
          ],
          [
            "Pregnancies",
            -0.01892248288567393
          ],
          [
            "SkinThickness",
            0.0059724664998257095
          ]
        ],
        "top_factors": [
          {
            "feature": "Glucose",
            "label": "Plasma glucose (2-hour OGTT)",
            "value": 78.0,
            "value_display": "78 mg/dL",
            "shap_value": -0.21913197900442044,
            "direction": "decreases",
            "level": "low",
            "sentence": "Plasma glucose (2-hour OGTT) of 78 mg/dL (low for this range) pushed this prediction toward \u201cNo diabetes onset\u201d."
          },
          {
            "feature": "Insulin",
            "label": "2-hour serum insulin",
            "value": 88.0,
            "value_display": "88 mu U/mL",
            "shap_value": -0.07776088747816039,
            "direction": "decreases",
            "level": "low",
            "sentence": "2-hour serum insulin of 88 mu U/mL (low for this range) pushed this prediction toward \u201cNo diabetes onset\u201d."
          },
          {
            "feature": "Age",
            "label": "Age",
            "value": 26.0,
            "value_display": "26 years",
            "shap_value": -0.06932163206282851,
            "direction": "decreases",
            "level": "low",
            "sentence": "Age of 26 years (low for this range) pushed this prediction toward \u201cNo diabetes onset\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cDiabetes onset\u201d (10%). Lowering it: Plasma glucose (2-hour OGTT) (78 mg/dL), 2-hour serum insulin (88 mu U/mL), Age (26 years).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "borderline",
        "case_label": "Borderline (p \u2248 0.5)",
        "test_index": 77,
        "actual": 1,
        "probability": 0.4928749419452398,
        "patient": {
          "Age": 33.0,
          "Pregnancies": 1.0,
          "DiabetesPedigreeFunction": 1.321,
          "BMI": 32.0,
          "BloodPressure": 98.0,
          "SkinThickness": 41.0,
          "Glucose": 128.0,
          "Insulin": 58.0
        },
        "patient_display": {
          "Age": "33 years",
          "Pregnancies": "1",
          "DiabetesPedigreeFunction": "1.321",
          "BMI": "32.0 kg/m\u00b2",
          "BloodPressure": "98 mm Hg",
          "SkinThickness": "41 mm",
          "Glucose": "128 mg/dL",
          "Insulin": "58 mu U/mL"
        },
        "shap_values": {
          "Age": 0.03725008924932014,
          "Pregnancies": -0.012740150838097325,
          "DiabetesPedigreeFunction": 0.05098083211532057,
          "BMI": 0.045404573364821954,
          "BloodPressure": 0.005254323881987964,
          "SkinThickness": 0.016879773490332733,
          "Glucose": 0.01894327635713456,
          "Insulin": -0.1661510689083144
        },
        "lime_explanation": [
          [
            "Insulin",
            -0.10453303090461125
          ],
          [
            "Age",
            0.07473207210558847
          ],
          [
            "DiabetesPedigreeFunction",
            0.047119677006570986
          ],
          [
            "BMI",
            0.039527158471739716
          ],
          [
            "SkinThickness",
            0.03242110267311312
          ],
          [
            "Pregnancies",
            -0.020978868472960873
          ],
          [
            "Glucose",
            0.013812118500350943
          ],
          [
            "BloodPressure",
            0.008581209842437607
          ]
        ],
        "top_factors": [
          {
            "feature": "Insulin",
            "label": "2-hour serum insulin",
            "value": 58.0,
            "value_display": "58 mu U/mL",
            "shap_value": -0.1661510689083144,
            "direction": "decreases",
            "level": "low",
            "sentence": "2-hour serum insulin of 58 mu U/mL (low for this range) pushed this prediction toward \u201cNo diabetes onset\u201d."
          },
          {
            "feature": "DiabetesPedigreeFunction",
            "label": "Diabetes pedigree function",
            "value": 1.321,
            "value_display": "1.321",
            "shap_value": 0.05098083211532057,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Diabetes pedigree function of 1.321 (mid-range for this range) pushed this prediction toward \u201cDiabetes onset\u201d."
          },
          {
            "feature": "BMI",
            "label": "Body mass index",
            "value": 32.0,
            "value_display": "32.0 kg/m\u00b2",
            "shap_value": 0.045404573364821954,
            "direction": "increases",
            "level": "low",
            "sentence": "Body mass index of 32.0 kg/m\u00b2 (low for this range) pushed this prediction toward \u201cDiabetes onset\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cDiabetes onset\u201d (49%). Raising the estimate: Diabetes pedigree function (1.321), Body mass index (32.0 kg/m\u00b2). Lowering it: 2-hour serum insulin (58 mu U/mL).",
        "shap_lime_top5_overlap": 0.8
      }
    ]
  },
  "kidney_disease": {
    "model": "random_forest",
    "model_label": "Random Forest",
    "cases": [
      {
        "case": "true_positive",
        "case_label": "True positive (correctly flagged)",
        "test_index": 20,
        "actual": 1,
        "probability": 1.0,
        "patient": {
          "age": 59.0,
          "htn": 0.0,
          "dm": 1.0,
          "cad": 0.0,
          "bp": 80.0,
          "appet": 1.0,
          "pe": 0.0,
          "ane": 0.0,
          "sg": 1.01,
          "al": 1.0,
          "su": 0.0,
          "rbc": 1.0,
          "pc": 0.0,
          "pcc": 0.0,
          "ba": 0.0,
          "bgr": 303.0,
          "bu": 35.0,
          "sc": 1.3,
          "sod": 122.0,
          "pot": 3.5,
          "hemo": 10.4,
          "pcv": 35.0,
          "wbcc": 10900.0,
          "rbcc": 4.3
        },
        "patient_display": {
          "age": "59 years",
          "htn": "No",
          "dm": "Yes",
          "cad": "No",
          "bp": "80 mm Hg",
          "appet": "Poor",
          "pe": "No",
          "ane": "No",
          "sg": "1.010",
          "al": "1",
          "su": "0",
          "rbc": "Abnormal",
          "pc": "Normal",
          "pcc": "Not present",
          "ba": "Not present",
          "bgr": "303 mg/dL",
          "bu": "35 mg/dL",
          "sc": "1.30 mg/dL",
          "sod": "122 mEq/L",
          "pot": "3.5 mEq/L",
          "hemo": "10.4 g/dL",
          "pcv": "35 %",
          "wbcc": "10900 cells/cumm",
          "rbcc": "4.3 millions/cmm"
        },
        "shap_values": {
          "age": 0.0013020979345368738,
          "htn": -0.008394594304902438,
          "dm": 0.027954836888321368,
          "cad": -5.009804468723534e-05,
          "bp": -0.00047564889366351814,
          "appet": 0.013959262117794358,
          "pe": -0.00046329873169337853,
          "ane": -0.00022327054764460474,
          "sg": 0.05772265607664856,
          "al": 0.038595638986341045,
          "su": -0.0003354463449843962,
          "rbc": 0.05964585727014507,
          "pc": -0.002756986086247265,
          "pcc": -0.00014874296642969012,
          "ba": -5.328615171363534e-05,
          "bgr": 0.026458655136413822,
          "bu": -0.0024933733388161463,
          "sc": 0.028646849053067174,
          "sod": 0.013101370878419238,
          "pot": 0.0005352831368029253,
          "hemo": 0.058856783779961286,
          "pcv": 0.04870038395129706,
          "wbcc": 0.0005981487806850567,
          "rbcc": 0.01415025475368168
        },
        "lime_explanation": [
          [
            "hemo",
            0.07728017660650434
          ],
          [
            "pcv",
            0.05309183800504846
          ],
          [
            "htn",
            -0.04878644689920984
          ],
          [
            "dm",
            0.03224683311580766
          ],
          [
            "sg",
            0.02892905508696742
          ],
          [
            "sod",
            0.028048192351250688
          ],
          [
            "rbcc",
            0.024960577550538647
          ],
          [
            "appet",
            0.022525284426539914
          ]
        ],
        "top_factors": [
          {
            "feature": "rbc",
            "label": "Red blood cells (urine microscopy)",
            "value": 1.0,
            "value_display": "Abnormal",
            "shap_value": 0.05964585727014507,
            "direction": "increases",
            "level": "",
            "sentence": "Red blood cells (urine microscopy) of Abnormal pushed this prediction toward \u201cChronic kidney disease\u201d."
          },
          {
            "feature": "hemo",
            "label": "Haemoglobin",
            "value": 10.4,
            "value_display": "10.4 g/dL",
            "shap_value": 0.058856783779961286,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Haemoglobin of 10.4 g/dL (mid-range for this range) pushed this prediction toward \u201cChronic kidney disease\u201d."
          },
          {
            "feature": "sg",
            "label": "Urine specific gravity",
            "value": 1.01,
            "value_display": "1.010",
            "shap_value": 0.05772265607664856,
            "direction": "increases",
            "level": "low",
            "sentence": "Urine specific gravity of 1.010 (low for this range) pushed this prediction toward \u201cChronic kidney disease\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cChronic kidney disease\u201d (100%). Raising the estimate: Red blood cells (urine microscopy) (Abnormal), Haemoglobin (10.4 g/dL), Urine specific gravity (1.010).",
        "shap_lime_top5_overlap": 0.6
      },
      {
        "case": "true_negative",
        "case_label": "True negative (correctly cleared)",
        "test_index": 21,
        "actual": 0,
        "probability": 0.00022451485407975303,
        "patient": {
          "age": 23.0,
          "htn": 0.0,
          "dm": 0.0,
          "cad": 0.0,
          "bp": 80.0,
          "appet": 0.0,
          "pe": 0.0,
          "ane": 0.0,
          "sg": 1.025,
          "al": 0.0,
          "su": 0.0,
          "rbc": 0.0,
          "pc": 0.0,
          "pcc": 0.0,
          "ba": 0.0,
          "bgr": 70.0,
          "bu": 36.0,
          "sc": 1.0,
          "sod": 150.0,
          "pot": 4.6,
          "hemo": 17.0,
          "pcv": 52.0,
          "wbcc": 9800.0,
          "rbcc": 5.0
        },
        "patient_display": {
          "age": "23 years",
          "htn": "No",
          "dm": "No",
          "cad": "No",
          "bp": "80 mm Hg",
          "appet": "Good",
          "pe": "No",
          "ane": "No",
          "sg": "1.025",
          "al": "0",
          "su": "0",
          "rbc": "Normal",
          "pc": "Normal",
          "pcc": "Not present",
          "ba": "Not present",
          "bgr": "70 mg/dL",
          "bu": "36 mg/dL",
          "sc": "1.00 mg/dL",
          "sod": "150 mEq/L",
          "pot": "4.6 mEq/L",
          "hemo": "17.0 g/dL",
          "pcv": "52 %",
          "wbcc": "9800 cells/cumm",
          "rbcc": "5.0 millions/cmm"
        },
        "shap_values": {
          "age": -0.005744692649786465,
          "htn": -0.03589120040387898,
          "dm": -0.023033326712857485,
          "cad": -0.0005198487743460267,
          "bp": -0.0037002451233545623,
          "appet": -0.004830184024098622,
          "pe": -0.0022501160915610594,
          "ane": -0.0014180421008849874,
          "sg": -0.08708923669537737,
          "al": -0.04941837154884618,
          "su": -0.0024917488949099727,
          "rbc": -0.05585349763976412,
          "pc": -0.011885604987618488,
          "pcc": -0.0008799428184754742,
          "ba": -0.00033081395398370394,
          "bgr": -0.018766984935476988,
          "bu": -0.010829693893052798,
          "sc": -0.05872525819504091,
          "sod": -0.03617542422917233,
          "pot": -0.0021438512099188527,
          "hemo": -0.11732131795964046,
          "pcv": -0.09553322728493165,
          "wbcc": 0.0006957035691276017,
          "rbcc": -0.0008052252547372268
        },
        "lime_explanation": [
          [
            "hemo",
            -0.17247359248771754
          ],
          [
            "pcv",
            -0.11456290734728634
          ],
          [
            "sod",
            -0.0644807623080244
          ],
          [
            "htn",
            -0.053173133547839035
          ],
          [
            "sg",
            -0.04582203803852863
          ],
          [
            "dm",
            -0.03805601848554965
          ],
          [
            "bgr",
            -0.02287467692284985
          ],
          [
            "appet",
            -0.01874797155869078
          ]
        ],
        "top_factors": [
          {
            "feature": "hemo",
            "label": "Haemoglobin",
            "value": 17.0,
            "value_display": "17.0 g/dL",
            "shap_value": -0.11732131795964046,
            "direction": "decreases",
            "level": "high",
            "sentence": "Haemoglobin of 17.0 g/dL (high for this range) pushed this prediction toward \u201cNo chronic kidney disease\u201d."
          },
          {
            "feature": "pcv",
            "label": "Packed cell volume",
            "value": 52.0,
            "value_display": "52 %",
            "shap_value": -0.09553322728493165,
            "direction": "decreases",
            "level": "high",
            "sentence": "Packed cell volume of 52 % (high for this range) pushed this prediction toward \u201cNo chronic kidney disease\u201d."
          },
          {
            "feature": "sg",
            "label": "Urine specific gravity",
            "value": 1.025,
            "value_display": "1.025",
            "shap_value": -0.08708923669537737,
            "direction": "decreases",
            "level": "high",
            "sentence": "Urine specific gravity of 1.025 (high for this range) pushed this prediction toward \u201cNo chronic kidney disease\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cChronic kidney disease\u201d (0%). Lowering it: Haemoglobin (17.0 g/dL), Packed cell volume (52 %), Urine specific gravity (1.025).",
        "shap_lime_top5_overlap": 0.6
      },
      {
        "case": "borderline",
        "case_label": "Borderline (p \u2248 0.5)",
        "test_index": 50,
        "actual": 1,
        "probability": 0.6200490196078431,
        "patient": {
          "age": 56.0,
          "htn": 0.0,
          "dm": 0.0,
          "cad": 0.0,
          "bp": 70.0,
          "appet": 0.0,
          "pe": 0.0,
          "ane": 0.0,
          "sg": 1.015,
          "al": 4.0,
          "su": 1.0,
          "rbc": 1.0,
          "pc": 0.0,
          "pcc": 0.0,
          "ba": 0.0,
          "bgr": 210.0,
          "bu": 26.0,
          "sc": 1.7,
          "sod": 136.0,
          "pot": 3.8,
          "hemo": 16.1,
          "pcv": 52.0,
          "wbcc": 12500.0,
          "rbcc": 5.6
        },
        "patient_display": {
          "age": "56 years",
          "htn": "No",
          "dm": "No",
          "cad": "No",
          "bp": "70 mm Hg",
          "appet": "Good",
          "pe": "No",
          "ane": "No",
          "sg": "1.015",
          "al": "4",
          "su": "1",
          "rbc": "Abnormal",
          "pc": "Normal",
          "pcc": "Not present",
          "ba": "Not present",
          "bgr": "210 mg/dL",
          "bu": "26 mg/dL",
          "sc": "1.70 mg/dL",
          "sod": "136 mEq/L",
          "pot": "3.8 mEq/L",
          "hemo": "16.1 g/dL",
          "pcv": "52 %",
          "wbcc": "12500 cells/cumm",
          "rbcc": "5.6 millions/cmm"
        },
        "shap_values": {
          "age": 0.001035445424185432,
          "htn": -0.020569889831915943,
          "dm": -0.01393207353810396,
          "cad": -4.527217545766954e-05,
          "bp": -0.001942380056615347,
          "appet": -0.002053098727486515,
          "pe": -0.0010011430622917884,
          "ane": -0.0009108843360955093,
          "sg": 0.07572441047587401,
          "al": 0.06390198533250092,
          "su": 0.012722727368040577,
          "rbc": 0.07747353817746942,
          "pc": 0.0003542661812530635,
          "pcc": -0.00025571523443959827,
          "ba": -8.96701653325855e-05,
          "bgr": 0.05225462114032577,
          "bu": -0.007409500935017018,
          "sc": 0.0593556781276246,
          "sod": 0.016893184458146224,
          "pot": 0.002446681650251777,
          "hemo": -0.1641617922468507,
          "pcv": -0.1337899553108289,
          "wbcc": 0.0005890461528601424,
          "rbcc": -0.021707855926920296
        },
        "lime_explanation": [
          [
            "hemo",
            -0.1727713987869244
          ],
          [
            "pcv",
            -0.1154793334005919
          ],
          [
            "rbcc",
            -0.056400208947090906
          ],
          [
            "htn",
            -0.050663707418814125
          ],
          [
            "sc",
            0.043678079538886125
          ],
          [
            "dm",
            -0.03486531697288196
          ],
          [
            "sg",
            0.022834210685871867
          ],
          [
            "bgr",
            0.02176256947631576
          ]
        ],
        "top_factors": [
          {
            "feature": "hemo",
            "label": "Haemoglobin",
            "value": 16.1,
            "value_display": "16.1 g/dL",
            "shap_value": -0.1641617922468507,
            "direction": "decreases",
            "level": "high",
            "sentence": "Haemoglobin of 16.1 g/dL (high for this range) pushed this prediction toward \u201cNo chronic kidney disease\u201d."
          },
          {
            "feature": "pcv",
            "label": "Packed cell volume",
            "value": 52.0,
            "value_display": "52 %",
            "shap_value": -0.1337899553108289,
            "direction": "decreases",
            "level": "high",
            "sentence": "Packed cell volume of 52 % (high for this range) pushed this prediction toward \u201cNo chronic kidney disease\u201d."
          },
          {
            "feature": "rbc",
            "label": "Red blood cells (urine microscopy)",
            "value": 1.0,
            "value_display": "Abnormal",
            "shap_value": 0.07747353817746942,
            "direction": "increases",
            "level": "",
            "sentence": "Red blood cells (urine microscopy) of Abnormal pushed this prediction toward \u201cChronic kidney disease\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cChronic kidney disease\u201d (62%). Raising the estimate: Red blood cells (urine microscopy) (Abnormal). Lowering it: Haemoglobin (16.1 g/dL), Packed cell volume (52 %).",
        "shap_lime_top5_overlap": 0.4
      }
    ]
  },
  "breast_cancer": {
    "model": "logistic_regression",
    "model_label": "Logistic Regression",
    "cases": [
      {
        "case": "true_positive",
        "case_label": "True positive (correctly flagged)",
        "test_index": 108,
        "actual": 1,
        "probability": 0.9999999998933822,
        "patient": {
          "radius1": 23.09,
          "texture1": 19.83,
          "perimeter1": 152.1,
          "area1": 1682.0,
          "smoothness1": 0.09342,
          "compactness1": 0.1275,
          "concavity1": 0.1676,
          "concave_points1": 0.1003,
          "symmetry1": 0.1505,
          "fractal_dimension1": 0.05484,
          "radius2": 1.291,
          "texture2": 0.7452,
          "perimeter2": 9.635,
          "area2": 180.2,
          "smoothness2": 0.005753,
          "compactness2": 0.03356,
          "concavity2": 0.03976,
          "concave_points2": 0.02156,
          "symmetry2": 0.02201,
          "fractal_dimension2": 0.002897,
          "radius3": 30.79,
          "texture3": 23.87,
          "perimeter3": 211.5,
          "area3": 2782.0,
          "smoothness3": 0.1199,
          "compactness3": 0.3625,
          "concavity3": 0.3794,
          "concave_points3": 0.2264,
          "symmetry3": 0.2908,
          "fractal_dimension3": 0.07277
        },
        "patient_display": {
          "radius1": "23.1 \u00b5m",
          "texture1": "19.8",
          "perimeter1": "152 \u00b5m",
          "area1": "1682 \u00b5m\u00b2",
          "smoothness1": "0.093",
          "compactness1": "0.128",
          "concavity1": "0.168",
          "concave_points1": "0.100",
          "symmetry1": "0.150",
          "fractal_dimension1": "0.0548",
          "radius2": "1.29 \u00b5m",
          "texture2": "0.75",
          "perimeter2": "9.6 \u00b5m",
          "area2": "180 \u00b5m\u00b2",
          "smoothness2": "0.0058",
          "compactness2": "0.034",
          "concavity2": "0.040",
          "concave_points2": "0.0216",
          "symmetry2": "0.0220",
          "fractal_dimension2": "0.0029",
          "radius3": "30.8 \u00b5m",
          "texture3": "23.9",
          "perimeter3": "212 \u00b5m",
          "area3": "2782 \u00b5m\u00b2",
          "smoothness3": "0.120",
          "compactness3": "0.36",
          "concavity3": "0.38",
          "concave_points3": "0.226",
          "symmetry3": "0.291",
          "fractal_dimension3": "0.073"
        },
        "shap_values": {
          "radius1": 0.8330151043286057,
          "texture1": 0.03677627950080786,
          "perimeter1": 0.7955412073599326,
          "area1": 1.2303414165577844,
          "smoothness1": -0.11268262522828333,
          "compactness1": -0.14818660084283886,
          "concavity1": 0.7161016715884883,
          "concave_points1": 1.121015719473067,
          "symmetry1": 0.1923303874119206,
          "fractal_dimension1": 0.07726326021891716,
          "radius2": 3.742557489699051,
          "texture2": 0.34828904165013574,
          "perimeter2": 2.4128749035261925,
          "area2": 2.6490021419642775,
          "smoothness2": -0.10276318777428535,
          "compactness2": -0.43622298810803434,
          "concavity2": -0.027564298394439992,
          "concave_points2": 0.6941919375795937,
          "symmetry2": -0.12023276023483925,
          "fractal_dimension2": 0.2116198769709432,
          "radius3": 2.5090160330757985,
          "texture3": -0.5922552809190552,
          "perimeter3": 2.1090285151534136,
          "area3": 2.8715619928265608,
          "smoothness3": -0.2997404676719207,
          "compactness3": -0.09830674007916103,
          "concavity3": 0.382768202212158,
          "concave_points3": 1.0439164569691284,
          "symmetry3": 0.008678120186978538,
          "fractal_dimension3": -0.041879432086681455
        },
        "lime_explanation": [
          [
            "radius2",
            0.22834525810237566
          ],
          [
            "compactness2",
            -0.18253640021300596
          ],
          [
            "area2",
            0.18080555538349263
          ],
          [
            "concave_points1",
            0.17947505968340832
          ],
          [
            "area3",
            0.17459419277272453
          ],
          [
            "perimeter2",
            0.15729625508854012
          ],
          [
            "radius3",
            0.15161891875294312
          ],
          [
            "concavity1",
            0.14643514297156682
          ]
        ],
        "top_factors": [
          {
            "feature": "radius2",
            "label": "Radius (variability)",
            "value": 1.291,
            "value_display": "1.29 \u00b5m",
            "shap_value": 3.742557489699051,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Radius (variability) of 1.29 \u00b5m (mid-range for this range) pushed this prediction toward \u201cMalignant\u201d."
          },
          {
            "feature": "area3",
            "label": "Area (worst)",
            "value": 2782.0,
            "value_display": "2782 \u00b5m\u00b2",
            "shap_value": 2.8715619928265608,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Area (worst) of 2782 \u00b5m\u00b2 (mid-range for this range) pushed this prediction toward \u201cMalignant\u201d."
          },
          {
            "feature": "area2",
            "label": "Area (variability)",
            "value": 180.2,
            "value_display": "180 \u00b5m\u00b2",
            "shap_value": 2.6490021419642775,
            "direction": "increases",
            "level": "low",
            "sentence": "Area (variability) of 180 \u00b5m\u00b2 (low for this range) pushed this prediction toward \u201cMalignant\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cMalignant\u201d (100%). Raising the estimate: Radius (variability) (1.29 \u00b5m), Area (worst) (2782 \u00b5m\u00b2), Area (variability) (180 \u00b5m\u00b2).",
        "shap_lime_top5_overlap": 0.6
      },
      {
        "case": "true_negative",
        "case_label": "True negative (correctly cleared)",
        "test_index": 91,
        "actual": 0,
        "probability": 2.7383722520503946e-08,
        "patient": {
          "radius1": 8.888,
          "texture1": 14.64,
          "perimeter1": 58.79,
          "area1": 244.0,
          "smoothness1": 0.09783,
          "compactness1": 0.1531,
          "concavity1": 0.08606,
          "concave_points1": 0.02872,
          "symmetry1": 0.1902,
          "fractal_dimension1": 0.0898,
          "radius2": 0.5262,
          "texture2": 0.8522,
          "perimeter2": 3.168,
          "area2": 25.44,
          "smoothness2": 0.01721,
          "compactness2": 0.09368,
          "concavity2": 0.05671,
          "concave_points2": 0.01766,
          "symmetry2": 0.02541,
          "fractal_dimension2": 0.02193,
          "radius3": 9.733,
          "texture3": 15.67,
          "perimeter3": 62.56,
          "area3": 284.4,
          "smoothness3": 0.1207,
          "compactness3": 0.2436,
          "concavity3": 0.1434,
          "concave_points3": 0.04786,
          "symmetry3": 0.2254,
          "fractal_dimension3": 0.1084
        },
        "patient_display": {
          "radius1": "8.9 \u00b5m",
          "texture1": "14.6",
          "perimeter1": "59 \u00b5m",
          "area1": "244 \u00b5m\u00b2",
          "smoothness1": "0.098",
          "compactness1": "0.153",
          "concavity1": "0.086",
          "concave_points1": "0.029",
          "symmetry1": "0.190",
          "fractal_dimension1": "0.0898",
          "radius2": "0.53 \u00b5m",
          "texture2": "0.85",
          "perimeter2": "3.2 \u00b5m",
          "area2": "25 \u00b5m\u00b2",
          "smoothness2": "0.0172",
          "compactness2": "0.094",
          "concavity2": "0.057",
          "concave_points2": "0.0177",
          "symmetry2": "0.0254",
          "fractal_dimension2": "0.0219",
          "radius3": "9.7 \u00b5m",
          "texture3": "15.7",
          "perimeter3": "63 \u00b5m",
          "area3": "284 \u00b5m\u00b2",
          "smoothness3": "0.121",
          "compactness3": "0.24",
          "concavity3": "0.14",
          "concave_points3": "0.048",
          "symmetry3": "0.225",
          "fractal_dimension3": "0.108"
        },
        "shap_values": {
          "radius1": -0.5591664616855225,
          "texture1": -0.5492504033643862,
          "perimeter1": -0.5063762785085096,
          "area1": -0.5619309945697654,
          "smoothness1": -0.007476549677466209,
          "compactness1": -0.3614203118028729,
          "concavity1": -0.07377329506759549,
          "concave_points1": -0.6030391221131497,
          "symmetry1": -0.044981698998436785,
          "fractal_dimension1": -0.2652972117159149,
          "radius2": 0.4612569779287561,
          "texture2": 0.26934890625978825,
          "perimeter2": 0.09788192664696888,
          "area2": -0.3398443622087211,
          "smoothness2": 0.9098348309320021,
          "compactness2": -3.56382142215242,
          "concavity2": -0.08060205001330664,
          "concave_points2": 0.40361379086238036,
          "symmetry2": -0.25201040488495186,
          "fractal_dimension2": -3.9965452817723426,
          "radius3": -1.347345849433907,
          "texture3": -2.5147814293440014,
          "perimeter3": -1.0586945716139307,
          "area3": -1.096099980524884,
          "smoothness3": -0.2851903126916086,
          "compactness3": 0.027730667799150486,
          "concavity3": -0.6317469975199792,
          "concave_points3": -0.8221798193383063,
          "symmetry3": -1.0912231593254142,
          "fractal_dimension3": 0.07409878671250554
        },
        "lime_explanation": [
          [
            "radius2",
            0.24260690222235837
          ],
          [
            "texture3",
            -0.23851619080418923
          ],
          [
            "compactness2",
            -0.17180001945307574
          ],
          [
            "symmetry3",
            -0.16164586222019556
          ],
          [
            "radius3",
            -0.1423725829995314
          ],
          [
            "area3",
            -0.11614920564868737
          ],
          [
            "fractal_dimension2",
            -0.11592854707033104
          ],
          [
            "perimeter3",
            -0.10778517146087042
          ]
        ],
        "top_factors": [
          {
            "feature": "fractal_dimension2",
            "label": "Fractal dimension (variability)",
            "value": 0.02193,
            "value_display": "0.0219",
            "shap_value": -3.9965452817723426,
            "direction": "decreases",
            "level": "mid-range",
            "sentence": "Fractal dimension (variability) of 0.0219 (mid-range for this range) pushed this prediction toward \u201cBenign\u201d."
          },
          {
            "feature": "compactness2",
            "label": "Compactness (variability)",
            "value": 0.09368,
            "value_display": "0.094",
            "shap_value": -3.56382142215242,
            "direction": "decreases",
            "level": "mid-range",
            "sentence": "Compactness (variability) of 0.094 (mid-range for this range) pushed this prediction toward \u201cBenign\u201d."
          },
          {
            "feature": "texture3",
            "label": "Texture (grey-scale s.d.) (worst)",
            "value": 15.67,
            "value_display": "15.7",
            "shap_value": -2.5147814293440014,
            "direction": "decreases",
            "level": "low",
            "sentence": "Texture (grey-scale s.d.) (worst) of 15.7 (low for this range) pushed this prediction toward \u201cBenign\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cMalignant\u201d (0%). Lowering it: Fractal dimension (variability) (0.0219), Compactness (variability) (0.094), Texture (grey-scale s.d.) (worst) (15.7).",
        "shap_lime_top5_overlap": 0.6
      },
      {
        "case": "false_positive",
        "case_label": "False positive (unnecessary referral)",
        "test_index": 4,
        "actual": 0,
        "probability": 0.5113259857487571,
        "patient": {
          "radius1": 13.38,
          "texture1": 30.72,
          "perimeter1": 86.34,
          "area1": 557.2,
          "smoothness1": 0.09245,
          "compactness1": 0.07426,
          "concavity1": 0.02819,
          "concave_points1": 0.03264,
          "symmetry1": 0.1375,
          "fractal_dimension1": 0.06016,
          "radius2": 0.3408,
          "texture2": 1.924,
          "perimeter2": 2.287,
          "area2": 28.93,
          "smoothness2": 0.005841,
          "compactness2": 0.01246,
          "concavity2": 0.007936,
          "concave_points2": 0.009128,
          "symmetry2": 0.01564,
          "fractal_dimension2": 0.002985,
          "radius3": 15.05,
          "texture3": 41.61,
          "perimeter3": 96.69,
          "area3": 705.6,
          "smoothness3": 0.1172,
          "compactness3": 0.1421,
          "concavity3": 0.07003,
          "concave_points3": 0.07763,
          "symmetry3": 0.2196,
          "fractal_dimension3": 0.07675
        },
        "patient_display": {
          "radius1": "13.4 \u00b5m",
          "texture1": "30.7",
          "perimeter1": "86 \u00b5m",
          "area1": "557 \u00b5m\u00b2",
          "smoothness1": "0.092",
          "compactness1": "0.074",
          "concavity1": "0.028",
          "concave_points1": "0.033",
          "symmetry1": "0.138",
          "fractal_dimension1": "0.0602",
          "radius2": "0.34 \u00b5m",
          "texture2": "1.92",
          "perimeter2": "2.3 \u00b5m",
          "area2": "29 \u00b5m\u00b2",
          "smoothness2": "0.0058",
          "compactness2": "0.012",
          "concavity2": "0.008",
          "concave_points2": "0.0091",
          "symmetry2": "0.0156",
          "fractal_dimension2": "0.0030",
          "radius3": "15.1 \u00b5m",
          "texture3": "41.6",
          "perimeter3": "97 \u00b5m",
          "area3": "706 \u00b5m\u00b2",
          "smoothness3": "0.117",
          "compactness3": "0.14",
          "concavity3": "0.07",
          "concave_points3": "0.078",
          "symmetry3": "0.220",
          "fractal_dimension3": "0.077"
        },
        "shap_values": {
          "radius1": -0.11882850966922441,
          "texture1": 1.2664160822757533,
          "perimeter1": -0.12198203635144615,
          "area1": -0.1715695765133337,
          "smoothness1": -0.1358231905988712,
          "compactness1": 0.2952728824193566,
          "concavity1": -0.6343578464581715,
          "concave_points1": -0.5086231542587494,
          "symmetry1": 0.27003963485108035,
          "fractal_dimension1": 0.025134492750573178,
          "radius2": -0.3341838103586559,
          "texture2": -0.5213804125381033,
          "perimeter2": -0.21748977779567794,
          "area2": -0.27244274486855724,
          "smoothness2": -0.09498552995407475,
          "compactness2": 0.6614537743393466,
          "concavity2": 0.0720152536715666,
          "concave_points2": -0.232081785494354,
          "symmetry2": 0.12665653283022446,
          "fractal_dimension2": 0.19216322095405625,
          "radius3": -0.37359478663749207,
          "texture3": 3.566965923112474,
          "perimeter3": -0.33280234016925864,
          "area3": -0.4269859417774349,
          "smoothness3": -0.3488472407304744,
          "compactness3": 0.13532357696356276,
          "concavity3": -0.9471494560129747,
          "concave_points3": -0.5110244135711263,
          "symmetry3": -1.188767921117033,
          "fractal_dimension3": -0.02892424514251182
        },
        "lime_explanation": [
          [
            "texture3",
            0.2661374423917702
          ],
          [
            "symmetry3",
            -0.1562933606309378
          ],
          [
            "concavity3",
            -0.10301402671642661
          ],
          [
            "concavity1",
            -0.09973329320988208
          ],
          [
            "compactness2",
            0.09168585828440984
          ],
          [
            "texture1",
            0.08602052986734283
          ],
          [
            "texture2",
            -0.07466036021389409
          ],
          [
            "perimeter2",
            -0.07332561981412744
          ]
        ],
        "top_factors": [
          {
            "feature": "texture3",
            "label": "Texture (grey-scale s.d.) (worst)",
            "value": 41.61,
            "value_display": "41.6",
            "shap_value": 3.566965923112474,
            "direction": "increases",
            "level": "high",
            "sentence": "Texture (grey-scale s.d.) (worst) of 41.6 (high for this range) pushed this prediction toward \u201cMalignant\u201d."
          },
          {
            "feature": "texture1",
            "label": "Texture (grey-scale s.d.) (mean)",
            "value": 30.72,
            "value_display": "30.7",
            "shap_value": 1.2664160822757533,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Texture (grey-scale s.d.) (mean) of 30.7 (mid-range for this range) pushed this prediction toward \u201cMalignant\u201d."
          },
          {
            "feature": "symmetry3",
            "label": "Symmetry (worst)",
            "value": 0.2196,
            "value_display": "0.220",
            "shap_value": -1.188767921117033,
            "direction": "decreases",
            "level": "low",
            "sentence": "Symmetry (worst) of 0.220 (low for this range) pushed this prediction toward \u201cBenign\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cMalignant\u201d (51%). Raising the estimate: Texture (grey-scale s.d.) (worst) (41.6), Texture (grey-scale s.d.) (mean) (30.7). Lowering it: Symmetry (worst) (0.220).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "false_negative",
        "case_label": "False negative (missed case)",
        "test_index": 16,
        "actual": 1,
        "probability": 0.06347811320655482,
        "patient": {
          "radius1": 13.8,
          "texture1": 15.79,
          "perimeter1": 90.43,
          "area1": 584.1,
          "smoothness1": 0.1007,
          "compactness1": 0.128,
          "concavity1": 0.07789,
          "concave_points1": 0.05069,
          "symmetry1": 0.1662,
          "fractal_dimension1": 0.06566,
          "radius2": 0.2787,
          "texture2": 0.6205,
          "perimeter2": 1.957,
          "area2": 23.35,
          "smoothness2": 0.004717,
          "compactness2": 0.02065,
          "concavity2": 0.01759,
          "concave_points2": 0.009206,
          "symmetry2": 0.0122,
          "fractal_dimension2": 0.00313,
          "radius3": 16.57,
          "texture3": 20.86,
          "perimeter3": 110.3,
          "area3": 812.4,
          "smoothness3": 0.1411,
          "compactness3": 0.3542,
          "concavity3": 0.2779,
          "concave_points3": 0.1383,
          "symmetry3": 0.2589,
          "fractal_dimension3": 0.103
        },
        "patient_display": {
          "radius1": "13.8 \u00b5m",
          "texture1": "15.8",
          "perimeter1": "90 \u00b5m",
          "area1": "584 \u00b5m\u00b2",
          "smoothness1": "0.101",
          "compactness1": "0.128",
          "concavity1": "0.078",
          "concave_points1": "0.051",
          "symmetry1": "0.166",
          "fractal_dimension1": "0.0657",
          "radius2": "0.28 \u00b5m",
          "texture2": "0.62",
          "perimeter2": "2.0 \u00b5m",
          "area2": "23 \u00b5m\u00b2",
          "smoothness2": "0.0047",
          "compactness2": "0.021",
          "concavity2": "0.018",
          "concave_points2": "0.0092",
          "symmetry2": "0.0122",
          "fractal_dimension2": "0.0031",
          "radius3": "16.6 \u00b5m",
          "texture3": "20.9",
          "perimeter3": "110 \u00b5m",
          "area3": "812 \u00b5m\u00b2",
          "smoothness3": "0.141",
          "compactness3": "0.35",
          "concavity3": "0.28",
          "concave_points3": "0.138",
          "symmetry3": "0.259",
          "fractal_dimension3": "0.103"
        },
        "shap_values": {
          "radius1": -0.07765710720999798,
          "texture1": -0.41939863355803314,
          "perimeter1": -0.06491588570090565,
          "area1": -0.13804236659724817,
          "smoothness1": 0.060990896315922714,
          "compactness1": -0.152351321760027,
          "concavity1": -0.1529157831419173,
          "concave_points1": -0.07387615941897287,
          "symmetry1": 0.0984815270430892,
          "fractal_dimension1": -0.028758030008053125,
          "radius2": -0.6006178608044396,
          "texture2": 0.44028749850225096,
          "perimeter2": -0.33561992815444447,
          "area2": -0.3802080814754668,
          "smoothness2": -0.1943274321122197,
          "compactness2": 0.2353887182045574,
          "concavity2": 0.041807203280502366,
          "concave_points2": -0.22627022256000973,
          "symmetry2": 0.25998450271151485,
          "fractal_dimension2": 0.16010395819895842,
          "radius3": -0.09522322082019855,
          "texture3": -1.2979630500360175,
          "perimeter3": -0.04333872253193113,
          "area3": -0.2573245473371986,
          "smoothness3": 0.08583863930635166,
          "compactness3": -0.08950850218689876,
          "concavity3": -0.053559309537045206,
          "concave_points3": 0.12309713388923035,
          "symmetry3": -0.5278180696669252,
          "fractal_dimension3": 0.05652139739127036
        },
        "lime_explanation": [
          [
            "texture3",
            -0.24112881417704907
          ],
          [
            "radius2",
            -0.08060940055149292
          ],
          [
            "symmetry3",
            -0.06077125781656026
          ],
          [
            "texture2",
            0.05970181332620182
          ],
          [
            "symmetry2",
            0.05946074893712537
          ],
          [
            "texture1",
            -0.05836955697999128
          ],
          [
            "area2",
            -0.05034959603276005
          ],
          [
            "concavity2",
            0.03934979466442106
          ]
        ],
        "top_factors": [
          {
            "feature": "texture3",
            "label": "Texture (grey-scale s.d.) (worst)",
            "value": 20.86,
            "value_display": "20.9",
            "shap_value": -1.2979630500360175,
            "direction": "decreases",
            "level": "low",
            "sentence": "Texture (grey-scale s.d.) (worst) of 20.9 (low for this range) pushed this prediction toward \u201cBenign\u201d."
          },
          {
            "feature": "radius2",
            "label": "Radius (variability)",
            "value": 0.2787,
            "value_display": "0.28 \u00b5m",
            "shap_value": -0.6006178608044396,
            "direction": "decreases",
            "level": "low",
            "sentence": "Radius (variability) of 0.28 \u00b5m (low for this range) pushed this prediction toward \u201cBenign\u201d."
          },
          {
            "feature": "symmetry3",
            "label": "Symmetry (worst)",
            "value": 0.2589,
            "value_display": "0.259",
            "shap_value": -0.5278180696669252,
            "direction": "decreases",
            "level": "low",
            "sentence": "Symmetry (worst) of 0.259 (low for this range) pushed this prediction toward \u201cBenign\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cMalignant\u201d (6%). Lowering it: Texture (grey-scale s.d.) (worst) (20.9), Radius (variability) (0.28 \u00b5m), Symmetry (worst) (0.259).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "borderline",
        "case_label": "Borderline (p \u2248 0.5)",
        "test_index": 112,
        "actual": 1,
        "probability": 0.5035193580714843,
        "patient": {
          "radius1": 15.12,
          "texture1": 16.68,
          "perimeter1": 98.78,
          "area1": 716.6,
          "smoothness1": 0.08876,
          "compactness1": 0.09588,
          "concavity1": 0.0755,
          "concave_points1": 0.04079,
          "symmetry1": 0.1594,
          "fractal_dimension1": 0.05986,
          "radius2": 0.2711,
          "texture2": 0.3621,
          "perimeter2": 1.974,
          "area2": 26.44,
          "smoothness2": 0.005472,
          "compactness2": 0.01919,
          "concavity2": 0.02039,
          "concave_points2": 0.00826,
          "symmetry2": 0.01523,
          "fractal_dimension2": 0.002881,
          "radius3": 17.77,
          "texture3": 20.24,
          "perimeter3": 117.7,
          "area3": 989.5,
          "smoothness3": 0.1491,
          "compactness3": 0.3331,
          "concavity3": 0.3327,
          "concave_points3": 0.1252,
          "symmetry3": 0.3415,
          "fractal_dimension3": 0.0974
        },
        "patient_display": {
          "radius1": "15.1 \u00b5m",
          "texture1": "16.7",
          "perimeter1": "99 \u00b5m",
          "area1": "717 \u00b5m\u00b2",
          "smoothness1": "0.089",
          "compactness1": "0.096",
          "concavity1": "0.075",
          "concave_points1": "0.041",
          "symmetry1": "0.159",
          "fractal_dimension1": "0.0599",
          "radius2": "0.27 \u00b5m",
          "texture2": "0.36",
          "perimeter2": "2.0 \u00b5m",
          "area2": "26 \u00b5m\u00b2",
          "smoothness2": "0.0055",
          "compactness2": "0.019",
          "concavity2": "0.020",
          "concave_points2": "0.0083",
          "symmetry2": "0.0152",
          "fractal_dimension2": "0.0029",
          "radius3": "17.8 \u00b5m",
          "texture3": "20.2",
          "perimeter3": "118 \u00b5m",
          "area3": "990 \u00b5m\u00b2",
          "smoothness3": "0.149",
          "compactness3": "0.33",
          "concavity3": "0.33",
          "concave_points3": "0.125",
          "symmetry3": "0.342",
          "fractal_dimension3": "0.097"
        },
        "shap_values": {
          "radius1": 0.05173872909042783,
          "texture1": -0.3189046551861597,
          "perimeter1": 0.05158835829225141,
          "area1": 0.02710095362138907,
          "smoothness1": -0.22385276401894272,
          "compactness1": 0.11519034996014046,
          "concavity1": -0.17606762481849375,
          "concave_points1": -0.3123246496635041,
          "symmetry1": 0.13912944108818817,
          "fractal_dimension1": 0.02807408490104372,
          "radius2": -0.633224926559479,
          "texture2": 0.6309242366785668,
          "perimeter2": -0.32953443556020506,
          "area2": -0.32053157787056524,
          "smoothness2": -0.12759866331382158,
          "compactness2": 0.3113417074544711,
          "concavity2": 0.03304580478299048,
          "concave_points2": -0.29675404994321075,
          "symmetry2": 0.1425473664497969,
          "fractal_dimension2": 0.21515745079219536,
          "radius3": 0.12454380482503316,
          "texture3": -1.4433247832096112,
          "perimeter3": 0.11404781461106854,
          "area3": 0.02401471254450417,
          "smoothness3": 0.23134018910947343,
          "compactness3": -0.06714189742464162,
          "concavity3": 0.18201455887533247,
          "concave_points3": -0.013823787022763585,
          "symmetry3": 0.8613538827447512,
          "fractal_dimension3": 0.03829299365073017
        },
        "lime_explanation": [
          [
            "texture3",
            -0.2260233578046848
          ],
          [
            "symmetry3",
            0.19144928120787144
          ],
          [
            "radius2",
            -0.0851102975884619
          ],
          [
            "compactness2",
            0.06632834602189275
          ],
          [
            "texture2",
            0.057976015271936666
          ],
          [
            "perimeter2",
            -0.053629804339308244
          ],
          [
            "area2",
            -0.05202571155409048
          ],
          [
            "fractal_dimension2",
            0.040798954486260745
          ]
        ],
        "top_factors": [
          {
            "feature": "texture3",
            "label": "Texture (grey-scale s.d.) (worst)",
            "value": 20.24,
            "value_display": "20.2",
            "shap_value": -1.4433247832096112,
            "direction": "decreases",
            "level": "low",
            "sentence": "Texture (grey-scale s.d.) (worst) of 20.2 (low for this range) pushed this prediction toward \u201cBenign\u201d."
          },
          {
            "feature": "symmetry3",
            "label": "Symmetry (worst)",
            "value": 0.3415,
            "value_display": "0.342",
            "shap_value": 0.8613538827447512,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Symmetry (worst) of 0.342 (mid-range for this range) pushed this prediction toward \u201cMalignant\u201d."
          },
          {
            "feature": "radius2",
            "label": "Radius (variability)",
            "value": 0.2711,
            "value_display": "0.27 \u00b5m",
            "shap_value": -0.633224926559479,
            "direction": "decreases",
            "level": "low",
            "sentence": "Radius (variability) of 0.27 \u00b5m (low for this range) pushed this prediction toward \u201cBenign\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cMalignant\u201d (50%). Raising the estimate: Symmetry (worst) (0.342). Lowering it: Texture (grey-scale s.d.) (worst) (20.2), Radius (variability) (0.27 \u00b5m).",
        "shap_lime_top5_overlap": 0.8
      }
    ]
  },
  "breast_cancer_recurrence": {
    "model": "random_forest",
    "model_label": "Random Forest",
    "cases": [
      {
        "case": "true_positive",
        "case_label": "True positive (correctly flagged)",
        "test_index": 16,
        "actual": 1,
        "probability": 0.7558214398885857,
        "patient": {
          "age": 45.0,
          "menopause": 1.0,
          "tumor-size": 32.0,
          "inv-nodes": 13.0,
          "node-caps": 1.0,
          "deg-malig": 3.0,
          "breast": 0.0,
          "breast-quad": 2.0,
          "irradiat": 1.0
        },
        "patient_display": {
          "age": "45 years",
          "menopause": "Premenopausal",
          "tumor-size": "32 mm",
          "inv-nodes": "13",
          "node-caps": "Yes",
          "deg-malig": "Grade 3 (poorly differentiated)",
          "breast": "Left",
          "breast-quad": "Upper left",
          "irradiat": "Yes"
        },
        "shap_values": {
          "age": 0.004493209061625287,
          "menopause": -0.0023530882515557083,
          "tumor-size": 0.026323525991636464,
          "inv-nodes": 0.16564701393471634,
          "node-caps": 0.09770278901440728,
          "deg-malig": 0.12376168248902826,
          "breast": 0.029479455668929944,
          "breast-quad": -0.026568367123832964,
          "irradiat": 0.03638492670597038
        },
        "lime_explanation": [
          [
            "deg-malig",
            0.19380725254544448
          ],
          [
            "node-caps",
            0.08260942582020729
          ],
          [
            "inv-nodes",
            0.06828875785121388
          ],
          [
            "breast",
            0.050615173298301445
          ],
          [
            "tumor-size",
            0.04873146754512901
          ],
          [
            "irradiat",
            0.0416366986961644
          ],
          [
            "breast-quad",
            -0.028251363615707487
          ],
          [
            "menopause",
            -0.022710060413961213
          ]
        ],
        "top_factors": [
          {
            "feature": "inv-nodes",
            "label": "Involved axillary nodes (band midpoint)",
            "value": 13.0,
            "value_display": "13",
            "shap_value": 0.16564701393471634,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Involved axillary nodes (band midpoint) of 13 (mid-range for this range) pushed this prediction toward \u201cRecurrence\u201d."
          },
          {
            "feature": "deg-malig",
            "label": "Histological grade",
            "value": 3.0,
            "value_display": "Grade 3 (poorly differentiated)",
            "shap_value": 0.12376168248902826,
            "direction": "increases",
            "level": "",
            "sentence": "Histological grade of Grade 3 (poorly differentiated) pushed this prediction toward \u201cRecurrence\u201d."
          },
          {
            "feature": "node-caps",
            "label": "Node capsular invasion",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.09770278901440728,
            "direction": "increases",
            "level": "",
            "sentence": "Node capsular invasion of Yes pushed this prediction toward \u201cRecurrence\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cRecurrence\u201d (76%). Raising the estimate: Involved axillary nodes (band midpoint) (13), Histological grade (Grade 3 (poorly differentiated)), Node capsular invasion (Yes).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "true_negative",
        "case_label": "True negative (correctly cleared)",
        "test_index": 11,
        "actual": 0,
        "probability": 0.0693717951082129,
        "patient": {
          "age": 75.0,
          "menopause": 2.0,
          "tumor-size": 2.0,
          "inv-nodes": 1.0,
          "node-caps": 0.0,
          "deg-malig": 1.0,
          "breast": 0.0,
          "breast-quad": 3.0,
          "irradiat": 0.0
        },
        "patient_display": {
          "age": "75 years",
          "menopause": "Menopause at 40 or later",
          "tumor-size": "2 mm",
          "inv-nodes": "1",
          "node-caps": "No",
          "deg-malig": "Grade 1 (well differentiated)",
          "breast": "Left",
          "breast-quad": "Lower right",
          "irradiat": "No"
        },
        "shap_values": {
          "age": -0.0033353438424553257,
          "menopause": -0.004685674693063312,
          "tumor-size": -0.08181177124517383,
          "inv-nodes": -0.04136662266828877,
          "node-caps": -0.026660916986176904,
          "deg-malig": -0.05592816495781046,
          "breast": 0.0014021744210490111,
          "breast-quad": -0.0009377334820041496,
          "irradiat": -0.01825444383552444
        },
        "lime_explanation": [
          [
            "node-caps",
            -0.08242347278795938
          ],
          [
            "deg-malig",
            -0.07245402318966745
          ],
          [
            "breast-quad",
            0.06036251079562036
          ],
          [
            "tumor-size",
            -0.056745780870452116
          ],
          [
            "irradiat",
            -0.04806654268940139
          ],
          [
            "breast",
            0.046353966912682905
          ],
          [
            "inv-nodes",
            -0.03673861996373811
          ],
          [
            "menopause",
            0.018908137615817826
          ]
        ],
        "top_factors": [
          {
            "feature": "tumor-size",
            "label": "Tumour size (band midpoint)",
            "value": 2.0,
            "value_display": "2 mm",
            "shap_value": -0.08181177124517383,
            "direction": "decreases",
            "level": "low",
            "sentence": "Tumour size (band midpoint) of 2 mm (low for this range) pushed this prediction toward \u201cNo recurrence\u201d."
          },
          {
            "feature": "deg-malig",
            "label": "Histological grade",
            "value": 1.0,
            "value_display": "Grade 1 (well differentiated)",
            "shap_value": -0.05592816495781046,
            "direction": "decreases",
            "level": "",
            "sentence": "Histological grade of Grade 1 (well differentiated) pushed this prediction toward \u201cNo recurrence\u201d."
          },
          {
            "feature": "inv-nodes",
            "label": "Involved axillary nodes (band midpoint)",
            "value": 1.0,
            "value_display": "1",
            "shap_value": -0.04136662266828877,
            "direction": "decreases",
            "level": "low",
            "sentence": "Involved axillary nodes (band midpoint) of 1 (low for this range) pushed this prediction toward \u201cNo recurrence\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cRecurrence\u201d (7%). Lowering it: Tumour size (band midpoint) (2 mm), Histological grade (Grade 1 (well differentiated)), Involved axillary nodes (band midpoint) (1).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "false_positive",
        "case_label": "False positive (unnecessary referral)",
        "test_index": 12,
        "actual": 0,
        "probability": 0.6514785309148083,
        "patient": {
          "age": 65.0,
          "menopause": 2.0,
          "tumor-size": 32.0,
          "inv-nodes": 4.0,
          "node-caps": 1.0,
          "deg-malig": 3.0,
          "breast": 0.0,
          "breast-quad": 1.0,
          "irradiat": 0.0
        },
        "patient_display": {
          "age": "65 years",
          "menopause": "Menopause at 40 or later",
          "tumor-size": "32 mm",
          "inv-nodes": "4",
          "node-caps": "Yes",
          "deg-malig": "Grade 3 (poorly differentiated)",
          "breast": "Left",
          "breast-quad": "Lower left",
          "irradiat": "No"
        },
        "shap_values": {
          "age": 0.006394882100439014,
          "menopause": -0.0012176682992087468,
          "tumor-size": 0.029150574444331143,
          "inv-nodes": 0.09404439647991275,
          "node-caps": 0.08094000509142824,
          "deg-malig": 0.1528499071814669,
          "breast": 0.016607806165178925,
          "breast-quad": -0.008573268988673409,
          "irradiat": -0.019668395657726916
        },
        "lime_explanation": [
          [
            "deg-malig",
            0.19612369166101543
          ],
          [
            "node-caps",
            0.08290849465670877
          ],
          [
            "breast",
            0.04668745978496195
          ],
          [
            "irradiat",
            -0.04317207970632532
          ],
          [
            "tumor-size",
            0.04125424438797491
          ],
          [
            "breast-quad",
            -0.019499510241200804
          ],
          [
            "menopause",
            0.01835769393943961
          ],
          [
            "inv-nodes",
            -0.010608377017911962
          ]
        ],
        "top_factors": [
          {
            "feature": "deg-malig",
            "label": "Histological grade",
            "value": 3.0,
            "value_display": "Grade 3 (poorly differentiated)",
            "shap_value": 0.1528499071814669,
            "direction": "increases",
            "level": "",
            "sentence": "Histological grade of Grade 3 (poorly differentiated) pushed this prediction toward \u201cRecurrence\u201d."
          },
          {
            "feature": "inv-nodes",
            "label": "Involved axillary nodes (band midpoint)",
            "value": 4.0,
            "value_display": "4",
            "shap_value": 0.09404439647991275,
            "direction": "increases",
            "level": "low",
            "sentence": "Involved axillary nodes (band midpoint) of 4 (low for this range) pushed this prediction toward \u201cRecurrence\u201d."
          },
          {
            "feature": "node-caps",
            "label": "Node capsular invasion",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.08094000509142824,
            "direction": "increases",
            "level": "",
            "sentence": "Node capsular invasion of Yes pushed this prediction toward \u201cRecurrence\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cRecurrence\u201d (65%). Raising the estimate: Histological grade (Grade 3 (poorly differentiated)), Involved axillary nodes (band midpoint) (4), Node capsular invasion (Yes).",
        "shap_lime_top5_overlap": 0.8
      },
      {
        "case": "false_negative",
        "case_label": "False negative (missed case)",
        "test_index": 39,
        "actual": 1,
        "probability": 0.12613092255257236,
        "patient": {
          "age": 45.0,
          "menopause": 1.0,
          "tumor-size": 17.0,
          "inv-nodes": 1.0,
          "node-caps": 0.0,
          "deg-malig": 2.0,
          "breast": 0.0,
          "breast-quad": 2.0,
          "irradiat": 0.0
        },
        "patient_display": {
          "age": "45 years",
          "menopause": "Premenopausal",
          "tumor-size": "17 mm",
          "inv-nodes": "1",
          "node-caps": "No",
          "deg-malig": "Grade 2 (moderately differentiated)",
          "breast": "Left",
          "breast-quad": "Upper left",
          "irradiat": "No"
        },
        "shap_values": {
          "age": 0.00021051891449434647,
          "menopause": 0.002662322048754783,
          "tumor-size": -0.05375503288577439,
          "inv-nodes": -0.03699128556307622,
          "node-caps": -0.02570746251032798,
          "deg-malig": -0.03794769352567938,
          "breast": 0.002307637073363893,
          "breast-quad": -0.014362702561371133,
          "irradiat": -0.011235670835472441
        },
        "lime_explanation": [
          [
            "deg-malig",
            -0.10133866349512449
          ],
          [
            "node-caps",
            -0.08245716439838735
          ],
          [
            "tumor-size",
            -0.05979637733612754
          ],
          [
            "breast",
            0.045939026934978075
          ],
          [
            "irradiat",
            -0.03916405918736863
          ],
          [
            "inv-nodes",
            -0.034799995389890634
          ],
          [
            "breast-quad",
            -0.02703601320899824
          ],
          [
            "menopause",
            -0.022776404335006106
          ]
        ],
        "top_factors": [
          {
            "feature": "tumor-size",
            "label": "Tumour size (band midpoint)",
            "value": 17.0,
            "value_display": "17 mm",
            "shap_value": -0.05375503288577439,
            "direction": "decreases",
            "level": "low",
            "sentence": "Tumour size (band midpoint) of 17 mm (low for this range) pushed this prediction toward \u201cNo recurrence\u201d."
          },
          {
            "feature": "deg-malig",
            "label": "Histological grade",
            "value": 2.0,
            "value_display": "Grade 2 (moderately differentiated)",
            "shap_value": -0.03794769352567938,
            "direction": "decreases",
            "level": "",
            "sentence": "Histological grade of Grade 2 (moderately differentiated) pushed this prediction toward \u201cNo recurrence\u201d."
          },
          {
            "feature": "inv-nodes",
            "label": "Involved axillary nodes (band midpoint)",
            "value": 1.0,
            "value_display": "1",
            "shap_value": -0.03699128556307622,
            "direction": "decreases",
            "level": "low",
            "sentence": "Involved axillary nodes (band midpoint) of 1 (low for this range) pushed this prediction toward \u201cNo recurrence\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cRecurrence\u201d (13%). Lowering it: Tumour size (band midpoint) (17 mm), Histological grade (Grade 2 (moderately differentiated)), Involved axillary nodes (band midpoint) (1).",
        "shap_lime_top5_overlap": 0.6
      },
      {
        "case": "borderline",
        "case_label": "Borderline (p \u2248 0.5)",
        "test_index": 46,
        "actual": 1,
        "probability": 0.5112915351824409,
        "patient": {
          "age": 35.0,
          "menopause": 1.0,
          "tumor-size": 32.0,
          "inv-nodes": 4.0,
          "node-caps": 0.0,
          "deg-malig": 3.0,
          "breast": 1.0,
          "breast-quad": 2.0,
          "irradiat": 1.0
        },
        "patient_display": {
          "age": "35 years",
          "menopause": "Premenopausal",
          "tumor-size": "32 mm",
          "inv-nodes": "4",
          "node-caps": "No",
          "deg-malig": "Grade 3 (poorly differentiated)",
          "breast": "Right",
          "breast-quad": "Upper left",
          "irradiat": "Yes"
        },
        "shap_values": {
          "age": 0.00387318011012413,
          "menopause": -0.009912094453562056,
          "tumor-size": 0.04731443427201916,
          "inv-nodes": 0.054133177492540346,
          "node-caps": -0.01901336576080233,
          "deg-malig": 0.1311098478819972,
          "breast": -0.015829436778766106,
          "breast-quad": -0.019445769031117683,
          "irradiat": 0.03811126905234683
        },
        "lime_explanation": [
          [
            "deg-malig",
            0.19197820046766256
          ],
          [
            "node-caps",
            -0.07898140931819807
          ],
          [
            "tumor-size",
            0.046686062140681724
          ],
          [
            "breast",
            -0.04533048578462415
          ],
          [
            "irradiat",
            0.040020016120504
          ],
          [
            "breast-quad",
            -0.026398379924078317
          ],
          [
            "menopause",
            -0.024048711257114445
          ],
          [
            "age",
            0.011748697665224876
          ]
        ],
        "top_factors": [
          {
            "feature": "deg-malig",
            "label": "Histological grade",
            "value": 3.0,
            "value_display": "Grade 3 (poorly differentiated)",
            "shap_value": 0.1311098478819972,
            "direction": "increases",
            "level": "",
            "sentence": "Histological grade of Grade 3 (poorly differentiated) pushed this prediction toward \u201cRecurrence\u201d."
          },
          {
            "feature": "inv-nodes",
            "label": "Involved axillary nodes (band midpoint)",
            "value": 4.0,
            "value_display": "4",
            "shap_value": 0.054133177492540346,
            "direction": "increases",
            "level": "low",
            "sentence": "Involved axillary nodes (band midpoint) of 4 (low for this range) pushed this prediction toward \u201cRecurrence\u201d."
          },
          {
            "feature": "tumor-size",
            "label": "Tumour size (band midpoint)",
            "value": 32.0,
            "value_display": "32 mm",
            "shap_value": 0.04731443427201916,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Tumour size (band midpoint) of 32 mm (mid-range for this range) pushed this prediction toward \u201cRecurrence\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cRecurrence\u201d (51%). Raising the estimate: Histological grade (Grade 3 (poorly differentiated)), Involved axillary nodes (band midpoint) (4), Tumour size (band midpoint) (32 mm).",
        "shap_lime_top5_overlap": 0.6
      }
    ]
  },
  "breast_cancer_survival": {
    "model": "random_forest",
    "model_label": "Random Forest",
    "cases": [
      {
        "case": "true_positive",
        "case_label": "True positive (correctly flagged)",
        "test_index": 45,
        "actual": 1,
        "probability": 0.7790251170800729,
        "patient": {
          "age": 56.0,
          "operation_year": 65.0,
          "positive_auxillary_nodes": 9.0
        },
        "patient_display": {
          "age": "56 years",
          "operation_year": "65 19xx",
          "positive_auxillary_nodes": "9"
        },
        "shap_values": {
          "age": 0.021513539783814588,
          "operation_year": 0.049788308828789776,
          "positive_auxillary_nodes": 0.21052673473960706
        },
        "lime_explanation": [
          [
            "positive_auxillary_nodes",
            0.2500172908124772
          ],
          [
            "age",
            0.08535280836755979
          ],
          [
            "operation_year",
            0.04295714586699166
          ]
        ],
        "top_factors": [
          {
            "feature": "positive_auxillary_nodes",
            "label": "Positive axillary nodes",
            "value": 9.0,
            "value_display": "9",
            "shap_value": 0.21052673473960706,
            "direction": "increases",
            "level": "low",
            "sentence": "Positive axillary nodes of 9 (low for this range) pushed this prediction toward \u201cDied within five years\u201d."
          },
          {
            "feature": "operation_year",
            "label": "Year of operation",
            "value": 65.0,
            "value_display": "65 19xx",
            "shap_value": 0.049788308828789776,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Year of operation of 65 19xx (mid-range for this range) pushed this prediction toward \u201cDied within five years\u201d."
          },
          {
            "feature": "age",
            "label": "Age at operation",
            "value": 56.0,
            "value_display": "56 years",
            "shap_value": 0.021513539783814588,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Age at operation of 56 years (mid-range for this range) pushed this prediction toward \u201cDied within five years\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cDied within five years\u201d (78%). Raising the estimate: Positive axillary nodes (9), Year of operation (65 19xx), Age at operation (56 years).",
        "shap_lime_top5_overlap": 0.6
      },
      {
        "case": "true_negative",
        "case_label": "True negative (correctly cleared)",
        "test_index": 39,
        "actual": 0,
        "probability": 0.0640759931193227,
        "patient": {
          "age": 36.0,
          "operation_year": 60.0,
          "positive_auxillary_nodes": 1.0
        },
        "patient_display": {
          "age": "36 years",
          "operation_year": "60 19xx",
          "positive_auxillary_nodes": "1"
        },
        "shap_values": {
          "age": -0.2613965548801768,
          "operation_year": -0.07845304857422777,
          "positive_auxillary_nodes": -0.09327093715413488
        },
        "lime_explanation": [
          [
            "age",
            -0.2347392215537995
          ],
          [
            "positive_auxillary_nodes",
            -0.13969315282765904
          ],
          [
            "operation_year",
            -0.014772737271811361
          ]
        ],
        "top_factors": [
          {
            "feature": "age",
            "label": "Age at operation",
            "value": 36.0,
            "value_display": "36 years",
            "shap_value": -0.2613965548801768,
            "direction": "decreases",
            "level": "low",
            "sentence": "Age at operation of 36 years (low for this range) pushed this prediction toward \u201cSurvived five years\u201d."
          },
          {
            "feature": "positive_auxillary_nodes",
            "label": "Positive axillary nodes",
            "value": 1.0,
            "value_display": "1",
            "shap_value": -0.09327093715413488,
            "direction": "decreases",
            "level": "low",
            "sentence": "Positive axillary nodes of 1 (low for this range) pushed this prediction toward \u201cSurvived five years\u201d."
          },
          {
            "feature": "operation_year",
            "label": "Year of operation",
            "value": 60.0,
            "value_display": "60 19xx",
            "shap_value": -0.07845304857422777,
            "direction": "decreases",
            "level": "low",
            "sentence": "Year of operation of 60 19xx (low for this range) pushed this prediction toward \u201cSurvived five years\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cDied within five years\u201d (6%). Lowering it: Age at operation (36 years), Positive axillary nodes (1), Year of operation (60 19xx).",
        "shap_lime_top5_overlap": 0.6
      },
      {
        "case": "false_positive",
        "case_label": "False positive (unnecessary referral)",
        "test_index": 32,
        "actual": 0,
        "probability": 0.799269693124854,
        "patient": {
          "age": 64.0,
          "operation_year": 65.0,
          "positive_auxillary_nodes": 22.0
        },
        "patient_display": {
          "age": "64 years",
          "operation_year": "65 19xx",
          "positive_auxillary_nodes": "22"
        },
        "shap_values": {
          "age": 0.012409959170319711,
          "operation_year": 0.04489718952744036,
          "positive_auxillary_nodes": 0.24476601069923254
        },
        "lime_explanation": [
          [
            "positive_auxillary_nodes",
            0.25668559944528524
          ],
          [
            "age",
            0.09768641374927112
          ],
          [
            "operation_year",
            0.042872297482038274
          ]
        ],
        "top_factors": [
          {
            "feature": "positive_auxillary_nodes",
            "label": "Positive axillary nodes",
            "value": 22.0,
            "value_display": "22",
            "shap_value": 0.24476601069923254,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Positive axillary nodes of 22 (mid-range for this range) pushed this prediction toward \u201cDied within five years\u201d."
          },
          {
            "feature": "operation_year",
            "label": "Year of operation",
            "value": 65.0,
            "value_display": "65 19xx",
            "shap_value": 0.04489718952744036,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Year of operation of 65 19xx (mid-range for this range) pushed this prediction toward \u201cDied within five years\u201d."
          },
          {
            "feature": "age",
            "label": "Age at operation",
            "value": 64.0,
            "value_display": "64 years",
            "shap_value": 0.012409959170319711,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Age at operation of 64 years (mid-range for this range) pushed this prediction toward \u201cDied within five years\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cDied within five years\u201d (80%). Raising the estimate: Positive axillary nodes (22), Year of operation (65 19xx), Age at operation (64 years).",
        "shap_lime_top5_overlap": 0.6
      },
      {
        "case": "false_negative",
        "case_label": "False negative (missed case)",
        "test_index": 15,
        "actual": 1,
        "probability": 0.08640003588314141,
        "patient": {
          "age": 34.0,
          "operation_year": 59.0,
          "positive_auxillary_nodes": 0.0
        },
        "patient_display": {
          "age": "34 years",
          "operation_year": "59 19xx",
          "positive_auxillary_nodes": "0"
        },
        "shap_values": {
          "age": -0.23380860145309604,
          "operation_year": -0.05090134900611137,
          "positive_auxillary_nodes": -0.12608654738551356
        },
        "lime_explanation": [
          [
            "age",
            -0.23620841019348335
          ],
          [
            "positive_auxillary_nodes",
            -0.08770939342809898
          ],
          [
            "operation_year",
            -0.0024542685319973133
          ]
        ],
        "top_factors": [
          {
            "feature": "age",
            "label": "Age at operation",
            "value": 34.0,
            "value_display": "34 years",
            "shap_value": -0.23380860145309604,
            "direction": "decreases",
            "level": "low",
            "sentence": "Age at operation of 34 years (low for this range) pushed this prediction toward \u201cSurvived five years\u201d."
          },
          {
            "feature": "positive_auxillary_nodes",
            "label": "Positive axillary nodes",
            "value": 0.0,
            "value_display": "0",
            "shap_value": -0.12608654738551356,
            "direction": "decreases",
            "level": "low",
            "sentence": "Positive axillary nodes of 0 (low for this range) pushed this prediction toward \u201cSurvived five years\u201d."
          },
          {
            "feature": "operation_year",
            "label": "Year of operation",
            "value": 59.0,
            "value_display": "59 19xx",
            "shap_value": -0.05090134900611137,
            "direction": "decreases",
            "level": "low",
            "sentence": "Year of operation of 59 19xx (low for this range) pushed this prediction toward \u201cSurvived five years\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cDied within five years\u201d (9%). Lowering it: Age at operation (34 years), Positive axillary nodes (0), Year of operation (59 19xx).",
        "shap_lime_top5_overlap": 0.6
      },
      {
        "case": "borderline",
        "case_label": "Borderline (p \u2248 0.5)",
        "test_index": 4,
        "actual": 0,
        "probability": 0.503131190030928,
        "patient": {
          "age": 77.0,
          "operation_year": 65.0,
          "positive_auxillary_nodes": 3.0
        },
        "patient_display": {
          "age": "77 years",
          "operation_year": "65 19xx",
          "positive_auxillary_nodes": "3"
        },
        "shap_values": {
          "age": 0.00023218244990837953,
          "operation_year": 0.026098804423827494,
          "positive_auxillary_nodes": -0.02039633057066966
        },
        "lime_explanation": [
          [
            "age",
            0.09726427519205068
          ],
          [
            "positive_auxillary_nodes",
            -0.041319388277123184
          ],
          [
            "operation_year",
            0.028237157390563976
          ]
        ],
        "top_factors": [
          {
            "feature": "operation_year",
            "label": "Year of operation",
            "value": 65.0,
            "value_display": "65 19xx",
            "shap_value": 0.026098804423827494,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Year of operation of 65 19xx (mid-range for this range) pushed this prediction toward \u201cDied within five years\u201d."
          },
          {
            "feature": "positive_auxillary_nodes",
            "label": "Positive axillary nodes",
            "value": 3.0,
            "value_display": "3",
            "shap_value": -0.02039633057066966,
            "direction": "decreases",
            "level": "low",
            "sentence": "Positive axillary nodes of 3 (low for this range) pushed this prediction toward \u201cSurvived five years\u201d."
          },
          {
            "feature": "age",
            "label": "Age at operation",
            "value": 77.0,
            "value_display": "77 years",
            "shap_value": 0.00023218244990837953,
            "direction": "increases",
            "level": "high",
            "sentence": "Age at operation of 77 years (high for this range) pushed this prediction toward \u201cDied within five years\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cDied within five years\u201d (50%). Raising the estimate: Year of operation (65 19xx), Age at operation (77 years). Lowering it: Positive axillary nodes (3).",
        "shap_lime_top5_overlap": 0.6
      }
    ]
  },
  "cervical_cancer": {
    "model": "logistic_regression",
    "model_label": "Logistic Regression",
    "cases": [
      {
        "case": "true_positive",
        "case_label": "True positive (correctly flagged)",
        "test_index": 6,
        "actual": 1,
        "probability": 0.6521001475849065,
        "patient": {
          "Age": 22.0,
          "Number of sexual partners": 3.0,
          "First sexual intercourse": 17.0,
          "Num of pregnancies": 1.0,
          "Smokes": 0.0,
          "Smokes (years)": 0.0,
          "Smokes (packs/year)": 0.0,
          "Hormonal Contraceptives": 0.0,
          "Hormonal Contraceptives (years)": 0.0,
          "IUD": 0.0,
          "IUD (years)": 0.0,
          "STDs": 1.0,
          "STDs (number)": 2.0,
          "STDs:condylomatosis": 1.0,
          "STDs:vaginal condylomatosis": 0.0,
          "STDs:vulvo-perineal condylomatosis": 1.0,
          "STDs:syphilis": 0.0,
          "STDs:pelvic inflammatory disease": 0.0,
          "STDs:genital herpes": 0.0,
          "STDs:molluscum contagiosum": 0.0,
          "STDs:HIV": 0.0,
          "STDs:Hepatitis B": 0.0,
          "STDs:HPV": 0.0,
          "STDs: Number of diagnosis": 0.0,
          "Dx:Cancer": 0.0,
          "Dx:CIN": 0.0,
          "Dx:HPV": 0.0,
          "Dx": 0.0
        },
        "patient_display": {
          "Age": "22 years",
          "Number of sexual partners": "3",
          "First sexual intercourse": "17 years",
          "Num of pregnancies": "1",
          "Smokes": "No",
          "Smokes (years)": "0.0 years",
          "Smokes (packs/year)": "0.0",
          "Hormonal Contraceptives": "No",
          "Hormonal Contraceptives (years)": "0.0 years",
          "IUD": "No",
          "IUD (years)": "0.0 years",
          "STDs": "Yes",
          "STDs (number)": "2",
          "STDs:condylomatosis": "Yes",
          "STDs:vaginal condylomatosis": "No",
          "STDs:vulvo-perineal condylomatosis": "Yes",
          "STDs:syphilis": "No",
          "STDs:pelvic inflammatory disease": "No",
          "STDs:genital herpes": "No",
          "STDs:molluscum contagiosum": "No",
          "STDs:HIV": "No",
          "STDs:Hepatitis B": "No",
          "STDs:HPV": "No",
          "STDs: Number of diagnosis": "0",
          "Dx:Cancer": "No",
          "Dx:CIN": "No",
          "Dx:HPV": "No",
          "Dx": "No"
        },
        "shap_values": {
          "Age": -0.03605820680717217,
          "Number of sexual partners": -0.002463764231789165,
          "First sexual intercourse": 0.0021487490973340524,
          "Num of pregnancies": -0.08504549618634098,
          "Smokes": 0.0015648369398016224,
          "Smokes (years)": -0.026003264558029524,
          "Smokes (packs/year)": 0.0006155868589552634,
          "Hormonal Contraceptives": -0.005600332439569978,
          "Hormonal Contraceptives (years)": -0.05098201692233071,
          "IUD": -0.03600355380986416,
          "IUD (years)": -0.013795391663451981,
          "STDs": 0.20154251197061218,
          "STDs (number)": 0.17940497767664917,
          "STDs:condylomatosis": 0.3652170449593267,
          "STDs:vaginal condylomatosis": 8.136877624763151e-18,
          "STDs:vulvo-perineal condylomatosis": 0.41375802500947556,
          "STDs:syphilis": 0.001798441869853207,
          "STDs:pelvic inflammatory disease": 2.09274943662965e-18,
          "STDs:genital herpes": 0.0,
          "STDs:molluscum contagiosum": 0.0021816195960096692,
          "STDs:HIV": -0.010285662884266838,
          "STDs:Hepatitis B": 3.297742414020367e-18,
          "STDs:HPV": 1.1247331666311868e-17,
          "STDs: Number of diagnosis": -0.007458341532028672,
          "Dx:Cancer": -0.016174991963508918,
          "Dx:CIN": -0.01383942763705495,
          "Dx:HPV": -0.017032574887743866,
          "Dx": -0.015224469715321902
        },
        "lime_explanation": [
          [
            "STDs:HPV",
            0.3112020242751318
          ],
          [
            "Dx:CIN",
            -0.28134891258073047
          ],
          [
            "STDs:Hepatitis B",
            0.2597567715823489
          ],
          [
            "STDs:vaginal condylomatosis",
            0.25841115051161145
          ],
          [
            "Dx:HPV",
            -0.1855522655602766
          ],
          [
            "STDs:pelvic inflammatory disease",
            0.1815982695124128
          ],
          [
            "Dx:Cancer",
            -0.18106591564958735
          ],
          [
            "STDs:molluscum contagiosum",
            0.111871183838069
          ]
        ],
        "top_factors": [
          {
            "feature": "STDs:vulvo-perineal condylomatosis",
            "label": "Vulvo-perineal condylomatosis",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.41375802500947556,
            "direction": "increases",
            "level": "",
            "sentence": "Vulvo-perineal condylomatosis of Yes pushed this prediction toward \u201cBiopsy-confirmed cervical cancer\u201d."
          },
          {
            "feature": "STDs:condylomatosis",
            "label": "Condylomatosis",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.3652170449593267,
            "direction": "increases",
            "level": "",
            "sentence": "Condylomatosis of Yes pushed this prediction toward \u201cBiopsy-confirmed cervical cancer\u201d."
          },
          {
            "feature": "STDs",
            "label": "Any sexually transmitted infection",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.20154251197061218,
            "direction": "increases",
            "level": "",
            "sentence": "Any sexually transmitted infection of Yes pushed this prediction toward \u201cBiopsy-confirmed cervical cancer\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cBiopsy-confirmed cervical cancer\u201d (65%). Raising the estimate: Vulvo-perineal condylomatosis (Yes), Condylomatosis (Yes), Any sexually transmitted infection (Yes).",
        "shap_lime_top5_overlap": 0.0
      },
      {
        "case": "true_negative",
        "case_label": "True negative (correctly cleared)",
        "test_index": 149,
        "actual": 0,
        "probability": 0.31108671227750456,
        "patient": {
          "Age": 26.0,
          "Number of sexual partners": 3.0,
          "First sexual intercourse": 17.0,
          "Num of pregnancies": 3.0,
          "Smokes": 0.0,
          "Smokes (years)": 0.0,
          "Smokes (packs/year)": 0.0,
          "Hormonal Contraceptives": 1.0,
          "Hormonal Contraceptives (years)": 0.25,
          "IUD": 0.0,
          "IUD (years)": 0.0,
          "STDs": 1.0,
          "STDs (number)": 1.0,
          "STDs:condylomatosis": 0.0,
          "STDs:vaginal condylomatosis": 0.0,
          "STDs:vulvo-perineal condylomatosis": 0.0,
          "STDs:syphilis": 1.0,
          "STDs:pelvic inflammatory disease": 0.0,
          "STDs:genital herpes": 0.0,
          "STDs:molluscum contagiosum": 0.0,
          "STDs:HIV": 0.0,
          "STDs:Hepatitis B": 0.0,
          "STDs:HPV": 0.0,
          "STDs: Number of diagnosis": 1.0,
          "Dx:Cancer": 0.0,
          "Dx:CIN": 0.0,
          "Dx:HPV": 0.0,
          "Dx": 0.0
        },
        "patient_display": {
          "Age": "26 years",
          "Number of sexual partners": "3",
          "First sexual intercourse": "17 years",
          "Num of pregnancies": "3",
          "Smokes": "No",
          "Smokes (years)": "0.0 years",
          "Smokes (packs/year)": "0.0",
          "Hormonal Contraceptives": "Yes",
          "Hormonal Contraceptives (years)": "0.2 years",
          "IUD": "No",
          "IUD (years)": "0.0 years",
          "STDs": "Yes",
          "STDs (number)": "1",
          "STDs:condylomatosis": "No",
          "STDs:vaginal condylomatosis": "No",
          "STDs:vulvo-perineal condylomatosis": "No",
          "STDs:syphilis": "Yes",
          "STDs:pelvic inflammatory disease": "No",
          "STDs:genital herpes": "No",
          "STDs:molluscum contagiosum": "No",
          "STDs:HIV": "No",
          "STDs:Hepatitis B": "No",
          "STDs:HPV": "No",
          "STDs: Number of diagnosis": "1",
          "Dx:Cancer": "No",
          "Dx:CIN": "No",
          "Dx:HPV": "No",
          "Dx": "No"
        },
        "shap_values": {
          "Age": -0.004634932901139779,
          "Number of sexual partners": -0.002463764231789165,
          "First sexual intercourse": 0.0021487490973340524,
          "Num of pregnancies": 0.05622609216306264,
          "Smokes": 0.0015648369398016224,
          "Smokes (years)": -0.026003264558029524,
          "Smokes (packs/year)": 0.0006155868589552634,
          "Hormonal Contraceptives": 0.0026354505597976367,
          "Hormonal Contraceptives (years)": -0.04431107364242771,
          "IUD": -0.03600355380986416,
          "IUD (years)": -0.013795391663451981,
          "STDs": 0.20154251197061218,
          "STDs (number)": 0.08596488513672773,
          "STDs:condylomatosis": -0.012073290742457065,
          "STDs:vaginal condylomatosis": 8.136877624763151e-18,
          "STDs:vulvo-perineal condylomatosis": -0.01367795123998266,
          "STDs:syphilis": -0.897422493056776,
          "STDs:pelvic inflammatory disease": 2.09274943662965e-18,
          "STDs:genital herpes": 0.0,
          "STDs:molluscum contagiosum": 0.0021816195960096692,
          "STDs:HIV": -0.010285662884266838,
          "STDs:Hepatitis B": 3.297742414020367e-18,
          "STDs:HPV": 1.1247331666311868e-17,
          "STDs: Number of diagnosis": 0.17900019676868828,
          "Dx:Cancer": -0.016174991963508918,
          "Dx:CIN": -0.01383942763705495,
          "Dx:HPV": -0.017032574887743866,
          "Dx": -0.015224469715321902
        },
        "lime_explanation": [
          [
            "STDs:HPV",
            0.3343697603971132
          ],
          [
            "Dx:CIN",
            -0.2807288549472624
          ],
          [
            "STDs:vaginal condylomatosis",
            0.2767841627776477
          ],
          [
            "STDs:Hepatitis B",
            0.24689295509661616
          ],
          [
            "Dx:Cancer",
            -0.19002514446386926
          ],
          [
            "Dx:HPV",
            -0.18894924905772983
          ],
          [
            "STDs:pelvic inflammatory disease",
            0.15555605037229872
          ],
          [
            "STDs:molluscum contagiosum",
            0.13369004491617853
          ]
        ],
        "top_factors": [
          {
            "feature": "STDs:syphilis",
            "label": "Syphilis",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": -0.897422493056776,
            "direction": "decreases",
            "level": "",
            "sentence": "Syphilis of Yes pushed this prediction toward \u201cNegative biopsy\u201d."
          },
          {
            "feature": "STDs",
            "label": "Any sexually transmitted infection",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.20154251197061218,
            "direction": "increases",
            "level": "",
            "sentence": "Any sexually transmitted infection of Yes pushed this prediction toward \u201cBiopsy-confirmed cervical cancer\u201d."
          },
          {
            "feature": "STDs: Number of diagnosis",
            "label": "Number of STI diagnoses",
            "value": 1.0,
            "value_display": "1",
            "shap_value": 0.17900019676868828,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Number of STI diagnoses of 1 (mid-range for this range) pushed this prediction toward \u201cBiopsy-confirmed cervical cancer\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cBiopsy-confirmed cervical cancer\u201d (31%). Raising the estimate: Any sexually transmitted infection (Yes), Number of STI diagnoses (1). Lowering it: Syphilis (Yes).",
        "shap_lime_top5_overlap": 0.0
      },
      {
        "case": "false_positive",
        "case_label": "False positive (unnecessary referral)",
        "test_index": 31,
        "actual": 0,
        "probability": 0.9039204479184084,
        "patient": {
          "Age": 59.0,
          "Number of sexual partners": 2.0,
          "First sexual intercourse": 13.0,
          "Num of pregnancies": NaN,
          "Smokes": 0.0,
          "Smokes (years)": 0.0,
          "Smokes (packs/year)": 0.0,
          "Hormonal Contraceptives": 0.0,
          "Hormonal Contraceptives (years)": 0.0,
          "IUD": 1.0,
          "IUD (years)": 0.41,
          "STDs": 0.0,
          "STDs (number)": 0.0,
          "STDs:condylomatosis": 0.0,
          "STDs:vaginal condylomatosis": 0.0,
          "STDs:vulvo-perineal condylomatosis": 0.0,
          "STDs:syphilis": 0.0,
          "STDs:pelvic inflammatory disease": 0.0,
          "STDs:genital herpes": 0.0,
          "STDs:molluscum contagiosum": 0.0,
          "STDs:HIV": 0.0,
          "STDs:Hepatitis B": 0.0,
          "STDs:HPV": 0.0,
          "STDs: Number of diagnosis": 0.0,
          "Dx:Cancer": 0.0,
          "Dx:CIN": 1.0,
          "Dx:HPV": 0.0,
          "Dx": 1.0
        },
        "patient_display": {
          "Age": "59 years",
          "Number of sexual partners": "2",
          "First sexual intercourse": "13 years",
          "Num of pregnancies": "nan",
          "Smokes": "No",
          "Smokes (years)": "0.0 years",
          "Smokes (packs/year)": "0.0",
          "Hormonal Contraceptives": "No",
          "Hormonal Contraceptives (years)": "0.0 years",
          "IUD": "Yes",
          "IUD (years)": "0.4 years",
          "STDs": "No",
          "STDs (number)": "0",
          "STDs:condylomatosis": "No",
          "STDs:vaginal condylomatosis": "No",
          "STDs:vulvo-perineal condylomatosis": "No",
          "STDs:syphilis": "No",
          "STDs:pelvic inflammatory disease": "No",
          "STDs:genital herpes": "No",
          "STDs:molluscum contagiosum": "No",
          "STDs:HIV": "No",
          "STDs:Hepatitis B": "No",
          "STDs:HPV": "No",
          "STDs: Number of diagnosis": "0",
          "Dx:Cancer": "No",
          "Dx:CIN": "Yes",
          "Dx:HPV": "No",
          "Dx": "Yes"
        },
        "shap_values": {
          "Age": 0.2546070768236275,
          "Number of sexual partners": 0.0021157231878932968,
          "First sexual intercourse": 0.04989872903809071,
          "Num of pregnancies": 0.19749768051246627,
          "Smokes": 0.0015648369398016224,
          "Smokes (years)": -0.026003264558029524,
          "Smokes (packs/year)": 0.0006155868589552634,
          "Hormonal Contraceptives": -0.005600332439569978,
          "Hormonal Contraceptives (years)": -0.05098201692233071,
          "IUD": 0.2543476865922662,
          "IUD (years)": -0.004961307725652793,
          "STDs": -0.009717982757492812,
          "STDs (number)": -0.007475207403193716,
          "STDs:condylomatosis": -0.012073290742457065,
          "STDs:vaginal condylomatosis": 8.136877624763151e-18,
          "STDs:vulvo-perineal condylomatosis": -0.01367795123998266,
          "STDs:syphilis": 0.001798441869853207,
          "STDs:pelvic inflammatory disease": 2.09274943662965e-18,
          "STDs:genital herpes": 0.0,
          "STDs:molluscum contagiosum": 0.0021816195960096692,
          "STDs:HIV": -0.010285662884266838,
          "STDs:Hepatitis B": 3.297742414020367e-18,
          "STDs:HPV": 1.1247331666311868e-17,
          "STDs: Number of diagnosis": -0.007458341532028672,
          "Dx:Cancer": -0.016174991963508918,
          "Dx:CIN": 1.3701033360684394,
          "Dx:HPV": -0.017032574887743866,
          "Dx": 0.4922578541287408
        },
        "lime_explanation": [
          [
            "STDs:HPV",
            0.31047558012962156
          ],
          [
            "Dx:CIN",
            0.28996293912275983
          ],
          [
            "STDs:vaginal condylomatosis",
            0.23755108636594083
          ],
          [
            "STDs:Hepatitis B",
            0.22592381472179476
          ],
          [
            "Dx:HPV",
            -0.18666046088116198
          ],
          [
            "Dx:Cancer",
            -0.18091656389836094
          ],
          [
            "STDs:pelvic inflammatory disease",
            0.1510829504685612
          ],
          [
            "STDs:HIV",
            -0.1294476258705611
          ]
        ],
        "top_factors": [
          {
            "feature": "Dx:CIN",
            "label": "Previous cervical intraepithelial neoplasia",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 1.3701033360684394,
            "direction": "increases",
            "level": "",
            "sentence": "Previous cervical intraepithelial neoplasia of Yes pushed this prediction toward \u201cBiopsy-confirmed cervical cancer\u201d."
          },
          {
            "feature": "Dx",
            "label": "Any previous diagnosis",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.4922578541287408,
            "direction": "increases",
            "level": "",
            "sentence": "Any previous diagnosis of Yes pushed this prediction toward \u201cBiopsy-confirmed cervical cancer\u201d."
          },
          {
            "feature": "Age",
            "label": "Age",
            "value": 59.0,
            "value_display": "59 years",
            "shap_value": 0.2546070768236275,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Age of 59 years (mid-range for this range) pushed this prediction toward \u201cBiopsy-confirmed cervical cancer\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cBiopsy-confirmed cervical cancer\u201d (90%). Raising the estimate: Previous cervical intraepithelial neoplasia (Yes), Any previous diagnosis (Yes), Age (59 years).",
        "shap_lime_top5_overlap": 0.2
      },
      {
        "case": "false_negative",
        "case_label": "False negative (missed case)",
        "test_index": 43,
        "actual": 1,
        "probability": 0.3628203541254841,
        "patient": {
          "Age": 21.0,
          "Number of sexual partners": 4.0,
          "First sexual intercourse": 15.0,
          "Num of pregnancies": 1.0,
          "Smokes": 0.0,
          "Smokes (years)": 0.0,
          "Smokes (packs/year)": 0.0,
          "Hormonal Contraceptives": 0.0,
          "Hormonal Contraceptives (years)": 0.0,
          "IUD": 0.0,
          "IUD (years)": 0.0,
          "STDs": 0.0,
          "STDs (number)": 0.0,
          "STDs:condylomatosis": 0.0,
          "STDs:vaginal condylomatosis": 0.0,
          "STDs:vulvo-perineal condylomatosis": 0.0,
          "STDs:syphilis": 0.0,
          "STDs:pelvic inflammatory disease": 0.0,
          "STDs:genital herpes": 0.0,
          "STDs:molluscum contagiosum": 0.0,
          "STDs:HIV": 0.0,
          "STDs:Hepatitis B": 0.0,
          "STDs:HPV": 0.0,
          "STDs: Number of diagnosis": 0.0,
          "Dx:Cancer": 0.0,
          "Dx:CIN": 0.0,
          "Dx:HPV": 0.0,
          "Dx": 0.0
        },
        "patient_display": {
          "Age": "21 years",
          "Number of sexual partners": "4",
          "First sexual intercourse": "15 years",
          "Num of pregnancies": "1",
          "Smokes": "No",
          "Smokes (years)": "0.0 years",
          "Smokes (packs/year)": "0.0",
          "Hormonal Contraceptives": "No",
          "Hormonal Contraceptives (years)": "0.0 years",
          "IUD": "No",
          "IUD (years)": "0.0 years",
          "STDs": "No",
          "STDs (number)": "0",
          "STDs:condylomatosis": "No",
          "STDs:vaginal condylomatosis": "No",
          "STDs:vulvo-perineal condylomatosis": "No",
          "STDs:syphilis": "No",
          "STDs:pelvic inflammatory disease": "No",
          "STDs:genital herpes": "No",
          "STDs:molluscum contagiosum": "No",
          "STDs:HIV": "No",
          "STDs:Hepatitis B": "No",
          "STDs:HPV": "No",
          "STDs: Number of diagnosis": "0",
          "Dx:Cancer": "No",
          "Dx:CIN": "No",
          "Dx:HPV": "No",
          "Dx": "No"
        },
        "shap_values": {
          "Age": -0.043914025283680276,
          "Number of sexual partners": -0.007043251651471627,
          "First sexual intercourse": 0.026023739067712378,
          "Num of pregnancies": -0.08504549618634098,
          "Smokes": 0.0015648369398016224,
          "Smokes (years)": -0.026003264558029524,
          "Smokes (packs/year)": 0.0006155868589552634,
          "Hormonal Contraceptives": -0.005600332439569978,
          "Hormonal Contraceptives (years)": -0.05098201692233071,
          "IUD": -0.03600355380986416,
          "IUD (years)": -0.013795391663451981,
          "STDs": -0.009717982757492812,
          "STDs (number)": -0.007475207403193716,
          "STDs:condylomatosis": -0.012073290742457065,
          "STDs:vaginal condylomatosis": 8.136877624763151e-18,
          "STDs:vulvo-perineal condylomatosis": -0.01367795123998266,
          "STDs:syphilis": 0.001798441869853207,
          "STDs:pelvic inflammatory disease": 2.09274943662965e-18,
          "STDs:genital herpes": 0.0,
          "STDs:molluscum contagiosum": 0.0021816195960096692,
          "STDs:HIV": -0.010285662884266838,
          "STDs:Hepatitis B": 3.297742414020367e-18,
          "STDs:HPV": 1.1247331666311868e-17,
          "STDs: Number of diagnosis": -0.007458341532028672,
          "Dx:Cancer": -0.016174991963508918,
          "Dx:CIN": -0.01383942763705495,
          "Dx:HPV": -0.017032574887743866,
          "Dx": -0.015224469715321902
        },
        "lime_explanation": [
          [
            "STDs:HPV",
            0.3464965566258582
          ],
          [
            "Dx:CIN",
            -0.2801056393386182
          ],
          [
            "STDs:vaginal condylomatosis",
            0.26105332636210427
          ],
          [
            "STDs:Hepatitis B",
            0.2534296410782776
          ],
          [
            "Dx:HPV",
            -0.18747606748050996
          ],
          [
            "STDs:pelvic inflammatory disease",
            0.18618821149289863
          ],
          [
            "Dx:Cancer",
            -0.17926608634474445
          ],
          [
            "STDs:molluscum contagiosum",
            0.12107565942128434
          ]
        ],
        "top_factors": [
          {
            "feature": "Num of pregnancies",
            "label": "Number of pregnancies",
            "value": 1.0,
            "value_display": "1",
            "shap_value": -0.08504549618634098,
            "direction": "decreases",
            "level": "low",
            "sentence": "Number of pregnancies of 1 (low for this range) pushed this prediction toward \u201cNegative biopsy\u201d."
          },
          {
            "feature": "Hormonal Contraceptives (years)",
            "label": "Years on hormonal contraceptives",
            "value": 0.0,
            "value_display": "0.0 years",
            "shap_value": -0.05098201692233071,
            "direction": "decreases",
            "level": "low",
            "sentence": "Years on hormonal contraceptives of 0.0 years (low for this range) pushed this prediction toward \u201cNegative biopsy\u201d."
          },
          {
            "feature": "Age",
            "label": "Age",
            "value": 21.0,
            "value_display": "21 years",
            "shap_value": -0.043914025283680276,
            "direction": "decreases",
            "level": "low",
            "sentence": "Age of 21 years (low for this range) pushed this prediction toward \u201cNegative biopsy\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cBiopsy-confirmed cervical cancer\u201d (36%). Lowering it: Number of pregnancies (1), Years on hormonal contraceptives (0.0 years), Age (21 years).",
        "shap_lime_top5_overlap": 0.0
      },
      {
        "case": "borderline",
        "case_label": "Borderline (p \u2248 0.5)",
        "test_index": 7,
        "actual": 0,
        "probability": 0.4957579637409196,
        "patient": {
          "Age": 30.0,
          "Number of sexual partners": 1.0,
          "First sexual intercourse": 21.0,
          "Num of pregnancies": 2.0,
          "Smokes": 0.0,
          "Smokes (years)": 0.0,
          "Smokes (packs/year)": 0.0,
          "Hormonal Contraceptives": 0.0,
          "Hormonal Contraceptives (years)": 0.0,
          "IUD": 1.0,
          "IUD (years)": 8.0,
          "STDs": 0.0,
          "STDs (number)": 0.0,
          "STDs:condylomatosis": 0.0,
          "STDs:vaginal condylomatosis": 0.0,
          "STDs:vulvo-perineal condylomatosis": 0.0,
          "STDs:syphilis": 0.0,
          "STDs:pelvic inflammatory disease": 0.0,
          "STDs:genital herpes": 0.0,
          "STDs:molluscum contagiosum": 0.0,
          "STDs:HIV": 0.0,
          "STDs:Hepatitis B": 0.0,
          "STDs:HPV": 0.0,
          "STDs: Number of diagnosis": 0.0,
          "Dx:Cancer": 0.0,
          "Dx:CIN": 0.0,
          "Dx:HPV": 0.0,
          "Dx": 0.0
        },
        "patient_display": {
          "Age": "30 years",
          "Number of sexual partners": "1",
          "First sexual intercourse": "21 years",
          "Num of pregnancies": "2",
          "Smokes": "No",
          "Smokes (years)": "0.0 years",
          "Smokes (packs/year)": "0.0",
          "Hormonal Contraceptives": "No",
          "Hormonal Contraceptives (years)": "0.0 years",
          "IUD": "Yes",
          "IUD (years)": "8.0 years",
          "STDs": "No",
          "STDs (number)": "0",
          "STDs:condylomatosis": "No",
          "STDs:vaginal condylomatosis": "No",
          "STDs:vulvo-perineal condylomatosis": "No",
          "STDs:syphilis": "No",
          "STDs:pelvic inflammatory disease": "No",
          "STDs:genital herpes": "No",
          "STDs:molluscum contagiosum": "No",
          "STDs:HIV": "No",
          "STDs:Hepatitis B": "No",
          "STDs:HPV": "No",
          "STDs: Number of diagnosis": "0",
          "Dx:Cancer": "No",
          "Dx:CIN": "No",
          "Dx:HPV": "No",
          "Dx": "No"
        },
        "shap_values": {
          "Age": 0.026788341004892618,
          "Number of sexual partners": 0.006695210607575759,
          "First sexual intercourse": -0.04560123084342261,
          "Num of pregnancies": -0.01440970201163917,
          "Smokes": 0.0015648369398016224,
          "Smokes (years)": -0.026003264558029524,
          "Smokes (packs/year)": 0.0006155868589552634,
          "Hormonal Contraceptives": -0.005600332439569978,
          "Hormonal Contraceptives (years)": -0.05098201692233071,
          "IUD": 0.2543476865922662,
          "IUD (years)": 0.15857697785458097,
          "STDs": -0.009717982757492812,
          "STDs (number)": -0.007475207403193716,
          "STDs:condylomatosis": -0.012073290742457065,
          "STDs:vaginal condylomatosis": 8.136877624763151e-18,
          "STDs:vulvo-perineal condylomatosis": -0.01367795123998266,
          "STDs:syphilis": 0.001798441869853207,
          "STDs:pelvic inflammatory disease": 2.09274943662965e-18,
          "STDs:genital herpes": 0.0,
          "STDs:molluscum contagiosum": 0.0021816195960096692,
          "STDs:HIV": -0.010285662884266838,
          "STDs:Hepatitis B": 3.297742414020367e-18,
          "STDs:HPV": 1.1247331666311868e-17,
          "STDs: Number of diagnosis": -0.007458341532028672,
          "Dx:Cancer": -0.016174991963508918,
          "Dx:CIN": -0.01383942763705495,
          "Dx:HPV": -0.017032574887743866,
          "Dx": -0.015224469715321902
        },
        "lime_explanation": [
          [
            "STDs:HPV",
            0.3178893902172156
          ],
          [
            "Dx:CIN",
            -0.28533566546605615
          ],
          [
            "STDs:vaginal condylomatosis",
            0.26125540932263663
          ],
          [
            "STDs:Hepatitis B",
            0.24705340663944936
          ],
          [
            "Dx:HPV",
            -0.1953647247946128
          ],
          [
            "Dx:Cancer",
            -0.1812504552154864
          ],
          [
            "STDs:pelvic inflammatory disease",
            0.16682608345750397
          ],
          [
            "STDs:molluscum contagiosum",
            0.11152221328935294
          ]
        ],
        "top_factors": [
          {
            "feature": "IUD",
            "label": "Intrauterine device",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.2543476865922662,
            "direction": "increases",
            "level": "",
            "sentence": "Intrauterine device of Yes pushed this prediction toward \u201cBiopsy-confirmed cervical cancer\u201d."
          },
          {
            "feature": "IUD (years)",
            "label": "Years with an IUD",
            "value": 8.0,
            "value_display": "8.0 years",
            "shap_value": 0.15857697785458097,
            "direction": "increases",
            "level": "mid-range",
            "sentence": "Years with an IUD of 8.0 years (mid-range for this range) pushed this prediction toward \u201cBiopsy-confirmed cervical cancer\u201d."
          },
          {
            "feature": "Hormonal Contraceptives (years)",
            "label": "Years on hormonal contraceptives",
            "value": 0.0,
            "value_display": "0.0 years",
            "shap_value": -0.05098201692233071,
            "direction": "decreases",
            "level": "low",
            "sentence": "Years on hormonal contraceptives of 0.0 years (low for this range) pushed this prediction toward \u201cNegative biopsy\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cBiopsy-confirmed cervical cancer\u201d (50%). Raising the estimate: Intrauterine device (Yes), Years with an IUD (8.0 years). Lowering it: Years on hormonal contraceptives (0.0 years).",
        "shap_lime_top5_overlap": 0.0
      }
    ]
  },
  "lung_cancer_surgery": {
    "model": "logistic_regression",
    "model_label": "Logistic Regression",
    "cases": [
      {
        "case": "true_positive",
        "case_label": "True positive (correctly flagged)",
        "test_index": 55,
        "actual": 1,
        "probability": 0.670960827165844,
        "patient": {
          "AGE": 58.0,
          "PRE30": 1.0,
          "PRE17": 1.0,
          "PRE19": 0.0,
          "PRE25": 0.0,
          "PRE32": 0.0,
          "PRE4": 3.08,
          "PRE5": 1.72,
          "PRE6": 1.0,
          "PRE7": 0.0,
          "PRE8": 0.0,
          "PRE9": 0.0,
          "PRE10": 1.0,
          "PRE11": 1.0,
          "DGN": 3.0,
          "PRE14": 12.0
        },
        "patient_display": {
          "AGE": "58 years",
          "PRE30": "Yes",
          "PRE17": "Yes",
          "PRE19": "No",
          "PRE25": "No",
          "PRE32": "No",
          "PRE4": "3.08 L",
          "PRE5": "1.72 L",
          "PRE6": "1 \u2014 restricted but ambulatory",
          "PRE7": "No",
          "PRE8": "No",
          "PRE9": "No",
          "PRE10": "Yes",
          "PRE11": "Yes",
          "DGN": "DGN3",
          "PRE14": "T2"
        },
        "shap_values": {
          "AGE": -0.013449587847937849,
          "PRE30": 0.059924149553191704,
          "PRE17": 0.4264814138267458,
          "PRE19": 0.0,
          "PRE25": -0.01501706614687038,
          "PRE32": -4.72070803678739e-18,
          "PRE4": 0.00873779972504188,
          "PRE5": 0.08645558195299789,
          "PRE6": 0.017735074339449108,
          "PRE7": -0.011374917422642,
          "PRE8": -0.031253688871413755,
          "PRE9": -0.05576175347222566,
          "PRE10": 0.02231429340485282,
          "PRE11": 0.16948092994253258,
          "DGN": -0.014462036480133209,
          "PRE14": 0.08724964454314005
        },
        "lime_explanation": [
          [
            "PRE32",
            0.1509513937374188
          ],
          [
            "PRE9",
            -0.13045491433303485
          ],
          [
            "PRE17",
            0.10594543951964272
          ],
          [
            "PRE25",
            -0.0874548992049843
          ],
          [
            "PRE8",
            -0.053522787285102395
          ],
          [
            "PRE7",
            -0.047455090379207907
          ],
          [
            "PRE5",
            0.037745500985411205
          ],
          [
            "PRE11",
            0.036726531615370685
          ]
        ],
        "top_factors": [
          {
            "feature": "PRE17",
            "label": "Type 2 diabetes",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.4264814138267458,
            "direction": "increases",
            "level": "",
            "sentence": "Type 2 diabetes of Yes pushed this prediction toward \u201cDied within one year\u201d."
          },
          {
            "feature": "PRE11",
            "label": "Weakness before surgery",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.16948092994253258,
            "direction": "increases",
            "level": "",
            "sentence": "Weakness before surgery of Yes pushed this prediction toward \u201cDied within one year\u201d."
          },
          {
            "feature": "PRE14",
            "label": "Tumour size (clinical T stage)",
            "value": 12.0,
            "value_display": "T2",
            "shap_value": 0.08724964454314005,
            "direction": "increases",
            "level": "",
            "sentence": "Tumour size (clinical T stage) of T2 pushed this prediction toward \u201cDied within one year\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cDied within one year\u201d (67%). Raising the estimate: Type 2 diabetes (Yes), Weakness before surgery (Yes), Tumour size (clinical T stage) (T2).",
        "shap_lime_top5_overlap": 0.2
      },
      {
        "case": "true_negative",
        "case_label": "True negative (correctly cleared)",
        "test_index": 9,
        "actual": 0,
        "probability": 0.28696313498017356,
        "patient": {
          "AGE": 56.0,
          "PRE30": 0.0,
          "PRE17": 0.0,
          "PRE19": 0.0,
          "PRE25": 0.0,
          "PRE32": 0.0,
          "PRE4": 3.32,
          "PRE5": 2.52,
          "PRE6": 0.0,
          "PRE7": 0.0,
          "PRE8": 0.0,
          "PRE9": 0.0,
          "PRE10": 0.0,
          "PRE11": 0.0,
          "DGN": 3.0,
          "PRE14": 11.0
        },
        "patient_display": {
          "AGE": "56 years",
          "PRE30": "No",
          "PRE17": "No",
          "PRE19": "No",
          "PRE25": "No",
          "PRE32": "No",
          "PRE4": "3.32 L",
          "PRE5": "2.52 L",
          "PRE6": "0 \u2014 fully active",
          "PRE7": "No",
          "PRE8": "No",
          "PRE9": "No",
          "PRE10": "No",
          "PRE11": "No",
          "DGN": "DGN3",
          "PRE14": "T1 \u2014 smallest"
        },
        "shap_values": {
          "AGE": -0.01812770536026406,
          "PRE30": -0.27298779240898446,
          "PRE17": -0.02244639020140768,
          "PRE19": 0.0,
          "PRE25": -0.01501706614687038,
          "PRE32": -4.72070803678739e-18,
          "PRE4": -0.005076903397553971,
          "PRE5": -0.006620000825091617,
          "PRE6": -0.10894402808518734,
          "PRE7": -0.011374917422642,
          "PRE8": -0.031253688871413755,
          "PRE9": -0.05576175347222566,
          "PRE10": -0.06694288021455844,
          "PRE11": -0.03228208189381572,
          "DGN": -0.014462036480133209,
          "PRE14": -0.2243562288252172
        },
        "lime_explanation": [
          [
            "PRE32",
            0.1500695681569805
          ],
          [
            "PRE9",
            -0.13598878283231214
          ],
          [
            "PRE17",
            -0.10007561962606705
          ],
          [
            "PRE25",
            -0.08430058306451257
          ],
          [
            "PRE7",
            -0.05657715522492889
          ],
          [
            "PRE8",
            -0.05134186738388432
          ],
          [
            "PRE11",
            -0.04162899769134053
          ],
          [
            "PRE14",
            -0.0357691513453464
          ]
        ],
        "top_factors": [
          {
            "feature": "PRE30",
            "label": "Smoker",
            "value": 0.0,
            "value_display": "No",
            "shap_value": -0.27298779240898446,
            "direction": "decreases",
            "level": "",
            "sentence": "Smoker of No pushed this prediction toward \u201cSurvived one year\u201d."
          },
          {
            "feature": "PRE14",
            "label": "Tumour size (clinical T stage)",
            "value": 11.0,
            "value_display": "T1 \u2014 smallest",
            "shap_value": -0.2243562288252172,
            "direction": "decreases",
            "level": "",
            "sentence": "Tumour size (clinical T stage) of T1 \u2014 smallest pushed this prediction toward \u201cSurvived one year\u201d."
          },
          {
            "feature": "PRE6",
            "label": "Performance status (Zubrod)",
            "value": 0.0,
            "value_display": "0 \u2014 fully active",
            "shap_value": -0.10894402808518734,
            "direction": "decreases",
            "level": "",
            "sentence": "Performance status (Zubrod) of 0 \u2014 fully active pushed this prediction toward \u201cSurvived one year\u201d."
          }
        ],
        "summary": "The model estimates a low likelihood of \u201cDied within one year\u201d (29%). Lowering it: Smoker (No), Tumour size (clinical T stage) (T1 \u2014 smallest), Performance status (Zubrod) (0 \u2014 fully active).",
        "shap_lime_top5_overlap": 0.2
      },
      {
        "case": "false_positive",
        "case_label": "False positive (unnecessary referral)",
        "test_index": 62,
        "actual": 0,
        "probability": 0.7305681098412729,
        "patient": {
          "AGE": 67.0,
          "PRE30": 1.0,
          "PRE17": 0.0,
          "PRE19": 0.0,
          "PRE25": 1.0,
          "PRE32": 0.0,
          "PRE4": 2.36,
          "PRE5": 2.0,
          "PRE6": 1.0,
          "PRE7": 0.0,
          "PRE8": 0.0,
          "PRE9": 1.0,
          "PRE10": 0.0,
          "PRE11": 0.0,
          "DGN": 3.0,
          "PRE14": 12.0
        },
        "patient_display": {
          "AGE": "67 years",
          "PRE30": "Yes",
          "PRE17": "No",
          "PRE19": "No",
          "PRE25": "Yes",
          "PRE32": "No",
          "PRE4": "2.36 L",
          "PRE5": "2.00 L",
          "PRE6": "1 \u2014 restricted but ambulatory",
          "PRE7": "No",
          "PRE8": "No",
          "PRE9": "Yes",
          "PRE10": "No",
          "PRE11": "No",
          "DGN": "DGN3",
          "PRE14": "T2"
        },
        "shap_values": {
          "AGE": 0.00760194095753009,
          "PRE30": 0.059924149553191704,
          "PRE17": -0.02244639020140768,
          "PRE19": 0.0,
          "PRE25": 0.3604095875248888,
          "PRE32": -4.72070803678739e-18,
          "PRE4": 0.05018190909282949,
          "PRE5": 0.05387912798066656,
          "PRE6": 0.017735074339449108,
          "PRE7": -0.011374917422642,
          "PRE8": -0.031253688871413755,
          "PRE9": 0.5638132851080597,
          "PRE10": -0.06694288021455844,
          "PRE11": -0.03228208189381572,
          "DGN": -0.014462036480133209,
          "PRE14": 0.08724964454314005
        },
        "lime_explanation": [
          [
            "PRE9",
            0.13772954914867572
          ],
          [
            "PRE32",
            0.13021978924086516
          ],
          [
            "PRE17",
            -0.09769506250476716
          ],
          [
            "PRE25",
            0.0818337077528411
          ],
          [
            "PRE8",
            -0.05446512762448199
          ],
          [
            "PRE7",
            -0.053327504540066135
          ],
          [
            "PRE11",
            -0.03893789129877715
          ],
          [
            "DGN",
            -0.03456824212228269
          ]
        ],
        "top_factors": [
          {
            "feature": "PRE9",
            "label": "Dyspnoea before surgery",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.5638132851080597,
            "direction": "increases",
            "level": "",
            "sentence": "Dyspnoea before surgery of Yes pushed this prediction toward \u201cDied within one year\u201d."
          },
          {
            "feature": "PRE25",
            "label": "Peripheral arterial disease",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.3604095875248888,
            "direction": "increases",
            "level": "",
            "sentence": "Peripheral arterial disease of Yes pushed this prediction toward \u201cDied within one year\u201d."
          },
          {
            "feature": "PRE14",
            "label": "Tumour size (clinical T stage)",
            "value": 12.0,
            "value_display": "T2",
            "shap_value": 0.08724964454314005,
            "direction": "increases",
            "level": "",
            "sentence": "Tumour size (clinical T stage) of T2 pushed this prediction toward \u201cDied within one year\u201d."
          }
        ],
        "summary": "The model estimates a high likelihood of \u201cDied within one year\u201d (73%). Raising the estimate: Dyspnoea before surgery (Yes), Peripheral arterial disease (Yes), Tumour size (clinical T stage) (T2).",
        "shap_lime_top5_overlap": 0.4
      },
      {
        "case": "false_negative",
        "case_label": "False negative (missed case)",
        "test_index": 11,
        "actual": 1,
        "probability": 0.3403809929172524,
        "patient": {
          "AGE": 58.0,
          "PRE30": 0.0,
          "PRE17": 0.0,
          "PRE19": 0.0,
          "PRE25": 0.0,
          "PRE32": 0.0,
          "PRE4": 4.32,
          "PRE5": 3.2,
          "PRE6": 0.0,
          "PRE7": 0.0,
          "PRE8": 0.0,
          "PRE9": 0.0,
          "PRE10": 0.0,
          "PRE11": 0.0,
          "DGN": 8.0,
          "PRE14": 11.0
        },
        "patient_display": {
          "AGE": "58 years",
          "PRE30": "No",
          "PRE17": "No",
          "PRE19": "No",
          "PRE25": "No",
          "PRE32": "No",
          "PRE4": "4.32 L",
          "PRE5": "3.20 L",
          "PRE6": "0 \u2014 fully active",
          "PRE7": "No",
          "PRE8": "No",
          "PRE9": "No",
          "PRE10": "No",
          "PRE11": "No",
          "DGN": "DGN8",
          "PRE14": "T1 \u2014 smallest"
        },
        "shap_values": {
          "AGE": -0.013449587847937849,
          "PRE30": -0.27298779240898446,
          "PRE17": -0.02244639020140768,
          "PRE19": 0.0,
          "PRE25": -0.01501706614687038,
          "PRE32": -4.72070803678739e-18,
          "PRE4": -0.06263816640837011,
          "PRE5": -0.0857342461864677,
          "PRE6": -0.10894402808518734,
          "PRE7": -0.011374917422642,
          "PRE8": -0.031253688871413755,
          "PRE9": -0.05576175347222566,
          "PRE10": -0.06694288021455844,
          "PRE11": -0.03228208189381572,
          "DGN": 0.36611787089179365,
          "PRE14": -0.2243562288252172
        },
        "lime_explanation": [
          [
            "PRE32",
            0.14093892185853016
          ],
          [
            "PRE9",
            -0.13353667807343156
          ],
          [
            "PRE17",
            -0.09797224945068359
          ],
          [
            "PRE25",
            -0.09272347458247414
          ],
          [
            "PRE8",
            -0.056734460940429984
          ],
          [
            "PRE5",
            -0.05455795105944324
          ],
          [
            "PRE7",
            -0.052417850311954645
          ],
          [
            "PRE11",
            -0.04007075091545769
          ]
        ],
        "top_factors": [
          {
            "feature": "DGN",
            "label": "Diagnosis (ICD-10 group)",
            "value": 8.0,
            "value_display": "DGN8",
            "shap_value": 0.36611787089179365,
            "direction": "increases",
            "level": "",
            "sentence": "Diagnosis (ICD-10 group) of DGN8 pushed this prediction toward \u201cDied within one year\u201d."
          },
          {
            "feature": "PRE30",
            "label": "Smoker",
            "value": 0.0,
            "value_display": "No",
            "shap_value": -0.27298779240898446,
            "direction": "decreases",
            "level": "",
            "sentence": "Smoker of No pushed this prediction toward \u201cSurvived one year\u201d."
          },
          {
            "feature": "PRE14",
            "label": "Tumour size (clinical T stage)",
            "value": 11.0,
            "value_display": "T1 \u2014 smallest",
            "shap_value": -0.2243562288252172,
            "direction": "decreases",
            "level": "",
            "sentence": "Tumour size (clinical T stage) of T1 \u2014 smallest pushed this prediction toward \u201cSurvived one year\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cDied within one year\u201d (34%). Raising the estimate: Diagnosis (ICD-10 group) (DGN8). Lowering it: Smoker (No), Tumour size (clinical T stage) (T1 \u2014 smallest).",
        "shap_lime_top5_overlap": 0.0
      },
      {
        "case": "borderline",
        "case_label": "Borderline (p \u2248 0.5)",
        "test_index": 18,
        "actual": 0,
        "probability": 0.49987016193516737,
        "patient": {
          "AGE": 74.0,
          "PRE30": 1.0,
          "PRE17": 0.0,
          "PRE19": 0.0,
          "PRE25": 0.0,
          "PRE32": 0.0,
          "PRE4": 3.52,
          "PRE5": 2.36,
          "PRE6": 1.0,
          "PRE7": 0.0,
          "PRE8": 0.0,
          "PRE9": 0.0,
          "PRE10": 1.0,
          "PRE11": 0.0,
          "DGN": 3.0,
          "PRE14": 12.0
        },
        "patient_display": {
          "AGE": "74 years",
          "PRE30": "Yes",
          "PRE17": "No",
          "PRE19": "No",
          "PRE25": "No",
          "PRE32": "No",
          "PRE4": "3.52 L",
          "PRE5": "2.36 L",
          "PRE6": "1 \u2014 restricted but ambulatory",
          "PRE7": "No",
          "PRE8": "No",
          "PRE9": "No",
          "PRE10": "Yes",
          "PRE11": "No",
          "DGN": "DGN3",
          "PRE14": "T2"
        },
        "shap_values": {
          "AGE": 0.02397535225067182,
          "PRE30": 0.059924149553191704,
          "PRE17": -0.02244639020140768,
          "PRE19": 0.0,
          "PRE25": -0.01501706614687038,
          "PRE32": -4.72070803678739e-18,
          "PRE4": -0.016589155999717203,
          "PRE5": 0.011995115730526302,
          "PRE6": 0.017735074339449108,
          "PRE7": -0.011374917422642,
          "PRE8": -0.031253688871413755,
          "PRE9": -0.05576175347222566,
          "PRE10": 0.02231429340485282,
          "PRE11": -0.03228208189381572,
          "DGN": -0.014462036480133209,
          "PRE14": 0.08724964454314005
        },
        "lime_explanation": [
          [
            "PRE32",
            0.1541870573071803
          ],
          [
            "PRE9",
            -0.13802843933140843
          ],
          [
            "PRE17",
            -0.10353086652292857
          ],
          [
            "PRE25",
            -0.09273124579675059
          ],
          [
            "PRE8",
            -0.05567030601920032
          ],
          [
            "PRE7",
            -0.05274535854050032
          ],
          [
            "PRE11",
            -0.04164847916154215
          ],
          [
            "DGN",
            -0.03503869961946654
          ]
        ],
        "top_factors": [
          {
            "feature": "PRE14",
            "label": "Tumour size (clinical T stage)",
            "value": 12.0,
            "value_display": "T2",
            "shap_value": 0.08724964454314005,
            "direction": "increases",
            "level": "",
            "sentence": "Tumour size (clinical T stage) of T2 pushed this prediction toward \u201cDied within one year\u201d."
          },
          {
            "feature": "PRE30",
            "label": "Smoker",
            "value": 1.0,
            "value_display": "Yes",
            "shap_value": 0.059924149553191704,
            "direction": "increases",
            "level": "",
            "sentence": "Smoker of Yes pushed this prediction toward \u201cDied within one year\u201d."
          },
          {
            "feature": "PRE9",
            "label": "Dyspnoea before surgery",
            "value": 0.0,
            "value_display": "No",
            "shap_value": -0.05576175347222566,
            "direction": "decreases",
            "level": "",
            "sentence": "Dyspnoea before surgery of No pushed this prediction toward \u201cSurvived one year\u201d."
          }
        ],
        "summary": "The model estimates a moderate likelihood of \u201cDied within one year\u201d (50%). Raising the estimate: Tumour size (clinical T stage) (T2), Smoker (Yes). Lowering it: Dyspnoea before surgery (No).",
        "shap_lime_top5_overlap": 0.4
      }
    ]
  }
};
