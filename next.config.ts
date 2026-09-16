import type { NextConfig } from "next";

/*
 * STATIC_EXPORT=1 — сборка статичного демо для GitHub Pages:
 * без серверных роутов (API/SQLite), картинки без оптимизации,
 * basePath совпадает с именем репозитория.
 */
const isStaticDemo = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticDemo
    ? {
        output: "export",
        images: { unoptimized: true },
        basePath: "/transgaz-site",
        assetPrefix: "/transgaz-site/",
      }
    : { output: "standalone" }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
