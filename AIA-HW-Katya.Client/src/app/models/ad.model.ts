export type AdCategory = 'BUY&SELL' | 'RENT' | 'TRAVEL' | 'EVENT';

export const AD_CATEGORIES: AdCategory[] = [
  'BUY&SELL',
  'RENT',
  'TRAVEL',
  'EVENT'
];

export interface Ad {
  id: number;
  category: AdCategory;
  title: string;
  description: string;
  owner: string;
  location: string;
  createdAt: string;     // ISO string
  imageUrl?: string | null;
}
