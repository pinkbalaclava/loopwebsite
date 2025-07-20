import React, { useState, useRef, useEffect } from 'react';
import { Search, Check, X, MapPin } from 'lucide-react';

interface AddressSuggestion {
  id: string;
  text: string;
  place_name: string;
}

interface CoverageResult {
  covered: boolean;
  address: string;
}

const CoverageChecker: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [coverageResult, setCoverageResult] = useState<CoverageResult | null>(null);
  const [isCheckingCoverage, setIsCheckingCoverage] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Mock AfriGIS autocomplete - replace with actual API call
  const searchAddresses = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock suggestions - replace with actual AfriGIS API call
    const mockSuggestions: AddressSuggestion[] = [
      {
        id: '1',
        text: `${searchQuery} Street, Cape Town, Western Cape`,
        place_name: `${searchQuery} Street, Cape Town, Western Cape`
      },
      {
        id: '2',
        text: `${searchQuery} Avenue, Johannesburg, Gauteng`,
        place_name: `${searchQuery} Avenue, Johannesburg, Gauteng`
      },
      {
        id: '3',
        text: `${searchQuery} Road, Durban, KwaZulu-Natal`,
        place_name: `${searchQuery} Road, Durban, KwaZulu-Natal`
      }
    ].filter(suggestion => 
      suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSuggestions(mockSuggestions);
    setIsLoading(false);
  };

  // Mock coverage check - replace with actual AfriGIS coverage API
  const checkCoverage = async (address: string) => {
    setIsCheckingCoverage(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock coverage result - replace with actual API call
    const isCovered = Math.random() > 0.3; // 70% chance of coverage
    
    setCoverageResult({
      covered: isCovered,
      address: address
    });
    
    setIsCheckingCoverage(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setCoverageResult(null);
    
    if (value.length >= 3) {
      searchAddresses(value);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    setQuery(suggestion.text);
    setShowSuggestions(false);
    setSuggestions([]);
    checkCoverage(suggestion.text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowSuggestions(false);
      checkCoverage(query);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="w-full max-w-md">
      <h3 className="text-xl font-semibold text-white mb-4">
        Check my area coverage
      </h3>
      
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder="Enter your address"
            className="w-full px-4 py-3 pr-12 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
          />
          <button
            type="submit"
            disabled={!query.trim() || isCheckingCoverage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>

        {/* Address Suggestions Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div
            ref={suggestionsRef}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 flex items-center"
              >
                <MapPin className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                <span className="text-gray-900 text-sm">{suggestion.text}</span>
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {isLoading && showSuggestions && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-600 text-sm">Searching addresses...</span>
            </div>
          </div>
        )}
      </form>

      {/* Coverage Checking State */}
      {isCheckingCoverage && (
        <div className="mt-4 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span className="ml-2 text-white text-sm">Checking coverage...</span>
          </div>
        </div>
      )}

      {/* Coverage Result */}
      {coverageResult && !isCheckingCoverage && (
        <div className={`mt-4 p-4 rounded-lg border ${
          coverageResult.covered
            ? 'bg-green-50 border-green-200'
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-start">
            <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
              coverageResult.covered ? 'bg-green-500' : 'bg-red-500'
            }`}>
              {coverageResult.covered ? (
                <Check className="h-4 w-4 text-white" />
              ) : (
                <X className="h-4 w-4 text-white" />
              )}
            </div>
            <div className="ml-3">
              <p className={`font-medium ${
                coverageResult.covered ? 'text-green-800' : 'text-red-800'
              }`}>
                {coverageResult.covered
                  ? 'Good news! Your address is covered.'
                  : "Sorry, we don't currently cover your area."
                }
              </p>
              <p className={`text-sm mt-1 ${
                coverageResult.covered ? 'text-green-600' : 'text-red-600'
              }`}>
                {coverageResult.address}
              </p>
              {!coverageResult.covered && (
                <button className="mt-2 text-sm text-red-700 underline hover:text-red-800">
                  Address not listed? Click here to register your interest.
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoverageChecker;