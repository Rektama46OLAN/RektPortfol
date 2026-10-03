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

- **CV bir PDF dosyası değildir; içeriği `/cv` sayfasına metin olarak yazılır.**
  Gerekçe: Arda'nın kararı (2026-10-03, Faz 2 içeriği verilirken). Sayfa metni hem
  okunur hem admin panelinden alan alan düzenlenebilir; PDF'i her değişiklikte yeniden
  üretip yüklemek gerekmez.

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

- **Zemin koyudur (`#2B2B2B` noir); Dakay'ın arkasında açık gri hale, siyah butonlarda açık gri kenar (`ring-silver`) bulunur.**
  Gerekçe: Dakay (grafit gövde, siyah çizgi) ve siyah vurgu noir zeminde kayboluyordu.
  Faz 1'de üç tema ekran görüntüsüyle karşılaştırıldı (`reports/faz1-kontrast/`): koyu +
  hale, orta (`#565656` zemin), açık (`#E0E0E0` zemin). Açık tema kontrastı en iyi veriyordu
  ama şablonun koyu havasını götürüyordu; Arda koyuyu seçti (2026-10-03). Bedeli: siyah
  vurgu tek başına değil, kenar çizgisiyle seçiliyor.

- **Dakay ilk sürümde statiktir; hareket sonra eklenir.**
  Gerekçe: Arda'nın kararı (2026-10-03). Önce görsel iskelet oturur, animasyon onun üstüne
  biner. ArdaOS'taki zengin animasyon rafta (notes.md).

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
