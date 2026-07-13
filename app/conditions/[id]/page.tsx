import { CONDITIONS } from "@/lib/data";
import { Leaf, Shield, ArrowLeft, ArrowUpRight, HeartPulse, Brain, Info } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ConditionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const targetId = id.toLowerCase();

  const condition = CONDITIONS.find((c) => c.id.toLowerCase() === targetId);

  if (!condition) {
    notFound();
  }

  // Construct MedicalCondition JSON-LD schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    "@id": `https://releafcanna.example.com/conditions/${targetId}`,
    "name": condition.name,
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
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 group transition-all" id="conditions-header-logo">
            <Leaf className="w-5 h-5 text-emerald-400 group-hover:scale-105 transition-transform" />
            <span className="font-display font-bold text-sm text-white">ReleafCanna Symptom Index</span>
          </Link>
        </div>
      </header>

      {/* CONTENT BODY */}
      <main className="flex-grow max-w-3xl mx-auto px-4 py-12 w-full space-y-8">
        {/* CONDITION NAME HEADER */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border text-cyan-400 bg-cyan-500/10 border-cyan-500/20 flex items-center gap-1">
              <HeartPulse className="w-3 h-3" />
              Symptom Profile
            </span>
          </div>
          
          <h1 className="font-display font-black text-3xl md:text-5xl text-white tracking-tight leading-none mt-2">
            Symptom Mapping: <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">{condition.name}</span>
          </h1>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl">
            {condition.description}
          </p>
        </div>

        {/* RECOGNIZED SYNERGISTIC CHEMISTRY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* RECOMMENDED CANNABINOIDS */}
          <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-emerald-400" />
              Primary Cannabinoids
            </h3>
            <div className="flex flex-wrap gap-2">
              {condition.cannabinoids.map((c) => (
                <Link
                  key={c}
                  href={`/compounds/${c.toLowerCase()}`}
                  className="text-xs bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/20 font-semibold transition-all flex items-center gap-1"
                >
                  {c}
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              ))}
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              These active cannabinoids bind directly to the CB1 and CB2 receptors of the endocannabinoid system to help regulate homeostasis, pain receptors, and neurotransmitters associated with {condition.name.split(" & ")[0]}.
            </p>
          </div>

          {/* RECOMMENDED TERPENES */}
          <div className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl space-y-4">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <Leaf className="w-4 h-4 text-cyan-400" />
              Targeted Terpenes
            </h3>
            <div className="flex flex-wrap gap-2">
              {condition.terpenes.map((t) => (
                <Link
                  key={t}
                  href={`/compounds/${t.toLowerCase()}`}
                  className="text-xs bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg border border-cyan-500/20 font-semibold transition-all flex items-center gap-1"
                >
                  {t}
                  <ArrowUpRight className="w-3 h-3 opacity-60" />
                </Link>
              ))}
            </div>
            <p className="text-xs text-slate-500 leading-normal">
              Aromatic hydrocarbons that cross the blood-brain barrier to modulate the action of cannabinoids. They enhance therapeutic efficacy while preventing secondary undesirable side effects.
            </p>
          </div>
        </div>

        {/* ENTOURAGE EFFECT CLINICAL STUDY EXPOSITION */}
        <section className="bg-slate-900/30 border border-slate-900 p-6 rounded-2xl space-y-4">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-purple-400" />
            The Entourage Effect Science
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed">
            {condition.scienceNote}
          </p>
          <div className="border-t border-slate-900 pt-4 flex items-start gap-2.5 text-xs text-slate-500">
            <Info className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <span>
              The Entourage Effect describes the empirical biochemical synergy where whole-plant cannabis compounds operate far more effectively together than as isolated single cannabinoids.
            </span>
          </div>
        </section>

        {/* CALL TO ACTION */}
        <div className="pt-6 text-center">
          <Link href="/" className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-lg shadow-emerald-500/5">
            Calculate Strains for {condition.name.split(" & ")[0]}
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
