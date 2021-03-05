import * as log from "https://deno.land/std@0.85.0/log/mod.ts";

export const info = (_: any): void => {
  log.info(`[${new Date().toLocaleString()}] ${_}`);
};

export const error = (_: any): void => {
  log.error(`[${new Date().toLocaleString()}] ${_}`);
};

export const warn = (_: any): void => {
  log.warning(`[${new Date().toLocaleString()}] ${_}`);
};
