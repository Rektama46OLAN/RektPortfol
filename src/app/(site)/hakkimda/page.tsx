import type { Metadata } from "next";
import Dakay from "@/components/Dakay";
import SayfaBasligi from "@/components/SayfaBasligi";
import { getProfil } from "@/lib/icerik";

export const metadata: Metadata = { title: "Hakkımda · RektPortfol" };

export default async function Hakkimda() {
  const profil = await getProfil();
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-12 px-4 py-12 sm:px-8 lg:grid-cols-[1fr_16rem] lg:items-center lg:py-20">
      <div>
        <SayfaBasligi etiket="Hakkımda" baslik={`Ben ${profil.kisa_ad}`} />
        <div className="mt-8 max-w-2xl space-y-5 text-lg leading-relaxed text-silver">
          {profil.hakkimda.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mt-10 text-sm font-semibold uppercase tracking-widest">Bana ulaşmak için</p>
        <a
          href={`mailto:${profil.eposta}`}
          className="mt-3 inline-block border-b border-iron pb-1 text-lg transition-colors hover:border-veil"
        >
          📧 {profil.eposta}
        </a>
      </div>
      <div className="relative mx-auto w-44 lg:w-full">
        <div
          className="absolute inset-[-15%] bg-[radial-gradient(closest-side,rgba(179,179,179,.3),transparent)]"
          aria-hidden
        />
        <Dakay className="relative w-full" zeminGolgesi="rgba(0,0,0,.45)" />
      </div>
    </section>
  );
}
