import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import ButtonLoad from "./ButtonLoad"

interface ErrorMessage{
  message:string
}

export default function Form({
    children,
  }: {
    children: React.ReactNode
}) {
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
        redirect("/form/" + message)
    }


    return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-10 md:p-24 px-5 bg-gray-400">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-10 absolute  top-3 right-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
      <form className="container flex md:flex-row flex-col gap-5 md:gap-0 justify-center" action={search}>
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