// @lovable.dev/vite-tanstack-config already includes the following   do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Custom manualChunks caused circular chunk errors in CI (Rollup:
// getVariableForExportName). Vite's default chunking is used instead.
export default defineConfig({});
