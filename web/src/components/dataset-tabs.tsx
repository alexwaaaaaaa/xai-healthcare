import Link from "next/link";

import type { Dataset } from "@/lib/types";
import { cn } from "@/lib/utils";

/** Horizontal dataset switcher. Server component — it is just links. */
export function DatasetTabs({
  datasets,
  active,
  basePath,
}: {
  datasets: Pick<Dataset, "slug" | "title" | "rows">[];
  active: string;
  basePath: "/predict" | "/models";
}) {
  return (
    <nav
      aria-label="Choose a dataset"
      className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
    >
      <ul className="flex min-w-max gap-1.5 rounded-lg border bg-muted/40 p-1">
        {datasets.map((d) => {
          const current = d.slug === active;
          return (
            <li key={d.slug}>
              <Link
                href={`${basePath}/${d.slug}`}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "flex items-baseline gap-2 rounded-md px-3.5 py-2 text-xs font-medium transition-colors",
                  current
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {d.title}
                <span className="numeric text-[10.5px] text-muted-foreground">
                  n={d.rows}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
