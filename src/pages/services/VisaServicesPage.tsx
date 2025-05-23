import React from 'react';
import Layout from '../../components/layout/Layout';

const VisaServicesPage: React.FC = () => {
  const visaTypes = [
    {
      id: 1,
      name: 'Tourist Visa',
      description: 'For leisure travel and tourism purposes',
      processingTime: '5-7 working days',
      requirements: [
        'Valid passport',
        'Travel itinerary',
        'Hotel bookings',
        'Bank statements',
        'Photographs',
      ],
    },
    {
      id: 2,
      name: 'Business Visa',
      description: 'For business meetings and conferences',
      processingTime: '3-5 working days',
      requirements: [
        'Valid passport',
        'Business invitation letter',
        'Company documents',
        'Bank statements',
        'Photographs',
      ],
    },
    {
      id: 3,
      name: 'Student Visa',
      description: 'For educational purposes and study abroad',
      processingTime: '7-10 working days',
      requirements: [
        'Valid passport',
        'Admission letter',
        'Financial documents',
        'Academic records',
        'Photographs',
      ],
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Visa Services</h1>

        {/* Hero Section */}
        <div className="bg-blue-50 rounded-lg p-8 mb-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-semibold mb-4">Hassle-free Visa Processing</h2>
            <p className="text-gray-600 mb-6">
              Let our experts handle your visa application process. We provide end-to-end
              assistance for various types of visas with guaranteed satisfaction.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
              Start Application
            </button>
          </div>
        </div>

        {/* Visa Types */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Types of Visas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visaTypes.map((visa) => (
              <div key={visa.id} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-3">{visa.name}</h3>
                <p className="text-gray-600 mb-4">{visa.description}</p>
                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700">Processing Time:</span>
                  <span className="text-sm text-gray-600 ml-2">{visa.processingTime}</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Requirements:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {visa.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: 1,
                title: 'Submit Documents',
                description: 'Fill the application form and submit required documents',
              },
              {
                step: 2,
                title: 'Document Review',
                description: 'Our experts review your application and documents',
              },
              {
                step: 3,
                title: 'Application Processing',
                description: 'We process your visa application with the embassy',
              },
              {
                step: 4,
                title: 'Visa Delivery',
                description: 'Receive your visa and travel documents',
              },
            ].map((step) => (
              <div key={step.step} className="bg-white rounded-lg shadow-sm p-6">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mb-4">
                  {step.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Services */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Document Translation</h3>
              <p className="text-gray-600">Professional translation services for your visa documents</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Express Processing</h3>
              <p className="text-gray-600">Fast-track visa processing for urgent requirements</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-2">Application Review</h3>
              <p className="text-gray-600">Expert review of your visa application before submission</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default VisaServicesPage; 