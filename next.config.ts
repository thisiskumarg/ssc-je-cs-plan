import type { NextConfig } from "next";

const pages = process.env.GITHUB_PAGES === "1";
const staticExport = pages || process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  ...(staticExport
    ? {
        output: "export" as const,
        // Keep the running server's .next folder intact during a local export.
        ...(pages ? {} : { distDir: ".next-export" }),
        typescript: { ignoreBuildErrors: true },
        images: { unoptimized: true },
        ...(basePath ? { basePath, assetPrefix: basePath } : {}),
      }
    : {}),
  allowedDevOrigins: ["127.0.0.1", "localhost"],
};

export default nextConfig;
