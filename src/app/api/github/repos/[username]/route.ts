import { NextRequest, NextResponse } from "next/server"

export async function GET( request:NextRequest, { params }:{ params:{ username:string } } ) {
    const { username } = params
    let result:Array<Object> = []
    const response = await fetch(`https://api.github.com/users/${username}`)
    const { public_repos } = await response.json()
    for( let index in Array( Math.ceil( public_repos/100 ) ).fill(1) ) {
        const page = parseInt(index) + 1
        const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`)
        const repos = await response.json()
        result = [...result, ...repos]
    }
    return NextResponse.json( result )
}