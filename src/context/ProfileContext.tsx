import { createContext, useContext, useState } from 'react';
import { ProfileData, defaultProfile } from '../types';

interface ProfileContextType {
  profileData: ProfileData;
  updateProfileData: (data: ProfileData) => void;
  viewingOwnProfile: boolean;
  setViewingOwnProfile: (value: boolean) => void;
}

const STORAGE_KEY = 'instagramProfileData';

// Helper function to load data from localStorage
const loadProfileData = (): ProfileData => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error('Error loading profile data from localStorage:', error);
  }
  return defaultProfile;
};

// Helper function to save data to localStorage
const saveProfileData = (data: ProfileData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving profile data to localStorage:', error);
  }
};

// Create context with default values
export const ProfileContext = createContext<ProfileContextType>({
  profileData: defaultProfile,
  updateProfileData: () => {},
  viewingOwnProfile: true,
  setViewingOwnProfile: () => {},
});

// Custom hook to use the profile context
export const useProfileContext = () => useContext(ProfileContext);

// ProfileContextProvider component to provide the context
export const ProfileContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData>(() => loadProfileData());
  const [viewingOwnProfile, setViewingOwnProfile] = useState(true);

  const updateProfileData = (newData: ProfileData) => {
    setProfileData(newData);
    saveProfileData(newData);
  };

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        updateProfileData,
        viewingOwnProfile,
        setViewingOwnProfile,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
