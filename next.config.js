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
    minimumCacheTTL: 60,
    disableStaticImages: false,
    formats: ['image/avif', 'image/webp'],
    imageSizes: []
  }
};
