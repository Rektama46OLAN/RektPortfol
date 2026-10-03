import type { Metadata } from "next";
import Balon from "@/components/Balon";
import Dakay from "@/components/Dakay";
import { linkMi, pdfDosyaAdi } from "@/lib/cv";
import { getCv, getProfil, getSosyalLinkler, type CvKalem } from "@/lib/icerik";
import { dakayDer } from "@/lib/site";

export const metadata: Metadata = {
  title: "CV",
  description: "Arda Kaya özgeçmişi: deneyim, projeler, yetenekler ve diller. PDF olarak indirilebilir.",
  alternates: { canonical: "/cv" },
};

// CV masanın üstünde duran bir kâğıt: model sheet'in başlık bloğu + künye tablosu,
// bölüm başlıkları dar afiş harfle. Dakay kâğıdın kenarından gözlüğünü indirip okur.
// Uzun bölümler kapalı gelir (sayfa telefonda ~3200 px'ti); başlığa tıklayınca açılır.
// "PDF indir" /cv.pdf'i indirir: aynı veriden sunucuda üretilen dosya (const.md).

function Bolum({
  baslik,
  not,
  acik = false,
  children,
}: {
  baslik: string;
  not?: string;
  acik?: boolean;
  children: React.ReactNode;
}) {
  return (
    <details open={acik} className="group border-t border-cetvel">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 [&::-webkit-details-marker]:hidden">
        <span className="flex flex-wrap items-baseline gap-x-3">
          <h2 className="afis text-2xl tracking-wide">{baslik}</h2>
          {not && <span className="font-mono text-xs text-murekkep-2">{not}</span>}
        </span>
        <span
          aria-hidden
          className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-murekkep bg-kagit-2 font-mono text-lg leading-none transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>
      <div className="pb-7 md:pl-[13rem]">{children}</div>
    </details>
  );
}

function Kalemler({ kalemler }: { kalemler: CvKalem[] }) {
  return (
    <div className="space-y-8">
      {kalemler.map((k) => (
        <article key={k.id}>
          <h3 className="text-lg font-bold">{k.baslik}</h3>
          {k.alt && linkMi(k.alt) && <p className="mt-0.5 font-mono text-xs text-mavi">{k.alt}</p>}
          {k.teknolojiler && <p className="mt-1 text-sm text-murekkep-2">{k.teknolojiler}</p>}
          <ul className="mt-3 space-y-1.5">
            {k.maddeler.map((m) => (
              <li key={m} className="relative pl-5 before:absolute before:top-[0.6em] before:left-0 before:size-2 before:border-[1.5px] before:border-murekkep before:bg-turuncu">
                {m}
              </li>
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
  const kunye = [
    { ad: "Konum", deger: profil.cv_konum },
    { ad: "E-posta", deger: profil.eposta, href: `mailto:${profil.eposta}` },
    ...linkler.map((s) => ({ ad: s.etiket, deger: s.gorunen, href: s.href })),
  ];
  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-36 sm:px-8 sm:pt-32">
      <article className="relative border-2 border-murekkep bg-kagit px-5 pt-8 pb-2 shadow-sert sm:px-10 sm:pt-10">
        {/* Kâğıdın üst kenarından bakan Dakay */}
        <div aria-hidden className="absolute right-6 bottom-full flex items-end gap-1 sm:right-10">
          <Balon satirlar={dakayDer.cv} kuyruk="sag" className="mb-12" />
          <Dakay kirp="kafa" ifade="meh" gozlukIndi etiket="" className="w-36 translate-y-[3px]" />
        </div>

        <header className="border-b-2 border-murekkep pb-6">
          <p className="etiket text-[13px] text-mavi">Özgeçmiş · CV</p>
          <h1 className="afis mt-3 pt-[0.08em] text-[clamp(3rem,9vw,5.5rem)]">{profil.ad}</h1>
          <p className="mt-3 text-lg font-semibold">{profil.cv_unvan}</p>
          <a
            href="/cv.pdf"
            download={pdfDosyaAdi(profil.ad)}
            className="basilir mt-5 inline-block rounded-full border-2 border-murekkep bg-turuncu px-5 py-2.5 text-sm font-semibold"
          >
            PDF indir ↓
          </a>
          {/* Hücre çizgileri: aradaki 1.5px boşluktan mürekkep zemin görünür. Tek kalan son hücre iki sütuna yayılır. */}
          <dl className="mt-6 grid gap-[1.5px] border-[1.5px] border-murekkep bg-murekkep text-sm sm:grid-cols-2">
            {kunye.map((k) => (
              <div key={k.ad} className="min-w-0 bg-kagit px-3 py-2 sm:last:odd:col-span-2">
                <dt className="etiket text-[10px] text-murekkep-2">{k.ad}</dt>
                <dd className="truncate font-semibold">
                  {k.href ? (
                    <a href={k.href} className="underline decoration-cetvel decoration-2 underline-offset-4 hover:decoration-turuncu">
                      {k.deger}
                    </a>
                  ) : (
                    k.deger
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </header>

        <Bolum baslik="Hakkımda" acik>
          <p className="leading-relaxed">{profil.cv_hakkimda}</p>
        </Bolum>
        <Bolum baslik="Deneyim" not={`${cv.deneyim.length} kalem`}>
          <Kalemler kalemler={cv.deneyim} />
        </Bolum>
        <Bolum baslik="Projeler" not={`${cv.projeler.length} kalem`}>
          <Kalemler kalemler={cv.projeler} />
        </Bolum>
        <Bolum baslik="Yetenekler">
          <dl className="space-y-3">
            {cv.yetenekler.map((y) => (
              <div key={y.alan} className="sm:flex sm:gap-3">
                <dt className="etiket pt-1 text-[10px] text-mavi sm:w-28 sm:shrink-0">{y.alan}</dt>
                <dd>{y.deger}</dd>
              </div>
            ))}
          </dl>
        </Bolum>
        <Bolum baslik="Diller" acik>
          <p>{profil.cv_diller}</p>
        </Bolum>
      </article>
    </div>
  );
}
