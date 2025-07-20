import React from 'react';
import { Check, Star } from 'lucide-react';

interface PlanCardProps {
  title: string;
  speed: string;
  price: string;
  features: string[];
  bestValue?: boolean;
}

const PlanCard: React.FC<PlanCardProps> = ({ title, speed, price, features, bestValue = false }) => {
  return (
    <div className={`relative bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 ${bestValue ? 'ring-2 ring-green-500' : ''}`}>
      {bestValue && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Star className="h-4 w-4 mr-1" />
            Best Value
          </div>
        </div>
      )}
      
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <div className="mb-2">
          <span className="text-2xl font-bold text-blue-600">{speed}</span>
          <span className="text-gray-500 ml-1">download</span>
        </div>
        <div className="mb-4">
          <span className="text-3xl font-bold text-gray-900">{price}</span>
          <span className="text-gray-500">/month</span>
        </div>
      </div>

      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
        bestValue
          ? 'bg-green-500 text-white hover:bg-green-600'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}>
        Get Started
      </button>
    </div>
  );
};

export default PlanCard;