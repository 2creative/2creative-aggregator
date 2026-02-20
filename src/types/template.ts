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
  screenshots?: string[];
  url: string;
  previewUrl?: string;
  description: string;
  features?: string;
  compatibility?: string;
  updatedAt?: string;
  scrapedAt?: string;
}
