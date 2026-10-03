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

## [2026-10-03] Vercel ↔ GitHub otomatik deploy — TAMAMLANDI
- Ne yapıldı: Arda Vercel hesabına GitHub giriş bağlantısını ekledi; `npx vercel git connect`
  → "Connected". Doğrulama: `28d7386` push'u kendiliğinden production deploy'u başlattı
  (`rektportfol-9gtb2bv8z`, alias `rektportfol-git-main-rekt10.vercel.app`, Ready, 18 sn);
  rektportfol.vercel.app → 200. Artık `main` push'u = production deploy.
- Yol boyunca çıkanlar: İlk deneme 400 — "You need to add a Login Connection to your GitHub
  account first." Repo erişimi değil, Vercel hesabında GitHub login bağlantısı eksikti.
- Dokunulan dosyalar: yok (Vercel proje ayarı).

## [2026-10-03] Faz 1 — Görsel iskelet — TAMAMLANDI
- Ne yapıldı: Palet token'ları (`globals.css` `@theme`: ink/noir/iron/fog/silver/veil),
  Archivo (latin + latin-ext), SiteHeader + SiteFooter, statik Dakay bileşeni (vault model
  sheet'inin `front()` + `faceFront('def')` çıktısı birebir JSX'e), anasayfa Hero'su (şablon
  düzeni: başlık + buton | Dakay | üç blok). Üç kontrast teması denendi, Arda koyuyu seçti
  (const.md). Bitiş kriteri: 1440 ve 375 px'te taşma yok (scrollWidth ölçüldü), Arda son
  görüntüyü onayladı. Görüntüler `reports/faz1-kontrast/`, `reports/faz1-anasayfa/`.
- Yol boyunca çıkanlar:
  - Headless Chrome 500 px'ten dar açılmıyor → CDP `Emulation.setDeviceMetricsOverride`
    ile 375 px çekildi (betik scratchpad'de `shot.mjs`, Node 22 yerleşik WebSocket).
    CDP cevabında `Runtime.evaluate` sonucu `msg.result.result.value` — iki kat iç içe.
  - `lang="tr"` sayesinde `uppercase` Türkçe doğru: "BENİ TAKİP ET", "HAKKIMDA".
  - Bash'te `python -` Windows Store kısayoluna gidip takıldı (120 sn zaman aşımı, dosya
    değişmedi). Python gerekiyorsa tam yol: `pythoncore-3.14-64\python.exe`.
  - Hero metinleri ve LinkedIn/Instagram linkleri yer tutucu → Faz 2'de Arda'dan.
- Dokunulan dosyalar: src/app/{globals.css,layout.tsx,page.tsx}, src/components/{Dakay,
  Hero,SiteHeader,SiteFooter}.tsx, src/lib/site.ts, const.md, notes.md, reports/faz1-*

## [2026-10-03] Faz 2 — Ziyaretçi sayfaları — TAMAMLANDI
- Ne yapıldı: `/hakkimda` (metin + e-posta + Dakay), `/projeler` (4 kart: görsel, teknoloji,
  GitHub), `/cv` (metin CV, bölüm bölüm), `/iletisim` (e-posta, GitHub, LinkedIn — form yok).
  İçerik `src/lib/site.ts`'de, Arda'nın metinleri kelimesi kelimesine. Hero: "Ben Arda".
  Görseller `public/projeler/`. Lint + build temiz; beş sayfa 1440/375'te taşmasız
  (`reports/faz2-sayfalar/`); GitHub linkleri 200. Arda commit + push istedi.
- Yol boyunca çıkanlar:
  - CV PDF olmaktan çıktı (Arda) → const.md'ye yeni madde, Blob maddesinden "CV PDF'i"
    düştü, Faz 2 / 3b kriterleri güncellendi.
  - CV metninde telefon numarası vardı. Repo public olduğu için commit'ten ÖNCE soruldu;
    Arda tamamen çıkarılmasını istedi → koddan ve CV ekran görüntülerinden temizlendi
    (görüntüler yeniden çekildi; resim içindeki veri de repoya girer). const.md'de kural.
  - Algida kartında 2. görsel kesiliyordu: `grid-cols-[3fr_1fr]`'de `1fr` = `minmax(auto,1fr)`,
    görselin intrinsic genişliği sütunu küçültmüyor → `minmax(0,…)`. Ardından iki hücreye de
    `aspect-[4/3]` verilince küçük hücre kısa kalıp altta boşluk bıraktı → oran yalnız ilk
    görselde, diğerleri `h-full`.
  - "E-posta Sınıflandırma"nın linki verilmemişti → `gh repo list` ile `mail-siniflandirma`
    bulundu. AlgidaBot ve ardaos-vault private → link konmadı.
  - LinkedIn'e curl 999 döndü (bot engeli) → doğrulama Arda'da, gecmis.md'de açık.
  - Not edildi, dokunulmadı: DakLink projeler sayfasında "YouTube, X, TikTok'ta denendi",
    CV'de "yüzlerce siteden" diyor.
