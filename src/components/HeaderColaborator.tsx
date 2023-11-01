import { LOGOUT, ROUTER_PATH } from "@/tools/constants"
import Link from "next/link"
import Image from "next/image"

export default async function HeaderColaborator({ user }:{ user:any }) {

    const response = await fetch("https://api.github.com/repos/zenx5/search-dependencies/contributors")
    const colaborators = await response.json()

    return <span className="p-5 m-5 w-11/12 flex flex-row justify-between items-center">
        <span className="flex flex-row justify-around items-center w-full">
            { colaborators.map( (colaborator:any) => <Link key={colaborator.node_id} href={colaborator.html_url} target="_blank" className="flex flex-col items-center group">
                { colaborator.avatar_url ?
                    <Image className="w-12 h-12 rounded-full" src={colaborator.avatar_url} width={100} height={100} alt=""/>:
                    <UserIcon className="w-10 h-10"/>}
                <span className="group-hover:font-semibold">{colaborator.login}</span>
            </Link>)}
        </span>
        <form method="POST" action={ROUTER_PATH.API.USER} className="border-l-2 border-white ">
            <input type="hidden" name="action" value={LOGOUT} />
            <button type="submit" className="flex flex-col items-center group justify-center mx-5">
                {
                    user.avatarUrl ?
                    <Image className="w-12 h-12 rounded-full" src={user.avatarUrl} width={100} height={100} alt=""/>:
                    <UserIcon className="w-10"/>
                }
                <span className="group-hover:font-semibold">{user.username}</span>
                <small className="text-transparent group-hover:text-red-500 italic text-xs">logout</small>
            </button>
        </form>
    </span>
}

const UserIcon = ({ className }:{ className:string }) => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
</svg>