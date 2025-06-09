import { fileURLToPath } from "url";
import { join } from "path";
import type { AstroIntegration } from "astro";

export type AstroBkndIntegration = {};

export function bknd(opts?: AstroBkndIntegration): AstroIntegration {
   return {
      name: "bknd",
      hooks: {
         "astro:config:setup": ({ updateConfig, addMiddleware, logger }) => {
            const root = fileURLToPath(new URL(".", import.meta.url));
            updateConfig({
               vite: {
                  resolve: {
                     alias: {
                        "cloudflare:workers": join(root, "cf.js"),
                     },
                  },
               },
            });

            addMiddleware({
               order: "pre",
               entrypoint: join(root, "middleware.ts"),
            });
         },
      },
   };
}
