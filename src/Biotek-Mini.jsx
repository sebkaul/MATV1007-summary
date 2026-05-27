import { useState } from "react";

const ACCENT = "#3B82F6";
const BG = "#0F172A";
const CARD = "#1E293B";
const BORDER = "#334155";
const TEXT = "#F8FAFC";
const TEXT2 = "#94A3B8";

const sections = [
  {
    id: "terminologi",
    title: "1. Genetisk terminologi",
    time: "5 min",
    priority: "🔴 Alltid på eksamen (~6p)",
    content: [
      { term: "Fenotype", def: "Observerbar egenskap hos et individ (f.eks. øyenfarge, blodtype)" },
      { term: "Genotype", def: "Genetisk sammensetning i en celle/individ — selve DNA-sekvensen" },
      { term: "Genom", def: "En arts fullstendige arvemateriale — all genetisk informasjon" },
      { term: "Locus", def: "Område/sete på kromosomet hvor et bestemt gen er lokalisert" },
      { term: "Allel", def: "Alternative former av samme gen, plassert i samme locus på homologe kromosomer" },
      { term: "Polymorfisme", def: "Ulike former av samme basestruktur som forekommer med en viss hyppighet i populasjonen. Eks: blodtyper" },
    ],
    examTip: "V2025 oppg 16 (6p): Kombiner-oppgave der du matcher alle 6 begreper med definisjoner. Ren pugging — lær disse utenat."
  },
  {
    id: "southern",
    title: "2. Southern blotting",
    time: "10 min",
    priority: "🔴 Full skriftlig oppgave hvert år (~5-6p)",
    steps: [
      { step: "1. Restriksjonskutting", detail: "DNA kuttes med restriksjonsenzymer → fragmenter av ulik størrelse" },
      { step: "2. Gelelektroforese", detail: "Fragmentene separeres etter størrelse i agarosegel (små vandrer lengst)" },
      { step: "3. Denaturering", detail: "Gelen legges i denatureringsløsning → dsDNA → ssDNA (NaOH)" },
      { step: "4. Blotting", detail: "Overføring av DNA fra gel til nitrocellulosemembran vha kapillærkrefter. Buffer trekkes oppover gjennom gelen." },
      { step: "5. Immobilisering", detail: "Membranen \"bakes\" ved 80°C eller UV-lys → DNA festes permanent" },
      { step: "6. Prehybridisering", detail: "Membranen blokkeres med nøytralt DNA (laksesperm-DNA) for å hindre uspesifikk binding av prober → unngår falske positive" },
      { step: "7. Hybridisering", detail: "Merket probe (kort ssDNA/RNA) tilsettes → binder til komplementær sekvens på membranen" },
      { step: "8. Deteksjon", detail: "Visualisering vha fluorescens, biotin, radioaktivitet (autoradiografi)" },
    ],
    keyTerms: [
      { term: "Probe", def: "Kort ssDNA/RNA-bit merket med fluorescens/radioaktivitet. Binder komplementært til målsekvens." },
      { term: "Hybridisering", def: "Binding mellom komplementære basesekvenser (probe + prøve-DNA)" },
      { term: "Prehybridisering", def: "Blokkering av membran med nøytralt DNA FØR prober tilsettes. Hindrer uspesifikk binding → falske positive." },
      { term: "Stringens", def: "Vaskebetingelser som bestemmer hvor spesifikk hybridiseringen er (høy stringens = kun perfekt match)" },
    ],
    examTip: "V2025 oppg 14 (6p): \"Hvilke trinn inngår? Beskriv blottetrinnet. Forklar probe, hybridisering og prehybridisering.\" V2024 oppg 15 (5p): Forklar hybridisering og prehybridisering. V2023 oppg 17: MC om Southern blotting."
  },
  {
    id: "mutasjoner",
    title: "3. Mutasjoner",
    time: "10 min",
    priority: "🔴 Eksamen viser sekvenser → identifiser type (~6p)",
    types: [
      {
        type: "Samesense / Stille mutasjon",
        mechanism: "Substitusjon: én base byttes ut",
        result: "Ingen endring i aminosyre pga degenerert kode",
        example: "AAG → AAA: begge koder for Lysin (Lys)",
        protein: "Normalt, funksjonelt protein"
      },
      {
        type: "Missense mutasjon",
        mechanism: "Substitusjon: én base byttes ut",
        result: "Endrer aminosyre → annet protein",
        example: "AAG → AGG: Lysin → Arginin",
        protein: "Annet funksjonelt protein (kan være skadelig)"
      },
      {
        type: "Nonsense mutasjon",
        mechanism: "Substitusjon: én base byttes ut",
        result: "Skaper stoppkodon → trunkert protein",
        example: "AAG → UAG (stoppkodon). Stoppkodoner: UAG, UAA, UGA",
        protein: "Defekt / ikke-funksjonelt protein"
      },
      {
        type: "Rammeskift (frameshift)",
        mechanism: "Addisjon eller delesjon av 1-2 baser",
        result: "Endrer leserammen fra mutasjonspunktet og ut",
        example: "FAR SYR MOR → (slett F) → ARS YRM OR...",
        protein: "Totalt endret protein fra mutasjonspunktet"
      },
    ],
    extras: [
      "Transisjon: purin↔purin (A↔G) eller pyrimidin↔pyrimidin (C↔T)",
      "Transversjon: purin↔pyrimidin",
      "Spontane mutasjoner: oppstår naturlig under replikasjon",
      "Induserte mutasjoner: forårsaket av mutagener (kjemiske, fysiske, biologiske)",
      "Mutagener: baseanaloger (erstatter base), kjemikalier (modifiserer base), stråling (skader base)",
    ],
    examTip: "V2025 oppg 15 (6p): Fikk vist 3 sekvenser og skulle identifisere mutasjonstype + forklare konsekvens. V2024 oppg 14 (5p): Kombiner mutagen med funksjon/effekt."
  },
  {
    id: "gel",
    title: "4. Gelelektroforese",
    time: "5 min",
    priority: "🟡 MC + tolkning av gelbilde (~5p)",
    points: [
      "Separerer DNA-fragmenter etter størrelse i agarosegel",
      "DNA er negativt ladet (fosfatgrupper) → vandrer mot positiv pol (anode)",
      "Små fragmenter vandrer lengst/raskest",
      "Etidiumbromid interkalerer med DNA → fluorescerer under UV-lys",
      "Størrelsemarkør (DNA ladder) kjøres ved siden av for å estimere fragmentstørrelse",
      "Sterkere bånd = mer DNA i det fragmentet",
      "Brukes etter restriksjonskutting, PCR, eller som del av Southern blotting",
    ],
    examTip: "V2025 oppg 12 (2p): Identifiser resultat fra gelbilde. Oppg 13 (3p): Begrunn svaret — \"hvorfor vandrer fragment X lengre enn Y?\""
  },
  {
    id: "crispr",
    title: "5. CRISPR, restriksjonsenzymer & plasmider",
    time: "10 min",
    priority: "🟡 MC-favoritt (~3-4p)",
    subsections: [
      {
        subtitle: "Restriksjonsenzymer",
        points: [
          "Enzymer som gjenkjenner og kutter eksakte DNA-sekvenser (4-6 baser)",
          "Type II er viktigst: kutter innenfor gjenkjennelsessekvensen",
          "Palindromsekvenser: leses likt begge veier (5'→3')",
          "Klebrige ender (sticky ends): EcoRI — overhengende ender, lettere å lime",
          "Butte ender (blunt ends): EcoRV — kuttes rett av",
          "Isoschizomerer: ulike enzymer som gjenkjenner samme sekvens",
        ]
      },
      {
        subtitle: "Plasmider (vektorer)",
        points: [
          "Plasmid: lite, sirkulært DNA-molekyl i bakterier — TAR OPP FREMMED DNA og integrerer det",
          "Tre essensielle deler: ori (replikasjonsstart), seleksjonsmarkør (f.eks. antibiotikaresistens), multikloningssted (MCS)",
          "Brukes som vektorer for å føre fremmed DNA inn i vertscelle",
          "Transformasjon: prosessen der bakterie tar opp plasmid",
          "Blå/hvit-screening: lacZ-gen avbrytes ved innsetting → hvite kolonier = vellykket",
          "Andre vektorer: bakteriofag-vektorer, BAC (bacterial artificial chromosome), YAC (yeast AC)",
        ]
      },
      {
        subtitle: "CRISPR-Cas9",
        points: [
          "CRISPR-sekvenser: repeterende DNA-sekvenser med unik sekvens (spacer) imellom — det er et immunforsvar hos bakterier",
          "Guide-RNA (gRNA/crRNA): styrer Cas9 til riktig sted i genomet",
          "Cas9: endonuklease (\"molekylær saks\") som kutter begge DNA-tråder",
          "PAM-sekvens: kort sekvens som må være til stede ved siden av målsekvensen for at Cas9 skal binde",
          "Kan brukes til: slå av gen (knockout), rette mutasjoner, sette inn nye gener",
          "CRISPR ≠ cas-gen. CRISPR-sekvenser = repeterende DNA avbrutt av fremmed DNA",
        ]
      }
    ],
    examTip: "V2025 oppg 11 (3p MC): \"Hva er riktig om plasmider?\" (svar: tar opp fremmed DNA), \"Hva er CRISPR-sekvenser?\" (svar: repeterende DNA med unik sekvens imellom), \"Forskjell reproduktiv/terapeutisk kloning?\""
  },
  {
    id: "operon",
    title: "6. Lac-operonet & genregulering",
    time: "10 min",
    priority: "🔴 Skriftlig oppgave (~5-7p)",
    content: {
      whatIs: "Operon = gruppe gener plassert etter hverandre, kontrollert av samme kontrollmekanisme (operator + promotor). Gener i samme biokjemiske reaksjon uttrykkes samlet.",
      structuralGenes: [
        "LacZ: koder for β-galaktosidase (hydrolyserer laktose)",
        "LacY: koder for permease (transporterer laktose inn i cella)",
        "LacA: koder for transacetylase",
      ],
      regulatoryGenes: [
        "LacI (+Pi): koder for repressorproteinet",
        "LacP: promotorsekvens (~100 bp) — binder RNA-polymerase",
        "LacO: operatorsekvens (~45 bp) — repressor bindes her",
        "CAP-sete: mellom LacP og LacI — CAP-protein bindes her",
      ],
      states: [
        { state: "Uten laktose (AV)", desc: "Repressor (fra LacI) binder til operator → blokkerer RNA-polymerase → INGEN transkripsjon" },
        { state: "Med laktose (PÅ)", desc: "Laktose (inducer) binder til repressor → inaktiverer den → repressor slipper operator → RNA-polymerase kan transkribere → enzymer produseres" },
      ],
      keyPoints: [
        "Lac-operonet er et induserbart operon under negativ kontroll",
        "Negativ kontroll: repressor inhiberer transkripsjon",
        "Positiv kontroll: CAP-protein (aktivator) tilrettelegger for transkripsjon",
        "Inducer: molekyl som binder repressor og hindrer den i å binde operator",
        "Konstitutive enzymer: uttrykkes hele tiden (livsnødvendige)",
        "Induserbare enzymer: uttrykkes kun ved behov (f.eks. β-galaktosidase)",
        "Prokaryoter bruker operoner for energisparing — ikke alle gener skal være aktive hele tiden",
      ]
    },
    examTip: "V2023 oppg 20 (5p): \"Hva er konstitutive vs induserbare enzymer? Hva er et operon? Hvilke strukturgener i lac-operonet?\" V2024 oppg 17 (7p): Fyll-inn om operoner."
  },
  {
    id: "pcr",
    title: "7. PCR & DNA-fingerprinting",
    time: "5 min",
    priority: "🟡 MC + bakgrunnsteori (~4-5p)",
    pcr: {
      what: "Polymerase Chain Reaction — enzymatisk kopiering/amplifisering av spesifikke DNA-sekvenser. 25-40 sykluser.",
      steps: [
        { step: "1. Denaturering", temp: "94-96°C", detail: "dsDNA → ssDNA. H-bindinger brytes." },
        { step: "2. Primer annealing", temp: "37-70°C (typisk ~50°C)", detail: "Primere (korte ssDNA, 15-35 baser) binder til komplementær sekvens på templat" },
        { step: "3. Elongering/amplifisering", temp: "72°C", detail: "Taq-polymerase forlenger primerne → syntetiserer ny DNA-tråd. Trenger dNTP (dATP, dCTP, dGTP, dTTP i 1:1:1:1)" },
      ],
      taq: "Taq-polymerase: isolert fra Thermus aquaticus (termofil bakterie). Tåler høy temperatur → trenger ikke tilsettes på nytt etter denaturering. Kofaktor: Mg²⁺",
      variants: [
        "qPCR (real-time PCR): kvantifisering i sanntid med fluorescens",
        "RT-PCR: starter med RNA → cDNA (via revers transkriptase) → vanlig PCR",
      ],
      growth: "Eksponensiell vekst: 2ⁿ kopier etter n sykluser"
    },
    fingerprinting: {
      what: "Synliggjøre den genetiske signaturen til et individ. 99,9% av DNA er likt mellom mennesker — 0,1% er unikt.",
      methods: [
        "RFLP (gammel): restriksjonsfragment lengde polymorfisme — kutter med restriksjonsenzymer, sammenligner fragmentmønster",
        "STR (moderne): Short Tandem Repeats — korte repeterende sekvenser (2-5 nukleotider), svært variable mellom individer. 23 markørsekvenser brukes.",
        "SNP: Single Nucleotide Polymorphism — variasjon i én nukleotid ved eksakt posisjon i genomet",
      ],
      process: "Isoler DNA → PCR (kopier STR-områder) → elektroforese → sammenlign profiler"
    },
    examTip: "V2025 oppg 18 (4p): DNA-fingerprinting bakgrunnsteori. V2023 oppg 15-16: PCR prinsipp + RFLP/STR/SNP."
  },
  {
    id: "etikk",
    title: "8. Etikk & kloning",
    time: "5 min",
    priority: "🟢 Meningsoppgave (~3-4p)",
    points: [
      "Reproduktiv kloning: danne et nytt, genetisk identisk individ (eks. Dolly sauen)",
      "Terapeutisk kloning: danne stamceller for medisinsk behandling — IKKE et nytt individ",
      "GMO: Genmodifiserte organismer — fordeler (økt matproduksjon, medisin) vs ulemper (økologisk risiko, etisk)",
      "Bioteknologiens farger: Hvit (industri), Grønn (landbruk), Rød (medisin), Blå (marin)",
      "For å få poeng: du MÅ argumentere for ditt standpunkt med begrunnelse. Ingen fasit — men meninger må begrunnes.",
    ],
    examTip: "V2025 oppg 17 (3p): Etikk om kloning. V2024 oppg 13 (4p): \"Hva tenker du om å benytte CRISPR for endringer i menneskelig DNA?\" Argumenter!"
  }
];

