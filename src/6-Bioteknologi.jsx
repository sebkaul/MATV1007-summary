import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// EMNE 6 — BIOTEKNOLOGI  |  KOMPLETT (16 fagtemaer)
// MATV1007 Eksamensforberedelse
// ═══════════════════════════════════════════════════════════════

const GROUPS = [
  {
    id: "del1",
    label: "Del 1 · Verktøy & teknikker",
    short: "Verktøy & teknikker",
    subtitle: "Intro, terminologi, restriksjon, vektorer, kloning, CRISPR, PCR, gelelektroforese",
    tabs: [
      { id: "intro", label: "Introduksjon" },
      { id: "terminologi", label: "Genetisk terminologi" },
      { id: "restriksjon", label: "Restriksjonsenzymer" },
      { id: "vektorer", label: "Vektorer & ligaser" },
      { id: "kloning", label: "Kloning av DNA" },
      { id: "crispr", label: "CRISPR-Cas9" },
      { id: "pcr", label: "PCR" },
      { id: "gel", label: "Gelelektroforese" },
    ],
  },
  {
    id: "del2",
    label: "Del 2 · Analyseteknikker",
    short: "Analyseteknikker",
    subtitle: "Southern blotting, DNA-sekvensering, DNA-fingerprinting, mikromatriser & FISH",
    tabs: [
      { id: "southern", label: "Southern blotting" },
      { id: "sekvensering", label: "DNA-sekvensering" },
      { id: "fingerprint", label: "DNA-fingerprinting" },
      { id: "mikromatriser", label: "Mikromatriser & FISH" },
    ],
  },
  {
    id: "del3",
    label: "Del 3 · Mutasjoner, genreg. & etikk",
    short: "Mutasjoner, genreg. & etikk",
    subtitle: "Mutasjoner, mutagener, lac-operon/genregulering, etikk",
    tabs: [
      { id: "mutasjoner", label: "Mutasjoner" },
      { id: "mutagener", label: "Mutagener" },
      { id: "genreg", label: "Genregulering" },
      { id: "etikk", label: "Etikk" },
    ],
  },
];

const ALL_TABS = GROUPS.flatMap((g) => g.tabs);
const TAB_TO_GROUP = Object.fromEntries(
  GROUPS.flatMap((g) => g.tabs.map((t) => [t.id, g.id]))
);

/* ── Shared styled components ─────────────────────────────── */

const Term = ({ children, def }) => {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!show) return;
    const handle = (e) => { if (ref.current && !ref.current.contains(e.target)) setShow(false); };
    document.addEventListener("click", handle);
    return () => document.removeEventListener("click", handle);
  }, [show]);
  return (
    <span ref={ref} style={{ position: "relative", display: "inline" }}>
      <span
        onClick={(e) => { e.stopPropagation(); setShow(!show); }}
        style={{
          color: "#60a5fa", background: "rgba(59,130,246,0.10)",
          padding: "1px 5px", borderRadius: 4, cursor: "pointer",
          fontWeight: 600, fontSize: "0.95em",
          borderBottom: "1.5px dashed rgba(96,165,250,0.5)",
          transition: "background 0.15s",
        }}
      >{children}</span>
      {show && def && (
        <span style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: 0, zIndex: 999,
          background: "#1e293b", border: "1px solid #3b82f6", borderRadius: 8,
          padding: "8px 12px", fontSize: "0.82rem", color: "#cbd5e1",
          minWidth: 220, maxWidth: 340, lineHeight: 1.45,
          boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
        }}>{def}</span>
      )}
    </span>
  );
};

const Sec = ({ children, icon, title }) => (
  <div style={{ marginTop: 28 }}>
    <h3 style={{
      fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1.05rem",
      color: "#3b82f6", margin: "0 0 10px", display: "flex", alignItems: "center", gap: 8,
      letterSpacing: "0.01em", fontWeight: 700,
    }}><span style={{ fontSize: "1.15em" }}>{icon}</span> {title}</h3>
    {children}
  </div>
);

const Pills = ({ terms }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
    {terms.map((t, i) => <Term key={i} def={t.d}>{t.t}</Term>)}
  </div>
);

const Husk = ({ children }) => (
  <div style={{
    background: "linear-gradient(135deg,rgba(59,130,246,0.09),rgba(59,130,246,0.03))",
    border: "1px solid rgba(59,130,246,0.25)", borderLeft: "4px solid #3b82f6",
    borderRadius: 8, padding: "12px 16px", marginTop: 20,
  }}>
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.82rem", color: "#3b82f6", marginBottom: 4, fontWeight: 700 }}>💡 Huskeregel</div>
    <div style={{ fontSize: "0.88rem", color: "#e2e8f0", lineHeight: 1.55 }}>{children}</div>
  </div>
);

const Exam = ({ children }) => (
  <div style={{
    background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.22)",
    borderRadius: 8, padding: "10px 14px", marginTop: 14,
    fontSize: "0.82rem", color: "#fca5a5", lineHeight: 1.5,
  }}>
    <span style={{ fontWeight: 700, color: "#f87171" }}>🎯 Eksamensrelevans: </span>{children}
  </div>
);

const Eks = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 18 }}>
      <div onClick={() => setOpen(!open)} style={{
        background: "#1e293b", border: "1px solid #334155", borderRadius: open ? "8px 8px 0 0" : 8,
        padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center",
        transition: "border-radius 0.15s",
      }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.88rem", color: "#f1f5f9" }}>📝 {title}</span>
        <span style={{ color: "#3b82f6", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", fontSize: "0.8em" }}>▼</span>
      </div>
      {open && (
        <div style={{
          background: "#172033", border: "1px solid #334155", borderTop: "none",
          borderRadius: "0 0 8px 8px", padding: "14px 16px",
          fontSize: "0.86rem", color: "#94a3b8", lineHeight: 1.65,
        }}>{children}</div>
      )}
    </div>
  );
};

const Formula = ({ children }) => (
  <span style={{
    fontFamily: "'JetBrains Mono',monospace", background: "rgba(59,130,246,0.08)",
    border: "1px solid rgba(59,130,246,0.18)", borderRadius: 5,
    padding: "3px 10px", fontSize: "0.9em", color: "#93c5fd",
    display: "inline-block", margin: "6px 0",
  }}>{children}</span>
);

const P = ({ children, mt }) => (
  <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.65, margin: `${mt || 0}px 0 0` }}>{children}</p>
);

