"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Page() {
    const [token, setToken] = useState(0)
    const searchParams = useSearchParams()
    const code = searchParams.get("code")

    useEffect(()=>{
        (async ()=>{
            if( token===0 ){
                const response = await fetch(`/api/github/auth/token/${code}`)
                const result = await response.json()
                console.log( result )
                setToken(result.access_token)
            }
        })()
    },[code, token])

    

    const handlerGetInfo = async () => {
        const headers = new Headers()
        headers.set("Accept", `application/json`)
        headers.set("Content-Type", `application/json`)
        headers.set("Authorization", `Bearer ${"ghu_NqYNqilEEq9zBJHXwJlqoPf7szatBV1WX2fz"}`)
        console.log( headers )
        const response = await fetch("https://api.github.com/user", {
            headers,
            // body: JSON.stringify({
            //     "access_token" : token
            // })
        })

        const result = await response.json()
        console.log( result )
    }

    return <div>
        <p>Success, obtain code {code}</p>
        <button onClick={handlerGetInfo}>Show info</button>
    </div>
}