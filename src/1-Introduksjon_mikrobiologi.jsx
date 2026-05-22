import { useState, useEffect, useRef } from "react";

const TABS = [
  { id: "hva", label: "Hva er mikroorganismer?" },
  { id: "storrelse", label: "Størrelse & Morfologi" },
  { id: "prokeuk", label: "Prokaryot vs. Eukaryot" },
  { id: "betydning", label: "Betydning" },
  { id: "pasteur", label: "Pasteur" },
  { id: "koch", label: "Koch" },
  { id: "woese", label: "Woese & Livets tre" },
  { id: "historie", label: "Historisk tidslinje" },
];

// ─── Nøkkelbegreper data ───
const BEGREPER = {
  hva: [
    { term: "Mikrobiologi", def: "Læren om mikroskopiske organismer (mikro = lite, bios = liv)" },
    { term: "Mikroorganisme", def: "Mikroskopisk organisme — bakterie, arke, sopp, alge, protist eller virus" },
    { term: "Biomasse", def: "Total masse av levende organismer i et gitt område" },
    { term: "Mikrobielt samfunn", def: "Kompleks sameksistens av ulike mikroorganismer som interagerer med hverandre og miljøet" },
    { term: "Makromolekyler", def: "Store biologiske molekyler: proteiner, nukleinsyrer, lipider, polysakkarider" },
  ],
  storrelse: [
    { term: "Mikrometer (µm)", def: "10⁻⁶ m — standardenhet for cellestørrelse" },
    { term: "Kokker", def: "Runde/sfæriske bakterieceller" },
    { term: "Staver (baciller)", def: "Stavformede bakterieceller" },
    { term: "Spiriller", def: "Spiralformede, stive bakterieceller" },
    { term: "Spiroketer", def: "Spiralformede, fleksible bakterieceller" },
    { term: "Diplokokker", def: "Kokker i par" },
    { term: "Streptokokker", def: "Kokker i kjeder" },
    { term: "Stafylokokker", def: "Kokker i drueklaser" },
    { term: "Overflate/volum-ratio", def: "Forholdet mellom overflate og volum — høyere ratio gir mer effektivt næringsopptak" },
  ],
  prokeuk: [
    { term: "Prokaryot", def: "Celle uten ekte cellekjerne — Bacteria og Archaea" },
    { term: "Eukaryot", def: "Celle med ekte cellekjerne omgitt av kjernemembran — Eukarya" },
    { term: "Kjerneregion (nukleoid)", def: "Område i prokaryot celle der det sirkulære kromosomet er lokalisert" },
    { term: "Plasmid", def: "Lite, sirkulært DNA-molekyl utenfor kromosomet — finnes hos prokaryoter" },
    { term: "Metabolisme", def: "Alle kjemiske reaksjoner i en celle — anabolisme (oppbygging) og katabolisme (nedbrytning)" },
    { term: "Endospore", def: "Svært resistent hvilestruktur dannet av visse bakterier under ugunstige forhold" },
  ],
  betydning: [
    { term: "Patogen", def: "Sykdomsfremkallende organisme" },
    { term: "Nitrogenfiksering", def: "Biologisk reduksjon av N₂ til NH₃ — utføres kun av visse Bacteria og Archaea" },
    { term: "Fermentering", def: "Anaerob energigivende metabolsk prosess — f.eks. alkohol- eller melkesyrefermentering" },
    { term: "Bioremidering", def: "Bruk av mikroorganismer til å rense opp forurensning" },
    { term: "Quorum sensing", def: "Celle-til-celle kommunikasjon der bakterier regulerer genuttrykk basert på populasjonstetthet" },
    { term: "Bioluminescens", def: "Biologisk lysproduksjon — katalysert av enzymet luciferase" },
    { term: "Antibiotikaresistens", def: "Evne hos bakterier til å motstå effekten av antibiotika" },
  ],
  pasteur: [
    { term: "Spontangenerasjon", def: "Forkastet teori: liv kan oppstå spontant fra ikke-levende materie" },
    { term: "Pasteurisering", def: "Varmebehandling som dreper patogene mikroorganismer uten å sterilisere fullstendig" },
    { term: "Svanehalskolbe", def: "Pasteurs kolbe med S-formet hals — lot luft passere men fanget støv og mikroorganismer" },
    { term: "Renkultur", def: "Kultur som inneholder kun én enkelt art/stamme av en mikroorganisme" },
    { term: "Sterilisering", def: "Fullstendig fjerning av alle levende organismer og virus" },
  ],
  koch: [
    { term: "Kochs postulater", def: "Fire kriterier for å bevise at en mikroorganisme forårsaker en bestemt sykdom" },
    { term: "Renkultur", def: "Kultur med kun én type mikroorganisme — Koch utviklet metoder for å oppnå dette" },
    { term: "Agarplate", def: "Fast kulturmedium brukt til isolering og dyrking av bakteriekolonier" },
    { term: "Koloni", def: "Synlig ansamling av celler (>10⁹) dannet ved gjentatt deling av én eller få celler" },
  ],
  woese: [
    { term: "Fylogenetisk tre", def: "Diagram som viser evolusjonshistorien og slektskapet mellom organismer" },
    { term: "16S rRNA", def: "Ribosomalt RNA-gen brukt som molekylær markør for å bestemme evolusjonært slektskap" },
    { term: "Domene", def: "Høyeste taksonomiske nivå — Bacteria, Archaea og Eukarya" },
    { term: "LUCA", def: "Last Universal Common Ancestor — den siste felles stamfaderen til alt liv" },
    { term: "Bacteria", def: "Domene med prokaryote organismer — størst mangfold" },
    { term: "Archaea", def: "Domene med prokaryote organismer — mange ekstremofile arter" },
    { term: "Eukarya", def: "Domene med eukaryote organismer — dyr, planter, sopp, alger, protister" },
  ],
  historie: [
    { term: "Robert Hooke", def: "Bygde et av de første mikroskopene (1664) — tegnet muggsopp" },
    { term: "Van Leeuwenhoek", def: "Observerte levende mikroorganismer ('wee animalcules') med egenbygd mikroskop (1676)" },
    { term: "Ferdinand Cohn", def: "Oppdaget endosporer fra Bacillus (1828–1898)" },
    { term: "Martinus Beijerinck", def: "Anrikningskulturer og grunnlegger av virologi (1851–1931)" },
    { term: "Sergei Winogradsky", def: "Oppdaget kjemolitotrofe bakterier og nitrogenfiksering (1856–1953)" },
    { term: "Alexander Fleming", def: "Oppdaget penicillin (1928)" },
  ],
};

// ─── SVG Components ───

function CellMorphologySVG() {
  return (
    <svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 720 }}>
      <defs>
        <linearGradient id="cellGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#0891B2" stopOpacity="0.6" />
        </linearGradient>
      </defs>
      {/* Kokker */}
      <g transform="translate(60,60)">
        <circle cx="0" cy="0" r="22" fill="url(#cellGrad)" stroke="#22D3EE" strokeWidth="1.5" />
        <text x="0" y="50" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontFamily="'Plus Jakarta Sans'">Kokk</text>
      </g>
      {/* Diplokokker */}
      <g transform="translate(160,60)">
        <circle cx="-14" cy="0" r="18" fill="url(#cellGrad)" stroke="#22D3EE" strokeWidth="1.5" />
        <circle cx="14" cy="0" r="18" fill="url(#cellGrad)" stroke="#22D3EE" strokeWidth="1.5" />
        <text x="0" y="50" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontFamily="'Plus Jakarta Sans'">Diplokokk</text>
      </g>
      {/* Streptokokker */}
      <g transform="translate(300,60)">
        {[-36, -12, 12, 36].map((x, i) => (
          <circle key={i} cx={x} cy="0" r="14" fill="url(#cellGrad)" stroke="#22D3EE" strokeWidth="1.5" />
        ))}
        <text x="0" y="50" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontFamily="'Plus Jakarta Sans'">Streptokokker</text>
      </g>
      {/* Stafylokokker */}
      <g transform="translate(470,60)">
        {[[-12,-18],[12,-18],[0,0],[-18,6],[18,6],[-6,18],[6,18]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="12" fill="url(#cellGrad)" stroke="#22D3EE" strokeWidth="1.5" />
        ))}
        <text x="0" y="55" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontFamily="'Plus Jakarta Sans'">Stafylokokker</text>
      </g>
      {/* Stav */}
      <g transform="translate(60,190)">
        <rect x="-30" y="-12" width="60" height="24" rx="12" fill="url(#cellGrad)" stroke="#22D3EE" strokeWidth="1.5" />
        <text x="0" y="35" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontFamily="'Plus Jakarta Sans'">Stav</text>
      </g>
      {/* Spirill */}
      <g transform="translate(200,190)">
        <path d="M-40,0 C-30,-20 -10,20 0,0 C10,-20 30,20 40,0" fill="none" stroke="#22D3EE" strokeWidth="5" strokeLinecap="round" />
        <path d="M-40,0 C-30,-20 -10,20 0,0 C10,-20 30,20 40,0" fill="none" stroke="url(#cellGrad)" strokeWidth="3.5" strokeLinecap="round" />
        <text x="0" y="35" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontFamily="'Plus Jakarta Sans'">Spirill</text>
      </g>
      {/* Spiroket */}
      <g transform="translate(380,190)">
        <path d="M-50,0 C-40,-14 -30,14 -20,0 C-10,-14 0,14 10,0 C20,-14 30,14 40,0 C50,-14 60,14 70,0" fill="none" stroke="#22D3EE" strokeWidth="4" strokeLinecap="round" transform="translate(-10,0)" />
        <text x="25" y="35" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontFamily="'Plus Jakarta Sans'">Spiroket</text>
      </g>
      {/* Filament */}
      <g transform="translate(580,190)">
        {[0,1,2,3,4].map(i => (
          <rect key={i} x={-50+i*22} y="-8" width="20" height="16" rx="3" fill="url(#cellGrad)" stroke="#22D3EE" strokeWidth="1" />
        ))}
        <text x="5" y="35" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontFamily="'Plus Jakarta Sans'">Filament</text>
      </g>
    </svg>
  );
}