const Card = ({ title, color, children }) => (
  <div style={{ background: "#1e293b", border: `1px solid ${color}30`, borderRadius: 8, padding: "10px 14px" }}>
    <div style={{ color, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.9rem", marginBottom: 4 }}>{title}</div>
    <div style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.55 }}>{children}</div>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   DEL 1 — SVG diagrams
   ═══════════════════════════════════════════════════════════════ */

const SvgRestriksjon = () => (
  <svg viewBox="0 0 520 195" style={{ width: "100%", maxWidth: 520, display: "block", margin: "14px auto" }}>
    <text x="20" y="18" fill="#94a3b8" fontSize="10" fontFamily="monospace">EcoRI gjenkjenner palindromen:</text>
    <text x="20" y="40" fill="#94a3b8" fontSize="10" fontFamily="monospace">5'</text>
    <text x="40" y="40" fill="#f1f5f9" fontSize="13" fontFamily="monospace">...G</text>
    <text x="78" y="40" fill="#f87171" fontSize="13" fontFamily="monospace" fontWeight="bold">↓</text>
    <text x="90" y="40" fill="#f1f5f9" fontSize="13" fontFamily="monospace">A A T T C...</text>
    <text x="220" y="40" fill="#94a3b8" fontSize="10" fontFamily="monospace">3'</text>
    <text x="20" y="60" fill="#94a3b8" fontSize="10" fontFamily="monospace">3'</text>
    <text x="40" y="60" fill="#f1f5f9" fontSize="13" fontFamily="monospace">...C T T A A</text>
    <text x="153" y="60" fill="#f87171" fontSize="13" fontFamily="monospace" fontWeight="bold">↑</text>
    <text x="165" y="60" fill="#f1f5f9" fontSize="13" fontFamily="monospace">G...</text>
    <text x="220" y="60" fill="#94a3b8" fontSize="10" fontFamily="monospace">5'</text>
    <rect x="38" y="22" width="175" height="48" rx="4" fill="none" stroke="#3b82f6" strokeWidth="1.2" strokeDasharray="4 2" opacity="0.6" />
    <text x="75" y="16" fill="#3b82f6" fontSize="9" fontFamily="sans-serif">Palindromsekvens (leses likt begge veier)</text>
    <line x1="130" y1="75" x2="130" y2="92" stroke="#64748b" strokeWidth="1.2" markerEnd="url(#arr1)" />
    <defs><marker id="arr1" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#64748b" /></marker></defs>
    <text x="20" y="112" fill="#94a3b8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Resultat — klebrige ender (sticky ends):</text>
    <text x="20" y="132" fill="#f1f5f9" fontSize="12" fontFamily="monospace">5' ...G          A A T T C... 3'</text>
    <text x="20" y="152" fill="#f1f5f9" fontSize="12" fontFamily="monospace">3' ...C T T A A          G... 5'</text>
    <rect x="82" y="118" width="56" height="18" rx="3" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" strokeWidth="1" />
    <text x="110" y="167" textAnchor="middle" fill="#60a5fa" fontSize="8.5" fontFamily="sans-serif">5'-overheng</text>
    <text x="300" y="112" fill="#fbbf24" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Butte ender (blunt ends):</text>
    <text x="300" y="132" fill="#f1f5f9" fontSize="11" fontFamily="monospace">EcoRV: GAT↓ATC</text>
    <text x="300" y="148" fill="#94a3b8" fontSize="9.5" fontFamily="sans-serif">→ Jevne kutt, ingen overheng</text>
    <text x="300" y="164" fill="#94a3b8" fontSize="9.5" fontFamily="sans-serif">→ Vanskeligere å ligere</text>
    <text x="300" y="186" fill="#a78bfa" fontSize="9" fontFamily="sans-serif">Isoschizomerer: ulike enzymer, samme gjenkj.sekvens</text>
  </svg>
);

const SvgPlasmid = () => (
  <svg viewBox="0 0 420 210" style={{ width: "100%", maxWidth: 420, display: "block", margin: "14px auto" }}>
    <circle cx="140" cy="105" r="78" fill="none" stroke="#3b82f6" strokeWidth="3" />
    <circle cx="140" cy="27" r="12" fill="rgba(74,222,128,0.15)" stroke="#4ade80" strokeWidth="1.5" />
    <text x="140" y="30" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold" fontFamily="sans-serif">ori</text>
    <text x="140" y="14" textAnchor="middle" fill="#86efac" fontSize="7" fontFamily="sans-serif">Replikasjonsstart</text>
    <path d="M78,50 A78,78 0 0,0 65,105" stroke="#f87171" strokeWidth="7" fill="none" strokeLinecap="round" />
    <text x="48" y="75" fill="#f87171" fontSize="9" fontWeight="bold" fontFamily="sans-serif">ampᴿ</text>
    <path d="M202,50 A78,78 0 0,1 215,105" stroke="#fbbf24" strokeWidth="7" fill="none" strokeLinecap="round" />
    <text x="222" y="75" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="sans-serif">tetᴿ</text>
    <rect x="125" y="176" width="30" height="12" rx="4" fill="rgba(168,85,247,0.25)" stroke="#a78bfa" strokeWidth="1" />
    <text x="140" y="185" textAnchor="middle" fill="#a78bfa" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">MCS</text>
    <text x="140" y="205" textAnchor="middle" fill="#c4b5fd" fontSize="7.5" fontFamily="sans-serif">Multikloningssted</text>
    <text x="140" y="100" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Plasmid</text>
    <text x="140" y="114" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">(eks. pBR322)</text>
    <g transform="translate(255,22)">
      <text x="0" y="0" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Tre essensielle deler:</text>
      <text x="0" y="18" fill="#4ade80" fontSize="9.5" fontFamily="sans-serif">• ori — replikasjonsstart</text>
      <text x="0" y="34" fill="#f87171" fontSize="9.5" fontFamily="sans-serif">• Markørgener (AB-resistens)</text>
      <text x="0" y="50" fill="#a78bfa" fontSize="9.5" fontFamily="sans-serif">• MCS — innsettingspunkt for DNA</text>
      <text x="0" y="74" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Andre vektortyper:</text>
      <text x="0" y="92" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">• Bakteriofager (λ, M13)</text>
      <text x="0" y="106" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">• Cosmider (plasmid+fag)</text>
      <text x="0" y="120" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">• BAC — bacterial artificial chrom.</text>
      <text x="0" y="134" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">• YAC — yeast artificial chrom.</text>
      <text x="0" y="154" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">Større vektor = kan bære mer DNA</text>
      <text x="0" y="168" fill="#64748b" fontSize="8.5" fontFamily="sans-serif">Plasmid: 1–10 kb | BAC: ~300 kb</text>
    </g>
  </svg>
);

const SvgCRISPR = () => (
  <svg viewBox="0 0 500 215" style={{ width: "100%", maxWidth: 500, display: "block", margin: "14px auto" }}>
    <text x="10" y="14" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Opprinnelse: bakteriers immunforsvar mot virus</text>
    <text x="10" y="28" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">CRISPR = repeterende sekvenser avbrutt av fremmed DNA (spacers fra virusinfeksjoner)</text>
    <text x="10" y="40" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">cas-gener ligger nær CRISPR → produserer Cas-proteiner (klasse V restriksjonsenzymer)</text>
    <rect x="30" y="85" width="440" height="7" rx="3.5" fill="#334155" />
    <rect x="30" y="96" width="440" height="7" rx="3.5" fill="#475569" />
    <rect x="190" y="82" width="80" height="24" rx="4" fill="rgba(239,68,68,0.15)" stroke="#f87171" strokeWidth="1.2" />
    <text x="230" y="98" textAnchor="middle" fill="#f87171" fontSize="8" fontFamily="monospace">Mål-DNA</text>
    <rect x="272" y="82" width="32" height="24" rx="3" fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth="1" />
    <text x="288" y="98" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontFamily="monospace">PAM</text>
    <text x="288" y="78" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily="sans-serif">Nødvendig!</text>
    <ellipse cx="230" cy="58" rx="52" ry="24" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1.5" />
    <text x="230" y="55" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Cas9</text>
    <text x="230" y="67" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="sans-serif">RNA-guidet nuklease</text>
    <path d="M192,82 C182,68 186,54 200,52" fill="none" stroke="#4ade80" strokeWidth="2" />
    <text x="152" y="62" fill="#4ade80" fontSize="9" fontWeight="bold" fontFamily="sans-serif">sgRNA</text>
    <text x="148" y="74" fill="#86efac" fontSize="7.5" fontFamily="sans-serif">(guide-RNA)</text>
    <line x1="228" y1="106" x2="228" y2="130" stroke="#f87171" strokeWidth="1.8" strokeDasharray="3 2" />
    <line x1="232" y1="106" x2="232" y2="130" stroke="#f87171" strokeWidth="1.8" strokeDasharray="3 2" />
    <text x="230" y="143" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="sans-serif">✂ Dobbelttrådbrudd</text>
    <rect x="50" y="155" width="170" height="50" rx="6" fill="rgba(251,191,36,0.06)" stroke="#fbbf24" strokeWidth="1" />
    <text x="135" y="172" textAnchor="middle" fill="#fbbf24" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">NHEJ (upresist)</text>
    <text x="135" y="186" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Feil reparasjon → knock-out</text>
    <text x="135" y="198" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Gen deaktiveres</text>
    <rect x="280" y="155" width="170" height="50" rx="6" fill="rgba(74,222,128,0.06)" stroke="#4ade80" strokeWidth="1" />
    <text x="365" y="172" textAnchor="middle" fill="#4ade80" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">HDR + templat (presist)</text>
    <text x="365" y="186" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Korrekt innsetting → knock-in</text>
    <text x="365" y="198" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Spesifikk DNA-endring</text>
  </svg>
);

const SvgPCR = () => (
  <svg viewBox="0 0 500 290" style={{ width: "100%", maxWidth: 500, display: "block", margin: "14px auto" }}>
    <defs><marker id="arr2" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#3b82f6" /></marker></defs>
    <rect x="8" y="8" width="152" height="78" rx="8" fill="rgba(239,68,68,0.08)" stroke="#f87171" strokeWidth="1.3" />
    <text x="84" y="28" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold" fontFamily="sans-serif">1. Denaturering</text>
    <text x="84" y="46" textAnchor="middle" fill="#fca5a5" fontSize="10" fontFamily="monospace">94–96 °C</text>
    <text x="84" y="60" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">dsDNA → 2× ssDNA</text>
    <text x="84" y="74" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">H-bindinger brytes</text>
    <line x1="162" y1="47" x2="178" y2="47" stroke="#3b82f6" strokeWidth="1.3" markerEnd="url(#arr2)" />
    <rect x="182" y="8" width="152" height="78" rx="8" fill="rgba(74,222,128,0.07)" stroke="#4ade80" strokeWidth="1.3" />
    <text x="258" y="28" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold" fontFamily="sans-serif">2. Annealing</text>
    <text x="258" y="46" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="monospace">50–65 °C</text>
    <text x="258" y="60" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Primere → templat</text>
    <text x="258" y="74" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Temp ≈ Tm − 5 °C</text>
    <line x1="336" y1="47" x2="352" y2="47" stroke="#3b82f6" strokeWidth="1.3" markerEnd="url(#arr2)" />
    <rect x="356" y="8" width="136" height="78" rx="8" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="1.3" />
    <text x="424" y="28" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold" fontFamily="sans-serif">3. Elongering</text>
    <text x="424" y="46" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="monospace">72 °C</text>
    <text x="424" y="60" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Taq polymerase</text>
    <text x="424" y="74" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">dNTP → ny tråd (5'→3')</text>
    <path d="M424,90 C424,118 84,118 84,90" fill="none" stroke="#3b82f6" strokeWidth="1.3" strokeDasharray="5 3" markerEnd="url(#arr2)" />
    <text x="254" y="116" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">× 25–40 sykluser</text>
    <rect x="8" y="132" width="484" height="48" rx="6" fill="rgba(59,130,246,0.05)" stroke="#334155" strokeWidth="1" />
    <text x="20" y="152" fill="#3b82f6" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">Eksponensiell amplifisering:</text>
    <text x="20" y="170" fill="#f1f5f9" fontSize="12" fontFamily="monospace">Kopier = 2ⁿ   (n = sykluser)   →   30 sykluser ≈ 10⁹ kopier</text>
    <rect x="8" y="192" width="484" height="42" rx="6" fill="rgba(59,130,246,0.04)" stroke="#334155" strokeWidth="1" />
    <text x="20" y="210" fill="#3b82f6" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">I PCR-røret:</text>
    <text x="102" y="210" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">DNA-templat • Taq polymerase • 2 primere (fw+rev) • dNTP (A,C,G,T i 1:1:1:1) • Buffer m/ Mg²⁺</text>
    <text x="20" y="226" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Primer: 15–35 baser, 40–60% GC. Tm = 4(G+C) + 2(A+T). Annealing ≈ Tm − 5 °C.</text>
    <rect x="8" y="246" width="236" height="36" rx="6" fill="rgba(251,191,36,0.06)" stroke="#fbbf24" strokeWidth="1" />
    <text x="126" y="263" textAnchor="middle" fill="#fbbf24" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">qPCR (kvantitativ)</text>
    <text x="126" y="276" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Fluorescens ∝ antall kopier, sanntid</text>
    <rect x="256" y="246" width="236" height="36" rx="6" fill="rgba(168,85,247,0.06)" stroke="#a78bfa" strokeWidth="1" />
    <text x="374" y="263" textAnchor="middle" fill="#a78bfa" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">RT-PCR (revers transkriptase)</text>
    <text x="374" y="276" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">RNA → cDNA → PCR</text>
  </svg>
);

const SvgGel = () => (
  <svg viewBox="0 0 460 230" style={{ width: "100%", maxWidth: 460, display: "block", margin: "14px auto" }}>
    <rect x="25" y="22" width="195" height="185" rx="6" fill="rgba(59,130,246,0.03)" stroke="#334155" strokeWidth="1.5" />
    <rect x="25" y="16" width="195" height="8" rx="2" fill="rgba(239,68,68,0.2)" stroke="#f87171" strokeWidth="1" />
    <text x="122" y="12" textAnchor="middle" fill="#f87171" fontSize="8.5" fontFamily="sans-serif">⊖ Katode (negativ)</text>
    <rect x="25" y="204" width="195" height="8" rx="2" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="1" />
    <text x="122" y="224" textAnchor="middle" fill="#3b82f6" fontSize="8.5" fontFamily="sans-serif">⊕ Anode (positiv)</text>
    {[45, 82, 119, 156, 193].map((x, i) => (
      <g key={i}>
        <rect x={x - 8} y="28" width="16" height="5" rx="1" fill="#475569" />
        <text x={x} y="26" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="sans-serif">{["M", "1", "2", "3", "M"][i]}</text>
      </g>
    ))}
    {[48, 70, 88, 106, 128, 155].map((y, i) => (
      <g key={i}>
        <rect x="39" y={y} width="12" height="3" rx="1" fill="#4ade80" opacity={0.85 - i * 0.1} />
        <rect x="187" y={y} width="12" height="3" rx="1" fill="#4ade80" opacity={0.85 - i * 0.1} />
      </g>
    ))}
    <text x="14" y="52" fill="#4ade80" fontSize="6" fontFamily="monospace">10k</text>
    <text x="14" y="74" fill="#4ade80" fontSize="6" fontFamily="monospace">5k</text>
    <text x="14" y="92" fill="#4ade80" fontSize="6" fontFamily="monospace">3k</text>
    <text x="14" y="110" fill="#4ade80" fontSize="6" fontFamily="monospace">1.5k</text>
    <text x="14" y="132" fill="#4ade80" fontSize="6" fontFamily="monospace">500</text>
    <text x="14" y="159" fill="#4ade80" fontSize="6" fontFamily="monospace">100</text>
    <rect x="76" y="70" width="12" height="3" rx="1" fill="#3b82f6" />
    <rect x="76" y="128" width="12" height="3" rx="1" fill="#3b82f6" />
    <rect x="113" y="106" width="12" height="3.5" rx="1" fill="#3b82f6" opacity="0.95" />
    <rect x="150" y="48" width="12" height="3" rx="1" fill="#3b82f6" />
    <rect x="150" y="88" width="12" height="3" rx="1" fill="#3b82f6" />
    <rect x="150" y="155" width="12" height="3" rx="1" fill="#3b82f6" />
    <text x="9" y="115" fill="#64748b" fontSize="7" fontFamily="sans-serif" transform="rotate(-90,9,115)">Vandring →</text>
    <g transform="translate(250,22)">
      <text x="0" y="0" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Prinsipp:</text>
      <text x="0" y="18" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">• DNA er negativt ladet (PO₄⁻)</text>
      <text x="0" y="32" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">• Vandrer mot positiv pol</text>
      <text x="0" y="46" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">• Små fragmenter → lenger</text>
      <text x="0" y="60" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">• Store fragmenter → kortere</text>
      <text x="0" y="82" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Tolkning:</text>
      <text x="0" y="98" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Prøve 1: RE-kuttet → 2 fragmenter</text>
      <text x="0" y="112" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Prøve 2: PCR-produkt → 1 tydelig</text>
      <text x="0" y="126" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Prøve 3: RE-kuttet → 3 fragmenter</text>
      <text x="0" y="148" fill="#4ade80" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Deteksjon:</text>
      <text x="0" y="164" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">GelRed / etidiumbromid + UV</text>
      <text x="0" y="178" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">M = størrelsesmarkør (ladder)</text>
      <text x="0" y="192" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Loading buffer: glyserol + farge</text>
    </g>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   DEL 2 — SVG diagrams
   ═══════════════════════════════════════════════════════════════ */

const SvgSouthern = () => (
  <svg viewBox="0 0 540 245" style={{ width: "100%", maxWidth: 540, display: "block", margin: "14px auto" }}>
    <defs><marker id="arr2s" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#64748b" /></marker></defs>
    {[
      { x: 0, label: "1. Kutting", sub: "RE / PCR", color: "#f87171" },
      { x: 90, label: "2. Elektro-", sub: "forese", color: "#fbbf24" },
      { x: 180, label: "3. Denatu-", sub: "rering", color: "#fb923c" },
      { x: 270, label: "4. Blotting", sub: "Gel→membran", color: "#4ade80" },
      { x: 360, label: "5. Hybridi-", sub: "sering", color: "#3b82f6" },
      { x: 450, label: "6. Deteksjon", sub: "Autoradiografi", color: "#a78bfa" },
    ].map((s, i) => (
      <g key={i}>
        <rect x={s.x} y="8" width="82" height="52" rx="6" fill={`${s.color}12`} stroke={s.color} strokeWidth="1.3" />
        <text x={s.x + 41} y="28" textAnchor="middle" fill={s.color} fontSize="9" fontWeight="bold" fontFamily="sans-serif">{s.label}</text>
        <text x={s.x + 41} y="42" textAnchor="middle" fill={s.color} fontSize="8" fontFamily="sans-serif">{s.sub}</text>
        {i < 5 && <line x1={s.x + 84} y1="34" x2={s.x + 88} y2="34" stroke="#64748b" strokeWidth="1" markerEnd="url(#arr2s)" />}
      </g>
    ))}
    <g transform="translate(25,75)">
      {[
        { y: 0, h: 16, label: "Vekt (presses ned)", fill: "#475569" },
        { y: 18, h: 16, label: "Papirhåndklær (absorberer)", fill: "#64748b" },
        { y: 36, h: 14, label: "Nitrocellulose-membran", fill: "#3b82f6" },
        { y: 52, h: 16, label: "Gel (denaturert DNA)", fill: "#fbbf24" },
        { y: 70, h: 12, label: "Whatman-papir", fill: "#94a3b8" },
        { y: 84, h: 14, label: "Plattform", fill: "#475569" },
        { y: 100, h: 16, label: "Overføringsbuffer (SSC)", fill: "#06b6d4" },
      ].map((layer, i) => (
        <g key={i}>
          <rect x="0" y={layer.y} width="210" height={layer.h} rx="2" fill={`${layer.fill}18`} stroke={layer.fill} strokeWidth="1" />
          <text x="105" y={layer.y + layer.h / 2 + 3.5} textAnchor="middle" fill={layer.fill} fontSize="8" fontFamily="sans-serif">{layer.label}</text>
        </g>
      ))}
      <line x1="222" y1="112" x2="222" y2="8" stroke="#06b6d4" strokeWidth="1.3" strokeDasharray="4 2" markerEnd="url(#arr2s)" />
      <text x="232" y="55" fill="#06b6d4" fontSize="8.5" fontFamily="sans-serif">Kapillær-</text>
      <text x="232" y="66" fill="#06b6d4" fontSize="8.5" fontFamily="sans-serif">krefter</text>
    </g>
    <g transform="translate(295,78)">
      <text x="0" y="0" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Viktige detaljer:</text>
      <text x="0" y="16" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• DNA MÅ denatureres FØR blotting</text>
      <text x="0" y="30" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Immobilisering: UV-lys eller 80 °C</text>
      <text x="0" y="44" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Prehybridisering: blokkere membran</text>
      <text x="0" y="56" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">  med nøytralt DNA (lakse-/sildesperm)</text>
      <text x="0" y="70" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">  → forhindre uspesifikk probe-binding</text>
      <text x="0" y="88" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Probe:</text>
      <text x="0" y="102" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Kort ssDNA/RNA, komplementær</text>
      <text x="0" y="114" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Merket: fluorescens, biotin, ³²P</text>
      <text x="0" y="126" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Binder mål-DNA = hybridisering</text>
      <text x="0" y="144" fill="#fbbf24" fontSize="8.5" fontFamily="sans-serif">Southern = DNA | Northern = RNA</text>
      <text x="0" y="156" fill="#fbbf24" fontSize="8.5" fontFamily="sans-serif">Western = protein (SDS-PAGE + antistoff)</text>
    </g>
  </svg>
);

const SvgSanger = () => (
  <svg viewBox="0 0 510 215" style={{ width: "100%", maxWidth: 510, display: "block", margin: "14px auto" }}>
    <rect x="8" y="5" width="235" height="55" rx="6" fill="rgba(59,130,246,0.05)" stroke="#334155" strokeWidth="1" />
    <text x="18" y="22" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">dNTP (vanlig byggestein)</text>
    <text x="18" y="36" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Har 3'-OH → syntese fortsetter</text>
    <text x="18" y="50" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">dATP, dCTP, dGTP, dTTP</text>
    <rect x="255" y="5" width="247" height="55" rx="6" fill="rgba(239,68,68,0.05)" stroke="#f87171" strokeWidth="1" />
    <text x="265" y="22" fill="#f87171" fontSize="10" fontWeight="bold" fontFamily="sans-serif">ddNTP (terminator)</text>
    <text x="265" y="36" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Mangler 3'-OH → STOPPER syntese</text>
    <text x="265" y="50" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">ddATP, ddCTP, ddGTP, ddTTP (fluorescens)</text>
    <text x="8" y="80" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Prosedyre:</text>
    <text x="8" y="96" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">1. Templat + primer + dNTP + litt ddNTP + polymerase → PCR-reaksjon</text>
    <text x="8" y="110" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">2. ddNTP settes inn tilfeldig → fragmenter av alle lengder, hvert slutter med merket ddNTP</text>
    <text x="8" y="124" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">3. Kapillærelektroforese: separasjon med 1 base forskjell i størrelse</text>
    <text x="8" y="138" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">4. Laser leser fluorescensfarge på hvert fragment → kromatogram/elektroferogram</text>
    <rect x="8" y="150" width="494" height="56" rx="6" fill="rgba(59,130,246,0.03)" stroke="#334155" strokeWidth="1" />
    <text x="18" y="165" fill="#64748b" fontSize="8" fontFamily="sans-serif">Kromatogram (elektroferogram):</text>
    {[
      { x: 35, c: "#4ade80", b: "A" }, { x: 60, c: "#3b82f6", b: "T" }, { x: 85, c: "#f87171", b: "G" },
      { x: 110, c: "#fbbf24", b: "C" }, { x: 135, c: "#4ade80", b: "A" }, { x: 160, c: "#4ade80", b: "A" },
      { x: 185, c: "#3b82f6", b: "T" }, { x: 210, c: "#f87171", b: "G" }, { x: 235, c: "#fbbf24", b: "C" },
      { x: 260, c: "#3b82f6", b: "T" }, { x: 285, c: "#4ade80", b: "A" }, { x: 310, c: "#fbbf24", b: "C" },
      { x: 335, c: "#f87171", b: "G" }, { x: 360, c: "#3b82f6", b: "T" }, { x: 385, c: "#4ade80", b: "A" },
      { x: 410, c: "#fbbf24", b: "C" }, { x: 435, c: "#f87171", b: "G" }, { x: 460, c: "#3b82f6", b: "T" },
    ].map((p, i) => (
      <g key={i}>
        <ellipse cx={p.x} cy="181" rx="8" ry="11" fill={`${p.c}25`} stroke={p.c} strokeWidth="0.8" />
        <text x={p.x} y="200" textAnchor="middle" fill={p.c} fontSize="8" fontFamily="monospace" fontWeight="bold">{p.b}</text>
      </g>
    ))}
    <text x="485" y="185" fill="#64748b" fontSize="10">→</text>
  </svg>
);

const SvgFingerprint = () => (
  <svg viewBox="0 0 520 165" style={{ width: "100%", maxWidth: 520, display: "block", margin: "14px auto" }}>
    <defs><marker id="arr2f" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#3b82f6" /></marker></defs>
    {[
      { x: 0, w: 85, label: "Prøvetaking", sub: "Blod, spytt, hår", color: "#f87171" },
      { x: 95, w: 85, label: "DNA-isolering", sub: "Ekstraksjon", color: "#fbbf24" },
      { x: 190, w: 85, label: "PCR", sub: "Kopier STR-loci", color: "#4ade80" },
      { x: 285, w: 100, label: "Kapillær-elf.", sub: "Separasjon", color: "#3b82f6" },
      { x: 395, w: 115, label: "Elektroferogram", sub: "DNA-profil", color: "#a78bfa" },
    ].map((s, i) => (
      <g key={i}>
        <rect x={s.x} y="8" width={s.w} height="48" rx="6" fill={`${s.color}10`} stroke={s.color} strokeWidth="1.3" />
        <text x={s.x + s.w / 2} y="27" textAnchor="middle" fill={s.color} fontSize="9" fontWeight="bold" fontFamily="sans-serif">{s.label}</text>
        <text x={s.x + s.w / 2} y="42" textAnchor="middle" fill={`${s.color}cc`} fontSize="8" fontFamily="sans-serif">{s.sub}</text>
        {i < 4 && <line x1={s.x + s.w + 2} y1="32" x2={s.x + s.w + 8} y2="32" stroke="#3b82f6" strokeWidth="1" markerEnd="url(#arr2f)" />}
      </g>
    ))}
    <g transform="translate(0,72)">
      <text x="0" y="0" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Markørsekvenser:</text>
      <rect x="0" y="8" width="160" height="38" rx="5" fill="rgba(74,222,128,0.06)" stroke="#4ade80" strokeWidth="1" />
      <text x="80" y="25" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold" fontFamily="sans-serif">STR (gullstandard)</text>
      <text x="80" y="38" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">2–5 bp repeats, mikrosatelitter</text>
      <rect x="170" y="8" width="140" height="38" rx="5" fill="rgba(251,191,36,0.06)" stroke="#fbbf24" strokeWidth="1" />
      <text x="240" y="25" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="sans-serif">VNTR</text>
      <text x="240" y="38" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">10–100 bp kjernesekvens</text>
      <rect x="320" y="8" width="100" height="38" rx="5" fill="rgba(168,85,247,0.06)" stroke="#a78bfa" strokeWidth="1" />
      <text x="370" y="25" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="sans-serif">SNP</text>
      <text x="370" y="38" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Enkelt-base variasjon</text>
      <rect x="430" y="8" width="80" height="38" rx="5" fill="rgba(100,116,139,0.06)" stroke="#64748b" strokeWidth="1" />
      <text x="470" y="25" textAnchor="middle" fill="#64748b" fontSize="9" fontWeight="bold" fontFamily="sans-serif">RFLP</text>
      <text x="470" y="38" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Eldre metode</text>
    </g>
    <text x="0" y="132" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">99,9% av DNA er likt mellom mennesker. 0,1% variasjon = genulikheter + polymorfe sekvenser mellom genene.</text>
    <text x="0" y="146" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Norge: 23 DNA-områder inkl. kjønn (amelogenin: X+Y = mann, X+X = kvinne). DNA-register drevet av Kripos (1999).</text>
    <text x="0" y="160" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Svært lite biologisk materiale nødvendig. Presenteres som elektroferogram (topper fra kapillærelektroforese).</text>
  </svg>
);

const SvgMicroarray = () => (
  <svg viewBox="0 0 500 175" style={{ width: "100%", maxWidth: 500, display: "block", margin: "14px auto" }}>
    <defs><marker id="arr2m" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#64748b" /></marker></defs>
    <rect x="0" y="0" width="100" height="70" rx="6" fill="rgba(239,68,68,0.06)" stroke="#f87171" strokeWidth="1" />
    <text x="50" y="18" textAnchor="middle" fill="#f87171" fontSize="9" fontWeight="bold" fontFamily="sans-serif">1. Ekstraher RNA</text>
    <text x="50" y="32" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Prøve + referanse</text>
    <text x="50" y="46" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">→ lag cDNA (revers</text>
    <text x="50" y="58" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">transkriptase)</text>
    <line x1="102" y1="35" x2="118" y2="35" stroke="#64748b" strokeWidth="1" markerEnd="url(#arr2m)" />
    <rect x="122" y="0" width="100" height="70" rx="6" fill="rgba(251,191,36,0.06)" stroke="#fbbf24" strokeWidth="1" />
    <text x="172" y="18" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="sans-serif">2. Merk cDNA</text>
    <text x="172" y="34" textAnchor="middle" fill="#f87171" fontSize="8.5" fontFamily="sans-serif">Cy5 (rød) = prøve</text>
    <text x="172" y="48" textAnchor="middle" fill="#4ade80" fontSize="8.5" fontFamily="sans-serif">Cy3 (grønn) = referanse</text>
    <line x1="224" y1="35" x2="240" y2="35" stroke="#64748b" strokeWidth="1" markerEnd="url(#arr2m)" />
    <rect x="244" y="0" width="108" height="70" rx="6" fill="rgba(59,130,246,0.06)" stroke="#3b82f6" strokeWidth="1" />
    <text x="298" y="18" textAnchor="middle" fill="#3b82f6" fontSize="9" fontWeight="bold" fontFamily="sans-serif">3. Hybridiser</text>
    <text x="298" y="34" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Bland og helles over</text>
    <text x="298" y="48" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">mikromatrise (glassplate</text>
    <text x="298" y="60" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">m/ tusenvis av sekvenser)</text>
    <line x1="354" y1="35" x2="370" y2="35" stroke="#64748b" strokeWidth="1" markerEnd="url(#arr2m)" />
    <rect x="374" y="0" width="118" height="70" rx="6" fill="rgba(168,85,247,0.06)" stroke="#a78bfa" strokeWidth="1" />
    <text x="433" y="18" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold" fontFamily="sans-serif">4. Scan & analyser</text>
    <text x="433" y="34" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Intensitet per punkt</text>
    <text x="433" y="48" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">= genaktivitet</text>
    <rect x="0" y="82" width="492" height="36" rx="6" fill="rgba(59,130,246,0.04)" stroke="#334155" strokeWidth="1" />
    <text x="12" y="100" fill="#f1f5f9" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">Tolkning av farger:</text>
    <circle cx="175" cy="97" r="6" fill="#f87171" />
    <text x="186" y="101" fill="#f87171" fontSize="9" fontFamily="sans-serif">Rød = overuttrykt i prøve</text>
    <circle cx="310" cy="97" r="6" fill="#4ade80" />
    <text x="321" y="101" fill="#4ade80" fontSize="9" fontFamily="sans-serif">Grønn = underuttrykt</text>
    <circle cx="430" cy="97" r="6" fill="#fbbf24" />
    <text x="441" y="101" fill="#fbbf24" fontSize="9" fontFamily="sans-serif">Gul = lik</text>
    <rect x="0" y="130" width="492" height="38" rx="6" fill="rgba(6,182,212,0.05)" stroke="#06b6d4" strokeWidth="1" />
    <text x="12" y="148" fill="#06b6d4" fontSize="10" fontWeight="bold" fontFamily="sans-serif">FISH — Fluorescens in situ hybridisering</text>
    <text x="12" y="162" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Fluorescensmerkede prober hybridiserer med kromosomer på glassplate → kartlegger genposisjon. Observeres i fluorescensmikroskop.</text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   DEL 3 — SVG diagrams
   ═══════════════════════════════════════════════════════════════ */

const SvgMutasjoner = () => (
  <svg viewBox="0 0 520 295" style={{ width: "100%", maxWidth: 520, display: "block", margin: "14px auto" }}>
    <text x="8" y="16" fill="#4ade80" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">Villtype (normalsekvens):</text>
    <text x="8" y="34" fill="#f1f5f9" fontSize="11" fontFamily="monospace">DNA:     ...T A C A C C G A G G G A C T A A T T...</text>
    <text x="8" y="50" fill="#94a3b8" fontSize="10" fontFamily="monospace">mRNA:    A U G U G G C U C C C U G A U U A A</text>
    <text x="8" y="66" fill="#93c5fd" fontSize="9.5" fontFamily="sans-serif">Protein: Met — Trp — Leu — Pro — Asp — Stopp</text>
    <rect x="0" y="80" width="250" height="58" rx="6" fill="rgba(74,222,128,0.05)" stroke="#4ade80" strokeWidth="1.2" />
    <text x="10" y="97" fill="#4ade80" fontSize="10" fontWeight="bold" fontFamily="sans-serif">1. Samesense (stille)</text>
    <text x="10" y="112" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Base byttes, men aminosyre uendret</text>
    <text x="10" y="126" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Eks: CCG → CCU — begge = Pro</text>
    <text x="10" y="136" fill="#86efac" fontSize="7.5" fontFamily="sans-serif">Kodon-degenerasjon: ulike kodoner = same AA</text>
    <rect x="260" y="80" width="252" height="58" rx="6" fill="rgba(251,191,36,0.05)" stroke="#fbbf24" strokeWidth="1.2" />
    <text x="270" y="97" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="sans-serif">2. Missense</text>
    <text x="270" y="112" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Nytt kodon → ny aminosyre → annet protein</text>
    <text x="270" y="126" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Eks: GAU (Asp) → GUU (Val)</text>
    <text x="270" y="136" fill="#fcd34d" fontSize="7.5" fontFamily="sans-serif">Protein kan være funksjonelt eller defekt</text>
    <rect x="0" y="148" width="250" height="58" rx="6" fill="rgba(239,68,68,0.05)" stroke="#f87171" strokeWidth="1.2" />
    <text x="10" y="165" fill="#f87171" fontSize="10" fontWeight="bold" fontFamily="sans-serif">3. Nonsense</text>
    <text x="10" y="180" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Kodon → stoppkodon (UAG/UAA/UGA)</text>
    <text x="10" y="194" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Proteinsyntese stoppes for tidlig</text>
    <text x="10" y="204" fill="#fca5a5" fontSize="7.5" fontFamily="sans-serif">→ Ufullstendig/defekt protein</text>
    <rect x="260" y="148" width="252" height="58" rx="6" fill="rgba(168,85,247,0.05)" stroke="#a78bfa" strokeWidth="1.2" />
    <text x="270" y="165" fill="#a78bfa" fontSize="10" fontWeight="bold" fontFamily="sans-serif">4. Rammeskift (frameshift)</text>
    <text x="270" y="180" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Addisjon/delesjon av 1–2 baser</text>
    <text x="270" y="194" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Hele leserammen forskyves fra punktet</text>
    <text x="270" y="204" fill="#c4b5fd" fontSize="7.5" fontFamily="sans-serif">Eks: FAR SYR MOR → FA RSY RMO R</text>
    <rect x="0" y="218" width="512" height="32" rx="6" fill="rgba(59,130,246,0.04)" stroke="#334155" strokeWidth="1" />
    <text x="10" y="236" fill="#3b82f6" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">Substitusjonstyper:</text>
    <text x="140" y="236" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Transisjon: Purin↔Purin (A↔G) eller Pyr↔Pyr (C↔T)</text>
    <text x="140" y="248" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Transversjon: Purin↔Pyrimidin (A/G ↔ C/T)</text>
    <rect x="0" y="260" width="512" height="30" rx="6" fill="rgba(251,191,36,0.04)" stroke="#334155" strokeWidth="1" />
    <text x="10" y="278" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Spontan:</text>
    <text x="66" y="278" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Naturlige replikasjonsfeil (1 per 10⁵–10¹⁰)</text>
    <text x="290" y="278" fill="#f87171" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Indusert:</text>
    <text x="340" y="278" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Mutagener øker raten opptil 1000×</text>
  </svg>
);

const SvgLacOperon = () => (
  <svg viewBox="0 0 540 275" style={{ width: "100%", maxWidth: 540, display: "block", margin: "14px auto" }}>
    <rect x="15" y="48" width="510" height="5" rx="2.5" fill="#334155" />
    {[
      { x: 25, w: 52, label: "lacI", sub: "Repressor", fill: "#f87171" },
      { x: 92, w: 32, label: "CAP", sub: "", fill: "#fbbf24" },
      { x: 132, w: 42, label: "P", sub: "Promotor", fill: "#4ade80" },
      { x: 178, w: 32, label: "O", sub: "Operator", fill: "#fb923c" },
      { x: 222, w: 85, label: "lacZ", sub: "β-galaktosidase", fill: "#3b82f6" },
      { x: 315, w: 65, label: "lacY", sub: "Permease", fill: "#3b82f6" },
      { x: 388, w: 65, label: "lacA", sub: "Transacetylase", fill: "#3b82f6" },
    ].map((g, i) => (
      <g key={i}>
        <rect x={g.x} y="36" width={g.w} height="28" rx="4" fill={`${g.fill}18`} stroke={g.fill} strokeWidth="1.3" />
        <text x={g.x + g.w / 2} y="49" textAnchor="middle" fill={g.fill} fontSize="8.5" fontWeight="bold" fontFamily="sans-serif">{g.label}</text>
        {g.sub && <text x={g.x + g.w / 2} y="60" textAnchor="middle" fill={g.fill} fontSize="6.5" fontFamily="sans-serif">{g.sub}</text>}
      </g>
    ))}
    <text x="100" y="24" fill="#64748b" fontSize="8" fontFamily="sans-serif">← Regulerende →</text>
    <text x="305" y="24" fill="#3b82f6" fontSize="8" fontFamily="sans-serif">← Strukturelle gener →</text>
    <text x="15" y="78" fill="#64748b" fontSize="7.5" fontFamily="sans-serif">5' ────────────────────────────────────────────────────────────────────── 3'</text>
    <rect x="15" y="92" width="245" height="75" rx="6" fill="rgba(239,68,68,0.04)" stroke="#f87171" strokeWidth="1" />
    <text x="25" y="110" fill="#f87171" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Uten laktose — AVSLÅTT</text>
    <text x="25" y="126" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">1. lacI transkriberes → repressor-protein</text>
    <text x="25" y="140" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">2. Repressor binder operator (O)</text>
    <text x="25" y="154" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">3. RNA-polymerase blokkeres → INGEN</text>
    <text x="25" y="164" fill="#fca5a5" fontSize="8.5" fontFamily="sans-serif">   transkripsjon av lacZ/Y/A</text>
    <rect x="275" y="92" width="245" height="75" rx="6" fill="rgba(74,222,128,0.04)" stroke="#4ade80" strokeWidth="1" />
    <text x="285" y="110" fill="#4ade80" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Med laktose — PÅSLÅTT</text>
    <text x="285" y="126" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">1. Laktose → isomeriseres til allolaktose</text>
    <text x="285" y="140" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">2. Allolaktose (induser) binder repressor</text>
    <text x="285" y="154" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">3. Repressor løsner fra operator</text>
    <text x="285" y="164" fill="#86efac" fontSize="8.5" fontFamily="sans-serif">4. Transkripsjon av lacZ/Y/A skjer!</text>
    <rect x="15" y="180" width="505" height="88" rx="6" fill="rgba(59,130,246,0.04)" stroke="#334155" strokeWidth="1" />
    <text x="25" y="198" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Nøkkelkonsepter:</text>
    <text x="25" y="214" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Lac-operonet = induserbart operon (påslås av induser = allolaktose)</text>
    <text x="25" y="228" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Negativ kontroll: repressor hemmer transkripsjon (fjernes av induser)</text>
    <text x="25" y="242" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Positiv kontroll: CAP-cAMP aktiverer transkripsjon (binder CAP-sete mellom lacP og lacI)</text>
    <text x="25" y="258" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Taktisk reg. = allosterisk / feedback inhibering (rask) | Strategisk reg. = genregulering / operoner (langsom)</text>
  </svg>
);

const SvgMutagener = () => (
  <svg viewBox="0 0 520 190" style={{ width: "100%", maxWidth: 520, display: "block", margin: "14px auto" }}>
    <rect x="0" y="0" width="165" height="105" rx="6" fill="rgba(239,68,68,0.05)" stroke="#f87171" strokeWidth="1.2" />
    <text x="82" y="18" textAnchor="middle" fill="#f87171" fontSize="10" fontWeight="bold" fontFamily="sans-serif">1. Baseanaloger</text>
    <text x="82" y="34" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Erstatter normal base</text>
    <text x="82" y="48" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">under replikasjon</text>
    <text x="82" y="66" textAnchor="middle" fill="#fca5a5" fontSize="8.5" fontFamily="sans-serif" fontWeight="bold">5-bromouracil (5-BU)</text>
    <text x="82" y="80" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Analog til thymin</text>
    <text x="82" y="92" textAnchor="middle" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Feilparer med G → AT→GC</text>
    <rect x="175" y="0" width="175" height="105" rx="6" fill="rgba(251,191,36,0.05)" stroke="#fbbf24" strokeWidth="1.2" />
    <text x="262" y="18" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="sans-serif">2. Kjemisk modifisering</text>
    <text x="262" y="34" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Endrer eksisterende baser</text>
    <text x="185" y="52" fill="#f87171" fontSize="8" fontFamily="sans-serif">Deaminering:</text>
    <text x="250" y="52" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">HNO₂, C→U</text>
    <text x="185" y="66" fill="#a78bfa" fontSize="8" fontFamily="sans-serif">Interkalering:</text>
    <text x="255" y="66" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">EtBr, frameshift</text>
    <text x="185" y="80" fill="#4ade80" fontSize="8" fontFamily="sans-serif">Alkylering:</text>
    <text x="245" y="80" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">EMS/sennepsgass</text>
    <text x="185" y="94" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Flytter alkylgrupper → feil paring</text>
    <rect x="360" y="0" width="152" height="105" rx="6" fill="rgba(168,85,247,0.05)" stroke="#a78bfa" strokeWidth="1.2" />
    <text x="436" y="18" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold" fontFamily="sans-serif">3. Strålingsskade</text>
    <text x="436" y="34" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Skader DNA direkte</text>
    <text x="370" y="52" fill="#fbbf24" fontSize="8" fontFamily="sans-serif">UV (254 nm):</text>
    <text x="370" y="64" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">Thymin-dimerer</text>
    <text x="370" y="78" fill="#f87171" fontSize="8" fontFamily="sans-serif">Røntgen/gamma:</text>
    <text x="370" y="90" fill="#94a3b8" fontSize="7.5" fontFamily="sans-serif">DNA-brudd, frie radikaler</text>
    <rect x="0" y="115" width="512" height="68" rx="6" fill="rgba(59,130,246,0.04)" stroke="#334155" strokeWidth="1" />
    <text x="10" y="132" fill="#3b82f6" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">V2024 oppg. 14 — matching (5 poeng):</text>
    <text x="10" y="148" fill="#4ade80" fontSize="8.5" fontFamily="sans-serif">5-BU → Erstatter normal base under replikasjon</text>
    <text x="10" y="162" fill="#f87171" fontSize="8.5" fontFamily="sans-serif">Salpetersyrling (HNO₂) → Deaminerende, amingruppe fjernes</text>
    <text x="10" y="176" fill="#fbbf24" fontSize="8.5" fontFamily="sans-serif">Sennepsgass (EMS) → Alkylerende, alkylgrupper flyttes</text>
    <text x="280" y="148" fill="#a78bfa" fontSize="8.5" fontFamily="sans-serif">Ethidiumbromid → Interkalerende, mellom basepar</text>
    <text x="280" y="162" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">UV-stråling → Pyrimidin-dimerer (thymin)</text>
  </svg>
);

/* ═══════════════════════════════════════════════════════════════
   DEL 1 — Tab content (8 tabs)
   ═══════════════════════════════════════════════════════════════ */

const TabIntro = () => (
  <div>
    <Pills terms={[
      { t: "Bioteknologi", d: "Bruk av levende organismer til å lage nyttige produkter" },
      { t: "Genteknologi", d: "Teknologi for å endre organismers genetiske sammensetning" },
      { t: "Genspleising", d: "Innsetting/fjerning/overføring av gener mellom organismer vha. vektorer" },
      { t: "Genomredigering", d: "Endre DNA direkte i organismens eget genom (f.eks. CRISPR)" },
      { t: "Rekombinant DNA", d: "DNA satt sammen fra minst to ulike organismer" },
    ]} />
    <Sec icon="📖" title="Forklaring">
      <P><Term def="Bruk av levende organismer til å lage nyttige produkter">Bioteknologi</Term> er et tverrfaglig felt som kombinerer mikrobiologi, biokjemi, arvelære og molekylær genetikk. <Term def="Teknologi for å endre organismers genetiske sammensetning">Genteknologi</Term> er en gren av bioteknologien som handler om å jobbe direkte med DNA — isolere, studere og endre det.</P>
      <P mt={10}>Bioteknologi deles inn i fire farger:</P>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
        {[
          { emoji: "⚪", name: "Hvit", desc: "Industri (enzymer, biobrensel)", c: "#e2e8f0" },
          { emoji: "🟢", name: "Grønn", desc: "Landbruk, mat, planter, alger", c: "#4ade80" },
          { emoji: "🔴", name: "Rød", desc: "Medisin og helse", c: "#f87171" },
          { emoji: "🔵", name: "Blå", desc: "Marine ressurser", c: "#60a5fa" },
        ].map((c, i) => (
          <div key={i} style={{ background: "#1e293b", borderRadius: 6, padding: "8px 12px", border: "1px solid #334155" }}>
            <span>{c.emoji} </span>
            <span style={{ color: c.c, fontWeight: 700 }}>{c.name}</span>
            <span style={{ color: "#94a3b8", fontSize: "0.85em" }}> — {c.desc}</span>
          </div>
        ))}
      </div>
      <P mt={12}>To hovedtilnærminger for å endre DNA: <Term def="Overføre gener mellom organismer vha. vektorer">genspleising</Term> (klassisk — kutt, lim, sett inn i vektor) og <Term def="Direkte endring av DNA i organismen med CRISPR">genomredigering</Term> (nyere, presise kutt in vivo). Verktøyene inkluderer restriksjonsenzymer, ligase, vektorer, PCR, elektroforese og CRISPR.</P>
    </Sec>
    <Husk>Bioteknologi = bruk av liv for nytte. Fire farger: Hvit (industri), Grønn (mat), Rød (medisin), Blå (hav). Genteknologi = «klipp og lim» med DNA.</Husk>
    <Exam>Grunnbegreper i MC-oppgaver. V2023: begrepsoppgave (biobank, markørgen, restriksjonsenzym). Kjenn alle fire farger.</Exam>
  </div>
);

const TabTerminologi = () => (
  <div>
    <Pills terms={[
      { t: "Genom", d: "En arts fullstendige arvemateriale" },
      { t: "Genotype", d: "Genetisk sammensetning i en celle/individ" },
      { t: "Fenotype", d: "Observerbar egenskap (resultat av genotype + miljø)" },
      { t: "Locus", d: "Sete/område på kromosom der et bestemt gen er lokalisert" },
      { t: "Allel", d: "Alternative former av samme gen i et gitt locus" },
      { t: "Polymorfisme", d: "Variasjon i DNA-sekvens med en viss hyppighet i populasjonen" },
    ]} />
    <Sec icon="📖" title="Forklaring">
      <div style={{ display: "grid", gap: 8 }}>
        {[
          { t: "Genom", d: "En arts fullstendige arvemateriale — total genetisk informasjon. Menneskets genom ≈ 3 mrd basepar fordelt på 23 kromosompar.", c: "#3b82f6" },
          { t: "Genotype", d: "Spesifikk genetisk sammensetning. Kan være homozygot (to like alleler) eller heterozygot (to ulike alleler) for et gitt locus.", c: "#60a5fa" },
          { t: "Fenotype", d: "Observerbare egenskaper (utseende, blodtype, sykdom). Resultat av genotype + miljøpåvirkning.", c: "#4ade80" },
          { t: "Locus (fl. loci)", d: "Spesifikk posisjon på et kromosom der et gen/DNA-sekvens finnes. Samme locus på homologe kromosomer.", c: "#fbbf24" },
          { t: "Allel", d: "Alternative versjoner av samme gen i et gitt locus. Eks: blodtype — allelene A, B og O i samme locus.", c: "#f87171" },
          { t: "Polymorfisme", d: "Variasjon i DNA-sekvens som forekommer med viss hyppighet i populasjonen. Eks: blodtyper, STR-lengder. Grunnlag for DNA-fingerprinting.", c: "#a78bfa" },
        ].map((item, i) => (
          <div key={i} style={{ background: "#1e293b", border: `1px solid ${item.c}25`, borderLeft: `3px solid ${item.c}`, borderRadius: 6, padding: "10px 14px" }}>
            <span style={{ color: item.c, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>{item.t}</span>
            <span style={{ color: "#94a3b8", fontSize: "0.87em" }}> — {item.d}</span>
          </div>
        ))}
      </div>
    </Sec>
    <Eks title="V2025 oppg. 16 — Matching (6 poeng)">
      <P>Kombiner riktig utsagn og begrep:</P>
      <div style={{ marginTop: 8, display: "grid", gap: 4 }}>
        {[
          ["«Kromosom-område hvor et gen er lokalisert»", "Locus"],
          ["«Ulike former av basestruktur med viss hyppighet»", "Polymorfisme"],
          ["«Alternative former av samme gen»", "Allel"],
          ["«En arts fullstendige arvemateriale»", "Genom"],
          ["«Observerbar egenskap hos et individ»", "Fenotype"],
          ["«Genetisk sammensetning i en celle»", "Genotype"],
        ].map(([q, a], i) => (
          <P key={i}>{q} → <strong style={{ color: "#60a5fa" }}>{a}</strong></P>
        ))}
      </div>
    </Eks>
    <Husk>Genom = ALT DNA. Genotype = dine gener. Fenotype = det man SER. Locus = adressen. Allel = versjonen. Polymorfisme = variasjon i populasjonen.</Husk>
    <Exam>V2025 oppg. 16 (6p): nøyaktig denne matching-oppgaven. Kan alle definisjonene utenat — lett poengfangst!</Exam>
  </div>
);

const TabRestriksjon = () => (
  <div>
    <Pills terms={[
      { t: "Restriksjonsenzym (RE)", d: "Protein som gjenkjenner og kutter DNA ved spesifikke sekvenser (4–8 bp)" },
      { t: "Palindrom", d: "DNA-sekvens som leses likt begge veier på antiparallelle tråder (5'→3')" },
      { t: "Sticky ends", d: "Klebrige ender — enkelttrådete overheng etter kutting" },
      { t: "Blunt ends", d: "Butte ender — jevne kutt uten overheng" },
      { t: "Isoschizomerer", d: "Ulike RE som gjenkjenner samme sekvens" },
      { t: "Metylering", d: "Beskyttelse av eget DNA mot egne RE" },
    ]} />
    <Sec icon="🔬" title="Visuell illustrasjon">
      <SvgRestriksjon />
    </Sec>
    <Sec icon="📖" title="Forklaring">
      <P><Term def="Endonuklease som kutter DNA ved spesifikke sekvenser">Restriksjonsenzymer</Term> finnes naturlig i bakterier som forsvar mot virus-DNA. Bakteriens eget DNA beskyttes ved <Term def="Kovalent modifisering av baser">metylering</Term>.</P>
      <P mt={10}>Fem klasser — kun Type II brukes i lab:</P>
      <div style={{ fontSize: "0.87rem", lineHeight: 1.7, color: "#94a3b8", marginTop: 8 }}>
        <p><strong style={{ color: "#e2e8f0" }}>Type I:</strong> Endonuklease + metylase. Kutter ≥1000 bp fra gjenkjennelsessekvens. Ikke lab-nyttig.</p>
        <p><strong style={{ color: "#3b82f6" }}>Type II:</strong> Kun endonuklease. Gjenkjenner palindrom (4–8 bp) og kutter <em>innenfor</em> sekvensen. <strong>Brukes i all rekombinant DNA-teknologi.</strong></p>
        <p><strong style={{ color: "#e2e8f0" }}>Type III:</strong> Endo + metylase. Kutter like utenfor sekvensen.</p>
        <p><strong style={{ color: "#e2e8f0" }}>Type IV:</strong> Kutter kun metylert DNA.</p>
        <p><strong style={{ color: "#fbbf24" }}>Type V:</strong> RNA-guidet (Cas9/CRISPR). Nyeste klasse.</p>
      </div>
      <P mt={10}>Resultater: <strong>sticky ends</strong> (klebrige, overheng → lettere å ligere) vs <strong>blunt ends</strong> (butte, jevne kutt). Eksempler: EcoRI, HindIII, PstI (sticky), EcoRV (blunt).</P>
      <P mt={8}>Navngivning: <em>Eco</em>RI = <em>E. coli</em>, stamme R, enzym nr. I.</P>
    </Sec>
    <Husk>Type II = labtypen (kutter innenfor palindrom). Type V = CRISPR. Sticky ends = lettere å lime. Palindrom: les 5'→3' på begge tråder = identisk.</Husk>
    <Exam>V2025 oppg. 11: MC om RE/plasmider. V2023 oppg. 18: «CRISPR-enzymer tilhører klasse V». Kjenn alle 5 klasser + sticky vs blunt!</Exam>
  </div>
);

const TabVektorer = () => (
  <div>
    <Pills terms={[
      { t: "Vektor", d: "Bærermolekyl for å føre nytt DNA inn i vertscelle" },
      { t: "Plasmid", d: "Lite sirkulært dsDNA med ori, markørgener og MCS" },
      { t: "Ligase", d: "Enzym som limer DNA-fragmenter (fosfordiesterbinding mellom 3'-OH og 5'-PO₄)" },
      { t: "Markørgen", d: "Gen som gir kjent egenskap for seleksjon (f.eks. antibiotikaresistens)" },
      { t: "ori", d: "Origin of replication — startpunkt for DNA-replikasjon" },
      { t: "MCS", d: "Multiple Cloning Site — region med mange unike RE-kuttesteder" },
    ]} />
    <Sec icon="🔬" title="Visuell illustrasjon">
      <SvgPlasmid />
    </Sec>
    <Sec icon="📖" title="Forklaring">
      <P>En <Term def="Bærermolekyl for rekombinant DNA">vektor</Term> bærer fremmed DNA inn i en vertscelle for oppformering. <Term def="Små sirkulære DNA-molekyler">Plasmider</Term> er vanligst — de har tre essensielle elementer:</P>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 10 }}>
        <Card title="ori" color="#4ade80">Startpunkt for replikasjon. Uten ori kan ikke plasmidet kopieres i vertscellen.</Card>
        <Card title="Markørgener" color="#f87171">Antibiotikaresistens (ampicillin, tetracyklin, kanamycin) eller farge (bioluminescens). Brukes til å sjekke om genspleising er vellykket.</Card>
        <Card title="MCS" color="#a78bfa">Region med mange unike RE-kuttesteder tett sammen. Her settes fremmed DNA inn.</Card>
      </div>
      <P mt={14}><Term def="Enzym som danner fosfordiesterbinding">Ligase</Term> limer sammen kompatible DNA-ender. Workflow: Kutt vektor + fremmed DNA med <em>samme RE</em> → bland → ligase limer sticky ends → rekombinant plasmid.</P>
      <P mt={10}>Andre vektorer: bakteriofager (λ, M13), cosmider (plasmid + fag cos-sites), BAC (opptil ~300 kb), YAC (opptil ~1000 kb). Større vektor = kan bære større DNA-insert.</P>
    </Sec>
    <Husk>Plasmid = ori + markørgen + MCS. Ligase = limet. Kutt med SAMME enzym for kompatible ender! Eksempel: pBR322 (<em>E. coli</em>-plasmid).</Husk>
    <Exam>V2025 oppg. 11: MC om plasmider. V2024 oppg. 18: «Markørgen = gen som gir celler en viss egenskap». Kjenn de tre delene!</Exam>
  </div>
);

const TabKloning = () => (
  <div>
    <Pills terms={[
      { t: "Transformasjon", d: "Opptak av fritt DNA fra omgivelsene inn i bakteriecelle" },
      { t: "Transduksjon", d: "Overføring av DNA mellom bakterier via bakteriofag (virus)" },
      { t: "Konjugasjon", d: "Direkte DNA-overføring mellom bakterier via sex-pili (F-plasmid)" },
      { t: "Horisontal genoverføring", d: "DNA-overføring mellom organismer (ikke foreldre→avkom)" },
      { t: "Elektroporering", d: "Elektrisk sjokk åpner porer i cellemembranen for DNA-opptak" },
      { t: "Blå/hvit-screening", d: "Seleksjonsmetode basert på lacZ-gen og X-gal" },
    ]} />
    <Sec icon="📖" title="Forklaring">
      <P>Etter at rekombinant plasmid er laget, må det føres inn i vertsceller (typisk <em>E. coli</em>). Tre naturlige mekanismer for <Term def="DNA-overføring mellom organismer uten foreldre-avkom">horisontal genoverføring</Term>:</P>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 10 }}>
        <Card title="Transformasjon" color="#3b82f6">Bakterien tar opp fritt DNA fra omgivelsene. Naturlig kompetens eller kjemisk indusert (CaCl₂ + varmesjokk).</Card>
        <Card title="Transduksjon" color="#4ade80">DNA overføres via bakteriofag (virus). Generalisert (tilfeldig DNA) eller spesialisert (spesifikke gener).</Card>
        <Card title="Konjugasjon" color="#fbbf24">Direkte overføring via sex-pili. Krever F-plasmid (fertilitetsplasmid) hos donorcellen.</Card>
      </div>
      <P mt={12}>Andre metoder for genoverføring:</P>
      <div style={{ fontSize: "0.87rem", color: "#94a3b8", lineHeight: 1.7, marginTop: 6 }}>
        <p>• <Term def="Elektrisk sjokk åpner porer">Elektroporering</Term> — elektrisk puls lager midlertidige porer i membranen</p>
        <p>• <strong>Genkanon (biolistics)</strong> — DNA-dekkede gullpartikler skyttes inn i celler (brukes for planter)</p>
        <p>• <strong>Mikroinjeksjon</strong> — direkte injeksjon av DNA med nål (dyr/humane celler)</p>
        <p>• <strong><em>Agrobacterium tumefaciens</em></strong> — naturlig DNA-overføring til planter via Ti-plasmid</p>
      </div>
      <P mt={12}><strong>Seleksjon:</strong> Etter transformasjon dyrkes bakterier på medium med antibiotikum. Kun celler med plasmidet (= resistensgen) overlever. <Term def="lacZ-gen + X-gal for å skille rekombinante fra ikke-rekombinante">Blå/hvit-screening</Term>: X-gal-substrat + lacZ i MCS → hvite kolonier = insert i MCS (lacZ ødelagt) → dette er de riktige klonene.</P>
    </Sec>
    <Husk>Tre T-er: Transformasjon (fritt DNA), Transduksjon (via fag), konjugasjon (via pili). Seleksjon: antibiotikum dreper celler uten plasmid. Hvit koloni = vellykket insert!</Husk>
    <Exam>V2024 oppg. 18: markørgen-definisjon. Horisontal genoverføring er pensum — kjenn alle tre mekanismer og kunstige metoder.</Exam>
  </div>
);

const TabCRISPR = () => (
  <div>
    <Pills terms={[
      { t: "CRISPR", d: "Clustered Regularly Interspaced Short Palindromic Repeats" },
      { t: "Cas9", d: "RNA-guidet endonuklease — klasse V RE som kutter begge DNA-tråder" },
      { t: "sgRNA (guide-RNA)", d: "Kort RNA-sekvens som leder Cas9 til mål-DNA" },
      { t: "PAM", d: "Protospacer Adjacent Motif — kort sekvens nær mål som Cas9 trenger for gjenkjenning" },
      { t: "NHEJ", d: "Non-Homologous End Joining — upresist reparasjon → knock-out" },
      { t: "HDR", d: "Homology-Directed Repair — presist reparasjon med templat → knock-in" },
    ]} />
    <Sec icon="🔬" title="Visuell illustrasjon">
      <SvgCRISPR />
    </Sec>
    <Sec icon="📖" title="Forklaring">
      <P><Term def="Repeterende sekvenser avbrutt av fremmed DNA i bakterie-genom">CRISPR</Term>-systemet er bakteriers immunforsvar mot virus. Bakterie-DNA har repeterende sekvenser med unike «spacer»-sekvenser imellom — lagret fra tidligere virusinfeksjoner.</P>
      <P mt={10}>Nær CRISPR-sekvensene ligger <em>cas</em>-gener som produserer <Term def="RNA-guidet endonuklease, klasse V RE">Cas-proteiner</Term>. Cas9 er mest kjent. Mekanisme:</P>
      <div style={{ fontSize: "0.87rem", color: "#94a3b8", lineHeight: 1.75, marginTop: 8, paddingLeft: 4 }}>
        <p>1. CRISPR-sekvens transkriberes → <Term def="Single guide RNA som leder Cas9">sgRNA</Term></p>
        <p>2. sgRNA binder Cas9 → CRISPR-kompleks</p>
        <p>3. Komplekset scanner DNA for matchende sekvens + <Term def="Kort gjenkjennelsessekvens nødvendig for Cas9-binding">PAM</Term></p>
        <p>4. Match → Cas9 kutter begge DNA-tråder → dobbelttrådbrudd</p>
      </div>
      <P mt={12}><strong>Lab-bruk:</strong> sgRNA designes spesifikt for mål-sekvens. Etter kutting reparerer cellen: <strong>NHEJ</strong> (upresist, gen deaktiveres = knock-out) eller <strong>HDR</strong> med templat-DNA (presist, spesifikk endring = knock-in).</P>
      <P mt={10}><strong>Forutsetninger:</strong> Må kjenne eksakt basesekvens. Må ha metode for å tilføre CRISPR-komponenter (elektroporering, virusvektor, etc.).</P>
      <P mt={10}><strong>Anvendelser:</strong> Genterapi (reparere sykdomsgener), GMO (endring av planter/dyr), grunnforskning (slå ut gener for å studere funksjon).</P>
    </Sec>
    <Eks title="V2024 + V2025 MC: CRISPR-oppgaver">
      <P><strong>Riktige påstander:</strong></P>
      <P mt={6}>✅ sgRNA er spesifikk for DNA-sekvensen som skal redigeres</P>
      <P>✅ CRISPR-sekvenser er repeterende sekvenser avbrutt av fremmed DNA</P>
      <P>✅ Cas-gener ligger nær CRISPR-sekvensene</P>
      <P>✅ CRISPR er del av mikroorganismers immunforsvar</P>
      <P>✅ Cas9 er klasse V restriksjonsenzym</P>
      <P mt={8}><strong>Feil påstander (vanlige feller):</strong></P>
      <P mt={4}>❌ «Cas9 er klasse 3 RE» → Nei, klasse V!</P>
      <P>❌ «CRISPR-kompleks = Cas9 + DNA» → Nei, Cas9 + RNA (sgRNA)!</P>
      <P>❌ «CRISPR ble utviklet i lab» → Nei, naturlig system i bakterier!</P>
    </Eks>
    <Husk>CRISPR = bakteriens «virusliste». Cas9 = saksen (klasse V RE). sgRNA = GPS-en. PAM = landingsplassen. Alt styres av RNA! To utfall: NHEJ (kaos) eller HDR (presist).</Husk>
    <Exam>V2023, V2024 og V2025 hadde alle CRISPR MC-oppgaver. Husk: klasse V (ikke III!), sgRNA (ikke DNA!), immunforsvar, repeterende + fremmed DNA.</Exam>
  </div>
);

const TabPCR = () => (
  <div>
    <Pills terms={[
      { t: "PCR", d: "Polymerase Chain Reaction — enzymatisk kopiering av spesifikke DNA-sekvenser in vitro" },
      { t: "Taq polymerase", d: "Varmestabil DNA-polymerase fra Thermus aquaticus (tåler 94 °C)" },
      { t: "Primer", d: "Kort ssDNA (15–35 baser) som hybridiserer med templat og starter syntese" },
      { t: "dNTP", d: "Deoksynukleotid trifosfater — byggesteinene for DNA-syntese" },
      { t: "Tm", d: "Smeltepunkt — temperatur der 50% av dsDNA er denaturert" },
      { t: "qPCR", d: "Kvantitativ PCR — måler DNA-mengde i sanntid med fluorescens" },
      { t: "RT-PCR", d: "Revers transkriptase PCR — starter med RNA → cDNA → PCR" },
    ]} />
    <Sec icon="🔬" title="Visuell illustrasjon">
      <SvgPCR />
    </Sec>
    <Sec icon="📖" title="Forklaring">
      <P><Term def="Enzymatisk kopiering av spesifikke DNA-sekvenser in vitro">PCR</Term> amplifiserer en spesifikk DNA-sekvens fra svært liten mengde til analyserbar mengde. In vitro-teknikk basert på det naturlige replikasjonsprinsippet.</P>
      <P mt={10}>Tre trinn per syklus:</P>
      <div style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.7, marginTop: 6 }}>
        <p><strong style={{ color: "#f87171" }}>1. Denaturering (94–96 °C, ~30 sek):</strong> dsDNA → ssDNA. Hydrogenbindinger brytes.</p>
        <p><strong style={{ color: "#4ade80" }}>2. Annealing (50–65 °C, ~30 sek):</strong> Primere hybridiserer med komplementær sekvens på templat. Annealing-temp ≈ Tm − 5 °C.</p>
        <p><strong style={{ color: "#3b82f6" }}>3. Elongering (72 °C, ~1 min/kb):</strong> <Term def="Varmestabil DNA-polymerase fra Thermus aquaticus">Taq polymerase</Term> syntetiserer ny tråd fra 3'-enden av primer. Retning: 5'→3'.</p>
      </div>
      <P mt={10}><strong>Primere:</strong> Minst 2 (forward + reverse), orientert 5'→3' mot hverandre. 15–35 baser, 40–60% GC-innhold.</P>
      <Formula>Tm = 4(G+C) + 2(A+T) °C</Formula>
      <P mt={10}><strong>dNTP:</strong> dATP, dCTP, dGTP, dTTP i forholdet 1:1:1:1. Kofaktor: Mg²⁺ (i buffer).</P>
      <P mt={10}><strong>Varianter:</strong></P>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
        <Card title="qPCR (kvantitativ)" color="#fbbf24">Fluorescens ∝ DNA-mengde. Måler i sanntid etter hver syklus. Kvantifiserer startmengde.</Card>
        <Card title="RT-PCR" color="#a78bfa">Starter med RNA. Revers transkriptase lager cDNA → deretter vanlig PCR. Brukes for å studere genuttrykking.</Card>
      </div>
    </Sec>
    <Eks title="Beregn Tm og annealing-temperatur">
      <P><strong>Primer:</strong> 5'-GACTGCGTTAGGATTGGC-3'</P>
      <P mt={6}>Tell baser: G=5, A=3, C=3, T=4, G=2, C=1 → totalt G=5, C=4, A=3, T=6</P>
      <P>Tm = 4(5+4) + 2(3+6) = 4×9 + 2×9 = 36 + 18 = <strong style={{ color: "#60a5fa" }}>54 °C</strong></P>
      <P>Annealing-temperatur ≈ 54 − 5 = <strong style={{ color: "#60a5fa" }}>49 °C</strong></P>
    </Eks>
    <Husk>PCR = «fotokopieringsmaskin for DNA». Tre trinn: Denaturere (94°C) → Anneale (~50°C) → Elongere (72°C). 2ⁿ kopier. Taq = termofil polymerase (tåler varme!). Tm-formel: 4(GC) + 2(AT).</Husk>
    <Exam>V2023 oppg. 15: full PCR-beskrivelse. V2024: Sanger basert på PCR-prinsipp. PCR er basis for mange teknikker — forstå hvert trinn og hvorfor.</Exam>
  </div>
);

