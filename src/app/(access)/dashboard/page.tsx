import Image from "next/image"

export default async function DashboardPage() {

    const response = await fetch(process.env.LOCALHOST + '/api/user')
    const people:Array<any> = [...await response.json(), {
            name: 'Leslie Alexander',
            email: 'leslie.alexander@example.com',
            role: 'Co-Founder / CEO',
            imageUrl:
              'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
    }]

    return <main className="p-10">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <ul role="list" className="divide-y divide-gray-100">
                {people.map((person) => (
                    <li key={person?.email} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        { person.imageUrl ? <Image width={100} height={100} className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person?.imageUrl} alt="" /> : <span className="h-12 w-12 flex-none rounded-full shadow border bg-gray-50" ></span>}
                        <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{person.firstname} {person.lastname}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                        </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">{person?.role}</p>
                        {person?.lastSeen ? (
                        <p className="mt-1 text-xs leading-5 text-gray-500">
                            Last seen <time dateTime={person?.lastSeenDateTime}>{person?.lastSeen}</time>
                        </p>
                        ) : (
                        <div className="mt-1 flex items-center gap-x-1.5">
                            <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs leading-5 text-gray-500">Online</p>
                        </div>
                        )}
                    </div>
                    </li>
                ))}
            </ul>
    </main>
}