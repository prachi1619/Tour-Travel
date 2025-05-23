import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Review } from '../../types/social';
import { FaStar, FaThumbsUp, FaImage } from 'react-icons/fa';

interface ReviewSectionProps {
  destinationId: string;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ destinationId }) => {
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [destinationId]);

  const fetchReviews = async () => {
    try {
      const q = query(
        collection(db, 'reviews'),
        where('destinationId', '==', destinationId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedReviews = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Review[];
      setReviews(fetchedReviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Failed to load reviews');
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newReview.trim() || !rating) return;

    try {
      setLoading(true);
      setError('');

      // Upload photos if any
      const photoUrls: string[] = [];
      for (const photo of photos) {
        const fileRef = ref(storage, `review-photos/${destinationId}/${Date.now()}_${photo.name}`);
        await uploadBytes(fileRef, photo);
        const url = await getDownloadURL(fileRef);
        photoUrls.push(url);
      }

      const review = {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        userPhoto: currentUser.photoURL || '',
        destinationId,
        rating,
        content: newReview.trim(),
        photos: photoUrls,
        likes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, 'reviews'), review);
      await fetchReviews();

      // Reset form
      setNewReview('');
      setRating(0);
      setPhotos([]);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (reviewId: string) => {
    if (!currentUser) return;

    try {
      const reviewRef = doc(db, 'reviews', reviewId);
      const review = reviews.find(r => r.id === reviewId);
      if (review) {
        await updateDoc(reviewRef, {
          likes: review.likes + 1
        });
        await fetchReviews();
      }
    } catch (err) {
      console.error('Error liking review:', err);
    }
  };

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Reviews</h2>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            <FaStar className="text-yellow-400" />
            <span className="ml-1 font-bold">{getAverageRating()}</span>
          </div>
          <span className="text-gray-600">({reviews.length} reviews)</span>
        </div>
      </div>

      {/* Review Form */}
      {currentUser && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
          <div className="mb-4">
            <label className="block mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="text-2xl focus:outline-none"
                >
                  <FaStar
                    className={
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Your Review</label>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="w-full p-2 border rounded resize-none"
              rows={4}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Photos</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoChange}
              className="hidden"
              id="photo-upload"
            />
            <label
              htmlFor="photo-upload"
              className="flex items-center gap-2 px-4 py-2 border rounded cursor-pointer hover:bg-gray-50"
            >
              <FaImage />
              Add Photos
            </label>
            {photos.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {photos.length} photo(s) selected
              </div>
            )}
          </div>

          {error && (
            <div className="mb-4 text-red-600">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading || !rating || !newReview.trim()}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={review.userPhoto || 'https://via.placeholder.com/40'}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-medium">{review.userName}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
            </div>

            <p className="mt-4">{review.content}</p>

            {review.photos && review.photos.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2">
                {review.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Review photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded"
                  />
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => handleLike(review.id)}
                disabled={!currentUser}
                className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
              >
                <FaThumbsUp />
                <span>{review.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection; 