import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import AdminLayout from '../../components/layout/AdminLayout';

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  authorId: string;
  createdAt: Timestamp;
  imageUrl?: string;
  status: 'draft' | 'published';
}

const BlogManagement = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const blogsCollection = collection(db, 'blogs');
      const blogsSnapshot = await getDocs(blogsCollection);
      const blogsList = blogsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Blog[];
      setBlogs(blogsList.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));
    } catch (err) {
      console.error('Error fetching blogs:', err);
      setError('Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const blogData = {
        title: title.trim(),
        content: content.trim(),
        author: currentUser.displayName || 'Anonymous',
        authorId: currentUser.uid,
        imageUrl: imageUrl.trim() || null,
        status: 'draft' as const,
        createdAt: Timestamp.now(),
      };

      if (editingBlog) {
        await updateDoc(doc(db, 'blogs', editingBlog.id), blogData);
        setSuccess('Blog updated successfully!');
      } else {
        await addDoc(collection(db, 'blogs'), blogData);
        setSuccess('Blog created successfully!');
      }

      // Reset form
      setTitle('');
      setContent('');
      setImageUrl('');
      setEditingBlog(null);
      await fetchBlogs();
    } catch (err) {
      console.error('Error saving blog:', err);
      setError('Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setContent(blog.content);
    setImageUrl(blog.imageUrl || '');
    window.scrollTo(0, 0);
  };

  const handleDelete = async (blogId: string) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      setLoading(true);
      await deleteDoc(doc(db, 'blogs', blogId));
      setSuccess('Blog deleted successfully!');
      await fetchBlogs();
    } catch (err) {
      console.error('Error deleting blog:', err);
      setError('Failed to delete blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Blog Management</h1>
        </div>

        {/* Blog Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingBlog ? 'Edit Blog' : 'Create New Blog'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded min-h-[200px]"
                required
              />
            </div>

            <div>
              <label className="block mb-2">Image URL (optional)</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {error && (
              <div className="text-red-600 bg-red-50 p-4 rounded">{error}</div>
            )}

            {success && (
              <div className="text-green-600 bg-green-50 p-4 rounded">{success}</div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <FaSpinner className="animate-spin" />
                    Saving...
                  </span>
                ) : (
                  editingBlog ? 'Update Blog' : 'Create Blog'
                )}
              </button>
              {editingBlog && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingBlog(null);
                    setTitle('');
                    setContent('');
                    setImageUrl('');
                  }}
                  className="px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Blogs List */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">All Blogs</h2>
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="border-b last:border-b-0 pb-4 last:pb-0"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{blog.title}</h3>
                      <p className="text-sm text-gray-600">
                        By {blog.author} • {blog.createdAt.toDate().toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {blogs.length === 0 && !loading && (
                <p className="text-gray-600 text-center py-4">No blogs found</p>
              )}

              {loading && (
                <div className="flex justify-center py-4">
                  <FaSpinner className="animate-spin text-blue-600 text-2xl" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogManagement; 