/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['qa.tryspace.com', 'tryspace.com', 'localhost'],
  },
  compiler: {
    styledComponents: true
  },

  transpilePackages: [
    '@space-metaverse-ag/space-ui'
  ],
}

module.exports = nextConfig
