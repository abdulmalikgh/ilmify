import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

const INTERESTS = [
  { id: 'quran', label: 'Quran', icon: 'book' },
  { id: 'hadith', label: 'Hadith', icon: 'library' },
  { id: 'fiqh', label: 'Fiqh', icon: 'scale' },
  { id: 'seerah', label: 'Seerah', icon: 'person' },
  { id: 'aqeedah', label: 'Aqeedah', icon: 'heart' },
  { id: 'history', label: 'Islamic History', icon: 'time' },
  { id: 'duas', label: 'Daily Duas', icon: 'hand-right' },
  { id: 'arabic', label: 'Arabic Language', icon: 'language' },
];

export default function OnboardingInterests({ onContinue, onSkip }) {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleInterest = (interestId) => {
    setSelectedInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleContinue = () => {
    onContinue(selectedInterests);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <Text style={styles.title}>What would you like to learn?</Text>
        <Text style={styles.subtitle}>
          Select categories you're interested in
        </Text>
        {selectedInterests.length > 0 && (
          <Text style={styles.selectedCount}>
            {selectedInterests.length} selected
          </Text>
        )}
      </Animated.View>

      {/* Interest Chips */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.chipsContainer}
      >
        <Animated.View style={[styles.chipGrid, { opacity: fadeAnim }]}>
          {INTERESTS.map((interest) => {
            const isSelected = selectedInterests.includes(interest.id);
            return (
              <TouchableOpacity
                key={interest.id}
                style={[
                  styles.chip,
                  isSelected && styles.chipSelected
                ]}
                onPress={() => toggleInterest(interest.id)}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={interest.icon}
                  size={24}
                  color={isSelected ? '#FFFFFF' : '#2D5F3F'}
                />
                <Text style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected
                ]}>
                  {interest.label}
                </Text>
                {isSelected && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      </ScrollView>

      {/* Buttons */}
      <Animated.View style={[styles.footer, { opacity: fadeAnim }]}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons name="arrow-forward" size={20} color="#1B3A2B" />
        </TouchableOpacity>

        <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
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
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  selectedCount: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
    marginTop: 8,
  },
  scrollView: {
    flex: 1,
  },
  chipsContainer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    gap: 8,
    minWidth: '45%',
  },
  chipSelected: {
    backgroundColor: '#2D5F3F',
    borderColor: '#D4AF37',
  },
  chipText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
    flex: 1,
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  checkmark: {
    marginLeft: 'auto',
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
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  continueButtonText: {
    color: '#1B3A2B',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipText: {
    color: '#999',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
