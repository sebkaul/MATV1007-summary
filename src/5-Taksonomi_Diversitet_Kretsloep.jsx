import { useState, useEffect, useRef } from "react";

const TABS = [
  { id: "taksonomi", label: "Taksonomi", short: "TAX" },
  { id: "fototrofe", label: "Fototrofe", short: "FOT" },
  { id: "gramneg", label: "Gram-negative", short: "G−" },
  { id: "firmicutes", label: "Firmicutes", short: "FIR" },
  { id: "actino", label: "Actinobacteria", short: "ACT" },
  { id: "archaea", label: "Archaea", short: "ARC" },
  { id: "sopp", label: "Sopp", short: "SOP" },
  { id: "alger", label: "Alger", short: "ALG" },
  { id: "karbon", label: "Karbonkretsløp", short: "C" },
  { id: "nitrogen", label: "Nitrogenkretsløp", short: "N" },
];

// ─── Styled sub-components ───
const Term = ({ children }) => (
  <span style={{
    color: "#C4B5FD",
    backgroundColor: "rgba(139,92,246,0.12)",
    padding: "1px 6px",
    borderRadius: 4,
    fontWeight: 600,
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "0.88em",
  }}>{children}</span>
);

const Org = ({ children }) => (
  <span style={{ fontStyle: "italic", color: "#A78BFA" }}>{children}</span>
);

const Formula = ({ children }) => (
  <span style={{
    fontFamily: "'JetBrains Mono', monospace",
    color: "#E0E7FF",
    backgroundColor: "rgba(139,92,246,0.08)",
    padding: "2px 6px",
    borderRadius: 4,
    fontSize: "0.88em",
  }}>{children}</span>
);

const SectionTitle = ({ children }) => (
  <h3 style={{
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    fontSize: "1.1rem",
    fontWeight: 700,
    color: "#C4B5FD",
    marginTop: 28,
    marginBottom: 10,
    letterSpacing: "0.03em",
    textTransform: "uppercase",
    borderBottom: "1px solid rgba(139,92,246,0.2)",
    paddingBottom: 6,
  }}>{children}</h3>
);

const KeyBox = ({ title, children }) => (
  <div style={{
    background: "linear-gradient(135deg, rgba(139,92,246,0.15) 0%, rgba(99,102,241,0.08) 100%)",
    border: "1px solid rgba(139,92,246,0.25)",
    borderRadius: 10,
    padding: "14px 18px",
    marginTop: 14,
    marginBottom: 14,
  }}>
    <div style={{
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 700,
      color: "#C4B5FD",
      fontSize: "0.85rem",
      marginBottom: 6,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
    }}>{title}</div>
    <div style={{ color: "#CBD5E1", fontSize: "0.92rem", lineHeight: 1.55 }}>{children}</div>
  </div>
);

const ExamBox = ({ children }) => (
  <div style={{
    background: "rgba(251,191,36,0.08)",
    border: "1px solid rgba(251,191,36,0.25)",
    borderLeft: "3px solid #FBBF24",
    borderRadius: 8,
    padding: "12px 16px",
    marginTop: 14,
    fontSize: "0.88rem",
    color: "#FDE68A",
    lineHeight: 1.5,
  }}>
    <span style={{ fontWeight: 700 }}>📝 Eksamensrelevans: </span>
    {children}
  </div>
);

const Pill = ({ term, def }) => {
  const [show, setShow] = useState(false);
  return (
    <span
      onClick={() => setShow(!show)}
      style={{
        display: "inline-block",
        background: show ? "rgba(139,92,246,0.25)" : "rgba(139,92,246,0.12)",
        border: "1px solid rgba(139,92,246,0.3)",
        borderRadius: 20,
        padding: "4px 12px",
        margin: "3px 4px",
        cursor: "pointer",
        fontSize: "0.82rem",
        color: show ? "#E0E7FF" : "#C4B5FD",
        fontFamily: "'JetBrains Mono', monospace",
        transition: "all 0.2s ease",
        maxWidth: show ? 400 : 200,
      }}
    >
      {term}{show && <span style={{ color: "#94A3B8", fontFamily: "'Source Sans 3', sans-serif" }}> — {def}</span>}
    </span>
  );
};

const Collapsible = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 8 }}>
      <div
        onClick={() => setOpen(!open)}
        style={{
          cursor: "pointer",
          color: "#A78BFA",
          fontWeight: 600,
          fontSize: "0.88rem",
          userSelect: "none",
        }}
      >
        {open ? "▾" : "▸"} {title}
      </div>
      {open && <div style={{ paddingLeft: 16, paddingTop: 6, color: "#CBD5E1", fontSize: "0.88rem", lineHeight: 1.55 }}>{children}</div>}
    </div>
  );
};

const P = ({ children }) => (
  <p style={{ color: "#CBD5E1", fontSize: "0.92rem", lineHeight: 1.6, marginTop: 8, marginBottom: 8 }}>{children}</p>
);

// ─── SVG Diagrams ───

const PhyloTreeSVG = () => (
  <svg viewBox="0 0 620 320" style={{ width: "100%", maxWidth: 620, margin: "12px auto", display: "block" }}>
    <defs>
      <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(139,92,246,0.08)" />
        <stop offset="100%" stopColor="rgba(30,41,59,0.5)" />
      </linearGradient>
    </defs>
    <rect width="620" height="320" rx="12" fill="url(#bg1)" />
    <text x="310" y="24" textAnchor="middle" fill="#C4B5FD" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans">Fylogenetisk tre — Tre domener (basert på 16S rRNA)</text>
    {/* Root */}
    <circle cx="80" cy="260" r="6" fill="#8B5CF6" />
    <text x="80" y="290" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="Source Sans 3">LUCA</text>
    {/* Bacteria branch */}
    <line x1="80" y1="260" x2="200" y2="120" stroke="#7C3AED" strokeWidth="2.5" />
    <circle cx="200" cy="120" r="30" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6" strokeWidth="1.5" />
    <text x="200" y="116" textAnchor="middle" fill="#C4B5FD" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">Bacteria</text>
    <text x="200" y="132" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Prokaryot</text>
    {/* Sub-branches bacteria */}
    <line x1="200" y1="90" x2="140" y2="50" stroke="#6D28D9" strokeWidth="1.5" />
    <text x="100" y="48" fill="#A78BFA" fontSize="9" fontFamily="JetBrains Mono">Proteobacteria</text>
    <line x1="200" y1="90" x2="200" y2="45" stroke="#6D28D9" strokeWidth="1.5" />
    <text x="200" y="38" textAnchor="middle" fill="#A78BFA" fontSize="9" fontFamily="JetBrains Mono">Firmicutes</text>
    <line x1="200" y1="90" x2="260" y2="50" stroke="#6D28D9" strokeWidth="1.5" />
    <text x="270" y="48" fill="#A78BFA" fontSize="9" fontFamily="JetBrains Mono">Actinobacteria</text>
    {/* Archaea branch */}
    <line x1="80" y1="260" x2="380" y2="160" stroke="#7C3AED" strokeWidth="2.5" />
    <circle cx="380" cy="160" r="30" fill="rgba(251,191,36,0.1)" stroke="#FBBF24" strokeWidth="1.5" />
    <text x="380" y="156" textAnchor="middle" fill="#FDE68A" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">Archaea</text>
    <text x="380" y="172" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Prokaryot</text>
    {/* Sub-branches archaea */}
    <line x1="380" y1="130" x2="340" y2="95" stroke="#D97706" strokeWidth="1.5" />
    <text x="300" y="90" fill="#FBBF24" fontSize="9" fontFamily="JetBrains Mono">Metanogene</text>
    <line x1="380" y1="130" x2="420" y2="95" stroke="#D97706" strokeWidth="1.5" />
    <text x="420" y="88" fill="#FBBF24" fontSize="9" fontFamily="JetBrains Mono">Halofile</text>
    {/* Eukarya branch — from Archaea */}
    <line x1="380" y1="160" x2="530" y2="120" stroke="#7C3AED" strokeWidth="2.5" />
    <circle cx="530" cy="120" r="30" fill="rgba(52,211,153,0.1)" stroke="#34D399" strokeWidth="1.5" />
    <text x="530" y="116" textAnchor="middle" fill="#6EE7B7" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">Eukarya</text>
    <text x="530" y="132" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Eukaryot</text>
    {/* Sub-branches eukarya */}
    <line x1="530" y1="90" x2="490" y2="55" stroke="#059669" strokeWidth="1.5" />
    <text x="465" y="48" fill="#34D399" fontSize="9" fontFamily="JetBrains Mono">Sopp</text>
    <line x1="530" y1="90" x2="530" y2="50" stroke="#059669" strokeWidth="1.5" />
    <text x="530" y="43" textAnchor="middle" fill="#34D399" fontSize="9" fontFamily="JetBrains Mono">Alger</text>
    <line x1="530" y1="90" x2="580" y2="55" stroke="#059669" strokeWidth="1.5" />
    <text x="580" y="48" fill="#34D399" fontSize="9" fontFamily="JetBrains Mono">Protister</text>
    <text x="310" y="310" textAnchor="middle" fill="#64748B" fontSize="9" fontFamily="Source Sans 3">Carl Woese (1970-tallet): Universelt fylogenetisk tre basert på 16S rRNA-gensekvenser</text>
  </svg>
);

