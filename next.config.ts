import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next dev` kendi kural bloğunu yalnızca CLAUDE.md'ye yazıp AGENT.md ile
  // ayrıştırıyor. Kapalı; aynı bilgi CLAUDE.md ve AGENT.md'de elle duruyor.
  agentRules: false,
  // const.md: içerik 'use cache' + cacheTag('icerik') ile önbellekten okunur.
  cacheComponents: true,
  images: {
    // Yalnız kendi Blob depomuz (rektportfol-gorseller, store_gcWo7xyTs7TPVjGv).
    remotePatterns: [new URL("https://gcwo7xyts7tpvjgv.public.blob.vercel-storage.com/**")],
  },
  experimental: {
    serverActions: {
      // Görsel yükleme: varsayılan 1 MB yetmiyor; Vercel'in istek sınırı 4,5 MB
      // (src/lib/gorsel.ts dosyayı 4 MB'ta keser).
      bodySizeLimit: "4.5mb",
    },
  },
};

export default nextConfig;
