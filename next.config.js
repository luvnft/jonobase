/** @type {import('next').NextConfig} */

const domainString = process.env.PBDOMAIN_SHORT.toString()

module.exports = {  
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
  },
}
