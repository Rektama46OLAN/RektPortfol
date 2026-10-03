# Sabitler (const)

Projedeki değişmez gerçekler burada tutulur. Bir şey buraya yazıldıysa verili kabul edilir;
değiştirmeden önce Arda'ya sorulur.

`notes.md` ile farkı: burası **karara bağlanmış ve artık tartışılmayan** maddeleri tutar.
`notes.md` çalışan tasarım dokümanıdır — detay, faz planı ve henüz açık maddeler oradadır.

## Yazım kuralı

Her madde: **kalın tek cümlelik karar** + altına `Gerekçe:`.
Gerekçe teoriden değil, yaşanandan yazılır — hangi sorunla karşılaşıldı, ne ölçüldü,
alternatifi neden düşürüldü. Gerekçesiz madde bir süre sonra "acaba neden böyleydi"
diye tekrar tartışılır; asıl maliyet orada.

---

## Gerçekler

### Kapsam

<!-- - **Karar cümlesi.**
       Gerekçe: neden. -->

- **Ziyaretçi tarafında dört sayfa var: Hakkımda, Projeler, CV, İletişim.**
  Gerekçe: Arda'nın 2026-10-03 tarihli kapsam kararı. Portföy sitesinin işverene göstermesi
  gereken şey bunlar; fazlası ilk sürümün kapsamı dışında.

- **İletişim sayfası yalnızca sosyal medya linklerinden oluşur; iletişim formu yapılmaz.**
  Gerekçe: Ziyaretçi Arda'ya e-posta veya sosyal medyadan istediği gibi yazabilsin — form
  kalıbına sokulmasın (Arda, 2026-10-03). Yan kazanç: form yoksa mail gönderimi, spam
  koruması ve mesaj saklama da yok.

