"use client";

// Silme butonu: tıklayınca onay ister; vazgeçilirse form gönderilmez.
export default function SilButonu({
  action,
  soru,
  etiket = "Sil",
}: {
  action: (form: FormData) => Promise<void>;
  soru: string;
  etiket?: string;
}) {
  return (
    <button
      formAction={action}
      onClick={(e) => {
        if (!confirm(soru)) e.preventDefault();
      }}
      className="text-sm text-fog hover:text-veil"
    >
      {etiket}
    </button>
  );
}
