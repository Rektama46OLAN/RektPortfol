// Admin oturumu (const.md: tek kullanıcı, şifre ADMIN_SIFRE env değişkeninde).
// Oturum çerezi = "<bitiş zamanı>.<HMAC imzası>". Kullanıcı tablosu yok; imza anahtarı
// şifreden türetilir, bu yüzden şifre değişince bütün açık oturumlar kendiliğinden düşer.
import { createHash, createHmac, timingSafeEqual } from "node:crypto";

export const OTURUM_CEREZI = "admin_oturum";
export const OTURUM_SURESI_SN = 60 * 60 * 24 * 7; // 7 gün

export const DENEME_SINIRI = 5;
export const KILIT_DAKIKA = 15;

function sifre() {
  const s = process.env.ADMIN_SIFRE;
  if (!s) throw new Error("ADMIN_SIFRE tanımlı değil");
  return s;
}

function anahtar() {
  return createHash("sha256").update(`rektportfol-oturum:${sifre()}`).digest();
}

function imzala(veri: string) {
  return createHmac("sha256", anahtar()).update(veri).digest("base64url");
}

// Sabit süreli karşılaştırma: yanlış şifrenin kaç karakterinin doğru olduğu süreden anlaşılmasın.
function esit(a: string, b: string) {
  const x = createHash("sha256").update(a).digest();
  const y = createHash("sha256").update(b).digest();
  return timingSafeEqual(x, y);
}

export function sifreDogruMu(girilen: string) {
  return esit(girilen, sifre());
}

export function oturumOlustur() {
  const bitis = Math.floor(Date.now() / 1000) + OTURUM_SURESI_SN;
  return `${bitis}.${imzala(String(bitis))}`;
}

export function oturumGecerliMi(cerez: string | undefined) {
  if (!cerez) return false;
  const [bitis, imza] = cerez.split(".");
  if (!bitis || !imza) return false;
  if (!esit(imza, imzala(bitis))) return false;
  return Number(bitis) > Date.now() / 1000;
}
