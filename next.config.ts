import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,

  async redirects() {
    return [
      {
        // la pagina prodotto unica e' stata divisa in due: ViC Suite
        source: '/product/vic',
        destination: '/product/surgical-planning',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'intusai.com' }],
        destination: 'https://www.intusai.com/:path*',
        permanent: true,
      },
    ];
  },

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
