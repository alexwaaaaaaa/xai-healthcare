import { ReticleDev } from './reticle-dev';
import type { Metadata } from "next";
import { Fraunces, Geist_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

/* Fraunces for headings: a variable serif with optical-size and SOFT axes, so
   it carries editorial authority at display sizes without looking decorative.
   Inter for body and data because it was designed for UI at small sizes and has
   proper tabular figures — mandatory when numbers sit in columns. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Explainable AI for Healthcare Diagnosis",
    template: "%s · Explainable AI for Healthcare",
  },
  description:
    "Clinical risk prediction where every prediction ships with the reason " +
    "behind it. SHAP and LIME explanations over nine public clinical datasets, " +
    "including five cancer cohorts. " +
    "Jamia Millia Islamia, Department of Computer Engineering (MDS-391).",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{process.env.NODE_ENV === 'development' ? <ReticleDev /> : null}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider delayDuration={200}>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-4 focus:py-2 focus:shadow-lg focus:ring-2 focus:ring-ring"
            >
              Skip to content
            </a>
            <SiteHeader />
            <main id="main" className="flex-1">
              {children}
            </main>
            <SiteFooter />
            <Toaster position="bottom-right" />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
