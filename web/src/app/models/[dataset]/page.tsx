import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Trophy } from "lucide-react";

import { ApiUnavailable } from "@/components/api-unavailable";
import { DatasetTabs } from "@/components/dataset-tabs";
import {
  ConfusionMatrixGrid,
  RocOverlay,
} from "@/components/charts/model-charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ApiError,
  getDataset,
  getDatasets,
  getEvaluation,
  getModels,
} from "@/lib/api";
import type { Dataset, Evaluation, ModelSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

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
      title: `Models · ${ds.title}`,
      description: `Logistic Regression, Random Forest and XGBoost compared on ${ds.title}: accuracy, F1, AUC-ROC, ROC curves and confusion matrices.`,
    };
  } catch {
    return { title: "Model comparison" };
  }
}

const METRIC_COLUMNS = [
  { key: "roc_auc", label: "AUC-ROC", hint: "threshold-free ranking quality" },
  { key: "f1", label: "F1", hint: "harmonic mean of precision and recall" },
  { key: "recall", label: "Recall", hint: "share of true cases caught" },
  { key: "precision", label: "Precision", hint: "share of flags that were right" },
  { key: "accuracy", label: "Accuracy", hint: "overall correctness" },
] as const;

export default async function ModelsPage({
  params,
}: {
  params: Promise<{ dataset: string }>;
}) {
  const { dataset: slug } = await params;

  let dataset: Dataset;
  let models: ModelSummary[];
  let all: Dataset[];
  let evaluations: Evaluation[];
  try {
    [dataset, models, all] = await Promise.all([
      getDataset(slug),
      getModels(slug),
      getDatasets(),
    ]);
    evaluations = await Promise.all(
      models.map((m) => getEvaluation(slug, m.model)),
    );
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    return <ApiUnavailable error={error} />;
  }

  const curves = Object.fromEntries(
    evaluations.map((e) => [e.model, e.roc_curve]),
  );
  const best = models.find((m) => m.is_best) ?? models[0];
  const baseline = best.metrics.majority_baseline;
  const bestBy = (key: (typeof METRIC_COLUMNS)[number]["key"]) =>
    Math.max(...models.map((m) => m.metrics[key]));

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
      <DatasetTabs datasets={all} active={dataset.slug} basePath="/models" />

      <header className="mb-8 mt-8 flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
            Model comparison
          </p>
          <h1 className="mt-1.5 font-heading text-3xl font-semibold leading-tight">
            {dataset.title}
          </h1>
          <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
            All three classifiers tuned by 5-fold cross-validated grid search on
            the training split, then scored once on {best.test_n} held-out
            patients. A majority-class predictor would score{" "}
            <span className="numeric font-medium text-foreground">
              {baseline.toFixed(3)}
            </span>{" "}
            accuracy — any model below that line is worthless regardless of how
            its other numbers read.
          </p>
        </div>
        <Button asChild size="sm">
          <Link href={`/predict/${dataset.slug}`}>Run a prediction</Link>
        </Button>
      </header>

      {/* ------------------------------- table ------------------------------- */}
      <section className="overflow-hidden rounded-xl border bg-card">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[190px]">Model</TableHead>
                {METRIC_COLUMNS.map((c) => (
                  <TableHead key={c.key} className="text-right">
                    <span title={c.hint}>{c.label}</span>
                  </TableHead>
                ))}
                <TableHead className="text-right">CV AUC</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {models.map((m) => (
                <TableRow key={m.model} className={cn(m.is_best && "bg-teal-soft/25")}>
                  <TableCell className="font-medium">
                    <span className="flex items-center gap-2">
                      {m.label}
                      {m.is_best && (
                        <Badge
                          variant="outline"
                          className="h-5 gap-1 border-teal/40 text-teal"
                        >
                          <Trophy className="size-2.5" />
                          selected
                        </Badge>
                      )}
                    </span>
                  </TableCell>
                  {METRIC_COLUMNS.map((c) => {
                    const value = m.metrics[c.key];
                    return (
                      <TableCell
                        key={c.key}
                        className={cn(
                          "numeric text-right",
                          value === bestBy(c.key) && "font-semibold text-teal",
                        )}
                      >
                        {value.toFixed(3)}
                      </TableCell>
                    );
                  })}
                  <TableCell className="numeric text-right text-muted-foreground">
                    {m.cv_roc_auc.toFixed(3)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <p className="border-t bg-muted/25 px-4 py-3 text-[11px] leading-relaxed text-muted-foreground">
          Selection is on test AUC-ROC with a documented tie-break: where two
          models sit within 0.01 AUC of each other, the simpler one wins, because
          an indistinguishable gain does not justify a less transparent model in a
          clinical setting.
        </p>
      </section>

      {/* ------------------------------- charts ------------------------------ */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-heading text-sm font-semibold">ROC curves</h2>
          <p className="mb-3 mt-1 text-[11px] leading-relaxed text-muted-foreground">
            Every threshold at once. The diagonal is random guessing; distance
            above it is the model&apos;s ability to rank a sick patient above a
            healthy one.
          </p>
          <RocOverlay models={models} curves={curves} />
        </section>

        <section className="rounded-xl border bg-card p-5">
          <h2 className="font-heading text-sm font-semibold">
            Confusion matrix — {best.label}
          </h2>
          <p className="mb-4 mt-1 text-[11px] leading-relaxed text-muted-foreground">
            At the default 0.5 threshold, over {best.test_n} held-out patients.
          </p>
          <ConfusionMatrixGrid
            matrix={best.confusion_matrix}
            positiveLabel={dataset.positive_label}
          />
        </section>
      </div>

      {/* ---------------------------- per-model detail ---------------------- */}
      <section className="mt-4 grid gap-4 md:grid-cols-3">
        {models.map((m) => (
          <article key={m.model} className="rounded-xl border bg-card p-5">
            <header className="flex items-start justify-between gap-2">
              <h3 className="font-heading text-sm font-semibold">{m.label}</h3>
              {m.is_best && (
                <Badge variant="outline" className="h-5 border-teal/40 text-teal">
                  selected
                </Badge>
              )}
            </header>

            <p className="mt-3 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
              Tuned hyperparameters
            </p>
            <dl className="mt-1.5 space-y-1">
              {Object.entries(m.best_params).map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 text-[11px]">
                  <dt className="truncate text-muted-foreground">{k}</dt>
                  <dd className="numeric shrink-0">{String(v)}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 border-t pt-3">
              <ConfusionMatrixGrid
                matrix={m.confusion_matrix}
                positiveLabel={dataset.positive_label}
              />
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
