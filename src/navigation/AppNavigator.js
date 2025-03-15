/**
 * Navigation Routes for NepaliJets app
 * Defines all navigation routes and screens
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useProfile } from '../context/ProfileContext';
import { View, Text, ActivityIndicator } from 'react-native';
import { COLORS } from '../constants/colors';
import { ROUTES } from '../constants/routes';

// Auth Screens
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';

// Profile Screens
import ProfileScreen from '../screens/profile/ProfileScreen';

// Placeholder Screens
// These will be implemented in future modules
const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary }}>Welcome to NepaliJets!</Text>
    <Text style={{ color: COLORS.textSecondary, textAlign: 'center', marginTop: 10, marginHorizontal: 20 }}>
      The main game interface will be implemented in future modules.
      This is a placeholder for the home screen.
    </Text>
  </View>
);

const LearningScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary }}>Learning Modules</Text>
    <Text style={{ color: COLORS.textSecondary, textAlign: 'center', marginTop: 10, marginHorizontal: 20 }}>
      Nepali language learning modules will be implemented in future updates.
      This is a placeholder for the learning screen.
    </Text>
  </View>
);

const ProgressScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary }}>Learning Progress</Text>
    <Text style={{ color: COLORS.textSecondary, textAlign: 'center', marginTop: 10, marginHorizontal: 20 }}>
      Progress tracking features will be implemented in future updates.
      This is a placeholder for the progress screen.
    </Text>
  </View>
);

const SettingsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
    <Text style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.textPrimary }}>Settings</Text>
    <Text style={{ color: COLORS.textSecondary, textAlign: 'center', marginTop: 10, marginHorizontal: 20 }}>
      App settings and parental controls will be implemented in future updates.
      This is a placeholder for the settings screen.
    </Text>
  </View>
);

// Profile Edit Screens (Placeholders)
const EditProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
    <Text>Edit Profile Screen</Text>
    <Text>This will be connected to the ProfileEditForm component</Text>
  </View>
);

const AddChildScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
    <Text>Add Child Screen</Text>
    <Text>This will be connected to the ChildProfileForm component</Text>
  </View>
);

const EditChildScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
    <Text>Edit Child Screen</Text>
    <Text>This will be connected to the ChildProfileForm component</Text>
  </View>
);

// Create navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Navigator
const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.AUTH.LOGIN}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name={ROUTES.AUTH.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.AUTH.REGISTER} component={RegisterScreen} />
      <Stack.Screen name={ROUTES.AUTH.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName={ROUTES.APP.HOME}
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarStyle: {
          backgroundColor: COLORS.cardBackground,
          borderTopColor: COLORS.border,
        },
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.textLight,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name={ROUTES.APP.HOME} 
        component={HomeScreen} 
        options={{
          title: 'Home',
          // Icon would be added here in a real implementation
        }}
      />
      <Tab.Screen 
        name={ROUTES.LEARNING.MODULES} 
        component={LearningScreen} 
        options={{
          title: 'Learn',
          // Icon would be added here in a real implementation
        }}
      />
      <Tab.Screen 
        name={ROUTES.PROFILE.PROGRESS} 
        component={ProgressScreen} 
        options={{
          title: 'Progress',
          // Icon would be added here in a real implementation
        }}
      />
      <Tab.Screen 
        name={ROUTES.PROFILE.VIEW} 
        component={ProfileScreen} 
        options={{
          title: 'Profile',
          // Icon would be added here in a real implementation
        }}
      />
    </Tab.Navigator>
  );
};

// Profile Navigator
const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: COLORS.textLight,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name={ROUTES.PROFILE.VIEW} 
        component={MainTabNavigator} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="EditProfile" 
        component={EditProfileScreen} 
        options={{ title: 'Edit Profile' }}
      />
      <Stack.Screen 
        name="AddChild" 
        component={AddChildScreen} 
        options={{ title: 'Add Child' }}
      />
      <Stack.Screen 
        name="EditChild" 
        component={EditChildScreen} 
        options={{ title: 'Edit Child' }}
      />
      <Stack.Screen 
        name={ROUTES.APP.SETTINGS} 
        component={SettingsScreen} 
        options={{ title: 'Settings' }}
      />
    </Stack.Navigator>
  );
};

// Main App Navigator
const AppNavigator = () => {
  const { currentUser, loading: authLoading } = useAuth();
  const { loading: profileLoading } = useProfile();
  
  // Show loading screen while authentication is being checked
  if (authLoading || profileLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {currentUser ? (
          // User is signed in
          <Stack.Screen name="Main" component={ProfileNavigator} />
        ) : (
          // User is not signed in
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
