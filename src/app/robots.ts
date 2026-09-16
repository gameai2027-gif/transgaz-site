import type { MetadataRoute } from "next";

/* force-static — совместимость с output: export (GitHub Pages) */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: "https://transgaz-ufa.ru/sitemap.xml",
  };
}
