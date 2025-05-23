import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import { ForumThread } from '../types/social';
import Layout from '../components/layout/Layout';
import { FaComments, FaEye, FaThumbsUp, FaTags } from 'react-icons/fa';

const CATEGORIES = [
  'General Discussion',
  'Travel Tips',
  'Destinations',
  'Safety',
  'Budget Travel',
  'Solo Travel',
  'Family Travel',
  'Adventure',
  'Food & Culture',
];

const ForumPage = () => {
  const { currentUser } = useAuth();
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [showNewThread, setShowNewThread] = useState(false);
  const [newThread, setNewThread] = useState({
    title: '',
    content: '',
    category: CATEGORIES[0],
    tags: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      const q = query(
        collection(db, 'forum-threads'),
        orderBy('lastReplyAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedThreads = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as ForumThread[];
      setThreads(fetchedThreads);
    } catch (err) {
      console.error('Error fetching threads:', err);
      setError('Failed to load forum threads');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setLoading(true);
      setError('');

      const thread = {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        userPhoto: currentUser.photoURL || '',
        title: newThread.title,
        content: newThread.content,
        category: newThread.category,
        tags: newThread.tags,
        views: 0,
        likes: 0,
        replies: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        lastReplyAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'forum-threads'), thread);
      await fetchThreads();

      // Reset form
      setNewThread({
        title: '',
        content: '',
        category: CATEGORIES[0],
        tags: [],
      });
      setShowNewThread(false);
    } catch (err) {
      console.error('Error creating thread:', err);
      setError('Failed to create thread');
    } finally {
      setLoading(false);
    }
  };

  const filteredThreads = selectedCategory === 'all'
    ? threads
    : threads.filter(thread => thread.category === selectedCategory);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Travel Forum</h1>
          {currentUser && (
            <button
              onClick={() => setShowNewThread(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Start New Discussion
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* New Thread Form */}
        {showNewThread && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
              <h2 className="text-2xl font-bold mb-4">Start New Discussion</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block mb-2">Title</label>
                  <input
                    type="text"
                    value={newThread.title}
                    onChange={(e) => setNewThread({ ...newThread, title: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Category</label>
                  <select
                    value={newThread.category}
                    onChange={(e) => setNewThread({ ...newThread, category: e.target.value })}
                    className="w-full p-2 border rounded"
                  >
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Content</label>
                  <textarea
                    value={newThread.content}
                    onChange={(e) => setNewThread({ ...newThread, content: e.target.value })}
                    className="w-full p-2 border rounded resize-none"
                    rows={6}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2">Tags (comma-separated)</label>
                  <input
                    type="text"
                    value={newThread.tags.join(', ')}
                    onChange={(e) => setNewThread({
                      ...newThread,
                      tags: e.target.value.split(',').map(tag => tag.trim()).filter(Boolean)
                    })}
                    className="w-full p-2 border rounded"
                    placeholder="e.g. backpacking, europe, budget"
                  />
                </div>

                {error && (
                  <div className="mb-4 text-red-600">{error}</div>
                )}

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowNewThread(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? 'Creating...' : 'Create Thread'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Threads List */}
        <div className="space-y-4">
          {filteredThreads.map(thread => (
            <div key={thread.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start gap-4">
                <img
                  src={thread.userPhoto || 'https://via.placeholder.com/40'}
                  alt={thread.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{thread.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                    <span>{thread.userName}</span>
                    <span>•</span>
                    <span>{new Date(thread.createdAt).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{thread.category}</span>
                  </div>
                  <p className="text-gray-700 mb-4">{thread.content}</p>
                  
                  {thread.tags.length > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <FaTags className="text-gray-400" />
                      {thread.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-sm rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-6 text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaComments />
                      <span>{thread.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaEye />
                      <span>{thread.views} views</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaThumbsUp />
                      <span>{thread.likes} likes</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ForumPage; 