import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { useAuth } from '../contexts/AuthContext';
import Layout from '../components/layout/Layout';
import ProfileAvatar from '../components/common/ProfileAvatar';
import { UserProfile as IUserProfile, Review, ForumThread, QA } from '../types/social';
import { FaStar, FaCamera, FaComment, FaTrophy, FaMedal, FaUserFriends, FaInbox, FaUserPlus, FaUserMinus, FaEdit, FaInstagram, FaFacebook, FaTwitter, FaGlobe } from 'react-icons/fa';
import { followUser, unfollowUser, getUserStats, updateProfilePhoto, getUserReviews, formatDate } from '../services/userService';
import ProfileEdit from '../components/profile/ProfileEdit';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { currentUser, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState<IUserProfile | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [questions, setQuestions] = useState<QA[]>([]);
  const [topContributors, setTopContributors] = useState<IUserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

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
          const userData = userDoc.data();
          setProfile({
            id: userDoc.id,
            ...userData,
            joinedDate: formatDate(userData.createdAt || userData.joinedDate)
          } as IUserProfile);

          // Fetch user's reviews
          const userReviews = await getUserReviews(targetUserId);
          setReviews(userReviews);

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
          })) as IUserProfile[]);

        }

      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, currentUser]);

  useEffect(() => {
    if (currentUser && profile) {
      setIsFollowing(profile.followers?.includes(currentUser.uid));
    }
  }, [currentUser, profile]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    try {
      setUploading(true);
      setError('');

      // Create a reference to the storage location
      const storageRef = ref(storage, `profile-photos/${currentUser.uid}/${Date.now()}_${file.name}`);
      
      // Upload the file
      await uploadBytes(storageRef, file);
      
      // Get the download URL
      const photoURL = await getDownloadURL(storageRef);

      // Update profile photo in Firestore and award points
      await updateProfilePhoto(currentUser.uid, photoURL);

      // Update local state
      setProfile(prev => prev ? { ...prev, photoURL } : null);
      
      toast.success('Profile photo updated successfully!');
    } catch (err) {
      console.error('Error uploading image:', err);
      toast.error('Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleFollow = async () => {
    if (!currentUser || !profile) return;

    setFollowLoading(true);
    try {
      if (isFollowing) {
        await unfollowUser(currentUser.uid, profile.id);
        setIsFollowing(false);
      } else {
        await followUser(currentUser.uid, profile.id);
        setIsFollowing(true);
      }
    } catch (err) {
      console.error('Error following/unfollowing:', err);
      setError('Failed to update follow status');
    } finally {
      setFollowLoading(false);
    }
  };

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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <ProfileAvatar
                    src={profile?.photoURL}
                    name={profile?.firstName}
                    size="lg"
                  />
                  {currentUser && currentUser.uid === profile?.id && (
                    <>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600 transition-colors group-hover:opacity-100 opacity-0"
                        disabled={uploading}
                      >
                        {uploading ? (
                          <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
                        ) : (
                          <FaCamera size={16} />
                        )}
                      </button>
                    </>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">{`${profile.firstName} ${profile.lastName}`}</h1>
                      <p className="text-gray-600 mb-2">{profile.location || 'No location set'}</p>
                      <p className="text-gray-600">Member since {profile.joinedDate}</p>
                    </div>
                    {currentUser && currentUser.uid === profile.id && (
                      <button
                        onClick={() => setShowEditModal(true)}
                        className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 flex items-center gap-2"
                      >
                        <FaEdit />
                        Edit Profile
                      </button>
                    )}
                    {currentUser && currentUser.uid !== profile.id && (
                      <button
                        onClick={handleFollow}
                        disabled={followLoading}
                        className={`px-4 py-2 rounded-full flex items-center gap-2 transition-colors ${
                          isFollowing
                            ? 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                            : 'bg-primary-500 hover:bg-primary-600 text-white'
                        }`}
                      >
                        {followLoading ? (
                          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        ) : isFollowing ? (
                          <>
                            <FaUserMinus size={16} />
                            Unfollow
                          </>
                        ) : (
                          <>
                            <FaUserPlus size={16} />
                            Follow
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="flex items-center gap-6 mt-4">
                    <div className="flex items-center gap-1">
                      <FaUserFriends className="text-gray-500" />
                      <div>
                        <span className="font-semibold">{profile?.followers?.length || 0}</span>
                        <span className="text-gray-600 ml-1">followers</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaUserFriends className="text-gray-500" />
                      <div>
                        <span className="font-semibold">{profile?.following?.length || 0}</span>
                        <span className="text-gray-600 ml-1">following</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaTrophy className="text-gray-500" />
                      <div>
                        <span className="font-semibold">{profile.points || 0}</span>
                        <span className="text-gray-600 ml-1">points</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {profile.bio ? (
                <p className="mt-6 text-gray-700">{profile.bio}</p>
              ) : (
                <p className="mt-6 text-gray-500 italic">No bio added yet</p>
              )}

              {/* Travel Preferences */}
              <div className="mt-6 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Travel Preferences</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Travel Style */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Travel Style</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.travelPreferences?.travelStyle?.map(style => (
                        <span key={style} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                          {style}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Budget */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Budget Preference</h4>
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm capitalize">
                      {profile.travelPreferences?.budget || 'Not specified'}
                    </span>
                  </div>

                  {/* Preferred Seasons */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Preferred Seasons</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.travelPreferences?.preferredSeasons?.map(season => (
                        <span key={season} className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm">
                          {season}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Accommodation */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-600 mb-2">Preferred Accommodation</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.travelPreferences?.accommodation?.map(type => (
                        <span key={type} className="px-3 py-1 bg-purple-50 text-purple-600 rounded-full text-sm">
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              {(profile.socialLinks?.instagram || profile.socialLinks?.facebook || 
                profile.socialLinks?.twitter || profile.socialLinks?.website) && (
                <div className="mt-6 pt-6 border-t">
                  <h3 className="text-lg font-semibold mb-4">Connect</h3>
                  <div className="flex gap-4">
                    {profile.socialLinks?.instagram && (
                      <a
                        href={`https://instagram.com/${profile.socialLinks.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-pink-600"
                      >
                        <FaInstagram size={24} />
                      </a>
                    )}
                    {profile.socialLinks?.facebook && (
                      <a
                        href={profile.socialLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600"
                      >
                        <FaFacebook size={24} />
                      </a>
                    )}
                    {profile.socialLinks?.twitter && (
                      <a
                        href={`https://twitter.com/${profile.socialLinks.twitter.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-400"
                      >
                        <FaTwitter size={24} />
                      </a>
                    )}
                    {profile.socialLinks?.website && (
                      <a
                        href={profile.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-800"
                      >
                        <FaGlobe size={24} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Badges */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Badges</h2>
              {profile.badges && profile.badges.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {profile.badges.map(badge => (
                    <div
                      key={badge.id}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
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
                        <div className="font-medium dark:text-white">{badge.name}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <FaMedal className="mx-auto text-4xl mb-2 opacity-50" />
                  <p>No badges earned yet</p>
                </div>
              )}
            </div>

            {/* Contributions */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Contributions</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">
                    {profile.stats?.reviews || 0}
                  </div>
                  <div className="text-gray-600">Reviews</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">
                    {profile.stats?.photos || 0}
                  </div>
                  <div className="text-gray-600">Photos</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600">
                    {profile.stats?.answers || 0}
                  </div>
                  <div className="text-gray-600">Answers</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-3xl font-bold text-orange-600">
                    {profile.stats?.threads || 0}
                  </div>
                  <div className="text-gray-600">Forum Posts</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="space-y-6">
                {reviews.length > 0 || threads.length > 0 ? (
                  <>
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
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <FaInbox className="mx-auto text-4xl mb-2 opacity-50" />
                    <p>No activity yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews Section */}
            {reviews.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 dark:text-white">Reviews</h2>
                <div className="space-y-6">
                  {reviews.map(review => (
                    <div key={review.id} className="border-b dark:border-gray-700 pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, index) => (
                            <FaStar
                              key={index}
                              className={index < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                            />
                          ))}
                        </div>
                        <span className="text-gray-600">
                          • {formatDate(review.createdAt)}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.content}</p>
                      {review.photos && review.photos.length > 0 && (
                        <div className="mt-3 flex gap-2 overflow-x-auto">
                          {review.photos.map((photo, index) => (
                            <img
                              key={index}
                              src={photo}
                              alt={`Review photo ${index + 1}`}
                              className="h-20 w-20 object-cover rounded"
                            />
                          ))}
                        </div>
                      )}
                      <div className="mt-2 flex items-center gap-4 text-sm text-gray-600">
                        <span>{review.likes} likes</span>
                        <span>{review.helpfulCount} found this helpful</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Leaderboard */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4 dark:text-white">Top Contributors</h2>
              {topContributors.length > 0 ? (
                <div className="space-y-4">
                  {topContributors.map((user, index) => (
                    <div
                      key={user.id}
                      className="flex items-center gap-4 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <div className="w-8 text-center font-bold dark:text-white">
                        {index + 1}
                      </div>
                      <ProfileAvatar
                        src={user.photoURL}
                        name={user.firstName}
                        size="sm"
                      />
                      <div className="flex-1">
                        <div className="font-medium dark:text-white">{user.firstName} {user.lastName}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">{user.points || 0} points</div>
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
              ) : (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <FaTrophy className="mx-auto text-4xl mb-2 opacity-50" />
                  <p>No contributors yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <ProfileEdit
          profile={profile as IUserProfile}
          onClose={() => setShowEditModal(false)}
          onUpdate={(updatedProfile) => {
            setProfile(updatedProfile);
            setShowEditModal(false);
            toast.success('Profile updated successfully!');
          }}
        />
      )}
    </Layout>
  );
};

export default ProfilePage; 