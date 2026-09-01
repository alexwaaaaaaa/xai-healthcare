import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Database,
  HeartPulse,
  Microscope,
  Ribbon,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Wind,
} from "lucide-react";

import { ApiUnavailable } from "@/components/api-unavailable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDatasets, getExplainability } from "@/lib/api";
import type { Dataset, ExplainabilityOverview } from "@/lib/types";

// Rendered at request time, not at build time. The Docker image for the dashboard
// is built before the API container exists, so a build-time prerender would bake
// the "API unreachable" state into static HTML and serve it until the revalidate
// window expired. Fetches are still cached for 300s at the data layer, so this
// costs a cache lookup, not a round trip per request.
export const dynamic = "force-dynamic";

const ACCENT_ICON: Record<string, typeof Database> = {
  heart_disease: HeartPulse,
  heart_failure: Activity,
  diabetes: Sparkles,
  kidney_disease: Database,
  breast_cancer: Microscope,
  breast_cancer_recurrence: Ribbon,
  breast_cancer_survival: Stethoscope,
  cervical_cancer: ShieldCheck,
  lung_cancer_surgery: Wind,
};

/** Which cohorts are oncological. Grouping nine cards makes the set legible. */
const ONCOLOGY = new Set([
  "breast_cancer",
  "breast_cancer_recurrence",
  "breast_cancer_survival",
  "cervical_cancer",
  "lung_cancer_surgery",
]);

