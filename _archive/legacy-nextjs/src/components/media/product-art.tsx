import type { ReactNode } from "react";
import type { ArtKey } from "@/lib/data/types";

/**
 * Illustrated, brand-palette artwork used until licensed product photography is
 * supplied. Flat shapes only (no gradients / filters / ids) so any number of
 * instances can render on one page without id collisions.
 *
 * Canvas is 800×800 with the subject kept inside the central safe area, and
 * `preserveAspectRatio="xMidYMid slice"` lets frames of any aspect ratio crop it.
 */

const ink = "#252B26";

function Shadow({ cx, cy, rx, ry, dark = false }: { cx: number; cy: number; rx: number; ry: number; dark?: boolean }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill={dark ? "#0E2219" : ink} opacity={dark ? 0.4 : 0.11} />;
}

function PaperBag() {
  return (
    <g>
      <Shadow cx={405} cy={642} rx={205} ry={18} />
      <path d="M335 302 C335 214 465 214 465 302" fill="none" stroke="#9A7A50" strokeWidth={9} strokeLinecap="round" />
      <path d="M505 300 L565 316 L565 628 L505 640 Z" fill="#A9855A" />
      <path d="M505 300 L565 316 L535 334 Z" fill="#8F6E47" />
      <path d="M535 334 L535 628" stroke="#98774D" strokeWidth={2} />
      <rect x={235} y={300} width={270} height={340} fill="#C9A878" />
      <rect x={235} y={300} width={270} height={34} fill="#BD9B6A" />
      <path d="M235 604 H505" stroke="#B28F60" strokeWidth={2} />
      <path d="M300 320 C300 206 440 206 440 320" fill="none" stroke="#7E5F3B" strokeWidth={10} strokeLinecap="round" />
      <circle cx={300} cy={320} r={7} fill="#6E5233" />
      <circle cx={440} cy={320} r={7} fill="#6E5233" />
      <rect x={315} y={440} width={110} height={64} rx={3} fill="#F4EDE0" opacity={0.85} />
      <rect x={337} y={462} width={66} height={5} rx={2.5} fill="#234E3B" opacity={0.7} />
      <rect x={349} y={476} width={42} height={4} rx={2} fill="#234E3B" opacity={0.4} />
    </g>
  );
}

function TissueBox() {
  return (
    <g>
      <Shadow cx={420} cy={612} rx={225} ry={18} />
      <path d="M570 400 L630 350 L630 560 L570 610 Z" fill="#E3DDD0" />
      <rect x={230} y={400} width={340} height={210} fill="#FBFAF6" />
      <path d="M230 400 L290 350 L630 350 L570 400 Z" fill="#F1EDE4" />
      <rect x={230} y={498} width={340} height={28} fill="#234E3B" />
      <path d="M570 490 L630 440 L630 468 L570 518 Z" fill="#183829" />
      <ellipse cx={430} cy={375} rx={92} ry={12} fill="#D9D2C3" />
      <path
        d="M372 378 C360 310 408 300 404 252 C400 212 452 196 474 236 C494 272 466 318 492 378 Z"
        fill="#FFFFFF"
        stroke="#E4DED2"
        strokeWidth={1.5}
      />
      <path d="M420 250 C430 290 418 330 440 372" fill="none" stroke="#ECE7DD" strokeWidth={2} />
    </g>
  );
}

function HygienePack() {
  const sheets = [0, 1, 2, 3, 4];
  return (
    <g>
      <Shadow cx={420} cy={636} rx={230} ry={18} />
      {sheets.map((index) => {
        const y = 580 - index * 28;
        return (
          <g key={index}>
            <rect x={200} y={y} width={240} height={30} rx={6} fill={index % 2 ? "#F2EEE6" : "#FBFAF6"} />
            <path d={`M320 ${y + 4} V${y + 26}`} stroke="#E3DDD0" strokeWidth={1.5} />
          </g>
        );
      })}
      <rect x={410} y={372} width={220} height={262} rx={46} fill="#9CAF88" />
      <rect x={410} y={372} width={220} height={60} rx={30} fill="#A9BB96" />
      <rect x={458} y={430} width={124} height={62} rx={20} fill="#234E3B" />
      <rect x={484} y={455} width={72} height={6} rx={3} fill="#F7F5EF" opacity={0.85} />
      <rect x={456} y={540} width={128} height={6} rx={3} fill="#234E3B" opacity={0.35} />
      <rect x={476} y={556} width={88} height={5} rx={2.5} fill="#234E3B" opacity={0.25} />
    </g>
  );
}

