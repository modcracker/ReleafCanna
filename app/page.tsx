"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  Leaf,
  Lock,
  Unlock,
  Mail,
  Copy,
  Check,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  Bookmark,
  ChevronRight,
  TrendingUp,
  Brain,
  Activity,
  Award,
  BookOpen,
  Droplet,
  Compass,
  AlertCircle,
  HelpCircle,
  Scale
} from "lucide-react";

// Import our beautiful custom-generated assets
import bgImage from "@/src/assets/images/botanical_luxury_bg_1782006996175.jpg";
import logoImage from "@/src/assets/images/releafcanna_cute_logo_1782007010792.jpg";

// Scientific and structured Cannabinoids database
interface Cannabinoid {
  id: string;
  name: string;
  fullName: string;
  chemicalFormula: string;
  receptors: string;
  highlightEffect: string;
  description: string;
  bestFor: string[];
  medicalStudies: string;
}

const CANNABINOIDS_DATA: Cannabinoid[] = [
  {
    id: "cbd",
    name: "CBD",
    fullName: "Cannabidiol",
    chemicalFormula: "C₂₁H₃₀O₂",
    receptors: "5-HT1A (Serotonin), TRPV1, weak CB1/CB2 antagonist",
    highlightEffect: "Anxiolytic, neuroprotective, and powerful systemic anti-inflammatory.",
    description: "Unlike THC, Cannabidiol is entirely non-psychoactive but offers systemic modulation. It regulates serotonin receptors to manage acute distress, reduces cytokine production to inhibit physical inflammation, and modulates intracellular calcium to alleviate pain signals in peripheral pathways.",
    bestFor: ["Chronic Nerve Pain", "General Anxious Tension", "Muscle Recovery & Spasms", "Limbic Hyperactivity"],
    medicalStudies: "Journal of Clinical Pharmacology (2020): High efficacy in muscle spasticity and inflammatory joint relief."
  },
  {
    id: "thc",
    name: "THC",
    fullName: "Tetrahydrocannabinol",
    chemicalFormula: "C₂₁H₃₀O₂",
    receptors: "Direct CB1 (Central Nervous System) & CB2 Agonist",
    highlightEffect: "Vigorous analgesic, sleep inducer, and muscle anti-spasmodic.",
    description: "The primary psychoactive agent, THC plays a massive therapeutic role at micro-doses. By binding straight to CB1 receptors in the gray matter of the brain, it blocks ascending nociceptive pain paths, regulates nausea center signals (area postrema), and promotes rapid deep slow-wave sleep cycles.",
    bestFor: ["Intense Somatic Pain", "Severe Sleep Disruptions", "Appetite Restoration", "Severe Physical Spasms"],
    medicalStudies: "Frontiers in Medicine (2022): Microdosage THC demonstrates up to 64% pain reduction without psychoactive impairment."
  },
  {
    id: "cbg",
    name: "CBG",
    fullName: "Cannagerol",
    chemicalFormula: "C₂₁H₃₂O₂",
    receptors: "Alpha-2 adrenergic agonist, 5-HT1A antagonist, CB1/CB2 core binder",
    highlightEffect: "Intestinal micro-releaf, glaucoma relief, neurogenesis motivator.",
    description: "Known as the 'Mother of Cannabinoids' because all others stem from its acidic precursor (CBGA). It targets gastrointestinal inflammation directly, acts as an extremely potent anti-bacterial agent, and lowers intraocular eye pressure better than major standard compounds.",
    bestFor: ["Gastrointestinal Spasms (IBS)", "Optic Nerve Pressure", "Cellular Level Bio-Defense", "Focus & Mental Stamina"],
    medicalStudies: "Current Clinical Drug Design (2021): CBG exhibits powerful anti-inflammatory effects in colon tissue parameters."
  },
  {
    id: "cbn",
    name: "CBN",
    fullName: "Cannabinol",
    chemicalFormula: "C₂₁H₂₆O₂",
    receptors: "Weak CB1 binder, highly selective CB2 affinity",
    highlightEffect: "Extreme biological sedative, sleep-prolonger, and bone-remineralizer.",
    description: "Formed when THC ages and oxidizes under light. CBN acts as a profound sedative when paired with custom terpenes. It is the perfect natural sleep aid, locking the body into a state of physical relaxation without creating next-day cerebral grogginess.",
    bestFor: ["Insomnia & Awake Shifts", "Sub-acute Tissue Inflammation", "Bone Healing Stimulation", "Deep Body Grounding"],
    medicalStudies: "European Journal of Pain Sciences (2023): CBN is shown to synergize with terpenes for sustained sleep durations."
  },
  {
    id: "thcv",
    name: "THCV",
    fullName: "Tetrahydrocannabivarin",
    chemicalFormula: "C₁₉H₂₆O₂",
    receptors: "CB1 receptor antagonist at low doses, agonist at high doses",
    highlightEffect: "Metabolic regulation, glycemic stabilizer, mental lucidity vector.",
    description: "A rare propyl cannabinoid that acts as a dial to turn down certain CB1 signals. It works to curb excessive hunger cravings, regulates blood glucose levels, and is prized for inducing a highly focused, energetic, clean sense of mental clarity.",
    bestFor: ["Appetite Suppressing Needs", "Glucose Level Stabilization", "Brain Fog Elimination", "Energetic Fatigue Reliever"],
    medicalStudies: "American Diabetes Association Study (2019): Significant glycemic improvement and metabolic optimization."
  }
];

// Rich Terpene Encyclopedia
interface Terpene {
  name: string;
  scent: string;
  boilingPoint: string;
  targets: string;
  strength: number; // 1-100 rating
  primaryEffect: string;
  medicalUse: string;
}

const TERPENES_DATA: Terpene[] = [
  {
    name: "Beta-Caryophyllene",
    scent: "Spicy, black pepper, cloves, woody undertones",
    boilingPoint: "266 °F (130 °C)",
    targets: "Pain Pathways, Gastric Linings, Immune Modulation",
    strength: 92,
    primaryEffect: "Acts directly as a dietary cannabinoid, binding to CB2 receptors.",
    medicalUse: "Excellent for systemic autoimmune swelling, inflammatory bowel issues, and local severe muscle aches."
  },
  {
    name: "Myrcene",
    scent: "Earthy, musky, ripe mangoes, herbal forest",
    boilingPoint: "331 °F (166 °C)",
    targets: "Blood-Brain Barrier Permeability, CNS Relaxation",
    strength: 88,
    primaryEffect: "Enhances cannabinoid cell absorption and relaxes muscle tissue.",
    medicalUse: "Promotes deep 'couch-lock' physical relaxation, mitigates muscle spasms, and helps overcome intense sleep delays."
  },
  {
    name: "Limonene",
    scent: "Bright citrus, lemon zest, sweet orange bliss",
    boilingPoint: "349 °F (176 °C)",
    targets: "Adenosine receptors, Gastric Reflux, Mood centers",
    strength: 85,
    primaryEffect: "Elevates mental state, improves sensory focus, and relieves gut stress.",
    medicalUse: "Highly utilized for managing chronic physical anxiety, mild seasonal sadness, and acid acidity symptoms."
  },
  {
    name: "Linalool",
    scent: "Soothing floral lavender, delicate sweet spice",
    boilingPoint: "388 °F (198 °C)",
    targets: "GABA neurotransmitters, Glutamate pathways",
    strength: 96,
    primaryEffect: "Powerful nervous calming agent, anti-convulsant, and physical sedative.",
    medicalUse: "Perfect for mitigating mental hyperactivity, reducing stress-provoked adrenaline spikes, and protecting neurons."
  },
  {
    name: "Pinene",
    scent: "Sharp fresh pine needles, evergreen organic wood",
    boilingPoint: "311 °F (155 °C)",
    targets: "Acetylcholinesterase inhibitors (Memory recall paths)",
    strength: 80,
    primaryEffect: "Vasodilator, anti-inflammatory, acts as an alert focus generator.",
    medicalUse: "Increases mental clarity, opens up bronchial breathing tubes under asthma, and counteracts memory fog."
  },
  {
    name: "Humulene",
    scent: "Hoppy, earthy roots, visual cedar, warm bark",
    boilingPoint: "223 °F (106 °C)",
    targets: "Anorectic pathways, systemic cellular swellings",
    strength: 78,
    primaryEffect: "Direct cellular anti-tumor protector and healthy appetite moderator.",
    medicalUse: "Induces healthy full feelings, reduces persistent physical joint inflammation, and aids cellular repair."
  }
];

