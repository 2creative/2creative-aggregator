export interface Template {
  id: string;
  title: string;
  author: string;
  platform: string;
  category: string;
  price: string;
  rating: number;
  ratingCount?: number;
  sales: number;
  tags: string[];
  thumbnail: string;
  url: string;
  previewUrl?: string;
  description: string;
  compatibility?: string;
  updatedAt?: string;
  scrapedAt?: string;
}
