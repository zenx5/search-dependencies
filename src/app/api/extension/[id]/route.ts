import { NextRequest, NextResponse } from "next/server";
import Extensions from "@/tools/models/Estensions";


export async function GET(request:NextRequest, { params }:{ params:{ id:string } } ) {
    let message = ""
    const { id } = params
    const user = request.nextUrl.searchParams.get('user')
    const query = request.nextUrl.searchParams.get('query')
    if( user && query ) {
        const extension = await Extensions.search("code", id)
        if( extension && extension.length>0 ) {
            const response = await fetch(`${process.env.LOCALHOST}/api/search`, {
                method: 'post',
                body: JSON.stringify({
                    user,
                    dep: query
                })
            })
            const data = await response.json()
            return new NextResponse( JSON.stringify({
                status: 'success',
                message: "Success",
                error: false,
                data
            }) ,{
                status:200,
                headers:{
                    'Access-Control-Allow-Origin': `chrome-extension://${id}`
                }
            })
        }
        message = "Id not found"

    }else {
        message = "Invalid Paramaters"
    }

    return new NextResponse( JSON.stringify({
        status: 'error',
        message,
        error: true,
        data:null
    }) ,{
        status:200,
        headers:{
            'Access-Control-Allow-Origin': '*'
        }
    })

}