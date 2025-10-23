/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true
  },
  eslint: {
    dirs: ["src"]
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@': '/tmp/factoryai-project-7afb9777-2894-4ecf-9bb8-4875db881814/src'
    };
    return config;
  }
};

export default nextConfig;
