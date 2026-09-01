import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";

import { ApiUnavailable } from "@/components/api-unavailable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDatasets } from "@/lib/api";
import type { Dataset } from "@/lib/types";

// Rendered at request time, not at build time. The Docker image for the dashboard
// is built before the API container exists, so a build-time prerender would bake
// the "API unreachable" state into static HTML and serve it until the revalidate
// window expired. Fetches are still cached for 300s at the data layer, so this
// costs a cache lookup, not a round trip per request.
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Why explainability matters",
  description:
    "Black-box distrust, regulatory pressure and undetected shortcut learning — " +
    "the research gap this project addresses, and how the pipeline was built to " +
    "close it.",
};

const GAPS = [
  {
    n: "01",
    title: "Clinicians will not act on an unexplained number",
    body: "A model that outputs 0.82 gives a clinician nothing to reason with. They cannot tell whether the score reflects the patient's ejection fraction or an artefact of the cohort it was trained on, and they carry the liability either way. The predictable result is that accurate models sit unused — the adoption barrier in clinical machine learning is trust, not accuracy. An explanation is what converts a score into something a professional can accept or overrule on grounds they can articulate.",
  },
  {
    n: "02",
    title: "Accuracy metrics reward shortcut learning",
    body: "A model can reach excellent AUC by exploiting an artefact of how the data was collected rather than any clinical mechanism. This project hit exactly that: the heart-failure dataset's follow-up-duration column pushes AUC from 0.795 to 0.893 while encoding nothing about the patient. Every standard metric got better. Only inspecting what the model relied on revealed the problem — which means evaluation without explanation is structurally unable to catch this class of failure.",
  },
  {
    n: "03",
    title: "Regulation now expects a rationale, not just a result",
    body: "The GDPR's provisions on automated decision-making, the EU AI Act's classification of medical decision-support as high-risk, and FDA guidance on machine-learning-enabled devices all converge on the same requirement: a deployed clinical model must be able to say why. Explainability has moved from a research nicety to a compliance precondition, and retrofitting it onto a finished black box is considerably harder than designing for it.",
  },
  {
    n: "04",
    title: "Most work stops at producing an explanation, not testing one",
    body: "The gap this project targets. A large share of applied XAI papers generate SHAP summary plots and treat their existence as the contribution. Almost none check whether the attributions are faithful to the model, whether they are stable across similar patients, or whether a clinician would recognise the factors named. An unvalidated explanation is an untested medical claim, so we measured all three and published the numbers alongside the predictions.",
  },
] as const;

const DECISIONS = [
  {
    title: "Dropped a leakage column that improved every metric",
    body: "The heart-failure `time` feature was removed after quantifying its effect, accepting a 0.10 AUC loss for a model whose reasoning survives contact with a bedside.",
  },
  {
    title: "Chose one SHAP bar per clinical concept over one-hot encoding",
    body: "Nominal features stay as single columns. One-hot is the textbook choice, but it splits chest pain type across four bars, and \"chest-pain-type-is-not-2 contributed +0.03\" is not a sentence a cardiologist can use.",
  },
  {
    title: "Refused SMOTE for class imbalance",
    body: "Imbalance is handled by class weights tuned inside the search. Synthesising interpolated patients would put fabricated rows into a project whose premise is that every row is real, and attributions computed over synthetic neighbourhoods are hard to defend.",
  },
  {
    title: "KNN imputation where missingness is informative",
    body: "The kidney cohort is missing red-cell morphology in 38% of records, and it is missing because a clinician chose not to order the test. Filling 152 rows with one median value would have manufactured a fake modal patient.",
  },
  {
    title: "Rejected out-of-range inputs instead of predicting anyway",
    body: "The API returns 422 with a specific message for an implausible value. Without that, the model would return a confident probability and SHAP a coherent explanation for a patient who cannot exist.",
  },
  {
    title: "Returned a calibrated probability, never a bare label",
    body: "The 0.5 threshold is a statistical default, not a clinical decision. For heart failure it misses over half the deaths, so the trade-off is surfaced and the choice left with the clinician.",
  },
] as const;

const STACK = [
  { layer: "Research", items: "Jupyter · pandas · scikit-learn · XGBoost · SHAP · LIME" },
  { layer: "Serving", items: "FastAPI · Pydantic v2 · Uvicorn" },
  { layer: "Interface", items: "Next.js App Router · TypeScript · Tailwind · Recharts · Motion" },
  { layer: "Reproducibility", items: "Docker Compose · pinned dependencies · fixed random seed (42)" },
] as const;

