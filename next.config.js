/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'via.placeholder.com',
            'naszsklep-api.vercel.app',
            'media.graphassets.com',
            'source.unsplash.com',
        ]
    },
    experimental: {
        typedRoutes: true
    }
};

module.exports = nextConfig;
