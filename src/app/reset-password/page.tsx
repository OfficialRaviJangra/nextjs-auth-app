"use client"
import { Suspense } from "react";
import ResetPasswordForm from "@/app/reset-password/reset-password-form";

export default function ResetPasswordPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black/50 py-2">
            <Suspense fallback={
                <h1>Loading...</h1>
            }>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}