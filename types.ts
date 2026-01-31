
export enum Sector {
  SALES = 'Sales',
  MARKETING = 'Marketing',
  CUSTOMER_SUPPORT = 'Customer Support',
  DATA_ANALYTICS = 'Data Analytics',
  AUTOMATION = 'Automation',
  CREATIVE = 'Creative',
  LEGAL = 'Legal'
}

export interface Pricing {
  monthly: number;
  yearly: number;
}

export interface AIAgent {
  id: string;
  name: string;
  tagline: string;
  description: string;
  creator: string;
  sector: Sector;
  pricing: Pricing;
  rating: number;
  reviewsCount: number;
  capabilities: string[];
  imageUrl: string;
  demoPrompt?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'creator';
  subscriptions: string[]; // Agent IDs
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
