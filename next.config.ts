// pixel-perfect\next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "asset.imagine.art",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
// asset.imagine.art
// import {NextConfig} from 'next';
// import createNextIntlPlugin from 'next-intl/plugin';

// const nextConfig: NextConfig = {};

// const withNextIntl = createNextIntlPlugin();
// export default withNextIntl(nextConfig);
