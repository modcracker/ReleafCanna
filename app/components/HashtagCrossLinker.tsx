"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Hash, ArrowRight, Sparkles, BookOpen, HeartPulse, HelpCircle } from "lucide-react";

interface HashtagItem {
  tag: string;
  name: string;
  category: "cannabinoid" | "terpene" | "condition" | "cultivar";
  link: string;
  description: string;
  synergy: string;
  formulaOrTarget: string;
}

const HASHTAGS: Record<string, HashtagItem> = {
  // CANNABINOIDS
  thc: {
    tag: "THC",
    name: "Tetrahydrocannabinol",
    category: "cannabinoid",
    link: "/cannabinoids/thc",
    description: "The primary psychoactive phytocannabinoid, known for powerful analgesic, sleep induction, and muscle-relaxing applications.",
    synergy: "Myrcene and Linalool amplify muscle-relaxant properties; CBD mitigates cerebral anxiety.",
    formulaOrTarget: "Target: CB1 & CB2 Receptors"
  },
  cbd: {
    tag: "CBD",
    name: "Cannabidiol",
    category: "cannabinoid",
    link: "/cannabinoids/cbd",
    description: "A major non-psychotropic cannabinoid highlighting neuroprotective, anxiolytic, and potent systemic anti-inflammatory benefits.",
    synergy: "Beta-Caryophyllene boosts immune regulation; Linalool accelerates deep sleep induction.",
    formulaOrTarget: "Target: 5-HT1A Serotonin Receptors"
  },
  cbg: {
    tag: "CBG",
    name: "Cannabigerol",
    category: "cannabinoid",
    link: "/cannabinoids/cbg",
    description: "The chemical precursor 'Mother Cannabinoid' demonstrating remarkable intestinal micro-relief and non-jittery cognitive focus support.",
    synergy: "Pinene optimizes memory retention; Humulene provides deep joint-tissue defense.",
    formulaOrTarget: "Target: Alpha-2 Adrenergic Receptors"
  },
  cbn: {
    tag: "CBN",
    name: "Cannabinol",
    category: "cannabinoid",
    link: "/cannabinoids/cbn",
    description: "An aged cannabinoid compound recognized as an extremely potent skeletal muscle relaxant and biological sleep aid.",
    synergy: "Linalool forms a supreme sedation cocktail; trace THC boosts sleep-inducing activity.",
    formulaOrTarget: "Target: CB2 and Peripheral Gates"
  },
  thcv: {
    tag: "THCV",
    name: "Tetrahydrocannabivarin",
    category: "cannabinoid",
    link: "/cannabinoids/thcv",
    description: "A rare propyl cannabinoid that acts as a glycemic stabilizer and appetite moderator while delivering clean mental energy.",
    synergy: "Limonene enhances cellular alertness; CBG optimizes clean cognitive stamina.",
    formulaOrTarget: "Target: CB1 Antagonist (low doses)"
  },

  // TERPENES
  myrcene: {
    tag: "Myrcene",
    name: "Myrcene Terpene",
    category: "terpene",
    link: "/terpenes/myrcene",
    description: "The most abundant terpene in cannabis, modifying cellular barrier permeability to expedite cannabinoid transport across the blood-brain barrier.",
    synergy: "THC and CBN boost deep slow-wave sleep; CBD expands physical muscle release.",
    formulaOrTarget: "Boiling Point: 331 °F (166 °C)"
  },
  limonene: {
    tag: "Limonene",
    name: "Limonene Terpene",
    category: "terpene",
    link: "/terpenes/limonene",
    description: "A cyclic citrus monoterpene that acts as a fast-acting serotonin and dopamine elevator and provides gastric acid defense.",
    synergy: "THCV elevates morning alertness; CBD enhances broad-spectrum stress shielding.",
    formulaOrTarget: "Boiling Point: 349 °F (176 °C)"
  },
  linalool: {
    tag: "Linalool",
    name: "Linalool Terpene",
    category: "terpene",
    link: "/terpenes/linalool",
    description: "A lavender-scented floral terpene alcohol facilitating GABA-A receptor pathways to decrease central nervous hyperactivity.",
    synergy: "CBN establishes supreme nocturnal rest; THC blocks paranoia side effects.",
    formulaOrTarget: "Boiling Point: 388 °F (198 °C)"
  },
  pinene: {
    tag: "Pinene",
    name: "Pinene Terpene",
    category: "terpene",
    link: "/terpenes/pinene",
    description: "A sharp pine-scented monoterpene and acetylcholinesterase inhibitor that improves memory retention and dilates bronchial tubes.",
    synergy: "CBG maximizes active work focus; THCV stimulates respiratory delivery.",
    formulaOrTarget: "Boiling Point: 311 °F (155 °C)"
  },
  humulene: {
    tag: "Humulene",
    name: "Humulene Terpene",
    category: "terpene",
    link: "/terpenes/humulene",
    description: "A hoppy monoterpene serving as a natural appetite suppressant (anorectic) and potent anti-inflammatory cytokine inhibitor.",
    synergy: "THCV maximizes satiety and glycemic control; CBD intensifies joint-repair pathways.",
    formulaOrTarget: "Boiling Point: 223 °F (106 °C)"
  },
  caryophyllene: {
    tag: "Caryophyllene",
    name: "Beta-Caryophyllene Terpene",
    category: "terpene",
    link: "/terpenes/beta-caryophyllene",
    description: "An extraordinary sesquiterpene acting directly as a selective CB2 receptor agonist to downregulate somatic swelling without intoxication.",
    synergy: "CBD activates rapid immune cell balancing; CBG resolves gastric system spasms.",
    formulaOrTarget: "Boiling Point: 266 °F (130 °C)"
  },

  // CONDITIONS
  pain: {
    tag: "Pain",
    name: "Chronic Pain & Neuropathy",
    category: "condition",
    link: "/conditions/pain",
    description: "Neuropathic nerve firing, joint arthritis, and musculoskeletal aches regulated by endocannabinoid CB1/CB2 stimulation.",
    synergy: "THC, CBD, and Beta-Caryophyllene target ascending pain receptor networks.",
    formulaOrTarget: "Therapy: Cannabinoid Analgesia"
  },
  anxiety: {
    tag: "Anxiety",
    name: "Anxiety & Stress Disorders",
    category: "condition",
    link: "/conditions/anxiety",
    description: "Limbic system over-activation, somatic tension, and cortisol spikes moderated via serotonin 5-HT1A and GABA-A enhancement.",
    synergy: "CBD, Linalool, and Limonene soothe physical flight-or-fight signals.",
    formulaOrTarget: "Therapy: Serotonergic Calming"
  },
  insomnia: {
    tag: "Insomnia",
    name: "Insomnia & Sleep Disruption",
    category: "condition",
    link: "/conditions/insomnia",
    description: "Circadian rhythm abnormalities and slow-wave sleep-onset delay treated through sedation and melatonin synergy.",
    synergy: "CBN, Myrcene, and Linalool provide skeletal muscle release and mental rest.",
    formulaOrTarget: "Therapy: Sleep Architecture Support"
  },
  inflammation: {
    tag: "Inflammation",
    name: "Systemic Inflammation Pathways",
    category: "condition",
    link: "/conditions/inflammation",
    description: "Chronic cellular swelling, joint stiffness, and autoimmune skin irritations addressed via cytokine regulation.",
    synergy: "CBD, CBG, Beta-Caryophyllene, and Humulene inhibit TNF-alpha pathways.",
    formulaOrTarget: "Therapy: Cytokine Blockade"
  },
  focus: {
    tag: "Focus",
    name: "ADHD, Brain Fog & Fatigue",
    category: "condition",
    link: "/conditions/focus",
    description: "Cognitive exhaustion and attention-deficit states optimized by blocking acetylcholine degradation.",
    synergy: "THCV, CBG, and Pinene optimize prefrontal executive neurotransmission.",
    formulaOrTarget: "Therapy: Acetylcholinesterase Inhibition"
  },

  // CULTIVARS
  indica: {
    tag: "Indica",
    name: "Indica Cultivars",
    category: "cultivar",
    link: "/strains?type=INDICA",
    description: "Broad-leafed cannabis varieties traditionally high in sedating terpenes (myrcene, linalool) delivering deep physical calm.",
    synergy: "Perfect for nocturnal recovery, severe muscular spasms, and somatic relaxation.",
    formulaOrTarget: "Terpene Bias: Sedating & Earthy"
  },
  sativa: {
    tag: "Sativa",
    name: "Sativa Cultivars",
    category: "cultivar",
    link: "/strains?type=SATIVA",
    description: "Narrow-leafed varieties containing high concentrations of invigorating monoterpenes (limonene, pinene) to support creative focus.",
    synergy: "Optimal for daytime fatigue, cognitive clouding, and active cerebral performance.",
    formulaOrTarget: "Terpene Bias: Energetic & Citrus"
  },
  hybrid: {
    tag: "Hybrid",
    name: "Hybrid Cultivars",
    category: "cultivar",
    link: "/strains?type=HYBRID",
    description: "Precisely cross-bred genetic profiles designed to couple therapeutic physical protection with structured mental alertness.",
    synergy: "Tailored for balanced all-day therapy, chronic fatigue, and functional pain control.",
    formulaOrTarget: "Terpene Bias: Synergistic & Balanced"
  },
  cbd_rich: {
    tag: "CBD-Rich",
    name: "CBD-Rich Strains",
    category: "cultivar",
    link: "/strains?type=CBD",
    description: "Specially selected chemotypes rich in non-intoxicating cannabidiol to preserve cerebral focus while offering physical relief.",
    synergy: "Ideal for generalized anxiety disorder, daily systemic inflammation, and pediatric care.",
    formulaOrTarget: "Cannabinoid Bias: High CBD / Low THC"
  }
};