const NitrogenCycleSVG = () => (
  <svg viewBox="0 0 650 480" style={{ width: "100%", maxWidth: 650, margin: "12px auto", display: "block" }}>
    <defs>
      <linearGradient id="nbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(139,92,246,0.06)" />
        <stop offset="100%" stopColor="rgba(30,41,59,0.5)" />
      </linearGradient>
      <marker id="arr" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#8B5CF6" />
      </marker>
      <marker id="arrY" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#FBBF24" />
      </marker>
      <marker id="arrG" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#34D399" />
      </marker>
      <marker id="arrR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#F87171" />
      </marker>
    </defs>
    <rect width="650" height="480" rx="12" fill="url(#nbg)" />
    <text x="325" y="24" textAnchor="middle" fill="#C4B5FD" fontSize="14" fontWeight="700" fontFamily="Plus Jakarta Sans">Nitrogensyklusen</text>

    {/* N2 in atmosphere */}
    <rect x="245" y="40" width="160" height="40" rx="20" fill="rgba(139,92,246,0.15)" stroke="#8B5CF6" strokeWidth="1.5" />
    <text x="325" y="65" textAnchor="middle" fill="#E0E7FF" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono">N₂ (atmosfæren)</text>

    {/* NH3/NH4+ */}
    <rect x="245" y="180" width="160" height="40" rx="20" fill="rgba(52,211,153,0.15)" stroke="#34D399" strokeWidth="1.5" />
    <text x="325" y="205" textAnchor="middle" fill="#6EE7B7" fontSize="13" fontWeight="700" fontFamily="JetBrains Mono">NH₃ / NH₄⁺</text>

    {/* NO2- */}
    <rect x="480" y="280" width="120" height="36" rx="18" fill="rgba(251,191,36,0.12)" stroke="#FBBF24" strokeWidth="1.5" />
    <text x="540" y="303" textAnchor="middle" fill="#FDE68A" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono">NO₂⁻</text>

    {/* NO3- */}
    <rect x="480" y="380" width="120" height="36" rx="18" fill="rgba(251,191,36,0.15)" stroke="#FBBF24" strokeWidth="1.5" />
    <text x="540" y="403" textAnchor="middle" fill="#FDE68A" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono">NO₃⁻</text>

    {/* Organic N */}
    <rect x="40" y="280" width="150" height="36" rx="18" fill="rgba(248,113,113,0.12)" stroke="#F87171" strokeWidth="1.5" />
    <text x="115" y="303" textAnchor="middle" fill="#FCA5A5" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono">Organisk N</text>

    {/* N2O */}
    <rect x="40" y="120" width="120" height="36" rx="18" fill="rgba(248,113,113,0.15)" stroke="#F87171" strokeWidth="1.5" />
    <text x="100" y="143" textAnchor="middle" fill="#FCA5A5" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono">N₂O ⚠️</text>

    {/* ARROWS & LABELS */}
    {/* Nitrogenfiksering: N2 → NH3 */}
    <line x1="325" y1="82" x2="325" y2="176" stroke="#34D399" strokeWidth="2" markerEnd="url(#arrG)" />
    <text x="340" y="130" fill="#34D399" fontSize="10" fontWeight="600" fontFamily="Source Sans 3">Nitrogenfiksering</text>
    <text x="340" y="142" fill="#6EE7B7" fontSize="8.5" fontFamily="JetBrains Mono">Cyanobakt., Rhizobium</text>
    <text x="340" y="153" fill="#6EE7B7" fontSize="8.5" fontFamily="JetBrains Mono">Clostridium, Azotobacter</text>

    {/* Nitrifikasjon step 1: NH4 → NO2 */}
    <line x1="407" y1="210" x2="478" y2="280" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrY)" />
    <text x="420" y="240" fill="#FBBF24" fontSize="9.5" fontWeight="600" fontFamily="Source Sans 3">Nitrifikasjon</text>
    <text x="420" y="252" fill="#FDE68A" fontSize="8.5" fontFamily="JetBrains Mono" fontStyle="italic">Nitrosomonas</text>

    {/* Nitrifikasjon step 2: NO2 → NO3 */}
    <line x1="540" y1="318" x2="540" y2="376" stroke="#FBBF24" strokeWidth="2" markerEnd="url(#arrY)" />
    <text x="555" y="350" fill="#FBBF24" fontSize="9.5" fontWeight="600" fontFamily="Source Sans 3">Nitrifikasjon</text>
    <text x="555" y="362" fill="#FDE68A" fontSize="8.5" fontFamily="JetBrains Mono" fontStyle="italic">Nitrobacter</text>

    {/* Denitrifikasjon: NO3 → N2/N2O */}
    <path d="M 480 395 Q 300 450 255 80" fill="none" stroke="#F87171" strokeWidth="2" markerEnd="url(#arrR)" />
    <text x="270" y="430" fill="#F87171" fontSize="9.5" fontWeight="600" fontFamily="Source Sans 3">Denitrifikasjon</text>
    <text x="270" y="442" fill="#FCA5A5" fontSize="8.5" fontFamily="JetBrains Mono">Pseudomonas, Bacillus</text>
    <text x="270" y="454" fill="#FCA5A5" fontSize="8.5" fontFamily="JetBrains Mono">(anaerobe forhold)</text>

    {/* N2O branch from denitrifikasjon */}
    <line x1="270" y1="420" x2="162" y2="155" stroke="#F87171" strokeWidth="1.5" strokeDasharray="4 3" />
    <text x="60" y="170" fill="#FCA5A5" fontSize="8" fontFamily="Source Sans 3">Klimagass (300× CO₂)</text>

    {/* Ammonifikasjon: Organic N → NH4 */}
    <line x1="170" y1="280" x2="260" y2="220" stroke="#8B5CF6" strokeWidth="2" markerEnd="url(#arr)" />
    <text x="160" y="248" fill="#A78BFA" fontSize="9.5" fontWeight="600" fontFamily="Source Sans 3">Ammonifikasjon</text>
    <text x="160" y="260" fill="#C4B5FD" fontSize="8.5" fontFamily="Source Sans 3">Nedbrytere</text>

    {/* Assimilasjon: NH4 → Organic N */}
    <line x1="260" y1="220" x2="170" y2="295" stroke="#8B5CF6" strokeWidth="1" strokeDasharray="4 3" />

    {/* Legend */}
    <rect x="20" y="440" width="610" height="30" rx="6" fill="rgba(15,23,42,0.6)" />
    <text x="35" y="460" fill="#64748B" fontSize="9" fontFamily="Source Sans 3">Oksisk jord → Nitrifikasjon | Anoksisk jord → Denitrifikasjon | N₂O = potent drivhusgass fra gjødsling</text>
  </svg>
);

const CarbonCycleSVG = () => (
  <svg viewBox="0 0 620 380" style={{ width: "100%", maxWidth: 620, margin: "12px auto", display: "block" }}>
    <defs>
      <linearGradient id="cbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(139,92,246,0.06)" />
        <stop offset="100%" stopColor="rgba(30,41,59,0.5)" />
      </linearGradient>
      <marker id="ac" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#34D399" />
      </marker>
      <marker id="rc" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
        <polygon points="0 0, 8 3, 0 6" fill="#F87171" />
      </marker>
    </defs>
    <rect width="620" height="380" rx="12" fill="url(#cbg)" />
    <text x="310" y="24" textAnchor="middle" fill="#C4B5FD" fontSize="14" fontWeight="700" fontFamily="Plus Jakarta Sans">Karbonsyklusen — CO₂-redokssyklus</text>

    {/* CO2 box */}
    <rect x="230" y="45" width="160" height="44" rx="22" fill="rgba(248,113,113,0.12)" stroke="#F87171" strokeWidth="1.5" />
    <text x="310" y="72" textAnchor="middle" fill="#FCA5A5" fontSize="14" fontWeight="700" fontFamily="JetBrains Mono">CO₂ (atmosfære)</text>

    {/* Organic matter */}
    <rect x="230" y="200" width="160" height="44" rx="22" fill="rgba(52,211,153,0.12)" stroke="#34D399" strokeWidth="1.5" />
    <text x="310" y="220" textAnchor="middle" fill="#6EE7B7" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono">(CH₂O)ₙ</text>
    <text x="310" y="234" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Organisk materiale</text>

    {/* Fotosyntese arrow (down, left side) */}
    <path d="M 250 92 Q 170 150 245 198" fill="none" stroke="#34D399" strokeWidth="2.5" markerEnd="url(#ac)" />
    <text x="120" y="140" fill="#34D399" fontSize="11" fontWeight="600" fontFamily="Source Sans 3">Fotosyntese</text>
    <text x="120" y="154" fill="#6EE7B7" fontSize="9" fontFamily="Source Sans 3">CO₂ + H₂O → (CH₂O)ₙ + O₂</text>
    <text x="120" y="166" fill="#6EE7B7" fontSize="8.5" fontFamily="JetBrains Mono">Autotrofe org.</text>

    {/* Respirasjon arrow (up, right side) */}
    <path d="M 375 198 Q 450 150 370 92" fill="none" stroke="#F87171" strokeWidth="2.5" markerEnd="url(#rc)" />
    <text x="435" y="132" fill="#F87171" fontSize="11" fontWeight="600" fontFamily="Source Sans 3">Respirasjon</text>
    <text x="435" y="146" fill="#FCA5A5" fontSize="9" fontFamily="Source Sans 3">(CH₂O)ₙ + O₂ → CO₂ + H₂O</text>
    <text x="435" y="158" fill="#FCA5A5" fontSize="8.5" fontFamily="JetBrains Mono">Alle heterotrofe</text>

    {/* CH4 box */}
    <rect x="40" y="270" width="120" height="36" rx="18" fill="rgba(139,92,246,0.12)" stroke="#8B5CF6" strokeWidth="1.5" />
    <text x="100" y="293" textAnchor="middle" fill="#C4B5FD" fontSize="12" fontWeight="700" fontFamily="JetBrains Mono">CH₄ (metan)</text>
    <line x1="230" y1="235" x2="162" y2="272" stroke="#8B5CF6" strokeWidth="1.5" markerEnd="url(#arr)" />
    <text x="155" y="250" fill="#A78BFA" fontSize="8.5" fontFamily="Source Sans 3">Metanogenese (anaerobt)</text>

    {/* Fossilt brennstoff */}
    <rect x="420" y="270" width="160" height="36" rx="18" fill="rgba(251,191,36,0.12)" stroke="#FBBF24" strokeWidth="1.5" />
    <text x="500" y="293" textAnchor="middle" fill="#FDE68A" fontSize="11" fontWeight="600" fontFamily="Source Sans 3">Fossilt brennstoff</text>
    <line x1="500" y1="270" x2="400" y2="92" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="5 3" markerEnd="url(#rc)" />
    <text x="470" y="210" fill="#FBBF24" fontSize="9" fontWeight="600" fontFamily="Source Sans 3">Forbrenning</text>

    {/* Sedimenter */}
    <rect x="230" y="310" width="160" height="32" rx="16" fill="rgba(100,116,139,0.15)" stroke="#64748B" strokeWidth="1" />
    <text x="310" y="331" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="Source Sans 3">Sedimentært karbon (størst lager)</text>

    {/* Human impact note */}
    <rect x="30" y="345" width="560" height="28" rx="6" fill="rgba(248,113,113,0.08)" stroke="rgba(248,113,113,0.2)" strokeWidth="1" />
    <text x="310" y="364" textAnchor="middle" fill="#FCA5A5" fontSize="9.5" fontFamily="Source Sans 3">⚠ Menneskelig påvirkning: Forbrenning av fossilt brennstoff → økt CO₂ → havforsuring → redusert kalsiumskalldannelse</text>
  </svg>
);

