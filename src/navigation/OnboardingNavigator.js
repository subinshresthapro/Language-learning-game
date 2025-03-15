/**
 * Onboarding Navigator for NepaliJets app
 * Handles the onboarding flow for new users
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colors';
import { STRINGS } from '../constants/strings';
import { ROUTES } from '../constants/routes';

// Placeholder Onboarding Screens
// These will be implemented in future modules

const WelcomeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <View style={styles.logoPlaceholder}>
        <Text style={styles.logoText}>NepaliJets</Text>
      </View>
      
      <Text style={styles.title}>{STRINGS.ONBOARDING.WELCOME}</Text>
      <Text style={styles.subtitle}>{STRINGS.ONBOARDING.WELCOME_SUBTITLE}</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate(ROUTES.ONBOARDING.USER_TYPE)}
      >
        <Text style={styles.buttonText}>{STRINGS.ONBOARDING.GET_STARTED}</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const UserTypeScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>{STRINGS.ONBOARDING.USER_TYPE}</Text>
      
      <TouchableOpacity 
        style={[styles.optionButton, styles.parentButton]}
        onPress={() => navigation.navigate(ROUTES.ONBOARDING.PARENT_INFO)}
      >
        <Text style={styles.optionButtonText}>{STRINGS.ONBOARDING.PARENT}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.optionButton, styles.childButton]}
        onPress={() => navigation.navigate(ROUTES.ONBOARDING.CHILD_INFO)}
      >
        <Text style={styles.optionButtonText}>{STRINGS.ONBOARDING.CHILD}</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const ParentInfoScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>{STRINGS.ONBOARDING.PARENT_INFO}</Text>
      <Text style={styles.subtitle}>Set up your parent account to manage your child's learning journey</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate(ROUTES.ONBOARDING.TUTORIAL)}
      >
        <Text style={styles.buttonText}>{STRINGS.ONBOARDING.NEXT}</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const ChildInfoScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>{STRINGS.ONBOARDING.CHILD_INFO}</Text>
      <Text style={styles.subtitle}>Tell us about yourself so we can personalize your learning adventure</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate(ROUTES.ONBOARDING.TUTORIAL)}
      >
        <Text style={styles.buttonText}>{STRINGS.ONBOARDING.NEXT}</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const TutorialScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.content}>
      <Text style={styles.title}>{STRINGS.ONBOARDING.TUTORIAL_TITLE}</Text>
      <Text style={styles.subtitle}>{STRINGS.ONBOARDING.TUTORIAL_SUBTITLE}</Text>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>{STRINGS.ONBOARDING.GET_STARTED}</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

// Create stack navigator
const Stack = createStackNavigator();

const OnboardingNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.ONBOARDING.WELCOME}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: COLORS.background },
      }}
    >
      <Stack.Screen name={ROUTES.ONBOARDING.WELCOME} component={WelcomeScreen} />
      <Stack.Screen name={ROUTES.ONBOARDING.USER_TYPE} component={UserTypeScreen} />
      <Stack.Screen name={ROUTES.ONBOARDING.PARENT_INFO} component={ParentInfoScreen} />
      <Stack.Screen name={ROUTES.ONBOARDING.CHILD_INFO} component={ChildInfoScreen} />
      <Stack.Screen name={ROUTES.ONBOARDING.TUTORIAL} component={TutorialScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  logoText: {
    color: COLORS.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.textPrimary,
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: COLORS.button,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 16,
  },
  buttonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  optionButton: {
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    marginBottom: 16,
  },
  parentButton: {
    backgroundColor: COLORS.primary,
  },
  childButton: {
    backgroundColor: COLORS.secondary,
  },
  optionButtonText: {
    color: COLORS.textLight,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default OnboardingNavigator;