function SizeSVG() {
  return (
    <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 600 }}>
      <defs>
        <linearGradient id="virusG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
        <linearGradient id="prokG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#06B6D4" />
          <stop offset="100%" stopColor="#0891B2" />
        </linearGradient>
        <linearGradient id="eukG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      {/* Virus */}
      <circle cx="60" cy="100" r="10" fill="url(#virusG)" opacity="0.9" />
      <text x="60" y="140" textAnchor="middle" fill="#F43F5E" fontSize="12" fontFamily="'Plus Jakarta Sans'" fontWeight="700">Virus</text>
      <text x="60" y="156" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="'Source Sans 3'">20–300 nm</text>
      {/* Prokaryot */}
      <ellipse cx="200" cy="100" rx="40" ry="25" fill="url(#prokG)" opacity="0.8" />
      <text x="200" y="150" textAnchor="middle" fill="#06B6D4" fontSize="12" fontFamily="'Plus Jakarta Sans'" fontWeight="700">Prokaryot</text>
      <text x="200" y="166" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="'Source Sans 3'">0,5–10 µm</text>
      {/* Eukaryot */}
      <circle cx="420" cy="100" r="70" fill="url(#eukG)" opacity="0.6" />
      <circle cx="400" cy="85" r="20" fill="#A78BFA" opacity="0.5" />
      <text x="420" y="195" textAnchor="middle" fill="#8B5CF6" fontSize="12" fontFamily="'Plus Jakarta Sans'" fontWeight="700">Eukaryot</text>
      <text x="420" y="108" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontFamily="'Source Sans 3'">5–100 µm</text>
      {/* Scale arrow */}
      <line x1="40" y1="30" x2="540" y2="30" stroke="#334155" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
      <text x="290" y="22" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="'Source Sans 3'">Økende størrelse →</text>
    </svg>
  );
}

function ProkEukSVG() {
  return (
    <svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 700 }}>
      {/* Prokaryot cell */}
      <g transform="translate(10,20)">
        <text x="140" y="0" textAnchor="middle" fill="#06B6D4" fontSize="15" fontWeight="700" fontFamily="'Plus Jakarta Sans'">Prokaryot celle</text>
        <ellipse cx="140" cy="140" rx="120" ry="70" fill="#0F172A" stroke="#06B6D4" strokeWidth="2" />
        <ellipse cx="140" cy="140" rx="115" ry="65" fill="none" stroke="#22D3EE" strokeWidth="1" strokeDasharray="4,3" />
        {/* DNA region */}
        <path d="M100,130 Q120,110 140,130 Q160,150 180,130" fill="none" stroke="#FACC15" strokeWidth="2.5" />
        <path d="M100,140 Q120,120 140,140 Q160,160 180,140" fill="none" stroke="#FACC15" strokeWidth="2.5" />
        <text x="140" y="175" textAnchor="middle" fill="#FACC15" fontSize="10" fontFamily="'Source Sans 3'">Kjerneregion</text>
        {/* Plasmid */}
        <circle cx="80" cy="120" r="10" fill="none" stroke="#34D399" strokeWidth="1.5" />
        <text x="80" y="107" textAnchor="middle" fill="#34D399" fontSize="9" fontFamily="'Source Sans 3'">Plasmid</text>
        {/* Ribosomes */}
        {[[200,120],[210,135],[195,150],[220,145],[185,130]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#FB923C" opacity="0.7" />
        ))}
        <text x="210" y="163" fill="#FB923C" fontSize="9" fontFamily="'Source Sans 3'">Ribosomer</text>
        {/* Labels */}
        <text x="140" y="225" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="'Source Sans 3'">Cellevegg med peptidoglykan</text>
        <text x="140" y="238" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="'Source Sans 3'">Sirkulært kromosom · Ingen organeller</text>
      </g>
      {/* Eukaryot cell */}
      <g transform="translate(360,20)">
        <text x="155" y="0" textAnchor="middle" fill="#8B5CF6" fontSize="15" fontWeight="700" fontFamily="'Plus Jakarta Sans'">Eukaryot celle</text>
        <circle cx="155" cy="140" r="100" fill="#0F172A" stroke="#8B5CF6" strokeWidth="2" />
        {/* Nucleus */}
        <circle cx="130" cy="125" r="35" fill="#1E1B4B" stroke="#A78BFA" strokeWidth="1.5" />
        <text x="130" y="120" textAnchor="middle" fill="#A78BFA" fontSize="9" fontFamily="'Source Sans 3'">Kjerne</text>
        <text x="130" y="132" textAnchor="middle" fill="#C4B5FD" fontSize="8" fontFamily="'Source Sans 3'">(kjernemembran)</text>
        {/* Lineære kromosomer inside nucleus */}
        {[[-8,-10],[0,0],[8,-5]].map(([dx,dy],i) => (
          <line key={i} x1={120+dx} y1={100+dy} x2={140+dx} y2={108+dy} stroke="#FACC15" strokeWidth="1.5" />
        ))}
        {/* Mitochondria */}
        <ellipse cx="200" cy="110" rx="14" ry="8" fill="#1E3A2F" stroke="#34D399" strokeWidth="1" />
        <text x="200" y="100" textAnchor="middle" fill="#34D399" fontSize="8" fontFamily="'Source Sans 3'">Mito.</text>
        {/* ER */}
        <path d="M170,160 Q185,150 180,170 Q175,185 190,180" fill="none" stroke="#FB923C" strokeWidth="1" />
        <text x="185" y="196" textAnchor="middle" fill="#FB923C" fontSize="8" fontFamily="'Source Sans 3'">ER</text>
        {/* Ribosomes */}
        {[[90,155],[95,165],[105,170],[100,145]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill="#FB923C" opacity="0.7" />
        ))}
        {/* Labels */}
        <text x="155" y="258" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="'Source Sans 3'">Flere lineære kromosomer · Organeller</text>
        <text x="155" y="271" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="'Source Sans 3'">Cellemembran med steroler</text>
      </g>
    </svg>
  );
}

