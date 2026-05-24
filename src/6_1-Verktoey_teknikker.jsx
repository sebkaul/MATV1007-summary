import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// EMNE 6 — BIOTEKNOLOGI  |  DEL 1: VERKTØY & TEKNIKKER
// Tabs 1–8 of 16  |  MATV1007 Eksamensforberedelse
// ═══════════════════════════════════════════════════════════════

const TABS = [
  { id: "intro", label: "Introduksjon" },
  { id: "terminologi", label: "Genetisk terminologi" },
  { id: "restriksjon", label: "Restriksjonsenzymer" },
  { id: "vektorer", label: "Vektorer & ligaser" },
  { id: "kloning", label: "Kloning av DNA" },
  { id: "crispr", label: "CRISPR-Cas9" },
  { id: "pcr", label: "PCR" },
  { id: "gel", label: "Gelelektroforese" },
];

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

/* ── SVG Diagrams ─────────────────────────────────────────── */

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
    {/* Arrow to result */}
    <line x1="130" y1="75" x2="130" y2="92" stroke="#64748b" strokeWidth="1.2" markerEnd="url(#arr1)" />
    <defs><marker id="arr1" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#64748b" /></marker></defs>
    {/* Sticky ends result */}
    <text x="20" y="112" fill="#94a3b8" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Resultat — klebrige ender (sticky ends):</text>
    <text x="20" y="132" fill="#f1f5f9" fontSize="12" fontFamily="monospace">5' ...G          A A T T C... 3'</text>
    <text x="20" y="152" fill="#f1f5f9" fontSize="12" fontFamily="monospace">3' ...C T T A A          G... 5'</text>
    <rect x="82" y="118" width="56" height="18" rx="3" fill="rgba(96,165,250,0.12)" stroke="#60a5fa" strokeWidth="1" />
    <text x="110" y="167" textAnchor="middle" fill="#60a5fa" fontSize="8.5" fontFamily="sans-serif">5'-overheng</text>
    {/* Blunt comparison */}
    <text x="300" y="112" fill="#fbbf24" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Butte ender (blunt ends):</text>
    <text x="300" y="132" fill="#f1f5f9" fontSize="11" fontFamily="monospace">EcoRV: GAT↓ATC</text>
    <text x="300" y="148" fill="#94a3b8" fontSize="9.5" fontFamily="sans-serif">→ Jevne kutt, ingen overheng</text>
    <text x="300" y="164" fill="#94a3b8" fontSize="9.5" fontFamily="sans-serif">→ Vanskeligere å ligere</text>
    {/* Isoschizomer note */}
    <text x="300" y="186" fill="#a78bfa" fontSize="9" fontFamily="sans-serif">Isoschizomerer: ulike enzymer, samme gjenkj.sekvens</text>
  </svg>
);