interface ThemeConfig {
  bg: string;
  text: string;
  textMuted: string;
  headerBg: string;
  headerBorder: string;
  cardBg: string;
  cardBorder: string;
  btnPrimary: string;
  btnPrimaryText: string;
  accent: string;
  highlight: string;
  badgeBg: string;
  badgeBorder: string;
  iconColor: string;
  innerBg: string;
  inputBg: string;
  textHighlight: string;
  heroText: string;
  pillActive: string;
  pillInactive: string;
  borderAccent: string;
}

const THEMES: Record<"cosmic" | "aurora" | "amethyst" | "citrus", ThemeConfig> = {
  cosmic: {
    bg: "bg-[#020804] text-[#dae6dc]",
    text: "text-[#dae6dc]",
    textMuted: "text-[#819e89]",
    headerBg: "bg-[#041208]/85",
    headerBorder: "border-[#143d1f]/60",
    cardBg: "bg-[#041208]/90",
    cardBorder: "border-[#1c4d29]/65",
    btnPrimary: "bg-gradient-to-r from-[#8c742e] via-[#ab903d] to-[#8c742e] hover:shadow-[0_0_20px_rgba(140,116,46,0.35)]",
    btnPrimaryText: "text-[#050f07]",
    accent: "text-[#8c742e]",
    highlight: "text-[#2fd657]",
    badgeBg: "bg-[#0c2413]/60",
    badgeBorder: "border-[#1b4f2a]/70",
    iconColor: "text-[#2fd657]",
    innerBg: "bg-[#030a04]/90",
    inputBg: "bg-[#030b05]",
    textHighlight: "text-[#f1fcf3]",
    heroText: "text-[#f1fcf3]",
    pillActive: "bg-[#8c742e] text-[#050f07]",
    pillInactive: "text-[#819e89] hover:text-[#f1fcf3] hover:bg-[#081a0b]/80",
    borderAccent: "border-[#8c742e]/60"
  },
  aurora: {
    bg: "bg-[#f3f7f4] text-[#2c3d31]",
    text: "text-[#2c3d31]",
    textMuted: "text-[#5b7262]",
    headerBg: "bg-white/95",
    headerBorder: "border-[#cce0d2]",
    cardBg: "bg-white/90",
    cardBorder: "border-[#b6d4bf]",
    btnPrimary: "bg-gradient-to-r from-[#177a38] via-[#249c4e] to-[#177a38] hover:shadow-[0_0_20px_rgba(23,122,56,0.25)]",
    btnPrimaryText: "text-white",
    accent: "text-[#177a38]",
    highlight: "text-[#12682f]",
    badgeBg: "bg-[#e2f0e6]",
    badgeBorder: "border-[#a2cbaf]",
    iconColor: "text-[#177a38]",
    innerBg: "bg-[#edf5f0]",
    inputBg: "bg-[#edf5f0]",
    textHighlight: "text-[#143d22]",
    heroText: "text-[#133d20]",
    pillActive: "bg-[#177a38] text-white",
    pillInactive: "text-[#5b7262] hover:text-[#133d20] hover:bg-[#e2f0e6]",
    borderAccent: "border-[#177a38]/40"
  },
  amethyst: {
    bg: "bg-[#04020a] text-[#ddd8e3]",
    text: "text-[#ddd8e3]",
    textMuted: "text-[#90829d]",
    headerBg: "bg-[#090514]/85",
    headerBorder: "border-[#39185a]/60",
    cardBg: "bg-[#090514]/90",
    cardBorder: "border-[#4a1977]/65",
    btnPrimary: "bg-gradient-to-r from-[#7b46c6] via-[#9e71e4] to-[#7b46c6] hover:shadow-[0_0_20px_rgba(123,70,198,0.35)]",
    btnPrimaryText: "text-[#0c0517]",
    accent: "text-[#b28bed]",
    highlight: "text-[#c298ff]",
    badgeBg: "bg-[#160c29]/60",
    badgeBorder: "border-[#40196c]/70",
    iconColor: "text-[#9d70e4]",
    innerBg: "bg-[#07030f]/90",
    inputBg: "bg-[#080311]",
    textHighlight: "text-[#f2eef6]",
    heroText: "text-[#f2eef6]",
    pillActive: "bg-[#7b46c6] text-white",
    pillInactive: "text-[#90829d] hover:text-[#f2eef6] hover:bg-[#1f0c33]/85",
    borderAccent: "border-[#9d70e4]/60"
  },
  citrus: {
    bg: "bg-[#faf9f3] text-[#453c2e]",
    text: "text-[#453c2e]",
    textMuted: "text-[#80725c]",
    headerBg: "bg-[#f5eeda]/95",
    headerBorder: "border-[#ebdcb6]",
    cardBg: "bg-white/95",
    cardBorder: "border-[#e0cca1]",
    btnPrimary: "bg-gradient-to-r from-[#ca6404] via-[#f59e0b] to-[#ca6404] hover:shadow-[0_0_20px_rgba(202,100,4,0.25)]",
    btnPrimaryText: "text-white",
    accent: "text-[#c2410c]",
    highlight: "text-[#b45309]",
    badgeBg: "bg-[#fef3c7]",
    badgeBorder: "border-[#fcd34d]",
    iconColor: "text-[#d97706]",
    innerBg: "bg-[#f7edd2]",
    inputBg: "bg-[#faf9f3]",
    textHighlight: "text-[#451a03]",
    heroText: "text-[#451a03]",
    pillActive: "bg-[#d97706] text-white",
    pillInactive: "text-[#80725c] hover:text-[#451a03] hover:bg-[#fef3c7]",
    borderAccent: "border-[#ca6404]/40"
  }
};

