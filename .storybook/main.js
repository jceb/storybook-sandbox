// Source: https://github.com/kachurun/create-solid-storybook/blob/main/packages/storybook-solid-template/.storybook/main.ts
import { defineMain } from "storybook-solidjs-vite";
import UnoCSS from "unocss/vite";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dirname = typeof __dirname !== "undefined"
  ? __dirname
  : path.dirname(fileURLToPath(import.meta.url));

// Documentation: https://github.com/solidjs-community/storybook/blob/main/src/preset.ts
export default defineMain({
  framework: {
    name: "storybook-solidjs-vite",
    options: {
      // docgen: {
      // Enabled by default, but you can configure or disable it:
      //  see https://github.com/styleguidist/react-docgen-typescript#options
      // },
    },
  },
  // Manually set up vite configuration + import aliases. They're not picked up automatically
  viteFinal: async (config) => {
    const { mergeConfig } = await import("vite");
    return mergeConfig(config, {
      plugins: [UnoCSS()],
      resolve: {
        alias: {
          // add custom tsconfig configuration, because the default one isn't loaded
          "~": path.resolve(dirname, "../src"),
        },
      },
    });
  },
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-docs",
    "@storybook/addon-links",
    "@storybook/addon-vitest",
    "@vueless/storybook-dark-mode", // provides a theme switcher for storybook's UI, not the component's UI, see https://storybook.js.org/addons/@vueless/storybook-dark-mode
    "@storybook/addon-themes", // provides a theme switcher for components see https://storybook.js.org/addons/@storybook/addon-themes
  ],
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)",
  ],
  // See https://storybook.js.org/docs/api/main-config/main-config-preview-body
  // How to make the theme switcher work: https://github.com/storybookjs/storybook/discussions/25183#discussioncomment-14968122
  previewBody: (_body) => `
    <html>
      <head>
        <style>
          :root {
            --background: #fdfdfd;
          }
          :root:where(html.dark) {
            --background: #1a1a1a;
          }
          body.sb-show-main, .sbdocs-preview {
            background-color: var(--background);
          }
        </style>
      </head>
      <body></body>
    </html>
  `,
});
