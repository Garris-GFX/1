import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async redirects() {
    return [
      { source: '/privacy', destination: '/legal/privacy', permanent: true },
      { source: '/terms-of-service', destination: '/legal/terms-of-service', permanent: true },
      { source: '/cookie-policy', destination: '/legal/cookie-policy', permanent: true },
      { source: '/disclaimer', destination: '/legal/disclaimer', permanent: true },
      { source: '/acceptable-use', destination: '/legal/acceptable-use', permanent: true },
      { source: '/refunds', destination: '/legal/refunds', permanent: true },
      { source: '/subscription-hosting', destination: '/legal/subscription-hosting', permanent: true },
      { source: '/refer-earn', destination: '/legal/refer-earn', permanent: true },
        { source: '/dmca', destination: '/legal/dmca', permanent: true },
    ];
  },
};

export default nextConfig;
