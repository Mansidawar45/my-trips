/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Required for static export (S3 + CloudFront)

  images: {
    unoptimized: true, // Required for static export
    
    // Add your production Strapi domain here
    domains: ['localhost', 'your-strapi-backend.com'],

    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'your-strapi-backend.com',
        pathname: '/uploads/**',
      },
    ],
  },

  // Optional: Enable strict mode
  reactStrictMode: true,

  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337',
  },
};

export default nextConfig;
