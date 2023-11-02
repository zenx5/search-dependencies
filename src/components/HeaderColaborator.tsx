import { LOGOUT, ROUTER_PATH } from "@/tools/constants"
import Link from "next/link"
import Image from "next/image"

export default async function HeaderColaborator({ children, user }:{ children:any, user:any }) {
    const isAdmin = (process.env.ADMIN_EMAIL as string).split(',').includes(user.email)
    const response = await fetch("https://api.github.com/repos/zenx5/search-dependencies/contributors")
    const colaborators = await response.json()

    return <span className="px-5 py-2 mx5 my-2 w-11/12 flex flex-row justify-between items-center">
        <span className="w-full">
            <h2 className="text-left md:text-center mb-1 uppercase font-medium">Colaboradores</h2>
            <span className="flex md:flex-row flex-col justify-around items-start md:items-center italic md:w-full w-fit">
                {  colaborators instanceof Array && colaborators.map( (colaborator:any) => <Link key={colaborator.node_id} href={colaborator.html_url} target="_blank" className="flex flex-col items-start md:items-center group">
                    { colaborator.avatar_url ?
                        <Image className="w-12 h-12 rounded-full md:block hidden" src={colaborator.avatar_url} width={80} height={80} alt=""/>:
                        <UserIcon className="w-10 h-10 md:block hidden"/>}
                    <span className="group-hover:font-semibold">{colaborator.login}</span>
                </Link>)}
            </span>
        </span>
        <form method="POST" action={ROUTER_PATH.API.USER} className="border-l-2 md:border-white border-transparent flex flex-col group gap-1 px-1 mt-8">
            <input type="hidden" name="action" value={LOGOUT} />
            <span className="flex flex-col items-center justify-center p-2 h-20 top-7 relative w-full">
                {
                    user.avatarUrl ?
                    <Image className="w-12 h-12 rounded-full" src={user.avatarUrl} width={100} height={100} alt=""/>:
                    <UserIcon className="w-10"/>
                }
                <span className="group-hover:font-semibold">{user.username}</span>
            </span>
            { children }
            <button type="submit" className="top-7 relative group-hover:border-red-500 group-hover:text-red-500 text-transparent italic text-xs border border-transparent py-1 px-2 rounded-full">logout</button>
        </form>
    </span>
}

const UserIcon = ({ className }:{ className:string }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>