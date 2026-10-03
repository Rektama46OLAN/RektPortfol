// Model sheet paneli: kâğıt zemin, mürekkep kenar; başlık satırı = dar afiş başlık + mono not.
export default function Panel({
  baslik,
  not,
  children,
  className = "",
  as: Etiket = "section",
}: {
  baslik?: React.ReactNode;
  not?: string;
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article" | "li";
}) {
  return (
    <Etiket className={`border-2 border-murekkep bg-kagit ${className}`}>
      {baslik && (
        <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b-2 border-murekkep px-4 py-3 sm:px-5">
          <h2 className="afis text-2xl tracking-wide">{baslik}</h2>
          {not && <p className="font-mono text-[13px] text-murekkep-2">{not}</p>}
        </header>
      )}
      {children}
    </Etiket>
  );
}
