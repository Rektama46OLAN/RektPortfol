// Sitenin yapısı (içerik değil). İçerik veritabanında: src/lib/icerik.ts.

export const menu = [
  { href: "/hakkimda", etiket: "Hakkımda" },
  { href: "/projeler", etiket: "Projeler" },
  { href: "/cv", etiket: "CV" },
  { href: "/iletisim", etiket: "İletişim" },
];

// Dakay'ın repliği: sitenin süsü, Arda hakkında bilgi değil. Karakter notuna uyar —
// kısa cümleler, az konuşur, bir şeyi onaylamak için kaş kaldırması yeter.
export const dakayDer = {
  anasayfa: ["Ben Dakay.", "Arda'nın işlerini ben gösteririm."],
  hakkimda: ["Okuyun.", "Ben onayladım."],
  projeler: ["Hepsine baktım."],
  gorselYok: ["Görsel yok.", "Ben buradayım ama."],
  cv: ["Okudum.", "Fena değil."],
  iletisim: ["Yaz.", "Cevap gelir."],
  bulunamadi: ["Burada bir şey yok.", "Ben de baktım."],
};
