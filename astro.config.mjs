// @ts-check
import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import { bknd } from "./bknd/bknd.integration";
import { entity, text, em } from "bknd/data";
import { AppEvents } from "bknd";

// https://astro.build/config
export default defineConfig({
   adapter: cloudflare(),
   integrations: [
      // config object is optional, just for demo purposes
      bknd({
         app: {
            initialConfig: {
               data: em({
                  test: entity("test", {
                     title: text(),
                  }),
               }).toJSON(),
            },
         },
         onBuilt: async (app) => {
            console.log("app built!");

            // listen for requests
            app.emgr.onEvent(
               AppEvents.AppRequest,
               (event) => {
                  const url = new URL(event.params.request.url);
                  console.log("request", url.pathname);
               },
               "sync"
            );
         },
         adminOptions: {
            // this is the default, but just for demo purposes
            // the path at where the admin panel will be available
            adminBasepath: "/admin",
         },
      }),
   ],
});
