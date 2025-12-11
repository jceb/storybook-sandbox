// Documentation: https://unocss.dev/integrations/vite
// Documentation: https://unocss.dev/guide/config-file
import {
  defineConfig,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import presetWind4 from "@unocss/preset-wind4";
import presetWebFonts from "@unocss/preset-web-fonts";
import { presetIcons } from "unocss";
import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";

// INFO: Vinxi hides large parts of the vite configuration, therefore we can't have this configuration in app.config.ts
export default defineConfig({
  theme: {
    colors: {
      primary: "#039BE5",
      "primary-50": "#E1F5FE",
      "primary-100": "#B3E5FC",
      "primary-200": "#81D4FA",
      "primary-300": "#4FC3F7",
      "primary-400": "#29B6F6",
      "primary-500": "#03A9F4",
      "primary-600": "#039BE5",
      "primary-700": "#0288D1",
      "primary-800": "#0277BD",
      "primary-900": "#01579B",
    },
  },
  safelist: [
    // Classes that are unique and are dynamically generated and loaded inside a For or Show component, need to be listed here because UnoCSS is not able to detect them
    // See also https://github.com/solidjs/solid-start/issues/2028
    "i-local-apple",
    "i-local-google",
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  presets: [
    presetWind4(),
    presetWebFonts({
      provider: "google", // default provider
      fonts: {
        // these will extend the default theme
        sans: "Inter",
        // sans: 'Roboto',
      },
    }),
    presetIcons({
      // Documentation: https://unocss.dev/presets/icons
      collections: {
        local: FileSystemIconLoader(
          "./src/assets/icons",
          // Readd the stripped processing instructions
          // (svg) =>
          //   svg.replace(
          //     /^<svg( |$)/m,
          //     '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg fill="currentColor" ',
          //   )
          // (svg) => {
          //   const res = svg.replace(
          //     /^<svg( |$)/m,
          //     '<?xml version="1.0" encoding="UTF-8" standalone="no"?><svg fill="currentColor" ',
          //   );
          //   console.log("res", res);
          //   return res;
          // },
        ),
        flowbite: () =>
          import("@iconify-json/flowbite/icons.json", {
            with: { type: "json" },
          }).then((i) => i.default),
      },
      extraProperties: {
        "display": "inline-block",
        "vertical-align": "middle",
      },
    }),
  ],
});
