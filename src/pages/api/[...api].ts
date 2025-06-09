import type { APIRoute } from "astro";
import { createFrameworkApp } from "bknd/adapter";
import { D1Connection } from "../../lib/D1Connection";
import { em, entity, text } from "bknd/data";

export const prerender = false;

export const ALL: APIRoute = async (ctx) => {
   // @ts-ignore
   const cf = ctx.locals.runtime;

   const app = await createFrameworkApp({
      connection: new D1Connection({ binding: cf.env.DB }),
      initialConfig: {
         data: em({
            test: entity("test", {
               title: text(),
            }),
         }).toJSON(),
      },
      options: {
         seed: async (app) => {
            await app.em.mutator("test").insertMany([
               {
                  title: "test 1",
               },
               {
                  title: "test 2",
               },
            ]);
         },
      },
   });
   return app.fetch(ctx.request, cf.env);
};
