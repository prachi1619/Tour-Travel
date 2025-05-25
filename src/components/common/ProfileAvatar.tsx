import React, { useState } from 'react';

interface ProfileAvatarProps {
  src?: string | null;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ src, name, size = 'md', className = '' }) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-32 h-32 text-4xl'
  };

  const renderInitials = () => (
    <div 
      className={`${sizeClasses[size]} ${className} rounded-full bg-primary-500 text-white flex items-center justify-center font-semibold`}
    >
      {getInitials(name || 'User')}
    </div>
  );

  if (!src || imageError) {
    return renderInitials();
  }

  return (
    <img
      src={src}
      alt={name}
      className={`${sizeClasses[size]} ${className} rounded-full object-cover`}
      onError={() => setImageError(true)}
    />
  );
};

export default ProfileAvatar; 