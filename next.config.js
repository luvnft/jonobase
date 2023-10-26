/** @type {import('next').NextConfig} */

module.exports = {  
  images: {
    remotePatterns: [      
      {
        protocol: 'http',
        hostname: process.env.PBDOMAIN_SHORT,        
        pathname: '/api/files/**'
      },
      {
        protocol: 'https',
        hostname: process.env.PBDOMAIN_SHORT,        
        pathname: '/api/files/**'
      },
    ] 
  },
}
