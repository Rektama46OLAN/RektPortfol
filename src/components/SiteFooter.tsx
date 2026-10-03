import { cacheLife, cacheTag } from "next/cache";
import { getProfil, getSosyalLinkler, ICERIK_ETIKETI } from "@/lib/icerik";

// Önbellekli bileşen: Cache Components'ta new Date() yalnız önbellek kapsamında kullanılabilir.
export default async function SiteFooter() {
  "use cache";
  cacheTag(ICERIK_ETIKETI);
  cacheLife("minutes");
  const [profil, sosyal] = await Promise.all([getProfil(), getSosyalLinkler()]);
  return (
    <footer className="mt-20 border-t-2 border-murekkep bg-murekkep text-kagit">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-8">
        <p className="etiket text-cetvel">
          © {new Date().getFullYear()} {profil.kisa_ad}
        </p>
        <ul className="flex gap-6 text-sm font-semibold">
          {sosyal.map((s) => (
            <li key={s.etiket}>
              <a href={s.href} className="transition-colors hover:text-turuncu">
                {s.etiket}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
