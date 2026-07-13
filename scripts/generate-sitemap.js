const fs = require('fs');
const path = require('path');

// Defined IDs matching lib/data.ts exactly (15 Cannabinoids, 13 Terpenes, 12 Conditions = 40 total items)
const cannabinoids = [
  "THC", "CBD", "CBN", "CBG", "THCV", "CBC", "CBDA", "THCA", "CBDV", "Delta-8-THC", "CBGA", "THCVA", "CBCA", "Delta-10-THC", "CBL"
];

const terpenes = [
  "myrcene", "limonene", "caryophyllene", "pinene", "linalool", "terpinolene", "humulene", "ocimene", "bisabolol", "guaiol", "geraniol", "camphene", "terpineol"
];

const conditions = [
  "pain", "anxiety", "insomnia", "inflammation", "focus", "migraine", "epilepsy", "appetite", "ptsd", "muscle-spasms", "fibromyalgia", "glaucoma"
];

const BASE_URL = "https://releafcanna.example.com"; // Replace with production URL if necessary

function generateSitemap() {
  const lastmod = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${BASE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // Add Cannabinoids (15)
  cannabinoids.forEach(c => {
    xml += `  <url>
    <loc>${BASE_URL}/compounds/${c.toLowerCase()}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  });

  // Add Terpenes (13)
  terpenes.forEach(t => {
    xml += `  <url>
    <loc>${BASE_URL}/compounds/${t.toLowerCase()}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  });

  // Add Conditions (12)
  conditions.forEach(c => {
    xml += `  <url>
    <loc>${BASE_URL}/conditions/${c.toLowerCase()}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
  });

  xml += `</urlset>`;

  const publicDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml.trim(), 'utf8');
  console.log(`Successfully generated static sitemap.xml at ${sitemapPath} with 40 detail page links!`);
}

generateSitemap();
