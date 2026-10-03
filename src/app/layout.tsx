import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { getProfil } from "@/lib/icerik";
import { kisaUnvan } from "@/lib/seo";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin", "latin-ext"],
  // Genişlik ekseni: afiş başlıkları aynı fontun dar hâliyle yazılır.
  axes: ["wdth"],
});

// Mono etiketler — Dakay'ın model sheet'indeki font.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
});

// Sitenin adı tek yerde; sayfalar yalnız kendi adını verir, şablon "CV · Arda Kaya" yapar.
// Açıklama unvanı panelden alır (kisaUnvan) — unvan değişince burası kendiliğinden değişir.
export async function generateMetadata(): Promise<Metadata> {
  const profil = await getProfil();
  return {
    metadataBase: new URL("https://ardakaya.com"),
    title: { default: profil.ad, template: `%s · ${profil.ad}` },
    description: `${profil.ad} — ${kisaUnvan(profil.cv_unvan)}. ${profil.hero_metin} Projeler, CV ve iletişim.`,
    // Paylaşım kartı: görsel app/opengraph-image.png'den otomatik eklenir.
    openGraph: { type: "website", locale: "tr_TR", siteName: profil.ad },
    twitter: { card: "summary_large_image" },
  };
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
