import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "etasylnjwwcpssvwfxls.supabase.co",
        pathname: "/storage/v1/object/public/projects/**",
      },
    ],
  },
};

export default nextConfig;