const TabGel = () => (
  <div>
    <Pills terms={[
      { t: "Elektroforese", d: "Separering av makromolekyler basert på vandring i elektrisk felt" },
      { t: "Agarosegel", d: "Gelmatrise (polysakkarid fra tang) for separasjon av nukleinsyrer" },
      { t: "Loading buffer", d: "Glyserol + farge — gjør at prøven synker i brønnen" },
      { t: "Størrelsesmarkør", d: "DNA med kjente fragmentstørrelser (ladder) — referanse" },
      { t: "GelRed / EtBr", d: "Fargestoffer som binder DNA og fluorescerer under UV-lys" },
      { t: "FlashGel", d: "Hurtigvariant av elektroforese (275V, ~7 min)" },
    ]} />
    <Sec icon="🔬" title="Visuell illustrasjon">
      <SvgGel />
    </Sec>
    <Sec icon="📖" title="Forklaring">
      <P><Term def="Separering av molekyler i elektrisk felt">Gelelektroforese</Term> separerer nukleinsyrer primært etter <strong>størrelse</strong>. DNA er negativt ladet (fosfatgrupper i ryggraden) og vandrer mot positiv pol (anode).</P>
      <P mt={10}><strong>Prinsipp:</strong> Agarosegelen fungerer som et «nett» — små fragmenter passerer lett gjennom og vandrer langt, mens store fragmenter holdes igjen og vandrer kort.</P>
      <P mt={10}><Term def="Glyserol + bromfenolblått">Loading buffer</Term> tilsettes prøver og standarder. Glyserol gir tetthet slik at DNA synker i brønnen. Bromfenolblått gir synlig fargefront.</P>
      <P mt={10}><strong>Tolkning av gelbilde:</strong></P>
      <div style={{ fontSize: "0.87rem", color: "#94a3b8", lineHeight: 1.7, marginTop: 6 }}>
        <p>• Ukuttet genomisk DNA → ett stort/smeary bånd (hele genomet)</p>
        <p>• DNA kuttet med RE → 2+ tydelige bånd (restriksjonsfragmenter)</p>
        <p>• PCR-produkt → ett tydelig bånd ved forventet størrelse</p>
        <p>• Nærmest brønnen = <strong>størst</strong> fragment</p>
        <p>• Lengst fra brønnen = <strong>minst</strong> fragment</p>
      </div>
      <P mt={10}><strong>Deteksjon:</strong> GelRed eller etidiumbromid (EtBr, interkalerer i DNA) + UV-lys → bånd fluorescerer. <Term def="Referansemix med kjente størrelser">Størrelsesmarkør (ladder)</Term> i minst 2 brønner for nøyaktig størrelsesvurdering.</P>
    </Sec>
    <Eks title="V2025 oppg. 12–13: Gelelektroforese (2+3 poeng)">
      <P><strong>Oppg. 12 (2p):</strong> Identifiser hvilket fragment som er størst fra gelbilde.</P>
      <P>→ Fragment som har vandret kortest (nærmest brønnen) er størst.</P>
      <P mt={8}><strong>Oppg. 13 (3p):</strong> Begrunn svaret.</P>
      <P>→ DNA er negativt ladet (fosfatgrupper) og vandrer mot positiv pol. Agarosegelen separerer etter størrelse: store molekyler har vanskeligere for å passere gjennom gelstrukturen og vandrer derfor kortere distanse. Det fragmentet som har vandret kortest er følgelig det største.</P>
    </Eks>
    <Husk>DNA = negativt ladet → mot ⊕. Små = langt, Store = kort. Standarder i minst 2 brønner! Huskeregel for tolkning: «Stor = sen = kort vandring».</Husk>
    <Exam>V2025 oppg. 12 (2p) + oppg. 13 (3p): identifisere + begrunne gelbilde. VANLIG type oppgave — forstå HVORFOR små vandrer lenger.</Exam>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   DEL 2 — Tab content (4 tabs)
   ═══════════════════════════════════════════════════════════════ */

const TabSouthern = () => (
  <div>
    <Pills terms={[
      { t: "Southern blotting", d: "Metode for overføring og deteksjon av spesifikke DNA-sekvenser" },
      { t: "Probe", d: "Kort merket ssDNA/RNA som hybridiserer med komplementær sekvens" },
      { t: "Hybridisering", d: "Binding mellom komplementære basesekvenser (probe + mål-DNA)" },
      { t: "Prehybridisering", d: "Blokkering av membran med nøytralt DNA for å unngå uspesifikk binding" },
      { t: "Nitrocellulosemembran", d: "Membran DNA overføres til fra gelen" },
      { t: "Stringens", d: "Betingelser (salt, temp) som bestemmer spesifisiteten til hybridisering" },
    ]} />
    <Sec icon="🔬" title="Visuell illustrasjon — alle trinn">
      <SvgSouthern />
    </Sec>
    <Sec icon="📖" title="Forklaring — hvert trinn detaljert">
      <div style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "#cbd5e1" }}>
        <p><strong style={{ color: "#f87171" }}>1. Isolering og kutting:</strong> DNA isoleres fra prøvemateriale (blod, vev) og kuttes med <Term def="Type II restriksjonsenzym">restriksjonsenzymer</Term> til fragmenter. Alternativt brukes PCR for å kopiere ønsket sekvens.</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: "#fbbf24" }}>2. Gelelektroforese:</strong> DNA-fragmenter separeres etter størrelse i agarosegel. Små fragmenter vandrer lengst.</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: "#fb923c" }}>3. Denaturering:</strong> Gelen legges i denatureringsløsning (NaOH). dsDNA → ssDNA. <em>NB! Dette trinnet er nødvendig fordi proben bare kan binde ssDNA.</em></p>
        <p style={{ marginTop: 8 }}><strong style={{ color: "#4ade80" }}>4. Blotting (selve overføringen):</strong> DNA overføres fra gel til <Term def="Membran som binder ssDNA">nitrocellulosemembran</Term> vha <Term def="Væskebevegelse gjennom gelen pga absorberende materiale">kapillærkrefter</Term>. Buffer (SSC) trekkes oppover gjennom gelen → DNA følger med og fester seg til membranen. DNA immobiliseres med UV-lys eller varme (80 °C).</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: "#3b82f6" }}>5a. Prehybridisering:</strong> Membranen blokkeres med <Term def="Ikke-spesifikt DNA som hindrer falsk binding">nøytralt DNA</Term> (lakse-/sildesperm-DNA). Forhindrer at <Term def="Kort merket ssDNA/RNA">proben</Term> fester seg uspesifikt til membranen = unngår falske positive.</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: "#3b82f6" }}>5b. Hybridisering:</strong> Merkede prober tilsettes → binder komplementære sekvenser på membranen. <Term def="Kort ssDNA/RNA merket med fluorescens, biotin eller radioaktivitet">Probe</Term> = kort ssDNA/RNA, forhåndsmerket.</p>
        <p style={{ marginTop: 8 }}><strong style={{ color: "#a78bfa" }}>6. Deteksjon:</strong> Merkemolekyl bestemmer metode — autoradiografi (radioaktivitet), UV (fluorescens), fargesubstrat (biotin). Resultatet viser kun de fragmentene som matcher proben.</p>
      </div>
      <P mt={14}><strong>Varianter:</strong> <Term def="RNA blotting — RNA → membran → probe">Northern blotting</Term> = RNA. <Term def="Protein blotting — SDS-PAGE → membran → antistoff">Western blotting</Term> = protein (bruker antistoff istedenfor nukleinsyre-probe).</P>
      <P mt={8}><strong>Hva kan Southern brukes til?</strong> Finne spesifikk sekvens + størrelse, bestemme antall kopier, detektere genspleisede organismer (GMO).</P>
    </Sec>
    <Eks title="V2025 oppg. 14: Southern blotting — FULL prosedyre (6 poeng)">
      <P><strong>a) Trinnene:</strong> Isolering av DNA → kutting med RE (eller PCR) → gelelektroforese → denaturering av DNA i gelen → blotting (overføring fra gel til nitrocellulosemembran vha kapillærkrefter) → prehybridisering → hybridisering med merket probe → deteksjon.</P>
      <P mt={8}><strong>Blottetrinnet spesifikt:</strong> Overføring av makromolekyler fra elektroforesegelen til overflaten av en membran. Eget oppsett der buffer trekkes opp gjennom gel vha kapillærkrefter → DNA trekkes ut og bindes til nitrocellulose-/nylonmembran → immobiliseres med UV-lys eller varme.</P>
      <P mt={8}><strong>b) Probe:</strong> Kort ssDNA/RNA-bit merket med fluorescens, biotin eller radioaktivitet. Brukes til identifisering av DNA-sekvenser via hybridisering (binding mellom komplementære sekvenser).</P>
      <P mt={8}><strong>c) Hybridisering:</strong> Binding mellom komplementære sekvenser — proben fester seg til mål-DNA på membranen. Viser at proben har identifisert en sekvens.</P>
      <P><strong>Prehybridisering:</strong> Membranen blokkeres med nøytralt DNA (eks. laksesperm-DNA) FØR prober tilsettes. Forhindrer uspesifikk binding av prober til membranen som ville gitt falske positive resultater.</P>
    </Eks>
    <Eks title="V2023 MC: Southern blotting — riktige påstander">
      <P>✅ Bruk av prober er nødvendig</P>
      <P>✅ Involverer overføring av DNA fra elektroforesegel til membran</P>
      <P>✅ Gelen MÅ legges i denatureringsløsning før blotting</P>
      <P>✅ Kan brukes til å bestemme antall kopier av en sekvens</P>
      <P mt={6}>❌ «Denaturering er ikke nødvendig» → FEIL, denaturering er essensielt!</P>
      <P>❌ «Prehybridisering = binding mellom probe og DNA» → FEIL, det er hybridisering!</P>
    </Eks>
    <Husk>Southern = DNA, Northern = RNA, Western = protein. Denaturering MÅ skje FØR blotting! Prehybridisering = «fiske-DNA» for å blokkere → unngå falske positive. Hele prosessen: Kutt → Elektroforese → Denaturering → Blotting → Pre-hyb → Hybridisering → Deteksjon.</Husk>
    <Exam>GJENGANGER! V2025 oppg. 14 (6p): full prosedyre + probe + hyb/prehyb. V2024 oppg. 15 (5p): forklar hybridisering og prehybridisering. V2023: MC. Denne teknikken MÅ sitte 100%.</Exam>
  </div>
);

