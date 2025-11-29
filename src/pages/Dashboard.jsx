import React, { useState } from 'react';
import { CheckCircle, Eye, ArrowLeft, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import MainCard from '../components/MainCard';
import BGTypeSelector from '../components/BGTypeSelector';
import ProductionLineSelector from '../components/ProductionLineSelector';

const Dashboard = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [selectedBGType, setSelectedBGType] = useState(null);
  const [viewStep, setViewStep] = useState('initial');

  const handleCardClick = (cardId) => {
    if (cardId === 'check-bg') {
      alert('Navigation to Page1 - Check BG (to implement)');
    } else if (cardId === 'view') {
      setActiveCard(cardId);
      setViewStep('bgType');
    }
  };

  const handleCloseSecondary = () => {
    setActiveCard(null);
    setSelectedBGType(null);
    setViewStep('initial');
  };

  const handleBGTypeSelect = (bgType) => {
    setSelectedBGType(bgType);
    setViewStep('productionLine');
  };

  const handleBackToBGType = () => {
    setSelectedBGType(null);
    setViewStep('bgType');
  };

  const handleProductionLineSelect = (line) => {
    alert(`Ausgew�hlt / Selected:\nBG-Typ / BG Type: ${selectedBGType}\nLinie / Line: ${line}`);
  };

  const mainOptions = [
    { id: 'check-bg', title: 'BG pr�fen', titleEn: 'Check BG', icon: CheckCircle },
    { id: 'view', title: 'Anzeigen', titleEn: 'View', icon: Eye },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Willkommen / Welcome</h1>
          <p className="text-gray-600">W�hlen Sie eine Option / Select an option</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {mainOptions.map((option) => (
            <MainCard
              key={option.id}
              title={option.title}
              titleEn={option.titleEn}
              icon={option.icon}
              onClick={() => handleCardClick(option.id)}
              isActive={activeCard === option.id}
            />
          ))}
        </div>

        {activeCard === 'view' && (
          <div className="max-w-4xl mx-auto">
            <div className="animate-slideDown bg-gradient-to-br from-blue-50 to-orange-50 rounded-xl p-6 border-2 border-blue-200 shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="text-lg font-bold text-gray-800">Anzeigeoptionen</h4>
                  <p className="text-sm text-gray-600">View Options</p>
                </div>
                <button
                  onClick={handleCloseSecondary}
                  className="p-2 hover:bg-white rounded-lg transition-colors duration-200"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                {viewStep === 'bgType' && (
                  <BGTypeSelector onSelect={handleBGTypeSelect} onBack={handleCloseSecondary} />
                )}
                {viewStep === 'productionLine' && (
                  <ProductionLineSelector
                    bgType={selectedBGType}
                    onSelect={handleProductionLineSelect}
                    onBack={handleBackToBGType}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.3s ease-out; }
      `}</style>
    </div>
  );
};

export default Dashboard;
