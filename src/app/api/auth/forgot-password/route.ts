import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const { email } = body;
        console.log(email);
        await sendEmail(email)
        return NextResponse.json({ message: "Reset password email sent", email }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}