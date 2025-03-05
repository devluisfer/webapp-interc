import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["localhost"], // Permitir imágenes desde JSON Server en localhost
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/images/**", // Ajusta si usas JSON Server para imágenes
      },
    ],
  },
};

export default nextConfig;
