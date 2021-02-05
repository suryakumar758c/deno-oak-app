import { AES } from "https://deno.land/x/god_crypto/mod.ts";

const aes = new AES("Hello World AES!", {
    mode:"cbc",
    iv:"random 16byte iv"
})

export const encrypt = async (data:string|number|any):Promise<string> => {
    const cipher:any = await aes.encrypt(data);
    return cipher.hex();
}

export const decrypt = async (data:string|number|any):Promise<string> => {
    const cipher:any = await aes.decrypt(data);
    return cipher.toString();
}