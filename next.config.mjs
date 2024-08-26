/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Allows images from any HTTPS hostname
        hostname: '**',
      },
      {
        protocol: 'http', // Allows images from any HTTP hostname
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
