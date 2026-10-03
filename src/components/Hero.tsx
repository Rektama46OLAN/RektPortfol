import Link from "next/link";
import Dakay from "@/components/Dakay";
import { sosyal } from "@/lib/site";

// Tema koyu (const.md). Dakay ve siyah vurgu noir zeminde kaybolduğu için
// Dakay'ın arkasında hale, butonda açık kenar var.

const bloklar = [
  {
    baslik: "Hakkımda",
    metin: "Backend tarafında kendini geliştiren bir yazılımcıyım.",
    href: "/hakkimda",
    link: "Devamını oku",
  },
  {
    baslik: "Projelerim",
    metin: "Üzerinde çalıştığım işler, kullandığım teknolojilerle birlikte.",
    href: "/projeler",
    link: "Projelere göz at",
  },
];

export default function Hero() {
  return (
    <section className="bg-noir text-veil">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-8 lg:grid-cols-[1fr_minmax(0,22rem)_14rem] lg:items-center lg:gap-8 lg:py-20">
        <div className="lg:relative lg:z-10">
          <span className="block h-1 w-16 bg-veil" aria-hidden />
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Ben Arda,
            <br />
            backend geliştirici
          </h1>
          <p className="mt-5 max-w-sm text-silver">
            Sağlam, okunur ve sade sunucu tarafı kod yazmayı seviyorum.
          </p>
          <Link
            href="/hakkimda"
            aria-label="Hakkımda sayfasına git"
            className="mt-8 inline-flex size-14 items-center justify-center rounded-full bg-ink text-veil ring-1 ring-silver"
          >
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
              <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="relative mx-auto w-56 sm:w-64 lg:w-full">
          <div
            className="absolute inset-[-15%] bg-[radial-gradient(closest-side,rgba(179,179,179,.35),transparent)]"
            aria-hidden
          />
          <Dakay className="relative w-full" zeminGolgesi="rgba(0,0,0,.45)" />
        </div>

        <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-1">
          {bloklar.map((b) => (
            <div key={b.href}>
              <h2 className="text-xs font-semibold uppercase tracking-widest">{b.baslik}</h2>
              <p className="mt-3 text-sm text-silver">{b.metin}</p>
              <Link
                href={b.href}
                className="mt-3 inline-block border-b border-iron pb-1 text-xs font-semibold uppercase tracking-wider"
              >
                {b.link} →
              </Link>
            </div>
          ))}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest">Beni takip et</h2>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-silver">
              {sosyal.map((s) => (
                <li key={s.etiket}>
                  <a href={s.href} className="hover:underline">
                    {s.etiket}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
