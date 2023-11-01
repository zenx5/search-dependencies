import type { NextRequest } from "next/server";
import { NextResponse } from "next/server"
import { getUser } from "./tools/actions";


export function middleware( request:NextRequest ) {
    const user = getUser()
    const isLoged = !!user
    const isAdmin = process.env.ADMIN_EMAIL?.split(',').includes(user?.email)
    const isDashboard = request.nextUrl.pathname==='/dashboard'
    const isLogin = request.nextUrl.pathname==='/login'
    const isRegister = request.nextUrl.pathname==='/register'

    if ( !isLoged && !isLogin && !isRegister ) return NextResponse.redirect( new URL('/login', request.url) )
    else if ( isLoged && isDashboard && !isAdmin ) return NextResponse.redirect( new URL('/app', request.url) )
    else if ( isLoged && ( isLogin || isRegister ) ) return NextResponse.redirect( new URL('/app', request.url) )
    else return NextResponse.next()
}

export const config = {
    matcher: ["/dashboard", "/login", "/register", "/app", "/app/:error"]
}