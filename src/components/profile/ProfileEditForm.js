/**
 * Profile Edit Component for NepaliJets app
 * Allows users to edit their profile information
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import { useProfile } from '../../context/ProfileContext';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { USER_TYPES } from '../../models/UserProfile';

const ProfileEditForm = ({ navigation }) => {
  const { userProfile, loading, updateProfile, uploadProfilePicture } = useProfile();
  
  // State
  const [displayName, setDisplayName] = useState(userProfile?.displayName || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [age, setAge] = useState(userProfile?.age ? userProfile.age.toString() : '');
  
  // Handle profile update
  const handleUpdateProfile = async () => {
    // Validate inputs
    if (!displayName) {
      Alert.alert('Error', 'Please enter your name');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const profileData = {
        displayName,
      };
      
      // Add age if it's a child account
      if (userProfile.accountType === USER_TYPES.CHILD && age) {
        profileData.age = parseInt(age, 10);
      }
      
      await updateProfile(profileData);
      
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Update Failed', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle profile picture upload
  const handleUploadPicture = async () => {
    // This is a placeholder - in a real app, you would use image picker
    Alert.alert(
      'Upload Picture',
      'This feature will be implemented in a future module',
      [{ text: 'OK' }]
    );
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      
      <View style={styles.avatarContainer}>
        {userProfile?.photoURL ? (
          <Image source={{ uri: userProfile.photoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {displayName ? displayName.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
        )}
        
        <TouchableOpacity 
          style={styles.uploadButton} 
          onPress={handleUploadPicture}
        >
          <Text style={styles.uploadButtonText}>Change Picture</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Your name"
          autoCapitalize="words"
        />
      </View>
      
      {userProfile?.accountType === USER_TYPES.CHILD && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Age</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            placeholder="Age"
            keyboardType="number-pad"
            maxLength={2}
          />
        </View>
      )}
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleUpdateProfile}
        disabled={isSubmitting || loading}
      >
        {isSubmitting ? (
          <ActivityIndicator color={COLORS.textLight} />
        ) : (
          <Text style={styles.buttonText}>Save Changes</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.cancelButton} 
        onPress={() => navigation.goBack()}
        disabled={isSubmitting || loading}
      >
        <Text style={styles.cancelButtonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: COLORS.textLight,
    fontSize: 36,
    fontWeight: 'bold',
  },
  uploadButton: {
    padding: 8,
  },
  uploadButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: COLORS.button,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
  },
});

export default ProfileEditForm;
