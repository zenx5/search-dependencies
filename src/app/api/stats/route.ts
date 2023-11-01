import User from "@/tools/models/User";
import { NextRequest, NextResponse } from "next/server";


export async function GET( request:NextRequest ){
    const users = await User.get()
    return NextResponse.json({
        users: users,
    })
}