function Hero({ datasetCount, rows }: { datasetCount: number; rows: number }) {
  return (
    <section className="relative overflow-hidden border-b">
      <div className="clinical-grid pointer-events-none absolute inset-0 opacity-[0.55]" />
      <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
        <Badge variant="outline" className="mb-6 h-6 gap-1.5 px-2.5">
          <span className="size-1.5 rounded-full bg-teal" />
          MDS-391 · Jamia Millia Islamia
        </Badge>

        <h1 className="max-w-4xl text-balance font-heading text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
          A prediction without a reason is not a{" "}
          <span className="text-teal">clinical</span> tool.
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
          Three classifiers trained across {datasetCount} real clinical cohorts
          and {rows.toLocaleString()} patient records — cardiac, renal, metabolic
          and five oncology cohorts — each prediction returned with a SHAP
          attribution, a LIME local surrogate, and a plain-English summary a
          clinician can read in five seconds. The explanations are measured for
          fidelity and stability, not assumed, and the cohorts where the models
          fail are reported rather than dropped.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Button asChild size="lg" className="h-10 px-5">
            <Link href="/predict/heart_disease">
              Run a prediction
              <ArrowRight className="size-4" data-icon="inline-end" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-10 px-5">
            <Link href="/explainability">
              <BookOpen className="size-4" data-icon="inline-start" />
              How we measured the explanations
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function DatasetCard({
  dataset,
  auc,
  recall,
}: {
  dataset: Dataset;
  auc: number | undefined;
  recall: number | undefined;
}) {
  const Icon = ACCENT_ICON[dataset.slug] ?? Database;
  // Recall is shown beside AUC deliberately. On the imbalanced cancer cohorts a
  // respectable AUC can sit next to a recall near zero, and showing only the
  // flattering number is how a dashboard ends up lying politely.
  const weakRecall = recall !== undefined && recall < 0.5;
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border bg-card transition-all hover:border-teal/45 hover:shadow-[var(--shadow-raised)]">
      <div className="flex-1 p-5">
        <div className="flex items-start justify-between gap-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
            <Icon className="size-4.5" />
          </span>
          {dataset.primary && (
            <Badge variant="outline" className="border-teal/40 text-teal">
              Primary
            </Badge>
          )}
        </div>

        <h3 className="mt-4 font-heading text-base font-semibold leading-snug">
          {dataset.title}
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {dataset.outcome}
        </p>

        <dl className="mt-4 grid grid-cols-4 gap-2 border-t pt-3.5 text-[11px]">
          <div>
            <dt className="text-muted-foreground">n</dt>
            <dd className="numeric mt-0.5 text-sm font-semibold">
              {dataset.rows}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Feat.</dt>
            <dd className="numeric mt-0.5 text-sm font-semibold">
              {dataset.feature_count}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">AUC</dt>
            <dd className="numeric mt-0.5 text-sm font-semibold text-teal">
              {auc !== undefined ? auc.toFixed(3) : "—"}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Recall</dt>
            <dd
              className={
                "numeric mt-0.5 text-sm font-semibold " +
                (weakRecall ? "text-risk-high" : "text-foreground")
              }
            >
              {recall !== undefined ? recall.toFixed(2) : "—"}
            </dd>
          </div>
        </dl>

        <p className="mt-3.5 text-[11px] text-muted-foreground">
          Selected model:{" "}
          <span className="font-medium text-foreground">
            {dataset.best_model_label}
          </span>
        </p>
        {weakRecall && (
          <p className="mt-2 text-[10.5px] leading-snug text-risk-high">
            Misses more than half the positive cases — reported, not hidden.
          </p>
        )}
      </div>

      <div className="flex divide-x border-t text-xs">
        <Link
          href={`/predict/${dataset.slug}`}
          className="flex flex-1 items-center justify-center gap-1.5 py-3 font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          Predict
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href={`/models/${dataset.slug}`}
          className="flex flex-1 items-center justify-center py-3 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          Compare models
        </Link>
      </div>
    </article>
  );
}

function QualitySummary({ overview }: { overview: ExplainabilityOverview }) {
  const entries = Object.values(overview.datasets);
  const mean = (pick: (e: (typeof entries)[number]) => number) =>
    entries.reduce((s, e) => s + pick(e), 0) / entries.length;

  const aucs = entries.map((e) => e.metrics.roc_auc);
  const recalls = entries.map((e) => e.metrics.recall);
  const weak = entries.filter((e) => e.metrics.recall < 0.5).length;

  const stats = [
    {
      label: "AUC-ROC range",
      value: `${Math.min(...aucs).toFixed(2)}–${Math.max(...aucs).toFixed(2)}`,
      note: `across ${entries.length} selected models`,
    },
    {
      label: "Recall range",
      value: `${Math.min(...recalls).toFixed(2)}–${Math.max(...recalls).toFixed(2)}`,
      note: `${weak} of ${entries.length} miss over half the positives`,
    },
    {
      label: "Fidelity",
      value: `${mean((e) => e.fidelity.fidelity_score).toFixed(2)}×`,
      note: "ranked ablation vs random ablation",
    },
    {
      label: "Stability",
      value: mean((e) => e.stability.mean_neighbour_cosine).toFixed(2),
      note: "explanation agreement between similar patients",
    },
  ];

  return (
    <section className="border-b bg-surface/40">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <div>
            <h2 className="font-heading text-2xl font-semibold">
              The explanations are measured, not asserted
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              An explanation that looks convincing while being unfaithful to the
              model is worse than none, because it manufactures confidence. Every
              number below comes from{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
                05_evaluation.ipynb
              </code>{" "}
              and is served from the same JSON the report cites.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Ranges rather than averages, deliberately. Three of the oncology
              models sit near chance, and a single mean would bury that.
            </p>
            <Button asChild variant="link" className="mt-2 h-auto p-0 text-sm">
              <Link href="/explainability">
                See the methodology
                <ArrowRight className="size-3.5" data-icon="inline-end" />
              </Link>
            </Button>
          </div>

          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border bg-card p-4">
                <dd className="numeric text-2xl font-semibold text-teal">
                  {s.value}
                </dd>
                <dt className="mt-1 text-xs font-medium">{s.label}</dt>
                <p className="mt-0.5 text-[10.5px] leading-tight text-muted-foreground">
                  {s.note}
                </p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

export default async function HomePage() {
  let datasets: Dataset[];
  let overview: ExplainabilityOverview | null = null;

  try {
    [datasets, overview] = await Promise.all([getDatasets(), getExplainability()]);
  } catch (error) {
    return <ApiUnavailable error={error} />;
  }

  const totalRows = datasets.reduce((s, d) => s + d.rows, 0);

  return (
    <>
      <Hero datasetCount={datasets.length} rows={totalRows} />
      {overview && <QualitySummary overview={overview} />}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="mb-8">
          <h2 className="font-heading text-2xl font-semibold">
            Nine cohorts, nine different problems
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Chosen to stress different parts of the pipeline: near-complete versus
            92% missing columns, a balanced 46% outcome versus a 6.4% one, three
            features versus thirty, a leakage column that had to be detected and
            removed, and a file whose numeric ranges had been silently mangled into
            dates by Excel.
          </p>
        </div>

        {(
          [
            [
              "Cardiometabolic & renal",
              "The original four cohorts.",
              datasets.filter((d) => !ONCOLOGY.has(d.slug)),
            ],
            [
              "Oncology",
              "Four distinct clinical questions — diagnosis, recurrence, surgical survival and screening — across breast, cervical and lung cancer.",
              datasets.filter((d) => ONCOLOGY.has(d.slug)),
            ],
          ] as const
        ).map(([heading, blurb, group]) =>
          group.length ? (
            <div key={heading} className="mb-10 last:mb-0">
              <div className="mb-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-heading text-lg font-semibold">{heading}</h3>
                <p className="text-xs text-muted-foreground">{blurb}</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {group.map((d) => (
                  <DatasetCard
                    key={d.slug}
                    dataset={d}
                    auc={overview?.datasets[d.slug]?.metrics.roc_auc}
                    recall={overview?.datasets[d.slug]?.metrics.recall}
                  />
                ))}
              </div>
            </div>
          ) : null,
        )}

        <div className="mt-10 rounded-xl border border-dashed p-5">
          <h3 className="font-heading text-sm font-semibold">
            Every row is real and cited
          </h3>
          <ul className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
            {datasets.map((d) => (
              <li key={d.slug} className="leading-relaxed">
                <span className="font-medium text-foreground">{d.title}</span> —{" "}
                {d.citation}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t pt-3 text-[11px] leading-relaxed text-muted-foreground">
            Two further cancer datasets were considered and rejected rather than
            counted: UCI 62 (&ldquo;Lung Cancer&rdquo;) has 32 patients against 56
            features, and UCI 83 (&ldquo;Primary Tumor&rdquo;) has 21 classes with
            as few as one case each. Neither can be fitted honestly.
          </p>
        </div>
      </section>
    </>
  );
}
