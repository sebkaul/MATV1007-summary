import { useState, useEffect, useRef } from "react";

const TABS = [
  { id: "metabolisme", label: "Metabolisme & Energi", icon: "⚡" },
  { id: "diversitet", label: "Metabolsk diversitet", icon: "🔬" },
  { id: "naering", label: "Næring & Kulturmedier", icon: "🧫" },
  { id: "vekst", label: "Vekst & Celledeling", icon: "📈" },
  { id: "beregninger", label: "Vekstberegninger", icon: "🔢" },
  { id: "maaling", label: "Vekstmåling", icon: "📊" },
  { id: "miljo", label: "Miljøfaktorer", icon: "🌡" },
  { id: "kontroll", label: "Vekstkontroll", icon: "🛡" },
];

// ─── Shared UI Components ───
const Term = ({ children }) => (
  <span style={{
    color: "#F59E0B", fontWeight: 700,
    background: "rgba(245,158,11,0.10)", padding: "1px 6px",
    borderRadius: 4, fontFamily: "'Plus Jakarta Sans', sans-serif"
  }}>{children}</span>
);

const Formula = ({ children }) => (
  <span style={{
    fontFamily: "'JetBrains Mono', monospace", color: "#FCD34D",
    background: "rgba(245,158,11,0.08)", padding: "2px 8px",
    borderRadius: 4, fontSize: "0.95em", letterSpacing: 0.5
  }}>{children}</span>
);

const FormulaBlock = ({ children }) => (
  <div style={{
    fontFamily: "'JetBrains Mono', monospace", color: "#FCD34D",
    background: "rgba(245,158,11,0.06)", padding: "14px 20px",
    borderRadius: 8, fontSize: "1.05em", lineHeight: 1.8,
    border: "1px solid rgba(245,158,11,0.15)", margin: "12px 0",
    textAlign: "center", letterSpacing: 0.5
  }}>{children}</div>
);

const Pill = ({ term, def }) => {
  const [show, setShow] = useState(false);
  return (
    <span onClick={() => setShow(!show)} style={{
      display: "inline-block", cursor: "pointer", margin: "4px 4px",
      background: show ? "rgba(245,158,11,0.18)" : "rgba(245,158,11,0.08)",
      border: "1px solid rgba(245,158,11,0.25)", borderRadius: 20,
      padding: "5px 14px", fontSize: "0.85em", transition: "all 0.2s",
      color: show ? "#FCD34D" : "#F59E0B", fontFamily: "'Plus Jakarta Sans', sans-serif",
      fontWeight: 600
    }}>
      {term}
      {show && <span style={{ color: "#94A3B8", fontWeight: 400, marginLeft: 8, fontSize: "0.92em" }}>— {def}</span>}
    </span>
  );
};

const Huskeregel = ({ children }) => (
  <div style={{
    background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))",
    border: "1px solid rgba(245,158,11,0.3)", borderRadius: 12,
    padding: "16px 20px", margin: "16px 0", position: "relative"
  }}>
    <div style={{ position: "absolute", top: -12, left: 16, background: "#1E293B", padding: "2px 10px", borderRadius: 8, fontSize: "0.75em", color: "#F59E0B", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>💡 Huskeregel</div>
    <div style={{ color: "#FCD34D", fontSize: "0.95em", lineHeight: 1.6, marginTop: 4 }}>{children}</div>
  </div>
);

const ExamNote = ({ children }) => (
  <div style={{
    background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)",
    borderRadius: 10, padding: "12px 16px", margin: "12px 0",
    fontSize: "0.85em", color: "#FCA5A5", lineHeight: 1.5
  }}>
    <span style={{ fontWeight: 700, color: "#EF4444", marginRight: 6 }}>🎯 Eksamensrelevans:</span>
    {children}
  </div>
);

const CollapsibleExample = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ margin: "12px 0", border: "1px solid #334155", borderRadius: 10, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{
        padding: "12px 16px", cursor: "pointer", background: "#1E293B",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        color: "#F8FAFC", fontWeight: 600, fontSize: "0.9em",
        fontFamily: "'Plus Jakarta Sans', sans-serif"
      }}>
        <span>📝 {title}</span>
        <span style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s", fontSize: "1.2em" }}>▾</span>
      </div>
      {open && <div style={{ padding: "16px", background: "rgba(30,41,59,0.5)", color: "#CBD5E1", fontSize: "0.9em", lineHeight: 1.7 }}>{children}</div>}
    </div>
  );
};

const SectionTitle = ({ children }) => (
  <h3 style={{
    fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
    fontSize: "1.15em", color: "#F59E0B", margin: "28px 0 12px",
    borderBottom: "2px solid rgba(245,158,11,0.2)", paddingBottom: 6,
    letterSpacing: 0.5
  }}>{children}</h3>
);

const P = ({ children }) => (
  <p style={{ color: "#CBD5E1", fontSize: "0.92em", lineHeight: 1.7, margin: "8px 0", fontFamily: "'Source Sans 3', sans-serif" }}>{children}</p>
);

// ─── SVG Diagrams ───

const VekstkurveSVG = () => (
  <svg viewBox="0 0 600 320" style={{ width: "100%", maxWidth: 600, margin: "16px auto", display: "block" }}>
    <defs>
      <linearGradient id="vg" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#F59E0B" stopOpacity="0"/>
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="600" height="320" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1"/>
    {/* Axes */}
    <line x1="70" y1="270" x2="570" y2="270" stroke="#475569" strokeWidth="1.5"/>
    <line x1="70" y1="270" x2="70" y2="30" stroke="#475569" strokeWidth="1.5"/>
    <text x="320" y="300" fill="#94A3B8" fontSize="12" textAnchor="middle" fontFamily="Source Sans 3">Tid →</text>
    <text x="25" y="150" fill="#94A3B8" fontSize="12" textAnchor="middle" fontFamily="Source Sans 3" transform="rotate(-90,25,150)">log(Celletall)</text>
    {/* Growth curve */}
    <path d="M80,250 C100,250 120,248 140,245 C160,242 170,240 180,230 Q200,200 230,130 L350,55 Q400,55 430,55 L460,58 Q490,70 510,100 L540,160" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"/>
    <path d="M80,250 C100,250 120,248 140,245 C160,242 170,240 180,230 Q200,200 230,130 L350,55 Q400,55 430,55 L460,58 Q490,70 510,100 L540,160 L540,270 L80,270 Z" fill="url(#vg)"/>
    {/* Phase labels */}
    <text x="120" y="22" fill="#F59E0B" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">1. Lag-fase</text>
    <line x1="80" y1="270" x2="80" y2="28" stroke="#F59E0B" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4"/>
    <line x1="170" y1="270" x2="170" y2="28" stroke="#F59E0B" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4"/>
    <text x="260" y="22" fill="#34D399" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">2. Eksponentiell fase</text>
    <line x1="350" y1="270" x2="350" y2="28" stroke="#34D399" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4"/>
    <text x="405" y="22" fill="#60A5FA" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">3. Stasjonær</text>
    <line x1="460" y1="270" x2="460" y2="28" stroke="#60A5FA" strokeWidth="0.5" strokeDasharray="4,4" opacity="0.4"/>
    <text x="510" y="22" fill="#F87171" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">4. Død</text>
    {/* Annotations */}
    <text x="125" y="260" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="Source Sans 3">Tilpasning</text>
    <text x="265" y="100" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="Source Sans 3">Konstant g</text>
    <text x="405" y="48" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="Source Sans 3">Næring ↓</text>
    <text x="515" y="130" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="Source Sans 3">Celler dør</text>
  </svg>
);

