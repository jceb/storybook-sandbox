// Source: https://github.com/kachurun/create-solid-storybook/blob/main/packages/storybook-solid-template/.storybook/preview.ts
import addonDocs from "@storybook/addon-docs";
import type { Renderer } from "storybook/internal/types";
import { definePreview } from "storybook-solidjs-vite";
import { withThemeByClassName } from "@storybook/addon-themes";
import "virtual:uno.css"; // make UnoCSS classes available in Storybook https://storybook.js.org/recipes/tailwindcss

export default definePreview({
  addons: [
    addonDocs(),
  ],
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  /* initialGlobals: { */
  /*   viewport: { value: "desktop", isRotated: false }, */
  /* }, */
  // How to make the theme switcher work: https://github.com/storybookjs/storybook/discussions/25183#discussioncomment-14968122
  // See https://github.com/storybookjs/storybook/blob/next/code/addons/themes/docs/api.md#writing-a-custom-decorator
  decorators: [
    withThemeByClassName<Renderer>({
      themes: {
        Light: "light",
        Dark: "dark",
      },
      defaultTheme: "Light",
    }),
  ],
  // All components will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
});
