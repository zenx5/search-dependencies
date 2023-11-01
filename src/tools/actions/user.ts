"use server";
import { cookies } from "next/headers"
import { redirect } from "next/navigation";
import { ROUTER_PATH } from "../constants";
import User from "../models/User";



export const setUser = ( user:any, expires:number=0 ) => {
    cookies().set(
        process.env.COOKIE_NAME_USER as string,
        JSON.stringify( user ),
        {
            expires: expires ? expires : Date.now()+1000*60*60*24*30
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

export const actionUser = async (form:FormData) => {
    const response = form.get("response_is")
    if( response==="Si" ) {
        const user = await User.get(form.get("user_id") as string)
        if( user ) {
            setUser({
                ...user,
                password: undefined
            })
            return redirect(ROUTER_PATH.APP)
        }
    }
    removeUser()
    return redirect(ROUTER_PATH.LOGIN)
}