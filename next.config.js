/** @type {import('next').NextConfig} */

const domainString = process.env.PBDOMAIN_SHORT.toString()

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
