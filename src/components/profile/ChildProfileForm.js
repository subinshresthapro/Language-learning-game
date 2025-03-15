/**
 * Child Profile Form Component for NepaliJets app
 * Allows parents to add or edit child profiles
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, Image } from 'react-native';
import { useProfile } from '../../context/ProfileContext';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';

const ChildProfileForm = ({ navigation, childId = null }) => {
  const { childProfiles, loading, addChildProfile, updateChildProfile } = useProfile();
  
  // Find child profile if editing
  const childProfile = childId ? childProfiles.find(child => child.id === childId) : null;
  
  // State
  const [displayName, setDisplayName] = useState(childProfile?.displayName || '');
  const [age, setAge] = useState(childProfile?.age ? childProfile.age.toString() : '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle save child profile
  const handleSaveChild = async () => {
    // Validate inputs
    if (!displayName) {
      Alert.alert('Error', 'Please enter child\'s name');
      return;
    }
    
    if (!age || isNaN(parseInt(age, 10))) {
      Alert.alert('Error', 'Please enter a valid age');
      return;
    }
    
    const ageNum = parseInt(age, 10);
    if (ageNum < 1 || ageNum > 12) {
      Alert.alert('Error', 'Age must be between 1 and 12');
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const childData = {
        displayName,
        age: ageNum,
      };
      
      if (childProfile) {
        // Update existing child
        await updateChildProfile(childId, childData);
        Alert.alert('Success', 'Child profile updated successfully');
      } else {
        // Add new child
        await addChildProfile(childData);
        Alert.alert('Success', 'Child profile added successfully');
      }
      
      navigation.goBack();
    } catch (error) {
      Alert.alert('Save Failed', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {childProfile ? 'Edit Child Profile' : 'Add Child Profile'}
      </Text>
      
      <View style={styles.avatarContainer}>
        {childProfile?.photoURL ? (
          <Image source={{ uri: childProfile.photoURL }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {displayName ? displayName.charAt(0).toUpperCase() : 'C'}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{STRINGS.ONBOARDING.CHILD_NAME}</Text>
        <TextInput
          style={styles.input}
          value={displayName}
          onChangeText={setDisplayName}
          placeholder="Child's name"
          autoCapitalize="words"
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>{STRINGS.ONBOARDING.CHILD_AGE}</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Age (4-7 recommended)"
          keyboardType="number-pad"
          maxLength={2}
        />
      </View>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleSaveChild}
        disabled={isSubmitting || loading}
      >
        {isSubmitting ? (
          <ActivityIndicator color={COLORS.textLight} />
        ) : (
          <Text style={styles.buttonText}>
            {childProfile ? 'Save Changes' : 'Add Child'}
          </Text>
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
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  avatarText: {
    color: COLORS.textLight,
    fontSize: 36,
    fontWeight: 'bold',
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

export default ChildProfileForm;
