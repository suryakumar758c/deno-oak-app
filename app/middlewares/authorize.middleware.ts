import * as chalk from "https://deno.land/std@0.85.0/fmt/colors.ts";

import { verifyToken, decodeToken } from "../helpers/jwt.helper.ts";

import ApiResponse from "../helpers/ApiResponse.helper.ts";

import ApiResponseType from "../types/ApiResponse.types.ts";

export default async (context: any, next: any): Promise<void> => {
  let result: ApiResponseType = ApiResponse;
  const { request, response } = context;
  try {
    const token: string | undefined =
      request.headers.get("authorization") ||
      request.headers.get("Authorization");

    if (!token) {
      result.code = 401;
      throw new Error("Authorization token required");
    }

    const checkToken = await verifyToken(token);

    console.log("checkToken", checkToken);
    if (!checkToken) {
      result.code = 403;
      throw new Error("Access denied. Invalid token send!");
    }

    const {
      payload: { userId },
    } = decodeToken(token);

    console.log("userId", userId);

    context.userId = userId;

    await next();
  } catch (error) {
    // console.trace(chalk.red("authorization error:"), error.message);
    console.error(error);
    result.code = result.code === 200 ? 400 : result.code;
    result.message = error.message;
    result.data = null;
    response.body = result;
  }
};
