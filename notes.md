# Notlar — RektPortfol

Çalışan tasarım dokümanı. Arda buraya fikirlerini atar, Rekt ile konuşulur,
olgunlaşınca Rekt aşağıya işler. Karar değişirse burası güncellenir.

Karara bağlanan ve artık tartışılmayan maddeler `const.md`'ye taşınır.

## Akış

1. Arda fikri paylaşır.
2. Rekt ile tartışılır / netleştirilir.
3. Onay verilince Rekt fikri aşağıya işler.
4. Karar kesinleşince `const.md`'ye gerekçesiyle geçer.

---

## Stack

| Katman | Seçim |
|---|---|
| Framework | Next.js (frontend + backend tek projede) — **const.md** |
| Yayın / hosting | Vercel + custom domain (iş bitince) — **const.md** |
| Dil | TypeScript — **const.md** |
| Veritabanı | Postgres (Neon, Vercel Marketplace) — **const.md** |
| Dosya depolama | Vercel Blob — **const.md** |
| Admin girişi (auth) | Tek kullanıcı, şifre env'de — **const.md** |
| Stil | Tailwind CSS — **const.md** |

---

## Faz Planı

Her fazın **bitiş kriteri** yazılır — "bitti" ölçülebilir olsun diye.
Faz uzun görünüyorsa ikiye böl; ilerleme ölçülemeyen faz faz değildir.

> Arda onayı: 2026-10-03.

