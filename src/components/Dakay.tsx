// Dakay — sitenin maskotu, ön görünüm, varsayılan ifade (çatık kaş, düz ağız).
// Yollar ArdaOS vault'undaki model sheet'ten birebir alındı:
// 🏰 300-Projects/Gozluklu-Yumurta/model-sheet.html → front() + faceFront('def').
// Çizim kuralları o notta; burada değiştirilmez, referansla çelişirse referans kazanır.

const CIZGI = "#0B0B0D";
const UZUV = "#474A51";
const CAM = "#070708";
const PARILTI = "#62656E";
const GOLGE_CIZGI = "#2C2E34";

const GOVDE =
  "M110,40 C150,40 172,110 178,160 C184,205 160,232 110,232 C60,232 36,205 42,160 C48,110 70,40 110,40 Z";
const EL = "M-5,-4 C-7,4 -7,13 -3,17 C0,20 4,18 5,14 L5,10 C7,12 10,12 10,9 C10,5 7,2 5,-2 Z";
const BACAK =
  "M0,0 L0,41 L-2,46 C-3,49 -2,51 1,51 L10,51 C18,51 22,50 21,47 C20,43 16,41 9,41 L9,0 Z";
const SOL_KOL = "M58,120 C45,138 38,168 38,202";

function Cizgi({ d, w, c = CIZGI }: { d: string; w: number; c?: string }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={c}
      strokeWidth={w}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
}

function Bacak({ x, ters }: { x: number; ters?: boolean }) {
  return (
    <path
      d={BACAK}
      transform={`translate(${x},226) scale(${ters ? -1 : 1},1)`}
      fill={UZUV}
      stroke={CIZGI}
      strokeWidth={2.4}
      strokeLinejoin="round"
    />
  );
}

function Kol() {
  return (
    <>
      <Cizgi d={SOL_KOL} w={10.5} />
      <path
        d={EL}
        transform="translate(38,204)"
        fill={UZUV}
        stroke={CIZGI}
        strokeWidth={2.4}
        strokeLinejoin="round"
      />
      <Cizgi d={SOL_KOL} w={5.8} c={UZUV} />
    </>
  );
}

type Props = {
  className?: string;
  // Ayak altındaki gölge; zemin rengine göre verilir (model sheet'te krem zemin için #C8C5B2).
  zeminGolgesi?: string;
};

export default function Dakay({ className, zeminGolgesi = "rgba(0,0,0,.35)" }: Props) {
  return (
    <svg
      viewBox="0 20 220 272"
      className={className}
      role="img"
      aria-label="Dakay, gözlüklü yumurta maskot"
    >
      <defs>
        <radialGradient id="dakay-govde" cx="0.42" cy="0.26" r="0.82">
          <stop offset="0" stopColor="#62656E" />
          <stop offset=".5" stopColor="#4C4F56" />
          <stop offset="1" stopColor="#3B3E45" />
        </radialGradient>
      </defs>

      <ellipse cx={110} cy={277} rx={62} ry={7} fill={zeminGolgesi} />
      <Bacak x={96} ters />
      <Bacak x={124} />
      <Kol />
      <g transform="matrix(-1 0 0 1 220 0)">
        <Kol />
      </g>

      <path d={GOVDE} fill="url(#dakay-govde)" stroke={CIZGI} strokeWidth={3.2} />
      <Cizgi d="M80,68 C85,55 96,48 108,46" w={5} c="rgba(255,255,255,.09)" />

      {/* Yüz: kaşlar, kaş arası kırışık, gözlük, ağız, çene */}
      <Cizgi d="M78,62 Q92,57 102,63" w={2.6} />
      <Cizgi d="M142,62 Q128,57 118,63" w={2.6} />
      <Cizgi d="M108.5,56 L109.5,62 M111.5,56 L110.5,62" w={1.2} c={GOLGE_CIZGI} />

      <ellipse cx={85} cy={101} rx={19} ry={3.5} fill="#000" opacity={0.16} />
      <ellipse cx={135} cy={101} rx={19} ry={3.5} fill="#000" opacity={0.16} />
      <g fill={CAM} stroke={CIZGI} strokeWidth={2} strokeLinejoin="round">
        <path d="M63,68 L107,68 L105,88 C104,95 99,98 93,98 L75,98 C68,98 65,94 64,88 Z" />
        <path d="M157,68 L113,68 L115,88 C116,95 121,98 127,98 L145,98 C152,98 155,94 156,88 Z" />
        <path d="M105,69 L115,69 L115,76 L105,76 Z" />
      </g>
      <Cizgi d="M70,77 Q71,73.5 78,73.5 M120,77 Q121,73.5 128,73.5" w={2.2} c={PARILTI} />

      <Cizgi d="M98,107 Q110,105.5 122,107" w={2.4} />
      <Cizgi d="M105,112.5 Q110,114 115,112.5" w={1.3} c={GOLGE_CIZGI} />
    </svg>
  );
}
