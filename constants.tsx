
import { AIAgent, Sector } from './types';

export const MOCK_AGENTS: AIAgent[] = [
  {
    id: '1',
    name: 'LeadGen Maverick',
    tagline: 'Precision-targeted B2B lead discovery.',
    description: 'LeadGen Maverick crawls professional networks and social signals to identify high-intent prospects for your business. It automates personalized outreach scripts.',
    creator: 'DataFlow Systems',
    sector: Sector.SALES,
    pricing: { monthly: 49, yearly: 490 },
    rating: 4.8,
    reviewsCount: 128,
    capabilities: ['Email Scraping', 'Intent Analysis', 'Auto-Outreach'],
    imageUrl: 'https://picsum.photos/seed/agent1/600/400',
    demoPrompt: 'Find me 10 SaaS companies in Europe currently hiring marketing managers.'
  },
  {
    id: '2',
    name: 'SocialPulse AI',
    tagline: 'Viral-ready content strategist.',
    description: 'SocialPulse analyzes trending topics across X, LinkedIn, and TikTok to draft engagement-optimized posts that align with your brand voice.',
    creator: 'MediaMind AI',
    sector: Sector.MARKETING,
    pricing: { monthly: 29, yearly: 290 },
    rating: 4.9,
    reviewsCount: 856,
    capabilities: ['Trend Detection', 'Copywriting', 'Post Scheduling'],
    imageUrl: 'https://picsum.photos/seed/agent2/600/400',
    demoPrompt: 'Generate a thread about the future of AI agents for LinkedIn.'
  },
  {
    id: '3',
    name: 'SupportWise',
    tagline: 'Infinite patience, instant resolution.',
    description: 'A 24/7 customer support specialist that integrates with your knowledge base to resolve complex user queries with human-like empathy.',
    creator: 'ZendIQ',
    sector: Sector.CUSTOMER_SUPPORT,
    pricing: { monthly: 99, yearly: 990 },
    rating: 4.7,
    reviewsCount: 342,
    capabilities: ['Multilingual Support', 'Sentiment Analysis', 'Doc Integration'],
    imageUrl: 'https://picsum.photos/seed/agent3/600/400',
    demoPrompt: 'How do I reset my password on a staging environment?'
  },
  {
    id: '4',
    name: 'ChartMaster',
    tagline: 'SQL-proficient data scientist.',
    description: 'Connect ChartMaster to your DB to generate real-time visualizations and deep-dive insights without writing a single line of code.',
    creator: 'InsightEngine',
    sector: Sector.DATA_ANALYTICS,
    pricing: { monthly: 149, yearly: 1490 },
    rating: 4.9,
    reviewsCount: 215,
    capabilities: ['SQL Generation', 'Predictive Modeling', 'Dashboarding'],
    imageUrl: 'https://picsum.photos/seed/agent4/600/400',
    demoPrompt: 'What was the average churn rate per region last quarter?'
  },
  {
    id: '5',
    name: 'AutoDoc',
    tagline: 'Legally sound automation.',
    description: 'Draft contracts, NDAs, and compliance documents in seconds. Trained on thousands of legal precedents across jurisdictions.',
    creator: 'LexAura',
    sector: Sector.LEGAL,
    pricing: { monthly: 79, yearly: 790 },
    rating: 4.6,
    reviewsCount: 92,
    capabilities: ['Contract Analysis', 'Compliance Check', 'Clause Drafting'],
    imageUrl: 'https://picsum.photos/seed/agent5/600/400',
    demoPrompt: 'Draft a standard NDA for a freelance developer engagement.'
  }
];
