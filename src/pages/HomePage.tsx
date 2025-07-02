import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Hotel, Navigation, Search, PlusCircle } from 'lucide-react';
import SearchBar from '../components/ui/SearchBar';
import { useLocation } from '../context/LocationContext';
import { useAttractions } from '../context/AttractionContext';
import AttractionCard from '../components/attractions/AttractionCard';

const HomePage: React.FC = () => {
  const { getUserLocation } = useLocation();
  const { attractions, getAttractionsByLocation } = useAttractions();

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  const featuredDestinations = [
    {
      name: 'Bali',
      image: 'https://images.pexels.com/photos/1802255/pexels-photo-1802255.jpeg',
      count: 120
    },
    {
      name: 'Yogyakarta',
      image: 'https://images.pexels.com/photos/1029885/pexels-photo-1029885.jpeg',
      count: 85
    },
    {
      name: 'Raja Ampat',
      image: 'https://images.pexels.com/photos/14011035/pexels-photo-14011035.jpeg',
      count: 52
    },
    {
      name: 'Komodo Island',
      image: 'https://images.pexels.com/photos/11446253/pexels-photo-11446253.jpeg',
      count: 32
    }
  ];

  const features = [
    {
      icon: <Search className="h-8 w-8 text-emerald-600" />,
      title: 'Discover Attractions',
      description: 'Explore Indonesia\'s most beautiful destinations and hidden gems'
    },
    {
      icon: <Hotel className="h-8 w-8 text-emerald-600" />,
      title: 'Book Hotels',
      description: 'Find and book accommodations that suit your needs and budget'
    },
    {
      icon: <Navigation className="h-8 w-8 text-emerald-600" />,
      title: 'Easy Navigation',
      description: 'Navigate with Google Maps and get around with Gojek integration'
    },
    {
      icon: <PlusCircle className="h-8 w-8 text-emerald-600" />,
      title: 'Add Attractions',
      description: 'Share your discoveries with other travelers by adding new places'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/2166559/pexels-photo-2166559.jpeg" 
            alt="Indonesia landscape" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Discover the Beauty of Indonesia
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Explore incredible destinations, plan your adventure, 
            and create unforgettable memories in the archipelago paradise.
          </p>
          
          <div className="max-w-xl mx-auto">
            <SearchBar />
          </div>
          
          <div className="mt-12 flex flex-wrap justify-center gap-6">
            <Link 
              to="/attractions" 
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 transition rounded-full font-medium text-lg"
            >
              Explore Attractions
            </Link>
            <Link 
              to="/hotels" 
              className="px-6 py-3 bg-white text-gray-900 hover:bg-gray-100 transition rounded-full font-medium text-lg"
            >
              Find Hotels
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <div 
            className="animate-bounce bg-white bg-opacity-20 p-2 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              });
            }}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Featured Destinations Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore Indonesia's most popular destinations and start planning your next adventure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredDestinations.map((destination, index) => (
              <Link 
                key={index}
                to={`/attractions?location=${destination.name}`}
                className="group"
              >
                <div className="relative h-80 rounded-xl overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white mb-1">{destination.name}</h3>
                    <p className="text-white flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{destination.count} attractions</span>
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/attractions" 
              className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 transition text-white rounded-full font-medium"
            >
              View All Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose JelajahID</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your complete travel companion for exploring Indonesia
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby Attractions Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nearby Attractions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover amazing places close to your current location
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attractions.slice(0, 3).map((attraction) => (
              <AttractionCard key={attraction.id} attraction={attraction} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/attractions?nearby=true" 
              className="inline-block px-6 py-3 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 transition rounded-full font-medium"
            >
              View More Nearby Attractions
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-emerald-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore Indonesia?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start your adventure with JelajahID and discover the beauty of Indonesia
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link 
              to="/attractions" 
              className="px-6 py-3 bg-white text-emerald-600 hover:bg-gray-100 transition rounded-full font-medium text-lg"
            >
              Start Exploring
            </Link>
            <Link 
              to="/add-attraction" 
              className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 transition rounded-full font-medium text-lg"
            >
              Add New Place
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;