const SvgPlasmid = () => (
  <svg viewBox="0 0 420 210" style={{ width: "100%", maxWidth: 420, display: "block", margin: "14px auto" }}>
    <circle cx="140" cy="105" r="78" fill="none" stroke="#3b82f6" strokeWidth="3" />
    {/* ori */}
    <circle cx="140" cy="27" r="12" fill="rgba(74,222,128,0.15)" stroke="#4ade80" strokeWidth="1.5" />
    <text x="140" y="30" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold" fontFamily="sans-serif">ori</text>
    <text x="140" y="14" textAnchor="middle" fill="#86efac" fontSize="7" fontFamily="sans-serif">Replikasjonsstart</text>
    {/* ampR arc */}
    <path d="M78,50 A78,78 0 0,0 65,105" stroke="#f87171" strokeWidth="7" fill="none" strokeLinecap="round" />
    <text x="48" y="75" fill="#f87171" fontSize="9" fontWeight="bold" fontFamily="sans-serif">ampᴿ</text>
    {/* tetR arc */}
    <path d="M202,50 A78,78 0 0,1 215,105" stroke="#fbbf24" strokeWidth="7" fill="none" strokeLinecap="round" />
    <text x="222" y="75" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="sans-serif">tetᴿ</text>
    {/* MCS */}
    <rect x="125" y="176" width="30" height="12" rx="4" fill="rgba(168,85,247,0.25)" stroke="#a78bfa" strokeWidth="1" />
    <text x="140" y="185" textAnchor="middle" fill="#a78bfa" fontSize="7.5" fontWeight="bold" fontFamily="sans-serif">MCS</text>
    <text x="140" y="205" textAnchor="middle" fill="#c4b5fd" fontSize="7.5" fontFamily="sans-serif">Multikloningssted</text>
    {/* Center label */}
    <text x="140" y="100" textAnchor="middle" fill="#f1f5f9" fontSize="10" fontFamily="sans-serif" fontWeight="bold">Plasmid</text>
    <text x="140" y="114" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">(eks. pBR322)</text>
    {/* Properties list */}
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
    {/* Origin */}
    <text x="10" y="14" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Opprinnelse: bakteriers immunforsvar mot virus</text>
    <text x="10" y="28" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">CRISPR = repeterende sekvenser avbrutt av fremmed DNA (spacers fra virusinfeksjoner)</text>
    <text x="10" y="40" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">cas-gener ligger nær CRISPR → produserer Cas-proteiner (klasse V restriksjonsenzymer)</text>
    {/* DNA */}
    <rect x="30" y="85" width="440" height="7" rx="3.5" fill="#334155" />
    <rect x="30" y="96" width="440" height="7" rx="3.5" fill="#475569" />
    {/* Target */}
    <rect x="190" y="82" width="80" height="24" rx="4" fill="rgba(239,68,68,0.15)" stroke="#f87171" strokeWidth="1.2" />
    <text x="230" y="98" textAnchor="middle" fill="#f87171" fontSize="8" fontFamily="monospace">Mål-DNA</text>
    {/* PAM */}
    <rect x="272" y="82" width="32" height="24" rx="3" fill="rgba(251,191,36,0.12)" stroke="#fbbf24" strokeWidth="1" />
    <text x="288" y="98" textAnchor="middle" fill="#fbbf24" fontSize="7.5" fontFamily="monospace">PAM</text>
    <text x="288" y="78" textAnchor="middle" fill="#fbbf24" fontSize="7" fontFamily="sans-serif">Nødvendig!</text>
    {/* Cas9 */}
    <ellipse cx="230" cy="58" rx="52" ry="24" fill="rgba(59,130,246,0.12)" stroke="#3b82f6" strokeWidth="1.5" />
    <text x="230" y="55" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold" fontFamily="sans-serif">Cas9</text>
    <text x="230" y="67" textAnchor="middle" fill="#93c5fd" fontSize="8" fontFamily="sans-serif">RNA-guidet nuklease</text>
    {/* sgRNA */}
    <path d="M192,82 C182,68 186,54 200,52" fill="none" stroke="#4ade80" strokeWidth="2" />
    <text x="152" y="62" fill="#4ade80" fontSize="9" fontWeight="bold" fontFamily="sans-serif">sgRNA</text>
    <text x="148" y="74" fill="#86efac" fontSize="7.5" fontFamily="sans-serif">(guide-RNA)</text>
    {/* Cut */}
    <line x1="228" y1="106" x2="228" y2="130" stroke="#f87171" strokeWidth="1.8" strokeDasharray="3 2" />
    <line x1="232" y1="106" x2="232" y2="130" stroke="#f87171" strokeWidth="1.8" strokeDasharray="3 2" />
    <text x="230" y="143" textAnchor="middle" fill="#f87171" fontSize="9" fontFamily="sans-serif">✂ Dobbelttrådbrudd</text>
    {/* Repair */}
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
    {/* Step 1 */}
    <rect x="8" y="8" width="152" height="78" rx="8" fill="rgba(239,68,68,0.08)" stroke="#f87171" strokeWidth="1.3" />
    <text x="84" y="28" textAnchor="middle" fill="#f87171" fontSize="12" fontWeight="bold" fontFamily="sans-serif">1. Denaturering</text>
    <text x="84" y="46" textAnchor="middle" fill="#fca5a5" fontSize="10" fontFamily="monospace">94–96 °C</text>
    <text x="84" y="60" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">dsDNA → 2× ssDNA</text>
    <text x="84" y="74" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">H-bindinger brytes</text>
    {/* Arrow */}
    <line x1="162" y1="47" x2="178" y2="47" stroke="#3b82f6" strokeWidth="1.3" markerEnd="url(#arr2)" />
    {/* Step 2 */}
    <rect x="182" y="8" width="152" height="78" rx="8" fill="rgba(74,222,128,0.07)" stroke="#4ade80" strokeWidth="1.3" />
    <text x="258" y="28" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold" fontFamily="sans-serif">2. Annealing</text>
    <text x="258" y="46" textAnchor="middle" fill="#86efac" fontSize="10" fontFamily="monospace">50–65 °C</text>
    <text x="258" y="60" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Primere → templat</text>
    <text x="258" y="74" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Temp ≈ Tm − 5 °C</text>
    {/* Arrow */}
    <line x1="336" y1="47" x2="352" y2="47" stroke="#3b82f6" strokeWidth="1.3" markerEnd="url(#arr2)" />
    {/* Step 3 */}
    <rect x="356" y="8" width="136" height="78" rx="8" fill="rgba(59,130,246,0.08)" stroke="#3b82f6" strokeWidth="1.3" />
    <text x="424" y="28" textAnchor="middle" fill="#3b82f6" fontSize="12" fontWeight="bold" fontFamily="sans-serif">3. Elongering</text>
    <text x="424" y="46" textAnchor="middle" fill="#93c5fd" fontSize="10" fontFamily="monospace">72 °C</text>
    <text x="424" y="60" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Taq polymerase</text>
    <text x="424" y="74" textAnchor="middle" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">dNTP → ny tråd (5'→3')</text>
    {/* Cycle arrow */}
    <path d="M424,90 C424,118 84,118 84,90" fill="none" stroke="#3b82f6" strokeWidth="1.3" strokeDasharray="5 3" markerEnd="url(#arr2)" />
    <text x="254" y="116" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">× 25–40 sykluser</text>
    {/* Exponential */}
    <rect x="8" y="132" width="484" height="48" rx="6" fill="rgba(59,130,246,0.05)" stroke="#334155" strokeWidth="1" />
    <text x="20" y="152" fill="#3b82f6" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">Eksponensiell amplifisering:</text>
    <text x="20" y="170" fill="#f1f5f9" fontSize="12" fontFamily="monospace">Kopier = 2ⁿ   (n = sykluser)   →   30 sykluser ≈ 10⁹ kopier</text>
    {/* Components */}
    <rect x="8" y="192" width="484" height="42" rx="6" fill="rgba(59,130,246,0.04)" stroke="#334155" strokeWidth="1" />
    <text x="20" y="210" fill="#3b82f6" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">I PCR-røret:</text>
    <text x="102" y="210" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">DNA-templat • Taq polymerase • 2 primere (fw+rev) • dNTP (A,C,G,T i 1:1:1:1) • Buffer m/ Mg²⁺</text>
    <text x="20" y="226" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Primer: 15–35 baser, 40–60% GC. Tm = 4(G+C) + 2(A+T). Annealing ≈ Tm − 5 °C.</text>
    {/* Variants */}
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
    {/* Gel box */}
    <rect x="25" y="22" width="195" height="185" rx="6" fill="rgba(59,130,246,0.03)" stroke="#334155" strokeWidth="1.5" />
    {/* Electrodes */}
    <rect x="25" y="16" width="195" height="8" rx="2" fill="rgba(239,68,68,0.2)" stroke="#f87171" strokeWidth="1" />
    <text x="122" y="12" textAnchor="middle" fill="#f87171" fontSize="8.5" fontFamily="sans-serif">⊖ Katode (negativ)</text>
    <rect x="25" y="204" width="195" height="8" rx="2" fill="rgba(59,130,246,0.2)" stroke="#3b82f6" strokeWidth="1" />
    <text x="122" y="224" textAnchor="middle" fill="#3b82f6" fontSize="8.5" fontFamily="sans-serif">⊕ Anode (positiv)</text>
    {/* Wells */}
    {[45, 82, 119, 156, 193].map((x, i) => (
      <g key={i}>
        <rect x={x - 8} y="28" width="16" height="5" rx="1" fill="#475569" />
        <text x={x} y="26" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="sans-serif">{["M", "1", "2", "3", "M"][i]}</text>
      </g>
    ))}
    {/* Marker ladder */}
    {[48, 70, 88, 106, 128, 155].map((y, i) => (
      <g key={i}>
        <rect x="39" y={y} width="12" height="3" rx="1" fill="#4ade80" opacity={0.85 - i * 0.1} />
        <rect x="187" y={y} width="12" height="3" rx="1" fill="#4ade80" opacity={0.85 - i * 0.1} />
      </g>
    ))}
    {/* Size labels */}
    <text x="14" y="52" fill="#4ade80" fontSize="6" fontFamily="monospace">10k</text>
    <text x="14" y="74" fill="#4ade80" fontSize="6" fontFamily="monospace">5k</text>
    <text x="14" y="92" fill="#4ade80" fontSize="6" fontFamily="monospace">3k</text>
    <text x="14" y="110" fill="#4ade80" fontSize="6" fontFamily="monospace">1.5k</text>
    <text x="14" y="132" fill="#4ade80" fontSize="6" fontFamily="monospace">500</text>
    <text x="14" y="159" fill="#4ade80" fontSize="6" fontFamily="monospace">100</text>
    {/* Sample 1: 2 bands */}
    <rect x="76" y="70" width="12" height="3" rx="1" fill="#3b82f6" />
    <rect x="76" y="128" width="12" height="3" rx="1" fill="#3b82f6" />
    {/* Sample 2: 1 band (PCR) */}
    <rect x="113" y="106" width="12" height="3.5" rx="1" fill="#3b82f6" opacity="0.95" />
    {/* Sample 3: 3 bands */}
    <rect x="150" y="48" width="12" height="3" rx="1" fill="#3b82f6" />
    <rect x="150" y="88" width="12" height="3" rx="1" fill="#3b82f6" />
    <rect x="150" y="155" width="12" height="3" rx="1" fill="#3b82f6" />
    {/* Arrow */}
    <text x="9" y="115" fill="#64748b" fontSize="7" fontFamily="sans-serif" transform="rotate(-90,9,115)">Vandring →</text>
    {/* Legend */}
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

/* ── Tab content ──────────────────────────────────────────── */

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

/* ── Tab content map ──────────────────────────────────────── */
const TAB_CONTENT = {
  intro: TabIntro,
  terminologi: TabTerminologi,
  restriksjon: TabRestriksjon,
  vektorer: TabVektorer,
  kloning: TabKloning,
  crispr: TabCRISPR,
  pcr: TabPCR,
  gel: TabGel,
};

/* ── Main component ───────────────────────────────────────── */
export default function BioteknologiDel1() {
  const [activeTab, setActiveTab] = useState("intro");
  const [visited, setVisited] = useState(new Set(["intro"]));
  const tabBarRef = useRef(null);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setVisited((prev) => new Set([...prev, id]));
  };

  useEffect(() => {
    if (tabBarRef.current) {
      const activeBtn = tabBarRef.current.querySelector(`[data-tab="${activeTab}"]`);
      if (activeBtn) activeBtn.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    }
  }, [activeTab]);

  const Content = TAB_CONTENT[activeTab];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&family=Source+Sans+3:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .biotek1-root { font-family: 'Source Sans 3', sans-serif; background: #0f172a; color: #f1f5f9; min-height: 100vh; }
        .biotek1-root * { box-sizing: border-box; margin: 0; }
        .biotek1-root p { margin: 0; }
        .biotek1-tabbar { display: flex; gap: 4px; overflow-x: auto; padding: 8px 16px; background: #0c1222;
          border-bottom: 1px solid #1e293b; scrollbar-width: thin; scrollbar-color: #334155 transparent; }
        .biotek1-tabbar::-webkit-scrollbar { height: 4px; }
        .biotek1-tabbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
        .biotek1-tab { flex-shrink: 0; padding: 7px 14px; border-radius: 6px; font-size: 0.82rem;
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; cursor: pointer;
          border: 1px solid transparent; transition: all 0.15s ease; white-space: nowrap;
          position: relative; background: transparent; color: #64748b; }
        .biotek1-tab:hover { color: #94a3b8; background: rgba(59,130,246,0.06); }
        .biotek1-tab.active { background: rgba(59,130,246,0.12); color: #60a5fa;
          border-color: rgba(59,130,246,0.3); }
        .biotek1-tab .dot { position: absolute; top: 3px; right: 3px; width: 5px; height: 5px;
          border-radius: 50%; background: #4ade80; }
        .biotek1-content { padding: 20px 20px 40px; max-width: 820px; margin: 0 auto; }
        .biotek1-progress { display: flex; align-items: center; gap: 8px; padding: 8px 16px;
          font-size: 0.78rem; color: #475569; background: #0c1222; border-bottom: 1px solid #1e293b; }
        .biotek1-pbar { flex: 1; height: 3px; background: #1e293b; border-radius: 2px; overflow: hidden; }
        .biotek1-pfill { height: 100%; background: #3b82f6; border-radius: 2px; transition: width 0.3s ease; }
      `}</style>
      <div className="biotek1-root">
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
            }}>EMNE 6 — DEL 1/3</span>
            <span style={{ color: "#475569", fontSize: "0.78rem" }}>MATV1007</span>
          </div>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1.45rem",
            fontWeight: 800, color: "#f1f5f9", margin: 0, letterSpacing: "-0.01em",
          }}>Bioteknologi — Verktøy & Teknikker</h1>
          <p style={{ color: "#64748b", fontSize: "0.82rem", marginTop: 4 }}>
            Tabs 1–8 av 16 · Intro, terminologi, restriksjon, vektorer, kloning, CRISPR, PCR, gelelektroforese
          </p>
        </div>

        {/* Progress */}
        <div className="biotek1-progress">
          <span>{visited.size}/{TABS.length} besøkt</span>
          <div className="biotek1-pbar">
            <div className="biotek1-pfill" style={{ width: `${(visited.size / TABS.length) * 100}%` }} />
          </div>
        </div>

        {/* Tab bar */}
        <div className="biotek1-tabbar" ref={tabBarRef}>
          {TABS.map((tab) => (
            <div
              key={tab.id}
              data-tab={tab.id}
              className={`biotek1-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
              {visited.has(tab.id) && activeTab !== tab.id && <span className="dot" />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="biotek1-content">
          <Content />
        </div>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid #1e293b", padding: "12px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: "0.75rem", color: "#475569",
        }}>
          <span>Klikk på fagbegrep for definisjon</span>
          <span>Del 1/3 · Fortsetter i Del 2: Analyseteknikker</span>
        </div>
      </div>
    </>
  );
}
