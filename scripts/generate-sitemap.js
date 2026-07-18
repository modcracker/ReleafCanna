const fs = require('fs');
const path = require('path');

// Replicated deterministic generator list to keep static script 100% self-contained and fast
const PREFIXES = [
  "Acid", "Alaskan", "Alien", "Amethyst", "Blue", "Black", "Bubble", "Candy", "Cherry", "Citrus", 
  "Cosmic", "Crystal", "Durban", "Electric", "Emerald", "Frosty", "Gelato", "Golden", "Gorilla", "Granddaddy", 
  "Green", "Grape", "Harlequin", "Hawaiian", "Ice", "Jack", "Lavender", "Lemon", "Mango", "Maui", 
  "Northern", "Orange", "Peach", "Pineapple", "Platinum", "Purple", "Royal", "Sour", "Strawberry", "Super", 
  "Sweet", "White", "Wild"
];

const SUFFIXES = [
  "Aurora", "Biscotti", "Blossom", "Breath", "Cake", "Chew", "Cookie", "Crack", "Crush", "Cyclone", 
  "Dawn", "Diesel", "Dream", "Express", "Fudge", "Glue", "Gushers", "Haze", "Jack", "Kush", 
  "Lights", "Mac", "Mints", "Mist", "OG", "Pebbles", "Pie", "Poison", "Punch", "Rider", 
  "Runtz", "Sherbet", "Skunk", "Sorbet", "Toffee", "Tsunami", "Urkle", "Widow", "Wreck", "Zkittlez"
];

const academicCannabinoids = ['cbd', 'thc', 'cbg', 'cbn', 'thcv'];
const academicTerpenes = ['beta-caryophyllene', 'myrcene', 'limonene', 'linalool', 'pinene', 'humulene'];
const secondaryCannabinoids = ['cbc', 'cbda', 'thca', 'cbdv', 'delta-8-thc', 'cbga', 'thcva', 'cbca', 'delta-10-thc', 'cbl'];
const secondaryTerpenes = ['terpinolene', 'ocimene', 'bisabolol', 'guaiol', 'geraniol', 'camphene', 'terpineol'];

const conditions = [
  'pain', 'anxiety', 'insomnia', 'inflammation', 'focus', 'migraine', 'epilepsy', 'appetite', 'ptsd', 'muscle-spasms', 'fibromyalgia', 'glaucoma',
  'chronic-pain', 'neuropathic-pain', 'rheumatoid-arthritis', 'generalized-anxiety', 'panic-disorder', 'sleep-onset-delay', 'circadian-disruption',
  'restless-leg-syndrome', 'joint-stiffness', 'osteoporosis-bone-loss', 'allergic-dermatitis', 'psoriasis-plaques', 'sebum-acne-control',
  'sinus-inflammation', 'autoimmune-inflammation', 'geriatric-stiff-joints', 'chronic-fatigue', 'mental-brain-fog', 'adhd-focus-deficit',
  'bronchial-asthma', 'metabolic-syndrome', 'insulin-resistance', 'migraine-headaches', 'tension-headaches', 'neurodegenerative-decline',
  'neurological-tremors', 'appetite-suppression', 'nausea-and-emesis', 'muscle-spasms', 'fibromyalgia', 'inflammatory-bowel-disease',
  'irritable-bowel-syndrome', 'chronic-gastritis', 'acid-reflux', 'ms-spasticity', 'athletic-soreness', 'stress-hypertension',
  'social-anxiety', 'menstrual-cramps'
];

const uniqueConditions = Array.from(new Set(conditions));

const BASE_URL = "https://releafcanna.com";

function getHashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

function generateSitemap() {
  const lastmod = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Matcher Page -->
  <url>
    <loc>${BASE_URL}/matcher</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- Strains Directory -->
  <url>
    <loc>${BASE_URL}/strains</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- Cannabinoids Index -->
  <url>
    <loc>${BASE_URL}/cannabinoids</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Terpenes Index -->
  <url>
    <loc>${BASE_URL}/terpenes</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- AI Advisor -->
  <url>
    <loc>${BASE_URL}/ai-advisor</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;

  // Add Academic Cannabinoids (5)
  academicCannabinoids.forEach(c => {
    xml += `  <url>
    <loc>${BASE_URL}/cannabinoids/${c}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>\n`;
  });

  // Add Academic Terpenes (6)
  academicTerpenes.forEach(t => {
    xml += `  <url>
    <loc>${BASE_URL}/terpenes/${t}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>\n`;
  });

  // Add Secondary Cannabinoids (10)
  secondaryCannabinoids.forEach(c => {
    xml += `  <url>
    <loc>${BASE_URL}/compounds/${c}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.70</priority>
  </url>\n`;
  });

  // Add Secondary Terpenes (7)
  secondaryTerpenes.forEach(t => {
    xml += `  <url>
    <loc>${BASE_URL}/compounds/${t}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.70</priority>
  </url>\n`;
  });

  // Add Conditions (52)
  uniqueConditions.forEach(cond => {
    xml += `  <url>
    <loc>${BASE_URL}/conditions/${cond}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>\n`;
  });

  // Add Dynamic Strains (1700+ pages!)
  const seenIds = new Set();
  const classics = [
    "Blue Dream", "OG Kush", "Sour Diesel", "Granddaddy Purple", "Jack Herer", 
    "White Widow", "Northern Lights", "Girl Scout Cookies", "Durban Poison", 
    "ACDC", "Charlotte's Web", "Harlequin"
  ];

  let strainCount = 0;

  classics.forEach(name => {
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    seenIds.add(id);
    xml += `  <url>
    <loc>${BASE_URL}/strains/${id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>\n`;
    strainCount++;
  });

  PREFIXES.forEach(p => {
    SUFFIXES.forEach(s => {
      if (p.toLowerCase() === s.toLowerCase()) return;
      const name = `${p} ${s}`;
      const id = name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      
      if (seenIds.has(id)) return;
      seenIds.add(id);

      xml += `  <url>
    <loc>${BASE_URL}/strains/${id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.75</priority>
  </url>\n`;
      strainCount++;
    });
  });

  xml += `</urlset>`;

  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml.trim(), 'utf8');
  console.log(`Successfully generated static sitemap.xml at ${sitemapPath} with ${strainCount + 6 + 5 + 6 + 10 + 7 + uniqueConditions.length + 5} URLs!`);
}

generateSitemap();
