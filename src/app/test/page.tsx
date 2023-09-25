import Link from "next/link";

export default function Page() {

    const clientId = process.env.GITHUB_CLIENT_ID

    return <div>
        <Link href={`https://github.com/login/oauth/authorize?client_id=${clientId}`}>Login with Github</Link>
    </div>
}