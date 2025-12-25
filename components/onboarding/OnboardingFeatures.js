import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FEATURES = [
  {
    id: 1,
    icon: 'chatbubbles',
    title: 'Ask & Answer',
    description: 'Share questions, learn from the community',
    color: '#4CAF50',
  },
  {
    id: 2,
    icon: 'bulb',
    title: 'Practice Quizzes',
    description: 'Test your knowledge anytime',
    color: '#D4AF37',
  },
  {
    id: 3,
    icon: 'trophy',
    title: 'Challenge Friends',
    description: 'Compete and climb the leaderboard',
    color: '#FF9800',
  },
];

export default function OnboardingFeatures({ onGetStarted }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FEATURES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const currentFeature = FEATURES[currentIndex];

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
        {/* Header */}
        <Text style={styles.title}>Here's what you can do</Text>

        {/* Feature Card */}
        <View style={styles.carouselContainer}>
          <View
            style={[
              styles.featureCard,
              { borderColor: currentFeature.color }
            ]}
          >
            <View style={[
              styles.iconContainer,
              { backgroundColor: currentFeature.color + '20' }
            ]}>
              <Ionicons
                name={currentFeature.icon}
                size={64}
                color={currentFeature.color}
              />
            </View>

            <Text style={styles.featureTitle}>{currentFeature.title}</Text>
            <Text style={styles.featureDescription}>
              {currentFeature.description}
            </Text>

            {/* Feature number badge */}
            <View style={[
              styles.badge,
              { backgroundColor: currentFeature.color }
            ]}>
              <Text style={styles.badgeText}>{currentFeature.id}</Text>
            </View>
          </View>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {FEATURES.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentIndex(index)}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.dot,
                    index === currentIndex && styles.dotActive,
                    index === currentIndex && { backgroundColor: currentFeature.color }
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* All Features List */}
        <View style={styles.featuresList}>
          {FEATURES.map((feature, index) => (
            <View
              key={feature.id}
              style={[
                styles.featureItem,
                index === currentIndex && styles.featureItemActive
              ]}
            >
              <Ionicons
                name={feature.icon}
                size={20}
                color={index === currentIndex ? feature.color : '#999'}
              />
              <Text style={[
                styles.featureItemText,
                index === currentIndex && { color: feature.color, fontWeight: '600' }
              ]}>
                {feature.title}
              </Text>
            </View>
          ))}
        </View>
      </Animated.View>

      {/* Get Started Button */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={onGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.getStartedButtonText}>Get Started</Text>
          <Ionicons name="checkmark-circle" size={24} color="#1B3A2B" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 32,
    textAlign: 'center',
  },
  carouselContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  featureCard: {
    width: width - 80,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    borderWidth: 3,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    position: 'relative',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  featureTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 12,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  badge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
  },
  dotActive: {
    width: 24,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    gap: 12,
  },
  featureItemActive: {
    backgroundColor: '#E8F5E9',
  },
  featureItemText: {
    fontSize: 15,
    color: '#666',
  },
  getStartedButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  getStartedButtonText: {
    color: '#1B3A2B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
