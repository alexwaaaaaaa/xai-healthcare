import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

const DATASETS = [
  ["heart_disease", "Heart Disease (Cleveland)"],
  ["heart_failure", "Heart Failure Clinical Records"],
  ["diabetes", "Pima Indians Diabetes"],
  ["kidney_disease", "Chronic Kidney Disease"],
  ["breast_cancer", "Breast Cancer Wisconsin (Diagnostic)"],
  ["breast_cancer_recurrence", "Breast Cancer Recurrence (Ljubljana)"],
  ["breast_cancer_survival", "Breast Cancer Surgical Survival (Haberman)"],
  ["cervical_cancer", "Cervical Cancer (Risk Factors)"],
  ["lung_cancer_surgery", "Lung Cancer Thoracic Surgery"],
] as const;

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center sm:px-8">
      <span className="grid size-12 place-items-center rounded-xl bg-accent text-accent-foreground">
        <Compass className="size-5" />
      </span>
      <h1 className="mt-6 font-heading text-2xl font-semibold">
        No such page or dataset
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        Four cohorts are available. Pick one to run an explainable prediction.
      </p>

      <ul className="mt-7 w-full space-y-2 text-left">
        {DATASETS.map(([slug, title]) => (
          <li key={slug}>
            <Link
              href={`/predict/${slug}`}
              className="flex items-center justify-between rounded-lg border bg-card px-4 py-3 text-sm transition-colors hover:border-teal/40 hover:bg-accent"
            >
              {title}
              <span className="numeric text-[11px] text-muted-foreground">
                /predict/{slug}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <Button asChild variant="outline" className="mt-6">
        <Link href="/">Back to overview</Link>
      </Button>
    </div>
  );
}
