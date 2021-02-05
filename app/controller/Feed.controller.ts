import type { RouterContext } from "https://deno.land/x/oak/mod.ts";

import * as chalk from "https://deno.land/std@0.85.0/fmt/colors.ts";

import type { Values } from "https://deno.land/x/denodb/lib/data-types.ts";

import { Model } from "https://deno.land/x/denodb/mod.ts";

import Feeds from "../model/feeds.model.ts";

import ApiResponse from "../helpers/ApiResponse.helper.ts";
import ApiResponseType from "../types/ApiResponse.types.ts";
import type { FeedPostType } from "../types/feeds.types.ts";

interface getFeedRouterContext extends RouterContext {
  userId?: string;
}

class Feed {
  async getFeed({
    request,
    response,
    userId,
  }: getFeedRouterContext): Promise<void> {
    console.log("success", userId);
    response.body = { code: 200, data: "helo" };
  }

  async postFeed({
    request,
    response,
    userId = "",
  }: getFeedRouterContext): Promise<void> {
    let result: ApiResponseType = ApiResponse;
    try {
      const requestBody: FeedPostType | any = request.body().value || {};
      const feed: Values = {
        userId,
        content: requestBody.content || "",
      };
      Feeds.create;
    } catch (e) {
      console.trace(chalk.red("login error"), chalk.red(e));
      console.error(e);
      result.message = e.message;
    } finally {
      response.body = result;
    }
  }
}

export default new Feed();
