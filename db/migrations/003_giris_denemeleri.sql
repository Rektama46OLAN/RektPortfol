-- 003: Admin girişinde başarısız denemeler. Bir IP'den 15 dakikada 5 başarısız deneme →
-- o IP 15 dakika kilitlenir (src/lib/oturum.ts). Kayıt yalnız başarısız denemeler içindir.
CREATE TABLE giris_denemeleri (
  id    integer GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  ip    text        NOT NULL,
  zaman timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX giris_denemeleri_ip_zaman ON giris_denemeleri (ip, zaman);
