import { useState, useEffect, useRef } from "react";

const TABS = [
  { id: 0, label: "Generelle egenskaper" },
  { id: 1, label: "Struktur & symmetri" },
  { id: 2, label: "Genom & Baltimore" },
  { id: 3, label: "Dyrking & telling" },
  { id: 4, label: "Replikasjonssyklus" },
  { id: 5, label: "Lytisk & lysogen" },
  { id: 6, label: "Dyrevirus" },
  { id: 7, label: "Viroider & prioner" },
];

/* ─── Nøkkelbegreper data ─── */
const BEGREPER = {
  0: [
    { term: "Virus", def: "Genetisk element som kun kan formere seg inne i en levende vertscelle" },
    { term: "Virion", def: "En komplett viruspartikkel utenfor vertscellen" },
    { term: "Vertscelle", def: "Den levende cellen som virus infiserer og utnytter for replikasjon" },
    { term: "Obligat intracellulær parasitt", def: "Organisme som kun kan formere seg inne i en levende celle" },
    { term: "Arvestoff", def: "DNA eller RNA som koder for virusets proteiner — aldri begge samtidig" },
  ],
  1: [
    { term: "Kapsid", def: "Proteinkappe som omgir virusets arvestoff, bygget opp av kapsomerer" },
    { term: "Kapsomerer", def: "Proteinunderenhetene som bygger opp kapsidet" },
    { term: "Nukleokapsid", def: "Kapsid + arvestoff sammen" },
    { term: "Hylster (envelope)", def: "Membranlignende lipoproteinstruktur som omgir noen virus, stammer fra vertscellens cytoplasmamembran" },
    { term: "Spikes / glykoproteiner", def: "Proteiner som stikker ut fra hylsteret, brukes til feste på vertscellen" },
    { term: "Ikosaedrisk symmetri", def: "20 likesidede trekantflater, 12 hjørner — effektiv byggeform" },
    { term: "Helikal symmetri", def: "Kapsomerer ordnet i spiral rundt arvestoffet (f.eks. TMV)" },
    { term: "Kompleks symmetri", def: "Ulike deler med ulik form, f.eks. T4-fag med hode + hale" },
  ],
  2: [
    { term: "dsDNA", def: "Dobbelttrådet DNA — de fleste bakteriofager" },
    { term: "ssDNA", def: "Enkelttrådet DNA" },
    { term: "dsRNA", def: "Dobbelttrådet RNA" },
    { term: "ssRNA (+sense)", def: "Enkelttrådet RNA som kan fungere direkte som mRNA" },
    { term: "ssRNA (−sense)", def: "Enkelttrådet RNA som må kopieres til +sense før translasjon" },
    { term: "Baltimore-klassifisering", def: "System med 7 grupper basert på genomtype og replikasjonsstrategi" },
    { term: "Retrovirus", def: "Gruppe VI — ssRNA som oversettes til DNA via revers transkriptase (f.eks. HIV)" },
    { term: "Revers transkriptase", def: "Enzym som lager DNA fra RNA — finnes i retrovirus" },
  ],
  3: [
    { term: "Plakkmetoden", def: "Metode for å påvise og telle lytiske bakteriofager — plakk = bakteriefrie soner" },
    { term: "Plakk", def: "Bakteriefritt område i et teppe av bakteriekolonier, skyldes lyserte celler" },
    { term: "PFU (plaque forming units)", def: "Enhet for virus-titer — antall plakkdannende enheter per mL" },
    { term: "Plating efficiency", def: "Andel virus som faktisk danner plakk — sjelden 100%" },
    { term: "Vevskultur", def: "Dyrking av dyre-/planteceller in vitro for å studere dyrevirus" },
    { term: "CPE (cytopatisk effekt)", def: "Synlige endringer i vertsceller pga. virusinfeksjon" },
    { term: "PCR", def: "Polymerasekjedereaksjon — påvisning av virusarvestoff" },
  ],
  4: [
    { term: "Adsorpsjon", def: "Feste av virus til vertscellens overflate via spesifikke reseptorer" },
    { term: "Penetrasjon / injeksjon", def: "Inntrenging av virus eller virusets arvestoff i vertscellen" },
    { term: "Syntese", def: "Kopiering av arvestoff og produksjon av virusproteiner inne i vertscellen" },
    { term: "Sammensetning (assembly)", def: "Pakking av nye viruspartikler — kapsomerer rundt genomet" },
    { term: "Frigjøring (release)", def: "Nye virion slippes ut via lysis, budding eller utskillelse" },
    { term: "Ett-stegs vekstkurve", def: "Vekstkurve for virusreplikasjon — latensperiode → eclipse → burst" },
    { term: "Eclipse-perioden", def: "Fasen der virus ikke kan detekteres — arvestoff er frigjort men nye partikler ikke ferdig" },
    { term: "Burst size", def: "Antall nye viruspartikler frigjort per infisert celle" },
  ],
  5: [
    { term: "Lytisk syklus", def: "Replikasjonssyklus der vertscellen lyseres og nye virus frigjøres" },
    { term: "Lysogen syklus", def: "Virus-DNA integreres i vertskromosomet (profag) — stabilt forhold" },
    { term: "Profag", def: "Virusets arvestoff innkoblet i bakteriekromosomet" },
    { term: "Temperat virus", def: "Virus som kan velge mellom lytisk og lysogen syklus" },
    { term: "Virulent virus", def: "Virus som kun har lytisk syklus" },
    { term: "Induksjon", def: "Profagen aktiveres og går over til lytisk syklus" },
    { term: "Lysogen celle", def: "Bakteriecelle som har en profag integrert i kromosomet" },
    { term: "Repressor-proteiner", def: "Holder profagen på plass — når de inaktiveres starter lytisk syklus" },
    { term: "Bakteriofag T4", def: "Virulent fag som infiserer E. coli — dsDNA, kompleks struktur" },
    { term: "Bakteriofag lambda (λ)", def: "Temperat fag — eksempel på lysogeni i E. coli" },
  ],
  6: [
    { term: "Endocytose", def: "Opptak av hele virionet i eukaryote celler via membraninnbuktning" },
    { term: "Pinocytose", def: "Endocytose av små partikler" },
    { term: "Budding", def: "Frigjøring av kappekledde virus — virion pakkes i vertscellens membran" },
    { term: "Lytisk infeksjon", def: "Vertscellen ødelegges — vanligste utfall" },
    { term: "Latent infeksjon", def: "Virus-DNA til stede som provirus — kan reaktiveres" },
    { term: "Persistent infeksjon", def: "Sakte frigjøring av virus uten celledød" },
    { term: "Transformasjon", def: "Omdannelse av normale celler til kreftceller" },
    { term: "Antigenskift", def: "Plutselig genetisk endring når to virusstammer infiserer samme celle — nye overflateproteiner" },
  ],
  7: [
    { term: "Viroid", def: "Nakent, sirkulært ssRNA uten kapsid — plantepatogen" },
    { term: "Prion", def: "Infeksiøst agens som mangler arvestoff — feilfoldet protein" },
    { term: "PrPᶜ (cellular)", def: "Normal variant av prionproteinet — finnes naturlig i nerveceller" },
    { term: "PrPˢᶜ (scrapie)", def: "Sykdomsfremkallende feilfoldet variant — kan omdanne PrPᶜ" },
    { term: "TSE", def: "Transmissible spongiform encephalopathies — prionsykdommer" },
    { term: "Creutzfeldt-Jakobs syndrom", def: "Prionsykdom hos mennesker" },
    { term: "Kugalskap (BSE)", def: "Prionsykdom hos storfe" },
    { term: "Skrantesjuke (CWD)", def: "Prionsykdom hos hjortedyr" },
  ],
};

