"use client";

import { useEffect } from "react";

// CV'nin PDF'i ayrı bir dosya değil: tarayıcının "PDF olarak kaydet"i, aynı sayfayı baskı
// düzeninde (globals.css → @media print) verir. Kapalı bölümler baskıda görünmez — baskıdan
// önce hepsi açılır, sonra kullanıcının bıraktığı hâle döner. Ctrl+P de aynı yoldan geçer.
export default function PdfButonu() {
  useEffect(() => {
    let kapalilar: HTMLDetailsElement[] = [];
    const ac = () => {
      kapalilar = [...document.querySelectorAll<HTMLDetailsElement>("details:not([open])")];
      kapalilar.forEach((d) => (d.open = true));
    };
    const geriAl = () => kapalilar.forEach((d) => (d.open = false));
    window.addEventListener("beforeprint", ac);
    window.addEventListener("afterprint", geriAl);
    return () => {
      window.removeEventListener("beforeprint", ac);
      window.removeEventListener("afterprint", geriAl);
    };
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="basilir rounded-full border-2 border-murekkep bg-turuncu px-5 py-2.5 text-sm font-semibold"
    >
      PDF indir ↓
    </button>
  );
}
