import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(request:NextRequest) {
    const body = await request.json()
    try{
        const extension = await prisma.extensions.create({
            data:{
                navigator: body.navigator,
                code: body.code
            }
        })
        prisma.$disconnect();

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