import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: { "@": fileURLToPath(new URL("./", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    setupFiles: ["tests/setup.ts"],
    restoreMocks: true,
    coverage: {
      provider: "v8",
      include: ["lib/**/*.ts"],
      exclude: ["lib/data/**", "lib/db.ts"],
      reporter: ["text", "lcov"],
      // Access control is the part a regression would hurt most; hold it to a higher bar.
      thresholds: {
        lines: 80,
        "lib/auth/**": { lines: 95, branches: 90 },
      },
    },
  },
});
