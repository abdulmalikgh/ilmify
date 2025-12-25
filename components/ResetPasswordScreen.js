import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ResetPasswordScreen({ onSuccess }) {
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validation, setValidation] = useState({
    passwordStrength: 0,
    passwordsMatch: null
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Password strength calculation
  useEffect(() => {
    const strength = calculatePasswordStrength(formData.newPassword);
    setValidation(prev => ({ ...prev, passwordStrength: strength }));
  }, [formData.newPassword]);

  // Password match validation
  useEffect(() => {
    if (formData.confirmPassword.length === 0) {
      setValidation(prev => ({ ...prev, passwordsMatch: null }));
      return;
    }
    setValidation(prev => ({
      ...prev,
      passwordsMatch: formData.newPassword === formData.confirmPassword
    }));
  }, [formData.newPassword, formData.confirmPassword]);

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

    if (!formData.newPassword) {
      newErrors.newPassword = 'Password is required';
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
    } else if (!validation.passwordsMatch) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    // TODO: Replace with actual API call
    setTimeout(() => {
      console.log('Password reset successful');
      setIsSubmitting(false);

      Alert.alert(
        'Success',
        'Your password has been reset successfully!',
        [
          {
            text: 'OK',
            onPress: () => onSuccess?.()
          }
        ]
      );
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Icon */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="lock-closed" size={60} color="#D4AF37" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Reset Password</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Create a new password for your account
        </Text>

        {/* New Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>New Password *</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[styles.input, errors.newPassword && styles.inputError]}
              placeholder="Enter new password"
              placeholderTextColor="#99A89F"
              value={formData.newPassword}
              onChangeText={(text) => {
                setFormData({ ...formData, newPassword: text });
                setErrors({});
              }}
              secureTextEntry={!showNewPassword}
              autoCapitalize="none"
              editable={!isSubmitting}
            />
            <TouchableOpacity
              onPress={() => setShowNewPassword(!showNewPassword)}
              style={styles.inputIcon}
            >
              <Ionicons name={showNewPassword ? "eye-off" : "eye"} size={20} color="#99A89F" />
            </TouchableOpacity>
          </View>
          {errors.newPassword && <Text style={styles.errorText}>{errors.newPassword}</Text>}

          {/* Password Strength Indicator */}
          {formData.newPassword.length > 0 && (
            <View style={styles.passwordStrength}>
              <View style={styles.strengthBarContainer}>
                <View
                  style={[
                    styles.strengthBar,
                    {
                      width: `${(validation.passwordStrength / 3) * 100}%`,
                      backgroundColor: getPasswordStrengthColor()
                    }
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
              <Ionicons
                name={formData.newPassword.length >= 8 ? "checkmark" : "close"}
                size={12}
                color={formData.newPassword.length >= 8 ? "#00cc44" : "#999"}
              />
              {' '}At least 8 characters
            </Text>
            <Text style={styles.hintText}>
              <Ionicons
                name={/[0-9]/.test(formData.newPassword) ? "checkmark" : "close"}
                size={12}
                color={/[0-9]/.test(formData.newPassword) ? "#00cc44" : "#999"}
              />
              {' '}Contains a number
            </Text>
            <Text style={styles.hintText}>
              <Ionicons
                name={/[A-Z]/.test(formData.newPassword) ? "checkmark" : "close"}
                size={12}
                color={/[A-Z]/.test(formData.newPassword) ? "#00cc44" : "#999"}
              />
              {' '}Contains uppercase letter
            </Text>
          </View>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm New Password *</Text>
          <View style={styles.inputWithIcon}>
            <TextInput
              style={[styles.input, errors.confirmPassword && styles.inputError]}
              placeholder="Confirm new password"
              placeholderTextColor="#99A89F"
              value={formData.confirmPassword}
              onChangeText={(text) => {
                setFormData({ ...formData, confirmPassword: text });
                setErrors({});
              }}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              editable={!isSubmitting}
            />
            <TouchableOpacity
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              style={styles.inputIcon}
            >
              <Ionicons name={showConfirmPassword ? "eye-off" : "eye"} size={20} color="#99A89F" />
            </TouchableOpacity>
          </View>
          {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}
          {validation.passwordsMatch === true && (
            <Text style={styles.successText}>Passwords match!</Text>
          )}
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
          activeOpacity={0.8}
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Resetting Password...' : 'Reset Password'}
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
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  inputGroup: {
    width: '100%',
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
    width: '100%',
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
});
