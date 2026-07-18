import { getAllStrains } from "@/lib/strains";
import { Leaf, Shield, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import StrainDetailExplorer from "@/app/components/StrainDetailExplorer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const strains = getAllStrains();
  // Return the first 500 for static pre-rendering, let the rest render on-demand to keep build super fast!
  return strains.slice(0, 500).map((s) => ({ id: s.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const strains = getAllStrains();
  const strain = strains.find((s) => s.id === id.toLowerCase());

  if (!strain) {
    return {
      title: "Cannabis Strain Profile Not Found | ReleafCanna",
      description: "Detailed scientific strain profiles on releafcanna.com."
    };
  }

  const title = `${strain.name} (${strain.type}) Strain Info, Potency & Medical Uses | ReleafCanna`;
  const desc = `Detailed scientific review of the ${strain.name} strain. Analyze its ${strain.thcPercent}% THC potency, ${strain.primaryCannabinoid} / ${strain.primaryTerpene} terpene profile, and its clinical applications for ${strain.conditions.join(" & ")}.`;

  return {
    title,
    description: desc,
    keywords: [
      `${strain.name} strain`,
      `${strain.name} THC percentage`,
      `${strain.name} effects`,
      `${strain.name} medical use`,
      `buy ${strain.name} seeds`,
      `releafcanna ${strain.id}`
    ],
    alternates: {
      canonical: `https://releafcanna.com/strains/${strain.id}`,
    },
    openGraph: {
      title,
      description: desc,
      url: `https://releafcanna.com/strains/${strain.id}`,
      siteName: "ReleafCanna",
      locale: "en_US",
      type: "article",
    }
  };
}

export default async function StrainDetailPage({ params }: PageProps) {
  const { id } = await params;
  const strains = getAllStrains();
  const strain = strains.find((s) => s.id === id.toLowerCase());

  if (!strain) {
    notFound();
  }

  // Find up to 6 related strains sharing similar properties (excluding current strain)
  const relatedStrains = strains
    .filter((s) => s.id !== strain.id)
    .filter(
      (s) =>
        s.type === strain.type ||
        s.primaryCannabinoid === strain.primaryCannabinoid ||
        s.primaryTerpene === strain.primaryTerpene
    )
    .slice(0, 6);

  // Construct Product / DefinedTerm schema JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `https://releafcanna.com/strains/${strain.id}`,
    "name": strain.name,
    "description": strain.description,
    "category": "Medical Cannabis Cultivar",
    "offers": {
      "@type": "Offer",
      "url": `https://releafcanna.com/strains/${strain.id}`,
      "priceCurrency": "USD",
      "price": "0.00",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "ReleafCanna"
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "THC Content",
        "value": `${strain.thcPercent}%`
      },
      {
        "@type": "PropertyValue",
        "name": "CBD Content",
        "value": `${strain.cbdPercent}%`
      },
      {
        "@type": "PropertyValue",
        "name": "Primary Cannabinoid",
        "value": strain.primaryCannabinoid
      },
      {
        "@type": "PropertyValue",
        "name": "Primary Terpene",
        "value": strain.primaryTerpene
      }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Dynamic JSON-LD script for SEO crawling */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HEADER */}
      <header className="border-b border-slate-200 bg-white backdrop-blur-md sticky top-0 z-50 px-4 py-4 md:px-8">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/strains" className="flex items-center gap-2 text-xs text-slate-600 hover:text-slate-900 transition-all">
            <ArrowLeft className="w-4 h-4" />
            <span>Strain Directory</span>
          </Link>
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 group transition-all" id="strains-header-logo">
            <Leaf className="w-5 h-5 text-emerald-600 group-hover:scale-105 transition-transform" />
            <span className="font-display font-bold text-sm text-slate-900">ReleafCanna Database</span>
          </Link>
        </div>
      </header>

      {/* CONTENT BODY */}
      <main className="flex-grow max-w-3xl mx-auto px-4 py-12 w-full">
        <StrainDetailExplorer strain={strain} relatedStrains={relatedStrains} />
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-slate-100 py-8 px-4 text-center text-slate-600 text-xs">
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
