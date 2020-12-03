import { Context, Router } from "https://deno.land/x/oak/mod.ts";

import {
    Auth
} from "./controller/index.ts";

const router:Router = new Router();

router.get('/',Auth.index);

console.log(`test restart 2a`)

export default router;