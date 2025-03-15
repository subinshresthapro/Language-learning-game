/**
 * Social Sign In Component for NepaliJets app
 * Handles authentication with Google and Apple
 */

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';

const SocialSignIn = () => {
  // State
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  
  // Auth context
  const { loginWithGoogle, loginWithApple, error } = useAuth();
  
  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      await loginWithGoogle();
      // Navigation will be handled by the auth state listener in AuthContext
    } catch (error) {
      Alert.alert('Google Sign In Failed', error.message);
    } finally {
      setIsGoogleLoading(false);
    }
  };
  
  // Handle Apple sign in
  const handleAppleSignIn = async () => {
    try {
      setIsAppleLoading(true);
      await loginWithApple();
      // Navigation will be handled by the auth state listener in AuthContext
    } catch (error) {
      Alert.alert('Apple Sign In Failed', error.message);
    } finally {
      setIsAppleLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <View style={styles.divider} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.divider} />
      </View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      <TouchableOpacity 
        style={[styles.socialButton, styles.googleButton]} 
        onPress={handleGoogleSignIn}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          <ActivityIndicator color={COLORS.textPrimary} />
        ) : (
          <>
            {/* Placeholder for Google icon */}
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>G</Text>
            </View>
            <Text style={styles.socialButtonText}>{STRINGS.AUTH.GOOGLE_SIGN_IN}</Text>
          </>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.socialButton, styles.appleButton]} 
        onPress={handleAppleSignIn}
        disabled={isAppleLoading}
      >
        {isAppleLoading ? (
          <ActivityIndicator color={COLORS.textLight} />
        ) : (
          <>
            {/* Placeholder for Apple icon */}
            <View style={[styles.iconPlaceholder, styles.appleIcon]}>
              <Text style={[styles.iconText, styles.appleIconText]}>A</Text>
            </View>
            <Text style={[styles.socialButtonText, styles.appleButtonText]}>{STRINGS.AUTH.APPLE_SIGN_IN}</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 10,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  dividerText: {
    color: COLORS.textSecondary,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
  },
  googleButton: {
    backgroundColor: COLORS.cardBackground,
    borderColor: COLORS.border,
  },
  appleButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  appleButtonText: {
    color: COLORS.textLight,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4285F4',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  appleIcon: {
    backgroundColor: '#FFF',
  },
  iconText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  appleIconText: {
    color: '#000',
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default SocialSignIn;
