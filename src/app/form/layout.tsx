import { cookies } from "next/headers"
import { redirect } from "next/navigation"

interface ErrorMessage{
  message:string
}

export default function Form({
    children,
  }: {
    children: React.ReactNode
}) {
    const dependencie = cookies().get(process.env.COOKIE_NAME_TARGET as string)?.value
    const user = cookies().get(process.env.COOKIE_NAME_USER as string)?.value
    async function search(data:FormData) {
        "use server";
        let message = "No hay resultados"
        let result = []
        try{
          const response = await fetch( `${process.env.LOCALHOST}/api/search`, {
            method:'post',
            body:JSON.stringify({
                user:data.get("user"),
                dep: data.get("dependencie")
            })
          })
          result = await response.json()
          if( result.length>0 ) message = ""
        }catch(error:any) {
          result = []
          message = error.message
        }
        cookies().set(process.env.COOKIE_NAME_USER as string, data.get("user") as string)
        cookies().set(process.env.COOKIE_NAME_TARGET as string, data.get("dependencie") as string)
        cookies().set(process.env.COOKIE_NAME_RESULT as string, JSON.stringify(result))
        redirect("/form/" + message)
    }


    return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 p-24">
      <form className="w-1/2 flex flex-row" action={search}>
        <span className="w-4/12 h-fit border-r group">
          <input type="text" className="py-2 px-4 m-0 w-full h-full rounded-l-xl shadow-lg outline-none focus:bg-green-100 focus:font-semibold" placeholder="Usario" name="user" defaultValue={user ?? ""}/>
          <small className="italic text-slate-500 group-hover:text-slate-900 text-center block w-full mt-1">Usuario de githbu</small>
        </span>
        <span className="w-4/12 h-fit border-r group">
          <input type="text" className="py-2 px-4 m-0 w-full h-full shadow-lg outline-none focus:bg-green-100 focus:font-semibold" placeholder="Dependencia" name="dependencie" defaultValue={dependencie ?? ""}/>
          <small className="italic text-slate-500 group-hover:text-slate-900 text-center block w-full mt-1">Dependencia que desea buscar</small>
        </span>
        <span className="w-4/12 h-fit">
          <input type="submit" className="py-2 px-4 m-0 w-full h-full rounded-r-xl font-semibold shadow-lg bg-green-500 text-white text-sm cursor-pointer active:bg-green-300 hover:bg-green-400" value="Buscar"/>
          <small className="text-transparent">no</small>
        </span>
      </form>
      <div className="">
        {children}
      </div>
    </main>
  )
}
