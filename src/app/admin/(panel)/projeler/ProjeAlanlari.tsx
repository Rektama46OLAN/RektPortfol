import { Alan } from "@/components/admin/Form";

export type ProjeSatiri = {
  id: number;
  ad: string;
  aciklama: string;
  teknolojiler: string[];
  link: string | null;
  sira: number;
};

// Yeni proje ve düzenleme formunun ortak alanları.
export default function ProjeAlanlari({ p }: { p?: ProjeSatiri }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-[1fr_8rem]">
        <Alan ad="ad" etiket="Proje adı" deger={p?.ad} />
        <Alan ad="sira" etiket="Sıra" deger={p?.sira ?? 0} tip="number" ipucu="Küçük olan önce." />
      </div>
      <Alan ad="aciklama" etiket="Açıklama" deger={p?.aciklama} cokSatir={4} />
      <Alan
        ad="teknolojiler"
        etiket="Teknolojiler"
        deger={p?.teknolojiler.join("\n")}
        cokSatir={5}
        ipucu="Her satıra bir teknoloji."
      />
      <Alan ad="link" etiket="Link (isteğe bağlı)" deger={p?.link} ipucu="https://… — boş bırakılırsa kartta link olmaz." />
    </div>
  );
}
