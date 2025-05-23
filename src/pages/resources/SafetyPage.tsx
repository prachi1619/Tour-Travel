import React from 'react';
import Layout from '../../components/layout/Layout';

const SafetyPage: React.FC = () => {
  const safetyTips = [
    {
      category: 'Before You Travel',
      tips: [
        'Research your destination thoroughly',
        'Get appropriate travel insurance',
        'Keep copies of important documents',
        'Register with your embassy',
        'Check travel advisories',
      ],
    },
    {
      category: 'Personal Safety',
      tips: [
        'Stay aware of your surroundings',
        'Keep valuables secure',
        'Use ATMs inside banks',
        'Avoid walking alone at night',
        'Trust your instincts',
      ],
    },
    {
      category: 'Health Safety',
      tips: [
        'Get necessary vaccinations',
        'Carry basic medical supplies',
        'Know emergency numbers',
        'Check food and water safety',
        'Stay hydrated',
      ],
    },
  ];

  const emergencyContacts = [
    {
      country: 'United States',
      police: '911',
      ambulance: '911',
      embassy: '+1-202-555-0123',
    },
    {
      country: 'United Kingdom',
      police: '999',
      ambulance: '999',
      embassy: '+44-20-555-0123',
    },
    {
      country: 'Australia',
      police: '000',
      ambulance: '000',
      embassy: '+61-2-555-0123',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Travel Safety Guide</h1>

        {/* Hero Section */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">Your Safety is Our Priority</h2>
            <p className="text-gray-600 mb-6">
              Stay informed and prepared with our comprehensive travel safety guide.
              Learn essential tips and best practices for a secure travel experience.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Download Safety Guide
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors">
                Emergency Contacts
              </button>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Essential Safety Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {safetyTips.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{section.category}</h3>
                <ul className="space-y-3">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start">
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
                      <span className="text-gray-600">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contacts */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Emergency Contacts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{contact.country}</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="text-gray-600">Police: {contact.police}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                    <span className="text-gray-600">Ambulance: {contact.ambulance}</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="text-gray-600">Embassy: {contact.embassy}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Resources */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Travel Insurance</h3>
              <p className="text-gray-600 mb-4">
                Learn about travel insurance options and why they're essential for your safety.
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Learn More →
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Health Guidelines</h3>
              <p className="text-gray-600 mb-4">
                Access up-to-date health and safety guidelines for different destinations.
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View Guidelines →
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Safety Updates</h3>
              <p className="text-gray-600 mb-4">
                Stay informed with real-time safety updates and travel advisories.
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Check Updates →
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SafetyPage; 