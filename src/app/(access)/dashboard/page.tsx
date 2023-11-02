import HeaderColaborator from "@/components/HeaderColaborator"
import { getUser } from "@/tools/actions"
import Request from "@/tools/models/Request"
import Image from "next/image"
import Link from "next/link"

export default async function DashboardPage() {
    const user = getUser()
    const response = await fetch(process.env.LOCALHOST + '/api/user')
    const people:Array<any> = await response.json()

    const requests = await Request.get() as Array<RequestType>

    const lastRequest = (id:string) => {
        const [requestUser, time] = requests
            .filter( request => request.user.id===id )
            .reduce( (acc:any, request:any) => {
                const time = Date.parse( request.createdAt )
                if( time > acc[1] ) return [request,time]
                return acc
            }, [null,0] )

        return requestUser ? <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <span className="flex flex-row gap-2">
                <p className="text-sm leading-6 text-gray-900 font-medium">{ requestUser?.dependencie }</p>
                <p className="text-sm leading-6 text-gray-500">from</p>
                <p className="text-sm leading-6 text-gray-900 font-medium">{ requestUser?.owner }</p>
            </span>
            <p className="mt-1 text-xs leading-5 text-gray-500">
                Last seen <time dateTime={requestUser?.createdAt}>{requestUser?.createdAt}</time>
            </p>
        </div> : <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="mt-1 text-xs leading-5 text-gray-500">Not used</p>
        </div>
    }

    return <main className="px-5 pt-0">
        <HeaderColaborator user={user} >
            <Link href="/app" className="top-7 relative w-full group-hover:text-green-800 group-hover:border-green-800 text-xs text-transparent border border-transparent py-1 px-2 rounded-full text-center">Home</Link>
        </HeaderColaborator>
        <h1 className="text-3xl font-semibold w-10/12 mx-auto border-b pb-5">Dashboard</h1>
        <div className="w-10/12 mx-auto">
            <h3 className="text-xl font-semibold w-10/12 ml-10 mt-20">Usuarios</h3>
            <ul role="list" className="divide-y divide-gray-300 ml-10 border-gray-200 border-l-2">
                {people.map((person) => (
                    <li key={person?.email} className="flex justify-between gap-x-6 py-5 px-5 hover:bg-slate-100">
                        <div className="flex min-w-0 gap-x-4">
                            { person.avatarUrl ? <Image width={100} height={100} className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person?.avatarUrl} alt="" /> : <span className="h-12 w-12 flex-none rounded-full shadow border bg-gray-50" ></span>}
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{person.firstname} {person.lastname} ( {person?.username} )</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                            </div>
                        </div>
                        { lastRequest(person.id) }
                    </li>
                ))}
            </ul>
        </div>
        <div className="w-10/12 mx-auto">
            <h3 className="text-xl font-semibold w-10/12 ml-10 mt-10">Requests</h3>
            <ul role="list" className="divide-y divide-gray-300 ml-10 border-gray-200 border-l-2">
                {requests.map((request) => (
                    <li key={request?.id} className="flex justify-between gap-x-6 py-5 px-5 hover:bg-slate-100">
                        <div className="flex min-w-0 gap-x-4">
                            {/* { person.avatarUrl ? <Image width={100} height={100} className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person?.avatarUrl} alt="" /> : <span className="h-12 w-12 flex-none rounded-full shadow border bg-gray-50" ></span>} */}
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{ request.dependencie } from { request.owner }</p>
                                <p className="mt-1 ml-2 truncate text-xs leading-5 text-gray-500">Query by { request.user.email }</p>
                            </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="mt-1 text-xs leading-5 text-gray-500">
                                Query at { request.createdAt }
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    </main>
}