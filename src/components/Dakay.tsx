import { useId } from "react";

// Dakay — sitenin maskotu. Parametrik çizim: ifade + kol pozu + gözlük indi.
// Kaynak: ArdaOS vault'u, .claude/scripts/dakay/sahne.html rig'i (model sheet'ten türetilmiş).
// Sayılar oradan birebir; çizim kuralları 🏰 300-Projects/Gozluklu-Yumurta notunda,
// referansla çelişirse referans kazanır.

const CIZGI = "#0B0B0D";
const UZUV = "#474A51";
const GOLGE_CIZGI = "#2C2E34";

const GOVDE =
  "M110,40 C150,40 172,110 178,160 C184,205 160,232 110,232 C60,232 36,205 42,160 C48,110 70,40 110,40 Z";
const EL = "M-5,-4 C-7,4 -7,13 -3,17 C0,20 4,18 5,14 L5,10 C7,12 10,12 10,9 C10,5 7,2 5,-2 Z";
const BACAK =
  "M0,0 L0,41 L-2,46 C-3,49 -2,51 1,51 L10,51 C18,51 22,50 21,47 C20,43 16,41 9,41 L9,0 Z";

// İfadeler: kaşlar (bL/bR), kaş kalınlığı, kırışık, ağız, "o" ağız, gamze, çene, gözlük kayması/dönmesi.
const IFADELER = {
  def: { bL: [78, 62, 92, 57, 102, 63], bR: [142, 62, 128, 57, 118, 63], bw: 2.6, fur: 1, m: [98, 107, 110, 105.5, 122, 107], mo: 0, dim: 0, chin: 1, gy: 0, gr: 0 },
  meh: { bL: [78, 61, 90, 60.5, 102, 61], bR: [142, 61, 130, 60.5, 118, 61], bw: 2.6, fur: 0.5, m: [99, 107, 110, 107, 121, 107], mo: 0, dim: 0, chin: 1, gy: 0, gr: 0 },
  sus: { bL: [78, 62, 92, 57, 102, 63], bR: [143, 54, 131, 47, 118, 56], bw: 2.6, fur: 0, m: [99, 108.5, 110, 107.5, 121, 105], mo: 0, dim: 0, chin: 1, gy: 0, gr: 0 },
  smirk: { bL: [78, 61, 91, 58, 102, 61], bR: [142, 61, 129, 58, 118, 61], bw: 2.6, fur: 0, m: [99, 107, 113, 108.5, 122, 102.5], mo: 0, dim: 1, chin: 1, gy: 0, gr: 0 },
  angry: { bL: [75, 54, 89, 59.5, 103, 65], bR: [145, 54, 131, 59.5, 117, 65], bw: 3.6, fur: 2, m: [99, 110, 110, 103.5, 121, 110], mo: 0, dim: 0, chin: 0, gy: 1.5, gr: 0 },
  shock: { bL: [79, 52, 90, 45, 101, 51], bR: [141, 52, 130, 45, 119, 51], bw: 2.6, fur: 0, m: [104, 109, 110, 109, 116, 109], mo: 1, dim: 0, chin: 0, gy: -3, gr: -6 },
  sad: { bL: [78, 63, 91, 61.5, 102, 56], bR: [142, 63, 129, 61.5, 118, 56], bw: 2.6, fur: 1, m: [100, 109, 110, 106, 120, 109], mo: 0, dim: 0, chin: 1, gy: 0.5, gr: 0 },
} as const;
export type Ifade = keyof typeof IFADELER;

// Kol pozları: omuz, iki kontrol noktası, bilek, el açısı.
const KOLLAR = {
  sideL: [50, 128, 36, 150, 30, 176, 34, 198, 12],
  sideR: [170, 128, 184, 150, 190, 176, 186, 198, -12],
  hipL: [50, 128, 20, 140, 16, 168, 44, 180, -90],
  hipR: [170, 128, 200, 140, 204, 168, 176, 180, 90],
  waveR: [170, 126, 198, 116, 208, 92, 204, 66, 172],
  pointL: [50, 126, 30, 116, 16, 102, 8, 86, 135],
  peekHi: [170, 126, 184, 130, 150, 112, 130, 90, 180],
} as const;
type KolSol = "sideL" | "hipL" | "pointL";
type KolSag = "sideR" | "hipR" | "waveR" | "peekHi";

// Gözlük: normal (N) ve alna itilmiş (F) hâli.
const CAM_SOL = { N: [63, 68, 107, 68, 105, 88, 104, 95, 99, 98, 93, 98, 75, 98, 68, 98, 65, 94, 64, 88], F: [64, 51, 107, 51, 105.5, 61, 105, 65, 101, 67, 96, 67, 75, 67, 69, 67, 66, 65, 65.5, 61] };
const CAM_SAG = { N: [157, 68, 113, 68, 115, 88, 116, 95, 121, 98, 127, 98, 145, 98, 152, 98, 155, 94, 156, 88], F: [156, 51, 113, 51, 114.5, 61, 115, 65, 119, 67, 124, 67, 145, 67, 151, 67, 154, 65, 154.5, 61] };
const KOPRU = { N: [105, 69, 115, 69, 115, 76, 105, 76], F: [105, 52, 115, 52, 115, 56, 105, 56] };
const PARILTI = { N: [70, 77, 71, 73.5, 78, 73.5, 120, 77, 121, 73.5, 128, 73.5], F: [71, 57.5, 72, 55, 78, 55, 121, 57.5, 122, 55, 128, 55] };

const camD = (a: readonly number[]) =>
  `M${a[0]},${a[1]} L${a[2]},${a[3]} L${a[4]},${a[5]} C${a[6]},${a[7]} ${a[8]},${a[9]} ${a[10]},${a[11]} L${a[12]},${a[13]} C${a[14]},${a[15]} ${a[16]},${a[17]} ${a[18]},${a[19]} Z`;
const kopruD = (a: readonly number[]) => `M${a[0]},${a[1]} L${a[2]},${a[3]} L${a[4]},${a[5]} L${a[6]},${a[7]} Z`;
const pariltiD = (a: readonly number[]) =>
  `M${a[0]},${a[1]} Q${a[2]},${a[3]} ${a[4]},${a[5]} M${a[6]},${a[7]} Q${a[8]},${a[9]} ${a[10]},${a[11]}`;
const qD = (a: readonly number[]) => `M${a[0]},${a[1]} Q${a[2]},${a[3]} ${a[4]},${a[5]}`;
const kolD = (a: readonly number[]) => `M${a[0]},${a[1]} C${a[2]},${a[3]} ${a[4]},${a[5]} ${a[6]},${a[7]}`;

function Kol({ a, ters }: { a: readonly number[]; ters?: boolean }) {
  const d = kolD(a);
  return (
    <>
      <path d={d} fill="none" stroke={CIZGI} strokeWidth={10.5} strokeLinecap="round" />
      <path
        d={EL}
        transform={`translate(${a[6]} ${a[7]}) rotate(${a[8]}) scale(${ters ? -1 : 1} 1)`}
        fill={UZUV}
        stroke={CIZGI}
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
      <path d={d} fill="none" stroke={UZUV} strokeWidth={5.8} strokeLinecap="round" />
    </>
  );
}

// Gözlük indi anındaki göz: göz kapağı (lid) yarım kapalı, bebek hafif içe bakar.
function Goz({ cx, bak }: { cx: number; bak: number }) {
  const R = 12.5, EY = 84, lid = 80;
  const hw = Math.sqrt(R * R - (EY - lid) ** 2);
  const a = cx - hw, b = cx + hw, px = cx + bak;
  return (
    <>
      <ellipse cx={cx} cy={EY + 4} rx={15.5} ry={14} fill="#000" opacity={0.16} />
      <circle cx={cx} cy={EY} r={R} fill="#52555C" />
      <path d={`M${a},${lid} A${R},${R} 0 1 0 ${b},${lid} Z`} fill="#F3F1EA" />
      <circle cx={px} cy={lid + 3} r={5.4} fill="#070708" />
      <circle cx={px - 1.8} cy={lid + 2} r={1.25} fill="#fff" />
      <path d={`M${a},${lid} A${R},${R} 0 0 1 ${b},${lid} Z`} fill="#52555C" />
      <path d={`M${cx - R - 0.6},${lid} L${cx + R + 0.6},${lid}`} stroke={CIZGI} strokeWidth={2.4} strokeLinecap="round" />
      <circle cx={cx} cy={EY} r={R} fill="none" stroke={CIZGI} strokeWidth={2} />
      <path d={`M${cx - 7},99.5 Q${cx},102 ${cx + 7},99.5`} fill="none" stroke={GOLGE_CIZGI} strokeWidth={1.1} strokeLinecap="round" />
    </>
  );
}

type Props = {
  className?: string;
  ifade?: Ifade;
  sol?: KolSol;
  sag?: KolSag;
  // Gözlüğü alna itip üstünden bakar. Karakter notu: nadir olur — sayfa başına bir kez.
  gozlukIndi?: boolean;
  // "kafa": yalnız baş (model sheet'teki ifade kartları gibi).
  kirp?: "tam" | "kafa";
  // Boş verilirse süs sayılır, ekran okuyucudan gizlenir (yanında zaten metin varken).
  etiket?: string;
};

