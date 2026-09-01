"use client";

import { useEffect } from "react";
import { RefreshCw, ServerCrash } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Kept: without it a server-side digest is the only trace, which is
    // unhelpful for whoever is running this locally.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-24 text-center sm:px-8">
      <span className="grid size-12 place-items-center rounded-xl border border-destructive/30 bg-destructive/8 text-destructive">
        <ServerCrash className="size-5" />
      </span>
      <h1 className="mt-6 font-heading text-2xl font-semibold">
        This page could not be rendered
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        {error.message || "An unexpected error occurred."}
      </p>
      {error.digest && (
        <p className="numeric mt-2 text-[11px] text-muted-foreground">
          digest {error.digest}
        </p>
      )}
      <Button onClick={reset} className="mt-6">
        <RefreshCw className="size-4" data-icon="inline-start" />
        Try again
      </Button>
    </div>
  );
}
