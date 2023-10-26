/** @type {import('next').NextConfig} */
console.log(process.env)
module.exports = {
  images: {
    remotePatterns: [
      {        
        protocol: 'http', 
        hostname: '127.0.0.1',
        port: '8090',
        pathname: '/api/files/**'
      }
    ],    
  },
}
