/**
 * Main App.js with complete navigation setup for NepaliJets app
 * Integrates authentication, profile, and navigation systems
 */
import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import { ProfileProvider } from './src/context/ProfileContext';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/constants/colors';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ProfileProvider>
          <StatusBar style="auto" backgroundColor={COLORS.background} />
          <AppNavigator />
        </ProfileProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
