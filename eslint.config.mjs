import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import reactRefresh from "eslint-plugin-react-refresh";
import jsoncPlugin from "eslint-plugin-jsonc";
import jsoncParser from "jsonc-eslint-parser";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ── Ignores ──────────────────────────────────────────────────────
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "node_modules/**",
    ".venv/**",
    "next-env.d.ts",
  ]),

  // ── TypeScript / TSX rules ───────────────────────────────────────
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      // React Refresh (Next.js compatible)
      "react-refresh/only-export-components": [
        "warn",
        {
          allowConstantExport: true,
          allowExportNames: [
            "metadata",
            "generateMetadata",
            "generateStaticParams",
            "generateViewport",
          ],
        },
      ],

      // DO NOT CHANGE THESE RULES — FIX ERRORS INSTEAD
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
    },
  },

  // ── JSON linting ─────────────────────────────────────────────────
  {
    files: ["**/*.json"],
    languageOptions: {
      parser: jsoncParser,
    },
    plugins: {
      jsonc: jsoncPlugin,
    },
    rules: {
      "jsonc/no-dupe-keys": "error",
    },
  },
]);

export default eslintConfig;
