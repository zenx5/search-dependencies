import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function Form({
    children,
  }: {
    children: React.ReactNode
}) {
    const dependencie = cookies().get(process.env.COOKIE_NAME_TARGET as string)?.value
    async function search(data:FormData) {
        "use server";
        const response = await fetch( process.env.LOCALHOST + "/api/search", {
        method:'post',
        body:JSON.stringify({
            user:"zenx5",
            dep: data.get("dependencie")
        })
        })
        const result = await response.json()
        cookies().set(process.env.COOKIE_NAME_TARGET as string, data.get("dependencie") as string)
        cookies().set(process.env.COOKIE_NAME_RESULT as string, JSON.stringify(result))
        redirect("/form")
    }


    return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
      <form className="w-1/3 flex flex-row" action={search}>
        <input type="text" className="py-2 px-4 rounded w-10/12" placeholder="Dependencie" name="dependencie" defaultValue={dependencie ?? ""}/>
        <button className="w-2/12 bg-green-500 text-white">Buscar</button>
      </form>
      <div className="">
        {children}
      </div>
    </main>
  )
}
