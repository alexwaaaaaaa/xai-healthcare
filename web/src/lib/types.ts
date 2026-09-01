/**
 * Types mirroring the FastAPI response models in `api/app/schemas.py`.
 *
 * Hand-written rather than generated from the OpenAPI schema: the surface is
 * eight endpoints, and a generator here would add a build step plus a pile of
 * `unknown`-typed generated unions for no accuracy gain. The API's own Pydantic
 * models remain the source of truth; these are the client-side mirror, and
 * `lib/api.ts` is the single place they are applied.
 */

export type DatasetSlug =
  | "heart_disease"
  | "heart_failure"
  | "diabetes"
  | "kidney_disease"
  | "breast_cancer"
  | "breast_cancer_recurrence"
  | "breast_cancer_survival"
  | "cervical_cancer"
  | "lung_cancer_surgery";

export type ModelName = "logistic_regression" | "random_forest" | "xgboost";

export type RiskBand = "low" | "moderate" | "high";

export type FeatureKind = "numeric" | "binary" | "ordinal";

export interface Feature {
  name: string;
  label: string;
  group: string;
  kind: FeatureKind;
  lo: number;
  hi: number;
  unit: string;
  decimals: number;
  choices: Record<string, string> | null;
  higher_is_worse: boolean | null;
  description: string;
  default: number | null;
}

export interface FeatureGroup {
  key: string;
  label: string;
  features: Feature[];
}

export interface Dataset {
  slug: DatasetSlug;
  title: string;
  source: string;
  citation: string;
  rows: number;
  positive_label: string;
  negative_label: string;
  outcome: string;
  clinical_context: string;
  preprocessing_note: string;
  imputer: string;
  primary: boolean;
  dropped_columns: string[];
  feature_count: number;
  feature_groups: FeatureGroup[];
  best_model: ModelName;
  best_model_label: string;
}

export interface Metrics {
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  roc_auc: number;
  average_precision: number;
  majority_baseline: number;
}

export interface ConfusionMatrix {
  true_negative: number;
  false_positive: number;
  false_negative: number;
  true_positive: number;
}

export interface Calibration {
  class_weighted: boolean;
  test_prevalence: number;
  mean_predicted_probability: number;
  inflation_ratio: number;
  calibrated: boolean;
  note: string;
}

export interface ModelSummary {
  dataset: DatasetSlug;
  model: ModelName;
  label: string;
  is_best: boolean;
  best_params: Record<string, string | number | boolean | null>;
  cv_roc_auc: number;
  metrics: Metrics;
  confusion_matrix: ConfusionMatrix;
  calibration: Calibration;
  test_n: number;
}

export interface Contribution {
  feature: string;
  label: string;
  group: string;
  value: number;
  value_display: string;
  shap_value: number;
}

export interface TopFactor {
  feature: string;
  label: string;
  value: number;
  value_display: string;
  shap_value: number;
  direction: "increases" | "decreases";
  level: string;
  sentence: string;
}

export interface PredictRequest {
  dataset: DatasetSlug;
  model: ModelName;
  patient_features: Record<string, number>;
  include_lime?: boolean;
}

export interface PredictResponse {
  dataset: DatasetSlug;
  dataset_title: string;
  model: ModelName;
  model_label: string;
  prediction: number;
  prediction_label: string;
  probability: number;
  risk_band: RiskBand;
  threshold: number;
  base_value: number;
  shap_values: Record<string, number>;
  contributions: Contribution[];
  lime_explanation: [string, number][];
  lime_labelled: Contribution[];
  top_factors: TopFactor[];
  summary: string;
  model_metrics: Metrics;
  calibration: Calibration;
  caveat: string;
}

export interface FidelityResult {
  model: ModelName;
  model_label: string;
  n_features?: number;
  k_values: number[];
  top_k_probability_drop: number[];
  random_k_probability_drop: number[];
  fidelity_score: number;
  interpretation: string;
}

export interface StabilityResult {
  model: ModelName;
  model_label: string;
  k_neighbours: number;
  mean_neighbour_cosine: number;
  std_neighbour_cosine: number;
  mean_random_cosine: number;
  stability_gap: number;
  pairs_compared: number;
  interpretation: string;
}

export interface ComprehensibilityResult {
  model: ModelName;
  model_label: string;
  clinical_reference_features: string[];
  top3_clinical_hit_rate: number;
  shap_lime_top5_overlap: number;
  lime_sample_size: number;
  example_summary: string;
}

export interface GlobalImportanceFeature {
  feature: string;
  label: string;
  group: string;
  mean_abs_shap: number;
  mean_signed_shap: number;
}

export interface GlobalImportance {
  model: ModelName;
  model_label: string;
  base_value: number;
  features: GlobalImportanceFeature[];
}

export interface Evaluation {
  dataset: DatasetSlug;
  dataset_title: string;
  model: ModelName;
  model_label: string;
  is_best: boolean;
  metrics: Metrics;
  confusion_matrix: ConfusionMatrix;
  calibration: Calibration;
  roc_curve: { fpr: number; tpr: number }[];
  pr_curve: { recall: number; precision: number }[];
  best_params: Record<string, string | number | boolean | null>;
  cv_roc_auc: number;
  test_n: number;
  fidelity?: FidelityResult | null;
  stability?: StabilityResult | null;
  comprehensibility?: ComprehensibilityResult | null;
}

export interface ExplainabilityDataset {
  slug: DatasetSlug;
  title: string;
  positive_label: string;
  model_label: string;
  fidelity: FidelityResult;
  stability: StabilityResult;
  comprehensibility: ComprehensibilityResult;
  global_importance: GlobalImportance;
  metrics: Metrics;
}

export interface ExplainabilityOverview {
  method_notes: {
    fidelity: string;
    stability: string;
    comprehensibility: string;
  };
  best_models: Record<DatasetSlug, ModelName>;
  datasets: Record<DatasetSlug, ExplainabilityDataset>;
}

export interface CaseStudy {
  case: string;
  case_label: string;
  test_index: number;
  actual: number;
  probability: number;
  patient: Record<string, number>;
  patient_display: Record<string, string>;
  shap_values: Record<string, number>;
  lime_explanation: [string, number][];
  top_factors: TopFactor[];
  summary: string;
  shap_lime_top5_overlap: number;
}

export interface CaseStudies {
  model: ModelName;
  model_label: string;
  cases: CaseStudy[];
}

export interface Health {
  status: "ok" | "loading";
  models_loaded: number;
  explainers_loaded: number;
  datasets: string[];
  version: string;
}