const TabSekvensering = () => (
  <div>
    <Pills terms={[
      { t: "Sanger-sekvensering", d: "1. generasjons metode for å bestemme eksakt baserekkefølge vha ddNTP (gullstandard)" },
      { t: "ddNTP", d: "Dideoksynukleotid — mangler 3'-OH, terminerer DNA-syntese kontrollert" },
      { t: "dNTP", d: "Deoksynukleotid — vanlig byggestein med 3'-OH, syntese fortsetter" },
      { t: "Kjedeterminering", d: "Kontrollert stopp av DNA-syntese ved innsetting av ddNTP" },
      { t: "Kapillærelektroforese", d: "Separasjon med 1 base forskjell i størrelse" },
      { t: "NGS", d: "Next-generation sequencing — parallell sekvensering av millioner fragmenter" },
    ]} />
    <Sec icon="🔬" title="Visuell illustrasjon">
      <SvgSanger />
    </Sec>
    <Sec icon="📖" title="Forklaring">
      <P><Term def="Enzymatisk metode utviklet av Fredrik Sanger (Nobelpris 1980)">Sanger-sekvensering</Term> bestemmer eksakt baserekkefølge i DNA. 1. generasjons sekvensering — fortsatt «gullstandard» for nøyaktighet.</P>
      <P mt={10}><strong>Nøkkelforskjell mellom dNTP og ddNTP:</strong></P>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
        <Card title="dNTP (vanlig)" color="#3b82f6">Har 3'-OH gruppe → DNA-polymerase kan forlenge tråden videre. Brukes som vanlige byggesteiner.</Card>
        <Card title="ddNTP (terminator)" color="#f87171">Mangler 3'-OH → syntese STOPPER umiddelbart. Merket med fluorescens (én farge per base).</Card>
      </div>
      <P mt={14}><strong>Prosedyre — basert på PCR-prinsippet:</strong></P>
      <div style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.75, marginTop: 6 }}>
        <p>1. Templat-DNA + primer + dNTP + <em>litt</em> ddNTP + DNA-polymerase + buffer</p>
        <p>2. PCR-reaksjon: denaturering → annealing → elongering</p>
        <p>3. ddNTP settes inn tilfeldig i konkurranse med dNTP → fragmenter av alle mulige lengder, hvert fragment slutter med fluorescensmerket ddNTP</p>
        <p>4. Separering med kapillærelektroforese — <strong>1 base forskjell</strong> i størrelse!</p>
        <p>5. Laser leser av fluorescensfarge → kromatogram viser basesekvens</p>
      </div>
      <P mt={10}><strong>Viktig:</strong> I hvert rør dannes fragmenter som alle starter i samme primersete og slutter med én bestemt ddNTP. I dag kan alle 4 reaksjoner kjøres i ett rør (én ddNTP-type per farge).</P>
      <P mt={14}><strong>Likhet og forskjell med PCR:</strong></P>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
        <Card title="Likhet" color="#4ade80">Begge bruker PCR-prinsipp (denaturering, annealing, elongering), primer, dNTP og DNA-polymerase.</Card>
        <Card title="Forskjell" color="#fbbf24">PCR = kopierer DNA. Sanger = bestemmer basesekvens. Sanger bruker ddNTP som terminator — det gjør ikke PCR.</Card>
      </div>
      <P mt={14}><Term def="2. generasjons sekvensering — parallell, rask, billig">NGS (Next-generation sequencing)</Term>: sekvensererer millioner fragmenter parallelt. Bruker genpaneler (forhåndsdefinerte genlister, f.eks. brystkreft: BRCA1, BRCA2, TP53). Raskere og billigere enn Sanger, men Sanger har høyere nøyaktighet per lesning.</P>
    </Sec>
    <Eks title="V2024 oppg. 16: Sekvensering (7 poeng)">
      <P><strong>i)</strong> Sanger-sekvensering. Hensikt: bestemme eksakt baserekkefølge i et DNA-molekyl.</P>
      <P mt={6}><strong>ii) Hovedprinsipper:</strong> Basert på PCR-prinsipp med 3-trinns temperaturprofil (denaturering ~94 °C, primer annealing 37–70 °C, elongering 72 °C). Syntese av komplementær DNA-tråd vha primere, DNA-polymerase, dNTP og i tillegg ddNTP. ddNTP er analoger til dNTP men mangler 3'-OH → kontrollert stopp. Prøven deles i 4 reaksjoner (eller alle i én), hver med ddNTP merket med fluorescens. Separering med 1 base forskjell vha kapillærelektroforese. Avlesning med laser.</P>
      <P mt={6}><strong>iii)</strong> Nært knyttet til PCR. PCR kopierer DNA-sekvenser, Sanger bestemmer basesammensetning. I Sanger brukes ddNTP som terminator — det gjør ikke vanlig PCR.</P>
    </Eks>
    <Eks title="V2023 MC: Sanger sekvensering — riktige påstander">
      <P>✅ Metoden er basert på PCR-prinsippet</P>
      <P>✅ Viktig at kopierte DNA-fragmenter separeres med 1 base i størrelseforskjell</P>
      <P>✅ DNA polymerase har lik affinitet til både dNTP og ddNTP</P>
      <P mt={6}>❌ «Det er kun ddNTP som kan merkes med fluorescens» → FEIL, dNTP kan også merkes</P>
      <P>❌ «Sanger tilhører NGS» → FEIL, Sanger = 1. generasjon</P>
      <P>❌ «Genpaneler kan erstatte Sanger» → Nei, genpaneler er NGS (2. gen.), Sanger er fortsatt gullstandard</P>
      <P>❌ «Metoden benytter kun ddNTP» → FEIL, bruker BÅDE dNTP og ddNTP</P>
      <P>❌ «Det er templattråden som sekvenseres underveis» → FEIL, det er kopitråden (den nysyntetiserte)</P>
    </Eks>
    <Husk>Sanger = PCR + ddNTP (stopper syntese). ddNTP mangler 3'-OH. Én farge per base (4 farger). Separasjon med 1 base forskjell! Resultat = kromatogram. NGS = raskere, men Sanger = gullstandard.</Husk>
    <Exam>V2024 oppg. 16 (7p): full beskrivelse + sammenligning med PCR. V2023 MC: riktige påstander. Forstå forskjell dNTP vs ddNTP og likheter/forskjeller med PCR.</Exam>
  </div>
);

