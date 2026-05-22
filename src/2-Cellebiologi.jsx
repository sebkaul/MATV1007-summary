import { useState, useEffect, useRef } from "react";

const TABS = [
  { id: "mikroskopi", label: "Mikroskopi", icon: "🔬" },
  { id: "membran", label: "Cellemembran", icon: "🧬" },
  { id: "transport", label: "Transport", icon: "🚛" },
  { id: "cellevegg", label: "Cellevegg", icon: "🧱" },
  { id: "overflate", label: "Overflatestrukturer", icon: "🦠" },
  { id: "kjemotaksis", label: "Kjemotaksis", icon: "🧭" },
  { id: "endosporer", label: "Endosporer", icon: "🛡️" },
  { id: "eukaryot", label: "Eukaryote celler", icon: "🔵" },
  { id: "arker", label: "Arker", icon: "🌋" },
];

// ═══════════════════════════════════════════
//  NØKKELBEGREPER DATA
// ═══════════════════════════════════════════
const TERMS = {
  mikroskopi: [
    { term: "Oppløsningsevne", def: "Evnen til å skille to nærliggende punkter fra hverandre. d = 0.61λ / (n·sinθ)" },
    { term: "Forstørrelse", def: "Kapasiteten et mikroskop har til å forstørre et objekt" },
    { term: "Lysmikroskop", def: "Basert på lysstråler og optiske linser, oppløsning ~0.2 µm" },
    { term: "TEM", def: "Transmisjons-elektronmikroskop — tynne skiver, ser inne i cellen" },
    { term: "SEM", def: "Sveipe-elektronmikroskop — overflatestruktur, prøve dekkes med gull" },
    { term: "Gramfarging", def: "Differensiell fargingsteknikk som skiller Gram-pos. (lilla) fra Gram-neg. (rosa)" },
    { term: "Basisfarger", def: "Positivt ladde farger (metylenblått, krystallfiolett, safranin) som binder nukleinsyrer" },
    { term: "Fasekontrast", def: "Øker kontrast uten farging — levende celler kan observeres" },
    { term: "Fluorescensmikroskopi", def: "Cellekomponenter fluorescerer etter bestråling med UV/kortbølget lys" },
  ],
  membran: [
    { term: "Cytoplasmamembran", def: "Semipermeabel membran (5–10 nm) som skiller cellens indre fra ytre miljø" },
    { term: "Fosfolipid", def: "Fettstoff med hydrofil fosfatgruppe og hydrofobe fettsyrehaler" },
    { term: "Lipid dobbeltlag", def: "To lag fosfolipider med hydrofobe haler vendt mot hverandre" },
    { term: "Integrerte proteiner", def: "Permanent festet i membranen, f.eks. transmembranproteiner" },
    { term: "Perifere proteiner", def: "Løst festet til membranoverflaten, lett å fjerne" },
    { term: "Permeabilitetsbarriere", def: "Hindrer tilfeldig flyt av molekyler inn/ut av cellen" },
    { term: "Protongradient (PMF)", def: "Ladningsforskjell over membranen pga. H⁺ utenfor, OH⁻ innenfor — «batteri»" },
    { term: "Hopanoider", def: "Sterollignende molekyler i noen bakteriers membran — stabiliserer" },
  ],
  transport: [
    { term: "Enkel diffusjon", def: "Passiv transport fra høy→lav konsentrasjon, ingen proteiner nødvendig" },
    { term: "Fasilitert diffusjon", def: "Passiv transport via transportproteiner, fra høy→lav konsentrasjon" },
    { term: "Aktiv transport", def: "Energikrevende transport (ATP/PMF), kan gå mot konsentrasjonsgradient" },
    { term: "ABC-transportør", def: "ATP-drevet transport med bindingsproteiner — krever ATP direkte" },
    { term: "Gruppetranslokasjon", def: "Substrat kjemisk modifiseres under transporten, energi fra PEP" },
    { term: "Uniporter", def: "Transporterer ett enkelt substrat, kan være passiv eller aktiv" },
    { term: "Symporter", def: "Transporterer to substrater i samme retning — aktiv transport" },
    { term: "Antiporter", def: "Transporterer to substrater i motsatt retning — aktiv transport" },
    { term: "Aquaporiner", def: "Spesielle vannkanaler i membranen" },
  ],
  cellevegg: [
    { term: "Peptidoglykan", def: "Polymer av NAG og NAM som gir celleveggen styrke" },
    { term: "NAG", def: "N-acetylglukosamin — sukkerenhet i peptidoglykan" },
    { term: "NAM", def: "N-acetylmuraminsyre — sukkerenhet med peptidkjede" },
    { term: "Teikoinsyre", def: "Polyalkoholer i Gram-pos. vegg, binder divalente ioner" },
    { term: "Lipoteikoinsyre", def: "Teikoinsyre kovalent bundet til membranlipider" },
    { term: "LPS", def: "Lipopolysakkarider i Gram-neg. yttermembran — endotoksiner" },
    { term: "Poriner", def: "Proteiner som gjør yttermembranen permeabel for små molekyler" },
    { term: "Periplasma", def: "Rommet mellom indre og ytre membran hos Gram-neg." },
    { term: "Protoplast", def: "Celle som har mistet celleveggen — lyserer i hypoton løsning" },
  ],
  overflate: [
    { term: "Flagell", def: "Langt, roterende bevegelsesorgan (15–20 nm), bygd av flagellin" },
    { term: "Basallegeme", def: "Motorstruktur med ringer (MS, P, L, C) forankret i membran/vegg" },
    { term: "Pilier (pili)", def: "Tykke, lange fibre (1–10/celle) — konjugasjon og feste" },
    { term: "Fimbrier", def: "Tynne, korte fibre (200–400/celle) — festeegenskaper" },
    { term: "Kapsel", def: "Klart avgrenset lag av polysakkarider/proteiner utenfor celleveggen" },
    { term: "Slimlag", def: "Diffust, ikke klart avgrenset lag — forstadium til biofilm" },
    { term: "S-lag", def: "Paracrystallinsk proteinlag på cellens overflate" },
    { term: "Flagellin", def: "Proteinet som bygger opp flagellens filament" },
  ],
  kjemotaksis: [
    { term: "Kjemotaksis", def: "Bevegelse til/fra kjemiske stimuli via kjemoreseptorer" },
    { term: "Run and tumble", def: "Veksling mellom rettlinjet svømming og tilfeldig retningsendring" },
    { term: "Attraktant", def: "Kjemisk stoff som tiltrekker bakterier" },
    { term: "Repellent", def: "Kjemisk stoff som frastøter bakterier" },
    { term: "Fototaksis", def: "Bevegelse til/fra lys" },
    { term: "Aerotaksis", def: "Bevegelse til/fra oksygen" },
    { term: "Hydrotaksis", def: "Bevegelse til/fra vann" },
    { term: "Twitching", def: "Bevegelse ved hjelp av type IV pili — drar seg framover" },
  ],
  endosporer: [
    { term: "Endospore", def: "Varmeresistent hvilestadium hos Bacillus og Clostridium" },
    { term: "Dipikolinsyre (DPA)", def: "~10% av tørrvekt, binder Ca²⁺, reduserer vannaktivitet" },
    { term: "SASP", def: "Small Acid Soluble Proteins — beskytter DNA mot UV og tørr varme" },
    { term: "Cortex", def: "Løst lag av peptidoglykan mellom sporevegg og sporekappe" },
    { term: "Sporekappe", def: "Proteinlag som gir kjemisk resistens" },
    { term: "Eksosporium", def: "Ytterste proteinlag på endosporen" },
    { term: "Sporulering", def: "Prosessen der en vegetativ celle danner en endospore" },
    { term: "Germinering", def: "Spiring — endospore → vegetativ celle ved gunstige forhold" },
  ],
  eukaryot: [
    { term: "Cellekjerne", def: "Inneholder arvestoff/kromatin, dobbel kjernemembran med porer" },
    { term: "Granulert ER", def: "ER med ribosomer — proteinsyntese, glykoproteindannelse" },
    { term: "Glatt ER", def: "ER uten ribosomer — lipidsyntese" },
    { term: "Golgiapparat", def: "Modifikasjon av glykoproteiner/glykolipider, pakking i vesikler" },
    { term: "Lysosom", def: "Inneholder hydrolytiske enzymer, bryter ned makromolekyler, pH~5" },
    { term: "Mitokondrium", def: "Cellens kraftverk — aerob respirasjon i cristae" },
    { term: "Kloroplast", def: "Fotosyntese — lysenergi → kjemisk energi, dobbel membran" },
    { term: "Kolesterol", def: "Sterol i eukaryote membraner — stabiliserer, påvirker permeabilitet" },
    { term: "Diploid", def: "Celle med to sett kromosomer (2n)" },
    { term: "Haploid", def: "Celle med ett sett kromosomer (n) — kjønnsceller" },
    { term: "Endosymbioseteorien", def: "Mitokondrier/kloroplaster var frittlevende bakterier" },
  ],
  arker: [
    { term: "Pseudomuerin", def: "Celleveggmolekyl hos noen arker — ligner peptidoglykan" },
    { term: "Eterlipider", def: "Arker har eter-bindinger i membranlipidene (ikke ester)" },
    { term: "Ekstremofile", def: "Organismer som trives i ekstreme miljøer (varme, salt, syre)" },
    { term: "Metanogene arker", def: "Produserer metan i anaerobe miljøer" },
    { term: "Hamus", def: "Pilielignende struktur hos noen arker med gripekrok" },
    { term: "Isoprenoidkjeder", def: "Forgrenede lipidkjeder i arkers membraner" },
  ],
};

// ═══════════════════════════════════════════
//  SVG DIAGRAMS
// ═══════════════════════════════════════════

