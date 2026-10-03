import type { MetadataRoute } from "next";
import { SITE_ADRESI, sayfalar } from "@/lib/seo";

// lastModified bilerek yok: içerik panelden değişiyor, sabit bir tarih yanlış bilgi olurdu.
export default function sitemap(): MetadataRoute.Sitemap {
  return sayfalar.map((yol) => ({
    url: `${SITE_ADRESI}${yol === "/" ? "" : yol}`,
    changeFrequency: "monthly",
    priority: yol === "/" ? 1 : 0.8,
  }));
}
