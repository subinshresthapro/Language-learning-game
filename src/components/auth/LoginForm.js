/**
 * Login Form Component for NepaliJets app
 * Handles user login with email and password
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';

const LoginForm = ({ navigation }) => {
  // State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Auth context
  const { login, error } = useAuth();
  
  // Handle login
  const handleLogin = async () => {
    // Validate inputs
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await login(email, password);
      // Navigation will be handled by the auth state listener in AuthContext
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle forgot password
  const handleForgotPassword = () => {
    navigation.navigate(STRINGS.AUTH.FORGOT_PASSWORD);
  };
  
  // Handle register
  const handleRegister = () => {
    navigation.navigate(STRINGS.AUTH.REGISTER);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{STRINGS.AUTH.LOGIN}</Text>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
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
      
      <TouchableOpacity 
        style={styles.forgotPasswordContainer} 
        onPress={handleForgotPassword}
      >
        <Text style={styles.forgotPasswordText}>{STRINGS.AUTH.FORGOT_PASSWORD}</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleLogin}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color={COLORS.textLight} />
        ) : (
          <Text style={styles.buttonText}>{STRINGS.AUTH.LOGIN}</Text>
        )}
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.registerContainer} 
        onPress={handleRegister}
      >
        <Text style={styles.registerText}>{STRINGS.AUTH.DONT_HAVE_ACCOUNT}</Text>
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
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontSize: 14,
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
  registerContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  registerText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default LoginForm;