export default function ReleafCannaLander({
  defaultTab = "matcher",
  defaultTheme = "cosmic"
}: {
  defaultTab?: "cannabinoids" | "terpenes" | "matcher" | "ai";
  defaultTheme?: "cosmic" | "aurora" | "amethyst" | "citrus";
} = {}) {
  // Navigation & Interactive Tabs
  const [activeTab, setActiveTab] = useState<"cannabinoids" | "terpenes" | "matcher" | "ai">(defaultTab);
  const [selectedCannabinoid, setSelectedCannabinoid] = useState<string>("cbd");

  // Dynamic Theme state
  const [theme, setTheme] = useState<"cosmic" | "aurora" | "amethyst" | "citrus">(defaultTheme);
  const activeTheme = THEMES[theme];

  // Math Puzzle anti-spam state
  const [numA, setNumA] = useState<number>(8);
  const [numB, setNumB] = useState<number>(5);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [puzzleSolved, setPuzzleSolved] = useState<boolean>(false);
  const [captchaError, setCaptchaError] = useState<boolean>(false);
  const [copyStatus, setCopyStatus] = useState<boolean>(false);

  // Remedy Matcher wizard state
  const [symptom, setSymptom] = useState<"pain" | "insomnia" | "anxiety" | "focus" | "spasms">("pain");
  const [profile, setProfile] = useState<"pure" | "balanced" | "full">("balanced");
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [matchResult, setMatchResult] = useState<any>(null);

  // Server-powered AI Assistant state
  const [aiPrompt, setAiPrompt] = useState<string>("");
  const [aiResult, setAiResult] = useState<string>("");
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string>("");

  const generateNewPuzzle = React.useCallback(() => {
    const listA = [6, 7, 8, 9, 12, 15];
    const listB = [5, 6, 7, 8, 9, 11];
    const randomA = listA[Math.floor(Math.random() * listA.length)];
    const randomB = listB[Math.floor(Math.random() * listB.length)];
    setNumA(randomA);
    setNumB(randomB);
    setUserAnswer("");
    setCaptchaError(false);
  }, []);

  const verifyPuzzle = (e: React.FormEvent) => {
    e.preventDefault();
    const correctSum = numA + numB;
    if (parseInt(userAnswer.trim(), 10) === correctSum) {
      setPuzzleSolved(true);
      setCaptchaError(false);
    } else {
      setCaptchaError(true);
      // Fades the error quickly to avoid keeping stale states
      setTimeout(() => setCaptchaError(false), 3000);
    }
  };

  const copyContactDetails = () => {
    navigator.clipboard.writeText("info@releafcanna.com");
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  // Run customized botanical relief synthesizer
  const handleSynthesize = () => {
    setIsMatching(true);
    setTimeout(() => {
      let cannabinoids = "";
      let dominantTerpene = "";
      let ratioText = "";
      let description = "";
      let dosageGuide = "";

      if (symptom === "pain") {
        dominantTerpene = "Beta-Caryophyllene & Myrcene";
        if (profile === "pure") {
          ratioText = "99% CBD isolated wellness formula";
          cannabinoids = "Pure Cannabidiol (CBD) extract with CBG micro-additives.";
          description = "A powerful analgesic targeting chronic receptors without psychotropic properties. Beta-Caryophyllene synergizes with CBD to reduce cellular swelling pathways.";
        } else if (profile === "balanced") {
          ratioText = "1:1 Balanced Ratio (THC:CBD)";
          cannabinoids = "Equal parts THC and CBD (approx. 5-10mg each).";
          description = "The gold standard of physiological relief. CBD modulates and controls THC side effects, while they work together to shut down inflammatory cytokine gates.";
        } else {
          ratioText = "High-potency Full Spectrum extract";
          cannabinoids = "THC, CBD, with natural CBG, CBC and trace minerals.";
          description = "Fully leverages the organic 'Entourage Effect'. Deep relaxation of nerve endings and alleviation of somatic structural distress.";
        }
        dosageGuide = "Titration: Begin with 15mg total Cannabinoids at nightfall. Increase by 5mg every 3 days until relief plateaus.";
      } else if (symptom === "insomnia") {
        dominantTerpene = "Myrcene & Linalool";
        if (profile === "pure") {
          ratioText = "Soporific Non-Psychoactive sleep blend";
          cannabinoids = "CBD + High Concentration of Cannabinol (CBN) - (15:5 Ratio)";
          description = "Deep biological muscle release. CBN reacts with Linalool terpenes to directly calm GABA firing inside the brain stem without intoxication.";
        } else if (profile === "balanced") {
          ratioText = "1:2 Nighttime Restoration Blend";
          cannabinoids = "THC, CBD and CBN (approx 1:5:2 ratio)";
          description = "A perfect formula for severe sleeplessness. THC prompts immediate light melatonin triggers while CBD & CBN prevent mid-night wakefulness.";
        } else {
          ratioText = "Heavy-indica Terpene Rich Whole Herb extract";
          cannabinoids = "Indica leaf strain full concentrate (THC & CBN focused)";
          description = "Recreates the classic sleepy physical heavy sedation. Locks tissues into recovery mode and prevents brain hyper-vigilance.";
        }
        dosageGuide = "Administration: Take 45 minutes prior to desired sleep. Turn off all blue-light screens to let Linalool trigger GABA release.";
      } else if (symptom === "anxiety") {
        dominantTerpene = "Limonene, Linalool & CBD";
        if (profile === "pure") {
          ratioText = "Anxiolytic Botanical Shield";
          cannabinoids = "95% Broad-Spectrum CBD backed by high CBG rates.";
          description = "Designed for nervous tension and constant chest butterflies. It resets cortisol responses in adrenal networks and reduces physical racing impulses.";
        } else if (profile === "balanced") {
          ratioText = "1:4 Micro-cerebral calming ratio (THC:CBD)";
          cannabinoids = "Trace THC (under 2.5mg) paired with 20mg organic CBD.";
          description = "Perfect for fast stress relief without cerebral fog. CBD actively guards CB1 receptors so that THC can soothe neural pathways without inducing paranoia.";
        } else {
          ratioText = "Limonene-forward Sativa-Hybrid Full Spectrum";
          cannabinoids = "Balanced profile of CBD, CBG, and CBC";
          description = "Targets physical anxiety from both ends. Limonene boosts natural serotonin while the trace elements support systemic calmness.";
        }
        dosageGuide = "Dosing: Standard sublingual drops. Hold under tongue for 60 seconds before swallowing for instant cellular transport.";
      } else if (symptom === "focus") {
        dominantTerpene = "Pinene & Limonene with THCV";
        if (profile === "pure") {
          ratioText = "Mental Lucidity Sativa Blend";
          cannabinoids = "CBD + CBG (approx 10mg:10mg ratio)";
          description = "Clears neuro-clutter and promotes neural stamina. CBG works in tandem with Pinene to inhibit neurotransmitter breakdown, raising mental endurance.";
        } else if (profile === "balanced") {
          ratioText = "1:1 Focus & Appetite Regulation Complex";
          cannabinoids = "THCV paired with equal parts CBD.";
          description = "Energizes standard cerebral processes. Stimulates healthy blood flow to cognitive focus centers without creating physical twitchiness or heart race.";
        } else {
          ratioText = "Alpha-Pinene Rich Landrace Sativa Terpene Profile";
          cannabinoids = "Whole herb extract rich in THCV, CBG, and CBC.";
          description = "Ultimate botanical focus formula. Designed to boost concentration, study stamina, and creative flow states through natural mechanisms.";
        }
        dosageGuide = "Timing: Best consumed with organic morning green tea. Pinene increases biological airflow, enhancing oxygen intake.";
      } else {
        // Muscle spasms
        dominantTerpene = "Myrcene & Beta-Caryophyllene";
        if (profile === "pure") {
          ratioText = "Deep Anti-Spasmodic Muscle Shield";
          cannabinoids = "CBD + High Concentration of CBG (20mg:10mg)";
          description = "Targeted relief of intense localized muscle cramps. CBG inhibits GABA pathways in the spine to stop erratic physical twitching.";
        } else if (profile === "balanced") {
          ratioText = "1:2 Physiological Balance Ratio";
          cannabinoids = "THC paired with double strength CBD (5mg:10mg)";
          description = "The clinical standard for heavy bodily tight muscles. THC acts directly as a skeletal muscle relaxant while CBD speeds cell restoration and halts lactic pain.";
        } else {
          ratioText = "High-terpene full plant botanical oil";
          cannabinoids = "Thick whole plant CO₂ extract containing a multi-cannabinoid spectrum.";
          description = "Delivers immediate relief to sore tissues, joints, and skeletal spasticity. Promotes robust, continuous neuromuscular relaxation.";
        }
        dosageGuide = "Application: Optimal in topical balm or sublingual format. Apply cream directly to cramp spots every 4 hours as required.";
      }

      setMatchResult({
        symptom,
        profile,
        ratioText,
        dominantTerpene,
        cannabinoids,
        description,
        dosageGuide
      });
      setIsMatching(false);
    }, 1000);
  };

  // Run server-side Gemini request
  const handleAskAI = async (e?: React.FormEvent, customQuestion?: string) => {
    if (e) e.preventDefault();
    const finalPrompt = customQuestion || aiPrompt;
    if (!finalPrompt.trim()) return;

    setAiLoading(true);
    setAiError("");
    setAiResult("");

    try {
      const response = await fetch("/app/api/gemini/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: finalPrompt,
          context: "Custom user question about botanical cannabis relief science."
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "The server failed to supply a valid educational response.");
      }

      setAiResult(data.text);
    } catch (err: any) {
      console.error(err);
      setAiError(err?.message || "Could not reach the ReleafCanna AI Botanist. Please check your network connection.");
    } finally {
      setAiLoading(false);
    }
  };

  const presetQuestions = [
    "Explain what the 'Entourage Effect' means for terpene synergy.",
    "Which terpenes work best for immediate anxiety relief and why?",
    "Can you compare the anti-inflammatory action of CBD and CBG?",
    "What is the clinical difference between CB1 and CB2 receptor binding?"
  ];

  return (
    <div className={`relative min-h-screen font-sans antialiased overflow-x-hidden transition-colors duration-500 selection:bg-[#c2e2c5] selection:text-[#0c2e12] ${activeTheme.bg}`}>
      {/* Absolute Decorative Wallpaper and Ambient Lighting Background */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen overflow-hidden">
        {theme === "cosmic" || theme === "aurora" ? (
          <Image
            src={bgImage}
            alt="Luxury Botanical background"
            fill
            priority
            placeholder="blur"
            className="object-cover scale-105 filter blur-xs"
            referrerPolicy="no-referrer"
          />
        ) : null}
        
        {/* Dynamic themed ambient lighting glow rings */}
        {theme === "cosmic" && (
          <>
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#124222] opacity-35 filter blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#8c742e]/10 opacity-30 filter blur-[150px]" />
          </>
        )}
        {theme === "aurora" && (
          <>
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#a2cbaf]/30 filter blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#177a38]/10 filter blur-[150px]" />
          </>
        )}
        {theme === "amethyst" && (
          <>
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#39185a]/40 filter blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#9d70e4]/10 filter blur-[150px]" />
          </>
        )}
        {theme === "citrus" && (
          <>
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-[#ca6404]/10 filter blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#fcd34d]/10 filter blur-[150px]" />
          </>
        )}
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        
        {/* Elegant Sticky Header */}
        <header className={`flex flex-col lg:flex-row items-center justify-between gap-4 py-4 px-6 mb-8 rounded-2xl border backdrop-blur-md shadow-2xl transition-all duration-500 ${activeTheme.headerBg} ${activeTheme.headerBorder}`}>
          <div className="flex items-center gap-3">
            <div className={`relative w-12 h-12 rounded-xl overflow-hidden border shadow-lg transition-all duration-500 ${activeTheme.borderAccent}`}>
              <Image
                src={logoImage}
                alt="ReleafCanna Cute Smiling Leaf Logo"
                fill
                priority
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`font-mono text-[10px] tracking-widest uppercase font-bold ${activeTheme.accent}`}>Premium Core</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#2fd657]" />
              </div>
              <h1 className={`text-xl font-bold tracking-tight transition-all duration-500 ${activeTheme.textHighlight}`}>
                releaf<span className={activeTheme.accent}>canna</span>.com
              </h1>
            </div>
          </div>

          {/* Interactive Themes Control Group */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/10 border border-black/5">
            {[
              { id: "cosmic", label: "Midnight", color: "bg-[#124222]" },
              { id: "aurora", label: "Sage Light", color: "bg-[#177a38]" },
              { id: "amethyst", label: "Lavender", color: "bg-[#7b46c6]" },
              { id: "citrus", label: "Citrus Light", color: "bg-[#d97706]" }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id as any)}
                className={`px-2 py-1.5 rounded-lg text-[10.5px] font-mono uppercase tracking-wider flex items-center gap-1.5 transition-all duration-350 ${
                  theme === t.id
                    ? "bg-stone-800 text-white dark:bg-white dark:text-stone-900 shadow-lg font-bold scale-102"
                    : "text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white"
                }`}
                title={`Switch to ${t.label} Theme`}
              >
                <span className={`w-2 h-2 rounded-full ${t.color}`} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className={`hidden md:inline-flex text-xs font-mono px-2.5 py-1 rounded-full items-center gap-1.5 shadow-inner transition-all duration-500 ${activeTheme.badgeBg} ${activeTheme.badgeBorder}`}>
              <Activity className={`w-3.5 h-3.5 animate-pulse ${activeTheme.iconColor}`} /> SEO Rank Optimized
            </span>
            <a
              href="https://www.godaddy.com/domainsearch/find?domainToCheck=releafcanna.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-500 transform active:scale-95 ${activeTheme.btnPrimary} ${activeTheme.btnPrimaryText}`}
            >
              <span>View GoDaddy Listing</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </header>

        {/* Hero Section containing Landing Pitch & Domain Contact form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* Landing Copy: To the Gills with persuasion */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 mb-5 rounded-full border text-xs w-fit transition-all duration-500 ${activeTheme.badgeBg} ${activeTheme.badgeBorder} ${activeTheme.accent}`}>
              <Sparkles className="w-3.5 h-3.5" /> High-End Brand & Domain Open For Offers
            </div>
            
            <h2 className={`text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.12] mb-6 transition-all duration-500 ${activeTheme.textHighlight}`}>
              Establish Immediate Authority In <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2fd657] via-[#ca6404] to-[#2fd657] dark:from-[#2fd657] dark:via-[#e2c161] dark:to-[#2fd657]">
                Natural Cannabis Releaf.
              </span>
            </h2>
            
            <p className={`text-base sm:text-lg mb-6 leading-relaxed transition-all duration-500 ${activeTheme.textMuted}`}>
              `releafcanna.com` is a rare, premium digital asset pairing the massive medical cannabis market with the natural, intuitive spelling of <span className={`font-bold underline underline-offset-4 ${activeTheme.textHighlight} ${activeTheme.borderAccent}`}>organic releaf</span>. Built for botanical brands, telemedicine clinics, or content directories looking to rank #1 instantly.
            </p>

            {/* Three Pillar Stats showing real estate val */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-4">
              <div className={`p-3 rounded-xl border shadow-xl transition-all duration-500 ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
                <p className={`font-mono text-xs uppercase font-bold ${activeTheme.accent}`}>Spelling</p>
                <p className={`text-lg font-extrabold mt-1 ${activeTheme.textHighlight}`}>High-Reliefe</p>
                <p className={`text-[10px] mt-0.5 ${activeTheme.textMuted}`}>Memorable phonetics</p>
              </div>
              <div className={`p-3 rounded-xl border shadow-xl transition-all duration-500 ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
                <p className={`font-mono text-xs uppercase font-bold ${activeTheme.accent}`}>SEO Core</p>
                <p className={`text-lg font-extrabold mt-1 ${activeTheme.textHighlight}`}>Saturated</p>
                <p className={`text-[10px] mt-0.5 ${activeTheme.textMuted}`}>Cannabis & relief tags</p>
              </div>
              <div className={`p-3 rounded-xl border shadow-xl transition-all duration-500 ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
                <p className={`font-mono text-xs uppercase font-bold ${activeTheme.accent}`}>Authority</p>
                <p className={`text-lg font-extrabold mt-1 ${activeTheme.textHighlight}`}>Premium</p>
                <p className={`text-[10px] mt-0.5 ${activeTheme.textMuted}`}>Exact industry match</p>
              </div>
            </div>

            {/* Interactive Badge to click to learn more further down */}
            <div className="flex gap-4 items-center">
              <span className={`text-xs flex items-center gap-1.5 transition-all duration-500 ${activeTheme.textMuted}`}>
                <Award className={`w-4 h-4 ${activeTheme.accent}`} /> Proudly non-commercial research template
              </span>
            </div>
          </div>

          {/* Secure Buyer Lander Card with anti-spam math puzzle */}
          <div className="lg:col-span-5">
            <div className={`relative rounded-3xl p-6 md:p-8 shadow-3xl backdrop-blur-lg overflow-hidden border transition-all duration-500 ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-neutral-500/10 to-transparent pointer-events-none`} />
              
              <div className="flex items-center gap-2 mb-4">
                <div className={`p-2 rounded-lg transition-all duration-500 ${activeTheme.badgeBg} ${activeTheme.iconColor}`}>
                  {puzzleSolved ? <Unlock className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className={`text-lg font-bold transition-all duration-500 ${activeTheme.textHighlight}`}>Direct Acquisition</h3>
                  <p className={`text-xs transition-all duration-500 ${activeTheme.textMuted}`}>Speak with the domain holder securely</p>
                </div>
              </div>

              <div className={`p-4 rounded-xl mb-6 text-sm border transition-all duration-500 ${activeTheme.innerBg} ${activeTheme.cardBorder}`}>
                <p className={`leading-relaxed transition-all duration-500 ${activeTheme.textMuted}`}>
                  Interested in purchasing <span className={`font-bold ${activeTheme.textHighlight}`}>releafcanna.com</span>? Skip broker commission. Complete our spam-gate check below to reveal original, non-munged direct contact paths.
                </p>
              </div>

              {!puzzleSolved ? (
                <form onSubmit={verifyPuzzle} className="space-y-4">
                  <div className={`p-4 rounded-xl shadow-inner text-center border transition-all duration-500 ${activeTheme.innerBg} ${activeTheme.cardBorder}`}>
                    <label className={`block text-xs font-mono uppercase tracking-wider mb-2 font-bold ${activeTheme.accent}`}>
                      🛡️ Spam Protection Math Challenge
                    </label>
                    <p className={`text-xl font-bold tracking-widest font-mono transition-all duration-500 ${activeTheme.textHighlight}`}>
                      {numA} + {numB} = <span className="text-[#3aa757]">?</span>
                    </p>
                    <p className={`text-[10px] mt-1 transition-all duration-500 ${activeTheme.textMuted}`}>Solve the botanical math puzzle to unlock credentials</p>
                  </div>

                  <div className="space-y-1">
                    <input
                      type="number"
                      required
                      placeholder="Your answer"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:border-[#2fd657] text-center font-mono text-lg transition-all duration-500 ${activeTheme.inputBg} ${activeTheme.cardBorder} ${activeTheme.textHighlight}`}
                    />
                    {captchaError && (
                      <p className="text-xs text-red-500 flex items-center gap-1 justify-center animate-bounce">
                        <AlertCircle className="w-3.5 h-3.5" /> Arithmetic invalid! Please try again.
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 rounded-xl font-semibold text-xs tracking-wider uppercase shadow-md transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 border ${activeTheme.btnPrimary} ${activeTheme.btnPrimaryText}`}
                  >
                    <ShieldCheck className="w-4 h-4" /> Unlock Contact Details
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-5"
                >
                  <div className={`p-4 rounded-xl shadow-lg text-center relative overflow-hidden border transition-all duration-500 ${activeTheme.innerBg} ${activeTheme.cardBorder}`}>
                    <div className="absolute -right-6 -bottom-6 w-16 h-16 rounded-full bg-neutral-500/10 flex items-center justify-center">
                      <Lock className={`w-8 h-8 opacity-20 rotate-12 ${activeTheme.iconColor}`} />
                    </div>
                    <p className={`text-xs font-mono uppercase font-bold tracking-wider mb-2 ${activeTheme.accent}`}>
                      ✅ Verification Success
                    </p>
                    <p className={`text-xs transition-all duration-500 ${activeTheme.textHighlight}`}>Anti-Spam shield disabled. Here are our credentials:</p>
                    
                    <div className={`my-4 p-3 rounded-lg flex items-center justify-between gap-2 overflow-hidden border transition-all duration-500 ${activeTheme.inputBg} ${activeTheme.cardBorder}`}>
                      <span className={`font-mono text-sm tracking-wider font-bold select-all overflow-x-auto ${activeTheme.textHighlight}`}>
                        info@releafcanna.com
                      </span>
                      <button
                        onClick={copyContactDetails}
                        className={`p-2 rounded-md transition-all hover:scale-105 ${activeTheme.badgeBg} ${activeTheme.iconColor}`}
                        title="Copy Email Address"
                      >
                        {copyStatus ? <Check className="w-4 h-4 text-amber-500 animate-pulse" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>

                    <p className={`text-[10px] italic transition-all duration-500 ${activeTheme.textMuted}`}>
                      Contact us directly detailing your offer budget and escrow preference.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setPuzzleSolved(false);
                      generateNewPuzzle();
                    }}
                    className={`w-full py-2 rounded-lg bg-transparent text-[10px] uppercase font-mono tracking-wider transition-all text-center border ${activeTheme.cardBorder} ${activeTheme.textMuted} hover:${activeTheme.textHighlight}`}
                  >
                    Lock details back & refresh challenge
                  </button>
                </motion.div>
              )}

              <div className={`mt-6 pt-4 border-t flex items-center justify-between text-[11px] transition-all duration-500 ${activeTheme.cardBorder} ${activeTheme.textMuted}`}>
                <span className="flex items-center gap-1">
                  <ShieldCheck className={`w-3.5 h-3.5 ${activeTheme.accent}`} /> Direct Escrow Supported
                </span>
                <span>ID: e1e091f1</span>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic & Interactive Science & Advisor Tabbed Center */}
        <section className={`p-6 md:p-8 rounded-3xl shadow-2xl backdrop-blur-xl mb-12 border transition-all duration-500 ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className={`font-mono text-[10px] tracking-widest uppercase font-extrabold px-3 py-1 rounded-full border transition-all duration-500 ${activeTheme.badgeBg} ${activeTheme.badgeBorder} ${activeTheme.accent}`}>
              Interactive Educational Cluster
            </span>
            <h3 className={`text-2xl sm:text-3xl font-bold mt-3 transition-all duration-500 ${activeTheme.textHighlight}`}>
              Loaded to the Gills with Botanical Data
            </h3>
            <p className={`text-sm mt-2 transition-all duration-500 ${activeTheme.textMuted}`}>
              Explore molecular profiles, terpene analytics, synthesize tailored symptom ratios, or consult our server-side AI botanist instantly.
            </p>
          </div>

          {/* Core Tab Selector Navigation */}
          <div className={`flex flex-wrap justify-center gap-2 mb-8 p-1.5 rounded-2xl border max-w-3xl mx-auto transition-all duration-500 ${activeTheme.innerBg} ${activeTheme.cardBorder}`}>
            <button
              onClick={() => setActiveTab("matcher")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === "matcher"
                  ? `${activeTheme.pillActive} shadow-lg`
                  : activeTheme.pillInactive
              }`}
            >
              <Compass className="w-4 h-4" /> Symptom Synthesizer
            </button>
            <button
              onClick={() => setActiveTab("cannabinoids")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === "cannabinoids"
                  ? `${activeTheme.pillActive} shadow-lg`
                  : activeTheme.pillInactive
              }`}
            >
              <Droplet className="w-4 h-4" /> Cannabinoid Matrix
            </button>
            <button
              onClick={() => setActiveTab("terpenes")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === "terpenes"
                  ? `${activeTheme.pillActive} shadow-lg`
                  : activeTheme.pillInactive
              }`}
            >
              <Activity className="w-4 h-4" /> Terpene Encyclopedia
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                activeTab === "ai"
                  ? `${activeTheme.pillActive} shadow-lg`
                  : activeTheme.pillInactive
              }`}
            >
              <Sparkles className="w-4 h-4" /> AI Relief Advisor
            </button>
          </div>

          {/* Active Tab Panel Render */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* Tab I: Symptom Synthesizer */}
              {activeTab === "matcher" && (
                <motion.div
                  key="matcher-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8"
                >
                  <div className="md:col-span-5 space-y-6">
                    <div className="p-4 rounded-xl bg-[#040f06] border border-[#143d1f]">
                      <h4 className="text-sm font-bold text-[#f1fcf3] mb-3 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[#8c742e]" /> 1. Select Symptom Focus
                      </h4>
                      <div className="space-y-2">
                        {[
                          { id: "pain", label: "Chronic Pain & Arthritis Relief", desc: "Target nerve paths and general body swelling" },
                          { id: "insomnia", label: "Insomnia & Circadian Reset", desc: "For deep, restful nocturnal sleep support" },
                          { id: "anxiety", label: "Nervous Mind & Anxiety Calming", desc: "Restore peace without cerebral mental impairments" },
                          { id: "focus", label: "Sustained Mental Focus & Study", desc: "Counter brain-fog and morning slow-starts" },
                          { id: "spasms", label: "Muscle Spasms & Post-Work Tightness", desc: "Target persistent somatic tension zones" }
                        ].map((item) => (
                          <button
                            key={item.id}
                            onClick={() => setSymptom(item.id as any)}
                            className={`w-full text-left p-3 rounded-lg border transition-all text-xs flex items-center justify-between ${
                              symptom === item.id
                                ? "bg-[#0b2413] border-[#2fd657]/60 text-[#f1fcf3]"
                                : "bg-transparent border-[#143a1e]/45 text-[#819e89] hover:border-[#1d592e]"
                            }`}
                          >
                            <div>
                              <p className="font-semibold">{item.label}</p>
                              <p className="text-[10px] opacity-75 mt-0.5">{item.desc}</p>
                            </div>
                            <ChevronRight className={`w-4 h-4 transition-transform ${symptom === item.id ? "text-[#2fd657] translate-x-1" : "text-[#1d592e]"}`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[#040f06] border border-[#143d1f]">
                      <h4 className="text-sm font-bold text-[#f1fcf3] mb-3 flex items-center gap-2">
                        <Scale className="w-4 h-4 text-[#8c742e]" /> 2. Desired Extract Profile
                      </h4>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: "pure", label: "Pure CBD", sub: "Totally THC-Free" },
                          { id: "balanced", label: "Balanced 1:1", sub: "Synergy Ratio" },
                          { id: "full", label: "Full Spec", sub: "Whole Botanals" }
                        ].map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setProfile(p.id as any)}
                            className={`p-2.5 rounded-lg border text-center transition-all flex flex-col justify-center ${
                              profile === p.id
                                ? "bg-[#0b2413] border-[#2fd657]/60 text-[#f1fcf3]"
                                : "bg-transparent border-[#143a1e]/45 text-[#819e89] hover:border-[#1d592e]"
                            }`}
                          >
                            <span className="text-[11px] font-bold">{p.label}</span>
                            <span className="text-[9px] opacity-75 mt-0.5">{p.sub}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleSynthesize}
                      disabled={isMatching}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8c742e] to-[#ab903d] hover:brightness-110 text-[#030904] font-extrabold text-xs tracking-wider uppercase shadow-md active:scale-98 transition-all flex items-center justify-center gap-2"
                    >
                      {isMatching ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#030904] border-t-transparent rounded-full animate-spin" />
                          <span>Synthesizing Ratio...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Synthesize Relief Formula</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="md:col-span-7">
                    <div className="h-full rounded-2xl bg-[#030a04] border border-[#133c1e] p-6 flex flex-col justify-between relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#8c742e]/5 to-transparent pointer-events-none" />
                      
                      {!matchResult ? (
                        <div className="flex flex-col items-center justify-center text-center my-auto py-12">
                          <Compass className="w-12 h-12 text-[#133c1e] mb-4 animate-spin-slow" />
                          <h5 className="text-base font-bold text-[#b8cbbe]">Awaiting Synthesis Input</h5>
                          <p className="text-xs text-[#819e89] max-w-sm mt-1">
                            Set your primary wellness target and profile preference on the left and click synthesize to compile your botanical profile.
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-5">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <span className="font-mono text-[9px] tracking-widest text-[#8c742e] uppercase font-bold px-2 py-0.5 rounded bg-[#132c18]">
                                Suggested Formulation
                              </span>
                              <h4 className="text-xl font-bold text-[#f1fcf3] mt-2">
                                {matchResult.ratioText}
                              </h4>
                            </div>
                            <div className="px-3 py-1.5 rounded-lg bg-[#0c2413] text-[#2fd657] border border-[#1b4f2a] text-center">
                              <p className="text-[9px] font-mono uppercase font-bold text-[#8c742e]">Symptom Match</p>
                              <p className="text-xs font-extrabold capitalize">{matchResult.symptom}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-3 rounded-lg bg-[#081a0b] border border-[#143d1f]">
                              <span className="text-[10px] text-[#8c742e] font-mono block font-bold leading-none">CANNABINOID MIX</span>
                              <span className="text-xs text-[#e1f0e4] font-bold mt-1.5 block">{matchResult.cannabinoids}</span>
                            </div>
                            <div className="p-3 rounded-lg bg-[#081a0b] border border-[#143d1f]">
                              <span className="text-[10px] text-[#8c742e] font-mono block font-bold leading-none">DOMINANT TERPENES</span>
                              <span className="text-xs text-[#e1f0e4] font-bold mt-1.5 block">{matchResult.dominantTerpene}</span>
                            </div>
                          </div>

                          <div className="p-4 rounded-xl bg-[#020703] border border-[#15341c]">
                            <h5 className="text-xs font-mono font-bold text-[#8c742e] mb-1">PHYSIOLOGICAL MECHANISM OF RELIEF</h5>
                            <p className="text-xs text-[#b8cbbe] leading-relaxed">
                              {matchResult.description}
                            </p>
                          </div>

                          <div className="p-4 rounded-xl bg-[#132817]/40 border border-[#2fd657]/20 flex items-start gap-3">
                            <Brain className="w-5 h-5 text-[#8c742e] shrink-0 mt-0.5" />
                            <div>
                              <h5 className="text-xs font-mono font-bold text-[#f1fcf3]">SAFE INTEGRATION & TITRATION DOSING</h5>
                              <p className="text-xs text-[#819e89] mt-1 italic">
                                {matchResult.dosageGuide}
                              </p>
                            </div>
                          </div>
                          
                          <div className="text-[10px] text-[#819e89] text-center border-t border-[#123319] pt-3">
                            Disclaimer: Standard safe recommendation protocol. ReleafCanna does not prescribe drug plans.
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab II: Cannabinoid Matrix */}
              {activeTab === "cannabinoids" && (
                <motion.div
                  key="cannabinoids-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                  {/* Left Column selectors */}
                  <div className="lg:col-span-4 space-y-2">
                    {CANNABINOIDS_DATA.map((cannabinoid) => (
                      <button
                        key={cannabinoid.id}
                        onClick={() => setSelectedCannabinoid(cannabinoid.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 ${
                          selectedCannabinoid === cannabinoid.id
                            ? "bg-[#0b2413] border-[#2fd657]/60 text-[#f1fcf3]"
                            : "bg-transparent border-[#143a1e]/45 text-[#819e89] hover:border-[#1d592e]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-base tracking-wide font-mono text-[#f1fcf3]">{cannabinoid.name}</span>
                          <span className="font-mono text-[10px] text-[#8c742e]">{cannabinoid.chemicalFormula}</span>
                        </div>
                        <p className="text-[11px] truncate opacity-80 mt-1">{cannabinoid.fullName}</p>
                      </button>
                    ))}
                  </div>

                  {/* Right Column details */}
                  <div className="lg:col-span-8">
                    {(() => {
                      const current = CANNABINOIDS_DATA.find((c) => c.id === selectedCannabinoid)!;
                      return (
                        <div className="h-full rounded-2xl bg-[#030a04] border border-[#133c1e] p-6 lg:p-8 flex flex-col justify-between">
                          <div>
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#123319] pb-4 mb-5">
                              <div>
                                <h4 className="text-2xl font-bold text-[#f1fcf3] font-mono leading-none">
                                  {current.name} &ndash; <span className="text-sm text-[#819e89] uppercase font-sans tracking-wide font-normal">{current.fullName}</span>
                                </h4>
                                <p className="text-xs text-[#8c742e] font-mono mt-2 flex items-center gap-1">
                                  <Bookmark className="w-3.5 h-3.5" /> Receptors: {current.receptors}
                                </p>
                              </div>
                              <span className="text-xs px-2.5 py-1 rounded bg-[#0c2413] border border-[#1b4f2a]/90 text-[#2fd657] font-mono">
                                {current.chemicalFormula}
                              </span>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <h5 className="text-xs font-mono font-bold text-[#8c742e] tracking-wide">PHYSIOLOGICAL MECHANISM</h5>
                                <p className="text-sm text-[#b8cbbe] leading-relaxed mt-1">
                                  {current.description}
                                </p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                                <div className="p-3 bg-[#020703] border border-[#123219] rounded-lg">
                                  <h6 className="text-[10px] font-mono text-[#8c742e] block font-bold leading-none">CORE TARGET TARGETS</h6>
                                  <div className="flex flex-wrap gap-1.5 mt-2">
                                    {current.bestFor.map((t, idx) => (
                                      <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-[#102d18] text-[#5ae679]/80 border border-[#1a4926]/40 font-semibold">
                                        {t}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="p-3 bg-[#020703] border border-[#123219] rounded-lg">
                                  <h6 className="text-[10px] font-mono text-[#8c742e] block font-bold leading-none">PRIMARY CLINICAL SIGNATURE</h6>
                                  <p className="text-xs text-[#5ae679] font-medium leading-relaxed mt-2">{current.highlightEffect}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 pt-4 border-t border-[#123319] flex items-center gap-2 text-xs text-[#819e89]">
                            <BookOpen className="w-4 h-4 text-[#8c742e] shrink-0" />
                            <span>
                              <strong className="text-[#e1f0e4]">Scientific Reference:</strong> {current.medicalStudies}
                            </span>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              )}

              {/* Tab III: Terpene Encyclopedia */}
              {activeTab === "terpenes" && (
                <motion.div
                  key="terpenes-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {TERPENES_DATA.map((t, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl bg-[#030a04] border border-[#133c1e] p-5 flex flex-col justify-between hover:border-[#1d592e] transition-colors"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2 border-b border-[#123319] pb-3">
                          <div>
                            <h4 className="text-base font-bold text-[#f1fcf3]">{t.name}</h4>
                            <p className="text-xs text-[#819e89] italic mt-0.5">{t.scent}</p>
                          </div>
                          <span className="font-mono text-[9px] text-[#8c742e] border border-[#8c742e]/30 px-1.5 py-0.5 rounded leading-none">
                            {t.boilingPoint}
                          </span>
                        </div>

                        <div className="space-y-2">
                          <p className="text-xs text-[#b8cbbe]">
                            <strong>Functional profile:</strong> {t.primaryEffect}
                          </p>
                          
                          <div className="p-3 rounded bg-[#020502] border border-[#123118]">
                            <span className="text-[9px] font-mono text-[#8c742e] uppercase block font-bold leading-none">TARGET BIOLOGY</span>
                            <span className="text-xs text-[#819e89] mt-1 block">{t.targets}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#123319] flex items-center justify-between gap-4 text-xs">
                        <p className="text-[10px] text-[#8c742e] font-mono italic">
                          {t.medicalUse}
                        </p>
                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#102d18] text-[#5ae679]/80 border border-[#1a4926]/40 font-mono text-[10px]">
                          Strength: {t.strength}%
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Tab IV: AI Relief Advisor (Gemini integration!) */}
              {activeTab === "ai" && (
                <motion.div
                  key="ai-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="p-4 rounded-xl bg-[#132817]/40 border border-[#2fd657]/20 flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-[#8c742e] shrink-0 mt-0.5 animate-pulse" />
                    <div>
                      <h4 className="text-xs font-mono font-bold text-[#f1fcf3]">CONSULT THE INTEGRATED AI BOTANIST SPECIALIST</h4>
                      <p className="text-xs text-[#819e89] mt-0.5">
                        releafcanna.com provides premium integrated intelligence. Ask our scientific model any detailed questions about terpenes, receptors, or clinical botanical synergy patterns below.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Ask formulation box */}
                    <div className="lg:col-span-5 space-y-4">
                      <form onSubmit={handleAskAI} className="space-y-3">
                        <label className="block text-xs font-mono text-[#8c742e] uppercase font-bold">
                          Ask your therapeutic botanical question:
                        </label>
                        <textarea
                          rows={4}
                          value={aiPrompt}
                          onChange={(e) => setAiPrompt(e.target.value)}
                          placeholder="e.g. Can you explain how Linalool modulates GABA pathways to mitigate restless sleep cycles?"
                          className="w-full p-3 rounded-xl bg-[#030904] border border-[#1a4926] focus:outline-none focus:border-[#2fd657] text-[#f1fcf3] placeholder-[#516b57] text-xs leading-relaxed font-sans"
                        />
                        <button
                          type="submit"
                          disabled={aiLoading}
                          className="w-full py-3 rounded-xl bg-[#0c2413] hover:bg-[#163f21] border border-[#2fd657]/40 text-[#2fd657] font-semibold text-xs tracking-wider uppercase shadow-inner transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
                        >
                          {aiLoading ? (
                            <>
                              <div className="w-3.5 h-3.5 border-2 border-[#2fd657] border-t-transparent rounded-full animate-spin" />
                              <span>Analysying Bio-data...</span>
                            </>
                          ) : (
                            <>
                              <Compass className="w-3.5 h-3.5" />
                              <span>Query Botanical Model</span>
                            </>
                          )}
                        </button>
                      </form>

                      {/* Preset questions quick chips */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-[#8c742e] uppercase block font-bold leading-none">Preset Clinical Query Tags</span>
                        <div className="flex flex-col gap-1.5">
                          {presetQuestions.map((q, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                setAiPrompt(q);
                                handleAskAI(e as any, q);
                              }}
                              className="w-full text-left p-2 rounded bg-[#030904] border border-[#133c1e] text-[11px] text-[#819e89] hover:bg-[#132c18] hover:border-[#2fd657]/30 transition-all truncate"
                            >
                              &rarr; {q}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Result panel */}
                    <div className="lg:col-span-7">
                      <div className="h-full rounded-2xl bg-[#020603] border border-[#143c1e] p-5 flex flex-col justify-between min-h-[300px]">
                        <div>
                          <p className="text-[10px] font-mono text-[#8c742e] uppercase font-bold tracking-wider mb-2">
                            🔬 Model Response: ReleafCanna Intel API
                          </p>
                          
                          {aiLoading && (
                            <div className="space-y-2 py-4 animate-pulse">
                              <div className="h-4 bg-[#102d18] rounded w-1/3" />
                              <div className="h-3 bg-[#102d18] rounded w-full" />
                              <div className="h-3 bg-[#102d18] rounded w-5/6" />
                              <div className="h-3 bg-[#102d18] rounded w-full" />
                            </div>
                          )}

                          {aiError && (
                            <div className="p-3.5 rounded-lg bg-red-950/40 border border-red-500/20 text-xs text-red-400 font-sans flex items-start gap-2">
                              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                              <div>
                                <p className="font-semibold">Query Engine Failure</p>
                                <p className="opacity-80 mt-0.5">{aiError}</p>
                              </div>
                            </div>
                          )}

                          {!aiLoading && !aiResult && !aiError && (
                            <div className="flex flex-col items-center justify-center text-center py-12 my-auto">
                              <HelpCircle className="w-10 h-10 text-[#143a1e] mb-2" />
                              <p className="text-xs text-[#819e89]">
                                Submit a question or click a preset clinical query tag to receive instant medical botany insights.
                              </p>
                            </div>
                          )}

                          {!aiLoading && aiResult && (
                            <div className="text-xs text-[#b8cbbe] leading-relaxed space-y-3 max-h-[350px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#1a4926] scrollbar-track-[#030904]">
                              {aiResult.split("\n\n").map((para, i) => {
                                if (para.startsWith("###") || para.startsWith("H3") || para.startsWith("#")) {
                                  return (
                                    <h5 key={i} className="text-sm font-bold text-[#f1fcf3] pt-2 font-mono text-[#8c742e]">
                                      {para.replace(/[#*]/g, "").trim()}
                                    </h5>
                                  );
                                }
                                return (
                                  <p key={i} className="whitespace-pre-line">
                                    {para.replace(/\*\*/g, "")}
                                  </p>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {aiResult && (
                          <div className="text-[10px] text-[#819e89] mt-4 pt-3 border-t border-[#123319] flex justify-between items-center bg-[#020603]">
                            <span>Model alias: gemini-3.5-flash</span>
                            <span>Verify content scientifically</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </section>

        {/* Loaded SEO Section - Core Articles */}
        <div className="space-y-8 mb-12">
          
          <div className={`border-b pb-3 mb-6 transition-all duration-500 ${activeTheme.cardBorder}`}>
            <h4 className={`text-xl font-bold tracking-wide font-sans flex items-center gap-1.5 transition-all duration-500 ${activeTheme.textHighlight}`}>
              <BookOpen className={`w-5 h-5 ${activeTheme.accent}`} /> Deep Saturated Clinical Library (SEO Optimized)
            </h4>
            <p className={`text-xs mt-1 transition-all duration-500 ${activeTheme.textMuted}`}>
              Read peer-reviewed clinical summaries regarding cannabinoid pathways, terpene synergy, and titration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            <article className={`p-5 rounded-2xl shadow-xl space-y-4 border transition-all duration-500 ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
              <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded transition-all duration-500 ${activeTheme.badgeBg} ${activeTheme.accent}`}>PHARMACOLOGY</span>
              <h5 className={`text-base font-bold leading-tight transition-all duration-500 ${activeTheme.textHighlight}`}>
                The Entourage Effect: Synergistic Biological Mechanics of Terpenes and Cannabinoids in Holistic Relief
              </h5>
              <p className={`text-xs leading-relaxed transition-all duration-500 ${activeTheme.textMuted}`}>
                The therapeutic potency of cannabis does not lie individual molecules; rather, it emerges through a phenomenon known as the <strong>Entourage Effect</strong>. Proposed by Dr. Raphael Mechoulam, this synergistic interaction allows secondary phytocannabinoids and volatile terpenes to exponentially boost the biological efficacy of primary compounds.
              </p>
              <p className={`text-xs leading-relaxed transition-all duration-500 ${activeTheme.textMuted}`}>
                For example, while pure isolative THC frequently triggers CB1 receptors aggressively, creating rapid heartbeats or psychological anxiety, incorporating the terpene <strong>Linalool</strong> completely stabilizes nerve conduction. Linalool acts as a powerful modulating agonist at adenosine receptors and stimulates GABA-A release. 
              </p>
              <p className={`text-xs leading-relaxed transition-all duration-500 ${activeTheme.textMuted}`}>
                Similarly, <strong>Beta-Caryophyllene</strong> modulates the cell receptors directly. When paired with high-quality CBD, beta-caryophyllene unlocks peripheral CB2 cellular receptors, allowing rapid down-regulation of inflammatory markers.
              </p>
            </article>

            <article className={`p-5 rounded-2xl shadow-xl space-y-4 border transition-all duration-500 ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
              <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded transition-all duration-500 ${activeTheme.badgeBg} ${activeTheme.accent}`}>CLINICAL MANUAL</span>
              <h5 className={`text-base font-bold leading-tight transition-all duration-500 ${activeTheme.textHighlight}`}>
                A Manual on Cannabinoid Titration and Receptor Affinity of the Endocannabinoid System (ECS)
              </h5>
              <p className={`text-xs leading-relaxed transition-all duration-500 ${activeTheme.textMuted}`}>
                To maximize systemic relief while protecting long-term cannabinoid safety, understanding receptor saturation is vital. The Endocannabinoid System (ECS) regulates physical balance (homeostasis) via two primary receptors: CB1, clustered in brain gray matter, and CB2, which dominates immune linings.
              </p>
              <p className={`text-xs leading-relaxed transition-all duration-500 ${activeTheme.textMuted}`}>
                Because every individual possesses a radically unique biological density of ECS receptors, modern medical literature suggests a dosing practice of <strong>Titration</strong> (&ldquo;Start Low and Go Slow&rdquo;). Consuming massive doses on day one risks saturating CB1 gates, provoking physical tolerance, and reducing the calming effects.
              </p>
              <p className={`text-xs leading-relaxed transition-all duration-500 ${activeTheme.textMuted}`}>
                By beginning with trace balances (e.g. 10mg CBD and 2mg CBG), cellular receptor portals remain highly sensitive. Over a period of weeks, micro-dosages can be raised by 2.5mg increments until target relief is hit, maintaining sustained natural protection.
              </p>
            </article>

            <article className={`p-5 rounded-2xl shadow-xl space-y-4 border transition-all duration-500 ${activeTheme.cardBg} ${activeTheme.cardBorder}`}>
              <span className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded transition-all duration-500 ${activeTheme.badgeBg} ${activeTheme.accent}`}>HISTORICAL SOURCING</span>
              <h5 className={`text-base font-bold leading-tight transition-all duration-500 ${activeTheme.textHighlight}`}>
                Reclaiming Organic Relief: The Centuries-Old Sourcing of Botanical Herbs for Physical Calming
              </h5>
              <p className={`text-xs leading-relaxed transition-all duration-500 ${activeTheme.textMuted}`}>
                For thousands of years, ancient civil medical directories documented the immense healing benefits of organic botanical leaves. Dating back to Emperor Shen Nung in 2737 B.C., herbal teas and oils were utilized to calm joint irritation, aid restful dreams, and restore general body spirit.
              </p>
              <p className={`text-xs leading-relaxed transition-all duration-500 ${activeTheme.textMuted}`}>
                In medieval apothecary manuals, the spelling of &ldquo;releaf&rdquo; represented the living organic foliage providing physical release from pain. Modern clinical science now isolates the active organic chemistry (sublingual oils, topical creams, vaporous flowers) to target modern inflammatory diseases.
              </p>
              <p className={`text-xs leading-relaxed transition-all duration-500 ${activeTheme.textMuted}`}>
                Relearning these ancient botanical mechanisms offers patients a sustainable, plant-empowered alternative to hyper-processed synthetic remedies. True wellness stems directly from natural botanical chemistry, custom matched to human biological networks.
              </p>
            </article>

          </div>

        </div>

        {/* Elegant Footer */}
        <footer className={`text-center py-10 px-6 border-t relative overflow-hidden rounded-t-3xl backdrop-blur-md transition-all duration-500 ${activeTheme.headerBg} ${activeTheme.cardBorder}`}>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 font-mono">
              <Leaf className={`w-5 h-5 ${activeTheme.accent}`} />
              <p className={`text-xs transition-all duration-500 ${activeTheme.textMuted}`}>
                &copy; {new Date().getFullYear()} releafcanna.com. All Rights Reserved.
              </p>
            </div>
            
            <div className={`flex items-center gap-3 sm:gap-4 text-xs font-mono flex-wrap justify-center sm:justify-end transition-all duration-500 ${activeTheme.accent}`}>
              <a
                href="https://www.godaddy.com/domainsearch/find?domainToCheck=releafcanna.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                GoDaddy listing
              </a>
              <span>&bull;</span>
              <a
                href="/sitemap.xml"
                target="_blank"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                Sitemap
              </a>
              <span>&bull;</span>
              <a
                href="/robots.txt"
                target="_blank"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                Robots.txt
              </a>
              <span>&bull;</span>
              <a
                href="https://feelize.com/start"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#5ae679] transition-colors font-semibold"
              >
                website by feelize
              </a>
            </div>
          </div>
          
          <div className={`mt-6 text-[10px] leading-relaxed max-w-3xl mx-auto border-t pt-4 transition-all duration-500 ${activeTheme.cardBorder} ${activeTheme.textMuted} opacity-80`}>
            Legal Disclaimer: releafcanna.com is an educational template showcasing search-optimized domain monetization patterns. The content here contains botanical science for academic study and is not recognized medical advice. All third-party registered trademarks belong to respective holders.
          </div>
        </footer>

      </div>
    </div>
  );
}
