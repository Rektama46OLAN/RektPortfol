// CV'nin sayfa (/cv) ve PDF (/cv.pdf) hâllerinin ortak kuralları.

// "alt" alanı hem tarih ("Eylül 2026") hem link ("github.com/…") taşıyor; Arda tarihlerin
// görünmesini istemedi (2026-10-03) — yalnız link gibi duranlar gösterilir.
export const linkMi = (s: string) => !/\s/.test(s) && s.includes(".");

// İndirilen dosyanın adı: "Arda Kaya" → "Arda-Kaya-CV.pdf". Türkçe harfler ASCII'ye çevrilir,
// Content-Disposition başlığında sorun çıkmasın.
export function pdfDosyaAdi(ad: string) {
  const ascii = ad
    .replace(/[çÇ]/g, (h) => (h === "ç" ? "c" : "C"))
    .replace(/[ğĞ]/g, (h) => (h === "ğ" ? "g" : "G"))
    .replace(/[ıİ]/g, (h) => (h === "ı" ? "i" : "I"))
    .replace(/[öÖ]/g, (h) => (h === "ö" ? "o" : "O"))
    .replace(/[şŞ]/g, (h) => (h === "ş" ? "s" : "S"))
    .replace(/[üÜ]/g, (h) => (h === "ü" ? "u" : "U"))
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${ascii || "CV"}-CV.pdf`;
}
