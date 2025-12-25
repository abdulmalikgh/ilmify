import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function SignUpScreen({ onBack, onSignInPress, onSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [validation, setValidation] = useState({
    usernameAvailable: null, // null | true | false
    usernameChecking: false,
    emailValid: null,
    passwordStrength: 0, // 0-3
    passwordsMatch: null
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Debounced username availability check
  useEffect(() => {
    if (formData.username.length < 3) {
      setValidation(prev => ({ ...prev, usernameAvailable: null, usernameChecking: false }));
      return;
    }

    setValidation(prev => ({ ...prev, usernameChecking: true }));

    const timer = setTimeout(() => {
      // TODO: Replace with actual API call
      checkUsernameAvailability(formData.username);
    }, 500);

    return () => clearTimeout(timer);
  }, [formData.username]);

  // Email validation
  useEffect(() => {
    if (formData.email.length === 0) {
      setValidation(prev => ({ ...prev, emailValid: null }));
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidation(prev => ({ ...prev, emailValid: emailRegex.test(formData.email) }));
  }, [formData.email]);

  // Password strength
  useEffect(() => {
    const strength = calculatePasswordStrength(formData.password);
    setValidation(prev => ({ ...prev, passwordStrength: strength }));
  }, [formData.password]);

  // Password match
  useEffect(() => {
    if (formData.confirmPassword.length === 0) {
      setValidation(prev => ({ ...prev, passwordsMatch: null }));
      return;
    }
    setValidation(prev => ({
      ...prev,
      passwordsMatch: formData.password === formData.confirmPassword
    }));
  }, [formData.password, formData.confirmPassword]);

  const checkUsernameAvailability = (username) => {
    // Simulate API call - replace with actual implementation
    setTimeout(() => {
      const isAvailable = !['admin', 'test', 'user'].includes(username.toLowerCase());
      setValidation(prev => ({
        ...prev,
        usernameAvailable: isAvailable,
        usernameChecking: false
      }));
    }, 300);
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return Math.min(strength, 3);
  };

  const getPasswordStrengthText = () => {
    const texts = ['Weak', 'Fair', 'Good', 'Strong'];
    return texts[validation.passwordStrength] || '';
  };

  const getPasswordStrengthColor = () => {
    const colors = ['#ff4444', '#ffaa00', '#88cc00', '#00cc44'];
    return colors[validation.passwordStrength] || '#cccccc';
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    else if (!validation.usernameAvailable) newErrors.username = 'Username is not available';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validation.emailValid) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm password';
    else if (!validation.passwordsMatch) newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // TODO: Replace with actual API call
      console.log('Form submitted:', formData);
      onSuccess?.(formData);
    }
  };

  const handleSocialSignUp = (provider) => {
    // TODO: Implement social sign-up
    console.log('Sign up with', provider);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Account</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* Full Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={[styles.input, errors.fullName && styles.inputError]}
              placeholder="Enter your full name"
              placeholderTextColor="#99A89F"
              value={formData.fullName}
              onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            />
            {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}
          </View>

          {/* Username */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username *</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, errors.username && styles.inputError]}
                placeholder="Choose a username"
                placeholderTextColor="#99A89F"
                value={formData.username}
                onChangeText={(text) => setFormData({ ...formData, username: text.toLowerCase() })}
                autoCapitalize="none"
              />
              {validation.usernameChecking && (
                <ActivityIndicator size="small" color="#D4AF37" style={styles.inputIcon} />
              )}
              {!validation.usernameChecking && validation.usernameAvailable === true && (
                <Ionicons name="checkmark-circle" size={20} color="#00cc44" style={styles.inputIcon} />
              )}
              {!validation.usernameChecking && validation.usernameAvailable === false && (
                <Ionicons name="close-circle" size={20} color="#ff4444" style={styles.inputIcon} />
              )}
            </View>
            {errors.username && <Text style={styles.errorText}>{errors.username}</Text>}
            {validation.usernameAvailable === true && (
              <Text style={styles.successText}>Username is available!</Text>
            )}
          </View>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email Address *</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="Enter your email"
                placeholderTextColor="#99A89F"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {validation.emailValid === true && (
                <Ionicons name="checkmark-circle" size={20} color="#00cc44" style={styles.inputIcon} />
              )}
              {validation.emailValid === false && (
                <Ionicons name="close-circle" size={20} color="#ff4444" style={styles.inputIcon} />
              )}
            </View>
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password *</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Create a password"
                placeholderTextColor="#99A89F"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.inputIcon}>
                <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#99A89F" />
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            {/* Password Strength Indicator */}
            {formData.password.length > 0 && (
              <View style={styles.passwordStrength}>
                <View style={styles.strengthBarContainer}>
                  <View
                    style={[
                      styles.strengthBar,
                      { width: `${(validation.passwordStrength / 3) * 100}%`, backgroundColor: getPasswordStrengthColor() }
                    ]}
                  />
                </View>
                <Text style={[styles.strengthText, { color: getPasswordStrengthColor() }]}>
                  {getPasswordStrengthText()}
                </Text>
              </View>
            )}

            {/* Password Requirements */}
            <View style={styles.passwordHints}>
              <Text style={styles.hintText}>
                <Ionicons name={formData.password.length >= 8 ? "checkmark" : "close"} size={12}
                  color={formData.password.length >= 8 ? "#00cc44" : "#999"} />
                {' '}At least 8 characters
              </Text>
              <Text style={styles.hintText}>
                <Ionicons name={/[0-9]/.test(formData.password) ? "checkmark" : "close"} size={12}
                  color={/[0-9]/.test(formData.password) ? "#00cc44" : "#999"} />
                {' '}Contains a number
              </Text>
              <Text style={styles.hintText}>
                <Ionicons name={/[A-Z]/.test(formData.password) ? "checkmark" : "close"} size={12}
                  color={/[A-Z]/.test(formData.password) ? "#00cc44" : "#999"} />
                {' '}Contains uppercase letter
              </Text>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password *</Text>
            <View style={styles.inputWithIcon}>
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError]}
                placeholder="Confirm your password"
                placeholderTextColor="#99A89F"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.inputIcon}>
                <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#99A89F" />
              </TouchableOpacity>
            </View>
            {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
            {validation.passwordsMatch === true && (
              <Text style={styles.successText}>Passwords match!</Text>
            )}
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or continue with</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Sign-Up */}
          <View style={styles.socialButtons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialSignUp('google')}
            >
              <Ionicons name="logo-google" size={20} color="#DB4437" />
              <Text style={styles.socialButtonText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => handleSocialSignUp('apple')}
            >
              <Ionicons name="logo-apple" size={20} color="#000000" />
              <Text style={styles.socialButtonText}>Apple</Text>
            </TouchableOpacity>
          </View>

          {/* Terms */}
          <Text style={styles.termsText}>
            By signing up, you agree to our{' '}
            <Text style={styles.termsLink}>Terms of Service</Text>
            {' '}and{' '}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>

          {/* Footer */}
          <TouchableOpacity onPress={onSignInPress} style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.footerLink}>Sign In</Text>
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 8,
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
  successText: {
    color: '#00cc44',
    fontSize: 12,
    marginTop: 4,
  },
  passwordStrength: {
    marginTop: 8,
  },
  strengthBarContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  strengthBar: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '600',
  },
  passwordHints: {
    marginTop: 8,
  },
  hintText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
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
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  termsLink: {
    color: '#2D5F3F',
    fontWeight: '600',
    textDecorationLine: 'underline',
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
