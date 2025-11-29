import React from 'react';

const MainCard = ({ title, titleEn, icon: Icon, onClick, isActive }) => (
  <button
    onClick={onClick}
    className={`w-full p-6 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
      isActive ? 'border-blue-400 bg-blue-50 shadow-md' : 'border-gray-200 bg-white hover:border-blue-300'
    }`}
  >
    <div className="flex flex-col items-center text-center space-y-4">
      <div className={`p-4 rounded-full ${isActive ? 'bg-blue-400' : 'bg-gray-100'} transition-colors duration-300`}>
        <Icon className={`w-8 h-8 ${isActive ? 'text-white' : 'text-gray-600'}`} />
      </div>
      <div>
        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{titleEn}</p>
      </div>
    </div>
  </button>
);

export default MainCard;
