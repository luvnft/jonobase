/** @type {import('next').NextConfig} */

const domainString = process.env.PBDOMAIN_SHORT.toString()

module.exports = {  
  images: {
    remotePatterns: [      
      {
        protocol: 'http',
        hostname: domainString,        
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
