/**
 * Login Screen for NepaliJets app
 * Contains login form and social sign-in options
 */

import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import LoginForm from '../../components/auth/LoginForm';
import SocialSignIn from '../../components/auth/SocialSignIn';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {/* Logo placeholder */}
          <View style={styles.logoContainer}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>NepaliJets</Text>
            </View>
          </View>
          
          <Text style={styles.welcomeText}>Welcome to NepaliJets!</Text>
          <Text style={styles.subtitleText}>Learn Nepali with rockets and airplanes</Text>
          
          <LoginForm navigation={navigation} />
          <SocialSignIn />
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: COLORS.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitleText: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 30,
    textAlign: 'center',
  },
});

export default LoginScreen;