function MikroskopiSVG() {
  return (
    <svg viewBox="0 0 700 320" className="w-full" style={{ maxWidth: 700 }}>
      <defs>
        <linearGradient id="lensGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Title */}
      <text x="350" y="25" textAnchor="middle" fill="#F8FAFC" fontSize="14" fontWeight="bold">Oppløsningsevne: d = 0.61λ / (n·sinθ)</text>
      {/* Scale bar */}
      <line x1="50" y1="60" x2="650" y2="60" stroke="#334155" strokeWidth="2" />
      {[
        { x: 50, label: "0.1 nm", sub: "Atom" },
        { x: 150, label: "1 nm", sub: "Molekyl" },
        { x: 250, label: "10 nm", sub: "Virus" },
        { x: 350, label: "0.1 µm", sub: "Ribosom" },
        { x: 450, label: "1 µm", sub: "Bakterie" },
        { x: 550, label: "10 µm", sub: "Eukaryot" },
        { x: 650, label: "100 µm", sub: "Øye" },
      ].map((t, i) => (
        <g key={i}>
          <line x1={t.x} y1={55} x2={t.x} y2={65} stroke="#94A3B8" strokeWidth="1.5" />
          <text x={t.x} y={80} textAnchor="middle" fill="#94A3B8" fontSize="10">{t.label}</text>
          <text x={t.x} y={95} textAnchor="middle" fill="#10B981" fontSize="9">{t.sub}</text>
        </g>
      ))}
      {/* Microscope ranges */}
      {/* Electron */}
      <rect x="50" y="110" width="350" height="28" rx="4" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1" />
      <text x="225" y="128" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="bold">Elektronmikroskop (0.1 nm – 1 µm)</text>
      {/* Light */}
      <rect x="300" y="148" width="280" height="28" rx="4" fill="#3B82F6" fillOpacity="0.15" stroke="#3B82F6" strokeWidth="1" />
      <text x="440" y="166" textAnchor="middle" fill="#3B82F6" fontSize="11" fontWeight="bold">Lysmikroskop (0.2 µm – 100 µm)</text>
      {/* Eye */}
      <rect x="520" y="186" width="130" height="28" rx="4" fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="1" />
      <text x="585" y="204" textAnchor="middle" fill="#F59E0B" fontSize="11" fontWeight="bold">Øyet (&gt;100 µm)</text>

      {/* Microscope types comparison */}
      <text x="130" y="245" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="bold">TEM</text>
      <text x="130" y="262" textAnchor="middle" fill="#94A3B8" fontSize="10">Tynne skiver</text>
      <text x="130" y="277" textAnchor="middle" fill="#94A3B8" fontSize="10">Inne i cellen</text>
      <text x="130" y="292" textAnchor="middle" fill="#94A3B8" fontSize="10">Høyest oppløsning</text>

      <text x="350" y="245" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="bold">SEM</text>
      <text x="350" y="262" textAnchor="middle" fill="#94A3B8" fontSize="10">Gullbelegg</text>
      <text x="350" y="277" textAnchor="middle" fill="#94A3B8" fontSize="10">3D overflate</text>
      <text x="350" y="292" textAnchor="middle" fill="#94A3B8" fontSize="10">Stor dybdeskarphet</text>

      <text x="570" y="245" textAnchor="middle" fill="#F8FAFC" fontSize="12" fontWeight="bold">Lysfelt</text>
      <text x="570" y="262" textAnchor="middle" fill="#94A3B8" fontSize="10">400–700 nm bølgelengde</text>
      <text x="570" y="277" textAnchor="middle" fill="#94A3B8" fontSize="10">Farging (Gram++)</text>
      <text x="570" y="292" textAnchor="middle" fill="#94A3B8" fontSize="10">Enkel, billig</text>
    </svg>
  );
}

function MembranSVG() {
  return (
    <svg viewBox="0 0 700 300" className="w-full" style={{ maxWidth: 700 }}>
      <defs>
        <linearGradient id="memGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>
      <text x="350" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="bold">Fosfolipid dobbeltlag (Lipid bilayer)</text>
      {/* Upper leaflet phospholipids */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = 60 + i * 34;
        return (
          <g key={`u${i}`}>
            {/* Head */}
            <circle cx={x} cy={80} r={10} fill="#3B82F6" stroke="#2563EB" strokeWidth="1" />
            {/* Tails */}
            <line x1={x - 3} y1={90} x2={x - 5} y2={130} stroke="#F59E0B" strokeWidth="2" />
            <line x1={x + 3} y1={90} x2={x + 5} y2={130} stroke="#F59E0B" strokeWidth="2" />
          </g>
        );
      })}
      {/* Lower leaflet */}
      {Array.from({ length: 18 }).map((_, i) => {
        const x = 60 + i * 34;
        return (
          <g key={`l${i}`}>
            <line x1={x - 3} y1={155} x2={x - 5} y2={195} stroke="#F59E0B" strokeWidth="2" />
            <line x1={x + 3} y1={155} x2={x + 5} y2={195} stroke="#F59E0B" strokeWidth="2" />
            <circle cx={x} cy={205} r={10} fill="#3B82F6" stroke="#2563EB" strokeWidth="1" />
          </g>
        );
      })}
      {/* Transmembrane protein */}
      <rect x="220" y="65" width="50" height="160" rx="20" fill="#10B981" fillOpacity="0.6" stroke="#10B981" strokeWidth="2" />
      <text x="245" y="150" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontWeight="bold">Trans-</text>
      <text x="245" y="162" textAnchor="middle" fill="#F8FAFC" fontSize="9" fontWeight="bold">membran</text>
      {/* Peripheral protein */}
      <ellipse cx="420" cy="72" rx="30" ry="12" fill="#F472B6" fillOpacity="0.7" stroke="#F472B6" strokeWidth="1" />
      <text x="420" y="76" textAnchor="middle" fill="#FFF" fontSize="8">Perifer</text>
      {/* Labels */}
      <text x="630" y="60" fill="#94A3B8" fontSize="10">Ekstracellulært</text>
      <text x="630" y="145" fill="#F59E0B" fontSize="10">Hydrofob kjerne</text>
      <text x="630" y="225" fill="#94A3B8" fontSize="10">Intracellulært</text>
      {/* Legend */}
      <circle cx="60" cy="260" r="8" fill="#3B82F6" />
      <text x="75" y="264" fill="#94A3B8" fontSize="10">Hydrofil hodegruppe (fosfat)</text>
      <line x1="250" y1="256" x2="250" y2="268" stroke="#F59E0B" strokeWidth="2" />
      <text x="260" y="264" fill="#94A3B8" fontSize="10">Hydrofob fettsyrehale</text>
      <circle cx="430" cy="260" r="8" fill="#10B981" />
      <text x="445" y="264" fill="#94A3B8" fontSize="10">Integrert protein</text>
      <circle cx="580" cy="260" r="8" fill="#F472B6" />
      <text x="595" y="264" fill="#94A3B8" fontSize="10">Perifert protein</text>
      {/* 3 functions */}
      <text x="120" y="292" fill="#10B981" fontSize="10" fontWeight="bold">① Permeabilitetsbarriere</text>
      <text x="330" y="292" fill="#10B981" fontSize="10" fontWeight="bold">② Anker for proteiner</text>
      <text x="530" y="292" fill="#10B981" fontSize="10" fontWeight="bold">③ Energiomsetning</text>
    </svg>
  );
}

function TransportSVG() {
  return (
    <svg viewBox="0 0 700 280" className="w-full" style={{ maxWidth: 700 }}>
      <text x="350" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="bold">Transportmekanismer over cellemembranen</text>
      {/* Membrane line */}
      <rect x="30" y="100" width="640" height="60" rx="4" fill="#334155" fillOpacity="0.4" stroke="#334155" />
      <text x="350" y="135" textAnchor="middle" fill="#475569" fontSize="10">CELLEMEMBRAN</text>
      <text x="350" y="88" textAnchor="middle" fill="#94A3B8" fontSize="10">UTENFOR (høy konsentrasjon →)</text>
      <text x="350" y="180" textAnchor="middle" fill="#94A3B8" fontSize="10">INNENFOR (cytoplasma)</text>

      {/* 1. Simple diffusion */}
      <g>
        <circle cx="80" cy="70" r="6" fill="#22D3EE" />
        <line x1="80" y1="76" x2="80" y2="95" stroke="#22D3EE" strokeWidth="2" strokeDasharray="4" />
        <line x1="80" y1="165" x2="80" y2="195" stroke="#22D3EE" strokeWidth="2" strokeDasharray="4" />
        <circle cx="80" cy="200" r="6" fill="#22D3EE" fillOpacity="0.5" />
        <text x="80" y="225" textAnchor="middle" fill="#22D3EE" fontSize="10" fontWeight="bold">Enkel</text>
        <text x="80" y="237" textAnchor="middle" fill="#22D3EE" fontSize="10" fontWeight="bold">diffusjon</text>
        <text x="80" y="255" textAnchor="middle" fill="#94A3B8" fontSize="9">Passiv</text>
        <text x="80" y="267" textAnchor="middle" fill="#94A3B8" fontSize="9">H₂O, gasser</text>
      </g>
      {/* 2. Facilitated */}
      <g>
        <circle cx="210" cy="70" r="6" fill="#A78BFA" />
        <rect x="200" y="100" width="20" height="60" rx="8" fill="#A78BFA" fillOpacity="0.4" stroke="#A78BFA" />
        <circle cx="210" cy="200" r="6" fill="#A78BFA" fillOpacity="0.5" />
        <text x="210" y="225" textAnchor="middle" fill="#A78BFA" fontSize="10" fontWeight="bold">Fasilitert</text>
        <text x="210" y="237" textAnchor="middle" fill="#A78BFA" fontSize="10" fontWeight="bold">diffusjon</text>
        <text x="210" y="255" textAnchor="middle" fill="#94A3B8" fontSize="9">Passiv + protein</text>
      </g>
      {/* 3. Active */}
      <g>
        <circle cx="350" cy="200" r="6" fill="#F97316" />
        <rect x="340" y="100" width="20" height="60" rx="8" fill="#F97316" fillOpacity="0.4" stroke="#F97316" />
        <circle cx="350" cy="70" r="6" fill="#F97316" fillOpacity="0.5" />
        <text x="370" y="195" fill="#F97316" fontSize="9">ATP/PMF</text>
        <text x="350" y="225" textAnchor="middle" fill="#F97316" fontSize="10" fontWeight="bold">Aktiv</text>
        <text x="350" y="237" textAnchor="middle" fill="#F97316" fontSize="10" fontWeight="bold">transport</text>
        <text x="350" y="255" textAnchor="middle" fill="#94A3B8" fontSize="9">Mot gradient ↑</text>
      </g>
      {/* 4. ABC */}
      <g>
        <circle cx="490" cy="70" r="6" fill="#EF4444" />
        <rect x="475" y="100" width="30" height="60" rx="10" fill="#EF4444" fillOpacity="0.3" stroke="#EF4444" />
        <text x="490" y="135" textAnchor="middle" fill="#EF4444" fontSize="8" fontWeight="bold">ABC</text>
        <circle cx="490" cy="200" r="6" fill="#EF4444" fillOpacity="0.5" />
        <text x="510" y="195" fill="#EF4444" fontSize="9">ATP</text>
        <text x="490" y="225" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">ABC-</text>
        <text x="490" y="237" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="bold">transportør</text>
        <text x="490" y="255" textAnchor="middle" fill="#94A3B8" fontSize="9">Bindingsprotein</text>
      </g>
      {/* 5. Group translocation */}
      <g>
        <circle cx="620" cy="70" r="6" fill="#FBBF24" />
        <rect x="610" y="100" width="20" height="60" rx="8" fill="#FBBF24" fillOpacity="0.3" stroke="#FBBF24" />
        <circle cx="620" cy="200" r="8" fill="#FBBF24" fillOpacity="0.5" stroke="#FBBF24" strokeDasharray="3" />
        <text x="620" y="204" textAnchor="middle" fill="#FBBF24" fontSize="7">~P</text>
        <text x="620" y="225" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">Gruppe-</text>
        <text x="620" y="237" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">translokasjon</text>
        <text x="620" y="255" textAnchor="middle" fill="#94A3B8" fontSize="9">Modifiseres (PEP)</text>
      </g>
    </svg>
  );
}

