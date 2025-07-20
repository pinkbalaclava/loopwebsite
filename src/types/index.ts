export interface Plan {
  id: string;
  title: string;
  speed: string;
  price: string;
  features: string[];
  bestValue?: boolean;
  region?: string;
  development?: string;
  provider?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactForm {
  name: string;
  phone_number: string;
  preferred_language: 'en' | 'af' | 'zu';
  manual_location: string;
}

export interface StepperData {
  step: number;
  selectorMode: 'region' | 'development';
  selectedOption: string;
  selectedPlan: Plan | null;
  selectedProvider: string;
  contactInfo: ContactForm;
}

export interface Provider {
  id: string;
  name: string;
  logo?: string;
  description: string;
}