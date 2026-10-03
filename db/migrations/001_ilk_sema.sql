-- 001: Sitenin içerik şeması. Faz 2'de src/lib/site.ts'de duran sabit verinin karşılığı.
-- Çalıştıktan sonra bu dosya değiştirilmez; düzeltme yeni numaralı dosyayla gelir (const.md).

-- Tek satırlık profil: ad, hero metni, hakkımda, e-posta ve CV başlık bilgileri.
CREATE TABLE profil (
  id            smallint PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  ad            text   NOT NULL,  -- "Arda Kaya" (CV başlığı)
  kisa_ad       text   NOT NULL,  -- "Arda" (logo, "Ben Arda")
  hero_metin    text   NOT NULL,
  hakkimda_kisa text   NOT NULL,  -- anasayfa hero bloğu
  hakkimda      text[] NOT NULL,  -- /hakkimda paragrafları
  eposta        text   NOT NULL,
  cv_unvan      text   NOT NULL,
  cv_konum      text   NOT NULL,
  cv_hakkimda   text   NOT NULL,
  cv_diller     text   NOT NULL
);

CREATE TABLE sosyal_linkler (
  id      integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  etiket  text    NOT NULL,  -- "GitHub"
  href    text    NOT NULL,
  gorunen text    NOT NULL,  -- "github.com/Rektama46OLAN"
  sira    integer NOT NULL DEFAULT 0
);

CREATE TABLE projeler (
  id           integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ad           text    NOT NULL,
  aciklama     text    NOT NULL,
  teknolojiler text[]  NOT NULL DEFAULT '{}',
  link         text,
  sira         integer NOT NULL DEFAULT 0
);

CREATE TABLE proje_gorselleri (
  id       integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  proje_id integer NOT NULL REFERENCES projeler (id) ON DELETE CASCADE,
  src      text    NOT NULL,
  alt      text    NOT NULL,
  en       integer NOT NULL,
  boy      integer NOT NULL,
  sira     integer NOT NULL DEFAULT 0
);
CREATE INDEX proje_gorselleri_proje_id ON proje_gorselleri (proje_id);

-- CV'nin Deneyim ve Projeler bölümleri aynı biçimde: başlık, alt satır, teknolojiler, maddeler.
CREATE TABLE cv_kalemleri (
  id           integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  bolum        text    NOT NULL CHECK (bolum IN ('deneyim', 'proje')),
  baslik       text    NOT NULL,
  alt          text,
  teknolojiler text,
  maddeler     text[]  NOT NULL DEFAULT '{}',
  sira         integer NOT NULL DEFAULT 0
);

CREATE TABLE cv_yetenekler (
  id    integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  alan  text    NOT NULL,
  deger text    NOT NULL,
  sira  integer NOT NULL DEFAULT 0
);
