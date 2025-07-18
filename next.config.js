/** @type {import('next').NextConfig} */
const nextConfig = {
  generateBuildId: async () => {
    return `build-${Date.now()}-force-refresh`
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  poweredByHeader: false,
}

module.exports = nextConfig
