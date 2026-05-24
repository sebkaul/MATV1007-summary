import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════
// EMNE 6 — BIOTEKNOLOGI  |  DEL 2: ANALYSETEKNIKKER
// Tabs 9–12 of 16  |  MATV1007 Eksamensforberedelse
// ═══════════════════════════════════════════════════════════════

const TABS = [
  { id: "southern", label: "Southern blotting" },
  { id: "sekvensering", label: "DNA-sekvensering" },
  { id: "fingerprint", label: "DNA-fingerprinting" },
  { id: "mikromatriser", label: "Mikromatriser & FISH" },
];

/* ── Shared components (identical API to Part 1) ──────────── */

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
    <h3 style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1.05rem", color: "#3b82f6", margin: "0 0 10px", display: "flex", alignItems: "center", gap: 8, letterSpacing: "0.01em", fontWeight: 700 }}>
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
      <div onClick={() => setOpen(!open)} style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: open ? "8px 8px 0 0" : 8, padding: "10px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "border-radius 0.15s" }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "0.88rem", color: "#f1f5f9" }}>📝 {title}</span>
        <span style={{ color: "#3b82f6", transform: open ? "rotate(180deg)" : "rotate(0)", transition: "transform 0.2s", fontSize: "0.8em" }}>▼</span>
      </div>
      {open && (
        <div style={{ background: "#172033", border: "1px solid #334155", borderTop: "none", borderRadius: "0 0 8px 8px", padding: "14px 16px", fontSize: "0.86rem", color: "#94a3b8", lineHeight: 1.65 }}>{children}</div>
      )}
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

/* ── SVG: Southern Blot workflow ──────────────────────────── */

