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
| **1** | Görsel iskelet: palet token'ları (siyah + 5 gri), font, üst bar + footer, **statik** Dakay SVG bileşeni, anasayfa hero'su | Siyah vurgu ve Dakay için kontrast kararı verilmiş; hero, Dakay ile birlikte 1440 px ve 375 px genişlikte ekran görüntüsünde taşma/çakışma olmadan görünüyor; Arda görüntüyü onaylıyor |
| **2** | Ziyaretçi sayfaları, **sabit veriyle** (DB yok): `/hakkimda`, `/projeler`, `/cv`, `/iletisim` | Dört sayfa kendi URL'inde menüden açılıyor, örnek CV PDF'i indiriliyor, sosyal linkler doğru adrese gidiyor |
| **2b** *(sonra)* | Dakay'a hafif hareket: nefes, hover'da ifade değişimi | Hareket ekranda çalışıyor; `prefers-reduced-motion` açıkken duruyor |
| **3a** | Veri katmanı: Neon bağlantısı, şema, sayfalar DB'den okur | Sabit veri koddan silinmiş; DB'de bir satır elle değiştirilince sayfa değişiyor |
| **3b** | Admin paneli: giriş + içerik düzenleme + Blob'a dosya yükleme | Girişsiz `/admin` girişe yönleniyor; panelden proje ekle/düzenle/sil, hakkımda düzenle, CV PDF'i yükle → ziyaretçi sayfasında görünüyor |
| **4** | Yayın: custom domain, prod env değişkenleri | Site custom domain'de HTTPS ile açılıyor; prod'da admin girişi ve dosya yükleme çalışıyor |

**Faz 0 notu:** `create-next-app` kendi `CLAUDE.md` (`@AGENTS.md`) ve `AGENTS.md`'sini
üretiyor; `next dev` de bir AI ajanı algılayınca kural bloğunu `CLAUDE.md`'ye yazıyor
(`AGENTS.md` yoksa). Bizde `AGENT.md` var, `AGENTS.md` yok → blok yalnız `CLAUDE.md`'ye
girer, senkron bozulur. Çözüm: `agentRules: false` + aynı bilgi iki dosyaya elle.

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

## Açık sorular

- ~~PHP ↔ Vercel çakışması~~ → çözüldü, Next.js seçildi (const.md).
- ~~Veritabanı, dosya depolama, admin girişi, dil~~ → çözüldü, const.md (2026-10-03).
- ~~Stil aracı, form gerekçesi, tasarım örneği~~ → çözüldü, const.md (2026-10-03).
- ~~Vurgu rengi, sayfa yapısı, Dakay hareketi, dil~~ → çözüldü, const.md (2026-10-03).
- **Siyah vurgunun koyu zeminde görünürlüğü.** Zemin `#2B2B2B` iken siyah buton/ok zeminden
  zor ayrılır (Dakay'daki kontrast sorunuyla aynı kök). Faz 1'de denenecek adaylar:
  (a) siyah dolgu + açık gri (`#E0E0E0`) yazı/çizgi — buton kendi kenarıyla ayrılır;
  (b) siyahın göründüğü yerlerde zemini `#565656`'ya açmak; (c) tamamen açık zemin
  (`#E0E0E0`) — siyah vurgu da Dakay da doğal olarak öne çıkar, ama şablonun koyu havası
  değişir. Karar ekran görüntüleri üzerinden Arda'yla.
- ~~Anasayfa (`/`)~~ → onaylandı, const.md (2026-10-03).

## Fikirler

---

## Rafta

Şimdilik yapılmayacak, ama unutulmasın diye duranlar.

- Dakay'ın ArdaOS'taki gibi zengin animasyonu (zıplama, gözlük alna itme, ruh hâlleri).
