import { Client } from "https://deno.land/x/mysql/mod.ts"

const client = await new Client();

const connection = await client.connect({
    hostname:"localhost",
    username:"root",
    password:"Optisol@2020",
    db:"deno_test"
});

export default connection