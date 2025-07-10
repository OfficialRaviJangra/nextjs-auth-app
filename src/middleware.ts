import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './helpers/token.helper';

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail';
    const token = request.cookies.get('accessToken')?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

export const config = {
    matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/verifyemail',
    ]
} 