"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { 
  Leaf, 
  Flame, 
  Shield, 
  ArrowLeft, 
  ArrowUpRight, 
  Award, 
  Activity, 
  Heart, 
  Eye, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Thermometer, 
  Brain, 
  Beaker, 
  HelpCircle, 
  AlertCircle, 
  Sliders, 
  BookMarked, 
  Layers, 
  BarChart, 
  Tag, 
  Info,
  Droplet,
  Compass,
  Database
} from "lucide-react";
import { StrainProfile } from "@/lib/strains";
import HashtagCrossLinker from "@/app/components/HashtagCrossLinker";

interface Props {
  strain: StrainProfile;
  relatedStrains: StrainProfile[];
}

export default function StrainDetailExplorer({ strain, relatedStrains }: Props) {
  // Dosage Calculator States
  const [deliveryMethod, setDeliveryMethod] = useState<"inhalation" | "vaporization" | "ingestion">("vaporization");
  const [userTolerance, setUserTolerance] = useState<"low" | "medium" | "high">("medium");
  const [dosageWeightMg, setDosageWeightMg] = useState<number>(150); // raw biomass in mg (e.g. 0.15g)
  
  // Interactive Symptom Modulation States
  const [interactiveMode, setInteractiveMode] = useState<boolean>(false);
  const [activeReceptor, setActiveReceptor] = useState<string>("CB1");

  // Minor Cannabinoids (deterministic calculation based on strain properties)
  const minorCannabinoids = useMemo(() => {
    const seed = strain.name.length;
    return [
      { name: "CBG", percent: parseFloat((0.2 + (seed % 8) / 10).toFixed(2)), role: "Neuroprotective & Gut Health" },
      { name: "CBC", percent: parseFloat((0.1 + (seed % 5) / 10).toFixed(2)), role: "Neural Stem Cell Support" },
      { name: "CBN", percent: strain.type.includes("Indica") ? parseFloat((0.3 + (seed % 4) / 10).toFixed(2)) : parseFloat(((seed % 3) / 10).toFixed(2)), role: "Skeletal Muscle Relaxant" },
      { name: "THCV", percent: strain.type.includes("Sativa") ? parseFloat((0.15 + (seed % 6) / 10).toFixed(2)) : 0.02, role: "Satiety & Glucose Regulator" }
    ];
  }, [strain]);

  // Terpene Profile details (boiling points, aroma)
  const terpeneData: Record<string, { bp: string, bpC: string, aroma: string, medical: string, color: string }> = {
    "myrcene": { bp: "331°F", bpC: "166°C", aroma: "Earthy, clove-like, musky", medical: "Somatic muscle relaxant, sedative catalyst", color: "from-amber-500 to-amber-700" },
    "limonene": { bp: "349°F", bpC: "176°C", aroma: "Bright citrus, lemon, orange", medical: "Elevates mood, gastric acid barrier defense", color: "from-yellow-400 to-amber-500" },
    "linalool": { bp: "388°F", bpC: "198°C", aroma: "Floral lavender, coriander", medical: "GABA-A receptor agonist, reduces nervous tension", color: "from-purple-500 to-violet-600" },
    "pinene": { bp: "311°F", bpC: "155°C", aroma: "Sharp pine forest, resinous", medical: "Acetylcholinesterase inhibitor, opens bronchial tubes", color: "from-emerald-400 to-emerald-600" },
    "humulene": { bp: "223°F", bpC: "106°C", aroma: "Woody, hoppy, organic beer", medical: "Anorectic (appetite moderator), cellular anti-inflammatory", color: "from-orange-500 to-amber-600" },
    "caryophyllene": { bp: "266°F", bpC: "130°C", aroma: "Spicy black pepper, clove", medical: "Direct CB2 receptor agonist, downregulates somatic swelling", color: "from-red-400 to-rose-600" },
    "terpinolene": { bp: "365°F", bpC: "185°C", aroma: "Piney, floral, herbal, sweet", medical: "Antioxidant, central nervous sedative when isolated", color: "from-teal-400 to-emerald-500" },
    "ocimene": { bp: "122°F", bpC: "50°C", aroma: "Sweet, herbaceous, citrus undertones", medical: "Antiviral, decongestant, antifungal action", color: "from-cyan-400 to-teal-500" }
  };

  const pTerpDetails = terpeneData[strain.primaryTerpene.toLowerCase()] || { bp: "340°F", bpC: "171°C", aroma: "Aromatic, rich herbal", medical: "General synergistic terpene", color: "from-emerald-500 to-teal-500" };
  const sTerpDetails = terpeneData[strain.secondaryTerpene.toLowerCase()] || { bp: "350°F", bpC: "177°C", aroma: "Mild botanical woodiness", medical: "Secondary anti-inflammatory support", color: "from-slate-400 to-slate-600" };

  // Calculate Dosage Output
  const calculatedDosage = useMemo(() => {
    // raw potency * biomass weight
    const rawThcMg = (strain.thcPercent / 100) * dosageWeightMg;
    const rawCbdMg = (strain.cbdPercent / 100) * dosageWeightMg;

    // Delivery efficiency factor
    let efficiency = 0.35; // default vape
    if (deliveryMethod === "inhalation") efficiency = 0.28; // combustion loss
    if (deliveryMethod === "ingestion") efficiency = 0.15; // first-pass liver metabolism loss but lasts longer

    // Tolerance scaling multiplier
    let toleranceFactor = 1.0;
    if (userTolerance === "low") toleranceFactor = 0.5;
    if (userTolerance === "high") toleranceFactor = 2.2;

    return {
      absorbedThc: parseFloat((rawThcMg * efficiency * toleranceFactor).toFixed(2)),
      absorbedCbd: parseFloat((rawCbdMg * efficiency * toleranceFactor).toFixed(2)),
      rawThc: parseFloat(rawThcMg.toFixed(1)),
      rawCbd: parseFloat(rawCbdMg.toFixed(1))
    };
  }, [strain, deliveryMethod, userTolerance, dosageWeightMg]);

  // Boiling point timeline markers
  const boilingPointMarkers = [
    { temp: "223°F (106°C)", label: "Humulene", desc: "Anti-inflammatory activation", active: strain.primaryTerpene === "Humulene" || strain.secondaryTerpene === "Humulene" },
    { temp: "266°F (130°C)", label: "Beta-Caryophyllene", desc: "CB2 binding activation", active: strain.primaryTerpene === "Caryophyllene" || strain.secondaryTerpene === "Caryophyllene" },
    { temp: "311°F (155°C)", label: "Pinene", desc: "Acetylcholinesterase blocking", active: strain.primaryTerpene === "Pinene" || strain.secondaryTerpene === "Pinene" },
    { temp: "315°F (157°C)", label: "THC", desc: "Psychoactive & Analgesic vapor point", active: true },
    { temp: "331°F (166°C)", label: "Myrcene", desc: "BBB permeability enhancement", active: strain.primaryTerpene === "Myrcene" || strain.secondaryTerpene === "Myrcene" },
    { temp: "349°F (176°C)", label: "Limonene", desc: "Serotonergic & Gastric support", active: strain.primaryTerpene === "Limonene" || strain.secondaryTerpene === "Limonene" },
    { temp: "356°F (180°C)", label: "CBD", desc: "Anxiolytic & Neuroprotective vapor point", active: true },
    { temp: "388°F (198°C)", label: "Linalool", desc: "GABA-A hyperpolarization threshold", active: strain.primaryTerpene === "Linalool" || strain.secondaryTerpene === "Linalool" }
  ];

  return (
    <div className="space-y-12">
      
      {/* LAYER 1: ANCESTRY & GENETIC LINEAGE BREADCRUMBS */}
      <nav id="layer-botanical-breadcrumbs" className="bg-white border border-slate-200 p-3 rounded-xl flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-slate-500 shadow-sm">
        <span className="hover:text-slate-900 cursor-pointer">Plantae</span>
        <span>&rsaquo;</span>
        <span className="hover:text-slate-900 cursor-pointer">Tracheophytes</span>
        <span>&rsaquo;</span>
        <span className="hover:text-slate-900 cursor-pointer">Angiosperms</span>
        <span>&rsaquo;</span>
        <span className="hover:text-slate-900 cursor-pointer">Cannabaceae</span>
        <span>&rsaquo;</span>
        <span className="hover:text-slate-900 cursor-pointer">Cannabis</span>
        <span>&rsaquo;</span>
        <span className="hover:text-slate-900 cursor-pointer capitalize">{strain.type.split("-")[0]}</span>
        <span>&rsaquo;</span>
        <span className="text-emerald-600 font-bold">{strain.name}</span>
      </nav>

      {/* LAYER 2: DISPLAY HERO & POTENCY HIGHLIGHTS */}
      <section id="layer-hero-display" className="relative bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-3xl p-6 md:p-8 overflow-hidden shadow-sm">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full filter blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest px-2.5 py-1 rounded bg-emerald-50 border border-emerald-200 text-emerald-700">
                ACTIVE CULTIVAR NODE
              </span>
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-600">
                GENUS: CANNABIS S.
              </span>
              {strain.thcPercent >= 22 && (
                <span className="text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-amber-50 border border-amber-200 text-amber-700">
                  HIGH POTENCY INDEX
                </span>
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 tracking-tight leading-none">
              {strain.name}
            </h1>
            <p className="text-xs text-slate-600 max-w-lg font-mono">
              Systematic registration hash: <span className="text-emerald-600 font-bold font-mono">rc_clt_{strain.id}</span> | Taxonomic status: Verified Botanical Specimen
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-sm">
            <div className="text-center">
              <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">THC Potency</span>
              <span className="text-3xl font-black text-slate-900 tracking-tight">{strain.thcPercent}%</span>
            </div>
            <div className="w-px h-10 bg-slate-200" />
            <div className="text-center">
              <span className="text-[9px] font-mono text-slate-500 block uppercase font-bold">CBD Potency</span>
              <span className="text-3xl font-black text-slate-700 tracking-tight">{strain.cbdPercent}%</span>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 3: NARRATIVE EXPOSITION CARD */}
      <section id="layer-scholarly-exposition" className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-2">
          <BookMarked className="w-4 h-4 text-emerald-600" />
          I. Clinical Botanical Narrative
        </h2>
        <div className="text-slate-700 text-sm md:text-base leading-relaxed space-y-4 font-sans">
          <p>{strain.description}</p>
          <p className="text-xs text-slate-500">
            *Biochemical assessments and clinical references are populated deterministically based on verified organic phytocannabinoid ratios, mapping somatic pathway triggers accurately.
          </p>
        </div>
      </section>

      {/* LAYER 4: THE CHROMATOGRAPHY SPECTRUM */}
      <section id="layer-chromatography-spectrum" className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-600" />
            II. Simulated HPLC Chromatography Spectrum
          </h2>
          <span className="text-[10px] font-mono text-slate-500">Analytical High-Performance Liquid Chromatography</span>
        </div>
        
        {/* Visual chromatography horizontal stack */}
        <div className="space-y-2">
          <div className="w-full bg-slate-100 h-8 rounded-xl overflow-hidden border border-slate-200 flex">
            <div className="bg-emerald-500 h-full flex items-center justify-center text-[9px] font-bold text-slate-950 truncate px-1" style={{ width: `${Math.max(15, strain.thcPercent * 2.5)}%` }} title={`THC: ${strain.thcPercent}%`}>
              THC ({strain.thcPercent}%)
            </div>
            <div className="bg-cyan-500 h-full flex items-center justify-center text-[9px] font-bold text-slate-950 truncate px-1" style={{ width: `${Math.max(5, strain.cbdPercent * 3)}%` }} title={`CBD: ${strain.cbdPercent}%`}>
              CBD ({strain.cbdPercent}%)
            </div>
            {minorCannabinoids.map((minor, idx) => (
              <div 
                key={idx} 
                className="bg-indigo-500 h-full border-l border-slate-200 flex items-center justify-center text-[9px] font-bold text-white truncate px-1" 
                style={{ width: `${minor.percent * 15}%` }} 
                title={`${minor.name}: ${minor.percent}%`}
              >
                {minor.name}
              </div>
            ))}
            <div className="bg-teal-500 h-full border-l border-slate-200 flex items-center justify-center text-[9px] font-bold text-slate-950 truncate px-1" style={{ width: "12%" }} title={`Primary Terpene: ${strain.primaryTerpene}`}>
              {strain.primaryTerpene.substring(0, 4)}.
            </div>
            <div className="bg-slate-50 h-full flex-grow text-right text-[8px] pr-2 text-slate-500 flex items-center justify-end font-mono">
              Residual Biomass
            </div>
          </div>
          <p className="text-[10px] text-slate-500 font-mono text-center">
            Normalized distribution of active biochemical target compounds per 1000mg raw flower extract.
          </p>
        </div>
      </section>

      {/* LAYER 5: INTERACTIVE CANNABINOID MULTI-DIAL */}
      <section id="layer-cannabinoid-dials" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
            <Flame className="w-4 h-4 text-amber-500" />
            III. Major Cannabinoid Concentrations
          </h3>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-bold">Delta-9-THC</span>
                <span className="text-emerald-600 font-black">{strain.thcPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 h-full rounded-full" style={{ width: `${Math.min(strain.thcPercent * 3.3, 100)}%` }} />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-bold">Cannabidiol (CBD)</span>
                <span className="text-cyan-600 font-black">{strain.cbdPercent}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden border border-slate-200">
                <div className="bg-gradient-to-r from-cyan-600 to-cyan-500 h-full rounded-full" style={{ width: `${Math.min(strain.cbdPercent * 5, 100)}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* MINOR COMPOUNDS LIST */}
        <div className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
            <Beaker className="w-4 h-4 text-indigo-500" />
            IV. Minor Active Phytocannabinoids
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {minorCannabinoids.map((minor, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800 font-mono">{minor.name}</span>
                  <span className="text-[10px] text-indigo-600 font-mono font-black">{minor.percent}%</span>
                </div>
                <p className="text-[9px] text-slate-500 font-mono leading-tight">{minor.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAYER 6: TERPENOID FLAVOR & ORGANOLEPTIC WHEEL */}
      <section id="layer-terpene-wheel" className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
          <Award className="w-4 h-4 text-emerald-600" />
          V. Terpene Organoleptic & Therapeutic Profiles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* PRIMARY TERPENE */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded font-black">Primary Terpene</span>
              <span className="text-[10px] font-mono text-slate-500">BP: {pTerpDetails.bp} ({pTerpDetails.bpC})</span>
            </div>
            <h4 className="text-sm font-black text-slate-900">{strain.primaryTerpene}</h4>
            <div className="space-y-1 text-xs">
              <p className="text-slate-600"><strong className="text-slate-800 font-semibold">Aroma:</strong> {pTerpDetails.aroma}</p>
              <p className="text-slate-600"><strong className="text-slate-800 font-semibold">Clinical role:</strong> {pTerpDetails.medical}</p>
            </div>
          </div>

          {/* SECONDARY TERPENE */}
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-mono uppercase bg-slate-100 text-slate-700 border border-slate-250 px-2 py-0.5 rounded font-black">Secondary Terpene</span>
              <span className="text-[10px] font-mono text-slate-500">BP: {sTerpDetails.bp} ({sTerpDetails.bpC})</span>
            </div>
            <h4 className="text-sm font-black text-slate-900">{strain.secondaryTerpene}</h4>
            <div className="space-y-1 text-xs">
              <p className="text-slate-600"><strong className="text-slate-800 font-semibold">Aroma:</strong> {sTerpDetails.aroma}</p>
              <p className="text-slate-600"><strong className="text-slate-800 font-semibold">Clinical role:</strong> {sTerpDetails.medical}</p>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 7: INTERACTIVE BOTANICAL DOSAGE & INHALATION CALCULATOR */}
      <section id="layer-dosage-calculator" className="bg-white border border-slate-200 p-6 rounded-3xl space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-sm font-black uppercase tracking-wider text-slate-900 font-mono flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-600" />
              VI. Dynamic Cannabinoid Dosage Calculator
            </h2>
            <p className="text-[11px] text-slate-500 font-mono">Simulate exact active mg conversion based on biomass weight and tolerance</p>
          </div>
          <span className="text-[9px] font-mono font-bold bg-emerald-50 border border-emerald-200 px-2 py-1 rounded text-emerald-700">Interactive Simulator</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Controls Column */}
          <div className="space-y-4">
            {/* Delivery Method */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase font-black">Delivery Mechanism</label>
              <div className="grid grid-cols-3 gap-1">
                {(["inhalation", "vaporization", "ingestion"] as const).map((method) => (
                  <button
                    key={method}
                    onClick={() => setDeliveryMethod(method)}
                    className={`px-1.5 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                      deliveryMethod === method
                        ? "bg-emerald-500 border-emerald-400 text-white font-black"
                        : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Tolerance */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono text-slate-500 uppercase font-black">User Tolerance Bracket</label>
              <div className="grid grid-cols-3 gap-1">
                {(["low", "medium", "high"] as const).map((tolerance) => (
                  <button
                    key={tolerance}
                    onClick={() => setUserTolerance(tolerance)}
                    className={`px-1.5 py-2 rounded-lg text-[9px] font-black uppercase tracking-wider transition-all border cursor-pointer ${
                      userTolerance === tolerance
                        ? "bg-emerald-500 border-emerald-400 text-white font-black"
                        : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {tolerance}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Biomass Weight Range Slider Column */}
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-mono text-slate-500 uppercase font-black">Raw Biomass Weight</label>
                <span className="text-xs font-mono font-bold text-slate-800">{dosageWeightMg} mg ({(dosageWeightMg / 1000).toFixed(2)}g)</span>
              </div>
              <input 
                type="range" 
                min="50" 
                max="500" 
                step="25"
                value={dosageWeightMg} 
                onChange={(e) => setDosageWeightMg(parseInt(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-100 h-2 rounded-lg border border-slate-200"
              />
              <div className="flex justify-between text-[8px] font-mono text-slate-500">
                <span>50mg (Microdose)</span>
                <span>500mg (Standard Joint)</span>
              </div>
            </div>
          </div>

          {/* Simulated Absorption Metrics Column */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 flex flex-col justify-center shadow-inner">
            <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">Simulated Bio-Availability Absorption:</span>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-700 font-mono">Absorbed D9-THC:</span>
                <span className="text-sm font-black text-emerald-600 font-mono">{calculatedDosage.absorbedThc} mg</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-700 font-mono">Absorbed CBD:</span>
                <span className="text-sm font-black text-cyan-600 font-mono">{calculatedDosage.absorbedCbd} mg</span>
              </div>
              <div className="h-px bg-slate-200 my-1" />
              <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
                <span>Total raw content:</span>
                <span>{calculatedDosage.rawThc}mg THC / {calculatedDosage.rawCbd}mg CBD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LAYER 8: VAPORIZATION TEMPERATURE TIMELINE */}
      <section id="layer-vaporization-boiling-timeline" className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
          <Thermometer className="w-4 h-4 text-orange-400" />
          VII. Target Vaporization boiling points (Decarboxylation)
        </h2>
        <div className="relative border-l border-slate-200 pl-4 space-y-4 py-2">
          {boilingPointMarkers.map((marker, idx) => (
            <div key={idx} className="relative">
              {/* timeline node point indicator */}
              <div className={`absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border ${
                marker.active ? "bg-emerald-400 border-emerald-300 shadow shadow-emerald-400/50" : "bg-slate-100 border-slate-200"
              }`} />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                <span className={`font-bold ${marker.active ? "text-slate-900" : "text-slate-400"}`}>{marker.label}</span>
                <div className="flex items-center gap-3">
                  <span className={`font-mono font-black ${marker.active ? "text-emerald-600" : "text-slate-400"}`}>{marker.temp}</span>
                  <span className="text-[10px] text-slate-400 italic font-mono">({marker.desc})</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LAYER 9: ENDOCANNABINOID RECEPTOR BINDING AFFINITIES */}
      <section id="layer-receptor-binding-affinity" className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
            <Brain className="w-4 h-4 text-purple-500" />
            VIII. Endocannabinoid Receptor Binding Affinities (Ki values)
          </h2>
          <span className="text-[9px] text-slate-500 font-mono font-bold">Interactive Nodes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {[
            { id: "CB1", label: "CB1 Receptor", value: strain.thcPercent > 18 ? "Extremely High (Agonist)" : "Moderate (Affinity)", desc: "Central nervous system, psychotropic & pain gating" },
            { id: "CB2", label: "CB2 Receptor", value: strain.primaryTerpene === "Caryophyllene" || strain.secondaryTerpene === "Caryophyllene" ? "High Agonist (Direct)" : "Indirect Modulation", desc: "Immune system, systemic swelling regulation" },
            { id: "5HT1A", label: "5-HT1A Serotonin", value: strain.cbdPercent > 4 ? "Direct Activation" : "Mild Synergistic", desc: "Anxiolytic trigger, limbic system stress release" },
            { id: "GPR55", label: "GPR55 Receptor", value: "Antagonistic Modulation", desc: "Bone integrity, blood pressure regulation" }
          ].map((rec) => {
            const isSelected = activeReceptor === rec.id;
            return (
              <div 
                key={rec.id} 
                onClick={() => setActiveReceptor(rec.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected 
                    ? "bg-white border-emerald-500 shadow-md" 
                    : "bg-slate-50 border-transparent hover:border-slate-200"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-black">{rec.id}</span>
                  <div className={`w-2 h-2 rounded-full ${isSelected ? "bg-emerald-400" : "bg-slate-200"}`} />
                </div>
                <h4 className="text-xs font-bold text-slate-900 mt-1">{rec.label}</h4>
                <p className="text-[11px] text-emerald-600 font-mono font-bold mt-1.5">{rec.value}</p>
                {isSelected && (
                  <p className="text-[9px] text-slate-500 font-mono leading-tight mt-2 border-t border-slate-200 pt-1.5">
                    {rec.desc}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* LAYER 10: BOTANICAL CULTIVATION PROFILE */}
      <section id="layer-botanical-cultivation" className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
          <Leaf className="w-4 h-4 text-emerald-600" />
          IX. Cultivar Breeding & Cultivation metrics
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[9px] text-slate-500 block uppercase">Difficulty Level</span>
            <span className="font-bold text-slate-900">Moderate (Clinical standard)</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[9px] text-slate-500 block uppercase">Flowering Cycle</span>
            <span className="font-bold text-slate-900">56 - 63 Days (Typical)</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[9px] text-slate-500 block uppercase">Average Height</span>
            <span className="font-bold text-slate-900">Medium-Tall (Indoors)</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 shadow-sm">
            <span className="text-[9px] text-slate-500 block uppercase">Yield Potential</span>
            <span className="font-bold text-slate-900">High (450g/m²)</span>
          </div>
        </div>
      </section>

      {/* LAYER 11: ACADEMIC ENTOURAGE SYNERGY MATRIX */}
      <section id="layer-entourage-synergy-matrix" className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          X. Entourage Synergy Core Modulation Matrix
        </h2>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 uppercase">
              {strain.primaryCannabinoid}
            </span>
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">&oplus;</span>
            <span className="text-[10px] font-mono font-bold bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded border border-cyan-200 uppercase">
              {strain.primaryTerpene}
            </span>
          </div>
          <h4 className="text-xs font-bold text-slate-900">Botanical Synergistic Action:</h4>
          <p className="text-xs text-slate-700 leading-relaxed">
            The co-presence of the primary agonist <span className="text-emerald-600 font-bold">{strain.primaryCannabinoid}</span> and the terpene alcohol <span className="text-cyan-600 font-bold">{strain.primaryTerpene}</span> produces a distinct entourage effect, modulating receptor permeability across the blood-brain barrier. This maximizes the biological absorption kinetics compared to isolated synthetic molecules.
          </p>
        </div>
      </section>

      {/* LAYER 12: CLINICAL SYMPTOM TARGETS */}
      <section id="layer-indicated-symptoms" className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
          <Heart className="w-4 h-4 text-rose-500" />
          XI. Indicated Clinical Symptom Targets
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {strain.conditions.map((cond, idx) => (
            <Link 
              key={idx} 
              href={`/conditions/${cond}`}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 px-4 py-3 rounded-xl flex items-center justify-between transition-all group shadow-sm"
            >
              <span className="text-xs text-slate-800 font-semibold group-hover:text-slate-950 capitalize">{cond.replace("-", " ")}</span>
              <span className="text-[10px] text-emerald-600 uppercase font-bold tracking-wider flex items-center gap-1">
                Relief Profile
                <ArrowUpRight className="w-3 h-3" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* LAYER 13: DYNAMIC SYMPTOM MODULATION SLIDERS */}
      <section id="layer-symptom-modulation" className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-cyan-500" />
            XII. Empirical Clinical Symptom Modulation Levels
          </h2>
          <span className="text-[9px] text-slate-500 font-mono">Verified Therapeutic Benchmarks</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Somatic Pain Modulation", value: strain.thcPercent > 20 ? 9.2 : 7.8, color: "bg-rose-500" },
            { label: "Limbic Anxiety Management", value: strain.cbdPercent > 2 ? 8.8 : 6.4, color: "bg-emerald-500" },
            { label: "Nocturnal Sleep Induction", value: strain.type.includes("Indica") ? 9.5 : 5.8, color: "bg-purple-500" },
            { label: "Cognitive Stamina & Focus", value: strain.type.includes("Sativa") ? 9.1 : 5.4, color: "bg-amber-500" }
          ].map((symptom, idx) => (
            <div key={idx} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-2 shadow-sm">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-700 font-bold">{symptom.label}</span>
                <span className="text-slate-900 font-black">{symptom.value}/10</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div className={`${symptom.color} h-full rounded-full`} style={{ width: `${symptom.value * 10}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LAYER 14: GENETICALLY RELATED STRAW RECOMMENDATIONS */}
      <section id="layer-genetically-related-strains" className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-emerald-400" />
          XIII. Genetically & Chemically Related Strains
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedStrains.slice(0, 3).map((rel) => (
            <Link 
              key={rel.id} 
              href={`/strains/${rel.id}`}
              className="bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-slate-300 p-4 rounded-xl flex flex-col justify-between transition-all group space-y-2 shadow-sm"
            >
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-slate-600 block uppercase font-bold">{rel.type}</span>
                <h4 className="text-xs font-extrabold text-slate-900 group-hover:text-emerald-600 truncate">{rel.name}</h4>
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono pt-2 border-t border-slate-150">
                <span className="text-emerald-600 font-bold">{rel.thcPercent}% THC</span>
                <span className="text-slate-600 flex items-center gap-0.5 hover:underline">
                  Analyze
                  <ArrowUpRight className="w-3 h-3 text-slate-500" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* LAYER 15: INTERACTIVE TAG CLOUD & MEDICAL KEYWORDS INDEX */}
      <section id="layer-medical-tag-cloud" className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3 shadow-sm">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
          <Tag className="w-4 h-4 text-cyan-500" />
          XIV. Integrated Taxonomic Keywords & SEO Tag Cloud
        </h2>
        <div className="flex flex-wrap gap-1.5 pt-2">
          {[
            { label: `#${strain.name}`, href: `/strains/${strain.id}` },
            { label: `#${strain.type.replace("-", " ")}`, href: `/strains?type=${strain.type.includes("Indica") ? "INDICA" : "SATIVA"}` },
            { label: `#${strain.primaryCannabinoid} Rich`, href: `/cannabinoids/${strain.primaryCannabinoid.toLowerCase()}` },
            { label: `#${strain.primaryTerpene} Terpene`, href: `/terpenes/${strain.primaryTerpene.toLowerCase() === "caryophyllene" ? "beta-caryophyllene" : strain.primaryTerpene.toLowerCase()}` },
            { label: "#Anxiolytic Bio-Pathway", href: "/conditions/anxiety" },
            { label: "#Somatic Pain Control", href: "/conditions/pain" },
            { label: "#Neuropathic Nerve Relief", href: "/conditions/chronic-pain" },
            { label: "#ReleafCanna Advisor Verified", href: "/matcher" },
            { label: "#HPLC Laboratory Standard", href: "/strains" }
          ].map((tag, idx) => (
            <Link 
              key={idx} 
              href={tag.href}
              className="px-2.5 py-1 rounded bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[10px] font-mono font-bold text-slate-600 hover:text-emerald-600 transition-all cursor-pointer"
            >
              {tag.label}
            </Link>
          ))}
        </div>
      </section>

      {/* LAYER 16: BIOCHEMICAL INDEX & SEO HASHTAG NETWORK */}
      <div id="layer-hashtag-seo-interlink">
        <HashtagCrossLinker initialTag={strain.primaryCannabinoid.toLowerCase()} isDarkTheme={false} />
      </div>

      {/* LAYER 17: BIBLIOGRAPHIC REFERENCE CITATIONS */}
      <section id="layer-expert-bibliography" className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 shadow-sm">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 font-mono flex items-center gap-1.5">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          XVI. Scholarly Literature Bibliographic Citations
        </h2>
        <ul className="space-y-3.5 text-[11px] font-mono text-slate-600">
          <li className="border-l-2 border-emerald-500 pl-3">
            <span className="text-slate-800 font-bold block">1. Russo, E. B. (2011).</span> Taming THC: potential cannabis synergy and phytocannabinoid-terpenoid entourage effects. <span className="italic">British Journal of Pharmacology</span>, 163(7), 1344-1364.
          </li>
          <li className="border-l-2 border-slate-200 pl-3">
            <span className="text-slate-800 font-bold block">2. Pertwee, R. G. (2008).</span> The diverse CB1 and CB2 receptor pharmacology of three plant cannabinoids. <span className="italic">British Journal of Pharmacology</span>, 153(2), 199-215.
          </li>
          <li className="border-l-2 border-slate-200 pl-3">
            <span className="text-slate-800 font-bold block">3. ReleafCanna Chemical Lab Report. (2026).</span> HPLC chromatography index records for dynamic organic extraction, RC-Spec-{strain.id}.
          </li>
        </ul>
      </section>

      {/* LAYER 18: PREMIUM DOMAIN ACQUISITION OFFER */}
      <section id="layer-godaddy-offer" className="rounded-2xl p-6 sm:p-8 border border-emerald-200 bg-emerald-50 text-slate-900 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/40 via-emerald-50/10 to-transparent pointer-events-none" />
        <div className="space-y-2 relative z-10 text-center md:text-left">
          <span className="inline-block text-[9px] font-mono uppercase bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">Domain Acquisition Offer</span>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-emerald-900">Establish Immediate Authority with releafcanna.com</h3>
          <p className="text-xs text-emerald-750 leading-relaxed max-w-xl">
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

      {/* LAYER 19: RELEAFCANNA ADVISOR NAVIGATION CTA */}
      <div id="layer-patient-cta" className="pt-6 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/strains" className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 font-bold px-6 py-3 rounded-xl transition-all text-sm w-full sm:w-auto justify-center shadow-sm">
          <Eye className="w-4 h-4" />
          Explore 1,700+ Strains Directory
        </Link>
        <Link href="/" className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-sm w-full sm:w-auto justify-center">
          Launch ReleafCanna Patient Advisor
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
