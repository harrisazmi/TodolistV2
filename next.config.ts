import type { NextConfig } from "next";
const withPWA = require("next-pwa")({
  dest: "public",
  runtimeCaching: [
    {
      urlPattern: /^https?.*/, // Match all requests
      handler: "NetworkOnly", // Always go to network
      options: {
        cacheName: "no-cache",
      },
    },
  ],
});

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPWA(nextConfig);
