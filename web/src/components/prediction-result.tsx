"use client";

import { motion } from "motion/react";
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Info,
  Scale,
} from "lucide-react";

import { AttributionBars, ShapWaterfall } from "@/components/charts/attribution";
import { ProbabilityGauge } from "@/components/charts/gauge";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Dataset, PredictResponse, RiskBand } from "@/lib/types";
import { cn } from "@/lib/utils";

const BAND_STYLE: Record<RiskBand, string> = {
  low: "border-risk-low/40 bg-risk-low/10 text-risk-low",
  moderate: "border-risk-moderate/40 bg-risk-moderate/10 text-risk-moderate",
  high: "border-risk-high/40 bg-risk-high/10 text-risk-high",
};

function Section({
  title,
  hint,
  children,
  className,
  testId,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
  testId?: string;
}) {
  return (
    <section
      className={cn("rounded-xl border bg-card p-5", className)}
      data-testid={testId}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <h3 className="font-heading text-sm font-semibold">{title}</h3>
        {hint && (
          <Tooltip>
            <TooltipTrigger
              aria-label={`About ${title}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Info className="size-3.5" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs text-xs leading-relaxed">
              {hint}
            </TooltipContent>
          </Tooltip>
        )}
      </header>
      {children}
    </section>
  );
}

export function PredictionResult({
  result,
  dataset,
}: {
  result: PredictResponse;
  dataset: Dataset;
}) {
  const positive = result.prediction === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="space-y-4"
      aria-live="polite"
      data-testid="prediction-result"
    >
      {/* ---------- WHAT the model predicted ---------- */}
      <section className="overflow-hidden rounded-xl border bg-card">
        <div className="grid gap-6 p-6 sm:grid-cols-[auto_1fr] sm:items-center">
          <ProbabilityGauge
            probability={result.probability}
            band={result.risk_band}
            outcome={dataset.positive_label}
            threshold={result.threshold}
          />

          <div className="min-w-0">
            <p className="text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
              Model verdict
            </p>
            <h2
              className="mt-1.5 text-balance font-heading text-2xl font-semibold leading-tight"
              data-testid="prediction-verdict"
            >
              {result.prediction_label}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge
                variant="outline"
                className={cn("h-6 capitalize", BAND_STYLE[result.risk_band])}
              >
                {result.risk_band} risk
              </Badge>
              <Badge variant="secondary" className="h-6">
                {result.model_label}
              </Badge>
              {positive ? (
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <ArrowUpRight className="size-3.5" />
                  above the {(result.threshold * 100).toFixed(0)}% threshold
                </span>
              ) : (
                <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                  <ArrowDownRight className="size-3.5" />
                  below the {(result.threshold * 100).toFixed(0)}% threshold
                </span>
              )}
            </div>

            <Separator className="my-4" />

            <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(
                [
                  ["AUC-ROC", result.model_metrics.roc_auc],
                  ["Recall", result.model_metrics.recall],
                  ["Precision", result.model_metrics.precision],
                  ["F1", result.model_metrics.f1],
                ] as const
              ).map(([label, value]) => (
                <div key={label}>
                  <dt className="text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                    {label}
                  </dt>
                  <dd className="numeric mt-0.5 text-base font-semibold">
                    {value.toFixed(3)}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Held-out test performance for this model, not a confidence score for
              this individual patient.
            </p>
          </div>
        </div>

        {!result.calibration.calibrated && (
          <div className="border-t border-risk-moderate/30 bg-risk-moderate/8 px-6 py-4">
            <p className="flex items-start gap-2 text-xs font-medium text-risk-moderate">
              <Scale className="mt-0.5 size-3.5 shrink-0" />
              Read this percentage as a ranking score, not an absolute risk
            </p>
            <p className="mt-1.5 pl-[22px] text-[11.5px] leading-relaxed text-muted-foreground">
              Class weighting was tuned into this model to improve recall on an
              imbalanced cohort, which scales its probabilities toward 50% instead
              of toward the true prevalence of{" "}
              <span className="numeric font-medium text-foreground">
                {(result.calibration.test_prevalence * 100).toFixed(1)}%
              </span>
              . Across the held-out split it returns probabilities about{" "}
              <span className="numeric font-medium text-foreground">
                {result.calibration.inflation_ratio.toFixed(1)}×
              </span>{" "}
              higher than prevalence. The figure is useful for deciding which
              patients to review first; it is not this patient&apos;s chance of
              having the condition.
            </p>
          </div>
        )}
      </section>

      {/* ---------- WHY, in plain English ---------- */}
      <section className="rounded-xl border border-teal/30 bg-teal-soft/40 p-6">
        <p className="text-[10.5px] uppercase tracking-[0.16em] text-accent-foreground">
          Why — read this first
        </p>
        <p
          className="mt-2.5 text-pretty text-[15px] font-medium leading-relaxed"
          data-testid="prediction-summary"
        >
          {result.summary}
        </p>

        <ol className="mt-5 space-y-2.5" data-testid="top-factors">
          {result.top_factors.map((factor, i) => (
            <motion.li
              key={factor.feature}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.09, duration: 0.4 }}
              className="flex items-start gap-3 rounded-lg border bg-card/80 p-3"
            >
              <span
                className={cn(
                  "mt-0.5 grid size-6 shrink-0 place-items-center rounded-md text-[11px] font-semibold",
                  factor.direction === "increases"
                    ? "bg-increases/12 text-increases"
                    : "bg-decreases/12 text-decreases",
                )}
                aria-hidden
              >
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-relaxed">{factor.sentence}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-muted-foreground">
                  <span className="numeric">
                    SHAP {factor.shap_value > 0 ? "+" : ""}
                    {factor.shap_value.toFixed(3)}
                  </span>
                  {factor.level && <span>value is {factor.level} for its range</span>}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* ---------- The full attribution, two independent methods ---------- */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Section
          testId="shap-waterfall"
          title="SHAP waterfall"
          hint="Starts from the model's average output across the training cohort and adds each feature's contribution. The bars sum exactly to this patient's output — that additivity is what makes SHAP auditable."
        >
          <ShapWaterfall
            contributions={result.contributions}
            baseValue={result.base_value}
            probability={result.probability}
            positiveLabel={dataset.positive_label}
          />
        </Section>

        <Section
          testId="lime-panel"
          title="LIME local surrogate"
          hint="LIME samples synthetic patients around this one and fits a sparse linear model to the neighbourhood. It reaches its answer by a completely different route from SHAP, so agreement between the two is evidence and disagreement is a warning."
        >
          {result.lime_labelled.length ? (
            <>
              <AttributionBars
                items={result.lime_labelled}
                positiveLabel={dataset.positive_label}
                negativeLabel={dataset.negative_label}
                valueLabel="LIME surrogate weight"
              />
              <LimeAgreement result={result} />
            </>
          ) : (
            <p className="text-xs text-muted-foreground">
              LIME was skipped for this request.
            </p>
          )}
        </Section>
      </div>

      {/* ---------- All contributions ---------- */}
      <Section
        title={`All ${result.contributions.length} feature contributions`}
        hint="Every feature the model saw, ordered by the absolute size of its contribution. Features near zero were seen and found uninformative for this patient — which is itself worth knowing."
      >
        <AttributionBars
          items={result.contributions}
          positiveLabel={dataset.positive_label}
          negativeLabel={dataset.negative_label}
        />
      </Section>

      <p className="flex items-start gap-2.5 rounded-lg border border-destructive/25 bg-destructive/5 p-3.5 text-[11.5px] leading-relaxed text-muted-foreground">
        <AlertTriangle className="mt-0.5 size-3.5 shrink-0 text-destructive" />
        {result.caveat}
      </p>
    </motion.div>
  );
}

/** How much SHAP and LIME agree on this specific patient. */
function LimeAgreement({ result }: { result: PredictResponse }) {
  const shapTop = new Set(result.contributions.slice(0, 5).map((c) => c.feature));
  const limeTop = result.lime_explanation.slice(0, 5).map(([name]) => name);
  const overlap = limeTop.filter((f) => shapTop.has(f)).length;
  const strong = overlap >= 4;

  return (
    <p className="mt-4 border-t pt-3 text-[11px] leading-relaxed text-muted-foreground">
      <span
        className={cn(
          "font-medium",
          strong ? "text-risk-low" : "text-risk-moderate",
        )}
      >
        {overlap} of 5 top features agree
      </span>{" "}
      between SHAP and LIME for this patient.{" "}
      {strong
        ? "Two methods with different mathematics converging is the strongest available evidence that the explanation reflects the model rather than the tool."
        : "Limited agreement means the local decision surface is uneven here, so treat the single-method factors as tentative."}
    </p>
  );
}
