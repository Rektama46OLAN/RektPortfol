import type { Metadata } from "next";
import Balon from "@/components/Balon";
import Dakay from "@/components/Dakay";
import SayfaBasligi from "@/components/SayfaBasligi";
import { getSosyalLinkler } from "@/lib/icerik";
import { dakayDer } from "@/lib/site";

export const metadata: Metadata = { title: "İletişim · RektPortfol" };

// const.md: form yok — ziyaretçi e-posta veya sosyal medyadan istediği gibi yazar.
export default async function Iletisim() {
  const sosyal = await getSosyalLinkler();
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-8 lg:pt-10">
      <SayfaBasligi etiket="Bölüm 04 · İletişim" baslik="Bana ulaş" giris="Form yok. Nereden istersen oradan yaz." />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <ul className="space-y-5">
          {sosyal.map((s, i) => (
            <li key={s.etiket}>
              <a
                href={s.href}
                className="basilir group grid items-center gap-x-6 gap-y-1 border-2 border-murekkep bg-kagit p-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:p-6"
              >
                <span className="etiket text-mavi">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0">
                  <span className="afis block text-5xl sm:text-6xl">{s.etiket}</span>
                  <span className="mt-1 block font-mono text-sm break-all text-murekkep-2">{s.gorunen}</span>
                </span>
                <span
                  aria-hidden
                  className="mt-3 inline-flex size-12 items-center justify-center rounded-full border-2 border-murekkep bg-turuncu text-xl transition-transform group-hover:translate-x-1 sm:mt-0"
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-end justify-center gap-2 self-start pt-12 pl-8 lg:pt-6 lg:pl-0">
          <Balon satirlar={dakayDer.iletisim} kuyruk="sag" className="mb-44 origin-bottom-right scale-120" />
          <Dakay ifade="def" sol="hipL" sag="hipR" etiket="" className="nefes w-48" />
        </div>
      </div>
    </div>
  );
}
