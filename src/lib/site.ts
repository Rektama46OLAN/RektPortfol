// Faz 2 için sabit veri. Faz 3a'da veritabanından okunacak (const.md: içerik admin panelinden).
// Metinler Arda'nın verdiği hâliyle (2026-10-03); Rekt kelime değiştirmez.

export const menu = [
  { href: "/hakkimda", etiket: "Hakkımda" },
  { href: "/projeler", etiket: "Projeler" },
  { href: "/cv", etiket: "CV" },
  { href: "/iletisim", etiket: "İletişim" },
];

export const eposta = "dakayworks@gmail.com";

export const sosyal = [
  { href: "https://github.com/Rektama46OLAN", etiket: "GitHub", gorunen: "github.com/Rektama46OLAN" },
  {
    href: "https://www.linkedin.com/in/arda-kaya-946bb6202/",
    etiket: "LinkedIn",
    gorunen: "linkedin.com/in/arda-kaya-946bb6202",
  },
  { href: `mailto:${eposta}`, etiket: "E-posta", gorunen: eposta },
];

export const hakkimda = [
  "Muğla'da yaşayan, bilişim okuyan bir yazılımcıyım. Web siteleri, masaüstü uygulamaları ve Discord botları geliştiriyorum. En çok ilgimi çeken alan backend; verinin arka planda nasıl aktığını anlamayı seviyorum.",
  "Bir şeyi sadece çalışsın diye değil, nasıl çalıştığını anlayarak yapmayı önemserim. Yazarken planlı ilerlemeye, Git ve GitHub ile düzenli çalışmaya özen gösteririm.",
];

export type Gorsel = { src: string; alt: string; en: number; boy: number };

export type Proje = {
  ad: string;
  aciklama: string;
  teknolojiler: string[];
  link?: string;
  gorseller: Gorsel[];
};

export const projeler: Proje[] = [
  {
    ad: "DakLink",
    aciklama:
      "Video linkini yapıştırıp format seçerek indiren masaüstü uygulaması. YouTube, X ve TikTok üzerinde denendi.",
    teknolojiler: ["Python", "yt-dlp", "FFmpeg", "CustomTkinter", "pytest"],
    link: "https://github.com/Rektama46OLAN/DakLink",
    gorseller: [
      { src: "/projeler/daklink.png", alt: "DakLink arayüzü: link alanı, format seçimi ve İndir butonu", en: 717, boy: 579 },
    ],
  },
  {
    ad: "E-posta Sınıflandırma",
    aciklama:
      "E-ticaret satıcılarının e-postalarını 8 kategoriye ayıran, internetsiz çalışan Windows masaüstü aracı. Sonuçları renkli tabloda gösterir ve Excel'e yazar.",
    teknolojiler: ["Python", "scikit-learn (TF-IDF + lojistik regresyon)", "Tkinter", "openpyxl", "PyInstaller"],
    link: "https://github.com/Rektama46OLAN/mail-siniflandirma",
    gorseller: [],
  },
  {
    ad: "Algida Bot",
    aciklama:
      "Tek sunucu için yazdığım Discord moderasyon ve guard botu. Ban, kick, mute, özel ses odaları ve rol/kanal yedeği gibi özellikleri var. 300 kişilik bir sunucuda kullanılıyor.",
    teknolojiler: ["Node.js", "discord.js v14", "dotenv", "pm2"],
    gorseller: [
      { src: "/projeler/algidabot-tanitim.png", alt: "AlgidaBot tanıtım görseli: moderasyon, guard, rol ve kanal yedeği, özel ses odaları", en: 1254, boy: 1254 },
      { src: "/projeler/algidabot-profil.png", alt: "Algida botunun Discord profil kartı", en: 289, boy: 306 },
    ],
  },
  {
    ad: "ArdaOS",
    aciklama:
      "Kişisel bilgi ve proje notlarımı tuttuğum, oturumlar arası hatırlayan \"ikinci beyin\" sistemi. Günlük kayıtları otomatik tutar, bilgiyi derler, notlar arası bağlantı ve içerik hatalarını denetler, tüm notlarda arama yapar ve gece zamanlanmış görevlerle kendi sağlığını kontrol eder.",
    teknolojiler: ["Python", "Obsidian (Markdown)", "Claude Code hook'ları", "Git/GitHub", "Windows Görev Zamanlayıcı"],
    gorseller: [
      { src: "/projeler/ardaos-graf.png", alt: "ArdaOS notlarının bağlantı grafiği", en: 1093, boy: 843 },
    ],
  },
];

