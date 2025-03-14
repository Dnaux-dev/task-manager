import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Add mongoose to externals to prevent it being bundled
      config.externals = [...(config.externals || []), 'mongoose']
    }
    return config;
  },
};

export default nextConfig;