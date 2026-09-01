import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Gauge, Radar, ScanEye, TriangleAlert } from "lucide-react";

import { ApiUnavailable } from "@/components/api-unavailable";
import { ImportanceBars } from "@/components/charts/attribution";
import { FidelityChart, ScoreBar } from "@/components/charts/model-charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getExplainability } from "@/lib/api";
import type { ExplainabilityOverview } from "@/lib/types";

// Rendered at request time, not at build time. The Docker image for the dashboard
// is built before the API container exists, so a build-time prerender would bake
// the "API unreachable" state into static HTML and serve it until the revalidate
// window expired. Fetches are still cached for 300s at the data layer, so this
// costs a cache lookup, not a round trip per request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explainability",
  description:
    "How the SHAP and LIME explanations were tested: fidelity against random " +
    "ablation, stability across similar patients, and comprehensibility against " +
    "known clinical risk factors.",
};

const PILLARS = [
  {
    key: "fidelity",
    icon: Gauge,
    title: "Fidelity",
    plain: "Is the explanation telling the truth about the model?",
    detail:
      "We take the features the explanation called most important and hide them from the model, then measure how much its answer changes. Then we hide the same number of features picked at random. If the explanation is honest, hiding its top picks should disturb the model far more. If both do the same damage, the ranking was decoration.",
  },
  {
    key: "stability",
    icon: Radar,
    title: "Stability",
    plain: "Do two similar patients get similar reasoning?",
    detail:
      "Two people with near-identical clinical profiles should be told near-identical things. We find each patient's five closest matches and compare their explanations, then compare unrelated patients as a control. Without that control the number is meaningless — if strangers also score high, agreement proves nothing.",
  },
  {
    key: "comprehensibility",
    icon: ScanEye,
    title: "Comprehensibility",
    plain: "Would a clinician recognise these reasons?",
    detail:
      "We check what share of each patient's top-three factors appear on a list of risk factors the medical literature already recognises — a list fixed before the scores were computed, so it is a test and not a curve fit. Then we check how often SHAP and LIME, which work by completely different mathematics, name the same features.",
  },
] as const;

function Pillars({ notes }: { notes: ExplainabilityOverview["method_notes"] }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {PILLARS.map((p) => (
        <article key={p.key} className="rounded-xl border bg-card p-5">
          <span className="grid size-9 place-items-center rounded-lg bg-accent text-accent-foreground">
            <p.icon className="size-4.5" />
          </span>
          <h3 className="mt-4 font-heading text-base font-semibold">{p.title}</h3>
          <p className="mt-1.5 text-sm font-medium leading-snug text-teal">
            {p.plain}
          </p>
          <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
            {p.detail}
          </p>
          <details className="mt-3 border-t pt-3">
            <summary className="cursor-pointer text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground">
              Exact method
            </summary>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              {notes[p.key]}
            </p>
          </details>
        </article>
      ))}
    </div>
  );
}

