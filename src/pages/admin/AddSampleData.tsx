import React, { useState } from 'react';
import { addSampleDestinations } from '../../utils/addSampleDestinations';
import Layout from '../../components/layout/Layout';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AddSampleData = () => {
  const { currentUser, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  if (!currentUser || !isAdmin()) {
    return <Navigate to="/login" replace />;
  }

  const handleAddSampleDestinations = async () => {
    try {
      setLoading(true);
      setMessage('');
      setError('');
      
      await addSampleDestinations();
      setMessage('Successfully added sample destinations!');
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to add sample destinations. Please check the console for details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add Sample Data</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">Sample Destinations</h2>
          <p className="text-gray-600 mb-6">
            This will add sample featured destinations to your Firebase database. 
            This action is meant to be performed only once for initial setup.
          </p>
          
          <button
            onClick={handleAddSampleDestinations}
            disabled={loading}
            className={`
              px-6 py-3 rounded-lg font-medium text-white
              ${loading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'}
              transition-colors
            `}
          >
            {loading ? 'Adding Destinations...' : 'Add Sample Destinations'}
          </button>

          {message && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AddSampleData; 