const ATPDiagramSVG = () => (
  <svg viewBox="0 0 520 200" style={{ width: "100%", maxWidth: 520, margin: "12px auto", display: "block" }}>
    <rect x="0" y="0" width="520" height="200" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1"/>
    {/* Katabolisme box */}
    <rect x="20" y="30" width="140" height="60" rx="8" fill="rgba(239,68,68,0.15)" stroke="#EF4444" strokeWidth="1.5"/>
    <text x="90" y="55" fill="#FCA5A5" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">KATABOLISME</text>
    <text x="90" y="72" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="Source Sans 3">Nedbrytning → energi</text>
    {/* ATP circle */}
    <circle cx="260" cy="100" r="35" fill="rgba(245,158,11,0.15)" stroke="#F59E0B" strokeWidth="2"/>
    <text x="260" y="97" fill="#FCD34D" fontSize="16" fontWeight="800" textAnchor="middle" fontFamily="JetBrains Mono">ATP</text>
    <text x="260" y="112" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="Source Sans 3">energibærer</text>
    {/* Anabolisme box */}
    <rect x="360" y="30" width="140" height="60" rx="8" fill="rgba(52,211,153,0.12)" stroke="#34D399" strokeWidth="1.5"/>
    <text x="430" y="55" fill="#6EE7B7" fontSize="11" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">ANABOLISME</text>
    <text x="430" y="72" fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="Source Sans 3">Biosyntese ← energi</text>
    {/* Arrows */}
    <path d="M160,60 Q210,60 225,80" fill="none" stroke="#EF4444" strokeWidth="2" markerEnd="url(#arrowR)"/>
    <text x="195" y="55" fill="#FCA5A5" fontSize="8" fontFamily="Source Sans 3">−ΔG⁰</text>
    <path d="M295,80 Q310,60 360,60" fill="none" stroke="#34D399" strokeWidth="2" markerEnd="url(#arrowG)"/>
    <text x="330" y="55" fill="#6EE7B7" fontSize="8" fontFamily="Source Sans 3">+ΔG⁰</text>
    {/* Bottom: ADP cycle */}
    <path d="M295,120 Q310,150 360,160" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4,3"/>
    <path d="M225,120 Q210,150 160,160" fill="none" stroke="#475569" strokeWidth="1.5" strokeDasharray="4,3"/>
    <text x="260" y="170" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">ADP + Pᵢ</text>
    <defs>
      <marker id="arrowR" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#EF4444"/></marker>
      <marker id="arrowG" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto"><path d="M0,0 L8,3 L0,6" fill="#34D399"/></marker>
    </defs>
  </svg>
);

const MetabolDiversitetSVG = () => (
  <svg viewBox="0 0 560 280" style={{ width: "100%", maxWidth: 560, margin: "12px auto", display: "block" }}>
    <rect x="0" y="0" width="560" height="280" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1"/>
    <text x="280" y="25" fill="#F59E0B" fontSize="13" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">Metabolsk diversitet — klassifisering</text>
    {/* Energy source split */}
    <rect x="200" y="40" width="160" height="30" rx="6" fill="rgba(245,158,11,0.15)" stroke="#F59E0B" strokeWidth="1"/>
    <text x="280" y="60" fill="#FCD34D" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">ENERGIKILDE</text>
    <line x1="230" y1="70" x2="140" y2="90" stroke="#F59E0B" strokeWidth="1"/>
    <line x1="330" y1="70" x2="420" y2="90" stroke="#F59E0B" strokeWidth="1"/>
    {/* Kjemotrofi */}
    <rect x="60" y="90" width="160" height="28" rx="6" fill="rgba(239,68,68,0.12)" stroke="#EF4444" strokeWidth="1"/>
    <text x="140" y="109" fill="#FCA5A5" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">Kjemotrofi (kjemisk)</text>
    {/* Fototrofi */}
    <rect x="340" y="90" width="160" height="28" rx="6" fill="rgba(52,211,153,0.12)" stroke="#34D399" strokeWidth="1"/>
    <text x="420" y="109" fill="#6EE7B7" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">Fototrofi (lys)</text>
    {/* Sub-branches kjemotrofi */}
    <line x1="100" y1="118" x2="80" y2="140" stroke="#EF4444" strokeWidth="1"/>
    <line x1="180" y1="118" x2="200" y2="140" stroke="#EF4444" strokeWidth="1"/>
    <rect x="15" y="140" width="130" height="24" rx="5" fill="rgba(239,68,68,0.08)" stroke="#EF4444" strokeWidth="0.8"/>
    <text x="80" y="156" fill="#FCA5A5" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Source Sans 3">Kjemoorganotrofe</text>
    <rect x="155" y="140" width="110" height="24" rx="5" fill="rgba(239,68,68,0.08)" stroke="#EF4444" strokeWidth="0.8"/>
    <text x="210" y="156" fill="#FCA5A5" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Source Sans 3">Kjemolitotrofe</text>
    {/* Examples */}
    <text x="80" y="180" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="Source Sans 3">Org. forbindelser</text>
    <text x="80" y="192" fill="#64748B" fontSize="8" textAnchor="middle" fontFamily="Source Sans 3" fontStyle="italic">E. coli, gjær</text>
    <text x="210" y="180" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="Source Sans 3">Uorg. forbindelser</text>
    <text x="210" y="192" fill="#64748B" fontSize="8" textAnchor="middle" fontFamily="Source Sans 3" fontStyle="italic">Thiobacillus</text>
    {/* Carbon source bottom */}
    <text x="280" y="220" fill="#F59E0B" fontSize="10" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">KARBONKILDE</text>
    <rect x="120" y="232" width="120" height="22" rx="5" fill="rgba(96,165,250,0.1)" stroke="#60A5FA" strokeWidth="0.8"/>
    <text x="180" y="247" fill="#93C5FD" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Source Sans 3">Autotrofe (CO₂)</text>
    <rect x="320" y="232" width="120" height="22" rx="5" fill="rgba(168,85,247,0.1)" stroke="#A855F7" strokeWidth="0.8"/>
    <text x="380" y="247" fill="#C084FC" fontSize="9" fontWeight="600" textAnchor="middle" fontFamily="Source Sans 3">Heterotrofe (org.)</text>
    {/* Fototrofe examples */}
    <text x="420" y="132" fill="#94A3B8" fontSize="8" textAnchor="middle" fontFamily="Source Sans 3">Cyanobakterier, purpurbakt.</text>
    <text x="420" y="145" fill="#64748B" fontSize="8" textAnchor="middle" fontFamily="Source Sans 3">Oksisk / anoksisk fotosyntese</text>
  </svg>
);

const TemperaturSVG = () => (
  <svg viewBox="0 0 560 260" style={{ width: "100%", maxWidth: 560, margin: "12px auto", display: "block" }}>
    <rect x="0" y="0" width="560" height="260" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1"/>
    <text x="280" y="22" fill="#F59E0B" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">Temperaturklasser hos mikroorganismer</text>
    {/* Temperature axis */}
    <line x1="60" y1="230" x2="530" y2="230" stroke="#475569" strokeWidth="1.5"/>
    {[0,20,40,60,80,100,120].map((t,i) => (
      <g key={i}>
        <line x1={60+i*67} y1="230" x2={60+i*67} y2="235" stroke="#475569" strokeWidth="1"/>
        <text x={60+i*67} y="248" fill="#64748B" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">{t}°C</text>
      </g>
    ))}
    {/* Curves — bell shapes as paths */}
    {/* Psykrofil: opt ~12, range -5 to 20 */}
    <path d="M55,200 Q60,200 80,170 Q100,100 120,80 Q130,72 140,80 Q160,110 170,200" fill="rgba(96,165,250,0.15)" stroke="#60A5FA" strokeWidth="2"/>
    <text x="115" y="65" fill="#60A5FA" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">Psykrofil</text>
    {/* Psykrotolerant: opt ~30, range 0-40 */}
    <path d="M60,210 Q100,195 150,150 Q190,90 210,75 Q220,68 230,80 Q260,120 290,210" fill="rgba(147,197,253,0.1)" stroke="#93C5FD" strokeWidth="1.5" strokeDasharray="4,3"/>
    <text x="210" y="58" fill="#93C5FD" fontSize="8" fontWeight="600" textAnchor="middle" fontFamily="Plus Jakarta Sans">Psykrotolerant</text>
    {/* Mesofil: opt ~37, range 15-45 */}
    <path d="M130,215 Q180,195 220,140 Q245,95 260,78 Q270,70 280,80 Q300,105 330,215" fill="rgba(52,211,153,0.12)" stroke="#34D399" strokeWidth="2"/>
    <text x="265" y="62" fill="#34D399" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">Mesofil</text>
    {/* Termofil: opt ~60, range 40-80 */}
    <path d="M290,215 Q330,195 360,140 Q385,95 400,78 Q410,70 420,82 Q440,110 470,215" fill="rgba(245,158,11,0.12)" stroke="#F59E0B" strokeWidth="2"/>
    <text x="400" y="62" fill="#F59E0B" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">Termofil</text>
    {/* Hypertermofil: opt ~95, range 65-121 */}
    <path d="M400,215 Q440,195 470,150 Q490,105 505,85 Q510,78 520,88 Q530,105 540,200" fill="rgba(239,68,68,0.12)" stroke="#EF4444" strokeWidth="2"/>
    <text x="505" y="70" fill="#EF4444" fontSize="9" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">Hypertermofil</text>
    <text x="300" y="248" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="Source Sans 3">Temperatur →</text>
  </svg>
);

