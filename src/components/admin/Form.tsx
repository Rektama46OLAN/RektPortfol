// Admin formlarının ortak parçaları.

const girdi =
  "mt-2 w-full rounded border border-iron bg-ink px-3 py-2 text-veil outline-none focus:border-silver";

type AlanProps = {
  ad: string;
  etiket: string;
  deger?: string | number | null;
  ipucu?: string;
  cokSatir?: number;
  tip?: string;
};

export function Alan({ ad, etiket, deger, ipucu, cokSatir, tip = "text" }: AlanProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-widest">{etiket}</span>
      {cokSatir ? (
        <textarea name={ad} rows={cokSatir} defaultValue={deger ?? ""} className={`${girdi} leading-relaxed`} />
      ) : (
        <input type={tip} name={ad} defaultValue={deger ?? ""} className={girdi} />
      )}
      {ipucu && <span className="mt-1 block text-xs text-fog">{ipucu}</span>}
    </label>
  );
}

export function Kaydet({ metin = "Kaydet" }: { metin?: string }) {
  return (
    <button
      type="submit"
      className="rounded-full bg-ink px-5 py-2 text-sm font-semibold ring-1 ring-silver transition-colors hover:bg-iron"
    >
      {metin}
    </button>
  );
}

// ?kaydedildi=1 ya da ?hata=... → sayfanın üstünde tek satır bildirim.
export async function Bildirim({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const q = await searchParams;
  if (typeof q.hata === "string") {
    return <p role="alert" className="mb-6 rounded border border-silver px-4 py-3 text-sm">⚠ {q.hata}</p>;
  }
  if (q.kaydedildi) {
    return <p role="status" className="mb-6 rounded border border-iron px-4 py-3 text-sm text-silver">✓ Kaydedildi. Site güncellendi.</p>;
  }
  return null;
}
