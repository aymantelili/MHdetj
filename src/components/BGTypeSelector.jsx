import React from 'react';
import { ArrowLeft } from 'lucide-react';

const BGTypeSelector = ({ onSelect, onBack }) => {
  const bgTypes = ['INR', 'COC', 'BASIS'];
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h5 className="font-semibold text-gray-700">Wählen Sie BG-Typ / Select BG Type</h5>
        <button onClick={onBack} className="text-sm text-gray-600 hover:text-gray-800 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Zurück / Back
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {bgTypes.map((type) => (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="p-4 bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 rounded-lg font-medium text-gray-700 transition-all duration-200 transform hover:scale-105"
          >
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BGTypeSelector;
