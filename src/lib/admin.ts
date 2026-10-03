// Admin sayfaları ve Server Action'ları için yetki kontrolü. Proxy yalnız ön kontrol yapar;
// asıl kontrol burada, veriye yakın (Next.js kimlik doğrulama rehberi: "re-verify in every
// Server Action"). Her admin sayfası ve action'ı ilk iş bunu çağırır.
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OTURUM_CEREZI, oturumGecerliMi } from "@/lib/oturum";

export async function adminGerekli() {
  const cerez = (await cookies()).get(OTURUM_CEREZI)?.value;
  if (!oturumGecerliMi(cerez)) redirect("/admin/giris");
}

// Giriş sayfası, zaten oturumu olanı panele geçirmek için kullanır.
export async function oturumVar() {
  return oturumGecerliMi((await cookies()).get(OTURUM_CEREZI)?.value);
}
