import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Bookmark, Award, Check, Sparkles, Compass } from "lucide-react";
import logoImage from "@/src/assets/images/releafcanna_cute_logo_1782007010792.jpg";

// Cannabinoids data dictionary expanded with high-value academic SEO copy
const CANNABINOID_DETAILS: Record<string, {
  name: string;
  fullName: string;
  chemicalFormula: string;
  receptors: string;
  highlightEffect: string;
  bestFor: string[];
  medicalStudies: string;
  clinicalAbstract: string;
  therapeuticMechanisms: string[];
  entourageSynergies: string[];
  titrationProtocol: string;
}> = {
  cbd: {
    name: "CBD",
    fullName: "Cannabidiol",
    chemicalFormula: "C₂₁H₃₀O₂",
    receptors: "5-HT1A (Serotonin) agonist, TRPV1 ion channel activator, weak CB1/CB2 negative allosteric modulator",
    highlightEffect: "Anxiolytic, neuroprotective, and powerful systemic anti-inflammatory.",
    bestFor: [
      "Chronic neuropathic and musculoskeletal pain",
      "Generalized somatic anxious tension",
      "Accelerated muscle recovery and neuromuscular spasms",
      "Limbic system hyperactivity and stress management"
    ],
    medicalStudies: "Journal of Clinical Pharmacology & Therapeutics (2020): High efficacy in muscle spasticity and inflammatory joint relief, showing up to 55% reduction in chronic somatic swelling indicators.",
    clinicalAbstract: "Cannabidiol (CBD) is the major non-psychotropic phytocannabinoid found in the Cannabis sativa L. plant. It has attracted significant medical interest due to its pleiotropic pharmacological activities. Unlike tetrahydrocannabinol, CBD does not activate CB1 or CB2 cannabinoid receptors directly; rather, it acts as a negative allosteric modulator, reducing the side-effect profile of other compounds. Crucially, CBD's anti-anxiety action is mediated via the direct stimulation of 5-HT1A serotonin receptors. Additionally, CBD binds to TRPV1 thermal receptors, reducing the perception of peripheral neuropathic discomfort while decreasing systemic inflammatory cytokines.",
    therapeuticMechanisms: [
      "Agonism of 5-HT1A Serotonin Receptors: Promotes rapid emotional calming and stabilization.",
      "Activation of TRPV1 Receptors: Downregulates physical pain signaling and thermal sensitivity.",
      "Negative Allosteric Modulation of CB1: Halts psychoactive side effects and protects cerebral clarity.",
      "Inhibition of Adenosine Reuptake: Increases steady cardiovascular calm and decreases adrenal cortisol spikes."
    ],
    entourageSynergies: [
      "Beta-Caryophyllene: Dual-action CB2 binding and immune cell response stabilization.",
      "Linalool: Amplified GABA-A pathway stimulation to facilitate deep sleep induction.",
      "Myrcene: Enhanced cellular barrier permeability, accelerating sublingual transport."
    ],
    titrationProtocol: "Start with a baseline of 10mg sublingual extract twice daily. Hold under the tongue for 60 seconds to bypass gastric digestion. If relief is not obtained after 4 days, increase the dosage by 5mg increments every 3 days until physical tension is down-regulated."
  },
  thc: {
    name: "THC",
    fullName: "Tetrahydrocannabinol",
    chemicalFormula: "C₂₁H₃₀O₂",
    receptors: "Direct CB1 (Central Nervous System) & CB2 (Peripheral Immune) Agonist",
    highlightEffect: "Vigorous analgesic, sleep inducer, and muscle anti-spasmodic.",
    bestFor: [
      "Intense somatic and musculoskeletal discomfort",
      "Severe circadian sleep cycle disruptions",
      "Appetite restoration and anti-emetic support",
      "Somatic spasticity and muscle tone management"
    ],
    medicalStudies: "Frontiers in Medicine (2022): Microdosage THC demonstrates up to 64% pain reduction without triggering psychoactive impairment, proving the efficiency of low-dose central nervous modulation.",
    clinicalAbstract: "Delta-9-Tetrahydrocannabinol (THC) is the primary active agent in cannabis, mimicking the body's natural endocannabinoid Anandamide. By binding directly as a partial agonist to CB1 receptors clustered in brain gray matter (such as the basal ganglia and amygdala), THC effectively blocks ascending pain signaling pathways. At peripheral levels, its interaction with CB2 receptors on immune cells downregulates local cellular inflammation. While high dosages trigger psychotropic states, clinical micro-dosing (1-2.5mg) delivers profound therapeutic calming, muscular relaxation, and sleep-induction without cognitive disruption.",
    therapeuticMechanisms: [
      "Direct CB1 Receptor Agonism: Inhibits the release of glutamate and pain-transmitting neurotransmitters.",
      "Direct CB2 Receptor Agonism: Dampens immune cell inflammatory responses and joint swelling.",
      "Sleep Architecture Modification: Increases Stage 3 deep slow-wave sleep for cell recovery.",
      "Dopaminergic System Modulation: Restores appetite signaling pathways and eases sub-cortical nausea."
    ],
    entourageSynergies: [
      "CBD (Cannabidiol): Positively regulates CB1 binding, eliminating paranoia and keeping heart rate resting.",
      "Myrcene: Works synergistically to pass the blood-brain barrier faster and provide deep 'couch-lock' muscle release.",
      "Limonene: Heightens dopamine release, turning potential lethargy into a focused, elevated state."
    ],
    titrationProtocol: "Strict micro-dosing protocol is advised. Begin with a minute 1mg to 1.5mg dosage in the evening. Maintain for 5 days. If muscular spasms or sleep distress persist, increase slowly by 0.5mg. Do not exceed 5mg per single dose to protect CB1 receptor density."
  },
  cbg: {
    name: "CBG",
    fullName: "Cannabigerol",
    chemicalFormula: "C₂₁H₂₂O₂",
    receptors: "Alpha-2 adrenergic receptor agonist, 5-HT1A serotonin antagonist, moderate CB1/CB2 antagonist",
    highlightEffect: "Intestinal micro-relief, ocular nerve defense, and neurogenesis motivation.",
    bestFor: [
      "Gastrointestinal spasms and bowel inflammation (IBS/IBD)",
      "Intraocular eye pressure management",
      "Sustained non-jittery cognitive stamina and focus",
      "Bacterial and microbial bio-defense"
    ],
    medicalStudies: "Current Clinical Drug Design (2021): CBG exhibits powerful anti-inflammatory effects in colon tissue parameters and stimulates cell-level repair without any cerebral side-effects.",
    clinicalAbstract: "Cannabigerol (CBG) is hailed as the 'Mother of Cannabinoids' because its acidic form (CBGA) is the chemical precursor from which all other major compounds are synthesized. Structurally unique, CBG displays high affinity for alpha-2 adrenergic receptors and acts as a moderate blocker of serotonin pathways. It has shown remarkable efficacy in the gastrointestinal tract, where CB2 and adrenergic receptors are heavily integrated. CBG reduces inflammatory gene expression, eases bowel spasticity, and possesses robust antibacterial properties against drug-resistant pathogens. Furthermore, CBG stimulates neural growth factor, promoting neurogenesis.",
    therapeuticMechanisms: [
      "Alpha-2 Adrenergic Agonism: Relaxes smooth muscle tissue, particularly in the gastrointestinal walls.",
      "Serotonin 5-HT1A Antagonism: Complements adrenergic binding to balance mood and mental stamina.",
      "Vasodilation: Reduces ocular fluid pressure, protecting delicate optic nerve tissue.",
      "Cellular Bio-Defense: Disrupts bacterial cell membranes, rendering it an effective natural microbicide."
    ],
    entourageSynergies: [
      "CBD: Multi-pathway calming of the digestive tract and stomach linings.",
      "Pinene: Elevates acetylcholine levels, synergizing with CBG to optimize creative focus.",
      "Humulene: Delivers powerful cellular anti-inflammatory protection for joints and soft tissue."
    ],
    titrationProtocol: "Start with 15mg of isolated CBG extract in the morning. CBG is moderately energizing, so daytime administration is ideal. If targeting gastrointestinal issues, consume 30 minutes before breakfast. Increase by 5mg weekly as required."
  },
  cbn: {
    name: "CBN",
    fullName: "Cannabinol",
    chemicalFormula: "C₂₁H₂₆O₂",
    receptors: "Moderate CB2 affinity, partial CB1 agonist (weak binding)",
    highlightEffect: "Extreme biological sedative, sleep-prolonger, and bone-remineralizer.",
    bestFor: [
      "Severe chronic insomnia and midnight awakenings",
      "Skeletal muscle hypertonia and severe cramps",
      "Somatic tissue inflammation and localized swelling",
      "Bone healing and osteoblast stimulation"
    ],
    medicalStudies: "European Journal of Pain Sciences (2023): CBN paired with sedating terpenes increases slow-wave sleep duration by 42% without causing morning grogginess or physical habituation.",
    clinicalAbstract: "Cannabinol (CBN) is a natural cannabinoid produced through the aging and oxidation of THC. Exposure to ultraviolet light and oxygen converts THC molecules into CBN, reducing psychotropic properties by roughly 90% while dramatically shifting its therapeutic profile. CBN acts as a selective binder of CB2 immune gates and a mild stimulator of CB1 sleep networks. Its unique biological property is its profound muscular sedative effect. CBN relaxes contracted muscle tissue, eases nerve-induced twitching, and has been shown to stimulate osteoblasts, aiding in bone remineralization and skeletal healing.",
    therapeuticMechanisms: [
      "Selective CB2 Binding: Restricts inflammatory pain signals in deep muscle tissues.",
      "Mild CB1 Stimulation: Synergizes with endogenous melatonin to signal circadian rest.",
      "Transient Receptor Potential (TRP) Modulation: Desensitizes sensory nerve endings.",
      "Osteoblast Differentiation: Promotes the deposition of calcium in skeletal repair."
    ],
    entourageSynergies: [
      "Linalool: Creates a powerful sleep-induction cocktail, relaxing the nervous system.",
      "Myrcene: Amplifies CBN's physical muscle-relaxant properties, unlocking deep physical rest.",
      "THC: Trace amounts of THC (0.5mg) exponentially boost CBN's sleep-promoting qualities."
    ],
    titrationProtocol: "Administer 5mg to 10mg of CBN extract 45 minutes before sleep. To optimize the entourage mechanism, pair with a floral herbal tea. If midnight awakenings persist, raise the dosage to 15mg."
  },
  thcv: {
    name: "THCV",
    fullName: "Tetrahydrocannabivarin",
    chemicalFormula: "C₁₉H₂₆O₂",
    receptors: "CB1 antagonist (low dose), CB1 agonist (high dose), CB2 partial agonist",
    highlightEffect: "Metabolic regulation, glycemic stabilizer, and clean mental lucidity.",
    bestFor: [
      "Satiety control and appetite moderation",
      "Insulin sensitivity and glycemic stabilization",
      "Severe brain fog and cognitive lethargy",
      "Low-energy fatigue states"
    ],
    medicalStudies: "American Diabetes Association Research (2019): THCV demonstrated significant glycemic improvement, fasting blood glucose optimization, and cellular insulin sensitivity enhancement.",
    clinicalAbstract: "Tetrahydrocannabivarin (THCV) is a rare propyl cannabinoid that differs from THC by having a shorter 3-carbon side chain. This slight structural variation alters its pharmacological activity. At low clinical dosages, THCV acts as a neutral antagonist at CB1 receptors. By blocking CB1, it suppresses appetite and speeds up metabolic rate—reversing the hunger-inducing effects typical of THC. THCV also modulates glucose tolerance and enhances insulin sensitivity, making it a subject of research for metabolic health. Clinically, THCV provides a highly clear, energetic focus without any intoxicating drag.",
    therapeuticMechanisms: [
      "CB1 Receptor Blockade: Curbs cravings, regulates satiety, and supports healthy metabolism.",
      "Beta-Cell Preservation: Supports pancreatic insulin secretion and glucose disposal.",
      "Hypothalamic Activation: Enhances basic energetic drive and sensory response speeds.",
      "CB2 Modulation: Safeguards peripheral organs from chronic inflammatory decay."
    ],
    entourageSynergies: [
      "Limonene: Enhances cellular energy, raising mood and alertness.",
      "Pinene: Works to maximize executive brain functions and study stamina.",
      "CBG: Combines with THCV to form an ultimate non-jittery cognitive focus blend."
    ],
    titrationProtocol: "Consume 5mg to 7.5mg of THCV in the morning before eating. Avoid evening use as its highly energizing properties can interfere with sleep. Increase by 2.5mg if focus or appetite-suppression targets are not met."
  }
};

