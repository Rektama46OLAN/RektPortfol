"use server";
// Proje ve proje görseli işlemleri. Her action oturumu kendisi doğrular, sonunda
// updateTag ile ziyaretçi sayfalarını anında yeniler.
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { adminGerekli } from "@/lib/admin";
import { sql } from "@/lib/db";
import { hataIle, metin, metinYaDaNull, satirlar, tamSayi } from "@/lib/form";
import { gorselSil, gorselYukle } from "@/lib/gorsel";
import { ICERIK_ETIKETI } from "@/lib/icerik";

function projeAlanlari(form: FormData, yol: string) {
  const ad = metin(form, "ad");
  const aciklama = metin(form, "aciklama");
  const teknolojiler = satirlar(form, "teknolojiler");
  const link = metinYaDaNull(form, "link");
  const sira = tamSayi(form, "sira");
  if (!ad || !aciklama) hataIle(yol, "Ad ve açıklama dolu olmalı.");
  if (link && !/^https:\/\/\S+$/.test(link)) hataIle(yol, "Link https:// ile başlamalı.");
  if (Number.isNaN(sira)) hataIle(yol, "Sıra tam sayı olmalı.");
  return { ad, aciklama, teknolojiler, link, sira };
}

export async function projeEkle(form: FormData) {
  await adminGerekli();
  const p = projeAlanlari(form, "/admin/projeler");
  const [{ id }] = await sql`
    INSERT INTO projeler (ad, aciklama, teknolojiler, link, sira)
    VALUES (${p.ad}, ${p.aciklama}, ${p.teknolojiler}, ${p.link}, ${p.sira})
    RETURNING id`;
  updateTag(ICERIK_ETIKETI);
  redirect(`/admin/projeler/${id}?kaydedildi=1`);
}

export async function projeGuncelle(form: FormData) {
  await adminGerekli();
  const id = Number(form.get("id"));
  const yol = `/admin/projeler/${id}`;
  const p = projeAlanlari(form, yol);
  await sql`
    UPDATE projeler SET ad = ${p.ad}, aciklama = ${p.aciklama}, teknolojiler = ${p.teknolojiler},
      link = ${p.link}, sira = ${p.sira}
    WHERE id = ${id}`;
  updateTag(ICERIK_ETIKETI);
  redirect(`${yol}?kaydedildi=1`);
}

export async function projeSil(form: FormData) {
  await adminGerekli();
  const id = Number(form.get("id"));
  // Görsel satırları ON DELETE CASCADE ile gider; Blob'daki dosyaları önce topla.
  const gorseller = await sql`SELECT src FROM proje_gorselleri WHERE proje_id = ${id}`;
  await sql`DELETE FROM projeler WHERE id = ${id}`;
  await Promise.all(gorseller.map((g) => gorselSil(g.src)));
  updateTag(ICERIK_ETIKETI);
  redirect("/admin/projeler?kaydedildi=1");
}

export async function gorselEkle(form: FormData) {
  await adminGerekli();
  const projeId = Number(form.get("proje_id"));
  const yol = `/admin/projeler/${projeId}`;
  const alt = metin(form, "alt");
  const sira = tamSayi(form, "sira");
  if (!alt) hataIle(yol, "Görselin açıklaması (alt metni) dolu olmalı.");
  if (Number.isNaN(sira)) hataIle(yol, "Sıra tam sayı olmalı.");

  const sonuc = await gorselYukle(form.get("dosya") as File);
  if (typeof sonuc === "string") hataIle(yol, sonuc);

  await sql`
    INSERT INTO proje_gorselleri (proje_id, src, alt, en, boy, sira)
    VALUES (${projeId}, ${sonuc.src}, ${alt}, ${sonuc.en}, ${sonuc.boy}, ${sira})`;
  updateTag(ICERIK_ETIKETI);
  redirect(`${yol}?kaydedildi=1`);
}

export async function gorselGuncelle(form: FormData) {
  await adminGerekli();
  const id = Number(form.get("id"));
  const projeId = Number(form.get("proje_id"));
  const yol = `/admin/projeler/${projeId}`;
  const alt = metin(form, "alt");
  const sira = tamSayi(form, "sira");
  if (!alt) hataIle(yol, "Görselin açıklaması (alt metni) dolu olmalı.");
  if (Number.isNaN(sira)) hataIle(yol, "Sıra tam sayı olmalı.");
  await sql`UPDATE proje_gorselleri SET alt = ${alt}, sira = ${sira} WHERE id = ${id}`;
  updateTag(ICERIK_ETIKETI);
  redirect(`${yol}?kaydedildi=1`);
}

export async function gorselKaldir(form: FormData) {
  await adminGerekli();
  const id = Number(form.get("id"));
  const projeId = Number(form.get("proje_id"));
  const [g] = await sql`DELETE FROM proje_gorselleri WHERE id = ${id} RETURNING src`;
  if (g) await gorselSil(g.src);
  updateTag(ICERIK_ETIKETI);
  redirect(`/admin/projeler/${projeId}?kaydedildi=1`);
}
