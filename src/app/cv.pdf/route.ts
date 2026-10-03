import { renderToBuffer } from "@react-pdf/renderer";
import CvBelgesi from "@/components/CvBelgesi";
import { pdfDosyaAdi } from "@/lib/cv";
import { getCv, getProfil, getSosyalLinkler } from "@/lib/icerik";

// CV'yi PDF dosyası olarak verir; /cv'deki "PDF indir" buraya bağlanır (const.md).
// Veri önbellekli okuyuculardan gelir ('use cache' + cacheTag('icerik')): Cache Components'ta
// GET route'u sayfalar gibi önceden üretilir, panel kaydedince (updateTag) yenilenir.
export async function GET() {
  const [profil, sosyal, cv] = await Promise.all([getProfil(), getSosyalLinkler(), getCv()]);
  // Bileşen fonksiyon olarak çağrılır: renderToBuffer kökte <Document> öğesi bekliyor (hook yok).
  const pdf = await renderToBuffer(CvBelgesi({ profil, sosyal, cv }));
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${pdfDosyaAdi(profil.ad)}"`,
    },
  });
}
