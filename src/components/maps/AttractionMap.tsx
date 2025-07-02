import React, { useEffect, useRef } from 'react';
import { Attraction } from '../../types/Attraction';

interface AttractionMapProps {
  attractions: Attraction[];
  center?: { latitude: number; longitude: number };
  zoom?: number;
}

const AttractionMap: React.FC<AttractionMapProps> = ({ 
  attractions, 
  center,
  zoom = 10
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    const initializeMap = () => {
      if (!window.google || !mapRef.current) return;

      // Default to first attraction or Indonesia center if no attractions
      const mapCenter = center || 
        (attractions.length > 0 
          ? attractions[0].coordinates 
          : { latitude: -2.5489, longitude: 118.0149 }); // Center of Indonesia
      
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: { 
          lat: mapCenter.latitude, 
          lng: mapCenter.longitude 
        },
        zoom,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }]
          }
        ]
      });

      // Clear existing markers
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Add markers for attractions
      attractions.forEach((attraction) => {
        const marker = new window.google.maps.Marker({
          position: { 
            lat: attraction.coordinates.latitude, 
            lng: attraction.coordinates.longitude 
          },
          map: googleMapRef.current,
          title: attraction.name,
          animation: window.google.maps.Animation.DROP
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div class="p-2">
              <h3 class="font-semibold">${attraction.name}</h3>
              <p class="text-sm text-gray-600">${attraction.location}</p>
            </div>
          `
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMapRef.current, marker);
        });

        markersRef.current.push(marker);
      });
    };

    if (window.google && window.google.maps) {
      initializeMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    }

    return () => {
      // Clean up markers
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
    };
  }, [attractions, center, zoom]);

  return (
    <div ref={mapRef} className="w-full h-full rounded-lg">
      {/* Map will be rendered here */}
      <div className="flex items-center justify-center h-full bg-gray-100 text-gray-500">
        Loading map...
      </div>
    </div>
  );
};

export default AttractionMap;