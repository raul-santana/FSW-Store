/** @type {import('next').NextConfig} */
const nextConfig = {
    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: 'lh3.googleusercontent.com',
    //         port: '',
    //       },
    //       {
    //         protocol: 'https',
    //         hostname: 'fsw-store.s3.sa-east-1.amazonaws.com',
    //         port: '',
    //       },
    //       {
    //         protocol: 'https',
    //         hostname: 'images.unsplash.com',
    //         port: '',
    //       },
    //     ],
    //   },
    images:{
      domains: ["lh3.googleusercontent.com", "fsw-store.s3.sa-east-1.amazonaws.com"]
    }
}

module.exports = nextConfig
