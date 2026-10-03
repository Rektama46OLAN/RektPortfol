"use server";
// Admin işlemleri. Giriş dışındaki her action önce adminGerekli() ile oturumu kendisi doğrular;
// istemciye güvenilmez. İçerik değişince updateTag ile ziyaretçi sayfaları anında yenilenir.
import { updateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { adminGerekli } from "@/lib/admin";
import { sql } from "@/lib/db";
import { hataIle, linkGecerliMi, metin, paragraflar } from "@/lib/form";
import { ICERIK_ETIKETI } from "@/lib/icerik";
import {
  DENEME_SINIRI,
  KILIT_DAKIKA,
  OTURUM_CEREZI,
  OTURUM_SURESI_SN,
  oturumOlustur,
  sifreDogruMu,
} from "@/lib/oturum";

// ---------- giriş / çıkış ----------

export type GirisDurumu = { hata?: string };

async function istemciIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0].trim() || h.get("x-real-ip") || "bilinmiyor";
}

export async function girisYap(_onceki: GirisDurumu, form: FormData): Promise<GirisDurumu> {
  const ip = await istemciIp();
  const [{ sayi }] = await sql`
    SELECT count(*)::int AS sayi FROM giris_denemeleri
    WHERE ip = ${ip} AND zaman > now() - make_interval(mins => ${KILIT_DAKIKA})`;
  if (sayi >= DENEME_SINIRI) {
    return { hata: `Çok fazla yanlış deneme. ${KILIT_DAKIKA} dakika sonra tekrar dene.` };
  }

  if (!sifreDogruMu(String(form.get("sifre") ?? ""))) {
    await sql`INSERT INTO giris_denemeleri (ip) VALUES (${ip})`;
    await sql`DELETE FROM giris_denemeleri WHERE zaman < now() - interval '1 day'`;
    const kalan = DENEME_SINIRI - sayi - 1;
    return {
      hata: kalan > 0 ? `Şifre yanlış. ${kalan} deneme hakkın kaldı.` : `Şifre yanlış. ${KILIT_DAKIKA} dakika kilitlendin.`,
    };
  }

  await sql`DELETE FROM giris_denemeleri WHERE ip = ${ip}`;
  (await cookies()).set(OTURUM_CEREZI, oturumOlustur(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: OTURUM_SURESI_SN,
  });
  redirect("/admin");
}

export async function cikisYap() {
  (await cookies()).delete(OTURUM_CEREZI);
  redirect("/admin/giris");
}

// ---------- profil ----------

export async function profilKaydet(form: FormData) {
  await adminGerekli();
  const yol = "/admin/profil";
  const alanlar = ["ad", "kisa_ad", "hero_metin", "hakkimda_kisa", "eposta", "cv_unvan", "cv_konum", "cv_hakkimda", "cv_diller"] as const;
  const v = Object.fromEntries(alanlar.map((a) => [a, metin(form, a)])) as Record<(typeof alanlar)[number], string>;
  const hakkimda = paragraflar(form, "hakkimda");

  const bos = alanlar.find((a) => !v[a]);
  if (bos) hataIle(yol, `"${bos}" alanı boş olamaz.`);
  if (hakkimda.length === 0) hataIle(yol, "Hakkımda en az bir paragraf olmalı.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.eposta)) hataIle(yol, "E-posta adresi geçersiz.");

  await sql`
    UPDATE profil SET
      ad = ${v.ad}, kisa_ad = ${v.kisa_ad}, hero_metin = ${v.hero_metin},
      hakkimda_kisa = ${v.hakkimda_kisa}, hakkimda = ${hakkimda}, eposta = ${v.eposta},
      cv_unvan = ${v.cv_unvan}, cv_konum = ${v.cv_konum}, cv_hakkimda = ${v.cv_hakkimda},
      cv_diller = ${v.cv_diller}
    WHERE id = 1`;
  updateTag(ICERIK_ETIKETI);
  redirect(`${yol}?kaydedildi=1`);
}

// ---------- sosyal linkler ----------

function linkAlanlari(form: FormData, yol: string) {
  const etiket = metin(form, "etiket");
  const href = metin(form, "href");
  const gorunen = metin(form, "gorunen");
  const sira = Number(metin(form, "sira") || 0);
  if (!etiket || !href || !gorunen) hataIle(yol, "Etiket, adres ve görünen metin dolu olmalı.");
  if (!linkGecerliMi(href)) hataIle(yol, "Adres https:// ya da mailto: ile başlamalı.");
  if (!Number.isInteger(sira)) hataIle(yol, "Sıra tam sayı olmalı.");
  return { etiket, href, gorunen, sira };
}

export async function linkEkle(form: FormData) {
  await adminGerekli();
  const l = linkAlanlari(form, "/admin/linkler");
  await sql`INSERT INTO sosyal_linkler (etiket, href, gorunen, sira)
            VALUES (${l.etiket}, ${l.href}, ${l.gorunen}, ${l.sira})`;
  updateTag(ICERIK_ETIKETI);
  redirect("/admin/linkler?kaydedildi=1");
}

export async function linkGuncelle(form: FormData) {
  await adminGerekli();
  const id = Number(form.get("id"));
  const l = linkAlanlari(form, "/admin/linkler");
  await sql`UPDATE sosyal_linkler SET etiket = ${l.etiket}, href = ${l.href},
            gorunen = ${l.gorunen}, sira = ${l.sira} WHERE id = ${id}`;
  updateTag(ICERIK_ETIKETI);
  redirect("/admin/linkler?kaydedildi=1");
}

export async function linkSil(form: FormData) {
  await adminGerekli();
  await sql`DELETE FROM sosyal_linkler WHERE id = ${Number(form.get("id"))}`;
  updateTag(ICERIK_ETIKETI);
  redirect("/admin/linkler?kaydedildi=1");
}
