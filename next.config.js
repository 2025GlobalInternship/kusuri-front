/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            'port-9000-kusuri-back-mbwh1ckxb2a8c087.sel4.cloudtype.app',
            'localhost'
        ],
    },
    async rewrites() {
        return [
        {
            source: '/api/:path*',
            destination: 'https://port-9000-kusuri-back-mbwh1ckxb2a8c087.sel4.cloudtype.app/:path*',
        },
        ];
    },
};

module.exports = nextConfig;
