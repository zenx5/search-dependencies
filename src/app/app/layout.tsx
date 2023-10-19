import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import ButtonLoad from "./ButtonLoad"
import { getUser } from "@/tools/actions"
import HeaderColaborator from "@/components/HeaderColaborator"
import { ROUTER_PATH } from "@/tools/constants"

interface ErrorMessage{
  message:string
}

export default function Form({
    children,
  }: {
    children: React.ReactNode
}) {
    const currentUser = getUser()
    if( !currentUser ) return redirect(ROUTER_PATH.LOGIN)

    const dependencie = cookies().get(process.env.COOKIE_NAME_TARGET as string)?.value
    const user = cookies().get(process.env.COOKIE_NAME_USER_QUERY as string)?.value
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
        cookies().set(process.env.COOKIE_NAME_USER_QUERY as string, data.get("user") as string)
        cookies().set(process.env.COOKIE_NAME_TARGET as string, data.get("dependencie") as string)
        cookies().set(process.env.COOKIE_NAME_RESULT as string, JSON.stringify(result))
        redirect( ROUTER_PATH.APP + "/" + message)
    }


    return (
    <main className="flex min-h-screen flex-col items-center justify-between border-2 border-blue-500 gap-10 md:px-24 md:pb-24 px-5 bg-gray-400">
      <HeaderColaborator user={currentUser} />
      <form className="mt-20 container flex md:flex-row flex-col gap-5 md:gap-0 justify-center" action={search}>
        <span className="w-full md:w-4/12 lg:w-64 h-fit group">
          <input type="text" className="md:border-r text-center md:text-left py-2 px-4 m-0 w-full h-full rounded-xl md:rounded-l-xl md:rounded-r-none shadow-lg outline-none focus:bg-green-100 focus:font-semibold" placeholder="Usuario" name="user" defaultValue={user ?? ""}/>
          <small className="italic text-slate-500 group-hover:text-slate-900 text-center block w-full mt-1">Usuario de github</small>
        </span>
        <span className="w-full md:w-4/12 lg:w-64 h-fit group">
          <input type="text" className="md:border-r text-center md:text-left rounded-xl md:rounded-none py-2 px-4 m-0 w-full h-full shadow-lg outline-none focus:bg-green-100 focus:font-semibold" placeholder="Dependencia" name="dependencie" defaultValue={dependencie ?? ""}/>
          <small className="italic text-slate-500 group-hover:text-slate-900 text-center block w-full mt-1">Dependencia que desea buscar</small>
        </span>
        <ButtonLoad />
      </form>
      <div className="">
        {children}
      </div>
    </main>
  )
}

