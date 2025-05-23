import React, { useState } from 'react';
import Layout from '../components/layout/Layout';
import BlogManagement from './admin/BlogManagement';
import UserManagement from './admin/UserManagement';
import DestinationManagement from './admin/DestinationManagement';
import { useAuth } from '../contexts/AuthContext';

type AdminSection = 'blogs' | 'users' | 'destinations';

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('blogs');
  const { isAdmin, isSuperAdmin } = useAuth();

  const renderSection = () => {
    switch (activeSection) {
      case 'blogs':
        return <BlogManagement />;
      case 'users':
        return <UserManagement />;
      case 'destinations':
        return <DestinationManagement />;
      default:
        return <BlogManagement />;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        {/* Admin Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveSection('blogs')}
            className={`px-4 py-2 rounded ${
              activeSection === 'blogs'
                ? 'bg-primary text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            Manage Blogs
          </button>
          
          {isAdmin() && (
            <button
              onClick={() => setActiveSection('users')}
              className={`px-4 py-2 rounded ${
                activeSection === 'users'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Manage Users
            </button>
          )}

          {isAdmin() && (
            <button
              onClick={() => setActiveSection('destinations')}
              className={`px-4 py-2 rounded ${
                activeSection === 'destinations'
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Manage Destinations
            </button>
          )}
        </div>

        {/* Admin Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          {renderSection()}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPage; 