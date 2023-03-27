/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['qa.tryspace.com', 'tryspace.com', 'localhost'],
  }
}

module.exports = nextConfig
