// Sayfa başlığı — model sheet'in başlık bloğu: mavi mono etiket, dev dar başlık, kısa giriş,
// altta kalın mürekkep çizgi. Sağ tarafa isteğe bağlı bir şey konur (genelde Dakay).
// Büyük harfe CSS çevirir; <html lang="tr"> sayesinde i → İ doğru olur.
export default function SayfaBasligi({
  etiket,
  baslik,
  giris,
  yan,
}: {
  etiket: string;
  baslik: string;
  giris?: string;
  yan?: React.ReactNode;
}) {
  return (
    <header className="grid items-end gap-6 border-b-2 border-murekkep pb-6 md:grid-cols-[minmax(0,1fr)_auto]">
      <div>
        <p className="etiket text-[13px] text-mavi">{etiket}</p>
        <h1 className="afis mt-3 pt-[0.08em] text-[clamp(3.25rem,10vw,7.5rem)]">{baslik}</h1>
        {giris && <p className="mt-4 max-w-[58ch] text-lg text-murekkep-2">{giris}</p>}
      </div>
      {yan}
    </header>
  );
}
