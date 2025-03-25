/**
 * Authentication service for NepaliJets app
 * Handles all authentication-related operations
 */

import {
  auth,
  firestore,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  googleProvider,
  appleProvider,
  signInWithPopup,
  onAuthStateChanged
} from '../../config/firebase';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

/**
 * Register a new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {Object} userData - Additional user data
 * @returns {Promise} - Promise with user credentials
 */
export const registerWithEmail = async (email, password, userData) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user profile in Firestore
    await createUserProfile(user.uid, {
      email,
      ...userData,
      createdAt: new Date(),
      accountType: userData.accountType || 'child', // 'child' or 'parent'
    });
    
    return userCredential;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign in with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} - Promise with user credentials
 */
export const loginWithEmail = async (email, password) => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

/**
 * Sign in with Google
 * @returns {Promise} - Promise with user credentials
 */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user profile exists, create if not
    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
    if (!userDoc.exists()) {
      await createUserProfile(user.uid, {
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        createdAt: new Date(),
        accountType: 'parent', // Default to parent for Google sign-in
      });
    }
    
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign in with Apple
 * @returns {Promise} - Promise with user credentials
 */
export const loginWithApple = async () => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    const user = result.user;
    
    // Check if user profile exists, create if not
    const userDoc = await getDoc(doc(firestore, 'users', user.uid));
    if (!userDoc.exists()) {
      await createUserProfile(user.uid, {
        email: user.email,
        displayName: user.displayName || 'Apple User',
        photoURL: user.photoURL,
        createdAt: new Date(),
        accountType: 'parent', // Default to parent for Apple sign-in
      });
    }
    
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Sign out current user
 * @returns {Promise} - Promise with void
 */
export const logout = async () => {
  try {
    return await signOut(auth);
  } catch (error) {
    throw error;
  }
};

/**
 * Send password reset email
 * @param {string} email - User email
 * @returns {Promise} - Promise with void
 */
export const resetPassword = async (email) => {
  try {
    return await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

/**
 * Create user profile in Firestore
 * @param {string} userId - User ID
 * @param {Object} userData - User data
 * @returns {Promise} - Promise with void
 */
export const createUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    return await setDoc(userRef, userData);
  } catch (error) {
    throw error;
  }
};

/**
 * Get user profile from Firestore
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with user data
 */
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (userDoc.exists()) {
      return { id: userDoc.id, ...userDoc.data() };
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Update user profile in Firestore
 * @param {string} userId - User ID
 * @param {Object} userData - User data to update
 * @returns {Promise} - Promise with void
 */
export const updateUserProfile = async (userId, userData) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    return await updateDoc(userRef, {
      ...userData,
      updatedAt: new Date(),
    });
  } catch (error) {
    throw error;
  }
};

/**
 * Get current authenticated user
 * @returns {Object|null} - Current user or null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Subscribe to auth state changes
 * @param {Function} callback - Callback function with user object
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToAuthChanges = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
  loginWithApple,
  logout,
  resetPassword,
  createUserProfile,
  getUserProfile,
  updateUserProfile,
  getCurrentUser,
  subscribeToAuthChanges,
};