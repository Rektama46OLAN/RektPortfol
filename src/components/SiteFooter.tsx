import { sosyal } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-iron">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-fog sm:px-8">
        <p>© {new Date().getFullYear()} Arda</p>
        <ul className="flex gap-6">
          {sosyal.map((s) => (
            <li key={s.etiket}>
              <a href={s.href} className="transition-colors hover:text-veil">
                {s.etiket}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
