import { Skeleton } from "@/components/ui/skeleton";

/** Route-level skeleton. Mirrors the real layout's proportions so the page does
 *  not jump when content lands — a spinner would tell the user nothing about
 *  what is arriving. */
export default function Loading() {
  return (
    <div
      className="mx-auto max-w-7xl px-5 py-12 sm:px-8"
      aria-busy="true"
      aria-label="Loading"
    >
      <Skeleton className="h-6 w-40" />
      <Skeleton className="mt-5 h-11 w-3/4 max-w-2xl" />
      <Skeleton className="mt-3 h-4 w-full max-w-xl" />
      <Skeleton className="mt-2 h-4 w-4/5 max-w-lg" />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-56 rounded-xl" />
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_1fr]">
        <Skeleton className="h-72 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
      </div>
    </div>
  );
}
