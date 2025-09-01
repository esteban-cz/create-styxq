import type { MetadataRoute } from "next"

const BASE = process.env.NEXT_PUBLIC_BASE_URL
const lastModified = new Date("2025-08-01T23:10:27Z")

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${BASE}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ]
}
