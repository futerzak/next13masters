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
        typedRoutes: true,
        serverActions: true,
    },
    redirects: async () => {
        return [
            {
                source: '/products',
                destination: '/products/1',
                permanent: true,
            },
        ];
    }
};

module.exports = nextConfig;
