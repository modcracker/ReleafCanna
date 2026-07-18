import { CONDITIONS } from "@/lib/data";
import { Leaf, Shield, ArrowLeft, ArrowUpRight, HeartPulse, Brain, Info } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import HashtagCrossLinker from "@/app/components/HashtagCrossLinker";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Map of all 40 search-optimized programmatic SEO conditions from sitemap to the 12 core clinical entities in lib/data.ts
const CONDITION_MAP: Record<string, { parentId: string; displayName: string }> = {
  // Pain parent (pain)
  "pain": { parentId: "pain", displayName: "Chronic Pain & Neuropathy" },
  "chronic-pain": { parentId: "pain", displayName: "Chronic Pain Syndrome" },
  "neuropathic-pain": { parentId: "pain", displayName: "Neuropathic Nerve Pain" },
  "rheumatoid-arthritis": { parentId: "pain", displayName: "Rheumatoid Arthritis Pain" },
  "athletic-soreness": { parentId: "pain", displayName: "Athletic Muscle Soreness" },
  "menstrual-cramps": { parentId: "pain", displayName: "Menstrual Cramps & Pelvic Pain" },

  // Anxiety parent (anxiety)
  "anxiety": { parentId: "anxiety", displayName: "Anxiety & Stress" },
  "generalized-anxiety": { parentId: "anxiety", displayName: "Generalized Anxiety Disorder (GAD)" },
  "panic-disorder": { parentId: "anxiety", displayName: "Panic Disorder & Panic Attacks" },
  "social-anxiety": { parentId: "anxiety", displayName: "Social Anxiety & Performance Stress" },
  "stress-hypertension": { parentId: "anxiety", displayName: "Stress-Induced Hypertension" },

  // Insomnia parent (insomnia)
  "insomnia": { parentId: "insomnia", displayName: "Insomnia & Sleep Disorders" },
  "sleep-onset-delay": { parentId: "insomnia", displayName: "Sleep Onset Delay" },
  "circadian-disruption": { parentId: "insomnia", displayName: "Circadian Rhythm Disruption" },
  "restless-leg-syndrome": { parentId: "insomnia", displayName: "Restless Leg Syndrome (RLS)" },

  // Inflammation parent (inflammation)
  "inflammation": { parentId: "inflammation", displayName: "Systemic Inflammation" },
  "joint-stiffness": { parentId: "inflammation", displayName: "Joint Stiffness & Swelling" },
  "osteoporosis-bone-loss": { parentId: "inflammation", displayName: "Osteoporosis & Bone Density Support" },
  "allergic-dermatitis": { parentId: "inflammation", displayName: "Allergic Dermatitis & Skin Inflammation" },
  "psoriasis-plaques": { parentId: "inflammation", displayName: "Psoriasis Plaques & Skin Irritation" },
  "sebum-acne-control": { parentId: "inflammation", displayName: "Sebum Regulation & Acne Control" },
  "sinus-inflammation": { parentId: "inflammation", displayName: "Sinus Inflammation & Congestion" },
  "autoimmune-inflammation": { parentId: "inflammation", displayName: "Autoimmune Inflammation Pathways" },
  "geriatric-stiff-joints": { parentId: "inflammation", displayName: "Geriatric Stiff Joints & Arthritis" },

  // Focus parent (focus)
  "focus": { parentId: "focus", displayName: "ADHD, Brain Fog & Mental Fatigue" },
  "chronic-fatigue": { parentId: "focus", displayName: "Chronic Fatigue Syndrome" },
  "mental-brain-fog": { parentId: "focus", displayName: "Cognitive Brain Fog" },
  "adhd-focus-deficit": { parentId: "focus", displayName: "ADHD & Focus Deficits" },
  "bronchial-asthma": { parentId: "focus", displayName: "Bronchial Respiration Focus" },
  "metabolic-syndrome": { parentId: "focus", displayName: "Metabolic Syndrome & Energy Balance" },
  "insulin-resistance": { parentId: "focus", displayName: "Insulin Resistance & Satiety Focus" },

  // Migraine parent (migraine)
  "migraine": { parentId: "migraine", displayName: "Migraines & Vascular Headaches" },
  "migraine-headaches": { parentId: "migraine", displayName: "Vascular Migraine Headaches" },
  "tension-headaches": { parentId: "migraine", displayName: "Tension Headaches" },

  // Epilepsy parent (epilepsy)
  "epilepsy": { parentId: "epilepsy", displayName: "Epilepsy & Seizure Disorders" },
  "neurodegenerative-decline": { parentId: "epilepsy", displayName: "Neurodegenerative Decline Support" },
  "neurological-tremors": { parentId: "epilepsy", displayName: "Neurological Tremors & Spasms" },

  // Appetite parent (appetite)
  "appetite": { parentId: "appetite", displayName: "Appetite Loss & Nausea" },
  "appetite-suppression": { parentId: "appetite", displayName: "Appetite Regulation & Satiety" },
  "nausea-and-emesis": { parentId: "appetite", displayName: "Nausea & Emesis Relief" },

  // PTSD parent (ptsd)
  "ptsd": { parentId: "ptsd", displayName: "PTSD & Trauma Recovery" },

  // Muscle spasms parent (muscle-spasms)
  "muscle-spasms": { parentId: "muscle-spasms", displayName: "Muscle Spasms & Spasticity" },
  "ms-spasticity": { parentId: "muscle-spasms", displayName: "Multiple Sclerosis Spasticity" },

  // Fibromyalgia parent (fibromyalgia)
  "fibromyalgia": { parentId: "fibromyalgia", displayName: "Fibromyalgia Symptoms" },

  // Glaucoma parent (glaucoma)
  "glaucoma": { parentId: "glaucoma", displayName: "Glaucoma & Intraocular Pressure" }
};

