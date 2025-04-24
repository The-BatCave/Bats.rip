/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Add this line to fix asset paths for GitHub Pages
  assetPrefix: './',
  // Keep basePath empty for custom domain
  basePath: '',
  // Ensure API routes work correctly with static export
  experimental: {
    // These settings help with static exports
    appDocumentPreloading: false,
  },
};

export default nextConfig;
