import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/user.model";

export async function GET() {
    await connectDB();

    try {
        const users = await User.find();
        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json(
            { error: `Error fetching users: ${error}` },
            { status: 500 }
        );
    }
}
