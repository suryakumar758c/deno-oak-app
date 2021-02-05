import { Database } from "https://deno.land/x/denodb/mod.ts"

import Config from "../config/config.ts"

const connection:Database = new Database(`mysql`,Config.MYSQL_CONFIG)

export default connection