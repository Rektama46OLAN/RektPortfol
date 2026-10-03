import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Alan, Bildirim, Kaydet } from "@/components/admin/Form";
import SilButonu from "@/components/admin/SilButonu";
import { adminGerekli } from "@/lib/admin";
import { sql } from "@/lib/db";
import { gorselEkle, gorselGuncelle, gorselKaldir, projeGuncelle, projeSil } from "../../../projeler-actions";
import ProjeAlanlari, { type ProjeSatiri } from "../ProjeAlanlari";

type GorselSatiri = { id: number; src: string; alt: string; en: number; boy: number; sira: number };

export default async function AdminProje({ params, searchParams }: PageProps<"/admin/projeler/[id]">) {
  await adminGerekli();
  const id = Number((await params).id);
  if (!Number.isInteger(id)) notFound();
  const [p] = (await sql`SELECT id, ad, aciklama, teknolojiler, link, sira FROM projeler WHERE id = ${id}`) as ProjeSatiri[];
  if (!p) notFound();
  const gorseller = (await sql`
    SELECT id, src, alt, en, boy, sira FROM proje_gorselleri
    WHERE proje_id = ${id} ORDER BY sira, id`) as GorselSatiri[];

  return (
    <section>
      <Link href="/admin/projeler" className="text-sm text-fog hover:text-veil">
        ← Projeler
      </Link>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">{p.ad}</h1>
      <div className="mt-6">
        <Bildirim searchParams={searchParams} />
      </div>

      <form action={projeGuncelle} className="space-y-5">
        <input type="hidden" name="id" value={p.id} />
        <ProjeAlanlari p={p} />
        <div className="flex items-center gap-4">
          <Kaydet />
          <SilButonu action={projeSil} soru={`"${p.ad}" projesi ve bütün görselleri silinsin mi?`} etiket="Projeyi sil" />
        </div>
      </form>

      <div className="mt-12 border-t border-iron pt-8">
        <h2 className="text-lg font-semibold">Görseller</h2>
        <p className="mt-1 text-sm text-fog">İlk sıradaki görsel kartın ana görseli olur.</p>
        <ul className="mt-6 space-y-6">
          {gorseller.map((g) => (
            <li key={g.id} className="grid gap-5 rounded-lg border border-iron p-4 sm:grid-cols-[10rem_1fr]">
              <div className="flex aspect-[4/3] items-center justify-center bg-ink">
                <Image src={g.src} alt={g.alt} width={g.en} height={g.boy} sizes="10rem" className="h-full w-full object-contain" />
              </div>
              <form action={gorselGuncelle} className="space-y-4">
                <input type="hidden" name="id" value={g.id} />
                <input type="hidden" name="proje_id" value={p.id} />
                <Alan ad="alt" etiket="Açıklama (alt metni)" deger={g.alt} />
                <Alan ad="sira" etiket="Sıra" deger={g.sira} tip="number" />
                <div className="flex items-center gap-4">
                  <Kaydet />
                  <SilButonu action={gorselKaldir} soru="Bu görsel silinsin mi?" />
                </div>
              </form>
            </li>
          ))}
        </ul>

        <form action={gorselEkle} className="mt-8 space-y-4 rounded-lg border border-dashed border-iron p-5">
          <h3 className="font-semibold">Görsel ekle</h3>
          <input type="hidden" name="proje_id" value={p.id} />
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-widest">Dosya</span>
            <input
              type="file"
              name="dosya"
              accept="image/png,image/jpeg,image/webp,image/gif"
              required
              className="mt-2 block w-full text-sm text-silver file:mr-4 file:rounded-full file:border-0 file:bg-iron file:px-4 file:py-2 file:text-veil"
            />
            <span className="mt-1 block text-xs text-fog">PNG, JPEG, WebP ya da GIF; en fazla 4 MB.</span>
          </label>
          <Alan ad="alt" etiket="Açıklama (alt metni)" ipucu="Görselde ne var? Ekran okuyucular bunu okur." />
          <Alan ad="sira" etiket="Sıra" deger={gorseller.length + 1} tip="number" />
          <Kaydet metin="Yükle" />
        </form>
      </div>
    </section>
  );
}
