import { Alan, Bildirim, Kaydet } from "@/components/admin/Form";
import { adminGerekli } from "@/lib/admin";
import { sql } from "@/lib/db";
import { linkEkle, linkGuncelle, linkSil } from "../../actions";

type Link = { id: number; etiket: string; href: string; gorunen: string; sira: number };

function LinkAlanlari({ l }: { l?: Link }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Alan ad="etiket" etiket="Etiket" deger={l?.etiket} ipucu="Örn. GitHub" />
      <Alan ad="gorunen" etiket="Görünen metin" deger={l?.gorunen} ipucu="Örn. github.com/kullanici" />
      <Alan ad="href" etiket="Adres" deger={l?.href} ipucu="https://… ya da mailto:…" />
      <Alan ad="sira" etiket="Sıra" deger={l?.sira ?? 0} tip="number" ipucu="Küçük olan önce gelir." />
    </div>
  );
}

export default async function AdminLinkler({ searchParams }: PageProps<"/admin/linkler">) {
  await adminGerekli();
  const linkler = (await sql`SELECT id, etiket, href, gorunen, sira FROM sosyal_linkler ORDER BY sira, id`) as Link[];
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Linkler</h1>
      <p className="mt-2 text-sm text-silver">Footer&apos;da, anasayfada, İletişim ve CV sayfalarında görünür.</p>
      <div className="mt-6">
        <Bildirim searchParams={searchParams} />
      </div>

      <ul className="space-y-6">
        {linkler.map((l) => (
          <li key={l.id} className="rounded-lg border border-iron p-5">
            <form action={linkGuncelle} className="space-y-4">
              <input type="hidden" name="id" value={l.id} />
              <LinkAlanlari l={l} />
              <div className="flex items-center gap-4">
                <Kaydet />
                <button
                  formAction={linkSil}
                  className="text-sm text-fog hover:text-veil"
                  aria-label={`${l.etiket} linkini sil`}
                >
                  Sil
                </button>
              </div>
            </form>
          </li>
        ))}
      </ul>

      <form action={linkEkle} className="mt-10 space-y-4 border-t border-iron pt-8">
        <h2 className="text-lg font-semibold">Yeni link</h2>
        <LinkAlanlari />
        <Kaydet metin="Ekle" />
      </form>
    </section>
  );
}
