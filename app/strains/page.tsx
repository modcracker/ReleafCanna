"use client";

import React, { useState, useMemo } from "react";
import { getAllStrains } from "@/lib/strains";
import { Leaf, Search, ArrowUpRight, ArrowLeft, Shield, SlidersHorizontal, ArrowUpDown, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";
import HashtagCrossLinker from "@/app/components/HashtagCrossLinker";
import { getSpellingSuggestion } from "@/lib/spelling";

export default function StrainsDirectoryPage() {
  const [search, setSearch] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [sortBy, setSortBy] = useState<string>("name-asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFocused, setIsFocused] = useState(false);

  const strains = useMemo(() => getAllStrains(), []);

  // Compute autocomplete suggestions dynamically as the user types
  const autocompleteSuggestions = useMemo(() => {
    const trimmed = search.trim().toLowerCase();
    if (trimmed.length < 2) return [];

    const suggestionsSet = new Set<string>();
    
    // Find up to 5 matching strain names
    for (const s of strains) {
      if (s.name.toLowerCase().includes(trimmed)) {
        suggestionsSet.add(s.name);
        if (suggestionsSet.size >= 5) break;
      }
    }

    // Include key cannabinoid/terpene matching keywords if space remains
    if (suggestionsSet.size < 5) {
      const compounds = ["THC", "CBD", "CBG", "CBN", "THCV", "CBC", "Myrcene", "Limonene", "Linalool", "Pinene", "Humulene", "Caryophyllene", "Terpinolene"];
      for (const comp of compounds) {
        if (comp.toLowerCase().includes(trimmed)) {
          suggestionsSet.add(comp);
          if (suggestionsSet.size >= 5) break;
        }
      }
    }

    return Array.from(suggestionsSet);
  }, [search, strains]);

  // Filter letters represented in our dataset
  const letters = useMemo(() => {
    const set = new Set<string>();
    strains.forEach((s) => {
      const firstChar = s.name.charAt(0).toUpperCase();
      if (/[A-Z]/.test(firstChar)) {
        set.add(firstChar);
      }
    });
    return ["ALL", ...Array.from(set).sort()];
  }, [strains]);

  // Combined Filtering and Sorting logic (highly performant)
  const filteredStrains = useMemo(() => {
    const temp = strains.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.type.toLowerCase().includes(search.toLowerCase()) ||
        s.primaryCannabinoid.toLowerCase().includes(search.toLowerCase()) ||
        s.primaryTerpene.toLowerCase().includes(search.toLowerCase());

      const matchesLetter =
        selectedLetter === "ALL" ||
        s.name.charAt(0).toUpperCase() === selectedLetter;

      let matchesType = true;
      if (selectedType !== "ALL") {
        if (selectedType === "INDICA") {
          matchesType = s.type.toLowerCase().includes("indica");
        } else if (selectedType === "SATIVA") {
          matchesType = s.type.toLowerCase().includes("sativa");
        } else if (selectedType === "HYBRID") {
          matchesType = s.type.toLowerCase().includes("hybrid");
        } else if (selectedType === "CBD") {
          // Check if CBD-rich (e.g. cbdPercent >= 2% or has CBD/CBDA as cannabinoids)
          matchesType = s.cbdPercent >= 2.0 || s.primaryCannabinoid === "CBD" || s.secondaryCannabinoid === "CBD";
        }
      }

      return matchesSearch && matchesLetter && matchesType;
    });

    // Apply sorting
    return temp.sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      } else if (sortBy === "thc-desc") {
        return b.thcPercent - a.thcPercent;
      } else if (sortBy === "thc-asc") {
        return a.thcPercent - b.thcPercent;
      }
      return 0;
    });
  }, [strains, search, selectedLetter, selectedType, sortBy]);

  // Pagination Logic (60 per page to ensure ultra-snappy client performance)
  const itemsPerPage = 60;
  const totalPages = Math.ceil(filteredStrains.length / itemsPerPage);
  
  const paginatedStrains = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStrains.slice(start, start + itemsPerPage);
  }, [filteredStrains, currentPage]);

  const spellingSuggestion = useMemo(() => {
    if (!search || filteredStrains.length > 0) return null;
    return getSpellingSuggestion(search, strains);
  }, [search, strains, filteredStrains.length]);

  const handleApplySuggestion = (suggestion: string) => {
    setSearch(suggestion);
    setCurrentPage(1);
  };

  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
    setCurrentPage(1);
  };

  const handleTypeSelect = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // Animation configuration for staggered entry
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 24,
      }
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white backdrop-blur-md sticky top-0 z-50 px-4 py-4 md:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Patient Dashboard</span>
          </Link>
          <div className="flex items-center gap-2" id="directory-header-logo">
            <Leaf className="w-5 h-5 text-emerald-500 animate-pulse" />
            <span className="font-display font-bold text-sm text-slate-900">ReleafCanna Botanical Directory</span>
          </div>
        </div>
      </header>

      {/* CORE BODY */}
      <main className="flex-grow max-w-6xl mx-auto px-4 py-12 w-full space-y-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h1 className="font-display font-black text-4xl md:text-5xl text-slate-900 tracking-tight leading-none">
            Medical Cannabis <span className="bg-gradient-to-r from-emerald-600 to-teal-700 bg-clip-text text-transparent">Cultivar Directory</span>
          </h1>
          <p className="text-slate-600 text-sm md:text-base">
            Search our comprehensive, laboratory-mapped database of <strong className="text-emerald-600">{strains.length}</strong> active strains. View THC/CBD potencies, dominant terpene pairings, and clinical applications.
          </p>
        </div>

        {/* SEARCH, FILTERS AND SORTING CONTROL BAR */}
        <div className="bg-white border border-slate-200 p-6 rounded-3xl space-y-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input (8 cols on md) */}
            <div className="relative md:col-span-8">
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by name, cannabinoid (e.g. THCV), or terpene..."
                  value={search}
                  onChange={handleSearchChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10 transition-all shadow-sm"
                />
              </div>

              {/* REAL-TIME FLOATING SUGGESTION DROPDOWN */}
              {isFocused && (autocompleteSuggestions.length > 0 || spellingSuggestion) && (
                <div className="absolute left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden divide-y divide-slate-100 max-h-64 overflow-y-auto">
                  {/* Spelling Suggestion Banner */}
                  {spellingSuggestion && (
                    <div className="p-3 bg-emerald-50 text-xs text-slate-700 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                        <span>Did you mean? <strong className="text-emerald-700 font-black">{spellingSuggestion}</strong></span>
                      </div>
                      <button
                        onMouseDown={() => handleApplySuggestion(spellingSuggestion)}
                        className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-[10px] uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {/* Autocomplete List */}
                  {autocompleteSuggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      onMouseDown={() => handleApplySuggestion(suggestion)}
                      className="w-full text-left px-4 py-2.5 text-xs text-slate-800 hover:bg-slate-50 hover:text-emerald-600 font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5 text-slate-400" />
                      <span>{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Inline suggestion fallback (if not focused) */}
              {!isFocused && spellingSuggestion && (
                <div className="text-xs text-slate-600 mt-2 flex items-center gap-1.5 pl-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                  <span>Did you mean?</span>
                  <button
                    onClick={() => handleApplySuggestion(spellingSuggestion)}
                    className="text-emerald-600 font-extrabold hover:underline hover:text-emerald-700 transition-all cursor-pointer"
                  >
                    {spellingSuggestion}
                  </button>
                </div>
              )}
            </div>

            {/* Sort Dropdown (4 cols on md) */}
            <div className="relative md:col-span-4">
              <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-slate-500 pointer-events-none">
                <ArrowUpDown className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Sort:</span>
              </div>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="w-full pl-20 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-emerald-500 transition-all shadow-sm appearance-none cursor-pointer font-medium"
              >
                <option value="name-asc" className="bg-white">Name: A to Z</option>
                <option value="name-desc" className="bg-white">Name: Z to A</option>
                <option value="thc-desc" className="bg-white">THC Potency: High to Low</option>
                <option value="thc-asc" className="bg-white">THC Potency: Low to High</option>
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500 text-[10px]">▼</div>
            </div>
          </div>

          {/* PLANT TYPE FILTER PILLS */}
          <div className="space-y-2">
            <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3 text-emerald-500" />
              Filter by Cultivar Type:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "All Types", id: "ALL" },
                { label: "Indicas", id: "INDICA" },
                { label: "Sativas", id: "SATIVA" },
                { label: "Hybrids", id: "HYBRID" },
                { label: "CBD-Rich", id: "CBD" },
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => handleTypeSelect(type.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                    selectedType === type.id
                      ? "bg-emerald-500 border-emerald-400 text-slate-950 font-black shadow-sm"
                      : "bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 hover:border-slate-300"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          {/* LETTER FILTERING SLIDER */}
          <div className="border-t border-slate-200 pt-4">
            <span className="text-[10px] text-slate-600 uppercase tracking-widest font-bold block mb-2">
              Browse Alphabetically:
            </span>
            <div className="flex flex-wrap justify-center gap-1">
              {letters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => handleLetterSelect(letter)}
                  className={`px-2 py-1.5 rounded-lg text-[10px] font-bold tracking-wider transition-all border cursor-pointer ${
                    selectedLetter === letter
                      ? "bg-emerald-500 border-emerald-400 text-slate-950 font-black"
                      : "bg-slate-100 border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-200 hover:border-slate-300"
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CLASSIFICATION SUMMARY BAR */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-slate-600 gap-2 px-1">
          <span>
            Showing <strong className="text-slate-800">{filteredStrains.length}</strong> of {strains.length} total cultivars
          </span>
          {totalPages > 1 && (
            <span>
              Page <strong className="text-slate-800">{currentPage}</strong> of {totalPages}
            </span>
          )}
        </div>

        {/* STREAMS GRID */}
        {paginatedStrains.length > 0 ? (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            key={`${currentPage}-${selectedLetter}-${selectedType}-${sortBy}`} // Re-triggers stagger on layout/page shifts
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {paginatedStrains.map((strain) => {
              const isHighPotency = strain.thcPercent >= 22;
              return (
                <motion.div
                  key={strain.id}
                  variants={itemVariants}
                  className="h-full"
                >
                  <Link
                    href={`/strains/${strain.id}`}
                    className="group bg-white hover:bg-slate-50/50 border border-slate-200 hover:border-slate-300 rounded-2xl p-5 flex flex-col justify-between h-full space-y-4 transition-all relative overflow-hidden shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-600 uppercase tracking-widest font-semibold">
                          {strain.type}
                        </span>
                        {isHighPotency && (
                          <span className="text-[9px] text-amber-600 font-bold bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded uppercase">
                            High THC
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-extrabold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors tracking-tight">
                        {strain.name}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {strain.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-100 pt-3 flex items-center justify-between text-[11px] text-slate-600">
                      <div className="flex gap-2">
                        <span>THC: <strong className="text-slate-800">{strain.thcPercent}%</strong></span>
                        <span>CBD: <strong className="text-slate-800">{strain.cbdPercent}%</strong></span>
                      </div>
                      <span className="text-emerald-600 font-semibold uppercase tracking-wider text-[9px] group-hover:underline flex items-center gap-0.5">
                        View Profile
                        <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="text-center py-12 bg-white border border-slate-200 rounded-2xl max-w-2xl mx-auto px-6 space-y-4 shadow-sm">
            {spellingSuggestion ? (
              <div className="space-y-4">
                <p className="text-sm text-slate-600">
                  No direct results found for &ldquo;<span className="text-rose-600 font-semibold">{search}</span>&rdquo;.
                </p>
                <div className="inline-flex flex-col sm:flex-row items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-5 py-3.5 rounded-2xl max-w-md mx-auto">
                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                    <span>Did you mean:</span>
                  </div>
                  <button
                    onClick={() => handleApplySuggestion(spellingSuggestion)}
                    className="text-sm text-emerald-600 font-black hover:underline hover:text-emerald-700 transition-colors cursor-pointer"
                  >
                    {spellingSuggestion} &rarr;
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-slate-500">No strains match your active filters or search terms.</p>
            )}
            <div className="pt-2">
              <button
                onClick={() => {
                  setSearch("");
                  setSelectedLetter("ALL");
                  setSelectedType("ALL");
                  setSortBy("name-asc");
                }}
                className="text-xs text-emerald-600 font-semibold hover:underline hover:text-emerald-700 transition-colors cursor-pointer"
              >
                Reset Search & Filters
              </button>
            </div>
          </div>
        )}

        {/* PAGINATION NAVIGATION */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3 pt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-xs text-slate-700 font-bold rounded-xl border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
            >
              Previous
            </button>
            <span className="text-xs text-slate-600">
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="px-4 py-2 bg-white hover:bg-slate-50 text-xs text-slate-700 font-bold rounded-xl border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
            >
              Next
            </button>
          </div>
        )}

        {/* BIOCHEMICAL INDEX & SEO HASHTAG NETWORK */}
        <HashtagCrossLinker initialTag="indica" isDarkTheme={false} className="mt-8" />

        {/* GO-DADDY ACQUISITION OFFER FOR HIGHEST CONVERSION */}
        <section className="rounded-2xl p-6 sm:p-8 border border-emerald-200 bg-emerald-50 text-slate-900 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
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
