import React from 'react';
import { Camera, Home, Search, PlusSquare, Play, User, MoreHorizontal, ChevronLeft, UserPlus, BadgeCheck, Badge, Copy, Grid } from 'lucide-react';
import { ProfileData } from '../types';
import ProfileHeader from './ProfileHeader';
import ProfileInfo from './ProfileInfo';
import StoryHighlights from './StoryHighlights';
import ContentTabs from './ContentTabs';
import PostsGrid from './PostsGrid';
import BottomNavigation from './BottomNavigation';

interface ProfileViewProps {
  profileData: ProfileData;
  viewingOwnProfile: boolean;
  setViewingOwnProfile: (value: boolean) => void;
  navigateToConfig: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({
  profileData,
  viewingOwnProfile,
  setViewingOwnProfile,
  navigateToConfig
}) => {
  
  // Instagram Profile View (Own Profile)
  const OwnProfileView = () => (
    <div className="max-w-md mx-auto bg-white h-screen flex flex-col overflow-hidden">
      {/* Profile header */}
      <ProfileHeader 
        username={profileData.username} 
        isOwnProfile={true} 
        verified={profileData.verified}
        navigateToConfig={navigateToConfig}
      />
      
      <div className="flex-1 overflow-y-auto">
        {/* Profile info section */}
        <ProfileInfo 
          profileData={profileData} 
          isOwnProfile={true}
          navigateToConfig={navigateToConfig}
        />

        {/* Story highlights */}
        <StoryHighlights highlights={profileData.highlights} showAddNew={true} />

        {/* Content tabs */}
        <ContentTabs />

        {/* Posts grid */}
        <PostsGrid posts={profileData.posts_images} />
      </div>
      
      {/* Bottom navigation */}
      <BottomNavigation 
        viewingOwnProfile={viewingOwnProfile} 
        setViewingOwnProfile={setViewingOwnProfile} 
      />
    </div>
  );

  // Instagram Profile View (Other User)
  const OtherUserProfileView = () => (
    <div className="max-w-md mx-auto bg-white h-screen flex flex-col overflow-hidden">
      {/* Profile header */}
      <ProfileHeader 
        username={profileData.username} 
        isOwnProfile={false} 
        verified={profileData.verified}
      />
      
      <div className="flex-1 overflow-y-auto">
        {/* Profile info section */}
        <ProfileInfo 
          profileData={profileData} 
          isOwnProfile={false}
        />

        {/* Story highlights */}
        <StoryHighlights highlights={profileData.highlights} showAddNew={false} />

        {/* Content tabs */}
        <ContentTabs />

        {/* Posts grid */}
        <PostsGrid posts={profileData.posts_images} />
      </div>
      
      {/* Bottom navigation */}
      <BottomNavigation 
        viewingOwnProfile={viewingOwnProfile} 
        setViewingOwnProfile={setViewingOwnProfile} 
      />
    </div>
  );

  return viewingOwnProfile ? <OwnProfileView /> : <OtherUserProfileView />;
};

export default ProfileView;