import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectorProps {
  mode: 'region' | 'development';
  options: string[];
  onSelect: (value: string) => void;
  onModeChange: (mode: 'region' | 'development') => void;
}

const Selector: React.FC<SelectorProps> = ({ mode, options, onSelect, onModeChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    onSelect(value);
    setIsOpen(false);
  };

  const handleTabChange = (newMode: 'region' | 'development') => {
    onModeChange(newMode);
    setSelectedValue('');
    setIsOpen(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <div className="flex rounded-lg bg-gray-100 p-1">
          <button
            onClick={() => handleTabChange('region')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              mode === 'region'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Region
          </button>
          <button
            onClick={() => handleTabChange('development')}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors ${
              mode === 'development'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Development
          </button>
        </div>
      </div>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-3 text-left bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <span className={selectedValue ? 'text-gray-900' : 'text-gray-500'}>
            {selectedValue || `Select ${mode === 'region' ? 'region' : 'development type'}`}
          </span>
          <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect(option)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Selector;