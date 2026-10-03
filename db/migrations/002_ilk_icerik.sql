-- 002: Faz 2'deki sabit içeriğin (src/lib/site.ts) veritabanına ilk aktarımı.
-- Betikle üretildi; metinler Arda'nın verdiği hâliyle.

INSERT INTO profil (ad, kisa_ad, hero_metin, hakkimda_kisa, hakkimda, eposta, cv_unvan, cv_konum, cv_hakkimda, cv_diller) VALUES (
  'Arda Kaya', 'Arda',
  'Web siteleri, masaüstü uygulamaları ve Discord botları geliştiriyorum.',
  'Muğla''da yaşayan, bilişim okuyan bir yazılımcıyım.',
  ARRAY['Muğla''da yaşayan, bilişim okuyan bir yazılımcıyım. Web siteleri, masaüstü uygulamaları ve Discord botları geliştiriyorum. En çok ilgimi çeken alan backend; verinin arka planda nasıl aktığını anlamayı seviyorum.', 'Bir şeyi sadece çalışsın diye değil, nasıl çalıştığını anlayarak yapmayı önemserim. Yazarken planlı ilerlemeye, Git ve GitHub ile düzenli çalışmaya özen gösteririm.']::text[],
  'dakayworks@gmail.com', 'Junior Yazılım Geliştirici · Python · Web · Otomasyon', 'Muğla · Uzaktan / hibrit çalışmaya açık', 'Yazılım geliştirme alanında, 2023''ten beri web projeleri geliştiriyorum. Python, JavaScript ve PHP ile gerçek kullanıcıların kullandığı masaüstü uygulamaları, Discord botları ve otomasyon sistemleri geliştiriyorum. Yapay zeka araçlarını hem geliştirme sürecimde hem günlük işlerde etkin kullanıyorum.', 'Türkçe (ana dil) · İngilizce (orta)'
);

INSERT INTO sosyal_linkler (etiket, href, gorunen, sira) VALUES ('GitHub', 'https://github.com/Rektama46OLAN', 'github.com/Rektama46OLAN', 1);
INSERT INTO sosyal_linkler (etiket, href, gorunen, sira) VALUES ('LinkedIn', 'https://www.linkedin.com/in/arda-kaya-946bb6202/', 'linkedin.com/in/arda-kaya-946bb6202', 2);
INSERT INTO sosyal_linkler (etiket, href, gorunen, sira) VALUES ('E-posta', 'mailto:dakayworks@gmail.com', 'dakayworks@gmail.com', 3);

WITH p AS (
  INSERT INTO projeler (ad, aciklama, teknolojiler, link, sira)
  VALUES ('DakLink', 'Video linkini yapıştırıp format seçerek indiren masaüstü uygulaması. YouTube, X ve TikTok üzerinde denendi.', ARRAY['Python', 'yt-dlp', 'FFmpeg', 'CustomTkinter', 'pytest']::text[], 'https://github.com/Rektama46OLAN/DakLink', 1)
  RETURNING id
)
INSERT INTO proje_gorselleri (proje_id, src, alt, en, boy, sira)
SELECT p.id, g.src, g.alt, g.en, g.boy, g.sira FROM p, (VALUES
  ('/projeler/daklink.png', 'DakLink arayüzü: link alanı, format seçimi ve İndir butonu', 717, 579, 1)
) AS g (src, alt, en, boy, sira);

WITH p AS (
  INSERT INTO projeler (ad, aciklama, teknolojiler, link, sira)
  VALUES ('E-posta Sınıflandırma', 'E-ticaret satıcılarının e-postalarını 8 kategoriye ayıran, internetsiz çalışan Windows masaüstü aracı. Sonuçları renkli tabloda gösterir ve Excel''e yazar.', ARRAY['Python', 'scikit-learn (TF-IDF + lojistik regresyon)', 'Tkinter', 'openpyxl', 'PyInstaller']::text[], 'https://github.com/Rektama46OLAN/mail-siniflandirma', 2)
  RETURNING id
)
SELECT 1 FROM p;

WITH p AS (
  INSERT INTO projeler (ad, aciklama, teknolojiler, link, sira)
  VALUES ('Algida Bot', 'Tek sunucu için yazdığım Discord moderasyon ve guard botu. Ban, kick, mute, özel ses odaları ve rol/kanal yedeği gibi özellikleri var. 300 kişilik bir sunucuda kullanılıyor.', ARRAY['Node.js', 'discord.js v14', 'dotenv', 'pm2']::text[], NULL, 3)
  RETURNING id
)
INSERT INTO proje_gorselleri (proje_id, src, alt, en, boy, sira)
SELECT p.id, g.src, g.alt, g.en, g.boy, g.sira FROM p, (VALUES
  ('/projeler/algidabot-tanitim.png', 'AlgidaBot tanıtım görseli: moderasyon, guard, rol ve kanal yedeği, özel ses odaları', 1254, 1254, 1),
  ('/projeler/algidabot-profil.png', 'Algida botunun Discord profil kartı', 289, 306, 2)
) AS g (src, alt, en, boy, sira);

WITH p AS (
  INSERT INTO projeler (ad, aciklama, teknolojiler, link, sira)
  VALUES ('ArdaOS', 'Kişisel bilgi ve proje notlarımı tuttuğum, oturumlar arası hatırlayan "ikinci beyin" sistemi. Günlük kayıtları otomatik tutar, bilgiyi derler, notlar arası bağlantı ve içerik hatalarını denetler, tüm notlarda arama yapar ve gece zamanlanmış görevlerle kendi sağlığını kontrol eder.', ARRAY['Python', 'Obsidian (Markdown)', 'Claude Code hook''ları', 'Git/GitHub', 'Windows Görev Zamanlayıcı']::text[], NULL, 4)
  RETURNING id
)
INSERT INTO proje_gorselleri (proje_id, src, alt, en, boy, sira)
SELECT p.id, g.src, g.alt, g.en, g.boy, g.sira FROM p, (VALUES
  ('/projeler/ardaos-graf.png', 'ArdaOS notlarının bağlantı grafiği', 1093, 843, 1)
) AS g (src, alt, en, boy, sira);

INSERT INTO cv_kalemleri (bolum, baslik, alt, teknolojiler, maddeler, sira) VALUES ('deneyim', 'Freelance Discord Bot Geliştirici · Algida', 'Eylül 2026', NULL, ARRAY['300 üyeli bir topluluk için moderasyon ve sunucu koruma botu; ilk sürüm 3 günde teslim, ardından 2 hafta geri bildirimle kararlı hâle getirme', 'Node.js, discord.js v14: ban/mute/kick, sunucu koruma (anti-nuke), otomatik rol, kanal kilitleme']::text[], 1);
INSERT INTO cv_kalemleri (bolum, baslik, alt, teknolojiler, maddeler, sira) VALUES ('proje', 'DakLink · Video indirme masaüstü uygulaması', 'github.com/Rektama46OLAN/DakLink', 'Python, CustomTkinter, yt-dlp, FFmpeg, PyInstaller, pytest', ARRAY['Yüzlerce siteden format seçimli video/ses indiren Windows uygulaması', 'İndirme ayrı thread''de çalışır, arayüz donmaz; iptal ve hata sonrası yeniden deneme', '90 otomatik test; exe olarak paketlendi, Başlat menüsüne kurulum']::text[], 1);
INSERT INTO cv_kalemleri (bolum, baslik, alt, teknolojiler, maddeler, sira) VALUES ('proje', 'ArdaOS · Yapay zeka destekli kişisel bilgi yönetim sistemi', NULL, 'Python, LLM API, Git, Windows Görev Zamanlayıcı', ARRAY['Yapay zekayla yapılan çalışma oturumlarını otomatik olarak günlük loglara ve aranabilir bir bilgi tabanına dönüştürür', 'Oturum kancaları, gece derlemesi, otomatik doğrulama ve bilgi tabanı denetimi katmanları', 'Otomatik git yedekleme; zamanlanmış görevlerle kendi kendine çalışır']::text[], 2);
INSERT INTO cv_kalemleri (bolum, baslik, alt, teknolojiler, maddeler, sira) VALUES ('proje', 'Web Projeleri · Kişisel projeler', '2023 – 2026', 'HTML, CSS, JavaScript, Bootstrap, PHP, MySQL', ARRAY['E-ticaret sitesi: ürün listeleme, sepet, sipariş, kullanıcı girişi, adres ve kampanya yönetimi; PHP + MySQL ile JSON API', 'İş başvuru sistemi: başvuru formu, özgeçmiş yükleme ve başvuruları yöneten admin paneli']::text[], 3);

INSERT INTO cv_yetenekler (alan, deger, sira) VALUES ('Diller', 'Python, JavaScript (Node.js), PHP, C#, HTML/CSS', 1);
INSERT INTO cv_yetenekler (alan, deger, sira) VALUES ('Veritabanı', 'MySQL', 2);
INSERT INTO cv_yetenekler (alan, deger, sira) VALUES ('Araçlar', 'Git/GitHub, VS Code, pytest, PyInstaller, XAMPP', 3);
INSERT INTO cv_yetenekler (alan, deger, sira) VALUES ('Yapay zeka', 'LLM tabanlı otomasyon, AI destekli geliştirme', 4);
