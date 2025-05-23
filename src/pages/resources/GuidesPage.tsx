import React from 'react';
import Layout from '../../components/layout/Layout';

const GuidesPage: React.FC = () => {
  const guides = [
    {
      id: 1,
      title: 'First-Time Traveler\'s Guide',
      description: 'Essential tips and tricks for those new to international travel',
      categories: ['Basics', 'Planning'],
      readTime: '10 min read',
    },
    {
      id: 2,
      title: 'Budget Travel Tips',
      description: 'How to make the most of your travel budget without compromising on experiences',
      categories: ['Budget', 'Tips'],
      readTime: '8 min read',
    },
    {
      id: 3,
      title: 'Solo Travel Safety Guide',
      description: 'Stay safe and confident while traveling alone with these essential tips',
      categories: ['Safety', 'Solo Travel'],
      readTime: '12 min read',
    },
    {
      id: 4,
      title: 'Packing Essentials',
      description: 'A comprehensive packing guide for different types of trips',
      categories: ['Planning', 'Tips'],
      readTime: '7 min read',
    },
    {
      id: 5,
      title: 'Food Travel Guide',
      description: 'Explore local cuisines and food safety tips while traveling',
      categories: ['Food', 'Culture'],
      readTime: '15 min read',
    },
    {
      id: 6,
      title: 'Photography Tips',
      description: 'Capture your travel memories like a pro with these photography tips',
      categories: ['Photography', 'Tips'],
      readTime: '9 min read',
    },
  ];

  const categories = [
    'All',
    'Basics',
    'Planning',
    'Budget',
    'Safety',
    'Food',
    'Culture',
    'Photography',
    'Tips',
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Travel Guides</h1>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search guides..."
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

        {/* Featured Guide */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <div className="max-w-3xl">
            <span className="text-blue-600 font-semibold mb-2 block">Featured Guide</span>
            <h2 className="text-2xl font-semibold mb-4">Ultimate Travel Planning Guide 2024</h2>
            <p className="text-gray-600 mb-6">
              A comprehensive guide to planning your perfect trip, from choosing destinations
              to creating itineraries and managing your budget.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Read Guide
            </button>
          </div>
        </div>

        {/* Guide Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-gray-200">
                {/* Guide image will be added here */}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{guide.title}</h3>
                <p className="text-gray-600 mb-4">{guide.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.categories.map((category, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {category}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{guide.readTime}</span>
                  <button className="text-blue-600 hover:text-blue-800 font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter to receive the latest travel guides and tips directly
              in your inbox.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow md:max-w-md rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GuidesPage; 