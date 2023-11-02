import { NextRequest, NextResponse } from "next/server"
import User from "@/tools/models/User"

export async function GET(request:NextRequest, { params }:{ params: { code:string }} ){
    const { code } = params

    const queryString = [
      "client_id="+process.env.GITHUB_CLIENT_ID,
      "client_secret="+process.env.GITHUB_CLIENT_SECRECT,
      "code="+code
    ].join("&")

    const headers = new Headers()
    headers.set("Accept", "application/json")

    const response = await fetch(`https://github.com/login/oauth/access_token?${queryString}`, {
      headers,
      cache:'no-cache'
    })
    const {
      error,
      error_description,
      access_token,
      refresh_token
    } = await response.json()

    if( error ) {
      return NextResponse.json({
        error:true,
        message: error_description,
        data:null
      })
    }
    headers.set("Content-Type", `application/json`)
    headers.set("Authorization", `Bearer ${access_token}`)

    const responseOne = await fetch("https://api.github.com/user", {
        headers,
        cache:'no-cache'
    })
    const {
      login,
      email,
      name,
      avatar_url,
    } = await responseOne.json()
    const responseTwo = await fetch( `${process.env.LOCALHOST}/api/user/${login}?github`, {
      cache: 'no-cache'
    })
    const { error:notIsUser, data } = await responseTwo.json()

    if( notIsUser ) {
      // crear usuario
      try{
        const data = {
          email: email,
          username: login,
          firstname: name.split(" ")?.at(0),
          lastname: name.split(" ")?.at(1) ?? "",
          avatarUrl: avatar_url,
          password: "",
          githubuser: login,
          requestLimit: 10,
          updateLimit: (new Date()).toISOString()
        }
        const user = User.post(data)
        return NextResponse.json({
          error: false,
          message: "Success: User Created",
          data:user
        })
      } catch( error:any ) {
        console.log(error.message)
        return NextResponse.json({
          error: true,
          message: error.message,
          data:null
        })
      }
    }
    // logear usuario
    return NextResponse.json({
      error: false,
      message: "Success: User Logged",
      data
    })



}