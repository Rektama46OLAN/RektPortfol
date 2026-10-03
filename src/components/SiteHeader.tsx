import Link from "next/link";
import Dakay from "@/components/Dakay";
import Menu from "@/components/Menu";
import { getProfil } from "@/lib/icerik";

export default async function SiteHeader() {
  const profil = await getProfil();
  return (
    <header className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-4 px-4 py-5 sm:px-8">
      <Link href="/" className="group flex items-center gap-3.5">
        <Dakay kirp="kafa" ifade="def" className="h-[54px] w-auto transition-transform group-hover:-rotate-6" etiket="" />
        <span>
          <span className="afis block text-4xl">{profil.kisa_ad}</span>
          <span className="etiket mt-0.5 block text-[15px] text-mavi">portfolyo</span>
        </span>
      </Link>
      <Menu />
    </header>
  );
}
