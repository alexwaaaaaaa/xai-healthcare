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

/* --------------------------------------------------------------------------
   Server-side reads. `revalidate: 300` because these are notebook artefacts:
   they change only when the notebooks are re-run, never per request.
   -------------------------------------------------------------------------- */

const cached = { next: { revalidate: 300 } } satisfies RequestInit;

export const getHealth = () => request<Health>("/health", { cache: "no-store" });

export const getDatasets = () => request<Dataset[]>("/datasets", cached);

export const getDataset = (slug: string) =>
  request<Dataset>(`/datasets/${slug}`, cached);

export const getModels = (slug: string) =>
  request<ModelSummary[]>(`/models/${slug}`, cached);

export const getEvaluation = (slug: string, model: ModelName) =>
  request<Evaluation>(`/evaluation/${slug}/${model}`, cached);

export const getExplainability = () =>
  request<ExplainabilityOverview>("/explainability", cached);

export const getCases = (slug: DatasetSlug) =>
  request<CaseStudies>(`/explainability/${slug}/cases`, cached);

/** Called from the browser, so it uses the published API origin. */
export const postPredict = (payload: PredictRequest) =>
  request<PredictResponse>("/predict", {
    method: "POST",
    body: JSON.stringify(payload),
    browser: true,
  });
