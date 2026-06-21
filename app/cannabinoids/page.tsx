import { Metadata } from 'next';
import ReleafCannaLander from '../page';

export const metadata: Metadata = {
  title: 'Cannabinoid Science Matrix (CBD, THC, CBG, CBN, THCV) | ReleafCanna',
  description: 'Understand the primary active cannabinoid molecules of cannabis. Explore pharmacological profile charts for CBD, THC, CBG, CBN, and THCV with precise therapeutic indicators.',
  keywords: [
    'CBD oil science',
    'cannabinoid matrix',
    'CBG clinical studies',
    'CBN sleep therapy',
    'THCV appetite supplement',
    'cannabis molecule chart',
    'releafcanna cannabinoids'
  ],
  openGraph: {
    title: 'Cannabinoid Science Matrix | ReleafCanna',
    description: 'Explore biological cannabis relief pathways, organic molecule pathways, and direct cannabinoid receptor affinity comparisons.',
    url: 'https://releafcanna.com/cannabinoids',
    type: 'website',
  },
};

export default function CannabinoidsPage() {
  return <ReleafCannaLander defaultTab="cannabinoids" defaultTheme="cosmic" />;
}
