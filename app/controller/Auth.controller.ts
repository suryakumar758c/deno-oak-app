import type { RouterContext } from "https://deno.land/x/oak/mod.ts";

import * as chalk from "https://deno.land/std@0.85.0/fmt/colors.ts";

import type { Values } from "https://deno.land/x/denodb/lib/data-types.ts";

import { Model } from "https://deno.land/x/denodb/mod.ts";

import ApiResponse from "../helpers/ApiResponse.helper.ts";

import { getQuery } from "https://deno.land/x/oak/helpers.ts";

import User from "../model/users.model.ts";

import { encrypt } from "../helpers/encrypter.helper.ts";

import type {
  ApiResponseType,
  RegisterFormData,
  RegisterUserData,
} from "../types/index.ts";

import { createToken, verifyToken } from "../helpers/jwt.helper.ts";

// setTimeout(async () => {
//     console.log(await User.where({
//         email:'surya@yopmail.com',
//         password:await encrypt('Test@123')
//     }).select('id').first())
// },1000)

class Auth {
  async login({ request, response }: RouterContext): Promise<void> {
    let result: ApiResponseType = ApiResponse;

    try {
      if (!request.hasBody) throw new Error("Bad request!");

      const requestData: RegisterFormData | any = await request.body().value;

      const validUser: number | any = await User.where({
        email: requestData.email,
        password: await encrypt(requestData.password),
      }).first();

      if (!validUser || !validUser.id)
        throw new Error("Invalid user credentials!");

      const token = await createToken(validUser.id);

      if (!token) throw new Error("Something went wrong!");

      console.log(chalk.green(`${requestData.email} logged in successfully!`));
      result.code = 200;
      result.message = "success";
      result.data = {
        token,
      };
    } catch (e) {
      console.trace(chalk.red("login error"), chalk.red(e));
      console.error(e);
      result.message = e.message;
    } finally {
      response.body = result;
    }
  }

  async register({ request, response }: RouterContext): Promise<void> {
    let result: ApiResponseType = ApiResponse;

    try {
      if (!request.hasBody) throw new Error("Bad request!");

      const requestData: RegisterFormData | any = await request.body().value;

      const emailExists: number | any = await User.where(
        "email",
        requestData.email
      ).count();
      console.log(emailExists, requestData.email);

      if (emailExists > 0) throw new Error("Email already exists!");

      const registerUserData: Values = {
        email: requestData.email,
        password: await encrypt(requestData.password),
      };

      const register: Model = await User.create(registerUserData);
      console.log(chalk.green(`${requestData.email} registered!`));
      result.code = 200;
      result.message = "success";
      result.data = requestData;
    } catch (e) {
      console.trace(chalk.red("register error"), chalk.red(e.message));
      console.error(e);
      result.message = e.message;
    } finally {
      console.log("result", result);
      response.body = result;
    }
  }
}

export default new Auth();
