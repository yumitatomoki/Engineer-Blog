/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains:['images.ctfassets.net'],
  },
};

module.exports = nextConfig;