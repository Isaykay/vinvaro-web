import type { NextConfig } from "next";

const appRedirects = [
  ["/login", "https://app.vinvaro.com/login"],
  ["/inloggen", "https://app.vinvaro.com/login"],
] as const;

const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  cacheComponents: true,
  images: {
    qualities: [75, 90],
  },
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
        ],
      },
    ];
  },
  async redirects() {
    return appRedirects.map(([source, destination]) => ({ source, destination, permanent: false }));
  },
};

export default nextConfig;
