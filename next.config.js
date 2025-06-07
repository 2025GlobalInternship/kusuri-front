/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost/kusuri-back/:path*', // ✔️ 정확한 주소
      },
    ];
  },
};

module.exports = nextConfig;
