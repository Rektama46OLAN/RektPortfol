# CLAUDE.md

## Proje
**RektPortfol** — Arda'yı ve projelerini tanıtan, işverene gösterilecek kişisel portföy sitesi.
Next.js + TypeScript, Postgres (Neon), Vercel Blob; yayın Vercel + custom domain. Ayrıntı `const.md`'de.

## Next.js sürümü
Proje Next.js 16 kullanıyor; API'leri, kuralları ve dosya yapısı eğitim verisinden farklı
olabilir. Next.js kodu yazmadan önce ilgili rehberi `node_modules/next/dist/docs/` altından
oku, deprecation uyarılarına uy.

`next.config.ts`'de `agentRules: false` bilinçli: açık kalırsa `next dev` kendi kural
bloğunu yalnızca `CLAUDE.md`'ye yazıp `AGENT.md` ile ayrıştırır.

## Veritabanı
Neon Postgres, Vercel'e bağlı (`neon-lime-diamond`, proje `orange-haze-49254692`). İki dal:

| Dal | Kim kullanır | Env dosyası |
|---|---|---|
| `main` | Canlı site (Vercel), `next build`, `next start` | `.env.local` (`npx vercel env pull .env.local`) |
| `dev` | `npm run dev`, `npm run db:migrate` | `.env.development.local` (`.env.local`'in üstüne yazar) |

İkisi de git'e girmez. `vercel env pull` yalnız `.env.local`'i ezer, dev ayarı korunur.

- Şema değişikliği = `db/migrations/` altında **yeni numaralı** `.sql` dosyası →
  `npm run db:migrate` (dev) → test → **`npm run db:migrate:canli`** (main). Betik her
  çalışmada hedef sunucuyu yazar. Çalışmış bir migration dosyası değiştirilmez.
- ⚠ Test ve deneme yazımları **yalnız dev dalına**: `npm run dev` ile çalış. `next start`
  canlı veritabanına bağlanır; yazma testi onunla yapılmaz.
- Sorgular `src/lib/icerik.ts`'de, düz SQL. Her okuma fonksiyonu `'use cache'` +
  `cacheTag('icerik')` + `cacheLife('minutes')` taşır.
- Cache Components açık: `new Date()`, `Math.random()` gibi değerler yalnız önbellekli
  kapsamda kullanılabilir (bkz. `SiteFooter`).

## Admin paneli
`/admin` — giriş `ADMIN_SIFRE` (Vercel env, değeri hiçbir dosyaya yazılmaz). Her admin
sayfası ve Server Action ilk iş `adminGerekli()` çağırır; `src/proxy.ts` yalnız ön kontrol.
İçerik değiştiren her action sonunda `updateTag(ICERIK_ETIKETI)`.

## const.md — değişmez gerçekler
Projedeki değişmez gerçekler `const.md`'de tutulur. Oradaki maddeler verili kabul
edilir; bir kararı/gerçeği kontrol etmek gerektiğinde önce `const.md`'ye bakılır,
değiştirmeden önce Arda'ya sorulur.

## notes.md — çalışan tasarım dokümanı
Fikirler, faz planı, tasarım detayları ve henüz açık maddeler `notes.md`'de tutulur.
`const.md` karara bağlanmış olanı, `notes.md` üzerinde çalışılanı tutar.

## reports/ klasörü
Ek raporlar `reports/` klasörüne konur. Arda'nın alışkanlığı: bir rapor / analiz /
çıktı üretildiğinde `reports/` altına atmak.

- Rapor aranması gerektiğinde ilk `reports/` klasörüne bak.
- Yeni bir rapor üretince ayrı belirtilmedikçe `reports/` altına kaydet.

## gecmis.md — yarım kalan işler
Bir iş yarıda kalırsa `gecmis.md`'ye not bırakılır (durum, sonraki adım, bağlam).
Amaç: hiçbir iş yarım kalmasın.

- Her oturum başında `gecmis.md` kontrol edilir; açık maddeler bitmeden yeni işe geçilmez.
- Madde tamamlanınca `gecmis.md`'den silinir, özeti `gecmislog.md`'ye taşınır.

## gecmislog.md — çalışma logu
Rekt çalışırken notlarını `gecmislog.md`'ye düşer. **Buraya düşen loglar silinmez.**
`gecmis.md` temizlendikçe kapanan maddeler burada birikir — "temizlik" bilgi kaybı
değildir, kapanan her şeyin kalıcı kaydı burasıdır.

## Git
- **Push yalnızca Arda açıkça "push yap" dediğinde yapılır.** "Commit'le" demesi
  push isteği değildir; commit atılır ve orada durulur.
- **Commit mesajları açıklayıcı olur.** Özet satırından sonra boş satır bırakılıp
  gövde yazılır: ne değişti, neden değişti, yol boyunca hangi sorun çözüldü.
- **Sır dosyaları asla commit'lenmez.** Token, şifre ve bağlantı URL'i git'e girmez.

## Çalışma Notları
- Kararı Arda verir; teknoloji, mimari ve kapsam onun onayından geçer.
- Varsayma — sor. Over-engineering yok.
- Kod cevabı: Yaklaşım → Neden → Kod → Açıklama → Dikkat edilecekler.

## Not: CLAUDE.md ↔ AGENT.md senkronizasyonu
Bu iki dosya her zaman aynı içeriğe sahip olmalı (yalnızca ilk satırdaki başlık farklı).

- `CLAUDE.md` içinde bir değişiklik yaparsam, aynısını `AGENT.md` dosyasına da uygula.
- `AGENT.md` içinde bir değişiklik yaparsam, aynısını `CLAUDE.md` dosyasına da uygula.
