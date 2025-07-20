import React from 'react';
import { Wifi } from 'lucide-react';
import { Provider } from '../types';

interface ProviderCardProps extends Provider {
  onSelect: (providerId: string) => void;
  isSelected?: boolean;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ 
  id, 
  name, 
  description, 
  onSelect, 
  isSelected = false 
}) => {
  return (
    <div 
      onClick={() => onSelect(id)}
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer p-6 border-2 ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-200'
      }`}
    >
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
          <Wifi className="h-6 w-6 text-blue-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
      </div>
      
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      
      <div className="mt-4">
        <button className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
          isSelected
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}>
          {isSelected ? 'Selected' : 'Select Provider'}
        </button>
      </div>
    </div>
  );
};

export default ProviderCard;