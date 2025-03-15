import { createContext, useContext, useState } from 'react';
import { ProfileData, defaultProfile } from '../types';

interface ProfileContextType {
  profileData: ProfileData;
  updateProfileData: (data: ProfileData) => void;
  viewingOwnProfile: boolean;
  setViewingOwnProfile: (value: boolean) => void;
}

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
  const [profileData, setProfileData] = useState<ProfileData>(defaultProfile);
  const [viewingOwnProfile, setViewingOwnProfile] = useState(true);

  const updateProfileData = (newData: ProfileData) => {
    setProfileData(newData);
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
