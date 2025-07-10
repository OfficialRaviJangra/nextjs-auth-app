'use client';

import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Home() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await axios.get('/api/auth/logout');
            if (response.status === 200) {
                router.push('/login');
                router.refresh();
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex-shrink-0 flex items-center">
                            <h1 className="text-xl font-bold">Next.js Auth App</h1>
                        </div>
                        <div className="flex items-center">
                            <button
                                onClick={handleLogout}
                                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                        <h2 className="text-2xl font-semibold text-gray-700">
                            Welcome to your protected dashboard!
                        </h2>
                    </div>
                </div>
            </main>
        </div>
    );
} 