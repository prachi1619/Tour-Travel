import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useAuth } from '../../contexts/AuthContext';
import { Comment } from '../../types/social';
import { FaReply, FaThumbsUp } from 'react-icons/fa';

interface CommentThreadProps {
  entityId: string;
  entityType: 'destination' | 'blog';
}

const CommentThread: React.FC<CommentThreadProps> = ({ entityId, entityType }) => {
  const { currentUser } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchComments();
  }, [entityId, entityType]);

  const fetchComments = async () => {
    try {
      const q = query(
        collection(db, `${entityType}-comments`),
        where('entityId', '==', entityId),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const fetchedComments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(fetchedComments);
    } catch (err) {
      console.error('Error fetching comments:', err);
      setError('Failed to load comments');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newComment.trim()) return;

    try {
      setLoading(true);
      setError('');

      const comment = {
        userId: currentUser.uid,
        userName: currentUser.displayName || 'Anonymous',
        userPhoto: currentUser.photoURL || '',
        content: newComment.trim(),
        parentId: replyTo,
        entityId,
        likes: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await addDoc(collection(db, `${entityType}-comments`), comment);
      await fetchComments();

      // Reset form
      setNewComment('');
      setReplyTo(null);
    } catch (err) {
      console.error('Error submitting comment:', err);
      setError('Failed to submit comment');
    } finally {
      setLoading(false);
    }
  };

  const renderComments = (parentId: string | null = null, level: number = 0) => {
    const filteredComments = comments.filter(comment => comment.parentId === parentId);

    return filteredComments.map(comment => (
      <div
        key={comment.id}
        className={`${level > 0 ? 'ml-8 border-l pl-4' : ''}`}
      >
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center gap-4 mb-2">
            <img
              src={comment.userPhoto || 'https://via.placeholder.com/32'}
              alt={comment.userName}
              className="w-8 h-8 rounded-full"
            />
            <div>
              <div className="font-medium">{comment.userName}</div>
              <div className="text-sm text-gray-600">
                {new Date(comment.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <p className="text-gray-700">{comment.content}</p>

          <div className="mt-4 flex items-center gap-4">
            <button
              onClick={() => setReplyTo(comment.id)}
              className="flex items-center gap-1 text-gray-600 hover:text-blue-600"
            >
              <FaReply />
              Reply
            </button>
            <button className="flex items-center gap-1 text-gray-600 hover:text-blue-600">
              <FaThumbsUp />
              <span>{comment.likes}</span>
            </button>
          </div>
        </div>

        {/* Render nested comments */}
        {renderComments(comment.id, level + 1)}

        {/* Reply form */}
        {replyTo === comment.id && currentUser && (
          <form onSubmit={handleSubmit} className="ml-8 mb-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded resize-none"
              rows={2}
              placeholder="Write a reply..."
              required
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => setReplyTo(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !newComment.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Reply'}
              </button>
            </div>
          </form>
        )}
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold">Comments</h3>

      {/* Comment Form */}
      {currentUser && !replyTo && (
        <form onSubmit={handleSubmit} className="mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-4 border rounded resize-none"
            rows={3}
            placeholder="Write a comment..."
            required
          />

          {error && (
            <div className="mt-2 text-red-600">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading || !newComment.trim()}
            className="mt-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {renderComments()}
      </div>
    </div>
  );
};

export default CommentThread; 