const SvgSouthern = () => (
  <svg viewBox="0 0 540 245" style={{ width: "100%", maxWidth: 540, display: "block", margin: "14px auto" }}>
    <defs><marker id="arr2s" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#64748b" /></marker></defs>
    {/* Step boxes */}
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
    {/* Blotting stack */}
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
      {/* Capillary arrow */}
      <line x1="222" y1="112" x2="222" y2="8" stroke="#06b6d4" strokeWidth="1.3" strokeDasharray="4 2" markerEnd="url(#arr2s)" />
      <text x="232" y="55" fill="#06b6d4" fontSize="8.5" fontFamily="sans-serif">Kapillær-</text>
      <text x="232" y="66" fill="#06b6d4" fontSize="8.5" fontFamily="sans-serif">krefter</text>
    </g>
    {/* Key details */}
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

/* ── SVG: Sanger sequencing ──────────────────────────────── */

const SvgSanger = () => (
  <svg viewBox="0 0 510 215" style={{ width: "100%", maxWidth: 510, display: "block", margin: "14px auto" }}>
    {/* dNTP vs ddNTP comparison */}
    <rect x="8" y="5" width="235" height="55" rx="6" fill="rgba(59,130,246,0.05)" stroke="#334155" strokeWidth="1" />
    <text x="18" y="22" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">dNTP (vanlig byggestein)</text>
    <text x="18" y="36" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Har 3'-OH → syntese fortsetter</text>
    <text x="18" y="50" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">dATP, dCTP, dGTP, dTTP</text>
    <rect x="255" y="5" width="247" height="55" rx="6" fill="rgba(239,68,68,0.05)" stroke="#f87171" strokeWidth="1" />
    <text x="265" y="22" fill="#f87171" fontSize="10" fontWeight="bold" fontFamily="sans-serif">ddNTP (terminator)</text>
    <text x="265" y="36" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">Mangler 3'-OH → STOPPER syntese</text>
    <text x="265" y="50" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">ddATP, ddCTP, ddGTP, ddTTP (fluorescens)</text>
    {/* Process */}
    <text x="8" y="80" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="sans-serif">Prosedyre:</text>
    <text x="8" y="96" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">1. Templat + primer + dNTP + litt ddNTP + polymerase → PCR-reaksjon</text>
    <text x="8" y="110" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">2. ddNTP settes inn tilfeldig → fragmenter av alle lengder, hvert slutter med merket ddNTP</text>
    <text x="8" y="124" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">3. Kapillærelektroforese: separasjon med 1 base forskjell i størrelse</text>
    <text x="8" y="138" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">4. Laser leser fluorescensfarge på hvert fragment → kromatogram/elektroferogram</text>
    {/* Chromatogram */}
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

/* ── SVG: DNA Fingerprinting workflow ────────────────────── */

const SvgFingerprint = () => (
  <svg viewBox="0 0 520 165" style={{ width: "100%", maxWidth: 520, display: "block", margin: "14px auto" }}>
    <defs><marker id="arr2f" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#3b82f6" /></marker></defs>
    {/* Steps */}
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
    {/* Marker types */}
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
    {/* Key facts */}
    <text x="0" y="132" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">99,9% av DNA er likt mellom mennesker. 0,1% variasjon = genulikheter + polymorfe sekvenser mellom genene.</text>
    <text x="0" y="146" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Norge: 23 DNA-områder inkl. kjønn (amelogenin: X+Y = mann, X+X = kvinne). DNA-register drevet av Kripos (1999).</text>
    <text x="0" y="160" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Svært lite biologisk materiale nødvendig. Presenteres som elektroferogram (topper fra kapillærelektroforese).</text>
  </svg>
);

/* ── SVG: Microarray ─────────────────────────────────────── */

const SvgMicroarray = () => (
  <svg viewBox="0 0 500 175" style={{ width: "100%", maxWidth: 500, display: "block", margin: "14px auto" }}>
    <defs><marker id="arr2m" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto"><path d="M0,0 L7,2.5 L0,5" fill="#64748b" /></marker></defs>
    {/* Steps */}
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

    {/* Color key */}
    <rect x="0" y="82" width="492" height="36" rx="6" fill="rgba(59,130,246,0.04)" stroke="#334155" strokeWidth="1" />
    <text x="12" y="100" fill="#f1f5f9" fontSize="9.5" fontWeight="bold" fontFamily="sans-serif">Tolkning av farger:</text>
    <circle cx="175" cy="97" r="6" fill="#f87171" />
    <text x="186" y="101" fill="#f87171" fontSize="9" fontFamily="sans-serif">Rød = overuttrykt i prøve</text>
    <circle cx="310" cy="97" r="6" fill="#4ade80" />
    <text x="321" y="101" fill="#4ade80" fontSize="9" fontFamily="sans-serif">Grønn = underuttrykt</text>
    <circle cx="430" cy="97" r="6" fill="#fbbf24" />
    <text x="441" y="101" fill="#fbbf24" fontSize="9" fontFamily="sans-serif">Gul = lik</text>

    {/* FISH section */}
    <rect x="0" y="130" width="492" height="38" rx="6" fill="rgba(6,182,212,0.05)" stroke="#06b6d4" strokeWidth="1" />
    <text x="12" y="148" fill="#06b6d4" fontSize="10" fontWeight="bold" fontFamily="sans-serif">FISH — Fluorescens in situ hybridisering</text>
    <text x="12" y="162" fill="#94a3b8" fontSize="8.5" fontFamily="sans-serif">Fluorescensmerkede prober hybridiserer med kromosomer på glassplate → kartlegger genposisjon. Observeres i fluorescensmikroskop.</text>
  </svg>
);

/* ── Tab content ──────────────────────────────────────────── */

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

/* ── Tab content map ──────────────────────────────────────── */
const TAB_CONTENT = {
  southern: TabSouthern,
  sekvensering: TabSekvensering,
  fingerprint: TabFingerprint,
  mikromatriser: TabMikromatriser,
};

/* ── Main component ───────────────────────────────────────── */
export default function BioteknologiDel2() {
  const [activeTab, setActiveTab] = useState("southern");
  const [visited, setVisited] = useState(new Set(["southern"]));
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
        .biotek2-root { font-family: 'Source Sans 3', sans-serif; background: #0f172a; color: #f1f5f9; min-height: 100vh; }
        .biotek2-root * { box-sizing: border-box; margin: 0; }
        .biotek2-root p { margin: 0; }
        .biotek2-tabbar { display: flex; gap: 4px; overflow-x: auto; padding: 8px 16px; background: #0c1222;
          border-bottom: 1px solid #1e293b; scrollbar-width: thin; scrollbar-color: #334155 transparent; }
        .biotek2-tabbar::-webkit-scrollbar { height: 4px; }
        .biotek2-tabbar::-webkit-scrollbar-thumb { background: #334155; border-radius: 2px; }
        .biotek2-tab { flex-shrink: 0; padding: 7px 14px; border-radius: 6px; font-size: 0.82rem;
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 600; cursor: pointer;
          border: 1px solid transparent; transition: all 0.15s ease; white-space: nowrap;
          position: relative; background: transparent; color: #64748b; }
        .biotek2-tab:hover { color: #94a3b8; background: rgba(59,130,246,0.06); }
        .biotek2-tab.active { background: rgba(59,130,246,0.12); color: #60a5fa; border-color: rgba(59,130,246,0.3); }
        .biotek2-tab .dot { position: absolute; top: 3px; right: 3px; width: 5px; height: 5px; border-radius: 50%; background: #4ade80; }
        .biotek2-content { padding: 20px 20px 40px; max-width: 820px; margin: 0 auto; }
        .biotek2-progress { display: flex; align-items: center; gap: 8px; padding: 8px 16px;
          font-size: 0.78rem; color: #475569; background: #0c1222; border-bottom: 1px solid #1e293b; }
        .biotek2-pbar { flex: 1; height: 3px; background: #1e293b; border-radius: 2px; overflow: hidden; }
        .biotek2-pfill { height: 100%; background: #3b82f6; border-radius: 2px; transition: width 0.3s ease; }
      `}</style>
      <div className="biotek2-root">
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #1e3a5f 0%, #0f172a 100%)",
          borderBottom: "2px solid #3b82f6", padding: "20px 20px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{
              background: "#3b82f6", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif",
              fontWeight: 800, fontSize: "0.75rem", padding: "3px 10px", borderRadius: 5, letterSpacing: "0.04em",
            }}>EMNE 6 — DEL 2/3</span>
            <span style={{ color: "#475569", fontSize: "0.78rem" }}>MATV1007</span>
          </div>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: "1.45rem",
            fontWeight: 800, color: "#f1f5f9", margin: 0, letterSpacing: "-0.01em",
          }}>Bioteknologi — Analyseteknikker</h1>
          <p style={{ color: "#64748b", fontSize: "0.82rem", marginTop: 4 }}>
            Tabs 9–12 av 16 · Southern blotting, DNA-sekvensering, DNA-fingerprinting, mikromatriser & FISH
          </p>
        </div>

        {/* Progress */}
        <div className="biotek2-progress">
          <span>{visited.size}/{TABS.length} besøkt</span>
          <div className="biotek2-pbar">
            <div className="biotek2-pfill" style={{ width: `${(visited.size / TABS.length) * 100}%` }} />
          </div>
        </div>

        {/* Tab bar */}
        <div className="biotek2-tabbar" ref={tabBarRef}>
          {TABS.map((tab) => (
            <div
              key={tab.id}
              data-tab={tab.id}
              className={`biotek2-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
              {visited.has(tab.id) && activeTab !== tab.id && <span className="dot" />}
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="biotek2-content">
          <Content />
        </div>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid #1e293b", padding: "12px 20px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: "0.75rem", color: "#475569",
        }}>
          <span>Klikk på fagbegrep for definisjon</span>
          <span>Del 2/3 · Fortsetter i Del 3: Mutasjoner, genregulering & etikk</span>
        </div>
      </div>
    </>
  );
}
