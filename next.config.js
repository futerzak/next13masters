/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'via.placeholder.com',
            'naszsklep-api.vercel.app'
        ]
    },
    experimental: {
        typedRoutes: true
    }
};

module.exports = nextConfig;
