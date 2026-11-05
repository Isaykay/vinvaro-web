import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

export default function robots(): MetadataRoute.Robots {
  const { site } = getContent("nl");
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/api/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
