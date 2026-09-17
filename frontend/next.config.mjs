/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "forever.travel-assets.com",
      },
      {
        protocol: "https",
        hostname: "a.travel-assets.com",
      },
    ],
  },
};

export default nextConfig;
