import { NextRequest, NextResponse } from "next/server"


export async function GET( request:NextRequest, { params }:{ params:{ username:string, page:string } } ) {
    const { username, page } = params

    const headers = new Headers()

    headers.set('Accept', `application/vnd.github+json` )
    headers.set('Authorization', `Bearer ${process.env.GITHUB_TOKEN as string}` )
    headers.set('X-GitHub-Api-Version', `2022-11-28` )

    const response = await fetch(`https://api.github.com/repos/${username}/${page}/collaborators`, {
        headers
    })
    const data = await response.json()
    return new NextResponse( JSON.stringify(data) ,{
        status:200,
        headers:{
            'Access-Control-Allow-Origin': '*'
        }
    })
}