function ThermalRoll() {
  const lines = [
    [320, 606, 150],
    [320, 626, 210],
    [320, 646, 120],
    [320, 666, 190],
  ];
  return (
    <g>
      <Shadow cx={440} cy={700} rx={240} ry={16} dark />
      <path d="M300 566 L580 566 L620 700 L290 700 Z" fill="#F7F5EF" />
      <path
        d="M290 700 L302 690 L314 700 L326 690 L338 700 L350 690 L362 700 L374 690 L386 700 L398 690 L410 700 L422 690 L434 700 L446 690 L458 700 L470 690 L482 700 L494 690 L506 700 L518 690 L530 700 L542 690 L554 700 L566 690 L578 700 L590 690 L602 700 L620 700 L620 706 L290 706 Z"
        fill="#234E3B"
      />
      {lines.map(([x, y, w]) => (
        <rect key={y} x={x} y={y} width={w} height={6} rx={3} fill="#9AA39B" opacity={0.7} />
      ))}
      <rect x={470} y={606} width={80} height={6} rx={3} fill="#9AA39B" opacity={0.7} />
      <ellipse cx={570} cy={450} rx={44} ry={120} fill="#E9E4D8" />
      <rect x={270} y={330} width={300} height={240} fill="#F2EEE5" />
      <rect x={270} y={330} width={300} height={56} fill="#FBFAF6" />
      <rect x={270} y={520} width={300} height={50} fill="#DDD6C8" />
      <ellipse cx={270} cy={450} rx={44} ry={120} fill="#FBFAF6" />
      <ellipse cx={270} cy={450} rx={34} ry={93} fill="none" stroke="#E6E0D3" strokeWidth={2} />
      <ellipse cx={270} cy={450} rx={25} ry={68} fill="none" stroke="#E6E0D3" strokeWidth={2} />
      <ellipse cx={270} cy={450} rx={16} ry={44} fill="#D8C5A5" />
      <ellipse cx={270} cy={450} rx={10} ry={30} fill="#183829" />
    </g>
  );
}

function KitchenRoll() {
  return (
    <g>
      <Shadow cx={420} cy={636} rx={200} ry={20} />
      <ellipse cx={390} cy={610} rx={110} ry={26} fill="#EDE8DD" />
      <path d="M500 214 C548 222 572 250 580 290 L596 592 C566 616 530 616 500 610 Z" fill="#F4F0E8" />
      <path d="M548 250 L562 596" stroke="#DCD5C7" strokeWidth={2} strokeDasharray="3 8" />
      <rect x={280} y={200} width={220} height={410} fill="#FBFAF6" />
      <rect x={446} y={200} width={54} height={410} fill="#EFEAE0" />
      <path d="M330 214 V600" stroke="#E0D9CC" strokeWidth={2} strokeDasharray="3 8" />
      <path d="M404 226 V612" stroke="#E0D9CC" strokeWidth={2} strokeDasharray="3 8" />
      <ellipse cx={390} cy={200} rx={110} ry={28} fill="#FFFFFF" stroke="#E4DED2" strokeWidth={1.5} />
      <ellipse cx={390} cy={200} rx={78} ry={19} fill="none" stroke="#EAE5DB" strokeWidth={2} />
      <ellipse cx={390} cy={200} rx={38} ry={10} fill="#C9A878" />
      <ellipse cx={390} cy={201} rx={27} ry={6.5} fill="#8C6B43" />
    </g>
  );
}

function Spoon({ fill, bowl }: { fill: string; bowl?: string }) {
  return (
    <g>
      <ellipse cx={0} cy={-150} rx={46} ry={64} fill={fill} />
      {bowl && <ellipse cx={0} cy={-146} rx={33} ry={49} fill={bowl} />}
      <rect x={-10} y={-96} width={20} height={270} rx={10} fill={fill} />
    </g>
  );
}

function Fork({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      {[-34, -14, 6, 26].map((x) => (
        <rect key={x} x={x} y={-222} width={9} height={82} rx={4.5} />
      ))}
      <rect x={-38} y={-156} width={76} height={58} rx={26} />
      <rect x={-10} y={-110} width={20} height={284} rx={10} />
    </g>
  );
}

function Knife({ fill }: { fill: string }) {
  return (
    <g fill={fill}>
      <path d="M-14 -224 C20 -214 24 -160 18 -86 L-14 -86 Z" />
      <rect x={-13} y={-96} width={26} height={270} rx={12} />
    </g>
  );
}

