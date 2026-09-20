import type { NextConfig } from "next";

// Static export: the whole site is plain HTML/CSS/JS, so it can be hosted anywhere (Vercel, Netlify, GitHub Pages).
const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: { unoptimized: true },
};

export default nextConfig;
