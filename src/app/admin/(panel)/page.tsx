import Link from "next/link";
import { adminGerekli } from "@/lib/admin";
import { sql } from "@/lib/db";

export default async function AdminOzet() {
  await adminGerekli();
  const [{ projeler, linkler, kalemler }] = await sql`
    SELECT (SELECT count(*) FROM projeler)::int       AS projeler,
           (SELECT count(*) FROM sosyal_linkler)::int AS linkler,
           (SELECT count(*) FROM cv_kalemleri)::int   AS kalemler`;
  const kartlar = [
    { href: "/admin/profil", baslik: "Profil", metin: "Ad, hero metni, hakkımda, e-posta ve CV başlığı" },
    { href: "/admin/linkler", baslik: "Linkler", metin: `${linkler} sosyal link` },
  ];
  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight">Hoş geldin</h1>
      <p className="mt-2 text-silver">
        Sitede {projeler} proje, {kalemler} CV kalemi var. Projeler ve CV düzenleme Faz 3b-2&apos;de gelecek.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {kartlar.map((k) => (
          <li key={k.href}>
            <Link href={k.href} className="block rounded-lg border border-iron p-5 transition-colors hover:border-silver">
              <span className="text-lg font-semibold">{k.baslik} →</span>
              <span className="mt-1 block text-sm text-silver">{k.metin}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
