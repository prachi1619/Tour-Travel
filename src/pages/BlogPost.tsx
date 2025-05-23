import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Layout from '../components/layout/Layout';
import { FaArrowLeft, FaCalendar, FaUser } from 'react-icons/fa';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: any;
  imageUrl?: string;
}

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      if (!postId) {
        setError('Blog post not found');
        setLoading(false);
        return;
      }

      try {
        const blogDoc = await getDoc(doc(db, 'blogs', postId));
        
        if (blogDoc.exists()) {
          setBlog({
            id: blogDoc.id,
            ...blogDoc.data()
          } as BlogPost);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [postId]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }

  if (error || !blog) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">{error}</h1>
            <Link to="/blog" className="text-blue-600 hover:text-blue-800 inline-flex items-center">
              <FaArrowLeft className="mr-2" /> Back to Blog List
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link
          to="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8"
        >
          <FaArrowLeft className="mr-2" /> Back to Blog List
        </Link>

        <article className="max-w-4xl mx-auto">
          {/* Hero Image */}
          {blog.imageUrl && (
            <div className="mb-8">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Blog Header */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center text-gray-600 space-x-4">
              <div className="flex items-center">
                <FaUser className="mr-2" />
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center">
                <FaCalendar className="mr-2" />
                <span>{blog.createdAt.toDate().toLocaleDateString()}</span>
              </div>
            </div>
          </header>

          {/* Blog Content */}
          <div className="prose prose-lg max-w-none">
            {blog.content.split('\n').map((paragraph, index) => (
              paragraph ? <p key={index} className="mb-4">{paragraph}</p> : <br key={index} />
            ))}
          </div>
        </article>
      </div>
    </Layout>
  );
};

export default BlogPost; 