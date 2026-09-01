/**
 * Dev-only instrumentation bridge for Reticle.
 *
 * Two jobs:
 *   1. Expose what the predict flow *believes* as a subscribable store, so a
 *      verification agent can read state instead of inferring it from pixels.
 *   2. Emit domain signals the DOM cannot express — "an explanation arrived and
 *      it had N factors" is not a CSS class.
 *
 * Everything here is behind a `NODE_ENV === "development"` check that is
 * statically false in a production build, so the SDK is dropped from the
 * production bundle entirely rather than merely going quiet.
 */

const DEV = process.env.NODE_ENV === "development";

export interface PredictSnapshot {
  dataset: string | null;
  model: string | null;
  /** Zero-based index of the visible form step. */
  step: number;
  stepCount: number;
  stepLabel: string | null;
  pending: boolean;
  hasResult: boolean;
  /** Last prediction, if any. */
  prediction: number | null;
  probability: number | null;
  riskBand: string | null;
  topFactorCount: number;
  limeFactorCount: number;
  /** Populated when the API rejected the request (e.g. an out-of-range value). */
  lastError: string | null;
}

const EMPTY: PredictSnapshot = {
  dataset: null,
  model: null,
  step: 0,
  stepCount: 0,
  stepLabel: null,
  pending: false,
  hasResult: false,
  prediction: null,
  probability: null,
  riskBand: null,
  topFactorCount: 0,
  limeFactorCount: 0,
  lastError: null,
};

let snapshot: PredictSnapshot = EMPTY;
const listeners = new Set<() => void>();

/** Zustand/Redux-shaped, which is what `registerStore` wires `subscribe` from. */
export const predictStore = {
  getState: (): PredictSnapshot => snapshot,
  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

/** Merge a patch into the observable snapshot and notify subscribers. */
export function publish(patch: Partial<PredictSnapshot>): void {
  if (!DEV) return;
  snapshot = { ...snapshot, ...patch };
  for (const listener of listeners) listener();
}

/** Emit a named domain observation. */
export function signal(name: string, data?: Record<string, unknown>): void {
  if (!DEV) return;
  void import("@reticlehq/react").then(({ reticle }) => reticle.signal(name, data));
}

/** The testable surface, advertised so the agent learns it without reading source. */
export const TESTIDS = [
  "predict-form",
  "predict-step",
  "predict-continue",
  "predict-submit",
  "predict-back",
  "predict-reset",
  "model-select",
  "predict-empty",
  "result-skeleton",
  "prediction-result",
  "prediction-verdict",
  "probability-gauge",
  "prediction-summary",
  "top-factors",
  "shap-waterfall",
  "lime-panel",
  "prediction-error",
] as const;

export const SIGNALS = [
  "predict:submitted",
  "predict:explained",
  "predict:rejected",
  "predict:blocked",
  "predict:model_switched",
  "predict:step",
] as const;
