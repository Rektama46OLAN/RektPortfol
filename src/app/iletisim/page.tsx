import type { Metadata } from "next";
import SayfaBasligi from "@/components/SayfaBasligi";
import { getSosyalLinkler } from "@/lib/icerik";

export const metadata: Metadata = { title: "İletişim · RektPortfol" };

// const.md: form yok — ziyaretçi e-posta veya sosyal medyadan istediği gibi yazar.
export default async function Iletisim() {
  const sosyal = await getSosyalLinkler();
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 lg:py-20">
      <SayfaBasligi etiket="İletişim" baslik="Bana ulaş" />
      <ul className="mt-12 max-w-2xl divide-y divide-iron border-y border-iron">
        {sosyal.map((s) => (
          <li key={s.etiket}>
            <a
              href={s.href}
              className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-6 transition-colors hover:text-veil"
            >
              <span className="text-xs font-semibold uppercase tracking-widest">{s.etiket}</span>
              <span className="break-all text-lg text-silver group-hover:text-veil">{s.gorunen} →</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
