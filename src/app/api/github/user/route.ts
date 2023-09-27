import { NextResponse } from "next/server"

export async function GET() {
    const headers = new Headers()
    headers.set("Accept", `application/json`)
    headers.set("Content-Type", `application/json`)
    headers.set("Authorization", `Bearer ${"ghu_NqYNqilEEq9zBJHXwJlqoPf7szatBV1WX2fz"}`)

    const response = await fetch("https://api.github.com/user", {
        headers
    })

    const data = await response.json()

    return NextResponse.json( data )
}