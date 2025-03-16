import React from 'react';
import { Camera, Home, Search, PlusSquare, Play, User, MoreHorizontal, ChevronLeft, UserPlus, BadgeCheck, Badge, Grid } from 'lucide-react';

// Profile Header Component
interface ProfileHeaderProps {
  username: string;
  isOwnProfile: boolean;
  verified: boolean;
  navigateToConfig?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  username, isOwnProfile, verified, navigateToConfig 
}) => {
  if (isOwnProfile) {
    return (
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200">
        <div className="flex items-center">
          <span className="text-xl font-semibold">{username}</span>
          <ChevronLeft className="ml-1" size={20} />
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-8 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold absolute -top-2 -right-4">999+</div>
            <UserPlus size={24} />
          </div>
          <PlusSquare size={24} />
          <button onClick={navigateToConfig}>
            <MoreHorizontal size={24} />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex justify-between items-center px-4 py-2">
        <div className="flex items-center">
          <ChevronLeft size={24} />
          <span className="ml-4 text-lg font-semibold">{username}</span>
          {verified && (
            <span className="relative inline-block ml-1 w-4 h-4">
              <BadgeCheck
                className="absolute inset-0"
                size={16}
                fill="#0095F6"
                color="#FFFFFF"
              />
              <Badge
                className="absolute inset-0"
                size={16}
                strokeWidth={3}
                color="#0095F6"
              />
            </span>
          )}
        </div>
        <MoreHorizontal size={24} />
      </div>
    );
  }
};

// Profile Picture Component
interface ProfilePictureProps {
  profilePicture: string;
  size?: number;
  editable?: boolean;
  onImageChange?: (file: File) => void;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ 
  profilePicture, size = 77, editable = false, onImageChange 
}) => {
  const handleImageClick = () => {
    if (editable && onImageChange) {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => {
        const files = (e.target as HTMLInputElement).files;
        if (files && files.length > 0) {
          onImageChange(files[0]);
        }
      };
      input.click();
    }
  };

  return (
    <div className="relative" onClick={handleImageClick}>
      <div
        className="rounded-full overflow-hidden border border-gray-300"
        style={{ width: size, height: size }}
      >
        <img
          src={profilePicture}
          className="w-full h-full object-cover"
          alt="Profile"
        />
      </div>
      {editable && (
        <button className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1">
          <Camera size={12} color="white" />
        </button>
      )}
    </div>
  );
};

// Profile Stats Component
interface ProfileStatsProps {
  postsCount: number;
  followers: string;
  following: string;
}

export const ProfileStats: React.FC<ProfileStatsProps> = ({ postsCount, followers, following }) => (
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
interface ProfileBioProps {
  name: string;
  bio: string[];
}

export const ProfileBio: React.FC<ProfileBioProps> = ({ name, bio }) => (
  <div className="mt-3">
    <div className="font-bold">{name}</div>
    {bio.map((line, index) => (
      <div key={`bio-line-${index}`} className="text-sm">{line}</div>
    ))}
  </div>
);

// Content Tabs Component
export const ContentTabs: React.FC = () => (
  <div className="border-t border-gray-300 flex justify-around">
    <button className="py-2 px-4 border-b-2 border-black">
      <Grid size={24} />
    </button>
    <button className="py-2 px-4">
      <Play size={24} />
    </button>
    <button className="py-2 px-4">
      <User size={24} />
    </button>
  </div>
);

// Bottom Navigation Component
interface BottomNavigationProps {
  viewingOwnProfile: boolean;
  setViewingOwnProfile: (value: boolean) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  viewingOwnProfile, setViewingOwnProfile 
}) => (
  <div className="border-t border-gray-300 flex justify-around py-2 mt-auto">
    <button onClick={() => setViewingOwnProfile(false)}>
      <Home size={24} color={!viewingOwnProfile ? "#0095F6" : undefined} />
    </button>
    <button>
      <Search size={24} />
    </button>
    <button>
      <PlusSquare size={24} />
    </button>
    <button>
      <Play size={24} />
    </button>
    <button onClick={() => setViewingOwnProfile(true)}>
      <User size={24} color={viewingOwnProfile ? "#0095F6" : undefined} />
    </button>
  </div>
);
