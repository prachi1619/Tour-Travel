import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import AdminLayout from '../../components/layout/AdminLayout';
import { FaUsers, FaMapMarked, FaBlog, FaComments } from 'react-icons/fa';

interface DashboardStats {
  totalUsers: number;
  totalDestinations: number;
  totalBlogs: number;
  totalReviews: number;
  recentUsers: any[];
  recentDestinations: any[];
  recentBlogs: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalDestinations: 0,
    totalBlogs: 0,
    totalReviews: 0,
    recentUsers: [],
    recentDestinations: [],
    recentBlogs: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      // Fetch total counts
      const [
        usersSnapshot,
        destinationsSnapshot,
        blogsSnapshot,
        reviewsSnapshot,
      ] = await Promise.all([
        getDocs(collection(db, 'users')),
        getDocs(collection(db, 'destinations')),
        getDocs(collection(db, 'blogs')),
        getDocs(collection(db, 'reviews')),
      ]);

      // Fetch recent items
      const recentUsersQuery = query(
        collection(db, 'users'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const recentDestinationsQuery = query(
        collection(db, 'destinations'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const recentBlogsQuery = query(
        collection(db, 'blogs'),
        orderBy('createdAt', 'desc'),
        limit(5)
      );

      const [
        recentUsersSnapshot,
        recentDestinationsSnapshot,
        recentBlogsSnapshot,
      ] = await Promise.all([
        getDocs(recentUsersQuery),
        getDocs(recentDestinationsQuery),
        getDocs(recentBlogsQuery),
      ]);

      setStats({
        totalUsers: usersSnapshot.size,
        totalDestinations: destinationsSnapshot.size,
        totalBlogs: blogsSnapshot.size,
        totalReviews: reviewsSnapshot.size,
        recentUsers: recentUsersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })),
        recentDestinations: recentDestinationsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })),
        recentBlogs: recentBlogsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })),
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded">{error}</div>
        )}

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Total Users</p>
                    <h3 className="text-3xl font-bold">{stats.totalUsers}</h3>
                  </div>
                  <FaUsers className="text-3xl text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Destinations</p>
                    <h3 className="text-3xl font-bold">{stats.totalDestinations}</h3>
                  </div>
                  <FaMapMarked className="text-3xl text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Blog Posts</p>
                    <h3 className="text-3xl font-bold">{stats.totalBlogs}</h3>
                  </div>
                  <FaBlog className="text-3xl text-purple-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500">Reviews</p>
                    <h3 className="text-3xl font-bold">{stats.totalReviews}</h3>
                  </div>
                  <FaComments className="text-3xl text-yellow-600" />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Users */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
                <div className="space-y-4">
                  {stats.recentUsers.map((user: any) => (
                    <div key={user.id} className="flex items-center gap-3">
                      <img
                        src={user.photoURL || 'https://via.placeholder.com/40'}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Destinations */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Destinations</h2>
                <div className="space-y-4">
                  {stats.recentDestinations.map((destination: any) => (
                    <div key={destination.id} className="flex items-center gap-3">
                      <img
                        src={destination.imageUrl || 'https://via.placeholder.com/40'}
                        alt={destination.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{destination.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(destination.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Blogs */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Recent Blogs</h2>
                <div className="space-y-4">
                  {stats.recentBlogs.map((blog: any) => (
                    <div key={blog.id} className="flex items-center gap-3">
                      <img
                        src={blog.imageUrl || 'https://via.placeholder.com/40'}
                        alt={blog.title}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{blog.title}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard; 