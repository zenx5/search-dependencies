import { cookies } from "next/headers"

interface Item {
    url: string,
    version: string
}

export default async function FormPage() {
    const CookieResult = cookies().get(process.env.COOKIE_NAME_RESULT as string)?.value

    const hasResult = CookieResult!==undefined
    const result = hasResult ? JSON.parse( CookieResult ) : []

    return hasResult ? <div className="flex flex-col gap-1">
        { result.map( (item:Item) => <span key={item.url} className="p-2 border-b border-slate-400">
            <p><b>Repository:</b> <a target="_blank" className="hover:bg-slate-300 p-1 rounded-md" href={item.url}>{item.url}</a></p>
            <p><b>Version:</b> {item.version}</p>
        </span> )}
    </div> :
    <p>Sin datos para mostrar</p>
}