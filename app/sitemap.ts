import { MetadataRoute } from 'next';

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
    {
      url: 'https://releafcanna.com/seo-booster',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: 'https://releafcanna.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: 'https://releafcanna.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // Programmatic SEO Tentacles - Cannabinoids
  const cannabinoids = ['cbd', 'thc', 'cbg', 'cbn', 'thcv'];
  const cannabinoidRoutes = cannabinoids.map((id) => ({
    url: `https://releafcanna.com/cannabinoids/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  // Programmatic SEO Tentacles - Terpenes
  const terpenes = ['beta-caryophyllene', 'myrcene', 'limonene', 'linalool', 'pinene', 'humulene'];
  const terpeneRoutes = terpenes.map((id) => ({
    url: `https://releafcanna.com/terpenes/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.75,
  }));

  // Programmatic SEO Tentacles - Symptoms & Clinical Conditions (40 pages)
  const conditions = [
    'chronic-pain',
    'neuropathic-pain',
    'rheumatoid-arthritis',
    'generalized-anxiety',
    'panic-disorder',
    'insomnia',
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
    'chronic-fatigue',
    'mental-brain-fog',
    'adhd-focus-deficit',
    'athletic-soreness',
    'joint-stiffness',
    'neurodegenerative-decline',
    'osteoporosis-bone-loss',
    'appetite-suppression',
    'nausea-and-emesis',
    'restless-leg-syndrome',
    'allergic-dermatitis',
    'psoriasis-plaques',
    'sebum-acne-control',
    'stress-hypertension',
    'bronchial-asthma',
    'social-anxiety',
    'circadian-disruption',
    'metabolic-syndrome',
    'insulin-resistance',
    'neurological-tremors',
    'menstrual-cramps',
    'sinus-inflammation',
    'autoimmune-inflammation',
    'geriatric-stiff-joints'
  ];
  const conditionRoutes = conditions.map((id) => ({
    url: `https://releafcanna.com/conditions/${id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...baseRoutes, ...cannabinoidRoutes, ...terpeneRoutes, ...conditionRoutes];
}
