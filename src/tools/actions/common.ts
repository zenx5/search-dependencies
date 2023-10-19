"use server";
import { cookies } from "next/headers";

export const setError = (message:string) => {
    const expires = Date.now() + 15 * 1000;
    cookies().set(
        process.env.COOKIE_NAME_ERROR as string,
        message,
        {
            expires: expires
        }
    );
}

export const getError = () => {
    const message = cookies().get( process.env.COOKIE_NAME_ERROR as string );
    return message?.value ?? false;
}