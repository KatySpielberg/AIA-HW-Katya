export interface Ad {
  id: number;
  category: string;      // BUY&SELL / RENT / TRAVEL / EVENT
  title: string;
  description: string;
  owner: string;
  location: string;
  createdAt: string;     // DateTime from backend as ISO string
  imageUrl?: string | null;
}
