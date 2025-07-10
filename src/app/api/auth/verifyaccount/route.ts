import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user.model";
import { connect } from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const {token} = await req.json()

        await connect();
        if (!token) {
            return NextResponse.json({ message: "Token is required" }, { status: 400 });
        }
        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: new Date() } });
        if(!user){
            return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
        }
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({ message: "Account verified successfully" }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in verify account:", error.message);
        }
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}