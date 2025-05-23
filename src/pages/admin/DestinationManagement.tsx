import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { FaEdit, FaTrash, FaSpinner } from 'react-icons/fa';
import AdminLayout from '../../components/layout/AdminLayout';

interface Destination {
  id: string;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
  price: number;
  rating: number;
  features: string[];
  category: string;
  createdAt: Timestamp;
}

const DestinationManagement = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('5');
  const [features, setFeatures] = useState('');
  const [category, setCategory] = useState('popular');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingDestination, setEditingDestination] = useState<Destination | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { currentUser } = useAuth();

  useEffect(() => {
    fetchDestinations();
  }, []);

  const fetchDestinations = async () => {
    try {
      setLoading(true);
      setError('');
      const destinationsCollection = collection(db, 'destinations');
      const destinationsSnapshot = await getDocs(destinationsCollection);
      const destinationsList = destinationsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Destination[];
      setDestinations(destinationsList.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()));
    } catch (err) {
      console.error('Error fetching destinations:', err);
      setError('Failed to fetch destinations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setLocation('');
    setImageUrl('');
    setPrice('');
    setRating('5');
    setFeatures('');
    setCategory('spiritual');
    setEditingDestination(null);
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setError('You must be logged in to manage destinations');
      return;
    }

    if (!name || !description || !location || !imageUrl || !price) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const destinationData = {
        name,
        description,
        location,
        imageUrl,
        price: Number(price),
        rating: Number(rating),
        features: features.split(',').map(f => f.trim()).filter(f => f),
        category,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
        authorId: currentUser.uid,
        authorName: currentUser.displayName || 'Anonymous'
      };

      if (editingDestination) {
        await updateDoc(doc(db, 'destinations', editingDestination.id), {
          ...destinationData,
          createdAt: editingDestination.createdAt // Preserve original creation date
        });
        setSuccess('Destination updated successfully!');
      } else {
        await addDoc(collection(db, 'destinations'), destinationData);
        setSuccess('Destination created successfully!');
      }

      resetForm();
      fetchDestinations();
    } catch (err) {
      console.error('Error saving destination:', err);
      setError(err instanceof Error ? err.message : 'Failed to save destination. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (destination: Destination) => {
    setEditingDestination(destination);
    setName(destination.name);
    setDescription(destination.description);
    setLocation(destination.location);
    setImageUrl(destination.imageUrl);
    setPrice(destination.price.toString());
    setRating(destination.rating.toString());
    setFeatures(destination.features.join(', '));
    setCategory(destination.category);
    setError('');
    setSuccess('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (destinationId: string) => {
    if (!window.confirm('Are you sure you want to delete this destination? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      await deleteDoc(doc(db, 'destinations', destinationId));
      setSuccess('Destination deleted successfully!');
      fetchDestinations();
    } catch (err) {
      console.error('Error deleting destination:', err);
      setError('Failed to delete destination. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    'spiritual',
    'historical',
    'adventure',
    'nature',
    'romantic'
  ];

  return (
    <AdminLayout>
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">
        {editingDestination ? 'Edit Destination' : 'Add New Destination'}
      </h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Location*</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Image URL*</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Price (₹)*</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
              min="0"
            />
          </div>

          <div>
            <label className="block mb-1">Rating (1-5)</label>
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              min="1"
              max="5"
              step="0.1"
            />
          </div>

          <div>
            <label className="block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1">Features (comma-separated)</label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            placeholder="WiFi, Pool, Restaurant, etc."
          />
        </div>

        <div>
          <label className="block mb-1">Description*</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 min-h-[150px]"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin mr-2" />
                {editingDestination ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              editingDestination ? 'Update Destination' : 'Add Destination'
            )}
          </button>

          {editingDestination && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">All Destinations</h3>
        {loading ? (
          <div className="text-center py-8">
            <FaSpinner className="animate-spin text-3xl text-blue-600 mx-auto" />
          </div>
        ) : destinations.length === 0 ? (
          <div className="text-center text-gray-600 py-8">
            No destinations found. Add your first destination!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destinations.map((destination) => (
              <div key={destination.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold mb-2">{destination.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{destination.location}</p>
                  <p className="text-gray-700 mb-2">₹{destination.price.toLocaleString()}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1">{destination.rating}</span>
                    </div>
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEdit(destination)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(destination.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
};

export default DestinationManagement; 