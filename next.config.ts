import type { NextConfig } from "next";

const NextConfig: NextConfig = {
  experimental: {
    // This disables the floating Vercel feedback button
    nextScriptWorkers: false,
  },
  // optional, but good hygiene
  reactStrictMode: true,
}

export default NextConfig;
