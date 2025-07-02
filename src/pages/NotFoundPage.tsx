import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowLeft } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 flex items-center">
      <div className="container mx-auto px-4 py-16 text-center">
        <MapPin className="mx-auto h-20 w-20 text-emerald-500 mb-6" />
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Oops! Lost in Paradise</h1>
        <p className="text-xl text-gray-600 mb-8 max-w-xl mx-auto">
          The page you're looking for seems to have wandered off to explore Indonesia on its own.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;