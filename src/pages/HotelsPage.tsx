import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Hotel as HotelIcon, MapPin, Star, Filter, Calendar } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';

const HotelsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    priceRange: '',
    rating: 0,
    amenities: [] as string[],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({
    checkIn: '',
    checkOut: '',
  });

  // Mocked hotels data for demo purposes
  const hotels = [
    {
      id: '1',
      name: 'Grand Hyatt Jakarta',
      location: 'Jakarta',
      price: 1500000,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg',
      amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Free WiFi', 'Gym'],
    },
    {
      id: '2',
      name: 'Padma Resort Ubud',
      location: 'Bali',
      price: 2100000,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg',
      amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Free WiFi', 'Infinity Pool'],
    },
    {
      id: '3',
      name: 'Amanjiwo Resort',
      location: 'Yogyakarta',
      price: 5000000,
      rating: 5.0,
      image: 'https://images.pexels.com/photos/261169/pexels-photo-261169.jpeg',
      amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Free WiFi', 'Temple View'],
    },
    {
      id: '4',
      name: 'Alila Manggis',
      location: 'Bali',
      price: 1800000,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/2034335/pexels-photo-2034335.jpeg',
      amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Beach Access', 'Free WiFi'],
    },
    {
      id: '5',
      name: 'Le Meridien Jakarta',
      location: 'Jakarta',
      price: 1200000,
      rating: 4.5,
      image: 'https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg',
      amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Free WiFi', 'Business Center'],
    },
    {
      id: '6',
      name: 'The Westin Ubud',
      location: 'Bali',
      price: 2300000,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/2631746/pexels-photo-2631746.jpeg',
      amenities: ['Swimming Pool', 'Spa', 'Restaurant', 'Free WiFi', 'River View'],
    },
  ];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleAmenityChange = (amenity: string) => {
    if (filters.amenities.includes(amenity)) {
      setFilters({
        ...filters,
        amenities: filters.amenities.filter(a => a !== amenity),
      });
    } else {
      setFilters({
        ...filters,
        amenities: [...filters.amenities, amenity],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Find Hotels</h1>
            <p className="text-gray-600">
              {searchParams.get('near')
                ? 'Hotels near the attraction'
                : searchParams.get('location')
                  ? `Hotels in ${searchParams.get('location')}`
                  : 'Discover perfect accommodations for your stay in Indonesia'}
            </p>
          </div>
          <button
            onClick={toggleFilters}
            className="mt-4 md:mt-0 flex items-center px-4 py-2 bg-white rounded-md shadow-sm hover:bg-gray-50 transition"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </button>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <SearchBar />
            </div>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  placeholder="Check-in"
                  className="pl-10 pr-4 py-3 w-full rounded-md border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                  value={dateRange.checkIn}
                  onChange={(e) => setDateRange({ ...dateRange, checkIn: e.target.value })}
                />
              </div>
            </div>
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  placeholder="Check-out"
                  className="pl-10 pr-4 py-3 w-full rounded-md border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                  value={dateRange.checkOut}
                  onChange={(e) => setDateRange({ ...dateRange, checkOut: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                >
                  <option value="">Any Price</option>
                  <option value="budget">Budget (Under Rp1,000,000)</option>
                  <option value="moderate">Moderate (Rp1,000,000 - Rp2,000,000)</option>
                  <option value="luxury">Luxury (Above Rp2,000,000)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => setFilters({ ...filters, rating: Number(e.target.value) })}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                >
                  <option value={0}>Any Rating</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amenities
                </label>
                <div className="space-y-2">
                  {['Swimming Pool', 'Spa', 'Free WiFi', 'Restaurant', 'Gym'].map((amenity) => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="ml-2 text-gray-700">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button 
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative h-52">
                <img 
                  src={hotel.image} 
                  alt={hotel.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white rounded-full px-2 py-1 text-xs font-medium flex items-center">
                  <Star className="h-3 w-3 text-yellow-500 mr-1" />
                  {hotel.rating.toFixed(1)}
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold">{hotel.name}</h3>
                  <span className="text-sm font-medium text-emerald-600">
                    Rp{hotel.price.toLocaleString('id-ID')}
                    <span className="text-gray-500 font-normal">/night</span>
                  </span>
                </div>
                
                <div className="flex items-center mt-2 text-gray-500 text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{hotel.location}</span>
                </div>
                
                <div className="mt-3 flex flex-wrap gap-2">
                  {hotel.amenities.slice(0, 3).map((amenity, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                      +{hotel.amenities.length - 3} more
                    </span>
                  )}
                </div>
                
                <div className="mt-4">
                  <button className="w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {hotels.length === 0 && (
          <div className="text-center py-16">
            <HotelIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No hotels found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelsPage;