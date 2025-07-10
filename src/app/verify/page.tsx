// app/verify/page.tsx or wherever your route is
"use client";

import { Suspense } from "react";
import VerifyComponent from "./VerifyComponent";

export default function VerifyPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Suspense fallback={<h1>Loading...</h1>}>
                <VerifyComponent />
            </Suspense>
        </div>
    );
}

