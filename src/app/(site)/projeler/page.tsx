import type { Metadata } from "next";
import Image from "next/image";
import Balon from "@/components/Balon";
import Dakay from "@/components/Dakay";
import Panel from "@/components/Panel";
import SayfaBasligi from "@/components/SayfaBasligi";
import { getProjeler } from "@/lib/icerik";
import { dakayDer } from "@/lib/site";

export const metadata: Metadata = { title: "Projeler" };

// Her proje model sheet'te bir panel: üstte "PROJE 01" + ad, içeride görsel çerçevesi ve
// metin; geniş ekranda görsel bir solda bir sağda. Görseli olmayan projede Dakay durur.
export default async function Projeler() {
  const projeler = await getProjeler();
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-8 lg:pt-10">
      <SayfaBasligi
        etiket={`Bölüm 02 · ${projeler.length} proje`}
        baslik="Projeler"
        giris="Üzerinde çalıştığım işler, kullandığım teknolojilerle birlikte."
        yan={
          <div className="flex items-end gap-2 max-md:hidden">
            <Balon satirlar={dakayDer.projeler} kuyruk="sag" className="mb-24" />
            <Dakay ifade="sus" sag="hipR" sol="hipL" etiket="" className="nefes w-32" />
          </div>
        }
      />

      <ol className="mt-10 space-y-10">
        {projeler.map((p, sira) => (
          <Panel
            key={p.id}
            as="li"
            baslik={p.ad}
            not={`proje ${String(sira + 1).padStart(2, "0")}`}
            className="shadow-sert"
          >
            <div className={`grid lg:grid-cols-2 ${sira % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              {/* Görsel çerçeveyi boşluksuz doldurur, küçülmez ve kırpılmaz: çerçeve sabit bir oran
                  yerine görselin kendi oranını alır (Arda, 2026-10-03). Bu yüzden görsel sütunu kendi
                  boyunda kalır (self-start); iki sütun arasındaki çizgi metin sütununda durur ki
                  metin daha uzunsa da çizgi sonuna kadar insin. */}
              <div className={`bg-kagit-2 max-lg:border-b-2 max-lg:border-murekkep ${p.gorseller.length > 0 ? "lg:self-start" : ""}`}>
                {p.gorseller.length > 0 ? (
                  <div
                    className={`grid gap-0.5 bg-murekkep ${p.gorseller.length > 1 ? "grid-cols-[minmax(0,3fr)_minmax(0,1fr)]" : ""}`}
                  >
                    {p.gorseller.map((g, i) =>
                      i === 0 ? (
                        <Image
                          key={g.src}
                          src={g.src}
                          alt={g.alt}
                          width={g.en}
                          height={g.boy}
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          // İlk projenin görseli ekranın ilk açılışında görünür (LCP) — beklemeden yüklensin.
                          loading={sira === 0 ? "eager" : undefined}
                          className="block h-auto w-full"
                        />
                      ) : (
                        // Yandaki küçük görseller ilk görselin boyuna yayılır, taşan kısmı kırpılır.
                        <div key={g.src} className="relative min-h-full">
                          <Image src={g.src} alt={g.alt} fill sizes="25vw" className="object-cover object-top" />
                        </div>
                      ),
                    )}
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center gap-3 p-6 sm:aspect-[4/3] sm:flex-row sm:gap-2">
                    {/* Telefonda balon üstte, Dakay altında; genişte yan yana — yoksa 375 px'e sığmıyor. */}
                    <Balon satirlar={dakayDer.gorselYok} kuyruk="sag" className="sm:mb-32" />
                    <Dakay ifade="meh" gozlukIndi etiket="" className="nefes w-40" />
                  </div>
                )}
              </div>

              <div
                className={`flex flex-col border-murekkep p-5 sm:p-7 ${sira % 2 ? "lg:border-r-2" : "lg:border-l-2"}`}
              >
                <p className="text-lg leading-relaxed">{p.aciklama}</p>
                <p className="etiket mt-6 text-[10px] text-mavi">Teknolojiler</p>
                <ul className="mt-2 flex flex-wrap gap-2" aria-label="Teknolojiler">
                  {p.teknolojiler.map((t) => (
                    <li key={t} className="rounded-md border-[1.5px] border-murekkep bg-kagit-2 px-2.5 py-1 font-mono text-xs">
                      {t}
                    </li>
                  ))}
                </ul>
                {p.link && (
                  <a
                    href={p.link}
                    className="basilir mt-8 self-start rounded-full border-2 border-murekkep bg-turuncu px-5 py-2.5 text-sm font-semibold"
                  >
                    GitHub&apos;da gör →
                  </a>
                )}
              </div>
            </div>
          </Panel>
        ))}
      </ol>
    </div>
  );
}
