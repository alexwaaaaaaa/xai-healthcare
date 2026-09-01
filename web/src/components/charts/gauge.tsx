"use client";

import { animate, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import type { RiskBand } from "@/lib/types";
import { cn } from "@/lib/utils";

const BAND_COLOR: Record<RiskBand, string> = {
  low: "var(--risk-low)",
  moderate: "var(--risk-moderate)",
  high: "var(--risk-high)",
};

const BAND_COPY: Record<RiskBand, string> = {
  low: "Low likelihood",
  moderate: "Moderate likelihood",
  high: "High likelihood",
};

/** Semicircular gauge that counts up from zero, because a number that arrives
 *  already at its final value reads as a static label rather than a measurement. */
export function ProbabilityGauge({
  probability,
  band,
  outcome,
  threshold,
  className,
}: {
  probability: number;
  band: RiskBand;
  outcome: string;
  threshold: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [shown, setShown] = useState(reduced ? probability : 0);

  useEffect(() => {
    // One code path for both motion preferences. `animate` reports through
    // onUpdate on a frame callback, so the state write is never synchronous
    // inside the effect body; a zero duration simply lands on the final value
    // on the first frame.
    const controls = animate(reduced ? probability : 0, probability, {
      duration: reduced ? 0 : 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: setShown,
    });
    return () => controls.stop();
  }, [probability, reduced]);

  // Geometry: 180° arc, radius 80, stroke 14.
  const R = 80;
  const CIRC = Math.PI * R;
  const cx = 100;
  const cy = 96;
  const arc = `M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`;
  const tickAngle = Math.PI * (1 - threshold);

  return (
    <div
      className={cn("flex flex-col items-center", className)}
      data-testid="probability-gauge"
    >
      <svg
        viewBox="0 0 200 116"
        className="w-full max-w-[280px]"
        role="img"
        aria-label={`Predicted probability of ${outcome}: ${(probability * 100).toFixed(
          1,
        )} percent. ${BAND_COPY[band]}. Decision threshold ${(
          threshold * 100
        ).toFixed(0)} percent.`}
      >
        <path
          d={arc}
          fill="none"
          stroke="var(--muted)"
          strokeWidth={14}
          strokeLinecap="round"
        />
        <path
          d={arc}
          fill="none"
          stroke={BAND_COLOR[band]}
          strokeWidth={14}
          strokeLinecap="round"
          strokeDasharray={CIRC}
          strokeDashoffset={CIRC * (1 - shown)}
        />
        {/* threshold marker */}
        <line
          x1={cx + Math.cos(tickAngle) * (R - 11)}
          y1={cy - Math.sin(tickAngle) * (R - 11)}
          x2={cx + Math.cos(tickAngle) * (R + 11)}
          y2={cy - Math.sin(tickAngle) * (R + 11)}
          stroke="var(--foreground)"
          strokeWidth={2}
          opacity={0.5}
        />
        <text
          x={cx}
          y={cy - 22}
          textAnchor="middle"
          className="numeric fill-foreground"
          style={{ fontSize: 34, fontWeight: 600 }}
        >
          {(shown * 100).toFixed(0)}%
        </text>
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className="fill-muted-foreground"
          style={{ fontSize: 9, letterSpacing: "0.1em" }}
        >
          PROBABILITY
        </text>
      </svg>
      <p className="mt-1 text-xs text-muted-foreground">
        Decision threshold {(threshold * 100).toFixed(0)}% (marked)
      </p>
    </div>
  );
}
