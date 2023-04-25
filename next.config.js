/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      'qa.tryspace.com',
      'tryspace.com',
      'localhost',
      'https://public-space-assets.s3.us-west-2.amazonaws.com',
      'space-staging-assets.metaverse-demo.com',
      'hub-event-images.s3.us-east-2.amazonaws.com',
      'spaces-staging-assets.metaverse-demo.com',
      'tryspace-prod-assets.tryspace-internal.com',
      'flagcdn.com'
    ],
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mp4$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "static/",
          }
        }
      ]
    })
    return config
  },
  compiler: {
    styledComponents: true
  },

  transpilePackages: [
    '@space-metaverse-ag/space-ui'
  ],
}

module.exports = nextConfig
