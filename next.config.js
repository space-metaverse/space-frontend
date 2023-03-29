/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['qa.tryspace.com', 'tryspace.com', 'localhost'],
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
