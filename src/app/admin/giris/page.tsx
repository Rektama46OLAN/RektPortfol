import { redirect } from "next/navigation";
import { oturumVar } from "@/lib/admin";
import GirisFormu from "./GirisFormu";

export default async function Giris() {
  if (await oturumVar()) redirect("/admin");
  return (
    <section className="mx-auto w-full max-w-sm px-4 py-20">
      <h1 className="text-3xl font-semibold tracking-tight">Giriş</h1>
      <p className="mt-2 text-sm text-silver">Yönetim paneline yalnızca site sahibi girebilir.</p>
      <GirisFormu />
    </section>
  );
}
