import { CANNABINOIDS, TERPENES } from "@/lib/data";
import { Leaf, Flame, Shield, ArrowLeft, ArrowUpRight, Award, Activity } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const compList = [
    ...CANNABINOIDS.map((c) => ({ id: c.id.toLowerCase() })),
    ...TERPENES.map((t) => ({ id: t.id.toLowerCase() })),
  ];
  return compList;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const targetId = id.toLowerCase() === "beta-caryophyllene" ? "caryophyllene" : id.toLowerCase();
  
  const cannabinoid = CANNABINOIDS.find((c) => c.id.toLowerCase() === targetId);
  const terpene = TERPENES.find((t) => t.id.toLowerCase() === targetId);
  
  if (!cannabinoid && !terpene) {
    return {
      title: "Botanical Profile Not Found | ReleafCanna",
      description: "Detailed scientific compound profiles on releafcanna.com."
    };
  }
  
  const name = cannabinoid ? cannabinoid.name : terpene!.name;
  const fullName = cannabinoid ? cannabinoid.fullName : (terpene!.name === "Caryophyllene" ? "Beta-Caryophyllene" : terpene!.aroma);
  const typeLabel = cannabinoid ? "Phyto-Cannabinoid" : "Therapeutic Terpene";
  const desc = cannabinoid
    ? `Discover ${name} (${fullName}) boiling point, molecular benefits, medical receptor binding, and top cultivars high in this active cannabinoid compound.`
    : `Explore ${name} terpene boiling point, olfactory aroma profile, effects, and medical cannabis strains rich in this synergistic hydrocarbon.`;
    
  return {
    title: `${name} (${typeLabel}) Profile, Decarboxylation & Medical Benefits | ReleafCanna`,
    description: desc,
    keywords: [
      `${name} benefits`,
      `${name} boiling point`,
      `${name} medical use`,
      `entourage effect ${name}`,
      `releafcanna ${targetId}`
    ],
    alternates: {
      canonical: `https://releafcanna.com/compounds/${id.toLowerCase()}`,
    },
    openGraph: {
      title: `${name} (${typeLabel}) Profile, Decarboxylation & Medical Science | ReleafCanna`,
      description: desc,
      url: `https://releafcanna.com/compounds/${id.toLowerCase()}`,
      siteName: "ReleafCanna",
      locale: "en_US",
      type: "article",
    }
  };
}

