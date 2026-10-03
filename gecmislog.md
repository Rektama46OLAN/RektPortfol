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

## [2026-10-03] Canlıda admin girişi — TAMAMLANDI
- Ne yapıldı: `0e3d9ba` deploy'u sonrası Rekt yalnız okuma kontrolleri yaptı (sayfalar 200,
  girişsiz/sahte çerezle /admin → 307 /admin/giris, noindex). Arda canlıda şifreyle girdi,
  bir alanı değiştirdi, değişiklik canlı sitede göründü.
- Yol boyunca çıkanlar: Canlıya yazma testini Rekt bilerek yapmadı (const.md: testler dev
  dalında); canlı yazma doğrulaması site sahibine bırakıldı.
- Dokunulan dosyalar: yok.

## [2026-10-03] Faz 3b-2 — Admin: projeler, görseller, CV — TAMAMLANDI
- Ne yapıldı: Blob deposu `rektportfol-gorseller` (public, iad1, `store_gcWo7xyTs7TPVjGv`)
  CLI ile açılıp projeye bağlandı (`BLOB_READ_WRITE_TOKEN` 3 ortamda). `@vercel/blob`,
  `image-size` eklendi (audit temiz). `src/lib/gorsel.ts` (tür/boyut kontrolü, ölçü okuma,
  `dev/` klasörü), `src/lib/form.ts` (ortak form yardımcıları), `projeler-actions.ts`,
  `cv-actions.ts`, `SilButonu` (onaylı silme; linkler de buna geçti). Sayfalar:
  `/admin/projeler`, `/admin/projeler/[id]` (proje + görseller), `/admin/cv`.
  `next.config`: `images.remotePatterns` yalnız kendi Blob alan adı, Server Action gövdesi
  4,5 MB.
  Bitiş kriteri: e2e (dev dalına bağlı `next dev`, betik dev olmayan DB'de durur) 29/29 —
  proje ekle/düzenle/sil, `http://` link reddi ve kaydedilmemesi, txt ve 4,2 MB dosya reddi,
  gerçek PNG yükleme (Blob `dev/projeler/`, 717x579 ölçü, next/image 200), alt metni düzenleme,
  onayda vazgeçince silinmeme, görsel ve proje silinince Blob'dan da silinme, CV kalemi ve
  yetenek ekle/düzenle/sil, sonda DB sayıları ve Blob sayısı başlangıçla aynı. 3b-1 testi
  yeni silme butonuna uyarlanıp dev'de tekrar: 17/17.
- Yol boyunca çıkanlar:
  - İlk koşuda "http:// link reddedildi" **yanlışlıkla geçti**: test, yönlendirme bitmeden
    "Yeni proje" formunu doldurdu, başka bir hata ("Ad ve açıklama dolu olmalı") yakalandı.
    Sonuç satırları okunurken fark edildi; test doğru sayfada, doğru mesajı arayacak ve
    DB'de linkin değişmediğini doğrulayacak şekilde düzeltildi. Ders: ✓ yetmez, ✓'nin yanındaki
    kanıtı oku.
  - Scratchpad'deki betik projenin paketlerini çözemez → `node_modules/.cache/` altına
    kopyalanıp oradan çalıştırıldı (git dışı).
  - `vercel blob create-store` `.env.local`'i yeniden yazdı; `.env.development.local`
    etkilenmedi (dev dalı ayarı korundu).
  - Next 16'da `serverActions.bodySizeLimit` hâlâ `experimental` altında.
  - Next dev süreci TaskStop/kapatma sonrası "failed exit 127" bildirimi verir — beklenen.
- Dokunulan dosyalar: next.config.ts, package.json, src/lib/{form,gorsel}.ts,
  src/app/admin/{actions,projeler-actions,cv-actions}.ts, src/app/admin/(panel)/** ,
  src/components/admin/SilButonu.tsx, CLAUDE.md, AGENT.md, notes.md

## [2026-10-03] Faz 3b-2 canlıya alındı + canlı görsel denemesi — TAMAMLANDI
- Ne yapıldı: `3f31ce3` push'landı (sır taraması temiz), Vercel 33 sn'de deploy etti; Rekt
  okuma kontrolleri yaptı (sayfalar 200, yeni admin yolları girişsiz → 307 /admin/giris).
  Arda canlıda bir projeye kendi görselini yükledi ve sildi — çalıştı.
- Yol boyunca çıkanlar: Canlı yazma doğrulaması yine site sahibinde (const.md: Rekt'in
  testleri dev dalında).
- Dokunulan dosyalar: yok.

## [2026-10-03] Faz 3c — yeniden tasarım (v2 → v3 "Dakay'ın karakter dosyası") — TAMAMLANDI
- Ne yapıldı: Arda siteyi "sade, AI slop" buldu. v2 (dev dar "ARDA" + turuncu vurgu) yapıldı,
  Arda "yine sade" dedi ve Chrome'u açıp serbest araştırma istedi. Awwwards, Godly, Josh Comeau,
  Duolingo, Gumroad, Brittany Chiang gezildi; sonuç: başkasının şablonu yerine Dakay'ın kendi
  model sheet'i (krem kâğıt, mürekkep kenar, sert gölge, Archivo dar + IBM Plex Mono, mavi
  etiket). ArdaOS'taki parametrik rig siteye taşındı (7 ifade, kol pozları, gözlük indi) →
  Faz 3d (poz çizimi) 3c'ye katıldı. Her sayfada başka Dakay + konuşma balonu; 404 sayfası.
  Admin paneli koyu kaldı.
- Arda geri bildirimleriyle: CV bölümleri açılır-kapanır + "PDF indir" (tarayıcı baskısı, A4,
  baskıda bölümler açık); CV tarihleri gizli; footer yazısı, kapı kartı etiketleri, kılavuz
  çizgili paneller kalktı; logo %50, sayfa etiketleri ~%20 büyüdü; menü ve "CV'yi oku" hover'da
  turuncu; proje görselleri kendi oranında, boşluksuz ve kırpılmadan.
- Denenip bırakılanlar: proje görselinde object-cover (kırpma) — Arda vazgeçti; karanlık tema
  önizlemesi (çıkartma hatlı Dakay) — Arda kullanmamaya karar verdi, kod geri alındı,
  görüntüler `reports/karanlik-onizleme/`.
- Doğrulama: tsc + eslint temiz; 5 sayfa + 404 × 1440/375 ekran görüntüsü `reports/tasarim-v3/`,
  yatay taşma yok; temiz tarayıcıda konsol hatasız; CV baskısı PDF olarak üretilip okundu.
- Yol boyunca çıkanlar:
  - line-height dar olunca İ/Ş noktası satır dışına taşıyor → afiş başlıklarına üst boşluk.
  - SVG'de `overflow="visible"` viewBox kırpmasını iptal ediyor (kafa kırpması tam gövde
    gösterdi) → yalnız tam boyda visible.
  - Tailwind v4 `@theme` gölge değişkeni :root'ta çözülür; renk değişkenini bir sınıfta
    ezmek gölgeyi döndürmez — gölge de yeniden tanımlanmalı.
  - JSX yorumu ternary'nin içinde kardeş öğe olunca derleme kırılıyor (tsc yakalamadı, Next
    yakaladı) → her değişiklikten sonra sayfayı da aç.
  - CDP betiği: WebSocket'e "open" dinleyicisi geç eklenirse olay kaçar, betik sonsuza
    bekler → `readyState` kontrolü. Git Bash: `MSYS_NO_PATHCONV=1`, Node'a `/tmp` için `cygpath -w`.
  - Arda'nın gördüğü hydration uyarısı: istemci bileşeni açık sekmedeyken değişti (dev HMR);
    temiz yüklemede yok.
- Dokunulan dosyalar: const.md, notes.md, src/app/{globals.css,layout.tsx,not-found.tsx},
  src/app/(site)/**, src/components/{Dakay,Hero,Balon,Panel,Menu,PdfButonu,SayfaBasligi,
  SiteHeader,SiteFooter}.tsx, src/lib/site.ts, reports/{tasarim-v3,karanlik-onizleme}/

## [2026-10-03] Faz 4 — yayın (ardakaya.com) + SEO — TAMAMLANDI
- Ne yapıldı: ardakaya.com (Metunic'te kayıtlı) ve www Vercel projesine eklendi; Arda ad
  sunucularını Vercel'e taşıdı, www → ardakaya.com 308 yönlendirmesini kurdu. Kayıt merkezi
  17:36'da güncellendi, sertifika 17:44'te hazırdı. Site adı "Arda Kaya" (title şablonu,
  metadataBase). SEO: JSON-LD Person + WebSite, sitemap, robots (/admin kapalı), kanonik
  adresler, sayfa açıklamaları, sabit PNG paylaşım görseli. Search Console doğrulama TXT kaydı
  Vercel DNS'e CLI ile eklendi. Unvandan "Junior" kalktı; unvan artık yalnız panelde, açıklamalar
  ondan türetiliyor. Commit'ler: afdecb7, 285bde8.
- Bitiş kriteri: https://ardakaya.com HTTPS ile açılıyor (sayfalar 200, http → https, www →
  apex 308, /admin → /admin/giris); Arda canlıda giriş yaptı, görsel yükleyip sildi — çalıştı.
- Yol boyunca çıkanlar:
  - Metunic ad sunucuları bölge açılmadığı için REFUSED dönüyordu: alan adı hiç çözülmüyordu.
  - Bu makineden UDP DNS (nslookup 8.8.8.8) zaman aşımına uğruyor → dns.google /
    cloudflare-dns.com HTTPS çözücüleri ve Verisign RDAP ile kontrol edildi.
  - Vercel MCP aracı rekt10 ekibine 403 veriyor (yeniden yetki gerekir); CLI çalışıyor.
    www yönlendirmesi CLI'de yok → Arda panelden yaptı.
  - neon `sql` şablonunda regex içindeki ters bölü düşüyor (`^Junior\s+` → `^Juniors+`);
    UPDATE hata vermeden hiçbir şey değiştirmedi → desen parametre olarak verildi. Ders:
    RETURNING çıktısını oku, "güncellendi" yazısı yetmez.
  - next/og ImageResponse Türkçe için statik font ister → paylaşım görseli geçici bir sayfadan
    ekran görüntüsüyle üretildi (CDP clip 1200×630, nextjs-portal gizlendi).
  - Search Console sitemap'i ilk gönderimde "Getirilemedi" dedi; Googlebot UA ile sitemap 200,
    geçerli XML. Büyük ihtimalle DNS'in saatler önce SERVFAIL vermesinin önbelleği; Arda'ya URL
    Denetimi + 1–2 gün bekleme önerildi.
- Dokunulan dosyalar: src/app/{layout.tsx,sitemap.ts,robots.ts,opengraph-image.png,
  opengraph-image.alt.txt}, src/app/(site)/**/page.tsx, src/app/admin/layout.tsx,
  src/components/KisiBilgisi.tsx, src/lib/seo.ts, const.md, notes.md; Vercel: alan adları +
  TXT kaydı; Neon (dev + main): profil.cv_unvan.

## [2026-10-03] Tam denetim + CV'nin PDF olarak indirilmesi — TAMAMLANDI
- Ne yapıldı: Arda "bütün dosyaları kontrol et, vault'a raporla" dedi. Denetim raporu vault'ta
  (`🏰 300-Projects/RektPortfol/`, DakLink/E-posta düzeninde 6 not + Threads + Last-Session).
  Arda'nın kararları: Algida'nın kırpılan ikinci görselini kendisi sildi; CV'de staj bilerek yok;
  DakLink için "3 sitede denendi" doğru (CV'deki "yüzlerce site" maddesi panelden düzeltilecek);
  README yazılmayacak. Belge hataları düzeltildi (const.md anasayfa maddesi, gecmislog regex).
  CV: yazdırma penceresi yerine `/cv.pdf` — `@react-pdf/renderer` ile sunucuda, paneldeki veriden;
  Archivo + IBM Plex Mono statik TTF'leri (OFL) `src/assets/fonts/`'a indirildi (Arda onayıyla).
  `PdfButonu` ve baskı CSS'i kaldırıldı. Ortak CV kuralları `src/lib/cv.ts`'te (linkMi, dosya adı).
- Bitiş kriteri: `/cv.pdf` 200, `application/pdf`, `attachment; filename="Arda-Kaya-CV.pdf"`;
  tek sayfa A4, Türkçe harfler doğru; production build'de fontlar route'un izine girdi.
- Yol boyunca çıkanlar:
  - **Ters bölü iki canlı hata daha üretmişti:** CV sayfasındaki `linkMi` `/s/` olmuştu (boşluk
    yerine "s" harfi arıyordu, tesadüfen doğru çalışıyordu) ve JSON-LD kaçışı `"\u003c"` olmuştu
    (JS'te zaten `<`, yani hiçbir şey kaçırmıyordu). Kabuk heredoc'u ve düzenleme aracı ters
    bölüyü yorumlayabiliyor → düzeltme, ters bölü karakteri kodla (`String.fromCharCode(92)`)
    üretilerek yapıldı; bütün kaynaktaki ters bölüler tek tek listelendi.
  - react-pdf `textTransform: uppercase` Türkçe değil (DENEYIM, DILLER) → `toLocaleUpperCase("tr-TR")`.
  - react-pdf varsayılan hecelemesi Türkçe kelimeleri böler → `registerHyphenationCallback` kapalı.
  - `renderToBuffer` kökte `<Document>` tipi bekliyor → bileşen fonksiyon olarak çağrıldı.
  - Görev durdurulduğu hâlde üç Next süreci yaşıyordu (Faz 3b dersi tekrar) → PID ile kapatıldı.
  - `npm audit`: canlı bağımlılıklarda 0; geliştirme tarafında `braces` 5 yüksek uyarı —
    `eslint-config-next` içinden, önceden de vardı, siteye girmiyor.
- Dokunulan dosyalar: src/app/cv.pdf/route.ts, src/components/CvBelgesi.tsx, src/lib/cv.ts,
  src/assets/fonts/*, src/app/(site)/cv/page.tsx, src/components/{KisiBilgisi,SiteHeader,
  SiteFooter}.tsx, src/app/(site)/layout.tsx, src/app/globals.css, next.config.ts,
  package.json, package-lock.json, const.md, gecmislog.md; PdfButonu.tsx silindi.

## [2026-10-03] Site simgesi: Vercel logosu yerine Dakay — TAMAMLANDI
- Ne yapıldı: Google aramasında sitenin yanında `create-next-app`'in varsayılan favicon'u
  (Vercel logosu) çıkıyordu. Arda üst bardaki Dakay kafasını istedi. `Dakay`'a kare `kirp="ikon"`
  (viewBox 40 34 140 140, kolsuz) eklendi; geçici bir sayfadan CDP ile saydam PNG'ler çekildi
  (küçük boylar 8 kat büyük çizilip küçültüldü), 16/32/48 PNG'leri gömülü `favicon.ico` elle
  birleştirildi (6 bayt başlık + 16 bayt dizin + PNG). `icon.png` 512 saydam, `apple-icon.png`
  180 masa rengi zemin. Geçici sayfa silindi.
- Bitiş kriteri: sayfada üç `<link rel="icon|apple-touch-icon">`, üçü de 200 ve doğru türde;
  tsc + eslint + build temiz. Google simgeyi kendi taramasında günceller (günler–haftalar).
- Yol boyunca çıkanlar: üst bardaki yatay kafa kırpması kare tuvalde üstte ~%30 boşluk
  bırakıyor, 32 px'te yalnız gözlük okunuyordu → kare kırpma. Görev durdurulsa da Next süreçleri
  yine yaşıyordu → PID ile kapatıldı.
- Dokunulan dosyalar: src/app/{favicon.ico,icon.png,apple-icon.png}, src/components/Dakay.tsx,
  const.md, gecmislog.md
