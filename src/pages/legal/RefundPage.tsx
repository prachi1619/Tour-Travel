import React from 'react';
import Layout from '../../components/layout/Layout';

const RefundPage: React.FC = () => {
  const refundPolicies = [
    {
      title: 'Flight Refunds',
      timeframe: '7-14 business days',
      details: [
        'Refund processed to original payment method',
        'Processing time varies by airline and payment type',
        'Additional time may be required for international flights',
        'Refund amount depends on fare rules and cancellation timing',
      ],
    },
    {
      title: 'Hotel Refunds',
      timeframe: '5-10 business days',
      details: [
        'Full refund for cancellations within free cancellation period',
        'Partial refund based on hotel policy after free cancellation period',
        'Security deposits refunded after check-out inspection',
        'Processing time varies by hotel and payment method',
      ],
    },
    {
      title: 'Package Refunds',
      timeframe: '10-15 business days',
      details: [
        'Refund amount based on cancellation timing',
        'Individual components may have different refund policies',
        'Administrative fees may be deducted',
        'Insurance and visa fees typically non-refundable',
      ],
    },
  ];

  const refundProcess = [
    {
      step: 1,
      title: 'Submit Request',
      description: 'Log in to your account and submit a refund request through the cancellation portal.',
    },
    {
      step: 2,
      title: 'Review',
      description: 'Our team will review your request and verify eligibility based on booking terms.',
    },
    {
      step: 3,
      title: 'Processing',
      description: 'Once approved, refund will be processed to your original payment method.',
    },
    {
      step: 4,
      title: 'Confirmation',
      description: 'You will receive an email confirmation once the refund is processed.',
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Refund Policy</h1>

        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <p className="text-gray-600">
            We strive to make our refund process as transparent and efficient as possible.
            Below you'll find detailed information about our refund policies and procedures
            for different services. Please note that processing times may vary based on your
            payment method and service provider.
          </p>
        </div>

        {/* Refund Process Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Refund Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {refundProcess.map((step) => (
              <div key={step.step} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                    {step.step}
                  </div>
                  <h3 className="text-lg font-semibold ml-3">{step.title}</h3>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Refund Policies */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Service-Specific Policies</h2>
          <div className="space-y-6">
            {refundPolicies.map((policy, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{policy.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                    {policy.timeframe}
                  </span>
                </div>
                <ul className="space-y-3">
                  {policy.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start">
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
                      <span className="text-gray-600">{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ and Support */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Common Questions</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    How long do refunds take to process?
                  </h4>
                  <p className="text-gray-600">
                    Refund processing times vary by service and payment method, typically
                    ranging from 5-15 business days.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Can I get a refund to a different payment method?
                  </h4>
                  <p className="text-gray-600">
                    Refunds are typically processed to the original payment method used for
                    booking.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    What if my refund is delayed?
                  </h4>
                  <p className="text-gray-600">
                    Contact our support team if your refund hasn't been received within the
                    expected timeframe.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Need Assistance?</h3>
              <p className="text-gray-600 mb-6">
                Our support team is available 24/7 to help you with any refund-related
                questions or concerns.
              </p>
              <div className="space-y-4">
                <button className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Check Refund Status
                </button>
                <button className="w-full border border-blue-600 text-blue-600 px-6 py-2 rounded-md hover:bg-blue-50 transition-colors">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default RefundPage; 