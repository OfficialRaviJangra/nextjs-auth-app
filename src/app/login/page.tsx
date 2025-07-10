'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const onLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('/api/auth/login', user);
            if (response.status === 200) {
                router.push('/');
                router.refresh();
            } else {
                throw new Error(response.data.error || 'Something went wrong');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // Handle Axios error
                console.error(error);
                alert(error.response?.data?.error || error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onLogin}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email address</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Email address"
                                value={user.email}
                                onChange={(e) => setUser({ ...user, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Password"
                                value={user.password}
                                onChange={(e) => setUser({ ...user, password: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot password?
                    </Link>
                    <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Don&apos;t have an account? Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
} 