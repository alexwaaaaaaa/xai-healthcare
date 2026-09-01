"use client";

import { useMemo, useRef, useState } from "react";
import { useForm, type FieldErrors, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Loader2,
  RotateCcw,
  Stethoscope,
} from "lucide-react";
import { toast } from "sonner";

import { PredictionResult } from "@/components/prediction-result";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ApiError, postPredict } from "@/lib/api";
import { publish, signal } from "@/lib/reticle-dev";
import type {
  Dataset,
  Feature,
  ModelName,
  ModelSummary,
  PredictResponse,
} from "@/lib/types";
import { cn } from "@/lib/utils";

type Values = Record<string, number>;

/**
 * Build the zod schema from the API's own feature metadata, so the browser
 * enforces exactly the ranges the model was trained on. There is deliberately no
 * second hard-coded copy of these bounds: the server re-validates every request,
 * and a divergent client copy would let one side accept what the other rejects.
 */
function buildSchema(features: Feature[]) {
  const shape: Record<string, z.ZodType<number>> = {};
  for (const f of features) {
    const unit = f.unit ? ` ${f.unit}` : "";
    shape[f.name] = z.coerce
      .number({ error: `${f.label} is required` })
      .min(f.lo, { message: `Must be at least ${f.lo}${unit}` })
      .max(f.hi, { message: `Must be at most ${f.hi}${unit}` });
  }
  return z.object(shape);
}

function stepFor(feature: Feature): string {
  if (feature.choices) return "1";
  if (feature.decimals > 0) return String(10 ** -feature.decimals);
  const span = feature.hi - feature.lo;
  return span > 2000 ? "100" : "1";
}

