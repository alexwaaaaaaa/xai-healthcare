"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { ConfusionMatrix, FidelityResult, ModelSummary } from "@/lib/types";
import { cn } from "@/lib/utils";

const SERIES_COLORS = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)"];

/* Recharts' own entry animation is disabled on every series here.
   Under React 19 it leaves the path at `stroke-dasharray: 0px …` and the curve
   never paints — verified with a real browser, not just a headless screenshot.
   A chart that sometimes fails to draw is unacceptable in a clinical tool, and
   the animated micro-interactions the design calls for are supplied by the
   hand-built attribution bars, which animate reliably. */ 

const axisStyle = {
  fontSize: 10,
  fill: "var(--muted-foreground)",
} as const;

function ChartTooltip({
  active,
  payload,
  label,
  unit = "",
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; color?: string }[];
  label?: string | number;
  unit?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border bg-popover px-3 py-2 text-xs shadow-lg">
      <p className="numeric mb-1 text-muted-foreground">
        {typeof label === "number" ? label.toFixed(2) : label}
        {unit}
      </p>
      {payload.map((p) => (
        <p key={p.name} className="flex items-center gap-2">
          <span
            className="size-2 rounded-full"
            style={{ background: p.color }}
            aria-hidden
          />
          <span>{p.name}</span>
          <span className="numeric ml-auto font-medium">
            {p.value?.toFixed(3)}
          </span>
        </p>
      ))}
    </div>
  );
}

