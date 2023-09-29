import { cookies } from "next/headers"
import ListRepo from "./List/Index"

interface Item {
    url: string,
    version: string
}

export default async function FormPage() {
    const CookieResult = cookies().get(process.env.COOKIE_NAME_RESULT as string)?.value

    const hasResult = CookieResult!==undefined
    const result = hasResult ? JSON.parse( CookieResult ) : []

    await fetch("http://placeholde.com")

    return <div className="flex flex-col gap-1">
        <ListRepo items={result} />
    </div>
}