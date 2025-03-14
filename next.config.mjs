/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          // Apply these headers to all routes
          source: "/(.*)",
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*",
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization",
            },
          ],
        },
      ];
    },
    // Add transpilation configuration for mongoose
    transpilePackages: ['mongoose'],
    // Ensure server-side modules are properly handled
    webpack: (config, { isServer }) => {
      if (!isServer) {
        // Don't resolve 'fs' module on the client to prevent this error
        config.resolve.fallback = {
          fs: false,
          net: false,
          dns: false,
          tls: false,
          assert: false,
        };
      }
      return config;
    },
  };
  
  export default nextConfig;
  
  