function FieldRow({
  feature,
  register,
  setValue,
  value,
  error,
}: {
  feature: Feature;
  register: ReturnType<typeof useForm<Values>>["register"];
  setValue: (name: string, value: number) => void;
  value: number | undefined;
  error?: string;
}) {
  const id = `field-${feature.name}`;
  const describedBy = [
    feature.description ? `${id}-desc` : null,
    error ? `${id}-err` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-3">
        <Label htmlFor={id} className="text-xs font-medium">
          {feature.label}
          {feature.unit && (
            <span className="ml-1 font-normal text-muted-foreground">
              ({feature.unit})
            </span>
          )}
        </Label>
        {!feature.choices && (
          <span className="numeric shrink-0 text-[10px] text-muted-foreground">
            {feature.lo}–{feature.hi}
          </span>
        )}
      </div>

      {feature.choices ? (
        <Select
          value={value !== undefined ? String(value) : undefined}
          onValueChange={(v) => setValue(feature.name, Number(v))}
        >
          <SelectTrigger
            id={id}
            // A <label for> does NOT name a Radix trigger: <label> only names
            // form-associated elements, and the trigger is a <button>. Without
            // this, every select announces as a bare "combobox" with no
            // indication of which field it is. Found by driving the real app —
            // the visual label made it look correct.
            aria-label={
              feature.unit ? `${feature.label} (${feature.unit})` : feature.label
            }
            aria-describedby={describedBy || undefined}
            aria-invalid={Boolean(error)}
            className="w-full"
          >
            <SelectValue placeholder="Select…" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(feature.choices).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={id}
          type="number"
          inputMode="decimal"
          step={stepFor(feature)}
          min={feature.lo}
          max={feature.hi}
          aria-describedby={describedBy || undefined}
          aria-invalid={Boolean(error)}
          className="numeric"
          {...register(feature.name)}
        />
      )}

      {feature.description && (
        <p id={`${id}-desc`} className="text-[10.5px] leading-snug text-muted-foreground">
          {feature.description}
        </p>
      )}
      {error && (
        <p id={`${id}-err`} role="alert" className="text-[11px] text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function PredictFlow({
  dataset,
  models,
}: {
  dataset: Dataset;
  models: ModelSummary[];
}) {
  const groups = dataset.feature_groups;
  const allFeatures = useMemo(
    () => groups.flatMap((g) => g.features),
    [groups],
  );
  const schema = useMemo(() => buildSchema(allFeatures), [allFeatures]);

  // Defaults come from the API (cohort medians), so the form opens on a
  // plausible patient rather than empty fields the user has to guess at.
  const defaults = useMemo(
    () =>
      Object.fromEntries(
        allFeatures.map((f) => [f.name, f.default ?? f.lo]),
      ) as Values,
    [allFeatures],
  );

  const [step, setStep] = useState(0);
  const [model, setModel] = useState<ModelName>(dataset.best_model);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [pending, setPending] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const form = useForm<Values>({
    resolver: zodResolver(schema) as Resolver<Values>,
    defaultValues: defaults,
    mode: "onBlur",
  });

  const last = step === groups.length - 1;
  const current = groups[step];

  // Mirror the flow's state for Reticle. Runs on every render of a dev build and
  // compiles away entirely in production.
  publish({
    dataset: dataset.slug,
    model,
    step,
    stepCount: groups.length,
    stepLabel: current.label,
    pending,
    hasResult: Boolean(result),
    prediction: result?.prediction ?? null,
    probability: result?.probability ?? null,
    riskBand: result?.risk_band ?? null,
    topFactorCount: result?.top_factors.length ?? 0,
    limeFactorCount: result?.lime_explanation.length ?? 0,
    lastError: apiError,
  });

  const goToStep = (next: number) => {
    setStep(next);
    signal("predict:step", { step: next, label: groups[next].label });
  };

  const next = async () => {
    const names = current.features.map((f) => f.name);
    if (await form.trigger(names)) goToStep(Math.min(step + 1, groups.length - 1));
  };

  /**
   * The values of the last successful submission, kept so that switching model
   * can re-run *the same patient* rather than whatever is currently typed into
   * the form. Without this, changing the dropdown left the previous model's
   * prediction on screen under the new model's name — the panel and the selector
   * disagreed about which model produced the number, which in a clinical tool is
   * worse than showing nothing.
   */
  const [submitted, setSubmitted] = useState<Values | null>(null);

  const runPrediction = async (values: Values, which: ModelName) => {
    setPending(true);
    setApiError(null);
    setResult(null);
    signal("predict:submitted", { dataset: dataset.slug, model: which });
    try {
      const response = await postPredict({
        dataset: dataset.slug,
        model: which,
        patient_features: values,
      });
      setResult(response);
      setSubmitted(values);
      signal("predict:explained", {
        dataset: response.dataset,
        model: response.model,
        prediction: response.prediction,
        probability: response.probability,
        riskBand: response.risk_band,
        topFactorCount: response.top_factors.length,
        shapFeatureCount: Object.keys(response.shap_values).length,
        limeFactorCount: response.lime_explanation.length,
      });
      return true;
    } catch (error) {
      const message =
        error instanceof ApiError
          ? error.message
          : "Something went wrong contacting the prediction service.";
      setApiError(message);
      signal("predict:rejected", {
        dataset: dataset.slug,
        model: which,
        status: error instanceof ApiError ? error.status : 0,
        message,
      });
      toast.error("Prediction failed", { description: message });
      return false;
    } finally {
      setPending(false);
    }
  };

  const onSubmit = async (values: Values) => {
    const ok = await runPrediction(values, model);
    if (ok) {
      requestAnimationFrame(() =>
        resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
      );
    }
  };

  /**
   * Switching model with a result on screen re-predicts immediately, so the panel
   * always belongs to the model named in the selector. It is also the cheapest way
   * to compare models on one patient, which is the point of offering three.
   */
  const switchModel = (next: ModelName) => {
    if (next === model) return;
    setModel(next);
    signal("predict:model_switched", {
      from: model,
      to: next,
      rerunning: Boolean(submitted),
    });
    if (submitted) void runPrediction(submitted, next);
  };

  /**
   * Blocked submits used to be silent: the guard worked, but nothing observable
   * happened, so "the request was prevented" could not be distinguished from
   * "the error was already on screen". Signalling here makes the block itself
   * the evidence.
   */
  const onInvalid = (errors: FieldErrors<Values>) => {
    const fields = Object.keys(errors);
    signal("predict:blocked", { fields, count: fields.length });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:items-start">
      {/* ------------------------------- form ------------------------------- */}
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="rounded-xl border bg-card lg:sticky lg:top-20"
        noValidate
        data-testid="predict-form"
      >
        <div className="border-b p-5">
          <div className="flex items-center gap-2">
            <Stethoscope className="size-4 text-teal" />
            <h2 className="font-heading text-sm font-semibold">Patient record</h2>
          </div>

          <ol className="mt-4 flex items-center gap-1.5" aria-label="Form progress">
            {groups.map((g, i) => (
              <li key={g.key} className="flex flex-1 items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => goToStep(i)}
                  aria-current={i === step ? "step" : undefined}
                  className={cn(
                    "flex h-1.5 flex-1 rounded-full transition-colors",
                    i < step
                      ? "bg-teal"
                      : i === step
                        ? "bg-teal/60"
                        : "bg-muted",
                  )}
                >
                  <span className="sr-only">
                    Go to step {i + 1}: {g.label}
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <p
            className="mt-2.5 text-[11px] text-muted-foreground"
            data-testid="predict-step"
          >
            Step {step + 1} of {groups.length} ·{" "}
            <span className="font-medium text-foreground">{current.label}</span>
          </p>
        </div>

        <motion.div
          key={current.key}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4 p-5"
        >
          {current.features.map((f) => (
            <FieldRow
              key={f.name}
              feature={f}
              register={form.register}
              setValue={(name, v) =>
                form.setValue(name, v, { shouldValidate: true })
              }
              value={form.watch(f.name)}
              error={form.formState.errors[f.name]?.message as string | undefined}
            />
          ))}
        </motion.div>

        <div className="space-y-3 border-t p-5">
          <div className="space-y-1.5">
            <Label htmlFor="model-select" className="text-xs font-medium">
              Model
            </Label>
            <Select
              value={model}
              onValueChange={(v) => switchModel(v as ModelName)}
            >
              <SelectTrigger
                id="model-select"
                aria-label="Model"
                className="w-full"
                data-testid="model-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {models.map((m) => (
                  <SelectItem key={m.model} value={m.model}>
                    {m.label} · AUC {m.metrics.roc_auc.toFixed(3)}
                    {m.is_best ? " · selected" : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {submitted && (
              <p className="text-[10.5px] leading-snug text-muted-foreground">
                Changing the model re-runs this same patient immediately, so the
                result always belongs to the model named here.
              </p>
            )}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => goToStep(step - 1)}
                className="h-9"
                data-testid="predict-back"
              >
                <ArrowLeft className="size-4" data-icon="inline-start" />
                Back
              </Button>
            )}
            {last ? (
              <Button
                type="submit"
                disabled={pending}
                className="h-9 flex-1"
                data-testid="predict-submit"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" data-icon="inline-start" />
                    Explaining…
                  </>
                ) : (
                  <>
                    Predict &amp; explain
                    <ArrowRight className="size-4" data-icon="inline-end" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={next}
                className="h-9 flex-1"
                data-testid="predict-continue"
              >
                Continue
                <ArrowRight className="size-4" data-icon="inline-end" />
              </Button>
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              form.reset(defaults);
              goToStep(0);
              setResult(null);
              setSubmitted(null);
              setApiError(null);
            }}
            className="flex w-full items-center justify-center gap-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
            data-testid="predict-reset"
          >
            <RotateCcw className="size-3" />
            Reset to cohort medians
          </button>
        </div>
      </form>

      {/* ------------------------------ result ------------------------------ */}
      {/* scroll-mt clears the sticky header: without it the auto-scroll after
          submit parks the verdict heading underneath the nav bar. */}
      <div ref={resultRef} className="min-w-0 scroll-mt-24">
        {pending && <ResultSkeleton />}

        {!pending && apiError && (
          <div
            className="rounded-xl border border-destructive/30 bg-destructive/5 p-6"
            data-testid="prediction-error"
          >
            <h3 className="font-heading text-sm font-semibold text-destructive">
              The prediction was rejected
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              {apiError}
            </p>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              The API re-validates every field against the exact ranges the model
              was trained on. Rejecting an implausible value is intentional: the
              model would otherwise return a confident probability, and SHAP a
              coherent explanation, for a patient who cannot exist.
            </p>
          </div>
        )}

        {!pending && !apiError && result && (
          <PredictionResult result={result} dataset={dataset} />
        )}

        {!pending && !apiError && !result && (
          <EmptyState dataset={dataset} models={models} />
        )}
      </div>
    </div>
  );
}

function ResultSkeleton() {
  return (
    <div
      className="space-y-4"
      aria-busy="true"
      aria-label="Computing explanation"
      data-testid="result-skeleton"
    >
      <div className="rounded-xl border bg-card p-6">
        <div className="grid gap-6 sm:grid-cols-[auto_1fr]">
          <Skeleton className="h-[116px] w-[260px] rounded-lg" />
          <div className="space-y-3">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-7 w-56" />
            <Skeleton className="h-5 w-40" />
            <div className="grid grid-cols-4 gap-3 pt-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-teal/25 bg-teal-soft/25 p-6">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="mt-3 h-5 w-full" />
        <Skeleton className="mt-2 h-5 w-4/5" />
        <div className="mt-5 space-y-2.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14" />
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-72 rounded-xl" />
        ))}
      </div>
      <p className="text-center text-[11px] text-muted-foreground">
        Computing SHAP attributions and fitting the LIME local surrogate…
      </p>
    </div>
  );
}

