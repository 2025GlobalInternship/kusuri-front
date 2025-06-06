/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost/kusri-backend/:path*', // 서버 주소 맞는지 꼭 확인!
      },
    ];
  },
};

export default nextConfig;
