/** @type {import('next').NextConfig} */

module.exports = {
  async redirects() {
    return [
      {
        source: '/finds',
        destination: '/finds/all',
        permanent: true
      },
      {
        source: '/kinds',
        destination: '/kinds/all',
        permanent: true
      },
      {
        source: '/lists',
        destination: '/lists/all',
        permanent: true
      },
      {
        source: '/posts',
        destination: '/',
        permanent: true
      },
      {
        source: '/views',
        destination: '/',
        permanent: true
      }
    ];
  },
  images: {
    domains: [], // Add any specific domains you want to allow for images
    loader: 'default',
    path: '/_next/image',
    deviceSizes: [320, 420, 768, 1024, 1200], // Adjust as needed
    iconSizes: [],
    domains: [],
    loader: 'default',
    minimumCacheTTL: 60,
    disableStaticImages: false,
    formats: ['image/avif', 'image/webp'],
    imageSizes: [],
    screenSizes: [],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8090',
        pathname: '/api/files/**'
      },
      {
        protocol: 'https',
        hostname: process.env.PBDOMAIN || '',
        pathname: '/api/files/**'
      },
      {
        protocol: 'https',
        hostname: process.env.PBDOMAIN_SHORT || '',
        pathname: '/api/files/**'
      }
    ]
  }
};
