import React from 'react';
import Layout from '../../components/layout/Layout';

const CancellationPage: React.FC = () => {
  const cancellationPolicies = [
    {
      title: 'Flights',
      policies: [
        {
          timeframe: '24 hours after booking',
          description: 'Full refund available for most flights if cancelled within 24 hours of booking',
          conditions: ['Must be booked at least 7 days before departure', 'Applies to all fare types'],
        },
        {
          timeframe: 'More than 72 hours before departure',
          description: 'Refund available minus cancellation fee',
          conditions: ['Cancellation fee varies by fare type', 'Some fares may be non-refundable'],
        },
        {
          timeframe: 'Less than 72 hours before departure',
          description: 'Limited or no refund available',
          conditions: ['May receive partial credit for future travel', 'Subject to airline policies'],
        },
      ],
    },
    {
      title: 'Hotels',
      policies: [
        {
          timeframe: 'Free cancellation period',
          description: 'Full refund available if cancelled during free cancellation period',
          conditions: ['Period varies by property', 'Must cancel before check-in time on specified date'],
        },
        {
          timeframe: 'After free cancellation period',
          description: 'Charges may apply based on hotel policy',
          conditions: ['May be charged for first night', 'Some rates are non-refundable'],
        },
      ],
    },
    {
      title: 'Tour Packages',
      policies: [
        {
          timeframe: 'More than 30 days before departure',
          description: 'Full refund minus administrative fee',
          conditions: ['Administrative fee varies by package value', 'Some special promotions may be non-refundable'],
        },
        {
          timeframe: '15-30 days before departure',
          description: '50% refund of total package cost',
          conditions: ['Excluding insurance and visa fees', 'Subject to tour operator policies'],
        },
        {
          timeframe: 'Less than 15 days before departure',
          description: 'No refund available',
          conditions: ['May offer partial credit for future travel', 'Insurance claim may be possible'],
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Cancellation Policy</h1>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-600">
            We understand that travel plans can change. Our cancellation policies are designed
            to be fair and transparent. Please review the specific policies for each service
            below. For any questions or special circumstances, please contact our customer
            support team.
          </p>
        </div>

        {/* Cancellation Policies */}
        <div className="space-y-8">
          {cancellationPolicies.map((section, index) => (
            <section key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
              <div className="space-y-6">
                {section.policies.map((policy, policyIndex) => (
                  <div key={policyIndex} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-blue-600 mb-3">
                      {policy.timeframe}
                    </h3>
                    <p className="text-gray-600 mb-4">{policy.description}</p>
                    <ul className="space-y-2">
                      {policy.conditions.map((condition, conditionIndex) => (
                        <li key={conditionIndex} className="flex items-start">
                          <svg
                            className="w-5 h-5 text-gray-400 mr-2 mt-0.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-gray-600">{condition}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Additional Information */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Additional Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Travel Insurance</h3>
              <p className="text-gray-600 mb-4">
                We recommend purchasing travel insurance to protect against unexpected
                cancellations. Insurance may cover non-refundable expenses.
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Learn More →
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Special Circumstances</h3>
              <p className="text-gray-600 mb-4">
                Special cancellation terms may apply for circumstances like medical
                emergencies or natural disasters.
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                View Details →
              </button>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
              <p className="text-gray-600 mb-4">
                Our support team is available 24/7 to assist you with cancellations
                and answer any questions.
              </p>
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Contact Support →
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default CancellationPage; 