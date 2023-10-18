"use server";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";

export const setUser = ( user:any ) => {
    cookies().set(process.env.COOKIE_NAME_USER as string, JSON.stringify( user ) )
}

export const getUser = () => {
    const user = cookies().get(process.env.COOKIEN_NAME_USER as string)
    return user?.value ? JSON.parse( user.value ) : false
}

export const actionUser = (form:FormData) => {
    const response = form.get("response_is")
    const user = form.get("user")
    if( response==="Si" ) {
        setUser(user as string)
        redirect("/form")
    } else {
        cookies().delete(process.env.COOKIE_NAME_USER as string)
        redirect("/test")
    }

}