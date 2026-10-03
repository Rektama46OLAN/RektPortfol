import type { Metadata } from "next";
import SayfaBasligi from "@/components/SayfaBasligi";
import { getCv, getProfil, getSosyalLinkler, type CvKalem } from "@/lib/icerik";

export const metadata: Metadata = { title: "CV · RektPortfol" };

function Bolum({ baslik, children }: { baslik: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-iron py-10 md:grid-cols-[12rem_1fr] md:gap-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-fog">{baslik}</h2>
      <div>{children}</div>
    </section>
  );
}

function Kalemler({ kalemler }: { kalemler: CvKalem[] }) {
  return (
    <div className="space-y-8">
      {kalemler.map((k) => (
        <article key={k.id}>
          <h3 className="text-lg font-semibold">{k.baslik}</h3>
          {k.alt && <p className="mt-1 text-sm text-fog">{k.alt}</p>}
          {k.teknolojiler && <p className="mt-1 text-sm text-silver">{k.teknolojiler}</p>}
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-silver marker:text-fog">
            {k.maddeler.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export default async function Cv() {
  const [profil, sosyal, cv] = await Promise.all([getProfil(), getSosyalLinkler(), getCv()]);
  // E-posta profilden gelir; sosyal listedeki mailto: kaydı tekrar olmasın diye atlanır.
  const linkler = sosyal.filter((s) => !s.href.startsWith("mailto:"));
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-8 lg:py-20">
      <SayfaBasligi etiket="CV" baslik={profil.ad} />
      <p className="mt-4 text-lg text-silver">{profil.cv_unvan}</p>
      <p className="mt-1 text-silver">{profil.cv_konum}</p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-silver">
        <li>
          <a href={`mailto:${profil.eposta}`} className="hover:text-veil">
            {profil.eposta}
          </a>
        </li>
        {linkler.map((s) => (
          <li key={s.href}>
            <a href={s.href} className="hover:text-veil">
              {s.gorunen}
            </a>
          </li>
        ))}
      </ul>

      <div className="mt-12">
        <Bolum baslik="Hakkımda">
          <p className="leading-relaxed text-silver">{profil.cv_hakkimda}</p>
        </Bolum>
        <Bolum baslik="Deneyim">
          <Kalemler kalemler={cv.deneyim} />
        </Bolum>
        <Bolum baslik="Projeler">
          <Kalemler kalemler={cv.projeler} />
        </Bolum>
        <Bolum baslik="Yetenekler">
          <dl className="space-y-2">
            {cv.yetenekler.map((y) => (
              <div key={y.alan} className="sm:flex sm:gap-3">
                <dt className="font-semibold sm:w-28 sm:shrink-0">{y.alan}</dt>
                <dd className="text-silver">{y.deger}</dd>
              </div>
            ))}
          </dl>
        </Bolum>
        <Bolum baslik="Diller">
          <p className="text-silver">{profil.cv_diller}</p>
        </Bolum>
      </div>
    </div>
  );
}
