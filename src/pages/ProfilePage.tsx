import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import { UserProfile, Review, ForumThread, QA } from '../types/social';
import { FaStar, FaCamera, FaComment, FaTrophy, FaMedal, FaUserFriends } from 'react-icons/fa';

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { currentUser } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [questions, setQuestions] = useState<QA[]>([]);
  const [topContributors, setTopContributors] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log(userId,'userId');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const targetUserId = userId || currentUser?.uid;
        console.log(targetUserId,'targetUserId');
        if (!targetUserId) return;
console.log('i am here')
        const userDoc = await getDoc(doc(db, 'users', targetUserId));
        console.log(userDoc,'userDoc');
        // debugger;
        if (userDoc.exists()) {
          setProfile({ id: userDoc.id, ...userDoc.data() } as UserProfile);
        }

        // Fetch user's reviews
        const reviewsQuery = query(
          collection(db, 'reviews'),
          where('userId', '==', targetUserId),
          orderBy('createdAt', 'desc')
        );
        console.log(reviewsQuery,'reviewsQuery');
        const reviewsSnap = await getDocs(reviewsQuery);
        console.log(reviewsSnap,'reviewsSnap'); 
        setReviews(reviewsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Review[]);

        // Fetch user's forum threads
        const threadsQuery = query(
          collection(db, 'forum-threads'),
          where('userId', '==', targetUserId),
          orderBy('createdAt', 'desc')
        );
        const threadsSnap = await getDocs(threadsQuery);
        setThreads(threadsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as ForumThread[]);

        // Fetch user's questions
        const questionsQuery = query(
          collection(db, 'destination-qa'),
          where('userId', '==', targetUserId),
          orderBy('createdAt', 'desc')
        );
        const questionsSnap = await getDocs(questionsQuery);
        setQuestions(questionsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })) as QA[]);

        // Fetch top contributors
        const topUsersQuery = query(
          collection(db, 'users'),
          orderBy('points', 'desc'),
          limit(10)
        );
        const topUsersSnap = await getDocs(topUsersQuery);
        setTopContributors(topUsersSnap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as UserProfile[]);

      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, currentUser]);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      </Layout>
    );
  }
console.log(profile,'profile')  
  if (!profile) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error || 'Profile not found'}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Profile Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center gap-6">
                <img
                  src={profile.photoURL || 'https://via.placeholder.com/128'}
                  alt={profile.name}
                  className="w-32 h-32 rounded-full"
                />
                <div>
                  <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                  <p className="text-gray-600 mb-2">{profile.location}</p>
                  <p className="text-gray-600">Joined {new Date(profile.joinedDate).toLocaleDateString()}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center gap-1">
                      <FaUserFriends />
                      <span>{profile && profile?.followers && profile?.followers?.length} followers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaTrophy />
                      <span>{profile.points} points</span>
                    </div>
                  </div>
                </div>
              </div>

              {profile.bio && (
                <p className="mt-6 text-gray-700">{profile.bio}</p>
              )}
            </div>

            {/* Badges */}
            {profile && profile.badges && profile.badges.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4">Badges</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {profile.badges.map(badge => (
                    <div
                      key={badge.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50"
                    >
                      <div className={`text-2xl ${
                        badge.level === 'gold' ? 'text-yellow-500' :
                        badge.level === 'silver' ? 'text-gray-400' :
                        badge.level === 'bronze' ? 'text-orange-600' :
                        'text-purple-600'
                      }`}>
                        <FaMedal />
                      </div>
                      <div>
                        <div className="font-medium">{badge.name}</div>
                        <div className="text-sm text-gray-600">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contributions */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Contributions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {profile && profile.contributions && profile.contributions.reviews}
                  </div>
                  <div className="text-gray-600">Reviews</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {profile && profile.contributions && profile.contributions.photos}
                  </div>
                  <div className="text-gray-600">Photos</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">
                    {profile && profile.contributions && profile.contributions.answers}
                  </div>
                  <div className="text-gray-600">Answers</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">
                    {profile && profile.contributions && profile.contributions.forumPosts}
                  </div>
                  <div className="text-gray-600">Forum Posts</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-6">
                {reviews.slice(0, 3).map(review => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaStar className="text-yellow-400" />
                      <span>Reviewed a destination</span>
                      <span className="text-gray-600">
                        • {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.content}</p>
                  </div>
                ))}

                {threads.slice(0, 3).map(thread => (
                  <div key={thread.id} className="border-b pb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FaComment className="text-blue-600" />
                      <span>Started a discussion</span>
                      <span className="text-gray-600">
                        • {new Date(thread.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-medium">{thread.title}</h3>
                    <p className="text-gray-700">{thread.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Leaderboard */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Top Contributors</h2>
              <div className="space-y-4">
                {topContributors.map((user, index) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-4 p-2 rounded hover:bg-gray-50"
                  >
                    <div className="w-8 text-center font-bold">
                      {index + 1}
                    </div>
                    <img
                      src={user.photoURL || 'https://via.placeholder.com/32'}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.points} points</div>
                    </div>
                    {index < 3 && (
                      <FaTrophy className={
                        index === 0 ? 'text-yellow-500' :
                        index === 1 ? 'text-gray-400' :
                        'text-orange-600'
                      } />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage; 