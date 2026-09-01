"use client";

import { motion, useReducedMotion } from "motion/react";

import type { Contribution, GlobalImportanceFeature } from "@/lib/types";
import { cn } from "@/lib/utils";

/* Attribution charts are hand-built rather than Recharts: a SHAP waterfall needs
   a shared zero axis, signed bar direction, per-bar value labels and staggered
   entry animation, and fighting a chart library into that shape costs more code
   than drawing it. Recharts is still used for the ROC/fidelity line charts,
   where its axes and tooltips earn their weight. */

function useStagger() {
  const reduced = useReducedMotion();
  return (i: number) =>
    reduced
      ? { duration: 0 }
      : { duration: 0.5, delay: 0.05 + i * 0.045, ease: [0.16, 1, 0.3, 1] as const };
}

/**
 * Diverging bar chart on a shared zero axis: features pushing the prediction
 * toward the positive outcome extend right, protective features extend left.
 */
export function AttributionBars({
  items,
  positiveLabel,
  negativeLabel,
  valueLabel = "SHAP contribution",
  showValues = true,
  max: maxOverride,
  className,
}: {
  items: Contribution[];
  positiveLabel: string;
  negativeLabel: string;
  valueLabel?: string;
  showValues?: boolean;
  max?: number;
  className?: string;
}) {
  const transition = useStagger();
  const max = maxOverride ?? Math.max(...items.map((i) => Math.abs(i.shap_value)), 1e-6);

  const summary = items
    .slice(0, 5)
    .map(
      (i) =>
        `${i.label} at ${i.value_display} ${
          i.shap_value > 0 ? "increases" : "decreases"
        } the estimate by ${Math.abs(i.shap_value).toFixed(3)}`,
    )
    .join("; ");

  return (
    <div
      className={cn("space-y-2.5", className)}
      role="img"
      aria-label={`${valueLabel} per feature. Bars to the right push toward ${positiveLabel}, bars to the left toward ${negativeLabel}. ${summary}.`}
    >
      <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-decreases" />
          {negativeLabel}
        </span>
        <span className="flex items-center gap-1.5">
          {positiveLabel}
          <span className="size-2 rounded-full bg-increases" />
        </span>
      </div>

      <ul className="space-y-1.5">
        {items.map((item, i) => {
          const positive = item.shap_value > 0;
          const width = (Math.abs(item.shap_value) / max) * 50;
          return (
            <li key={item.feature} className="group">
              <div className="mb-1 flex items-baseline justify-between gap-3 text-xs">
                <span className="truncate font-medium">{item.label}</span>
                <span className="numeric shrink-0 text-[11px] text-muted-foreground">
                  {item.value_display}
                </span>
              </div>
              <div className="relative h-5 rounded bg-muted/60">
                <div className="absolute inset-y-0 left-1/2 w-px bg-border" />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${width}%` }}
                  transition={transition(i)}
                  className={cn(
                    "absolute inset-y-[3px] rounded-sm",
                    positive ? "left-1/2 bg-increases" : "right-1/2 bg-decreases",
                  )}
                />
                {showValues && (
                  <span
                    className={cn(
                      "numeric absolute top-1/2 -translate-y-1/2 text-[10px] tabular-nums text-muted-foreground",
                      positive ? "left-[calc(50%+4px)]" : "right-[calc(50%+4px)]",
                    )}
                    style={
                      positive
                        ? { left: `calc(50% + ${width}% + 6px)` }
                        : { right: `calc(50% + ${width}% + 6px)` }
                    }
                  >
                    {item.shap_value > 0 ? "+" : ""}
                    {item.shap_value.toFixed(3)}
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * SHAP waterfall: starts at the model's average output and adds each feature's
 * contribution in turn, so the reader can see the prediction being built rather
 * than being handed a finished number.
 */
export function ShapWaterfall({
  contributions,
  baseValue,
  probability,
  positiveLabel,
  topN = 8,
  className,
}: {
  contributions: Contribution[];
  baseValue: number;
  probability: number;
  positiveLabel: string;
  topN?: number;
  className?: string;
}) {
  const transition = useStagger();
  const shown = contributions.slice(0, topN);
  const rest = contributions.slice(topN);
  const restSum = rest.reduce((s, c) => s + c.shap_value, 0);

  const steps: { label: string; value: number; display: string }[] = [
    ...shown.map((c) => ({
      label: c.label,
      value: c.shap_value,
      display: c.value_display,
    })),
    ...(rest.length
      ? [
          {
            label: `${rest.length} other features`,
            value: restSum,
            display: "combined",
          },
        ]
      : []),
  ];

  // Running total, so each bar starts where the previous one ended.
  let running = baseValue;
  const laid = steps.map((s) => {
    const from = running;
    running += s.value;
    return { ...s, from, to: running };
  });

  const lo = Math.min(baseValue, ...laid.map((l) => Math.min(l.from, l.to)));
  const hi = Math.max(baseValue, ...laid.map((l) => Math.max(l.from, l.to)));
  const span = hi - lo || 1;
  const pct = (v: number) => ((v - lo) / span) * 100;

  return (
    <div
      className={cn("space-y-3", className)}
      role="img"
      aria-label={`SHAP waterfall. Starting from the model's average output of ${baseValue.toFixed(
        3,
      )}, feature contributions accumulate to the final output of ${running.toFixed(
        3,
      )}, a predicted probability of ${(probability * 100).toFixed(
        1,
      )} percent for ${positiveLabel}. ${laid
        .map(
          (l) =>
            `${l.label} ${l.value > 0 ? "adds" : "subtracts"} ${Math.abs(
              l.value,
            ).toFixed(3)}`,
        )
        .join("; ")}.`}
    >
      <div className="flex items-center justify-between text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
        <span>Average model output {baseValue.toFixed(2)}</span>
        <span>This patient {running.toFixed(2)}</span>
      </div>

      <ol className="space-y-1.5">
        {laid.map((step, i) => {
          const positive = step.value > 0;
          const left = pct(Math.min(step.from, step.to));
          const width = Math.max(pct(Math.max(step.from, step.to)) - left, 0.6);
          return (
            <li key={`${step.label}-${i}`}>
              <div className="mb-1 flex items-baseline justify-between gap-3 text-xs">
                <span className="truncate font-medium">{step.label}</span>
                <span className="numeric shrink-0 text-[11px] text-muted-foreground">
                  {step.display}
                </span>
              </div>
              <div className="relative h-5 rounded bg-muted/50">
                <div
                  className="absolute inset-y-0 w-px bg-border/80"
                  style={{ left: `${pct(baseValue)}%` }}
                />
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={transition(i)}
                  style={{
                    left: `${left}%`,
                    width: `${width}%`,
                    transformOrigin: positive ? "left" : "right",
                  }}
                  className={cn(
                    "absolute inset-y-[3px] rounded-sm",
                    positive ? "bg-increases" : "bg-decreases",
                  )}
                />
                <span
                  className="numeric absolute top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground"
                  style={
                    positive
                      ? { left: `calc(${left + width}% + 6px)` }
                      : { right: `calc(${100 - left}% + 6px)` }
                  }
                >
                  {positive ? "+" : ""}
                  {step.value.toFixed(3)}
                </span>
              </div>
            </li>
          );
        })}
      </ol>

      <p className="border-t pt-2.5 text-[11px] leading-relaxed text-muted-foreground">
        Contributions are additive and sum exactly to the gap between this
        patient&apos;s model output and the cohort average — the guarantee that
        makes SHAP auditable rather than merely suggestive.
      </p>
    </div>
  );
}

/** Global mean-|SHAP| importance across the whole test cohort. */
export function ImportanceBars({
  features,
  topN = 10,
  className,
}: {
  features: GlobalImportanceFeature[];
  topN?: number;
  className?: string;
}) {
  const transition = useStagger();
  const shown = features.slice(0, topN);
  const max = Math.max(...shown.map((f) => f.mean_abs_shap), 1e-9);

  return (
    <ul
      className={cn("space-y-2", className)}
      role="img"
      aria-label={`Global feature importance by mean absolute SHAP value. ${shown
        .map((f, i) => `${i + 1}. ${f.label} at ${f.mean_abs_shap.toFixed(4)}`)
        .join(", ")}.`}
    >
      {shown.map((f, i) => (
        <li key={f.feature} className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
          <span className="truncate text-xs font-medium">{f.label}</span>
          <span className="numeric text-[11px] text-muted-foreground">
            {f.mean_abs_shap.toFixed(4)}
          </span>
          <div className="col-span-2 h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(f.mean_abs_shap / max) * 100}%` }}
              transition={transition(i)}
              className="h-full rounded-full bg-teal"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
