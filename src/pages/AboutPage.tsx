import React from 'react';
import Layout from '../components/layout/Layout';

const AboutPage: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>
        <div className="prose max-w-none">
          <p className="text-lg mb-6">
            Welcome to our travel platform, where we connect adventurers with the most amazing destinations across India.
          </p>
          {/* Add more content here */}
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage; 