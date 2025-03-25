/**
 * Register Form Component for NepaliJets app
 * Handles user registration with email and password
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';

const RegisterForm = ({ navigation }) => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [accountType, setAccountType] = useState('parent'); // Default to parent
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Auth context
  const { register, error } = useAuth();
  
  // Handle registration
  const handleRegister = async () => {
    // Validate inputs
    if (!email || !password || !confirmPassword || !name) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await register(email, password, {
        displayName: name,
        accountType,
        createdAt: new Date(),
      });
      // Navigation will be handled by the auth state listener in AuthContext
    } catch (error) {
      Alert.alert('Registration Failed', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle login navigation
  const handleLoginNavigation = () => {
    navigation.navigate(STRINGS.AUTH.LOGIN);
  };
  
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{STRINGS.AUTH.REGISTER}</Text>
        
        {error && <Text style={styles.errorText}>{error}</Text>}
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            autoCapitalize="words"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{STRINGS.AUTH.EMAIL}</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="example@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{STRINGS.AUTH.PASSWORD}</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="********"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{STRINGS.AUTH.CONFIRM_PASSWORD}</Text>
          <TextInput
            style={styles.input}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            placeholder="********"
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        
        <View style={styles.accountTypeContainer}>
          <Text style={styles.label}>{STRINGS.ONBOARDING.USER_TYPE}</Text>
          <View style={styles.accountTypeButtons}>
            <TouchableOpacity
              style={[
                styles.accountTypeButton,
                accountType === 'parent' && styles.accountTypeButtonActive
              ]}
              onPress={() => setAccountType('parent')}
            >
              <Text 
                style={[
                  styles.accountTypeButtonText,
                  accountType === 'parent' && styles.accountTypeButtonTextActive
                ]}
              >
                {STRINGS.ONBOARDING.PARENT}
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.accountTypeButton,
                accountType === 'child' && styles.accountTypeButtonActive
              ]}
              onPress={() => setAccountType('child')}
            >
              <Text 
                style={[
                  styles.accountTypeButtonText,
                  accountType === 'child' && styles.accountTypeButtonTextActive
                ]}
              >
                {STRINGS.ONBOARDING.CHILD}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRegister}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color={COLORS.textLight} />
          ) : (
            <Text style={styles.buttonText}>{STRINGS.AUTH.CREATE_ACCOUNT}</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.loginContainer} 
          onPress={handleLoginNavigation}
        >
          <Text style={styles.loginText}>{STRINGS.AUTH.ALREADY_HAVE_ACCOUNT}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
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
  accountTypeContainer: {
    marginBottom: 20,
  },
  accountTypeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accountTypeButton: {
    flex: 1,
    backgroundColor: COLORS.cardBackground,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  accountTypeButtonActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  accountTypeButtonText: {
    color: COLORS.textPrimary,
    fontSize: 16,
  },
  accountTypeButtonTextActive: {
    color: COLORS.textLight,
    fontWeight: 'bold',
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
  loginContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  loginText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default RegisterForm;