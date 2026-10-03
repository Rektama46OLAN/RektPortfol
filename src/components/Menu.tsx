"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { menu } from "@/lib/site";

// Hap menü: bulunulan sayfa ve üstüne gelinen buton turuncu dolgulu. Aktif sayfayı bilmek için istemci bileşeni.
export default function Menu() {
  const yol = usePathname();
  return (
    <nav aria-label="Ana menü">
      <ul className="flex flex-wrap gap-2 text-sm font-semibold">
        {menu.map((m) => {
          const aktif = yol === m.href || yol.startsWith(`${m.href}/`);
          return (
            <li key={m.href}>
              <Link
                href={m.href}
                aria-current={aktif ? "page" : undefined}
                className={`inline-block rounded-full border-2 border-murekkep px-4 py-1.5 shadow-sert-kucuk transition-colors ${
                  aktif ? "bg-turuncu" : "bg-kagit hover:bg-turuncu"
                }`}
              >
                {m.etiket}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