export default async function CompoundDetailPage({ params }: PageProps) {
  const { id } = await params;
  const originalId = id.toLowerCase();
  const targetId = originalId === "beta-caryophyllene" ? "caryophyllene" : originalId;

  // --- 301 REDIRECTS FOR TOP COUPLING TO PRESERVE LINK EQUITY & REMOVE DUPLICATION ---
  const customCannabinoids = ["cbd", "thc", "cbg", "cbn", "thcv"];
  const customTerpenes = ["myrcene", "limonene", "linalool", "pinene", "humulene"];
  
  if (customCannabinoids.includes(targetId)) {
    redirect(`/cannabinoids/${targetId}`);
  }
  
  if (targetId === "caryophyllene" || targetId === "beta-caryophyllene") {
    redirect("/terpenes/beta-caryophyllene");
  }
  
  if (customTerpenes.includes(targetId)) {
    redirect(`/terpenes/${targetId}`);
  }

  // Search in Cannabinoids and Terpenes
  const cannabinoid = CANNABINOIDS.find((c) => c.id.toLowerCase() === targetId);
  const terpene = TERPENES.find((t) => t.id.toLowerCase() === targetId);

  if (!cannabinoid && !terpene) {
    notFound();
  }

  const isCannabinoid = !!cannabinoid;
  const data = cannabinoid
    ? {
        name: cannabinoid.name,
        fullName: cannabinoid.fullName,
        typeLabel: "Cannabinoid Compound",
        category: cannabinoid.psychoactive ? "Psychoactive" : "Non-Psychoactive",
        boilingPoint: cannabinoid.boilingPoint,
        description: cannabinoid.description,
        keyAttributes: cannabinoid.benefits,
        bestStrains: cannabinoid.bestStrains,
        colorClass: "text-emerald-700 bg-emerald-500/10 border-emerald-500/20",
        accentGradient: cannabinoid.color,
      }
    : {
        name: terpene!.name,
        fullName: terpene!.aroma,
        typeLabel: "Aromatic Terpene",
        category: "Synergistic Hydrocarbon",
        boilingPoint: terpene!.boilingPoint,
        description: terpene!.description,
        keyAttributes: terpene!.effects,
        bestStrains: terpene!.bestStrains,
        colorClass: "text-cyan-700 bg-cyan-500/10 border-cyan-500/20",
        accentGradient: "from-cyan-600 to-blue-700",
      };

  // Construct DefinedTerm JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `https://releafcanna.com/compounds/${targetId}`,
    "name": data.name,
    "alternateName": data.fullName,
    "description": data.description,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": isCannabinoid ? "ReleafCanna Cannabinoid Biochemical Library" : "ReleafCanna Terpene Aromatic Science Library",
      "url": `https://releafcanna.com/${isCannabinoid ? "?tab=cannabinoids" : "?tab=terpenes"}`
    }
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
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 group transition-all" id="compounds-header-logo">
            <Leaf className="w-5 h-5 text-emerald-500 group-hover:scale-105 transition-transform" />
            <span className="font-display font-bold text-sm text-slate-900">ReleafCanna Science</span>
          </Link>
        </div>
      </header>

      {/* CONTENT BODY */}
      <main className="flex-grow max-w-3xl mx-auto px-4 py-12 w-full space-y-8">
        {/* BREADCRUMBS & TYPE BADGE */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border ${data.colorClass}`}>
              {data.typeLabel}
            </span>
            <span className="text-[10px] text-slate-600 font-medium uppercase tracking-wider px-2.5 py-1 rounded border border-slate-200 bg-slate-100">
              {data.category}
            </span>
          </div>
          
          <h1 className="font-display font-black text-4xl md:text-5xl text-slate-900 tracking-tight leading-none mt-2">
            Scientific Profile: <span className={`bg-gradient-to-r ${data.accentGradient} bg-clip-text text-transparent`}>{data.name}</span>
          </h1>
          <p className="text-sm text-slate-600 italic">
            {isCannabinoid ? "Systematic chemical denomination:" : "Olfactory and sensory profile:"} <strong className="text-slate-800 font-semibold not-italic">{data.fullName}</strong>
          </p>
        </div>

        {/* SCIENTIFIC EXPOSITION */}
        <section className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-600" />
            Biochemical Mechanism & Description
          </h2>
          <p className="text-slate-700 text-sm md:text-base leading-relaxed">
            {data.description}
          </p>
        </section>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BOILING POINT & STIMULATION */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              Thermal Decarboxylation
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-black text-slate-900 tracking-tight">
                {data.boilingPoint}
              </p>
              <p className="text-xs text-slate-600 leading-normal">
                This indicates the specific vaporization and activation boiling point of the compound. Heating below this point prevents the compound from evaporating, while overheating degrades its chemical efficacy.
              </p>
            </div>
          </div>

          {/* TARGETED MEDICAL RELIEF / ADVANTAGES */}
          <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-600" />
              {isCannabinoid ? "Targeted Relief Properties" : "Therapeutic Benefits"}
            </h3>
            <ul className="space-y-2">
              {data.keyAttributes.map((attr, idx) => (
                <li key={idx} className="text-xs text-slate-700 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {attr}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* TOP EXPRESSING CULTIVARS */}
        <section className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
            Common Expressing Strains (Cultivars)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.bestStrains.map((strain, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 px-4 py-3 rounded-xl flex items-center justify-between">
                <span className="text-xs text-slate-800 font-bold">{strain}</span>
                <span className="text-[10px] text-emerald-600 uppercase font-extrabold tracking-wider">Rich Expression</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 leading-normal pt-2">
            These strains have been selected based on laboratory chromatography testing confirming their high expression percentage of {data.name}.
          </p>
        </section>

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
            Launch ReleafCanna Patient Advisor
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
