import React, { useState } from 'react';
import { UserProfile, TRAVEL_STYLES, INTERESTS, SEASONS, ACCOMMODATION_TYPES } from '../../types/user';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { FaSave, FaTimes } from 'react-icons/fa';
import { awardPoints } from '../../services/userService';

interface ProfileEditProps {
  profile: UserProfile;
  onClose: () => void;
  onUpdate: (updatedProfile: UserProfile) => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  bio: string;
  location: string;
  interests: string[];
  travelPreferences: {
    preferredDestinations: string[];
    travelStyle: string[];
    budget: 'budget' | 'moderate' | 'luxury';
    preferredSeasons: string[];
    accommodation: string[];
  };
  socialLinks: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    website?: string;
  };
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ profile, onClose, onUpdate }) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    bio: profile.bio || '',
    location: profile.location || '',
    interests: profile.interests || [],
    travelPreferences: {
      preferredDestinations: profile.travelPreferences?.preferredDestinations || [],
      travelStyle: profile.travelPreferences?.travelStyle || [],
      budget: profile.travelPreferences?.budget || 'moderate',
      preferredSeasons: profile.travelPreferences?.preferredSeasons || [],
      accommodation: profile.travelPreferences?.accommodation || [],
    },
    socialLinks: {
      instagram: profile.socialLinks?.instagram || '',
      facebook: profile.socialLinks?.facebook || '',
      twitter: profile.socialLinks?.twitter || '',
      website: profile.socialLinks?.website || '',
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof formData],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleMultiSelect = (category: string, value: string) => {
    setFormData(prev => {
      if (category === 'interests') {
        const interests = prev.interests.includes(value)
          ? prev.interests.filter(i => i !== value)
          : [...prev.interests, value];
        return { ...prev, interests };
      } else {
        const [section, field] = category.split('.');
        const currentValues = prev[section as keyof typeof prev][field as keyof typeof prev[keyof typeof prev]] as string[];
        const updatedValues = currentValues.includes(value)
          ? currentValues.filter(v => v !== value)
          : [...currentValues, value];
        
        return {
          ...prev,
          [section]: {
            ...prev[section as keyof typeof prev],
            [field]: updatedValues
          }
        };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const wasProfileComplete = profile.bio && profile.location && profile.interests.length > 0;
      const isProfileNowComplete = formData.bio && formData.location && formData.interests.length > 0;

      const userRef = doc(db, 'users', profile.id);
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        location: formData.location,
        interests: formData.interests,
        travelPreferences: formData.travelPreferences,
        socialLinks: formData.socialLinks,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(userRef, updateData);

      // Award points for completing profile if it wasn't complete before
      if (!wasProfileComplete && isProfileNowComplete) {
        await awardPoints(profile.id, 'COMPLETE_PROFILE');
      }

      const updatedProfile = {
        id: profile.id,
        email: profile.email,
        photoURL: profile.photoURL,
        joinedDate: profile.joinedDate,
        stats: profile.stats,
        points: profile.points,
        badges: profile.badges,
        followers: profile.followers,
        following: profile.following,
        loginStreak: profile.loginStreak,
        lastLoginDate: profile.lastLoginDate,
        firstName: formData.firstName,
        lastName: formData.lastName,
        bio: formData.bio,
        location: formData.location,
        interests: formData.interests,
        travelPreferences: formData.travelPreferences,
        socialLinks: formData.socialLinks
      } as UserProfile;

      onUpdate(updatedProfile);
      onClose();
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Edit Profile</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-white">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 min-h-[100px] bg-white dark:bg-gray-700 dark:text-white"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 dark:text-white"
              placeholder="City, Country"
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-white">Interests</label>
            <div className="flex flex-wrap gap-2">
              {INTERESTS.map(interest => (
                <button
                  key={interest}
                  type="button"
                  onClick={() => handleMultiSelect('interests', interest)}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    formData.interests.includes(interest)
                      ? 'bg-primary-500 text-white dark:bg-primary-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {interest}
                </button>
              ))}
            </div>
          </div>

          {/* Travel Preferences */}
          <div>
            <h3 className="text-lg font-medium mb-3 dark:text-white">Travel Preferences</h3>
            
            {/* Travel Style */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 dark:text-white">Travel Style</label>
              <div className="flex flex-wrap gap-2">
                {TRAVEL_STYLES.map(style => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => handleMultiSelect('travelPreferences.travelStyle', style)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.travelPreferences.travelStyle.includes(style)
                        ? 'bg-primary-500 text-white dark:bg-primary-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 dark:text-white">Budget Preference</label>
              <select
                name="travelPreferences.budget"
                value={formData.travelPreferences.budget}
                onChange={handleChange}
                className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="budget">Budget</option>
                <option value="moderate">Moderate</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            {/* Preferred Seasons */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 dark:text-white">Preferred Seasons</label>
              <div className="flex flex-wrap gap-2">
                {SEASONS.map(season => (
                  <button
                    key={season}
                    type="button"
                    onClick={() => handleMultiSelect('travelPreferences.preferredSeasons', season)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.travelPreferences.preferredSeasons.includes(season)
                        ? 'bg-primary-500 text-white dark:bg-primary-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {season}
                  </button>
                ))}
              </div>
            </div>

            {/* Accommodation Types */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-white">Preferred Accommodation</label>
              <div className="flex flex-wrap gap-2">
                {ACCOMMODATION_TYPES.map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleMultiSelect('travelPreferences.accommodation', type)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      formData.travelPreferences.accommodation.includes(type)
                        ? 'bg-primary-500 text-white dark:bg-primary-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-medium mb-3 dark:text-white">Social Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Instagram</label>
                <input
                  type="text"
                  name="socialLinks.instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleChange}
                  className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="@username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Facebook</label>
                <input
                  type="text"
                  name="socialLinks.facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleChange}
                  className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="Profile URL"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Twitter</label>
                <input
                  type="text"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="@username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">Website</label>
                <input
                  type="text"
                  name="socialLinks.website"
                  value={formData.socialLinks.website}
                  onChange={handleChange}
                  className="w-full p-2 border dark:border-gray-600 rounded focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 dark:text-white"
                  placeholder="https://"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/50 p-3 rounded">
              {error}
            </div>
          )}

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 dark:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600 disabled:opacity-50 flex items-center gap-2 transition-colors"
            >
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  Saving...
                </>
              ) : (
                <>
                  <FaSave />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit; 