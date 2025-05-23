import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Layout from '../components/layout/Layout';
import { FaCalendar, FaUser, FaTag } from 'react-icons/fa';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: any;
  imageUrl?: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const blogsQuery = query(
        collection(db, 'blogs'),
        where('status', '==', 'published'),
        orderBy('createdAt', 'desc')
      );
      console.log('blogsQuery', blogsQuery);
      const blogsSnapshot = await getDocs(blogsQuery);
      console.log('blogsSnapshot', blogsSnapshot);
      const blogsList = blogsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Blog[];
      console.log('blogsList', blogsList);
      setBlogs(blogsList);
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Travel Blog</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2">
                  <Link to={`/blog/${blog.id}`} className="hover:text-primary">
                    {blog.title}
                  </Link>
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  By {blog.author} • {blog.createdAt.toDate().toLocaleDateString()}
                </p>
                <p className="text-gray-700 mb-4">
                  {blog.content.substring(0, 150)}...
                </p>
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-primary hover:text-primary-dark font-semibold"
                >
                  Read More →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {blogs.length === 0 && !error && (
          <div className="text-center text-gray-600">
            <p>No blog posts available yet.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BlogPage; 