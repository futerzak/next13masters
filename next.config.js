/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'placehold.it',
            'naszsklep-api.vercel.app'
        ]
    },
    experimental: {
        typedRoutes: true
    }
};

module.exports = nextConfig;
