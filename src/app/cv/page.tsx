import type { Metadata } from "next";
import SayfaBasligi from "@/components/SayfaBasligi";
import { cv, eposta, sosyal, type CvKalem } from "@/lib/site";

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
        <article key={k.baslik}>
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

export default function Cv() {
  const github = sosyal.find((s) => s.etiket === "GitHub")!;
  const linkedin = sosyal.find((s) => s.etiket === "LinkedIn")!;
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-12 sm:px-8 lg:py-20">
      <SayfaBasligi etiket="CV" baslik={cv.ad} />
      <p className="mt-4 text-lg text-silver">{cv.unvan}</p>
      <p className="mt-1 text-silver">{cv.konum}</p>
      <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-silver">
        <li>
          <a href={`mailto:${eposta}`} className="hover:text-veil">{eposta}</a>
        </li>
        <li>
          <a href={github.href} className="hover:text-veil">{github.gorunen}</a>
        </li>
        <li>
          <a href={linkedin.href} className="hover:text-veil">{linkedin.gorunen}</a>
        </li>
      </ul>

      <div className="mt-12">
        <Bolum baslik="Hakkımda">
          <p className="leading-relaxed text-silver">{cv.hakkimda}</p>
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
          <p className="text-silver">{cv.diller}</p>
        </Bolum>
      </div>
    </div>
  );
}