export async function generateStaticParams() {
  return Object.keys(CONDITION_MAP).map((key) => ({
    id: key,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const targetId = id.toLowerCase();
  const mapEntry = CONDITION_MAP[targetId];
  
  if (!mapEntry) {
    return {
      title: "Symptom Mapping Profile | ReleafCanna",
      description: "Understand medical cannabis symptom science on releafcanna.com."
    };
  }
  
  const parentCondition = CONDITIONS.find((c) => c.id === mapEntry.parentId);
  if (!parentCondition) {
    return {
      title: `${mapEntry.displayName} | ReleafCanna`,
    };
  }

  const title = `${mapEntry.displayName} Cannabis Therapy & Receptors | ReleafCanna`;
  const desc = `Learn how medical cannabis active compounds help treat ${mapEntry.displayName}. Discover recommended cannabinoid profiles (${parentCondition.cannabinoids.join(", ")}) and target terpenes (${parentCondition.terpenes.join(", ")}) for natural symptom management.`;
  
  return {
    title,
    description: desc,
    keywords: [
      `${mapEntry.displayName} cannabis`,
      `${mapEntry.displayName} CBD`,
      `${mapEntry.displayName} medical marijuana`,
      `entourage effect for ${targetId}`,
      ...parentCondition.cannabinoids.map(c => `${c} for ${targetId}`),
      `releafcanna ${targetId}`
    ],
    alternates: {
      canonical: `https://releafcanna.com/conditions/${targetId}`,
    },
    openGraph: {
      title,
      description: desc,
      url: `https://releafcanna.com/conditions/${targetId}`,
      siteName: "ReleafCanna",
      locale: "en_US",
      type: "article"
    }
  };
}

export default async function ConditionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const targetId = id.toLowerCase();

  const mapEntry = CONDITION_MAP[targetId];
  if (!mapEntry) {
    notFound();
  }

  const condition = CONDITIONS.find((c) => c.id.toLowerCase() === mapEntry.parentId);
  if (!condition) {
    notFound();
  }

  // Construct MedicalCondition JSON-LD schema with real production domain
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "@id": `https://releafcanna.com/conditions/${targetId}`,
    "name": mapEntry.displayName,
    "description": condition.description,
    "possibleTreatment": [
      {
        "@type": "MedicalTherapy",
        "name": `Cannabinoid and Terpene Synergistic Treatment (${condition.cannabinoids.concat(condition.terpenes).join(", ")})`,
        "description": condition.scienceNote
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Dynamic JSON-LD script for SEO crawling */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white sticky top-0 z-50 px-4 py-4 md:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 group transition-all" id="conditions-header-logo">
            <Leaf className="w-5 h-5 text-emerald-500 group-hover:scale-105 transition-transform" />
            <span className="font-display font-bold text-sm text-slate-900">ReleafCanna Symptom Index</span>
          </Link>
        </div>
      </header>

      {/* CONTENT BODY */}
      <main className="flex-grow max-w-3xl mx-auto px-4 py-12 w-full space-y-8">
        {/* CONDITION NAME HEADER */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border text-cyan-700 bg-cyan-500/10 border-cyan-500/20 flex items-center gap-1">
              <HeartPulse className="w-3 h-3" />
              Symptom Profile
            </span>
          </div>
          
          <h1 className="font-display font-black text-3xl md:text-5xl text-slate-900 tracking-tight leading-none mt-2">
            Symptom Mapping: <span className="bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">{mapEntry.displayName}</span>
          </h1>
          <p className="text-slate-600 text-sm leading-relaxed max-w-xl">
            {condition.description}
          </p>
        </div>

        {/* RECOGNIZED SYNERGISTIC CHEMISTRY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RECOMMENDED CANNABINOIDS */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-600" />
              Primary Cannabinoids
            </h3>
            <div className="flex flex-wrap gap-2">
              {condition.cannabinoids.map((c) => (
                <Link
                  key={c}
                  href={`/compounds/${c.toLowerCase()}`}
                  className="text-xs bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/20 font-semibold transition-all flex items-center gap-1"
                >
                  {c}
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              These active cannabinoids bind directly to the CB1 and CB2 receptors of the endocannabinoid system to help regulate homeostasis, pain receptors, and neurotransmitters associated with {mapEntry.displayName}.
            </p>
          </div>

          {/* RECOMMENDED TERPENES */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-cyan-600" />
              Targeted Terpenes
            </h3>
            <div className="flex flex-wrap gap-2">
              {condition.terpenes.map((t) => (
                <Link
                  key={t}
                  href={`/compounds/${t.toLowerCase()}`}
                  className="text-xs bg-cyan-500/10 text-cyan-700 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg border border-cyan-500/20 font-semibold transition-all flex items-center gap-1"
                >
                  {t}
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              ))}
            </div>
            <p className="text-xs text-slate-600 leading-normal">
              Aromatic hydrocarbons that cross the blood-brain barrier to modulate the action of cannabinoids. They enhance therapeutic efficacy while preventing secondary undesirable side effects.
            </p>
          </div>
        </div>

        {/* ENTOURAGE EFFECT CLINICAL STUDY EXPOSITION */}
        <section className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-purple-600" />
            The Entourage Effect Science
          </h2>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed">
            {condition.scienceNote}
          </p>
          <div className="border-t border-slate-100 pt-4 flex items-start gap-2.5 text-xs text-slate-500">
            <Info className="w-4.5 h-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <span>
              The Entourage Effect describes the empirical biochemical synergy where whole-plant cannabis compounds operate far more effectively together than as isolated single cannabinoids.
            </span>
          </div>
        </section>

        {/* BIOCHEMICAL INDEX & SEO HASHTAG NETWORK */}
        <HashtagCrossLinker initialTag={mapEntry.parentId} isDarkTheme={false} />

        {/* GO-DADDY ACQUISITION OFFER FOR HIGHEST CONVERSION */}
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

        {/* CALL TO ACTION */}
        <div className="pt-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-md">
            Calculate Strains for {mapEntry.displayName.split(" & ")[0]}
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-100 py-8 px-4 text-center text-slate-600 text-xs mt-12">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500" />
            <span>Secure Medical Cannabis Science Index</span>
          </div>
          <p>© 2026 ReleafCanna. All rights reserved. Always consult with a certified medical health professional before adopting any cannabinoid-based therapies.</p>
        </div>
      </footer>
    </div>
  );
}