const DverdiFigur = () => (
  <svg viewBox="0 0 460 260" style={{ width: "100%", maxWidth: 460, margin: "12px auto", display: "block" }}>
    <rect x="0" y="0" width="460" height="260" rx="12" fill="#0F172A" stroke="#334155" strokeWidth="1"/>
    <text x="230" y="22" fill="#F59E0B" fontSize="12" fontWeight="700" textAnchor="middle" fontFamily="Plus Jakarta Sans">Desimal reduksjonstid (D-verdi)</text>
    <line x1="70" y1="230" x2="410" y2="230" stroke="#475569" strokeWidth="1.5"/>
    <line x1="70" y1="230" x2="70" y2="40" stroke="#475569" strokeWidth="1.5"/>
    <text x="240" y="252" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="Source Sans 3">Tid (min)</text>
    <text x="25" y="135" fill="#94A3B8" fontSize="10" textAnchor="middle" fontFamily="Source Sans 3" transform="rotate(-90,25,135)">log(celler)</text>
    {/* Y axis labels */}
    {[6,5,4,3,2,1,0].map((v,i) => (
      <g key={i}>
        <text x="60" y={55+i*27} fill="#64748B" fontSize="9" textAnchor="end" fontFamily="JetBrains Mono">10{String.fromCharCode(8304+v<=8313?8304+v:8304)}</text>
        <line x1="65" y1={52+i*27} x2="410" y2={52+i*27} stroke="#1E293B" strokeWidth="0.5"/>
      </g>
    ))}
    {/* Straight line on log scale */}
    <line x1="80" y1="52" x2="380" y2="214" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round"/>
    {/* D bracket */}
    <line x1="130" y1="80" x2="130" y2="107" stroke="#EF4444" strokeWidth="1.5"/>
    <line x1="125" y1="80" x2="135" y2="80" stroke="#EF4444" strokeWidth="1.5"/>
    <line x1="125" y1="107" x2="135" y2="107" stroke="#EF4444" strokeWidth="1.5"/>
    <text x="155" y="97" fill="#FCA5A5" fontSize="10" fontWeight="700" fontFamily="Plus Jakarta Sans">D = 1 min</text>
    <text x="155" y="110" fill="#94A3B8" fontSize="8" fontFamily="Source Sans 3">90% reduksjon</text>
    {/* Formula */}
    <text x="310" y="90" fill="#FCD34D" fontSize="10" fontFamily="JetBrains Mono">D = t / log-red.</text>
  </svg>
);

// ─── Tab Content Components ───

const Tab1Metabolisme = () => (
  <div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
      <Pill term="Metabolisme" def="Alle kjemiske reaksjoner i en levende celle"/>
      <Pill term="Katabolisme" def="Nedbrytning, frigjør energi (−ΔG⁰)"/>
      <Pill term="Anabolisme" def="Biosyntese, krever energi (+ΔG⁰)"/>
      <Pill term="ATP" def="Adenosin trifosfat — cellens energibærer"/>
      <Pill term="Fosforylering" def="Tilsetning av fosfatgruppe til ADP → ATP"/>
      <Pill term="Elektronbærer" def="NAD⁺/NADH, FADH₂ — overfører elektroner"/>
      <Pill term="Respirasjon" def="ATP-generering med ekstern elektronakseptor"/>
      <Pill term="Fermentering" def="ATP uten O₂, intern organisk elektronakseptor"/>
    </div>

    <SectionTitle>Katabolisme vs. Anabolisme</SectionTitle>
    <P><Term>Katabolisme</Term> er nedbrytning av store molekyler til mindre. Eksergoniske reaksjoner (−ΔG⁰) som produserer mer energi enn de forbruker. Energien lagres som <Term>ATP</Term>. Eksempel: C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O.</P>
    <P><Term>Anabolisme</Term> er biosyntetiske reaksjoner. Endergoniske (+ΔG⁰) — krever energi fra ATP. Eksempler: aminosyrer → protein, monosakkarider → karbohydrater, nukleotider → nukleinsyrer.</P>

    <ATPDiagramSVG />

    <SectionTitle>ATP — cellens energivaluta</SectionTitle>
    <P><Term>Adenosin trifosfat (ATP)</Term> lagrer energi fra katabolske reaksjoner og overfører den til anabolske reaksjoner ved frigjøring av en fosfatgruppe:</P>
    <FormulaBlock>ATP → ADP + Pᵢ + energi</FormulaBlock>
    <P>Celler trenger også en <Term>reduserende kraft</Term> — en elektrondonor. <Term>Elektronbærere</Term> som NAD⁺/NADH overfører elektroner via en serie reaksjoner fra donor til akseptor.</P>

    <SectionTitle>Tre mekanismer for ATP-dannelse</SectionTitle>
    <P><strong style={{color:"#F8FAFC"}}>1. Substratnivå fosforylering:</strong> Direkte overføring av Pᵢ fra et fosforylert substrat til ADP. Ingen O₂ eller elektrontransportkjede nødvendig. Skjer i glykolysen.</P>
    <P><strong style={{color:"#F8FAFC"}}>2. Oksidativ fosforylering:</strong> Den mest effektive. Energi fra NADH/FADH₂ driver en elektrontransportkjede i cytoplasmamembranen → protongradient → <Term>ATP-syntase</Term> → ATP. Krever ekstern elektronakseptor (O₂ eller annen).</P>
    <P><strong style={{color:"#F8FAFC"}}>3. Fotofosforylering:</strong> Generering av ATP fra sollys. Fotosyntetiske organismer.</P>

    <SectionTitle>Aerob respirasjon</SectionTitle>
    <P>Glykolyse → sitronsyresyklus → elektrontransportkjede. Endelig elektronakseptor: <Term>O₂</Term>. Netto utbytte: <Formula>38 mol ATP per mol glukose</Formula> (prokaryoter). Mesteparten av energien lagres først i NADH og FADH₂, som så donerer elektroner til elektrontransportkjeden.</P>

    <SectionTitle>Anaerob respirasjon</SectionTitle>
    <P>Når O₂ ikke er tilgjengelig. En annen endelig elektronakseptor brukes: NO₃⁻, SO₄²⁻, CO₂, Fe³⁺, TMAO. <Term>Lavere ATP-utbytte</Term> enn aerob. Eksempel — denitrifisering: NO₃⁻ → NO₂⁻ → N₂O → N₂.</P>

    <SectionTitle>Fermentering</SectionTitle>
    <P>ATP dannes uten elektrontransportkjede. Bruker en intern, <Term>organisk elektronakseptor</Term> (f.eks. pyruvat). Lavt energiutbytte. Eksempler: alkoholfermentering (gjær), melkesyrefermentering (Lactobacillus).</P>

    <CollapsibleExample title="Regneeksempel: Hvorfor mange trinn?">
      <P>Dersom all energi fra glukose ble frigitt i ett enkelt trinn, ville det bli så mye varme at cellen ikke hadde overlevd. Stegvis nedbrytning (glykolyse → sitronsyresyklus → elektrontransportkjede) tillater kontrollert energihøsting.</P>
    </CollapsibleExample>

    <Huskeregel>Katabolisme = Knuse (ned), Anabolisme = Assemble (bygge opp). ATP kobler dem — energien fra knusing driver assembleringen.</Huskeregel>
    <ExamNote>V2025 oppg 8 (9p): Identifisere bakteriegruppe fra metabolsk beskrivelse (energikilde, karbonkilde, elektronakseptor). Krever forståelse av respirasjon vs. fermentering.</ExamNote>
  </div>
);

