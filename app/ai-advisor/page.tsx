import { Metadata } from 'next';
import ReleafCannaLander from '../page';

export const metadata: Metadata = {
  title: 'AI Botanical & Cannabis Relief Advisor | ReleafCanna',
  description: 'Consult our generative AI server-side botanist assistant. Ask specific questions about cannabinoid saturation, terpene pairings, and clinical endocannabinoid guidelines.',
  keywords: [
    'AI cannabis advisor',
    'botanical artificial intelligence',
    'medical marijuana therapist AI',
    'ECS receptor consultant AI',
    'smart cannabis recommendation',
    'releafcanna AI advisor'
  ],
  openGraph: {
    title: 'AI Botanical & Cannabis Relief Advisor | ReleafCanna',
    description: 'Ask deep technical or general academic questions regarding endocannabinoid modulation and organic chemistry, processed securely on our server-side integration.',
    url: 'https://releafcanna.com/ai-advisor',
    type: 'website',
  },
};

export default function AiAdvisorPage() {
  return <ReleafCannaLander defaultTab="ai" defaultTheme="amethyst" />;
}
