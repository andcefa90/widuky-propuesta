import type { NextConfig } from "next";

// Set on GitHub Pages builds, where the site lives under /<repo>/.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
