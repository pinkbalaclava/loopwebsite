import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  question: string;
  answer: string;
}

const FAQ: React.FC<FAQProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 pl-8 pr-8 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="pb-4 pl-8 pr-8">
          <p className="text-gray-700 leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQ;