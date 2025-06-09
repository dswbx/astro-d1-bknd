import { defineMiddleware } from "astro:middleware";
import { createRuntimeApp } from "bknd/adapter";
import { d1 } from "bknd/adapter/cloudflare";

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
   const request = context.request;
   const url = new URL(request.url);
   const cf = context.locals.runtime;
   //console.log("middleware", { request, cf });

   const app = await createRuntimeApp({
      connection: d1({ binding: cf.env.DB }),
      onBuilt: async (app) => {
         app.registerAdminController({
            assetsPath: "/bknd/",
            adminBasepath: "/admin",
         });
      },
   });

   if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin")) {
      const response = await app.fetch(request, cf.env);
      if (response.status !== 404) {
         return response;
      }
   }

   return next();
});
