import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

import { ApiUnavailable } from "@/components/api-unavailable";
import { DatasetTabs } from "@/components/dataset-tabs";
import { PredictFlow } from "@/components/predict-flow";
import { Button } from "@/components/ui/button";
import { ApiError, getDataset, getDatasets, getModels } from "@/lib/api";
import type { Dataset, ModelSummary } from "@/lib/types";

// Rendered at request time, not at build time. The Docker image for the dashboard
// is built before the API container exists, so a build-time prerender would bake
// the "API unreachable" state into static HTML and serve it until the revalidate
// window expired. Fetches are still cached for 300s at the data layer, so this
// costs a cache lookup, not a round trip per request.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ dataset: string }>;
}): Promise<Metadata> {
  const { dataset } = await params;
  try {
    const ds = await getDataset(dataset);
    return {
      title: `Predict · ${ds.title}`,
      description: `Explainable risk prediction for ${ds.outcome.toLowerCase()}, with SHAP and LIME attributions per patient.`,
    };
  } catch {
    return { title: "Predict" };
  }
}

export default async function PredictPage({
  params,
}: {
  params: Promise<{ dataset: string }>;
}) {
  const { dataset: slug } = await params;

  let dataset: Dataset;
  let models: ModelSummary[];
  let all: Dataset[];
  try {
    [dataset, models, all] = await Promise.all([
      getDataset(slug),
      getModels(slug),
      getDatasets(),
    ]);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    return <ApiUnavailable error={error} />;
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <DatasetTabs datasets={all} active={dataset.slug} basePath="/predict" />

      <header className="mb-8 mt-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
            Explainable prediction
          </p>
          <h1 className="mt-1.5 font-heading text-3xl font-semibold leading-tight">
            {dataset.title}
          </h1>
          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
            {dataset.outcome}. Every field is validated against the range the
            model actually saw during training, and the result arrives with its
            reasoning attached.
          </p>
        </div>

        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href={`/models/${dataset.slug}`}>Compare models</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <a href={dataset.source} target="_blank" rel="noreferrer noopener">
              Source
              <ExternalLink className="size-3.5" data-icon="inline-end" />
            </a>
          </Button>
        </div>
      </header>

      <PredictFlow dataset={dataset} models={models} />
    </div>
  );
}
