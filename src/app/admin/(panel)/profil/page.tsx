import { Alan, Bildirim, Kaydet } from "@/components/admin/Form";
import { adminGerekli } from "@/lib/admin";
import { sql } from "@/lib/db";
import type { Profil } from "@/lib/icerik";
import { profilKaydet } from "../../actions";

export default async function AdminProfil({ searchParams }: PageProps<"/admin/profil">) {
  await adminGerekli();
  // Admin her zaman güncel veriyi görür: önbelleksiz okuma.
  const [p] = (await sql`SELECT * FROM profil WHERE id = 1`) as Profil[];
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Profil</h1>
      <div className="mt-6">
        <Bildirim searchParams={searchParams} />
      </div>
      <form action={profilKaydet} className="space-y-8">
        <fieldset className="space-y-5">
          <legend className="mb-4 text-sm text-fog">Anasayfa ve Hakkımda</legend>
          <Alan ad="kisa_ad" etiket="Kısa ad" deger={p.kisa_ad} ipucu={`Logo ve "Ben ${p.kisa_ad}" başlığında.`} />
          <Alan ad="hero_metin" etiket="Anasayfa alt metni" deger={p.hero_metin} />
          <Alan ad="hakkimda_kisa" etiket="Anasayfa Hakkımda bloğu" deger={p.hakkimda_kisa} />
          <Alan
            ad="hakkimda"
            etiket="Hakkımda sayfası"
            deger={p.hakkimda.join("\n\n")}
            cokSatir={8}
            ipucu="Paragrafları boş bir satırla ayır."
          />
          <Alan ad="eposta" etiket="E-posta" deger={p.eposta} tip="email" />
        </fieldset>
        <fieldset className="space-y-5 border-t border-iron pt-8">
          <legend className="mb-4 text-sm text-fog">CV başlığı</legend>
          <Alan ad="ad" etiket="Ad soyad" deger={p.ad} />
          <Alan ad="cv_unvan" etiket="Unvan" deger={p.cv_unvan} />
          <Alan ad="cv_konum" etiket="Konum" deger={p.cv_konum} />
          <Alan ad="cv_hakkimda" etiket="CV Hakkımda" deger={p.cv_hakkimda} cokSatir={5} />
          <Alan ad="cv_diller" etiket="Diller" deger={p.cv_diller} />
        </fieldset>
        <Kaydet />
      </form>
    </section>
  );
}
