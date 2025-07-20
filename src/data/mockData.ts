import { Plan, FAQ, Provider } from '../types';

export const mockPlans: Plan[] = [
  {
    id: '1',
    title: 'Home Essential',
    speed: '25 Mbps',
    price: 'R299',
    features: ['Perfect for streaming', 'Multiple devices', 'Unlimited data', '24/7 support'],
    region: 'Cape Town',
    development: 'Residential',
    provider: 'Openserve'
  },
  {
    id: '2',
    title: 'Family Pro',
    speed: '50 Mbps',
    price: 'R499',
    features: ['Great for families', 'Gaming friendly', 'Work from home ready', 'Priority support'],
    bestValue: true,
    region: 'Cape Town',
    development: 'Residential',
    provider: 'Vumatel'
  },
  {
    id: '3',
    title: 'Power User',
    speed: '100 Mbps',
    price: 'R799',
    features: ['Ultra-fast downloads', 'Multiple 4K streams', 'Business backup', 'Dedicated support'],
    region: 'Cape Town',
    development: 'Estate',
    provider: 'Openserve'
  },
  {
    id: '4',
    title: 'Home Connect',
    speed: '20 Mbps',
    price: 'R249',
    features: ['Budget friendly', 'Basic streaming', 'Email & browsing', 'Standard support'],
    region: 'Johannesburg',
    development: 'Residential',
    provider: 'Vumatel'
  },
  {
    id: '5',
    title: 'Remote Worker',
    speed: '75 Mbps',
    price: 'R649',
    features: ['Video calls ready', 'Cloud sync optimized', 'Low latency', 'Business hours priority'],
    region: 'Johannesburg',
    development: 'Estate',
    provider: 'Openserve'
  },
  {
    id: '6',
    title: 'Estate Premium',
    speed: '200 Mbps',
    price: 'R1299',
    features: ['Fastest available', 'Smart home ready', 'Professional grade', 'VIP support'],
    region: 'Durban',
    development: 'Estate',
    provider: 'Vumatel'
  },
  {
    id: '7',
    title: 'Suburb Standard',
    speed: '40 Mbps',
    price: 'R399',
    features: ['Solid performance', 'Family friendly', 'Good for streaming', 'Reliable connection'],
    region: 'Durban',
    development: 'Residential',
    provider: 'Octotel'
  },
  {
    id: '8',
    title: 'Gig Master',
    speed: '1 Gbps',
    price: 'R1999',
    features: ['Lightning fast', 'Future proof', 'Enterprise grade', 'White-glove service'],
    region: 'Cape Town',
    development: 'Estate',
    provider: 'Vumatel'
  }
];

export const regionOptions = ['Cape Town', 'Johannesburg', 'Durban', 'Pretoria'];
export const developmentOptions = ['Residential', 'Estate', 'Business Park', 'Complex'];

export const providers: Provider[] = [
  {
    id: 'openserve',
    name: 'Openserve',
    description: 'Telkom\'s fibre network with wide coverage across South Africa'
  },
  {
    id: 'vumatel',
    name: 'Vumatel',
    description: 'Premium fibre infrastructure focused on residential areas'
  },
  {
    id: 'octotel',
    name: 'Octotel',
    description: 'Western Cape specialist with excellent local support'
  },
  {
    id: 'metrofibre',
    name: 'MetroFibre',
    description: 'Expanding network with competitive pricing'
  }
];

export const faqData: FAQ[] = [
  {
    question: 'How long does installation take?',
    answer: 'Most installations are completed within 2-4 hours. Our technicians will contact you 24 hours before your scheduled appointment to confirm the time slot.'
  },
  {
    question: 'What happens if my connection goes down?',
    answer: 'We offer 24/7 technical support with most issues resolved within 4 hours. For urgent business connections, we provide priority support with faster response times.'
  },
  {
    question: 'Are there any setup fees or contracts?',
    answer: 'Installation is free for most residential areas. We offer both month-to-month and 12-month contract options, with discounts available for longer commitments.'
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer: 'Yes, you can change your plan at any time. Upgrades are instant, while downgrades take effect from your next billing cycle. No penalties apply for plan changes.'
  },
  {
    question: 'Do you have data caps or throttling?',
    answer: 'No, all our plans come with unlimited data and no throttling. You get the full advertised speed 24/7, whether you\'re streaming, gaming, or working from home.'
  }
];