import { View, StyleSheet } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import OnboardingWelcome from './onboarding/OnboardingWelcome';
import OnboardingInterests from './onboarding/OnboardingInterests';
import OnboardingKnowledgeLevel from './onboarding/OnboardingKnowledgeLevel';
import OnboardingFeatures from './onboarding/OnboardingFeatures';

export default function OnboardingFlow({ userName, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState({
    interests: [],
    knowledgeLevel: null,
  });

  const handleWelcomeContinue = () => {
    setCurrentStep(2);
  };

  const handleInterestsContinue = (interests) => {
    setOnboardingData(prev => ({ ...prev, interests }));
    setCurrentStep(3);
  };

  const handleInterestsSkip = () => {
    setOnboardingData(prev => ({ ...prev, interests: [] }));
    setCurrentStep(3);
  };

  const handleKnowledgeLevelContinue = (level) => {
    setOnboardingData(prev => ({ ...prev, knowledgeLevel: level }));
    setCurrentStep(4);
  };

  const handleGetStarted = () => {
    console.log('Onboarding completed with data:', onboardingData);
    onComplete(onboardingData);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      {/* Progress Indicator */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${(currentStep / 4) * 100}%` }
            ]}
          />
        </View>
      </View>

      {/* Screen Content */}
      {currentStep === 1 && (
        <OnboardingWelcome
          userName={userName}
          onContinue={handleWelcomeContinue}
        />
      )}

      {currentStep === 2 && (
        <OnboardingInterests
          onContinue={handleInterestsContinue}
          onSkip={handleInterestsSkip}
        />
      )}

      {currentStep === 3 && (
        <OnboardingKnowledgeLevel
          onContinue={handleKnowledgeLevelContinue}
        />
      )}

      {currentStep === 4 && (
        <OnboardingFeatures
          onGetStarted={handleGetStarted}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 2,
  },
});
