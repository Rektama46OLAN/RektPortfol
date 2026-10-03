import type { MetadataRoute } from "next";
import { SITE_ADRESI } from "@/lib/seo";

// Admin paneli taranmaz (sayfaları ayrıca noindex taşıyor: src/app/admin/layout.tsx).
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin" },
    sitemap: `${SITE_ADRESI}/sitemap.xml`,
  };
}
