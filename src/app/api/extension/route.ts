import { NextRequest, NextResponse } from "next/server";
import Extensions from "@/tools/models/Estensions";


export async function POST(request:NextRequest) {
    const body = await request.json()
    try{
        const data = {
            navigator: body.navigator,
            code: body.code
        }
        const extension = await Extensions.post(data)
        return new NextResponse( JSON.stringify(extension) ,{
            status:200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            }
        })
    }catch( error ) {
        return new NextResponse( JSON.stringify({
            message:"Ya existe el ID"
        }) ,{
            status:200,
            headers:{
                'Access-Control-Allow-Origin': '*'
            }
        })
    }

}