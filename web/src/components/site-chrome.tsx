"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState } from "react";
import { Activity, Menu, Moon, Sun, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Overview" },
  { href: "/predict/heart_disease", label: "Predict", match: "/predict" },
  { href: "/models/heart_disease", label: "Models", match: "/models" },
  { href: "/explainability", label: "Explainability" },
  { href: "/about", label: "Why it matters" },
] as const;

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // No mounted-flag state and no effect. The resolved theme is unknown during
  // SSR, so instead of guessing (hydration flash) or gating on an effect
  // (cascading render), both icons are rendered and CSS picks one from the
  // `.dark` class next-themes puts on <html>. The accessible name is swapped the
  // same way, so a screen reader always announces the action that will happen.
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun className="hidden size-4 dark:block" aria-hidden />
      <Moon className="size-4 dark:hidden" aria-hidden />
      <span className="sr-only hidden dark:inline">Switch to light mode</span>
      <span className="sr-only dark:hidden">Switch to dark mode</span>
    </Button>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (item: (typeof NAV)[number]) => {
    const prefix = "match" in item && item.match ? item.match : item.href;
    return prefix === "/" ? pathname === "/" : pathname.startsWith(prefix);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Activity className="size-4.5" strokeWidth={2.4} />
          </span>
          <span className="leading-tight">
            <span className="block font-heading text-[15px] font-semibold tracking-tight">
              Explainable&nbsp;Diagnosis
            </span>
            <span className="block text-[10.5px] uppercase tracking-[0.16em] text-muted-foreground">
              Clinical decision support
            </span>
          </span>
        </Link>

        <nav
          aria-label="Primary"
          className="ml-auto hidden items-center gap-1 md:flex"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item) ? "page" : undefined}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm transition-colors",
                isActive(item)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.label}
              {isActive(item) && (
                <span className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-teal" />
              )}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="border-t bg-background px-5 pb-4 pt-2 md:hidden"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(item) ? "page" : undefined}
              className={cn(
                "block rounded-md px-3 py-2.5 text-sm",
                isActive(item)
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t bg-surface/50">
      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl space-y-2">
            <p className="font-heading text-sm font-semibold">
              Explainable AI for Healthcare Diagnosis
            </p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Minor project, Department of Computer Engineering, Jamia Millia
              Islamia (MDS-391). Built on nine public, cited clinical datasets —
              no synthetic or hand-entered patient records anywhere in the
              pipeline.
            </p>
          </div>
          <p className="max-w-xs rounded-lg border border-destructive/25 bg-destructive/5 px-3 py-2 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Not a medical device.</strong>{" "}
            Research demonstrator on small retrospective cohorts. Never use for
            clinical decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
