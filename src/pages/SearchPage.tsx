import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import Layout from '../components/layout/Layout';
import { FaSearch, FaMapMarkerAlt, FaStar } from 'react-icons/fa';

interface SearchResult {
  id: string;
  type: 'destination' | 'blog' | 'tool';
  title: string;
  description: string;
  image: string;
  rating?: number;
  location?: string;
  price?: number;
  url: string;
}

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    try {
      setLoading(true);
      setError('');

      // Search destinations
      const destinationsQuery = query(
        collection(db, 'destinations'),
        where('searchTerms', 'array-contains', searchTerm.toLowerCase())
      );
      const destinationsSnapshot = await getDocs(destinationsQuery);
      const destinations = destinationsSnapshot.docs.map(doc => ({
        id: doc.id,
        type: 'destination' as const,
        title: doc.data().name,
        description: doc.data().description,
        image: doc.data().images[0],
        rating: doc.data().rating,
        location: doc.data().location,
        price: doc.data().price,
        url: `/destination/${doc.id}`,
      }));

      // Search blog posts
      const blogQuery = query(
        collection(db, 'blog-posts'),
        where('searchTerms', 'array-contains', searchTerm.toLowerCase())
      );
      const blogSnapshot = await getDocs(blogQuery);
      const blogPosts = blogSnapshot.docs.map(doc => ({
        id: doc.id,
        type: 'blog' as const,
        title: doc.data().title,
        description: doc.data().excerpt,
        image: doc.data().coverImage,
        url: `/blog/${doc.id}`,
      }));

      // Combine results
      setResults([...destinations, ...blogPosts]);

      // Update URL with search term
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`, { replace: true });
    } catch (err) {
      console.error('Error searching:', err);
      setError('Failed to perform search');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destinations, blog posts, and more..."
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              <FaSearch />
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <a
                key={`${result.type}-${result.id}`}
                href={result.url}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <img
                  src={result.image}
                  alt={result.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <span className="px-2 py-1 bg-gray-100 rounded">
                      {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                    </span>
                    {result.type === 'destination' && (
                      <>
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt />
                          {result.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <FaStar className="text-yellow-400" />
                          {result.rating}
                        </div>
                      </>
                    )}
                  </div>

                  <h2 className="text-xl font-bold mb-2">{result.title}</h2>
                  <p className="text-gray-600 text-sm mb-4">
                    {result.description.length > 150
                      ? `${result.description.slice(0, 150)}...`
                      : result.description}
                  </p>

                  {result.type === 'destination' && result.price && (
                    <div className="text-blue-600 font-bold">
                      From ${result.price}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        ) : searchTerm && !loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No results found for "{searchTerm}"</p>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default SearchPage; 