import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    // react-hook-form mutates a ref-backed store, which the React Compiler
    // cannot reason about, so it skips optimising the component that uses it.
    // That is a missed optimisation, not a correctness problem, and
    // react-hook-form is a required dependency of this project. Scoped to the
    // one file that touches it so the rule keeps working everywhere else.
    files: ["src/components/predict-flow.tsx"],
    rules: { "react-hooks/incompatible-library": "off" },
  },
]);

export default eslintConfig;
