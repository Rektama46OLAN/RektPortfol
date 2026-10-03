import type { Metadata } from "next";
import Balon from "@/components/Balon";
import Dakay from "@/components/Dakay";
import Panel from "@/components/Panel";
import SayfaBasligi from "@/components/SayfaBasligi";
import { getProfil } from "@/lib/icerik";
import { dakayDer } from "@/lib/site";

export const metadata: Metadata = { title: "Hakkımda" };

export default async function Hakkimda() {
  const profil = await getProfil();
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-8 lg:pt-10">
      <SayfaBasligi etiket="Bölüm 01 · Hakkımda" baslik={`Ben ${profil.kisa_ad}`} />

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <Panel className="flex flex-col">
          <div className="space-y-5 p-5 text-lg leading-relaxed sm:p-7">
            {profil.hakkimda.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="flex-1 border-t-2 border-murekkep bg-kagit-2 p-5 sm:px-7">
            <p className="etiket text-[10px] text-murekkep-2">Bana ulaşmak için</p>
            <a
              href={`mailto:${profil.eposta}`}
              className="basilir mt-3 inline-block rounded-full border-2 border-murekkep bg-turuncu px-5 py-2.5 font-semibold break-all"
            >
              {profil.eposta} →
            </a>
          </div>
        </Panel>

        <div className="flex items-end justify-center gap-2 self-start lg:pt-6">
          <Balon satirlar={dakayDer.hakkimda} kuyruk="sag" className="mb-36" />
          <Dakay ifade="sus" sol="pointL" etiket="" className="nefes w-40" />
        </div>
      </div>
    </div>
  );
}
