import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function EmailVerificationScreen({ email, onBack, onVerified }) {
  const [resendCountdown, setResendCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Countdown timer
    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleResend = () => {
    if (!canResend) return;

    // TODO: Implement actual resend logic
    console.log('Resending verification email to:', email);

    // Reset countdown
    setCanResend(false);
    setResendCountdown(60);

    // Restart timer
    const timer = setInterval(() => {
      setResendCountdown((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOpenEmailApp = () => {
    // TODO: Implement opening email app
    console.log('Opening email app...');
    // For demo purposes, simulate verification after 2 seconds
    setTimeout(() => {
      alert('Email verified successfully!');
      onVerified?.();
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {/* Email Icon Illustration */}
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Ionicons name="mail-outline" size={80} color="#D4AF37" />
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>Verify Your Email</Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
          We've sent a verification link to
        </Text>
        <Text style={styles.email}>{email}</Text>
        <Text style={styles.description}>
          Click the link in the email to verify your account
        </Text>

        {/* Open Email App Button */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleOpenEmailApp}
          activeOpacity={0.8}
        >
          <Ionicons name="mail-open" size={20} color="#1B3A2B" style={styles.buttonIcon} />
          <Text style={styles.primaryButtonText}>Open Email App</Text>
        </TouchableOpacity>

        {/* Resend Email */}
        <TouchableOpacity
          style={[styles.resendButton, !canResend && styles.resendButtonDisabled]}
          onPress={handleResend}
          disabled={!canResend}
          activeOpacity={0.6}
        >
          {canResend ? (
            <Text style={styles.resendText}>Resend Email</Text>
          ) : (
            <Text style={styles.resendText}>
              Resend in {resendCountdown}s
            </Text>
          )}
        </TouchableOpacity>

        {/* Wrong Email Link */}
        <TouchableOpacity onPress={onBack} style={styles.backLink}>
          <Text style={styles.backLinkText}>Wrong email? Go back</Text>
        </TouchableOpacity>

      </Animated.View>

      {/* Footer Note */}
      <View style={styles.footer}>
        <Ionicons name="information-circle-outline" size={16} color="#999" />
        <Text style={styles.footerText}>
          Check your spam folder if you don't see the email
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#D4AF37',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 32,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: 24,
  },
  buttonIcon: {
    marginRight: 8,
  },
  primaryButtonText: {
    color: '#1B3A2B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resendButton: {
    paddingVertical: 12,
    marginBottom: 16,
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendText: {
    color: '#D4AF37',
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    paddingVertical: 8,
  },
  backLinkText: {
    color: '#999',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 20,
    gap: 8,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    flex: 1,
  },
});
