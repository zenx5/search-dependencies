import { NextRequest, NextResponse } from "next/server";
import User from "@/tools/models/User";

export async function GET(request:NextRequest, { params }: { params:{ username:string } }) {
    const { username } = params
    const github = !!request.nextUrl.searchParams.get('github')?.replace('','1')

    const user = await User.search(
        github ? "githubuser" : "username",
        username
    )

    const response = JSON.stringify({
        error: user.length===0,
        data: user.length ? user[0] : null
    })

    return new NextResponse( response,{
        status:200,
        headers:{
            'Access-Control-Allow-Origin': 'chrome-extension'
        }
    })
}