const TabFingerprint = () => (
  <div>
    <Pills terms={[
      { t: "DNA-fingerprinting", d: "Teknikker for å synliggjøre et individs genetiske signatur/DNA-profil" },
      { t: "STR", d: "Short Tandem Repeats — korte repeterende sekvenser (2–5 nukleotider), gullstandard" },
      { t: "VNTR", d: "Variable Number Tandem Repeats — kjernesekvens 10–100 bp, lengre repeats" },
      { t: "SNP", d: "Single Nucleotide Polymorphism — variasjon i én enkelt base" },
      { t: "RFLP", d: "Restriction Fragment Length Polymorphism — eldre metode med RE" },
      { t: "Elektroferogram", d: "Kromatogram fra kapillærelektroforese — moderne presentasjon av DNA-profil" },
      { t: "Amelogenin", d: "Kjønnsmarkør: X+Y = mann, X+X = kvinne" },
    ]} />
    <Sec icon="🔬" title="Visuell illustrasjon">
      <SvgFingerprint />
    </Sec>
    <Sec icon="📖" title="Forklaring">
      <P><Term def="Fellesbetegnelse for teknikker som viser individets genetiske signatur">DNA-fingerprinting</Term> baserer seg på at et individs DNA er identisk uansett kilde (hår, blod, vev). Ca. 99,9% av DNA er likt mellom mennesker — de 0,1% som skiller inkluderer genulikheter og polymorfe sekvenser mellom genene.</P>
      <P mt={10}><strong>Markørsekvenser — repeterende sekvenser mellom genene:</strong></P>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
        <Card title="STR (gullstandard)" color="#4ade80">Short Tandem Repeats / mikrosatelitter. 2–5 nukleotider repetert mange ganger. Eks: GCTG<strong style={{ color: "#fbbf24" }}>ATAGATAGATAG</strong>ATTGCA. Mest brukt i kriminalteknikk i dag.</Card>
        <Card title="VNTR" color="#fbbf24">Variable Number Tandem Repeats / minisatelitter. Kjernesekvens 10–100 bp, opptil 5000 bp per locus. Eldre metode, brukes mindre.</Card>
        <Card title="SNP" color="#a78bfa">Single Nucleotide Polymorphism. Variasjon i én enkelt base. Fordel ved gammelt/nedbrutt DNA. Brukes sammen med STR.</Card>
        <Card title="RFLP" color="#64748b">Restriksjonsfragment lengde polymorfisme. Eldste metode — basert på ulike kuttemønstre med RE. Erstattet av STR/SNP.</Card>
      </div>
      <P mt={14}><strong>Metodikk — trinn for trinn:</strong></P>
      <div style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.7, marginTop: 6 }}>
        <p>1. <strong>Prøvetaking</strong> — blod, spytt, hår, vev (svært lite materiale nødvendig)</p>
        <p>2. <strong>DNA-isolering</strong> — ekstraksjon av DNA fra cellene</p>
        <p>3. <strong>PCR</strong> — kopier de STR-områdene (og evt. SNP) som skal analyseres</p>
        <p>4. <strong>Kapillærelektroforese</strong> — separasjon (leser av lengden på sekvensene)</p>
        <p>5. <strong>Detektering og tolkning</strong> — DNA-profil sammenlignes med referanser/databaser</p>
      </div>
      <P mt={14}><strong>DNA-register i Norge:</strong> Drevet av Kripos siden 1999. 23 DNA-områder inkl. kjønn (<Term def="X+Y = mann, X+X = kvinne">amelogenin</Term>). Delt i: identitetsregister (dømte), sporregister (spor fra åsted), etterforskningsregister (under etterforskning).</P>
      <P mt={10}><strong>Presentasjon:</strong> Resultater vises som <Term def="Kromatogram fra kapillærelektroforese">elektroferogram</Term> — topper representerer bånd. Hvert individ har 2 topper per locus (ett allel fra far, ett fra mor). Farskapstesting: barnets alleler må matche en kombinasjon av foreldrenes.</P>
    </Sec>
    <Eks title="V2025 oppg. 18: DNA-fingerprinting bakgrunn (4 poeng)">
      <P><strong>Bakgrunnsteori for DNA-fingerprinting:</strong></P>
      <P mt={6}>DNA er identisk uansett kroppsvæske/vev det er isolert fra. 99,9% av DNA er likt mellom mennesker. De 0,1% som varierer omfatter genulikheter og polymorfe sekvenser mellom genene. De første metodene var basert på RFLP (restriksjonsfragmenter). I dag brukes primært STR (korte repeterende sekvenser, 2–5 nukleotider) og SNP. 23 markørsekvenser (inkl. kjønn via amelogenin) undersøkes og sammenlignes. Resultater presenteres som elektroferogram fra kapillærelektroforese.</P>
    </Eks>
    <Eks title="V2023 oppg. 16: RFLP, STR, SNP + etisk debatt (6 poeng)">
      <P><strong>i) Definisjoner:</strong></P>
      <P>• RFLP: Restriksjonsfragment lengde polymorfisme — basert på ulike kuttemønstre med RE hos ulike individer.</P>
      <P>• STR: Short Tandem Repeats — korte repeterende sekvenser (2–5 bp), gullstandard i kriminalteknikk.</P>
      <P>• SNP: Single Nucleotide Polymorphism — variasjon i én enkelt nukleotid, nyttig for nedbrutt DNA.</P>
      <P mt={6}><strong>ii) Etisk debatt om DNA-register for alle:</strong> Drøftingsoppgave — argumenter for/mot. For: bedre oppklaring av kriminalitet, identifisering ved ulykker/katastrofer. Mot: personvern, risiko for misbruk, hvem har tilgang, genetisk diskriminering.</P>
    </Eks>
    <Husk>STR = gullstandard (kort, 2–5 bp). 99,9% likt DNA. Amelogenin: XX = kvinne, XY = mann. Resultat = elektroferogram (topper). 2 topper per locus (et allel fra far + et fra mor).</Husk>
    <Exam>V2025 oppg. 18 (4p): bakgrunnsteori. V2024 oppg. 18: «DNA-profil presenteres som elektroferogram», «STR = 2–5 nukleotider». V2023 oppg. 16 (6p): definisjoner + etisk debatt om DNA-register.</Exam>
  </div>
);