function Cutlery() {
  const shadow = "rgba(37,43,38,0.1)";
  const wood = "#C8A06E";
  const set = (fill: string, bowl?: string) => (
    <>
      <g transform="translate(-120 0)">
        <Spoon fill={fill} bowl={bowl} />
      </g>
      <Fork fill={fill} />
      <g transform="translate(120 0)">
        <Knife fill={fill} />
      </g>
    </>
  );
  return (
    <g>
      <g transform="translate(414 446) rotate(-24)">{set(shadow)}</g>
      <g transform="translate(400 430) rotate(-24)">{set(wood, "#B98F5C")}</g>
    </g>
  );
}

function BagassePlate() {
  return (
    <g>
      <circle cx={376} cy={458} r={212} fill={ink} opacity={0.08} />
      <circle cx={360} cy={440} r={210} fill="#F4EFE4" />
      <circle cx={360} cy={440} r={178} fill="#ECE5D6" />
      <path d="M186 440 H534" stroke="#F4EFE4" strokeWidth={16} strokeLinecap="round" />
      <path d="M360 440 V266" stroke="#F4EFE4" strokeWidth={16} strokeLinecap="round" />
      <circle cx={604} cy={276} r={106} fill={ink} opacity={0.08} />
      <circle cx={590} cy={260} r={105} fill="#F4EFE4" />
      <circle cx={590} cy={260} r={82} fill="#ECE5D6" />
      <circle cx={590} cy={262} r={60} fill="#E6DDCC" />
    </g>
  );
}

const speckles: [number, number, number, string][] = [
  [-18, -170, 3.5, "#9C6B33"],
  [14, -182, 2.5, "#E0B77A"],
  [22, -150, 3, "#9C6B33"],
  [-6, -132, 2.5, "#E0B77A"],
  [-26, -140, 2, "#9C6B33"],
  [8, -112, 3, "#9C6B33"],
  [-12, -196, 2, "#E0B77A"],
  [26, -122, 2, "#E0B77A"],
  [0, -60, 2.5, "#9C6B33"],
  [-2, 10, 2, "#E0B77A"],
  [3, 70, 2.5, "#9C6B33"],
  [-3, 130, 2, "#9C6B33"],
];

function EdibleSpoon() {
  return (
    <g>
      <Spoon fill="#C4904F" bowl="#B57F40" />
      {speckles.map(([x, y, r, fill], index) => (
        <circle key={index} cx={x} cy={y} r={r} fill={fill} />
      ))}
    </g>
  );
}

function EdibleCutlery() {
  return (
    <g>
      <g transform="translate(346 452) rotate(-18)" opacity={0.1}>
        <Spoon fill={ink} />
      </g>
      <g transform="translate(476 462) rotate(16)" opacity={0.1}>
        <Spoon fill={ink} />
      </g>
      <g transform="translate(332 436) rotate(-18)">
        <EdibleSpoon />
      </g>
      <g transform="translate(462 446) rotate(16)">
        <EdibleSpoon />
      </g>
      {[
        [230, 640, -20],
        [560, 650, 30],
        [610, 610, -50],
        [260, 600, 60],
      ].map(([x, y, rotate]) => (
        <ellipse key={`${x}-${y}`} cx={x} cy={y} rx={9} ry={4} fill="#C4904F" transform={`rotate(${rotate} ${x} ${y})`} />
      ))}
    </g>
  );
}

const husks: [number, number, number][] = [
  [180, 610, -20],
  [214, 640, 35],
  [262, 628, -60],
  [560, 632, 20],
  [602, 612, -35],
  [640, 646, 70],
  [520, 660, -10],
  [300, 664, 15],
  [690, 600, 50],
  [140, 650, -45],
  [330, 420, 10],
  [372, 412, -30],
  [420, 422, 40],
  [462, 414, -15],
  [396, 432, 70],
];

