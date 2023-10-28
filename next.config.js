/** @type {import('next').NextConfig} */

const domainString = process.env.PBDOMAIN_SHORT.toString()

module.exports = {  
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true
      },      
      {
        source: '/:langs/:type',
        destination: '/:langs/:type/all',
        permanent: true
      },
      {
        source: '/:langs/:type/post',
        destination: '/:langs/:type/all',
        permanent: true
      }
    ]
  },
  images: {
    remotePatterns: [      
      {
        protocol: 'http',
        hostname: '127.0.0.1',        
        port: '8090',
        pathname: '/api/files/**'
      },
      {
        protocol: 'https',
        hostname: domainString,        
        pathname: '/api/files/**'
      },
    ] 
  }
}
