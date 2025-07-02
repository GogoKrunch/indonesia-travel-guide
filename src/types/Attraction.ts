export interface Attraction {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  price: number;
  openHours: string;
  bestTime?: string;
  recommended?: boolean;
  rating: number;
  images: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  createdAt: string;
}