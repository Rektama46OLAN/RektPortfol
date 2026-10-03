// Ön kontrol: oturumu olmayanı admin sayfalarına hiç sokmadan giriş sayfasına yollar.
// Asıl yetki kontrolü her sayfada ve action'da tekrar yapılır (src/lib/admin.ts).
import { NextResponse, type NextRequest } from "next/server";
import { OTURUM_CEREZI, oturumGecerliMi } from "@/lib/oturum";

export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/admin/giris") return NextResponse.next();
  if (oturumGecerliMi(request.cookies.get(OTURUM_CEREZI)?.value)) return NextResponse.next();
  return NextResponse.redirect(new URL("/admin/giris", request.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
