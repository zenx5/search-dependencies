import { NextRequest, NextResponse } from "next/server";
interface responseRepositorie {
    name: string,
    default_branch: string,
    html_url: string

}
const NOT_FOUND = -1

export async function GET() {
    const headers  = new Headers()
    headers.append("Accept","application/vnd.github+json")
    headers.append("Authorization", `Bearer ${process.env.GITHUB_TOKEN as string}`)
    headers.append("X-GitHub-Api-Version","2022-11-28")
    const response = await fetch("https://api.github.com/search/code?qdependencies+language:json+in:file",{
        headers
    })
    const data = await response.json()
    return NextResponse.json( {
        data,
        token: `Bearer ${process.env.GITHUB_TOKEN as string}`
    } )
}


export async function POST(request:NextRequest) {
    const { user, dep } = await request.json()

    const response = await fetch(`https://api.github.com/users/${user}/repos`)
    const data = await response.json()
    const packages = data.map( ({name, default_branch, html_url}:responseRepositorie) => ({
        package: `https://raw.githubusercontent.com/${user}/${name}/${default_branch}/package.json`,
        html_url
    }) )
    const result = []
    for( let index = 0; index<packages.length; index++ ) {
        const fileuri = packages[ index ].package
        try{
            const response = await fetch(fileuri)
            const packageContent = await response.json()
            const keyDependencies = [
                ...Object.keys( packageContent?.devDependencies || {} ),
                ...Object.keys( packageContent?.dependencies || {} )
            ]
            const valueDependencies = [
                ...Object.values( packageContent?.devDependencies || {} ),
                ...Object.values( packageContent?.dependencies || {} )
            ]
            const indexDependencie = keyDependencies.indexOf(dep)
            if( indexDependencie!==NOT_FOUND ){
                result.push({
                    url: packages[ index ].html_url,
                    version: valueDependencies[ indexDependencie ]
                })
            }else {
                throw new Error("dependencie not found")
            }
        }catch( error:any ) {
            // errors.push( { name: fileuri, error: error.message } )
            console.log( error.message )
        }
    }

    return NextResponse.json( result )

}