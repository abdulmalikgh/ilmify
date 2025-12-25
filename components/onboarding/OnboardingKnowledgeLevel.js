import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

const KNOWLEDGE_LEVELS = [
  {
    id: 'beginner',
    label: 'Beginner',
    description: "I'm just starting to learn",
    icon: 'leaf',
    color: '#88cc00',
  },
  {
    id: 'intermediate',
    label: 'Intermediate',
    description: 'I have foundational knowledge',
    icon: 'book',
    color: '#D4AF37',
  },
  {
    id: 'advanced',
    label: 'Advanced',
    description: "I've studied formally",
    icon: 'school',
    color: '#2D5F3F',
  },
];

export default function OnboardingKnowledgeLevel({ onContinue }) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnims = useRef(
    KNOWLEDGE_LEVELS.map(() => new Animated.Value(1))
  ).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSelectLevel = (levelId, index) => {
    setSelectedLevel(levelId);

    // Animate the selected card
    Animated.sequence([
      Animated.timing(scaleAnims[index], {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnims[index], {
        toValue: 1,
        tension: 50,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleContinue = () => {
    if (selectedLevel) {
      onContinue(selectedLevel);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.title}>How would you rate your Islamic knowledge?</Text>
        <Text style={styles.subtitle}>
          This helps us personalize your learning experience
        </Text>
      </Animated.View>

      {/* Knowledge Level Options */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
        <Animated.View style={{ opacity: fadeAnim }}>
          {KNOWLEDGE_LEVELS.map((level, index) => {
            const isSelected = selectedLevel === level.id;
            return (
              <Animated.View
                key={level.id}
                style={{ transform: [{ scale: scaleAnims[index] }] }}
              >
                <TouchableOpacity
                  style={[
                    styles.levelCard,
                    isSelected && styles.levelCardSelected
                  ]}
                  onPress={() => handleSelectLevel(level.id, index)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.iconContainer, { backgroundColor: level.color + '20' }]}>
                    <Ionicons
                      name={level.icon}
                      size={32}
                      color={isSelected ? level.color : '#666'}
                    />
                  </View>

                  <View style={styles.textContainer}>
                    <Text style={[
                      styles.levelLabel,
                      isSelected && styles.levelLabelSelected
                    ]}>
                      {level.label}
                    </Text>
                    <Text style={[
                      styles.levelDescription,
                      isSelected && styles.levelDescriptionSelected
                    ]}>
                      {level.description}
                    </Text>
                  </View>

                  <View style={styles.radioContainer}>
                    {isSelected ? (
                      <Ionicons name="radio-button-on" size={24} color="#D4AF37" />
                    ) : (
                      <Ionicons name="radio-button-off" size={24} color="#CCCCCC" />
                    )}
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </Animated.View>
      </ScrollView>

      {/* Continue Button */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedLevel && styles.continueButtonDisabled
          ]}
          onPress={handleContinue}
          disabled={!selectedLevel}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#1B3A2B" />
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 12,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  scrollView: {
    flex: 1,
  },
  optionsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 16,
  },
  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginBottom: 16,
  },
  levelCardSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D4AF37',
    elevation: 4,
    shadowColor: '#D4AF37',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  levelLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 4,
  },
  levelLabelSelected: {
    color: '#2D5F3F',
  },
  levelDescription: {
    fontSize: 14,
    color: '#666',
  },
  levelDescriptionSelected: {
    color: '#2D5F3F',
  },
  radioContainer: {
    marginLeft: 12,
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  continueButton: {
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
  continueButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  continueButtonText: {
    color: '#1B3A2B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
