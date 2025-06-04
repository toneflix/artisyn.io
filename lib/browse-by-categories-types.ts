export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description?: string;
  count: number;
}

export interface Artisan {
  id: string;
  name: string;
  category: string;
  location: string;
  image: string;
  verified: boolean;
  rating: number;
  reviews: number;
  specialties: string[];
}

export type IconType =
  | "plumber"
  | "barber"
  | "painter"
  | "carpenter"
  | "mechanic"
  | "tech_repair"
  | "electrician"
  | "cleaner"
  | "photographer"
  | "musician"
  | "tailor"
  | "chef";
