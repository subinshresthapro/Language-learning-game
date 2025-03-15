/**
 * User Profile Service for NepaliJets app
 * Handles user profile operations
 */

import { firestore, storage } from '../../config/firebase';
import { doc, setDoc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { DEFAULT_PARENT_PROFILE, DEFAULT_CHILD_PROFILE, USER_TYPES } from '../../models/UserProfile';
import storageService from '../storage/storageService';

/**
 * Create a new user profile
 * @param {string} userId - User ID
 * @param {Object} userData - User data from authentication
 * @returns {Promise} - Promise with created profile
 */
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    
    // Determine account type
    const accountType = userData.accountType || USER_TYPES.PARENT;
    
    // Create profile based on account type
    let profileData;
    if (accountType === USER_TYPES.CHILD) {
      profileData = {
        ...DEFAULT_CHILD_PROFILE,
        displayName: userData.displayName || '',
        email: userData.email || '',
        photoURL: userData.photoURL || null,
        age: userData.age || null,
        parentId: userData.parentId || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    } else {
      profileData = {
        ...DEFAULT_PARENT_PROFILE,
        displayName: userData.displayName || '',
        email: userData.email || '',
        photoURL: userData.photoURL || null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    
    // Save to Firestore
    await setDoc(userRef, profileData);
    
    // Save to local storage
    await storageService.saveToLocalStorage(`user_${userId}`, profileData);
    
    return profileData;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

/**
 * Get user profile
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with user profile
 */
export const getUserProfile = async (userId) => {
  try {
    // Try to get from local storage first
    const localProfile = await storageService.getFromLocalStorage(`user_${userId}`);
    
    // Get from Firestore
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const profileData = { id: userId, ...userDoc.data() };
      
      // Update local storage with latest data
      await storageService.saveToLocalStorage(`user_${userId}`, profileData);
      
      return profileData;
    } else if (localProfile) {
      // Return local profile if Firestore profile doesn't exist
      return localProfile;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};

/**
 * Update user profile
 * @param {string} userId - User ID
 * @param {Object} profileData - Profile data to update
 * @returns {Promise} - Promise with updated profile
 */
export const updateUserProfile = async (userId, profileData) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    
    // Add updated timestamp
    const updatedData = {
      ...profileData,
      updatedAt: new Date(),
    };
    
    // Update in Firestore
    await updateDoc(userRef, updatedData);
    
    // Get full updated profile
    const updatedProfile = await getUserProfile(userId);
    
    // Update in local storage
    await storageService.saveToLocalStorage(`user_${userId}`, updatedProfile);
    
    return updatedProfile;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

/**
 * Upload profile picture
 * @param {string} userId - User ID
 * @param {string} imageUri - Image URI
 * @returns {Promise} - Promise with download URL
 */
export const uploadProfilePicture = async (userId, imageUri) => {
  try {
    const downloadURL = await storageService.uploadFile(userId, imageUri, 'profile/avatar.jpg');
    
    // Update profile with new photo URL
    await updateUserProfile(userId, { photoURL: downloadURL });
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    throw error;
  }
};

/**
 * Get child profiles for parent
 * @param {string} parentId - Parent user ID
 * @returns {Promise} - Promise with array of child profiles
 */
export const getChildProfiles = async (parentId) => {
  try {
    const childrenQuery = query(
      collection(firestore, 'users'),
      where('parentId', '==', parentId),
      where('accountType', '==', USER_TYPES.CHILD)
    );
    
    const querySnapshot = await getDocs(childrenQuery);
    const children = [];
    
    querySnapshot.forEach((doc) => {
      children.push({ id: doc.id, ...doc.data() });
    });
    
    return children;
  } catch (error) {
    console.error('Error getting child profiles:', error);
    throw error;
  }
};

/**
 * Add child to parent
 * @param {string} parentId - Parent user ID
 * @param {Object} childData - Child data
 * @returns {Promise} - Promise with child profile
 */
export const addChildToParent = async (parentId, childData) => {
  try {
    // Create child profile in Firestore
    const childRef = doc(collection(firestore, 'users'));
    const childId = childRef.id;
    
    const childProfile = {
      ...DEFAULT_CHILD_PROFILE,
      displayName: childData.displayName || '',
      age: childData.age || null,
      parentId: parentId,
      accountType: USER_TYPES.CHILD,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await setDoc(childRef, childProfile);
    
    // Update parent profile with child reference
    const parentRef = doc(firestore, 'users', parentId);
    const parentDoc = await getDoc(parentRef);
    
    if (parentDoc.exists()) {
      const parentData = parentDoc.data();
      const children = parentData.children || [];
      
      await updateDoc(parentRef, {
        children: [...children, childId],
        updatedAt: new Date(),
      });
    }
    
    return { id: childId, ...childProfile };
  } catch (error) {
    console.error('Error adding child to parent:', error);
    throw error;
  }
};

/**
 * Update child profile
 * @param {string} childId - Child user ID
 * @param {Object} profileData - Profile data to update
 * @returns {Promise} - Promise with updated profile
 */
export const updateChildProfile = async (childId, profileData) => {
  try {
    return await updateUserProfile(childId, profileData);
  } catch (error) {
    console.error('Error updating child profile:', error);
    throw error;
  }
};

/**
 * Update learning progress
 * @param {string} userId - User ID
 * @param {Object} progressData - Progress data to update
 * @returns {Promise} - Promise with updated profile
 */
export const updateLearningProgress = async (userId, progressData) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      // Only update if it's a child account
      if (userData.accountType === USER_TYPES.CHILD) {
        const currentProgress = userData.learningProgress || {};
        
        const updatedProgress = {
          learningProgress: {
            ...currentProgress,
            ...progressData,
            updatedAt: new Date(),
          },
        };
        
        return await updateUserProfile(userId, updatedProgress);
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error updating learning progress:', error);
    throw error;
  }
};

export default {
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  uploadProfilePicture,
  getChildProfiles,
  addChildToParent,
  updateChildProfile,
  updateLearningProgress,
};
