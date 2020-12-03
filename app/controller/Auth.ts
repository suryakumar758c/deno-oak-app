import type { RouterContext } from "https://deno.land/x/oak/mod.ts";
import type { 
    ApiResponseType 
} from "../types/index.ts";
import ApiResponse from "../helpers/ApiResponse.ts";

import Counter from "../mysql/counter.ts"
import { getQuery } from 'https://deno.land/x/oak/helpers.ts'

// let a = new Worker(new URL("./worker.ts", import.meta.url).href,{type:"module"})
// a.postMessage('hi')

class Auth {
    async index(context:RouterContext):Promise<void> {
        let response:ApiResponseType = ApiResponse
        try {
            let d = getQuery(context);
            if(!d.q)
                throw new Error('Param required')
            Counter.createCount({count:d.q})
            await Counter.getCount()
            // let a = new Worker(new URL("./worker.ts", import.meta.url).href,{type:"module",deno:true})
            // a.postMessage(d.q)
            response.message = "success";
            response.data = "test";
        } catch(e) {
            response.message = e.message;
        } finally {
            context.response.body = response;
        }
    }
}

export default new Auth();