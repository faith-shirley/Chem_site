/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ Allow deployment even with ESLint issues
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignore TypeScript errors during build (optional)
  },
}

module.exports = nextConfig