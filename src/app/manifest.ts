import type { MetadataRoute } from "next";
import { getContent } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  const { site } = getContent("nl");
  return {
    name: `${site.name}: ${site.category}`,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "standalone",
    lang: "nl-NL",
    background_color: "#f8fafc",
    theme_color: "#0b0f14",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/pwa-192.png", type: "image/png", sizes: "192x192" },
      { src: "/pwa-512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
