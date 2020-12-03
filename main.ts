import { Application } from "https://deno.land/x/oak/mod.ts";

import router from "./app/router.ts";

const app:Application  = new Application();

app.use(router.allowedMethods())

app.use(router.routes())

console.log(`listening on port: ${3000}`)
console.log(`test restart`)

// app.addEventListener("")

app.listen({ port: 3000 })