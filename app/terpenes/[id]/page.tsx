import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Bookmark, Award, Check, Sparkles, Flame } from "lucide-react";
import logoImage from "@/src/assets/images/releafcanna_cute_logo_1782007010792.jpg";
import HashtagCrossLinker from "@/app/components/HashtagCrossLinker";

// Terpenes data dictionary expanded with rich academic SEO copy
const TERPENE_DETAILS: Record<string, {
  name: string;
  scent: string;
  boilingPoint: string;
  targets: string;
  strength: number;
  primaryEffect: string;
  medicalUse: string;
  clinicalAbstract: string;
  biologicalAction: string[];
  cannabinoidPairings: string[];
  optimalTherapeuticIndex: string;
}> = {
  "beta-caryophyllene": {
    name: "Beta-Caryophyllene",
    scent: "Spicy, black pepper, cloves, woody undertones",
    boilingPoint: "266 °F (130 °C)",
    targets: "Peripheral CB2 receptors, Gastric Linings, Immune Modulation",
    strength: 92,
    primaryEffect: "Acts directly as a dietary cannabinoid, binding to CB2 receptors to downregulate swelling.",
    medicalUse: "Excellent for systemic autoimmune swelling, inflammatory bowel issues, and local severe muscle aches.",
    clinicalAbstract: "Beta-Caryophyllene (BCP) is a highly unique sesquiterpene found abundantly in cloves, hops, and rosemary. Its outstanding pharmacological attribute is its ability to act as a selective functional agonist of the CB2 cannabinoid receptor—making it one of the few terpenes that functions directly as a dietary cannabinoid. Because CB2 receptors are primarily distributed in the immune system and peripheral tissues, BCP activation does not cause any central nervous intoxication. Instead, it triggers powerful cellular signals that halt inflammatory cytokine production and ease muscle tissue spasticity.",
    biologicalAction: [
      "Direct CB2 Receptor Agonism: Inhibits cellular inflammation pathways and targets somatic swelling.",
      "Gastric Mucosal Protection: Decreases inflammatory lesions in gastric walls, supporting gastrointestinal lining.",
      "Peripheral Analgesic: Blocks local pain sensory neurons through pathways independent of central opioid receptors.",
      "Antioxidant Action: Combats cellular oxidative stress in cerebral and neural pathways."
    ],
    cannabinoidPairings: [
      "CBD (Cannabidiol): Creates an ultimate anti-inflammatory coupling that addresses systemic joint issues.",
      "CBG (Cannabigerol): Synergizes to calm muscle and gastrointestinal tissue twitching.",
      "THC (Tetrahydrocannabinol): Suppresses acute muscular pain and inflammation."
    ],
    optimalTherapeuticIndex: "Active at microscopic levels. Recommended to consume within full-spectrum botanical oils containing 2% to 5% caryophyllene. Best vaporized or processed under 266°F to prevent compound denaturation."
  },
  myrcene: {
    name: "Myrcene",
    scent: "Earthy, musky, ripe mangoes, herbal forest",
    boilingPoint: "331 °F (166 °C)",
    targets: "Cell Membranes, Blood-Brain Barrier, Central Nervous System",
    strength: 88,
    primaryEffect: "Enhances cannabinoid cell absorption and relaxes skeletal muscle tissue.",
    medicalUse: "Promotes deep 'couch-lock' physical relaxation, mitigates muscle spasms, and helps overcome intense sleep delays.",
    clinicalAbstract: "Myrcene is the most common monoterpene found in modern therapeutic cannabis plants, frequently comprising up to 50% of a strain's total terpene content. Clinically, Myrcene plays a critical gatekeeping role in the 'Entourage Effect'. It modifies cell membrane permeability, facilitating faster transport of large cannabinoid molecules (like THC and CBD) across the blood-brain barrier. Furthermore, Myrcene acts directly as a physical muscle relaxant and mild sedative, regulating skeletal muscle tension and promoting deep slow-wave sleep cycles.",
    biologicalAction: [
      "Membrane Permeabilization: Lowers resistance of cellular lipids, speeding up cannabinoid transport and absorption.",
      "Skeletal Muscle Relaxation: Restricts calcium flux in muscle tissue, suppressing involuntary twitching.",
      "Nervous System Sedation: Synergizes with brain GABA networks to reduce stress-induced adrenaline spikes.",
      "Analgesic Potential: Stimulates endogenous opioid peptide release, easing severe chronic muscle soreness."
    ],
    cannabinoidPairings: [
      "THC: Multiplies the speed of psychoactive uptake, causing immediate sedation and heavy bodily calm.",
      "CBN: Perfect night-time formulation that prevents mid-night awakenings.",
      "CBD: Promotes generalized somatic rest and relaxes deep spinal muscle groups."
    ],
    optimalTherapeuticIndex: "Requires a temperature of 331°F (166°C) to vaporize cleanly. High-myrcene extracts (above 1%) are classified as heavily sedating indica profiles."
  },
  limonene: {
    name: "Limonene",
    scent: "Bright citrus, lemon zest, sweet orange bliss",
    boilingPoint: "349 °F (176 °C)",
    targets: "Adenosine receptors, Gastric Reflux, Dopaminergic networks",
    strength: 85,
    primaryEffect: "Elevates mental state, improves sensory focus, and relieves gut acidity stress.",
    medicalUse: "Highly utilized for managing chronic physical anxiety, mild seasonal sadness, and acid acidity symptoms.",
    clinicalAbstract: "Limonene is a cyclic monoterpene responsible for the vibrant citrus aromas of lemons, oranges, and grapefruits. Pharmacologically, Limonene is highly valued for its fast-acting mood-elevating and anxiolytic properties. It easily crosses the blood-brain barrier to trigger serotonin and dopamine release pathways in the prefrontal cortex. Beyond emotional regulation, Limonene is incredibly useful in gastrointestinal care: it neutralizes gastric acid, alleviates heartburn, and acts as a powerful immune stimulant by encouraging macrophage production.",
    biologicalAction: [
      "Serotonergic Pathway Stimulation: Agonizes 5-HT1A receptors, resulting in rapid emotional elevation.",
      "Adenosine Modulation: Supports steady cardiac rest and reduces chest-clenching anxiety.",
      "Gastric Acid Neutralization: Relieves gastroesophageal reflux issues by forming an eye-safe protective barrier.",
      "Immune System Booster: Promotes lymphocyte activity and combats cellular pathogens."
    ],
    cannabinoidPairings: [
      "THCV: Formulates an ultra-clear, highly energetic daytime focus profile.",
      "CBD: Creates an excellent non-psychoactive shield against acute mental anxiety.",
      "CBG: Combines to manage focus and eliminate brain fog without cerebral fatigue."
    ],
    optimalTherapeuticIndex: "Boiling point is 349°F (176°C). Excellent for daytime formulas. High-limonene strains are typically categorized as energetic, clear-headed sativa profiles."
  },
  linalool: {
    name: "Linalool",
    scent: "Soothing floral lavender, delicate sweet spice",
    boilingPoint: "388 °F (198 °C)",
    targets: "GABA-A Receptors, Glutamate Pathways, Cholinergic Systems",
    strength: 96,
    primaryEffect: "Powerful nervous calming agent, anti-convulsant, and physical sedative.",
    medicalUse: "Perfect for mitigating mental hyperactivity, reducing stress-provoked adrenaline spikes, and protecting neurons.",
    clinicalAbstract: "Linalool is a naturally occurring terpene alcohol found in lavender, mint, and cinnamon. It is widely recognized for its deep sedative and sleep-inducing properties. Within the central nervous system, Linalool modulates GABAergic neurotransmission—the brain's primary calming network. By facilitating the binding of GABA to GABA-A receptor sites, it acts similarly to pharmaceutical tranquilizers, slowing down hyperactive nerve firing. Linalool also suppresses excessive glutamate release, providing neuroprotective benefits and mitigating nervous overstimulation.",
    biologicalAction: [
      "GABA-A Facilitation: Increases the calming response of brain cells, eliminating somatic racing thoughts.",
      "Glutamate Release Inhibition: Halts neuro-excitotoxicity, protecting synapses from physical stress decay.",
      "Acetylcholine Modulation: Calms autonomic nerve responses, easing high heart rate spikes.",
      "Local Neuropathic Soothing: Reduces mechanical and thermal sensory pain conduction."
    ],
    cannabinoidPairings: [
      "CBN: Creates the ultimate clinical-grade natural sleep aid.",
      "CBD: Broadly calms the entire physical nervous system, lowering daytime anxiety.",
      "THC: Suppresses THC-induced mental paranoia, keeping the experience relaxing."
    ],
    optimalTherapeuticIndex: "Vaporizes at 388°F (198°C). Highly stable compound. Linalool is recommended for evening and night-time formulations targeting severe muscle tightness and sleep cycles."
  },
  pinene: {
    name: "Pinene",
    scent: "Sharp fresh pine needles, evergreen organic wood",
    boilingPoint: "311 °F (155 °C)",
    targets: "Acetylcholinesterase Inhibitors, Bronchial Pathways",
    strength: 80,
    primaryEffect: "Vasodilator, anti-inflammatory, acts as an alert focus and breathing generator.",
    medicalUse: "Increases mental clarity, opens up bronchial breathing tubes under asthma, and counteracts memory fog.",
    clinicalAbstract: "Pinene (primarily Alpha-Pinene) is a bicyclic monoterpene that forms the principal scent component of pine forests and sage. In pharmacology, Pinene is celebrated for its ability to inhibit acetylcholinesterase—an enzyme that breaks down Acetylcholine, the brain's critical neurotransmitter for memory, recall, and executive attention. By blocking this breakdown, Pinene enhances mental endurance, improves focus, and directly counteracts the short-term memory impairment often caused by THC. Additionally, Pinene acts as a highly potent bronchodilator, opening up pulmonary airways to increase blood oxygenation.",
    biologicalAction: [
      "Acetylcholinesterase Inhibition: Boosts brain Acetylcholine levels, facilitating rapid study recall.",
      "Pulmonary Bronchodilation: Relaxes muscular tissue in the lungs, increasing breathing capacity.",
      "Broad-Spectrum Anti-Inflammatory: Suppresses PGE1 inflammatory gates in joint tissue.",
      "Microbial Inhibition: Possesses natural antiseptic properties against deep tissue pathogens."
    ],
    cannabinoidPairings: [
      "CBG: Creates a supreme non-intoxicating blend for work productivity and mental stamina.",
      "THCV: Delivers clear, focused, clean energy without heart racing.",
      "THC: Counteracts memory fog and cerebral sluggishness, maintaining active awareness."
    ],
    optimalTherapeuticIndex: "Boils at 311°F (155°C). Excellent for morning or afternoon use. Highly popular in cognitive enhancement regimens and organic bronchial therapies."
  },
  humulene: {
    name: "Humulene",
    scent: "Hoppy, earthy roots, cedar, warm bark",
    boilingPoint: "223 °F (106 °C)",
    targets: "Anorectic pathways (Satiety), Systemic cellular swellings",
    strength: 78,
    primaryEffect: "Direct cellular anti-tumor protector and healthy appetite moderator.",
    medicalUse: "Induces healthy full feelings, reduces persistent physical joint inflammation, and aids cellular repair.",
    clinicalAbstract: "Humulene (formerly Alpha-Caryophyllene) is an isomer of Beta-Caryophyllene, found abundantly in hops, ginseng, and sage. Unlike most cannabis compounds, which tend to stimulate appetite, Humulene acts as an anorectic—suppressing appetite by interacting with satiety pathways in the gut. Beyond weight and metabolic support, Humulene is a potent anti-inflammatory agent. It suppresses TNF-alpha and interleukin cytokines, which are responsible for persistent physical pain in joints and muscles, showing comparable efficacy to standard over-the-counter anti-inflammatories.",
    biologicalAction: [
      "Appetite Suppression (Anorectic): Regulates satiety hormones, curbing sweet cravings.",
      "PGE2/TNF-Alpha Inhibition: Downregulates inflammatory signaling cascades in muscle cells.",
      "Cellular Guarding: Promotes healthy cell cycle checks and targets cellular pathogen mutations.",
      "Localized Analgesia: Relieves acute somatic swelling and muscle pain when applied topically."
    ],
    cannabinoidPairings: [
      "THCV: Creates a premier metabolic and satiety control formulation.",
      "CBD: Delivers powerful, non-psychoactive inflammatory relief to sore muscles.",
      "THC: Suppresses the typical 'munchies' or excessive cravings induced by central CB1 activation."
    ],
    optimalTherapeuticIndex: "Vaporizes at a low 223°F (106°C). Highly delicate compound. Optimal in CO₂ raw extracts and cold-pressed sublingual oils."
  }
};