interface Props {
  initialTag?: string;
  className?: string;
  isDarkTheme?: boolean;
}

export default function HashtagCrossLinker({ initialTag = "thc", className = "", isDarkTheme = false }: Props) {
  const [selectedTag, setSelectedTag] = useState<string>(initialTag.toLowerCase());

  const activeItem = HASHTAGS[selectedTag] || HASHTAGS.thc;

  // Render group categories
  const categories = [
    { label: "Cannabinoids", value: "cannabinoid" },
    { label: "Terpenes", value: "terpene" },
    { label: "Symptom Targets", value: "condition" },
    { label: "Cultivar Types", value: "cultivar" }
  ];

  return (
    <div 
      id="hashtag-seo-interlink-hub" 
      className={`rounded-2xl p-6 border ${
        isDarkTheme 
          ? "bg-slate-900/30 border-slate-900 text-slate-100" 
          : "bg-white border-stone-200 text-stone-900 shadow-sm"
      } ${className}`}
    >
      <div className="space-y-4">
        {/* Title Block */}
        <div className={`flex items-center gap-2 border-b pb-4 ${isDarkTheme ? "border-slate-900/40" : "border-slate-200"}`}>
          <Hash className="w-5 h-5 text-emerald-500 shrink-0" />
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider font-mono">
              Biochemical Index & SEO Hashtag Network
            </h3>
            <p className={`text-[10px] ${isDarkTheme ? "text-slate-500" : "text-stone-400"} font-mono`}>
              Interactive Scientific Cross-Linking Platform — Select a hashtag to map related clinical documents
            </p>
          </div>
        </div>

        {/* Categories of Radio Buttons */}
        <div className="space-y-4">
          {categories.map((cat) => {
            const items = Object.entries(HASHTAGS).filter(([_, item]) => item.category === cat.value);
            return (
              <div key={cat.value} className="space-y-1.5">
                <span className={`text-[9px] font-bold uppercase tracking-widest ${isDarkTheme ? "text-slate-500" : "text-stone-400"} block`}>
                  {cat.label}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map(([key, item]) => {
                    const isSelected = selectedTag === key;
                    return (
                      <label
                        key={key}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-all border ${
                          isSelected
                            ? isDarkTheme
                              ? "bg-emerald-500/10 border-emerald-500/50 text-emerald-400 shadow-sm shadow-emerald-500/5 font-black scale-102"
                              : "bg-emerald-50 border-emerald-500/40 text-emerald-700 shadow-sm font-black scale-102"
                            : isDarkTheme
                              ? "bg-slate-950/40 border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 hover:border-slate-800"
                              : "bg-stone-50 border-transparent text-stone-600 hover:text-stone-950 hover:bg-stone-100 hover:border-stone-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="seo_hashtag_selection"
                          value={key}
                          checked={isSelected}
                          onChange={() => setSelectedTag(key)}
                          className="sr-only"
                        />
                        <span className={`w-2 h-2 rounded-full border flex items-center justify-center ${
                          isSelected ? "bg-emerald-500 border-emerald-400" : "border-stone-400 bg-transparent"
                        }`} />
                        #{item.tag}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Detail Card with Direct Link */}
        <div 
          id="seo-hashtag-detail-card"
          className={`p-5 rounded-xl border transition-all duration-300 ${
            isDarkTheme 
              ? "bg-slate-950/80 border-slate-900/60" 
              : "bg-stone-50 border-stone-200/60"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-mono uppercase tracking-wider font-black px-2 py-0.5 rounded ${
                  isDarkTheme ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-500 text-white"
                }`}>
                  #{activeItem.tag}
                </span>
                <span className={`text-[10px] font-mono ${isDarkTheme ? "text-slate-500" : "text-stone-400"} uppercase font-bold`}>
                  {activeItem.formulaOrTarget}
                </span>
              </div>
              <h4 className={`text-sm font-extrabold ${isDarkTheme ? "text-white" : "text-slate-900"} font-sans tracking-tight`}>
                {activeItem.name}
              </h4>
              <p className={`text-xs ${isDarkTheme ? "text-slate-300" : "text-stone-600"} leading-relaxed max-w-xl`}>
                {activeItem.description}
              </p>
              <div className="flex items-start gap-1.5 text-[11px] pt-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span className={isDarkTheme ? "text-slate-400" : "text-stone-500"}>
                  <strong className={isDarkTheme ? "text-slate-200" : "text-stone-700"}>Entourage Synergies:</strong> {activeItem.synergy}
                </span>
              </div>
            </div>

            <Link
              href={activeItem.link}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 w-full md:w-auto justify-center ${
                isDarkTheme
                  ? "bg-emerald-500 hover:bg-emerald-400 text-slate-950 hover:shadow-emerald-500/10"
                  : "bg-slate-900 hover:bg-slate-800 text-white"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Analyze Index
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Quick Link Matrix for full crawl-depth */}
        <div className={`pt-2 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t ${isDarkTheme ? "border-slate-900/40" : "border-slate-200"} text-[10px] text-slate-500 font-mono`}>
          <span className="font-bold uppercase tracking-wider">Indexed Databases:</span>
          <Link href="/strains" className="hover:text-emerald-400 hover:underline">1,700+ Strains Directory</Link>
          <span>•</span>
          <Link href="/cannabinoids" className="hover:text-emerald-400 hover:underline">Phyto-Cannabinoid Matrix</Link>
          <span>•</span>
          <Link href="/terpenes" className="hover:text-emerald-400 hover:underline">Terpene Encyclopedia</Link>
          <span>•</span>
          <Link href="/matcher" className="hover:text-emerald-400 hover:underline">Clinical Matcher Tool</Link>
        </div>

      </div>
    </div>
  );
}
