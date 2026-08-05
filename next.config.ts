import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/ragia-realestate", // ضروري جداً لـ GitHub Pages
  trailingSlash: true, // يساعد في حل مشكلة 404 عند التنقل بين الصفحات
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