export default function BiotekCrashCourse() {
  const [activeSection, setActiveSection] = useState(null);
  const [visited, setVisited] = useState(new Set());
  const [showSteps, setShowSteps] = useState({});

  const toggleSection = (id) => {
    setActiveSection(activeSection === id ? null : id);
    setVisited(prev => new Set([...prev, id]));
  };

  const toggleStep = (key) => {
    setShowSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div style={{ background: BG, minHeight: "100vh", color: TEXT, fontFamily: "'Source Sans 3', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Source+Sans+3:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .pill { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 13px; font-weight: 600; margin: 3px; }
        .term-row { display: flex; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid ${BORDER}; align-items: flex-start; gap: 16px; }
        .term-name { font-weight: 700; color: ${ACCENT}; min-width: 140px; font-family: 'JetBrains Mono', monospace; font-size: 14px; }
        .term-def { color: ${TEXT}; font-size: 14px; flex: 1; }
        .step-btn { cursor: pointer; padding: 10px 16px; border-bottom: 1px solid ${BORDER}; display: flex; justify-content: space-between; align-items: center; transition: background 0.2s; }
        .step-btn:hover { background: rgba(59,130,246,0.08); }
        .step-detail { padding: 8px 16px 16px 32px; color: ${TEXT2}; font-size: 14px; border-bottom: 1px solid ${BORDER}; background: rgba(0,0,0,0.2); }
        .section-card { background: ${CARD}; border: 1px solid ${BORDER}; border-radius: 12px; margin-bottom: 12px; overflow: hidden; transition: all 0.2s; }
        .section-header { padding: 16px 20px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .section-header:hover { background: rgba(59,130,246,0.05); }
        .section-body { padding: 0 20px 20px 20px; }
        .exam-tip { background: rgba(59,130,246,0.1); border-left: 3px solid ${ACCENT}; padding: 12px 16px; border-radius: 0 8px 8px 0; margin-top: 16px; font-size: 13px; color: ${TEXT2}; }
        .subsection { margin-top: 16px; }
        .subsection h4 { color: ${ACCENT}; font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; margin-bottom: 8px; padding-bottom: 6px; border-bottom: 1px solid ${BORDER}; }
        .point { padding: 6px 0; font-size: 14px; color: ${TEXT}; padding-left: 12px; border-left: 2px solid ${BORDER}; margin-bottom: 4px; }
        .state-box { background: rgba(0,0,0,0.3); border-radius: 8px; padding: 12px 16px; margin: 6px 0; }
        .state-title { font-weight: 700; color: ${ACCENT}; font-size: 14px; margin-bottom: 4px; }
        .mutation-card { background: rgba(0,0,0,0.3); border-radius: 8px; padding: 14px 16px; margin: 8px 0; border-left: 3px solid ${ACCENT}; }
        .mutation-type { font-weight: 700; color: ${ACCENT}; font-size: 15px; font-family: 'Plus Jakarta Sans', sans-serif; }
        .mutation-row { font-size: 13px; color: ${TEXT2}; margin-top: 4px; }
        .mutation-row span { color: ${TEXT}; font-weight: 600; }
        .progress-bar { height: 4px; background: ${BORDER}; border-radius: 2px; overflow: hidden; }
        .progress-fill { height: 100%; background: ${ACCENT}; transition: width 0.3s; border-radius: 2px; }
      `}</style>

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "24px 16px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 13, color: ACCENT, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Emne 6 — Bioteknologi
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 32, fontWeight: 800, marginTop: 8, color: TEXT }}>
            1-Times Crash Course
          </h1>
          <p style={{ color: TEXT2, fontSize: 15, marginTop: 8 }}>
            ~33-39% av eksamen. 8 emner sortert etter prioritet. Klikk for å utvide.
          </p>
          <div style={{ marginTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: TEXT2, marginBottom: 4 }}>
              <span>{visited.size} / {sections.length} gjennomgått</span>
              <span>{Math.round((visited.size / sections.length) * 100)}%</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(visited.size / sections.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Sections */}
        {sections.map((s) => (
          <div key={s.id} className="section-card" style={visited.has(s.id) ? { borderColor: `${ACCENT}33` } : {}}>
            <div className="section-header" onClick={() => toggleSection(s.id)}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 17, fontWeight: 700, color: TEXT }}>
                  {visited.has(s.id) && <span style={{ color: ACCENT, marginRight: 8 }}>✓</span>}
                  {s.title}
                </div>
                <div style={{ fontSize: 13, color: TEXT2, marginTop: 4 }}>
                  <span className="pill" style={{ background: `${ACCENT}22`, color: ACCENT }}>{s.time}</span>
                  <span style={{ marginLeft: 8 }}>{s.priority}</span>
                </div>
              </div>
              <span style={{ color: TEXT2, fontSize: 20, transition: "transform 0.2s", transform: activeSection === s.id ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
            </div>

            {activeSection === s.id && (
              <div className="section-body">
                {/* Terminologi */}
                {s.content && Array.isArray(s.content) && (
                  <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${BORDER}` }}>
                    {s.content.map((t, i) => (
                      <div key={i} className="term-row">
                        <div className="term-name">{t.term}</div>
                        <div className="term-def">{t.def}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Southern blotting steps */}
                {s.steps && (
                  <>
                    <h4 style={{ color: ACCENT, fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 15, marginBottom: 8 }}>Trinnene (lær rekkefølgen!):</h4>
                    <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${BORDER}` }}>
                      {s.steps.map((st, i) => (
                        <div key={i}>
                          <div className="step-btn" onClick={() => toggleStep(`s-${i}`)}>
                            <span style={{ fontWeight: 600, color: TEXT, fontFamily: "'JetBrains Mono', monospace", fontSize: 14 }}>{st.step}</span>
                            <span style={{ color: TEXT2 }}>{showSteps[`s-${i}`] ? "−" : "+"}</span>
                          </div>
                          {showSteps[`s-${i}`] && <div className="step-detail">{st.detail}</div>}
                        </div>
                      ))}
                    </div>
                    {s.keyTerms && (
                      <div className="subsection">
                        <h4>Nøkkelbegreper:</h4>
                        <div style={{ borderRadius: 8, overflow: "hidden", border: `1px solid ${BORDER}` }}>
                          {s.keyTerms.map((t, i) => (
                            <div key={i} className="term-row">
                              <div className="term-name">{t.term}</div>
                              <div className="term-def">{t.def}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}

                {/* Mutasjoner */}
                {s.types && (
                  <>
                    {s.types.map((m, i) => (
                      <div key={i} className="mutation-card">
                        <div className="mutation-type">{m.type}</div>
                        <div className="mutation-row"><span>Mekanisme: </span>{m.mechanism}</div>
                        <div className="mutation-row"><span>Resultat: </span>{m.result}</div>
                        <div className="mutation-row" style={{ fontFamily: "'JetBrains Mono', monospace" }}><span>Eksempel: </span>{m.example}</div>
                        <div className="mutation-row"><span>Protein: </span>{m.protein}</div>
                      </div>
                    ))}
                    {s.extras && (
                      <div className="subsection">
                        <h4>Også viktig:</h4>
                        {s.extras.map((e, i) => <div key={i} className="point">{e}</div>)}
                      </div>
                    )}
                  </>
                )}

                {/* Gelelektroforese points */}
                {s.points && !s.subsections && (
                  <div>
                    {s.points.map((p, i) => <div key={i} className="point">{p}</div>)}
                  </div>
                )}

                {/* CRISPR subsections */}
                {s.subsections && (
                  <>
                    {s.subsections.map((sub, i) => (
                      <div key={i} className="subsection">
                        <h4>{sub.subtitle}</h4>
                        {sub.points.map((p, j) => <div key={j} className="point">{p}</div>)}
                      </div>
                    ))}
                  </>
                )}

                {/* Lac operon */}
                {s.content && s.content.whatIs && (
                  <>
                    <div className="point" style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>{s.content.whatIs}</div>
                    <div className="subsection">
                      <h4>Strukturelle gener:</h4>
                      {s.content.structuralGenes.map((g, i) => <div key={i} className="point">{g}</div>)}
                    </div>
                    <div className="subsection">
                      <h4>Regulerende gener:</h4>
                      {s.content.regulatoryGenes.map((g, i) => <div key={i} className="point">{g}</div>)}
                    </div>
                    <div className="subsection">
                      <h4>To tilstander:</h4>
                      {s.content.states.map((st, i) => (
                        <div key={i} className="state-box">
                          <div className="state-title">{st.state}</div>
                          <div style={{ fontSize: 14, color: TEXT }}>{st.desc}</div>
                        </div>
                      ))}
                    </div>
                    <div className="subsection">
                      <h4>Nøkkelpunkter:</h4>
                      {s.content.keyPoints.map((p, i) => <div key={i} className="point">{p}</div>)}
                    </div>
                  </>
                )}

                {/* PCR */}
                {s.pcr && (
                  <>
                    <div className="point" style={{ fontSize: 15, fontWeight: 600, marginBottom: 12 }}>{s.pcr.what}</div>
                    <div className="subsection">
                      <h4>3 trinn (temperaturprofil):</h4>
                      {s.pcr.steps.map((st, i) => (
                        <div key={i} className="state-box">
                          <div className="state-title">{st.step} — {st.temp}</div>
                          <div style={{ fontSize: 14, color: TEXT }}>{st.detail}</div>
                        </div>
                      ))}
                    </div>
                    <div className="point" style={{ marginTop: 8 }}><span style={{ color: ACCENT, fontWeight: 700 }}>Taq: </span>{s.pcr.taq}</div>
                    <div className="point"><span style={{ color: ACCENT, fontWeight: 700 }}>Vekst: </span>{s.pcr.growth}</div>
                    <div className="subsection">
                      <h4>Varianter:</h4>
                      {s.pcr.variants.map((v, i) => <div key={i} className="point">{v}</div>)}
                    </div>
                    <div className="subsection">
                      <h4>DNA-fingerprinting:</h4>
                      <div className="point" style={{ fontWeight: 600 }}>{s.fingerprinting.what}</div>
                      {s.fingerprinting.methods.map((m, i) => <div key={i} className="point">{m}</div>)}
                      <div className="point" style={{ marginTop: 8 }}><span style={{ color: ACCENT, fontWeight: 700 }}>Prosess: </span>{s.fingerprinting.process}</div>
                    </div>
                  </>
                )}

                {/* Exam tip */}
                {s.examTip && (
                  <div className="exam-tip">
                    <span style={{ fontWeight: 700, color: ACCENT }}>📝 Eksamensrelevans: </span>
                    {s.examTip}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Footer */}
        <div style={{ textAlign: "center", padding: "24px 0", color: TEXT2, fontSize: 13 }}>
          Prioriter 🔴 først. Lykke til! 💪
        </div>
      </div>
    </div>
  );
}
