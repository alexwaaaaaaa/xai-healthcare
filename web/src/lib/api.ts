/**
 * Typed client for the FastAPI backend.
 *
 * Two base URLs on purpose: server components fetch over the Docker network
 * (`api:8000`), the browser fetches over the published port (`localhost:8000`).
 * Using one value would break in Compose, where `localhost` inside the web
 * container is the web container.
 */

import type {
  CaseStudies,
  Dataset,
  DatasetSlug,
  Evaluation,
  ExplainabilityOverview,
  Health,
  ModelName,
  ModelSummary,
  PredictRequest,
  PredictResponse,
} from "./types";

const SERVER_BASE =
  process.env.API_INTERNAL_URL ?? process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export const BROWSER_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

/** Thrown for any non-2xx response, carrying the API's own message. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly detail?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface FastApiValidationItem {
  loc?: (string | number)[];
  msg?: string;
  type?: string;
}

/** FastAPI puts validation failures in `detail`, as a string or a list. */
function extractMessage(status: number, body: unknown): string {
  if (typeof body === "object" && body !== null && "detail" in body) {
    const detail = (body as { detail: unknown }).detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) {
      const messages = (detail as FastApiValidationItem[])
        .map((d) => d.msg?.replace(/^Value error,\s*/, ""))
        .filter((m): m is string => Boolean(m));
      if (messages.length) return messages.join("; ");
    }
  }
  return `Request failed with status ${status}`;
}

async function request<T>(
  path: string,
  init?: RequestInit & { browser?: boolean },
): Promise<T> {
  const base = init?.browser ? BROWSER_BASE : SERVER_BASE;
  let response: Response;
  try {
    response = await fetch(`${base}${path}`, {
      ...init,
      headers: { "content-type": "application/json", ...init?.headers },
    });
  } catch (cause) {
    throw new ApiError(
      0,
      `Cannot reach the prediction service at ${base}. Is the API running?`,
      cause,
    );
  }

  const body: unknown = await response.json().catch(() => null);
  if (!response.ok) {
    throw new ApiError(response.status, extractMessage(response.status, body), body);
  }
  return body as T;
}

import {
  STATIC_CASE_STUDIES,
  STATIC_DATASETS,
  STATIC_EVALUATION,
  STATIC_MODELS,
  STATIC_OVERVIEW,
} from "./static-data";

/* --------------------------------------------------------------------------
   Server-side reads. Gracefully falls back to pre-rendered metadata if
   remote API is starting or unreachable.
   -------------------------------------------------------------------------- */

const cached = { next: { revalidate: 300 } } satisfies RequestInit;

export const getHealth = () => request<Health>("/health", { cache: "no-store" });

export const getDatasets = async (): Promise<Dataset[]> => {
  try {
    const res = await request<Dataset[]>("/datasets", cached);
    if (Array.isArray(res) && res.length > 0) return res;
  } catch {}
  return STATIC_DATASETS;
};

export const getDataset = async (slug: string): Promise<Dataset> => {
  try {
    const res = await request<Dataset>(`/datasets/${slug}`, cached);
    if (res && res.slug) return res;
  } catch {}
  const found = STATIC_DATASETS.find((d) => d.slug === slug);
  if (found) return found;
  throw new ApiError(404, `Dataset '${slug}' not found`);
};

export const getModels = async (slug: string): Promise<ModelSummary[]> => {
  try {
    const res = await request<ModelSummary[]>(`/models/${slug}`, cached);
    if (Array.isArray(res) && res.length > 0) return res;
  } catch {}
  return STATIC_MODELS[slug] ?? [];
};

export const getEvaluation = async (
  slug: string,
  model: ModelName,
): Promise<Evaluation> => {
  try {
    const res = await request<Evaluation>(`/evaluation/${slug}/${model}`, cached);
    if (res && res.metrics) return res;
  } catch {}
  if (STATIC_EVALUATION[slug]?.[model]) {
    return STATIC_EVALUATION[slug][model];
  }
  throw new ApiError(404, `Evaluation for ${slug}/${model} not found`);
};

export const getExplainability = async (): Promise<ExplainabilityOverview> => {
  try {
    const res = await request<ExplainabilityOverview>("/explainability", cached);
    if (res && res.datasets) return res;
  } catch {}
  return STATIC_OVERVIEW;
};

export const getCases = async (slug: DatasetSlug): Promise<CaseStudies> => {
  try {
    const res = await request<CaseStudies>(`/explainability/${slug}/cases`, cached);
    if (res && res.cases) return res;
  } catch {}
  return STATIC_CASE_STUDIES[slug];
};

/** Called from the browser, hitting the Next.js /api/predict route. */
export const postPredict = async (
  payload: PredictRequest,
): Promise<PredictResponse> => {
  const res = await fetch("/api/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new ApiError(
      res.status,
      data?.error || `Prediction failed with status ${res.status}`,
    );
  }
  return res.json();
};

