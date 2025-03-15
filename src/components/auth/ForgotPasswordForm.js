/**
 * ForgotPassword Form Component for NepaliJets app
 * Handles password reset requests
 */

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { COLORS } from '../../constants/colors';
import { STRINGS } from '../../constants/strings';

const ForgotPasswordForm = ({ navigation }) => {
  // State
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  // Auth context
  const { resetPassword, error } = useAuth();
  
  // Handle password reset
  const handleResetPassword = async () => {
    // Validate email
    if (!email) {
      Alert.alert('Error', 'Please enter your email address');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await resetPassword(email);
      setResetSent(true);
      Alert.alert(
        'Reset Email Sent',
        'Check your email for instructions to reset your password',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate(STRINGS.AUTH.LOGIN)
          }
        ]
      );
    } catch (error) {
      Alert.alert('Reset Failed', error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Handle back to login
  const handleBackToLogin = () => {
    navigation.navigate(STRINGS.AUTH.LOGIN);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{STRINGS.AUTH.RESET_PASSWORD}</Text>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
      
      {resetSent ? (
        <View style={styles.successContainer}>
          <Text style={styles.successText}>
            Password reset email has been sent to {email}.
            Please check your inbox and follow the instructions.
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.instructions}>
            Enter your email address and we'll send you instructions to reset your password.
          </Text>
          
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
          
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleResetPassword}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <ActivityIndicator color={COLORS.textLight} />
            ) : (
              <Text style={styles.buttonText}>{STRINGS.AUTH.RESET_PASSWORD}</Text>
            )}
          </TouchableOpacity>
        </>
      )}
      
      <TouchableOpacity 
        style={styles.backContainer} 
        onPress={handleBackToLogin}
      >
        <Text style={styles.backText}>Back to Login</Text>
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
  instructions: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 24,
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
  backContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  backText: {
    color: COLORS.primary,
    fontSize: 14,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: 16,
    textAlign: 'center',
  },
  successContainer: {
    backgroundColor: COLORS.success + '20', // 20% opacity
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  successText: {
    color: COLORS.success,
    textAlign: 'center',
  },
});

export default ForgotPasswordForm;
