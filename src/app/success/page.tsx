import Image from "next/image";
import { actionUser } from "@/tools/actions/user";
import { redirect } from "next/navigation";
import { setUser } from "@/tools/actions";



export default async function Page({ searchParams }:{ searchParams:{ code:string } }) {
    const code = searchParams.code

    const response = await fetch(process.env.LOCALHOST + `/api/github/auth/token/${code}`)
    const { error, message, data } = await response.json()
    // DESCOMENTAR PARA PRUEBAS
    // const message = "hola"
    // const error = false
    // const data = {
    //     avatarUrl: "https://avatars.githubusercontent.com/u/26119733?v=4",
    //     firstname: "Octavio",
    //     username: "zenx5",
    //     email:"omartinez1618@gmail.com"
    // }

    if( !error ) {
        return <div className="w-screen h-screen flex items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col gap-8 border-2 w-fit px-20 py-10 rounded-xl shadow-lg hover:shadow-xl">
                <div className="w-full">
                    <h1 className="text-3xl text-center w-1/3 font-bold mx-auto">¿Eres tu?</h1>
                </div>
                <div className="flex flex-row gap-10 justify-center items-center mx-auto">
                    <Image className="rounded-full" src={data.avatarUrl} alt={data.firstname} width={150} height={150}/>
                    <span className="w-1/3 flex flex-col gap-2">
                        <h2 className="text-xl font-semibold uppercase">{data.username}</h2>
                        <p className="italic pl-4 border-l-2 border-gray-400">{data.email}</p>
                    </span>
                </div>
                <form action={actionUser} className="flex flex-row gap-10">
                    <input type="hidden" name="user" value={JSON.stringify(data)} />
                    <input type="submit" name="response_is" value="No" className="rounded cursor-pointer hover:shadow-lg hover:shadow-red-400 bg-red-600 text-white px-10 py-2"/>
                    <input type="submit" name="response_is" value="Si" className="rounded cursor-pointer hover:shadow-lg hover:shadow-green-400 bg-green-600 text-white px-10 py-2"/>
                </form>
            </div>
        </div>
    } else {
        return <div className="w-screen h-screen flex items-center justify-center">
            <p>Hubo un error: {message}</p>
        </div>
    }

}