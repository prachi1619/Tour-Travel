import React, { useState } from 'react';
import { FaComments, FaRoute, FaCalculator, FaList, FaBalanceScale, FaRuler, FaFileDownload, FaMapMarkedAlt } from 'react-icons/fa';
import Chatbot from '../components/tools/Chatbot';
import ItineraryGenerator from '../components/tools/ItineraryGenerator';
import TripCalculator from '../components/tools/TripCalculator';
import PackingChecklist from '../components/tools/PackingChecklist';
import DestinationComparison from '../components/tools/DestinationComparison';
import DistanceCalculator from '../components/tools/DistanceCalculator';
import OfflineDownloads from '../components/tools/OfflineDownloads';
import ExploreNearby from '../components/explore/ExploreNearby';

const ToolsPage = () => {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const tools = [
    {
      id: 'chat',
      name: 'AI Travel Assistant',
      icon: <FaComments className="w-6 h-6" />,
      description: 'Get instant answers to your travel questions',
      isPremium: false,
    },
    {
      id: 'itinerary',
      name: 'Itinerary Generator',
      icon: <FaRoute className="w-6 h-6" />,
      description: 'Create personalized travel itineraries',
      isPremium: false,
    },
    {
      id: 'calculator',
      name: 'Trip Calculator',
      icon: <FaCalculator className="w-6 h-6" />,
      description: 'Calculate and split trip expenses',
      isPremium: false,
    },
    {
      id: 'checklist',
      name: 'Packing Checklist',
      icon: <FaList className="w-6 h-6" />,
      description: 'Create custom packing lists',
      isPremium: false,
    },
    {
      id: 'compare',
      name: 'Compare Places',
      icon: <FaBalanceScale className="w-6 h-6" />,
      description: 'Compare destinations side by side',
      isPremium: false,
    },
    {
      id: 'distance',
      name: 'Distance Calculator',
      icon: <FaRuler className="w-6 h-6" />,
      description: 'Calculate distances and travel times',
      isPremium: false,
    },
    {
      id: 'offline',
      name: 'Offline Downloads',
      icon: <FaFileDownload className="w-6 h-6" />,
      description: 'Download guides for offline access',
      isPremium: true,
    },
    {
      id: 'nearby',
      name: 'Explore Near Me',
      icon: <FaMapMarkedAlt className="w-6 h-6" />,
      description: 'Discover attractions near your location',
      isPremium: false,
    },
  ];

  const renderToolContent = (toolId: string) => {
    switch (toolId) {
      case 'chat':
        return <Chatbot />;
      case 'itinerary':
        return <ItineraryGenerator />;
      case 'calculator':
        return <TripCalculator />;
      case 'checklist':
        return <PackingChecklist />;
      case 'compare':
        return <DestinationComparison />;
      case 'distance':
        return <DistanceCalculator />;
      case 'offline':
        return <OfflineDownloads />;
      case 'nearby':
        return <ExploreNearby />;
      default:
        return <div>Select a tool to get started</div>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Travel Tools</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tools.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedTool(tool.id)}
            className={`p-6 rounded-lg border transition-all ${
              selectedTool === tool.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center mb-4">
              <div className={`${
                selectedTool === tool.id ? 'text-blue-500' : 'text-gray-600'
              }`}>
                {tool.icon}
              </div>
              <h3 className="ml-3 font-semibold">{tool.name}</h3>
              {tool.isPremium && (
                <span className="ml-2 px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                  Premium
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">{tool.description}</p>
          </button>
        ))}
      </div>

      <div className="mt-8">
        {selectedTool && renderToolContent(selectedTool)}
      </div>
    </div>
  );
};

export default ToolsPage; 