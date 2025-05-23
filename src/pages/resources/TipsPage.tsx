import React from 'react';
import Layout from '../../components/layout/Layout';

const TipsPage: React.FC = () => {
  const categories = [
    'All Tips',
    'Planning',
    'Packing',
    'Safety',
    'Budget',
    'Transportation',
    'Accommodation',
    'Food',
    'Culture',
  ];

  const tips = [
    {
      id: 1,
      category: 'Planning',
      title: 'How to Plan Your First International Trip',
      description:
        'Essential steps and considerations for planning your first trip abroad.',
      tips: [
        'Research visa requirements well in advance',
        'Get travel insurance coverage',
        'Make copies of important documents',
        'Inform your bank about travel plans',
        'Check vaccination requirements',
      ],
    },
    {
      id: 2,
      category: 'Packing',
      title: 'Smart Packing Tips',
      description: 'Pack efficiently and never forget essential items.',
      tips: [
        'Make a packing checklist',
        'Roll clothes to save space',
        'Pack versatile clothing items',
        'Keep valuables in carry-on',
        'Consider destination weather',
      ],
    },
    {
      id: 3,
      category: 'Safety',
      title: 'Stay Safe While Traveling',
      description: 'Important safety tips for travelers of all experience levels.',
      tips: [
        'Research safe neighborhoods',
        'Keep emergency contacts handy',
        'Be aware of common scams',
        'Use hotel safes for valuables',
        'Share itinerary with family',
      ],
    },
    {
      id: 4,
      category: 'Budget',
      title: 'Travel on a Budget',
      description: 'Make the most of your travel budget without missing out.',
      tips: [
        'Travel during off-season',
        'Use public transportation',
        'Cook some meals yourself',
        'Look for free activities',
        'Use travel rewards programs',
      ],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Travel Tips</h1>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search tips..."
              className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-1 rounded-full text-sm ${
                  index === 0
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Tip */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <div className="max-w-3xl">
            <span className="text-blue-600 font-semibold mb-2 block">Featured Tip</span>
            <h2 className="text-2xl font-semibold mb-4">Essential Travel Safety Tips</h2>
            <p className="text-gray-600 mb-6">
              Your safety is our top priority. Learn essential tips to stay safe and secure
              during your travels, from pre-trip preparation to on-the-ground awareness.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Read More
            </button>
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tips.map((tip) => (
            <div key={tip.id} className="bg-white rounded-lg shadow-md p-6">
              <span className="text-blue-600 text-sm font-medium">{tip.category}</span>
              <h3 className="text-xl font-semibold mt-2 mb-3">{tip.title}</h3>
              <p className="text-gray-600 mb-4">{tip.description}</p>
              <ul className="space-y-2">
                {tip.tips.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-6 text-blue-600 hover:text-blue-800 font-medium">
                Read Full Guide →
              </button>
            </div>
          ))}
        </div>

        {/* Quick Tips Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Quick Tips by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Transportation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Book flights in advance for better rates</li>
                <li>• Use public transport apps for navigation</li>
                <li>• Consider rail passes for multiple cities</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Accommodation</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Read recent reviews carefully</li>
                <li>• Book refundable options when possible</li>
                <li>• Check location and nearby amenities</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Cultural Awareness</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Research local customs and etiquette</li>
                <li>• Learn basic local phrases</li>
                <li>• Respect dress codes and traditions</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default TipsPage; 