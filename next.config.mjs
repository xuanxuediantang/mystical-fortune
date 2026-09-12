import { setupNextOnPages } from "@cloudflare/next-on-pages/setup";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

setupNextOnPages(nextConfig);

export default nextConfig;