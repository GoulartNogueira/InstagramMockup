import React from 'react';
import { User } from 'lucide-react';
import { ProfileData } from '../types';

interface ProfileInfoProps {
  profileData: ProfileData;
  isOwnProfile: boolean;
  navigateToConfig?: () => void;
}

// Profile Picture Component
const ProfilePicture: React.FC<{ src: string; size?: number }> = ({ src, size = 77 }) => (
  <div className="relative">
    <div
      className="rounded-full overflow-hidden border border-gray-300"
      style={{ width: size, height: size }}
    >
      <img
        src={src}
        className="w-full h-full object-cover"
        alt="Profile"
      />
    </div>
  </div>
);

// Profile Stats Component
const ProfileStats: React.FC<{ 
  postsCount: number; 
  followers: string; 
  following: string 
}> = ({ postsCount, followers, following }) => (
  <div className="flex-1 flex justify-around ml-4">
    <div className="text-center">
      <div className="font-bold">{postsCount.toString()}</div>
      <div className="text-sm">posts</div>
    </div>
    <div className="text-center">
      <div className="font-bold">{followers}</div>
      <div className="text-sm">seguidores</div>
    </div>
    <div className="text-center">
      <div className="font-bold">{following}</div>
      <div className="text-sm">seguindo</div>
    </div>
  </div>
);

// Profile Bio Component
const ProfileBio: React.FC<{ name: string; bio: string[] }> = ({ name, bio }) => (
  <div className="mt-3">
    <div className="font-bold">{name}</div>
    {bio.map((line, index) => (
      <div key={`bio-line-${index}`} className="text-sm">{line}</div>
    ))}
  </div>
);

const ProfileInfo: React.FC<ProfileInfoProps> = ({ 
  profileData, 
  isOwnProfile,
  navigateToConfig
}) => {
  return (
    <div className="px-4 py-2">
      <div className="flex items-start">
        {/* Profile picture */}
        <ProfilePicture src={profileData.profilePicture} />

        {/* Stats */}
        <ProfileStats 
          postsCount={profileData.posts_images.length} 
          followers={profileData.followers} 
          following={profileData.following} 
        />
      </div>

      {/* Name and bio */}
      <ProfileBio name={profileData.name} bio={profileData.bio} />

      {/* Action buttons */}
      {isOwnProfile ? (
        <div className="grid grid-cols-3 gap-2 mt-3">
          <button 
            className="bg-gray-100 py-1.5 px-2 rounded-md text-sm font-medium col-span-1"
            onClick={navigateToConfig}
          >
            Editar
          </button>
          <button className="bg-gray-100 py-1.5 px-2 rounded-md text-sm font-medium col-span-1">
            Compartilhar perfil
          </button>
          <button className="bg-gray-100 py-1.5 px-2 rounded-md text-sm font-medium col-span-1 flex items-center justify-center">
            <User size={16} />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 mt-3">
          <button className="bg-blue-500 text-white py-1.5 px-2 rounded-md text-sm font-medium col-span-1">
            Seguir
          </button>
          <button className="bg-gray-100 py-1.5 px-2 rounded-md text-sm font-medium col-span-1">
            Mensagem
          </button>
          <button className="bg-gray-100 py-1.5 px-2 rounded-md text-sm font-medium col-span-1">
            Email
          </button>
          <button className="bg-gray-100 py-1.5 px-2 rounded-md text-sm font-medium col-span-1 flex items-center justify-center">
            <User size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;