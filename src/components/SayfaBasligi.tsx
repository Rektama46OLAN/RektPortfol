// Şablondaki bölüm başlığı: küçük "/ ETİKET" + büyük başlık.
export default function SayfaBasligi({ etiket, baslik }: { etiket: string; baslik: string }) {
  return (
    <header>
      <p className="text-xs font-semibold uppercase tracking-widest">
        <span className="text-fog">/</span> {etiket}
      </p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{baslik}</h1>
    </header>
  );
}