const TabMikromatriser = () => (
  <div>
    <Pills terms={[
      { t: "Mikromatrise", d: "DNA-chip for å undersøke tusenvis av geners uttrykking (ekspresjon) samtidig" },
      { t: "cDNA", d: "Komplementær DNA laget fra RNA vha revers transkriptase" },
      { t: "Cy3 / Cy5", d: "Fluorescensfarger — Cy3 (grønn, referanse) og Cy5 (rød, prøve)" },
      { t: "Hybridisering", d: "cDNA binder komplementære sekvenser på matrisen" },
      { t: "FISH", d: "Fluorescens in situ hybridisering — kartlegge genposisjon på kromosomer" },
    ]} />
    <Sec icon="🔬" title="Visuell illustrasjon">
      <SvgMicroarray />
    </Sec>
    <Sec icon="📖" title="Forklaring">
      <P><Term def="DNA-chip for genuttrykkingsanalyse">Mikromatriser</Term> (DNA chips) gjør det mulig å undersøke titusener av gener samtidig — er de «av» eller «på»? Brukes til å studere hvordan genuttrykking varierer over tid, mellom individer, mellom sykdomstilstander.</P>
      <P mt={10}><strong>Prosedyre:</strong></P>
      <div style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.75, marginTop: 6 }}>
        <p>1. <strong>Ekstraher RNA</strong> fra prøve og referanse → lag <Term def="DNA laget fra mRNA vha revers transkriptase">cDNA</Term> (revers transkriptase)</p>
        <p>2. <strong>Merk cDNA:</strong> prøve med <span style={{ color: "#f87171", fontWeight: 600 }}>Cy5 (rød)</span>, referanse med <span style={{ color: "#4ade80", fontWeight: 600 }}>Cy3 (grønn)</span></p>
        <p>3. <strong>Bland og hybridiser:</strong> Helles over mikromatrisen — en glassplate med tusenvis av klonede/syntetiske DNA-fragmenter (representerer ulike gener)</p>
        <p>4. <strong>Scan intensitet:</strong> Intensiteten i hvert punkt = genaktivitet</p>
      </div>
      <P mt={10}><strong>Tolkning av farger:</strong></P>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginTop: 8 }}>
        <Card title="🔴 Rød" color="#f87171">Genet er overuttrykt (mer aktivt) i prøven sammenlignet med referansen.</Card>
        <Card title="🟢 Grønn" color="#4ade80">Genet er underuttrykt (mindre aktivt) i prøven. Referansen har høyere uttrykking.</Card>
        <Card title="🟡 Gul" color="#fbbf24">Lik uttrykking i prøve og referanse. Rød + grønn fluorescens = gul.</Card>
      </div>
      <P mt={14}><strong>Anvendelser:</strong> Sammenlikne kreftceller vs. normale celler, identifisere hvilke gener som er viktige i sykdomsprosesser, studere effekt av medisiner.</P>
      <Sec icon="🧬" title="FISH — Fluorescens in situ hybridisering">
        <P><Term def="Kartlegging av genposisjon på kromosomer">FISH</Term> bruker fluorescensmerkede prober som hybridiserer direkte med kromosomer på en glassplate. Observeres i fluorescensmikroskop. Formål: kartlegge <em>hvor</em> på et kromosom et gen sitter. Brukes i diagnostikk (f.eks. påvisning av kromosomavvik).</P>
      </Sec>
    </Sec>
    <Husk>Mikromatrise = «genenes lysavle» — Rød (opp i prøve), Grønn (ned), Gul (lik). Cy5 = rød = prøve, Cy3 = grønn = referanse. FISH = finn genets adresse på kromosomet.</Husk>
    <Exam>Ikke direkte på V2025, men pensum og læringsmål. Kjenn hovedprinsipp, formål, og tolkning av farger. FISH er pensum fra forelesning 3 (DNA analyser del 2).</Exam>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   DEL 3 — Tab content (4 tabs)
   ═══════════════════════════════════════════════════════════════ */

