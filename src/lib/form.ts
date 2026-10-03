// Admin Server Action'larının ortak form yardımcıları.
import { redirect } from "next/navigation";

export function metin(form: FormData, alan: string) {
  return String(form.get(alan) ?? "").trim();
}

// Boş olabilir alan → null.
export function metinYaDaNull(form: FormData, alan: string) {
  return metin(form, alan) || null;
}

// Boş satırla ayrılmış paragraflar → dizi (paragraf içindeki tek satır sonları birleşir).
export function paragraflar(form: FormData, alan: string) {
  return metin(form, alan)
    .split(/\r?\n\s*\r?\n/)
    .map((p) => p.replace(/\s*\r?\n\s*/g, " ").trim())
    .filter(Boolean);
}

// Her satır bir öğe → dizi.
export function satirlar(form: FormData, alan: string) {
  return metin(form, alan)
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function tamSayi(form: FormData, alan: string) {
  const s = metin(form, alan);
  const n = Number(s || 0);
  return Number.isInteger(n) ? n : NaN;
}

export function hataIle(yol: string, mesaj: string): never {
  redirect(`${yol}?hata=${encodeURIComponent(mesaj)}`);
}

export function linkGecerliMi(href: string) {
  return /^https:\/\/\S+$/.test(href) || /^mailto:[^\s@]+@[^\s@]+$/.test(href);
}