function PasteurSVG() {
  return (
    <svg viewBox="0 0 660 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 660 }}>
      {/* Flask 1: sterilized, no growth */}
      <g transform="translate(20,30)">
        <text x="90" y="-5" textAnchor="middle" fill="#06B6D4" fontSize="13" fontWeight="700" fontFamily="'Plus Jakarta Sans'">1. Sterilisering</text>
        {/* Flask body */}
        <path d="M50,80 Q50,160 90,180 Q130,160 130,80" fill="#172554" stroke="#06B6D4" strokeWidth="1.5" />
        {/* Liquid */}
        <path d="M55,120 Q55,155 90,175 Q125,155 125,120 Z" fill="#06B6D4" opacity="0.2" />
        {/* Neck */}
        <rect x="82" y="30" width="16" height="50" rx="3" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
        {/* Swan neck curve */}
        <path d="M90,30 Q90,10 110,10 Q140,10 140,30 Q140,50 120,50" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
        {/* Steam */}
        <path d="M90,22 Q85,10 90,0" fill="none" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3,2" opacity="0.5" />
        <text x="90" y="210" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="'Source Sans 3'">Kokt væske i kolbe</text>
      </g>
      {/* Flask 2: swan neck traps particles */}
      <g transform="translate(220,30)">
        <text x="90" y="-5" textAnchor="middle" fill="#06B6D4" fontSize="13" fontWeight="700" fontFamily="'Plus Jakarta Sans'">2. Svanehals</text>
        <path d="M50,80 Q50,160 90,180 Q130,160 130,80" fill="#172554" stroke="#06B6D4" strokeWidth="1.5" />
        <path d="M55,120 Q55,155 90,175 Q125,155 125,120 Z" fill="#06B6D4" opacity="0.2" />
        <rect x="82" y="30" width="16" height="50" rx="3" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
        <path d="M90,30 Q90,10 110,10 Q140,10 140,30 Q140,55 120,55" fill="none" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" />
        {/* Trapped particles */}
        {[[125,45],[130,50],[122,52]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#F43F5E" opacity="0.8" />
        ))}
        <text x="145" y="40" fill="#F43F5E" fontSize="9" fontFamily="'Source Sans 3'">Støv fanget</text>
        <text x="90" y="210" textAnchor="middle" fill="#34D399" fontSize="11" fontWeight="600" fontFamily="'Source Sans 3'">✓ Ingen vekst!</text>
      </g>
      {/* Flask 3: broken neck, growth */}
      <g transform="translate(430,30)">
        <text x="90" y="-5" textAnchor="middle" fill="#F43F5E" fontSize="13" fontWeight="700" fontFamily="'Plus Jakarta Sans'">3. Knekt hals</text>
        <path d="M50,80 Q50,160 90,180 Q130,160 130,80" fill="#172554" stroke="#06B6D4" strokeWidth="1.5" />
        {/* Turbid liquid */}
        <path d="M55,110 Q55,155 90,175 Q125,155 125,110 Z" fill="#FACC15" opacity="0.15" />
        <rect x="82" y="40" width="16" height="40" rx="3" fill="none" stroke="#06B6D4" strokeWidth="1.5" />
        {/* Broken neck */}
        <line x1="90" y1="40" x2="90" y2="25" stroke="#06B6D4" strokeWidth="2" />
        <line x1="88" y1="27" x2="85" y2="20" stroke="#F43F5E" strokeWidth="1.5" />
        <line x1="92" y1="27" x2="95" y2="18" stroke="#F43F5E" strokeWidth="1.5" />
        {/* Falling particles */}
        {[[88,35],[92,30],[90,45]].map(([x,y],i) => (
          <circle key={i} cx={x} cy={y} r="2" fill="#F43F5E" opacity="0.6" />
        ))}
        <text x="90" y="210" textAnchor="middle" fill="#F43F5E" fontSize="11" fontWeight="600" fontFamily="'Source Sans 3'">✗ Vekst etter kort tid</text>
      </g>
      {/* Conclusion */}
      <text x="330" y="250" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="600" fontFamily="'Plus Jakarta Sans'">
        Konklusjon: Mikroorganismer kommer fra luft — ikke spontangenerasjon
      </text>
    </svg>
  );
}

function KochSVG() {
  const steps = [
    { num: "1", title: "Identifiser", desc: "Patogenet må finnes i alle syke individer, men ikke i friske" },
    { num: "2", title: "Isoler", desc: "Patogenet må kunne isoleres og dyrkes i renkultur" },
    { num: "3", title: "Infiser", desc: "Renkultur overføres til friskt individ → må gi samme sykdom" },
    { num: "4", title: "Re-isoler", desc: "Patogenet må kunne re-isoleres og bekreftes identisk" },
  ];
  return (
    <svg viewBox="0 0 700 180" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 700 }}>
      {steps.map((s, i) => (
        <g key={i} transform={`translate(${i * 175 + 10}, 10)`}>
          <rect x="0" y="0" width="155" height="140" rx="10" fill="#1E293B" stroke="#06B6D4" strokeWidth="1.5" />
          <circle cx="78" cy="30" r="18" fill="#06B6D4" opacity="0.15" />
          <text x="78" y="36" textAnchor="middle" fill="#06B6D4" fontSize="18" fontWeight="800" fontFamily="'Plus Jakarta Sans'">{s.num}</text>
          <text x="78" y="62" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="700" fontFamily="'Plus Jakarta Sans'">{s.title}</text>
          <text x="78" y="78" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="'Source Sans 3'">
            {s.desc.length > 40 ? (
              <>
                <tspan x="78" dy="0">{s.desc.slice(0, s.desc.indexOf(" ", 25))}</tspan>
                <tspan x="78" dy="14">{s.desc.slice(s.desc.indexOf(" ", 25))}</tspan>
              </>
            ) : s.desc}
          </text>
          {i < 3 && (
            <polygon points="160,70 175,75 160,80" fill="#06B6D4" opacity="0.6" />
          )}
        </g>
      ))}
      <text x="350" y="172" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="'Source Sans 3'" fontStyle="italic">
        Syklisk prosess: Postulat 4 bekrefter postulat 1
      </text>
    </svg>
  );
}

function TreeOfLifeSVG() {
  return (
    <svg viewBox="0 0 600 340" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 600 }}>
      {/* LUCA */}
      <ellipse cx="300" cy="310" rx="45" ry="16" fill="#334155" stroke="#94A3B8" strokeWidth="1" />
      <text x="300" y="314" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="600" fontFamily="'Plus Jakarta Sans'">LUCA</text>
      {/* Main trunk */}
      <line x1="300" y1="294" x2="300" y2="230" stroke="#94A3B8" strokeWidth="2.5" />
      {/* Branch to Bacteria */}
      <path d="M300,230 Q200,200 100,70" fill="none" stroke="#06B6D4" strokeWidth="2.5" />
      {/* Branch point for Archaea/Eukarya */}
      <line x1="300" y1="230" x2="300" y2="180" stroke="#94A3B8" strokeWidth="2.5" />
      {/* Branch to Archaea */}
      <path d="M300,180 Q380,140 420,70" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
      {/* Branch to Eukarya — from Archaea line */}
      <path d="M300,180 Q480,130 540,70" fill="none" stroke="#8B5CF6" strokeWidth="2.5" />
      {/* Endosymbiosis arrow (dotted) from Bacteria to Eukarya */}
      <path d="M150,120 Q300,50 500,90" fill="none" stroke="#34D399" strokeWidth="1.5" strokeDasharray="5,4" />
      <text x="310" y="55" textAnchor="middle" fill="#34D399" fontSize="9" fontFamily="'Source Sans 3'" fontStyle="italic">Endosymbiose</text>
      <text x="310" y="67" textAnchor="middle" fill="#34D399" fontSize="8" fontFamily="'Source Sans 3'">(mitokondrier, kloroplaster)</text>
      {/* Domain labels */}
      <g transform="translate(100,40)">
        <rect x="-50" y="-15" width="100" height="26" rx="6" fill="#06B6D4" opacity="0.15" />
        <text x="0" y="3" textAnchor="middle" fill="#06B6D4" fontSize="14" fontWeight="800" fontFamily="'Plus Jakarta Sans'">Bacteria</text>
      </g>
      <g transform="translate(420,40)">
        <rect x="-50" y="-15" width="100" height="26" rx="6" fill="#F59E0B" opacity="0.15" />
        <text x="0" y="3" textAnchor="middle" fill="#F59E0B" fontSize="14" fontWeight="800" fontFamily="'Plus Jakarta Sans'">Archaea</text>
      </g>
      <g transform="translate(540,40)">
        <rect x="-50" y="-15" width="100" height="26" rx="6" fill="#8B5CF6" opacity="0.15" />
        <text x="0" y="3" textAnchor="middle" fill="#8B5CF6" fontSize="14" fontWeight="800" fontFamily="'Plus Jakarta Sans'">Eukarya</text>
      </g>
      {/* Note about virus */}
      <rect x="10" y="260" width="200" height="30" rx="6" fill="#F43F5E" opacity="0.1" />
      <text x="110" y="279" textAnchor="middle" fill="#F43F5E" fontSize="10" fontWeight="600" fontFamily="'Source Sans 3'">⚠ Virus finnes IKKE i livets tre</text>
    </svg>
  );
}

