import { CANNABINOIDS, TERPENES } from "@/lib/data";
import { Leaf, Flame, Shield, ArrowLeft, ArrowUpRight, Award, Activity } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CompoundDetailPage({ params }: PageProps) {
  const { id } = await params;
  const targetId = id.toLowerCase();

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
        colorClass: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
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
        colorClass: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
        accentGradient: "from-cyan-500 to-blue-600",
      };

  // Construct DefinedTerm JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": `https://releafcanna.example.com/compounds/${targetId}`,
    "name": data.name,
    "alternateName": data.fullName,
    "description": data.description,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": isCannabinoid ? "ReleafCanna Cannabinoid Biochemical Library" : "ReleafCanna Terpene Aromatic Science Library",
      "url": `https://releafcanna.example.com/${isCannabinoid ? "?tab=cannabinoids" : "?tab=terpenes"}`
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans">
      {/* Dynamic JSON-LD script for SEO crawling */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-4 py-4 md:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 group transition-all" id="compounds-header-logo">
            <Leaf className="w-5 h-5 text-emerald-400 group-hover:scale-105 transition-transform" />
            <span className="font-display font-bold text-sm text-white">ReleafCanna Science</span>
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
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider px-2.5 py-1 rounded border border-slate-900 bg-slate-900/30">
              {data.category}
            </span>
          </div>
          
          <h1 className="font-display font-black text-4xl md:text-5xl text-white tracking-tight leading-none mt-2">
            Scientific Profile: <span className={`bg-gradient-to-r ${data.accentGradient} bg-clip-text text-transparent`}>{data.name}</span>
          </h1>
          <p className="text-sm text-slate-400 italic">
            {isCannabinoid ? "Systematic chemical denomination:" : "Olfactory and sensory profile:"} <strong className="text-slate-300 font-medium not-italic">{data.fullName}</strong>
          </p>
        </div>

        {/* SCIENTIFIC EXPOSITION */}
        <section className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl space-y-4">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-emerald-400" />
            Biochemical Mechanism & Description
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            {data.description}
          </p>
        </section>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* BOILING POINT & STIMULATION */}
          <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              Thermal Decarboxylation
            </h3>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white tracking-tight">
                {data.boilingPoint}
              </p>
              <p className="text-xs text-slate-500 leading-normal">
                This indicates the specific vaporization and activation boiling point of the compound. Heating below this point prevents the compound from evaporating, while overheating degrades its chemical efficacy.
              </p>
            </div>
          </div>

          {/* TARGETED MEDICAL RELIEF / ADVANTAGES */}
          <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              {isCannabinoid ? "Targeted Relief Properties" : "Therapeutic Benefits"}
            </h3>
            <ul className="space-y-2">
              {data.keyAttributes.map((attr, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {attr}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* TOP EXPRESSING CULTIVARS */}
        <section className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl space-y-4">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Common Expressing Strains (Cultivars)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.bestStrains.map((strain, idx) => (
              <div key={idx} className="bg-slate-950 border border-slate-900 px-4 py-3 rounded-xl flex items-center justify-between">
                <span className="text-xs text-slate-200 font-semibold">{strain}</span>
                <span className="text-[10px] text-emerald-500 uppercase font-bold tracking-wider">Rich Expression</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 leading-normal pt-2">
            These strains have been selected based on laboratory chromatography testing confirming their high expression percentage of {data.name}.
          </p>
        </section>

        {/* CALL TO ACTION */}
        <div className="pt-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-lg shadow-emerald-500/5">
            Launch ReleafCanna Patient Advisor
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-4 text-center text-slate-600 text-xs mt-12">
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
