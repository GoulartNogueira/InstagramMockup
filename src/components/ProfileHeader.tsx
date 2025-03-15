import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreHorizontal, ChevronLeft, UserPlus, PlusSquare, BadgeCheck, Badge } from 'lucide-react';

interface ProfileHeaderProps {
  username: string;
  isOwnProfile: boolean;
  verified: boolean;
  navigateToConfig?: () => void;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ 
  username, isOwnProfile, verified, navigateToConfig 
}) => {
  const navigate = useNavigate();
  
  const goToConfig = () => {
    if (navigateToConfig) {
      navigateToConfig();
    } else {
      navigate('/config');
    }
  };
  
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
          <button onClick={goToConfig}>
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

export default ProfileHeader;