/** ROC curves for all three models on shared axes. */
export function RocOverlay({
  models,
  curves,
  className,
}: {
  models: ModelSummary[];
  curves: Record<string, { fpr: number; tpr: number }[]>;
  className?: string;
}) {
  // Recharts needs one row per x value, so the three curves are resampled onto a
  // shared FPR grid. Step interpolation (last point at or below x) is correct
  // here: an ROC curve is a step function, and linear interpolation would draw
  // operating points the classifier cannot actually reach.
  const grid = Array.from({ length: 101 }, (_, i) => i / 100);
  const data = grid.map((fpr) => {
    const row: Record<string, number> = { fpr };
    for (const m of models) {
      const points = curves[m.model] ?? [];
      let tpr = 0;
      for (const p of points) {
        if (p.fpr <= fpr) tpr = p.tpr;
        else break;
      }
      row[m.model] = tpr;
    }
    return row;
  });

  return (
    <div
      className={cn("h-[300px] w-full", className)}
      role="img"
      aria-label={`Receiver operating characteristic curves. ${models
        .map((m) => `${m.label} area under curve ${m.metrics.roc_auc.toFixed(3)}`)
        .join(", ")}. The diagonal marks random guessing at 0.5.`}
    >
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 12, bottom: 22, left: 4 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis
            dataKey="fpr"
            type="number"
            domain={[0, 1]}
            ticks={[0, 0.25, 0.5, 0.75, 1]}
            tick={axisStyle}
            stroke="var(--border)"
            label={{
              value: "False positive rate",
              position: "insideBottom",
              offset: -12,
              style: axisStyle,
            }}
          />
          <YAxis
            domain={[0, 1]}
            ticks={[0, 0.25, 0.5, 0.75, 1]}
            tick={axisStyle}
            stroke="var(--border)"
            label={{
              value: "True positive rate",
              angle: -90,
              position: "insideLeft",
              offset: 14,
              style: axisStyle,
            }}
          />
          <Tooltip content={<ChartTooltip />} />
          <ReferenceLine
            segment={[
              { x: 0, y: 0 },
              { x: 1, y: 1 },
            ]}
            stroke="var(--muted-foreground)"
            strokeDasharray="4 4"
            strokeWidth={1}
          />
          {models.map((m, i) => (
            <Line
              key={m.model}
              type="stepAfter"
              dataKey={m.model}
              name={`${m.label} (AUC ${m.metrics.roc_auc.toFixed(3)})`}
              stroke={SERIES_COLORS[i % SERIES_COLORS.length]}
              strokeWidth={m.is_best ? 2.6 : 1.6}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      <ul className="mt-1 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[11px]">
        {models.map((m, i) => (
          <li key={m.model} className="flex items-center gap-1.5">
            <span
              className="h-0.5 w-4 rounded-full"
              style={{ background: SERIES_COLORS[i % SERIES_COLORS.length] }}
              aria-hidden
            />
            <span className={cn(m.is_best && "font-semibold")}>{m.label}</span>
            <span className="numeric text-muted-foreground">
              {m.metrics.roc_auc.toFixed(3)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** 2x2 confusion matrix with the clinical meaning of each cell spelled out. */
export function ConfusionMatrixGrid({
  matrix,
  positiveLabel,
  className,
}: {
  matrix: ConfusionMatrix;
  positiveLabel: string;
  className?: string;
}) {
  const cells = [
    {
      key: "true_negative",
      value: matrix.true_negative,
      title: "True negative",
      note: "Correctly cleared",
      tone: "ok",
    },
    {
      key: "false_positive",
      value: matrix.false_positive,
      title: "False positive",
      note: "Unnecessary referral",
      tone: "warn",
    },
    {
      key: "false_negative",
      value: matrix.false_negative,
      title: "False negative",
      note: "Missed case — the costly error",
      tone: "bad",
    },
    {
      key: "true_positive",
      value: matrix.true_positive,
      title: "True positive",
      note: "Correctly flagged",
      tone: "ok",
    },
  ] as const;

  const total = cells.reduce((s, c) => s + c.value, 0);

  return (
    <div
      className={cn("space-y-2", className)}
      role="img"
      aria-label={`Confusion matrix over ${total} held-out patients for ${positiveLabel}: ${matrix.true_negative} true negatives, ${matrix.false_positive} false positives, ${matrix.false_negative} false negatives, ${matrix.true_positive} true positives.`}
    >
      <div className="grid grid-cols-2 gap-2">
        {cells.map((c) => (
          <div
            key={c.key}
            className={cn(
              "rounded-lg border p-3",
              c.tone === "bad" && "border-risk-high/35 bg-risk-high/8",
              c.tone === "warn" && "border-risk-moderate/35 bg-risk-moderate/8",
              c.tone === "ok" && "border-border bg-muted/40",
            )}
          >
            <p className="numeric text-2xl font-semibold leading-none">{c.value}</p>
            <p className="mt-1.5 text-[11px] font-medium">{c.title}</p>
            <p className="text-[10.5px] leading-tight text-muted-foreground">
              {c.note}
            </p>
          </div>
        ))}
      </div>
      <p className="text-[11px] text-muted-foreground">
        {total} held-out patients ·{" "}
        {((matrix.false_negative / Math.max(total, 1)) * 100).toFixed(1)}% of the
        cohort was missed
      </p>
    </div>
  );
}

/** Fidelity: top-k SHAP ablation against random ablation. */
export function FidelityChart({
  fidelity,
  className,
}: {
  fidelity: FidelityResult;
  className?: string;
}) {
  const data = fidelity.k_values.map((k, i) => ({
    k,
    top: fidelity.top_k_probability_drop[i],
    random: fidelity.random_k_probability_drop[i],
  }));

  return (
    <div
      className={cn("h-[220px] w-full", className)}
      role="img"
      aria-label={`Fidelity chart. Removing the top ranked SHAP features changes the prediction ${fidelity.fidelity_score.toFixed(
        2,
      )} times more than removing the same number of random features. ${data
        .map(
          (d) =>
            `at k equals ${d.k}, top-ranked ablation shifts the probability by ${d.top.toFixed(
              3,
            )} versus ${d.random.toFixed(3)} for random`,
        )
        .join("; ")}.`}
    >
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 8, right: 10, bottom: 20, left: 0 }}>
          <CartesianGrid stroke="var(--border)" strokeDasharray="3 3" />
          <XAxis
            dataKey="k"
            tick={axisStyle}
            stroke="var(--border)"
            label={{
              value: "features removed (k)",
              position: "insideBottom",
              offset: -10,
              style: axisStyle,
            }}
          />
          <YAxis tick={axisStyle} stroke="var(--border)" width={44} />
          <Tooltip content={<ChartTooltip />} />
          <Line
            type="monotone"
            dataKey="top"
            name="top-k SHAP features"
            stroke="var(--increases)"
            strokeWidth={2.4}
            dot={{ r: 3 }}
            isAnimationActive={false}
          />
          <Line
            type="monotone"
            dataKey="random"
            name="k random features"
            stroke="var(--decreases)"
            strokeWidth={1.8}
            strokeDasharray="5 4"
            dot={{ r: 3 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

/** Simple labelled proportion bar, reused by the explainability page. */
export function ScoreBar({
  value,
  max = 1,
  tone = "teal",
  label,
  caption,
}: {
  value: number;
  max?: number;
  tone?: "teal" | "warn";
  label: string;
  caption?: string;
}) {
  const pct = Math.min(Math.max(value / max, 0), 1) * 100;
  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3">
        <span className="text-xs font-medium">{label}</span>
        <span className="numeric text-xs">{value.toFixed(2)}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full",
            tone === "teal" ? "bg-teal" : "bg-risk-moderate",
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {caption && (
        <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  );
}