const SoppStructureSVG = () => (
  <svg viewBox="0 0 580 280" style={{ width: "100%", maxWidth: 580, margin: "12px auto", display: "block" }}>
    <defs>
      <linearGradient id="sbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="rgba(139,92,246,0.06)" />
        <stop offset="100%" stopColor="rgba(30,41,59,0.5)" />
      </linearGradient>
    </defs>
    <rect width="580" height="280" rx="12" fill="url(#sbg)" />
    <text x="290" y="22" textAnchor="middle" fill="#C4B5FD" fontSize="13" fontWeight="700" fontFamily="Plus Jakarta Sans">Sopp — Gjærsopp vs. Hyfesopp (muggsopp)</text>

    {/* Gjærsopp side */}
    <text x="145" y="48" textAnchor="middle" fill="#6EE7B7" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">Gjærsopp</text>
    {/* Yeast cell */}
    <ellipse cx="120" cy="120" rx="35" ry="28" fill="rgba(52,211,153,0.15)" stroke="#34D399" strokeWidth="1.5" />
    <ellipse cx="110" cy="112" rx="10" ry="9" fill="rgba(52,211,153,0.2)" stroke="#34D399" strokeWidth="0.8" />
    <text x="110" y="116" textAnchor="middle" fill="#34D399" fontSize="7" fontFamily="Source Sans 3">kjerne</text>
    {/* Budding */}
    <ellipse cx="155" cy="105" rx="14" ry="12" fill="rgba(52,211,153,0.1)" stroke="#34D399" strokeWidth="1" strokeDasharray="3 2" />
    <text x="172" y="100" fill="#6EE7B7" fontSize="7.5" fontFamily="Source Sans 3">knopp</text>
    {/* Labels */}
    <text x="145" y="170" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Encellet, rund/oval</text>
    <text x="145" y="183" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Fakultativ aerob</text>
    <text x="145" y="196" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Knoppskyting</text>
    <text x="145" y="215" textAnchor="middle" fill="#6EE7B7" fontSize="9" fontFamily="JetBrains Mono" fontStyle="italic">Saccharomyces, Candida</text>
    <text x="145" y="240" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="Source Sans 3">Kolonier ligner bakteriekolonier</text>

    {/* Divider */}
    <line x1="290" y1="40" x2="290" y2="260" stroke="rgba(139,92,246,0.2)" strokeWidth="1" strokeDasharray="4 4" />

    {/* Hyfesopp side */}
    <text x="435" y="48" textAnchor="middle" fill="#A78BFA" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">Hyfesopp (muggsopp)</text>
    {/* Hyphae network */}
    <line x1="350" y1="130" x2="430" y2="90" stroke="#8B5CF6" strokeWidth="2" />
    <line x1="430" y1="90" x2="510" y2="100" stroke="#8B5CF6" strokeWidth="2" />
    <line x1="430" y1="90" x2="460" y2="60" stroke="#8B5CF6" strokeWidth="2" />
    <line x1="350" y1="130" x2="380" y2="160" stroke="#8B5CF6" strokeWidth="2" />
    <line x1="380" y1="160" x2="450" y2="150" stroke="#8B5CF6" strokeWidth="2" />
    <line x1="450" y1="150" x2="520" y2="140" stroke="#8B5CF6" strokeWidth="2" />
    <line x1="380" y1="160" x2="360" y2="190" stroke="#8B5CF6" strokeWidth="2" />
    {/* Septa */}
    <line x1="390" y1="85" x2="390" y2="95" stroke="#C4B5FD" strokeWidth="1" />
    <line x1="460" y1="87" x2="460" y2="97" stroke="#C4B5FD" strokeWidth="1" />
    {/* Conidiospores */}
    <circle cx="460" cy="55" r="4" fill="rgba(139,92,246,0.3)" stroke="#C4B5FD" strokeWidth="0.8" />
    <circle cx="468" cy="50" r="3.5" fill="rgba(139,92,246,0.3)" stroke="#C4B5FD" strokeWidth="0.8" />
    <circle cx="454" cy="48" r="3" fill="rgba(139,92,246,0.3)" stroke="#C4B5FD" strokeWidth="0.8" />
    <text x="480" y="48" fill="#C4B5FD" fontSize="8" fontFamily="Source Sans 3">konidier</text>
    {/* Labels */}
    <text x="340" y="210" fill="#94A3B8" fontSize="8.5" fontFamily="Source Sans 3">← hyfe (trådformet celle)</text>
    <text x="390" y="108" fill="#C4B5FD" fontSize="8" fontFamily="Source Sans 3">septum</text>
    <text x="435" y="175" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Flercellet, mycelnettverk</text>
    <text x="435" y="188" textAnchor="middle" fill="#94A3B8" fontSize="9" fontFamily="Source Sans 3">Obligat aerob</text>
    <text x="435" y="215" textAnchor="middle" fill="#A78BFA" fontSize="9" fontFamily="JetBrains Mono" fontStyle="italic">Aspergillus, Penicillium</text>
    <text x="435" y="240" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="Source Sans 3">Lodne/hårete kolonier</text>

    {/* Common bottom */}
    <rect x="140" y="252" width="300" height="20" rx="6" fill="rgba(139,92,246,0.1)" />
    <text x="290" y="266" textAnchor="middle" fill="#C4B5FD" fontSize="9" fontFamily="Source Sans 3">Felles: Eukaryot | Cellevegg med kitin | Kjemoorganotrof | Heterotrof</text>
  </svg>
);

// ─── Tab Content Components ───

const TaksonomTab = () => (
  <div>
    <SectionTitle>Nøkkelbegreper</SectionTitle>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Pill term="Taksonomi" def="Læren om klassifisering, identifikasjon og nomenklatur" />
      <Pill term="Art (species)" def="Populasjon av organismer med stor likhet, felles opphav" />
      <Pill term="Stamme (strain)" def="Genetisk like celler fra én enkeltcelle" />
      <Pill term="Binomial nomenklatur" def="Slektsnavn + artstillegg, i kursiv" />
      <Pill term="16S rRNA" def="Fylogenetisk markør for klassifisering" />
      <Pill term="Fylogenetisk tre" def="Viser evolusjonshistorien til organismer" />
      <Pill term="Fenotyp" def="Observerbare egenskaper" />
      <Pill term="Genotyp" def="Genetisk sammensetning" />
    </div>

    <SectionTitle>Forklaring</SectionTitle>
    <P><Term>Taksonomi</Term> er læren om klassifisering, identifikasjon og nomenklatur av organismer. Organismer grupperes i <Term>taxa</Term> basert på en kombinasjon av fenotypiske, genotypiske og fylogenetiske egenskaper.</P>
    <P>Det <Term>taksonomiske hierarkiet</Term>: <strong style={{color:"#E0E7FF"}}>Domene → Phylum → Klasse → Orden → Familie → Slekt → Art</strong>. Alle organismer gis to navn etter <Term>binomial nomenklatur</Term> — slektsnavn + artstillegg, skrevet i kursiv. Eksempel: <Org>Bacillus subtilis</Org> → <Org>B. subtilis</Org>.</P>
    <P><Term>Carl Woese</Term> (1970-tallet) oppdaget at evolusjonshistorien er lagret i DNA-sekvenser. Ved å studere <Term>16S rRNA</Term>-gensekvenser kan vi konstruere et universelt fylogenetisk tre med tre domener: <Term>Bacteria</Term>, <Term>Archaea</Term> og <Term>Eukarya</Term>. Eukarya utviklet seg fra Archaea.</P>
    <P>Identifikasjon bruker <Term>fenotypiske</Term> metoder (morfologi, bevegelse, metabolisme, celleveggkjemi, Gramfarging, katalase/oksidase-tester) og <Term>genotypiske</Term> metoder (16S rRNA-sekvensering, DNA-DNA hybridisering).</P>
    <P>&gt;90% av alle karakteriserte slekter og arter tilhører fire phyla: <Org>Proteobacteria</Org> (G−), <Org>Actinobacteria</Org> (G+), <Org>Firmicutes</Org> (G+) og <Org>Bacteroidetes</Org> (G−).</P>

    <SectionTitle>Visuell illustrasjon</SectionTitle>
    <PhyloTreeSVG />

    <SectionTitle>Eksempel</SectionTitle>
    <KeyBox title="Eksamensoppgave-stil: Klassifiser en organisme">
      <P>Du isolerer en stavformet, Gram-negativ, fakultativt aerob, oksidase-negativ, katalase-positiv bakterie som produserer syre fra glukose. Hvilken orden tilhører den sannsynligvis?</P>
      <Collapsible title="Vis løsning">
        <P>G-negativ stav + fakultativt aerob + oksidase-negativ + katalase-positiv + syreproduksjon fra glukose = typiske kjennetegn for <Term>Enterobacterales</Term> (Gammaproteobacteria). Mulige slekter: <Org>Escherichia</Org>, <Org>Salmonella</Org>, <Org>Klebsiella</Org>.</P>
      </Collapsible>
    </KeyBox>

    <KeyBox title="💡 Huskeregel">
      <strong style={{color:"#E0E7FF"}}>«D-P-K-O-F-S-A»</strong> = Domene, Phylum, Klasse, Orden, Familie, Slekt, Art. Husk: «Da Petter Klaget Over Familien Sin Alltid».
    </KeyBox>

    <ExamBox>
      V2024 oppg 10: Flervalg om fenotypiske kjennetegn (aerotolerante anaerobe → Lactobacillus, mangler cellevegg → Mycoplasma, filamentøs vekst → Streptomyces, Enterobacteriales → Salmonella). Slekt-identifikasjon ut fra egenskaper er en gjenganger.
    </ExamBox>
  </div>
);

