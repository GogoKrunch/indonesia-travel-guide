import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

interface LocationContextType {
  location: LocationCoordinates | null;
  loading: boolean;
  error: string | null;
  getUserLocation: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationCoordinates | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserLocation = useCallback(() => {
    setLoading(true);
    setError(null);
    
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLoading(false);
        },
        (err) => {
          console.error('Error getting location:', err);
          setError('Unable to retrieve your location');
          setLoading(false);
          
          // Set default location to Jakarta for demo purposes
          setLocation({
            latitude: -6.2088,
            longitude: 106.8456
          });
        },
        { timeout: 30000 } // Increased timeout from 10000 to 30000 milliseconds
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      
      // Set default location to Jakarta for demo purposes
      setLocation({
        latitude: -6.2088,
        longitude: 106.8456
      });
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        location,
        loading,
        error,
        getUserLocation
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = (): LocationContextType => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};