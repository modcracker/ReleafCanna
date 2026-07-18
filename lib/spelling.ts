/**
 * ReleafCanna Real-Time spelling suggestion engine
 * Computes Levenshtein distance between search query and target botanical terms
 */

import { StrainProfile } from "./strains";

// Simple Levenshtein distance algorithm for spell checking
export function getLevenshteinDistance(a: string, b: string): number {
  const tmp: number[][] = [];
  for (let i = 0; i <= a.length; i++) {
    tmp[i] = [i];
  }
  for (let j = 0; j <= b.length; j++) {
    tmp[0][j] = j;
  }
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      tmp[i][j] = Math.min(
        tmp[i - 1][j] + 1, // deletion
        tmp[i][j - 1] + 1, // insertion
        tmp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1) // substitution
      );
    }
  }
  return tmp[a.length][b.length];
}

// Global cache of candidate terms to avoid redundant extraction on every keystroke
let memoizedCandidates: string[] | null = null;

function getCandidateTerms(strains: StrainProfile[]): string[] {
  if (memoizedCandidates) return memoizedCandidates;

  const candidates = new Set<string>();

  // 1. Add all unique full strain names
  strains.forEach((s) => {
    candidates.add(s.name);
    
    // 2. Add single words from strain names of length >= 3
    const words = s.name.split(/\s+/);
    words.forEach((w) => {
      const cleaned = w.replace(/[^a-zA-Z0-9]/g, "");
      if (cleaned.length >= 3) {
        candidates.add(cleaned);
      }
    });

    // 3. Add terpenes and cannabinoids
    if (s.primaryTerpene) candidates.add(s.primaryTerpene);
    if (s.secondaryTerpene) candidates.add(s.secondaryTerpene);
    if (s.primaryCannabinoid) candidates.add(s.primaryCannabinoid);
    if (s.secondaryCannabinoid) candidates.add(s.secondaryCannabinoid);

    // 4. Add conditions
    s.conditions.forEach((cond) => {
      // e.g. "chronic-pain" -> "chronic pain", "pain"
      candidates.add(cond.replace("-", " "));
      const condWords = cond.split("-");
      condWords.forEach((cw) => {
        if (cw.length >= 3) candidates.add(cw);
      });
    });
  });

  // Add standard terms explicitly just in case
  const standardTerms = [
    "Indica", "Sativa", "Hybrid", "THC", "CBD", "CBG", "CBN", "THCV", "CBC",
    "Myrcene", "Limonene", "Linalool", "Pinene", "Humulene", "Caryophyllene", "Terpinolene", "Ocimene",
    "Anxiety", "Pain", "Insomnia", "Depression", "Inflammation", "Spasms"
  ];
  standardTerms.forEach(t => candidates.add(t));

  // Remove any candidates that are too short
  const result: string[] = [];
  candidates.forEach((c) => {
    if (c && c.trim().length >= 3) {
      result.push(c.trim());
    }
  });

  memoizedCandidates = result;
  return result;
}

/**
 * Finds the closest matched term in the database for a given misspelled search query.
 * Returns null if no close match is found or if query is too short.
 */
export function getSpellingSuggestion(query: string, strains: StrainProfile[]): string | null {
  const trimmed = query.trim().toLowerCase();
  if (trimmed.length < 3) return null;

  const candidates = getCandidateTerms(strains);

  let bestMatch: string | null = null;
  let minDistance = Infinity;

  // We want to evaluate the query against candidates
  for (const candidate of candidates) {
    const candLower = candidate.toLowerCase();
    
    // If the candidate is an exact match or substring, no need to suggest spelling correction
    if (candLower === trimmed || candLower.includes(trimmed)) {
      continue;
    }

    const distance = getLevenshteinDistance(trimmed, candLower);

    // Calculate maximum acceptable distance based on the length of the string to avoid wild matches
    // E.g., for query "soure" (len 5) vs "sour" (len 4), distance is 1 (acceptable)
    // For query "xyz" vs "sour", distance is 4 (unacceptable)
    let maxAcceptableDistance = 2;
    if (trimmed.length > 7) {
      maxAcceptableDistance = 3;
    } else if (trimmed.length > 11) {
      maxAcceptableDistance = 4;
    }

    if (distance <= maxAcceptableDistance && distance < minDistance) {
      minDistance = distance;
      bestMatch = candidate;
    }
  }

  // Double check that we found a viable match that isn't too dissimilar
  if (bestMatch && minDistance > 0) {
    return bestMatch;
  }

  return null;
}
