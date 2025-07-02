import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, DollarSign, Star, ChevronLeft, MapIcon, Car, Share2 } from 'lucide-react';
import { useAttractions } from '../context/AttractionContext';
import AttractionMap from '../components/maps/AttractionMap';

const AttractionDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getAttractionById } = useAttractions();
  const [attraction, setAttraction] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchAttraction = async () => {
        setLoading(true);
        try {
          const data = await getAttractionById(id);
          setAttraction(data);
        } catch (error) {
          console.error('Error fetching attraction:', error);
        } finally {
          setLoading(false);
        }
      };
      
      fetchAttraction();
    }
  }, [id, getAttractionById]);

  const openGojek = () => {
    // In a real implementation, this would use the Gojek API
    const gojekDeepLink = `gojek://home?destination=${attraction.coordinates.latitude},${attraction.coordinates.longitude}&destinationName=${encodeURIComponent(attraction.name)}`;
    window.open(gojekDeepLink, '_blank');
    
    // Fallback for browsers
    setTimeout(() => {
      window.open('https://www.gojek.com/app/', '_blank');
    }, 500);
  };

  const openGoogleMaps = () => {
    window.open(`https://maps.google.com/maps?q=${attraction.coordinates.latitude},${attraction.coordinates.longitude}&z=15`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  if (!attraction) {
    return (
      <div className="min-h-screen pt-24 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Attraction not found</h2>
        <p className="text-gray-600 mb-6">The attraction you're looking for doesn't exist or has been removed.</p>
        <Link 
          to="/attractions" 
          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
        >
          Back to Attractions
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-gray-600 hover:text-emerald-600 mb-6"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back
        </button>
        
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Left Column - Images */}
          <div className="lg:w-7/12">
            <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden mb-4">
              <img 
                src={attraction.images[activeImage]} 
                alt={attraction.name} 
                className="w-full h-full object-cover"
              />
              {attraction.category && (
                <div className="absolute top-4 left-4 bg-emerald-600 text-white rounded-full px-3 py-1 text-sm font-medium">
                  {attraction.category}
                </div>
              )}
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {attraction.images.map((image: string, index: number) => (
                <button 
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 ${activeImage === index ? 'ring-2 ring-emerald-600' : ''}`}
                >
                  <img 
                    src={image} 
                    alt={`${attraction.name} ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          {/* Right Column - Details */}
          <div className="lg:w-5/12">
            <div className="bg-white rounded-xl">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold">{attraction.name}</h1>
                <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span className="font-semibold">{attraction.rating.toFixed(1)}</span>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-5 w-5 mr-2 text-emerald-600" />
                <span>{attraction.location}</span>
              </div>
              
              <div className="prose max-w-none mb-8">
                <p className="text-gray-700">{attraction.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-1">
                    <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
                    <span className="font-medium">Entrance Fee</span>
                  </div>
                  {attraction.price === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="text-gray-900 font-medium">
                      Rp{attraction.price.toLocaleString('id-ID')}
                    </span>
                  )}
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-1">
                    <Clock className="h-5 w-5 mr-2 text-emerald-600" />
                    <span className="font-medium">Open Hours</span>
                  </div>
                  <span className="text-gray-900">
                    {attraction.openHours}
                  </span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-1">
                    <Calendar className="h-5 w-5 mr-2 text-emerald-600" />
                    <span className="font-medium">Best Time</span>
                  </div>
                  <span className="text-gray-900">
                    {attraction.bestTime || 'Any time'}
                  </span>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-1">
                    <Star className="h-5 w-5 mr-2 text-emerald-600" />
                    <span className="font-medium">Recommended</span>
                  </div>
                  <span className="text-gray-900">
                    {attraction.recommended ? 'Highly Recommended' : 'Recommended'}
                  </span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-4 mb-8">
                <button 
                  onClick={openGoogleMaps}
                  className="flex items-center justify-center py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition"
                >
                  <MapIcon className="h-5 w-5 mr-2" />
                  View on Google Maps
                </button>
                
                <button 
                  onClick={openGojek}
                  className="flex items-center justify-center py-3 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                >
                  <Car className="h-5 w-5 mr-2" />
                  Book Gojek Ride
                </button>
                
                <button 
                  className="flex items-center justify-center py-3 px-4 border border-gray-300 hover:bg-gray-50 rounded-lg transition"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </button>
              </div>

              {/* Nearby Hotels Teaser */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-2">Nearby Hotels</h3>
                <p className="text-gray-700 mb-4">
                  Find perfect accommodations near {attraction.name}
                </p>
                <Link 
                  to={`/hotels?near=${attraction.id}`} 
                  className="text-blue-600 font-medium hover:text-blue-700"
                >
                  Browse Hotels →
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Location</h2>
          <div className="h-[400px] rounded-xl overflow-hidden">
            <AttractionMap attractions={[attraction]} center={attraction.coordinates} zoom={14} />
          </div>
        </div>
        
        {/* Nearby Attractions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Nearby Attractions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* In a real implementation, these would be fetched based on proximity */}
            {/* Placeholder for demo */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttractionDetailsPage;