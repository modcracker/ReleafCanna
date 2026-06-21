import { Metadata } from 'next';
import ReleafCannaLander from '../page';

export const metadata: Metadata = {
  title: 'Organic Terpene Encyclopedia & Scent Profiles | ReleafCanna',
  description: 'Deep dive into standard cannabis terpenes: Myrcene, Limonene, Caryophyllene, Pinene, Linalool, and Terpinolene. Discover boiling temperatures, scent indicators, and therapeutic applications.',
  keywords: [
    'cannabis terpenes guide',
    'myrcene boiling point',
    'limonene mood elevation',
    'caryophyllene anti-inflammatory',
    'linalool anxiety relief',
    'medical terpene chemistry',
    'releafcanna terpenes'
  ],
  openGraph: {
    title: 'Organic Terpene Encyclopedia | ReleafCanna',
    description: 'A comprehensive educational dictionary of volatile organic aromatic elements, their boiling points, cellular bindings, and sensory qualities.',
    url: 'https://releafcanna.com/terpenes',
    type: 'website',
  },
};

export default function TerpenesPage() {
  return <ReleafCannaLander defaultTab="terpenes" defaultTheme="citrus" />;
}
