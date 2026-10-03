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

- **Anasayfa (`/`) şablonun hero'sudur: büyük başlık, ortada Dakay, sağda üç kısa blok; menü ve bloklar dört sayfaya link verir.**
  Gerekçe: Ayrı sayfa kararından sonra şablonun en karakteristik parçası olan hero'ya bir
  yer gerekiyordu; giriş kapısı olarak anasayfaya oturdu. Rekt önerdi, Arda onayladı
  (2026-10-03).

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

- **Görsel yön "Technology Black Modern" Webflow şablonudur: koyu zemin, büyük başlık, ortada figür, yanda kısa bloklar.**
  Gerekçe: Arda'nın verdiği tasarım örneği (2026-10-03). Kaynak:
  `C:\Users\Arda\Downloads\Technology Black Modern Webflow website template.pdf`.

- **Ana palet beş gridir: `#2B2B2B` Charcoal Noir · `#565656` Ironclad Grey · `#848484` Urban Fog · `#B3B3B3` Moonlit Silver · `#E0E0E0` Cloud Veil.**
  Gerekçe: Arda'nın verdiği palet (2026-10-03). Kaynak:
  `C:\Users\Arda\Downloads\Esthetic and trendy 5-color palette.pdf`.

- **Sitenin maskotu Dakay'dır; şablondaki insan fotoğrafının yerini o alır.**
  Gerekçe: Arda'nın kararı (2026-10-03) — bütün sitenin maskotu olsun istiyor. Dakay
  ArdaOS'ta zaten SVG olarak çizilmiş; model sheet, palet, oranlar ve "Yapma" listesi
  `C:\obsidianvault\obsidianvault\🏰 300-Projects\Gozluklu-Yumurta\Gozluklu-Yumurta.md`'de.
  Siteye çizim anahtarından SVG olarak taşınır; o nottaki çizim kuralları burada da geçerli.

- **Vurgu rengi siyahtır; palet siyah + beş gri olarak çalışır.**
  Gerekçe: Arda'nın kararı (2026-10-03) — şablondaki mavi vurgu alınmaz, siyah-gri ortaklığı
  isteniyor. Siyah Dakay'ın çizgi ve gözlük rengiyle de aynı aile.

- **Dakay ilk sürümde statiktir; hareket sonra eklenir.**
  Gerekçe: Arda'nın kararı (2026-10-03). Önce görsel iskelet oturur, animasyon onun üstüne
  biner. ArdaOS'taki zengin animasyon rafta (notes.md).

### Mimari

- **Veritabanı Postgres'tir (Neon, Vercel Marketplace üzerinden bağlanır).**
  Gerekçe: Admin paneli içeriği kalıcı saklamak zorunda, Vercel fonksiyonlarının dosya
  sistemi ise kalıcı değil — veri dışarıda barındırılan bir DB'de durmalı. XAMPP'taki MySQL
  yalnızca lokalde çalışıyor; Neon Vercel'e doğrudan bağlanıyor, bağlantı bilgisi env
  değişkeni olarak otomatik geliyor. Arda onayı: 2026-10-03.

- **Yüklenen dosyalar (CV PDF'i, proje görselleri) Vercel Blob'da tutulur.**
  Gerekçe: Aynı kalıcılık duvarı — sunucuya yazılan dosya bir sonraki çağrıda yok olabilir.
  Blob Vercel'in kendi depolaması, ek hesap gerektirmiyor. Arda onayı: 2026-10-03.

- **Admin girişi tek kullanıcılıdır; şifre env değişkeninde durur, kullanıcı tablosu ve OAuth yoktur.**
  Gerekçe: Panele yalnızca Arda girecek. Kullanıcı yönetimi, kayıt, rol sistemi bu ihtiyaç
  için over-engineering. Şifre koda ya da git'e girmez. Arda onayı: 2026-10-03.

### Geliştirme
