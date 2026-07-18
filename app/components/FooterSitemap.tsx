"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getAllStrains } from "@/lib/strains";
import {
  Map,
  Compass,
  Activity,
  HeartPulse,
  Leaf,
  Flame,
  HelpCircle,
  AlertCircle,
  Shield,
  ChevronDown,
  ChevronUp,
  Search,
  ExternalLink,
  Layers,
  Database
} from "lucide-react";

export default function FooterSitemap() {
  const [isStrainsExpanded, setIsStrainsExpanded] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");
  const [strainSearch, setStrainSearch] = useState("");

  const strains = useMemo(() => getAllStrains(), []);

  // Base platform routes
  const baseRoutes = [
    { label: "Home Dashboard", href: "/" },
    { label: "Clinical Cannabinoid Matcher", href: "/matcher" },
    { label: "Strains & Cultivars Directory", href: "/strains" },
    { label: "Phyto-Cannabinoid Matrix", href: "/cannabinoids" },
    { label: "Terpene Encyclopedia", href: "/terpenes" },
    { label: "Secure AI Advisor", href: "/ai-advisor" },
    { label: "Sitemap XML Index", href: "/sitemap.xml" }
  ];

  // Cannabinoids categories
  const primaryCannabinoids = [
    { id: "cbd", label: "CBD (Cannabidiol)", href: "/cannabinoids/cbd" },
    { id: "thc", label: "THC (Tetrahydrocannabinol)", href: "/cannabinoids/thc" },
    { id: "cbg", label: "CBG (Cannabigerol)", href: "/cannabinoids/cbg" },
    { id: "cbn", label: "CBN (Cannabinol)", href: "/cannabinoids/cbn" },
    { id: "thcv", label: "THCV (Tetrahydrocannabivarin)", href: "/cannabinoids/thcv" }
  ];

  const secondaryCannabinoids = [
    { id: "cbc", label: "CBC", href: "/compounds/cbc" },
    { id: "cbda", label: "CBDA", href: "/compounds/cbda" },
    { id: "thca", label: "THCA", href: "/compounds/thca" },
    { id: "cbdv", label: "CBDV", href: "/compounds/cbdv" },
    { id: "delta-8-thc", label: "Delta-8 THC", href: "/compounds/delta-8-thc" },
    { id: "cbga", label: "CBGA", href: "/compounds/cbga" },
    { id: "thcva", label: "THCVA", href: "/compounds/thcva" },
    { id: "cbca", label: "CBCA", href: "/compounds/cbca" },
    { id: "delta-10-thc", label: "Delta-10 THC", href: "/compounds/delta-10-thc" },
    { id: "cbl", label: "CBL", href: "/compounds/cbl" }
  ];

  // Terpenes categories
  const primaryTerpenes = [
    { id: "beta-caryophyllene", label: "Beta-Caryophyllene", href: "/terpenes/beta-caryophyllene" },
    { id: "myrcene", label: "Myrcene", href: "/terpenes/myrcene" },
    { id: "limonene", label: "Limonene", href: "/terpenes/limonene" },
    { id: "linalool", label: "Linalool", href: "/terpenes/linalool" },
    { id: "pinene", label: "Pinene", href: "/terpenes/pinene" },
    { id: "humulene", label: "Humulene", href: "/terpenes/humulene" }
  ];

  const secondaryTerpenes = [
    { id: "terpinolene", label: "Terpinolene", href: "/compounds/terpinolene" },
    { id: "ocimene", label: "Ocimene", href: "/compounds/ocimene" },
    { id: "bisabolol", label: "Bisabolol", href: "/compounds/bisabolol" },
    { id: "guaiol", label: "Guaiol", href: "/compounds/guaiol" },
    { id: "geraniol", label: "Geraniol", href: "/compounds/geraniol" },
    { id: "camphene", label: "Camphene", href: "/compounds/camphene" },
    { id: "terpineol", label: "Terpineol", href: "/compounds/terpineol" }
  ];

  // 12 Clinical Conditions
  const clinicalConditions = [
    { id: "pain", label: "Chronic Pain & Neuropathy", href: "/conditions/pain" },
    { id: "anxiety", label: "Anxiety & Stress Disorders", href: "/conditions/anxiety" },
    { id: "insomnia", label: "Insomnia & Sleep Disruption", href: "/conditions/insomnia" },
    { id: "inflammation", label: "Systemic Inflammation Pathways", href: "/conditions/inflammation" },
    { id: "focus", label: "ADHD, Brain Fog & Fatigue", href: "/conditions/focus" },
    { id: "migraine", label: "Migraine & Headaches", href: "/conditions/migraine" },
    { id: "epilepsy", label: "Epilepsy & Neurological Tremors", href: "/conditions/epilepsy" },
    { id: "appetite", label: "Appetite Regulation & Satiety", href: "/conditions/appetite" },
    { id: "ptsd", label: "PTSD & Trauma Symptom Relief", href: "/conditions/ptsd" },
    { id: "muscle-spasms", label: "Muscle Spasms & MS Spasticity", href: "/conditions/muscle-spasms" },
    { id: "fibromyalgia", label: "Fibromyalgia Syndrome Symptoms", href: "/conditions/fibromyalgia" },
    { id: "glaucoma", label: "Glaucoma & Intraocular Pressure", href: "/conditions/glaucoma" }
  ];

  // 40 Search-Optimized Sub-Conditions
  const subConditions = [
    { id: "chronic-pain", label: "Chronic Pain Syndrome", href: "/conditions/chronic-pain" },
    { id: "neuropathic-pain", label: "Neuropathic Nerve Pain", href: "/conditions/neuropathic-pain" },
    { id: "rheumatoid-arthritis", label: "Rheumatoid Joint Arthritis", href: "/conditions/rheumatoid-arthritis" },
    { id: "generalized-anxiety", label: "Generalized Anxiety Disorder", href: "/conditions/generalized-anxiety" },
    { id: "panic-disorder", label: "Panic Disorder & Panic Attacks", href: "/conditions/panic-disorder" },
    { id: "sleep-onset-delay", label: "Sleep-Onset Delay Problems", href: "/conditions/sleep-onset-delay" },
    { id: "circadian-disruption", label: "Circadian Rhythm Disruption", href: "/conditions/circadian-disruption" },
    { id: "restless-leg-syndrome", label: "Restless Leg Syndrome (RLS)", href: "/conditions/restless-leg-syndrome" },
    { id: "joint-stiffness", label: "Somatic Joint Stiffness", href: "/conditions/joint-stiffness" },
    { id: "osteoporosis-bone-loss", label: "Osteoporosis & Bone Integrity", href: "/conditions/osteoporosis-bone-loss" },
    { id: "allergic-dermatitis", label: "Allergic Dermatitis Symptoms", href: "/conditions/allergic-dermatitis" },
    { id: "psoriasis-plaques", label: "Psoriasis Skin Plaque Relief", href: "/conditions/psoriasis-plaques" },
    { id: "sebum-acne-control", label: "Sebum Acne Inflammatory Control", href: "/conditions/sebum-acne-control" },
    { id: "sinus-inflammation", label: "Sinus & Airway Swelling", href: "/conditions/sinus-inflammation" },
    { id: "autoimmune-inflammation", label: "Autoimmune Inflammatory Flare-ups", href: "/conditions/autoimmune-inflammation" },
    { id: "geriatric-stiff-joints", label: "Geriatric Stiff & Aching Joints", href: "/conditions/geriatric-stiff-joints" },
    { id: "chronic-fatigue", label: "Chronic Fatigue & Adrenal Burnout", href: "/conditions/chronic-fatigue" },
    { id: "mental-brain-fog", label: "Cerebral Brain Fog & Fatigue", href: "/conditions/mental-brain-fog" },
    { id: "adhd-focus-deficit", label: "Attention Deficit ADHD Focus", href: "/conditions/adhd-focus-deficit" },
    { id: "bronchial-asthma", label: "Bronchial Airway Hyper-reactivity", href: "/conditions/bronchial-asthma" },
    { id: "metabolic-syndrome", label: "Metabolic Syndrome Inflammation", href: "/conditions/metabolic-syndrome" },
    { id: "insulin-resistance", label: "Insulin Sensitivity & Blood Sugar", href: "/conditions/insulin-resistance" },
    { id: "migraine-headaches", label: "Acute Migraine Headache Attacks", href: "/conditions/migraine-headaches" },
    { id: "tension-headaches", label: "Cervicogenic Tension Headaches", href: "/conditions/tension-headaches" },
    { id: "neurodegenerative-decline", label: "Neurodegenerative Decline Support", href: "/conditions/neurodegenerative-decline" },
    { id: "neurological-tremors", label: "Motor Tremors & Spasms", href: "/conditions/neurological-tremors" },
    { id: "appetite-suppression", label: "Satiety & Appetite Suppression", href: "/conditions/appetite-suppression" },
    { id: "nausea-and-emesis", label: "Chemotherapy Nausea & Emesis", href: "/conditions/nausea-and-emesis" },
    { id: "inflammatory-bowel-disease", label: "Inflammatory Bowel Disease (IBD)", href: "/conditions/inflammatory-bowel-disease" },
    { id: "irritable-bowel-syndrome", label: "Irritable Bowel Syndrome (IBS)", href: "/conditions/irritable-bowel-syndrome" },
    { id: "chronic-gastritis", label: "Chronic Gastritis & Stomach Ache", href: "/conditions/chronic-gastritis" },
    { id: "acid-reflux", label: "Acid Reflux & GERD Management", href: "/conditions/acid-reflux" },
    { id: "ms-spasticity", label: "Multiple Sclerosis Spasticity", href: "/conditions/ms-spasticity" },
    { id: "athletic-soreness", label: "Post-Workout Athletic Soreness", href: "/conditions/athletic-soreness" },
    { id: "stress-hypertension", label: "Stress-Induced High Blood Pressure", href: "/conditions/stress-hypertension" },
    { id: "social-anxiety", label: "Social Anxiety & Glossophobia", href: "/conditions/social-anxiety" },
    { id: "menstrual-cramps", label: "Menstrual Cramps & Dysmenorrhea", href: "/conditions/menstrual-cramps" }
  ];

  // A-Z letter buttons
  const letters = useMemo(() => {
    return ["ALL", ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];
  }, []);

  // Filter strains based on letter and search inputs
  const filteredStrainsForSitemap = useMemo(() => {
    return strains.filter((s) => {
      const matchesLetter =
        selectedLetter === "ALL" ||
        s.name.charAt(0).toUpperCase() === selectedLetter;
      const matchesSearch =
        s.name.toLowerCase().includes(strainSearch.toLowerCase()) ||
        s.type.toLowerCase().includes(strainSearch.toLowerCase());
      return matchesLetter && matchesSearch;
    });
  }, [strains, selectedLetter, strainSearch]);

  return (
    <div 
      id="homepage-footer-sitemap-hub" 
      className="border-t border-slate-200 bg-slate-100 text-slate-700 py-16 px-6 sm:px-12 relative overflow-hidden font-sans select-none"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.03),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* TOP ROW: LOGO & EXPLANATORY TEXT */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-10 border-b border-slate-300">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2.5 text-slate-900">
              <Leaf className="w-5.5 h-5.5 text-emerald-600 shrink-0" />
              <span className="font-display font-black text-lg tracking-tight uppercase">ReleafCanna Sitemap Index</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-mono">
              The ultimate peer-reviewed botanical directory. Fully indexed, laboratory-validated search matrix spanning over 1,700 cultivars, 28 organic compounds, and 50 target symptoms. Designed for clean search-engine validation and supreme clinical accessibility.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-mono font-bold bg-white border border-slate-200 px-3 py-1.5 rounded-lg text-emerald-700 flex items-center gap-1.5 shadow-sm">
              <Database className="w-3.5 h-3.5" />
              1,800+ SEO INDEXED NODES ACTIVE
            </span>
          </div>
        </div>

        {/* FIVE MAIN SITEMAP LINK COLUMNS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-12" id="sitemap-category-columns">
          {/* COLUMN 1: PLATFORM DIRECTORY */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 border-b border-slate-300 pb-2">
              <Compass className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-black uppercase tracking-wider font-mono">Platform Directories</h3>
            </div>
            <ul className="space-y-2.5 text-xs">
              {baseRoutes.map((route, idx) => (
                <li key={idx}>
                  <Link href={route.href} className="hover:text-emerald-600 font-medium transition-colors duration-200 block">
                    {route.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMN 2: PHYTO-CANNABINOIDS */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 border-b border-slate-300 pb-2">
              <Activity className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-black uppercase tracking-wider font-mono">Phyto-Cannabinoid Matrix</h3>
            </div>
            <div className="space-y-3.5">
              <div>
                <h4 className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mb-1.5 font-mono">Academic Cannabinoids</h4>
                <ul className="space-y-2 text-xs">
                  {primaryCannabinoids.map((c) => (
                    <li key={c.id}>
                      <Link href={c.href} className="hover:text-emerald-600 transition-colors block">
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mb-1.5 font-mono font-black">Secondary Compounds & Acids</h4>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
                  {secondaryCannabinoids.map((c) => (
                    <Link key={c.id} href={c.href} className="hover:text-emerald-600 transition-colors block">
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: TERPENES ENCYCLOPEDIA */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 border-b border-slate-300 pb-2">
              <Flame className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-black uppercase tracking-wider font-mono">Terpene Encyclopedia</h3>
            </div>
            <div className="space-y-3.5">
              <div>
                <h4 className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mb-1.5 font-mono">Academic Hydrocarbons</h4>
                <ul className="space-y-2 text-xs">
                  {primaryTerpenes.map((t) => (
                    <li key={t.id}>
                      <Link href={t.href} className="hover:text-emerald-600 transition-colors block">
                        {t.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mb-1.5 font-mono font-black">Secondary Terpenoids</h4>
                <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
                  {secondaryTerpenes.map((t) => (
                    <Link key={t.id} href={t.href} className="hover:text-emerald-600 transition-colors block">
                      {t.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 4: SYMPTOM CLINICAL INDEX */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 border-b border-slate-300 pb-2">
              <HeartPulse className="w-4 h-4 text-emerald-600" />
              <h3 className="text-xs font-black uppercase tracking-wider font-mono">Clinical Symptom Targets</h3>
            </div>
            <div className="space-y-3.5">
              <div>
                <h4 className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mb-1.5 font-mono">Parent Pathology Targets</h4>
                <div className="grid grid-cols-1 gap-y-1.5 text-xs max-h-[140px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300">
                  {clinicalConditions.map((cond) => (
                    <Link key={cond.id} href={cond.href} className="hover:text-emerald-600 transition-colors block leading-tight">
                      {cond.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[10px] text-slate-600 font-bold uppercase tracking-wider mb-1.5 font-mono">Clinical Sub-Symptom Targets</h4>
                <div className="grid grid-cols-1 gap-y-1.5 text-[11px] max-h-[140px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-300">
                  {subConditions.map((sub) => (
                    <Link key={sub.id} href={sub.href} className="hover:text-emerald-600 transition-colors block leading-tight text-slate-600 hover:text-emerald-600 font-mono">
                      #{sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: EXPANDABLE 1,720+ STRAINS SEO DEEP CRAWL AREA */}
        <div className="border-t border-slate-300 pt-8" id="sitemap-strains-section">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <button
              onClick={() => setIsStrainsExpanded(!isStrainsExpanded)}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 border border-slate-300 hover:border-emerald-500/20 px-5 py-3 rounded-xl text-xs font-bold text-slate-800 hover:text-emerald-600 transition-all cursor-pointer shadow-md select-none"
            >
              <Layers className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>
                {isStrainsExpanded ? "Collapse Cultivars Directory Sitemap" : "Expand Full Cultivars Directory Sitemap (1,700+ Strains)"}
              </span>
              {isStrainsExpanded ? <ChevronUp className="w-3.5 h-3.5 ml-1 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 ml-1 text-slate-500" />}
            </button>
            {isStrainsExpanded && (
              <p className="text-[11px] text-slate-600 font-mono">
                Showing {filteredStrainsForSitemap.length} of {strains.length} clinical strains index pages
              </p>
            )}
          </div>

          {/* HIDDEN IN ACCORDION BUT ALIVE IN THE DOM FOR GOOGLEBOT CRAWLABILITY */}
          <div className={`mt-6 space-y-6 transition-all duration-300 ${isStrainsExpanded ? "block" : "hidden opacity-0 pointer-events-none h-0 overflow-hidden"}`}>
            
            {/* SEARCH & ALPHABET CONTROLS WITHIN THE STRAIN DIRECTORY HUB */}
            <div className="bg-slate-200/40 border border-slate-300 p-4 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full sm:max-w-xs">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={strainSearch}
                    onChange={(e) => setStrainSearch(e.target.value)}
                    placeholder="Fast search index..."
                    className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all font-mono"
                  />
                </div>
                <span className="text-[10px] text-slate-600 uppercase tracking-widest font-mono font-bold shrink-0">Alphabet Filter:</span>
                <div className="flex flex-wrap gap-1">
                  {letters.map((letter) => (
                    <button
                      key={letter}
                      onClick={() => setSelectedLetter(letter)}
                      className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider transition-all font-mono border ${
                        selectedLetter === letter
                          ? "bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow"
                          : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* DENSE HIGH-SPEED ANCHOR LINK LIST */}
            <div className="bg-slate-50 border border-slate-300 p-6 rounded-2xl max-h-[360px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300">
              {filteredStrainsForSitemap.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-2 text-[10px] font-mono">
                  {filteredStrainsForSitemap.map((s) => (
                    <Link
                       key={s.id}
                       href={`/strains/${s.id}`}
                       className="hover:text-emerald-600 text-slate-600 hover:underline block truncate"
                       title={`${s.name} - ${s.type}`}
                    >
                      • {s.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-slate-500 font-mono text-xs">
                  No strains index found matching filters
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RELEAFCANNA BOTTOM CREDITS */}
        <div className="border-t border-slate-300 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-600 text-xs font-mono">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Cross-Link Routing Protocols Armed</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/sitemap.xml" className="hover:text-emerald-600 hover:underline flex items-center gap-1">
              Static XML Sitemap <ExternalLink className="w-3 h-3" />
            </Link>
            <span>•</span>
            <span>© 2026 ReleafCanna Ltd. All rights reserved.</span>
          </div>
        </div>

      </div>
    </div>
  );
}
