export type AgeBracket = 'all' | '0-2' | '3-5' | '6-8' | '9+';

export type ToyCategory = 'all' | 'wooden' | 'stem' | 'plush' | 'creative' | 'games';

export interface Toy {
  id: string;
  name: string;
  category: ToyCategory;
  categoryLabel: string;
  ageBracket: AgeBracket;
  ageLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  tagline: string;
  description: string;
  materials: string;
  origin: string;
  dimensions: string;
  safetyCert: string;
  inStockCount: number;
  isHeirloomChoice?: boolean;
  features: string[];
}

export type GiftWrapOption = 'none' | 'kraft-twine' | 'starry-night' | 'forest-green';

export interface CartItem {
  toy: Toy;
  quantity: number;
  giftWrap: GiftWrapOption;
  giftNote?: string;
}

export interface StoreEvent {
  id: string;
  title: string;
  dayTime: string;
  ageRecommendation: string;
  instructor: string;
  description: string;
  seatsLeft: number;
  totalSeats: number;
  cost: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  toyPurchased: string;
  comment: string;
}