function CelleveggSVG() {
  return (
    <svg viewBox="0 0 700 360" className="w-full" style={{ maxWidth: 700 }}>
      <text x="175" y="25" textAnchor="middle" fill="#F8FAFC" fontSize="14" fontWeight="bold">Gram-positiv</text>
      <text x="525" y="25" textAnchor="middle" fill="#F8FAFC" fontSize="14" fontWeight="bold">Gram-negativ</text>

      {/* === GRAM POSITIVE (left) === */}
      {/* Thick peptidoglycan */}
      <rect x="50" y="45" width="250" height="100" rx="6" fill="#A855F7" fillOpacity="0.3" stroke="#A855F7" strokeWidth="2" />
      {Array.from({length: 5}).map((_, i) => (
        <g key={`pg${i}`}>
          <text x="175" y={60 + i * 20} textAnchor="middle" fill="#A855F7" fontSize="9" fillOpacity={0.6}>—M—G—M—G—M—G—M—G—M—G—</text>
        </g>
      ))}
      <text x="310" y="95" fill="#A855F7" fontSize="10" fontWeight="bold">Peptidoglykan</text>
      <text x="310" y="108" fill="#94A3B8" fontSize="9">(opptil 30 lag!)</text>
      {/* Teichoic acids */}
      {[80, 140, 200, 260].map((x, i) => (
        <line key={`ta${i}`} x1={x} y1={45} x2={x} y2={20} stroke="#F472B6" strokeWidth="2" strokeDasharray="3" />
      ))}
      <text x="310" y="38" fill="#F472B6" fontSize="9">Teikoinsyre ↑</text>
      {/* Cytoplasmic membrane */}
      <rect x="50" y="155" width="250" height="20" rx="4" fill="#3B82F6" fillOpacity="0.4" stroke="#3B82F6" />
      <text x="175" y="168" textAnchor="middle" fill="#3B82F6" fontSize="9">Cellemembran</text>
      {/* Lipoteichoic */}
      {[100, 200].map((x, i) => (
        <line key={`lt${i}`} x1={x} y1={155} x2={x} y2={95} stroke="#FB923C" strokeWidth="2" strokeDasharray="3" />
      ))}
      <text x="310" y="140" fill="#FB923C" fontSize="9">Lipoteikoinsyre</text>

      {/* === GRAM NEGATIVE (right) === */}
      {/* Outer membrane with LPS */}
      <rect x="400" y="45" width="250" height="20" rx="4" fill="#EF4444" fillOpacity="0.3" stroke="#EF4444" />
      <text x="525" y="58" textAnchor="middle" fill="#EF4444" fontSize="9">Yttermembran (LPS, poriner, fosfolipider)</text>
      {/* LPS projections */}
      {[420, 460, 500, 540, 580, 620].map((x, i) => (
        <g key={`lps${i}`}>
          <line x1={x} y1={45} x2={x} y2={25} stroke="#EF4444" strokeWidth="1.5" />
          <circle cx={x} cy={22} r="3" fill="#EF4444" fillOpacity="0.6" />
        </g>
      ))}
      <text x="660" y="30" fill="#EF4444" fontSize="9" fontWeight="bold">LPS</text>
      {/* Porins */}
      <rect x="455" y="43" width="14" height="24" rx="5" fill="#FBBF24" fillOpacity="0.5" stroke="#FBBF24" />
      <rect x="555" y="43" width="14" height="24" rx="5" fill="#FBBF24" fillOpacity="0.5" stroke="#FBBF24" />
      <text x="660" y="58" fill="#FBBF24" fontSize="9">Poriner</text>
      {/* Periplasmic space */}
      <rect x="400" y="75" width="250" height="40" rx="4" fill="#1E293B" stroke="#475569" strokeDasharray="4" />
      <text x="525" y="98" textAnchor="middle" fill="#94A3B8" fontSize="10">Periplasma</text>
      {/* Thin peptidoglycan */}
      <rect x="400" y="125" width="250" height="20" rx="4" fill="#A855F7" fillOpacity="0.2" stroke="#A855F7" />
      <text x="525" y="138" textAnchor="middle" fill="#A855F7" fontSize="9">Tynt peptidoglykan (1–2 lag)</text>
      {/* Cytoplasmic membrane */}
      <rect x="400" y="155" width="250" height="20" rx="4" fill="#3B82F6" fillOpacity="0.4" stroke="#3B82F6" />
      <text x="525" y="168" textAnchor="middle" fill="#3B82F6" fontSize="9">Cellemembran</text>

      {/* Gramfarging box */}
      <rect x="50" y="200" width="600" height="150" rx="8" fill="#1E293B" stroke="#334155" />
      <text x="350" y="222" textAnchor="middle" fill="#10B981" fontSize="13" fontWeight="bold">Gramfarging — 4 trinn</text>
      {[
        { step: "1", label: "Krystallfiolett", desc: "Alle celler farges lilla", color: "#7C3AED" },
        { step: "2", label: "Jod (Lugol)", desc: "Danner kompleks med farge", color: "#92400E" },
        { step: "3", label: "Avfarging (etanol)", desc: "Gram-neg. mister farge", color: "#94A3B8" },
        { step: "4", label: "Safranin", desc: "Gram-neg. farges rosa/rød", color: "#F43F5E" },
      ].map((s, i) => (
        <g key={`gs${i}`}>
          <circle cx={100 + i * 155} cy={260} r="18" fill={s.color} fillOpacity="0.3" stroke={s.color} strokeWidth="1.5" />
          <text x={100 + i * 155} y={264} textAnchor="middle" fill={s.color} fontSize="12" fontWeight="bold">{s.step}</text>
          <text x={100 + i * 155} y={295} textAnchor="middle" fill="#F8FAFC" fontSize="10" fontWeight="bold">{s.label}</text>
          <text x={100 + i * 155} y={310} textAnchor="middle" fill="#94A3B8" fontSize="9">{s.desc}</text>
        </g>
      ))}
      {/* Result labels */}
      <text x="175" y="340" textAnchor="middle" fill="#7C3AED" fontSize="11" fontWeight="bold">Resultat: LILLA = Gram-positiv</text>
      <text x="525" y="340" textAnchor="middle" fill="#F43F5E" fontSize="11" fontWeight="bold">Resultat: ROSA = Gram-negativ</text>
    </svg>
  );
}

function OverflateSVG() {
  return (
    <svg viewBox="0 0 700 340" className="w-full" style={{ maxWidth: 700 }}>
      <text x="350" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="bold">Flagelloppbygning (Gram-negativ)</text>
      {/* Cell body outline */}
      <rect x="200" y="180" width="300" height="130" rx="60" fill="#1E293B" stroke="#334155" strokeWidth="2" />
      <text x="350" y="240" textAnchor="middle" fill="#475569" fontSize="12">Celle</text>
      {/* Outer membrane */}
      <line x1="200" y1="200" x2="500" y2="200" stroke="#EF4444" strokeWidth="3" />
      <text x="510" y="203" fill="#EF4444" fontSize="9">Yttermembran</text>
      {/* Peptidoglycan */}
      <line x1="200" y1="220" x2="500" y2="220" stroke="#A855F7" strokeWidth="2" strokeDasharray="4" />
      <text x="510" y="223" fill="#A855F7" fontSize="9">Peptidoglykan</text>
      {/* Inner membrane */}
      <line x1="200" y1="260" x2="500" y2="260" stroke="#3B82F6" strokeWidth="3" />
      <text x="510" y="263" fill="#3B82F6" fontSize="9">Cellemembran</text>

      {/* Flagell structure */}
      {/* Filament */}
      <path d="M 350 40 Q 320 60, 350 80 Q 380 100, 350 120 Q 320 140, 350 160" fill="none" stroke="#10B981" strokeWidth="6" strokeLinecap="round" />
      <text x="290" y="60" fill="#10B981" fontSize="10" fontWeight="bold">Filament</text>
      <text x="290" y="73" fill="#94A3B8" fontSize="9">(flagellin)</text>
      {/* Hook */}
      <path d="M 350 160 Q 360 170, 350 180" fill="none" stroke="#FBBF24" strokeWidth="5" />
      <text x="380" y="175" fill="#FBBF24" fontSize="10" fontWeight="bold">Krok (Hook)</text>
      {/* L ring */}
      <ellipse cx="350" cy="200" rx="15" ry="5" fill="none" stroke="#EF4444" strokeWidth="2" />
      <text x="130" y="200" fill="#EF4444" fontSize="9" fontWeight="bold">L-ring (LPS)</text>
      <line x1="175" y1="198" x2="335" y2="198" stroke="#EF4444" strokeWidth="0.5" strokeDasharray="2" />
      {/* P ring */}
      <ellipse cx="350" cy="220" rx="15" ry="5" fill="none" stroke="#A855F7" strokeWidth="2" />
      <text x="120" y="225" fill="#A855F7" fontSize="9" fontWeight="bold">P-ring (peptidoglykan)</text>
      <line x1="210" y1="222" x2="335" y2="222" stroke="#A855F7" strokeWidth="0.5" strokeDasharray="2" />
      {/* MS ring */}
      <ellipse cx="350" cy="260" rx="18" ry="6" fill="#3B82F6" fillOpacity="0.3" stroke="#3B82F6" strokeWidth="2" />
      <text x="120" y="262" fill="#3B82F6" fontSize="9" fontWeight="bold">MS-ring (cellemembran)</text>
      <line x1="210" y1="260" x2="332" y2="260" stroke="#3B82F6" strokeWidth="0.5" strokeDasharray="2" />
      {/* C ring (cytoplasmic) */}
      <ellipse cx="350" cy="280" rx="22" ry="7" fill="#F472B6" fillOpacity="0.2" stroke="#F472B6" strokeWidth="2" />
      <text x="120" y="285" fill="#F472B6" fontSize="9" fontWeight="bold">C-ring + Mot-proteiner</text>
      <line x1="210" y1="282" x2="328" y2="282" stroke="#F472B6" strokeWidth="0.5" strokeDasharray="2" />
      {/* Rod */}
      <line x1="350" y1="180" x2="350" y2="280" stroke="#94A3B8" strokeWidth="3" />
      <text x="375" y="250" fill="#94A3B8" fontSize="9">Rod (stav)</text>

      {/* Flagell positions */}
      <text x="350" y="325" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold">Posisjoner: Polar · Lophotrik · Amphitrik · Peritrik</text>
    </svg>
  );
}

