import React, { useState, useEffect } from 'react';
import ProfileView from './components/ProfileView';
import ConfigPage from './components/ConfigPage';
import { ProfileData, defaultProfile } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'profile' | 'config'>('profile');
  const [viewingOwnProfile, setViewingOwnProfile] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfile);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedData = localStorage.getItem('instagramProfileData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setProfileData(parsedData);
      } catch (e) {
        console.error("Error parsing saved data:", e);
      }
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('instagramProfileData', JSON.stringify(profileData));
  }, [profileData]);

  // Navigate to profile view
  const navigateToProfile = () => {
    setCurrentPage('profile');
  };

  // Navigate to config page
  const navigateToConfig = () => {
    setCurrentPage('config');
  };

  // Update profile data from config page
  const updateProfileData = (newData: ProfileData) => {
    setProfileData(newData);
  };

  return (
    <div className="h-screen overflow-hidden">
      {currentPage === 'profile' ? (
        <ProfileView 
          profileData={profileData} 
          viewingOwnProfile={viewingOwnProfile}
          setViewingOwnProfile={setViewingOwnProfile}
          navigateToConfig={navigateToConfig}
        />
      ) : (
        <ConfigPage 
          profileData={profileData} 
          updateProfileData={updateProfileData} 
          navigateToProfile={navigateToProfile}
        />
      )}
    </div>
  );
};

export default App;