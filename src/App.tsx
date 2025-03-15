import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProfileView from './pages/ProfileView';
import ConfigPage from './pages/ConfigPage';
import { ProfileData, defaultProfile } from './types';
import { ProfileContext } from './context/ProfileContext';

const App: React.FC = () => {
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

  // Update profile data
  const updateProfileData = (newData: ProfileData) => {
    setProfileData(newData);
  };

  return (
    <ProfileContext.Provider 
      value={{ 
        profileData, 
        updateProfileData, 
        viewingOwnProfile, 
        setViewingOwnProfile 
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProfileView />} />
          <Route path="/config" element={<ConfigPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ProfileContext.Provider>
  );
};

export default App;