# Geçmiş Log

Rekt buraya çalışırken notlarını düşer.

**Buraya düşen loglar silinmez.** `gecmis.md` temizlendikçe kapanan maddeler burada birikir.
Yani "temizlik" bilgi kaybı anlamına gelmez — `gecmis.md` sadece açık işleri tutar,
kapanan her şeyin kalıcı kaydı buradadır.

Yarım kalan işler buraya değil `gecmis.md`'ye yazılır.

## Format

```
## [TARİH] İş başlığı — TAMAMLANDI
- Ne yapıldı: tek satır özet
- Yol boyunca çıkanlar: karşılaşılan sorun ve çözümü (varsa)
- Dokunulan dosyalar: ...
```

---

## Log

## [2026-10-03] Planlama fazı — TAMAMLANDI
- Ne yapıldı: Rekt iskeleti kuruldu (`kur.py`); kapsam, stack, mimari ve tasarım kararları
  gerekçeleriyle const.md'ye, faz planı (0 → 1 → 2 → 2b → 3a → 3b → 4) notes.md'ye yazıldı.
  Arda faz planını ve anasayfa önerisini onayladı.
- Yol boyunca çıkanlar:
  - İlk stack PHP + MySQL + Vercel'di. Vercel dokümanında PHP'nin yalnızca topluluk
    runtime'ı `vercel-php` ile çalıştığı (resmî destek yok) ve fonksiyon dosya sisteminin
    kalıcı olmadığı görüldü → admin paneli dış DB ve dış dosya deposu gerektiriyor.
    Üç seçenek (A: vercel-php, B: PHP hosting, C: Next.js) sunuldu, Arda C'yi seçti.
    MySQL de bu yüzden düştü; yerine Postgres (Neon) + Vercel Blob.
  - "PHP backend için en iyi dil" gerekçesi const.md'ye yazılmadı — tartışmalı iddia,
    yaşanmış gerekçe değil. Karar zaten değişti.
  - "Kodu Rekt yazar, Arda onaylar" satırı Arda'nın isteğiyle hiçbir dosyaya yazılmadı:
    varsayılan çalışma şekli, kural olarak tekrarlanmaz.
  - Dakay (gri grafit gövde, siyah çizgi) ve siyah vurgu, şablonun koyu `#2B2B2B` zemininde
    kontrast sorunu yaratıyor → çözümü Faz 1'in bitiş kriterine bağlandı (3 aday notes.md'de).
- Dokunulan dosyalar: CLAUDE.md, AGENT.md, notes.md, const.md, gecmis.md, gecmislog.md, reports/

## [2026-10-03] GitHub reposu — TAMAMLANDI
- Ne yapıldı: `git init -b main`; private repo https://github.com/Rektama46OLAN/RektPortfol
  açıldı, `origin` olarak bağlandı. Henüz commit/push yok (Arda istemeden yapılmaz).
- Yol boyunca çıkanlar: Faz 0 için not — `create-next-app` dolu klasöre kurulum yapmayı
  reddedebilir (CLAUDE.md, notes.md vb. "çakışan dosya" sayılır); geçici klasörde kurup
  taşımak gerekebilir.
- Dokunulan dosyalar: .git/

## [2026-10-03] Faz 0 — Kurulum — TAMAMLANDI
- Ne yapıldı: Next.js 16.3.8 + TS + Tailwind 4 kuruldu, Türkçe yer tutucu sayfa, commit
  `31ea458` push'landı, repo Arda'nın isteğiyle public yapıldı (öncesinde sır taraması:
  temiz). Vercel projesi `rekt10/rektportfol` açıldı, deploy alındı.
  Bitiş kriteri doğrulandı: localhost:3000 → 200, https://rektportfol.vercel.app → 200,
  ikisi de aynı sayfa (`lang="tr"`, "yapım aşamasında"). Lint temiz, build başarılı.
- Yol boyunca çıkanlar:
  - `create-next-app` dolu klasöre kurmuyor ve kendi CLAUDE.md/AGENTS.md'sini üretiyor →
    scratchpad'de `--skip-install` ile kurulup taşındı, o dosyalar alınmadı.
  - `next dev`, AI ajanı algılayınca kural bloğunu CLAUDE.md'ye yazıyor (AGENTS.md yoksa) →
    AGENT.md ile senkron bozulur. `agentRules: false` + aynı uyarı iki dosyaya elle.
  - Vercel MCP bağlayıcısı `rekt10` takımına yetkisiz (403, takım listesi boş) → Vercel CLI'a
    geçildi.
  - `npx vercel login` `!` ile çalışınca çıktı görünmeden bekliyor (device-code akışı).
    Arka planda başlatılan ilk login, Arda tarayıcıda onaylamadan önce Rekt tarafından
    durduruldu → token yazılmadı. Ders: login sürecini öldürme, `run_in_background` ile
    bitmesini bekle.
  - `vercel link` `.gitignore`'a `.vercel` ve `.env*` ekledi; zaten vardı → geri alındı.
    `.env.local` (OIDC token) git dışında, doğrulandı.
  - Projenin ilk deploy'u Vercel'de otomatik production oluyor. Deployment URL'leri
    (`*-rekt10.vercel.app`) koruma arkasında (302), `rektportfol.vercel.app` açık.
- Dokunulan dosyalar: package.json, package-lock.json, next.config.ts, tsconfig.json,
  eslint.config.mjs, postcss.config.mjs, src/app/*, CLAUDE.md, AGENT.md, notes.md, .vercel/