const TabMutasjoner = () => (
  <div>
    <Pills terms={[
      { t: "Mutasjon", d: "Endring i et gen eller kromosom (i DNAets baserekkefølge)" },
      { t: "Punktmutasjon", d: "Substitusjon, addisjon eller delesjon av enkeltbaser" },
      { t: "Samesense (stille)", d: "Base byttes, men nytt kodon koder for SAMME aminosyre" },
      { t: "Missense", d: "Nytt kodon → ny aminosyre → annet protein" },
      { t: "Nonsense", d: "Nytt kodon = stoppkodon → proteinsyntese avbrytes" },
      { t: "Frameshift", d: "Rammeskift — addisjon/delesjon av 1–2 baser forskyver leserammen" },
      { t: "Transisjon", d: "Purin↔Purin (A↔G) eller Pyrimidin↔Pyrimidin (C↔T)" },
      { t: "Transversjon", d: "Purin↔Pyrimidin (A/G ↔ C/T)" },
    ]} />
    <Sec icon="🔬" title="Visuell illustrasjon">
      <SvgMutasjoner />
    </Sec>
    <Sec icon="📖" title="Forklaring">
      <P><Term def="Endring i DNAets baserekkefølge">Mutasjoner</Term> er endringer i DNA. Prosessen = mutagenese, resultatet = mutant. Kan være <strong>spontane</strong> (naturlige replikasjonsfeil, 1 per 10⁵–10¹⁰) eller <strong>induserte</strong> (kjemiske/fysiske mutagener, øker raten opptil 1000×).</P>
      <P mt={10}>Informasjonsstrømmen: Feil i DNA → Feil i mRNA → Feil i protein.</P>
      <P mt={10}><strong>Punktmutasjoner — fire hovedtyper:</strong></P>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 10 }}>
        <Card title="Samesense (stille)" color="#4ade80">Base byttes, men aminosyre er uendret pga kodon-degenerasjon. Eks: CCG → CCU — begge koder for prolin. Ingen effekt på protein.</Card>
        <Card title="Missense" color="#fbbf24">Nytt kodon → ny aminosyre → annet protein. Eks: GAU (Asp) → GUU (Val). Protein kan være funksjonelt eller defekt avhengig av posisjon.</Card>
        <Card title="Nonsense" color="#f87171">Kodon → stoppkodon (UAG, UAA eller UGA). Proteinsyntesen avbrytes for tidlig → ufullstendig/defekt protein.</Card>
        <Card title="Frameshift (rammeskift)" color="#a78bfa">Addisjon/delesjon av 1–2 baser → hele leserammen forskyves fra mutasjonspunktet → alle nedstrøms aminosyrer endres. Mest alvorlig type!</Card>
      </div>
      <P mt={14}><strong>Substitusjonstyper:</strong></P>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
        <Card title="Transisjon" color="#3b82f6">Purin ↔ Purin (A ↔ G) eller Pyrimidin ↔ Pyrimidin (C ↔ T). Same type base.</Card>
        <Card title="Transversjon" color="#fbbf24">Purin ↔ Pyrimidin (A/G ↔ C/T). Bytte mellom ulike basetyper.</Card>
      </div>
      <P mt={12}>Mutasjoner kan være letale (dødelige) eller nøytrale. I <strong>kjønnsceller</strong>: arves videre til neste generasjon. I <strong>somatiske celler</strong>: kun i individet (f.eks. kreft).</P>
    </Sec>
    <Eks title="V2025 oppg. 15: Identifiser mutasjonstype fra sekvenser (6 poeng)">
      <P><strong>a) AAG → AAA:</strong> Begge koder for samme aminosyre (lysin) → <strong style={{ color: "#4ade80" }}>samesense/stille mutasjon</strong>. Kjennetegn: ingen endring i protein pga kodon-degenerasjon.</P>
      <P mt={6}><strong>b) AAG → AGG/ACG:</strong> Ny aminosyre dannes → <strong style={{ color: "#fbbf24" }}>missense mutasjon</strong>. Kjennetegn: annet funksjonelt protein. Aminosyresammensetningen endres.</P>
      <P mt={6}><strong>c) AAG → UAG:</strong> Stoppkodon dannes → <strong style={{ color: "#f87171" }}>nonsense mutasjon</strong>. Kjennetegn: proteinsyntese avbrytes for tidlig → defekt/ufullstendig protein. UAG er ett av tre stoppkodoner.</P>
    </Eks>
    <Husk>Same = SAME aminosyre. Miss = MISSER riktig AA. Non = NONSENS (stopp!). Frame = hele RAMMEN forskyves. Substitusjonstyper: transiSjon = Same type (purin↔purin), transVersjon = Veksler type.</Husk>
    <Exam>V2025 oppg. 15 (6p): identifiser mutasjonstype fra sekvenser + forklar kjennetegn. V2023 oppg. 21 (3p): matching av mutasjonstyper. MÅ kunne alle fire typer og deres konsekvenser!</Exam>
  </div>
);

const TabMutagener = () => (
  <div>
    <Pills terms={[
      { t: "Mutagen", d: "Fysisk/kjemisk faktor som induserer mutasjon i DNA" },
      { t: "Baseanalog", d: "Molekyl som ligner normal base og kan erstatte den under replikasjon" },
      { t: "5-bromouracil (5-BU)", d: "Analog til thymin — kan feilpares med G istedenfor A" },
      { t: "Interkalering", d: "Molekyler setter seg mellom basepar → forstyrrer struktur → frameshift" },
      { t: "Deaminering", d: "Amingruppe fjernes (eks. HNO₂: cytosin→uracil)" },
      { t: "Alkylering", d: "Alkylgrupper overføres til baser → feil baseparing (eks. EMS)" },
      { t: "Thymin-dimer", d: "UV-indusert kovalent binding mellom to tilstøtende thymin-baser" },
    ]} />
    <Sec icon="🔬" title="Visuell illustrasjon">
      <SvgMutagener />
    </Sec>
    <Sec icon="📖" title="Forklaring">
      <P><Term def="Faktor som forårsaker mutasjon">Mutagener</Term> er ytre faktorer som øker mutasjonsraten. Tre hovedmekanismer for induserte mutasjoner:</P>
      <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <Card title="1. Baseanaloger — erstatter en base" color="#f87171">
          Kan substituere for en normal base under replikasjon. Korrekt H-bundet → oppdages IKKE av proofreading. Eks: <strong>5-bromouracil (5-BU)</strong> er analog til thymin. Kan feilpare med G istedenfor A → AT→GC overgang ved neste replikasjon.
        </Card>
        <Card title="2. Kjemisk modifisering av baser" color="#fbbf24">
          <strong>Deaminering:</strong> Salpetersyrling (HNO₂) fjerner amingruppe. Eks: cytosin → uracil (som basepar med A istedenfor G).<br/>
          <strong>Interkalering:</strong> Ethidiumbromid (EtBr) — flat 3-ringet forbindelse med samme dimensjon som basepar. Setter seg mellom basepar → forstyrrer DNA-struktur → rammeskiftmutasjon.<br/>
          <strong>Alkylering:</strong> EMS / sennepsgass — legger til alkylgrupper på baser → endrer baseparingsegenskaper.
        </Card>
        <Card title="3. Strålingsskade" color="#a78bfa">
          <strong>UV-stråling (254 nm):</strong> DNA absorberer UV → produksjon av pyrimidin-dimerer (vanligvis thymin-dimerer). Mest alvorlige skaden. Kan ikke repareres av korrektursystem → SOS-system aktiveres. Kan gi hudkreft. Brukes til sterilisering!<br/>
          <strong>Røntgen-/gammastråling:</strong> Direkte effekt: bryter sukker-fosfat-bindinger i DNA-kjeden. Indirekte effekt: ionisering → frie radikaler → kjemiske endringer i DNA.
        </Card>
      </div>
      <P mt={12}><strong>Biologiske mutagener:</strong> Virus og noen bakterier kan også forårsake mutasjoner.</P>
      <P mt={10}><strong>Industriell mutagenese:</strong> Bakteriekulturer utsettes for mutagener i mange sykluser → seleksjon for ønsket egenskap (eks. økt antibiotika-produksjon). Styrt mutagenese = bevisst bruk av mutagener.</P>
    </Sec>
    <Eks title="V2024 oppg. 14: Matching mutagen ↔ funksjon (5 poeng)">
      <P><strong>Korrekt matching:</strong></P>
      <P mt={6}>• 5-bromouracil → <strong style={{ color: "#4ade80" }}>Erstatter en normal base under replikasjon</strong></P>
      <P>• Salpetersyrling (HNO₂) → <strong style={{ color: "#4ade80" }}>Deaminerende, en amingruppe fjernes</strong></P>
      <P>• Sennepsgass (EMS) → <strong style={{ color: "#4ade80" }}>Alkylerende, flytting av alkylgrupper</strong></P>
      <P>• Ethidiumbromid → <strong style={{ color: "#4ade80" }}>Interkalerende, plasserer seg mellom to basepar</strong></P>
      <P>• UV-stråling → <strong style={{ color: "#4ade80" }}>Danner pyrimidin-dimerer</strong></P>
      <P mt={6}><em>NB: «Produksjon av frie radikaler» = røntgen-/gammastråling (ikke UV!)</em></P>
    </Eks>
    <Husk>Tre mekanismer: Erstatte (baseanaloger), Modifisere (kjemikalier), Skade (stråling). 5-BU = erstatter T. EtBr = interkalerer → frameshift. HNO₂ = deaminerer C→U. EMS = alkylerer. UV = thymin-dimerer.</Husk>
    <Exam>V2024 oppg. 14 (5p): matching mutagen ↔ funksjon. Kjenn alle 5 mutagener og deres mekanisme — dette er ren memoreringsspoeng!</Exam>
  </div>
);

