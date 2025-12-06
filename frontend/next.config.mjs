/** @type {import('next').NextConfig} */
const nextConfig = {
   output: "export",  // ⬅ REQUIRED for static export
 
  images: {
    // Allow Strapi images from local backend
    domains: ['localhost'],
     unoptimized: true,

    // Optional: If you plan to deploy Strapi later, you can add your hosted domain too
    // domains: ['localhost', 'your-strapi-domain.com'],

    // Allow HTTP (not only HTTPS) during local development
   remotePatterns: [
  {
    protocol: 'http',
    hostname: 'localhost',
    port: '1337',
    pathname: '/uploads/**',
  },
],

  },

  // Optional: Enable strict mode and React server components (recommended)
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
