// Documentation: https://vitest.dev/config/
// Documentation: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon#storybooktest
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
// import { fileURLToPath } from "node:url";
// import path from "node:path";

// const dirname = typeof __dirname !== "undefined"
//   ? __dirname
//   : path.dirname(fileURLToPath(import.meta.url));

// INFO: Vinxi hides large parts of the vite configuration, therefore we can't have this configuration in app.config.ts
export default defineConfig({
  test: {
    projects: [
      {
        test: {
          include: ["src/**/*.test.{ts,js}"],
          // color of the name label can be changed
          name: { label: "node", color: "green" },
          environment: "node",
        },
      },
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            // configDir: path.join(dirname, ".storybook"),
            // This should match your package.json script to run Storybook
            // The --no-open flag will skip the automatic opening of a browser
            storybookScript: "pnpm storybook --no-open", // INFO: deno doesn't support storybook, yet!
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{
              browser: "chromium",
            }],
          },
        },
      },
    ],
  },
});
