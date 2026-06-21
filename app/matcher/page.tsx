import { Metadata } from 'next';
import ReleafCannaLander from '../page';

export const metadata: Metadata = {
  title: 'Symptom Synthesizer & Cannabis Dosage Matcher | ReleafCanna',
  description: 'Determine your ideal botanical profile using our interactive molecular synthesizer. Formulate ratios for addressing pain, insomnia, anxiety, focus, or muscle spasms.',
  keywords: [
    'cannabis dosage calculator',
    'CBD THC ratio synthesizer',
    'titration planning wizard',
    'custom cannabinoid formulator',
    'insomnia weed ratio',
    'medical dosage planner',
    'releafcanna matcher'
  ],
  openGraph: {
    title: 'Symptom Synthesizer & Dosage Matcher | ReleafCanna',
    description: 'Input symptoms and receive mathematically balanced phytocannabinoid formulations with custom step-by-step titration strategies.',
    url: 'https://releafcanna.com/matcher',
    type: 'website',
  },
};

export default function MatcherPage() {
  return <ReleafCannaLander defaultTab="matcher" defaultTheme="aurora" />;
}
