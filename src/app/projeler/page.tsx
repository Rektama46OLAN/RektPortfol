import type { Metadata } from "next";
import Image from "next/image";
import SayfaBasligi from "@/components/SayfaBasligi";
import { getProjeler } from "@/lib/icerik";

export const metadata: Metadata = { title: "Projeler · RektPortfol" };

export default async function Projeler() {
  const projeler = await getProjeler();
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-8 lg:py-20">
      <SayfaBasligi etiket="Projeler" baslik="Üzerinde çalıştığım işler" />
      <ul className="mt-12 grid gap-8 md:grid-cols-2">
        {projeler.map((p) => (
          <li key={p.id} className="flex flex-col overflow-hidden rounded-lg border border-iron bg-ink/40">
            {p.gorseller.length > 0 && (
              <div className={`grid gap-px bg-iron ${p.gorseller.length > 1 ? "grid-cols-[minmax(0,3fr)_minmax(0,1fr)]" : ""}`}>
                {p.gorseller.map((g, i) => (
                  // Oranı ilk görsel belirler; yanındakiler o satırın yüksekliğine yayılır.
                  <div
                    key={g.src}
                    className={`relative flex items-center justify-center bg-ink ${i === 0 ? "aspect-[4/3]" : "h-full"}`}
                  >
                    <Image
                      src={g.src}
                      alt={g.alt}
                      width={g.en}
                      height={g.boy}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <h2 className="text-2xl font-semibold tracking-tight">{p.ad}</h2>
              <p className="mt-3 leading-relaxed text-silver">{p.aciklama}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Teknolojiler">
                {p.teknolojiler.map((t) => (
                  <li key={t} className="rounded-full border border-iron px-3 py-1 text-xs text-silver">
                    {t}
                  </li>
                ))}
              </ul>
              {p.link && (
                <a
                  href={p.link}
                  className="mt-6 self-start border-b border-iron pb-1 text-xs font-semibold uppercase tracking-wider transition-colors hover:border-veil"
                >
                  GitHub →
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
