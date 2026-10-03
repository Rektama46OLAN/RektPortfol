import Link from "next/link";
import Balon from "@/components/Balon";
import Dakay from "@/components/Dakay";
import { dakayDer } from "@/lib/site";

// 404 — ziyaretçi sitesinin kâğıt dilinde; Dakay şaşkın.
export default function BulunamadiSayfasi() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 bg-masa px-4 py-16 text-center text-murekkep">
      <p className="etiket text-[13px] text-mavi">Hata · 404</p>
      <h1 className="afis text-[clamp(4rem,14vw,9rem)]">Sayfa yok</h1>
      <div className="flex items-end gap-2">
        <Balon satirlar={dakayDer.bulunamadi} kuyruk="sag" className="mb-20 text-left" />
        <Dakay ifade="shock" sol="pointL" etiket="" className="w-32" />
      </div>
      <Link href="/" className="basilir rounded-full border-2 border-murekkep bg-turuncu px-6 py-3 font-semibold">
        Anasayfaya dön →
      </Link>
    </main>
  );
}
