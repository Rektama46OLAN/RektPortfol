// Arama motorları için sabitler. Sitenin asıl adresi ardakaya.com (const.md, Faz 4);
// site rektportfol.vercel.app'te de açıldığı için her sayfa kanonik adresini bildirir.
export const SITE_ADRESI = "https://ardakaya.com";

// Ziyaretçi sayfaları — sitemap.ts buradan üretilir. Admin bilerek yok (robots.ts'de kapalı).
export const sayfalar = ["/", "/hakkimda", "/projeler", "/cv", "/iletisim"] as const;

// Unvan tek yerde: paneldeki CV unvanının ilk parçası ("Yazılım Geliştirici · Python · …" →
// "Yazılım Geliştirici"). Açıklamalar, kişi bilgisi buradan okur — unvan değişince koda dokunulmaz.
export const kisaUnvan = (cvUnvan: string) => cvUnvan.split("·")[0].trim();