const FototrofeTab = () => (
  <div>
    <SectionTitle>Nøkkelbegreper</SectionTitle>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Pill term="Fototrofe" def="Organismer som bruker lys som energikilde" />
      <Pill term="Oksisk fotosyntese" def="Produserer O₂, kun hos Cyanobacteria" />
      <Pill term="Anoksisk fotosyntese" def="Produserer ikke O₂, purpur-/grønnbakterier" />
      <Pill term="Cyanobakterier" def="Oksygenproduserende fotoautotrofe bakterier" />
      <Pill term="Heterocyst" def="Spesialisert celle for N₂-fiksering hos cyanobakterier" />
      <Pill term="Thylakoider" def="Membransystem for fotosyntese" />
    </div>

    <SectionTitle>Forklaring</SectionTitle>
    <P>Fotosyntese oppstod i bakterier. De første fototrofe var <Term>anoksiske fototrofe</Term> — de produserer ikke O₂. Anoksisk fotosyntese finnes i seks phyla: <Org>Proteobacteria</Org>, <Org>Chlorobi</Org>, <Org>Chloroflexi</Org>, <Org>Firmicutes</Org>, <Org>Acidobacteria</Org>.</P>
    <P><Term>Oksisk fotosyntese</Term> finnes kun hos ett phylum: <Org>Cyanobacteria</Org>. De er <Term>oksiske fotoautotrofe</Term> bakterier med membransystemet <Term>thylakoider</Term> og pigmentene <Term>klorofyll a</Term> (grønn) og <Term>fykobiliner</Term> (blå).</P>
    <P>Formler for fotosyntese:<br/>
    Oksisk: <Formula>6CO₂ + 12H₂O + lys → C₆H₁₂O₆ + 6O₂ + 6H₂O</Formula><br/>
    Anoksisk: <Formula>6CO₂ + 12H₂S + lys → C₆H₁₂O₆ + 12S + 6H₂O</Formula></P>
    <P>Mange cyanobakterier kan fiksere <Term>N₂</Term> under anoksiske betingelser i spesialiserte celler kalt <Term>heterocyster</Term>. De er viktige <Term>primærprodusenter</Term> i marine, ferskvanns-, jord- og ørken-miljø.</P>

    <SectionTitle>Visuell illustrasjon</SectionTitle>
    <svg viewBox="0 0 500 200" style={{ width: "100%", maxWidth: 500, margin: "12px auto", display: "block" }}>
      <rect width="500" height="200" rx="12" fill="rgba(139,92,246,0.05)" />
      <text x="250" y="22" textAnchor="middle" fill="#C4B5FD" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">Cyanobakterie med heterocyst</text>
      {/* Chain of cells */}
      {[0,1,2,3,4,5,6].map(i => {
        const x = 80 + i * 55;
        const isHet = i === 3;
        return (
          <g key={i}>
            <ellipse cx={x} cy={100} rx={22} ry={18} 
              fill={isHet ? "rgba(251,191,36,0.2)" : "rgba(52,211,153,0.15)"} 
              stroke={isHet ? "#FBBF24" : "#34D399"} strokeWidth="1.5" />
            {!isHet && <ellipse cx={x} cy={95} rx={15} ry={8} fill="none" stroke="#34D399" strokeWidth="0.5" strokeDasharray="2 2" />}
            {!isHet && <text x={x} y={98} textAnchor="middle" fill="#6EE7B7" fontSize="6.5" fontFamily="Source Sans 3">thylakoid</text>}
            {isHet && <text x={x} y={103} textAnchor="middle" fill="#FDE68A" fontSize="8" fontWeight="600" fontFamily="Source Sans 3">Heterocyst</text>}
          </g>
        );
      })}
      <text x="250" y="140" textAnchor="middle" fill="#6EE7B7" fontSize="9" fontFamily="Source Sans 3">Vegetative celler — oksisk fotosyntese</text>
      <text x="250" y="155" textAnchor="middle" fill="#FDE68A" fontSize="9" fontFamily="Source Sans 3">Heterocyst — N₂-fiksering (anoksisk, tykkvegg, mangler PSII)</text>
      <text x="250" y="180" textAnchor="middle" fill="#94A3B8" fontSize="8.5" fontFamily="Source Sans 3">Klorofyll a + fykobiliner | Thylakoider | Primærprodusenter</text>
    </svg>

    <SectionTitle>Eksempel</SectionTitle>
    <KeyBox title="Eksamensoppgave-stil">
      <P>Hvilken gruppe mikroorganismer kan utføre nitrogenfiksering? a) Nitrosomonas b) Nitrobacter c) Sopp d) Cyanobakterier</P>
      <Collapsible title="Vis løsning">
        <P>Svar: <strong style={{color:"#E0E7FF"}}>d) Cyanobakterier</strong>. De er frittlevende, ikke-symbiotiske bakterier som fikserer N₂ i heterocyster. Nitrosomonas/Nitrobacter utfører nitrifikasjon, ikke fiksering. Sopp kan ikke fiksere N₂.</P>
      </Collapsible>
    </KeyBox>
    <KeyBox title="💡 Huskeregel">Cyanobakterier = «blågrønnalgene» som gjør ALT: fotosyntese (O₂), N₂-fiksering, primærproduksjon. Eneste phylum med oksisk fotosyntese.</KeyBox>
    <ExamBox>V2025 oppg 3: Cyanobakterier som eksempel på nitrogenfiksering. V2024 oppg 3b: Cyanobakterier = ikke-symbiotiske N₂-fikserere.</ExamBox>
  </div>
);

const GramNegTab = () => (
  <div>
    <SectionTitle>Nøkkelbegreper</SectionTitle>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Pill term="Proteobacteria" def="Største og mest mangfoldige phylum, Gram-negative" />
      <Pill term="Gammaproteobacteria" def="Største klasse, >1500 arter" />
      <Pill term="Enterobacterales" def="Enteriske bakterier, fakultativt aerobe staver" />
      <Pill term="Oksidase-test" def="Skiller Pseudomonas (+) fra Enterobacterales (−)" />
      <Pill term="Katalase-test" def="Spalter H₂O₂ til H₂O + O₂" />
      <Pill term="Koliforme" def="Indikatorbakterier for fekal forurensing" />
    </div>

    <SectionTitle>Forklaring</SectionTitle>
    <P><Org>Proteobacteria</Org> er det største og mest mangfoldige phylum. Deles i 6 klasser (alfa–zeta). <Term>Gammaproteobacteria</Term> er den største klassen med &gt;1500 arter og 15 ordener.</P>

    <KeyBox title="Enterobacterales — fenotypiske kjennetegn">
      G-negative staver | Fakultativt aerobe | Ikke-sporedannende | Mesofile | Kjemoorganotrofe | <Term>Oksidase-negative</Term> | <Term>Katalase-positive</Term> | Produserer syre fra glukose | Reduserer nitrat til nitritt. Slekter: <Org>Escherichia</Org>, <Org>Salmonella</Org>, <Org>Shigella</Org>, <Org>Klebsiella</Org>, <Org>Enterobacter</Org>, <Org>Proteus</Org>, <Org>Yersinia</Org>, <Org>Serratia</Org>.
    </KeyBox>

    <P>Fermenteringsmønstre deler dem i to grupper:<br/>
    • <strong style={{color:"#E0E7FF"}}>Blandet syrefermentering</strong>: <Org>Escherichia</Org>, <Org>Salmonella</Org>, <Org>Shigella</Org>, <Org>Proteus</Org>, <Org>Yersinia</Org><br/>
    • <strong style={{color:"#E0E7FF"}}>2,3-Butanediolfermentering</strong>: <Org>Enterobacter</Org>, <Org>Klebsiella</Org>, <Org>Serratia</Org></P>

    <P><Org>E. coli</Org>: Tarmbakterie, vitamin K-syntese, holder tarmen anaerob. <Term>EHEC</Term> = lav infeksjonsdose (10–100 celler), blodig diaré, HUS. Påvises på <Term>EMB-agar</Term> (grønnskjær).</P>

    <KeyBox title="Pseudomonadales & Vibrionales — vs. Enterobacterales">
      <Org>Pseudomonas</Org> og <Org>Vibrio</Org>: G-negative, <strong style={{color:"#E0E7FF"}}>aerobe</strong>, kjemoorganotrofe staver, <strong style={{color:"#E0E7FF"}}>polar flagellering</strong>, <Term>oksidase-positive</Term> (+ katalase-positive). Enkle næringskrav, mange C-kilder. <Org>Pseudomonas</Org> blant de første som vokser opp i næringsmidler. Nøkkelforskjell: <strong style={{color:"#FDE68A"}}>oksidase-test skiller dem fra Enterobacterales</strong>.
    </KeyBox>

    <SectionTitle>Visuell illustrasjon</SectionTitle>
    <svg viewBox="0 0 560 200" style={{ width: "100%", maxWidth: 560, margin: "12px auto", display: "block" }}>
      <rect width="560" height="200" rx="12" fill="rgba(139,92,246,0.05)" />
      <text x="280" y="22" textAnchor="middle" fill="#C4B5FD" fontSize="12" fontWeight="700" fontFamily="Plus Jakarta Sans">Differensiering av Gammaproteobacteria</text>
      {/* Enterobacterales box */}
      <rect x="20" y="45" width="170" height="140" rx="8" fill="rgba(52,211,153,0.08)" stroke="#34D399" strokeWidth="1" />
      <text x="105" y="63" textAnchor="middle" fill="#6EE7B7" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans">Enterobacterales</text>
      <text x="30" y="82" fill="#94A3B8" fontSize="8.5" fontFamily="Source Sans 3">Fakultativt aerobe</text>
      <text x="30" y="96" fill="#94A3B8" fontSize="8.5" fontFamily="Source Sans 3">Peritrik flagellering</text>
      <text x="30" y="110" fill="#F87171" fontSize="8.5" fontWeight="600" fontFamily="JetBrains Mono">Oksidase: NEGATIV</text>
      <text x="30" y="124" fill="#6EE7B7" fontSize="8.5" fontFamily="JetBrains Mono">Katalase: POSITIV</text>
      <text x="30" y="142" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3" fontStyle="italic">E. coli, Salmonella, Klebsiella</text>
      <text x="30" y="172" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3">Syre fra glukose</text>
      {/* Pseudomonadales box */}
      <rect x="200" y="45" width="160" height="140" rx="8" fill="rgba(139,92,246,0.08)" stroke="#8B5CF6" strokeWidth="1" />
      <text x="280" y="63" textAnchor="middle" fill="#C4B5FD" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans">Pseudomonadales</text>
      <text x="210" y="82" fill="#94A3B8" fontSize="8.5" fontFamily="Source Sans 3">Strikt aerobe</text>
      <text x="210" y="96" fill="#94A3B8" fontSize="8.5" fontFamily="Source Sans 3">Polar flagellering</text>
      <text x="210" y="110" fill="#34D399" fontSize="8.5" fontWeight="600" fontFamily="JetBrains Mono">Oksidase: POSITIV</text>
      <text x="210" y="124" fill="#6EE7B7" fontSize="8.5" fontFamily="JetBrains Mono">Katalase: POSITIV</text>
      <text x="210" y="142" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3" fontStyle="italic">Pseudomonas</text>
      <text x="210" y="158" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3">Mange C-kilder</text>
      <text x="210" y="172" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3">Først i næringsmidler</text>
      {/* Vibrionales box */}
      <rect x="370" y="45" width="170" height="140" rx="8" fill="rgba(251,191,36,0.08)" stroke="#FBBF24" strokeWidth="1" />
      <text x="455" y="63" textAnchor="middle" fill="#FDE68A" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans">Vibrionales</text>
      <text x="380" y="82" fill="#94A3B8" fontSize="8.5" fontFamily="Source Sans 3">Aerobe</text>
      <text x="380" y="96" fill="#94A3B8" fontSize="8.5" fontFamily="Source Sans 3">Polar flagellering</text>
      <text x="380" y="110" fill="#34D399" fontSize="8.5" fontWeight="600" fontFamily="JetBrains Mono">Oksidase: POSITIV</text>
      <text x="380" y="124" fill="#6EE7B7" fontSize="8.5" fontFamily="JetBrains Mono">Katalase: POSITIV</text>
      <text x="380" y="142" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3" fontStyle="italic">Vibrio, Photobacterium</text>
      <text x="380" y="158" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3">Marine/akvatiske</text>
    </svg>

    <SectionTitle>Eksempel</SectionTitle>
    <KeyBox title="V2025-stil: Bakterieidentifikasjon">
      <P>Du isolerer en G-negativ stav som er aerob, oksidase-positiv, katalase-positiv, med polar flagellering. Den vokser raskt på mange karbonkilder og er blant de første mikroorganismene i kjølte matvarer. Hvilken slekt?</P>
      <Collapsible title="Vis løsning"><P>Svar: <Org>Pseudomonas</Org>. Oksidase-positiv skiller den fra Enterobacterales. Aerob + polar flagellering + mange C-kilder + tidlig vekst i mat = typisk Pseudomonas.</P></Collapsible>
    </KeyBox>
    <KeyBox title="💡 Huskeregel">Oksidase-testen er nøkkelen: <strong style={{color:"#F87171"}}>Enterobacterales = oksidase NEGATIV</strong>. <strong style={{color:"#34D399"}}>Pseudomonas/Vibrio = oksidase POSITIV</strong>.</KeyBox>
    <ExamBox>V2024 oppg 10d: Slekt tilhørende Enterobacteriales → Salmonella (ikke Pseudomonas/Vibrio). V2025 oppg 8: Bakterieidentifikasjon fra metabolsk beskrivelse (9p).</ExamBox>
  </div>
);

