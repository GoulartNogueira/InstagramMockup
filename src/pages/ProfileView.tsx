import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileContext } from '../context/ProfileContext';
import ProfileHeader from '../components/ProfileHeader';
import ProfileInfo from '../components/ProfileInfo';
import StoryHighlights from '../components/StoryHighlights';
import ContentTabs from '../components/ContentTabs';
import PostsGrid from '../components/PostsGrid';
import BottomNavigation from '../components/BottomNavigation';

const ProfileView: React.FC = () => {
  const { profileData, viewingOwnProfile, setViewingOwnProfile } = useProfileContext();
  const navigate = useNavigate();
  
  const navigateToConfig = () => {
    navigate('/config');
  };
  
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