/* ─── SVG Diagrams ─── */
const VirusStructureSVG = () => (
  <svg viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 700 }}>
    {/* Naked virus */}
    <g transform="translate(160,160)">
      <circle r="70" fill="#1E293B" stroke="#EF4444" strokeWidth="2.5" />
      <circle r="55" fill="none" stroke="#EF444480" strokeWidth="1.5" strokeDasharray="6 4" />
      {[...Array(12)].map((_, i) => {
        const a = (i * 30) * Math.PI / 180;
        return <circle key={i} cx={Math.cos(a) * 70} cy={Math.sin(a) * 70} r="7" fill="#EF4444" opacity="0.8" />;
      })}
      <text x="0" y="-85" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans">Nakent virus</text>
      {/* Labels */}
      <line x1="50" y1="-50" x2="110" y2="-90" stroke="#94A3B8" strokeWidth="1" />
      <text x="112" y="-92" fill="#94A3B8" fontSize="10" fontFamily="Source Sans 3">Kapsomerer</text>
      <line x1="0" y1="0" x2="90" y2="30" stroke="#94A3B8" strokeWidth="1" />
      <text x="92" y="28" fill="#94A3B8" fontSize="10" fontFamily="Source Sans 3">Arvestoff</text>
      {/* DNA inside */}
      <path d="M-20,-20 Q0,-35 20,-20 Q0,-5 -20,-20" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      <path d="M-15,0 Q5,15 25,0" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      <path d="M-25,10 Q-5,-5 15,10" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      {/* Brace for nukleokapsid */}
      <path d="M-80,-60 L-80,60" fill="none" stroke="#F59E0B" strokeWidth="1.5" />
      <text x="-95" y="5" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="Source Sans 3" transform="rotate(-90,-95,5)">Nukleokapsid</text>
    </g>
    {/* Enveloped virus */}
    <g transform="translate(500,160)">
      <ellipse rx="100" ry="90" fill="#1E293B" stroke="#10B981" strokeWidth="2" />
      <circle r="60" fill="#0F172A" stroke="#EF4444" strokeWidth="2" />
      {[...Array(10)].map((_, i) => {
        const a = (i * 36) * Math.PI / 180;
        return <circle key={i} cx={Math.cos(a) * 60} cy={Math.sin(a) * 60} r="6" fill="#EF4444" opacity="0.7" />;
      })}
      {/* Spikes */}
      {[...Array(16)].map((_, i) => {
        const a = (i * 22.5) * Math.PI / 180;
        const ix = Math.cos(a) * 90, iy = Math.sin(a) * 80;
        const ox = Math.cos(a) * 108, oy = Math.sin(a) * 96;
        return <g key={i}>
          <line x1={ix} y1={iy} x2={ox} y2={oy} stroke="#34D399" strokeWidth="2" />
          <circle cx={ox} cy={oy} r="4" fill="#34D399" />
        </g>;
      })}
      {/* DNA */}
      <path d="M-15,-15 Q5,-25 15,-10 Q5,5 -15,-15" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      <path d="M-10,5 Q5,15 20,5" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      <text x="0" y="-105" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans">Hylsterkledd virus</text>
      {/* Labels */}
      <line x1="70" y1="-65" x2="130" y2="-100" stroke="#94A3B8" strokeWidth="1" />
      <text x="132" y="-102" fill="#94A3B8" fontSize="10" fontFamily="Source Sans 3">Spikes</text>
      <line x1="85" y1="20" x2="135" y2="40" stroke="#94A3B8" strokeWidth="1" />
      <text x="137" y="38" fill="#94A3B8" fontSize="10" fontFamily="Source Sans 3">Hylster</text>
      <line x1="45" y1="50" x2="130" y2="70" stroke="#94A3B8" strokeWidth="1" />
      <text x="132" y="68" fill="#94A3B8" fontSize="10" fontFamily="Source Sans 3">Kapsid</text>
    </g>
  </svg>
);

const SymmetrySVG = () => (
  <svg viewBox="0 0 750 260" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 750 }}>
    {/* Helikal */}
    <g transform="translate(130,130)">
      <text x="0" y="-110" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans">Helikal</text>
      <text x="0" y="-95" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="Source Sans 3">(f.eks. TMV, Ebola)</text>
      <rect x="-30" y="-75" width="60" height="150" rx="30" fill="none" stroke="#EF4444" strokeWidth="2" />
      {[...Array(8)].map((_, i) => {
        const y = -60 + i * 18;
        return <ellipse key={i} cx={i % 2 === 0 ? -5 : 5} cy={y} rx="25" ry="7" fill="none" stroke="#EF444480" strokeWidth="1.5" />;
      })}
      <path d="M0,-65 Q8,-40 -5,-15 Q8,10 0,35 Q8,55 0,70" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
    </g>
    {/* Ikosaedrisk */}
    <g transform="translate(375,130)">
      <text x="0" y="-110" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans">Ikosaedrisk</text>
      <text x="0" y="-95" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="Source Sans 3">(20 trekantflater, 12 hjørner)</text>
      <polygon points="0,-70 65,-25 40,60 -40,60 -65,-25" fill="#1E293B" stroke="#EF4444" strokeWidth="2" />
      <line x1="0" y1="-70" x2="40" y2="60" stroke="#EF444440" strokeWidth="1" />
      <line x1="0" y1="-70" x2="-40" y2="60" stroke="#EF444440" strokeWidth="1" />
      <line x1="-65" y1="-25" x2="40" y2="60" stroke="#EF444440" strokeWidth="1" />
      <line x1="65" y1="-25" x2="-40" y2="60" stroke="#EF444440" strokeWidth="1" />
      {[[0,-70],[65,-25],[40,60],[-40,60],[-65,-25]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#EF4444" />
      ))}
    </g>
    {/* Kompleks - T4 */}
    <g transform="translate(620,130)">
      <text x="0" y="-110" textAnchor="middle" fill="#F8FAFC" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans">Kompleks</text>
      <text x="0" y="-95" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="Source Sans 3">(f.eks. T4-fag)</text>
      {/* Head */}
      <polygon points="0,-75 30,-50 30,-15 0,10 -30,-15 -30,-50" fill="#1E293B" stroke="#EF4444" strokeWidth="2" />
      {/* Tail */}
      <rect x="-8" y="10" width="16" height="50" fill="#0F172A" stroke="#EF4444" strokeWidth="1.5" />
      {/* Baseplate */}
      <polygon points="-20,60 20,60 15,70 -15,70" fill="#1E293B" stroke="#EF4444" strokeWidth="1.5" />
      {/* Tail fibers */}
      <line x1="-15" y1="65" x2="-40" y2="85" stroke="#EF4444" strokeWidth="1.5" />
      <line x1="15" y1="65" x2="40" y2="85" stroke="#EF4444" strokeWidth="1.5" />
      <line x1="-20" y1="60" x2="-50" y2="80" stroke="#EF4444" strokeWidth="1.5" />
      <line x1="20" y1="60" x2="50" y2="80" stroke="#EF4444" strokeWidth="1.5" />
      {/* DNA in head */}
      <path d="M-10,-50 Q5,-40 -5,-30 Q10,-20 0,-10" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
    </g>
  </svg>
);

const BaltimoreSVG = () => (
  <svg viewBox="0 0 720 370" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 720 }}>
    <text x="360" y="25" textAnchor="middle" fill="#F8FAFC" fontSize="15" fontWeight="700" fontFamily="Plus Jakarta Sans">Baltimore-klassifisering</text>
    {/* Central mRNA */}
    <rect x="280" y="165" width="160" height="36" rx="18" fill="#EF4444" />
    <text x="360" y="188" textAnchor="middle" fill="#FFF" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono">mRNA (+)</text>
    {/* Groups */}
    {[
      { g: "I", label: "dsDNA", x: 80, y: 60, color: "#3B82F6", ex: "T4, Herpes" },
      { g: "II", label: "ssDNA (+)", x: 240, y: 50, color: "#6366F1", ex: "φX174" },
      { g: "III", label: "dsRNA", x: 440, y: 50, color: "#8B5CF6", ex: "Reovirus" },
      { g: "IV", label: "ssRNA (+)", x: 600, y: 60, color: "#10B981", ex: "Poliovirus" },
      { g: "V", label: "ssRNA (−)", x: 600, y: 290, color: "#F59E0B", ex: "Influensa, Ebola" },
      { g: "VI", label: "ssRNA-RT", x: 240, y: 300, color: "#EF4444", ex: "HIV (retrovirus)" },
      { g: "VII", label: "dsDNA-RT", x: 80, y: 290, color: "#EC4899", ex: "Hepatitt B" },
    ].map(({ g, label, x, y, color, ex }) => (
      <g key={g}>
        <rect x={x - 55} y={y - 18} width="110" height="52" rx="8" fill={color + "20"} stroke={color} strokeWidth="1.5" />
        <text x={x} y={y} textAnchor="middle" fill={color} fontSize="11" fontWeight="700" fontFamily="JetBrains Mono">Gr. {g}: {label}</text>
        <text x={x} y={y + 16} textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">{ex}</text>
        <line
          x1={x}
          y1={y < 180 ? y + 34 : y - 18}
          x2={360}
          y2={y < 180 ? 165 : 201}
          stroke={color}
          strokeWidth="1"
          strokeDasharray="4 3"
          opacity="0.5"
        />
        <polygon
          points={y < 180 ? `${360},165 ${355},158 ${365},158` : `${360},201 ${355},208 ${365},208`}
          fill={color}
          opacity="0.5"
        />
      </g>
    ))}
    <text x="360" y="355" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="Source Sans 3" fontStyle="italic">
      Alle grupper konvergerer mot mRNA for proteinsyntese
    </text>
  </svg>
);