const TabGenreg = () => (
  <div>
    <Pills terms={[
      { t: "Taktisk regulering", d: "Allosterisk regulering — rask enzymaktivering/-inhibering" },
      { t: "Strategisk regulering", d: "Genregulering via operoner — langsom, transkripsjonsnivå" },
      { t: "Operon", d: "Gruppe gener kontrollert av felles operator og promotor" },
      { t: "lac-operon", d: "Induserbart operon som styrer laktose-metabolisme i E. coli" },
      { t: "Repressor", d: "Protein som binder operator og blokkerer transkripsjon" },
      { t: "Induser", d: "Molekyl (allolaktose) som inaktiverer repressor → gen slås PÅ" },
      { t: "Promotor (P)", d: "DNA-sekvens der RNA-polymerase binder (~100 bp)" },
      { t: "Operator (O)", d: "DNA-sekvens der repressor binder (~45 bp), overlapper P" },
      { t: "Feedback inhibering", d: "Endeproduktet hemmer første enzym i synteseveien" },
      { t: "Allosterisk sete", d: "Ekstra bindingssete på enzym for effektor-molekyl" },
    ]} />
    <Sec icon="🔬" title="Visuell illustrasjon — lac-operonet">
      <SvgLacOperon />
    </Sec>
    <Sec icon="📖" title="Forklaring">
      <P>Prokaryote celler har to reguleringsmetoder via enzymer:</P>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
        <Card title="1. Taktisk regulering (allosterisk)" color="#fbbf24">
          Rask regulering (brøkdel av sekund). <Term def="Enzym med ekstra bindingssete">Allosteriske enzymer</Term> har aktivt sete + allosterisk sete. Effektor-molekyl binder → konformasjonsendring → enzymaktivitet endres. <Term def="Endeproduktet hemmer første enzym">Feedback inhibering</Term>: endeproduktet = negativ allosterisk effektor for første enzym i synteseveien.
        </Card>
        <Card title="2. Strategisk regulering (genregulering)" color="#3b82f6">
          Langsom regulering. Kontrollerer <em>hvilke gener</em> som uttrykkes. To kategorier enzymer: <strong>konstituerende</strong> (alltid på, housekeeping) og <strong>induserende</strong> (produseres etter behov). Gengrupper organisert i <Term def="Gruppe gener med felles kontrollmekanisme">operoner</Term>.
        </Card>
      </div>
      <P mt={16}><strong>Lac-operonet i detalj:</strong></P>
      <P mt={8}><em>E. coli</em> foretrekker glukose, men kan bruke laktose. Trenger enzymet <Term def="Hydrolyserer laktose til glukose + galaktose">β-galaktosidase</Term>. Produksjonen styres av lac-operonet.</P>
      <P mt={10}><strong>Strukturelle gener</strong> (uttrykkes alltid sammen):</P>
      <div style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.7, marginTop: 6 }}>
        <p>• <strong style={{ color: "#3b82f6" }}>lacZ</strong> — β-galaktosidase (hydrolyserer laktose)</p>
        <p>• <strong style={{ color: "#3b82f6" }}>lacY</strong> — permease (transporterer laktose inn i cellen)</p>
        <p>• <strong style={{ color: "#3b82f6" }}>lacA</strong> — transacetylase (eliminerer giftige forbindelser)</p>
      </div>
      <P mt={10}><strong>Regulerende gener</strong> (med egen promotor Pi):</P>
      <div style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.7, marginTop: 6 }}>
        <p>• <strong style={{ color: "#f87171" }}>lacI</strong> — koder for repressor-protein</p>
        <p>• <strong style={{ color: "#4ade80" }}>lacP</strong> — promotor for strukturgenene (~100 bp), binder RNA-polymerase</p>
        <p>• <strong style={{ color: "#fb923c" }}>lacO</strong> — operator (~45 bp), overlapper lacP. Repressor binder her</p>
        <p>• <strong style={{ color: "#fbbf24" }}>CAP-sete</strong> — mellom lacP og lacI, for positiv kontroll</p>
      </div>
      <P mt={12}><strong>Mekanisme:</strong></P>
      <div style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.7, marginTop: 6 }}>
        <p><strong style={{ color: "#f87171" }}>Uten laktose:</strong> Repressor binder operator → blokkerer RNA-polymerase → INGEN transkripsjon → operon er AV.</p>
        <p><strong style={{ color: "#4ade80" }}>Med laktose:</strong> Laktose isomeriseres til <Term def="Isomer av laktose som fungerer som induser">allolaktose</Term> (induser) → binder repressor → repressor løsner fra operator → RNA-polymerase kan transkribere → operon er PÅ.</p>
      </div>
      <P mt={10}>Lac-operonet = <strong>induserbart operon</strong> med <strong>negativ kontroll</strong> (repressor hemmer) OG <strong>positiv kontroll</strong> (CAP-cAMP aktiverer ved fravær av glukose).</P>
    </Sec>
    <Eks title="V2024 oppg. 17: Utfylling — regulering (5 poeng)">
      <P>Prokaryote celler har to metoder: <strong style={{ color: "#60a5fa" }}>[taktisk regulering]</strong> (allosterisk) og <strong style={{ color: "#60a5fa" }}>[strategisk tilpasning]</strong> (genregulering).</P>
      <P mt={6}>I den første metoden inngår enzymer med et <strong style={{ color: "#60a5fa" }}>[allosterisk sete]</strong>. Endeproduktet slår av første enzym = <strong style={{ color: "#60a5fa" }}>[feedback inhibering]</strong>. Endeproduktet er en <strong style={{ color: "#60a5fa" }}>[negativ]</strong> allosterisk effektor.</P>
      <P mt={6}>I den andre metoden brukes <strong style={{ color: "#60a5fa" }}>[induserende]</strong> enzymer som produseres etter behov. Gengruppe = <strong style={{ color: "#60a5fa" }}>[operon]</strong>. Lac-operonet kontrollerer produksjon av <strong style={{ color: "#60a5fa" }}>[β-galaktosidase]</strong>. Ved nærvær av laktose: repressor <strong style={{ color: "#60a5fa" }}>[inaktivert]</strong> → operon slås <strong style={{ color: "#60a5fa" }}>[på]</strong>.</P>
    </Eks>
    <Husk>Lac-operonet: «Laktose Aktiverer Cellens enzymer». Uten laktose = repressor PÅ operator = gen AV. Med laktose = allolaktose fjerner repressor = gen PÅ. To reguleringstyper: Taktisk (raske justeringer, allosterisk) og Strategisk (langsiktig, genregulering).</Husk>
    <Exam>V2024 oppg. 17 (5p): utfyllingsoppgave med alle begreper. V2023 oppg. 20 (5p): forklar operon, konstituerende vs induserende enzymer. Lac-operonet er GJENGANGER — kan hele mekanismen!</Exam>
  </div>
);

const TabEtikk = () => (
  <div>
    <Pills terms={[
      { t: "GMO", d: "Genmodifisert organisme — organisme med endret arvemateriale" },
      { t: "Reproduktiv kloning", d: "Lager nytt individ med samme arvestoff (eks. Dolly 1996)" },
      { t: "Terapeutisk kloning", d: "Lager celler (stamceller) fra klonet embryo — IKKE nytt individ" },
      { t: "Kloning", d: "Fremstilling av tro kopi — gen, celle, eller individ" },
    ]} />
    <Sec icon="📖" title="Forklaring">
      <P><strong>Kloning</strong> betyr fremstilling av en tro kopi. Tre nivåer:</P>
      <div style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.7, marginTop: 8 }}>
        <p>• <strong>Kloning av gen:</strong> Kopiere en DNA-sekvens → sette inn i vertscelle</p>
        <p>• <strong>Kloning av celle:</strong> Lage identiske kopier av en celle</p>
        <p>• <strong>Kloning av individ:</strong> Embryosplitting eller kjerneoverføring</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
        <Card title="Reproduktiv kloning" color="#f87171">
          Lager nytt avkom med samme DNA som et annet individ. Gjennombrudd 1996: <strong>Dolly</strong> — klonet fra melkekjertelcelle via kjerneoverføring. Første gang et pattedyr ble klonet fra kroppscelle. Nyttig for forskning og utvikling av genmodifiserte dyr.
        </Card>
        <Card title="Terapeutisk kloning" color="#4ade80">
          Ligner reproduktiv, men lager <strong>celler, IKKE nytt individ</strong>. Embryo brukes som kilde for stamceller i laboratoriet. Stamcellene kan potensielt behandle sykdommer.
        </Card>
      </div>
      <P mt={14}><strong>Ulemper med kloning:</strong></P>
      <div style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.7, marginTop: 6 }}>
        <p>• Reduserer biologisk mangfold → hindrer genetisk variasjon</p>
        <p>• Eks: bananer (klonede) er svært utsatt for virussykdommer — ingen har resistensgener</p>
        <p>• Bekymring for dyrevelferd</p>
        <p>• EU + Norge: forbudt å selge mat fra klonede dyr (tillatt i USA/Sør-Amerika)</p>
      </div>
      <P mt={14}><strong>Etiske problemstillinger rundt CRISPR:</strong></P>
      <div style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.7, marginTop: 6 }}>
        <p>• Endringer i <strong>kjønnsceller</strong> → arves videre til alle fremtidige generasjoner</p>
        <p>• Endringer i <strong>somatiske celler</strong> → kun i individet (genterapi)</p>
        <p>• Designer babyer: utseende, ferdigheter, sykdomsresistens?</p>
        <p>• Gendoping i sport?</p>
        <p>• Masseødeleggelsesvåpen (biologisk våpen)?</p>
      </div>
      <P mt={14}><strong>Andre etiske spørsmål:</strong></P>
      <div style={{ fontSize: "0.88rem", color: "#94a3b8", lineHeight: 1.7, marginTop: 6 }}>
        <p>• GMO: fordeler (klimatilpasning, sykdomsresistens, bedre avlinger) vs ulemper (økologisk risiko, monopol, ukjente langtidseffekter)</p>
        <p>• Rettsmedisinsk DNA-analyse: personvern vs oppklaring av kriminalitet</p>
        <p>• DNA-register: bør alle registreres? (V2023-oppgave)</p>
        <p>• Biobanker: lagring av biologisk materiale — samtykke og personvern</p>
      </div>
      <P mt={10}>Bred internasjonal enighet: <strong>ikke klone mennesker</strong> (reproduktivt). Terapeutisk kloning (stamceller) er mer akseptert men fortsatt omdiskutert.</P>
    </Sec>
    <Eks title="V2025 oppg. 17: Etikk om kloning (3 poeng)">
      <P><strong>Drøftingsoppgave — ingen fasit!</strong> Må argumentere for eget standpunkt.</P>
      <P mt={6}><strong>Mulige argumenter FOR kloning:</strong></P>
      <P>• Terapeutisk: stamceller kan kurere alvorlige sykdommer</P>
      <P>• Forskning: genetisk identiske dyr letter studier</P>
      <P>• Bevare truede arter</P>
      <P mt={6}><strong>Mulige argumenter MOT kloning:</strong></P>
      <P>• Reduserer genetisk mangfold → sårbarhet for sykdommer</P>
      <P>• Dyrevelferd: lav suksessrate, høy dødslighetsrate</P>
      <P>• Etisk betenkelig å «kopiere» individer</P>
      <P>• Glidende skala: kloning av dyr → mennesker?</P>
    </Eks>
    <Eks title="V2025 oppg. 11: MC — Reproduktiv vs terapeutisk kloning">
      <P><strong>Riktig svar:</strong> «Reproduktiv kloning brukes til å danne et nytt individ, mens terapeutisk kloning brukes som kilde til nye stamceller.»</P>
      <P mt={6}><strong>Feil:</strong> «Terapeutisk = nytt individ, reproduktiv = stamceller» → Omvendt!</P>
      <P>Reproduktiv = nytt individ (Dolly). Terapeutisk = celler/stamceller, IKKE nytt individ.</P>
    </Eks>
    <Husk>Reproduktiv = nytt INDIVID (Dolly). Terapeutisk = nye CELLER (stamceller). CRISPR i kjønnsceller = arves videre (etisk problematisk). GMO-debatt = fordeler vs risiko. Kloning reduserer genetisk mangfold.</Husk>
    <Exam>V2025 oppg. 17 (3p): drøftingsoppgave om kloning + oppg. 11 MC: reproduktiv vs terapeutisk. V2023 oppg. 16: etisk debatt om DNA-register. Drøftingsoppgaver krever argumentasjon begge veier!</Exam>
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   TAB CONTENT MAP & MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

const TAB_CONTENT = {
  intro: TabIntro,
  terminologi: TabTerminologi,
  restriksjon: TabRestriksjon,
  vektorer: TabVektorer,
  kloning: TabKloning,
  crispr: TabCRISPR,
  pcr: TabPCR,
  gel: TabGel,
  southern: TabSouthern,
  sekvensering: TabSekvensering,
  fingerprint: TabFingerprint,
  mikromatriser: TabMikromatriser,
  mutasjoner: TabMutasjoner,
  mutagener: TabMutagener,
  genreg: TabGenreg,
  etikk: TabEtikk,
};

export default function Bioteknologi() {
  const [activeTab, setActiveTab] = useState("intro");
  const [visited, setVisited] = useState(new Set(["intro"]));
  const tabBarRef = useRef(null);
  const groupBarRef = useRef(null);

  const activeGroupId = TAB_TO_GROUP[activeTab];
  const activeGroup = GROUPS.find((g) => g.id === activeGroupId);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setVisited((prev) => new Set([...prev, id]));
  };

  const handleGroupClick = (groupId) => {
    if (groupId === activeGroupId) return;
    const g = GROUPS.find((x) => x.id === groupId);
    if (g) handleTabClick(g.tabs[0].id);
  };

  useEffect(() => {
    if (tabBarRef.current) {
      const activeBtn = tabBarRef.current.querySelector(`[data-tab="${activeTab}"]`);
      if (activeBtn) activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeTab]);

  const Content = TAB_CONTENT[activeTab];
  const visitedCount = visited.size;
  const totalCount = ALL_TABS.length;
  const groupTabIndex = activeGroup.tabs.findIndex((t) => t.id === activeTab) + 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Source+Sans+3:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .biotek-root { font-family: 'Source Sans 3', sans-serif; background: #0f172a; color: #f1f5f9; min-height: 100vh; }
        .biotek-root * { box-sizing: border-box; margin: 0; }
        .biotek-root p { margin: 0; }
        .biotek-groupbar { display: flex; gap: 6px; overflow-x: auto; padding: 10px 16px; background: #0a0f1e;
          border-bottom: 1px solid #1e293b; scrollbar-width: thin; scrollbar-color: #334155 transparent; }
        .biotek-groupbar::-webkit-scrollbar { height: 4px; }
        .biotek-groupbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
        .biotek-group { flex-shrink: 0; padding: 9px 16px; border-radius: 8px; font-size: 0.86rem;
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; cursor: pointer;
          border: 1px solid #1e293b; transition: all 0.18s ease; white-space: nowrap;
          background: #111a2e; color: #64748b; display: flex; align-items: center; gap: 8px; }
        .biotek-group:hover { color: #cbd5e1; background: #16223b; border-color: #334155; }
        .biotek-group.active { background: linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 100%); color: #fff;
          border-color: #3b82f6; box-shadow: 0 4px 14px rgba(59,130,246,0.25); }
        .biotek-group .num { font-family: 'JetBrains Mono', monospace; font-size: 0.72rem;
          padding: 2px 7px; border-radius: 999px; background: rgba(255,255,255,0.08); color: inherit; }
        .biotek-group.active .num { background: rgba(255,255,255,0.22); }
        .biotek-tabbar { display: flex; gap: 4px; overflow-x: auto; padding: 8px 16px; background: #0c1222;
          border-bottom: 1px solid #1e293b; scrollbar-width: thin; scrollbar-color: #334155 transparent; }
        .biotek-tabbar::-webkit-scrollbar { height: 4px; }
        .biotek-tabbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
        .biotek-tab { flex-shrink: 0; padding: 7px 14px; border-radius: 6px; font-size: 0.82rem;
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; cursor: pointer;
          border: 1px solid transparent; transition: all 0.15s ease; white-space: nowrap;
          position: relative; background: transparent; color: #64748b; }
        .biotek-tab:hover { color: #94a3b8; background: rgba(59,130,246,0.06); }
        .biotek-tab.active { background: rgba(59,130,246,0.12); color: #60a5fa;
          border-color: rgba(59,130,246,0.3); }
        .biotek-tab .dot { position: absolute; top: 3px; right: 3px; width: 5px; height: 5px;
          border-radius: 50%; background: #4ade80; }
        .biotek-content { padding: 20px 20px 40px; max-width: 820px; margin: 0 auto; }
        .biotek-progress { display: flex; align-items: center; gap: 10px; padding: 8px 16px;
          font-size: 0.78rem; color: #475569; background: #0c1222; border-bottom: 1px solid #1e293b; }
        .biotek-pbar { flex: 1; height: 3px; background: #1e293b; border-radius: 2px; overflow: hidden; }
        .biotek-pfill { height: 100%; background: #3b82f6; border-radius: 2px; transition: width 0.3s ease; }
      `}</style>
      <div className="biotek-root">
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)",
          borderBottom: "2px solid #3b82f6", padding: "20px 20px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{
              background: "#3b82f6", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 800, fontSize: "0.75rem", padding: "3px 10px", borderRadius: 5,
              letterSpacing: "0.04em",
            }}>EMNE 6 — BIOTEKNOLOGI</span>
            <span style={{ color: "#475569", fontSize: "0.78rem" }}>MATV1007</span>
          </div>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1.45rem",
            fontWeight: 800, color: "#f1f5f9", margin: 0, letterSpacing: "-0.01em",
          }}>Bioteknologi — Komplett oversikt</h1>
          <p style={{ color: "#64748b", fontSize: "0.82rem", marginTop: 4 }}>
            16 fagtemaer · {activeGroup.short} ({groupTabIndex}/{activeGroup.tabs.length}): {activeGroup.subtitle}
          </p>
        </div>

        {/* Group selector */}
        <div className="biotek-groupbar" ref={groupBarRef}>
          {GROUPS.map((g) => (
            <div
              key={g.id}
              className={`biotek-group ${activeGroupId === g.id ? "active" : ""}`}
              onClick={() => handleGroupClick(g.id)}
            >
              <span>{g.label}</span>
              <span className="num">{g.tabs.length}</span>
            </div>
          ))}
        </div>

        {/* Progress */}
        <div className="biotek-progress">
          <span>{visitedCount}/{totalCount} besøkt</span>
          <div className="biotek-pbar">
            <div className="biotek-pfill" style={{ width: `${(visitedCount / totalCount) * 100}%` }} />
          </div>
        </div>

        {/* Tab bar — only for active group */}
        <div className="biotek-tabbar" ref={tabBarRef}>
          {activeGroup.tabs.map((tab) => (
            <div
              key={tab.id}
              data-tab={tab.id}
              className={`biotek-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
              {visited.has(tab.id) && activeTab !== tab.id && <span className="dot" />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="biotek-content">
          <Content />
        </div>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid #1e293b", padding: "12px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: "0.75rem", color: "#475569",
        }}>
          <span>Klikk på fagbegrep for definisjon</span>
          <span>Emne 6 · {activeGroup.label}</span>
        </div>
      </div>
    </>
  );
}
