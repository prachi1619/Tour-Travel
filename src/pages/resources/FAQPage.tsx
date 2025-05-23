import React from 'react';
import Layout from '../../components/layout/Layout';

const FAQPage: React.FC = () => {
  const faqs = [
    {
      category: 'Booking',
      questions: [
        {
          id: 1,
          question: 'How do I book a flight?',
          answer:
            'You can book a flight by using our flight search tool, selecting your preferred dates and destinations, and following the booking process. We offer competitive rates and multiple airline options.',
        },
        {
          id: 2,
          question: 'Can I modify my booking?',
          answer:
            'Yes, you can modify your booking through your account dashboard. Some changes may incur additional charges depending on the airline or hotel policies.',
        },
        {
          id: 3,
          question: 'What payment methods do you accept?',
          answer:
            'We accept all major credit cards, debit cards, net banking, and popular digital wallets. All payments are processed securely.',
        },
      ],
    },
    {
      category: 'Cancellation & Refunds',
      questions: [
        {
          id: 4,
          question: 'What is your cancellation policy?',
          answer:
            'Our cancellation policy varies depending on the service and provider. You can find specific details during the booking process or in your confirmation email.',
        },
        {
          id: 5,
          question: 'How long does it take to process refunds?',
          answer:
            'Refunds typically take 5-7 business days to process, depending on your payment method and bank. Some airlines may take longer to process refunds.',
        },
      ],
    },
    {
      category: 'Travel Insurance',
      questions: [
        {
          id: 6,
          question: 'Do I need travel insurance?',
          answer:
            'While not mandatory, we strongly recommend travel insurance to protect against unexpected events, medical emergencies, and trip cancellations.',
        },
        {
          id: 7,
          question: 'What does travel insurance cover?',
          answer:
            'Our travel insurance typically covers medical emergencies, trip cancellations, lost baggage, flight delays, and other travel-related incidents.',
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Frequently Asked Questions</h1>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search FAQs..."
              className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {faqs.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">{category.category}</h2>
              <div className="space-y-6">
                {category.questions.map((faq) => (
                  <div key={faq.id}>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-blue-50 rounded-lg p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-4">Still Have Questions?</h2>
            <p className="text-gray-600 mb-6">
              Our support team is here to help. Contact us through any of these channels:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6">
                <svg
                  className="w-8 h-8 text-blue-600 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="font-semibold mb-2">Email Support</h3>
                <p className="text-gray-600">support@travel.com</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <svg
                  className="w-8 h-8 text-blue-600 mx-auto mb-4"
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
                <h3 className="font-semibold mb-2">Phone Support</h3>
                <p className="text-gray-600">1-800-123-4567</p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <svg
                  className="w-8 h-8 text-blue-600 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600">Available 24/7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FAQPage; 