const PlaqueSVG = () => (
  <svg viewBox="0 0 420 280" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 420 }}>
    <text x="210" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="14" fontWeight="700" fontFamily="Plus Jakarta Sans">Plakkmetoden</text>
    {/* Petri dish */}
    <ellipse cx="210" cy="160" rx="150" ry="100" fill="#2D3A2D" stroke="#94A3B8" strokeWidth="2" />
    {/* Bacterial lawn */}
    <ellipse cx="210" cy="160" rx="140" ry="90" fill="#4A5E3A" opacity="0.7" />
    {/* Plaques */}
    {[
      [170, 120, 12], [250, 130, 10], [190, 180, 14], [260, 175, 9],
      [150, 160, 11], [230, 200, 13], [280, 150, 8], [200, 140, 10],
    ].map(([cx, cy, r], i) => (
      <circle key={i} cx={cx} cy={cy} r={r} fill="#1E293B" stroke="#94A3B880" strokeWidth="0.5" />
    ))}
    {/* Labels */}
    <line x1="260" y1="175" x2="340" y2="230" stroke="#EF4444" strokeWidth="1" />
    <text x="345" y="232" fill="#EF4444" fontSize="10" fontFamily="Source Sans 3" fontWeight="600">Plakk (PFU)</text>
    <line x1="150" y1="140" x2="80" y2="90" stroke="#94A3B8" strokeWidth="1" />
    <text x="15" y="88" fill="#94A3B8" fontSize="10" fontFamily="Source Sans 3">Bakterie-lawn</text>
  </svg>
);

const ReplicationCycleSVG = () => (
  <svg viewBox="0 0 700 310" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 700 }}>
    <text x="350" y="22" textAnchor="middle" fill="#F8FAFC" fontSize="14" fontWeight="700" fontFamily="Plus Jakarta Sans">Replikasjonssyklusen — 5 trinn</text>
    {/* Steps */}
    {[
      { x: 70, label: "1. Adsorpsjon", sub: "Feste til reseptorer", color: "#3B82F6" },
      { x: 210, label: "2. Penetrasjon", sub: "Injeksjon / opptak", color: "#8B5CF6" },
      { x: 350, label: "3. Syntese", sub: "Arvestoff + proteiner", color: "#EF4444" },
      { x: 490, label: "4. Sammensetning", sub: "Pakking av virion", color: "#F59E0B" },
      { x: 630, label: "5. Frigjøring", sub: "Lysis / budding", color: "#10B981" },
    ].map(({ x, label, sub, color }, i) => (
      <g key={i}>
        <circle cx={x} cy="80" r="32" fill={color + "20"} stroke={color} strokeWidth="2" />
        <text x={x} y="76" textAnchor="middle" fill={color} fontSize="22" fontWeight="700" fontFamily="Plus Jakarta Sans">{i + 1}</text>
        <text x={x} y="130" textAnchor="middle" fill="#F8FAFC" fontSize="11" fontWeight="600" fontFamily="Plus Jakarta Sans">{label.slice(3)}</text>
        <text x={x} y="148" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">{sub}</text>
        {i < 4 && <path d={`M${x + 36},80 L${x + 100},80`} fill="none" stroke="#475569" strokeWidth="1.5" markerEnd="url(#arrow)" />}
      </g>
    ))}
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
      </marker>
    </defs>
    {/* One-step growth curve */}
    <g transform="translate(50, 170)">
      <text x="300" y="5" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="600" fontFamily="Plus Jakarta Sans">Ett-stegs vekstkurve</text>
      <line x1="40" y1="110" x2="600" y2="110" stroke="#334155" strokeWidth="1" />
      <line x1="40" y1="20" x2="40" y2="110" stroke="#334155" strokeWidth="1" />
      <text x="20" y="65" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3" transform="rotate(-90,20,65)">PFU</text>
      <text x="320" y="130" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Tid</text>
      {/* Curve */}
      <polyline points="50,40 100,40 130,100 250,100 280,100 350,100 380,40 500,40 560,40" fill="none" stroke="#EF4444" strokeWidth="2.5" />
      {/* Labels */}
      <text x="75" y="35" textAnchor="middle" fill="#3B82F6" fontSize="8" fontFamily="Source Sans 3">Initielt</text>
      <rect x="130" y="85" width="130" height="15" rx="3" fill="#EF444415" />
      <text x="195" y="96" textAnchor="middle" fill="#EF4444" fontSize="9" fontFamily="Source Sans 3" fontWeight="600">Latensperiode</text>
      <rect x="250" y="85" width="80" height="15" rx="3" fill="#F59E0B15" />
      <text x="290" y="96" textAnchor="middle" fill="#F59E0B" fontSize="9" fontFamily="Source Sans 3" fontWeight="600">Eclipse</text>
      <rect x="350" y="25" width="80" height="15" rx="3" fill="#10B98115" />
      <text x="390" y="36" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="Source Sans 3" fontWeight="600">Burst</text>
    </g>
  </svg>
);

const LyticLysogenicSVG = () => (
  <svg viewBox="0 0 720 450" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 720 }}>
    <defs>
      <marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8" />
      </marker>
    </defs>
    <text x="360" y="22" textAnchor="middle" fill="#F8FAFC" fontSize="15" fontWeight="700" fontFamily="Plus Jakarta Sans">Lytisk vs. Lysogen syklus</text>
    
    {/* Bacterium */}
    <ellipse cx="160" cy="130" rx="60" ry="40" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />
    <text x="160" y="135" textAnchor="middle" fill="#3B82F6" fontSize="10" fontFamily="Source Sans 3" fontWeight="600">Bakterie</text>
    {/* chromosome */}
    <ellipse cx="160" cy="125" rx="25" ry="12" fill="none" stroke="#60A5FA" strokeWidth="1" strokeDasharray="3 2" />
    
    {/* Phage approaching */}
    <g transform="translate(160,40)">
      <polygon points="0,-20 12,-8 12,5 -12,5 -12,-8" fill="#1E293B" stroke="#EF4444" strokeWidth="1.5" />
      <line x1="0" y1="5" x2="0" y2="20" stroke="#EF4444" strokeWidth="1.5" />
      <text x="30" y="-5" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Fag</text>
    </g>
    <path d="M160,60 L160,88" stroke="#94A3B8" strokeWidth="1" markerEnd="url(#arr2)" />
    <text x="175" y="78" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3">Adsorpsjon</text>

    {/* Decision point */}
    <circle cx="160" cy="200" r="18" fill="#F59E0B20" stroke="#F59E0B" strokeWidth="1.5" />
    <text x="160" y="204" textAnchor="middle" fill="#F59E0B" fontSize="9" fontWeight="700" fontFamily="Plus Jakarta Sans">VALG</text>
    <path d="M160,170 L160,182" stroke="#94A3B8" strokeWidth="1" markerEnd="url(#arr2)" />

    {/* LYTIC PATH — right */}
    <path d="M178,200 L310,200" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arr2)" />
    <text x="250" y="193" textAnchor="middle" fill="#EF4444" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans">LYTISK</text>
    
    {/* Lytic steps */}
    <g transform="translate(360, 140)">
      <ellipse cx="0" cy="0" rx="50" ry="30" fill="#1E293B" stroke="#EF4444" strokeWidth="1.5" />
      <text x="0" y="-5" textAnchor="middle" fill="#EF4444" fontSize="8" fontFamily="Source Sans 3">Replikasjon av</text>
      <text x="0" y="8" textAnchor="middle" fill="#EF4444" fontSize="8" fontFamily="Source Sans 3">virus-DNA</text>
    </g>
    <path d="M360,170 L360,200" stroke="#EF4444" strokeWidth="1" markerEnd="url(#arr2)" />
    <g transform="translate(360, 230)">
      <ellipse cx="0" cy="0" rx="50" ry="30" fill="#1E293B" stroke="#EF4444" strokeWidth="1.5" />
      <text x="0" y="-5" textAnchor="middle" fill="#EF4444" fontSize="8" fontFamily="Source Sans 3">Sammensetning</text>
      <text x="0" y="8" textAnchor="middle" fill="#EF4444" fontSize="8" fontFamily="Source Sans 3">av nye virion</text>
    </g>
    <path d="M360,260 L360,290" stroke="#EF4444" strokeWidth="1" markerEnd="url(#arr2)" />
    <g transform="translate(360, 320)">
      <ellipse cx="0" cy="0" rx="55" ry="30" fill="#EF444420" stroke="#EF4444" strokeWidth="2" />
      <text x="0" y="-5" textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="700" fontFamily="Plus Jakarta Sans">LYSIS</text>
      <text x="0" y="10" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3">Celle sprekker</text>
    </g>
    {/* Released phages */}
    {[[-30, 370], [0, 380], [30, 370], [60, 375], [-60, 375]].map(([dx, dy], i) => (
      <g key={i} transform={`translate(${360 + dx},${dy})`}>
        <polygon points="0,-8 5,-3 5,2 -5,2 -5,-3" fill="#EF4444" opacity="0.6" />
        <line x1="0" y1="2" x2="0" y2="8" stroke="#EF4444" strokeWidth="1" opacity="0.6" />
      </g>
    ))}
    <text x="360" y="420" textAnchor="middle" fill="#EF4444" fontSize="9" fontFamily="Source Sans 3">~100+ nye virus frigjøres</text>

    {/* LYSOGENIC PATH — left/down */}
    <path d="M142,200 L30,260" stroke="#10B981" strokeWidth="2" markerEnd="url(#arr2)" />
    <text x="65" y="225" textAnchor="middle" fill="#10B981" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans">LYSOGEN</text>

    <g transform="translate(80, 300)">
      <ellipse cx="0" cy="0" rx="65" ry="35" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
      {/* Chromosome with integrated phage */}
      <ellipse cx="0" cy="-5" rx="30" ry="14" fill="none" stroke="#60A5FA" strokeWidth="1.5" />
      <rect x="-8" y="-19" width="16" height="6" rx="2" fill="#EF4444" opacity="0.8" />
      <text x="0" y="-21" textAnchor="middle" fill="#FFF" fontSize="5" fontFamily="JetBrains Mono">profag</text>
      <text x="0" y="22" textAnchor="middle" fill="#10B981" fontSize="8" fontFamily="Source Sans 3" fontWeight="600">Lysogen celle</text>
    </g>
    
    {/* Cell division */}
    <path d="M80,335 L80,370" stroke="#10B981" strokeWidth="1" markerEnd="url(#arr2)" />
    <g transform="translate(80, 400)">
      <ellipse cx="-30" cy="0" rx="25" ry="15" fill="#1E293B" stroke="#10B98180" strokeWidth="1" />
      <ellipse cx="30" cy="0" rx="25" ry="15" fill="#1E293B" stroke="#10B98180" strokeWidth="1" />
      <rect x="-36" y="-6" width="10" height="4" rx="1" fill="#EF4444" opacity="0.5" />
      <rect x="24" y="-6" width="10" height="4" rx="1" fill="#EF4444" opacity="0.5" />
      <text x="0" y="28" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3">Profag replikeres med verten</text>
    </g>

    {/* Induction arrow */}
    <path d="M145,300 Q200,300 280,320" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#arr2)" />
    <text x="210" y="295" textAnchor="middle" fill="#F59E0B" fontSize="9" fontWeight="600" fontFamily="Source Sans 3">Induksjon</text>
    <text x="210" y="308" textAnchor="middle" fill="#94A3B880" fontSize="7" fontFamily="Source Sans 3">(UV, stress)</text>
  </svg>
);

const AnimalVirusSVG = () => (
  <svg viewBox="0 0 680 300" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 680 }}>
    <text x="340" y="20" textAnchor="middle" fill="#F8FAFC" fontSize="14" fontWeight="700" fontFamily="Plus Jakarta Sans">Bakteriofag vs. dyrevirus — forskjeller i opptak</text>
    <defs>
      <marker id="arr3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#94A3B8" />
      </marker>
    </defs>
    {/* Bacteriophage side */}
    <g transform="translate(170, 160)">
      <text x="0" y="-110" textAnchor="middle" fill="#3B82F6" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">Bakteriofag</text>
      <rect x="-80" y="-90" width="160" height="180" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      {/* Bacterium */}
      <ellipse cx="0" cy="20" rx="55" ry="30" fill="#0F172A" stroke="#3B82F6" strokeWidth="1.5" />
      <text x="0" y="25" textAnchor="middle" fill="#3B82F6" fontSize="9" fontFamily="Source Sans 3">Bakterie</text>
      {/* Phage on surface */}
      <g transform="translate(15,-20)">
        <polygon points="0,-15 8,-8 8,0 -8,0 -8,-8" fill="#EF4444" opacity="0.7" />
        <line x1="0" y1="0" x2="0" y2="10" stroke="#EF4444" strokeWidth="1.5" />
      </g>
      {/* DNA injection arrow */}
      <path d="M20,-5 L20,15" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="0" y="70" textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="600" fontFamily="Source Sans 3">Kun arvestoff injiseres</text>
      <text x="0" y="82" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3">Kapsid forblir utenfor</text>
    </g>
    {/* Arrow between */}
    <text x="340" y="165" textAnchor="middle" fill="#94A3B8" fontSize="18" fontFamily="Plus Jakarta Sans">≠</text>
    {/* Animal virus side */}
    <g transform="translate(510, 160)">
      <text x="0" y="-110" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">Dyrevirus</text>
      <rect x="-80" y="-90" width="160" height="180" rx="8" fill="#1E293B" stroke="#334155" strokeWidth="1" />
      {/* Cell */}
      <ellipse cx="0" cy="20" rx="55" ry="35" fill="#0F172A" stroke="#10B981" strokeWidth="1.5" />
      <text x="0" y="10" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="Source Sans 3">Dyrecelle</text>
      {/* Virus inside */}
      <circle cx="15" cy="30" r="8" fill="#EF444440" stroke="#EF4444" strokeWidth="1" />
      {/* Endocytosis arrow */}
      <path d="M30,-30 Q50,-10 30,15" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
      <text x="55" y="-10" fill="#F59E0B" fontSize="8" fontFamily="Source Sans 3">Endocytose</text>
      <text x="0" y="70" textAnchor="middle" fill="#10B981" fontSize="9" fontWeight="600" fontFamily="Source Sans 3">Hele virionet tas opp</text>
      <text x="0" y="82" textAnchor="middle" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3">Avkledning inne i cellen</text>
    </g>
  </svg>
);

const PrionSVG = () => (
  <svg viewBox="0 0 600 240" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", maxWidth: 600 }}>
    <text x="300" y="22" textAnchor="middle" fill="#F8FAFC" fontSize="14" fontWeight="700" fontFamily="Plus Jakarta Sans">Prion — PrPᶜ → PrPˢᶜ omdanning</text>
    {/* Normal protein */}
    <g transform="translate(120,130)">
      <text x="0" y="-70" textAnchor="middle" fill="#10B981" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">PrPᶜ (normal)</text>
      {/* Alpha helix representation */}
      <path d="M-20,-45 Q-30,-30 -20,-15 Q-10,0 -20,15 Q-30,30 -20,45" fill="none" stroke="#10B981" strokeWidth="3" />
      <path d="M0,-45 Q10,-30 0,-15 Q-10,0 0,15 Q10,30 0,45" fill="none" stroke="#10B981" strokeWidth="3" />
      <path d="M20,-40 Q30,-25 20,-10 Q10,5 20,20" fill="none" stroke="#10B981" strokeWidth="3" />
      <text x="0" y="65" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Mye α-heliks</text>
      <text x="0" y="78" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Løselig, normal funksjon</text>
    </g>
    {/* Arrow */}
    <g transform="translate(260,130)">
      <path d="M0,0 L60,0" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arr4)" />
      <text x="30" y="-12" textAnchor="middle" fill="#F59E0B" fontSize="9" fontWeight="600" fontFamily="Source Sans 3">Feilfolding</text>
    </g>
    <defs>
      <marker id="arr4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#F59E0B" />
      </marker>
    </defs>
    {/* Misfolded protein */}
    <g transform="translate(420,130)">
      <text x="0" y="-70" textAnchor="middle" fill="#EF4444" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">PrPˢᶜ (scrapie)</text>
      {/* Beta sheet representation */}
      <path d="M-25,-40 L-25,30" stroke="#EF4444" strokeWidth="3" />
      <path d="M-10,-40 L-10,30" stroke="#EF4444" strokeWidth="3" />
      <path d="M5,-40 L5,30" stroke="#EF4444" strokeWidth="3" />
      <path d="M20,-40 L20,30" stroke="#EF4444" strokeWidth="3" />
      {/* Arrows between sheets */}
      <path d="M-25,-35 L-10,-35" stroke="#EF444480" strokeWidth="1" />
      <path d="M-10,-25 L5,-25" stroke="#EF444480" strokeWidth="1" />
      <path d="M5,-15 L20,-15" stroke="#EF444480" strokeWidth="1" />
      <text x="0" y="50" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Mye β-flak</text>
      <text x="0" y="63" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Uløselig, klumper seg</text>
    </g>
    {/* Cascade arrow */}
    <g transform="translate(420,130)">
      <path d="M50,10 Q80,0 70,30 Q65,50 90,50" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="105" y="55" fill="#EF4444" fontSize="8" fontFamily="Source Sans 3">Kan omdanne</text>
      <text x="105" y="66" fill="#EF4444" fontSize="8" fontFamily="Source Sans 3">flere PrPᶜ</text>
    </g>
  </svg>
);

/* ─── Tab Content Components ─── */
const TabContent = ({ tabId }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [clickedTerms, setClickedTerms] = useState({});

  const toggleTerm = (idx) => {
    setClickedTerms(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const content = {
    0: {
      title: "Generelle egenskaper",
      forklaring: (
        <>
          <p>Et <Term>virus</Term> er et genetisk element som kun kan formere seg inne i en levende celle — <Term>vertscellen</Term>. Virus er <Term>obligat intracellulære parasitter</Term>: de mangler egen metabolisme og er helt avhengig av vertscellens metabolske apparat for replikasjon.</p>
          <p>Virus har eget <Term>arvestoff</Term> som er enten <Term>DNA</Term> eller <Term>RNA</Term> — aldri begge samtidig. Arvestoffet koder for strukturelle proteiner og for evnen til å multiplisere seg. Noen virus har i tillegg spesifikke <Term>enzymer</Term> som er viktige for infeksjon, som <Term>revers transkriptase</Term> hos retrovirus eller <Term>lysozym</Term> hos bakteriofager.</p>
          <p>Virus er svært små: typisk <Term>20–300 nm</Term>, altfor små til å sees i vanlig lysmikroskop. De kan kun observeres med elektronmikroskop.</p>
          <p>Hvorfor er virus ikke ansett som levende? De oppfyller ikke kriteriene for liv: de mangler egen energiproduksjon, har ikke ribosomer, kan ikke dele seg ved binær fisjon, og er avhengige av vertscellen for alle metabolske prosesser. Arvestoffet kan dessuten være RNA, noe som aldri er tilfellet som informasjonsbærende molekyl i levende celler (som alltid bruker dsDNA).</p>
        </>
      ),
      svg: null,
      eksempel: {
        q: "Eksamensspørsmål (V2025): Hvorfor er ikke virus ansett som levende organismer?",
        steps: [
          "Virus mangler egen metabolisme — kan ikke produsere energi (ATP).",
          "Har ikke ribosomer og kan ikke utføre proteinsyntese på egen hånd.",
          "Er helt avhengig av vertscellens metabolske apparat for replikasjon.",
          "Kan ha RNA som arvestoff (levende celler bruker alltid dsDNA).",
          "Kan ikke formere seg utenfor en levende celle — obligat intracellulære parasitter.",
        ],
      },
      huskeregel: "Virus = «Verdensrekord i latskap» — har arvestoff og proteinkappe, men gjør INGENTING uten vertscellen. Ingen metabolisme, ingen energi, ingen ribosomer.",
      eksamensrelevans: "Direkte spurt V2023 (fire egenskaper der virus skiller seg fra bakterier) og V2025 (hvorfor ikke levende + hvorfor noen har enzymer). Svært sentral.",
    },
    1: {
      title: "Virusstruktur og symmetri",
      forklaring: (
        <>
          <p>Virusets grunnstruktur består av et <Term>kapsid</Term> (proteinkappe) bygget opp av <Term>kapsomerer</Term> (proteinunderenheter). Kapsid + arvestoff kalles <Term>nukleokapsid</Term>.</p>
          <p>Noen virus har i tillegg et <Term>hylster</Term> (envelope) — en membranlignende lipoproteinstruktur som stammer fra vertscellens cytoplasmamembran. Hylsterkledde virus bruker <Term>spikes</Term> (glykoproteiner) på overflaten for å feste seg til vertscellen. Et eksempel er SARS-CoV-2 med sine <Term>piggproteiner</Term> og det <Term>reseptorbindende domenet (RBD)</Term>.</p>
          <p>Planter og bakterier har cellevegg → få hylsterkledde virus infiserer disse.</p>
          <h4 style={{ color: "var(--accent)", marginTop: 16 }}>Symmetri</h4>
          <p><Term>Helikal symmetri</Term>: Kapsomerer ordnet i spiral rundt arvestoffet. Eksempler: <Term>tobakksmosaikkvirus (TMV)</Term> med 2130 kapsomerer rundt ssRNA, og <Term>Ebolavirus</Term> (helikal med hylster, ssRNA(−), 70–90% dødelighet).</p>
          <p><Term>Ikosaedrisk symmetri</Term>: 20 likesidede trekantflater, 12 hjørner. Effektiv byggeform. Minimum 60 kapsomerer, vanligst 180, 240 eller 360.</p>
          <p><Term>Kompleks symmetri</Term>: Ulike deler med ulik form. Eksempel: <Term>T4-fag</Term> med ikosaedrisk «hode» og sylinderformet «hale» med halefibre.</p>
        </>
      ),
      svg: <><VirusStructureSVG /><div style={{ height: 24 }} /><SymmetrySVG /></>,
      eksempel: {
        q: "Eksamensoppgave: Nevn to måter vi kan klassifisere virus på, med eksempler.",
        steps: [
          "1. Etter ytre form/symmetri: helikal (TMV), ikosaedrisk (adenovirus), kompleks (T4-fag). Kan også skille nakne vs. kappekledde.",
          "2. Etter arvestoff: dsDNA (T4-fag, herpes), ssDNA (φX174), dsRNA (reovirus), ssRNA+ (poliovirus), ssRNA− (influensa, Ebola).",
          "Andre alternativer: Baltimore-klassifisering (7 grupper), vertsspesifisitet (bakterievirus, dyrevirus, plantevirus).",
        ],
      },
      huskeregel: "Uten hylster = «nakent» virus. Med hylster = «kappekledd». Hylsteret = stjålet cellemembran fra verten!",
      eksamensrelevans: "Klassifisering av virus spurt på V2024 (to måter + eksempler). Strukturell forståelse er grunnlag for å forstå replikasjon.",
    },
    2: {
      title: "Virusgenom og Baltimore-klassifisering",
      forklaring: (
        <>
          <p>Virus har enten <Term>DNA</Term> eller <Term>RNA</Term> som arvestoff — aldri begge. Det kan være <Term>enkelttrådet</Term> eller <Term>dobbelttrådet</Term>, <Term>lineært</Term> eller <Term>sirkulært</Term>, og i noen tilfeller <Term>segmentert</Term> (delt på flere molekyler, f.eks. influensavirus).</p>
          <p><Term>Baltimore-klassifiseringen</Term> deler virus i 7 grupper basert på genomtype og replikasjonsstrategi. Alle grupper må til slutt produsere <Term>mRNA (+sense)</Term> for å kunne oversettes til proteiner:</p>
          <div style={{ overflowX: "auto", marginTop: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13, fontFamily: "Source Sans 3" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #334155" }}>
                  <th style={{ padding: "8px 10px", textAlign: "left", color: "#EF4444" }}>Gruppe</th>
                  <th style={{ padding: "8px 10px", textAlign: "left", color: "#F8FAFC" }}>Genom</th>
                  <th style={{ padding: "8px 10px", textAlign: "left", color: "#F8FAFC" }}>Strategi</th>
                  <th style={{ padding: "8px 10px", textAlign: "left", color: "#94A3B8" }}>Eksempel</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["I", "dsDNA", "DNA → mRNA direkte", "T4, Herpes, Kopper"],
                  ["II", "ssDNA (+)", "ssDNA → dsDNA → mRNA", "φX174, Parvovirus"],
                  ["III", "dsRNA", "dsRNA → mRNA", "Reovirus, Rotavirus"],
                  ["IV", "ssRNA (+)", "RNA fungerer direkte som mRNA", "Poliovirus, SARS-CoV"],
                  ["V", "ssRNA (−)", "RNA → mRNA (trenger RNA-pol.)", "Influensa, Ebola, Rabies"],
                  ["VI", "ssRNA-RT", "RNA → DNA → mRNA (revers tr.)", "HIV (retrovirus)"],
                  ["VII", "dsDNA-RT", "dsDNA → RNA → DNA → mRNA", "Hepatitt B"],
                ].map(([g, gen, strat, ex], i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1E293B" }}>
                    <td style={{ padding: "6px 10px", color: "#EF4444", fontWeight: 700, fontFamily: "JetBrains Mono" }}>{g}</td>
                    <td style={{ padding: "6px 10px", color: "#F8FAFC", fontFamily: "JetBrains Mono", fontSize: 12 }}>{gen}</td>
                    <td style={{ padding: "6px 10px", color: "#94A3B8" }}>{strat}</td>
                    <td style={{ padding: "6px 10px", color: "#94A3B8", fontStyle: "italic" }}>{ex}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 12 }}>Spesielt viktig: <Term>Retrovirus (Gruppe VI)</Term> som HIV bruker enzymet <Term>revers transkriptase</Term> til å oversette ssRNA → DNA, som deretter integreres i vertscellens kromosom. Viruset har selv med dette enzymet i virionet.</p>
        </>
      ),
      svg: <BaltimoreSVG />,
      eksempel: {
        q: "Hvorfor inneholder noen virus spesifikke enzymer? (V2025, 4p)",
        steps: [
          "Selv om virus mangler egen metabolisme, har noen enzymer som er essensielle for å starte infeksjonssyklusen.",
          "Retrovirus (HIV) har revers transkriptase — uten dette enzymet kan viruset ikke konvertere sitt ssRNA til DNA.",
          "Bakteriofager har lysozym-lignende enzym for å lage hull i peptidoglykan-laget for å injisere arvestoff.",
          "Viruset har gener som koder for disse enzymene, slik at flere kopier kan produseres i vertscellen.",
          "Mange virus inneholder IKKE enzymer — de bruker vertscellens enzymer direkte.",
        ],
      },
      huskeregel: "Baltimore: Alt handler om veien til mRNA. Alle 7 gruppers endestasjon er mRNA (+sense) → proteiner.",
      eksamensrelevans: "Baltimore-klassifisering er en av de viktigste klassifiseringsmetodene. V2024: «to måter å klassifisere virus», V2025: «hvorfor noen har enzymer».",
    },
    3: {
      title: "Dyrking og telling av virus",
      forklaring: (
        <>
          <p>Virus kan ikke dyrkes på vanlige kulturmedier — de trenger levende celler. Døde celler kan ikke replikere virus.</p>
          <h4 style={{ color: "var(--accent)", marginTop: 12 }}>Plakkmetoden (bakteriofager)</h4>
          <p>Bakteriofager påvises med <Term>plakkmetoden</Term>. Et <Term>plakk</Term> er et bakteriefritt område i et ellers tett teppe av bakteriekolonier, forårsaket av lyserte celler fra virusinfeksjon. Ved å telle plakk kan man bestemme <Term>virus-titer</Term> i enheten <Term>PFU/mL</Term> (plaque forming units per mL).</p>
          <p>NB: <Term>Plating efficiency</Term> er sjelden 100% — ikke alle viruspartikler danner plakk.</p>
          <h4 style={{ color: "var(--accent)", marginTop: 12 }}>Dyre- og plantevirus</h4>
          <p>Dyre- og plantevirus må dyrkes i <Term>vevskulturer</Term> (cellekulturer). Man kan observere <Term>cytopatisk effekt (CPE)</Term> — synlige endringer i cellene som følge av virusinfeksjon. Moderne metoder inkluderer <Term>PCR</Term> for påvisning av virusarvestoff.</p>
        </>
      ),
      svg: <PlaqueSVG />,
      eksempel: {
        q: "Du observerer 35 plakk på en plate der du tilsatte 0,1 mL av en 10⁻⁶-fortynning. Hva er virus-titer?",
        steps: [
          "Virus-titer = antall plakk / (volum × fortynning)",
          "= 35 / (0,1 mL × 10⁻⁶)",
          "= 35 / 10⁻⁷",
          "= 3,5 × 10⁸ PFU/mL",
          "Husk: dette er et minimumsestimat fordi plating efficiency < 100%.",
        ],
      },
      huskeregel: "Plakk = hull i bakteriematta = lyserte celler. Teller plakk, ikke virus direkte!",
      eksamensrelevans: "Plakkmetoden er en sentral laboratoriemetode. Kan komme som beregningsoppgave eller teori. Sammenhengen med virus-titer og PFU er viktig.",
    },
    4: {
      title: "Replikasjonssyklus",
      forklaring: (
        <>
          <p>Replikasjonssyklusen til et virus i en mottakelig (<Term>permissive</Term>) vertscelle foregår i fem trinn:</p>
          <ol style={{ paddingLeft: 20, lineHeight: 1.8 }}>
            <li><Term>Adsorpsjon</Term> — Feste til vertscellens overflate via spesifikke reseptorer</li>
            <li><Term>Penetrasjon</Term> (inntrenging/injeksjon) — Virusets arvestoff (prokaryote) eller hele virionet (eukaryote) kommer inn i cellen</li>
            <li><Term>Syntese</Term> — Replikasjon av arvestoff + produksjon av virusproteiner (tidlige, mellom- og sene proteiner)</li>
            <li><Term>Sammensetning</Term> (assembly) — Kapsomerer settes sammen og virus-genom pakkes inn</li>
            <li><Term>Frigjøring</Term> — Nye virion slippes ut via <Term>lysis</Term> (nakne virus), <Term>budding</Term> (kappekledde virus) eller utskillelse</li>
          </ol>
          <h4 style={{ color: "var(--accent)", marginTop: 12 }}>Ett-stegs vekstkurve</h4>
          <p>Virusreplikasjon gir en <Term>ett-stegs vekstkurve</Term> med distinkte faser: <Term>latensperiode</Term> (ingen nye virus detekteres), <Term>eclipse-perioden</Term> (arvestoff frigjort men nye partikler ikke ferdig montert), og <Term>burst</Term> (plutselig frigjøring av nye viruspartikler). <Term>Burst size</Term> er antall nye virus per celle — for T4 fag: over 100 stk. per syklus (~25 min).</p>
        </>
      ),
      svg: <ReplicationCycleSVG />,
      eksempel: {
        q: "Forklar de fem trinnene i en virusreplikasjonssyklus med fokus på T4-fagen.",
        steps: [
          "1. Adsorpsjon: T4 fester seg via halefibre til polysakkarider i LPS-laget på E. coli.",
          "2. Penetrasjon: Kapsid legges igjen utenfor. T4 lysozym lager hull i peptidoglykan, DNA injiseres.",
          "3. Syntese: Tidlige proteiner → mellom-proteiner → sene proteiner. Virus-DNA kopieres.",
          "4. Sammensetning: DNA pakkes inn i fagens «hode» (energikrevende prosess).",
          "5. Frigjøring: Lytisk frigjøring → over 100 nye viruspartikler frigjøres (~25 min).",
        ],
      },
      huskeregel: "5 trinn = ASPAM-F: Adsorpsjon → penetraSjon → syntese → sAmmensetning → Frigjøring",
      eksamensrelevans: "Replikasjonssyklusen er grunnlaget for å forstå lytisk/lysogen syklus. Ett-stegs vekstkurven kan komme som diagram-tolkningsoppgave.",
    },
    5: {
      title: "Bakteriofager: Lytisk og lysogen syklus",
      forklaring: (
        <>
          <p>Dette er det mest eksamensrelevante temaet innen virusbiologi. Bakteriofager kan ha to ulike livssykluser:</p>
          <h4 style={{ color: "var(--accent)", marginTop: 12 }}>Lytisk syklus</h4>
          <p>En <Term>virulent</Term> fag (f.eks. <Term>T4</Term>) følger kun den lytiske syklusen. Fagen fester seg, injiserer arvestoffet, tar over vertscellens replikasjonsmaskineri, produserer nye viruspartikler, og vertscellen <Term>lyseres</Term> (sprekker). Over 100 nye viruspartikler frigjøres per syklus.</p>
          <h4 style={{ color: "var(--accent)", marginTop: 12 }}>Lysogen syklus</h4>
          <p>En <Term>temperat</Term> fag (f.eks. <Term>bakteriofag lambda</Term>, <Term>P1</Term>) kan velge mellom lytisk og lysogen syklus. I <Term>lysogeni</Term> integreres virusets dsDNA i bakteriekromosomet og kalles da en <Term>profag</Term>. Cellen er nå <Term>lysogen</Term> for dette viruset.</p>
          <p>Profagen replikeres sammen med vertscellen ved normal celledeling. <Term>Repressor-proteiner</Term> holder de lytiske genene undertrykt. Ved <Term>induksjon</Term> (f.eks. UV-stråling, stress) inaktiveres repressorene → profagen kobles ut → lytisk syklus starter.</p>
          <h4 style={{ color: "var(--accent)", marginTop: 12 }}>Fordeler med lysogeni</h4>
          <p><strong>For viruset:</strong> Arvestoffet bevares over mange bakteriegenerasjoner. Kan indusere lytisk syklus ved behov.</p>
          <p><strong>For vertscellen:</strong> Immunitet mot infeksjon av samme fag-type. Kan få nye, fordelaktige egenskaper fra profagen (f.eks. gener for resistens eller virulens).</p>
        </>
      ),
      svg: <LyticLysogenicSVG />,
      eksempel: {
        q: "Beskriv forskjellen på en lytisk og en lysogen syklus hos bakteriofager. (V2023, 6p)",
        steps: [
          "Lytisk: Fagen fester seg → injiserer arvestoff → tar over replikasjonsmaskineriet → kopierer eget arvestoff og syntetiserer proteiner → pakker nye viruspartikler → cellen lyseres og frigjør ~100+ nye virus.",
          "Lysogen: I stedet for replikasjon kobles virus-DNA (dsDNA) inn i bakteriekromosomet = profag. Stabilt forhold med vertscellen.",
          "Profagen replikeres sammen med bakterien ved celledeling. Lytiske gener holdes undertrykt av repressor-proteiner.",
          "Ved induksjon (UV, stress) kobles profagen ut → lytisk syklus starter → lysis.",
          "Fordel virus: Arvestoff bevares over generasjoner. Fordel vert: Immunitet mot samme fagtype + mulige nye gener (virulens, resistens).",
        ],
      },
      huskeregel: "Lytisk = Lyse cellen (drep og slipp). Lysogen = Ligge lavt i kromosomet (profag). Temperat fag = har TEMPERAMENT (kan velge!).",
      eksamensrelevans: "Spurt på ALLE tre eksamenene: V2023 (forskjell lytisk/lysogen), V2024 (lysogeni + fordeler), V2025 (flervalg: lytisk/profag/kappekledde). PRIORITER DETTE.",
    },
    6: {
      title: "Dyrevirus og infeksjon av eukaryote celler",
      forklaring: (
        <>
          <h4 style={{ color: "var(--accent)" }}>Forskjeller fra bakteriofager</h4>
          <p>Hovedforskjellen ligger i den innledende fasen av infeksjonen:</p>
          <p><strong>Prokaryote celler:</strong> Kun virusets arvestoff injiseres — kapsidet forblir utenfor.</p>
          <p><strong>Eukaryote (dyre/plante) celler:</strong> Hele <Term>virionet</Term> tas opp via <Term>endocytose</Term> (eller fusjon med membranen for kappekledde virus). <Term>Pinocytose</Term> = endocytose av små partikler. Deretter skjer <Term>avkledning</Term> (uncoating) inne i cellen.</p>
          <h4 style={{ color: "var(--accent)", marginTop: 12 }}>Frigjøring</h4>
          <p><strong>Nakne virus:</strong> Frigjøring via <Term>lysis</Term> — cellen sprekker.</p>
          <p><strong>Kappekledde virus:</strong> Frigjøring via <Term>budding</Term> — virion pakkes i vertscellens membran (som blir hylsteret). Eksempler: Ebola, influensa.</p>
          <h4 style={{ color: "var(--accent)", marginTop: 12 }}>Effekter av virusinfeksjon i humane celler</h4>
          <p>Fire mulige utfall:</p>
          <ol style={{ paddingLeft: 20, lineHeight: 1.8 }}>
            <li><Term>Lytisk infeksjon</Term> — vertscellen ødelegges (vanligste utfall)</li>
            <li><Term>Latent infeksjon</Term> — virus-DNA til stede som <Term>provirus</Term>, kan reaktiveres</li>
            <li><Term>Persistent (vedvarende) infeksjon</Term> — sakte frigjøring av virus uten celledød</li>
            <li><Term>Transformasjon</Term> — omdannelse av normale celler til kreftceller</li>
          </ol>
          <h4 style={{ color: "var(--accent)", marginTop: 12 }}>Antigenskift</h4>
          <p><Term>Antigenskift</Term> skjer når to ulike virusstammer infiserer samme celle samtidig → nytt virus med kombinasjon av gener fra begge → nytt sett overflateproteiner. Skjer stort sett kun hos <Term>influensa A</Term>. Forklarer hvordan virus kan krysse artsgrenser.</p>
        </>
      ),
      svg: <AnimalVirusSVG />,
      eksempel: {
        q: "Flervalg (V2025): Hva er forskjellen i den innledende fasen av en virusinfeksjon i en dyrecelle og en E. coli-celle?",
        steps: [
          "Riktig svar: I E. coli (prokaryot) injiseres kun arvestoffet — kapsidet forblir utenfor.",
          "I dyreceller (eukaryot) tas hele virionet opp, typisk via endocytose.",
          "Dette er en fundamental forskjell som skyldes cellens oppbygning (cellevegg vs. membran).",
          "Etter opptak i dyrecellen skjer avkledning (uncoating) for å frigjøre arvestoffet.",
        ],
      },
      huskeregel: "Bakteriofag = «postbud» (leverer kun brevet/DNA). Dyrevirus = «innbruddstyv» (hele viruset kommer inn via endocytose).",
      eksamensrelevans: "V2025 flervalg: forskjell bakteriofag vs dyrecelle. V2024: effekter av virusinfeksjon i humane celler (4 utfall). V2025: kappekledde virus — vertsceller.",
    },
    7: {
      title: "Viroider og prioner",
      forklaring: (
        <>
          <h4 style={{ color: "var(--accent)" }}>Viroider</h4>
          <p><Term>Viroider</Term> er nakent, sirkulært <Term>ssRNA</Term> uten kapsid — den enkleste formen for infeksiøst agens. De infiserer kun planter og forstyrrer genreguleringen i vertscellen. Viroider er mye mindre enn virus og koder ikke for noen proteiner.</p>
          <h4 style={{ color: "var(--accent)", marginTop: 16 }}>Prioner</h4>
          <p><Term>Prioner</Term> er infeksiøse agens som mangler arvestoff helt. De består av feilfoldede proteiner som ligner på naturlige proteiner i nerveceller.</p>
          <p><Term>PrPᶜ</Term> (cellular) er den normale varianten av prionproteinet — finnes naturlig i nerveceller med mye α-heliks-struktur.</p>
          <p><Term>PrPˢᶜ</Term> (scrapie) er den sykdomsfremkallende varianten med mye β-flak-struktur. Den er uløselig og klumper seg sammen. Kritisk: PrPˢᶜ kan omdanne normale PrPᶜ til PrPˢᶜ — en kjedereaksjon som fører til opphopning av feilfoldede proteiner.</p>
          <h4 style={{ color: "var(--accent)", marginTop: 12 }}>Prionsykdommer (TSE)</h4>
          <p><Term>Transmissible spongiform encephalopathies (TSE)</Term>:</p>
          <ul style={{ paddingLeft: 20, lineHeight: 1.8 }}>
            <li><Term>Creutzfeldt-Jakobs syndrom</Term> — mennesker</li>
            <li><Term>Kugalskap (BSE)</Term> — storfe</li>
            <li><Term>Skrapesyke (scrapie)</Term> — sau og geit</li>
            <li><Term>Skrantesjuke (CWD)</Term> — hjortedyr</li>
          </ul>
        </>
      ),
      svg: <PrionSVG />,
      eksempel: {
        q: "Sammenlign virus, viroider og prioner som infeksiøse agens.",
        steps: [
          "Virus: Arvestoff (DNA eller RNA) + kapsid (± hylster). Obligat intracellulær parasitt.",
          "Viroid: Kun nakent, sirkulært ssRNA uten kapsid. Ingen proteinkoding. Kun plantepatogen.",
          "Prion: Kun feilfoldet protein, INGEN arvestoff. Omdanner normale proteiner til den feilfoldede formen.",
          "Fellestrekk: Alle er avhengige av vertscellen, men på fundamentalt forskjellige måter.",
          "Prioner bryter det sentrale dogmet — infeksjon uten nukleinsyre.",
        ],
      },
      huskeregel: "Virus = DNA/RNA + kappe. Viroid = kun RNA (nakent). Prion = kun protein (ingen arvestoff!). Jo enklere, jo merkere.",
      eksamensrelevans: "Prioner og viroider er subvirale agens som kan komme som kortspørsmål. PrPᶜ vs PrPˢᶜ og kjedereaksjonen er viktig å kunne forklare.",
    },
  };

  const data = content[tabId];
  if (!data) return null;

  return (
    <div style={{ animation: "fadeIn 0.3s ease" }}>
      {/* Nøkkelbegreper */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ color: "var(--accent)", fontSize: 16, fontFamily: "var(--font-display)", marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>Nøkkelbegreper</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {(BEGREPER[tabId] || []).map((b, i) => (
            <span
              key={i}
              onClick={() => toggleTerm(i)}
              style={{
                display: "inline-block",
                padding: "5px 12px",
                borderRadius: 20,
                fontSize: 12,
                fontFamily: "var(--font-body)",
                cursor: "pointer",
                transition: "all 0.2s",
                background: clickedTerms[i] ? "var(--accent)" : "var(--accent-dim)",
                color: clickedTerms[i] ? "#FFF" : "var(--accent)",
                border: `1px solid ${clickedTerms[i] ? "var(--accent)" : "var(--accent)"}40`,
                position: "relative",
              }}
              title={b.def}
            >
              {b.term}
              {clickedTerms[i] && (
                <div style={{
                  position: "absolute", bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)",
                  background: "#0F172A", border: "1px solid var(--accent)", borderRadius: 8, padding: "8px 12px",
                  fontSize: 11, color: "#F8FAFC", width: 220, zIndex: 10, lineHeight: 1.4,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.5)"
                }}>
                  <strong style={{ color: "var(--accent)" }}>{b.term}:</strong> {b.def}
                  <div style={{ position: "absolute", bottom: -5, left: "50%", transform: "translateX(-50%) rotate(45deg)", width: 10, height: 10, background: "#0F172A", borderRight: "1px solid var(--accent)", borderBottom: "1px solid var(--accent)" }} />
                </div>
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Forklaring */}
      <div style={{ marginBottom: 28 }}>
        <h3 style={{ color: "var(--accent)", fontSize: 16, fontFamily: "var(--font-display)", marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>Forklaring</h3>
        <div style={{ color: "var(--text-secondary)", fontSize: 14, fontFamily: "var(--font-body)", lineHeight: 1.7 }}>
          {data.forklaring}
        </div>
      </div>

      {/* SVG */}
      {data.svg && (
        <div style={{ marginBottom: 28, background: "#0F172A", borderRadius: 12, padding: 20, border: "1px solid #334155" }}>
          <h3 style={{ color: "var(--accent)", fontSize: 16, fontFamily: "var(--font-display)", marginBottom: 14, letterSpacing: 1, textTransform: "uppercase" }}>Visuell illustrasjon</h3>
          {data.svg}
        </div>
      )}

      {/* Eksempel */}
      <div style={{ marginBottom: 28, background: "#1E293B", borderRadius: 12, padding: 20, border: "1px solid #334155" }}>
        <h3 style={{ color: "var(--accent)", fontSize: 16, fontFamily: "var(--font-display)", marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>Eksempel / eksamensoppgave</h3>
        <p style={{ color: "#F8FAFC", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-body)", marginBottom: 12 }}>{data.eksempel.q}</p>
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          style={{
            background: showAnswer ? "var(--accent)" : "transparent",
            color: showAnswer ? "#FFF" : "var(--accent)",
            border: "1px solid var(--accent)",
            borderRadius: 8,
            padding: "6px 16px",
            cursor: "pointer",
            fontSize: 13,
            fontFamily: "var(--font-body)",
            transition: "all 0.2s",
            marginBottom: showAnswer ? 12 : 0,
          }}
        >
          {showAnswer ? "Skjul løsning" : "Vis løsning"}
        </button>
        {showAnswer && (
          <div style={{ animation: "fadeIn 0.3s ease" }}>
            {data.eksempel.steps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 8, alignItems: "flex-start" }}>
                <span style={{ background: "var(--accent)", color: "#FFF", borderRadius: "50%", width: 22, height: 22, minWidth: 22, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, fontFamily: "var(--font-display)", marginTop: 2 }}>{i + 1}</span>
                <span style={{ color: "#F8FAFC", fontSize: 13, lineHeight: 1.5, fontFamily: "var(--font-body)" }}>{s}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Huskeregel */}
      <div style={{ marginBottom: 28, background: "linear-gradient(135deg, #EF444415, #EF444408)", borderRadius: 12, padding: 16, borderLeft: "4px solid var(--accent)" }}>
        <h3 style={{ color: "var(--accent)", fontSize: 14, fontFamily: "var(--font-display)", marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>💡 Huskeregel</h3>
        <p style={{ color: "#F8FAFC", fontSize: 13, fontFamily: "var(--font-body)", lineHeight: 1.5, margin: 0 }}>{data.huskeregel}</p>
      </div>

      {/* Eksamensrelevans */}
      <div style={{ background: "#0F172A", borderRadius: 12, padding: 14, border: "1px solid #33415580" }}>
        <h3 style={{ color: "#F59E0B", fontSize: 13, fontFamily: "var(--font-display)", marginBottom: 4, letterSpacing: 1, textTransform: "uppercase" }}>📋 Eksamensrelevans</h3>
        <p style={{ color: "#94A3B8", fontSize: 12, fontFamily: "var(--font-body)", lineHeight: 1.5, margin: 0 }}>{data.eksamensrelevans}</p>
      </div>
    </div>
  );
};

/* ─── Term highlight component ─── */
const Term = ({ children }) => (
  <span style={{ color: "var(--accent)", fontWeight: 600, background: "var(--accent-dim)", padding: "1px 5px", borderRadius: 4, fontSize: "inherit" }}>
    {children}
  </span>
);

/* ─── Main Component ─── */
export default function VirusStudyGuide() {
  const [activeTab, setActiveTab] = useState(0);
  const [visited, setVisited] = useState(new Set([0]));
  const contentRef = useRef(null);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setVisited(prev => new Set([...prev, id]));
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap');
        :root {
          --bg-deep: #0F172A;
          --bg-card: #1E293B;
          --border: #334155;
          --text-primary: #F8FAFC;
          --text-secondary: #94A3B8;
          --accent: #EF4444;
          --accent-dim: #EF444418;
          --font-display: 'Plus Jakarta Sans', sans-serif;
          --font-body: 'Source Sans 3', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: var(--bg-deep); }
        ::-webkit-scrollbar-thumb { background: #475569; border-radius: 3px; }
        h4 { font-family: var(--font-display); font-size: 14px; font-weight: 700; }
        p { margin-bottom: 10px; }
        ol, ul { margin-bottom: 10px; }
        li { font-family: var(--font-body); font-size: 14px; color: var(--text-secondary); }
        strong { color: var(--text-primary); }
        table { font-family: var(--font-body); }
      `}</style>
      <div style={{
        background: "var(--bg-deep)",
        minHeight: "100vh",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #EF4444, #B91C1C)",
          padding: "28px 24px 20px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
          <div style={{ position: "absolute", bottom: -20, left: 40, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
          <div style={{ fontSize: 11, fontFamily: "var(--font-mono)", opacity: 0.7, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Emne 4 · MATV1007</div>
          <h1 style={{ fontSize: 28, fontWeight: 800, fontFamily: "var(--font-display)", marginBottom: 4 }}>Virus</h1>
          <p style={{ fontSize: 13, opacity: 0.85, fontFamily: "var(--font-body)", margin: 0 }}>Struktur, klassifisering, replikasjon, bakteriofager, dyrevirus, viroider og prioner</p>
          {/* Progress */}
          <div style={{ display: "flex", gap: 4, marginTop: 14 }}>
            {TABS.map(t => (
              <div key={t.id} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: visited.has(t.id) ? "#FFF" : "rgba(255,255,255,0.2)",
                transition: "background 0.3s",
              }} />
            ))}
          </div>
          <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, fontFamily: "var(--font-mono)" }}>
            {visited.size}/{TABS.length} seksjoner besøkt
          </div>
        </div>

        {/* Tab bar */}
        <div style={{
          display: "flex",
          overflowX: "auto",
          background: "var(--bg-card)",
          borderBottom: "1px solid var(--border)",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => handleTabClick(t.id)}
              style={{
                flex: "0 0 auto",
                padding: "10px 16px",
                background: activeTab === t.id ? "var(--accent)" : "transparent",
                color: activeTab === t.id ? "#FFF" : visited.has(t.id) ? "var(--text-primary)" : "var(--text-secondary)",
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                fontFamily: "var(--font-display)",
                fontWeight: activeTab === t.id ? 700 : 500,
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                borderBottom: activeTab === t.id ? "none" : "2px solid transparent",
                position: "relative",
              }}
            >
              {t.label}
              {visited.has(t.id) && activeTab !== t.id && (
                <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "var(--accent)", marginLeft: 6, verticalAlign: "middle", opacity: 0.6 }} />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div ref={contentRef} style={{ padding: "24px 20px 60px", maxWidth: 800, margin: "0 auto" }}>
          {/* Tab header */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <span style={{
                background: "var(--accent)",
                color: "#FFF",
                borderRadius: 8,
                padding: "4px 10px",
                fontSize: 12,
                fontWeight: 700,
                fontFamily: "var(--font-mono)",
              }}>
                {activeTab + 1}/{TABS.length}
              </span>
              <span style={{ color: "var(--text-secondary)", fontSize: 12, fontFamily: "var(--font-mono)" }}>Emne 4 — Virus</span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, fontFamily: "var(--font-display)", color: "var(--text-primary)" }}>
              {TABS[activeTab].label}
            </h2>
          </div>

          <TabContent tabId={activeTab} />

          {/* Navigation */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
            <button
              onClick={() => activeTab > 0 && handleTabClick(activeTab - 1)}
              disabled={activeTab === 0}
              style={{
                background: activeTab === 0 ? "#1E293B40" : "var(--bg-card)",
                color: activeTab === 0 ? "#475569" : "var(--text-primary)",
                border: "1px solid var(--border)",
                borderRadius: 8,
                padding: "8px 18px",
                cursor: activeTab === 0 ? "default" : "pointer",
                fontSize: 13,
                fontFamily: "var(--font-display)",
                fontWeight: 600,
              }}
            >
              ← Forrige
            </button>
            <button
              onClick={() => activeTab < TABS.length - 1 && handleTabClick(activeTab + 1)}
              disabled={activeTab === TABS.length - 1}
              style={{
                background: activeTab === TABS.length - 1 ? "#1E293B40" : "var(--accent)",
                color: activeTab === TABS.length - 1 ? "#475569" : "#FFF",
                border: "none",
                borderRadius: 8,
                padding: "8px 18px",
                cursor: activeTab === TABS.length - 1 ? "default" : "pointer",
                fontSize: 13,
                fontFamily: "var(--font-display)",
                fontWeight: 600,
              }}
            >
              Neste →
            </button>
          </div>

          {/* Læringsmål */}
          <div style={{ marginTop: 32, background: "var(--bg-card)", borderRadius: 12, padding: 16, border: "1px solid var(--border)" }}>
            <h3 style={{ color: "var(--accent)", fontSize: 13, fontFamily: "var(--font-display)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 8 }}>Læringsmål (K2)</h3>
            <p style={{ color: "var(--text-secondary)", fontSize: 12, fontFamily: "var(--font-body)", margin: 0, lineHeight: 1.6 }}>
              <strong>K2:</strong> Kandidaten har bred kunnskap om oppbygning av virus — herunder virusstruktur, symmetri, genomtyper, Baltimore-klassifisering, replikasjonssykluser (lytisk/lysogen), forskjeller mellom bakteriofager og dyrevirus, og subvirale agens (viroider, prioner).
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