const FirmicutesTab = () => (
  <div>
    <SectionTitle>Nøkkelbegreper</SectionTitle>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Pill term="Firmicutes" def="Gram-positive bakterier, lavt GC-innhold" />
      <Pill term="Lactobacillales" def="Melkesyrebakterier, fermentativ metabolisme" />
      <Pill term="Endospore" def="Varmeresistent hvilestruktur" />
      <Pill term="GRAS" def="Generally Recognized As Safe" />
      <Pill term="Biokonservering" def="Bruk av MSB for å øke mattryggheten" />
    </div>

    <SectionTitle>Forklaring</SectionTitle>
    <P><strong style={{color:"#E0E7FF"}}>Lactobacillales — Melkesyrebakterier (MSB):</strong> Aerotolerante, anaerobe, ikke-sporedannende, oksidase- og katalase-negative. <Term>Fermentativ metabolisme</Term> med melkesyre som viktigste produkt. Store næringskrav (aminosyrer, vitaminer, puriner, pyrimidiner). De fleste har <Term>GRAS</Term>-status.</P>
    <P>Kokkeformede: <Org>Streptococcus</Org>, <Org>Lactococcus</Org>, <Org>Leuconostoc</Org>, <Org>Enterococcus</Org>. Stavformede: <Org>Lactobacillus</Org>.<br/>
    <Term>Homofermentativ</Term>: Laktose → melkesyre (2 ATP/glukose).<br/>
    <Term>Heterofermentativ</Term>: Laktose → melkesyre + etanol + CO₂.</P>
    <P><Org>L. delbrueckii</Org> subsp. <Org>bulgaricus</Org> + <Org>S. thermophilus</Org> = yoghurtstartkulturer. <Term>Biokonservering</Term>: MSB produserer bacteriociner og organiske syrer som senker pH.</P>
    <P>Patogene <Org>Streptococcus</Org>-arter: <Org>S. pyogenes</Org> (halsbetennelse, nekrotiserende fasciitt), <Org>S. mutans</Org> (plakk), <Org>S. pneumoniae</Org> (lungebetennelse).</P>

    <P><strong style={{color:"#E0E7FF"}}>Bacillales — Staphylococcus:</strong> Fakultativ aerob, <Term>katalase-positiv</Term> (skiller fra Streptococcus). Resistent mot lav a_w. <Org>S. aureus</Org>: enterotoksiner, matforgiftning, MRSA.</P>

    <P><strong style={{color:"#E0E7FF"}}>Bacillales & Clostridiales — Endosporedannere:</strong><br/>
    <Org>Bacillus</Org>: Aerobe/fakultativt aerobe sporedannere. <Org>B. cereus</Org> (matforgiftning, ris), <Org>B. thuringiensis</Org> (biopesticid).<br/>
    <Org>Clostridium</Org>: <Term>Obligat anaerobe</Term> sporedannere. <Org>C. botulinum</Org> (nevrotoksin), <Org>C. tetani</Org> (stivkrampe), <Org>C. perfringens</Org> (gassgangren).<br/>
    Isolering av sporedannere: Oppvarming 80°C i 10 min (dreper vegetative celler).</P>

    <SectionTitle>Eksempel</SectionTitle>
    <KeyBox title="V2024-stil: Finn riktig kombinasjon">
      <P><Org>B. thuringiensis</Org> → biopesticid | <Org>C. perfringens</Org> → gassgangren (anaerobt) | <Org>B. cereus</Org> → matforgiftning (ris) | <Org>S. pyogenes</Org> → halsbetennelse, nekrotiserende fasciitt | <Org>S. aureus</Org> → hudinfeksjoner, matforgiftning | <Org>L. delbrueckii</Org> → yoghurt (melkesyre) | <Org>S. thermophilus</Org> → yoghurt (varmetolerant)</P>
    </KeyBox>
    <KeyBox title="💡 Huskeregel">MSB = «Katalase-negativ, oksidase-negativ, ikke-sporedannende, fermentativ». <Org>Bacillus</Org> = aerob spore. <Org>Clostridium</Org> = anaerob spore.</KeyBox>
    <ExamBox>V2024 oppg 10a: «Aerotolerante anaerobe, ikke-sporedannende, oksidase- og katalase-negative» → Lactobacillus. V2024 oppg 11: Sopp vs gjærsopp (5p). Firmicutes-oppsummering er fast flervalgsoppgave.</ExamBox>
  </div>
);

const ActinoTab = () => (
  <div>
    <SectionTitle>Nøkkelbegreper</SectionTitle>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Pill term="Actinobacteria" def="Høyt GC-innhold, Gram-positive" />
      <Pill term="Streptomyces" def="Filamentøs vekst, antibiotikaredusent" />
      <Pill term="Mycobacterium" def="Syrefaste bakterier, mykolinsyre" />
      <Pill term="Mycoplasma" def="Mangler cellevegg" />
      <Pill term="Konidier" def="Aseksuelle sporer hos actinomyceter" />
    </div>

    <SectionTitle>Forklaring</SectionTitle>
    <P><Org>Actinobacteria</Org> har <Term>høyt GC-innhold</Term> i DNA (mer stabil DNA). Viktige grupper:</P>
    <P><strong style={{color:"#E0E7FF"}}>Mycobacterium:</strong> Jordbakterier, de fleste ikke patogene. Unntak: <Org>M. tuberculosis</Org>. <Term>Syrefaste</Term> bakterier pga. spesielle lipider (<Term>mykolinsyre</Term>). Saktevoksende (generasjonstid 18–24 timer).</P>
    <P><strong style={{color:"#E0E7FF"}}>Streptomyces:</strong> Over 600 arter. Danner <Term>filamenter</Term> som ligner soppenes mycel. <Term>Substratmycel</Term> (på/i substratet) og <Term>luftmycel</Term> (over). Danner <Term>konidier</Term> (ikke endosporer). Ca. 50% produserer <Term>antibiotika</Term> (tetrasyklin, streptomycin, kloramfenikol). Jordbakterier med enkle vekstkrav, mange C-kilder.</P>
    <P><strong style={{color:"#E0E7FF"}}>Mycoplasma:</strong> <Term>Mangler cellevegg</Term> — unikt blant bakterier. Svært små celler. Patogene arter finnes.</P>

    <SectionTitle>Eksempel</SectionTitle>
    <KeyBox title="Flervalg — V2024-stil">
      <P>Bakterie med filamentøs vekst: a) Streptomyces b) Mycoplasma c) Streptococcus d) Staphylococcus</P>
      <Collapsible title="Vis løsning"><P>Svar: <strong style={{color:"#E0E7FF"}}>a) Streptomyces</strong>. Filamentøs vekst med substrat- og luftmycel er unikt for Streptomyces blant disse alternativene.</P></Collapsible>
    </KeyBox>
    <KeyBox title="💡 Huskeregel"><Org>Streptomyces</Org> = «Strep-antibiotika-mycel» — ligner sopp men er bakterie. <Org>Mycoplasma</Org> = «Myco-ingen-vegg» — eneste bakterie uten cellevegg.</KeyBox>
    <ExamBox>V2024 oppg 10b-c: «Mangler cellevegg» → Mycoplasma. «Filamentøs vekst» → Streptomyces. Disse to er faste MC-spørsmål.</ExamBox>
  </div>
);

const ArchaeaTab = () => (
  <div>
    <SectionTitle>Nøkkelbegreper</SectionTitle>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Pill term="Archaea" def="Prokaryoter, eget domene, ofte ekstremofile" />
      <Pill term="Metanogene" def="Obligat anaerobe, CO₂+H₂→CH₄" />
      <Pill term="Halofile" def="Krever ≥9% NaCl" />
      <Pill term="Hypertermofile" def="Optimum >80°C" />
      <Pill term="Termoacidofile" def="Høy temp + lav pH" />
    </div>

    <SectionTitle>Forklaring</SectionTitle>
    <P><Org>Archaea</Org> er prokaryoter i eget domene. Alle er <Term>kjemotrofe</Term>, mange er <Term>litotrofe</Term>. Forbindes først og fremst med <Term>ekstremofile</Term> organismer, men lever også i «normale» miljøer. Mange er ennå ikke dyrket. Ingen kjente patogene arter, men viktige for tarmhelse.</P>
    <P><strong style={{color:"#E0E7FF"}}>Metanogene:</strong> <Term>Obligat anaerobe</Term>. <Formula>CO₂ + H₂ → CH₄ + H₂O + energi</Formula>. Finnes i slam, avfallsdeponier, vommen hos drøvtyggere. Slekter: <Org>Methanobacterium</Org>, <Org>Methanococcus</Org>.</P>
    <P><strong style={{color:"#E0E7FF"}}>Ekstremt halofile:</strong> Krever minst 9% NaCl, noen lever i mettet saltløsning (32%). Saltsjøer, klippfisk. K⁺ som kompatibel forbindelse. <Org>Halobacterium</Org>, <Org>Halococcus</Org>.</P>
    <P><strong style={{color:"#E0E7FF"}}>Hypertermofile:</strong> Optimum &gt;80°C (noen &gt;100°C). Anaerobe, mange bruker H₂ som energikilde. De fleste er kjemoautotrofe. Spesielle varmestabile proteiner og membraner.</P>
    <P><strong style={{color:"#E0E7FF"}}>Termoacidofile:</strong> Høy temperatur + lav pH. <Org>Picrophilus</Org> (optimum pH 0.7!).</P>
    <P>Forskjeller fra Bacteria: Membran med eterbundne isoprenlipider (ikke fettsyrer), ingen peptidoglykan i cellevegg, noen har lipid monolag.</P>

    <SectionTitle>Eksempel</SectionTitle>
    <KeyBox title="💡 Huskeregel">Archaea-ekstremer: «<strong style={{color:"#E0E7FF"}}>MHT</strong>» = Metanogene (anaerobe, CH₄), Halofile (salt), Termofile (varme). Men husk: ikke alle Archaea er ekstremofile!</KeyBox>
    <ExamBox>Archaea dukker ofte opp i kontekst av miljøfaktorer (temperatur, pH, salinitet) og kretsløp (metanogenese i karbonsyklusen). Forskjeller Bacteria vs Archaea kan komme som sammenligningsspørsmål.</ExamBox>
  </div>
);

