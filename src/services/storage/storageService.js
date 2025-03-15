/**
 * Storage service for NepaliJets app
 * Handles local storage and cloud synchronization
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { firestore, storage } from '../../config/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Save data to local storage
 * @param {string} key - Storage key
 * @param {any} value - Data to store
 * @returns {Promise} - Promise with void
 */
export const saveToLocalStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    return true;
  } catch (error) {
    console.error('Error saving to local storage:', error);
    throw error;
  }
};

/**
 * Get data from local storage
 * @param {string} key - Storage key
 * @returns {Promise} - Promise with stored data
 */
export const getFromLocalStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting from local storage:', error);
    throw error;
  }
};

/**
 * Remove data from local storage
 * @param {string} key - Storage key
 * @returns {Promise} - Promise with void
 */
export const removeFromLocalStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error('Error removing from local storage:', error);
    throw error;
  }
};

/**
 * Clear all data from local storage
 * @returns {Promise} - Promise with void
 */
export const clearLocalStorage = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (error) {
    console.error('Error clearing local storage:', error);
    throw error;
  }
};

/**
 * Save user data to cloud
 * @param {string} userId - User ID
 * @param {string} dataType - Type of data (e.g., 'progress', 'settings')
 * @param {any} data - Data to store
 * @returns {Promise} - Promise with void
 */
export const saveToCloud = async (userId, dataType, data) => {
  try {
    const docRef = doc(firestore, `users/${userId}/${dataType}`, 'data');
    await setDoc(docRef, {
      ...data,
      updatedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error('Error saving to cloud:', error);
    throw error;
  }
};

/**
 * Get user data from cloud
 * @param {string} userId - User ID
 * @param {string} dataType - Type of data (e.g., 'progress', 'settings')
 * @returns {Promise} - Promise with stored data
 */
export const getFromCloud = async (userId, dataType) => {
  try {
    const docRef = doc(firestore, `users/${userId}/${dataType}`, 'data');
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting from cloud:', error);
    throw error;
  }
};

/**
 * Sync local data with cloud
 * @param {string} userId - User ID
 * @param {string} dataType - Type of data (e.g., 'progress', 'settings')
 * @param {string} localKey - Local storage key
 * @returns {Promise} - Promise with synced data
 */
export const syncWithCloud = async (userId, dataType, localKey) => {
  try {
    // Get local data
    const localData = await getFromLocalStorage(localKey);
    
    // Get cloud data
    const cloudData = await getFromCloud(userId, dataType);
    
    // Determine which data is more recent
    if (!cloudData) {
      // No cloud data, upload local data
      if (localData) {
        await saveToCloud(userId, dataType, localData);
      }
      return localData;
    } else if (!localData) {
      // No local data, download cloud data
      await saveToLocalStorage(localKey, cloudData);
      return cloudData;
    } else {
      // Both exist, compare timestamps
      const localTimestamp = localData.updatedAt ? new Date(localData.updatedAt) : new Date(0);
      const cloudTimestamp = cloudData.updatedAt ? new Date(cloudData.updatedAt) : new Date(0);
      
      if (localTimestamp > cloudTimestamp) {
        // Local is newer, upload to cloud
        await saveToCloud(userId, dataType, localData);
        return localData;
      } else {
        // Cloud is newer, download to local
        await saveToLocalStorage(localKey, cloudData);
        return cloudData;
      }
    }
  } catch (error) {
    console.error('Error syncing with cloud:', error);
    throw error;
  }
};

/**
 * Upload file to cloud storage
 * @param {string} userId - User ID
 * @param {string} uri - Local file URI
 * @param {string} path - Storage path
 * @returns {Promise} - Promise with download URL
 */
export const uploadFile = async (userId, uri, path) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    const storageRef = ref(storage, `users/${userId}/${path}`);
    await uploadBytes(storageRef, blob);
    
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};

export default {
  saveToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
  clearLocalStorage,
  saveToCloud,
  getFromCloud,
  syncWithCloud,
  uploadFile,
};
