import Link from "next/link";
import { getProfil } from "@/lib/icerik";
import { menu } from "@/lib/site";

export default async function SiteHeader() {
  const profil = await getProfil();
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-4 py-6 sm:px-8">
      <Link href="/" className="text-lg font-semibold tracking-tight">
        <span className="text-fog">&lt;/&gt;</span> {profil.kisa_ad}
      </Link>
      <nav aria-label="Ana menü">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-silver">
          {menu.map((m) => (
            <li key={m.href}>
              <Link href={m.href} className="transition-colors hover:text-veil">
                {m.etiket}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
