import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserProfile } from '../../types/user';
import { getConnectedProfiles, checkMutualConnection } from '../../services/userService';
import ProfileAvatar from '../common/ProfileAvatar';
import { FaUserFriends } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

interface ConnectedProfilesProps {
  userId: string;
  initialTab?: 'followers' | 'following';
}

const ConnectedProfiles: React.FC<ConnectedProfilesProps> = ({ userId, initialTab = 'followers' }) => {
  const [activeTab, setActiveTab] = useState<'followers' | 'following'>(initialTab);
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  useEffect(() => {
    fetchProfiles(activeTab);
  }, [userId, activeTab]);

  const fetchProfiles = async (type: 'followers' | 'following') => {
    try {
      setLoading(true);
      setError('');
      const fetchedProfiles = await getConnectedProfiles(userId, type);
      
      // If current user is logged in, check for mutual connections
      if (currentUser) {
        const profilesWithMutual = await Promise.all(
          fetchedProfiles.map(async (profile) => {
            const isMutual = await checkMutualConnection(currentUser.uid, profile.id);
            return { ...profile, isMutual };
          })
        );
        setProfiles(profilesWithMutual);
      } else {
        setProfiles(fetchedProfiles);
      }
    } catch (err) {
      console.error(`Error fetching ${type}:`, err);
      setError(`Failed to load ${type}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      {/* Tabs */}
      <div className="flex border-b dark:border-gray-700 mb-6">
        <button
          onClick={() => setActiveTab('followers')}
          className={`px-4 py-2 -mb-px ${
            activeTab === 'followers'
              ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Followers
        </button>
        <button
          onClick={() => setActiveTab('following')}
          className={`px-4 py-2 -mb-px ${
            activeTab === 'following'
              ? 'border-b-2 border-primary-500 text-primary-600 dark:text-primary-400'
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          Following
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full"></div>
        </div>
      ) : error ? (
        <div className="text-center py-8 text-red-600 dark:text-red-400">
          {error}
        </div>
      ) : profiles.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <FaUserFriends className="mx-auto text-4xl mb-2 opacity-50" />
          <p>No {activeTab} yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {profiles.map((profile) => (
            <Link
              key={profile.id}
              to={`/profile/${profile.id}`}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <ProfileAvatar
                src={profile.photoURL}
                name={profile.firstName}
                size="md"
              />
              <div className="flex-1">
                <div className="font-medium dark:text-white">
                  {profile.firstName} {profile.lastName}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {profile.location || 'No location set'}
                </div>
              </div>
              {profile.isMutual && (
                <span className="text-xs bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400 px-2 py-1 rounded-full">
                  Mutual Connection
                </span>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default ConnectedProfiles; 