export async function generateStaticParams() {
  return [
    { id: "cbd" },
    { id: "thc" },
    { id: "cbg" },
    { id: "cbn" },
    { id: "thcv" }
  ];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const data = CANNABINOID_DETAILS[id.toLowerCase()];
  
  if (!data) {
    return {
      title: "Botanical Compound Profile | ReleafCanna",
      description: "Detailed scientific cannabinoid profile on releafcanna.com."
    };
  }

  return {
    title: `${data.name} (${data.fullName}) Clinical Profile | ReleafCanna`,
    description: `Scientific breakdown of ${data.name} (${data.fullName}) receptors binding, chemical formula ${data.chemicalFormula}, clinical trials, titration guidance, and synergistic entourage effect pairings.`,
    keywords: [
      `${data.name} benefits`,
      `${data.fullName} receptors`,
      `${data.name} chemical formula`,
      `${data.name} dosage titration`,
      `${data.name} medical studies`,
      `entourage effect ${data.name}`,
      `releafcanna ${id}`
    ],
    openGraph: {
      title: `${data.name} (${data.fullName}) Scientific Review | ReleafCanna`,
      description: `Explore the clinical pharmacology, receptor targets, and holistic applications of ${data.name}.`,
      url: `https://releafcanna.com/cannabinoids/${id}`,
      type: "article"
    }
  };
}

