import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import {
  FaRobot,
  FaCalculator,
  FaList,
  FaBalanceScale,
  FaRuler,
  FaFileDownload,
  FaMapMarkedAlt,
} from 'react-icons/fa';

const ToolsPage = () => {
  const { service } = useParams();
  const [activeTab, setActiveTab] = useState<string>(service || 'itinerary');

  const tools = [
    {
      id: 'itinerary',
      name: 'AI Itinerary Generator',
      icon: <FaRobot className="w-6 h-6" />,
      description: 'Create personalized travel itineraries using AI',
      isPremium: true,
    },
    {
      id: 'calculator',
      name: 'Trip Cost Calculator',
      icon: <FaCalculator className="w-6 h-6" />,
      description: 'Estimate your trip expenses based on your preferences',
      isPremium: false,
    },
    {
      id: 'checklist',
      name: 'Packing Checklist',
      icon: <FaList className="w-6 h-6" />,
      description: 'Generate a customized packing list for your trip',
      isPremium: false,
    },
    {
      id: 'compare',
      name: 'Compare Destinations',
      icon: <FaBalanceScale className="w-6 h-6" />,
      description: 'Compare different destinations side by side',
      isPremium: false,
    },
    {
      id: 'distance',
      name: 'Distance Calculator',
      icon: <FaRuler className="w-6 h-6" />,
      description: 'Calculate distances and travel times between places',
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
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Travel Tools</h1>

        {/* Tools Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setActiveTab(tool.id)}
              className={`relative p-4 rounded-lg text-center transition-all ${
                activeTab === tool.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center">
                {tool.icon}
                <span className="mt-2 text-sm font-medium">{tool.name}</span>
                {tool.isPremium && (
                  <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded-full">
                    Premium
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Tool Content */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {renderToolContent(activeTab)}
        </div>
      </div>
    </Layout>
  );
};

// Tool Components
const ItineraryGenerator = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">AI Itinerary Generator</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Destination</label>
            <input
              type="text"
              placeholder="Where do you want to go?"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Duration</label>
            <input
              type="number"
              placeholder="Number of days"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Travel Style</label>
            <select className="w-full p-2 border rounded">
              <option>Relaxed</option>
              <option>Moderate</option>
              <option>Intensive</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Interests</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Historical Sites
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Nature
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Food & Culture
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" /> Adventure
              </label>
            </div>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Generate Itinerary
          </button>
        </form>
      </div>
      <div className="bg-gray-50 p-4 rounded">
        <h3 className="font-bold mb-4">Sample Itinerary</h3>
        <p className="text-gray-600">
          Your personalized itinerary will appear here after generation.
        </p>
      </div>
    </div>
  </div>
);

const TripCalculator = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Trip Cost Calculator</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <form className="space-y-4">
          <div>
            <label className="block mb-2">Destination</label>
            <input
              type="text"
              placeholder="Where are you going?"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Duration</label>
            <input
              type="number"
              placeholder="Number of days"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">Travel Style</label>
            <select className="w-full p-2 border rounded">
              <option>Budget</option>
              <option>Mid-range</option>
              <option>Luxury</option>
            </select>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Calculate Cost
          </button>
        </form>
      </div>
      <div className="bg-gray-50 p-4 rounded">
        <h3 className="font-bold mb-4">Estimated Costs</h3>
        <div className="space-y-2">
          <p>Accommodation: ₹0</p>
          <p>Transportation: ₹0</p>
          <p>Food & Drinks: ₹0</p>
          <p>Activities: ₹0</p>
          <p>Miscellaneous: ₹0</p>
          <div className="border-t pt-2 mt-4">
            <p className="font-bold">Total: ₹0</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PackingChecklist = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Packing Checklist</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <h3 className="font-bold mb-4">Essentials</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Passport/ID
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Money/Cards
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Phone & Charger
          </label>
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-4">Clothing</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> T-shirts
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Pants/Shorts
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Undergarments
          </label>
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-4">Toiletries</h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Toothbrush & Paste
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Shampoo
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Sunscreen
          </label>
        </div>
      </div>
    </div>
  </div>
);

const DestinationComparison = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Compare Destinations</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="font-bold mb-4">Destination 1</h3>
        <input
          type="text"
          placeholder="Enter destination"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="bg-gray-50 p-4 rounded">
          <p>Details will appear here</p>
        </div>
      </div>
      <div>
        <h3 className="font-bold mb-4">Destination 2</h3>
        <input
          type="text"
          placeholder="Enter destination"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="bg-gray-50 p-4 rounded">
          <p>Details will appear here</p>
        </div>
      </div>
    </div>
  </div>
);

const DistanceCalculator = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Distance Calculator</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <form className="space-y-4">
          <div>
            <label className="block mb-2">From</label>
            <input
              type="text"
              placeholder="Starting point"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">To</label>
            <input
              type="text"
              placeholder="Destination"
              className="w-full p-2 border rounded"
            />
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Calculate
          </button>
        </form>
      </div>
      <div className="bg-gray-50 p-4 rounded">
        <h3 className="font-bold mb-4">Results</h3>
        <div className="space-y-2">
          <p>Distance: -- km</p>
          <p>Driving time: -- hours</p>
          <p>Train time: -- hours</p>
          <p>Flight time: -- hours</p>
        </div>
      </div>
    </div>
  </div>
);

const OfflineDownloads = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Offline Downloads</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-50 p-4 rounded">
        <h3 className="font-bold mb-4">City Guides</h3>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Download
        </button>
      </div>
      <div className="bg-gray-50 p-4 rounded">
        <h3 className="font-bold mb-4">Maps</h3>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Download
        </button>
      </div>
      <div className="bg-gray-50 p-4 rounded">
        <h3 className="font-bold mb-4">Phrasebooks</h3>
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Download
        </button>
      </div>
    </div>
  </div>
);

const ExploreNearby = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold">Explore Near Me</h2>
    <div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Use My Location
      </button>
      <div className="mt-4 h-[400px] bg-gray-100 rounded flex items-center justify-center">
        <p>Map will appear here</p>
      </div>
    </div>
  </div>
);

export default ToolsPage; 