function EmptyState({
  dataset,
  models,
}: {
  dataset: Dataset;
  models: ModelSummary[];
}) {
  const best = models.find((m) => m.is_best);
  return (
    <div className="rounded-xl border border-dashed p-8" data-testid="predict-empty">
      <h2 className="font-heading text-lg font-semibold">
        {dataset.title}
      </h2>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
        {dataset.clinical_context}
      </p>

      <dl className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-lg border bg-muted/30 p-4">
          <dt className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Outcome predicted
          </dt>
          <dd className="mt-1 text-sm font-medium">{dataset.outcome}</dd>
        </div>
        <div className="rounded-lg border bg-muted/30 p-4">
          <dt className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
            Selected model
          </dt>
          <dd className="mt-1 text-sm font-medium">
            {dataset.best_model_label}
            {best && (
              <span className="numeric ml-2 text-xs text-muted-foreground">
                AUC {best.metrics.roc_auc.toFixed(3)}
              </span>
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-5 rounded-lg border-l-2 border-teal bg-muted/25 p-4">
        <p className="text-[10.5px] uppercase tracking-[0.14em] text-muted-foreground">
          Preprocessing decision on record
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
          {dataset.preprocessing_note}
        </p>
      </div>

      {dataset.dropped_columns.length > 0 && (
        <p className="mt-4 flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
          <Check className="mt-0.5 size-3.5 shrink-0 text-teal" />
          Columns removed before training:{" "}
          <span className="numeric">{dataset.dropped_columns.join(", ")}</span>
        </p>
      )}

      <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
        <Badge variant="secondary" className="h-5">
          {dataset.feature_count} fields
        </Badge>
        Fill the form to the left — it opens pre-filled with cohort medians.
      </p>
    </div>
  );
}