const SoppTab = () => (
  <div>
    <SectionTitle>Nøkkelbegreper</SectionTitle>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Pill term="Kitin" def="Polymer i soppcellevegg, gir styrke" />
      <Pill term="Hyfe" def="Trådformet forgrenet celle" />
      <Pill term="Mycel" def="Nettverk av hyfer" />
      <Pill term="Konidier" def="Aseksuelle sporer" />
      <Pill term="Ascosporer" def="Seksuelle sporer (Ascomycota)" />
      <Pill term="Mycorrhiza" def="Symbiotisk sopprot" />
      <Pill term="Saprofytt" def="Lever av dødt organisk materiale" />
    </div>

    <SectionTitle>Forklaring</SectionTitle>
    <P>Sopp er <Term>eukaryote</Term> organismer med rigid cellevegg med <Term>kitin</Term>. <Term>Kjemoorganotrofe</Term> og <Term>heterotrofe</Term>, enkle næringskrav. De fleste er aerobe. Nærmest beslektet dyr. Ca. 100 000 kjente arter. Viktige som nedbrytere av dødt organisk materiale (<Term>saprofytter</Term>).</P>

    <P><strong style={{color:"#E0E7FF"}}>Gjærsopp:</strong> Encellede, runde/ovale celler. <Term>Fakultativ aerobe</Term>. Deler seg ved <Term>knoppskyting</Term>. Kolonier ligner bakteriekolonier. Hovedsakelig i phylum <Org>Ascomycota</Org>. Eksempler: <Org>Saccharomyces</Org>, <Org>Candida</Org>.</P>
    <P><strong style={{color:"#E0E7FF"}}>Muggsopp/hyfesopp:</strong> Flercellet. <Term>Hyfer</Term> (trådformet) danner <Term>mycel</Term> (nettverk). Kan være septerte eller asepterte. <Term>Obligat aerobe</Term>. Lodne/hårete kolonier med ulik pigmentering. Eksempler: <Org>Aspergillus</Org>, <Org>Penicillium</Org>.</P>

    <P><strong style={{color:"#E0E7FF"}}>Reproduksjon:</strong> Aseksuell (hyfevekst, konidier, knoppskyting) og seksuell (ascosporer i <Org>Ascomycota</Org>, basidiosporer, zygosporer).</P>

    <P><strong style={{color:"#E0E7FF"}}>Industriell bruk:</strong><br/>
    • <Org>Saccharomyces cerevisiae</Org>: Brød (CO₂), vin/øl (etanol)<br/>
    • <Org>Aspergillus oryzae</Org>: Sake, soyasaus<br/>
    • <Org>Penicillium roqueforti</Org>: Blåmuggost<br/>
    • <Org>Penicillium camemberti</Org>: Camembert<br/>
    • <Org>Streptomyces</Org> (bakterie, ikke sopp): Antibiotika</P>
    <P><Term>Mycorrhiza</Term> (sopprot): Symbiose mellom sopp og planterøtter. Sopp får sukker, plante får nitrogen og fosfat.</P>

    <SectionTitle>Visuell illustrasjon</SectionTitle>
    <SoppStructureSVG />

    <SectionTitle>Eksempel</SectionTitle>
    <KeyBox title="V2024 oppg 11 / V2025 oppg 2 — Gjærsopp vs muggsopp">
      <P>1) <strong style={{color:"#E0E7FF"}}>Celleform</strong>: Gjærsopp = encellet, oval. Muggsopp = flercellet hyfer/mycel.<br/>
      2) <strong style={{color:"#E0E7FF"}}>Koloniutseende</strong>: Gjærsopp ligner bakteriekolonier. Muggsopp = lodne, hårete, pigmenterte.<br/>
      3) <strong style={{color:"#E0E7FF"}}>pH-toleranse</strong>: Sopp generelt pH 4–6. Gjærsopp tåler lavere pH.<br/>
      4) <strong style={{color:"#E0E7FF"}}>O₂-krav</strong>: Gjærsopp = fakultativ aerob. Muggsopp = obligat aerob.<br/>
      5) <strong style={{color:"#E0E7FF"}}>Industriell bruk</strong>: Gjær → brød, øl, vin. Mugg → blåmuggost, sake, antibiotika.</P>
    </KeyBox>
    <KeyBox title="💡 Huskeregel">Gjær = «encellet, fakultativ, knopper». Mugg = «flercellet, obligat aerob, hyfer/mycel».</KeyBox>
    <ExamBox>Sopp er en FAST skriftlig oppgave (V2023: 4p, V2024: 5p, V2025: 8p). Gjærsopp vs muggsopp + industriell bruk er alltid med. Husk celleform, O₂-krav, koloniutseende, minst 2 industrieksempler.</ExamBox>
  </div>
);

const AlgerTab = () => (
  <div>
    <SectionTitle>Nøkkelbegreper</SectionTitle>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Pill term="Alger" def="Eukaryote, fototrofe organismer (ikke planter)" />
      <Pill term="Rødalger" def="Marine, phycoerythrin (rød farge), klorofyll a" />
      <Pill term="Grønnalger" def="Klorofyll a+b, cellulose cellevegg" />
      <Pill term="Endosymbiose" def="Opphav til mitokondrier og kloroplaster" />
    </div>

    <SectionTitle>Forklaring</SectionTitle>
    <P><Term>Alger</Term> er encellede og flercellede eukaryoter med fotosyntese (som ikke er planter). De er fototrofe.</P>
    <P><strong style={{color:"#E0E7FF"}}>Rødalger:</strong> Marine miljøer, encellede og flercellede, mikroskopiske og makroskopiske. <Term>Fototrofe</Term> med <Term>klorofyll a</Term>, rød farge fra <Term>phycoerythrin</Term>. Industriell bruk: <Term>nori</Term> (mat), <Term>karagenan</Term> (fortykningsmiddel), <Term>agarose</Term> (gel for mikrobiologi).</P>
    <P><strong style={{color:"#E0E7FF"}}>Grønnalger:</strong> Klorofyll a + b, cellulose i cellevegg. Nært beslektet landplanter.</P>
    <P><Term>Endosymbiose</Term>: Mitokondrier stammet fra respirerende bakterie, kloroplaster fra fototrof bakterie (primær endosymbiose). Sekundær endosymbiose: Celle med endosymbiont tatt opp av ny vertscelle.</P>

    <SectionTitle>Eksempel</SectionTitle>
    <KeyBox title="💡 Huskeregel">Rødalger = «rød + marin + agarose» — agarose brukes i hele laben! Grønnalger = «grønn + cellulose + nær planter».</KeyBox>
    <ExamBox>Alger er lavt prioritert på eksamen, men kan dukke opp i kontekst av endosymbiose eller som del av eukaryot mikrobielle organismer. Industriell bruk av rødalger (agarose) kan kobles til lab-teknikker.</ExamBox>
  </div>
);

const KarbonTab = () => (
  <div>
    <SectionTitle>Nøkkelbegreper</SectionTitle>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Pill term="Karbonsyklusen" def="Sirkulasjon av C mellom land, atmosfære og hav" />
      <Pill term="CO₂-fiksering" def="Autotrofe omdanner uorganisk C til organisk" />
      <Pill term="Primærproduksjon" def="Produksjon av nytt organisk materiale" />
      <Pill term="Respirasjon" def="Organisk C → CO₂ (alle heterotrofe)" />
      <Pill term="Metanogenese" def="Anaerob produksjon av CH₄" />
    </div>

    <SectionTitle>Forklaring</SectionTitle>
    <P><Term>Karbonsyklusen</Term> = sirkulasjon av karbon mellom land, atmosfære og hav. Karbon finnes som CO₂, CO, CH₄, organisk materiale (CH₂O)ₙ, og i sedimenter (største karbonlager).</P>
    <P><strong style={{color:"#E0E7FF"}}>CO₂-redokssyklus — kobling fotosyntese ↔ respirasjon:</strong><br/>
    Fotosyntese: <Formula>CO₂ + H₂O → (CH₂O)ₙ + O₂</Formula> (autotrofe organismer)<br/>
    Respirasjon: <Formula>(CH₂O)ₙ + O₂ → CO₂ + H₂O</Formula> (alle heterotrofe)</P>
    <P>Viktigste kilde til CO₂ i atmosfæren: <Term>mikrobielle respirasjonsprosesser</Term> (nedbrytning av dødt organisk materiale).</P>
    <P>Under anaerobe forhold: <Term>metanogenese</Term> (<Org>Archaea</Org>) → CH₄. <Term>Metanotrofi</Term> → CH₄ oksideres tilbake til CO₂.</P>
    <P><strong style={{color:"#F87171"}}>Menneskelig påvirkning:</strong> Forbrenning av karbon lagret som <Term>fossilt brennstoff</Term> → økt CO₂ i atmosfæren → havforsuring → redusert dannelse av kalsiumskall (korallrev).</P>
    <P>C- og N-syklus er <Term>tett koblet</Term>: Karbonfiksering og plantevekst er ofte begrenset av tilgjengelig nitrogen. Høye NH₄⁺-verdier stimulerer primærproduksjon.</P>

    <SectionTitle>Visuell illustrasjon</SectionTitle>
    <CarbonCycleSVG />

    <SectionTitle>Eksempel</SectionTitle>
    <KeyBox title="V2025-stil flervalg">
      <P>1) Hvilke organismer danner grunnlaget for karbonsyklusen? → <strong style={{color:"#E0E7FF"}}>Fototrofe</strong> (CO₂-fiksering)<br/>
      2) Menneskelig aktivitet har forstyrret karbonsyklusen gjennom → <strong style={{color:"#E0E7FF"}}>Forbrenning av fossilt brennstoff → økt CO₂</strong><br/>
      3) Primærproduksjon stimuleres av → <strong style={{color:"#E0E7FF"}}>Lav mengde NH₄⁺ → lav N-fiksering? NEI: Høy mengde NH₄⁺ stimulerer primærproduksjon</strong></P>
      <Collapsible title="Vis detaljer om primærproduksjon">
        <P>Høye NH₄⁺-verdier stimulerer primærproduksjon (mer N tilgjengelig for planter). Men dette stimulerer også nitrifikasjon (NH₄⁺→NO₃⁻), som igjen kan føre til denitrifikasjon (fjerner N fra miljøet). Balanse!</P>
      </Collapsible>
    </KeyBox>
    <KeyBox title="💡 Huskeregel">Karbonsyklusen i ett bilde: <strong style={{color:"#34D399"}}>Fotosyntese ↓</strong> (CO₂ → organisk) og <strong style={{color:"#F87171"}}>Respirasjon ↑</strong> (organisk → CO₂). To piler, evig syklus.</KeyBox>
    <ExamBox>V2025 oppg 3: 8 MC-spørsmål om kretsløp! Oppg 1, 5, 8 handler om karbonsyklusen. Husk: fototrofe = grunnlag, fossilt brennstoff = menneskelig forstyrrelse, CO₂ → havforsuring.</ExamBox>
  </div>
);