| Faz | İçerik | Bitiş kriteri |
|---|---|---|
| **0** ✅ | Kurulum: Next.js + TS + Tailwind projesi, git, Vercel'e bağlama | `npm run dev` ile localhost açılıyor **ve** Vercel preview URL'i aynı boş sayfayı gösteriyor |
| **1** ✅ | Görsel iskelet: palet token'ları (siyah + 5 gri), font, üst bar + footer, **statik** Dakay SVG bileşeni, anasayfa hero'su | Siyah vurgu ve Dakay için kontrast kararı verilmiş; hero, Dakay ile birlikte 1440 px ve 375 px genişlikte ekran görüntüsünde taşma/çakışma olmadan görünüyor; Arda görüntüyü onaylıyor |
| **2** ✅ | Ziyaretçi sayfaları, **sabit veriyle** (DB yok): `/hakkimda`, `/projeler`, `/cv`, `/iletisim` | Dört sayfa kendi URL'inde menüden açılıyor, CV sayfada metin olarak okunuyor, sosyal linkler doğru adrese gidiyor |
| **2b** *(sonra)* | Dakay'a hafif hareket: nefes, hover'da ifade değişimi | Hareket ekranda çalışıyor; `prefers-reduced-motion` açıkken duruyor |
| **3a** ✅ | Veri katmanı: Neon bağlantısı, şema, sayfalar DB'den okur | Sabit veri koddan silinmiş; DB'de bir satır elle değiştirilince sayfa değişiyor |
| **3b-1** ✅ | Admin: giriş + oturum + deneme sınırı, profil ve sosyal link düzenleme | Girişsiz `/admin/*` → `/admin/giris`; yanlış şifre 5 kez → 15 dk kilit; doğru şifre → panel; profil alanları ve linkler (ekle/düzenle/sil) kaydedilince ziyaretçi sayfasında **anında** görünüyor; çıkış oturumu kapatıyor |
| **3b-2** ✅ | Admin: projeler + görsel yükleme (Blob) + CV kalemleri ve yetenekler | Panelden proje ekle/düzenle/sil, görsel yükle/sil, CV kalemi ve yetenek ekle/düzenle/sil → ziyaretçi sayfasında anında görünüyor |
| **3c** | Yeniden tasarım (v3, "Dakay'ın karakter dosyası"): model sheet dili, parametrik Dakay (ifade + poz), konuşma balonları, 404 (bkz. *Tasarım v3*) | Beş sayfa + 404'ün 1440 ve 375 px ekran görüntüsü `reports/tasarim-v3/`'te; taşma/çakışma yok; admin paneli eski koyu hâliyle açılıyor; Arda görüntüleri onaylıyor |
| ~~**3d**~~ | ~~Dakay pozları~~ → 3c'ye katıldı: ArdaOS'taki rig 7 ifade ve kol pozlarını zaten taşıyordu | — |
| **4** | Yayın: custom domain (ardakaya.com, DNS Vercel'de), prod env değişkenleri, SEO (JSON-LD, sitemap, robots, kanonik, paylaşım görseli) | Site custom domain'de HTTPS ile açılıyor; prod'da admin girişi ve dosya yükleme çalışıyor |

**Faz 0 notu:** `create-next-app` kendi `CLAUDE.md` (`@AGENTS.md`) ve `AGENTS.md`'sini
üretiyor; `next dev` de bir AI ajanı algılayınca kural bloğunu `CLAUDE.md`'ye yazıyor
(`AGENTS.md` yoksa). Bizde `AGENT.md` var, `AGENTS.md` yok → blok yalnız `CLAUDE.md`'ye
girer, senkron bozulur. Çözüm: `agentRules: false` + aynı bilgi iki dosyaya elle.

Faz 3b de (2026-10-03) ikiye bölündü: giriş/oturum güvenliği tek başına test edilmeli; beş düzenleme ekranı + dosya yükleme tek parçada ölçülemezdi.

Faz 3 baştan ikiye bölündü: veri katmanı ile admin arayüzü ayrı ayrı test edilebilir, tek
parça hâlinde "DB mi bozuk, form mu" ayrımı yapılamaz.

---

## Kapsam (2026-10-03, Arda)

**Ziyaretçi sayfaları:**
- Hakkımda
- Projeler
- CV
- İletişim — yalnızca sosyal medya linkleri, **form yok**

**Admin paneli:** Sitedeki her şey (projeler, CV, hakkımda, linkler) buradan düzenlenir.

**Tasarım:** Örnekler geldi (2026-10-03) → aşağıda *Tasarım*.

## Tasarım

Kaynaklar `Downloads`'ta: şablon PDF'i + 5'li gri palet PDF'i. Maskot: Dakay (vault notu).

**Şablondan alınanlar (Developer X):**
- Üst bar: solda logo (`</> Developer X`), sağda menü.
- Hero: solda kısa çizgi + iki satırlık büyük başlık ("I'm John, a Web Developer") + kısa
  paragraf + yuvarlak "aşağı" butonu. Ortada figür (bizde **Dakay**). Sağda üç küçük blok:
  ABOUT ME / MY WORK / FOLLOW ME (sosyal ikonlar), her biri link ile.
- Hakkımda bölümü: büyük başlık + paragraf, yanda iki büyük sayı ("12 yıl", "150 proje").
- "Previously worked on" logo şeridi, "My skills" kaydırmalı liste.
- Bölümler arasında zemin tonu değişiyor (siyah ↔ koyu lacivert-gri).
- Font: geometrik grotesk (şablondakine yakın: Space Grotesk / Archivo — Rekt seçecek).

**Paletin şablona oturması:**
- Şablonun zemin/yüzey tonları → `#2B2B2B` (zemin), `#565656` (kart/çizgi), metin `#E0E0E0`,
  ikincil metin `#B3B3B3`, soluk metin `#848484`.
- Şablonda **mavi vurgu** var (buton, ok, `</>`); paletimiz tamamen gri → *açık soru*.

**Dakay'ı koyu zemine koymanın sorunu:** Dakay'ın gövdesi grafit `#4C4F56`, dış çizgisi
neredeyse siyah `#0B0B0D`. `#2B2B2B` zeminde siluet kaybolur. Çözüm adayları: arkasına açık
gri hale/spot ışığı (şablondaki adamın arkası da hafif aydınlık), ya da hero'da zemini
`#565656`'ya açmak. Faz 1'de ikisi de denenip ekran görüntüsüyle karşılaştırılır.

## Tasarım v2 (2026-10-03, Arda onayı)

Çıkış noktası: Arda sitenin "çok sade ve AI slop" durduğunu söyledi, Pinterest'te
"portfolio site design" aramasından örnek gösterdi. Rekt sayfayı gezdi; örneklerin ortak
numarası **arka planı kesilmiş figür + dev yazı**. Bizde figür Dakay.

Değerlendirilen üç yön: (1) dev yazı + figür üst üste, gri paletle; (2) editoryal ızgara +
tek sert vurgu; (3) koyu zemin + sıcak ışık (bugünküne en yakın, en "şablon"). Arda
**1 + tek vurgu rengi** seçti, vurgu **turuncu**.

**Görsel sistem**
- Afiş başlıkları: Archivo, `wdth` ~62 (dar), 900, BÜYÜK HARF, satır aralığı ~0.85. Yeni font
  yok — Türkçe karakterler aynı fonttan.
- Turuncu `#FF6B1A` (~5.5:1 `#2B2B2B` üstünde), az kullanılır: ana buton, hover/odak, başlık
  sonu `*`, aktif menü, Dakay'ın arkasındaki hale. Paragraf, kart dolgusu, zemin turuncu olmaz.
- Gri hale → turuncu ışık; `ring-silver` kenar hilesi gereksizleşir.
- Beş gri zemin/yüzey/metin olarak kalır; `ink` ikincil ton.

**Sayfalar (Faz 3c)**
- Üst bar: `</>` turuncu; menü hap butonlar, aktif sayfa turuncu kenarlı.
- `SayfaBasligi`: `/ ETİKET` kalır, başlık dev dar BÜYÜK HARF + turuncu `*`.
- Anasayfa: ekran genişliğinde dev **ARDA**, Dakay önünde (alt kısmı harflere biner), turuncu
  hale; sol altta kısa metin + turuncu buton; üç blok yazının altında şerit. Mobilde yazı
  ekrana sığar, Dakay altına, bloklar alt alta.
- Projeler: bento — ilk proje iki sütun, diğerleri ikişer; GitHub linki turuncu, hover'da kenar turuncu.
- Hakkımda: dev başlık, Dakay sağda turuncu haleyle (3d'de el sallayan poz).
- CV: yapı aynı, bölüm etiketleri ve madde imleri turuncu — okunabilirlik için sade.
- İletişim: her satır dev dar yazı (GITHUB…), hover'da turuncu + ok kayar.
- Footer: aynı, hover turuncu.

**Bilinçli olarak yok:** rakam şeridi ("6+ yıl, 80+ proje") — uydurma rakam kariyerin başındaki bir profilde
ters teper. Admin ve DB'ye dokunulmaz; 3c tamamen görsel.

## Tasarım v3 (2026-10-03) — "Dakay'ın karakter dosyası"

v2'yi Arda da "yine sade" buldu ve serbest araştırma istedi (Chrome açık, "istediğin siteye
gir"). Gezilenler ve alınan ders:
- **Awwwards / Godly** — güncel trend: kâğıt/krem zeminler, dokunsal nesneler, editoryal serif/dar başlık.
- **Josh Comeau** — karakter sahnenin içinde (tepede oturuyor), kişilik her yerde.
- **Duolingo** — maskot arayüzle etkileşiyor (telefon tutuyor, butonun yanında), kalın basılabilir butonlar.
- **Gumroad** — kalın siyah çizgili illüstrasyon, sert gölgeli kartlar, konuşma balonu altyazıları.
- **Brittany Chiang** — koyu tek sütun + yan menü: AI portföylerinin kopyaladığı kalıp → kaçınılacak.

Karar: başkasının şablonu yerine Dakay'ın **kendi model sheet'i** (`model-sheet.html`) — renkleri,
fontları, başlık bloğu, künye tablosu, ifade kartları, mavi kılavuz çizgileri. ArdaOS'taki
sahnenin konuşma balonu ve parametrik rig'i (`.claude/scripts/dakay/sahne.html`) siteye taşındı.

**Parçalar**
- `Dakay` — `ifade` (def, meh, sus, smirk, angry, shock, sad), `sol`/`sag` kol pozu, `gozlukIndi`, `kirp="kafa"`.
- ~~`DakayKilavuz`~~ — kılavuz çizgili panel; Arda Dakay'ın çerçevesiz durmasını istedi, kaldırıldı.
- `Balon` — sahnedeki balon: kâğıt, kalın kenar, sert gölge, "DAKAY" künyesi.
- `Panel` — model sheet paneli (afiş başlık + mono not). `basilir` — kalkan/basılan sert gölge.

**Sayfa başına Dakay**
| Sayfa | İfade / poz | Replik |
|---|---|---|
| Anasayfa | yarım sırıtış, el sallıyor; çerçevesiz | "Ben Dakay. Arda'nın işlerini ben gösteririm." |
| Kapı kartları | smirk · sus · def · gözlük indi (kafa); ifade adı yazılmaz | — |
| Hakkımda | şüpheli (kaş kalkık = onay), işaret ediyor; çerçevesiz, yalnız Dakay + balon | "Okuyun. Ben onayladım." |
| Projeler | şüpheli, eller belde; görselsiz projede gözlük indi | "Hepsine baktım." / "Görsel yok. Ben buradayım ama." |
| CV | gözlük indi, kâğıdın kenarından bakıyor | "Okudum. Fena değil." |
| İletişim | varsayılan, eller belde; çerçevesiz, yalnız Dakay + balon | "Yaz. Cevap gelir." |
| 404 | şaşkın, işaret ediyor | "Burada bir şey yok. Ben de baktım." |

**Bilinçli olarak yok:** uydurma rakam şeridi; admin paneline dokunma (koyu kalır).

## Açık sorular

- ~~PHP ↔ Vercel çakışması~~ → çözüldü, Next.js seçildi (const.md).
- ~~Veritabanı, dosya depolama, admin girişi, dil~~ → çözüldü, const.md (2026-10-03).
- ~~Stil aracı, form gerekçesi, tasarım örneği~~ → çözüldü, const.md (2026-10-03).
- ~~Vurgu rengi, sayfa yapısı, Dakay hareketi, dil~~ → çözüldü, const.md (2026-10-03).
- ~~Siyah vurgu / Dakay kontrastı~~ → koyu tema + hale + kenar, const.md (2026-10-03).
- *(eski not)* **Siyah vurgunun koyu zeminde görünürlüğü.** Zemin `#2B2B2B` iken siyah buton/ok zeminden
  zor ayrılır (Dakay'daki kontrast sorunuyla aynı kök). Faz 1'de denenecek adaylar:
  (a) siyah dolgu + açık gri (`#E0E0E0`) yazı/çizgi — buton kendi kenarıyla ayrılır;
  (b) siyahın göründüğü yerlerde zemini `#565656`'ya açmak; (c) tamamen açık zemin
  (`#E0E0E0`) — siyah vurgu da Dakay da doğal olarak öne çıkar, ama şablonun koyu havası
  değişir. Karar ekran görüntüleri üzerinden Arda'yla.
- ~~Anasayfa (`/`)~~ → onaylandı, const.md (2026-10-03).

## Onay bekleyen kararlar

_(yok — Faz 3b-1 kararları 2026-10-03'te onaylandı, const.md'de: oturum, deneme sınırı, Neon dev dalı.)_

## Fikirler

---

## Rafta

Şimdilik yapılmayacak, ama unutulmasın diye duranlar.

- Dakay'ın ArdaOS'taki gibi zengin animasyonu (zıplama, gözlük alna itme, ruh hâlleri).
