// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { fileURLToPath } from "url";
import { join } from "path";

const root = fileURLToPath(new URL(".", import.meta.url));

// https://astro.build/config
export default defineConfig({
   adapter: cloudflare(),
   vite: {
      resolve: {
         alias: {
            // just for compatibility of astro's dev server
            "cloudflare:workers": join(root, "src/lib/cf.js"),
         },
      },
   },
});