export async function generateStaticParams() {
  return [
    { id: "beta-caryophyllene" },
    { id: "myrcene" },
    { id: "limonene" },
    { id: "linalool" },
    { id: "pinene" },
    { id: "humulene" }
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const data = TERPENE_DETAILS[id.toLowerCase()];
  
  if (!data) {
    return {
      title: "Botanical Terpene Profile | ReleafCanna",
      description: "Detailed scientific terpene profile on releafcanna.com."
    };
  }

  return {
    title: `${data.name} Terpene Profile & Boiling Point | ReleafCanna`,
    description: `Scientific breakdown of ${data.name} terpene: scent ${data.scent}, boiling point ${data.boilingPoint}, biological targets, clinical actions, and synergistic cannabinoid entourage pairings.`,
    keywords: [
      `${data.name} benefits`,
      `${data.name} scent profile`,
      `${data.name} boiling temperature`,
      `${data.name} medical study`,
      `terpene synergy ${data.name}`,
      `releafcanna ${data.name.toLowerCase()}`
    ],
    alternates: {
      canonical: `https://releafcanna.com/terpenes/${id.toLowerCase()}`,
    },
    openGraph: {
      title: `${data.name} Terpene Scientific Review | ReleafCanna`,
      description: `Explore the clinical pharmacology, boiling points, and aromatic qualities of ${data.name}.`,
      url: `https://releafcanna.com/terpenes/${id.toLowerCase()}`,
      type: "article"
    }
  };
}

export default async function TerpeneDetailPage({ params }: PageProps) {
  const { id } = await params;
  const data = TERPENE_DETAILS[id.toLowerCase()];

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] text-stone-900 p-8">
        <h1 className="text-2xl font-bold">Terpene Profile Not Found</h1>
        <p className="text-stone-500 mt-2">The specified terpene is not registered in our botanical database.</p>
        <Link href="/" className="mt-6 px-4 py-2 bg-emerald-600 text-white rounded-md text-xs font-semibold hover:bg-emerald-700">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-stone-900 selection:bg-emerald-100 selection:text-emerald-900 font-sans antialiased">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Breadcrumb / Back Navigation */}
        <div className="flex items-center justify-between">
          <Link href="/#terpenes" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 text-xs font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Terpene Encyclopedia
          </Link>
          <span className="font-mono text-xs text-stone-400">Section: Programmatic SEO Library</span>
        </div>

        {/* Brand Header */}
        <header className="flex items-center justify-between border-b pb-4 border-stone-200">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 bg-white rounded-xl border border-stone-200 p-1">
              <Image
                src={logoImage}
                alt="ReleafCanna Logo"
                fill
                priority
                className="object-contain p-0.5"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-emerald-600 font-mono">releafcanna.com</p>
              <p className="text-[10px] text-stone-400 font-mono">Premium Natural Botanical Assets</p>
            </div>
          </div>
          <a 
            href="https://www.godaddy.com/domainsearch/find?domainToCheck=releafcanna.com"
            target="_blank"
            rel="noopener noreferrer" 
            className="text-[10px] font-mono font-bold text-stone-500 hover:text-emerald-600 border border-stone-300 rounded px-2.5 py-1 bg-white hover:border-emerald-300 transition-all shadow-xs"
          >
            Direct Domain Offer
          </a>
        </header>

        {/* Main Article Card */}
        <article className="bg-white border border-stone-200/80 rounded-2xl p-6 sm:p-10 shadow-xs space-y-8">
          
          {/* Header Title Lockup */}
          <div className="border-b pb-6 border-stone-100 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">{data.name}</span>
                <span className="text-[11px] font-mono border border-stone-200 px-2.5 py-0.5 rounded bg-amber-50 font-bold text-amber-700 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-500 shrink-0" /> {data.boilingPoint}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-stone-500 mt-2">
                Aromatic Terpene Analysis: {data.name}
              </h1>
              <p className="text-xs text-stone-400 mt-1 italic flex items-center gap-1">
                <Bookmark className="w-3 h-3 text-emerald-600 shrink-0" /> Target Pathways: {data.targets}
              </p>
            </div>
            
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-left sm:max-w-xs shrink-0">
              <p className="text-[9px] font-bold text-emerald-800 font-mono uppercase tracking-wider mb-1">Aromatic Signature</p>
              <p className="text-xs font-medium leading-relaxed text-emerald-950 italic">&ldquo;{data.scent}&rdquo;</p>
            </div>
          </div>

          {/* Clinical Abstract */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" /> Molecular Abstract & Action
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed font-serif text-justify">
              {data.clinicalAbstract}
            </p>
          </section>

          {/* Biological Actions */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" /> Biological Actions & Cell Targets
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.biologicalAction.map((act, idx) => {
                const [title, body] = act.split(": ");
                return (
                  <div key={idx} className="p-4 rounded-xl border border-stone-200/60 bg-stone-50/50 space-y-1 hover:border-emerald-200/50 transition-colors">
                    <span className="text-xs font-bold text-stone-900 block font-mono">{title}</span>
                    <span className="text-xs text-stone-500 block leading-relaxed">{body}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Core Medicinal Uses */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" /> Therapeutic Sourcing & Uses
            </h2>
            <div className="p-4 rounded-xl border border-stone-100 bg-emerald-50/10 text-xs text-stone-700 space-y-2 leading-relaxed">
              <p className="font-bold text-stone-900">Primary Clinical Effect:</p>
              <p>{data.primaryEffect}</p>
              <p className="font-bold text-stone-900 mt-3">Target Health Applications:</p>
              <p>{data.medicalUse}</p>
            </div>
          </section>

          {/* Optimal Therapeutic Index */}
          <section className="p-5 rounded-xl border border-amber-200 bg-amber-50/20 space-y-3">
            <h2 className="text-xs font-bold text-amber-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-600 animate-pulse" /> Optimal Extraction & Thermal Sensitivity
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {data.optimalTherapeuticIndex}
            </p>
          </section>

          {/* Cannabinoid Pairings */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">
              Cannabinoid Pairings & Synergy Vectors
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {data.cannabinoidPairings.map((pair, idx) => {
                const [cann, action] = pair.split(": ");
                return (
                  <div key={idx} className="p-4 rounded-xl border border-stone-200 text-center space-y-1.5">
                    <span className="text-xs font-black text-emerald-700 font-mono">{cann}</span>
                    <span className="text-[11px] text-stone-500 block leading-relaxed">{action}</span>
                  </div>
                );
              })}
            </div>
          </section>

        </article>

        {/* BIOCHEMICAL INDEX & SEO HASHTAG NETWORK */}
        <HashtagCrossLinker initialTag={id.toLowerCase() === "beta-caryophyllene" ? "caryophyllene" : id.toLowerCase()} isDarkTheme={false} />

        {/* Premium Acquisition Callout Banner */}
        <section className="rounded-2xl p-6 sm:p-8 border border-emerald-200 bg-emerald-50 text-slate-900 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/40 via-emerald-50/10 to-transparent pointer-events-none" />
          <div className="space-y-2 relative z-10 text-center md:text-left">
            <span className="inline-block text-[9px] font-mono uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">Domain Acquisition Offer</span>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-emerald-900">Establish Immediate Authority with releafcanna.com</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-xl">
              This digital platform, high-density scientific dataset, and custom-styled interactive components are fully packageable. Own an exact-match keyword asset to drive maximum botanical traffic.
            </p>
          </div>
          <a 
            href="https://www.godaddy.com/domainsearch/find?domainToCheck=releafcanna.com"
            target="_blank"
            rel="noopener noreferrer" 
            className="px-5 py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-600 text-white transition-all font-sans uppercase tracking-wider shrink-0 text-center shadow-sm w-full md:w-auto"
          >
            Inquire on GoDaddy
          </a>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 text-stone-400 text-[10px] leading-relaxed border-t border-stone-200 max-w-2xl mx-auto">
          <p>&copy; {new Date().getFullYear()} releafcanna.com. Educational programmatic directory. All rights reserved.</p>
          <p className="mt-2 text-stone-300 italic">Legal Disclaimer: This research information is cataloged for botanical study and academic evaluation. It does not constituent clinical advice or patient recommendations.</p>
        </footer>

      </div>
    </div>
  );
}
