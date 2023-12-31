import { removeUser, setError, setUser } from "@/tools/actions";
import { LOGIN, LOGOUT, REGISTER, ROUTER_PATH } from "@/tools/constants";
import User from "@/tools/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST( request:NextRequest) {
    const form = await request.formData()
    if( form.get('action')===LOGIN ) {
        const email = form.get('email') as string
        const password = form.get('password') as string
        const userArray:any = await User.search("email", email)
        if( userArray.length>0 ) {
            const user = userArray[0]
            if( user?.password===password ) {
                // Login correcto
                setUser( {
                    ...user,
                    password: undefined
                } )
                const url = new URL(ROUTER_PATH.APP, request.url)
                return NextResponse.redirect( url, { status:303 })
            } else {
                // Password incorrecto
                setError("Incorret Password")
                const url = new URL(ROUTER_PATH.LOGIN, request.url)
                return NextResponse.redirect( url, { status:303 })
            }
        } else {
            // Usuario no existe
            setUser({
                email:email
            }, Date.now() + 15 * 1000 )
            setError("Not find user")
            const url = new URL(ROUTER_PATH.REGISTER, request.url)
            return NextResponse.redirect( url, { status:303 })
        }
    } else if( form.get('action')===REGISTER ) {
        // id            Int       @id @default(autoincrement())
        // email         String    @unique
        const email = form.get('email') as string
        // username      String    @unique
        const username = form.get('email') as string
        // firstname     String
        const firstname = form.get('firstname') as string
        // lastname      String
        const lastname = form.get('lastname') as string
        // avatarUrl     String
        // password      String
        const password = form.get('password') as string
        const password_confirmed = form.get('password-confirmation') as string
        // githubuser    String    @unique
        // requestLimit  Int
        // updateLimit   DateTime
        // Logs          Logs[]
        // Request       Request[]
        // createdAt     DateTime  @default(now())
        // updatedAt     DateTime  @updatedAt
        try{
            if( password!==password_confirmed ) throw new Error("Password no coincide")
            const user = await User.search("email", email )
            if( user.length === 0 ) throw new Error("Ya existe un usuario con este email " + email)
            const updateLimit = new Date( Date.now() + 1000*60*60*24*30 )
            const data = {
                id: 0,
                email,
                username,
                firstname,
                lastname,
                avatarUrl: "",
                password,
                githubuser: "",
                requestLimit: 10,
                updateLimit
            }
            User.post(data)
            const url = new URL(ROUTER_PATH.APP, request.url)
            return NextResponse.redirect( url, { status:303 })
        } catch( error:any ) {
            setError(error.message )
            const url = new URL(ROUTER_PATH.REGISTER, request.url)
            return NextResponse.redirect( url, { status:303 })
        }
    } else if( form.get('action')===LOGOUT ) {
        removeUser()
        const url = new URL(ROUTER_PATH.LOGIN, request.url)
        return NextResponse.redirect( url, { status:303 })
    }
    return NextResponse.json({
        message:'working'
    })
}

export async function GET() : Promise<any> {
    const user = await User.get()
    return NextResponse.json(user)
}