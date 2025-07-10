/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/dashboard',
        has: [
          {
            type: 'cookie',
            key: 'token',
            missing: true,
          },
        ],
        permanent: false,
        destination: '/login',
      },
      {
        source: '/profile',
        has: [
          {
            type: 'cookie',
            key: 'token',
            missing: true,
          },
        ],
        permanent: false,
        destination: '/login',
      }
    ];
  },
};

export default nextConfig;
