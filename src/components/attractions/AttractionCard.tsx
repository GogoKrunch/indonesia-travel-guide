import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, ExternalLink } from 'lucide-react';
import { Attraction } from '../../types/Attraction';

interface AttractionCardProps {
  attraction: Attraction;
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
      <div className="relative h-56">
        <img 
          src={attraction.images[0]} 
          alt={attraction.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
          <Star className="h-3 w-3 text-yellow-500 mr-1" />
          {attraction.rating.toFixed(1)}
        </div>
        {attraction.category && (
          <div className="absolute top-4 left-4 bg-emerald-600 text-white rounded-full px-3 py-1 text-xs font-medium">
            {attraction.category}
          </div>
        )}
      </div>
      
      <div className="p-5">
        <div className="flex items-start justify-between">
          <h3 className="text-lg font-semibold line-clamp-1">{attraction.name}</h3>
          {attraction.price === 0 ? (
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">Free</span>
          ) : (
            <span className="text-sm text-gray-700">
              Rp{attraction.price.toLocaleString('id-ID')}
            </span>
          )}
        </div>
        
        <div className="flex items-center mt-2 text-gray-500 text-sm">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{attraction.location}</span>
        </div>
        
        <p className="mt-3 text-gray-600 line-clamp-2">
          {attraction.description}
        </p>
        
        <div className="mt-4 flex justify-between items-center">
          <Link 
            to={`/attractions/${attraction.id}`}
            className="text-emerald-600 font-medium text-sm hover:text-emerald-700"
          >
            View Details
          </Link>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => window.open(`https://maps.google.com/maps?q=${attraction.coordinates.latitude},${attraction.coordinates.longitude}`, '_blank')}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
              title="View on Google Maps"
            >
              <ExternalLink className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionCard;