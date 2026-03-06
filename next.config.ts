import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://notehub-api.goit.global/:path*',
      },
    ];
  },
};

export default nextConfig;
