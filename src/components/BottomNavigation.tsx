import React from 'react';
import { Home, Search, PlusSquare, Play, User } from 'lucide-react';

interface BottomNavigationProps {
  viewingOwnProfile: boolean;
  setViewingOwnProfile: (value: boolean) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ 
  viewingOwnProfile, 
  setViewingOwnProfile 
}) => {
  return (
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
};

export default BottomNavigation;