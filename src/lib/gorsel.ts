// Proje görsellerini Vercel Blob'a yükler / siler (const.md: yüklenen dosyalar Blob'da).
import { del, put } from "@vercel/blob";
import { imageSize } from "image-size";

// Vercel'de bir isteğin gövdesi en fazla 4,5 MB olabiliyor; form alanları için pay bırakıldı.
export const AZAMI_BOYUT = 4 * 1024 * 1024;
const IZINLI_TURLER = ["image/png", "image/jpeg", "image/webp", "image/gif"];

// Canlıdan yüklenenler "projeler/", yerelden ve preview'dan yüklenenler "dev/projeler/" altına:
// test görselleri canlı görsellerle karışmaz, gerekirse topluca silinebilir.
const KLASOR = process.env.VERCEL_ENV === "production" ? "projeler" : "dev/projeler";

export type YuklenenGorsel = { src: string; en: number; boy: number };

export async function gorselYukle(dosya: File): Promise<YuklenenGorsel | string> {
  if (!dosya || dosya.size === 0) return "Dosya seçilmedi.";
  if (!IZINLI_TURLER.includes(dosya.type)) return "Yalnız PNG, JPEG, WebP ya da GIF yüklenebilir.";
  if (dosya.size > AZAMI_BOYUT) return "Dosya 4 MB'tan büyük olamaz.";

  const veri = Buffer.from(await dosya.arrayBuffer());
  let olcu;
  try {
    olcu = imageSize(veri);
  } catch {
    return "Dosya okunamadı; geçerli bir görsel değil.";
  }
  if (!olcu.width || !olcu.height) return "Görselin ölçüleri okunamadı.";

  const ad = dosya.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/^-+|-+$/g, "") || "gorsel";
  const blob = await put(`${KLASOR}/${ad}`, veri, {
    access: "public",
    addRandomSuffix: true,
    contentType: dosya.type,
  });
  return { src: blob.url, en: olcu.width, boy: olcu.height };
}

// Yalnız Blob'daki dosyalar silinir; public/ altındaki ilk görseller (/projeler/...) repoda durur.
export async function gorselSil(src: string) {
  if (src.startsWith("https://") && src.includes(".blob.vercel-storage.com/")) {
    await del(src);
  }
}
