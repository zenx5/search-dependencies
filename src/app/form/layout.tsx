import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default function Form({
    children,
  }: {
    children: React.ReactNode
}) {
    const dependencie = cookies().get(process.env.COOKIE_NAME_TARGET as string)?.value
    const user = cookies().get(process.env.COOKIE_NAME_USER as string)?.value
    async function search(data:FormData) {
        "use server";
        const response = await fetch( process.env.LOCALHOST + "/api/search", {
        method:'post',
        body:JSON.stringify({
            user:data.get("user"),
            dep: data.get("dependencie")
        })
        })
        const result = await response.json()
        cookies().set(process.env.COOKIE_NAME_USER as string, data.get("user") as string)
        cookies().set(process.env.COOKIE_NAME_TARGET as string, data.get("dependencie") as string)
        cookies().set(process.env.COOKIE_NAME_RESULT as string, JSON.stringify(result))
        redirect("/form")
    }


    return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
      <form className="w-1/2 flex flex-row" action={search}>
        <span className="w-4/12 border-r">
          <input type="text" className="py-2 px-4 m-0 w-full h-full" placeholder="Usario" name="user" defaultValue={user ?? ""}/>
          <small className="italic ml-5 text-slate-500">Usuario de githbu</small>
        </span>
        <span className="w-4/12 border-r">
          <input type="text" className="py-2 px-4 m-0 w-full h-full" placeholder="Dependencia" name="dependencie" defaultValue={dependencie ?? ""}/>
          <small className="italic ml-5 text-slate-500">Dependencia que desea buscar</small>
        </span>
        <button className="w-2/12 bg-green-500 text-white">Buscar</button>
      </form>
      <div className="">
        {children}
      </div>
    </main>
  )
}
