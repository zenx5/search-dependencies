import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request:NextRequest, { params }: { params:{ username:string } }) {
    const { username } = params
    const github = !!request.nextUrl.searchParams.get('github')?.replace('','1')

    const where = github ? {
        githubuser: username
    }:{
        username: username
    }

    const user = await prisma.user.findUnique({
        where
    })
    return NextResponse.json({
        error: user===null,
        data: user
    })
}