export default async function AboutPage() {
  let datasets: Dataset[];
  try {
    datasets = await getDatasets();
  } catch (error) {
    return <ApiUnavailable error={error} />;
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12 sm:px-8">
      <header>
        <Badge variant="outline" className="mb-5 h-6 gap-1.5 px-2.5">
          <span className="size-1.5 rounded-full bg-teal" />
          Minor project · MDS-391
        </Badge>
        <h1 className="text-balance font-heading text-4xl font-semibold leading-[1.1]">
          Why explainability is not optional in clinical machine learning
        </h1>
        <p className="mt-5 text-pretty text-base leading-relaxed text-muted-foreground">
          Diagnostic models have been at or above clinician-level accuracy on
          narrow tasks for years. Very few are in routine use. The obstacle is not
          performance — it is that a clinician asked to act on a number has no way
          to know whether the number is reasoning about the patient in front of
          them or about an artefact of the dataset it learned from.
        </p>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          This project treats the explanation as the deliverable rather than a
          postscript, and then tests it — because an explanation nobody validated
          is an untested medical claim.
        </p>
      </header>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">The research gap</h2>
        <div className="mt-6 space-y-8">
          {GAPS.map((g) => (
            <article key={g.n} className="grid gap-4 sm:grid-cols-[auto_1fr]">
              <span className="numeric text-2xl font-semibold text-teal/60">
                {g.n}
              </span>
              <div>
                <h3 className="font-heading text-lg font-semibold leading-snug">
                  {g.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {g.body}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">
          How the two methods differ, and why we run both
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <article className="rounded-xl border bg-card p-5">
            <h3 className="font-heading text-base font-semibold">SHAP</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Borrows the Shapley value from cooperative game theory: a feature&apos;s
              contribution is its average marginal effect across every possible
              ordering of the other features. It comes with an additivity
              guarantee — the contributions sum exactly to the gap between this
              prediction and the cohort average — which is what makes it
              auditable rather than merely suggestive.
            </p>
          </article>
          <article className="rounded-xl border bg-card p-5">
            <h3 className="font-heading text-base font-semibold">LIME</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Samples synthetic patients around the one being explained and fits a
              sparse linear model to that neighbourhood. It answers a narrower,
              more local question, and it gets there by entirely different
              mathematics — so agreement between the two is real evidence, and
              disagreement is a signal that the decision surface is uneven here
              and the explanation deserves a hedge.
            </p>
          </article>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Running only one leaves you unable to distinguish a property of the
          model from a property of your explanation tool. We report the top-5
          overlap for every prediction so that distinction stays visible.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">
          Decisions that cost us a metric
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The choices worth defending in a viva are the ones where the
          interpretable option scored worse.
        </p>
        <ul className="mt-6 space-y-3">
          {DECISIONS.map((d) => (
            <li key={d.title} className="rounded-lg border-l-2 border-teal bg-muted/25 p-4">
              <p className="text-sm font-medium">{d.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                {d.body}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">Data provenance</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Four public, cited cohorts, downloaded programmatically by{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-[11px]">
            scripts/download_data.py
          </code>
          , which verifies every row count against the published figure and fails
          loudly rather than substituting anything synthetic. No patient value
          anywhere in this project was typed by hand.
        </p>
        <ul className="mt-5 space-y-3">
          {datasets.map((d) => (
            <li key={d.slug} className="rounded-xl border bg-card p-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-heading text-sm font-semibold">{d.title}</h3>
                <span className="numeric text-[11px] text-muted-foreground">
                  {d.rows} patients · {d.feature_count} features
                </span>
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {d.citation}
              </p>
              <a
                href={d.source}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex items-center gap-1 text-[11px] text-teal hover:underline"
              >
                {d.source.replace(/^https?:\/\//, "")}
                <ExternalLink className="size-3" />
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14">
        <h2 className="font-heading text-2xl font-semibold">Implementation</h2>
        <dl className="mt-5 divide-y rounded-xl border bg-card">
          {STACK.map((s) => (
            <div key={s.layer} className="grid gap-1 p-4 sm:grid-cols-[140px_1fr]">
              <dt className="text-xs font-semibold">{s.layer}</dt>
              <dd className="text-xs text-muted-foreground">{s.items}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          The research pipeline is five ordered notebooks, each consuming the
          previous stage&apos;s artefacts, all reproducible top-to-bottom. The API
          imports the same shared package the notebooks used, so the transform
          applied at inference is the one that was fitted during training — a
          reimplementation would have been a silent-skew bug waiting to happen.
        </p>
      </section>

      <section className="mt-14 rounded-xl border border-destructive/25 bg-destructive/5 p-6">
        <h2 className="font-heading text-lg font-semibold">Scope and limits</h2>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          This is an academic demonstrator, not a medical device. The cohorts are
          small, retrospective and single-centre; none of the models has been
          validated prospectively; and the explanations are faithful to the model,
          which is a materially weaker claim than clinically correct. The system
          is unauthenticated by design and holds no patient data — it must not be
          exposed to a public network or used to inform any real clinical
          decision.
        </p>
      </section>

      <div className="mt-10 flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/predict/heart_disease">
            Run a prediction
            <ArrowRight className="size-4" data-icon="inline-end" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/explainability">See how the explanations were tested</Link>
        </Button>
      </div>
    </div>
  );
}
