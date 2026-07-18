"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import FooterSitemap from "@/app/components/FooterSitemap";
import {
  Leaf,
  Sliders,
  Sparkles,
  BookOpen,
  Brain,
  Info,
  Send,
  RotateCcw,
  AlertCircle,
  Shield,
  ArrowRight,
  Flame,
  Search,
  Check,
  ThumbsUp,
  Activity,
  Award,
  ChevronRight,
  HeartPulse
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  CANNABINOIDS,
  TERPENES,
  CONDITIONS,
  type Cannabinoid,
  type Terpene,
  type Condition
} from "@/lib/data";

// --- TYPES ---
type Tab = "home" | "matcher" | "ai" | "cannabinoids" | "terpenes" | "conditions";

interface HomeProps {
  defaultTab?: Tab;
  defaultTheme?: string;
  params?: any;
  searchParams?: any;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

// Mock strain recommendations database for instantaneous deterministic results before AI enhancement
interface RecommendedStrain {
  name: string;
  type: "Indica" | "Sativa" | "Hybrid" | "CBD-Rich";
  thc: string;
  cbd: string;
  primaryTerpenes: string[];
  reason: string;
}

export default function Home(props: any) {
  const defaultTab = props?.defaultTab ?? "home";
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);

  // --- MATCHER STATE ---
  const [matcherStep, setMatcherStep] = useState<number>(1);
  const [selectedEffect, setSelectedEffect] = useState<string>("");
  const [selectedConsumption, setSelectedConsumption] = useState<string>("");
  const [selectedTolerance, setSelectedTolerance] = useState<string>("");
  const [isMatching, setIsMatching] = useState<boolean>(false);
  const [matchResult, setMatchResult] = useState<RecommendedStrain[] | null>(null);

