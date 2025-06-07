/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost/kusuri-back/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
