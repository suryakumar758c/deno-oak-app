import type { RouterContext } from "https://deno.land/x/oak/mod.ts";

import * as chalk from "https://deno.land/std@0.85.0/fmt/colors.ts";

import * as logger from "../helpers/logger.helper.ts";

import ApiResponse from "../helpers/ApiResponse.helper.ts";
import ApiResponseType from "../types/ApiResponse.types.ts";
import Config from "../config/config.ts";

interface FileRouterContext extends RouterContext {
  uploadedFiles: any;
}

class Files {
  async uploaded({ response, ...context }: any): Promise<void> {
    const result: ApiResponseType = ApiResponse;
    try {
      if (context.uploadedFiles) {
        console.log(context.uploadedFiles);
        result.code = 200;
        result.message = "success";
        result.data = `${Config.SERVER_URL + context.uploadedFiles.file.url}`;
      } else {
        result.code = 400;
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      logger.error(`file upload error: ${error.message}`);
      console.trace(chalk.red(`file upload error`), error);
    } finally {
      response.body = result;
    }
  }
}

export default new Files();
