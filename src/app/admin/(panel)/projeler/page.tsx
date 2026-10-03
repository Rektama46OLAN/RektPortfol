import Link from "next/link";
import { Bildirim, Kaydet } from "@/components/admin/Form";
import { adminGerekli } from "@/lib/admin";
import { sql } from "@/lib/db";
import { projeEkle } from "../../projeler-actions";
import ProjeAlanlari from "./ProjeAlanlari";

export default async function AdminProjeler({ searchParams }: PageProps<"/admin/projeler">) {
  await adminGerekli();
  const projeler = await sql`
    SELECT p.id, p.ad, p.sira, count(g.id)::int AS gorsel
    FROM projeler p LEFT JOIN proje_gorselleri g ON g.proje_id = p.id
    GROUP BY p.id ORDER BY p.sira, p.id`;
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Projeler</h1>
      <div className="mt-6">
        <Bildirim searchParams={searchParams} />
      </div>
      <ul className="divide-y divide-iron border-y border-iron">
        {projeler.map((p) => (
          <li key={p.id}>
            <Link
              href={`/admin/projeler/${p.id}`}
              className="flex items-baseline justify-between gap-4 py-4 transition-colors hover:text-veil"
            >
              <span className="font-semibold">{p.ad}</span>
              <span className="text-sm text-fog">
                sıra {p.sira} · {p.gorsel} görsel · düzenle →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <form action={projeEkle} className="mt-10 space-y-5 border-t border-iron pt-8">
        <h2 className="text-lg font-semibold">Yeni proje</h2>
        <ProjeAlanlari />
        <p className="text-xs text-fog">Görselleri, proje oluşturulduktan sonra açılan sayfadan eklersin.</p>
        <Kaydet metin="Projeyi ekle" />
      </form>
    </section>
  );
}
