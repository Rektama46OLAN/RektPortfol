import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
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
export const metadata: Metadata = {
  metadataBase: new URL("https://ardakaya.com"),
  title: { default: "Arda Kaya", template: "%s · Arda Kaya" },
  description: "Arda Kaya'nın kişisel portföyü: projeler, CV ve iletişim.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