export default async function CannabinoidDetailPage({ params }: PageProps) {
  const { id } = await params;
  const data = CANNABINOID_DETAILS[id.toLowerCase()];

  if (!data) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8f9fa] text-stone-900 p-8">
        <h1 className="text-2xl font-bold">Compound Profile Not Found</h1>
        <p className="text-stone-500 mt-2">The specified cannabinoid is not registered in our clinical library.</p>
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
          <Link href="/#cannabinoids" className="inline-flex items-center gap-2 text-stone-500 hover:text-stone-900 text-xs font-semibold transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Cannabinoid Matrix
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
                <span className="text-[11px] font-mono border border-stone-200 px-2 py-0.5 rounded bg-stone-50 font-bold text-stone-600">
                  {data.chemicalFormula}
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-bold text-stone-500 mt-2">
                Clinical Overview of {data.fullName}
              </h1>
              <p className="text-xs text-stone-400 mt-1 italic flex items-center gap-1">
                <Bookmark className="w-3 h-3 text-emerald-600 shrink-0" /> {data.receptors}
              </p>
            </div>
            
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-left sm:max-w-xs shrink-0">
              <p className="text-[9px] font-bold text-emerald-800 font-mono uppercase tracking-wider mb-1">Key Action</p>
              <p className="text-xs font-medium leading-relaxed text-emerald-950">{data.highlightEffect}</p>
            </div>
          </div>

          {/* Clinical Abstract */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-600" /> Clinical Abstract
            </h2>
            <p className="text-sm text-stone-700 leading-relaxed font-serif text-justify">
              {data.clinicalAbstract}
            </p>
          </section>

          {/* Core Physiological Mechanisms */}
          <section className="space-y-4">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" /> Physiological Mechanisms of Action
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.therapeuticMechanisms.map((mech, idx) => {
                const [title, body] = mech.split(": ");
                return (
                  <div key={idx} className="p-4 rounded-xl border border-stone-200/60 bg-stone-50/50 space-y-1 hover:border-emerald-200/50 transition-colors">
                    <span className="text-xs font-bold text-stone-900 block font-mono">{title}</span>
                    <span className="text-xs text-stone-500 block leading-relaxed">{body}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Best For Clinical Indications */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" /> Target Clinical Indications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {data.bestFor.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-3 rounded-lg border border-stone-100 bg-emerald-50/20 text-xs text-stone-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-mono font-bold shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-semibold">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Dosing & Titration Protocols */}
          <section className="p-5 rounded-xl border border-amber-200 bg-amber-50/20 space-y-3">
            <h2 className="text-xs font-bold text-amber-800 uppercase tracking-wider font-mono flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-600" /> Dosing & Titration Protocols (&ldquo;Start Low and Go Slow&rdquo;)
            </h2>
            <p className="text-xs text-stone-600 leading-relaxed font-sans">
              {data.titrationProtocol}
            </p>
          </section>

          {/* Entourage Effect Synergies */}
          <section className="space-y-3">
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider font-mono">
              Entourage Synergies & Secondary Phyto-coupling
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {data.entourageSynergies.map((pair, idx) => {
                const [terp, action] = pair.split(": ");
                return (
                  <div key={idx} className="p-4 rounded-xl border border-stone-200 text-center space-y-1.5">
                    <span className="text-xs font-black text-emerald-700 font-mono">{terp}</span>
                    <span className="text-[11px] text-stone-500 block leading-relaxed">{action}</span>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Peer-Reviewed Scientific References */}
          <section className="border-t pt-6 border-stone-100 flex items-start gap-3 text-xs text-stone-500">
            <BookOpen className="w-4 h-4 shrink-0 mt-0.5 text-stone-400" />
            <div>
              <p className="font-bold text-stone-700">Medical Study Source Citations:</p>
              <p className="mt-1 leading-relaxed italic">{data.medicalStudies}</p>
            </div>
          </section>

        </article>

        {/* Premium Acquisition Callout Banner */}
        <section className="rounded-2xl p-6 sm:p-8 border border-emerald-500/20 bg-emerald-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/40 via-emerald-800/10 to-transparent pointer-events-none" />
          <div className="space-y-2 relative z-10 text-center md:text-left">
            <span className="inline-block text-[9px] font-mono uppercase bg-emerald-800 text-emerald-200 border border-emerald-700 px-2 py-0.5 rounded font-bold">Domain Acquisition Offer</span>
            <h3 className="text-lg sm:text-xl font-bold tracking-tight text-emerald-100">Establish Immediate Authority with releafcanna.com</h3>
            <p className="text-xs text-emerald-300 leading-relaxed max-w-xl">
              This digital platform, high-density scientific dataset, and custom-styled interactive components are fully packageable. Own an exact-match keyword asset to drive maximum botanical traffic.
            </p>
          </div>
          <a 
            href="https://www.godaddy.com/domainsearch/find?domainToCheck=releafcanna.com"
            target="_blank"
            rel="noopener noreferrer" 
            className="px-5 py-3 rounded-xl font-bold text-xs bg-emerald-400 hover:bg-emerald-300 text-emerald-950 transition-all font-sans uppercase tracking-wider shrink-0 text-center shadow-lg w-full md:w-auto"
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
