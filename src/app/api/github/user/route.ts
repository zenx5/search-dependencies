import { NextResponse } from "next/server"

export async function GET() {
    const token = ''
    const headers = new Headers()
    headers.set("Accept", `application/json`)
    headers.set("Content-Type", `application/json`)
    headers.set("Authorization", `Bearer ${token}`)

    const response = await fetch("https://api.github.com/user", {
        headers
    })

    const data = await response.json()

    return NextResponse.json( data )
}