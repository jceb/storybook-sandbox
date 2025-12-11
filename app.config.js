// Documentation: https://vite.dev/config/
/// <reference types="vitest/config" />
import { defineConfig } from "@solidjs/start/config";
import UnoCSS from "unocss/vite";
import process from "node:process";

const host = process.env.HOST || "::";
const service_domain_name = process.env.SERVICE_DOMAIN_NAME;
const port = parseInt(process.env.PORT || "3000");

export default defineConfig({
  vite: {
    // define: {
    //   "process.env": {},
    // },
    clearScreen: false,
    server: {
      host,
      port,
      strictPort: true,
      allowedHosts: [service_domain_name],
      hmr: {
        // See https://vite.dev/config/server-options.html#server-hmr
        host: "localhost",
        protocol: "ws",
      },
      cors: {
        origin: [
          `https://${service_domain_name}`,
        ],
      },
      watch: {
        ignored: [
          // speed up vite by ignoring nixos directory contents
          "**/.direnv/**",
          "**/.output/**",
          "**/.vinxi/**",
          "**/.git/**",
          "**/node_modules/**",
        ],
      },
    },
    plugins: [
      UnoCSS(),
    ],
  },
});
