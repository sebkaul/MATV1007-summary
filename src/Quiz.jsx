import { useState, useEffect, useRef } from "react";

const EMNER = [
  { id: 1, name: "Introduksjon", color: "#06B6D4", full: "Introduksjon til mikrobiologi" },
  { id: 2, name: "Cellebiologi", color: "#10B981", full: "Cellebiologi" },
  { id: 3, name: "Bakteriell vekst", color: "#F59E0B", full: "Bakteriell vekst" },
  { id: 4, name: "Virus", color: "#EF4444", full: "Virus" },
  { id: 5, name: "Taksonomi & kretsløp", color: "#8B5CF6", full: "Taksonomi, diversitet og kretsløp" },
  { id: 6, name: "Bioteknologi", color: "#3B82F6", full: "Bioteknologi" },
];

const allQuestions = [
  // ========== EMNE 1: INTRODUKSJON (12 Qs) ==========
  {
    id: "1-1", emne: 1, type: "mc",
    q: "Louis Pasteur motbeviste teorien om spontan generasjon ved å bruke et spesielt eksperiment. Hva var det sentrale prinsippet i dette eksperimentet?",
    options: [
      "Han viste at mikroorganismer kun vokser i væsker som har vært eksponert for luft med støv/mikroorganismer",
      "Han viste at mikroorganismer oppstår spontant i sterilisert væske etter lengre tid",
      "Han beviste at alle mikroorganismer stammer fra jord",
      "Han viste at koking alene er tilstrekkelig for permanent sterilisering"
    ],
    correct: 0,
    explanation: "Pasteur brukte svanehalsflaske der sterilisert væske forble steril så lenge støv og mikroorganismer ble fanget i den bøyde halsen. Når væsken kom i kontakt med støvet, oppstod vekst — dette motbeviste spontan generasjon."
  },
  {
    id: "1-2", emne: 1, type: "mc",
    q: "Hvilket av følgende er IKKE et av Kochs postulater?",
    options: [
      "Den mistenkte patogene organismen må være til stede i alle tilfeller av sykdommen og fraværende hos friske individer",
      "Organismen må kunne dyrkes i renkultur",
      "Organismen må kunne overføres mellom verter via aerosol",
      "Organismen må kunne reisoleres fra det eksperimentelt infiserte dyret og vises å være identisk med den opprinnelige"
    ],
    correct: 2,
    explanation: "Kochs postulater krever: (1) organismen er til stede ved sykdom og fraværende hos friske, (2) kan dyrkes i renkultur, (3) celler fra renkultur forårsaker sykdom i friskt dyr, (4) kan reisoleres og vises å være identisk. Aerosoloverføring er ikke et krav."
  },
  {
    id: "1-3", emne: 1, type: "mc",
    q: "Carl Woese sin analyse av 16S rRNA førte til en ny inndeling av livet. Hvilke tre domener ble etablert?",
    options: [
      "Bacteria, Archaea og Eukarya",
      "Prokaryota, Eukaryota og Virus",
      "Monera, Protista og Plantae",
      "Bacteria, Fungi og Animalia"
    ],
    correct: 0,
    explanation: "Woese oppdaget at ved å studere 16S rRNA-gensekvenser kunne man dele livet inn i tre domener: Bacteria, Archaea og Eukarya. Archaea var tidligere gruppert med bakterier, men viste seg å være en distinkt evolusjonær linje."
  },
  {
    id: "1-4", emne: 1, type: "mc",
    q: "Hva er den typiske størrelsen på en prokaryot celle?",
    options: [
      "0,5–10 µm",
      "5–100 µm",
      "50–500 µm",
      "0,01–0,1 µm"
    ],
    correct: 0,
    explanation: "Prokaryote celler er typisk 0,5–10 µm, mens eukaryote celler er 5–100 µm. Virus er enda mindre. Små celler har høyere overflate/volum-ratio som gir mer effektivt næringsopptak."
  },
  {
    id: "1-5", emne: 1, type: "mc",
    q: "Hva var Aleksander Flemings viktigste bidrag til mikrobiologien?",
    options: [
      "Oppdagelsen av penicillin i 1928",
      "Oppdagelsen av endosporer",
      "Utviklingen av anrikningskulturer",
      "Oppdagelsen av kjemolitotrofe bakterier"
    ],
    correct: 0,
    explanation: "Aleksander Fleming oppdaget penicillin i 1928. Ferdinand Cohn oppdaget endosporer, Martinus Beijerinck utviklet anrikningskulturer, og Sergei Winogradsky oppdaget kjemolitotrofe bakterier."
  },
  {
    id: "1-6", emne: 1, type: "tf",
    q: "Teorien om spontan generasjon hevdet at levende organismer kan oppstå fra ikke-levende materie.",
    correct: true,
    explanation: "Spontan generasjon var ideen om at liv kunne oppstå fra ikke-levende materie. Pasteur motbeviste dette med sine svanehalsflaskeeksperimenter i 1861."
  },
  {
    id: "1-7", emne: 1, type: "tf",
    q: "Prokaryote celler har en cellekjerne med kjernemembran.",
    correct: false,
    explanation: "Prokaryote celler mangler en definert cellekjerne med kjernemembran. Deres DNA finnes fritt i cytoplasma (nukleoiden). Eukaryote celler har cellekjerne med kjernemembran."
  },
  {
    id: "1-8", emne: 1, type: "tf",
    q: "Archaea og Bacteria er begge prokaryote organismer, men tilhører ulike domener.",
    correct: true,
    explanation: "Archaea og Bacteria er begge prokaryote (mangler cellekjerne), men Woese sin 16S rRNA-analyse viste at de representerer to distinkte evolusjonære linjer og tilhører hvert sitt domene."
  },
  {
    id: "1-9", emne: 1, type: "tf",
    q: "Prokaryote celler har flere lineære kromosomer, mens eukaryote celler har ett sirkulært kromosom.",
    correct: false,
    explanation: "Det er omvendt: Prokaryote celler har typisk ett sirkulært kromosom (pluss eventuelt plasmider), mens eukaryote celler har flere lineære kromosomer."
  },
  {
    id: "1-10", emne: 1, type: "short",
    q: "Nevn tre egenskaper som er felles for ALLE celler (prokaryote og eukaryote).",
    correct: "metabolisme, vekst, evolusjon",
    explanation: "Alle celler har tre grunnleggende egenskaper: metabolisme (oppbygging og nedbrytning), vekst (formering), og evolusjon. Andre egenskaper som differensiering, kommunikasjon og bevegelse finnes kun hos enkelte celler."
  },
  {
    id: "1-11", emne: 1, type: "short",
    q: "Hva kalles den genetiske metoden som Woese brukte for å konstruere «livets tre»? Hvilket molekyl analyserte han?",
    correct: "16S rRNA",
    explanation: "Woese brukte sekvenseringsanalyse av 16S ribosomalt RNA (rRNA) gensekvenser. Dette molekylet er konservert hos alle prokaryoter, men med nok variasjon til å vise evolusjonære slektskap."
  },
  {
    id: "1-12", emne: 1, type: "short",
    q: "Koble riktig forsker med sin oppdagelse: (a) Ferdinand Cohn, (b) Martinus Beijerinck, (c) Sergei Winogradsky. Oppdagelser: nitrogenfiksering, endosporer, anrikningskulturer/virologi.",
    correct: "(a) endosporer, (b) anrikningskulturer/virologi, (c) nitrogenfiksering",
    explanation: "Ferdinand Cohn oppdaget endosporer fra Bacillus, Martinus Beijerinck utviklet anrikningskulturer og grunnla virologi, og Sergei Winogradsky oppdaget kjemolitotrofe bakterier og nitrogenfiksering."
  },

  // ========== EMNE 2: CELLEBIOLOGI (12 Qs) ==========
  {
    id: "2-1", emne: 2, type: "mc",
    q: "I Gram-farging, hva er funksjonen til alkoholvask (dekoloreringstrinn)?",
    options: [
      "Fjerner krystallfiolett fra Gram-negative bakterier som har tynnere peptidoglykanlag",
      "Fikserer krystallfiolett i alle bakteriecellevegger",
      "Tilsetter en motfarging til alle celler",
      "Dreper bakteriene slik at de kan observeres trygt"
    ],
    correct: 0,
    explanation: "Alkoholvasken (dekoleringen) fjerner krystallfiolett-jod-komplekset fra Gram-negative bakterier fordi deres tynne peptidoglykanlag (1-2 lag) ikke kan holde på fargen. Gram-positive celler med tykt peptidoglykanlag (mange lag) beholder den lilla fargen."
  },
  {
    id: "2-2", emne: 2, type: "mc",
    q: "Hvilken transportmekanisme krever energi i form av ATP for å transportere næringsstoffer over cellemembranen?",
    options: [
      "Enkel diffusjon",
      "Fasilitert diffusjon",
      "ABC-transporter",
      "Osmose"
    ],
    correct: 2,
    explanation: "ABC-transportere (ATP-Binding Cassette) bruker ATP direkte for å transportere substanser over membranen. Gruppetranslokasjon bruker fosforylerte forbindelser (PEP), mens enkel og fasilitert diffusjon er passive prosesser."
  },
  {
    id: "2-3", emne: 2, type: "mc",
    q: "Hvilken komponent av celleveggen er unik for Gram-negative bakterier?",
    options: [
      "Peptidoglykan",
      "Lipopolysakkarid (LPS) i ytre membran",
      "Teikosyre",
      "S-lag"
    ],
    correct: 1,
    explanation: "LPS (lipopolysakkarid) finnes i ytremembranen som er unik for Gram-negative bakterier. Teikosyre er derimot unik for Gram-positive. Peptidoglykan finnes hos begge (men tykkere lag hos Gram-positive), og S-lag kan finnes hos begge."
  },
  {
    id: "2-4", emne: 2, type: "mc",
    q: "Hvilken bakterieslekt er kjent for å danne endosporer?",
    options: [
      "Lactobacillus",
      "Clostridium",
      "Streptococcus",
      "Mycoplasma"
    ],
    correct: 1,
    explanation: "Clostridium (og Bacillus) er bakterieslekter som danner endosporer. Endosporer er ekstremt resistente hvilende strukturer som tåler varme, tørke, stråling og kjemikalier."
  },
  {
    id: "2-5", emne: 2, type: "mc",
    q: "Hvilken cellestruktur kan brukes til å overføre arvestoff mellom bakterier?",
    options: [
      "Flagell",
      "Pili (konjugasjonspili)",
      "Fimbrier",
      "Kapsel"
    ],
    correct: 1,
    explanation: "Pili (spesielt konjugasjonspili/sexpili) brukes til overføring av DNA mellom bakterier ved konjugasjon. Flageller er for bevegelse, fimbrier for feste/adhesjon, og kapsel for beskyttelse."
  },
  {
    id: "2-6", emne: 2, type: "tf",
    q: "Gram-positive bakterier har et tykt peptidoglykanlag og mangler ytre membran.",
    correct: true,
    explanation: "Gram-positive bakterier kjennetegnes av et tykt peptidoglykanlag (opptil 90% av celleveggen) og fravær av ytre membran. De har også teikosyrer bundet til peptidoglykanlaget."
  },
  {
    id: "2-7", emne: 2, type: "tf",
    q: "Kolesterol finnes i cellemembranen hos både prokaryote og eukaryote celler.",
    correct: false,
    explanation: "Kolesterol finnes kun i eukaryote cellemembraner, hvor det regulerer membranfluiditet. Noen prokaryoter har hopanoider som har lignende funksjon, men ikke kolesterol."
  },
  {
    id: "2-8", emne: 2, type: "tf",
    q: "Kjemotaksis er bakteriers evne til å bevege seg mot eller bort fra kjemiske stoffer i miljøet.",
    correct: true,
    explanation: "Kjemotaksis er rettet bevegelse som respons på kjemiske gradienter. Positiv kjemotaksis = bevegelse mot attraktant, negativ kjemotaksis = bevegelse bort fra repellent. Flageller driver bevegelsen."
  },
  {
    id: "2-9", emne: 2, type: "tf",
    q: "Under sporulering danner alle bakteriearter endosporer som respons på ugunstige miljøforhold.",
    correct: false,
    explanation: "Bare noen få bakterieslekter danner endosporer, hovedsakelig Bacillus (aerob) og Clostridium (anaerob). De fleste bakterier kan IKKE danne endosporer."
  },
  {
    id: "2-10", emne: 2, type: "short",
    q: "Hva er forskjellen mellom transmisjonselektronmikroskop (TEM) og sveipeelektronmikroskop (SEM) med hensyn til hva de viser?",
    correct: "TEM viser indre strukturer, SEM viser overflatestrukturer",
    explanation: "TEM sender elektroner GJENNOM et tynt snitt av prøven og viser indre cellestrukturer (2D-bilde). SEM skanner OVERFLATEN med elektroner og gir et tredimensjonalt bilde av cellens ytre morfologi."
  },
  {
    id: "2-11", emne: 2, type: "short",
    q: "Hva foregår i endoplasmatisk retikulum (ER), og hva er forskjellen mellom glatt og granulert (ru) ER?",
    correct: "Granulert ER har ribosomer og driver proteinsyntese, glatt ER driver lipidsyntese",
    explanation: "Granulert (ru) ER har ribosomer festet til overflaten og er involvert i proteinsyntese og -modifisering. Glatt ER mangler ribosomer og er involvert i lipidsyntese og andre metabolske prosesser."
  },
  {
    id: "2-12", emne: 2, type: "short",
    q: "Forklar forskjellen mellom diploide og haploide celler.",
    correct: "Diploide har dobbelt kromosomssett (2n), haploide har enkelt (n)",
    explanation: "Diploide celler (2n) har to sett kromosomer — ett fra hver forelder (somatiske celler). Haploide celler (n) har kun ett sett kromosomer (kjønnsceller/gameter). Ved befruktning smelter to haploide celler sammen og danner en diploid celle."
  },

  // ========== EMNE 3: BAKTERIELL VEKST (12 Qs) ==========
  {
    id: "3-1", emne: 3, type: "mc",
    q: "En organisme som bruker lys som energikilde og CO₂ som karbonkilde er klassifisert som:",
    options: [
      "Kjemoorganotrof",
      "Kjemolitoautotrof",
      "Fotoautotrof",
      "Fotoheterotrof"
    ],
    correct: 2,
    explanation: "Fotoautotrof: foto = lys (energikilde), auto = CO₂ (karbonkilde). Eksempler: cyanobakterier og planter. Kjemoorganotrofe bruker organiske forbindelser som både energi- og karbonkilde."
  },
  {
    id: "3-2", emne: 3, type: "mc",
    q: "EMB-agar (Eosin Methylene Blue) er et eksempel på et medium som er både selektivt og differensielt. Hva betyr dette?",
    options: [
      "Det hemmer vekst av visse organismer (selektivt) og skiller mellom kolonityper visuelt (differensielt)",
      "Det inneholder bare definerte kjemiske forbindelser",
      "Det lar alle organismer vokse like godt",
      "Det brukes kun til å telle totalantall bakterier"
    ],
    correct: 0,
    explanation: "Et selektivt medium inneholder ingredienser som hemmer vekst av uønskede organismer. Et differensielt medium gjør det mulig å visuelt skille mellom ulike typer organismer basert på koloniers utseende (f.eks. farge, sone)."
  },
  {
    id: "3-3", emne: 3, type: "mc",
    q: "I en typisk bakteriell vekstkurve (batchkultur), i hvilken fase skjer celledeling med konstant maksimal hastighet?",
    options: [
      "Lag-fasen",
      "Eksponentiell (log) fase",
      "Stasjonær fase",
      "Dødsfase"
    ],
    correct: 1,
    explanation: "I den eksponentielle (logaritmiske) fasen dobles populasjonen med et konstant tidsintervall (generasjonstid). Lag-fasen er tilpasning, stasjonær fase har balansert vekst/død, og i dødsfasen overstiger dødsraten vekstraten."
  },
  {
    id: "3-4", emne: 3, type: "mc",
    q: "Hvilken oksygenklasse beskriver en organisme som kan vokse i nærvær av O₂, men ikke bruker det til metabolisme og ikke har katalase?",
    options: [
      "Obligat aerob",
      "Fakultativ anaerob",
      "Aerotolerant anaerob",
      "Obligat anaerob"
    ],
    correct: 2,
    explanation: "Aerotolerante anaerobe tåler oksygen men bruker det ikke metabolsk — de lever av fermentering. De mangler typisk katalase og oksidase. Eksempel: Lactobacillus."
  },
  {
    id: "3-5", emne: 3, type: "mc",
    q: "Hva er MIC (Minimal Inhibitory Concentration)?",
    options: [
      "Den laveste konsentrasjonen av et antimikrobielt stoff som dreper 100% av cellene",
      "Den laveste konsentrasjonen av et antimikrobielt stoff som hemmer synlig vekst",
      "Den høyeste konsentrasjonen som ikke påvirker veksten",
      "Den konsentrasjonen som reduserer celletallet med 90%"
    ],
    correct: 1,
    explanation: "MIC er den laveste konsentrasjonen av et antimikrobielt middel som hemmer synlig vekst av en mikroorganisme. MBC (Minimal Bactericidal Concentration) er konsentrasjonen som dreper 99,9% av cellene."
  },
  {
    id: "3-6", emne: 3, type: "tf",
    q: "Turbidimetri (OD-måling) skiller mellom levende og døde celler i en bakteriekultur.",
    correct: false,
    explanation: "Turbidimetri måler lysspredning/absorbans og registrerer ALLE celler (levende og døde). For å telle kun levende celler brukes levedyktighetsmetoder som platespredning eller innstøpning (kde/mL)."
  },
  {
    id: "3-7", emne: 3, type: "tf",
    q: "Desimal reduksjonstid (D-verdi) er avhengig av størrelsen på den mikrobielle populasjonen.",
    correct: false,
    explanation: "D-verdien er IKKE avhengig av populasjonsstørrelse. D er tiden det tar ved en gitt temperatur å oppnå 90% (1 log) reduksjon. Den avhenger av organismens egenskaper og temperaturen, ikke antall celler."
  },
  {
    id: "3-8", emne: 3, type: "tf",
    q: "En kjemostat er et lukket system for dyrking av bakterier.",
    correct: false,
    explanation: "En kjemostat er et ÅPENT system for kontinuerlig kultur. Sterilt medium tilføres med konstant hastighet mens gammelt medium (med celler) tappes ut med samme hastighet, slik at kulturen holdes i steady state."
  },
  {
    id: "3-9", emne: 3, type: "short",
    q: "Beregn generasjonstiden: En bakteriekultur økte fra 5,0 × 10⁴ celler/mL til 3,2 × 10⁶ celler/mL i løpet av 3 timer. Bruk formelen N = N₀ · 2ⁿ og g = t/n. Oppgi svar i minutter.",
    correct: "30 minutter",
    explanation: "n = (log Nₜ − log N₀) / log 2 = (log(3,2×10⁶) − log(5,0×10⁴)) / 0,301 = (6,505 − 4,699) / 0,301 = 1,806 / 0,301 ≈ 6,0 generasjoner. g = t/n = 3 timer / 6 = 0,5 timer = 30 minutter."
  },
  {
    id: "3-10", emne: 3, type: "short",
    q: "En bakteriekultur starter med 1,0 × 10³ celler/mL og har en generasjonstid på 20 minutter. Hvor mange celler/mL er det etter 2 timer? (N = N₀ · 2ⁿ)",
    correct: "6,4 × 10⁴",
    explanation: "Antall generasjoner: n = t/g = 120 min / 20 min = 6. N = N₀ · 2ⁿ = 1,0 × 10³ · 2⁶ = 1,0 × 10³ · 64 = 6,4 × 10⁴ celler/mL."
  },
  {
    id: "3-11", emne: 3, type: "short",
    q: "Hva er forskjellen mellom et definert og et udefinert (komplekst) kulturmedium?",
    correct: "definert har kjent sammensetning, udefinert har ukjent/variabel",
    explanation: "Et definert medium har nøyaktig kjent kjemisk sammensetning der alle ingrediensene er kjent. Et udefinert (komplekst) medium inneholder ingredienser med ukjent eksakt sammensetning, som gjærekstrakt eller pepton."
  },
  {
    id: "3-12", emne: 3, type: "short",
    q: "Nevn én viktig feilkilde ved innstøpningsmetoden for telling av bakterier.",
    correct: "for varm agar kan drepe varmefølsomme bakterier",
    explanation: "En viktig feilkilde er at agaren kan være for varm (45–50 °C) når den blandes med bakterieprøven, noe som kan drepe varmefølsomme bakterier og gi for lave celletall."
  },

  // ========== EMNE 4: VIRUS (12 Qs) ==========
  {
    id: "4-1", emne: 4, type: "mc",
    q: "Et virus som dreper vertscellen sin under replikasjon kalles:",
    options: [
      "Temperat",
      "Lysogent",
      "Lytisk",
      "Latent"
    ],
    correct: 2,
    explanation: "Et lytisk virus gjennomfører en lytisk syklus der vertscellen ødelegges (lyseres) ved frigjøring av nye viruspartikler. Temperate virus kan velge mellom lytisk og lysogen syklus."
  },
  {
    id: "4-2", emne: 4, type: "mc",
    q: "Hva er forskjellen i den innledende fasen av virusinfeksjon mellom E. coli (bakteriecelle) og en dyrecelle?",
    options: [
      "Hele viruset tas opp i E. coli, mens kun arvestoff tas opp av dyrecellen",
      "Hele viruset tas opp i dyrecellen, mens kun virusets arvestoff injiseres i E. coli",
      "Begge tar opp hele viruset ved endocytose",
      "Begge tar kun opp virusets arvestoff"
    ],
    correct: 1,
    explanation: "Ved infeksjon av bakterier (E. coli) injiserer bakteriofagen kun sitt arvestoff, mens kapsidet blir igjen på utsiden. Ved infeksjon av dyreceller tas hele virionet opp (ved endocytose, membranfusjon eller andre mekanismer)."
  },
  {
    id: "4-3", emne: 4, type: "mc",
    q: "En profag replikeres:",
    options: [
      "Uavhengig av vertscellen mens lytiske gener uttrykkes",
      "Sammen med vertscellen mens lytiske gener ikke uttrykkes",
      "Uavhengig av vertscellen mens lytiske gener ikke uttrykkes",
      "Sammen med vertscellen samtidig som lytiske gener uttrykkes"
    ],
    correct: 1,
    explanation: "En profag er virus-DNA integrert i bakteriekromosomet. Det replikeres passivt sammen med vertscellens DNA under celledeling. De lytiske genene er undertrykt (ikke uttrykt) så lenge lysogeni opprettholdes."
  },
  {
    id: "4-4", emne: 4, type: "mc",
    q: "Kappekledde virus frigjøres typisk fra vertscellen ved:",
    options: [
      "Lysis av cellemembranen",
      "Budding gjennom cellemembranen",
      "Injeksjon ut av cellen",
      "Eksocytose av nakne kapsider"
    ],
    correct: 1,
    explanation: "Kappekledde virus (f.eks. influensa, Ebola) frigjøres ved budding, der de tar med seg deler av vertscellens membran som danner virushylsteret. Ikke-kappekledde virus frigjøres typisk ved lysis."
  },
  {
    id: "4-5", emne: 4, type: "mc",
    q: "Baltimore-klassifiseringen av virus er basert på:",
    options: [
      "Vertscellens type (bakterie, dyre, plante)",
      "Virionets form og størrelse",
      "Type nukleinsyre og replikasjonsmetode (DNA/RNA, ss/ds, +/- sense)",
      "Geografisk opprinnelse og spredningsmekanisme"
    ],
    correct: 2,
    explanation: "Baltimore-klassifiseringen deler virus inn i 7 grupper basert på type nukleinsyre (DNA/RNA), nukleinsyretråd-type (enkelt-/dobbeltrådet), sens (+/-), og replikasjonsmekanisme."
  },
  {
    id: "4-6", emne: 4, type: "tf",
    q: "Virus regnes som levende organismer fordi de inneholder genetisk materiale.",
    correct: false,
    explanation: "Virus regnes IKKE som levende fordi de mangler egen metabolisme, kan ikke formere seg uten en vertscelle, og er obligat intracellulære parasitter. De inneholder genetisk materiale (DNA eller RNA), men dette alene gjør dem ikke levende."
  },
  {
    id: "4-7", emne: 4, type: "tf",
    q: "Prioner er infeksiøse proteiner som mangler nukleinsyre (DNA/RNA) og forårsaker sykdom ved å omdanne normal PrPᶜ til feilfoldede PrPˢᶜ.",
    correct: true,
    explanation: "Prioner er feilfoldede proteiner (PrPˢᶜ) som kan konvertere normalt PrPᶜ til den patogene formen. De inneholder ingen nukleinsyre og forårsaker sykdommer som kugalskap (BSE) og Creutzfeldt-Jakobs sykdom."
  },
  {
    id: "4-8", emne: 4, type: "tf",
    q: "Viroider er små, sirkulære RNA-molekyler uten proteinkapsid som kan infisere planter.",
    correct: true,
    explanation: "Viroider er enkle, sirkulære ssRNA-molekyler som mangler proteinkapsid. De infiserer primært planter og forårsaker sykdom ved å forstyrre genreguleringen i vertscellen."
  },
  {
    id: "4-9", emne: 4, type: "tf",
    q: "Vertsceller for de fleste kappekledde virus er bakterier.",
    correct: false,
    explanation: "Vertsceller for de fleste kappekledde virus er DYRECELLER, ikke bakterier. Bakteriofager (virus som infiserer bakterier) er vanligvis ikke kappekledde."
  },
  {
    id: "4-10", emne: 4, type: "short",
    q: "Gi to grunner til at virus ikke anses som levende organismer.",
    correct: "mangler egen metabolisme, kan ikke formere seg uten vertscelle",
    explanation: "Virus mangler egen metabolisme og er helt avhengig av vertscellens metabolske apparat. De kan ikke formere seg utenfor en levende vertscelle (obligat intracellulære parasitter). I tillegg kan deres arvestoff være RNA, mens alle levende celler har dsDNA."
  },
  {
    id: "4-11", emne: 4, type: "short",
    q: "Hva er lysogeni, og hvilken fordel gir det for vertscellen?",
    correct: "virus-DNA integreres i bakteriekromosomet; gir immunitet mot reinfeksjon",
    explanation: "Lysogeni er tilstanden der virus-DNA (profag) er integrert i bakteriekromosomet. Fordeler for vertscellen: immunitet mot infeksjon av samme virustype, og potensielt nye egenskaper (f.eks. resistensgener) dersom profagen bærer med seg slike gener."
  },
  {
    id: "4-12", emne: 4, type: "short",
    q: "Beskriv kort de fem trinnene i en viral replikasjonssyklus.",
    correct: "1) feste, 2) inntrenging, 3) syntese, 4) sammensetning, 5) frigjøring",
    explanation: "De fem trinnene: (1) Feste/adsorpsjon til vertscelle, (2) Inntrenging/injeksjon av arvestoff, (3) Syntese av virusarvestoff og -proteiner, (4) Sammensetning av nye viruspartikler, (5) Frigjøring fra vertscellen (lysis eller budding)."
  },

  // ========== EMNE 5: TAKSONOMI, DIVERSITET & KRETSLØP (12 Qs) ==========
  {
    id: "5-1", emne: 5, type: "mc",
    q: "Hvilke organismer danner grunnlaget for karbonsyklusen ved å fiksere CO₂?",
    options: [
      "Kjemoorganotrofe",
      "Fototrofe (autotrofe)",
      "Anaerobe kjemolitotrofe",
      "Kjemoheterotrofe"
    ],
    correct: 1,
    explanation: "Fototrofe autotrofe organismer (planter, alger, cyanobakterier) fikserer CO₂ til organisk materiale gjennom fotosyntese, som danner grunnlaget for karbonsyklusen."
  },
  {
    id: "5-2", emne: 5, type: "mc",
    q: "Menneskelig aktivitet har forstyrret karbonsyklusen hovedsakelig gjennom:",
    options: [
      "Reduksjon av primærproduksjon i havet",
      "Forbrenning av karbon lagret som fossilt brennstoff, noe som øker CO₂ i atmosfæren",
      "Forsuring av havet som frigjør løst CO₂",
      "Forbrenning av metanreservoarer"
    ],
    correct: 1,
    explanation: "Forbrenning av fossilt brennstoff (olje, gass, kull) og biomasse frigjør karbon som har vært lagret over millioner av år, noe som øker CO₂-konsentrasjonen i atmosfæren og driver klimaendringer."
  },
  {
    id: "5-3", emne: 5, type: "mc",
    q: "Dinitrogenoksid (N₂O) er:",
    options: [
      "Et direkte produkt av nitrogenfiksering",
      "Et direkte produkt av ammonifisering",
      "En potent drivhusgass som er et produkt av denitrifikasjon",
      "En potent drivhusgass som er et produkt av nitrifikasjon"
    ],
    correct: 2,
    explanation: "N₂O (lystgass) dannes under denitrifikasjon (NO₃⁻ → N₂O → N₂). Det er en svært potent drivhusgass — ca. 300 ganger sterkere enn CO₂. Økt bruk av nitrogengjødsel kan øke denitrifikasjon og dermed N₂O-utslipp."
  },
  {
    id: "5-4", emne: 5, type: "mc",
    q: "Biologisk reduksjon av N₂ (atmosfærisk nitrogen til ammonium) er det samme som:",
    options: [
      "Ammonifikasjon",
      "Nitrogenfiksering",
      "Nitrifikasjon",
      "Denitrifikasjon"
    ],
    correct: 1,
    explanation: "Nitrogenfiksering er biologisk reduksjon av N₂ til NH₃. Ammonifikasjon er nedbrytning av organisk nitrogen til NH₃. Nitrifikasjon er oksidasjon av NH₄⁺ til NO₃⁻. Denitrifikasjon er reduksjon av NO₃⁻ til N₂/N₂O."
  },
  {
    id: "5-5", emne: 5, type: "mc",
    q: "Økt CO₂-konsentrasjon i atmosfæren fører til:",
    options: [
      "Økt sedimentering av C, Ca og Si",
      "Økt respirasjon i landbaserte økosystemer",
      "Økt primærproduksjon i sjø og hav",
      "Redusert pH i havet (havforsuring) og redusert dannelse av kalsiumskall"
    ],
    correct: 3,
    explanation: "Økt CO₂ løses i havet og danner karbonsyre (H₂CO₃), som senker pH (havforsuring). Dette gjør det vanskeligere for organismer som koraller og skjell å danne kalsiumkarbonatskall."
  },
  {
    id: "5-6", emne: 5, type: "tf",
    q: "Cyanobakterier er eksempler på ikke-symbiotiske bakterier som kan utføre nitrogenfiksering.",
    correct: true,
    explanation: "Cyanobakterier er frittlevende (ikke-symbiotiske) organismer som kan utføre nitrogenfiksering. De beskytter nitrogenase mot oksygen ved å danne spesialiserte oksygenfrie celler kalt heterocyster."
  },
  {
    id: "5-7", emne: 5, type: "tf",
    q: "Mycoplasma mangler cellevegg.",
    correct: true,
    explanation: "Mycoplasma er unike blant bakterier ved at de mangler cellevegg helt. De har bare en cellemembran (med kolesterol), noe som gjør dem resistente mot antibiotika som angriper cellevegg (f.eks. penicillin)."
  },
  {
    id: "5-8", emne: 5, type: "tf",
    q: "Sopp har cellevegg av cellulose, akkurat som planter.",
    correct: false,
    explanation: "Soppcellens cellevegg består av KITIN (et polysakkari av N-acetylglukosamin), ikke cellulose. Cellulose finnes i planteceller. Kitin er også det samme stoffet som finnes i insekters eksoskjelett."
  },
  {
    id: "5-9", emne: 5, type: "short",
    q: "En bakteriekultur beskrives slik: Gram-positiv, ikke-sporedannende, mesofil, aerotolerant anaerob, kjemoorganotrof stav. Syretolerant og store vekstfaktorkrav. Angi hvilken gruppe mikroorganismer dette passer til.",
    correct: "Melkesyrebakterier / Lactobacillus",
    explanation: "Beskrivelsen passer til melkesyrebakterier (slekten Lactobacillus): Gram-positive staver, ikke sporedannende, aerotolerante anaerobe (fermenterer uten O₂ men tåler det), syretolerante, og har store vekstfaktorkrav."
  },
  {
    id: "5-10", emne: 5, type: "short",
    q: "Hvilke to bakterieslekter er hovedansvarlige for nitrifikasjon? Angi hvilken del av prosessen (NH₄⁺ → NO₂⁻ og NO₂⁻ → NO₃⁻) de utfører.",
    correct: "Nitrosomonas (NH₄⁺ → NO₂⁻), Nitrobacter (NO₂⁻ → NO₃⁻)",
    explanation: "Nitrosomonas oksiderer ammonium til nitritt (NH₄⁺ → NO₂⁻), og Nitrobacter oksiderer nitritt til nitrat (NO₂⁻ → NO₃⁻). Begge er kjemolitoautotrofe. I tillegg kan Nitrospira (Comammox) utføre hele prosessen (NH₄⁺ → NO₃⁻)."
  },
  {
    id: "5-11", emne: 5, type: "short",
    q: "Hva er forskjellen mellom symbiotisk og frittlevende nitrogenfiksering? Gi et eksempel på en organisme for hver.",
    correct: "Frittlevende: Cyanobakterier/Azotobacter. Symbiotisk: Rhizobium (med planter)",
    explanation: "Frittlevende nitrogenfiksere (f.eks. Cyanobakterier, Azotobacter, Clostridium) lever uavhengig. Symbiotiske nitrogenfiksere (f.eks. Rhizobium) lever i nært samspill med vertsplanter (i rotknolller) der planten gir karbon/energi og bakterien gir fiksert nitrogen."
  },
  {
    id: "5-12", emne: 5, type: "short",
    q: "Hva kjennetegner Streptomyces, og hva gjør denne slekten viktig industrielt?",
    correct: "filamentøs vekst, Gram-positiv Actinobacteria, produserer antibiotika",
    explanation: "Streptomyces er Gram-positive bakterier (Actinobacteria) med filamentøs vekst som ligner muggsopp. De er svært viktige industrielt fordi de produserer et stort antall antibiotika og andre bioaktive forbindelser."
  },

  // ========== EMNE 6: BIOTEKNOLOGI (12 Qs) ==========
  {
    id: "6-1", emne: 6, type: "mc",
    q: "I PCR (Polymerase Chain Reaction), hva er funksjonen til Taq-polymerasen?",
    options: [
      "Denaturere DNA ved høy temperatur",
      "Binde primere til DNA-tråden",
      "Syntetisere nye DNA-tråder ved å legge til komplementære baser",
      "Kutte DNA ved spesifikke gjenkjennelsessekvenser"
    ],
    correct: 2,
    explanation: "Taq-polymerase syntetiserer nye DNA-tråder fra primerne ved å legge til komplementære nukleotider (dNTP). Den er varmeresistent (fra Thermus aquaticus) og overlever denatureringstrinnet (94–95 °C)."
  },
  {
    id: "6-2", emne: 6, type: "mc",
    q: "Hva kjennetegner gjenkjennelsessekvensene til restriksjonsenzymer?",
    options: [
      "De er alltid nøyaktig 10 basepar lange",
      "De er palindromiske (leses likt i 5'→3'-retning på begge tråder)",
      "De gjenkjenner kun enkelttrådet DNA",
      "De kutter kun RNA, ikke DNA"
    ],
    correct: 1,
    explanation: "Restriksjonsenzymer gjenkjenner palindromiske sekvenser (4–8 bp) som leses likt i 5'→3'-retning på begge DNA-tråder. De kan gi butte ender (rett kutt) eller klebrige ender (forskjøvet kutt)."
  },
  {
    id: "6-3", emne: 6, type: "mc",
    q: "Ved gelelektroforese av DNA, hvilken retning vandrer DNA-fragmentene og hvorfor?",
    options: [
      "Mot negativ pol fordi DNA er positivt ladet",
      "Mot positiv pol fordi DNA er negativt ladet (pga. fosfatgrupper)",
      "DNA vandrer ikke — det er proteinene som separeres",
      "Mot begge poler avhengig av pH"
    ],
    correct: 1,
    explanation: "DNA er negativt ladet på grunn av fosfatgruppene i sukker-fosfat-ryggraden. I et elektrisk felt vandrer DNA mot den positive polen (anoden). Små fragmenter vandrer lenger enn store."
  },
  {
    id: "6-4", emne: 6, type: "mc",
    q: "CRISPR-Cas9 systemet stammer opprinnelig fra:",
    options: [
      "Menneskers immunforsvar",
      "Planters forsvar mot insekter",
      "Bakteriers immunforsvar mot virus",
      "Soppers forsvar mot bakterier"
    ],
    correct: 2,
    explanation: "CRISPR-systemet er en del av bakteriers (og arkaers) adaptive immunforsvar mot virus. Bakteriene lagrer fragmenter av virus-DNA mellom CRISPR-sekvensene, som brukes til å gjenkjenne og kutte virus-DNA ved senere infeksjoner."
  },
  {
    id: "6-5", emne: 6, type: "mc",
    q: "Et markørgen i en vektor (plasmid) brukes til å:",
    options: [
      "Kode for start av replikasjon",
      "Gi celler en kjent egenskap som kan synliggjøres for å bekrefte vellykket genspleising",
      "Kode for horisontal genoverføring",
      "Kutte DNA ved bestemte sekvenser"
    ],
    correct: 1,
    explanation: "Markørgener gir transformerte celler en identifiserbar egenskap (f.eks. antibiotikaresistens, fluorescens, eller fargeproduksjon) slik at man kan skille celler som har tatt opp vektoren fra de som ikke har det."
  },
  {
    id: "6-6", emne: 6, type: "tf",
    q: "I Southern blotting overføres DNA-fragmenter fra en elektroforesegel til en membran ved hjelp av kapillærkrefter.",
    correct: true,
    explanation: "I Southern blotting trekkes buffer oppover gjennom gelen via kapillærkrefter, og DNA-fragmentene overføres (blottes) til en nitrocellulosemembran. Membranen bakas/UV-behandles for å fiksere DNA, og deteksjon skjer med merkede prober."
  },
  {
    id: "6-7", emne: 6, type: "tf",
    q: "Cas9 er klassifisert som et type 5 restriksjonsenzym.",
    correct: true,
    explanation: "Cas9-proteinet er et RNA-guidet endonuklease klassifisert som et type 5 (klasse 5) restriksjonsenzym. Det kutter begge DNA-tråder presist ved det stedet som sgRNA (guide-RNA) leder det til."
  },
  {
    id: "6-8", emne: 6, type: "tf",
    q: "En DNA-profil presenteres i dag typisk som et elektroferogram.",
    correct: true,
    explanation: "Moderne DNA-profilering bruker STR-analyse (Short Tandem Repeats) der resultatet presenteres som et elektroferogram (kromatogram med topper), ikke på en tradisjonell elektroforesegel."
  },
  {
    id: "6-9", emne: 6, type: "tf",
    q: "Reproduktiv kloning og terapeutisk kloning er det samme.",
    correct: false,
    explanation: "Reproduktiv kloning lager et nytt individ med samme DNA som et annet (f.eks. Dolly sauen). Terapeutisk kloning bruker embryoer som kilde for stamceller til medisinsk behandling, uten å lage et nytt individ."
  },
  {
    id: "6-10", emne: 6, type: "short",
    q: "Forklar kort hvordan lac-operonet reguleres: hva skjer når laktose er til stede i mediet vs. når det er fraværende?",
    correct: "uten laktose: repressor binder operator, operon av. med laktose: inducer inaktiverer repressor, operon på",
    explanation: "Fravær av laktose: Repressorproteinet (fra LacI) binder seg til operator (LacO) og blokkerer transkripsjon — operonet er AV. Nærvær av laktose: Allolaktose (induser) binder til repressoren og inaktiverer den, slik at repressoren ikke kan binde operator — operonet slås PÅ og β-galaktosidase produseres."
  },
  {
    id: "6-11", emne: 6, type: "short",
    q: "Forklar forskjellen mellom missense-mutasjon, nonsense-mutasjon og rammeskift (frameshift)-mutasjon.",
    correct: "missense: annen aminosyre, nonsense: stoppkodon, frameshift: endret leseramme",
    explanation: "Missense: basebytte gir et kodon som koder for en annen aminosyre → endret protein. Nonsense: basebytte gir et stoppkodon (UAG/UAA/UGA) → forkortet, ofte ikke-funksjonelt protein. Frameshift: addisjon/delesjon av baser endrer leserammen for alle etterfølgende kodoner."
  },
  {
    id: "6-12", emne: 6, type: "short",
    q: "Definer begrepene: (a) fenotype, (b) genotype, (c) locus.",
    correct: "(a) observerbar egenskap, (b) genetisk sammensetning, (c) kromosomposisjon for et gen",
    explanation: "(a) Fenotype: observerbar egenskap hos et individ (utseende, egenskaper). (b) Genotype: den genetiske sammensetningen i en celle (arvestoffet). (c) Locus: det spesifikke stedet (området) på et kromosom der et bestemt gen er lokalisert."
  },
];