const Tab2Diversitet = () => (
  <div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
      <Pill term="Kjemoorganotrofe" def="Kjemisk energi fra organiske forbindelser"/>
      <Pill term="Kjemolitotrofe" def="Kjemisk energi fra uorganiske forbindelser"/>
      <Pill term="Fototrofe" def="Lys som energikilde"/>
      <Pill term="Autotrofe" def="CO₂ som karbonkilde"/>
      <Pill term="Heterotrofe" def="Organiske forbindelser som karbonkilde"/>
      <Pill term="Fotoheterotrofe" def="Lys + organisk karbon — paradoks!"/>
    </div>

    <SectionTitle>Klassifisering etter energi- og karbonkilde</SectionTitle>
    <MetabolDiversitetSVG />

    <P>Mikroorganismer klassifiseres i <Term>metabolske grupper</Term> basert på to akser: energikilde og karbonkilde.</P>

    <SectionTitle>Energikilde</SectionTitle>
    <P><Term>Kjemotrofe</Term> — kjemisk forbindelse som energikilde. Deles inn i <Term>kjemoorganotrofe</Term> (organisk substrat, f.eks. glukose — E. coli) og <Term>kjemolitotrofe</Term> (uorganisk substrat, f.eks. H₂, H₂S, Fe²⁺, NH₄⁺ — Thiobacillus).</P>
    <P><Term>Fototrofe</Term> — lys som energikilde. Cyanobakterier, purpurbakterier, grønne svovelbakterier.</P>
    <P>Kjemotrofe reaksjoner kan være <Term>aerobe</Term> (O₂ som elektronakseptor) eller <Term>anaerobe</Term> (annen akseptor).</P>

    <SectionTitle>Karbonkilde</SectionTitle>
    <P><Term>Autotrofe</Term> — bruker CO₂ som eneste karbonkilde. <Term>Heterotrofe</Term> — bruker organiske forbindelser.</P>

    <div style={{ background: "#1E293B", borderRadius: 10, padding: 16, margin: "16px 0", border: "1px solid #334155" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85em", fontFamily: "'Source Sans 3', sans-serif" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #334155" }}>
            <th style={{ color: "#F59E0B", padding: "8px 6px", textAlign: "left" }}>Gruppe</th>
            <th style={{ color: "#F59E0B", padding: "8px 6px", textAlign: "left" }}>Energi</th>
            <th style={{ color: "#F59E0B", padding: "8px 6px", textAlign: "left" }}>Karbon</th>
            <th style={{ color: "#F59E0B", padding: "8px 6px", textAlign: "left" }}>Eksempel</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Kjemoorganoheterotrof", "Org. kjem.", "Org.", "E. coli, gjær"],
            ["Kjemolitoautotrof", "Uorg. kjem.", "CO₂", "Nitrosomonas"],
            ["Fotoautotrof", "Lys", "CO₂", "Cyanobakterier"],
            ["Fotoheterotrof", "Lys", "Org.", "Purpur ikke-svovelbakt."],
          ].map((r,i) => (
            <tr key={i} style={{ borderBottom: "1px solid #1E293B" }}>
              <td style={{ color: "#FCD34D", padding: "6px", fontWeight: 600 }}>{r[0]}</td>
              <td style={{ color: "#CBD5E1", padding: "6px" }}>{r[1]}</td>
              <td style={{ color: "#CBD5E1", padding: "6px" }}>{r[2]}</td>
              <td style={{ color: "#94A3B8", padding: "6px", fontStyle: "italic" }}>{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <SectionTitle>Fotosyntese: Oksisk vs. Anoksisk</SectionTitle>
    <P><Term>Oksisk fotosyntese</Term> (planter, alger, cyanobakterier):</P>
    <FormulaBlock>6 CO₂ + 12 H₂O + lysenergi → C₆H₁₂O₆ + 6 O₂ + 6 H₂O</FormulaBlock>
    <P><Term>Anoksisk fotosyntese</Term> (grønne og purpur svovelbakterier):</P>
    <FormulaBlock>6 CO₂ + 12 H₂S + lysenergi → C₆H₁₂O₆ + 12 S + 6 H₂O</FormulaBlock>

    <CollapsibleExample title="Øvelse: Identifisere metabolsk gruppe (eksamensstil)">
      <P><strong style={{color:"#F8FAFC"}}>Oppgave:</strong> En organisme benytter glukose som både energi- og karbonkilde. Hvilken metabolsk gruppe?</P>
      <P><strong style={{color:"#34D399"}}>Svar:</strong> <Term>Kjemoorganoheterotrof</Term> — kjemisk energi fra organisk forbindelse (glukose), organisk karbonkilde.</P>
      <P style={{marginTop:12}}><strong style={{color:"#F8FAFC"}}>Oppgave:</strong> En organisme bruker H₂ som energikilde og CO₂ som karbonkilde?</P>
      <P><strong style={{color:"#34D399"}}>Svar:</strong> <Term>Kjemolitoautotrof</Term> — uorganisk energikilde, CO₂ som karbon.</P>
    </CollapsibleExample>

    <Huskeregel>Kjemo/Foto = energikilde. Organo/Lito = type kjemisk substrat. Auto/Hetero = karbonkilde. Kombiner alle tre: f.eks. kjemo-organo-heterotrof.</Huskeregel>
    <ExamNote>V2025 oppg 8 (9p): «Gram positiv, ikke-sporedannende, mesofil, aerotolerant anaerob, kjemoorganotrof stav» — krever at du kan koble metabolsk beskrivelse til riktig bakteriegruppe.</ExamNote>
  </div>
);

const Tab3Naering = () => (
  <div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
      <Pill term="Kulturmedium" def="Næringsmedium for å støtte vekst av m.o."/>
      <Pill term="Definert medium" def="Eksakt kjent kjemisk sammensetning"/>
      <Pill term="Komplekst medium" def="Ukjent nøyaktig sammensetning, ekstrakter"/>
      <Pill term="Selektivt medium" def="Hemmer noen m.o., ikke alle"/>
      <Pill term="Differensielt medium" def="Indikator → fargeendring ved metabolsk aktivitet"/>
      <Pill term="Agar" def="Gelerende middel fra rødalger, smelter ~100°C, stivner ~45°C"/>
      <Pill term="Koloni" def="Synlig ansamling av celler fra én/få celler"/>
      <Pill term="KDE/CFU" def="Kolonidannende enhet"/>
    </div>

    <SectionTitle>Næringskrav</SectionTitle>
    <P>Alle celler trenger: <Term>energikilde</Term>, <Term>karbonkilde</Term>, <Term>nitrogenkilde</Term>, <Term>vann</Term>. I tillegg: makronæringsstoffer (P, S, K, Mg, Ca, Na, Cl) og <Term>mikronæringsstoffer</Term> (spormetaller: Fe, Mn, Zn, Co, Cu, Mo m.fl.).</P>
    <P><Term>Vekstfaktorer</Term> er organiske stoffer som noen organismer ikke kan syntetisere selv: vitaminer, aminosyrer, puriner, pyrimidiner.</P>
    <P>C, O, N, H, P, S utgjør ca. <Formula>96%</Formula> av tørrvekten til en bakteriecelle.</P>

    <SectionTitle>Kulturmedier — to hovedklasser</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "12px 0" }}>
      <div style={{ background: "#1E293B", borderRadius: 10, padding: 14, border: "1px solid #334155" }}>
        <div style={{ color: "#F59E0B", fontWeight: 700, marginBottom: 6, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.95em" }}>Definert medium</div>
        <P>Eksakt kjent kjemisk sammensetning. Kjemisk rene stoffer tilsettes hver for seg med kjent mengde.</P>
        <P><strong style={{color:"#94A3B8"}}>Eks:</strong> Glukose salt agar (GSA)</P>
      </div>
      <div style={{ background: "#1E293B", borderRadius: 10, padding: 14, border: "1px solid #334155" }}>
        <div style={{ color: "#F59E0B", fontWeight: 700, marginBottom: 6, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "0.95em" }}>Komplekst medium</div>
        <P>Eksakt sammensetning ukjent. Tilsettes ekstrakter av organisk materiale: kasein, gjærekstrakt, pepton, trypton, kjøttekstrakt.</P>
        <P><strong style={{color:"#94A3B8"}}>Eks:</strong> Tryptic soy agar (TSA)</P>
      </div>
    </div>

    <SectionTitle>Spesialiserte medier</SectionTitle>
    <P><Term>Generelle/rike medier</Term> gir vekst av et variert utvalg m.o. Brukes for totaltelling. Eks: PCA, TSA, BHIA.</P>
    <P><Term>Selektive medier</Term> inneholder komponenter som hemmer noen m.o. men ikke alle.</P>
    <P><Term>Differensielle medier</Term> inneholder indikator som gir fargeendring ved bestemte metabolske reaksjoner.</P>
    <P>Et medium kan være <strong style={{color:"#F8FAFC"}}>både selektivt og differensielt</strong> — f.eks. EMB-agar.</P>

    <div style={{ background: "#1E293B", borderRadius: 10, padding: 14, margin: "12px 0", border: "1px solid #334155" }}>
      <div style={{ color: "#F59E0B", fontWeight: 700, marginBottom: 8, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Viktige medier å kjenne</div>
      <P><Term>EMB</Term> (Eosin Metylenblå agar) — selektivt for Gram-negative. Differensierer laktosefermentering. E. coli gir mørk lilla med grønt metallskjær.</P>
      <P><Term>VRBA</Term> (Violet Red Bile Agar) — selektivt for Gram-negative tarmbakterier (gallesalter + krystallfiolett).</P>
      <P><Term>Brilliance Listeria agar</Term> — selektivt for Listeria-arter, differensierer patogene vs. ikke-patogene via lechitinase-aktivitet.</P>
      <P><Term>Baird-Parker agar</Term> — selektivt og differensielt for stafylokokker.</P>
    </div>

    <CollapsibleExample title="Eksamensoppgave V2024 (6p): Velg riktig medium for E. coli">
      <P><strong style={{color:"#F8FAFC"}}>Oppgave:</strong> Du skal bestemme antall E. coli i en prøve. Velg mellom Baird-Parker agar og EMB agar.</P>
      <P><strong style={{color:"#34D399"}}>Svar:</strong> EMB-agar. Det er selektivt for Gram-negative (gallesalter hemmer Gram-positive) og differensielt — laktose-positive bakterier (inkl. E. coli) gir mørk lilla kolonier. E. coli utfører blandet syrefermentering → stor syreproduksjon → distinkt grønt metallskjær. Baird-Parker er for stafylokokker og ville normalt ikke støtte E. coli-vekst.</P>
    </CollapsibleExample>

    <Huskeregel>«Selektivt = hvem FÅR vokse, Differensielt = hvem ER det som vokser.» Selektive hemmer, differensielle indikerer.</Huskeregel>
    <ExamNote>V2023 oppg 7 (6p) og V2024 oppg 8 (6p) testet begge kulturmedier — definert vs. kompleks, og valg av selektivt/differensielt medium for spesifikke bakterier.</ExamNote>
  </div>
);

const Tab4Vekst = () => (
  <div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
      <Pill term="Binær fisjon" def="Todeling — morcelle → 2 identiske datterceller"/>
      <Pill term="Generasjonstid (g)" def="Tiden for én celledeling (doblingstid)"/>
      <Pill term="Lag-fase" def="Tilpasningsfase, ingen deling"/>
      <Pill term="Eksponentiell fase" def="Deling med konstant tidsintervall"/>
      <Pill term="Stasjonærfase" def="Ingen netto endring i celletall"/>
      <Pill term="Dødsfase" def="Jevn reduksjon i celletall"/>
      <Pill term="Batchkultur" def="Lukket system, begrenset næring"/>
      <Pill term="Kjemostat" def="Kontinuerlig kultur, åpent system"/>
    </div>

    <SectionTitle>Binær fisjon</SectionTitle>
    <P>Vekst hos encellede organismer = økning i antall celler. <Term>Binær fisjon</Term> (todeling): Cellen forlenges → septum dannes → to identiske datterceller. <Term>Generasjonstid (g)</Term> = tiden for én deling. Varierer mellom arter og vekstforhold — E. coli under optimale forhold: ca. 20 min.</P>

    <SectionTitle>Vekstkurven (batchkultur)</SectionTitle>
    <VekstkurveSVG />

    <P><strong style={{color:"#60A5FA"}}>1. Lag-fase (nølefase):</strong> Tiden mellom inokulering og vekststart. Tilpasnings- og reparasjonsfase — syntese av enzymer og makromolekyler. Lengden avhenger av hvor kulturen kom fra.</P>
    <P><strong style={{color:"#34D399"}}>2. Eksponentiell fase (log-fase):</strong> Celledeling med <Term>konstant generasjonstid</Term>. Rett linje i semilogaritmisk plott. Overføring av eksponensielt voksende kultur → kort lag-fase i ny kultur.</P>
    <P><strong style={{color:"#60A5FA"}}>3. Stasjonærfase:</strong> Ingen netto endring i totalt antall celler. Like mange dør som deler seg. Næringsbegrensning eller opphopning av avfallsstoffer.</P>
    <P><strong style={{color:"#F87171"}}>4. Dødsfase:</strong> Jevn reduksjon i antall celler. Næring brukt opp, giftige avfallsstoffer. Overføring fra dødsfase → lang lag-fase.</P>

    <SectionTitle>Kontinuerlig kultur — Kjemostat</SectionTitle>
    <P><Term>Kjemostat</Term>: Åpent system — sterilt medium tilføres med konstant hastighet, gammel medium (med celler) tappes ut med samme hastighet. Oppnår <Term>steady state</Term> — konstant volum, celleantall, næring/avfall.</P>

    <CollapsibleExample title="Eksamensoppgave V2023 (4p): Beskriv vekstkurvens faser">
      <P><strong style={{color:"#F8FAFC"}}>Oppgave:</strong> Beskriv de ulike fasene i en vekstkurve til en bakteriekultur i et lukket system.</P>
      <P><strong style={{color:"#34D399"}}>Svar:</strong> (1) Lagfase — tilpasning, enzymsyntese, ingen celledeling. (2) Eksponentiell fase — celledeling starter, vekst med konstant generasjonstid. (3) Stasjonær fase — like mange dør som deler seg, substratbegrensning eller avfallsopphopning. (4) Dødsfase — jevn nedgang, næring oppbrukt.</P>
      <P style={{marginTop:8}}><strong style={{color:"#F8FAFC"}}>Tillegg (b):</strong> Kort/ingen lagfase når eksponensielt voksende kultur overføres til nytt medium med samme betingelser — ingen metabolske tilpasninger nødvendig.</P>
    </CollapsibleExample>

    <Huskeregel>Lag = Lære (tilpasse seg). Eksponentiell = Eksplosjon. Stasjonær = Stillstand. Død = Decline.</Huskeregel>
    <ExamNote>Vekstkurvens faser er testet på ALLE tre eksamener (V2023, V2024, V2025). Absolutt pensum — lær dette til du kan beskrive det i søvne.</ExamNote>
  </div>
);

const Tab5Beregninger = () => (
  <div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
      <Pill term="N₀" def="Antall celler ved starttidspunkt"/>
      <Pill term="Nₜ" def="Antall celler ved tid t"/>
      <Pill term="n" def="Antall generasjoner (doblinger)"/>
      <Pill term="g" def="Generasjonstid (tid per dobling)"/>
      <Pill term="k" def="Veksthastighet (doblinger per tidsenhet)"/>
    </div>

    <SectionTitle>Grunnformel for eksponentiell vekst</SectionTitle>
    <FormulaBlock>Nₜ = N₀ × 2ⁿ</FormulaBlock>
    <P>Der n = antall generasjoner = t/g. Formelen gjelder kun i <Term>eksponentiell fase</Term>.</P>

    <SectionTitle>Beregne antall generasjoner</SectionTitle>
    <P>Løs for n fra grunnformelen:</P>
    <FormulaBlock>n = (log Nₜ − log N₀) / log 2 = (log Nₜ − log N₀) / 0.301</FormulaBlock>

    <SectionTitle>Generasjonstid</SectionTitle>
    <FormulaBlock>g = t / n</FormulaBlock>

    <SectionTitle>Veksthastighet</SectionTitle>
    <FormulaBlock>k = 0.301 / g</FormulaBlock>
    <P>(antall doblinger per tidsenhet — jo brattere kurve i semilog-plott, desto høyere k)</P>

    <div style={{ background: "#1E293B", borderRadius: 10, padding: 16, margin: "16px 0", border: "2px solid rgba(245,158,11,0.3)" }}>
      <div style={{ color: "#F59E0B", fontWeight: 800, marginBottom: 10, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>⚠️ Alle formler samlet</div>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#FCD34D", fontSize: "0.95em", lineHeight: 2.2 }}>
        <div>Nₜ = N₀ × 2ⁿ</div>
        <div>n = (log Nₜ − log N₀) / 0.301</div>
        <div>g = t / n</div>
        <div>k = 0.301 / g</div>
        <div>n = t / g</div>
      </div>
    </div>

    <CollapsibleExample title="Regneeksempel V2025 oppg 4b (9p)">
      <P><strong style={{color:"#F8FAFC"}}>Gitt:</strong> N = 2,8 × 10⁸ cfu/ml, N₀ = 3,1 × 10⁶ cfu/ml, t = 3 timer.</P>
      <P><strong style={{color:"#F59E0B"}}>Steg 1:</strong> Beregn n</P>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#FCD34D", padding: "8px 16px", background: "rgba(245,158,11,0.06)", borderRadius: 8, margin: "8px 0", lineHeight: 1.8 }}>
        n = (log 2,8×10⁸ − log 3,1×10⁶) / 0,301<br/>
        n = (8,45 − 6,49) / 0,301<br/>
        n = 1,96 / 0,301 = <strong>6,5 generasjoner</strong>
      </div>
      <P><strong style={{color:"#F59E0B"}}>Steg 2:</strong> Beregn g</P>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#FCD34D", padding: "8px 16px", background: "rgba(245,158,11,0.06)", borderRadius: 8, margin: "8px 0" }}>
        g = t / n = 3 t / 6,5 = <strong>0,46 timer ≈ 27,7 min</strong>
      </div>
    </CollapsibleExample>

    <CollapsibleExample title="Regneeksempel V2023 oppg 6 (3p)">
      <P><strong style={{color:"#F8FAFC"}}>Gitt:</strong> N₀ = 8,3 × 10⁴ kde/ml, Nₜ = 5,3 × 10⁶ kde/ml, t = 4 timer.</P>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#FCD34D", padding: "8px 16px", background: "rgba(245,158,11,0.06)", borderRadius: 8, margin: "8px 0", lineHeight: 1.8 }}>
        n = (log 5,3×10⁶ − log 8,3×10⁴) / 0,301<br/>
        n = (6,724 − 4,919) / 0,301 = 1,805/0,301 = <strong>6,0 gen.</strong><br/>
        g = 4 t / 6 = <strong>0,667 t ≈ 40 min</strong>
      </div>
    </CollapsibleExample>

    <CollapsibleExample title="Regneeksempel V2024 oppg 7 (4p): Fra vekstkurve">
      <P><strong style={{color:"#F8FAFC"}}>Gitt:</strong> Data fra vekstkurve. Eksponentiell fase: 24–96 timer. Ved t=24: 1,5×10³. Ved t=96: 5,5×10⁸.</P>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#FCD34D", padding: "8px 16px", background: "rgba(245,158,11,0.06)", borderRadius: 8, margin: "8px 0", lineHeight: 1.8 }}>
        n = (log 5,5×10⁸ − log 1,5×10³) / 0,301<br/>
        n = (8,74 − 3,18) / 0,301 = 5,56 / 0,301 = <strong>18,5 gen.</strong><br/>
        g = (96−24) / 18,5 = 72 / 18,5 = <strong>3,9 timer</strong>
      </div>
      <P><span style={{color:"#EF4444", fontWeight:700}}>NB!</span> Bruk KUN verdier fra eksponentiell fase. Å bruke hele tidsperioden (0–168 t) gir feil svar.</P>
    </CollapsibleExample>

    <Huskeregel>Fremgangsmåte: (1) Finn n med log-formelen, (2) Sett inn i g = t/n. Husk: bruk bare eksponentiell fase!</Huskeregel>
    <ExamNote>Generasjonstid-beregning har kommet på ALLE tre eksamener. V2025: 9p, V2024: 4p, V2023: 3p. Øv til du kan gjøre det automatisk med kalkulator.</ExamNote>
  </div>
);

const Tab6Maaling = () => (
  <div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
      <Pill term="Totalantall" def="Teller alle celler (levende + døde)"/>
      <Pill term="Levedyktig telling" def="Kun celler som kan dele seg"/>
      <Pill term="Kimtall" def="Antall kde/cfu per ml"/>
      <Pill term="Platespredning" def="0,1 ml på overflate, spres med spreder"/>
      <Pill term="Innstøpning" def="Prøve blandes med flytende agar"/>
      <Pill term="OD" def="Optisk tetthet, turbiditetsmåling"/>
      <Pill term="Seriefortynning" def="Trinnvis fortynning av prøve"/>
    </div>

    <SectionTitle>Metoder for vekstmåling</SectionTitle>

    <P><strong style={{color:"#F8FAFC"}}>1. Totaltelling i mikroskop (Petroff-Hauser):</strong> Teller partikler i et kjent volum. Rask men skiller <Term>ikke mellom levende og døde</Term> celler. Krever &gt;10⁶ celler/ml.</P>

    <P><strong style={{color:"#F8FAFC"}}>2. Kimtallsmetoder (levedyktig telling):</strong> En celle som kan dele seg = levende (kim). Overfør prøve til agarplate → inkuber → tell kolonier → beregn kde/cfu.</P>

    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "12px 0" }}>
      <div style={{ background: "#1E293B", borderRadius: 10, padding: 14, border: "1px solid #334155" }}>
        <div style={{ color: "#34D399", fontWeight: 700, marginBottom: 6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Platespredning</div>
        <P>0,1 ml på overflaten → L-formet spreder. Kolonier vokser kun på overflaten.</P>
      </div>
      <div style={{ background: "#1E293B", borderRadius: 10, padding: 14, border: "1px solid #334155" }}>
        <div style={{ color: "#60A5FA", fontWeight: 700, marginBottom: 6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Innstøpning</div>
        <P>0,1–1,0 ml i tom skål → flytende agar (~50°C) over → blandes. Kolonier i og på agaren. Høyere deteksjonsgrense.</P>
      </div>
    </div>

    <P><strong style={{color:"#F8FAFC"}}>3. Turbidimetri (spektrofotometer):</strong> Måler <Term>optisk tetthet (OD)</Term> — mengden lys som spres. Proporsjonalt med cellekonsentrasjon opp til ca. OD 0,6. Rask og enkel indirekte metode. Måles ved 500–600 nm.</P>

    <SectionTitle>Seriefortynning og kimtallsberegning</SectionTitle>
    <FormulaBlock>Kimtall = Kolonitall / Prøvemengde</FormulaBlock>
    <P>Ved flere tellbare plater — <Term>veid gjennomsnitt</Term>:</P>
    <FormulaBlock>Kimtall = Σ Kolonitall / Σ Prøvemengder</FormulaBlock>
    <P>Tellbare plater: typisk 10–100 eller 25–250 kolonier per skål. For få → statistisk usikkerhet. For mange → underestimering.</P>

    <CollapsibleExample title="Regneeksempel V2024 oppg 8b: Kimtallsberegning">
      <P><strong style={{color:"#F8FAFC"}}>Data:</strong> 10⁻¹ = overgrodd, 10⁻² = 76 kolonier, 10⁻³ = 8 kolonier. Volum = 0,1 ml.</P>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#FCD34D", padding: "8px 16px", background: "rgba(245,158,11,0.06)", borderRadius: 8, margin: "8px 0", lineHeight: 1.8 }}>
        Prøvemengde 10⁻² = 0,1 ml × 10⁻² = 0,01 ml<br/>
        Prøvemengde 10⁻³ = 0,1 ml × 10⁻³ = 0,001 ml<br/>
        Kimtall = (76 + 8) / (0,01 + 0,001)<br/>
        Kimtall = 84 / 0,011 = <strong>7636 ≈ 7,6 × 10³ cfu/ml</strong>
      </div>
    </CollapsibleExample>

    <CollapsibleExample title="V2025 oppg 4c: Platespredning vs. innstøpning">
      <P><strong style={{color:"#34D399"}}>Platespredning:</strong> Kjent volum (0,1 ml) på agaroverflate, spres med L-spreder, kolonier på overflaten.</P>
      <P><strong style={{color:"#60A5FA"}}>Innstøpning:</strong> Større prøvevolum (opptil 1 ml), blandes med flytende agar. Kolonier inni og på overflaten. Gir høyere deteksjonsgrense.</P>
      <P><strong style={{color:"#EF4444"}}>Uegnet for:</strong> <Term>Psykrofile</Term> organismer — de drepes av den varme agaren (~50°C) i innstøpningsmetoden, siden maks. veksttemperatur er ~20°C.</P>
    </CollapsibleExample>

    <Huskeregel>Platespredning = PÅ overflaten (lite volum). Innstøpning = I agaren (større volum, men varm agar dreper kuldefølsomme).</Huskeregel>
    <ExamNote>V2025 oppg 4c testet direkte platespredning vs. innstøpning + hvilke m.o. som ikke kan påvises med innstøpning. V2024 oppg 8 testet kimtallsberegning.</ExamNote>
  </div>
);

const Tab7Miljo = () => (
  <div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
      <Pill term="Psykrofil" def="Optimum <15°C, maks <20°C"/>
      <Pill term="Psykrotolerant" def="Vokser ved 0°C, optimum 20–40°C"/>
      <Pill term="Mesofil" def="Optimum ~37°C, fleste humane patogener"/>
      <Pill term="Termofil" def="Optimum 50–80°C"/>
      <Pill term="Hypertermofil" def="Optimum >80°C, Archaea"/>
      <Pill term="Acidofil" def="Vokser best ved pH ≤5,5"/>
      <Pill term="Nøytrofil" def="Vokser best pH 5,5–8"/>
      <Pill term="Alkalifil" def="Vokser best ved pH ≥8"/>
      <Pill term="Halofil" def="Krever NaCl (1–12%)"/>
      <Pill term="Vannaktivitet (aᵥ)" def="Mål for tilgjengelighet av vann (0–1)"/>
      <Pill term="Obligat aerob" def="Krever O₂"/>
      <Pill term="Obligat anaerob" def="Drepes av O₂"/>
      <Pill term="Fakultativ aerob" def="Vokser med/uten O₂"/>
      <Pill term="Mikroaerofil" def="Krever O₂, men lavere konsentrasjon"/>
      <Pill term="Aerotolerant anaerob" def="Tåler O₂, bruker det ikke"/>
    </div>

    <SectionTitle>Fire hovedfaktorer</SectionTitle>
    <P>Temperatur, pH, vannaktivitet (aᵥ), og oksygen påvirker mikrobiell vekst.</P>

    <SectionTitle>Temperatur</SectionTitle>
    <TemperaturSVG />
    <P>Hver art har minimum, optimum og maksimum temperatur. <Term>Psykrofile</Term>: opt &lt;15°C (arktisk). <Term>Psykrotolerante</Term>: kan vokse ved 0°C men opt 20–40°C (matforringelse). <Term>Mesofile</Term>: opt ~37°C (de fleste patogener). <Term>Termofile</Term>: opt 50–80°C. <Term>Hypertermofile</Term>: opt &gt;80°C (Archaea i varme kilder).</P>
    <P>Tilpasning til høye temperaturer: varmestabile proteiner (flere stabile bindinger), mettede/lange fettsyrer i membran, Archaea har lipid-monolag.</P>

    <SectionTitle>pH</SectionTitle>
    <P><Term>Nøytrofile</Term> (&gt;5,5 og &lt;8) — de fleste. <Term>Acidofile</Term> (≤5,5). <Term>Alkalifile</Term> (≥8).</P>

    <SectionTitle>Vannaktivitet (aᵥ)</SectionTitle>
    <P>aᵥ = damptrykk over væsken / damptrykk rent vann. Varierer 0–1. Salt og sukker reduserer aᵥ. Nedre grenser: bakterier flest &gt;0,90, gjær &gt;0,88, muggsopp &gt;0,80.</P>
    <P><Term>Halofile</Term> krever 1–12% NaCl (marine bakt. typisk 1–4%). <Term>Ekstremt halofile</Term>: 15–30% NaCl. <Term>Osmofile</Term>: tåler høyt sukkerinnhold. <Term>Xerofile</Term>: tåler tørre miljø. <Term>Kompatible forbindelser</Term> (osmolytter) hindrer at vann trekkes ut — sukker, sukkeralkoholer, aminosyrer.</P>

    <SectionTitle>Oksygen — 5 kategorier</SectionTitle>
    <div style={{ background: "#1E293B", borderRadius: 10, padding: 14, margin: "12px 0", border: "1px solid #334155" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85em", fontFamily: "'Source Sans 3', sans-serif" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #334155" }}>
            <th style={{ color: "#F59E0B", padding: "6px", textAlign: "left" }}>Kategori</th>
            <th style={{ color: "#F59E0B", padding: "6px", textAlign: "left" }}>O₂-krav</th>
            <th style={{ color: "#F59E0B", padding: "6px", textAlign: "left" }}>Vekstmønster</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Obligat aerob", "Krever O₂", "Kun toppen av røret"],
            ["Obligat anaerob", "Drepes av O₂", "Kun bunnen"],
            ["Fakultativ aerob", "Vokser m/u O₂, bedre med", "Mest toppen, noe bunn"],
            ["Mikroaerofil", "Trenger O₂, men lavere konsentrasjon", "Like under overflaten"],
            ["Aerotolerant anaerob", "Tåler O₂, bruker det ikke", "Jevnt fordelt hele røret"],
          ].map((r,i) => (
            <tr key={i} style={{ borderBottom: "1px solid #1E293B" }}>
              <td style={{ color: "#FCD34D", padding: "6px", fontWeight: 600 }}>{r[0]}</td>
              <td style={{ color: "#CBD5E1", padding: "6px" }}>{r[1]}</td>
              <td style={{ color: "#94A3B8", padding: "6px" }}>{r[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <P>O₂ omdannes til giftige biprodukter: superoksid (O₂⁻), H₂O₂, hydroksylradikaler (OH·). Enzymer som detoksifiserer: <Term>katalase</Term>, <Term>peroksidase</Term>, <Term>superoksiddismutase</Term>. Anaerobe organismer mangler disse enzymene.</P>

    <CollapsibleExample title="Eksamensoppgave V2024 oppg 1 (5p): Koble bakteriegruppe til O₂-krav">
      <P><strong style={{color:"#F8FAFC"}}>«Krever ikke, men vokser bedre med oksygen»</strong> → Fakultativ aerob</P>
      <P><strong style={{color:"#F8FAFC"}}>«Krever ikke oksygen, og vokser ikke bedre når oksygen er til stede»</strong> → Aerotolerant anaerob</P>
      <P><strong style={{color:"#F8FAFC"}}>«Vokser ikke når oksygen er til stede»</strong> → Obligat anaerob</P>
      <P><strong style={{color:"#F8FAFC"}}>«Krever oksygen, men lavere nivå enn i atmosfæren»</strong> → Mikroaerofil</P>
      <P><strong style={{color:"#F8FAFC"}}>«Krever oksygen»</strong> → Obligat aerob</P>
    </CollapsibleExample>

    <Huskeregel>O₂-kategoriene: «OFFMA» — Obligat aerob, Fakultativ, (mikro)Fil, (aero)tolerant, Anaerob obligat. Bruk røret: topp = O₂-rikt, bunn = O₂-fritt.</Huskeregel>
    <ExamNote>V2024 oppg 1 (5p): koble O₂-krav direkte. V2023 oppg 9 (4p): O₂-krav fra bilde + forklare giftige O₂-biprodukter og detoksifiseringsenzymer.</ExamNote>
  </div>
);

const Tab8Kontroll = () => (
  <div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 16 }}>
      <Pill term="Sterilisering" def="Dreper ALLE m.o. inkl. virus og sporer"/>
      <Pill term="Desinfeksjon" def="Dreper de fleste, ikke nødvendigvis sporer"/>
      <Pill term="D-verdi" def="Tid for 90% reduksjon (1 log) ved gitt temp"/>
      <Pill term="Autoklavering" def="121°C, 15 min, ~2 bar trykk"/>
      <Pill term="Pasteurisering" def="72°C i 15 sek (HTST) — dreper vegetative"/>
      <Pill term="UHT" def="Ultra High Temp — 135–145°C i sekunder"/>
      <Pill term="MIC" def="Minste inhiberende konsentrasjon"/>
      <Pill term="Bakteriostatisk" def="Hemmer vekst, dreper ikke"/>
      <Pill term="Baktericid" def="Dreper bakterier"/>
      <Pill term="Bakteriolytisk" def="Lyserer (sprekker) bakterier"/>
    </div>

    <SectionTitle>Metoder for kontroll</SectionTitle>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, margin: "12px 0" }}>
      <div style={{ background: "#1E293B", borderRadius: 10, padding: 14, border: "1px solid #334155" }}>
        <div style={{ color: "#F59E0B", fontWeight: 700, marginBottom: 6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Fysiske metoder</div>
        <P>Varme (autoklavering, pasteurisering, UHT), stråling (UV, gammastråler), filtrering (membranfilter)</P>
      </div>
      <div style={{ background: "#1E293B", borderRadius: 10, padding: 14, border: "1px solid #334155" }}>
        <div style={{ color: "#F59E0B", fontWeight: 700, marginBottom: 6, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Kjemiske metoder</div>
        <P>Desinfeksjonsmidler, steriliseringsmidler, antiseptiske midler, konserveringsmidler, antibiotika</P>
      </div>
    </div>

    <SectionTitle>Varmebehandling</SectionTitle>
    <P>Fuktig varme er mer effektiv enn tørr varme (vann overfører varmeenergi godt). Vegetative celler drepes ved 60–70°C. <Term>Endosporer</Term> (Bacillus, Clostridium) kan overleve koking — krever <Term>autoklavering</Term>: 121°C, 15 min, ~2 bar trykk.</P>
    <P><Term>Pasteurisering</Term>: 72°C i 15 sek — dreper vegetative patogener. Melk: ~10 dager holdbarhet. <Term>UHT</Term>: 135–145°C i noen sekunder — dreper mer, flere måneder holdbarhet.</P>
    <P><Term>12D-behandling</Term> brukes i hermetikkindustrien — ekstrem sikkerhetsmargin for å inaktivere C. botulinum-sporer.</P>

    <SectionTitle>D-verdi (Desimal reduksjonstid)</SectionTitle>
    <DverdiFigur />
    <FormulaBlock>D = (tₙ − t₀) / (log N₀ − log Nₙ)</FormulaBlock>
    <P>D er <Term>temperaturspesifikk</Term> — høyere temperatur gir lavere D. D er <strong style={{color:"#F8FAFC"}}>IKKE avhengig av populasjonsstørrelse</strong>.</P>

    <CollapsibleExample title="Regneeksempel: D-verdi for C. botulinum">
      <P><strong style={{color:"#F8FAFC"}}>Gitt:</strong> D₁₂₁°C = 0,3 min for C. botulinum-sporer. Startantall: 10⁸ sporer. Hvor lang tid for å nå ≤1 spore?</P>
      <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#FCD34D", padding: "8px 16px", background: "rgba(245,158,11,0.06)", borderRadius: 8, margin: "8px 0", lineHeight: 1.8 }}>
        Fra 10⁸ til 10⁰ = 8 log-reduksjoner<br/>
        Tid = 8 × D = 8 × 0,3 = <strong>2,4 min</strong>
      </div>
    </CollapsibleExample>

    <SectionTitle>Stråling</SectionTitle>
    <P><Term>UV-stråler</Term> (100–400 nm): Baktericid virkning ved UVC 220–300 nm, maks ~260 nm. Fotokjemisk effekt på DNA → mutasjoner og død. <strong style={{color:"#EF4444"}}>Dårlig gjennomtrengningsevne</strong> — kun overflatedesinfeksjon.</P>
    <P><Term>Gammastråler</Term> (ioniserende): God gjennomtrengningsevne. Direkte DNA-skade + indirekte via frie radikaler. Brukes til sterilisering av emballerte produkter, krydder.</P>

    <SectionTitle>Filtrering</SectionTitle>
    <P><Term>Membranfiltrering</Term>: Skånsom sterilisering for varmeømfintlige løsninger (vitaminer, antibiotika, vaksiner). Porestørrelse typisk 0,22 µm.</P>

    <SectionTitle>Kjemiske midler</SectionTitle>
    <P><Term>Desinfeksjonsmidler</Term> — overflater, dreper vegetative celler. <Term>Antiseptiske midler</Term> — på hud/sår. <Term>Steriliseringsmidler</Term> — dreper alt inkl. sporer.</P>
    <div style={{ background: "#1E293B", borderRadius: 10, padding: 14, margin: "12px 0", border: "1px solid #334155" }}>
      <P><Term>Halogener</Term>: Cl₂/hypokloritt (oksiderende), I₂ i etanol (mot alle inkl. sporer).</P>
      <P><Term>Alkoholer</Term>: Etanol, isopropanol — denaturerer proteiner, ødelegger membraner.</P>
      <P><Term>Kvaternære ammoniumforbindelser</Term>: BAK — påvirker cellemembran, bedre mot Gram+ enn Gram−.</P>
    </div>

    <SectionTitle>Antibiotika</SectionTitle>
    <P>Stoffer produsert av m.o. som hemmer eller dreper andre m.o. selv i lave konsentrasjoner. <Term>Virkningsmekanismer</Term>: hemme celleveggsyntese (penicillin), proteinsyntese (streptomycin, tetracyclin), DNA-replikasjon, membranintegritet.</P>
    <P><Term>MIC</Term> = Minste Inhiberende Konsentrasjon — laveste konsentrasjon som forhindrer vekst. Testes med agardiffusjonsmetode eller fortynningsrekke.</P>
    <P><Term>Bredspektret</Term> (mot mange typer) vs. <Term>smalspektret</Term> (mot få grupper). Antibiotikaresistens er et økende problem!</P>
    <P>Typer virkning: <Term>Bakteriostatisk</Term> (hemmer vekst), <Term>baktericid</Term> (dreper), <Term>bakteriolytisk</Term> (lyserer — cellevegg/membran brister).</P>

    <CollapsibleExample title="Eksamensoppgave V2025 oppg 5a (9p): Sterilisere ulike materialer">
      <P><strong style={{color:"#F8FAFC"}}>Lab-benk:</strong> UV-lys (overflatedesinfeksjon) eller 70% etanol/kjemisk desinfeksjonsmiddel.</P>
      <P><strong style={{color:"#F8FAFC"}}>Kirurgisk utstyr:</strong> Autoklavering (121°C, 15 min) — krav om absolutt sterilitet, inkl. sporer.</P>
      <P><strong style={{color:"#F8FAFC"}}>Vitaminløsning:</strong> Sterilfiltrering (0,22 µm membranfilter) — unngå varmedegradering.</P>
      <P><strong style={{color:"#F8FAFC"}}>Krydder:</strong> Gammastråling — bevarer smak/lukt, god gjennomtrenging.</P>
      <P><strong style={{color:"#F8FAFC"}}>Sykehusmadrass:</strong> Ozon-gass eller overflatedesinfeksjonsmiddel (utfordring: størrelse).</P>
    </CollapsibleExample>

    <Huskeregel>Velg steriliseringsmetode etter materialet: Tåler varme? → Autoklavering. Tåler IKKE varme? → Filtrering. Overflate? → UV/etanol. Pakket produkt? → Gammastråling.</Huskeregel>
    <ExamNote>V2025 oppg 5 (9p): sterilisere ulike materialer + MIC-test. V2024 oppg 2 (10p): D-verdi, endosporer, temperaturklasser. Tung vekting — dette er eksamensgull.</ExamNote>
  </div>
);

const TAB_CONTENT = {
  metabolisme: Tab1Metabolisme,
  diversitet: Tab2Diversitet,
  naering: Tab3Naering,
  vekst: Tab4Vekst,
  beregninger: Tab5Beregninger,
  maaling: Tab6Maaling,
  miljo: Tab7Miljo,
  kontroll: Tab8Kontroll,
};

// ─── Main Component ───
export default function Emne3BakteriellVekst() {
  const [activeTab, setActiveTab] = useState("metabolisme");
  const [visited, setVisited] = useState(new Set(["metabolisme"]));
  const contentRef = useRef(null);

  useEffect(() => {
    setVisited(prev => new Set([...prev, activeTab]));
    if (contentRef.current) contentRef.current.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  const TabContent = TAB_CONTENT[activeTab];

  return (
    <div style={{ fontFamily: "'Source Sans 3', sans-serif", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Source+Sans+3:ital,wght@0,300;0,400;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #0F172A; }
        ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #475569; }
      `}</style>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
        borderBottom: "2px solid #F59E0B", padding: "24px 20px 18px"
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <span style={{ color: "#F59E0B", fontSize: "0.8em", fontWeight: 700, fontFamily: "'Plus Jakarta Sans', sans-serif", background: "rgba(245,158,11,0.15)", padding: "4px 12px", borderRadius: 6, letterSpacing: 1 }}>EMNE 3</span>
          <h1 style={{ color: "#F8FAFC", fontSize: "1.6em", fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: -0.5 }}>Bakteriell vekst</h1>
        </div>
        <p style={{ color: "#94A3B8", fontSize: "0.85em", marginTop: 6, fontFamily: "'Source Sans 3', sans-serif" }}>
          Metabolisme · Ernæring · Vekst · Miljøfaktorer · Vekstkontroll — K3, K4
        </p>
        {/* Progress bar */}
        <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
          {TABS.map(t => (
            <div key={t.id} style={{
              flex: 1, height: 4, borderRadius: 2,
              background: visited.has(t.id) ? "#F59E0B" : "#334155",
              transition: "background 0.3s"
            }}/>
          ))}
        </div>
        <div style={{ color: "#64748B", fontSize: "0.75em", marginTop: 4 }}>{visited.size}/{TABS.length} seksjoner besøkt</div>
      </div>

      {/* Tab bar */}
      <div style={{
        display: "flex", overflowX: "auto", background: "#0F172A",
        borderBottom: "1px solid #334155", padding: "0 8px",
        WebkitOverflowScrolling: "touch"
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "12px 14px", whiteSpace: "nowrap",
            color: activeTab === t.id ? "#F59E0B" : "#64748B",
            fontWeight: activeTab === t.id ? 700 : 500,
            fontSize: "0.82em", fontFamily: "'Plus Jakarta Sans', sans-serif",
            borderBottom: activeTab === t.id ? "2px solid #F59E0B" : "2px solid transparent",
            transition: "all 0.2s", position: "relative"
          }}>
            <span style={{ marginRight: 4 }}>{t.icon}</span>{t.label}
            {visited.has(t.id) && activeTab !== t.id && (
              <span style={{ position: "absolute", top: 6, right: 4, width: 5, height: 5, borderRadius: "50%", background: "#F59E0B", opacity: 0.5 }}/>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div ref={contentRef} style={{
        background: "#0F172A", padding: "20px 20px 60px",
        maxWidth: 800, margin: "0 auto"
      }}>
        {/* Tab header bar */}
        <div style={{
          background: "linear-gradient(90deg, rgba(245,158,11,0.15), transparent)",
          borderLeft: "3px solid #F59E0B", padding: "10px 16px",
          borderRadius: "0 8px 8px 0", marginBottom: 20
        }}>
          <div style={{ color: "#F59E0B", fontWeight: 800, fontSize: "1.1em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {TABS.find(t => t.id === activeTab)?.icon} {TABS.find(t => t.id === activeTab)?.label}
          </div>
          <div style={{ color: "#64748B", fontSize: "0.78em", fontFamily: "'Source Sans 3', sans-serif" }}>Emne 3 — Bakteriell vekst</div>
        </div>

        <TabContent />
      </div>
    </div>
  );
}
