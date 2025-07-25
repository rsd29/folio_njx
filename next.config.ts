import type { NextConfig } from "next";

const NextConfig = {
  experimental: {
    // This disables the floating Vercel feedback button
    nextScriptWorkers: false,
    serverActions: false,
    instrumentationHook: false,
    appDir: true,
  },
  // optional, but good hygiene
  reactStrictMode: true,
}

export default NextConfig;
