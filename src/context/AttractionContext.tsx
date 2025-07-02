import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Attraction } from '../types/Attraction';

// Sample data for demonstration
const sampleAttractions: Attraction[] = [
  {
    id: '1',
    name: 'Tanah Lot Temple',
    description: 'Iconic sea temple perched on a rock formation, offering stunning sunset views and cultural experiences.',
    location: 'Bali',
    category: 'Temples',
    price: 60000,
    openHours: '7:00 AM - 7:00 PM',
    bestTime: 'Sunset',
    recommended: true,
    rating: 4.7,
    images: [
      'https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg',
      'https://images.pexels.com/photos/3996362/pexels-photo-3996362.jpeg',
      'https://images.pexels.com/photos/3996336/pexels-photo-3996336.jpeg'
    ],
    coordinates: {
      latitude: -8.621213,
      longitude: 115.086623
    },
    createdAt: '2023-01-15T08:30:00Z'
  },
  {
    id: '2',
    name: 'Borobudur Temple',
    description: 'The world\'s largest Buddhist temple, dating from the 8th and 9th centuries, and a UNESCO World Heritage site.',
    location: 'Yogyakarta',
    category: 'Historical Places',
    price: 350000,
    openHours: '6:00 AM - 5:00 PM',
    bestTime: 'Sunrise',
    recommended: true,
    rating: 4.9,
    images: [
      'https://images.pexels.com/photos/3522392/pexels-photo-3522392.jpeg',
      'https://images.pexels.com/photos/4255618/pexels-photo-4255618.jpeg',
      'https://images.pexels.com/photos/9811893/pexels-photo-9811893.jpeg'
    ],
    coordinates: {
      latitude: -7.607874,
      longitude: 110.203751
    },
    createdAt: '2023-02-20T10:15:00Z'
  },
  {
    id: '3',
    name: 'Raja Ampat Islands',
    description: 'An archipelago comprising over 1,500 small islands, featuring pristine beaches, coral reefs, and extraordinary marine biodiversity.',
    location: 'West Papua',
    category: 'Islands',
    price: 1000000,
    openHours: 'Open 24 hours',
    bestTime: 'October to April',
    recommended: true,
    rating: 4.8,
    images: [
      'https://images.pexels.com/photos/15347387/pexels-photo-15347387.jpeg',
      'https://images.pexels.com/photos/15347397/pexels-photo-15347397.jpeg',
      'https://images.pexels.com/photos/13809993/pexels-photo-13809993.jpeg'
    ],
    coordinates: {
      latitude: -0.789275,
      longitude: 130.735361
    },
    createdAt: '2023-03-10T09:45:00Z'
  },
  {
    id: '4',
    name: 'Mount Bromo',
    description: 'An active volcano in East Java, Indonesia, and part of the Tengger massif. Famous for its sunrise views and volcanic landscape.',
    location: 'East Java',
    category: 'Mountains',
    price: 27500,
    openHours: '3:00 AM - 5:00 PM',
    bestTime: 'April to October',
    recommended: true,
    rating: 4.6,
    images: [
      'https://images.pexels.com/photos/1298684/pexels-photo-1298684.jpeg',
      'https://images.pexels.com/photos/2832039/pexels-photo-2832039.jpeg',
      'https://images.pexels.com/photos/2832040/pexels-photo-2832040.jpeg'
    ],
    coordinates: {
      latitude: -7.942493,
      longitude: 112.953011
    },
    createdAt: '2023-04-05T11:20:00Z'
  },
  {
    id: '5',
    name: 'Komodo National Park',
    description: 'Home to the Komodo dragon, the largest living lizard, and a UNESCO World Heritage Site. Features rugged terrain, beaches, and coral reefs.',
    location: 'East Nusa Tenggara',
    category: 'Nature',
    price: 150000,
    openHours: '7:00 AM - 5:00 PM',
    bestTime: 'April to December',
    recommended: true,
    rating: 4.7,
    images: [
      'https://images.pexels.com/photos/14011035/pexels-photo-14011035.jpeg',
      'https://images.pexels.com/photos/11446253/pexels-photo-11446253.jpeg',
      'https://images.pexels.com/photos/13908752/pexels-photo-13908752.jpeg'
    ],
    coordinates: {
      latitude: -8.6535,
      longitude: 119.7244
    },
    createdAt: '2023-05-18T07:30:00Z'
  }
];

interface AttractionContextType {
  attractions: Attraction[];
  loading: boolean;
  error: string | null;
  getAttractions: (params?: { search?: string; location?: string }) => void;
  getAttractionById: (id: string) => Promise<Attraction | null>;
  getAttractionsByLocation: (lat: number, lng: number) => void;
  addAttraction: (attraction: Attraction) => Promise<void>;
}

const AttractionContext = createContext<AttractionContextType | undefined>(undefined);

export const AttractionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [attractions, setAttractions] = useState<Attraction[]>(sampleAttractions);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAttractions = useCallback((params?: { search?: string; location?: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with setTimeout
      setTimeout(() => {
        let filteredAttractions = [...sampleAttractions];
        
        if (params?.search) {
          const searchTerm = params.search.toLowerCase();
          filteredAttractions = filteredAttractions.filter(
            attraction => 
              attraction.name.toLowerCase().includes(searchTerm) ||
              attraction.description.toLowerCase().includes(searchTerm) ||
              attraction.location.toLowerCase().includes(searchTerm)
          );
        }
        
        if (params?.location) {
          const locationTerm = params.location.toLowerCase();
          filteredAttractions = filteredAttractions.filter(
            attraction => attraction.location.toLowerCase().includes(locationTerm)
          );
        }
        
        setAttractions(filteredAttractions);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to fetch attractions');
      setLoading(false);
    }
  }, []);

  const getAttractionById = useCallback((id: string): Promise<Attraction | null> => {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        const attraction = sampleAttractions.find(item => item.id === id) || null;
        resolve(attraction);
      }, 500);
    });
  }, []);

  const getAttractionsByLocation = useCallback((lat: number, lng: number) => {
    setLoading(true);
    setError(null);
    
    // Simulate location-based filtering
    // In a real app, this would calculate distance and sort by proximity
    setTimeout(() => {
      setAttractions(sampleAttractions);
      setLoading(false);
    }, 500);
  }, []);

  const addAttraction = useCallback(async (attraction: Attraction): Promise<void> => {
    return new Promise((resolve) => {
      // Simulate API call
      setTimeout(() => {
        setAttractions(prev => [attraction, ...prev]);
        resolve();
      }, 800);
    });
  }, []);

  return (
    <AttractionContext.Provider
      value={{
        attractions,
        loading,
        error,
        getAttractions,
        getAttractionById,
        getAttractionsByLocation,
        addAttraction
      }}
    >
      {children}
    </AttractionContext.Provider>
  );
};

export const useAttractions = (): AttractionContextType => {
  const context = useContext(AttractionContext);
  if (context === undefined) {
    throw new Error('useAttractions must be used within an AttractionProvider');
  }
  return context;
};