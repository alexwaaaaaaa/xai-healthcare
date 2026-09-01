import { PlugZap, Terminal } from "lucide-react";

import { ApiError } from "@/lib/api";

/**
 * The error state for "the backend is not running", which is the single most
 * likely failure when someone clones this repo. A bare "fetch failed" would
 * leave them guessing, so it names the cause and prints the command that fixes
 * it.
 */
export function ApiUnavailable({ error }: { error: unknown }) {
  const status = error instanceof ApiError ? error.status : 0;
  const message =
    error instanceof Error ? error.message : "Unknown error contacting the API.";
  const artefactsMissing = status === 503;

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-5 py-24 text-center sm:px-8">
      <span className="grid size-12 place-items-center rounded-xl border border-destructive/30 bg-destructive/8 text-destructive">
        <PlugZap className="size-5" />
      </span>

      <h1 className="mt-6 font-heading text-2xl font-semibold">
        {artefactsMissing
          ? "The model artefacts are not loaded"
          : "The prediction service is not reachable"}
      </h1>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {message}
      </p>

      <div className="mt-7 w-full rounded-xl border bg-card p-5 text-left">
        <p className="flex items-center gap-2 text-xs font-medium">
          <Terminal className="size-3.5" />
          {artefactsMissing
            ? "Generate the artefacts, then restart the API"
            : "Start the backend from the repository root"}
        </p>
        <pre className="mt-3 overflow-x-auto rounded-lg bg-muted p-3.5 text-[11.5px] leading-relaxed">
          <code>
            {artefactsMissing
              ? `python scripts/download_data.py\npython scripts/build_notebooks.py --execute`
              : `docker compose up --build\n\n# or, without Docker:\nuvicorn api.app.main:app --port 8000`}
          </code>
        </pre>
        <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
          The dashboard reads every number from the live API — there is no mock
          data to fall back on, which is deliberate: a demo that renders fake
          metrics when the backend is down is how wrong numbers end up in a
          report.
        </p>
      </div>
    </div>
  );
}
