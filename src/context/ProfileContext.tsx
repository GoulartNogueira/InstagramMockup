import { createContext, useContext } from 'react';
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