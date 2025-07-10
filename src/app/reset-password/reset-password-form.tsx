"use client"
import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

export default function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post("/api/auth/reset-password", {
                password,
                token
            });
            if (response.status === 200) {
                router.push("/login");
            }
            setSuccess("Password reset successfully");
            setError("")
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.error || "Failed to reset password");
            } else {
                setError("Failed to reset password");
            }
            setSuccess("");
        }
    };

    return (
        <div className="bg-black p-8 rounded-lg shadow-md w-96">
            <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
            {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
                    {error}
                </div>
            )}
            {success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                    {success}
                </div>
            )}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="password"
                    placeholder="New Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
} 