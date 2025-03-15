/**
 * Authentication Context for NepaliJets app
 * Provides authentication state and methods to all components
 */

import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/auth/authService';
import storageService from '../services/storage/storageService';

// Create Authentication Context
export const AuthContext = createContext();

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  // State
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = authService.subscribeToAuthChanges(async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get user profile from Firestore
          const profile = await authService.getUserProfile(user.uid);
          setUserProfile(profile);
          
          // Save user data to local storage
          await storageService.saveToLocalStorage('user', { uid: user.uid, email: user.email });
        } catch (err) {
          console.error('Error fetching user profile:', err);
          setError(err.message);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Register with email and password
  const register = async (email, password, userData) => {
    try {
      setError(null);
      setLoading(true);
      const result = await authService.registerWithEmail(email, password, userData);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login with email and password
  const login = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      const result = await authService.loginWithEmail(email, password);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await authService.loginWithGoogle();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login with Apple
  const loginWithApple = async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await authService.loginWithApple();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setError(null);
      setLoading(true);
      await authService.logout();
      await storageService.removeFromLocalStorage('user');
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    try {
      setError(null);
      setLoading(true);
      await authService.resetPassword(email);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      if (!currentUser) {
        throw new Error('No user is logged in');
      }
      
      await authService.updateUserProfile(currentUser.uid, userData);
      
      // Refresh user profile
      const updatedProfile = await authService.getUserProfile(currentUser.uid);
      setUserProfile(updatedProfile);
      
      return updatedProfile;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    currentUser,
    userProfile,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    loginWithApple,
    logout,
    resetPassword,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
