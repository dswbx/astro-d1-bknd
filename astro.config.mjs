// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { bknd } from "./bknd/bknd.integration";

// https://astro.build/config
export default defineConfig({
   adapter: cloudflare(),
   integrations: [bknd()],
});
