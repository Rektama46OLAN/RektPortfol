"use server";
// CV kalemleri (Deneyim / Projeler bölümleri) ve yetenekler.
import { updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { adminGerekli } from "@/lib/admin";
import { sql } from "@/lib/db";
import { hataIle, metin, metinYaDaNull, satirlar, tamSayi } from "@/lib/form";
import { ICERIK_ETIKETI } from "@/lib/icerik";

const YOL = "/admin/cv";

function kalemAlanlari(form: FormData) {
  const bolum = metin(form, "bolum");
  const baslik = metin(form, "baslik");
  const alt = metinYaDaNull(form, "alt");
  const teknolojiler = metinYaDaNull(form, "teknolojiler");
  const maddeler = satirlar(form, "maddeler");
  const sira = tamSayi(form, "sira");
  if (bolum !== "deneyim" && bolum !== "proje") hataIle(YOL, "Bölüm Deneyim ya da Projeler olmalı.");
  if (!baslik) hataIle(YOL, "Başlık dolu olmalı.");
  if (Number.isNaN(sira)) hataIle(YOL, "Sıra tam sayı olmalı.");
  return { bolum, baslik, alt, teknolojiler, maddeler, sira };
}

export async function kalemEkle(form: FormData) {
  await adminGerekli();
  const k = kalemAlanlari(form);
  await sql`
    INSERT INTO cv_kalemleri (bolum, baslik, alt, teknolojiler, maddeler, sira)
    VALUES (${k.bolum}, ${k.baslik}, ${k.alt}, ${k.teknolojiler}, ${k.maddeler}, ${k.sira})`;
  updateTag(ICERIK_ETIKETI);
  redirect(`${YOL}?kaydedildi=1`);
}

export async function kalemGuncelle(form: FormData) {
  await adminGerekli();
  const id = Number(form.get("id"));
  const k = kalemAlanlari(form);
  await sql`
    UPDATE cv_kalemleri SET bolum = ${k.bolum}, baslik = ${k.baslik}, alt = ${k.alt},
      teknolojiler = ${k.teknolojiler}, maddeler = ${k.maddeler}, sira = ${k.sira}
    WHERE id = ${id}`;
  updateTag(ICERIK_ETIKETI);
  redirect(`${YOL}?kaydedildi=1`);
}

export async function kalemSil(form: FormData) {
  await adminGerekli();
  await sql`DELETE FROM cv_kalemleri WHERE id = ${Number(form.get("id"))}`;
  updateTag(ICERIK_ETIKETI);
  redirect(`${YOL}?kaydedildi=1`);
}

function yetenekAlanlari(form: FormData) {
  const alan = metin(form, "alan");
  const deger = metin(form, "deger");
  const sira = tamSayi(form, "sira");
  if (!alan || !deger) hataIle(YOL, "Yetenek alanı ve değeri dolu olmalı.");
  if (Number.isNaN(sira)) hataIle(YOL, "Sıra tam sayı olmalı.");
  return { alan, deger, sira };
}

export async function yetenekEkle(form: FormData) {
  await adminGerekli();
  const y = yetenekAlanlari(form);
  await sql`INSERT INTO cv_yetenekler (alan, deger, sira) VALUES (${y.alan}, ${y.deger}, ${y.sira})`;
  updateTag(ICERIK_ETIKETI);
  redirect(`${YOL}?kaydedildi=1`);
}

export async function yetenekGuncelle(form: FormData) {
  await adminGerekli();
  const y = yetenekAlanlari(form);
  await sql`UPDATE cv_yetenekler SET alan = ${y.alan}, deger = ${y.deger}, sira = ${y.sira}
            WHERE id = ${Number(form.get("id"))}`;
  updateTag(ICERIK_ETIKETI);
  redirect(`${YOL}?kaydedildi=1`);
}

export async function yetenekSil(form: FormData) {
  await adminGerekli();
  await sql`DELETE FROM cv_yetenekler WHERE id = ${Number(form.get("id"))}`;
  updateTag(ICERIK_ETIKETI);
  redirect(`${YOL}?kaydedildi=1`);
}
