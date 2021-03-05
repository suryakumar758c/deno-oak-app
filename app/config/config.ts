import type {
  AlgorithmInput,
  Algorithm,
} from "https://deno.land/x/djwt/algorithm.ts";

interface MySqlConfig {
  host: string;
  port?: number;
  username: string;
  password: string;
  database: string;
}

export default class Config {
  static SERVER_HOST: string = Deno.env.get("SERVER_HOST") || "localhost";
  static SERVER_PORT: number | string = Deno.env.get("SERVER_PORT") || 3000;
  static WEBSOCKET_PORT: number | string =
    Deno.env.get("WEBSOCKET_PORT") || 8080;
  static SERVER_URL: string =
    Deno.env.get("SERVER_URL") ||
    `http://${Config.SERVER_HOST}:${Config.SERVER_PORT}/`;

  // mysql configuration
  static MYSQL_CONFIG: MySqlConfig = {
    host: Deno.env.get("MYSQL_HOST") || "localhost",
    username: Deno.env.get("MYSQL_USER") || "root",
    password: Deno.env.get("MYSQL_PASSWORD") || "",
    database: Deno.env.get("MYSQL_DATABASE") || "deno_test",
  };

  // jwt configuration
  static JWT_SECRET: string = Deno.env.get("JWT_SECRET") || "JWT_SECRET";
  static JWT_ALGORITHM: Algorithm | AlgorithmInput | any =
    Deno.env.get("JWT_ALGORITHM") || "HS512";
}
