// Sitenin bütün içeriği buradan okunur (const.md: Cache Components + cacheTag('icerik')).
// Önbellek en geç ~1 dakikada tazelenir; admin kaydedince 'icerik' etiketi anında yenilenir (Faz 3b).
import { cacheLife, cacheTag } from "next/cache";
import { sql } from "@/lib/db";

export const ICERIK_ETIKETI = "icerik";

export type Profil = {
  ad: string;
  kisa_ad: string;
  hero_metin: string;
  hakkimda_kisa: string;
  hakkimda: string[];
  eposta: string;
  cv_unvan: string;
  cv_konum: string;
  cv_hakkimda: string;
  cv_diller: string;
};
export type SosyalLink = { etiket: string; href: string; gorunen: string };
export type Gorsel = { src: string; alt: string; en: number; boy: number };
export type Proje = {
  id: number;
  ad: string;
  aciklama: string;
  teknolojiler: string[];
  link: string | null;
  gorseller: Gorsel[];
};
export type CvKalem = {
  id: number;
  bolum: "deneyim" | "proje";
  baslik: string;
  alt: string | null;
  teknolojiler: string | null;
  maddeler: string[];
};
export type Yetenek = { alan: string; deger: string };

export async function getProfil() {
  "use cache";
  cacheTag(ICERIK_ETIKETI);
  cacheLife("minutes");
  const rows = await sql`
    SELECT ad, kisa_ad, hero_metin, hakkimda_kisa, hakkimda, eposta,
           cv_unvan, cv_konum, cv_hakkimda, cv_diller
    FROM profil WHERE id = 1`;
  return rows[0] as Profil;
}

export async function getSosyalLinkler() {
  "use cache";
  cacheTag(ICERIK_ETIKETI);
  cacheLife("minutes");
  return (await sql`
    SELECT etiket, href, gorunen FROM sosyal_linkler ORDER BY sira, id`) as SosyalLink[];
}

export async function getProjeler() {
  "use cache";
  cacheTag(ICERIK_ETIKETI);
  cacheLife("minutes");
  // Her projenin görselleri tek sorguda, sıralı bir JSON dizisi olarak gelir.
  return (await sql`
    SELECT p.id, p.ad, p.aciklama, p.teknolojiler, p.link,
           COALESCE(
             json_agg(json_build_object('src', g.src, 'alt', g.alt, 'en', g.en, 'boy', g.boy)
                      ORDER BY g.sira, g.id)
               FILTER (WHERE g.id IS NOT NULL),
             '[]'
           ) AS gorseller
    FROM projeler p
    LEFT JOIN proje_gorselleri g ON g.proje_id = p.id
    GROUP BY p.id
    ORDER BY p.sira, p.id`) as Proje[];
}

export async function getCv() {
  "use cache";
  cacheTag(ICERIK_ETIKETI);
  cacheLife("minutes");
  const [kalemSatirlari, yetenekSatirlari] = await Promise.all([
    sql`SELECT id, bolum, baslik, alt, teknolojiler, maddeler
        FROM cv_kalemleri ORDER BY sira, id`,
    sql`SELECT alan, deger FROM cv_yetenekler ORDER BY sira, id`,
  ]);
  const kalemler = kalemSatirlari as CvKalem[];
  return {
    deneyim: kalemler.filter((k) => k.bolum === "deneyim"),
    projeler: kalemler.filter((k) => k.bolum === "proje"),
    yetenekler: yetenekSatirlari as Yetenek[],
  };
}
