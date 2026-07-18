import { MetadataRoute } from 'next';
import { getAllStrains } from '@/lib/strains';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseRoutes = [
    {
      url: 'https://releafcanna.com',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: 'https://releafcanna.com/matcher',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://releafcanna.com/strains',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: 'https://releafcanna.com/cannabinoids',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://releafcanna.com/terpenes',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: 'https://releafcanna.com/ai-advisor',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
  ];

  // Programmatic SEO Tentacles - High-Value Academic Cannabinoids (5 pages)
  const academicCannabinoids = ['cbd', 'thc', 'cbg', 'cbn', 'thcv'];
  const academicCannabinoidRoutes = academicCannabinoids.map((id) => ({
    url: `https://releafcanna.com/cannabinoids/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Programmatic SEO Tentacles - High-Value Academic Terpenes (6 pages)
  const academicTerpenes = ['beta-caryophyllene', 'myrcene', 'limonene', 'linalool', 'pinene', 'humulene'];
  const academicTerpeneRoutes = academicTerpenes.map((id) => ({
    url: `https://releafcanna.com/terpenes/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  // Programmatic SEO Tentacles - Remaining Secondary Cannabinoids (10 pages)
  const secondaryCannabinoids = ['cbc', 'cbda', 'thca', 'cbdv', 'delta-8-thc', 'cbga', 'thcva', 'cbca', 'delta-10-thc', 'cbl'];
  const secondaryCannabinoidRoutes = secondaryCannabinoids.map((id) => ({
    url: `https://releafcanna.com/compounds/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Programmatic SEO Tentacles - Remaining Secondary Terpenes (7 pages)
  const secondaryTerpenes = ['terpinolene', 'ocimene', 'bisabolol', 'guaiol', 'geraniol', 'camphene', 'terpineol'];
  const secondaryTerpeneRoutes = secondaryTerpenes.map((id) => ({
    url: `https://releafcanna.com/compounds/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Programmatic SEO Tentacles - Clinical & Search-Optimized Conditions (52 pages total)
  const conditions = [
    // 12 Clinical Parents
    'pain', 'anxiety', 'insomnia', 'inflammation', 'focus', 'migraine', 'epilepsy', 'appetite', 'ptsd', 'muscle-spasms', 'fibromyalgia', 'glaucoma',
    // 40 Search-Optimized Sub-Conditions
    'chronic-pain',
    'neuropathic-pain',
    'rheumatoid-arthritis',
    'generalized-anxiety',
    'panic-disorder',
    'sleep-onset-delay',
    'circadian-disruption',
    'restless-leg-syndrome',
    'joint-stiffness',
    'osteoporosis-bone-loss',
    'allergic-dermatitis',
    'psoriasis-plaques',
    'sebum-acne-control',
    'sinus-inflammation',
    'autoimmune-inflammation',
    'geriatric-stiff-joints',
    'chronic-fatigue',
    'mental-brain-fog',
    'adhd-focus-deficit',
    'bronchial-asthma',
    'metabolic-syndrome',
    'insulin-resistance',
    'migraine-headaches',
    'tension-headaches',
    'neurodegenerative-decline',
    'neurological-tremors',
    'appetite-suppression',
    'nausea-and-emesis',
    'chronic-pain',
    'neuropathic-pain',
    'rheumatoid-arthritis',
    'generalized-anxiety',
    'panic-disorder',
    'sleep-onset-delay',
    'muscle-spasms',
    'fibromyalgia',
    'migraine-headaches',
    'tension-headaches',
    'inflammatory-bowel-disease',
    'irritable-bowel-syndrome',
    'chronic-gastritis',
    'acid-reflux',
    'ms-spasticity',
    'athletic-soreness',
    'stress-hypertension',
    'social-anxiety',
    'menstrual-cramps'
  ];

  // De-duplicate condition list
  const uniqueConditions = Array.from(new Set(conditions));

  const conditionRoutes = uniqueConditions.map((id) => ({
    url: `https://releafcanna.com/conditions/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Programmatic SEO Tentacles - High-Density Strains (1700+ pages!)
  const strains = getAllStrains();
  const strainRoutes = strains.map((s) => ({
    url: `https://releafcanna.com/strains/${s.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  return [
    ...baseRoutes,
    ...academicCannabinoidRoutes,
    ...academicTerpeneRoutes,
    ...secondaryCannabinoidRoutes,
    ...secondaryTerpeneRoutes,
    ...conditionRoutes,
    ...strainRoutes
  ];
}