- **Her içeriğin kendi sayfası (kendi URL'i) vardır; site tek uzun sayfa değildir.**
  Gerekçe: Arda'nın kararı (2026-10-03). Şablon tek sayfa + menü yapısında; ondan yalnızca
  stil alınır, sayfa yapısı alınmaz.

- **Anasayfa (`/`) bir giriş kapısıdır: ad + künye tablosu + yanında el sallayan Dakay ve balonu (çerçevesiz), altında dört sayfaya giden kartlar (her kartta başka bir Dakay ifadesi).**
  Gerekçe: Ayrı sayfa kararından sonra anasayfaya bir görev gerekiyordu: kim olduğunu bir
  bakışta söylemek ve dört sayfaya yönlendirmek (Arda onayı, 2026-10-03). Biçimi tasarım
  v3'te model sheet'in başlık bloğu + İFADELER bölümüne döndü; Dakay'ın etrafındaki "Tanışma"
  paneli ve kılavuz çizgileri Arda'nın isteğiyle kaldırıldı (2026-10-03).

- **CV'nin kaynağı paneldeki veridir; `/cv` sayfasında metin olarak durur, "PDF indir" `/cv.pdf`'i indirir — PDF aynı veriden sunucuda (`@react-pdf/renderer`) üretilir, elle yüklenen bir dosya yoktur.**
  Gerekçe: Arda'nın kararı (2026-10-03, Faz 2 içeriği verilirken): sayfa metni hem
  okunur hem admin panelinden alan alan düzenlenebilir; PDF'i her değişiklikte yeniden
  üretip yüklemek gerekmez. Sayfa telefonda ~3200 px'ti → Deneyim, Projeler, Yetenekler
  her genişlikte kapalı gelir (başlığa tıklayınca açılır). İlk PDF çözümü tarayıcının
  yazdırma penceresiydi; Arda "A4 olarak göstermesin, butona basınca PDF insin" dedi →
  sunucuda üretim seçildi (o anki iki seçenekten diğeri elle yüklenen PDF'ti, bu kararın
  gerekçesine ters düşüyordu). Bedeli: yeni bağımlılık ve repoda OFL lisanslı statik font
  dosyaları (`src/assets/fonts/`, ~700 KB; Türkçe harfler için statik TTF şart). PDF düzeni
  sayfanın birebir kopyası değil, A4 ve beyaz kâğıt için ayrı. Kalemlerin "alt" satırındaki
  tarihler gösterilmez, link gibi duranlar (`github.com/…`) kalır — Arda'nın isteği.

- **Telefon numarası sitede ve repoda yer almaz; iletişim e-posta ve sosyal hesaplar üzerinden.**
  Gerekçe: Repo public; git geçmişine giren numara sonradan silinse de geçmişte kalır ve
  açık sitede bot taramasıyla spam aramaya açılır. CV metninde numara vardı, commit'ten
  önce fark edildi, Arda tamamen çıkarılmasını istedi (2026-10-03). CV ekran görüntüleri
  de numarasız yeniden çekildi.

- **Site dili Türkçedir.**
  Gerekçe: Arda'nın kararı (2026-10-03). Çok dilli altyapı (i18n) kurulmaz.

- **Sitedeki tüm içerik (hakkımda, projeler, CV, linkler) admin panelinden düzenlenir.**
  Gerekçe: Arda içeriği güncellemek için koda dokunmak ya da yeniden deploy etmek istemiyor.
  Bu karar kalıcı bir veri katmanını (veritabanı + dosya depolama) zorunlu kılar.

### Stack

- **Site Next.js ile yazılır ve Vercel'de custom domain ile yayınlanır.**
  Gerekçe: İlk tercih PHP + Vercel'di. Vercel dokümanları incelendiğinde iki duvar çıktı:
  PHP yalnızca topluluk runtime'ı `vercel-php` ile çalışıyor ve Vercel bunu resmî olarak
  desteklemiyor. Ayrıca fonksiyonların dosya sistemi kalıcı değil, admin paneli için her şey
  dış servislere taşınmak zorunda. PHP'de kalıp başka bir hosting'e gitmek (seçenek B) ve
  `vercel-php` ile devam etmek (seçenek A) değerlendirildi. Arda Vercel'de kalmayı seçti ve
  backend'i Vercel'in kendi alanı olan Next.js'e taşıdı (2026-10-03).

- **Kod TypeScript ile yazılır.**
  Gerekçe: Next.js'in varsayılanı; tip hataları çalıştırmadan, yazarken yakalanır. Arda
  JS'te başlangıç seviyesinde — hatayı derleyicinin göstermesi tarayıcıda aramaktan ucuz.
  Arda onayı: 2026-10-03.

- **Stil Tailwind CSS ile yazılır.**
  Gerekçe: Arda tasarımı örnek üzerinden verdi, aracı Rekt'e bıraktı (2026-10-03). Tailwind
  Next.js kurulumunda hazır geliyor; paleti tek yerde token olarak tanımlayıp her yerde
  aynı isimle kullanmayı sağlıyor — ayrı CSS dosyalarında renk kodu dağılmıyor.

### Tasarım

- **Ziyaretçi sitesinin görsel dili Dakay'ın model sheet'idir ("karakter dosyası"): krem kâğıt, mürekkep kenar, sert gölge, dar afiş başlık, mavi mono etiket, kılavuz çizgileri.**
  Gerekçe: Önce "Technology Black Modern" şablonu (v1), sonra "dev yazı + Dakay" (v2) denendi;
  ikisini de Arda "sade, AI slop" buldu (2026-10-03). Arda Chrome'u açıp serbest araştırma
  istedi: Awwwards, Godly, Josh Comeau, Duolingo, Gumroad, Brittany Chiang gezildi. Çıkan:
  iyi örneklerde karakter sahnenin içinde, arayüzle etkileşiyor (Duolingo, Comeau); kalın
  çizgili illüstrasyon + sert gölgeli kart + konuşma balonu (Gumroad); koyu tek sütun
  (Chiang) ise artık "AI portföyü" kalıbı. Dakay'ın kendi model sheet'i bu dili zaten
  taşıyordu — başkasının şablonu yerine Arda'nın kendi dünyası. Ayrıntı `notes.md` → *Tasarım v3*.

- **Site renkleri: masa `#E4DDC3` · kâğıt `#F3EEDA` / `#EBE5CD` · mürekkep `#16171A` / `#55565C` · cetvel `#CFC7AA` · mavi `#3E6DB5`; vurgu turuncu `#FF6B1A`.**
  Gerekçe: İlk beşi model sheet'in CSS'inden birebir (`model-sheet.html` `:root`). Turuncu
  Dakay'ın sahnesindeki pufun rengi, v2'den kaldı. Turuncu yalnız **dolgu** olur, üstüne
  mürekkep yazı gelir (kâğıt üstünde turuncu yazı ~2.6:1, okunmaz). Faz 1'de açık zeminin
  Dakay'a en iyi kontrastı verdiği zaten görülmüştü (`reports/faz1-kontrast/`).

- **Admin paneli koyu kalır; Arda'nın beş gri paleti (`#2B2B2B` · `#565656` · `#848484` · `#B3B3B3` · `#E0E0E0`) orada yaşar.**
  Gerekçe: Panel yalnız Arda'nın; yeniden tasarım ziyaretçi sitesi içindi, panele dokunmak
  kapsam dışı. Gri palet: Arda, 2026-10-03, `Downloads\Esthetic and trendy 5-color palette.pdf`.

- **Fontlar: Archivo (gövde + `wdth` ekseniyle dar afiş başlık) ve IBM Plex Mono (etiketler).**
  Gerekçe: Model sheet'in fontları. Archivo'nun genişlik ekseni ayrı bir afiş fontuna gerek
  bırakmıyor; ikisi de `latin-ext` ile Türkçe karakterleri taşıyor.

- **Sitenin maskotu Dakay'dır; insan fotoğrafının yerini o alır ve her sayfada başka ifade/pozla durur.**
  Gerekçe: Arda'nın kararı (2026-10-03). Çizim ArdaOS'taki parametrik rig'den taşındı
  (`.claude/scripts/dakay/sahne.html`): 7 ifade, kol pozları, "gözlük indi". Böylece ayrı
  poz çizimi fazına (3d) gerek kalmadı. Çizim kuralları
  `🏰 300-Projects\Gozluklu-Yumurta\Gozluklu-Yumurta.md`'de; referansla çelişirse referans kazanır.

- **Dakay'ın konuşma balonlarındaki replikler koddadır (`src/lib/site.ts` → `dakayDer`), admin panelinde değil.**
  Gerekçe: Replikler içerik değil sitenin süsü — Arda hakkında bilgi taşımaz. Karakter
  notuna uyar: kısa cümle, az konuşma. Panele alan eklemek bu ihtiyaç için fazla.

- **Dakay'ın tek hareketi hafif "nefes"tir; `prefers-reduced-motion` açıkken durur. Zengin animasyon rafta.**
  Gerekçe: İlk karar "statik, hareket sonra"ydı. Nefes CSS ile bedava ve karakteri canlı
  gösteriyor; sahnedeki koreografi (zıplama, el sallama döngüsü) ayrı iş.

### Yayın ve SEO

- **Sitenin asıl adresi `https://ardakaya.com`; `www` ve `http` ona 308 ile yönlenir. Alan adı Metunic'te kayıtlı, DNS'i Vercel yönetir (ns1/ns2.vercel-dns.com).**
  Gerekçe: Arda'nın kararları (2026-10-03). Kısa adres CV'ye ve LinkedIn'e yazmaya uygun.
  DNS Vercel'e taşındı çünkü Metunic'te bölge açılmamıştı (ad sunucuları REFUSED dönüyordu)
  ve Vercel'de kayıtlar CLI'den yönetilebiliyor. Search Console doğrulama TXT kaydı da orada.

- **Her ziyaretçi sayfası kanonik adresini (`ardakaya.com/...`) ve kendi açıklamasını bildirir; anasayfa schema.org `Person` + `WebSite` (JSON-LD) taşır; `sitemap.xml` ve `robots.txt` (`/admin` kapalı) koddan üretilir.**
  Gerekçe: Hedef "Arda Kaya" aramasında Google'ın siteyi Arda'ya bağlaması (Arda, 2026-10-03).
  Site `rektportfol.vercel.app`'te de açıldığı için kanonik adres kopyaların gücü bölmesini
  önler. `Person.sameAs` panelden gelen GitHub/LinkedIn linkleridir; e-posta JSON-LD'ye
  bilerek konmadı.

- **Unvan yalnız panelde, tek yerde durur (profil → CV unvanı); site açıklaması, Hakkımda açıklaması ve kişi bilgisindeki iş unvanı ondan türetilir (`kisaUnvan`). Unvanda "Junior" yoktur: "Yazılım Geliştirici".**
  Gerekçe: Arda "Junior"ı her yerden kaldırmak ve bir daha uğraşmamak istedi (2026-10-03).
  İlk SEO sürümünde açıklamalar unvanı koda elle yazıyordu — unvan değişince iki yeri daha
  düzeltmek gerekirdi. Tek istisna paylaşım görseli: sabit PNG, unvan değişirse yeniden üretilir.

- **Paylaşım görseli (`src/app/opengraph-image.png`, 1200×630) sabit bir PNG'dir; sitenin kendi bileşenleriyle çizilip ekran görüntüsü alınmıştır.**
  Gerekçe: Next'in `ImageResponse`'u Türkçe karakter için statik bir TTF/WOFF ister; bunun
  için yeni font paketi ya da dış indirme gerekirdi. Sabit PNG yeni bağımlılık getirmiyor.
  Bedeli: ad ya da unvan panelden değişirse görsel elle yeniden üretilir.

### Mimari

- **Veritabanı Postgres'tir (Neon, Vercel Marketplace üzerinden bağlanır).**
  Gerekçe: Admin paneli içeriği kalıcı saklamak zorunda, Vercel fonksiyonlarının dosya
  sistemi ise kalıcı değil — veri dışarıda barındırılan bir DB'de durmalı. XAMPP'taki MySQL
  yalnızca lokalde çalışıyor; Neon Vercel'e doğrudan bağlanıyor, bağlantı bilgisi env
  değişkeni olarak otomatik geliyor. Arda onayı: 2026-10-03.

- **Veritabanına ORM'siz, düz SQL ile erişilir (`@neondatabase/serverless`).**
  Gerekçe: Yedi küçük tablo için ORM (Drizzle/Prisma) ek kavram katmanı ve bağımlılık
  getirir; düz SQL'de her sorgu açıkça görünür — Arda'nın backend öğrenme hedefine en
  şeffaf yol. Arda onayı: 2026-10-03.

- **Şema değişiklikleri `db/migrations/` altında numaralı SQL dosyalarıyla yapılır; hangilerinin çalıştığı veritabanındaki `schema_migrations` tablosunda tutulur.**
  Gerekçe: Her değişiklik git'te okunur bir SQL dosyası olarak kalır; Neon panelinden elle
  çalıştırmak yerel ve canlıyı ayrıştırırdı. Bir migration dosyası çalıştıktan sonra
  değiştirilmez — düzeltme yeni numarayla gelir. Arda onayı: 2026-10-03.

- **Sayfalar veriyi Next 16 Cache Components ile önbellekten okur (`'use cache'` + `cacheTag('icerik')` + `cacheLife('minutes')`); admin kaydedince etiket anında yenilenir.**
  Gerekçe: Her ziyarette DB sorgusu hem yavaş hem Neon ücretsiz kotasını harcar; tamamen
  statik sayfa ise admin değişikliğini göstermez. Önbellek en geç ~1 dakikada tazelenir,
  Faz 3b'de admin işlemleri etiketi anında geçersiz kılar. Arda onayı: 2026-10-03.

- **Yerel geliştirme Neon'un `dev` dalını, canlı site `main` dalını kullanır; migration önce dev'e (`db:migrate`), sonra canlıya (`db:migrate:canli`) uygulanır.**
  Gerekçe: Faz 3b-1 e2e testinde yerel ve canlının aynı veritabanını kullandığı görüldü —
  test metni birkaç saniye canlı veritabanında durdu. Dev dalı `main`'in kopyası olarak
  açıldı; `.env.development.local` yalnız `next dev` ve `db:migrate`'e girer. Ayrım
  doğrulandı: dev dalına yazılan işaret yerel sunucuda göründü, canlıda görünmedi.
  Arda onayı: 2026-10-03.

- **Yüklenen dosyalar (proje görselleri) Vercel Blob'da tutulur.**
  Gerekçe: Aynı kalıcılık duvarı — sunucuya yazılan dosya bir sonraki çağrıda yok olabilir.
  Blob Vercel'in kendi depolaması, ek hesap gerektirmiyor. Arda onayı: 2026-10-03.
  (İlk hâlinde "CV PDF'i" de vardı; CV PDF olmaktan çıkınca düştü, aşağıya bkz.)

- **Admin oturumu HMAC imzalı bir çerezdir (`admin_oturum` = `<bitiş>.<imza>`, 7 gün, HttpOnly + SameSite=Lax + canlıda Secure); imza anahtarı `ADMIN_SIFRE`'den türetilir.**
  Gerekçe: Tek kullanıcı için oturum tablosu ya da iron-session gibi ek kütüphane gereksiz;
  ek env değişkeni de istemiyor. Anahtar şifreden türediği için şifre değişince bütün açık
  oturumlar kendiliğinden düşer. Faz 3b-1 e2e testinde çerez bayrakları doğrulandı.
  Arda onayı: 2026-10-03.

- **Girişte deneme sınırı: bir IP'den 15 dakikada 5 başarısız deneme → o IP kilitlenir, doğru şifre de reddedilir. Sayaç `giris_denemeleri` tablosunda.**
  Gerekçe: Panel internete açık; Arda'nın ilk önerdiği şifre 4 haneliydi (10.000 olasılık).
  Şifre 32 karaktere çıktı ama sınır, şifreden bağımsız ikinci katman. Serverless'ta bellek
  örnekler arasında paylaşılmadığı için sayaç veritabanında. Arda onayı: 2026-10-03.

- **Admin girişi tek kullanıcılıdır; şifre env değişkeninde durur, kullanıcı tablosu ve OAuth yoktur.**
  Gerekçe: Panele yalnızca Arda girecek. Kullanıcı yönetimi, kayıt, rol sistemi bu ihtiyaç
  için over-engineering. Şifre koda ya da git'e girmez. Arda onayı: 2026-10-03.

### Geliştirme
