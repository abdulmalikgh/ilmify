import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function SignInScreen({ onBack, onSignUpPress, onForgotPassword, onSuccess }) {
  const [formData, setFormData] = useState({
    emailOrUsername: 'musah.abdulmalikgh@gmail.com',
    password: 'Kakalika@2025'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [attemptCount, setAttemptCount] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    if (isLocked && lockTimer > 0) {
      const timer = setTimeout(() => {
        setLockTimer((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            setAttemptCount(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLocked, lockTimer]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.emailOrUsername.trim()) {
      newErrors.emailOrUsername = 'Email or username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (isLocked) {
      Alert.alert(
        'Too Many Attempts',
        `Please try again in ${Math.floor(lockTimer / 60)}:${(lockTimer % 60).toString().padStart(2, '0')}`
      );
      return;
    }

    if (!validateForm()) return;

    // Demo authentication - check against specific credentials
    const validEmail = 'musah.abdulmalikgh@gmail.com';
    const validUsername = 'abdulmalikgh@gmail.com';
    const validPassword = 'Kakalika@2025';

    const isValidUser = (
      (formData.emailOrUsername === validEmail || formData.emailOrUsername === validUsername) &&
      formData.password === validPassword
    );

    if (!isValidUser) {
      const newAttemptCount = attemptCount + 1;
      setAttemptCount(newAttemptCount);

      if (newAttemptCount >= 5) {
        setIsLocked(true);
        setLockTimer(300); // 5 minutes
        Alert.alert(
          'Too Many Attempts',
          'Too many failed attempts. Please try again in 5 minutes.'
        );
        return;
      }

      setErrors({ general: 'Incorrect email or password' });
      return;
    }

    // Success
    console.log('Sign in successful:', formData);
    onSuccess?.({
      email: validEmail,
      username: 'abdulmalikgh',
      fullName: 'Abdul-Malik Musah'
    });
  };

  const handleSocialSignIn = (provider) => {
    // TODO: Implement social sign-in
    console.log('Sign in with', provider);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Welcome Back</Text>
        <View style={{ width: 40 }} />
      </View>

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Greeting */}
        <View style={styles.greetingSection}>
          <Text style={styles.greeting}>As-salamu alaykum</Text>
          <Text style={styles.subGreeting}>Sign in to continue</Text>
        </View>

        {/* General Error */}
        {errors.general && (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle" size={20} color="#ff4444" />
            <Text style={styles.errorBannerText}>{errors.general}</Text>
          </View>
        )}

        {/* Email or Username */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email or Username</Text>
          <TextInput
            style={[styles.input, errors.emailOrUsername && styles.inputError]}
            placeholder="Enter your email or username"
            placeholderTextColor="#99A89F"
            value={formData.emailOrUsername}
            onChangeText={(text) => {
              setFormData({ ...formData, emailOrUsername: text });
              setErrors({});
            }}
            autoCapitalize="none"
            editable={!isLocked}
          />
          {errors.emailOrUsername && (
            <Text style={styles.errorText}>{errors.emailOrUsername}</Text>
          )}
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <View style={styles.labelRow}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity onPress={onForgotPassword}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="Enter your password"
              placeholderTextColor="#99A89F"
              value={formData.password}
              onChangeText={(text) => {
                setFormData({ ...formData, password: text });
                setErrors({});
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              editable={!isLocked}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.inputIcon}
            >
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#99A89F" />
            </TouchableOpacity>
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          style={[styles.submitButton, isLocked && styles.submitButtonDisabled]}
          onPress={handleSignIn}
          disabled={isLocked}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>
            {isLocked ? `Locked (${Math.floor(lockTimer / 60)}:${(lockTimer % 60).toString().padStart(2, '0')})` : 'Sign In'}
          </Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or continue with</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Sign-In */}
        <View style={styles.socialButtons}>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialSignIn('google')}
          >
            <Ionicons name="logo-google" size={20} color="#DB4437" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.socialButton}
            onPress={() => handleSocialSignIn('apple')}
          >
            <Ionicons name="logo-apple" size={20} color="#000000" />
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <TouchableOpacity onPress={onSignUpPress} style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text style={styles.footerLink}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 16,
    backgroundColor: '#2D5F3F',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  greetingSection: {
    marginBottom: 32,
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 8,
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },
  errorBannerText: {
    color: '#ff4444',
    fontSize: 14,
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  forgotPassword: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2D5F3F',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  inputError: {
    borderColor: '#ff4444',
  },
  inputWithIcon: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
  },
  errorText: {
    color: '#ff4444',
    fontSize: 12,
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#D4AF37',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  submitButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  submitButtonText: {
    color: '#1B3A2B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#999',
    fontSize: 14,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  footer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerLink: {
    color: '#D4AF37',
    fontWeight: '600',
  },
});