export default function Dakay({
  className,
  ifade = "def",
  sol = "sideL",
  sag = "sideR",
  gozlukIndi = false,
  kirp = "tam",
  etiket = "Dakay, gözlüklü yumurta maskot",
}: Props) {
  const id = useId().replace(/:/g, "");
  const e = IFADELER[ifade];
  const g = gozlukIndi ? "F" : "N";
  const viewBox = kirp === "kafa" ? "38 30 144 100" : "0 20 220 272";
  return (
    <svg
      viewBox={viewBox}
      className={className}
      // Tam boyda el sallayan kol kutunun dışına taşabilir; kafa kırpmasında taşma kırpılır.
      overflow={kirp === "kafa" ? "hidden" : "visible"}
      {...(etiket ? { role: "img", "aria-label": etiket } : { "aria-hidden": true })}
    >
      <defs>
        <radialGradient id={`${id}-govde`} cx="0.42" cy="0.26" r="0.82">
          <stop offset="0" stopColor="#62656E" />
          <stop offset=".5" stopColor="#4C4F56" />
          <stop offset="1" stopColor="#3B3E45" />
        </radialGradient>
      </defs>

      <ellipse cx={110} cy={279} rx={52} ry={6} fill="#000" opacity={0.22} />
      <path d={BACAK} transform="translate(96,226) scale(-1,1)" fill={UZUV} stroke={CIZGI} strokeWidth={2.4} strokeLinejoin="round" />
      <path d={BACAK} transform="translate(124,226)" fill={UZUV} stroke={CIZGI} strokeWidth={2.4} strokeLinejoin="round" />

      <path d={GOVDE} fill={`url(#${id}-govde)`} stroke={CIZGI} strokeWidth={3.2} />
      <path d="M80,68 C85,55 96,48 108,46" fill="none" stroke="rgba(255,255,255,.09)" strokeWidth={5} strokeLinecap="round" />

      {/* Yüz */}
      <g fill="none" stroke={CIZGI} strokeLinecap="round">
        <path d={qD(e.bL)} strokeWidth={e.bw} />
        <path d={qD(e.bR)} strokeWidth={e.bw} />
      </g>
      <path
        d="M108.5,56 L109.5,62 M111.5,56 L110.5,62"
        fill="none"
        stroke={GOLGE_CIZGI}
        strokeWidth={1.2 + Math.max(0, e.fur - 1) * 0.4}
        strokeLinecap="round"
        opacity={gozlukIndi ? 0 : Math.min(1, e.fur)}
      />
      {gozlukIndi && (
        <>
          <Goz cx={89} bak={1.2} />
          <Goz cx={131} bak={-1.2} />
        </>
      )}
      <g transform={`translate(0 ${e.gy}) rotate(${e.gr} 110 83)`}>
        <ellipse cx={85} cy={gozlukIndi ? 68.5 : 101} rx={gozlukIndi ? 17 : 19} ry={gozlukIndi ? 2 : 3.5} fill="#000" opacity={0.16} />
        <ellipse cx={135} cy={gozlukIndi ? 68.5 : 101} rx={gozlukIndi ? 17 : 19} ry={gozlukIndi ? 2 : 3.5} fill="#000" opacity={0.16} />
        <g fill="#070708" stroke={CIZGI} strokeWidth={2} strokeLinejoin="round">
          <path d={camD(CAM_SOL[g])} />
          <path d={camD(CAM_SAG[g])} />
          <path d={kopruD(KOPRU[g])} />
        </g>
        <path d={pariltiD(PARILTI[g])} fill="none" stroke="#62656E" strokeWidth={2.2} strokeLinecap="round" />
      </g>
      {e.mo ? (
        <ellipse cx={110} cy={109} rx={3.6} ry={4.6} fill={GOLGE_CIZGI} stroke={CIZGI} strokeWidth={2} />
      ) : (
        <path d={qD(e.m)} fill="none" stroke={CIZGI} strokeWidth={2.4} strokeLinecap="round" />
      )}
      <path d="M121.5,100.5 Q124.5,102 124,105" fill="none" stroke={GOLGE_CIZGI} strokeWidth={1.3} strokeLinecap="round" opacity={e.dim} />
      <path d="M105,112.5 Q110,114 115,112.5" fill="none" stroke={GOLGE_CIZGI} strokeWidth={1.3} strokeLinecap="round" opacity={e.chin} />

      {kirp === "tam" && (
        <>
          <Kol a={KOLLAR[sol]} />
          <Kol a={KOLLAR[sag]} ters />
        </>
      )}
    </svg>
  );
}
