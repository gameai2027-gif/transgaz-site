import type { MetadataRoute } from "next";

/* force-static — совместимость с output: export (GitHub Pages) */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://transgaz-ufa.ru/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
