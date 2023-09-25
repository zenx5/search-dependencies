import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export async function GET( request:NextRequest ){
    const users = await prisma.user.findMany()
    return NextResponse.json({
        users: users.length
    })
}