import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,

  // Abilita compressione per file statici
  async headers() {
    return [
      {
        source: '/models/:path*.glb',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
