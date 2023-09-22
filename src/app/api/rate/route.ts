import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    const headers  = new Headers()
    headers.append("Accept","application/vnd.github+json")
    headers.append("Authorization", "Bearer " + (process.env.GITHUB_TOKEN as string))
    headers.append("X-GitHub-Api-Version","2022-11-28")
    const response = await fetch("https://api.github.com/search/code?qdependencies+language:json+in:file",{
        headers
    })
    const data = await response.json()
    return NextResponse.json( data )
}