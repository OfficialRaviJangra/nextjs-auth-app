// app/verify/VerifyComponent.tsx
"use client";

import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useState, useEffect } from "react";

export default function VerifyComponent() {
    const [successMessage, setSuccessMessage] = useState("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                const response = await axios.post("/api/auth/verifyaccount", { token });
                if (response?.status === 200) {
                    setSuccessMessage(response.data.message);
                } else if (response?.status === 400) {
                    setSuccessMessage("Invalid or expired token. Please request a new verification link.");
                } else {
                    setSuccessMessage("Verification failed. Please try again.");
                }
            } catch (error: any) {
                console.error("Error verifying account:", error.message);
                setSuccessMessage("An error occurred while verifying your account. Please try again later.");
            }
        };
        verifyAccount();
    }, [token]);

    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4">{successMessage}</h1>
            <div className="text-gray-600 mb-4">
                {successMessage.includes("successfully")
                    ? <p>You can now close this tab.</p>
                    : <p>If you continue to experience issues, please contact support.</p>}
            </div>
        </div>
    );
}
