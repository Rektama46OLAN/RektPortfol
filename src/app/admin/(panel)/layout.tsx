import Link from "next/link";
import { cikisYap } from "../actions";

const menu = [
  { href: "/admin", etiket: "Özet" },
  { href: "/admin/profil", etiket: "Profil" },
  { href: "/admin/linkler", etiket: "Linkler" },
];

export default function PanelLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-8">
      <nav aria-label="Yönetim menüsü" className="flex flex-wrap items-center justify-between gap-4">
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-silver">
          {menu.map((m) => (
            <li key={m.href}>
              <Link href={m.href} className="hover:text-veil">
                {m.etiket}
              </Link>
            </li>
          ))}
        </ul>
        <form action={cikisYap}>
          <button type="submit" className="text-sm text-fog hover:text-veil">
            Çıkış yap
          </button>
        </form>
      </nav>
      <div className="mt-10">{children}</div>
    </div>
  );
}