function TimelineSVG() {
  const events = [
    { year: "1664", who: "Hooke", what: "Første mikroskop", color: "#06B6D4" },
    { year: "1676", who: "Leeuwenhoek", what: "«wee animalcules»", color: "#22D3EE" },
    { year: "1861", who: "Pasteur", what: "Motbevist spontangen.", color: "#F59E0B" },
    { year: "1876", who: "Koch", what: "Renkulturteknikk", color: "#34D399" },
    { year: "1884", who: "Cohn", what: "Endosporer", color: "#FB923C" },
    { year: "1928", who: "Fleming", what: "Penicillin", color: "#F43F5E" },
    { year: "1953", who: "Watson/Crick", what: "DNA-struktur", color: "#A78BFA" },
    { year: "1978", who: "Woese", what: "16S rRNA / 3 domener", color: "#06B6D4" },
    { year: "1995", who: "Venter/Smith", what: "Første genom sekv.", color: "#FACC15" },
    { year: "2020", who: "Charpentier/Doudna", what: "CRISPR Nobelpris", color: "#34D399" },
  ];
  const w = 700, h = 220;
  const marginL = 20, marginR = 20;
  const lineY = 80;
  const usable = w - marginL - marginR;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: w }}>
      <line x1={marginL} y1={lineY} x2={w - marginR} y2={lineY} stroke="#334155" strokeWidth="2" />
      {events.map((e, i) => {
        const x = marginL + (i / (events.length - 1)) * usable;
        const above = i % 2 === 0;
        return (
          <g key={i}>
            <circle cx={x} cy={lineY} r="4" fill={e.color} />
            <line x1={x} y1={lineY} x2={x} y2={above ? lineY - 30 : lineY + 30} stroke={e.color} strokeWidth="1" opacity="0.5" />
            <text x={x} y={above ? lineY - 55 : lineY + 45} textAnchor="middle" fill={e.color} fontSize="10" fontWeight="700" fontFamily="'Plus Jakarta Sans'">{e.year}</text>
            <text x={x} y={above ? lineY - 43 : lineY + 57} textAnchor="middle" fill="#F8FAFC" fontSize="9" fontFamily="'Source Sans 3'">{e.who}</text>
            <text x={x} y={above ? lineY - 33 : lineY + 67} textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="'Source Sans 3'">{e.what}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Nøkkelbegrep pill component ───
function BegrepPills({ items }) {
  const [active, setActive] = useState(null);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
      {items.map((b, i) => (
        <div
          key={i}
          onClick={() => setActive(active === i ? null : i)}
          style={{
            cursor: "pointer",
            padding: "6px 14px",
            borderRadius: 20,
            fontSize: 13,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 600,
            background: active === i ? "rgba(6,182,212,0.2)" : "rgba(6,182,212,0.07)",
            border: `1px solid ${active === i ? "#06B6D4" : "#1E293B"}`,
            color: active === i ? "#22D3EE" : "#06B6D4",
            transition: "all 0.2s",
            position: "relative",
          }}
        >
          {b.term}
          {active === i && (
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", left: 0, zIndex: 20,
              background: "#1E293B", border: "1px solid #334155", borderRadius: 8,
              padding: "10px 14px", width: 260, fontSize: 12, fontWeight: 400,
              color: "#F8FAFC", fontFamily: "'Source Sans 3', sans-serif",
              boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            }}>
              <span style={{ color: "#06B6D4", fontWeight: 700 }}>{b.term}:</span> {b.def}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── Collapsible Step ───
function CollapsibleStep({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginBottom: 8, borderLeft: `2px solid ${open ? "#06B6D4" : "#334155"}`, paddingLeft: 14, transition: "border-color 0.2s" }}>
      <div onClick={() => setOpen(!open)} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: "#06B6D4", fontSize: 14, transform: open ? "rotate(90deg)" : "rotate(0)", transition: "transform 0.2s", display: "inline-block" }}>▶</span>
        <span style={{ color: "#F8FAFC", fontSize: 14, fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{title}</span>
      </div>
      {open && <div style={{ padding: "8px 0 4px 22px", color: "#CBD5E1", fontSize: 13, fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.6 }}>{children}</div>}
    </div>
  );
}

// ─── Huskeregel box ───
function Huskeregel({ children }) {
  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(6,182,212,0.08), rgba(6,182,212,0.02))",
      border: "1px solid rgba(6,182,212,0.25)", borderRadius: 10,
      padding: "14px 18px", margin: "20px 0",
    }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: "#06B6D4", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>💡 Huskeregel</div>
      <div style={{ fontSize: 13, color: "#F8FAFC", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

// ─── Exam relevance box ───
function EksamensBox({ children }) {
  return (
    <div style={{
      background: "rgba(244,63,94,0.06)", border: "1px solid rgba(244,63,94,0.2)", borderRadius: 10,
      padding: "12px 16px", margin: "16px 0",
    }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#F43F5E", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 2 }}>📝 Eksamensrelevans</div>
      <div style={{ fontSize: 12, color: "#FDA4AF", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.5 }}>{children}</div>
    </div>
  );
}

// ─── Section wrapper ───
function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ fontSize: 16, fontWeight: 700, color: "#F8FAFC", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 10, borderBottom: "1px solid #1E293B", paddingBottom: 6 }}>{title}</h3>
      {children}
    </div>
  );
}

function Prose({ children }) {
  return <div style={{ fontSize: 14, color: "#CBD5E1", fontFamily: "'Source Sans 3', sans-serif", lineHeight: 1.7, marginBottom: 16 }}>{children}</div>;
}

function Begrep({ children }) {
  return <span style={{ color: "#06B6D4", fontWeight: 600 }}>{children}</span>;
}

// ─── Tab content components ───

function TabHva() {
  return (
    <>
      <Section title="Nøkkelbegreper"><BegrepPills items={BEGREPER.hva} /></Section>
      <Section title="Forklaring">
        <Prose>
          <Begrep>Mikrobiologi</Begrep> er læren om mikroskopiske organismer — organismer som er for små til å sees med det blotte øye. Begrepet kommer fra gresk: <em>mikro</em> (lite) og <em>bios</em> (liv).
        </Prose>
        <Prose>
          <Begrep>Mikroorganismer</Begrep> utgjør den dominerende formen for liv på jorden. De representerer ca. halvparten av jordas totale <Begrep>biomasse</Begrep>, og de var de første organismene som oppstod — for ca. 3,8 milliarder år siden. De finnes overalt: i luft, jord, vann, på og i dyr og mennesker, i mat, planter, varme kilder og fjell. De er essensielle for opprettholdelse av livet på jorden slik vi kjenner det.
        </Prose>
        <Prose>
          Mikroorganismer lever ofte i komplekse <Begrep>mikrobielle samfunn</Begrep>, der aktiviteten reguleres av interaksjoner med andre mikroorganismer, med miljøet og med andre organismer.
        </Prose>
        <Prose>
          <strong>Cellen er den grunnleggende enheten for liv.</strong> Encellede organismer inkluderer bakterier, gjærsopp og encellede dyr. Flercellede organismer inkluderer muggsopp, planter og dyr. Alle celler inneholder de samme hovedkomponentene: vann, <Begrep>makromolekyler</Begrep> (proteiner, nukleinsyrer, lipider, polysakkarider) og andre kjemiske forbindelser.
        </Prose>
      </Section>
      <Section title="Visuell illustrasjon — Cellens hovedkomponenter">
        <svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 500 }}>
          {[
            { label: "Vann", sub: "70–80 %", color: "#06B6D4", x: 60 },
            { label: "Proteiner", sub: "~15 %", color: "#F59E0B", x: 170 },
            { label: "Nukleinsyrer", sub: "~7 %", color: "#8B5CF6", x: 280 },
            { label: "Lipider +\npolysakk.", sub: "~8 %", color: "#34D399", x: 405 },
          ].map((c, i) => (
            <g key={i}>
              <rect x={c.x - 48} y="10" width="96" height="60" rx="8" fill={c.color} opacity="0.12" stroke={c.color} strokeWidth="1" />
              <text x={c.x} y="38" textAnchor="middle" fill={c.color} fontSize="13" fontWeight="700" fontFamily="'Plus Jakarta Sans'">{c.label}</text>
              <text x={c.x} y="58" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="'Source Sans 3'">{c.sub}</text>
            </g>
          ))}
          <text x="250" y="105" textAnchor="middle" fill="#64748B" fontSize="11" fontFamily="'Source Sans 3'" fontStyle="italic">Omtrentlig sammensetning av en typisk celle</text>
        </svg>
      </Section>
      <Section title="Eksempel">
        <CollapsibleStep title="Mikrobielle samfunn i praksis">
          Tenk på tarmfloraen din: milliarder av bakterier lever i tarmen din i et komplekst samfunn. De hjelper med å bryte ned mat, produsere vitaminer (f.eks. K-vitamin), og beskytte mot patogene organismer. Aktiviteten reguleres av interaksjoner mellom artene og med vertens immunsystem.
        </CollapsibleStep>
      </Section>
      <Huskeregel>
        Halvparten av jordas biomasse er mikroorganismer, og de har eksistert i 3,8 milliarder år. Vi mennesker kom 3,3 milliarder år senere. Alle celler deler de samme makromolekylene — det som varierer er <em>organiseringen</em>.
      </Huskeregel>
      <EksamensBox>
        Grunnleggende kjennetegn ved mikroorganismer dukker sjelden opp som egne oppgaver, men forutsettes i besvarelser om cellebiologi, taksonomi og metabolisme. Forstå at cellen er grunnenheten, og hva som skiller encellede fra flercellede.
      </EksamensBox>
    </>
  );
}

function TabStorrelse() {
  return (
    <>
      <Section title="Nøkkelbegreper"><BegrepPills items={BEGREPER.storrelse} /></Section>
      <Section title="Forklaring">
        <Prose>
          Cellestørrelse varierer enormt. <Begrep>Prokaryote celler</Begrep> er typisk 0,5–10 µm (mikrometer = 10⁻⁶ m), mens <Begrep>eukaryote celler</Begrep> er 5–100 µm. Virus er enda mindre, typisk 20–300 nm.
        </Prose>
        <Prose>
          <strong>Fordeler ved å være liten:</strong> Små celler har en større <Begrep>overflate/volum-ratio</Begrep> enn større celler. Overflaten øker med r², mens volumet øker med r³. Dermed har små celler relativt sett mer membranoverflate per volum cytoplasma, noe som gir mer effektivt næringsopptak og avfallstransport.
        </Prose>
        <Prose>
          Prokaryoter viser stor variasjon i <strong>cellemorfologi</strong> (form): <Begrep>kokker</Begrep> (runde), <Begrep>staver</Begrep> (avlange), <Begrep>spiriller</Begrep> (stive spiraler), <Begrep>spiroketer</Begrep> (fleksible spiraler), celler med knopper/stilk, og <Begrep>filamentøse</Begrep> celler (trådformede). I tillegg finnes ulike <strong>cellearrangementer</strong> der celler holder sammen etter deling: <Begrep>diplokokker</Begrep> (par), <Begrep>streptokokker</Begrep> (kjeder), <Begrep>stafylokokker</Begrep> (drueklaser).
        </Prose>
      </Section>
      <Section title="Visuell illustrasjon — Størrelsessammenligning">
        <SizeSVG />
      </Section>
      <Section title="Visuell illustrasjon — Cellemorfologi og arrangementer">
        <CellMorphologySVG />
      </Section>
      <Section title="Eksempel">
        <CollapsibleStep title="Overflate/volum-ratio: Hvorfor har det noe å si?">
          Tenk deg to kuber: en med side 1 µm og en med side 10 µm. Den lille kuben har overflate/volum = 6/1 = 6. Den store har overflate/volum = 600/1000 = 0,6. Den lille cellen har altså 10× mer overflate per volum — og dermed 10× mer effektiv kontaktflate for næringsopptak og avfallsutveksling gjennom membranen.
        </CollapsibleStep>
      </Section>
      <Huskeregel>
        <strong>«Stor O/V = god mat»</strong> — Overflate/Volum-ratio avgjør hvor effektivt en celle kan ta opp næring. Derfor er bakterier små, og derfor er de raskere til å formere seg enn store eukaryote celler.
      </Huskeregel>
      <EksamensBox>
        Eksamen V2023 tester mikroskopivalg for ulike cellestørrelser, og V2024 har en oppgave om forskjeller mellom prokaryot og eukaryot — der størrelse er et viktig punkt. Cellemorfologi (kokker, staver, spiriller) brukes i beskrivelser av bakteriegrupper (f.eks. melkesyrebakterier = staver/kokker).
      </EksamensBox>
    </>
  );
}

function TabProkEuk() {
  return (
    <>
      <Section title="Nøkkelbegreper"><BegrepPills items={BEGREPER.prokeuk} /></Section>
      <Section title="Forklaring">
        <Prose>
          Alle celler deles inn i to hovedgrupper: <Begrep>prokaryote</Begrep> og <Begrep>eukaryote</Begrep> celler.
        </Prose>
        <Prose>
          <Begrep>Prokaryoter</Begrep> omfatter to domener: <em>Bacteria</em> og <em>Archaea</em>. De har ingen ekte cellekjerne — arvestoffet ligger i en <Begrep>kjerneregion</Begrep> (nukleoid) uten kjernemembran. De har ett sirkulært kromosom, kan ha <Begrep>plasmider</Begrep> (små sirkulære DNA-molekyler), mangler membranomsluttede organeller, og har cellevegg med peptidoglykan (hos Bacteria).
        </Prose>
        <Prose>
          <Begrep>Eukaryoter</Begrep> (domenet Eukarya) inkluderer dyr, planter, sopp, alger og protozoer. De har en ekte cellekjerne omgitt av kjernemembran, flere lineære kromosomer, membranomsluttede organeller (mitokondrier, ER, Golgi), og cellemembran med steroler. Eukaryote flageller har en helt annen struktur enn prokaryote (9+2 mikrotubuli vs. roterende basallegeme).
        </Prose>
        <div style={{ overflowX: "auto", margin: "16px 0" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "'Source Sans 3', sans-serif" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #06B6D4" }}>
                <th style={{ textAlign: "left", padding: "8px 12px", color: "#06B6D4", fontFamily: "'Plus Jakarta Sans'" }}>Egenskap</th>
                <th style={{ textAlign: "left", padding: "8px 12px", color: "#06B6D4", fontFamily: "'Plus Jakarta Sans'" }}>Prokaryot</th>
                <th style={{ textAlign: "left", padding: "8px 12px", color: "#8B5CF6", fontFamily: "'Plus Jakarta Sans'" }}>Eukaryot</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Cellekjerne", "Nei (kjerneregion)", "Ja, med kjernemembran"],
                ["Kromosom", "Ett, sirkulært", "Flere, lineære"],
                ["Plasmider", "Ja", "Nei"],
                ["Organeller", "Nei", "Ja (mitokondrier, ER, Golgi m.m.)"],
                ["Cellevegg", "Peptidoglykan (Bacteria)", "Varierer (kitin hos sopp, cellulose hos planter)"],
                ["Cellemembran", "Uten steroler", "Med steroler"],
                ["Ribosomer", "70S", "80S"],
                ["Størrelse", "0,5–10 µm", "5–100 µm"],
                ["Celledeling", "Binær fisjon", "Mitose / meiose"],
                ["Flagell", "Roterende basallegeme", "9+2 mikrotubuli, piskebevegelse"],
              ].map(([egenskap, prok, euk], i) => (
                <tr key={i} style={{ borderBottom: "1px solid #1E293B" }}>
                  <td style={{ padding: "6px 12px", color: "#F8FAFC", fontWeight: 600 }}>{egenskap}</td>
                  <td style={{ padding: "6px 12px", color: "#94A3B8" }}>{prok}</td>
                  <td style={{ padding: "6px 12px", color: "#94A3B8" }}>{euk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Prose>
          <strong>Egenskaper felles for ALLE celler:</strong> <Begrep>Metabolisme</Begrep> (oppbygging og nedbrytning), vekst (formering) og evolusjon. <strong>Egenskaper hos enkelte celler:</strong> Differensiering (<Begrep>endospore</Begrep>), kommunikasjon (quorum sensing), bevegelse (flagell).
        </Prose>
      </Section>
      <Section title="Visuell illustrasjon — Prokaryot vs. Eukaryot celle">
        <ProkEukSVG />
      </Section>
      <Section title="Eksempel">
        <CollapsibleStep title="Hvordan avgjøre om en ukjent organisme er prokaryot eller eukaryot?">
          Man kan bruke elektronmikroskopi (TEM) for å se etter cellekjerne og organeller, kombinert med kjemisk analyse av celleveggen (peptidoglykan = prokaryot). Gramfarging (som er basert på celleveggstruktur) gir også informasjon. Molekylært kan man sekvensere 16S/18S rRNA-genet.
        </CollapsibleStep>
      </Section>
      <Huskeregel>
        <strong>«Pro mangler K»</strong> — Prokaryot mangler ekte <u>K</u>jerne. Huske-akronym for prokaryot: <strong>É</strong>tt kromosom, <strong>S</strong>irkulært, <strong>P</strong>lasmider, <strong>P</strong>eptidoglykan. Eukaryot = <strong>E</strong>kte kjerne, <strong>L</strong>ineære kromosomer, <strong>O</strong>rganeller.
      </Huskeregel>
      <EksamensBox>
        Eksamen V2024 oppgave 5 (5 poeng): «Forklar forskjellen mellom prokaryote og eukaryote celler for arvestoff, organeller, cellevegg, celledeling og flagell.» Dette er en direkte sammenligning — tabellen over dekker alt du trenger.
      </EksamensBox>
    </>
  );
}

function TabBetydning() {
  return (
    <>
      <Section title="Nøkkelbegreper"><BegrepPills items={BEGREPER.betydning} /></Section>
      <Section title="Forklaring">
        <Prose>
          Mikroorganismers påvirkning på mennesker og samfunn (kap. 1.6) kan deles inn i flere områder:
        </Prose>
        <Prose>
          <strong>Sykdom:</strong> <Begrep>Patogene</Begrep> organismer forårsaker infeksjonssykdommer. De fleste mikroorganismer er imidlertid ikke patogene. <Begrep>Antibiotikaresistens</Begrep> er en av vår tids største utfordringer.
        </Prose>
        <Prose>
          <strong>Landbruk og ernæring:</strong> Mikroorganismer utfører <Begrep>nitrogenfiksering</Begrep> (N₂ → NH₃), bryter ned organisk materiale og resirkulerer næringsstoffer, er essensielle i fordøyelse hos drøvtyggere (cellulosenedbrytning), og utgjør tarmfloraen som er viktig for næringsopptak og K-vitaminproduksjon.
        </Prose>
        <Prose>
          <strong>Mat:</strong> Mikroorganismer er involvert i forringelse (uønsket sensorisk forandring), mat- og vannbåren sykdom, og konservering/fremstilling av mat gjennom <Begrep>fermentering</Begrep>. Viktige produkter: etanol, melkesyre, eddiksyre, propionsyre.
        </Prose>
        <Prose>
          <strong>Industri:</strong> Bioreaktorer for produksjon av ønskede komponenter, biodrivstoff, biologisk rensing av avløpsvann, <Begrep>bioremidering</Begrep> (bruk av mikroorganismer for å rense opp forurensning).
        </Prose>
        <Prose>
          <strong>Spesielle egenskaper:</strong> <Begrep>Bioluminescens</Begrep> er biologisk lysproduksjon katalysert av enzymet <em>luciferase</em>. Finnes i slekter som <em>Vibrio</em> og <em>Photobacterium</em>, ofte i symbiose med marine organismer. Produksjonen reguleres av <Begrep>quorum sensing</Begrep> — et kommunikasjonssystem basert på populasjonstetthet.
        </Prose>
      </Section>
      <Section title="Visuell illustrasjon — Mikrobielle påvirkningsområder">
        <svg viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 600 }}>
          {[
            { label: "Sykdom", icon: "🦠", sub: "Patogener, resistens", color: "#F43F5E", x: 75 },
            { label: "Landbruk", icon: "🌾", sub: "N-fiksering, nedbryting", color: "#34D399", x: 225 },
            { label: "Mat", icon: "🧀", sub: "Fermentering, forringelse", color: "#F59E0B", x: 375 },
            { label: "Industri", icon: "⚗️", sub: "Bioreaktorer, rensing", color: "#8B5CF6", x: 525 },
          ].map((c, i) => (
            <g key={i}>
              <circle cx={c.x} cy="70" r="40" fill={c.color} opacity="0.1" stroke={c.color} strokeWidth="1.5" />
              <text x={c.x} y="65" textAnchor="middle" fontSize="28">{c.icon}</text>
              <text x={c.x} y="130" textAnchor="middle" fill={c.color} fontSize="14" fontWeight="700" fontFamily="'Plus Jakarta Sans'">{c.label}</text>
              <text x={c.x} y="148" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="'Source Sans 3'">{c.sub}</text>
            </g>
          ))}
        </svg>
      </Section>
      <Section title="Eksempel">
        <CollapsibleStep title="Case: Clostridium botulinum og botulisme">
          <em>C. botulinum</em> produserer botulinumtoksin — et av de giftigste stoffene vi kjenner. Sykdommen botulisme er forbundet med hermetikk, rakfisk og spekemat (anaerobe forhold). Interessant nok har toksinet også andre bruksområder: Botox (kosmetisk) og behandling av muskelparalyser.
        </CollapsibleStep>
        <CollapsibleStep title="Case: Listeria monocytogenes">
          Forårsaker listeriose. Risikoprodukter: upasteurisert melk, mykoster, kjøttpålegg, røkelaks — typisk kjølelagret mat med lang holdbarhet. Spesielt farlig for eldre, gravide, nyfødte og immunsvekkede. Norge 2007: 19 syke, 5 døde fra camembert-ost.
        </CollapsibleStep>
      </Section>
      <Huskeregel>
        De fleste mikroorganismer er <strong>ikke</strong> patogene — de er essensielle for livet. Mikroorganismer sirkulerer C, N og S i naturen, muliggjør matproduksjon og industrielle prosesser. Uten dem stopper biosfæren.
      </Huskeregel>
      <EksamensBox>
        Mikroorganismers betydning testes typisk indirekte — i oppgaver om fermentering, nitrogenkretsløpet eller industrielle prosesser. V2025 oppgave 4 spør om industriell bruk av sopp. Forstå eksempler på nyttige vs. skadelige mikroorganismer.
      </EksamensBox>
    </>
  );
}

function TabPasteur() {
  return (
    <>
      <Section title="Nøkkelbegreper"><BegrepPills items={BEGREPER.pasteur} /></Section>
      <Section title="Forklaring">
        <Prose>
          <Begrep>Spontangenerasjon</Begrep> var en utbredt teori som hevdet at levende organismer kunne oppstå spontant fra ikke-levende materie — f.eks. at maddiker oppstod fra råtnende kjøtt.
        </Prose>
        <Prose>
          <strong>Louis Pasteur (1822–1895)</strong> motbeviste denne teorien i 1861 med sitt berømte <Begrep>svanehalskolbe</Begrep>-eksperiment. Han kokte næringsbuljong i en kolbe med en S-formet (svaneformet) hals. Kolben var åpen mot luften, men den bøyde halsen fanget støv og mikroorganismer slik at de ikke nådde væsken. Resultatet: <strong>ingen vekst</strong>. Da han knekte halsen og lot væsken komme i kontakt med støvet, fikk han vekst etter kort tid.
        </Prose>
        <Prose>
          <strong>Pasteurs andre bidrag:</strong> Utviklet <Begrep>pasteurisering</Begrep> (varmebehandling for å drepe patogener), beviste sammenhengen mellom gjærsopp og fermentering ved å isolere gjær og lage <Begrep>renkulturer</Begrep>, og bidro vesentlig til utviklingen av vaksiner.
        </Prose>
      </Section>
      <Section title="Visuell illustrasjon — Pasteurs svanehalseksperiment">
        <PasteurSVG />
      </Section>
      <Section title="Eksempel">
        <CollapsibleStep title="Trinn-for-trinn: Svanehalseksperimentet">
          <strong>1.</strong> Pasteur kokte næringsbuljong i glaskolber for å sterilisere væsken. <br />
          <strong>2.</strong> Han formet kolbehalsen til en S-kurve (svanehals) i åpen flamme. <br />
          <strong>3.</strong> Luft kunne passere fritt inn og ut, men støv og mikroorganismer ble fanget i kurven. <br />
          <strong>4.</strong> Resultatet: Væsken forble steril i uker og måneder — ingen spontangenerasjon. <br />
          <strong>5.</strong> Da han knekte halsen eller vippet kolben slik at væsken nådde den kontaminerte kurven, fikk han mikrobiell vekst innen timer.
        </CollapsibleStep>
      </Section>
      <Huskeregel>
        Pasteurs svanehals = «Luft ja, mikrober nei». Halsen lot luft passere, men fanget partikler. Konklusjon: Mikroorganismer kommer fra andre mikroorganismer (omnis cellula e cellula), ikke fra ingenting.
      </Huskeregel>
      <EksamensBox>
        Pasteurs eksperiment er klassisk pensum og kan testes som en forklaringsoppgave. Vær klar til å forklare eksperimentets logikk, hva kontrollene var, og hva det beviste. Kobling til sterilisering og aseptisk teknikk.
      </EksamensBox>
    </>
  );
}

function TabKoch() {
  return (
    <>
      <Section title="Nøkkelbegreper"><BegrepPills items={BEGREPER.koch} /></Section>
      <Section title="Forklaring">
        <Prose>
          <strong>Robert Koch (1843–1910)</strong> viste sammenhengen mellom sykdom og mikroorganismer, og utviklet metoder for å oppnå <Begrep>renkulturer</Begrep>. Hans viktigste bidrag var <Begrep>Kochs postulater</Begrep> — fire kriterier som må oppfylles for å bevise at en bestemt mikroorganisme forårsaker en bestemt sykdom:
        </Prose>
        <Prose>
          <strong>1.</strong> Det mistenkte patogenet må finnes i alle syke individer, men være fraværende i friske.<br />
          <strong>2.</strong> Patogenet må kunne isoleres fra det syke individet og dyrkes i renkultur.<br />
          <strong>3.</strong> Celler fra renkulturen, overført til et friskt individ, må forårsake samme sykdom.<br />
          <strong>4.</strong> Patogenet må kunne re-isoleres fra det nylig infiserte individet og bekreftes identisk med det opprinnelige.
        </Prose>
        <Prose>
          Koch utviklet også bruken av faste medier (agarplater) for isolering av <Begrep>kolonier</Begrep>. En koloni er en synlig ansamling av celler (kan inneholde over 10⁹ celler) som stammer fra én enkelt celle.
        </Prose>
      </Section>
      <Section title="Visuell illustrasjon — Kochs postulater">
        <KochSVG />
      </Section>
      <Section title="Eksempel">
        <CollapsibleStep title="Anvendelse: Koch og tuberkulose">
          Koch brukte postulatene til å bevise at <em>Mycobacterium tuberculosis</em> forårsaker tuberkulose (1882). Han isolerte bakterien fra syke pasienter, dyrket den i renkultur, injiserte den i friske dyr som deretter ble syke, og re-isolerte samme bakterie. Dette var et gjennombrudd for forståelsen av infeksjonssykdommer.
        </CollapsibleStep>
      </Section>
      <Huskeregel>
        <strong>Kochs 4 steg = «Finn, Dyrk, Smitt, Gjenfinn»</strong>. Merk at det er en syklisk prosess: steg 4 (re-isolering) bekrefter steg 1 (identifikasjon). Postulatene har begrensninger — f.eks. kan de ikke brukes for patogener som ikke kan dyrkes i renkultur.
      </Huskeregel>
      <EksamensBox>
        Kochs postulater kan testes som flervalg (kjenn alle fire steg) eller som forklaringsoppgave. V2024 oppgave 5 om prokaryot vs. eukaryot grenser til dette temaet via renkulturbegrepet. Vit at Koch også utviklet teknikker for agarplater.
      </EksamensBox>
    </>
  );
}

function TabWoese() {
  return (
    <>
      <Section title="Nøkkelbegreper"><BegrepPills items={BEGREPER.woese} /></Section>
      <Section title="Forklaring">
        <Prose>
          <strong>Carl Woese (1978)</strong> oppdaget at evolusjonshistorien til alle organismer er lagret i DNA-sekvenser. Ved å analysere gener som koder for <Begrep>16S rRNA</Begrep> (ribosomalt RNA i prokaryoter) og 18S rRNA (i eukaryoter), kunne han konstruere et universelt <Begrep>fylogenetisk tre</Begrep> — det som kalles «Livets tre».
        </Prose>
        <Prose>
          Woese identifiserte tre <Begrep>domener</Begrep> — den høyeste taksonomiske inndelingen: <Begrep>Bacteria</Begrep>, <Begrep>Archaea</Begrep> og <Begrep>Eukarya</Begrep>. Alle tre stammer fra en felles stamfar kalt <Begrep>LUCA</Begrep> (Last Universal Common Ancestor). Bacteria og Archaea er begge prokaryoter, men er evolusjonært like ulike som Archaea og Eukarya.
        </Prose>
        <Prose>
          <strong>Hvorfor 16S rRNA?</strong> Genet finnes i alle levende organismer, endrer seg sakte over tid (konservert), og inneholder både konserverte og variable regioner som gir informasjon om slektskap. Nyere analyser av ukultiverbare bakterier har vist at Bacteria er et ekstremt mangfoldig domene.
        </Prose>
        <Prose>
          <strong>Jordens tidslinje:</strong> Jorden er ca. 4,6 mrd år gammel. Mikrobielt liv oppstod for ca. 3,8 mrd år siden. De første 2 mrd årene var det kun anaerobe organismer. Oksygen-produserende fototrofe organismer førte til oksygenering av atmosfæren og dannelse av ozonlaget. Planter og dyr har kun eksistert de siste 500 millioner årene.
        </Prose>
        <Prose>
          <strong>Viktig:</strong> Virus finnes IKKE i livets tre — fordi de ikke er celler og mangler ribosomer og eget metabolsk apparat.
        </Prose>
      </Section>
      <Section title="Visuell illustrasjon — Livets tre (forenklet)">
        <TreeOfLifeSVG />
      </Section>
      <Section title="Eksempel">
        <CollapsibleStep title="Spørsmål fra forelesning: Hvilken gruppe finnes ikke i Livets tre?">
          <strong>Svar: Virus.</strong> Virus er ikke celler, har ikke eget metabolsk apparat, og klassifiseres ikke under noen av de tre domenene. De er obligate intracellulære parasitter som kun kan replikeres inne i en levende vertscelle. Fordi 16S rRNA brukes til å bygge det fylogenetiske treet, og virus ikke har ribosomer, kan de ikke plasseres i treet.
        </CollapsibleStep>
      </Section>
      <Huskeregel>
        <strong>«BAE» = Bacteria, Archaea, Eukarya</strong> — de tre domenene fra LUCA. 16S rRNA = den molekylære klokken. Bacteria er det mest diverse domenet. Virus er IKKE med — de er ikke celler.
      </Huskeregel>
      <EksamensBox>
        Woese og 16S rRNA dukker opp i taksonomi-oppgaver og som bakgrunn for klassifisering. Forstå hvorfor rRNA brukes (universelt, konservert), hva de tre domenene er, og hvorfor virus er utelukket. Endosymbioseteorien (mitokondrier/kloroplaster fra bakterier) kobles til dette treet.
      </EksamensBox>
    </>
  );
}

function TabHistorie() {
  return (
    <>
      <Section title="Nøkkelbegreper"><BegrepPills items={BEGREPER.historie} /></Section>
      <Section title="Forklaring">
        <Prose>
          Mikrobiologiens historie kan deles inn i fem epoker:
        </Prose>
        <Prose>
          <strong>Oppdagelsen (1600-tallet):</strong> <Begrep>Robert Hooke</Begrep> (1664) bygde et av de første mikroskopene og tegnet muggsopp. <Begrep>Van Leeuwenhoek</Begrep> (1676) observerte levende mikroorganismer («wee animalcules») med sitt egenbygde mikroskop.
        </Prose>
        <Prose>
          <strong>Spontangenerasjon (1800-tallet):</strong> <strong>Louis Pasteur</strong> motbeviste spontangenerasjon i 1861 (se Pasteur-tab).
        </Prose>
        <Prose>
          <strong>Smittsomme sykdommer og renkulturer (1800-tallet):</strong> <strong>Robert Koch</strong> viste sammenhengen mellom sykdom og mikroorganismer og utviklet renkulturteknikk (se Koch-tab). <Begrep>Ferdinand Cohn</Begrep> oppdaget endosporer fra <em>Bacillus</em>.
        </Prose>
        <Prose>
          <strong>Mikrobiell diversitet (1900-tallet):</strong> <Begrep>Martinus Beijerinck</Begrep> utviklet anrikningskulturer og grunnla virologi. <Begrep>Sergei Winogradsky</Begrep> oppdaget kjemolitotrofe bakterier og nitrogenfiksering. <Begrep>Alexander Fleming</Begrep> oppdaget penicillin i 1928.
        </Prose>
        <Prose>
          <strong>Moderne mikrobiologi (1900–2000+):</strong> Watson, Crick, Wilkins og Franklin oppdaget DNA-strukturen (1953). <strong>Carl Woese</strong> kartla livets tre med 16S rRNA (1978). <strong>Craig Venter og Hamilton Smith</strong> sekvenserte det første genomet (1995, en influensabakterie). <strong>Emmanuelle Charpentier og Jennifer Doudna</strong> mottok Nobelprisen i kjemi (2020) for CRISPR-Cas9 genredigering. Lynn Margulis fremla bevis for endosymbioseteorien (~1970). Frederic Sanger utviklet metoder for DNA-sekvensering.
        </Prose>
      </Section>
      <Section title="Visuell illustrasjon — Historisk tidslinje">
        <TimelineSVG />
      </Section>
      <Section title="Eksempel">
        <CollapsibleStep title="Fra Hooke til CRISPR — 350 år med fremskritt">
          Det tok over 200 år fra Hookes mikroskop (1664) til Pasteurs bevis mot spontangenerasjon (1861). Deretter gikk utviklingen raskere: Koch utviklet renkulturer i løpet av 15 år, Fleming oppdaget penicillin 50 år senere, og DNA-strukturen ble kartlagt ytterligere 25 år etter det. I dag kan vi redigere gener med CRISPR og sekvensere hele genomer på timer.
        </CollapsibleStep>
        <CollapsibleStep title="Deinococcus radiodurans — verdens tøffeste bakterie">
          Et eksempel på mikrobiell diversitet: <em>Deinococcus radiodurans</em> er en polyekstrem bakterie som er svært tolerant for kulde, dehydrering, vakuum, lav pH, og spesielt for høye doser radioaktivitet. Den demonstrerer det enorme mangfoldet blant mikroorganismer.
        </CollapsibleStep>
      </Section>
      <Huskeregel>
        Tidslinjen i stikkord: <strong>Hooke → Leeuwenhoek → Pasteur → Koch → Cohn → Beijerinck → Winogradsky → Fleming → DNA → Woese → Genom → CRISPR</strong>. Hvert bidrag bygger på det forrige.
      </Huskeregel>
      <EksamensBox>
        Historiske oppdagelser testes sjelden isolert, men dukker opp som kontekst i oppgaver om sterilteknikk (Pasteur), sykdomslære (Koch), taksonomi (Woese), eller bioteknologi (Fleming/CRISPR). Kjenn de viktigste navnene og hva de bidro med.
      </EksamensBox>
    </>
  );
}

const TAB_COMPONENTS = {
  hva: TabHva,
  storrelse: TabStorrelse,
  prokeuk: TabProkEuk,
  betydning: TabBetydning,
  pasteur: TabPasteur,
  koch: TabKoch,
  woese: TabWoese,
  historie: TabHistorie,
};

// ─── Quiz data ───
const QUIZ = [
  { q: "Hva betyr begrepet «mikrobiologi»?", a: "Læren om mikroskopiske organismer (mikro = lite, bios = liv)." },
  { q: "Hva er de tre domenene i livets tre?", a: "Bacteria, Archaea og Eukarya — alle stammer fra LUCA." },
  { q: "Hva er den typiske størrelsesrekkefølgen for virus, prokaryoter og eukaryoter?", a: "Virus (20–300 nm) < Prokaryoter (0,5–10 µm) < Eukaryoter (5–100 µm)." },
  { q: "Hva er Kochs postulater?", a: "Fire kriterier: 1) Patogen i alle syke, ikke i friske. 2) Isolering i renkultur. 3) Renkultur gir sykdom i friskt individ. 4) Re-isolering og bekreftelse." },
  { q: "Hvordan motbeviste Pasteur spontangenerasjon?", a: "Med svanehalskolben: luft passerte fritt, men støv og mikroorganismer ble fanget i kurven → ingen vekst. Når halsen ble knekt → vekst." },
  { q: "Hvorfor brukes 16S rRNA til fylogenetisk klassifisering?", a: "Genet finnes i alle celler, endrer seg sakte (konservert), og har variable regioner som gir informasjon om evolusjonært slektskap." },
  { q: "Nevn tre hovedforskjeller mellom prokaryote og eukaryote celler.", a: "1) Prokaryoter har ingen ekte kjerne (nukleoid), eukaryoter har kjernemembran. 2) Prokaryoter: ett sirkulært kromosom + plasmider, eukaryoter: flere lineære. 3) Prokaryoter mangler organeller." },
  { q: "Hvorfor er det en fordel for bakterier å være små?", a: "Stor overflate/volum-ratio gir mer effektivt næringsopptak gjennom cellemembranen." },
  { q: "Nevn fire områder der mikroorganismer påvirker mennesker.", a: "Sykdom (patogener), landbruk (nitrogenfiksering), mat (fermentering/forringelse), industri (bioreaktorer, bioremidering)." },
  { q: "Hva er quorum sensing?", a: "Celle-til-celle kommunikasjon der bakterier regulerer genuttrykk basert på populasjonstetthet. Eksempel: bioluminescens hos Vibrio." },
  { q: "Hvorfor finnes ikke virus i livets tre?", a: "Virus er ikke celler — de mangler ribosomer og eget metabolsk apparat. 16S rRNA brukes for treet, og virus har ikke ribosomer." },
  { q: "Hvem oppdaget penicillin, og når?", a: "Alexander Fleming oppdaget penicillin i 1928." },
];

// ─── Main Component ───
export default function Emne1Introduksjon() {
  const [activeTab, setActiveTab] = useState("hva");
  const [visited, setVisited] = useState(new Set(["hva"]));
  const [quizIdx, setQuizIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const tabBarRef = useRef(null);

  useEffect(() => {
    setVisited((prev) => new Set([...prev, activeTab]));
  }, [activeTab]);

  const TabContent = TAB_COMPONENTS[activeTab];

  return (
    <div style={{
      minHeight: "100vh", background: "#0F172A", color: "#F8FAFC",
      fontFamily: "'Source Sans 3', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { height: 4px; width: 4px; }
        ::-webkit-scrollbar-track { background: #0F172A; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 4px; }
        .quiz-card { perspective: 800px; cursor: pointer; }
        .quiz-card-inner {
          transition: transform 0.5s;
          transform-style: preserve-3d;
          position: relative; width: 100%; min-height: 200px;
        }
        .quiz-card-inner.flipped { transform: rotateY(180deg); }
        .quiz-face {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          backface-visibility: hidden; border-radius: 12px;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 28px;
        }
        .quiz-front { background: #1E293B; border: 1px solid #334155; }
        .quiz-back { background: linear-gradient(135deg, #164E63, #1E293B); border: 1px solid #06B6D4; transform: rotateY(180deg); }
        .tab-btn { white-space: nowrap; }
        .tab-btn:hover { background: rgba(6,182,212,0.1); }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #164E63 0%, #0F172A 100%)",
        borderBottom: "2px solid #06B6D4", padding: "28px 24px 20px",
      }}>
        <div style={{ fontSize: 12, color: "#06B6D4", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>
          Emne 1 — MATV1007
        </div>
        <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", color: "#F8FAFC", marginBottom: 6 }}>
          Introduksjon til mikrobiologi
        </h1>
        <div style={{ fontSize: 14, color: "#94A3B8" }}>
          Brock kap. 1.1–1.6, 1.11–1.15 · Hva er mikroorganismer, cellestørrelse, historiske oppdagelser, livets tre
        </div>
        {/* Progress */}
        <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#64748B", fontFamily: "'Plus Jakarta Sans'" }}>Fremgang:</span>
          <div style={{ display: "flex", gap: 3 }}>
            {TABS.map((t) => (
              <div
                key={t.id}
                style={{
                  width: 20, height: 5, borderRadius: 3,
                  background: visited.has(t.id) ? "#06B6D4" : "#334155",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>
          <span style={{ fontSize: 11, color: "#64748B" }}>{visited.size}/{TABS.length}</span>
        </div>
      </div>

      {/* Tab bar */}
      <div
        ref={tabBarRef}
        style={{
          display: "flex", overflowX: "auto", background: "#0B1120",
          borderBottom: "1px solid #1E293B", padding: "0 8px",
          position: "sticky", top: 0, zIndex: 10,
        }}
      >
        {TABS.map((t) => (
          <button
            key={t.id}
            className="tab-btn"
            onClick={() => setActiveTab(t.id)}
            style={{
              padding: "12px 16px", border: "none", background: "none",
              color: activeTab === t.id ? "#06B6D4" : "#64748B",
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600,
              cursor: "pointer", borderBottom: activeTab === t.id ? "2px solid #06B6D4" : "2px solid transparent",
              transition: "all 0.2s",
            }}
          >
            {visited.has(t.id) && activeTab !== t.id ? "✓ " : ""}{t.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 20px 40px" }}>
        {/* Tab header bar */}
        <div style={{
          background: "linear-gradient(90deg, #06B6D4, #0891B2)", borderRadius: 8,
          padding: "12px 18px", marginBottom: 24,
        }}>
          <div style={{ fontSize: 11, color: "#E0F2FE", fontFamily: "'Plus Jakarta Sans'", fontWeight: 600, letterSpacing: 1 }}>
            EMNE 1 — INTRODUKSJON TIL MIKROBIOLOGI
          </div>
          <div style={{ fontSize: 18, color: "#FFFFFF", fontFamily: "'Plus Jakarta Sans'", fontWeight: 800, marginTop: 2 }}>
            {TABS.find((t) => t.id === activeTab)?.label}
          </div>
        </div>

        {/* Læringsmål (only on first tab as context) */}
        {activeTab === "hva" && (
          <div style={{
            background: "rgba(6,182,212,0.05)", border: "1px solid #1E293B", borderRadius: 10,
            padding: "14px 18px", marginBottom: 24, fontSize: 13, lineHeight: 1.6,
          }}>
            <div style={{ fontWeight: 700, color: "#06B6D4", fontFamily: "'Plus Jakarta Sans'", marginBottom: 6 }}>Relevante læringsmål</div>
            <div style={{ color: "#94A3B8" }}>
              <strong>K1:</strong> Kandidaten har kjennskap til mikrobiell taksonomi og kan beskrive generelle egenskaper til utvalgte mikroorganismer.<br />
              <strong>K2:</strong> Kandidaten har bred kunnskap om oppbygning av virus, prokaryote og eukaryote celler (overordnet intro her).
            </div>
          </div>
        )}

        <TabContent />
      </div>

      {/* ─── QUIZ SECTION ─── */}
      <div style={{
        background: "#0B1120", borderTop: "1px solid #1E293B",
        padding: "32px 20px 48px",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{
            fontSize: 22, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "#F8FAFC", textAlign: "center", marginBottom: 4,
          }}>
            Quiz — Emne 1
          </h2>
          <div style={{ textAlign: "center", color: "#64748B", fontSize: 13, marginBottom: 24 }}>
            Klikk på kortet for å snu · {quizIdx + 1} / {QUIZ.length}
          </div>

          {/* Card */}
          <div className="quiz-card" onClick={() => setFlipped(!flipped)}>
            <div className={`quiz-card-inner ${flipped ? "flipped" : ""}`}>
              <div className="quiz-face quiz-front">
                <div style={{ fontSize: 12, color: "#06B6D4", fontWeight: 700, fontFamily: "'Plus Jakarta Sans'", marginBottom: 12, letterSpacing: 1 }}>SPØRSMÅL</div>
                <div style={{ fontSize: 17, color: "#F8FAFC", fontFamily: "'Source Sans 3'", textAlign: "center", lineHeight: 1.6 }}>{QUIZ[quizIdx].q}</div>
              </div>
              <div className="quiz-face quiz-back">
                <div style={{ fontSize: 12, color: "#22D3EE", fontWeight: 700, fontFamily: "'Plus Jakarta Sans'", marginBottom: 12, letterSpacing: 1 }}>SVAR</div>
                <div style={{ fontSize: 15, color: "#F8FAFC", fontFamily: "'Source Sans 3'", textAlign: "center", lineHeight: 1.6 }}>{QUIZ[quizIdx].a}</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 20 }}>
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(false); setQuizIdx(Math.max(0, quizIdx - 1)); }}
              style={{
                padding: "8px 24px", borderRadius: 8, border: "1px solid #334155",
                background: "#1E293B", color: "#F8FAFC", cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans'", fontSize: 13, fontWeight: 600,
                opacity: quizIdx === 0 ? 0.4 : 1,
              }}
              disabled={quizIdx === 0}
            >
              ← Forrige
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setFlipped(false); setQuizIdx(Math.min(QUIZ.length - 1, quizIdx + 1)); }}
              style={{
                padding: "8px 24px", borderRadius: 8, border: "1px solid #06B6D4",
                background: "rgba(6,182,212,0.1)", color: "#06B6D4", cursor: "pointer",
                fontFamily: "'Plus Jakarta Sans'", fontSize: 13, fontWeight: 600,
                opacity: quizIdx === QUIZ.length - 1 ? 0.4 : 1,
              }}
              disabled={quizIdx === QUIZ.length - 1}
            >
              Neste →
            </button>
          </div>

          {/* Card dots */}
          <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 16 }}>
            {QUIZ.map((_, i) => (
              <div
                key={i}
                onClick={(e) => { e.stopPropagation(); setFlipped(false); setQuizIdx(i); }}
                style={{
                  width: 8, height: 8, borderRadius: "50%", cursor: "pointer",
                  background: i === quizIdx ? "#06B6D4" : "#334155",
                  transition: "background 0.2s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
