"use server";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const setUser = ( user:any, expires:number=0 ) => {
    cookies().set(
        process.env.COOKIE_NAME_USER as string,
        JSON.stringify( user ),
        {
            expires: expires ? expires : undefined
        }
    )
}

export const getUser = () => {
    const user = cookies().get(process.env.COOKIE_NAME_USER as string)
    return user?.value ? JSON.parse( user.value ) : false
}

export const removeUser = () => {
    cookies().delete( process.env.COOKIE_NAME_USER as string )
    return true;
}

export const actionUser = (form:FormData) => {
    const response = form.get("response_is")
    const user = form.get("user")
    if( response==="Si" ) {
        setUser(user as string)
        redirect("/app")
    } else {
        cookies().delete(process.env.COOKIE_NAME_USER as string)
        redirect("/test")
    }

}