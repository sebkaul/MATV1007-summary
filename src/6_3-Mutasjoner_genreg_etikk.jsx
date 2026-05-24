import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// EMNE 6 — BIOTEKNOLOGI  |  DEL 3: MUTASJONER, GENREGULERING & ETIKK
// Tabs 13–16 of 16  |  MATV1007 Eksamensforberedelse
// ═══════════════════════════════════════════════════════════════

const TABS = [
  { id: "mutasjoner", label: "Mutasjoner" },
  { id: "mutagener", label: "Mutagener" },
  { id: "genreg", label: "Genregulering" },
  { id: "etikk", label: "Etikk" },
];

/* ── Shared components (same API as Part 1 & 2) ──────────── */

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
      <span onClick={(e) => { e.stopPropagation(); setShow(!show); }}
        style={{ color: "#60a5fa", background: "rgba(59,130,246,0.10)", padding: "1px 5px", borderRadius: 4, cursor: "pointer", fontWeight: 600, fontSize: "0.95em", borderBottom: "1.5px dashed rgba(96,165,250,0.5)", transition: "background 0.15s" }}
      >{children}</span>
      {show && def && (
        <span style={{ position: "absolute", bottom: "calc(100% + 8px)", left: 0, zIndex: 999, background: "#1e293b", border: "1px solid #3b82f6", borderRadius: 8, padding: "8px 12px", fontSize: "0.82rem", color: "#cbd5e1", minWidth: 220, maxWidth: 340, lineHeight: 1.45, boxShadow: "0 8px 32px rgba(0,0,0,0.55)" }}>{def}</span>
      )}
    </span>
  );
};

const Sec = ({ children, icon, title }) => (
  <div style={{ marginTop: 28 }}>
    <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1.05rem", color: "#3b82f6", margin: "0 0 10px", display: "flex", alignItems: "center", gap: 8, fontWeight: 700 }}>
      <span style={{ fontSize: "1.15em" }}>{icon}</span> {title}
    </h3>
    {children}
  </div>
);

const Pills = ({ terms }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
    {terms.map((t, i) => <Term key={i} def={t.d}>{t.t}</Term>)}
  </div>
);

const Husk = ({ children }) => (
  <div style={{ background: "linear-gradient(135deg,rgba(59,130,246,0.09),rgba(59,130,246,0.03))", border: "1px solid rgba(59,130,246,0.25)", borderLeft: "4px solid #3b82f6", borderRadius: 8, padding: "12px 16px", marginTop: 20 }}>
    <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.82rem", color: "#3b82f6", marginBottom: 4, fontWeight: 700 }}>💡 Huskeregel</div>
    <div style={{ fontSize: "0.88rem", color: "#e2e8f0", lineHeight: 1.55 }}>{children}</div>
  </div>
);

const Exam = ({ children }) => (
  <div style={{ background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.22)", borderRadius: 8, padding: "10px 14px", marginTop: 14, fontSize: "0.82rem", color: "#fca5a5", lineHeight: 1.5 }}>
    <span style={{ fontWeight: 700, color: "#f87171" }}>🎯 Eksamensrelevans: </span>{children}
  </div>
);

const Eks = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ marginTop: 18 }}>
      <div onClick={() => setOpen(!open)} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: open ? "8px 8px 0 0" : 8, padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.88rem", color: "#f1f5f9" }}>📝 {title}</span>
        <span style={{ color: "#3b82f6", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", fontSize: "0.8em" }}>▼</span>
      </div>
      {open && <div style={{ background: "#172033", border: "1px solid #334155", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "14px 16px", fontSize: "0.86rem", color: "#94a3b8", lineHeight: 1.65 }}>{children}</div>}
    </div>
  );
};

const P = ({ children, mt }) => (
  <p style={{ color: "#cbd5e1", fontSize: "0.9rem", lineHeight: 1.65, margin: `${mt || 0}px 0 0` }}>{children}</p>
);