  // --- AI ADVISOR STATE ---
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am your ReleafCanna AI Advisor. Ask me anything about cannabinoids, terpenes, strain matches, medical benefits, or consumption methodologies.",
    },
  ]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // --- DICTIONARY/GUIDES SEARCH ---
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedCannabinoids, setExpandedCannabinoids] = useState<Record<string, boolean>>({});

  const toggleCannabinoidExpanded = (id: string) => {
    setExpandedCannabinoids((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAiLoading]);

  // --- MATCHER LOGIC ---
  const handleNextStep = () => {
    if (matcherStep === 1 && !selectedEffect) return;
    if (matcherStep === 2 && !selectedConsumption) return;
    setMatcherStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setMatcherStep((prev) => Math.max(1, prev - 1));
  };

  const runMatcherAlgorithm = () => {
    setIsMatching(true);
    setTimeout(() => {
      let strains: RecommendedStrain[] = [];

      // Determine recommendations based on desired effects
      if (selectedEffect === "pain") {
        strains = [
          {
            name: "Harlequin",
            type: "CBD-Rich",
            thc: "5% - 8%",
            cbd: "8% - 15%",
            primaryTerpenes: ["Myrcene", "Pinene", "Caryophyllene"],
            reason: "An exceptional, highly balanced strain that mitigates systematic chronic pain with negligible psychoactivity. Perfect for daylight usage."
          },
          {
            name: "Granddaddy Purple",
            type: "Indica",
            thc: "17% - 23%",
            cbd: "< 1%",
            primaryTerpenes: ["Myrcene", "Caryophyllene", "Linalool"],
            reason: "Deep muscle-relaxant that physically numbs intense pain pathways and helps relieve inflammatory muscle spasms."
          }
        ];
      } else if (selectedEffect === "anxiety") {
        strains = [
          {
            name: "ACDC",
            type: "CBD-Rich",
            thc: "1% - 3%",
            cbd: "15% - 20%",
            primaryTerpenes: ["Myrcene", "Pinene", "Caryophyllene"],
            reason: "An almost pure CBD therapeutic cultivar. Sweeps away chronic anxiety, racing thoughts, and systematic stress without inducing any high."
          },
          {
            name: "Cannatonic",
            type: "Hybrid",
            thc: "6%",
            cbd: "12%",
            primaryTerpenes: ["Myrcene", "Linalool", "Limonene"],
            reason: "An elegant 2:1 CBD-to-THC ratio that generates gentle muscle relaxation and deep mental calm while keeping you entirely focused."
          }
        ];
      } else if (selectedEffect === "sleep") {
        strains = [
          {
            name: "Northern Lights",
            type: "Indica",
            thc: "16% - 21%",
            cbd: "< 1%",
            primaryTerpenes: ["Myrcene", "Caryophyllene", "Linalool"],
            reason: "The gold standard for treating severe insomnia. Instills a heavy physical weight and quiets central nervous system hyper-arousal."
          },
          {
            name: "Blackberry Kush",
            type: "Indica",
            thc: "18%",
            cbd: "1%",
            primaryTerpenes: ["Myrcene", "Limonene", "Linalool"],
            reason: "A deeply sedating Indica strain that aids sleep onset. It produces warm body relaxation and helps you stay asleep through the night."
          }
        ];
      } else if (selectedEffect === "focus") {
        strains = [
          {
            name: "Jack Herer",
            type: "Sativa",
            thc: "18% - 24%",
            cbd: "< 1%",
            primaryTerpenes: ["Terpinolene", "Caryophyllene", "Pinene"],
            reason: "Rich in Pinene, this famous strain acts as an acetylcholinesterase inhibitor. It promotes extreme mental clarity, memory retention, and laser focus."
          },
          {
            name: "Durban Poison",
            type: "Sativa",
            thc: "20% - 26%",
            cbd: "< 1%",
            primaryTerpenes: ["Terpinolene", "Myrcene", "Pinene"],
            reason: "Rich in THCV, this landrace African Sativa acts as a clean stimulant. Offers severe appetite-suppression and sparkling, energetic focus."
          }
        ];
      } else if (selectedEffect === "creativity") {
        strains = [
          {
            name: "Blue Dream",
            type: "Hybrid",
            thc: "17% - 24%",
            cbd: "2%",
            primaryTerpenes: ["Myrcene", "Pinene", "Limonene"],
            reason: "A beautiful Sativa-leaning hybrid that generates a soft, cerebral motivation and bright sensory appreciation. Phenomenal for creative pursuits."
          },
          {
            name: "Super Lemon Haze",
            type: "Sativa",
            thc: "20%",
            cbd: "< 1%",
            primaryTerpenes: ["Limonene", "Terpinolene", "Myrcene"],
            reason: "Explosive, happy Sativa strain high in Limonene that elevates positive outlooks and provides a steady flow of creative ideas."
          }
        ];
      } else {
        // Default general balancer
        strains = [
          {
            name: "Harlequin",
            type: "CBD-Rich",
            thc: "6%",
            cbd: "9%",
            primaryTerpenes: ["Myrcene", "Pinene", "Caryophyllene"],
            reason: "A versatile, balanced therapeutic standard suitable for newcomers and experienced patients alike. Supports systematic equilibrium."
          }
        ];
      }

      setMatchResult(strains);
      setIsMatching(false);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#10b981", "#06b6d4", "#3b82f6"]
      });
    }, 1800);
  };

  const resetMatcher = () => {
    setSelectedEffect("");
    setSelectedConsumption("");
    setSelectedTolerance("");
    setMatchResult(null);
    setMatcherStep(1);
  };

  // --- AI ADVISOR LOGIC ---
  const sendMessageToAi = async (textToSend?: string) => {
    const prompt = textToSend || inputMessage;
    if (!prompt.trim()) return;

    const userMsg: Message = { role: "user", content: prompt };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage("");
    setIsAiLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(userMsg),
          prompt: prompt,
        }),
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.text }]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `I ran into an issue connecting to my core brain: ${data.error || "Unknown Error"}. Please check if the GEMINI_API_KEY is configured in your Secrets menu.`,
          },
        ]);
      }
    } catch (err: any) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I failed to retrieve response from the server. Check your network or server logs.",
        },
      ]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const askAiAboutMatch = (strainName: string) => {
    setActiveTab("ai");
    sendMessageToAi(`Can you give me a highly detailed medical analysis and scientific overview of the strain '${strainName}'? What cannabinoids and terpenes does it usually express, and how does it help with my chosen target?`);
  };

  // --- FILTERED SECTIONS ---
  const filteredCannabinoids = CANNABINOIDS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.benefits.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredTerpenes = TERPENES.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.aroma.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.effects.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-sans text-slate-900 overflow-x-hidden" id="releafcanna-root">
      {/* HEADER NAVBAR */}
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-50 px-4 py-3 md:px-8 w-full" id="releafcanna-header">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
          {/* CLICKABLE LOGO */}
          <button 
            onClick={() => { 
              setActiveTab("home"); 
              setMatcherStep(1); 
              setSelectedEffect("");
              setSelectedConsumption("");
              setSelectedTolerance("");
              setMatchResult(null);
              setIsMatching(false);
              setSearchQuery(""); 
            }}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl cursor-pointer group w-full lg:w-auto justify-center lg:justify-start"
            id="logo-home-button"
            aria-label="ReleafCanna Home"
          >
            <div className="bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/30 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/15 transition-all">
              <Leaf className="w-5.5 h-5.5 text-emerald-600" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-bold text-lg tracking-tight text-slate-900">ReleafCanna</span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-600 px-2 py-0.5 rounded-full border border-emerald-500/20 font-sans font-medium">Medical AI</span>
              </div>
              <p className="text-slate-600 text-[10px] sm:text-xs">Cannabis Patient Guidance & Science Matching</p>
            </div>
          </button>

          {/* RESPONSIVE ALWAYS-VISIBLE NAV SWITCHER */}
          <nav className="flex items-center gap-1 bg-slate-200/50 p-1 rounded-xl border border-slate-300 w-full lg:w-auto overflow-x-auto scrollbar-none justify-start sm:justify-center" id="main-nav">
            <button
              onClick={() => { setActiveTab("home"); setSearchQuery(""); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeTab === "home"
                  ? "bg-emerald-500 text-slate-950 shadow-md font-semibold"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-300/40"
              }`}
              id="nav-home"
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>

            <button
              onClick={() => { setActiveTab("matcher"); setSearchQuery(""); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeTab === "matcher"
                  ? "bg-emerald-500 text-slate-950 shadow-md font-semibold"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-300/40"
              }`}
              id="nav-matcher"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Strain Matcher</span>
              <span className="inline sm:hidden">Matcher</span>
            </button>

            <button
              onClick={() => { setActiveTab("ai"); setSearchQuery(""); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeTab === "ai"
                  ? "bg-emerald-500 text-slate-950 shadow-md font-semibold"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-300/40"
              }`}
              id="nav-ai"
            >
              <Brain className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Advisor</span>
              <span className="inline sm:hidden">AI Advisor</span>
            </button>

            <button
              onClick={() => { setActiveTab("cannabinoids"); setSearchQuery(""); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeTab === "cannabinoids"
                  ? "bg-emerald-500 text-slate-950 shadow-md font-semibold"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-300/40"
              }`}
              id="nav-cannabinoids"
            >
              <HeartPulse className="w-3.5 h-3.5" />
              <span>Cannabinoids</span>
            </button>

            <button
              onClick={() => { setActiveTab("terpenes"); setSearchQuery(""); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeTab === "terpenes"
                  ? "bg-emerald-500 text-slate-950 shadow-md font-semibold"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-300/40"
              }`}
              id="nav-terpenes"
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Terpenes</span>
            </button>

            <button
              onClick={() => { setActiveTab("conditions"); setSearchQuery(""); }}
              className={`flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-lg text-xs md:text-sm font-medium transition-all cursor-pointer whitespace-nowrap flex-shrink-0 ${
                activeTab === "conditions"
                  ? "bg-emerald-500 text-slate-950 shadow-md font-semibold"
                  : "text-slate-700 hover:text-slate-900 hover:bg-slate-300/40"
              }`}
              id="nav-conditions"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Symptom Guide</span>
              <span className="inline sm:hidden">Symptoms</span>
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-8" id="releafcanna-main">
        <AnimatePresence mode="wait">
          {/* 0. HOME PORTAL INDEX */}
          {activeTab === "home" && (
            <motion.section
              key="home-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 py-4"
              id="home-portal-section"
            >
              {/* BRAND HERO BANNER */}
              <div className="text-center max-w-3xl mx-auto space-y-4 py-4" id="home-portal-hero">
                <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/20">
                  Empirical Science & Guidance System
                </span>
                <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 tracking-tight leading-tight">
                  Demystifying <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">Medicinal Cannabis</span> Through Chemistry
                </h2>
                <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                  Welcome to ReleafCanna. Browse peer-reviewed cannabinoid boiling points, explore aromatic terpene receptors, consult our server-side AI medical agent, or calculate custom cultivar recommendations based on your symptoms.
                </p>
              </div>

              {/* TABS/TOOLS ANNOUNCEMENT INDEX */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="home-index-grid">
                
                {/* 1. STRAIN MATCHER CARD */}
                <div 
                  onClick={() => { setActiveTab("matcher"); setMatcherStep(1); }}
                  className="group bg-white border border-slate-200 hover:border-emerald-500/20 hover:bg-slate-50 transition-all rounded-2xl p-6 cursor-pointer flex flex-col justify-between space-y-6 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 group-hover:scale-105 transition-all">
                        <Sliders className="w-5.5 h-5.5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">Interactive Tool</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        Therapeutic Strain Matcher
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
                      </h3>
                      <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                        Answer three brief, tailored physiological questions about your symptom targets, preferred vaporization or ingestion route, and sensitivity. Instantly calculate compatible cannabinoid structures and matching cultivars.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                    <span>Calculate Custom Strains</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 2. AI CONSULTANT CARD */}
                <div 
                  onClick={() => { setActiveTab("ai"); }}
                  className="group bg-white border border-slate-200 hover:border-emerald-500/20 hover:bg-slate-50 transition-all rounded-2xl p-6 cursor-pointer flex flex-col justify-between space-y-6 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 group-hover:scale-105 transition-all">
                        <Brain className="w-5.5 h-5.5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-md border border-cyan-100">AI Consultation</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        AI Medical Advisor
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
                      </h3>
                      <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                        Connect with our server-side medical expert. Consult regarding deep pharmacological queries about active chemical pathways, systematic sleep induction, cannabinoid bioavailability, and precise dosage formulas.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 group-hover:text-emerald-700">
                    <span>Ask the AI Consultant</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 3. CANNABINOIDS DIRECTORY */}
                <div 
                  onClick={() => { setActiveTab("cannabinoids"); }}
                  className="group bg-white border border-slate-200 hover:border-emerald-500/20 hover:bg-slate-50 transition-all rounded-2xl p-6 cursor-pointer flex flex-col justify-between space-y-6 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 group-hover:scale-105 transition-all">
                        <HeartPulse className="w-5.5 h-5.5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">Scientific Index</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        Phyto-Cannabinoid Science
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
                      </h3>
                      <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                        Explore complete profiles of key cannabinoids including THC, CBD, CBG, CBN, and CBC. Learn about decarboxylation boiling points, therapeutic targets, and corresponding dominant cultivars.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-slate-950">
                    <span>Explore Cannabinoids Directory</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 4. TERPENES ENCYCLOPEDIA */}
                <div 
                  onClick={() => { setActiveTab("terpenes"); }}
                  className="group bg-white border border-slate-200 hover:border-emerald-500/20 hover:bg-slate-50 transition-all rounded-2xl p-6 cursor-pointer flex flex-col justify-between space-y-6 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 group-hover:scale-105 transition-all">
                        <Flame className="w-5.5 h-5.5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">Scientific Index</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        Terpene Hydrocarbons Guide
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
                      </h3>
                      <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                        Dive into the aromatic pharmacology of primary cannabis terpenes: Myrcene, Limonene, Caryophyllene, and Linalool. Study boiling points, sensory notes, and entourage synergy.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-slate-950">
                    <span>Browse Terpenes Encyclopedia</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* 5. SYMPTOM GUIDE */}
                <div 
                  onClick={() => { setActiveTab("conditions"); }}
                  className="group bg-white border border-slate-200 hover:border-emerald-500/20 hover:bg-slate-50 transition-all rounded-2xl p-6 cursor-pointer flex flex-col justify-between space-y-6 md:col-span-2 lg:col-span-1 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 group-hover:scale-105 transition-all">
                        <BookOpen className="w-5.5 h-5.5" />
                      </div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">Clinical Mapper</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors flex items-center gap-1.5">
                        Clinical Symptom Guide
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-4px] group-hover:translate-x-0" />
                      </h3>
                      <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                        A clinical index translating common symptoms (neuropathy, insomnia, anxiety, ADHD) into targeted active cannabinoid ratios, vaporization ranges, and entourage recipes.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600 group-hover:text-slate-950">
                    <span>View Symptom Science Index</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>

              {/* QUICK STATS & BENEFITS */}
              <div className="border border-slate-200 bg-white rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-sm" id="home-clinical-highlights">
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">Active Database</span>
                  <p className="text-base font-bold text-slate-900">Full Phytocannabinoid Profile</p>
                  <p className="text-xs text-slate-600">Complete boiling points, therapeutic targets, and molecular functions cataloged.</p>
                </div>
                <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">Synergy Focus</span>
                  <p className="text-base font-bold text-slate-900">The Entourage Effect</p>
                  <p className="text-xs text-slate-600">Deep integration mapping active terpenes and phytocannabinoids to clinical receptors.</p>
                </div>
                <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-slate-200 pt-4 sm:pt-0 sm:pl-6">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest font-mono">AI Consultant</span>
                  <p className="text-base font-bold text-slate-900">Live Gemini Chat Advisor</p>
                  <p className="text-xs text-slate-600">Ask questions regarding medical literature, dosage titration, and localized bioavailability.</p>
                </div>
              </div>
            </motion.section>
          )}

          {/* 1. INTERACTIVE STRAIN MATCHER */}
          {activeTab === "matcher" && (
            <motion.section
              key="matcher-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              id="matcher-section"
            >
              {/* INTRO HERO */}
              {!matchResult && (
                <div className="text-center max-w-2xl mx-auto space-y-3 py-6" id="matcher-hero">
                  <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Interactive Selector</span>
                  <h2 className="font-display font-bold text-3xl md:text-4xl text-slate-900 tracking-tight">Discover Your Optimal Chemical Match</h2>
                  <p className="text-slate-600 text-sm md:text-base">
                    Use our symptom-to-chemistry calculator. Answer 3 quick therapeutic questions to locate custom cannabinoids, terpenes, and strains that align with your requirements.
                  </p>
                </div>
              )}

              {/* MATCHER WIZARD FLOW */}
              {!matchResult ? (
                <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl mx-auto overflow-hidden shadow-sm" id="matcher-wizard">
                  {/* PROGRESS BAR */}
                  <div className="bg-slate-100 p-4 border-b border-slate-200 flex items-center justify-between" id="progress-bar">
                    <span className="text-xs text-slate-600">Therapeutic Algorithm Progress</span>
                    <div className="flex gap-1.5">
                      {[1, 2, 3].map((step) => (
                        <div
                          key={step}
                          className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                            step <= matcherStep ? "bg-emerald-500" : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="p-6 md:p-8 min-h-[300px]">
                    {/* STEP 1: DESIRED THERAPEUTIC EFFECT */}
                    {matcherStep === 1 && (
                      <div className="space-y-6" id="matcher-step-1">
                        <div>
                          <h3 className="text-lg font-display font-medium text-slate-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xs font-bold">1</span>
                            What is your primary medical or therapeutic goal?
                          </h3>
                          <p className="text-slate-600 text-xs mt-1">Select the symptom or effect you want to address directly.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="effect-options">
                          {[
                            { id: "pain", label: "Severe Pain & Neuropathy", desc: "Reduce inflammation and blunt pain signals", color: "hover:border-rose-500/30" },
                            { id: "anxiety", label: "Anxiety & Stress Mitigation", desc: "Soften amygdala response and quiet panic", color: "hover:border-cyan-500/30" },
                            { id: "sleep", label: "Insomnia & Sleep Onset", desc: "Enter restorative delta-wave sleep safely", color: "hover:border-purple-500/30" },
                            { id: "focus", label: "Alertness, ADHD & Mental Focus", desc: "Boost mental energy and clear brain fog", color: "hover:border-amber-500/30" },
                            { id: "creativity", label: "Creativity & Mood Elevation", desc: "Inspire divergent thinking and boost dopamine", color: "hover:border-emerald-500/30" },
                          ].map((effect) => (
                            <button
                              key={effect.id}
                              onClick={() => setSelectedEffect(effect.id)}
                              className={`p-4 rounded-xl border text-left transition-all ${
                                selectedEffect === effect.id
                                  ? "bg-emerald-50 border-emerald-500 text-slate-900"
                                  : "bg-white border-slate-200 text-slate-800 " + effect.color
                              }`}
                            >
                              <div className="font-semibold text-sm flex items-center justify-between">
                                {effect.label}
                                {selectedEffect === effect.id && <Check className="w-4 h-4 text-emerald-600" />}
                              </div>
                              <p className="text-slate-600 text-xs mt-1">{effect.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 2: PREFERRED CONSUMPTION */}
                    {matcherStep === 2 && (
                      <div className="space-y-6" id="matcher-step-2">
                        <div>
                          <h3 className="text-lg font-display font-medium text-slate-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xs font-bold">2</span>
                            What is your preferred consumption methodology?
                          </h3>
                          <p className="text-slate-600 text-xs mt-1">Controls the onset speed, biochemical bioavailability, and physical duration.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3" id="consumption-options">
                          {[
                            { id: "inhalation", label: "Dry Flower Inhalation", desc: "Immediate onset (2-5 mins). High control, standard terpene absorption." },
                            { id: "vape", label: "Concentrate Vaporization", desc: "Rapid onset (2-5 mins). Ultra-clean vapor, potent cannabinoid delivery." },
                            { id: "ingestion", label: "Edibles / Sublingual Drops", desc: "Gradual onset (45-90 mins). Systemic liver processing (11-Hydroxy-THC)." },
                            { id: "topical", label: "Localized Topicals", desc: "Localized onset. Absorbs transdermally, non-psychoactive relief." },
                          ].map((method) => (
                            <button
                              key={method.id}
                              onClick={() => setSelectedConsumption(method.id)}
                              className={`p-4 rounded-xl border text-left transition-all ${
                                selectedConsumption === method.id
                                  ? "bg-emerald-50 border-emerald-500 text-slate-900"
                                  : "bg-white border-slate-200 text-slate-800 hover:border-slate-300"
                              }`}
                            >
                              <div className="font-semibold text-sm flex items-center justify-between">
                                {method.label}
                                {selectedConsumption === method.id && <Check className="w-4 h-4 text-emerald-600" />}
                              </div>
                              <p className="text-slate-600 text-xs mt-1">{method.desc}</p>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* STEP 3: TOLERANCE LEVEL */}
                    {matcherStep === 3 && (
                      <div className="space-y-6" id="matcher-step-3">
                        <div>
                          <h3 className="text-lg font-display font-medium text-slate-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-xs font-bold">3</span>
                            What is your current cannabis tolerance / experience?
                          </h3>
                          <p className="text-slate-600 text-xs mt-1">This allows the calculator to customize THC limits and recommend CBD buffers.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3" id="tolerance-options">
                          {[
                            { id: "low", label: "Low / Microdoser", desc: "Highly sensitive. Needs high CBD buffers or tiny THC ratios." },
                            { id: "moderate", label: "Moderate Consumer", desc: "Enjoys balanced THC:CBD levels with therapeutic effect." },
                            { id: "high", label: "High / Experienced", desc: "Needs high cannabinoid percentages for efficacy." },
                          ].map((tol) => (
                            <button
                              key={tol.id}
                              onClick={() => setSelectedTolerance(tol.id)}
                              className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                                selectedTolerance === tol.id
                                  ? "bg-emerald-50 border-emerald-500 text-slate-900"
                                  : "bg-white border-slate-200 text-slate-800 hover:border-slate-300"
                              }`}
                            >
                              <div>
                                <div className="font-semibold text-sm flex items-center justify-between">
                                  {tol.label}
                                  {selectedTolerance === tol.id && <Check className="w-4 h-4 text-emerald-600" />}
                                </div>
                                <p className="text-slate-600 text-xs mt-2">{tol.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* NAVIGATION CONTROL FOOTER */}
                  <div className="bg-slate-100 p-4 border-t border-slate-200 flex items-center justify-between" id="matcher-nav-footer">
                    {matcherStep > 1 ? (
                      <button
                        onClick={handlePrevStep}
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 text-sm font-medium transition-all"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Previous Step
                      </button>
                    ) : (
                      <div className="w-10" />
                    )}

                    {matcherStep < 3 ? (
                      <button
                        onClick={handleNextStep}
                        disabled={
                          (matcherStep === 1 && !selectedEffect) ||
                          (matcherStep === 2 && !selectedConsumption)
                        }
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-5 py-2 rounded-lg text-sm flex items-center gap-1.5 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={runMatcherAlgorithm}
                        disabled={!selectedTolerance || isMatching}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-2.5 rounded-lg text-sm flex items-center gap-2 transition-all disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4" />
                        {isMatching ? "Calculating Chemistry..." : "Calculate My Strains"}
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* MATCH RESULT VIEW */
                <div className="max-w-4xl mx-auto space-y-6" id="match-results-view">
                  <div className="text-center space-y-2">
                    <span className="text-xs font-semibold text-emerald-600 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Calculated Matches Loaded</span>
                    <h2 className="text-3xl font-display font-bold text-slate-900 tracking-tight">Your Custom Therapeutic Chemistry matches</h2>
                    <p className="text-slate-600 text-xs">Based on targeted relief for: {selectedEffect.toUpperCase()} • Consumption: {selectedConsumption.toUpperCase()} • Sensitivity: {selectedTolerance.toUpperCase()}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="strain-result-cards">
                    {matchResult.map((strain, index) => (
                      <div
                        key={index}
                        className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-emerald-500/20 transition-all flex flex-col justify-between shadow-sm"
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-xs uppercase tracking-widest font-semibold px-2 py-1 rounded bg-slate-100 text-emerald-700 border border-slate-200">
                              {strain.type}
                            </span>
                            <div className="flex items-center gap-1.5 text-xs text-slate-600">
                              <Award className="w-4 h-4 text-amber-500" />
                              Match Rank #{index + 1}
                            </div>
                          </div>

                          <div>
                            <h3 className="text-xl font-display font-bold text-slate-900 tracking-tight">
                              {strain.name}
                            </h3>
                            <div className="flex gap-4 text-xs mt-2 text-slate-600 bg-slate-100 p-2 rounded-lg border border-slate-200">
                              <div>THC: <span className="text-slate-900 font-medium">{strain.thc}</span></div>
                              <div>CBD: <span className="text-slate-900 font-medium">{strain.cbd}</span></div>
                            </div>
                          </div>

                          <p className="text-slate-600 text-xs leading-relaxed">
                            {strain.reason}
                          </p>

                          <div>
                            <h4 className="text-xs text-slate-600 font-semibold uppercase tracking-wider mb-2">Expressed Terpenes:</h4>
                            <div className="flex flex-wrap gap-1.5">
                              {strain.primaryTerpenes.map((terp, i) => (
                                <span key={i} className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                                  {terp}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => askAiAboutMatch(strain.name)}
                            className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium transition-all"
                          >
                            <Brain className="w-3.5 h-3.5" />
                            Analyze with AI Advisor
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center pt-4">
                    <button
                      onClick={resetMatcher}
                      className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-6 py-2.5 rounded-xl text-sm transition-all shadow-sm cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset Strain Calculator
                    </button>
                  </div>
                </div>
              )}
            </motion.section>
          )}

          {/* 2. AI ADVISOR */}
          {activeTab === "ai" && (
            <motion.section
              key="ai-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-6"
              id="ai-advisor-section"
            >
              {/* INTRO HERO */}
              <div className="text-center max-w-2xl mx-auto space-y-2 py-2">
                <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Medical Intelligence Chat</span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">AI Cannabis Medical Consultant</h2>
                <p className="text-slate-600 text-xs">
                  Ask deep pharmacological queries about cannabinoids, sleep cycles, systematic pain pathways, terpenes, dosage formulas, and chemical boiling points.
                </p>
              </div>

              {/* QUICKSTART SUGGESTIONS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5" id="quickstart-suggestions">
                {[
                  { q: "Which strain is best for severe neuropathic pain?", label: "Pain Relief" },
                  { q: "What is the science of linalool in lowering blood pressure?", label: "Anxiety Relief" },
                  { q: "Explain Sativa vs Indica down to the molecular level.", label: "Cultivar Taxonomy" },
                ].map((suggest, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessageToAi(suggest.q)}
                    className="p-3 bg-white border border-slate-200 hover:border-emerald-500/20 text-left rounded-xl transition-all flex flex-col justify-between shadow-sm cursor-pointer"
                  >
                    <span className="text-[10px] text-emerald-600 font-semibold uppercase">{suggest.label}</span>
                    <p className="text-slate-700 text-xs mt-1.5 leading-snug line-clamp-2">&ldquo;{suggest.q}&rdquo;</p>
                  </button>
                ))}
              </div>

              {/* CHAT WINDOW CONTAINER */}
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col min-h-[420px] max-h-[550px] shadow-sm" id="chat-window">
                {/* CHAT HEADER */}
                <div className="bg-slate-100 p-4 border-b border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <div>
                      <h3 className="text-sm font-semibold text-slate-900">ReleafCanna AI Agent</h3>
                      <p className="text-[10px] text-slate-600">Gemini 3.5 Flash Model • Live Consultation</p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setMessages([
                        {
                          role: "assistant",
                          content: "Hello! I am your ReleafCanna AI Advisor. Ask me anything about cannabinoids, terpenes, strain matches, medical benefits, or consumption methodologies.",
                        },
                      ])
                    }
                    className="text-slate-600 hover:text-slate-900 text-xs flex items-center gap-1 cursor-pointer font-medium transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Chat
                  </button>
                </div>

                {/* MESSAGES BODY */}
                <div className="flex-grow p-6 overflow-y-auto space-y-4 max-h-[400px]" id="chat-messages">
                  {messages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl p-4 text-xs md:text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-emerald-500 text-slate-950 rounded-tr-none font-medium"
                            : "bg-slate-100 text-slate-800 rounded-tl-none border border-slate-200 shadow-sm"
                        }`}
                      >
                        {/* Render simple markdown lines */}
                        <div className="whitespace-pre-wrap space-y-1">
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isAiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 text-slate-600 rounded-2xl rounded-tl-none p-4 border border-slate-200 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-bounce" />
                        <span className="text-xs">Analyzing literature...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* INPUT FOOTER */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendMessageToAi();
                  }}
                  className="bg-slate-100 p-3 border-t border-slate-200 flex items-center gap-2"
                  id="chat-input-form"
                >
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your cannabis or medical chemistry question here..."
                    className="flex-grow bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-450 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all font-sans"
                  />
                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isAiLoading}
                    className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold p-2.5 rounded-xl transition-all disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </motion.section>
          )}

          {/* 3. CANNABINOID DICTIONARY */}
          {activeTab === "cannabinoids" && (
            <motion.section
              key="cannabinoids-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              id="cannabinoids-section"
            >
              {/* INTRO HERO */}
              <div className="text-center max-w-2xl mx-auto space-y-2 py-2">
                <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Biochemical Library</span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">Major Cannabinoids Directory</h2>
                <p className="text-slate-600 text-xs">
                  Discover the active ingredients of the cannabis plant. Filter by name or medical benefits.
                </p>
                {/* SEARCH INPUT */}
                <div className="max-w-md mx-auto pt-4 relative" id="search-bar">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-6.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search benefits, names, or strains..."
                    className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* CANNABINOID CARDS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="cannabinoid-cards">
                {filteredCannabinoids.map((c) => (
                  <div
                    key={c.id}
                    className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 hover:border-slate-800 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* CARD HEADER */}
                      <div className="flex items-start justify-between">
                        <div>
                          <div className={`text-2xl font-bold bg-gradient-to-r ${c.color} bg-clip-text text-transparent`}>
                            {c.name}
                          </div>
                          <span className="text-xs text-slate-600 font-medium block mt-0.5">{c.fullName}</span>
                        </div>
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${
                          c.psychoactive
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-emerald-50 text-emerald-700 border-emerald-200"
                        }`}>
                          {c.psychoactive ? "Psychoactive" : "Non-Psychoactive"}
                        </span>
                      </div>

                      <p className="text-slate-600 text-xs leading-relaxed">
                        {(() => {
                          const isExpanded = !!expandedCannabinoids[c.id];
                          const needsTruncation = c.description.length > 100;
                          return (
                            <>
                              {needsTruncation && !isExpanded
                                ? `${c.description.substring(0, 100)}...`
                                : c.description}
                              {needsTruncation && (
                                <button
                                  onClick={() => toggleCannabinoidExpanded(c.id)}
                                  className="text-emerald-600 hover:text-emerald-700 ml-1.5 font-semibold focus:outline-none cursor-pointer transition-colors inline"
                                >
                                  {isExpanded ? "Read Less" : "Read More"}
                                </button>
                              )}
                            </>
                          );
                        })()}
                      </p>

                      {/* KEY ADVANTAGES */}
                      <div>
                        <h4 className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider mb-2">Targeted Relief:</h4>
                        <ul className="space-y-1.5 text-xs text-slate-700">
                          {c.benefits.map((b, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* RESTRUCTURED GRID FOOTER */}
                    <div className="mt-6 pt-5 border-t border-slate-200 space-y-4">
                      {/* Grid for Boiling Point & Best Strains */}
                      <div className="grid grid-cols-2 gap-3">
                        {/* Decarboxylation Boiling Point Card */}
                        <div className="bg-slate-100 border border-slate-200 p-2.5 rounded-xl flex flex-col justify-between space-y-1">
                          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Flame className="w-3 h-3 text-amber-500" />
                            Boiling Pt
                          </span>
                          <p className="text-xs font-bold text-slate-800 tracking-tight">{c.boilingPoint}</p>
                        </div>

                        {/* Best Strains Card */}
                        <div className="bg-slate-100 border border-slate-200 p-2.5 rounded-xl flex flex-col justify-between space-y-2">
                          <span className="text-[10px] text-slate-600 font-bold uppercase tracking-wider flex items-center gap-1">
                            <Leaf className="w-3 h-3 text-emerald-500" />
                            Top Cultivars
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {c.bestStrains.map((strain, index) => (
                              <span key={index} className="text-[9px] bg-white text-slate-750 px-1.5 py-0.5 rounded border border-slate-300 font-medium shadow-sm">
                                {strain}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Links & Buttons */}
                      <div className="flex items-center justify-between pt-1">
                        <Link
                          href={`/compounds/${c.id.toLowerCase()}`}
                          className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold transition-all hover:translate-x-0.5"
                        >
                          Science Profile
                          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                        </Link>
                        <button
                          onClick={() => askAiAboutMatch(c.name)}
                          className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-semibold transition-all cursor-pointer"
                        >
                          Ask AI
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* 4. TERPENE LIBRARY */}
          {activeTab === "terpenes" && (
            <motion.section
              key="terpenes-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
              id="terpenes-section"
            >
              {/* INTRO HERO */}
              <div className="text-center max-w-2xl mx-auto space-y-2 py-2">
                <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Aromatic Science</span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">The Terpene Library</h2>
                <p className="text-slate-600 text-xs">
                  Discover the aromatic hydrocarbons that define cannabis scent and directly modulate the cannabinoid experience (The Entourage Effect).
                </p>
                {/* SEARCH INPUT */}
                <div className="max-w-md mx-auto pt-4 relative" id="search-bar">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-6.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search aroma, effect, or terpene name..."
                    className="w-full bg-white border border-slate-300 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* TERPENE LIBRARY GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="terpene-cards">
                {filteredTerpenes.map((t) => (
                  <div
                    key={t.id}
                    className={`border rounded-2xl p-6 transition-all flex flex-col justify-between ${t.bgClass} ${t.color}`}
                  >
                    <div className="space-y-4">
                      {/* HEADER */}
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-bold font-display">{t.name}</h3>
                          <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase mt-0.5">{t.aroma}</span>
                        </div>
                        <Info className="w-4.5 h-4.5 opacity-60" />
                      </div>

                      <p className="text-slate-700 text-xs leading-relaxed">
                        {t.description}
                      </p>

                      {/* BP STAT */}
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span>Vaporization boiling point: <strong>{t.boilingPoint}</strong></span>
                      </div>

                      {/* THERAPEUTIC ADVANTAGES */}
                      <div>
                        <h4 className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider mb-2">Therapeutic Benefits:</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {t.effects.map((eff, idx) => (
                            <span key={idx} className="text-[11px] bg-white text-slate-850 px-2.5 py-1 rounded border border-slate-200 shadow-sm">
                              {eff}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-slate-200 flex items-center justify-between">
                      <div className="text-xs text-slate-500">
                        Rich in: <strong>{t.bestStrains.join(", ")}</strong>
                      </div>
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/compounds/${t.id.toLowerCase()}`}
                          className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-medium transition-all"
                        >
                          Science Profile
                        </Link>
                        <button
                          onClick={() => askAiAboutMatch(t.name)}
                          className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium transition-all cursor-pointer"
                        >
                          Ask AI Advisor
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}

          {/* 5. SYMPTOM TO CHEMISTRY INDEX */}
          {activeTab === "conditions" && (
            <motion.section
              key="conditions-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto space-y-6"
              id="conditions-section"
            >
              {/* INTRO HERO */}
              <div className="text-center max-w-2xl mx-auto space-y-2 py-2">
                <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">Symptom Mapping</span>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-slate-900 tracking-tight">Symptom-to-Chemistry Guide</h2>
                <p className="text-slate-600 text-xs">
                  Discover the pharmacological science behind how specific cannabinoids and terpenes target various medical conditions and physiological symptoms.
                </p>
              </div>

              {/* CONDITIONS ACCORDION GRID */}
              <div className="space-y-4" id="conditions-list">
                {CONDITIONS.map((cond) => (
                  <div
                    key={cond.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 transition-all space-y-4 shadow-sm"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-display font-bold text-slate-900 tracking-tight flex items-center gap-2">
                          <HeartPulse className="w-5 h-5 text-emerald-600" />
                          {cond.name}
                        </h3>
                        <p className="text-slate-600 text-xs mt-1">{cond.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {cond.cannabinoids.map((c) => (
                          <span key={c} className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-lg border border-emerald-200 font-semibold">
                            {c}
                          </span>
                        ))}
                        {cond.terpenes.map((t) => (
                          <span key={t} className="text-xs bg-cyan-50 text-cyan-700 px-3 py-1 rounded-lg border border-cyan-200 font-semibold">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-100 p-4 rounded-xl border border-slate-200 flex items-start gap-3">
                      <Brain className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">The Entourage Science:</h4>
                        <p className="text-slate-700 text-xs mt-1 leading-relaxed">
                          {cond.scienceNote}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                      <div className="text-xs text-slate-600">
                        Want detailed science or custom recommendations?
                      </div>
                      <div className="flex items-center gap-3">
                        <Link
                          href={`/conditions/${cond.id.toLowerCase()}`}
                          className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-600 hover:text-slate-900 text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1 shadow-sm"
                        >
                          Symptom Details
                        </Link>
                        <button
                          onClick={() => {
                            setActiveTab("matcher");
                            setSelectedEffect(cond.id);
                            setMatcherStep(2);
                          }}
                          className="bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-200 text-emerald-600 hover:text-emerald-700 text-xs font-semibold px-4 py-2 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-sm"
                        >
                          Calculate Strains
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-100 pt-12 text-slate-600 text-xs" id="releafcanna-footer">
        <div className="max-w-7xl mx-auto px-4 pb-6">
          {/* MEDICAL DISCLAIMER PANEL */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-left text-amber-850 space-y-2 max-w-4xl mx-auto shadow-sm" id="medical-warning-footer">
            <div className="flex items-center gap-2 font-semibold text-sm text-amber-700">
              <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span>Medical & Educational Disclaimer</span>
            </div>
            <p className="text-slate-700 text-xs leading-relaxed">
              <strong>Educational Resource:</strong> This application, its calculators, chemical directories, and AI Advisor are developed solely for chemical education and symptom-modulating guidance based on peer-reviewed botanical research. This tool does not provide legal advice, professional medical diagnoses, or treatment recommendations. Always consult with a certified medical health physician or licensed specialist before starting any therapeutic regimen.
            </p>
          </div>
        </div>

        {/* COMPREHENSIVE CATEGORY-NESTED SITEMAP */}
        <FooterSitemap />
      </footer>
    </div>
  );
}
