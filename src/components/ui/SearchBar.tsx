import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/attractions?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search destinations, attractions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:border-emerald-500 focus:ring focus:ring-emerald-200 focus:ring-opacity-50 focus:outline-none transition"
        />
        <button 
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-emerald-500 text-white p-2 rounded-full hover:bg-emerald-600 transition"
        >
          <Search size={20} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;