const NitrogenTab = () => (
  <div>
    <SectionTitle>Nøkkelbegreper</SectionTitle>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
      <Pill term="Nitrogenfiksering" def="N₂ → NH₃, nitrogenase, 16 ATP" />
      <Pill term="Ammonifikasjon" def="Organisk N → NH₄⁺ (mineralisering)" />
      <Pill term="Nitrifikasjon" def="NH₄⁺ → NO₂⁻ → NO₃⁻ (oksisk jord)" />
      <Pill term="Denitrifikasjon" def="NO₃⁻ → N₂O/N₂ (anaerobe forhold)" />
      <Pill term="Nitrogenase" def="Oksygenfølsomt enzym for N₂-fiksering" />
      <Pill term="N₂O" def="Dinitrogenoksid, 300× sterkere klimagass enn CO₂" />
      <Pill term="Comammox" def="Komplett NH₄⁺→NO₃⁻ av Nitrospira" />
    </div>

    <SectionTitle>Forklaring</SectionTitle>
    <P>Nitrogen finnes i proteiner og nukleinsyrer. Få organismer kan utnytte N₂ direkte. Bundet nitrogen: NH₃/NH₄⁺, NO₃⁻, organisk N.</P>

    <KeyBox title="1. Nitrogenfiksering (N₂ → NH₃)">
      <Formula>N₂ + 8H → 2NH₃ + H₂</Formula> (energikrevende: 16 ATP). Krever <Term>nitrogenase</Term> (oksygenfølsomt). Nedreguleres når NH₃ er tilgjengelig.<br/><br/>
      <strong style={{color:"#E0E7FF"}}>Frittlevende aerobe:</strong> <Org>Cyanobakterier</Org> (heterocyster), <Org>Azotobacter</Org> (slimlag + høy respirasjon)<br/>
      <strong style={{color:"#E0E7FF"}}>Frittlevende anaerobe:</strong> <Org>Clostridium</Org>, <Org>Klebsiella</Org> (fakultativ, kun anaerobt)<br/>
      <strong style={{color:"#E0E7FF"}}>Symbiotiske:</strong> <Org>Rhizobium</Org> (planterøtter)
    </KeyBox>

    <KeyBox title="2. Ammonifikasjon (organisk N → NH₄⁺)">
      Nedbrytere bryter ned proteiner → aminosyrer → NH₃. Også: DNRA (dissimilativ nitratreduksjon til ammonium) i anoksiske miljø.
    </KeyBox>

    <KeyBox title="3. Nitrifikasjon (NH₄⁺ → NO₃⁻) — oksisk jord">
      To trinn:<br/>
      1) <Formula>NH₄⁺ → NO₂⁻</Formula> (<Org>Nitrosomonas</Org>, betaproteobakterie, kjemolitoautotrof)<br/>
      2) <Formula>NO₂⁻ → NO₃⁻</Formula> (<Org>Nitrobacter</Org>, alfaproteobakterie, kjemolitoautotrof)<br/>
      Eller: <Term>Comammox</Term> (<Org>Nitrospira</Org>): NH₄⁺ → NO₃⁻ direkte.
    </KeyBox>

    <KeyBox title="4. Denitrifikasjon (NO₃⁻ → N₂/N₂O) — anaerobe forhold">
      NO₃⁻ som elektronakseptor i anaerob respirasjon → N₂O + N₂. Utføres av <Org>Pseudomonas</Org>, <Org>Bacillus licheniformis</Org>, <Org>Paracoccus denitrificans</Org>.<br/><br/>
      <strong style={{color:"#F87171"}}>N₂O er 300× sterkere klimagass enn CO₂!</strong><br/>
      Positiv effekt: Ønsket i avløpsrensing (fjerner N). Negativ: Tap av plantenæring, klimagass.
    </KeyBox>

    <P><strong style={{color:"#F87171"}}>Menneskelig påvirkning — gjødsel-problemet:</strong> N-gjødsel → økt NH₃ → nitrifikasjon → mye NO₃⁻ → mye nedbør → anoksisk jord → voldsom denitrifikasjon → N₂O-utslipp. Fiksert N fjernes raskt fra jorden.</P>

    <SectionTitle>Visuell illustrasjon</SectionTitle>
    <NitrogenCycleSVG />

    <SectionTitle>Eksempel</SectionTitle>
    <KeyBox title="V2025 flervalg + V2024 nedtrekk — komplett sett">
      <P>a) Biologisk reduksjon av N₂ = <strong style={{color:"#E0E7FF"}}>nitrogenfiksering</strong><br/>
      b) Cyanobakterier = <strong style={{color:"#E0E7FF"}}>ikke-symbiotiske</strong> som utfører <strong style={{color:"#E0E7FF"}}>nitrogenfiksering</strong><br/>
      c) Nitrifikasjon foregår i <strong style={{color:"#E0E7FF"}}>oksygenrik</strong> jord, utføres av <strong style={{color:"#E0E7FF"}}>Nitrosomonas</strong><br/>
      d) Prosessen som returnerer N til atmosfæren = <strong style={{color:"#E0E7FF"}}>denitrifikasjon</strong>, foregår i <strong style={{color:"#E0E7FF"}}>oksygenfattig</strong> jord → <strong style={{color:"#E0E7FF"}}>dinitrogenoksid (N₂O)</strong><br/>
      e) Bruk av nitrogengjødsel → <strong style={{color:"#E0E7FF"}}>øker N₂O fra denitrifikasjon → global oppvarming</strong><br/>
      f) Nitrogenfiksering fører til → <strong style={{color:"#E0E7FF"}}>økt biotilgjengelighet av N</strong></P>
    </KeyBox>
    <KeyBox title="💡 Huskeregel">
      Syklusen i rekkefølge: <strong style={{color:"#34D399"}}>Fiksering</strong> (N₂→NH₃) → <strong style={{color:"#8B5CF6"}}>Ammonifikasjon</strong> (organisk→NH₄⁺) → <strong style={{color:"#FBBF24"}}>Nitrifikasjon</strong> (NH₄⁺→NO₃⁻, oksisk) → <strong style={{color:"#F87171"}}>Denitrifikasjon</strong> (NO₃⁻→N₂, anoksisk). «FAND» = Fiksering, Ammonifikasjon, Nitrifikasjon, Denitrifikasjon.
    </KeyBox>
    <ExamBox>V2025 oppg 3: 8 MC-spørsmål der 5-6 handler om N-syklusen! V2024 oppg 3: 8 nedtrekk om N-syklusen. V2023 oppg 11: Skriftlig om nitrogenfiksering, O₂-utfordringer, heterocyster, gjødsling→N₂O (8p). Dette er den mest testede enkelt-temaet i hele kurset.</ExamBox>
  </div>
);

const TAB_CONTENT = {
  taksonomi: TaksonomTab,
  fototrofe: FototrofeTab,
  gramneg: GramNegTab,
  firmicutes: FirmicutesTab,
  actino: ActinoTab,
  archaea: ArchaeaTab,
  sopp: SoppTab,
  alger: AlgerTab,
  karbon: KarbonTab,
  nitrogen: NitrogenTab,
};

