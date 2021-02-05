import { Application, send } from "https://deno.land/x/oak/mod.ts";

import { oakCors } from "https://deno.land/x/cors/mod.ts";

import * as chalk from "https://deno.land/std@0.85.0/fmt/colors.ts";

import "https://deno.land/x/dotenv/load.ts";

import type { CorsOptions } from "https://deno.land/x/cors/types.ts";

import Config from "./app/config/config.ts";

import router from "./app/router.ts";

import ApiResponse from "./app/helpers/ApiResponse.helper.ts";

import * as logger from "./app/helpers/logger.helper.ts";

const app: Application = new Application();

app.use(router.allowedMethods());

const corsOptions: CorsOptions = {
  origin: ["http://localhost:4200"],
};

app.use(oakCors());

app.use(
  async (context: any, next: any): Promise<void> => {
    logger.info(`HTTP ${context.request.method} on ${context.request.url}`);
    await next();
    console.log(context.response);
  }
);

app.addEventListener("listen", (): void => {
  console.log(chalk.green(`listening on port: ${3000}`));
});

app.use(router.routes());

app.use(
  async (context: any, next: any): Promise<void> => {
    if (context.request.url.pathname.includes("/uploads"))
      await send(context, context.request.url.pathname);
    else await next();
  }
);

app.use((context: any): void => {
  if (context.request.method != "OPTIONS") {
    ApiResponse.code = 404;
    ApiResponse.message = `Not found`;
    ApiResponse.data = null;
    logger.info(
      `HTTP ${context.request.method} on ${context.request.url} failed. status: 404`
    );
    context.response.status = 404;
    context.response.body = ApiResponse;
  }
});

app.listen({ port: 3000 });
