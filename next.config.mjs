/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost/kusri-backend/:path*',
      },
    ];
  },
};

export default nextConfig;
