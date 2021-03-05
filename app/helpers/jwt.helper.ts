import {
  create,
  verify,
  getNumericDate,
  decode,
} from "https://deno.land/x/djwt/mod.ts";

import Config from "../config/config.ts";

export const createToken = (userId: string | number): Promise<any> => {
  return create(
    { alg: Config.JWT_ALGORITHM, typ: "JWT" },
    { userId, exp: getNumericDate(60 * 10) },
    Config.JWT_SECRET
  );
};

export const verifyToken = (token: string): Promise<any> => {
  return verify(token, Config.JWT_SECRET, Config.JWT_ALGORITHM);
};

export const decodeToken = (token: string): any => {
  return decode(token);
};