// ─── Quiz Cards ───
const QUIZ_CARDS = [
  { q: "Hva er de tre domenene i det fylogenetiske treet?", a: "Bacteria, Archaea og Eukarya. Basert på 16S rRNA-gensekvenser (Carl Woese, 1970-tallet). Eukarya utviklet seg fra Archaea." },
  { q: "Hva skiller Enterobacterales fra Pseudomonadales?", a: "Oksidase-test: Enterobacterales = oksidase-NEGATIV. Pseudomonadales = oksidase-POSITIV. Begge er katalase-positive. Enterobacterales er fakultativt aerobe (peritrik flagellering), Pseudomonadales er strikt aerobe (polar flagellering)." },
  { q: "Beskriv de viktigste kjennetegnene til melkesyrebakterier (Lactobacillales).", a: "Aerotolerante anaerobe, ikke-sporedannende, oksidase- og katalase-negative. Fermentativ metabolisme med melkesyre som viktigste produkt. Store næringskrav. De fleste har GRAS-status. Eksempler: Lactobacillus, Streptococcus, Lactococcus." },
  { q: "Hva er forskjellen mellom Bacillus og Clostridium?", a: "Begge danner endosporer. Bacillus = aerobe/fakultativt aerobe. Clostridium = obligat anaerobe. Isolering: Oppvarming 80°C i 10 min dreper vegetative celler, kun sporer overlever." },
  { q: "Hva er forskjellen mellom gjærsopp og muggsopp?", a: "Gjærsopp: Encellet, oval, fakultativ aerob, knoppskyting, kolonier ligner bakterier. Muggsopp: Flercellet hyfer/mycel, obligat aerob, lodne kolonier. Felles: Eukaryot, kitin i cellevegg, kjemoorganotrof." },
  { q: "Beskriv nitrogenfiksering — reaksjon, enzymer og organismer.", a: "N₂ + 8H → 2NH₃ + H₂. Krever nitrogenase (oksygenfølsomt) og 16 ATP. Frittlevende: Cyanobakterier (heterocyster), Azotobacter, Clostridium. Symbiotisk: Rhizobium (planterøtter)." },
  { q: "Hva er nitrifikasjon, og hvilke organismer utfører den?", a: "Oksidasjon av NH₄⁺ → NO₃⁻ i oksygenrik jord. To trinn: 1) NH₄⁺ → NO₂⁻ (Nitrosomonas), 2) NO₂⁻ → NO₃⁻ (Nitrobacter). Comammox (Nitrospira) gjør begge trinn." },
  { q: "Hvordan kan nitrogengjødsel føre til økt N₂O-utslipp?", a: "Gjødsel (NH₃) → nitrifikasjon → mye NO₃⁻. Nedbør → anoksisk jord → denitrifikasjon (NO₃⁻ → N₂O/N₂). N₂O er 300× sterkere klimagass enn CO₂." },
  { q: "Hvilke organismer danner grunnlaget for karbonsyklusen?", a: "Fototrofe organismer (CO₂-fiksering). De produserer nytt organisk materiale ved fotosyntese: CO₂ + H₂O → (CH₂O)ₙ + O₂." },
  { q: "Hva kjennetegner Archaea? Gi tre typer ekstremofile.", a: "Prokaryoter, eget domene, kjemotrofe (mange litotrofe). Ingen peptidoglykan, eterbundne lipider. 1) Metanogene (obligat anaerobe, CO₂+H₂→CH₄), 2) Ekstremt halofile (≥9% NaCl), 3) Hypertermofile (optimum >80°C)." },
  { q: "Hva er Streptomyces, og hvorfor er den viktig?", a: "Gram-positiv, phylum Actinobacteria. Filamentøs vekst (substrat- og luftmycel). Danner konidier (ikke endosporer). Ca. 50% produserer antibiotika (tetrasyklin, streptomycin, kloramfenikol). Jordbakterie." },
  { q: "Gi tre industrielle eksempler på bruk av sopp.", a: "1) Saccharomyces cerevisiae: Brødbaking (CO₂) og vin/øl (etanol). 2) Aspergillus oryzae: Sake, soyasaus. 3) Penicillium roqueforti: Blåmuggost. 4) Penicillium: Antibiotika (penicillin)." },
];

// ─── Main Component ───
export default function Emne5TaksonomDiversitetKretsloep() {
  const [activeTab, setActiveTab] = useState("taksonomi");
  const [visited, setVisited] = useState(new Set(["taksonomi"]));
  const [quizIdx, setQuizIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const contentRef = useRef(null);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setVisited(prev => new Set([...prev, id]));
    if (contentRef.current) contentRef.current.scrollTop = 0;
  };

  const TabContent = TAB_CONTENT[activeTab];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .tab-scroll::-webkit-scrollbar { height: 4px; }
        .tab-scroll::-webkit-scrollbar-track { background: transparent; }
        .tab-scroll::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.3); border-radius: 4px; }
        
        .content-scroll::-webkit-scrollbar { width: 5px; }
        .content-scroll::-webkit-scrollbar-track { background: transparent; }
        .content-scroll::-webkit-scrollbar-thumb { background: rgba(139,92,246,0.2); border-radius: 4px; }
        
        .quiz-card { perspective: 1000px; cursor: pointer; }
        .quiz-inner { 
          transition: transform 0.6s cubic-bezier(0.4,0,0.2,1); 
          transform-style: preserve-3d; 
          position: relative; 
        }
        .quiz-inner.flipped { transform: rotateY(180deg); }
        .quiz-front, .quiz-back { 
          backface-visibility: hidden; 
          position: absolute; 
          top: 0; left: 0; 
          width: 100%; height: 100%; 
          border-radius: 14px; 
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .quiz-front { background: linear-gradient(145deg, #1E293B 0%, #1a1f3a 100%); border: 1px solid rgba(139,92,246,0.3); }
        .quiz-back { background: linear-gradient(145deg, #1a2540 0%, #1E293B 100%); border: 1px solid rgba(52,211,153,0.3); transform: rotateY(180deg); }
      `}</style>

      <div style={{
        fontFamily: "'Source Sans 3', sans-serif",
        backgroundColor: "#0F172A",
        minHeight: "100vh",
        color: "#F8FAFC",
      }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #1a1040 0%, #0F172A 50%, #0c1a2e 100%)",
          borderBottom: "2px solid rgba(139,92,246,0.3)",
          padding: "20px 24px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
            <div style={{
              background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
              borderRadius: 8,
              padding: "6px 12px",
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 700,
              fontSize: "0.85rem",
              color: "#fff",
            }}>EMNE 5</div>
            <div style={{ fontSize: "0.78rem", color: "#64748B", fontFamily: "'JetBrains Mono', monospace" }}>MATV1007 — V2026</div>
          </div>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "1.5rem",
            fontWeight: 800,
            background: "linear-gradient(135deg, #C4B5FD, #8B5CF6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1.2,
          }}>Taksonomi, mikrobiell diversitet og naturens kretsløp</h1>
          <p style={{ color: "#94A3B8", fontSize: "0.82rem", marginTop: 6 }}>
            Klassifisering · Bakteriediversitet · Sopp & alger · Archaea · Karbon- og nitrogensyklusen
          </p>
          {/* Progress */}
          <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
            {TABS.map(t => (
              <div key={t.id} style={{
                flex: 1,
                height: 3,
                borderRadius: 2,
                backgroundColor: visited.has(t.id) ? "#8B5CF6" : "rgba(139,92,246,0.15)",
                transition: "background-color 0.3s",
              }} />
            ))}
          </div>
          <div style={{ fontSize: "0.72rem", color: "#64748B", marginTop: 4 }}>
            {visited.size}/{TABS.length} emner besøkt
          </div>
        </div>

        {/* Tab bar */}
        <div className="tab-scroll" style={{
          display: "flex",
          overflowX: "auto",
          backgroundColor: "#0c1322",
          borderBottom: "1px solid #1E293B",
          gap: 0,
        }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => handleTabClick(t.id)}
              style={{
                flex: "0 0 auto",
                padding: "10px 16px",
                border: "none",
                borderBottom: activeTab === t.id ? "2px solid #8B5CF6" : "2px solid transparent",
                backgroundColor: activeTab === t.id ? "rgba(139,92,246,0.1)" : "transparent",
                color: activeTab === t.id ? "#C4B5FD" : "#64748B",
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "0.78rem",
                fontWeight: activeTab === t.id ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s",
                position: "relative",
              }}
            >
              {t.label}
              {visited.has(t.id) && t.id !== activeTab && (
                <span style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 5,
                  height: 5,
                  borderRadius: "50%",
                  backgroundColor: "#8B5CF6",
                  opacity: 0.5,
                }} />
              )}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div ref={contentRef} className="content-scroll" style={{
          padding: "20px 20px 100px",
          maxWidth: 800,
          margin: "0 auto",
        }}>
          {/* Tab header */}
          <div style={{
            background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(99,102,241,0.05))",
            borderRadius: 12,
            padding: "14px 18px",
            marginBottom: 16,
            borderLeft: "3px solid #8B5CF6",
          }}>
            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#E0E7FF" }}>
              {TABS.find(t => t.id === activeTab)?.label}
            </div>
            <div style={{ color: "#94A3B8", fontSize: "0.78rem", marginTop: 2 }}>
              Emne 5 — Taksonomi, diversitet og kretsløp | K1, K5
            </div>
          </div>

          <TabContent />
        </div>

        {/* Quiz FAB */}
        <button
          onClick={() => { setShowQuiz(!showQuiz); setFlipped(false); }}
          style={{
            position: "fixed",
            bottom: 20,
            right: 20,
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
            border: "none",
            color: "#fff",
            fontSize: "1.3rem",
            cursor: "pointer",
            boxShadow: "0 4px 20px rgba(139,92,246,0.4)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {showQuiz ? "✕" : "📝"}
        </button>

        {/* Quiz overlay */}
        {showQuiz && (
          <div style={{
            position: "fixed",
            bottom: 80,
            right: 16,
            left: 16,
            maxWidth: 500,
            marginLeft: "auto",
            zIndex: 99,
          }}>
            <div style={{
              backgroundColor: "#0F172A",
              borderRadius: 16,
              border: "1px solid rgba(139,92,246,0.3)",
              padding: 16,
              boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: "#C4B5FD", fontSize: "0.85rem" }}>
                  Quiz — Emne 5
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: "#64748B", fontSize: "0.75rem" }}>
                  {quizIdx + 1} / {QUIZ_CARDS.length}
                </span>
              </div>

              <div className="quiz-card" onClick={() => setFlipped(!flipped)} style={{ height: 220 }}>
                <div className={`quiz-inner ${flipped ? "flipped" : ""}`} style={{ width: "100%", height: "100%" }}>
                  <div className="quiz-front">
                    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: "#E0E7FF", lineHeight: 1.5 }}>
                      {QUIZ_CARDS[quizIdx].q}
                    </div>
                    <div style={{ color: "#64748B", fontSize: "0.72rem", marginTop: 12, textAlign: "center" }}>Trykk for å snu</div>
                  </div>
                  <div className="quiz-back">
                    <div style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: "0.85rem", color: "#CBD5E1", lineHeight: 1.55, overflowY: "auto" }}>
                      {QUIZ_CARDS[quizIdx].a}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 12 }}>
                <button
                  onClick={(e) => { e.stopPropagation(); setQuizIdx(Math.max(0, quizIdx - 1)); setFlipped(false); }}
                  disabled={quizIdx === 0}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 8,
                    border: "1px solid rgba(139,92,246,0.3)",
                    backgroundColor: "rgba(139,92,246,0.1)",
                    color: quizIdx === 0 ? "#334155" : "#C4B5FD",
                    cursor: quizIdx === 0 ? "default" : "pointer",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >← Forrige</button>
                <button
                  onClick={(e) => { e.stopPropagation(); setQuizIdx(Math.min(QUIZ_CARDS.length - 1, quizIdx + 1)); setFlipped(false); }}
                  disabled={quizIdx === QUIZ_CARDS.length - 1}
                  style={{
                    padding: "6px 16px",
                    borderRadius: 8,
                    border: "1px solid rgba(139,92,246,0.3)",
                    backgroundColor: "rgba(139,92,246,0.1)",
                    color: quizIdx === QUIZ_CARDS.length - 1 ? "#334155" : "#C4B5FD",
                    cursor: quizIdx === QUIZ_CARDS.length - 1 ? "default" : "pointer",
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >Neste →</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