const Card = ({ title, color, children }) => (
  <div style={{ background: "#1e293b", border: `1px solid ${color}30`, borderRadius: 8, padding: "10px 14px" }}>
    <div style={{ color, fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.9rem", marginBottom: 4 }}>{title}</div>
    <div style={{ color: "#94a3b8", fontSize: "0.85rem", lineHeight: 1.55 }}>{children}</div>
  </div>
);

/* ── SVG: Mutation types ─────────────────────────────────── */

const SvgMutasjoner = () => (
  <svg viewBox="0 0 520 295" style={{ width: "100%", maxWidth: 520, display: "block", margin: "14px auto" }}>
    {/* Wild type */}
    <text x="8" y="16" fill="#4ade80" fontSize="10.5" fontWeight="bold" fontFamily="sans-serif">Villtype (normalsekvens):</text>
    <text x="8" y="34" fill="#f1f5f9" fontSize="11" fontFamily="monospace">DNA:     ...T A C A C C G A G G G A C T A A T T...</text>
    <text x="8" y="50" fill="#94a3b8" fontSize="10" fontFamily="monospace">mRNA:    A U G U G G C U C C C U G A U U A A</text>
    <text x="8" y="66" fill="#93c5fd" fontSize="9.5" fontFamily="sans-serif">Protein: Met — Trp — Leu — Pro — Asp — Stopp</text>
    {/* Samesense */}
    <rect x="0" y="80" width="250" height="58" rx="6" fill="rgba(74,222,128,0.05)" stroke="#4ade80" strokeWidth="1.2" />
    <text x="10" y="97" fill="#4ade80" fontSize="10" fontWeight="bold" fontFamily="sans-serif">1. Samesense (stille)</text>
    <text x="10" y="112" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Base byttes, men aminosyre uendret</text>
    <text x="10" y="126" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Eks: CCG → CCU — begge = Pro</text>
    <text x="10" y="136" fill="#86efac" fontSize="7.5" fontFamily="sans-serif">Kodon-degenerasjon: ulike kodoner = same AA</text>
    {/* Missense */}
    <rect x="260" y="80" width="252" height="58" rx="6" fill="rgba(251,191,36,0.05)" stroke="#fbbf24" strokeWidth="1.2" />
    <text x="270" y="97" fill="#fbbf24" fontSize="10" fontWeight="bold" fontFamily="sans-serif">2. Missense</text>
    <text x="270" y="112" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Nytt kodon → ny aminosyre → annet protein</text>
    <text x="270" y="126" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Eks: GAU (Asp) → GUU (Val)</text>
    <text x="270" y="136" fill="#fcd34d" fontSize="7.5" fontFamily="sans-serif">Protein kan være funksjonelt eller defekt</text>
    {/* Nonsense */}
    <rect x="0" y="148" width="250" height="58" rx="6" fill="rgba(239,68,68,0.05)" stroke="#f87171" strokeWidth="1.2" />
    <text x="10" y="165" fill="#f87171" fontSize="10" fontWeight="bold" fontFamily="sans-serif">3. Nonsense</text>
    <text x="10" y="180" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Kodon → stoppkodon (UAG/UAA/UGA)</text>
    <text x="10" y="194" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Proteinsyntese stoppes for tidlig</text>
    <text x="10" y="204" fill="#fca5a5" fontSize="7.5" fontFamily="sans-serif">→ Ufullstendig/defekt protein</text>
    {/* Frameshift */}
    <rect x="260" y="148" width="252" height="58" rx="6" fill="rgba(168,85,247,0.05)" stroke="#a78bfa" strokeWidth="1.2" />
    <text x="270" y="165" fill="#a78bfa" fontSize="10" fontWeight="bold" fontFamily="sans-serif">4. Rammeskift (frameshift)</text>
    <text x="270" y="180" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Addisjon/delesjon av 1–2 baser</text>
    <text x="270" y="194" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Hele leserammen forskyves fra punktet</text>
    <text x="270" y="204" fill="#c4b5fd" fontSize="7.5" fontFamily="sans-serif">Eks: FAR SYR MOR → FA RSY RMO R</text>
    {/* Substitution types */}
    <rect x="0" y="218" width="512" height="32" rx="6" fill="rgba(59,130,246,0.04)" stroke="#334155" strokeWidth="1" />
    <text x="10" y="236" fill="#3b82f6" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">Substitusjonstyper:</text>
    <text x="140" y="236" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Transisjon: Purin↔Purin (A↔G) eller Pyr↔Pyr (C↔T)</text>
    <text x="140" y="248" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Transversjon: Purin↔Pyrimidin (A/G ↔ C/T)</text>
    {/* Spontan vs indusert */}
    <rect x="0" y="260" width="512" height="30" rx="6" fill="rgba(251,191,36,0.04)" stroke="#334155" strokeWidth="1" />
    <text x="10" y="278" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Spontan:</text>
    <text x="66" y="278" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Naturlige replikasjonsfeil (1 per 10⁵–10¹⁰)</text>
    <text x="290" y="278" fill="#f87171" fontSize="9" fontWeight="bold" fontFamily="sans-serif">Indusert:</text>
    <text x="340" y="278" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Mutagener øker raten opptil 1000×</text>
  </svg>
);

/* ── SVG: Lac Operon ─────────────────────────────────────── */

const SvgLacOperon = () => (
  <svg viewBox="0 0 540 275" style={{ width: "100%", maxWidth: 540, display: "block", margin: "14px auto" }}>
    {/* DNA line */}
    <rect x="15" y="48" width="510" height="5" rx="2.5" fill="#334155" />
    {/* Gene regions */}
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
    {/* Labels */}
    <text x="100" y="24" fill="#64748b" fontSize="8" fontFamily="sans-serif">← Regulerende →</text>
    <text x="305" y="24" fill="#3b82f6" fontSize="8" fontFamily="sans-serif">← Strukturelle gener →</text>
    <text x="15" y="78" fill="#64748b" fontSize="7.5" fontFamily="sans-serif">5' ────────────────────────────────────────────────────────────────────── 3'</text>
    {/* State 1: OFF */}
    <rect x="15" y="92" width="245" height="75" rx="6" fill="rgba(239,68,68,0.04)" stroke="#f87171" strokeWidth="1" />
    <text x="25" y="110" fill="#f87171" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Uten laktose — AVSLÅTT</text>
    <text x="25" y="126" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">1. lacI transkriberes → repressor-protein</text>
    <text x="25" y="140" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">2. Repressor binder operator (O)</text>
    <text x="25" y="154" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">3. RNA-polymerase blokkeres → INGEN</text>
    <text x="25" y="164" fill="#fca5a5" fontSize="8.5" fontFamily="sans-serif">   transkripsjon av lacZ/Y/A</text>
    {/* State 2: ON */}
    <rect x="275" y="92" width="245" height="75" rx="6" fill="rgba(74,222,128,0.04)" stroke="#4ade80" strokeWidth="1" />
    <text x="285" y="110" fill="#4ade80" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Med laktose — PÅSLÅTT</text>
    <text x="285" y="126" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">1. Laktose → isomeriseres til allolaktose</text>
    <text x="285" y="140" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">2. Allolaktose (induser) binder repressor</text>
    <text x="285" y="154" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">3. Repressor løsner fra operator</text>
    <text x="285" y="164" fill="#86efac" fontSize="8.5" fontFamily="sans-serif">4. Transkripsjon av lacZ/Y/A skjer!</text>
    {/* Key concepts */}
    <rect x="15" y="180" width="505" height="88" rx="6" fill="rgba(59,130,246,0.04)" stroke="#334155" strokeWidth="1" />
    <text x="25" y="198" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Nøkkelkonsepter:</text>
    <text x="25" y="214" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Lac-operonet = induserbart operon (påslås av induser = allolaktose)</text>
    <text x="25" y="228" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Negativ kontroll: repressor hemmer transkripsjon (fjernes av induser)</text>
    <text x="25" y="242" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Positiv kontroll: CAP-cAMP aktiverer transkripsjon (binder CAP-sete mellom lacP og lacI)</text>
    <text x="25" y="258" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">• Taktisk reg. = allosterisk / feedback inhibering (rask) | Strategisk reg. = genregulering / operoner (langsom)</text>
  </svg>
);

/* ── SVG: Mutagener overview ─────────────────────────────── */

const SvgMutagener = () => (
  <svg viewBox="0 0 520 190" style={{ width: "100%", maxWidth: 520, display: "block", margin: "14px auto" }}>
    {/* Three categories */}
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

    {/* V2024 matching */}
    <rect x="0" y="115" width="512" height="68" rx="6" fill="rgba(59,130,246,0.04)" stroke="#334155" strokeWidth="1" />
    <text x="10" y="132" fill="#3b82f6" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">V2024 oppg. 14 — matching (5 poeng):</text>
    <text x="10" y="148" fill="#4ade80" fontSize="8.5" fontFamily="sans-serif">5-BU → Erstatter normal base under replikasjon</text>
    <text x="10" y="162" fill="#f87171" fontSize="8.5" fontFamily="sans-serif">Salpetersyrling (HNO₂) → Deaminerende, amingruppe fjernes</text>
    <text x="10" y="176" fill="#fbbf24" fontSize="8.5" fontFamily="sans-serif">Sennepsgass (EMS) → Alkylerende, alkylgrupper flyttes</text>
    <text x="280" y="148" fill="#a78bfa" fontSize="8.5" fontFamily="sans-serif">Ethidiumbromid → Interkalerende, mellom basepar</text>
    <text x="280" y="162" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">UV-stråling → Pyrimidin-dimerer (thymin)</text>
  </svg>
);

/* ── Tab content ──────────────────────────────────────────── */

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

/* ── Tab content map ──────────────────────────────────────── */
const TAB_CONTENT = {
  mutasjoner: TabMutasjoner,
  mutagener: TabMutagener,
  genreg: TabGenreg,
  etikk: TabEtikk,
};

/* ── Main component ───────────────────────────────────────── */
export default function BioteknologiDel3() {
  const [activeTab, setActiveTab] = useState("mutasjoner");
  const [visited, setVisited] = useState(new Set(["mutasjoner"]));
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
        .biotek3-root { font-family: 'Source Sans 3', sans-serif; background: #0f172a; color: #f1f5f9; min-height: 100vh; }
        .biotek3-root * { box-sizing: border-box; margin: 0; }
        .biotek3-root p { margin: 0; }
        .biotek3-tabbar { display: flex; gap: 4px; overflow-x: auto; padding: 8px 16px; background: #0c1222;
          border-bottom: 1px solid #1e293b; scrollbar-width: thin; scrollbar-color: #334155 transparent; }
        .biotek3-tabbar::-webkit-scrollbar { height: 4px; }
        .biotek3-tabbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
        .biotek3-tab { flex-shrink: 0; padding: 7px 14px; border-radius: 6px; font-size: 0.82rem;
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; cursor: pointer;
          border: 1px solid transparent; transition: all 0.15s ease; white-space: nowrap;
          position: relative; background: transparent; color: #64748b; }
        .biotek3-tab:hover { color: #94a3b8; background: rgba(59,130,246,0.06); }
        .biotek3-tab.active { background: rgba(59,130,246,0.12); color: #60a5fa; border-color: rgba(59,130,246,0.3); }
        .biotek3-tab .dot { position: absolute; top: 3px; right: 3px; width: 5px; height: 5px; border-radius: 50%; background: #4ade80; }
        .biotek3-content { padding: 20px 20px 40px; max-width: 820px; margin: 0 auto; }
        .biotek3-progress { display: flex; align-items: center; gap: 8px; padding: 8px 16px;
          font-size: 0.78rem; color: #475569; background: #0c1222; border-bottom: 1px solid #1e293b; }
        .biotek3-pbar { flex: 1; height: 3px; background: #1e293b; border-radius: 2px; overflow: hidden; }
        .biotek3-pfill { height: 100%; background: #3b82f6; border-radius: 2px; transition: width 0.3s ease; }
      `}</style>
      <div className="biotek3-root">
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)",
          borderBottom: "2px solid #3b82f6", padding: "20px 20px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{
              background: "#3b82f6", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 800, fontSize: "0.75rem", padding: "3px 10px", borderRadius: 5, letterSpacing: "0.04em",
            }}>EMNE 6 — DEL 3/3</span>
            <span style={{ color: "#475569", fontSize: "0.78rem" }}>MATV1007</span>
          </div>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1.45rem",
            fontWeight: 800, color: "#f1f5f9", margin: 0, letterSpacing: "-0.01em",
          }}>Bioteknologi — Mutasjoner, Genregulering & Etikk</h1>
          <p style={{ color: "#64748b", fontSize: "0.82rem", marginTop: 4 }}>
            Tabs 13–16 av 16 · Mutasjoner, mutagener, lac-operon/genregulering, etikk
          </p>
        </div>

        {/* Progress */}
        <div className="biotek3-progress">
          <span>{visited.size}/{TABS.length} besøkt</span>
          <div className="biotek3-pbar">
            <div className="biotek3-pfill" style={{ width: `${(visited.size / TABS.length) * 100}%` }} />
          </div>
        </div>

        {/* Tab bar */}
        <div className="biotek3-tabbar" ref={tabBarRef}>
          {TABS.map((tab) => (
            <div
              key={tab.id}
              data-tab={tab.id}
              className={`biotek3-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
              {visited.has(tab.id) && activeTab !== tab.id && <span className="dot" />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="biotek3-content">
          <Content />
        </div>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid #1e293b", padding: "12px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: "0.75rem", color: "#475569",
        }}>
          <span>Klikk på fagbegrep for definisjon</span>
          <span>Del 3/3 · Emne 6 komplett! 🎯</span>
        </div>
      </div>
    </>
  );
}
