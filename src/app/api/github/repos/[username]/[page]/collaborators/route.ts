import { NextRequest, NextResponse } from "next/server"
import { Octokit } from "octokit";

export async function GET( request:NextRequest, { params }:{ params:{ username:string, page:string } } ) {
    const { username, page } = params
    const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
    const {
        data:{
            login
        }
    } = await octokit.rest.users.getAuthenticated()

    const response = await octokit.request('GET /repos/{owner}/{repo}/collaborators', {
        owner: username,
        repo: page,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })
    return NextResponse.json( response?.data ?? [] )
}