- Dokunulan dosyalar: src/lib/site.ts, src/app/{hakkimda,projeler,cv,iletisim}/page.tsx,
  src/components/{SayfaBasligi,Hero}.tsx, public/projeler/*, const.md, notes.md,
  reports/faz2-sayfalar/*

## [2026-10-03] LinkedIn linki doğrulaması — TAMAMLANDI
- Ne yapıldı: Arda canlı sitede LinkedIn linkini tarayıcıda denedi, profil sorunsuz açıldı.
- Yol boyunca çıkanlar: LinkedIn otomatik isteklere 999 döner; curl ile doğrulanamaz.
- Dokunulan dosyalar: yok.

## [2026-10-03] Faz 3a — Veri katmanı — TAMAMLANDI
- Ne yapıldı: Neon kaynağı (`neon-lime-diamond`) `rektportfol`'a bağlandı (CLI: `vercel
  integration resource connect`), env `.env.local`'e çekildi. Şema `001_ilk_sema.sql`
  (profil, sosyal_linkler, projeler, proje_gorselleri, cv_kalemleri, cv_yetenekler),
  içerik `002_ilk_icerik.sql`. Migration betiği `scripts/migrate.mjs` (`npm run db:migrate`,
  dosya başına transaction, `schema_migrations`). Okuma `src/lib/icerik.ts` (düz SQL,
  `'use cache'` + `cacheTag('icerik')` + `cacheLife('minutes')`), `cacheComponents: true`.
  `site.ts`'de yalnız menü kaldı. Üç mimari karar Arda onayıyla const.md'de.
  Bitiş kriteri: `profil.hero_metin` DB'de elle değiştirildi → hemen değil (önbellek), 65 sn
  sonra sayfada göründü → geri alındı. Görsel regresyon: beş sayfa Faz 2 görüntüleriyle
  piksel karşılaştırıldı, içerik/yerleşim aynı (fark: footer'da alt piksel yumuşatma, eski CV
  görüntüsündeki dev "N" göstergesi, görsel yeniden ölçekleme).
- Yol boyunca çıkanlar:
  - Arda Neon'u Marketplace'ten kurmuştu ama projeye bağlı değildi (`vercel env ls` boş) →
    `vercel integration list --all` ile kaynak bulundu, CLI'dan bağlandı.
  - Neon HTTP modu (`neon()`) tek sorgu çalıştırır; çok ifadeli migration için `Pool`
    (WebSocket). Node 22'de WebSocket yerleşik, `ws` paketi gerekmedi.
  - Başlangıç SQL'i elle değil betikle üretildi (`site.ts` → Node 22 type stripping ile
    import); metinlerdeki `'` ve `;` elle kaçışta hata riskiydi.
  - `sql\`...\` as Promise<T[]>` TS2352 veriyor (NeonQueryPromise) → önce await, sonra cast.
  - Cache Components'ta footer'daki `new Date()` → footer'ın kendisi `'use cache'` yapıldı.
  - CV sayfası GitHub/LinkedIn'i etiketle `find(...)!` ile arıyordu; admin bir linki silerse
    çökerdi → `mailto:` olmayan bütün linkler listeleniyor. Proje `key`'i ad → id.
  - Piksel karşılaştırma betiği scratchpad'de `pikselfark.mjs` (CDP + OffscreenCanvas).
- Dokunulan dosyalar: db/migrations/*, scripts/migrate.mjs, package.json (+db:migrate,
  @neondatabase/serverless), next.config.ts, src/lib/{db,icerik,site}.ts,
  src/components/{SiteHeader,SiteFooter,Hero}.tsx, src/app/*/page.tsx, const.md, notes.md,
  CLAUDE.md, AGENT.md