function PaddyHusk() {
  return (
    <g>
      <Shadow cx={400} cy={604} rx={210} ry={18} dark />
      <path d="M220 430 C230 560 320 602 400 602 C480 602 570 560 580 430 Z" fill="#B9985F" />
      <path d="M232 470 C262 560 332 590 400 590" fill="none" stroke="#C9AB74" strokeWidth={6} strokeLinecap="round" opacity={0.6} />
      <ellipse cx={400} cy={430} rx={180} ry={38} fill="#D2B67F" />
      <ellipse cx={400} cy={430} rx={160} ry={29} fill="#A98848" />
      {husks.map(([x, y, rotate], index) => (
        <g key={index} transform={`rotate(${rotate} ${x} ${y})`}>
          <ellipse cx={x} cy={y} rx={17} ry={6.5} fill={index % 2 ? "#D9B66A" : "#C39A4C"} />
          <path d={`M${x - 12} ${y} H${x + 12}`} stroke="#9E7A38" strokeWidth={1.2} />
        </g>
      ))}
    </g>
  );
}

function FannedSheets() {
  const sheets = [
    { rotate: -14, fill: "#D8C5A5" },
    { rotate: -5, fill: "#9CAF88" },
    { rotate: 5, fill: "#F2EEE5" },
    { rotate: 13, fill: "#FFFFFF" },
  ];
  return (
    <g>
      <Shadow cx={400} cy={650} rx={230} ry={18} />
      {sheets.map((sheet, index) => (
        <g key={index} transform={`rotate(${sheet.rotate} 400 640)`}>
          <rect x={255} y={210} width={290} height={400} rx={6} fill={sheet.fill} />
          {index === sheets.length - 1 &&
            [270, 300, 330, 360, 390, 420].map((y) => (
              <rect key={y} x={290} y={y} width={y === 420 ? 120 : 220} height={4} rx={2} fill="#D8D2C4" />
            ))}
        </g>
      ))}
    </g>
  );
}

function ParentRoll() {
  return (
    <g>
      <Shadow cx={440} cy={650} rx={300} ry={16} dark />
      <rect x={250} y={606} width={420} height={10} fill="#F2EEE5" />
      <circle cx={470} cy={620} r={22} fill="#D8C5A5" />
      <circle cx={470} cy={620} r={8} fill="#183829" />
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <rect key={index} x={560} y={560 - index * 14} width={150} height={12} rx={2} fill={index % 2 ? "#E9E4D8" : "#FBFAF6"} />
      ))}
      <circle cx={260} cy={440} r={176} fill="#F2EEE5" />
      {[150, 124, 98, 72].map((r) => (
        <circle key={r} cx={260} cy={440} r={r} fill="none" stroke="#E2DBCD" strokeWidth={2} />
      ))}
      <circle cx={260} cy={440} r={42} fill="#D8C5A5" />
      <circle cx={260} cy={440} r={26} fill="#183829" />
      <path d="M260 616 H300" stroke="#F2EEE5" strokeWidth={10} />
    </g>
  );
}

function HeroComposition() {
  return (
    <g>
      <circle cx={470} cy={350} r={260} fill="#DCE3D2" />
      <g transform="translate(145 20) scale(0.85)">
        <KitchenRoll />
      </g>
      <g transform="translate(-60 62) scale(0.9)">
        <PaperBag />
      </g>
      <g transform="translate(345 282) scale(0.62)">
        <TissueBox />
      </g>
    </g>
  );
}

const scenes: Record<ArtKey, { background: string; content: ReactNode }> = {
  "paper-bags": { background: "#DCE3D2", content: <PaperBag /> },
  "tissue-products": { background: "#EBE1CF", content: <TissueBox /> },
  "hygiene-products": { background: "#E6E0D2", content: <HygienePack /> },
  "thermal-rolls": { background: "#234E3B", content: <ThermalRoll /> },
  "kitchen-rolls": { background: "#D8C5A5", content: <KitchenRoll /> },
  "biodegradable-cutlery": { background: "#EBE1CF", content: <Cutlery /> },
  "bagasse-tableware": { background: "#DCE3D2", content: <BagassePlate /> },
  "edible-cutlery": { background: "#E6E0D2", content: <EdibleCutlery /> },
  "paddy-husk-products": { background: "#234E3B", content: <PaddyHusk /> },
  hero: { background: "#EBE1CF", content: <HeroComposition /> },
  about: { background: "#EFEBE1", content: <FannedSheets /> },
  manufacturing: { background: "#234E3B", content: <ParentRoll /> },
};

export function artBackground(art: ArtKey): string {
  return scenes[art].background;
}

export function ProductArt({ art, alt, className }: { art: ArtKey; alt: string; className?: string }) {
  const scene = scenes[art];
  return (
    <svg
      viewBox="0 0 800 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      focusable="false"
      style={{ backgroundColor: scene.background }}
    >
      {scene.content}
    </svg>
  );
}
