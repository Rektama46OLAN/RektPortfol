// CV'nin PDF hâli (/cv.pdf). Sayfadaki CV'yle aynı veriden üretilir; düzeni A4 için ayrı:
// beyaz kâğıt (yazıcı mürekkebi harcamasın), sitenin fontları ve turuncu madde imleri.
// Fontlar src/assets/fonts/ (OFL); Türkçe harfler için statik TTF gerekiyor.
import { join } from "node:path";
import { Document, Font, Link, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import type { CvKalem, Profil, SosyalLink, Yetenek } from "@/lib/icerik";
import { linkMi } from "@/lib/cv";

const fontKlasoru = join(process.cwd(), "src", "assets", "fonts");
Font.register({
  family: "Archivo",
  fonts: [
    { src: join(fontKlasoru, "Archivo-Regular.ttf"), fontWeight: 400 },
    { src: join(fontKlasoru, "Archivo-SemiBold.ttf"), fontWeight: 600 },
  ],
});
Font.register({ family: "ArchivoDar", src: join(fontKlasoru, "ArchivoExtraCondensed-ExtraBold.ttf") });
Font.register({ family: "PlexMono", src: join(fontKlasoru, "IBMPlexMono-Medium.ttf") });
// Varsayılan heceleme İngilizce kurallarıyla Türkçe kelimeleri bölüyor; kelimeler bölünmez.
Font.registerHyphenationCallback((kelime) => [kelime]);

const MUREKKEP = "#16171A";
const IKINCIL = "#55565C";
const CETVEL = "#CFC7AA";
const MAVI = "#3E6DB5";
const TURUNCU = "#FF6B1A";

// Büyük harf Türkçe kuralla: react-pdf'in textTransform'u i → I yapıyor (DENEYIM, DILLER).
const buyuk = (metin: string) => metin.toLocaleUpperCase("tr-TR");

const s = StyleSheet.create({
  sayfa: { paddingVertical: 32, paddingHorizontal: 40, fontFamily: "Archivo", fontSize: 9.5, color: MUREKKEP, lineHeight: 1.4 },
  etiket: { fontFamily: "PlexMono", fontSize: 7.5, letterSpacing: 1.2, color: MAVI },
  ad: { fontFamily: "ArchivoDar", fontSize: 40, lineHeight: 1, marginTop: 6 },
  unvan: { fontSize: 12, fontWeight: 600, marginTop: 6 },
  kunye: { flexDirection: "row", flexWrap: "wrap", marginTop: 12, borderWidth: 1, borderColor: MUREKKEP },
  kunyeHucre: { width: "50%", paddingVertical: 5, paddingHorizontal: 8, borderColor: MUREKKEP },
  kunyeAd: { fontFamily: "PlexMono", fontSize: 6.5, letterSpacing: 1, color: IKINCIL },
  kunyeDeger: { fontSize: 9, fontWeight: 600, color: MUREKKEP, textDecoration: "none" },
  ayrac: { borderBottomWidth: 1.5, borderColor: MUREKKEP, marginTop: 12 },
  bolum: { flexDirection: "row", paddingTop: 9, paddingBottom: 7, borderBottomWidth: 0.75, borderColor: CETVEL },
  bolumBaslik: { width: 108, fontFamily: "ArchivoDar", fontSize: 14, letterSpacing: 0.3 },
  bolumIcerik: { flex: 1 },
  kalem: { marginBottom: 7 },
  kalemBaslik: { fontSize: 10.5, fontWeight: 600 },
  kalemAlt: { fontFamily: "PlexMono", fontSize: 7.5, color: MAVI, marginTop: 1 },
  kalemTek: { fontSize: 8.5, color: IKINCIL, marginTop: 1 },
  madde: { flexDirection: "row", marginTop: 2 },
  imlec: { width: 5, height: 5, backgroundColor: TURUNCU, borderWidth: 0.75, borderColor: MUREKKEP, marginTop: 4, marginRight: 7 },
  maddeMetin: { flex: 1 },
  yetenek: { flexDirection: "row", marginBottom: 3 },
  yetenekAd: { width: 82, fontFamily: "PlexMono", fontSize: 7, color: MAVI, letterSpacing: 0.8, paddingTop: 2 },
});

function Bolum({ baslik, children }: { baslik: string; children: React.ReactNode }) {
  return (
    // wrap={false} yok: uzun bölüm sayfa sonunda bölünebilir; kalemler kendi içinde bölünmez.
    <View style={s.bolum}>
      <Text style={s.bolumBaslik}>{buyuk(baslik)}</Text>
      <View style={s.bolumIcerik}>{children}</View>
    </View>
  );
}

function Kalemler({ kalemler }: { kalemler: CvKalem[] }) {
  return kalemler.map((k) => (
    <View key={k.id} style={s.kalem} wrap={false}>
      <Text style={s.kalemBaslik}>{k.baslik}</Text>
      {k.alt && linkMi(k.alt) && <Text style={s.kalemAlt}>{k.alt}</Text>}
      {k.teknolojiler && <Text style={s.kalemTek}>{k.teknolojiler}</Text>}
      {k.maddeler.map((m) => (
        <View key={m} style={s.madde}>
          <View style={s.imlec} />
          <Text style={s.maddeMetin}>{m}</Text>
        </View>
      ))}
    </View>
  ));
}

export default function CvBelgesi({
  profil,
  sosyal,
  cv,
}: {
  profil: Profil;
  sosyal: SosyalLink[];
  cv: { deneyim: CvKalem[]; projeler: CvKalem[]; yetenekler: Yetenek[] };
}) {
  const kunye = [
    { ad: "Konum", deger: profil.cv_konum },
    { ad: "E-posta", deger: profil.eposta, href: `mailto:${profil.eposta}` },
    ...sosyal.filter((l) => !l.href.startsWith("mailto:")).map((l) => ({ ad: l.etiket, deger: l.gorunen, href: l.href })),
  ];
  return (
    <Document title={`${profil.ad} — CV`} author={profil.ad} language="tr">
      <Page size="A4" style={s.sayfa}>
        <Text style={s.etiket}>{buyuk("Özgeçmiş · CV")}</Text>
        <Text style={s.ad}>{buyuk(profil.ad)}</Text>
        <Text style={s.unvan}>{profil.cv_unvan}</Text>

        <View style={s.kunye}>
          {kunye.map((k, i) => (
            <View
              key={k.ad}
              style={[
                s.kunyeHucre,
                // İç çizgiler: sağ sütunla aradaki dikey çizgi, son satır dışındaki yatay çizgi.
                i % 2 === 0 && i + 1 < kunye.length ? { borderRightWidth: 1 } : {},
                i < kunye.length - (kunye.length % 2 === 0 ? 2 : 1) ? { borderBottomWidth: 1 } : {},
                kunye.length % 2 === 1 && i === kunye.length - 1 ? { width: "100%" } : {},
              ]}
            >
              <Text style={s.kunyeAd}>{buyuk(k.ad)}</Text>
              {k.href ? (
                <Link src={k.href} style={s.kunyeDeger}>
                  {k.deger}
                </Link>
              ) : (
                <Text style={s.kunyeDeger}>{k.deger}</Text>
              )}
            </View>
          ))}
        </View>
        <View style={s.ayrac} />

        <Bolum baslik="Hakkımda">
          <Text>{profil.cv_hakkimda}</Text>
        </Bolum>
        {cv.deneyim.length > 0 && (
          <Bolum baslik="Deneyim">
            <Kalemler kalemler={cv.deneyim} />
          </Bolum>
        )}
        {cv.projeler.length > 0 && (
          <Bolum baslik="Projeler">
            <Kalemler kalemler={cv.projeler} />
          </Bolum>
        )}
        {cv.yetenekler.length > 0 && (
          <Bolum baslik="Yetenekler">
            {cv.yetenekler.map((y) => (
              <View key={y.alan} style={s.yetenek}>
                <Text style={s.yetenekAd}>{buyuk(y.alan)}</Text>
                <Text style={s.maddeMetin}>{y.deger}</Text>
              </View>
            ))}
          </Bolum>
        )}
        <Bolum baslik="Diller">
          <Text>{profil.cv_diller}</Text>
        </Bolum>
      </Page>
    </Document>
  );
}
