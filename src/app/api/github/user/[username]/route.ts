import { NextRequest, NextResponse } from "next/server"

export async function GET( request:NextRequest, { params }:{ params:{ username:string } } ) {
    const { username } = params
    const response = await fetch(`https://api.github.com/users/${username}`)
    const data = await response.json()
    return NextResponse.json( data )
}