/**
 * Profile Screen for NepaliJets app
 * Displays user profile information and options
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';
import { USER_TYPES } from '../../models/UserProfile';

const ProfileScreen = ({ navigation }) => {
  const { logout } = useAuth();
  const { userProfile, childProfiles, loading } = useProfile();
  
  // Handle edit profile
  const handleEditProfile = () => {
    navigation.navigate('EditProfile');
  };
  
  // Handle add child
  const handleAddChild = () => {
    navigation.navigate('AddChild');
  };
  
  // Handle edit child
  const handleEditChild = (childId) => {
    navigation.navigate('EditChild', { childId });
  };
  
  // Handle switch to child
  const handleSwitchToChild = (childId) => {
    navigation.navigate('ChildDashboard', { childId });
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.profileHeader}>
            {userProfile?.photoURL ? (
              <Image source={{ uri: userProfile.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarText}>
                  {userProfile?.displayName ? userProfile.displayName.charAt(0).toUpperCase() : 'U'}
                </Text>
              </View>
            )}
            
            <Text style={styles.displayName}>
              {userProfile?.displayName || 'User'}
            </Text>
            
            <Text style={styles.accountType}>
              {userProfile?.accountType === USER_TYPES.PARENT ? 'Parent Account' : 'Child Account'}
            </Text>
            
            <TouchableOpacity 
              style={styles.editButton} 
              onPress={handleEditProfile}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
          
          {userProfile?.accountType === USER_TYPES.PARENT && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Child Profiles</Text>
                <TouchableOpacity onPress={handleAddChild}>
                  <Text style={styles.addButtonText}>+ Add Child</Text>
                </TouchableOpacity>
              </View>
              
              {childProfiles.length === 0 ? (
                <View style={styles.emptyState}>
                  <Text style={styles.emptyStateText}>
                    No child profiles yet. Add a child to get started!
                  </Text>
                </View>
              ) : (
                childProfiles.map((child) => (
                  <View key={child.id} style={styles.childCard}>
                    <View style={styles.childInfo}>
                      <View style={styles.childAvatarContainer}>
                        {child.photoURL ? (
                          <Image source={{ uri: child.photoURL }} style={styles.childAvatar} />
                        ) : (
                          <View style={styles.childAvatarPlaceholder}>
                            <Text style={styles.childAvatarText}>
                              {child.displayName ? child.displayName.charAt(0).toUpperCase() : 'C'}
                            </Text>
                          </View>
                        )}
                      </View>
                      <View>
                        <Text style={styles.childName}>{child.displayName}</Text>
                        <Text style={styles.childAge}>Age: {child.age}</Text>
                      </View>
                    </View>
                    
                    <View style={styles.childActions}>
                      <TouchableOpacity 
                        style={styles.childActionButton} 
                        onPress={() => handleEditChild(child.id)}
                      >
                        <Text style={styles.childActionButtonText}>Edit</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        style={[styles.childActionButton, styles.switchButton]} 
                        onPress={() => handleSwitchToChild(child.id)}
                      >
                        <Text style={styles.switchButtonText}>Switch</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ))
              )}
            </View>
          )}
          
          {userProfile?.accountType === USER_TYPES.CHILD && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Learning Progress</Text>
              <View style={styles.progressContainer}>
                <View style={styles.progressItem}>
                  <Text style={styles.progressLabel}>Level</Text>
                  <Text style={styles.progressValue}>
                    {userProfile?.learningProgress?.level || 'Beginner'}
                  </Text>
                </View>
                
                <View style={styles.progressItem}>
                  <Text style={styles.progressLabel}>XP</Text>
                  <Text style={styles.progressValue}>
                    {userProfile?.learningProgress?.xp || '0'}
                  </Text>
                </View>
                
                <View style={styles.progressItem}>
                  <Text style={styles.progressLabel}>Lessons</Text>
                  <Text style={styles.progressValue}>
                    {userProfile?.learningProgress?.lessonsCompleted || '0'}
                  </Text>
                </View>
              </View>
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
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
  displayName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  accountType: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 16,
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: COLORS.primary,
  },
  editButtonText: {
    color: COLORS.textLight,
    fontWeight: '500',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
  },
  addButtonText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  emptyState: {
    padding: 20,
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    alignItems: 'center',
  },
  emptyStateText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  childCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...COLORS.shadow,
  },
  childInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  childAvatarContainer: {
    marginRight: 12,
  },
  childAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  childAvatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  childAvatarText: {
    color: COLORS.textLight,
    fontSize: 20,
    fontWeight: 'bold',
  },
  childName: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.textPrimary,
    marginBottom: 4,
  },
  childAge: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  childActions: {
    flexDirection: 'row',
  },
  childActionButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: COLORS.background,
    marginLeft: 8,
  },
  childActionButtonText: {
    color: COLORS.textPrimary,
    fontSize: 12,
    fontWeight: '500',
  },
  switchButton: {
    backgroundColor: COLORS.primary,
  },
  switchButtonText: {
    color: COLORS.textLight,
    fontSize: 12,
    fontWeight: '500',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.cardBackground,
    borderRadius: 8,
    padding: 16,
  },
  progressItem: {
    alignItems: 'center',
    flex: 1,
  },
  progressLabel: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  progressValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  logoutButton: {
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.error,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: COLORS.error,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default ProfileScreen;
