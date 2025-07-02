import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Filter, Map as MapIcon, List } from 'lucide-react';
import { useAttractions } from '../context/AttractionContext';
import { useLocation } from '../context/LocationContext';
import AttractionCard from '../components/attractions/AttractionCard';
import AttractionMap from '../components/maps/AttractionMap';
import SearchBar from '../components/ui/SearchBar';

const AttractionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { attractions, loading, getAttractions, getAttractionsByLocation } = useAttractions();
  const { location } = useLocation();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: 0,
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    const locationQuery = searchParams.get('location') || '';
    const nearbyQuery = searchParams.get('nearby') === 'true';

    if (nearbyQuery && location) {
      getAttractionsByLocation(location.latitude, location.longitude);
    } else if (locationQuery) {
      getAttractions({ location: locationQuery });
    } else {
      getAttractions({ search: searchQuery });
    }
  }, [searchParams, location, getAttractions, getAttractionsByLocation]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const categories = [
    'All Categories',
    'Beaches',
    'Mountains',
    'Cultural Sites',
    'Historical Places',
    'Nature',
    'Adventure',
    'Cities',
  ];

  const priceRanges = [
    'Any Price',
    'Free',
    'Under Rp50,000',
    'Rp50,000 - Rp200,000',
    'Above Rp200,000',
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Explore Attractions</h1>
            <p className="text-gray-600">
              {searchParams.get('search') 
                ? `Search results for "${searchParams.get('search')}"` 
                : searchParams.get('location') 
                  ? `Attractions in ${searchParams.get('location')}`
                  : searchParams.get('nearby') === 'true'
                    ? 'Attractions near your location'
                    : 'Discover amazing places in Indonesia'}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button 
              onClick={() => setViewMode('list')} 
              className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700'}`}
            >
              <List size={20} />
            </button>
            <button 
              onClick={() => setViewMode('map')} 
              className={`p-2 rounded-md ${viewMode === 'map' ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700'}`}
            >
              <MapIcon size={20} />
            </button>
            <button 
              onClick={() => setShowFilters(!showFilters)} 
              className={`p-2 rounded-md ${showFilters ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700'}`}
            >
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="mb-8">
          <SearchBar />
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="font-semibold text-lg mb-4">Filters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  name="category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                >
                  {categories.map((category) => (
                    <option key={category} value={category === 'All Categories' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Range
                </label>
                <select
                  name="priceRange"
                  value={filters.priceRange}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                >
                  {priceRanges.map((range) => (
                    <option key={range} value={range === 'Any Price' ? '' : range}>
                      {range}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rating
                </label>
                <select
                  name="rating"
                  value={filters.rating}
                  onChange={handleFilterChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
                >
                  <option value={0}>Any Rating</option>
                  <option value={3}>3+ Stars</option>
                  <option value={4}>4+ Stars</option>
                  <option value={5}>5 Stars</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button 
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <>
            {viewMode === 'list' ? (
              attractions.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {attractions.map((attraction) => (
                    <AttractionCard key={attraction.id} attraction={attraction} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No attractions found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              )
            ) : (
              <div className="h-[600px] rounded-lg overflow-hidden">
                <AttractionMap attractions={attractions} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AttractionsPage;