function EndosporeSVG() {
  return (
    <svg viewBox="0 0 700 300" className="w-full" style={{ maxWidth: 700 }}>
      <text x="350" y="22" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="bold">Endosporens oppbygging (tverrsnitt)</text>
      {/* Eksosporium */}
      <ellipse cx="220" cy="165" rx="145" ry="120" fill="none" stroke="#94A3B8" strokeWidth="2" strokeDasharray="6" />
      <text x="370" y="60" fill="#94A3B8" fontSize="10" fontWeight="bold">Eksosporium</text>
      <line x1="362" y1="62" x2="340" y2="75" stroke="#94A3B8" strokeWidth="0.5" />
      {/* Sporekappe */}
      <ellipse cx="220" cy="165" rx="120" ry="100" fill="#475569" fillOpacity="0.3" stroke="#64748B" strokeWidth="2" />
      <text x="370" y="90" fill="#64748B" fontSize="10" fontWeight="bold">Sporekappe</text>
      <line x1="362" y1="92" x2="330" y2="100" stroke="#64748B" strokeWidth="0.5" />
      {/* Cortex */}
      <ellipse cx="220" cy="165" rx="95" ry="80" fill="#A855F7" fillOpacity="0.15" stroke="#A855F7" strokeWidth="2" />
      <text x="370" y="115" fill="#A855F7" fontSize="10" fontWeight="bold">Cortex (løst peptidoglykan)</text>
      <line x1="362" y1="117" x2="310" y2="125" stroke="#A855F7" strokeWidth="0.5" />
      {/* Sporevegg */}
      <ellipse cx="220" cy="165" rx="70" ry="60" fill="#10B981" fillOpacity="0.1" stroke="#10B981" strokeWidth="2" />
      <text x="370" y="140" fill="#10B981" fontSize="10" fontWeight="bold">Sporevegg</text>
      <line x1="362" y1="142" x2="287" y2="145" stroke="#10B981" strokeWidth="0.5" />
      {/* Inner membrane */}
      <ellipse cx="220" cy="165" rx="55" ry="45" fill="#3B82F6" fillOpacity="0.1" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="370" y="165" fill="#3B82F6" fontSize="10" fontWeight="bold">Cellemembran</text>
      {/* Core */}
      <ellipse cx="220" cy="165" rx="40" ry="32" fill="#FBBF24" fillOpacity="0.2" stroke="#FBBF24" strokeWidth="2" />
      <text x="220" y="155" textAnchor="middle" fill="#FBBF24" fontSize="9" fontWeight="bold">Kjerneregion</text>
      <text x="220" y="168" textAnchor="middle" fill="#94A3B8" fontSize="8">DNA + SASP</text>
      <text x="220" y="180" textAnchor="middle" fill="#94A3B8" fontSize="8">DPA-Ca²⁺</text>
      <text x="220" y="192" textAnchor="middle" fill="#94A3B8" fontSize="8">Ribosomer</text>

      {/* Comparison table */}
      <text x="560" y="60" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="bold">Vegetativ vs Endospore</text>
      {[
        { prop: "Vanninnhold", veg: "80–90%", spo: "10–25%" },
        { prop: "Ca²⁺", veg: "Lite", spo: "Mye" },
        { prop: "DPA", veg: "Ingen", spo: "~10% tørrvekt" },
        { prop: "SASP", veg: "Nei", spo: "Ja" },
        { prop: "Enzymaktivitet", veg: "Høy", spo: "Minimal" },
        { prop: "Varmeresistens", veg: "Dør ~72°C", spo: "Tåler >121°C" },
        { prop: "UV-resistens", veg: "Sensitiv", spo: "Resistent" },
      ].map((r, i) => (
        <g key={`tr${i}`}>
          <text x="480" y={85 + i * 22} fill="#94A3B8" fontSize="9">{r.prop}</text>
          <text x="560" y={85 + i * 22} textAnchor="middle" fill="#F8FAFC" fontSize="9">{r.veg}</text>
          <text x="640" y={85 + i * 22} textAnchor="middle" fill="#FBBF24" fontSize="9">{r.spo}</text>
        </g>
      ))}
      <text x="560" y="73" textAnchor="middle" fill="#F8FAFC" fontSize="9">Vegetativ</text>
      <text x="640" y="73" textAnchor="middle" fill="#FBBF24" fontSize="9">Endospore</text>
      <line x1="470" y1="76" x2="680" y2="76" stroke="#334155" strokeWidth="0.5" />

      {/* Sporulation arrow */}
      <text x="350" y="260" textAnchor="middle" fill="#10B981" fontSize="11" fontWeight="bold">Sporulering → Hviletilstand → Germinering</text>
      <text x="350" y="278" textAnchor="middle" fill="#94A3B8" fontSize="9">Bacillus (aerob/fakultativ) • Clostridium (obligat anaerob)</text>
      <text x="350" y="293" textAnchor="middle" fill="#94A3B8" fontSize="9">Autoklavering: 121°C i 15 min for å drepe endosporer</text>
    </svg>
  );
}

function EukaryotSVG() {
  return (
    <svg viewBox="0 0 700 380" className="w-full" style={{ maxWidth: 700 }}>
      <text x="350" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="bold">Eukaryot celle — organeller</text>
      {/* Cell outline */}
      <ellipse cx="300" cy="210" rx="250" ry="160" fill="#1E293B" stroke="#334155" strokeWidth="2" />
      {/* Nucleus */}
      <ellipse cx="280" cy="180" rx="70" ry="55" fill="#7C3AED" fillOpacity="0.15" stroke="#7C3AED" strokeWidth="2" />
      <ellipse cx="280" cy="180" rx="20" ry="15" fill="#7C3AED" fillOpacity="0.3" />
      <text x="280" y="175" textAnchor="middle" fill="#7C3AED" fontSize="9" fontWeight="bold">Kjerne</text>
      <text x="280" y="188" textAnchor="middle" fill="#94A3B8" fontSize="7">DNA+histoner</text>
      <text x="280" y="200" textAnchor="middle" fill="#94A3B8" fontSize="7">Nukleolus</text>
      {/* Nuclear pores */}
      {[140, 160, 180, 200, 210].map((a, i) => {
        const angle = (a * Math.PI) / 180;
        const px = 280 + 70 * Math.cos(angle);
        const py = 180 + 55 * Math.sin(angle);
        return <circle key={`np${i}`} cx={px} cy={py} r="2" fill="#A78BFA" />;
      })}
      {/* ER around nucleus */}
      <path d="M 350 140 Q 380 150, 390 170 Q 400 190, 410 180 Q 420 170, 430 190" fill="none" stroke="#10B981" strokeWidth="1.5" />
      <path d="M 350 220 Q 380 230, 390 210 Q 400 200, 420 220" fill="none" stroke="#10B981" strokeWidth="1.5" strokeDasharray="4" />
      <text x="430" y="168" fill="#10B981" fontSize="8" fontWeight="bold">Granulert ER</text>
      {/* Ribosomes on ER */}
      {[355, 370, 385].map((x, i) => (
        <circle key={`rib${i}`} cx={x} cy={138 + i * 4} r="2" fill="#10B981" />
      ))}
      <text x="430" y="225" fill="#10B981" fontSize="8">Glatt ER</text>
      {/* Golgi */}
      {[0, 8, 16, 24].map((dy, i) => (
        <path key={`g${i}`} d={`M 140 ${130 + dy} Q 160 ${125 + dy}, 180 ${130 + dy}`} fill="none" stroke="#F59E0B" strokeWidth="2" />
      ))}
      <text x="100" y="130" fill="#F59E0B" fontSize="8" fontWeight="bold">Golgi</text>
      {/* Mitochondria */}
      <ellipse cx="180" cy="280" rx="30" ry="15" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" strokeWidth="1.5" />
      <path d="M 155 280 Q 165 270, 175 280 Q 185 290, 195 280" fill="none" stroke="#EF4444" strokeWidth="1" />
      <text x="180" y="284" textAnchor="middle" fill="#EF4444" fontSize="7" fontWeight="bold">Mitokondrium</text>
      {/* Another mito */}
      <ellipse cx="400" cy="280" rx="25" ry="12" fill="#EF4444" fillOpacity="0.2" stroke="#EF4444" strokeWidth="1.5" />
      <path d="M 380 280 Q 390 272, 400 280 Q 410 288, 420 280" fill="none" stroke="#EF4444" strokeWidth="1" />
      {/* Lysosome */}
      <circle cx="140" cy="220" r="15" fill="#F472B6" fillOpacity="0.2" stroke="#F472B6" strokeWidth="1.5" />
      <text x="140" y="223" textAnchor="middle" fill="#F472B6" fontSize="7" fontWeight="bold">Lysosom</text>
      {/* Vacuole */}
      <ellipse cx="420" cy="140" rx="35" ry="25" fill="#22D3EE" fillOpacity="0.1" stroke="#22D3EE" strokeWidth="1.5" />
      <text x="420" y="143" textAnchor="middle" fill="#22D3EE" fontSize="8" fontWeight="bold">Vakuole</text>
      {/* Cytoskeleton lines */}
      <line x1="100" y1="300" x2="480" y2="120" stroke="#475569" strokeWidth="0.5" strokeDasharray="8 4" />
      <line x1="120" y1="100" x2="450" y2="300" stroke="#475569" strokeWidth="0.5" strokeDasharray="8 4" />
      {/* Cell membrane label */}
      <text x="520" y="130" fill="#3B82F6" fontSize="8" fontWeight="bold">Cellemembran</text>
      <text x="520" y="142" fill="#94A3B8" fontSize="7">med kolesterol</text>
      {/* Cytoskeleton label */}
      <text x="520" y="300" fill="#475569" fontSize="8">Cytoskjelett</text>

      {/* Legend below */}
      <text x="350" y="360" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold">
        Diploid (2n) = to sett kromosomer · Haploid (n) = ett sett · Mitose → 2n · Meiose → n
      </text>
    </svg>
  );
}

function KjemotaksisSVG() {
  return (
    <svg viewBox="0 0 700 220" className="w-full" style={{ maxWidth: 700 }}>
      <text x="350" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="bold">Kjemotaksis: Run and Tumble</text>
      {/* Attractant source */}
      <circle cx="600" cy="120" r="40" fill="#10B981" fillOpacity="0.15" stroke="#10B981" strokeWidth="1" />
      <circle cx="600" cy="120" r="25" fill="#10B981" fillOpacity="0.2" />
      <circle cx="600" cy="120" r="12" fill="#10B981" fillOpacity="0.3" />
      <text x="600" y="124" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="bold">Attraktant</text>

      {/* Bacterium path - run and tumble */}
      <path d="M 80 160 L 150 140 L 145 125 L 200 110 L 210 130 L 280 100 L 275 90 L 350 80 L 360 95 L 430 75 L 435 60 L 520 90" fill="none" stroke="#F59E0B" strokeWidth="2" />
      {/* Runs */}
      <line x1="80" y1="160" x2="150" y2="140" stroke="#10B981" strokeWidth="3" />
      <line x1="145" y1="125" x2="200" y2="110" stroke="#10B981" strokeWidth="3" />
      <line x1="210" y1="130" x2="280" y2="100" stroke="#10B981" strokeWidth="3" />
      <line x1="275" y1="90" x2="350" y2="80" stroke="#10B981" strokeWidth="3" />
      <line x1="360" y1="95" x2="430" y2="75" stroke="#10B981" strokeWidth="3" />
      <line x1="435" y1="60" x2="520" y2="90" stroke="#10B981" strokeWidth="3" />

      {/* Tumble indicators */}
      {[150, 200, 280, 350, 430].map((x, i) => (
        <circle key={`t${i}`} cx={x} cy={[140,110,100,80,75][i]} r="4" fill="#EF4444" fillOpacity="0.6" />
      ))}
      {/* Bacterium */}
      <ellipse cx="80" cy="160" rx="12" ry="6" fill="#F59E0B" stroke="#F59E0B" strokeWidth="1" />

      {/* Labels */}
      <text x="120" y="195" fill="#10B981" fontSize="10" fontWeight="bold">Run (rettlinjet)</text>
      <text x="280" y="195" fill="#EF4444" fontSize="10" fontWeight="bold">Tumble (retningsendring)</text>

      {/* Taxis types */}
      <text x="350" y="215" textAnchor="middle" fill="#94A3B8" fontSize="9">Kjemotaksis · Fototaksis · Aerotaksis · Osmotaksis · Hydrotaksis · Magnetotaksis</text>
    </svg>
  );
}

