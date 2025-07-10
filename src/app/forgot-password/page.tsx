"use client"
import { useState } from "react";
import axios from "axios";


export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/forgot-password", { email });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold">Forgot Password</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md cursor-pointer">Reset Password</button>
            </form>
        </div>
    )
}