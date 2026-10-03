// Dakay'ın konuşma balonu — ArdaOS'taki sahnenin balonu: kâğıt zemin, kalın mürekkep kenar,
// sert gölge, üstte "DAKAY" künyesi. Kuyruk alttan, sola ya da sağa yakın çıkar.
export default function Balon({
  satirlar,
  kuyruk = "sol",
  className = "",
}: {
  satirlar: string[];
  kuyruk?: "sol" | "sag";
  className?: string;
}) {
  const yer = kuyruk === "sol" ? "left-6" : "right-6";
  const ic = kuyruk === "sol" ? "left-[27px]" : "right-[27px]";
  return (
    <div
      className={`relative w-max max-w-60 rounded-[18px] border-[2.5px] border-murekkep bg-kagit px-3.5 pt-2.5 pb-3 text-murekkep shadow-sert ${className}`}
    >
      <span className="etiket mb-1.5 inline-block rounded-[5px] bg-murekkep px-1.5 pt-1 pb-0.5 text-[10px] text-kagit">
        dakay
      </span>
      {satirlar.map((s) => (
        <p key={s} className="text-base leading-snug font-semibold">
          {s}
        </p>
      ))}
      {/* Kuyruk: dıştaki mürekkep üçgen + içteki kâğıt üçgen */}
      <span
        aria-hidden
        className={`absolute top-full ${yer} -mt-px border-x-[9px] border-t-[15px] border-x-transparent border-t-murekkep`}
      />
      <span
        aria-hidden
        className={`absolute top-full ${ic} -mt-[3px] border-x-[6px] border-t-[10px] border-x-transparent border-t-kagit`}
      />
    </div>
  );
}
