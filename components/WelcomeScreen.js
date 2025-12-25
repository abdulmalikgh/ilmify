import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { useEffect, useRef } from 'react';

export default function WelcomeScreen({ onSignIn, onCreateAccount, onContinueAsGuest }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View style={styles.container}>
      {/* Subtle Background Pattern */}
      <View style={styles.backgroundPattern}>
        <View style={[styles.patternCircle, { top: 80, right: 40 }]} />
        <View style={[styles.patternSquare, { bottom: 120, left: 30 }]} />
        <View style={[styles.patternCircle, { top: '45%', left: 40, width: 50, height: 50 }]} />
      </View>

      {/* Main Content */}
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Text style={styles.arabicText}>إِلْمِفَايْ</Text>
          <Text style={styles.appName}>ILMIFY</Text>
          <Text style={styles.tagline}>Learn. Share. Compete.</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {/* Sign In Button - Primary */}
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={onSignIn}
            activeOpacity={0.8}
          >
            <Text style={styles.primaryButtonText}>Sign In</Text>
          </TouchableOpacity>

          {/* Create Account Button - Secondary */}
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onCreateAccount}
            activeOpacity={0.8}
          >
            <Text style={styles.secondaryButtonText}>Create Account</Text>
          </TouchableOpacity>

          {/* Continue as Guest Link */}
          <TouchableOpacity
            onPress={onContinueAsGuest}
            activeOpacity={0.6}
            style={styles.guestLinkContainer}
          >
            <Text style={styles.guestLink}>Continue as Guest</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Footer */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <Text style={styles.footerText}>
          In the name of Allah, the Most Gracious, the Most Merciful
        </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2D5F3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundPattern: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.08,
  },
  patternCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  patternSquare: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: '#E8F5E9',
    transform: [{ rotate: '45deg' }],
  },
  content: {
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  arabicText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: 8,
  },
  appName: {
    fontSize: 44,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 6,
    marginBottom: 16,
  },
  tagline: {
    fontSize: 18,
    color: '#E8F5E9',
    letterSpacing: 1,
    fontWeight: '300',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  primaryButton: {
    width: '100%',
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  primaryButtonText: {
    color: '#1B3A2B',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    width: '100%',
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  secondaryButtonText: {
    color: '#D4AF37',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  guestLinkContainer: {
    paddingVertical: 8,
  },
  guestLink: {
    color: '#A5D6A7',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#E8F5E9',
    textAlign: 'center',
    opacity: 0.8,
  },
});