function ArkerSVG() {
  return (
    <svg viewBox="0 0 700 220" className="w-full" style={{ maxWidth: 700 }}>
      <text x="350" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="bold">Forskjeller: Bakterier vs Arker (membranlipider)</text>
      {/* Bacteria side */}
      <text x="175" y="50" textAnchor="middle" fill="#3B82F6" fontSize="12" fontWeight="bold">Bakterier</text>
      <text x="175" y="70" textAnchor="middle" fill="#94A3B8" fontSize="10">Ester-bindinger</text>
      {/* Ester lipid */}
      <circle cx="130" cy="100" r="12" fill="#3B82F6" fillOpacity="0.4" stroke="#3B82F6" />
      <line x1="142" y1="100" x2="220" y2="100" stroke="#F59E0B" strokeWidth="3" />
      <line x1="142" y1="106" x2="220" y2="106" stroke="#F59E0B" strokeWidth="3" />
      <text x="175" y="130" textAnchor="middle" fill="#94A3B8" fontSize="9">Uforgrenet fettsyre</text>
      <text x="175" y="145" textAnchor="middle" fill="#3B82F6" fontSize="9">Fosfolipid dobbeltlag</text>
      {/* Double layer indicator */}
      <rect x="110" y="155" width="130" height="30" rx="4" fill="none" stroke="#3B82F6" strokeWidth="1" strokeDasharray="3" />
      <text x="175" y="174" textAnchor="middle" fill="#94A3B8" fontSize="8">Bilag (2 lag)</text>

      {/* Archaea side */}
      <text x="525" y="50" textAnchor="middle" fill="#F59E0B" fontSize="12" fontWeight="bold">Arker</text>
      <text x="525" y="70" textAnchor="middle" fill="#94A3B8" fontSize="10">Eter-bindinger</text>
      {/* Ether lipid */}
      <circle cx="480" cy="100" r="12" fill="#F59E0B" fillOpacity="0.4" stroke="#F59E0B" />
      <line x1="492" y1="100" x2="570" y2="100" stroke="#10B981" strokeWidth="3" />
      <line x1="492" y1="106" x2="570" y2="106" stroke="#10B981" strokeWidth="3" />
      {/* Branching */}
      {[510, 530, 550].map((x, i) => (
        <line key={`br${i}`} x1={x} y1={98} x2={x + 5} y2={90} stroke="#10B981" strokeWidth="1.5" />
      ))}
      <text x="525" y="130" textAnchor="middle" fill="#94A3B8" fontSize="9">Forgrenede isoprenoidkjeder</text>
      <text x="525" y="145" textAnchor="middle" fill="#F59E0B" fontSize="9">Kan danne monolag (tetraeter)</text>

      {/* Key differences */}
      <rect x="100" y="195" width="500" height="20" rx="4" fill="#1E293B" stroke="#334155" />
      <text x="350" y="209" textAnchor="middle" fill="#10B981" fontSize="10">Cellevegg: Pseudomuerin (ikke peptidoglykan) · Ribosomer: annen størrelse · Ekstremofile</text>
    </svg>
  );
}


// ═══════════════════════════════════════════
//  CONTENT DATA
// ═══════════════════════════════════════════
const CONTENT = {
  mikroskopi: {
    forklaring: `Mikroskopi er grunnlaget for å studere mikroorganismer. Oppløsningsevne — evnen til å skille to nærliggende punkter — bestemmes av bølgelengden (λ) og linsens numeriske apertur: d = 0.61λ / (n·sinθ). Lysmikroskop bruker synlig lys (400–700 nm) og gir oppløsning ned til ~0.2 µm, ca. 1000× bedre enn det blotte øye.

Farging øker kontrast. Basisfarger (metylenblått, krystallfiolett, safranin) er positivt ladde og binder seg til nukleinsyrer og negativt ladde polysakkarider. Gramfarging er den viktigste differensielle fargeteknikken: 1) Krystallfiolett farger alle celler, 2) Jod danner kompleks, 3) Etanol vasker bort farge fra Gram-negative (tynt peptidoglykan), 4) Safranin motfarger Gram-negative rosa. Gram-positive beholder lilla farge pga. tykt peptidoglykanlag.

Fasekontrast og mørkefelts mikroskopi øker kontrast uten farging — nyttig for levende celler. Fluorescensmikroskopi bruker UV/kortbølget lys til å få fargestoffer til å fluorescere.

Elektronmikroskop bruker elektronstråler med mye kortere bølgelengde og gir langt bedre oppløsning. TEM (transmisjons-EM) sender stråler gjennom tynne skiver for å se inne i cellen. SEM (sveipe-EM) skanner overflaten (prøve belegges med gull) og gir 3D-bilder.`,
    eksempel: {
      question: "Hvilket mikroskop er best egnet for å undersøke organeller inne i en bakteriecelle, og hvorfor?",
      steps: [
        "Organeller er intracellulære strukturer → vi trenger å se inne i cellen",
        "Lysmikroskop har for lav oppløsning (~0.2 µm) for de fleste organeller",
        "SEM viser kun overflatestruktur (3D), ikke innvendig",
        "TEM sender elektronstråler gjennom tynne snitt → viser indre struktur",
        "Svar: TEM (transmisjons-elektronmikroskop)"
      ]
    },
    huskeregel: "«Lys ser LeVende, TEM Trenger inn, SEM ser Surface» — og bølgelengden bestemmer oppløsningen!",
    eksamensrelevans: "Mikroskopi-flervalg kommer nesten hvert år (V2023 oppg. 2, V2024). Typiske spørsmål: riktig mikroskop for oppgaven, bølgelengde for lysfelt (400–700 nm), hva bølgelengde avgjør (oppløsningsevne)."
  },
  membran: {
    forklaring: `Cytoplasmamembranen (5–10 nm tykk) er en semipermeabel barriere som skiller cellens indre fra det ytre miljøet. Den består av et fosfolipid dobbeltlag der de hydrofobe fettsyrehalene vender mot hverandre og de hydrofile fosfathodene vender ut mot vandig miljø.

Tre hovedfunksjoner: 1) Permeabilitetsbarriere — hindrer tilfeldig molekylflyt. 2) Anker for proteiner — transportproteiner, signalproteiner. 3) Energiomsetning — opprettholder protongradient (H⁺ utenfor, OH⁻ innenfor).

Proteiner i membranen: Integrerte proteiner (transmembranproteiner) er permanent festet og fungerer i signaloverføring og ionekanaler. Perifere proteiner (lipoproteiner) sitter løsere og kan fjernes lettere.

Umettet fett i fosfolipidene gjør membranen mer flytende fordi knekkene i fettsyrene hindrer tett pakking. Noen bakterier kan omdanne fettsyrene for å tilpasse seg miljøet (f.eks. redusere protonpermeabilitet ved lav pH).

Protongradient (PMF = Proton Motive Force) er en forskjell i H⁺-konsentrasjon over membranen som fungerer som et batteri. Transport av H⁺ skjer via protonpumpe. PMF driver både ATP-syntese og aktiv transport.

Hos prokaryoter skjer respirasjon og fotosyntese i selve cellemembranen (eller innbuktninger av den), mens eukaryoter har egne organeller.`,
    eksempel: {
      question: "Beskriv de tre hovedfunksjonene til cytoplasmamembranen og forklar hvorfor den er viktig for cellens energiomsetning.",
      steps: [
        "1. Permeabilitetsbarriere: Hydrofob kjerne hindrer polare stoffer (unntatt vann) fra å passere fritt",
        "2. Anker for proteiner: Transportproteiner, reseptorer og enzymer er festet i membranen",
        "3. Energiomsetning: Membranen holder H⁺ utenfor og OH⁻ innenfor → protongradient (PMF)",
        "PMF fungerer som et batteri og driver ATP-syntase samt aktiv transport",
        "Hos prokaryoter foregår respirasjon direkte i cellemembranen (ingen mitokondrier)"
      ]
    },
    huskeregel: "«PÅE» — Permeabilitet, Anker, Energi. Membranen er cellens grensevakt, parkeringsplass og kraftverk!",
    eksamensrelevans: "Cellemembranens oppbygning og funksjoner har kommet på V2023 (oppg. 1) med navnsetting av fosfolipidkomponenter og transportproteiner. Forstå hydrofob/hydrofil-konseptet."
  },
  transport: {
    forklaring: `Transport over cellemembranen deles i passiv og aktiv transport.

Passiv transport krever ingen energi: Enkel diffusjon — små upolære molekyler (H₂O, gasser) beveger seg fritt fra høy til lav konsentrasjon uten proteiner. Fasilitert diffusjon bruker transportproteiner (spesifikke eller uspesifikke) men følger fortsatt konsentrasjonsgradienten. Aquaporiner er spesialiserte vanntransportproteiner.

Aktiv transport krever energi og kan gå mot konsentrasjonsgradienten. Energi kommer fra ATP eller protongradient (PMF). To spesielle varianter: ABC-transportører bruker bindingsproteiner og energi direkte fra ATP. Gruppetranslokasjon kjemisk modifiserer substratet under transporten (energi fra PEP — fosfoenolpyruvat).

Transportør-typer etter substratantall: Uniporter (ett substrat, passiv/aktiv), symporter (to substrater samme retning, aktiv), antiporter (to substrater motsatt retning, aktiv).

Viktig å forstå forskjellen mellom passiv og aktiv transport for eksamen — og at ABC-transport krever ATP mens «enkel transport» drives av PMF.`,
    eksempel: {
      question: "Hvilken transportmekanisme krever energi i form av ATP? (Flervalg: Enkel transport / Diffusjon / ABC-transportør / Gruppetranslokasjon)",
      steps: [
        "Diffusjon = passiv, ingen energi → FEIL",
        "Enkel transport = aktiv transport drevet av PMF (protongradient), ikke ATP direkte → FEIL",
        "Gruppetranslokasjon = bruker PEP som energikilde → FEIL",
        "ABC-transportør = bruker bindingsproteiner + energi direkte fra ATP → RIKTIG",
        "NB: Denne oppgaven kom på eksamen V2024!"
      ]
    },
    huskeregel: "«ABC = Always Burns Cash (ATP)» — ABC-transportører er de eneste som bruker ATP direkte. Enkel transport bruker PMF, gruppetranslokasjon bruker PEP.",
    eksamensrelevans: "Transportmekanismer har kommet som flervalg (V2024 oppg. 6b). Typisk forveksling: enkel transport vs. ABC — husk at ABC = ATP."
  },
  cellevegg: {
    forklaring: `Celleveggens hovedfunksjon er å gi bakterien styrke og form. Uten vegg blir cellen en protoplast som lyserer i hypoton løsning.

Peptidoglykan er nøkkelmolekylet — en polymer av N-acetylglukosamin (NAG/G) og N-acetylmuraminsyre (NAM/M) i repeterende -M-G-M-G- kjeder, kryssbundet med peptidbroer.

Gram-positive bakterier har tykt peptidoglykanlag (opptil 30 lag), teikoinsyrer (polyalkoholer som binder divalente ioner) og lipoteikoinsyrer (bundet til membranlipider). Farges lilla med Gramfarging.

Gram-negative bakterier har tynt peptidoglykan (1–2 lag) men en ekstra yttermembran med lipopolysakkarider (LPS/endotoksiner), poriner (gjør yttermembranen permeabel for små molekyler) og lipoproteiner (forankrer yttermembran til peptidoglykan). Mellom indre og ytre membran ligger periplasma. Farges rosa med Gramfarging.

LPS = Lipopolysakkarider. Består av Lipid A + kjernepolysakkarid + O-antigen. LPS er synonymt med endotoksiner — giftstoffer som frigjøres når Gram-negative bakterier dør.

Gramfarging (4 trinn): 1) Krystallfiolett → alle lilla. 2) Jod (Lugol) → danner kompleks. 3) Avfarging (etanol) → Gram-neg. mister farge (tynt PG). 4) Safranin → Gram-neg. farges rosa.`,
    eksempel: {
      question: "Hva kjennetegner Gram-positive bakterier? (Flervalg fra eksamen V2023)",
      steps: [
        "Gram-positive har TYKT peptidoglykanlag (opptil 30 lag)",
        "Inneholder teikoinsyrer og lipoteikoinsyrer",
        "Mangler yttermembran, LPS, periplasma og poriner",
        "Beholder krystallfiolett under avfarging → farges LILLA",
        "Gram-positive slekter: Bacillus, Clostridium, Staphylococcus, Streptococcus, Lactobacillus"
      ]
    },
    huskeregel: "«Gram-Positiv = Peptidoglykan Plenty + Teikoinsyre» vs «Gram-Negativ = Nyttig LPS-lag + Poriner + Periplasma». Husk MAGDA for peptidoglykan-aminosyrer!",
    eksamensrelevans: "Cellevegg er kjernetema nesten hvert år. V2023 oppg. 1 (navnsetting av membrankomponenter), V2024 flervalg. Gram-pos vs Gram-neg forskjeller er svært eksamensrelevant."
  },
  overflate: {
    forklaring: `Overflatestrukturer er forankret i cellevegg/cellemembran og gir bakterien viktige funksjoner.

Flageller er lange (15–20 nm tykke), roterende trådformede bevegelsesorganer bygd av flagellin-protein. I motsetning til eukaryote flageller roterer prokaryote flageller som en propell. Oppbygning (Gram-negativ): Filament (flagellin) → Krok (hook) → Rod (stav) gjennom L-ring (yttermembran), P-ring (peptidoglykan), MS-ring (cellemembran) → C-ring + Mot-proteiner (motor, cytoplasma). Fli-proteiner fungerer som motorbryter. Posisjoner: Polar (en ende), lophotrik (bunt i en ende), amphitrik (begge ender), peritrik (hele overflaten).

Pilier (pili): Tykke, lengre fibre (1–10 per celle) bygd av pilin. Gener i plasmider. Funksjoner: feste, konjugasjon (overføring av arvestoff), type IV pili gir «twitching»-bevegelse.

Fimbrier: Tynne, korte fibre (200–400 per celle) med gener i kromosomet. Kun festeegenskaper — IKKE konjugasjon.

Kapsel: Klart avgrenset lag av polysakkarider/proteiner. Beskytter mot fagocytose og uttørring, feste til overflater.

Slimlag: Diffust, ikke klart avgrenset — forstadium til biofilm. Samme funksjoner som kapsel.

S-lag: Paracrystallinsk proteinlag på overflaten hos noen arter.`,
    eksempel: {
      question: "Gi eksempel på 3 overflatestrukturer med funksjon og oppbygning. (Eksamen V2025, oppg. 9, 6 poeng)",
      steps: [
        "1. FLAGELL: Lang, roterende propell av flagellin. Basallegeme med ringer (MS, P, L, C). Funksjon: bevegelse (svømming). Avhengig av vann/fukt.",
        "2. PILIER: Tykke fibre av pilin (1–10/celle). Gener i plasmider. Funksjon: feste + konjugasjon (overføring av arvestoff mellom bakterier). Type IV pili → twitching.",
        "3. KAPSEL/SLIMLAG: Lag av polysakkarider/proteiner. Kapsel = klart avgrenset, slimlag = diffust. Funksjon: feste, beskyttelse mot fagocytose, hindre uttørring, biofilmdannelse.",
        "Alternativ 3: FIMBRIER: Tynne, korte fibre (200–400/celle). Gener i kromosomet. Funksjon: kun feste (ikke konjugasjon)."
      ]
    },
    huskeregel: "«Pili = Par (konjugasjon), Fimbrier = Feste. Flagell = Fart.» Pilier er få og tykke, fimbrier er mange og tynne.",
    eksamensrelevans: "V2025 oppg. 9 (6p) spurte direkte om 3 overflatestrukturer med funksjon + oppbygning. V2024 flervalg: «Hvilken komponent overfører arvestoff?» → Pili. Svært viktig emne!"
  },
  kjemotaksis: {
    forklaring: `Kjemotaksis er bevegelse indusert av kjemiske stoffer. Bakterier bruker kjemoreseptorer i cellemembranen til å detektere attraktanter (stoffer som tiltrekker) og repellenter (stoffer som frastøter).

Bevegelsesmønster: «Run and tumble». Under «run» svømmer bakterien rettlinjet. Under «tumble» stopper den og endrer tilfeldig retning. Nær en attraktant forlenges «runs» → netto bevegelse mot kilden. Nær repellent økes «tumble»-frekvensen → bevegelse bort.

Andre taksier: Fototaksis (lys), aerotaksis/oksytaksis (oksygen), osmotaksis (ionestyrke), hydrotaksis (vann), magnetotaksis (magnetfelt — magnetosomer med jernmineraler).

Andre bevegelsesmekanismer (uten flagell): Twitching bruker type IV pili — bakterien drar seg framover. Gliding bruker ekstracellulære proteiner. Sliding drives av celledeling.

Måling av kjemotaksis kan gjøres med kapillarrør-metoden.`,
    eksempel: {
      question: "Hva kjennetegner hydrotaksis? (Flervalg V2024)",
      steps: [
        "Hydro- = vann",
        "Taksis = bevegelse mot/fra en stimulus",
        "Hydrotaksis = bevegelse til eller fra vann",
        "IKKE «cellens vannopptak» (osmose)",
        "IKKE «hydrogenering av fettstoffer» (metabolisme)",
        "Svar: Bevegelse til eller fra vann"
      ]
    },
    huskeregel: "Taksier = bevegelse. Kjemo=kjemikalier, Foto=lys, Aero=O₂, Osmo=ioner, Hydro=vann, Magneto=magnetfelt.",
    eksamensrelevans: "Hydrotaksis-spørsmål kom V2024 (flervalg). Forstå forskjellen mellom de ulike taksiene — og at kjemotaksis bruker «run and tumble»-mønster."
  },
  endosporer: {
    forklaring: `Endosporer er hvilestadier hos enkelte Gram-positive bakterier (Bacillus og Clostridium). Dannes ved mangel på næringsstoffer, tørke eller kulde. Én spore per celle — det er IKKE reproduksjon.

Oppbygning (innenfra og ut): Kjerneregion (DNA + ribosomer + SASP + dipikolinsyre-Ca²⁺-kompleks) → Cellemembran → Sporevegg (vanlig cellevegg) → Cortex (løst peptidoglykan) → Sporekappe (proteinlag) → Eksosporium (ytterste proteinlag).

Hvorfor så resistent? 1) Lavt vanninnhold (10–25% vs 80–90% i vegetative celler). 2) Dipikolinsyre (DPA) + Ca²⁺ utgjør ~10% av tørrvekt, binder fritt vann, beskytter DNA. 3) SASP (Small Acid Soluble Proteins) beskytter DNA mot UV og tørr varme, fungerer som C/energi-kilde ved spiring.

Endosporer tåler koking i timer. Autoklavering ved 121°C i 15 min er nødvendig. Kan også tåle UV, syrer (ned til pH 2), desinfeksjonsmidler.

Sporulering = dannelse (flere trinn). Germinering = spiring: Aktivering → tap av DPA og Ca²⁺ → nedbrytning av SASP → økt vanninnhold → svelling → utvekst av vegetativ celle.

Farges med malachite green. Bacillus = aerob/fakultativ, Clostridium = obligat anaerob. C. botulinum produserer neurotoksiner (botulisme).`,
    eksempel: {
      question: "Hvilken bakterieslekt danner endosporer? (V2024 flervalg: Listeria / Clostridium / Micrococcus / Lactobacillus)",
      steps: [
        "Endosporer dannes kun av noen Gram-positive bakterier",
        "De to kjente slektene er Bacillus og Clostridium",
        "Listeria = Gram-positiv stav, men danner IKKE endosporer",
        "Micrococcus = Gram-positiv kokk, ikke sporedanner",
        "Lactobacillus = melkesyrebakterie, ikke sporedanner",
        "Svar: Clostridium"
      ]
    },
    huskeregel: "«BC-klubben»: Bare Bacillus og Clostridium danner endosporer. DPA+Ca²⁺ = tørker ut sporen. SASP = DNAs bodyguard.",
    eksamensrelevans: "V2024 flervalg: «Hvilken slekt danner endosporer?» → Clostridium. Oppbygning og resistensegenskaper er pensum. Husk autoklavering 121°C/15 min."
  },
  eukaryot: {
    forklaring: `Eukaryote celler er mer komplekse enn prokaryote — de har en ekte cellekjerne med dobbel kjernemembran og mange organeller.

Cellekjerne: Inneholder arvestoff som kromosomer (DNA + histoner). Dobbel kjernemembran med ~1000 porer for transport. Nukleolus koder for rRNA.

Endoplasmatisk retikulum (ER): Membrannettverk koblet til kjernemembran. Granulert (ru) ER har ribosomer → proteinsyntese, spesielt glykoproteiner. Glatt ER → lipidsyntese.

Golgiapparat: Stabler av membransekker. Modifikasjon av glykoproteiner/glykolipider fra ER. Pakker stoffer i vesikler for transport.

Lysosomer: Inneholder hydrolytiske fordøyelsesenzymer (pH~5). Bryter ned proteiner, nukleinsyrer, karbohydrater, fettstoffer. Viktig ved endocytose/fagocytose.

Mitokondrium: Cellens kraftverk — aerob respirasjon i cristae (innbuktninger). Dobbel membran, eget DNA og ribosomer (→ endosymbioseteorien).

Kloroplast: Fotosyntese — omdanner lysenergi til kjemisk energi. Dobbel membran, egne ribosomer/DNA.

Endosymbioseteorien: Mitokondrier og kloroplaster var opprinnelig frittlevende bakterier. Støttes av: eget DNA/ribosomer, «bakteriegener» i kjernen, antibiotika hemmer proteinsyntese i begge.

Kolesterol (steroler): Finnes i eukaryote membraner men IKKE prokaryote. Stive molekyler som stabiliserer membranen og påvirker permeabilitet. Prokaryoter kan ha hopanoider som ligner.

Cytoskjelett: Mikrotubuler, mikrofilamenter, intermediære filamenter → styrke og form.

Celledeling: Mitose = ukjønnet, 2n → 2n (diploid). Meiose = kjønnet, 2n → n (haploid kjønnsceller).`,
    eksempel: {
      question: "Eksamen V2025, oppg. 10 (7p): a) Stoff i eukaryote membraner men ikke prokaryote? b) Hva foregår i ER? c) Lysosomenes enzymfunksjon? d) Diploid vs haploid?",
      steps: [
        "a) Kolesterol (steroler) — stive molekyler som stabiliserer membranen og påvirker permeabilitet. Prokaryoter kan ha hopanoider.",
        "b) ER = membrannettverk. Granulert ER har ribosomer → proteinsyntese (glykoproteiner). Glatt ER → lipidsyntese.",
        "c) Lysosomer inneholder hydrolytiske enzymer som bryter ned makromolekyler (proteiner, nukleinsyrer, karbohydrater, fett). Produktene brukes som byggesteiner. Viktig ved fagocytose.",
        "d) Diploid = 2 sett kromosomer (2n), vanlige kroppsceller. Haploid = 1 sett (n), kjønnsceller. Mitose bevarer 2n, meiose gir n."
      ]
    },
    huskeregel: "«Golgi = Gave-innpakking» (pakker i vesikler). «Lysosom = Lyserer» (bryter ned). Kolesterol er eukaryotenes membranstabilisator.",
    eksamensrelevans: "V2025 oppg. 10 (7p!) spurte om kolesterol, ER (glatt/granulert), lysosomer og diploid/haploid. V2024 flervalg: «Hva skjer i Golgi?» → Modifikasjon av glykoproteiner. SVÆRT viktig!"
  },
  arker: {
    forklaring: `Arker (Archaea) er encellete prokaryoter som ligner bakterier i utseende men skiller seg vesentlig i biokjemi.

Cellevegg: Arker har IKKE peptidoglykan. Noen har pseudomuerin (ligner på peptidoglykan) eller andre veggmolekyler. Noen mangler cellevegg helt.

Cellemembran: Viktigste forskjell! Arker har eter-bindinger i membranlipidene (bakterier har ester-bindinger). Lipidkjedene er forgrenede isoprenoidkjeder. Noen arker kan danne monolag (tetraeter-lipider) som gir ekstra stabilitet ved ekstreme temperaturer.

Ribosomer: Ulik form og størrelse sammenlignet med bakterier.

Ekstremofile: Mange arker lever i ekstreme miljøer — svært høye temperaturer (termofile), høy saltkonsentrasjon (halofile), ekstrem pH (acidofile). Metanogene arker er viktige i anaerobe miljøer (søppelfyllinger, slam) og produserer metan.

Overflatestrukturer: Noen arker har pili. Noen har hamus — en pilielignende struktur med gripekrok i enden.

Arker er IKKE patogene for mennesker, i motsetning til mange bakterier.`,
    eksempel: {
      question: "Hva er den viktigste forskjellen mellom cellemembranen hos bakterier og arker?",
      steps: [
        "Bakterier: Ester-bindinger mellom glyserol og fettsyrer",
        "Arker: Eter-bindinger mellom glyserol og isoprenoidkjeder",
        "Arkers lipidkjeder er forgrenede (isoprenoid), bakteriers er uforgrenet",
        "Arker kan danne monolag (tetraeter) → ekstra stabil ved høy temperatur",
        "Begge har fosfolipider, men kjemien er fundamentalt forskjellig"
      ]
    },
    huskeregel: "«Arker = Eter, Bakterier = Ester». En bokstav forskjell, men stor konsekvens for stabiliteten!",
    eksamensrelevans: "Arker dukker opp i sammenheng med cellevegg/membran-spørsmål. Pseudomuerin vs peptidoglykan, eterlipider vs esterlipider er klassiske eksamensdistinksjoner."
  },
};

// ═══════════════════════════════════════════
//  QUIZ DATA
// ═══════════════════════════════════════════
const QUIZ = [
  { q: "Hva bestemmer oppløsningsevnen til et mikroskop?", a: "Bølgelengden (λ) til strålingen og linsens numeriske apertur. Formel: d = 0.61λ / (n·sinθ). Kortere bølgelengde → bedre oppløsning." },
  { q: "Hvilket mikroskop er best egnet for å se inne i en celle?", a: "TEM (transmisjons-elektronmikroskop) — sender elektronstråler gjennom tynne snitt av cellen." },
  { q: "Hva er de 4 trinnene i Gramfarging?", a: "1) Krystallfiolett (alle lilla), 2) Jod/Lugol (danner kompleks), 3) Avfarging med etanol (Gram-neg. mister farge), 4) Safranin (Gram-neg. → rosa)." },
  { q: "Nevn de tre hovedfunksjonene til cytoplasmamembranen.", a: "1) Permeabilitetsbarriere, 2) Anker for proteiner, 3) Energiomsetning (protongradient/PMF)." },
  { q: "Hva er forskjellen mellom ABC-transportør og enkel aktiv transport?", a: "ABC-transportør bruker energi direkte fra ATP + bindingsproteiner. Enkel aktiv transport drives av protongradient (PMF)." },
  { q: "Hva er hovedkomponentene i peptidoglykan?", a: "N-acetylglukosamin (NAG/G) og N-acetylmuraminsyre (NAM/M) i repeterende -M-G-M-G- kjeder, kryssbundet med peptidbroer." },
  { q: "Nevn 3 forskjeller mellom Gram-positiv og Gram-negativ cellevegg.", a: "Gram+: tykt PG (30 lag), teikoinsyre, ingen yttermembran. Gram−: tynt PG (1–2 lag), yttermembran med LPS og poriner, periplasma." },
  { q: "Hva er LPS og hvor finnes det?", a: "Lipopolysakkarider — endotoksiner i yttermembranen hos Gram-negative bakterier. Frigjøres når bakterien dør." },
  { q: "Hva er forskjellen mellom pilier og fimbrier?", a: "Pilier: tykke, få (1–10/celle), gener i plasmid, konjugasjon+feste. Fimbrier: tynne, mange (200–400/celle), gener i kromosom, kun feste." },
  { q: "Beskriv oppbygningen av en prokaryot flagell.", a: "Filament (flagellin) → Krok → Rod gjennom L-ring (yttermembran), P-ring (PG), MS-ring (cellemembran), C-ring + Mot-proteiner (motor)." },
  { q: "Hva gjør endosporer så varmeresistente?", a: "Lavt vanninnhold (10–25%), dipikolinsyre-Ca²⁺-kompleks (~10% tørrvekt), SASP som beskytter DNA, cortex av løst peptidoglykan." },
  { q: "Hvilke to bakterieslekter danner endosporer?", a: "Bacillus (aerob/fakultativ) og Clostridium (obligat anaerob)." },
  { q: "Hva er germinering?", a: "Spiring av en endospore til en vegetativ celle: Aktivering → tap av DPA/Ca²⁺ → nedbrytning av SASP → økt vanninnhold → svelling → utvekst." },
  { q: "Hvilket stoff finnes i eukaryote membraner men ikke prokaryote?", a: "Kolesterol (steroler) — stive molekyler som stabiliserer membranen og påvirker permeabilitet." },
  { q: "Hva er forskjellen mellom glatt og granulert ER?", a: "Granulert (ru) ER har ribosomer → proteinsyntese/glykoproteiner. Glatt ER mangler ribosomer → lipidsyntese." },
  { q: "Hva skjer i Golgiapparatet?", a: "Modifikasjon av glykoproteiner og glykolipider fra ER. Pakking i vesikler for transport til andre deler av cellen." },
  { q: "Hva inneholder lysosomer og hva er funksjonen?", a: "Hydrolytiske fordøyelsesenzymer (pH~5). Bryter ned proteiner, nukleinsyrer, karbohydrater og fettstoffer. Viktig ved fagocytose." },
  { q: "Forklar endosymbioseteorien.", a: "Mitokondrier og kloroplaster var frittlevende bakterier som ble inkorporert i eukaryote celler. Støttes av: eget DNA/ribosomer, bakteriegener i kjernen, antibiotika hemmer proteinsyntese i begge." },
  { q: "Hva er forskjellen mellom diploid og haploid?", a: "Diploid (2n) = to sett kromosomer (somatiske celler). Haploid (n) = ett sett (kjønnsceller). Mitose → 2n, meiose → n." },
  { q: "Hva er den viktigste forskjellen mellom arkers og bakteriers cellemembran?", a: "Arker har eter-bindinger med forgrenede isoprenoidkjeder. Bakterier har ester-bindinger med uforgrenet fettsyre." },
  { q: "Hva er kjemotaksis og hvordan fungerer run-and-tumble?", a: "Kjemotaksis = bevegelse mot/fra kjemiske stimuli. Run = rettlinjet svømming. Tumble = tilfeldig retningsendring. Nær attraktant → lengre runs." },
  { q: "Hva kjennetegner hydrotaksis?", a: "Bevegelse til eller fra vann. (Eksamensspørsmål V2024 — IKKE vannopptak eller hydrogenering!)" },
];

