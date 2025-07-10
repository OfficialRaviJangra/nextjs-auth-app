"use client"
import { Suspense } from "react";
import ResetPasswordForm from "@/app/reset-password/reset-password-form";

export default function ResetPasswordPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black/50 py-2">
            <Suspense fallback={
                <div className="bg-white p-8 rounded-lg shadow-md w-96">
                    <div className="animate-pulse flex flex-col gap-4">
                        <div className="h-8 bg-gray-200 rounded w-full"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                    </div>
                </div>
            }>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}