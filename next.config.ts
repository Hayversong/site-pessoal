import type { NextConfig } from 'next';

const isVercelBuild = process.env.VERCEL === '1';

const nextConfig: NextConfig = {
  output: isVercelBuild ? 'export' : undefined,
  images: {
    unoptimized: isVercelBuild,
  },
};

export default nextConfig;