export default function MATV1007Quiz() {
  const [filter, setFilter] = useState(0);
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});
  const topRef = useRef(null);

  const filtered = filter === 0 ? allQuestions : allQuestions.filter(q => q.emne === filter);

  const getScore = () => {
    let correct = 0;
    let answered = 0;
    for (const qid in answers) {
      const q = allQuestions.find(x => x.id === qid);
      if (!q) continue;
      answered++;
      if (q.type === "mc") {
        if (answers[qid] === q.correct) correct++;
      } else if (q.type === "tf") {
        if (answers[qid] === q.correct) correct++;
      } else if (q.type === "short") {
        if (answers[qid] === "__correct__") correct++;
      }
    }
    return { correct, answered };
  };

  const handleMC = (qid, idx) => {
    if (revealed[qid]) return;
    setAnswers(p => ({ ...p, [qid]: idx }));
  };

  const handleTF = (qid, val) => {
    if (revealed[qid]) return;
    setAnswers(p => ({ ...p, [qid]: val }));
  };

  const handleShortMark = (qid, isCorrect) => {
    setAnswers(p => ({ ...p, [qid]: isCorrect ? "__correct__" : "__wrong__" }));
  };

  const handleReveal = (qid) => {
    setRevealed(p => ({ ...p, [qid]: true }));
  };

  const handleReset = () => {
    setAnswers({});
    setRevealed({});
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const score = getScore();
  const emneIdx = (q) => allQuestions.filter(x => x.emne === q.emne).findIndex(x => x.id === q.id) + 1;
  const globalIdx = (q) => allQuestions.findIndex(x => x.id === q.id) + 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Source+Sans+3:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        .quiz-root {
          --bg: #0F172A;
          --card: #1E293B;
          --border: #334155;
          --text: #F8FAFC;
          --text2: #94A3B8;
          --font-head: 'Plus Jakarta Sans', sans-serif;
          --font-body: 'Source Sans 3', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
          font-family: var(--font-body);
          background: var(--bg);
          color: var(--text);
          min-height: 100vh;
          padding: 0;
          margin: 0;
        }
        .quiz-root * { box-sizing: border-box; }
        .q-header {
          font-family: var(--font-head);
          position: sticky;
          top: 0;
          z-index: 100;
          background: #0F172AEE;
          backdrop-filter: blur(12px);
          border-bottom: 1px solid var(--border);
          padding: 16px 20px;
        }
        .q-title {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
          margin-bottom: 4px;
        }
        .q-sub {
          font-size: 13px;
          color: var(--text2);
          margin-bottom: 12px;
          line-height: 1.4;
        }
        .score-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .score-pill {
          font-family: var(--font-mono);
          font-size: 14px;
          padding: 6px 14px;
          border-radius: 8px;
          background: #334155;
          font-weight: 500;
        }
        .reset-btn {
          font-family: var(--font-head);
          font-size: 12px;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 8px;
          border: 1px solid #475569;
          background: transparent;
          color: var(--text2);
          cursor: pointer;
          transition: all 0.15s;
        }
        .reset-btn:hover { background: #334155; color: var(--text); }
        .filter-row {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .filter-btn {
          font-family: var(--font-head);
          font-size: 12px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1.5px solid;
          cursor: pointer;
          transition: all 0.2s;
          background: transparent;
          white-space: nowrap;
        }
        .filter-btn.active {
          color: #0F172A !important;
        }
        .q-list {
          padding: 16px 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-bottom: 60px;
        }
        .q-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 20px;
          transition: border-color 0.2s;
        }
        .q-card:hover { border-color: #475569; }
        .q-meta {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .q-pill {
          font-family: var(--font-head);
          font-size: 11px;
          font-weight: 700;
          padding: 3px 10px;
          border-radius: 999px;
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }
        .q-num {
          font-family: var(--font-mono);
          font-size: 12px;
          color: var(--text2);
        }
        .q-type-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          padding: 2px 8px;
          border-radius: 4px;
          background: #334155;
          color: var(--text2);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .q-text {
          font-size: 15px;
          line-height: 1.6;
          margin-bottom: 16px;
          font-weight: 400;
          white-space: pre-wrap;
        }
        .q-text sub { font-size: 0.75em; vertical-align: sub; }
        .q-text sup { font-size: 0.75em; vertical-align: super; }
        .mc-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 14px;
        }
        .mc-opt {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          cursor: pointer;
          transition: all 0.15s;
          font-size: 14px;
          line-height: 1.5;
        }
        .mc-opt:hover:not(.disabled) { border-color: #64748B; background: #1a2540; }
        .mc-opt.selected { border-color: #60A5FA; background: #1E3A5F; }
        .mc-opt.correct-reveal { border-color: #34D399 !important; background: #064E3B !important; }
        .mc-opt.wrong-reveal { border-color: #F87171 !important; background: #7F1D1D !important; }
        .mc-opt.disabled { cursor: default; opacity: 0.7; }
        .mc-radio {
          width: 18px;
          height: 18px;
          min-width: 18px;
          border-radius: 50%;
          border: 2px solid #64748B;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 2px;
          transition: all 0.15s;
        }
        .mc-radio.selected { border-color: #60A5FA; }
        .mc-radio.selected::after {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #60A5FA;
        }
        .tf-row {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
        }
        .tf-btn {
          font-family: var(--font-head);
          font-size: 14px;
          font-weight: 600;
          padding: 8px 24px;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: transparent;
          color: var(--text);
          cursor: pointer;
          transition: all 0.15s;
        }
        .tf-btn:hover:not(.disabled) { background: #1a2540; border-color: #64748B; }
        .tf-btn.sel-true { border-color: #34D399; background: #064E3B; }
        .tf-btn.sel-false { border-color: #F87171; background: #7F1D1D; }
        .tf-btn.correct-reveal { border-color: #34D399 !important; background: #064E3B !important; }
        .tf-btn.wrong-reveal { border-color: #F87171 !important; background: #7F1D1D !important; }
        .tf-btn.disabled { cursor: default; opacity: 0.7; }
        .short-area {
          margin-bottom: 14px;
        }
        .short-input {
          width: 100%;
          background: #0F172A;
          border: 1.5px solid var(--border);
          border-radius: 8px;
          padding: 10px 14px;
          color: var(--text);
          font-family: var(--font-body);
          font-size: 14px;
          outline: none;
          transition: border-color 0.15s;
          resize: vertical;
          min-height: 40px;
        }
        .short-input:focus { border-color: #64748B; }
        .short-self {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }
        .short-self-btn {
          font-family: var(--font-head);
          font-size: 12px;
          font-weight: 600;
          padding: 5px 12px;
          border-radius: 6px;
          border: 1.5px solid;
          cursor: pointer;
          transition: all 0.15s;
          background: transparent;
        }
        .reveal-btn {
          font-family: var(--font-head);
          font-size: 13px;
          font-weight: 600;
          padding: 7px 18px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: all 0.2s;
          color: white;
        }
        .reveal-btn:hover { filter: brightness(1.15); }
        .explanation-box {
          margin-top: 14px;
          padding: 14px;
          border-radius: 8px;
          border-left: 3px solid;
          font-size: 13.5px;
          line-height: 1.6;
        }
        .correct-label {
          font-family: var(--font-head);
          font-weight: 700;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }
        .formula {
          font-family: var(--font-mono);
          font-size: 13px;
          background: #0F172A;
          padding: 2px 6px;
          border-radius: 4px;
        }
      `}</style>
      <div className="quiz-root" ref={topRef}>
        <div className="q-header">
          <div className="q-title">MATV1007 — Øvingseksamen</div>
          <div className="q-sub">
            72 spørsmål · 6 emner · Negativ poenggivning på flervalg: riktig = +1p, feil = −1p, ubesvart = 0p. Minuspoeng overføres IKKE mellom oppgaver.
          </div>
          <div className="score-bar">
            <span className="score-pill" style={{ color: score.correct > 0 ? "#34D399" : "var(--text2)" }}>
              Riktige: {score.correct} / {score.answered} besvart
            </span>
            <button className="reset-btn" onClick={handleReset}>Nullstill alt</button>
          </div>
          <div className="filter-row">
            <button
              className={`filter-btn ${filter === 0 ? "active" : ""}`}
              style={{
                borderColor: "#94A3B8",
                color: filter === 0 ? "#0F172A" : "#94A3B8",
                background: filter === 0 ? "#94A3B8" : "transparent"
              }}
              onClick={() => setFilter(0)}
            >
              Alle ({allQuestions.length})
            </button>
            {EMNER.map(e => {
              const cnt = allQuestions.filter(q => q.emne === e.id).length;
              return (
                <button
                  key={e.id}
                  className={`filter-btn ${filter === e.id ? "active" : ""}`}
                  style={{
                    borderColor: e.color,
                    color: filter === e.id ? "#0F172A" : e.color,
                    background: filter === e.id ? e.color : "transparent"
                  }}
                  onClick={() => setFilter(e.id)}
                >
                  {e.name} ({cnt})
                </button>
              );
            })}
          </div>
        </div>

        <div className="q-list">
          {filtered.map(q => {
            const emne = EMNER.find(e => e.id === q.emne);
            const isRevealed = revealed[q.id];
            const userAns = answers[q.id];
            const typeLabel = q.type === "mc" ? "Flervalg" : q.type === "tf" ? "Sant/Usant" : "Kortsvar";

            return (
              <div key={q.id} className="q-card">
                <div className="q-meta">
                  <span className="q-pill" style={{ background: emne.color + "22", color: emne.color, border: `1px solid ${emne.color}44` }}>
                    {emne.name}
                  </span>
                  <span className="q-num">#{globalIdx(q)} · {emne.name} {emneIdx(q)}/12</span>
                  <span className="q-type-tag">{typeLabel}</span>
                </div>
                <div className="q-text">{q.q}</div>

                {q.type === "mc" && (
                  <div className="mc-options">
                    {q.options.map((opt, idx) => {
                      let cls = "mc-opt";
                      if (isRevealed) {
                        cls += " disabled";
                        if (idx === q.correct) cls += " correct-reveal";
                        else if (idx === userAns && idx !== q.correct) cls += " wrong-reveal";
                      } else {
                        if (userAns === idx) cls += " selected";
                      }
                      return (
                        <div key={idx} className={cls} onClick={() => handleMC(q.id, idx)}>
                          <div className={`mc-radio ${userAns === idx ? "selected" : ""}`} />
                          <span>{opt}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {q.type === "tf" && (
                  <div className="tf-row">
                    {[true, false].map(val => {
                      let cls = "tf-btn";
                      if (isRevealed) {
                        cls += " disabled";
                        if (val === q.correct) cls += " correct-reveal";
                        else if (val === userAns && val !== q.correct) cls += " wrong-reveal";
                      } else {
                        if (userAns === val) cls += (val ? " sel-true" : " sel-false");
                      }
                      return (
                        <button key={String(val)} className={cls} onClick={() => handleTF(q.id, val)}>
                          {val ? "Sant" : "Usant"}
                        </button>
                      );
                    })}
                  </div>
                )}

                {q.type === "short" && (
                  <div className="short-area">
                    <input
                      className="short-input"
                      placeholder="Skriv svaret ditt her..."
                      disabled={isRevealed}
                      style={isRevealed ? { opacity: 0.6 } : {}}
                    />
                    {isRevealed && (
                      <div className="short-self" style={{ marginTop: 8 }}>
                        <span style={{ fontSize: 12, color: "var(--text2)", marginRight: 4, lineHeight: "28px" }}>Vurder selv:</span>
                        <button
                          className="short-self-btn"
                          style={{
                            borderColor: "#34D399", color: userAns === "__correct__" ? "#0F172A" : "#34D399",
                            background: userAns === "__correct__" ? "#34D399" : "transparent"
                          }}
                          onClick={() => handleShortMark(q.id, true)}
                        >✓ Riktig</button>
                        <button
                          className="short-self-btn"
                          style={{
                            borderColor: "#F87171", color: userAns === "__wrong__" ? "#0F172A" : "#F87171",
                            background: userAns === "__wrong__" ? "#F87171" : "transparent"
                          }}
                          onClick={() => handleShortMark(q.id, false)}
                        >✗ Feil</button>
                      </div>
                    )}
                  </div>
                )}

                {!isRevealed && (
                  <button
                    className="reveal-btn"
                    style={{ background: emne.color }}
                    onClick={() => handleReveal(q.id)}
                  >
                    Vis svar
                  </button>
                )}

                {isRevealed && (
                  <div className="explanation-box" style={{ background: emne.color + "11", borderColor: emne.color }}>
                    <div className="correct-label" style={{ color: emne.color }}>
                      {q.type === "mc" ? `Riktig svar: ${String.fromCharCode(65 + q.correct)}` :
                       q.type === "tf" ? `Riktig svar: ${q.correct ? "Sant" : "Usant"}` :
                       `Fasit: ${q.correct}`}
                    </div>
                    <div style={{ color: "#CBD5E1" }}>{q.explanation}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
