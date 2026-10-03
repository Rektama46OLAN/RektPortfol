import { getProfil, getSosyalLinkler } from "@/lib/icerik";
import { SITE_ADRESI, kisaUnvan } from "@/lib/seo";

// Google'a makinenin okuyacağı biçimde "bu site Arda Kaya'nın" der (schema.org Person + WebSite).
// sameAs: Arda'nın bilinen profilleri — isim aramasında Google'ın siteyi kişiye bağlamasını sağlar.
// Bilgiler panelden gelir; e-posta bilerek yok (bot toplamasın, sayfada zaten link var).
export default async function KisiBilgisi() {
  const [profil, sosyal] = await Promise.all([getProfil(), getSosyalLinkler()]);
  const kisi = {
    "@type": "Person",
    "@id": `${SITE_ADRESI}/#kisi`,
    name: profil.ad,
    url: SITE_ADRESI,
    image: `${SITE_ADRESI}/opengraph-image.png`,
    jobTitle: kisaUnvan(profil.cv_unvan),
    description: profil.hero_metin,
    address: { "@type": "PostalAddress", addressLocality: profil.cv_konum.split("·")[0].trim(), addressCountry: "TR" },
    sameAs: sosyal.filter((s) => s.href.startsWith("https://")).map((s) => s.href),
  };
  const veri = {
    "@context": "https://schema.org",
    "@graph": [
      kisi,
      { "@type": "WebSite", "@id": `${SITE_ADRESI}/#site`, url: SITE_ADRESI, name: profil.ad, inLanguage: "tr", publisher: { "@id": kisi["@id"] } },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // Next rehberi: JSON.stringify "<" kaçırmaz; panelden gelen metin script'i kapatamasın.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(veri).replace(/</g, "\\u003c") }}
    />
  );
}