export type CvKalem = { baslik: string; alt?: string; teknolojiler?: string; maddeler: string[] };

export const cv = {
  ad: "Arda Kaya",
  unvan: "Junior Yazılım Geliştirici · Python · Web · Otomasyon",
  konum: "Muğla · Uzaktan / hibrit çalışmaya açık",
  hakkimda:
    "Yazılım geliştirme alanında, 2023'ten beri web projeleri geliştiriyorum. Python, JavaScript ve PHP ile gerçek kullanıcıların kullandığı masaüstü uygulamaları, Discord botları ve otomasyon sistemleri geliştiriyorum. Yapay zeka araçlarını hem geliştirme sürecimde hem günlük işlerde etkin kullanıyorum.",
  deneyim: [
    {
      baslik: "Freelance Discord Bot Geliştirici · Algida",
      alt: "Eylül 2026",
      maddeler: [
        "300 üyeli bir topluluk için moderasyon ve sunucu koruma botu; ilk sürüm 3 günde teslim, ardından 2 hafta geri bildirimle kararlı hâle getirme",
        "Node.js, discord.js v14: ban/mute/kick, sunucu koruma (anti-nuke), otomatik rol, kanal kilitleme",
      ],
    },
  ] as CvKalem[],
  projeler: [
    {
      baslik: "DakLink · Video indirme masaüstü uygulaması",
      alt: "github.com/Rektama46OLAN/DakLink",
      teknolojiler: "Python, CustomTkinter, yt-dlp, FFmpeg, PyInstaller, pytest",
      maddeler: [
        "Yüzlerce siteden format seçimli video/ses indiren Windows uygulaması",
        "İndirme ayrı thread'de çalışır, arayüz donmaz; iptal ve hata sonrası yeniden deneme",
        "90 otomatik test; exe olarak paketlendi, Başlat menüsüne kurulum",
      ],
    },
    {
      baslik: "ArdaOS · Yapay zeka destekli kişisel bilgi yönetim sistemi",
      teknolojiler: "Python, LLM API, Git, Windows Görev Zamanlayıcı",
      maddeler: [
        "Yapay zekayla yapılan çalışma oturumlarını otomatik olarak günlük loglara ve aranabilir bir bilgi tabanına dönüştürür",
        "Oturum kancaları, gece derlemesi, otomatik doğrulama ve bilgi tabanı denetimi katmanları",
        "Otomatik git yedekleme; zamanlanmış görevlerle kendi kendine çalışır",
      ],
    },
    {
      baslik: "Web Projeleri · Kişisel projeler",
      alt: "2023 – 2026",
      teknolojiler: "HTML, CSS, JavaScript, Bootstrap, PHP, MySQL",
      maddeler: [
        "E-ticaret sitesi: ürün listeleme, sepet, sipariş, kullanıcı girişi, adres ve kampanya yönetimi; PHP + MySQL ile JSON API",
        "İş başvuru sistemi: başvuru formu, özgeçmiş yükleme ve başvuruları yöneten admin paneli",
      ],
    },
  ] as CvKalem[],
  yetenekler: [
    { alan: "Diller", deger: "Python, JavaScript (Node.js), PHP, C#, HTML/CSS" },
    { alan: "Veritabanı", deger: "MySQL" },
    { alan: "Araçlar", deger: "Git/GitHub, VS Code, pytest, PyInstaller, XAMPP" },
    { alan: "Yapay zeka", deger: "LLM tabanlı otomasyon, AI destekli geliştirme" },
  ],
  diller: "Türkçe (ana dil) · İngilizce (orta)",
};