// ═══════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════
export default function Cellebiologi() {
  const [activeTab, setActiveTab] = useState("mikroskopi");
  const [visited, setVisited] = useState(new Set(["mikroskopi"]));
  const [flipped, setFlipped] = useState({});
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizFlipped, setQuizFlipped] = useState(false);
  const [expandedSteps, setExpandedSteps] = useState({});
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const contentRef = useRef(null);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setVisited((prev) => new Set([...prev, id]));
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  const SVG_MAP = {
    mikroskopi: MikroskopiSVG,
    membran: MembranSVG,
    transport: TransportSVG,
    cellevegg: CelleveggSVG,
    overflate: OverflateSVG,
    kjemotaksis: KjemotaksisSVG,
    endosporer: EndosporeSVG,
    eukaryot: EukaryotSVG,
    arker: ArkerSVG,
  };

  const ActiveSVG = SVG_MAP[activeTab];
  const content = CONTENT[activeTab];
  const terms = TERMS[activeTab] || [];

  return (
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", background: "#0F172A", color: "#F8FAFC", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Source+Sans+3:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0F172A; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        .tab-bar { display: flex; overflow-x: auto; gap: 2px; padding: 8px 12px; background: #0D1117; border-bottom: 1px solid #1E293B; position: sticky; top: 0; z-index: 50; }
        .tab-btn { flex-shrink: 0; padding: 8px 14px; border: none; border-radius: 6px; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 12px; font-weight: 600; transition: all 0.2s; background: transparent; color: #64748B; white-space: nowrap; position: relative; }
        .tab-btn:hover { background: #1E293B; color: #94A3B8; }
        .tab-btn.active { background: #10B981; color: #0F172A; }
        .tab-btn .visit-dot { position: absolute; top: 4px; right: 4px; width: 6px; height: 6px; border-radius: 50%; background: #10B981; }
        .tab-btn.active .visit-dot { background: #0F172A; }
        .section { margin-bottom: 24px; }
        .section-title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; font-weight: 700; color: #10B981; margin-bottom: 10px; padding-left: 12px; border-left: 3px solid #10B981; }
        .card { background: #1E293B; border: 1px solid #334155; border-radius: 10px; padding: 16px; }
        .term-pill { display: inline-block; padding: 5px 12px; margin: 3px; border-radius: 20px; background: #10B98115; border: 1px solid #10B98140; color: #10B981; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; position: relative; font-family: 'Plus Jakarta Sans', sans-serif; }
        .term-pill:hover { background: #10B98130; transform: translateY(-1px); }
        .term-tooltip { position: absolute; bottom: 110%; left: 50%; transform: translateX(-50%); background: #0F172A; border: 1px solid #10B981; border-radius: 8px; padding: 8px 12px; font-size: 11px; color: #F8FAFC; white-space: normal; width: 260px; z-index: 100; font-weight: 400; font-family: 'Source Sans 3', sans-serif; pointer-events: none; box-shadow: 0 8px 24px rgba(0,0,0,0.5); }
        .fagbegrep { color: #10B981; font-weight: 600; }
        .forklaring-text { font-size: 14px; line-height: 1.75; color: #CBD5E1; white-space: pre-line; }
        .huskeregel-box { background: linear-gradient(135deg, #10B98115, #10B98108); border: 1px solid #10B98140; border-radius: 10px; padding: 14px 18px; font-style: italic; color: #A7F3D0; font-size: 13px; line-height: 1.6; }
        .eksamen-box { background: #1E293B; border-left: 3px solid #F59E0B; border-radius: 0 8px 8px 0; padding: 10px 14px; font-size: 13px; color: #FDE68A; }
        .step-toggle { cursor: pointer; padding: 8px 14px; background: #10B98120; border: 1px solid #10B98140; border-radius: 8px; color: #10B981; font-size: 13px; font-weight: 600; width: 100%; text-align: left; transition: 0.2s; font-family: 'Plus Jakarta Sans', sans-serif; }
        .step-toggle:hover { background: #10B98130; }
        .step-list { list-style: none; padding: 10px 0 0 0; }
        .step-list li { padding: 6px 0 6px 20px; font-size: 13px; color: #94A3B8; position: relative; }
        .step-list li::before { content: '→'; position: absolute; left: 0; color: #10B981; }
        .quiz-card { perspective: 1000px; cursor: pointer; min-height: 180px; }
        .quiz-inner { position: relative; width: 100%; min-height: 180px; transition: transform 0.5s; transform-style: preserve-3d; }
        .quiz-inner.flipped { transform: rotateY(180deg); }
        .quiz-front, .quiz-back { position: absolute; inset: 0; backface-visibility: hidden; border-radius: 12px; padding: 24px; display: flex; flex-direction: column; justify-content: center; }
        .quiz-front { background: linear-gradient(145deg, #1E293B, #0F172A); border: 1px solid #334155; }
        .quiz-back { background: linear-gradient(145deg, #10B98120, #0F172A); border: 1px solid #10B98140; transform: rotateY(180deg); }
        .quiz-nav { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 12px; }
        .quiz-nav button { padding: 8px 20px; border-radius: 8px; border: 1px solid #334155; background: #1E293B; color: #F8FAFC; font-size: 13px; cursor: pointer; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; transition: 0.2s; }
        .quiz-nav button:hover { background: #334155; }
        .quiz-nav button:disabled { opacity: 0.3; cursor: default; }
        .progress-bar { display: flex; gap: 3px; margin: 12px 0; flex-wrap: wrap; }
        .progress-dot { width: 14px; height: 14px; border-radius: 3px; background: #1E293B; border: 1px solid #334155; transition: 0.2s; }
        .progress-dot.visited { background: #10B98140; border-color: #10B981; }
        .progress-dot.active { background: #10B981; border-color: #10B981; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", padding: "20px 24px" }}>
        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 13, fontWeight: 600, color: "#0F172A", opacity: 0.7, letterSpacing: 1 }}>EMNE 2 — MATV1007</div>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 28, fontWeight: 800, color: "#0F172A", margin: "4px 0" }}>Cellebiologi</h1>
        <div style={{ fontSize: 13, color: "#064E3B" }}>Prokaryot & eukaryot cellebiologi — mikroskopi, membran, cellevegg, overflatestrukturer, endosporer</div>
        <div style={{ marginTop: 8, fontSize: 12, color: "#065F46" }}>
          <strong>K2:</strong> Bred kunnskap om oppbygning av prokaryote og eukaryote celler og funksjonen til de viktigste cellekomponentene
        </div>
        {/* Progress */}
        <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: "#064E3B", fontWeight: 600 }}>{visited.size}/{TABS.length} faner besøkt</span>
          <div className="progress-bar">
            {TABS.map((t) => (
              <div key={t.id} className={`progress-dot ${visited.has(t.id) ? "visited" : ""} ${activeTab === t.id ? "active" : ""}`} title={t.label} />
            ))}
          </div>
        </div>
      </div>

      {/* TAB BAR */}
      <div className="tab-bar">
        {TABS.map((t) => (
          <button key={t.id} className={`tab-btn ${activeTab === t.id ? "active" : ""}`} onClick={() => handleTabClick(t.id)}>
            <span style={{ marginRight: 4 }}>{t.icon}</span>
            {t.label}
            {visited.has(t.id) && activeTab !== t.id && <span className="visit-dot" />}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div ref={contentRef} style={{ padding: "20px 16px", maxWidth: 800, margin: "0 auto" }}>
        {/* Nøkkelbegreper */}
        <div className="section">
          <div className="section-title">Nøkkelbegreper</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
            {terms.map((t, i) => (
              <span
                key={i}
                className="term-pill"
                onMouseEnter={() => setHoveredTerm(`${activeTab}-${i}`)}
                onMouseLeave={() => setHoveredTerm(null)}
                onClick={() => setHoveredTerm(hoveredTerm === `${activeTab}-${i}` ? null : `${activeTab}-${i}`)}
              >
                {t.term}
                {hoveredTerm === `${activeTab}-${i}` && (
                  <span className="term-tooltip">{t.def}</span>
                )}
              </span>
            ))}
          </div>
        </div>

        {/* Forklaring */}
        <div className="section">
          <div className="section-title">Forklaring</div>
          <div className="card">
            <div className="forklaring-text">
              {content.forklaring.split(/(\b(?:Cytoplasmamembranen|cellemembran(?:en)?|fosfolipid(?:er|ene)?|lipid dobbeltlag|integrerte proteiner|perifere proteiner|permeabilitetsbarriere|protongradient|PMF|hopanoider|enkel diffusjon|fasilitert diffusjon|aktiv transport|ABC-transport(?:ør|ører)|gruppetranslokasjon|uniporter|symporter|antiporter|aquaporiner|peptidoglykan(?:et|lag)?|NAG|NAM|teikoinsyre(?:r)?|lipoteikoinsyre(?:r)?|LPS|lipopolysakkarid(?:er)?|poriner|periplasma|protoplast|yttermembran(?:en)?|endotoksin(?:er)?|flagell(?:er|en)?|flagellin|basallegeme(?:t)?|pilier|pili|fimbrier|kapsel(?:er)?|slimlag|S-lag|kjemotaksis|attraktant(?:er)?|repellent(?:er)?|run and tumble|fototaksis|aerotaksis|osmotaksis|hydrotaksis|magnetotaksis|twitching|endospore(?:r|n)?|dipikolinsyre|DPA|SASP|cortex|sporekappe(?:n)?|eksosporium|sporulering|germinering|Bacillus|Clostridium|autoklavering|cellekjerne(?:n)?|endoplasmatisk retikulum|ER|granulert|glatt|Golgiapparat(?:et)?|lysosom(?:er)?|mitokondri(?:um|er)?|kloroplast(?:er)?|kolesterol|steroler|cytoskjelett(?:et)?|diploid|haploid|mitose|meiose|endosymbioseteorien|pseudomuerin|eter-bindinger|isoprenoidkjeder|ekstremofile|metanogene|hamus|Gramfarging|Gram-positiv(?:e)?|Gram-negativ(?:e)?|krystallfiolett|safranin|TEM|SEM|oppløsningsevne(?:n)?|basisfarger|fasekontrast|fluorescensmikroskopi|mørkefelts(?:mikroskopi)?)\b)/gi).map((part, i) => {
                if (/^(Cytoplasmamembranen|cellemembran|fosfolipid|lipid dobbeltlag|integrerte proteiner|perifere proteiner|permeabilitetsbarriere|protongradient|PMF|hopanoider|enkel diffusjon|fasilitert diffusjon|aktiv transport|ABC-transport|gruppetranslokasjon|uniporter|symporter|antiporter|aquaporiner|peptidoglykan|NAG|NAM|teikoinsyre|lipoteikoinsyre|LPS|lipopolysakkarid|poriner|periplasma|protoplast|yttermembran|endotoksin|flagell|flagellin|basallegeme|pilier|pili|fimbrier|kapsel|slimlag|S-lag|kjemotaksis|attraktant|repellent|run and tumble|fototaksis|aerotaksis|osmotaksis|hydrotaksis|magnetotaksis|twitching|endospore|dipikolinsyre|DPA|SASP|cortex|sporekappe|eksosporium|sporulering|germinering|Bacillus|Clostridium|autoklavering|cellekjerne|endoplasmatisk retikulum|ER|granulert|glatt|Golgiapparat|lysosom|mitokondri|kloroplast|kolesterol|steroler|cytoskjelett|diploid|haploid|mitose|meiose|endosymbioseteorien|pseudomuerin|eter-bindinger|isoprenoidkjeder|ekstremofile|metanogene|hamus|Gramfarging|Gram-positiv|Gram-negativ|krystallfiolett|safranin|TEM|SEM|oppløsningsevne|basisfarger|fasekontrast|fluorescensmikroskopi|mørkefelts)/i.test(part)) {
                  return <span key={i} className="fagbegrep">{part}</span>;
                }
                return <span key={i}>{part}</span>;
              })}
            </div>
          </div>
        </div>

        {/* Visuell illustrasjon */}
        <div className="section">
          <div className="section-title">Visuell illustrasjon</div>
          <div className="card" style={{ overflow: "hidden" }}>
            <ActiveSVG />
          </div>
        </div>

        {/* Eksempel */}
        <div className="section">
          <div className="section-title">Eksempel</div>
          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 600, color: "#F8FAFC", marginBottom: 10, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {content.eksempel.question}
            </div>
            <button
              className="step-toggle"
              onClick={() => setExpandedSteps((p) => ({ ...p, [activeTab]: !p[activeTab] }))}
            >
              {expandedSteps[activeTab] ? "▼ Skjul løsning" : "▶ Vis løsning steg for steg"}
            </button>
            {expandedSteps[activeTab] && (
              <ul className="step-list">
                {content.eksempel.steps.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Huskeregel */}
        <div className="section">
          <div className="section-title">Huskeregel</div>
          <div className="huskeregel-box">💡 {content.huskeregel}</div>
        </div>

        {/* Eksamensrelevans */}
        <div className="section">
          <div className="section-title">Eksamensrelevans</div>
          <div className="eksamen-box">⚠️ {content.eksamensrelevans}</div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#1E293B", margin: "32px 0" }} />

        {/* QUIZ */}
        <div className="section">
          <div className="section-title" style={{ fontSize: 18 }}>Quiz — Cellebiologi</div>
          <p style={{ fontSize: 12, color: "#94A3B8", marginBottom: 12 }}>Klikk kortet for å snu. {QUIZ.length} spørsmål totalt.</p>
          <div className="quiz-card" onClick={() => setQuizFlipped(!quizFlipped)}>
            <div className={`quiz-inner ${quizFlipped ? "flipped" : ""}`}>
              <div className="quiz-front">
                <div style={{ fontSize: 11, color: "#10B981", fontWeight: 600, marginBottom: 8, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>SPØRSMÅL {quizIdx + 1}/{QUIZ.length}</div>
                <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.6 }}>{QUIZ[quizIdx].q}</div>
                <div style={{ fontSize: 11, color: "#475569", marginTop: 12 }}>Klikk for å se svar →</div>
              </div>
              <div className="quiz-back">
                <div style={{ fontSize: 11, color: "#10B981", fontWeight: 600, marginBottom: 8, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>SVAR</div>
                <div style={{ fontSize: 14, lineHeight: 1.7, color: "#CBD5E1" }}>{QUIZ[quizIdx].a}</div>
              </div>
            </div>
          </div>
          <div className="quiz-nav">
            <button disabled={quizIdx === 0} onClick={(e) => { e.stopPropagation(); setQuizIdx(quizIdx - 1); setQuizFlipped(false); }}>← Forrige</button>
            <span style={{ fontSize: 12, color: "#64748B" }}>{quizIdx + 1} / {QUIZ.length}</span>
            <button disabled={quizIdx === QUIZ.length - 1} onClick={(e) => { e.stopPropagation(); setQuizIdx(quizIdx + 1); setQuizFlipped(false); }}>Neste →</button>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "32px 0 20px", color: "#334155", fontSize: 11 }}>
          MATV1007 · Cellebiologi · Emne 2 · NTNU V2026
        </div>
      </div>
    </div>
  );
}
