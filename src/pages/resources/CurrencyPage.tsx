import React from 'react';
import Layout from '../../components/layout/Layout';

const CurrencyPage: React.FC = () => {
  const popularCurrencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1 },
    { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.85 },
    { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.73 },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 110.25 },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', rate: 1.35 },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', rate: 1.25 },
  ];

  const currencyTips = [
    {
      title: 'Exchange Rate Tips',
      tips: [
        'Compare rates from different providers',
        'Avoid airport currency exchanges',
        'Use bank cards for better rates',
        'Inform your bank about travel plans',
        'Keep some local currency for emergencies',
      ],
    },
    {
      title: 'Money Safety',
      tips: [
        'Use ATMs inside banks',
        'Keep money in multiple places',
        'Watch for counterfeit bills',
        'Use money belts in crowded areas',
        'Keep small bills handy',
      ],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Currency Converter & Guide</h1>

        {/* Currency Converter */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-6">Currency Converter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Currency
              </label>
              <div className="flex gap-4">
                <select className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  {popularCurrencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  className="w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Amount"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Currency
              </label>
              <div className="flex gap-4">
                <select className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                  {popularCurrencies.map((currency) => (
                    <option key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </option>
                  ))}
                </select>
                <div className="w-32 py-2 px-3 bg-gray-50 rounded-md border border-gray-300 text-gray-700">
                  Result
                </div>
              </div>
            </div>
          </div>
          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
            Convert
          </button>
        </section>

        {/* Popular Exchange Rates */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Popular Exchange Rates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCurrencies.map((currency) => (
              <div
                key={currency.code}
                className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{currency.name}</h3>
                  <p className="text-gray-600">{currency.code}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{currency.symbol}</p>
                  <p className="text-gray-600">1 USD = {currency.rate}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Currency Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Currency Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currencyTips.map((section, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
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

        {/* Additional Resources */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Historical Rates</h3>
              <p className="text-gray-600 mb-4">
                View historical exchange rates and track currency trends over time.
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View History →
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Rate Alerts</h3>
              <p className="text-gray-600 mb-4">
                Set up alerts for your preferred exchange rates and get notified.
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Set Alerts →
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Currency Guide</h3>
              <p className="text-gray-600 mb-4">
                Learn about different currencies and their usage in various countries.
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Read Guide →
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CurrencyPage; 