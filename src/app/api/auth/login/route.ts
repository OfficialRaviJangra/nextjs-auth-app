import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/lib/db";
import User from "@/models/user.model";
import bcrypt from "bcryptjs";
import { createToken } from "@/helpers/token.helper";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        // Connect to database
        await connect();
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json(
                { error: "User does not exist" },
                { status: 400 }
            );
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json(
                { error: "Invalid password" },
                { status: 400 }
            );
        }

        // Create token
        const { accessToken, refreshToken } = createToken(user._id);
        user.refreshToken = refreshToken;
        await user.save({new: true, validateBeforeSave: false});

        
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        }, { status: 200 });

        // Set cookie
        response.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
        });

        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
        });
        
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
} 