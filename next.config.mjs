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
  // No basePath needed for custom domain
  basePath: '',
  // Ensure API routes work correctly with static export
  experimental: {
    // These settings help with static exports
    appDocumentPreloading: false,
  },
};

export default nextConfig;
