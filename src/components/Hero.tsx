import Link from "next/link";
import Balon from "@/components/Balon";
import Dakay, { type Ifade } from "@/components/Dakay";
import { getProfil, getProjeler } from "@/lib/icerik";
import { dakayDer } from "@/lib/site";

// Anasayfa — Dakay'ın model sheet'i gibi kurulur: başlık bloğu + künye tablosu solda,
// el sallayan Dakay ve balonu sağda (çerçevesiz, Arda'nın isteği); altta model sheet'in İFADELER bölümü gibi
// her sayfaya giden bir kart, her kartta başka bir Dakay ifadesi.

const KAPILAR: { href: string; baslik: string; metin: string; ifade: Ifade; gozlukIndi?: boolean }[] = [
  { href: "/hakkimda", baslik: "Hakkımda", metin: "Kim, nereden, neyi seviyor.", ifade: "smirk" },
  { href: "/projeler", baslik: "Projeler", metin: "Yaptığı işler ve kullandığı teknolojiler.", ifade: "sus" },
  { href: "/cv", baslik: "CV", metin: "Deneyim, yetenekler, diller.", ifade: "def" },
  { href: "/iletisim", baslik: "İletişim", metin: "GitHub, LinkedIn, e-posta.", ifade: "meh", gozlukIndi: true },
];

export default async function Hero() {
  const [profil, projeler] = await Promise.all([getProfil(), getProjeler()]);
  const [konum, ...calisma] = profil.cv_konum.split("·").map((s) => s.trim());
  const kunye = [
    { ad: "Konum", deger: konum },
    { ad: "Çalışma", deger: calisma.join(" · ") || "—" },
    { ad: "Proje", deger: `${projeler.length} iş` },
    { ad: "E-posta", deger: profil.eposta },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 sm:px-8">
      <section className="grid gap-10 pt-6 pb-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:pt-10">
        <div>
          <p className="etiket text-[13px] text-mavi">Portfolyo</p>
          <h1 className="afis mt-4 pt-[0.08em] text-[clamp(4rem,13vw,9.5rem)]">{profil.ad}</h1>
          <p className="mt-5 max-w-[46ch] text-xl leading-relaxed text-murekkep-2">{profil.hero_metin}</p>

          <dl className="mt-8 grid max-w-xl grid-cols-2 border-2 border-murekkep bg-kagit text-sm">
            {kunye.map((k, i) => (
              <div
                key={k.ad}
                className={`min-w-0 px-3 py-2 ${i % 2 === 0 ? "border-r border-murekkep" : ""} ${i < 2 ? "border-b border-murekkep" : ""}`}
              >
                <dt className="etiket text-[10px] text-murekkep-2">{k.ad}</dt>
                <dd className="truncate font-semibold [font-stretch:85%]">{k.deger}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/projeler" className="basilir rounded-full border-2 border-murekkep bg-turuncu px-6 py-3 font-semibold">
              Projelere bak →
            </Link>
            <Link href="/cv" className="basilir rounded-full border-2 border-murekkep bg-kagit px-6 py-3 font-semibold hover:bg-turuncu">
              CV&apos;yi oku
            </Link>
          </div>
        </div>

        <div className="flex items-end justify-center gap-3 lg:self-center">
          <Balon satirlar={dakayDer.anasayfa} kuyruk="sag" className="mb-56 max-sm:mb-40" />
          <Dakay ifade="smirk" sag="waveR" etiket="" className="nefes w-[min(16rem,48%)]" />
        </div>
      </section>

      <section aria-labelledby="kapilar">
        <h2 id="kapilar" className="afis border-b-2 border-murekkep pb-3 text-3xl">
          Nereye bakalım?
        </h2>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {KAPILAR.map((k) => (
            <li key={k.href}>
              <Link href={k.href} className="basilir group block h-full border-2 border-murekkep bg-kagit">
                <div className="flex h-36 items-end justify-center overflow-hidden border-b-2 border-murekkep bg-kagit-2">
                  <Dakay
                    kirp="kafa"
                    ifade={k.ifade}
                    gozlukIndi={k.gozlukIndi}
                    etiket=""
                    className="w-44 translate-y-2 transition-transform duration-200 group-hover:translate-y-0"
                  />
                </div>
                <div className="p-4">
                  <h3 className="afis text-3xl">{k.baslik}</h3>
                  <p className="mt-2 text-sm text-murekkep-2">{k.metin}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
