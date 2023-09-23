import { NextRequest, NextResponse } from "next/server"

export async function GET( request:NextRequest, { params }:{ params:{ username:string, page:string } } ) {
    const { username, page } = params
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`)
    const data = await response.json()
    return NextResponse.json( data )
}