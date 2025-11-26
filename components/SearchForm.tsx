import React, { useState } from 'react';
import { Search, Loader2, MapPin, ChevronDown, Building2, X } from 'lucide-react';

const CATEGORIES = [
  "All Categories",
  "Restaurants",
  "Hotels",
  "Retail",
  "Services",
  "Health",
  "Entertainment",
  "Automotive",
  "Real Estate",
  "Education",
  "Technology"
];

interface SearchFormProps {
  onSearch: (query: string, useLocation: boolean, category: string) => void;
  isSearching: boolean;
}

export const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isSearching }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [useLocation, setUseLocation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, useLocation, category);
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex flex-col md:flex-row gap-3">
          
          {/* Category Select */}
          <div className="relative min-w-[180px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full pl-10 pr-10 py-4 border border-gray-300 rounded-xl leading-5 bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 sm:text-base shadow-sm appearance-none transition-all cursor-pointer"
              disabled={isSearching}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Search Input */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-10 py-4 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 sm:text-base shadow-sm transition-all"
              placeholder="e.g. Italian food in Chicago, IL"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isSearching}
            />
            {query && (
              <button
                type="button"
                onClick={handleClear}
                disabled={isSearching}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Clear search"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          <div className="flex gap-3">
            {/* Location Toggle */}
            <button
              type="button"
              onClick={() => setUseLocation(!useLocation)}
              className={`flex-none flex items-center justify-center px-4 py-4 border rounded-xl transition-colors ${
                useLocation 
                  ? 'bg-primary-50 border-primary-200 text-primary-700' 
                  : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
              }`}
              title="Search near me"
              disabled={isSearching}
            >
              <MapPin className={`w-5 h-5 ${useLocation ? 'fill-current' : ''}`} />
            </button>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSearching || !query.trim()}
              className="flex-none inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-xl text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition-all min-w-[140px]"
            >
              {isSearching ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Scraping...
                </>
              ) : (
                'Start'
              )}
            </button>
          </div>
        </div>
        {useLocation && (
            <p className="mt-2 text-xs text-primary-600 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Using your current location for better grounding
            </p>
        )}
      </form>
    </div>
  );
};