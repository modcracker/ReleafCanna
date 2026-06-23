import type {Metadata} from 'next';
import {Analytics} from '@vercel/analytics/next';
import './globals.css'; // Global styles

export const metadata: Metadata = {
  title: 'releafcanna.com | Premium Cannabis Releaf Directory & Domain Marketplace',
  description: 'Explore the biological science of physical cannabis relief. Complete with interactive cannabinoid profiles (CBD, THC, CBG, CBN, THCV) and a terpene encyclopedia. Premium digital estate open for acquisition.',
  keywords: [
    'releafcanna',
    'releaf cannabis',
    'cannabis relief directory',
    'cannabis domain for sale',
    'CBD molecule directory',
    'terpene science directory',
    'GoDaddy domain lander',
    'Feelize websites',
    'cannabinoid profile guide'
  ],
  authors: [{ name: 'ReleafCanna', url: 'https://releafcanna.com' }],
  openGraph: {
    title: 'releafcanna.com | Premium Cannabis Releaf Directory',
    description: 'Explore biological cannabis relief, organic molecule pathways, and terpene mechanics. Premium domain listing available.',
    url: 'https://releafcanna.com',
    siteName: 'ReleafCanna',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'releafcanna.com | Premium Cannabis Releaf Directory',
    description: 'Active scientific guide into organic cannabinoids and terpenes. Secure premium domain listing.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ReleafCanna',
    url: 'https://releafcanna.com',
    description: 'An educational hub and high-grade domain marketplace for releafcanna.com, detailing therapeutic cannabis relief paths, cannabinoids, and premium terpenes.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://releafcanna.com/?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    },
    offers: {
      '@type': 'Offer',
      name: 'releafcanna.com Domain Registration Transfer',
      url: 'https://www.godaddy.com/domainsearch/find?domainToCheck=releafcanna.com',
      priceCurrency: 'USD',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock'
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

