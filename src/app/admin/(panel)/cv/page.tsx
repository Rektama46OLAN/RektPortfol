import Link from "next/link";
import { Alan, Bildirim, Kaydet } from "@/components/admin/Form";
import SilButonu from "@/components/admin/SilButonu";
import { adminGerekli } from "@/lib/admin";
import { sql } from "@/lib/db";
import { kalemEkle, kalemGuncelle, kalemSil, yetenekEkle, yetenekGuncelle, yetenekSil } from "../../cv-actions";

type Kalem = {
  id: number;
  bolum: "deneyim" | "proje";
  baslik: string;
  alt: string | null;
  teknolojiler: string | null;
  maddeler: string[];
  sira: number;
};
type Yetenek = { id: number; alan: string; deger: string; sira: number };

function KalemAlanlari({ k }: { k?: Kalem }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-[1fr_10rem_6rem]">
        <Alan ad="baslik" etiket="Başlık" deger={k?.baslik} ipucu="Örn. DakLink · Video indirme uygulaması" />
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-widest">Bölüm</span>
          <select
            name="bolum"
            defaultValue={k?.bolum ?? "proje"}
            className="mt-2 w-full rounded border border-iron bg-ink px-3 py-2 text-veil"
          >
            <option value="deneyim">Deneyim</option>
            <option value="proje">Projeler</option>
          </select>
        </label>
        <Alan ad="sira" etiket="Sıra" deger={k?.sira ?? 0} tip="number" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Alan ad="alt" etiket="Alt satır (isteğe bağlı)" deger={k?.alt} ipucu="Tarih ya da link" />
        <Alan ad="teknolojiler" etiket="Teknolojiler (isteğe bağlı)" deger={k?.teknolojiler} />
      </div>
      <Alan ad="maddeler" etiket="Maddeler" deger={k?.maddeler.join("\n")} cokSatir={4} ipucu="Her satıra bir madde." />
    </div>
  );
}

function YetenekAlanlari({ y }: { y?: Yetenek }) {
  return (
    <div className="grid gap-4 sm:grid-cols-[10rem_1fr_6rem]">
      <Alan ad="alan" etiket="Alan" deger={y?.alan} ipucu="Örn. Diller" />
      <Alan ad="deger" etiket="Değer" deger={y?.deger} />
      <Alan ad="sira" etiket="Sıra" deger={y?.sira ?? 0} tip="number" />
    </div>
  );
}

export default async function AdminCv({ searchParams }: PageProps<"/admin/cv">) {
  await adminGerekli();
  const [kalemler, yetenekler] = (await Promise.all([
    sql`SELECT id, bolum, baslik, alt, teknolojiler, maddeler, sira FROM cv_kalemleri ORDER BY bolum, sira, id`,
    sql`SELECT id, alan, deger, sira FROM cv_yetenekler ORDER BY sira, id`,
  ])) as [Kalem[], Yetenek[]];

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">CV</h1>
      <p className="mt-2 text-sm text-silver">
        CV başlığı, Hakkımda ve Diller satırı <Link href="/admin/profil" className="underline">Profil</Link>&apos;de.
      </p>
      <div className="mt-6">
        <Bildirim searchParams={searchParams} />
      </div>

      <h2 className="text-lg font-semibold">Deneyim ve projeler</h2>
      <ul className="mt-4 space-y-6">
        {kalemler.map((k) => (
          <li key={k.id} className="rounded-lg border border-iron p-5">
            <form action={kalemGuncelle} className="space-y-4">
              <input type="hidden" name="id" value={k.id} />
              <KalemAlanlari k={k} />
              <div className="flex items-center gap-4">
                <Kaydet />
                <SilButonu action={kalemSil} soru={`"${k.baslik}" silinsin mi?`} />
              </div>
            </form>
          </li>
        ))}
      </ul>
      <form action={kalemEkle} className="mt-6 space-y-4 rounded-lg border border-dashed border-iron p-5">
        <h3 className="font-semibold">Yeni kalem</h3>
        <KalemAlanlari />
        <Kaydet metin="Ekle" />
      </form>

      <h2 className="mt-12 border-t border-iron pt-8 text-lg font-semibold">Yetenekler</h2>
      <ul className="mt-4 space-y-4">
        {yetenekler.map((y) => (
          <li key={y.id} className="rounded-lg border border-iron p-4">
            <form action={yetenekGuncelle} className="space-y-3">
              <input type="hidden" name="id" value={y.id} />
              <YetenekAlanlari y={y} />
              <div className="flex items-center gap-4">
                <Kaydet />
                <SilButonu action={yetenekSil} soru={`"${y.alan}" silinsin mi?`} />
              </div>
            </form>
          </li>
        ))}
      </ul>
      <form action={yetenekEkle} className="mt-6 space-y-3 rounded-lg border border-dashed border-iron p-5">
        <h3 className="font-semibold">Yeni yetenek</h3>
        <YetenekAlanlari />
        <Kaydet metin="Ekle" />
      </form>
    </section>
  );
}
