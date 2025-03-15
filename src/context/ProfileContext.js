/**
 * User Profile Context for NepaliJets app
 * Provides user profile state and methods to all components
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import profileService from '../services/profile/profileService';
import { USER_TYPES } from '../models/UserProfile';

// Create Profile Context
export const ProfileContext = createContext();

// Profile Provider Component
export const ProfileProvider = ({ children }) => {
  // State
  const [userProfile, setUserProfile] = useState(null);
  const [childProfiles, setChildProfiles] = useState([]);
  const [activeChildProfile, setActiveChildProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auth context
  const { currentUser } = useAuth();

  // Load user profile when auth state changes
  useEffect(() => {
    const loadUserProfile = async () => {
      if (currentUser) {
        try {
          setLoading(true);
          setError(null);
          
          // Get user profile
          const profile = await profileService.getUserProfile(currentUser.uid);
          setUserProfile(profile);
          
          // If parent, get child profiles
          if (profile && profile.accountType === USER_TYPES.PARENT) {
            const children = await profileService.getChildProfiles(currentUser.uid);
            setChildProfiles(children);
          }
        } catch (err) {
          console.error('Error loading user profile:', err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      } else {
        setUserProfile(null);
        setChildProfiles([]);
        setActiveChildProfile(null);
        setLoading(false);
      }
    };
    
    loadUserProfile();
  }, [currentUser]);

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentUser) {
        throw new Error('No user is logged in');
      }
      
      const updatedProfile = await profileService.updateUserProfile(currentUser.uid, profileData);
      setUserProfile(updatedProfile);
      
      return updatedProfile;
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Upload profile picture
  const uploadProfilePicture = async (imageUri) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentUser) {
        throw new Error('No user is logged in');
      }
      
      const downloadURL = await profileService.uploadProfilePicture(currentUser.uid, imageUri);
      
      // Update profile with new photo URL
      const updatedProfile = await profileService.updateUserProfile(currentUser.uid, { photoURL: downloadURL });
      setUserProfile(updatedProfile);
      
      return downloadURL;
    } catch (err) {
      console.error('Error uploading profile picture:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Add child profile
  const addChildProfile = async (childData) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentUser) {
        throw new Error('No user is logged in');
      }
      
      if (userProfile.accountType !== USER_TYPES.PARENT) {
        throw new Error('Only parent accounts can add children');
      }
      
      const childProfile = await profileService.addChildToParent(currentUser.uid, childData);
      
      // Update child profiles list
      setChildProfiles([...childProfiles, childProfile]);
      
      return childProfile;
    } catch (err) {
      console.error('Error adding child profile:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update child profile
  const updateChildProfile = async (childId, profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentUser) {
        throw new Error('No user is logged in');
      }
      
      const updatedProfile = await profileService.updateChildProfile(childId, profileData);
      
      // Update child profiles list
      const updatedChildProfiles = childProfiles.map(child => 
        child.id === childId ? { ...child, ...updatedProfile } : child
      );
      setChildProfiles(updatedChildProfiles);
      
      // Update active child profile if it's the one being updated
      if (activeChildProfile && activeChildProfile.id === childId) {
        setActiveChildProfile({ ...activeChildProfile, ...updatedProfile });
      }
      
      return updatedProfile;
    } catch (err) {
      console.error('Error updating child profile:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Set active child profile
  const setActiveChild = (childId) => {
    const child = childProfiles.find(child => child.id === childId);
    if (child) {
      setActiveChildProfile(child);
      return child;
    }
    return null;
  };

  // Update learning progress
  const updateLearningProgress = async (progressData, childId = null) => {
    try {
      setLoading(true);
      setError(null);
      
      if (!currentUser) {
        throw new Error('No user is logged in');
      }
      
      // Determine which user ID to update
      const targetUserId = childId || 
        (userProfile.accountType === USER_TYPES.CHILD ? currentUser.uid : null);
      
      if (!targetUserId) {
        throw new Error('No valid user ID for progress update');
      }
      
      const updatedProfile = await profileService.updateLearningProgress(targetUserId, progressData);
      
      // Update state based on which profile was updated
      if (childId) {
        // Update child profiles list
        const updatedChildProfiles = childProfiles.map(child => 
          child.id === childId ? { ...child, ...updatedProfile } : child
        );
        setChildProfiles(updatedChildProfiles);
        
        // Update active child profile if it's the one being updated
        if (activeChildProfile && activeChildProfile.id === childId) {
          setActiveChildProfile({ ...activeChildProfile, ...updatedProfile });
        }
      } else if (userProfile.accountType === USER_TYPES.CHILD) {
        // Update user profile
        setUserProfile(updatedProfile);
      }
      
      return updatedProfile;
    } catch (err) {
      console.error('Error updating learning progress:', err);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    userProfile,
    childProfiles,
    activeChildProfile,
    loading,
    error,
    updateProfile,
    uploadProfilePicture,
    addChildProfile,
    updateChildProfile,
    setActiveChild,
    updateLearningProgress,
  };

  return (
    <ProfileContext.Provider value={value}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook to use the profile context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export default ProfileProvider;
