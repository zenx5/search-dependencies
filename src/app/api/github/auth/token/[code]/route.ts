import { NextRequest, NextResponse } from "next/server"

export async function GET(request:NextRequest, { params }:{ params: { code:string }} ){
    const { code } = params

    const queryString = [
      "client_id="+process.env.GITHUB_CLIENT_ID,
      "client_secret="+process.env.GITHUB_CLIENT_SECRECT,
      "code="+code
    ].join("&")

    const headers = new Headers()
    headers.set("Accept", "application/json")

    // return NextResponse.json( queryString  )

    const response = await fetch(`https://github.com/login/oauth/access_token?${queryString}`, {
        headers
    })
    return NextResponse.json( await response.json()  )

}