## [2026-10-03] Faz 3b-1 — Admin: giriş, profil, linkler — TAMAMLANDI
- Ne yapıldı: Faz 3b, 3b-1 / 3b-2 olarak bölündü. Ziyaretçi sayfaları `(site)` rota grubuna
  taşındı (URL'ler aynı) ki admin kendi düzenini alsın. `src/proxy.ts` (ön kontrol),
  `src/lib/oturum.ts` (HMAC imzalı çerez, şifreden türetilmiş anahtar, sabit süreli
  karşılaştırma), `src/lib/admin.ts` (`adminGerekli()` — her sayfa ve action'da),
  `003_giris_denemeleri.sql` (IP başına 15 dk'da 5 deneme). Sayfalar: `/admin/giris`,
  `/admin`, `/admin/profil`, `/admin/linkler`; action'lar `src/app/admin/actions.ts`,
  her değişiklikten sonra `updateTag('icerik')`.
  Bitiş kriteri: uçtan uca tarayıcı testi (headless Chrome + CDP, production sunucusu)
  17/17 — girişsiz yönlendirme (3 yol), doğru şifre, çerez HttpOnly/Lax/Secure, profil
  kaydı anasayfada anında, geri yükleme, boş alan hatası, link ekle/sil anında, `javascript:`
  adresi reddi, çıkış, 5 yanlışta kilit, kilitliyken doğru şifre reddi. Test verisi ve
  kilit kayıtları temizlendi.
- Yol boyunca çıkanlar:
  - Arda ilk şifre olarak 4 haneli sayı verdi → 10.000 olasılık, açık panelde brute-force'a
    açık; uzun şifre önerildi, Arda 32 karakterlik şifreyi Vercel paneline kendisi girdi
    (değer sohbete/dosyaya hiç düşmedi; Rekt yalnız uzunluğu kontrol etti).
  - Next 16: Middleware → `proxy.ts`, varsayılan Node.js runtime → `node:crypto` kullanılabildi.
  - Cache Components: çerez okuyan admin sayfaları Suspense içinde olmalı → admin layout'u
    `{children}`'ı `<Suspense>`'e sarıyor; admin okuması önbelleksiz (`sql` doğrudan).
  - `updateTag` yalnız Server Action'da çağrılabilir (Route Handler'da `revalidateTag`).
  - Yardımcı `oturumVarMi` yanlışlıkla `"use server"` dosyasındaydı → dışarıdan çağrılabilen
    endpoint olurdu; `src/lib/admin.ts`'ye taşındı.
  - Bulgu: yerel ve canlı **aynı Neon veritabanı** → test yazımı canlıya gider. CLAUDE.md'ye
    uyarı; Neon dev dalı önerisi notes.md'de.
  - E2E testinde "geri yüklendi" kontrolü ilk koşuda kaldı: test, alanı kendisi doldurduğu
    için bekleme koşulu anında doğru çıktı → anasayfa yanıtını yoklayacak şekilde düzeltildi;
    uygulamada hata yoktu (DB ve sayfa doğruydu).
  - Test betikleri scratchpad'de: `e2e-admin.mjs` (şifreyi env'den okur, yazdırmaz).
- Dokunulan dosyalar: src/app/(site)/*, src/app/layout.tsx, src/app/admin/**,
  src/components/admin/Form.tsx, src/lib/{oturum,admin}.ts, src/proxy.ts,
  db/migrations/003_giris_denemeleri.sql, notes.md, CLAUDE.md, AGENT.md

## [2026-10-03] Neon dev dalı — TAMAMLANDI
- Ne yapıldı: Arda 3b-1 kararlarını (oturum, deneme sınırı, dev dalı) onayladı → const.md.
  `neonctl` (Vercel: Rekt org'una zaten yetkili) ile `main`'den `dev` dalı açıldı;
  bağlantı adresleri `.env.development.local`'e (git dışı, ekrana basılmadan). Scriptler:
  `db:migrate` → dev, `db:migrate:canli` → main; betik hedef sunucuyu yazıyor.
  Doğrulama: dev dalına "DEV-DALI isareti" yazıldı → `next dev`'de göründü, canlı sitede ve
  canlı DB'de görünmedi → işaret silindi.
- Yol boyunca çıkanlar:
  - Arda için başlatılan `npm run dev` görevi TaskStop ile durdurulmuştu ama Next süreci
    (PID 21040) yaşamaya devam etmişti — ve `.env.development.local`'den önce başladığı için
    canlı DB'ye bağlıydı. Yeni `next dev` "Another next dev server is already running" ile
    çıktı, bekleyen komut 180 sn'de zaman aşımına düştü. Çözüm: proje yolundaki bütün `next`
    node süreçleri kapatıldı, temiz sunucu açıldı. Ders: TaskStop arka plan kabuğunu durdurur,
    torun süreçleri garanti değil — port/PID ile kontrol et.
  - `next start` yalnız `.env.local` okur → canlı DB. Yazma testleri `next dev`'e karşı yapılır
    (CLAUDE.md'ye kural).
  - Node `--env-file` birden fazla verilince sonraki dosya öncekini ezer;
    `--env-file-if-exists` dosya yoksa hata vermez.
- Dokunulan dosyalar: package.json, scripts/migrate.mjs, .env.development.local (git dışı),
  const.md, notes.md, CLAUDE.md, AGENT.md, gecmis.md