export default async function ExplainabilityPage() {
  let overview: ExplainabilityOverview;
  try {
    overview = await getExplainability();
  } catch (error) {
    return <ApiUnavailable error={error} />;
  }

  const entries = Object.values(overview.datasets);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
      <header className="max-w-3xl">
        <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
          Explanation quality
        </p>
        <h1 className="mt-2 text-balance font-heading text-4xl font-semibold leading-[1.1]">
          An explanation you cannot test is just a story
        </h1>
        <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground">
          Any model can be made to produce a colourful chart of feature
          importances. The question nobody asks often enough is whether that chart
          describes the model at all. A convincing but unfaithful explanation is
          worse than no explanation, because it manufactures the confidence a
          clinician needs to overrule their own judgement.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          So we measured ours on three axes. Every figure on this page is read
          live from the API, which serves the JSON that{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
            05_evaluation.ipynb
          </code>{" "}
          produced — the same file the written report cites.
        </p>
      </header>

      <section className="mt-10">
        <Pillars notes={overview.method_notes} />
      </section>

      {/* ----------------------------- scorecard ---------------------------- */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold">
          Results across the nine cohorts
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Read the fidelity multiple as &ldquo;how many times more the prediction
          moves when we remove what the explanation said mattered&rdquo;. Anything
          above 1 means the ranking carries real information; the size of the
          margin reflects how concentrated the model&apos;s reliance is, not how
          good SHAP is.
        </p>

        <div className="mt-6 space-y-4">
          {entries.map((e) => (
            <article key={e.slug} className="rounded-xl border bg-card">
              <header className="flex flex-wrap items-center justify-between gap-3 border-b p-5">
                <div>
                  <h3 className="font-heading text-lg font-semibold">{e.title}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Predicting {e.positive_label.toLowerCase()} ·{" "}
                    {e.model_label} · AUC-ROC{" "}
                    <span className="numeric">{e.metrics.roc_auc.toFixed(3)}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="h-6 border-teal/40 text-teal">
                    fidelity {e.fidelity.fidelity_score.toFixed(2)}×
                  </Badge>
                  <Badge variant="secondary" className="h-6">
                    stability {e.stability.mean_neighbour_cosine.toFixed(2)}
                  </Badge>
                  <Button asChild variant="ghost" size="sm" className="h-6">
                    <Link href={`/predict/${e.slug}`}>Try it</Link>
                  </Button>
                </div>
              </header>

              <div className="grid gap-6 p-5 lg:grid-cols-3">
                <div>
                  <h4 className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                    Fidelity
                  </h4>
                  <FidelityChart fidelity={e.fidelity} className="mt-2" />
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {e.fidelity.interpretation}
                  </p>
                </div>

                <div className="space-y-5">
                  <div>
                    <h4 className="mb-2.5 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      Stability
                    </h4>
                    <ScoreBar
                      label="Similar patients agree"
                      value={e.stability.mean_neighbour_cosine}
                    />
                    <div className="mt-3">
                      <ScoreBar
                        label="Unrelated patients (control)"
                        value={Math.max(e.stability.mean_random_cosine, 0)}
                        tone="warn"
                      />
                    </div>
                    <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                      {e.stability.interpretation} Measured over{" "}
                      {e.stability.pairs_compared} patient pairs.
                    </p>
                  </div>

                  <div>
                    <h4 className="mb-2.5 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                      Comprehensibility
                    </h4>
                    <ScoreBar
                      label="Top-3 factors are known risk factors"
                      value={e.comprehensibility.top3_clinical_hit_rate}
                    />
                    <div className="mt-3">
                      <ScoreBar
                        label="SHAP and LIME name the same features"
                        value={e.comprehensibility.shap_lime_top5_overlap}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="mb-2.5 text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
                    What the model relies on overall
                  </h4>
                  <ImportanceBars features={e.global_importance.features} topN={8} />
                  <p className="mt-3 rounded-lg border-l-2 border-teal bg-muted/30 p-3 text-[11px] leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Example explanation:
                    </span>{" "}
                    {e.comprehensibility.example_summary}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ------------------------- honest limitations ----------------------- */}
      <section className="mt-12 grid gap-4 md:grid-cols-2">
        <article className="rounded-xl border border-teal/30 bg-teal-soft/25 p-6">
          <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
            <CheckCircle2 className="size-4 text-teal" />
            What these numbers license us to claim
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>
              Every selected model beats its majority-class baseline on held-out
              data.
            </li>
            <li>
              SHAP attributions are measurably more faithful to the model than a
              random feature ranking, on all nine datasets.
            </li>
            <li>
              Clinically similar patients receive measurably more similar
              explanations than unrelated patients.
            </li>
            <li>
              The factors surfaced to the user are, in the large majority of
              cases, ones the clinical literature already recognises.
            </li>
            <li>
              Contributions satisfy SHAP&apos;s additivity guarantee to within
              1e-4, verified per model in notebook 04.
            </li>
          </ul>
        </article>

        <article className="rounded-xl border border-destructive/25 bg-destructive/5 p-6">
          <h2 className="flex items-center gap-2 font-heading text-lg font-semibold">
            <TriangleAlert className="size-4 text-destructive" />
            What they do not
          </h2>
          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
            <li>
              These are small, single-centre, retrospective datasets from the
              1980s to the 2010s. Nothing here has been validated prospectively.
            </li>
            <li>
              The chronic kidney disease cohort is close to linearly separable, so
              a perfect test score describes an easy task, not a superior model.
            </li>
            <li>
              &ldquo;Faithful to the model&rdquo; is a weaker claim than
              &ldquo;clinically correct&rdquo;. A faithful explanation of a biased
              model is a faithful explanation of a biased model.
            </li>
            <li>
              On the Cleveland cohort the top features are close to the outcome&apos;s
              own definition, so the model is partly reading the diagnosis rather
              than predicting it from cheap bedside signals.
            </li>
            <li>
              Where a feature was imputed, part of its attribution reflects our
              imputation choice rather than the patient.
            </li>
          </ul>
        </article>
      </section>

      <section className="mt-8 rounded-xl border border-dashed p-6">
        <h2 className="font-heading text-lg font-semibold">
          The failure that started this project
        </h2>
        <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          The heart-failure dataset ships a <code className="rounded bg-muted px-1 text-[11px]">time</code>{" "}
          column recording how many days each patient was observed. Train on it
          and AUC jumps from 0.795 to 0.893, and <code className="rounded bg-muted px-1 text-[11px]">time</code>{" "}
          becomes the single most important feature. It is also useless: patients
          who died early were, by construction, observed for less time. The model
          had learned the study&apos;s censoring pattern, and its explanation —
          &ldquo;this patient was only observed for thirty days&rdquo; — cannot
          inform any decision at admission, because the follow-up duration does
          not exist yet.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Accuracy metrics did not merely miss this, they rewarded it. The model
          looked <em>better</em>. Only the feature ranking exposed it, in one
          line. That asymmetry — where explanation catches what evaluation cannot
          — is the entire argument for putting explainability in the loop rather
          than bolting it on afterwards.
        </p>
        <Button asChild variant="outline" size="sm" className="mt-4">
          <Link href="/about">Read the wider case for explainability</Link>
        </Button>
      </section>
    </div>
  );
}
