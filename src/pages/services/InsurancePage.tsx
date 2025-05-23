import React from 'react';
import Layout from '../../components/layout/Layout';

const InsurancePage: React.FC = () => {
  const insurancePlans = [
    {
      id: 1,
      name: 'Basic Plan',
      price: '₹499',
      duration: 'per person / trip',
      features: [
        'Medical expenses up to ₹2,00,000',
        'Lost baggage coverage up to ₹25,000',
        'Trip cancellation coverage',
        'Basic emergency assistance',
      ],
    },
    {
      id: 2,
      name: 'Premium Plan',
      price: '₹999',
      duration: 'per person / trip',
      features: [
        'Medical expenses up to ₹5,00,000',
        'Lost baggage coverage up to ₹50,000',
        'Trip cancellation & interruption coverage',
        '24/7 emergency assistance',
        'Adventure sports coverage',
      ],
      recommended: true,
    },
    {
      id: 3,
      name: 'Ultimate Plan',
      price: '₹1,999',
      duration: 'per person / trip',
      features: [
        'Medical expenses up to ₹10,00,000',
        'Lost baggage coverage up to ₹1,00,000',
        'Comprehensive trip protection',
        'Premium emergency assistance',
        'Adventure sports coverage',
        'Multi-trip coverage',
      ],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Travel Insurance</h1>

        {/* Hero Section */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">Protect Your Journey</h2>
            <p className="text-gray-600 mb-6">
              Travel with confidence knowing you're protected against unexpected events.
              Our travel insurance plans offer comprehensive coverage for your peace of mind.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Get a Quote
              </button>
              <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Insurance Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {insurancePlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-md p-6 ${
                plan.recommended ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              {plan.recommended && (
                <div className="text-blue-600 text-sm font-semibold mb-2">Recommended</div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">{plan.price}</span>
                <span className="text-gray-600 text-sm"> {plan.duration}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, index) => (
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
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-2 rounded-md transition-colors ${
                  plan.recommended
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'border border-blue-600 text-blue-600 hover:bg-blue-50'
                }`}
              >
                Choose Plan
              </button>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Why Choose Our Insurance</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Trusted Provider</h4>
                  <p className="text-gray-600">Backed by leading insurance companies with proven track record</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Quick Claims</h4>
                  <p className="text-gray-600">Fast and hassle-free claims process with minimal documentation</p>
                </div>
              </li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Our insurance experts are here to help you choose the right plan for your journey.
            </p>
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-600">Call us at: 1800-123-4567</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">Email: insurance@travel.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InsurancePage; 