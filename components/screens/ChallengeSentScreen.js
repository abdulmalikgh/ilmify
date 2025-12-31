import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import QuizQuestionScreen from './QuizQuestionScreen';

export default function ChallengeSentScreen({ opponent, category, onStartQuiz, onBack }) {
  const [showQuiz, setShowQuiz] = useState(false);

  if (!opponent) return null;

  const handleStartQuiz = () => {
    setShowQuiz(true);
  };

  const handleQuizComplete = (results) => {
    console.log('Challenge quiz completed:', results);
    // In production: Save challenge answers to API
    setShowQuiz(false);

    // Call the parent's onStartQuiz with results
    onStartQuiz?.(results);
  };

  const handleQuizExit = () => {
    setShowQuiz(false);
  };

  return (
    <View style={styles.container}>
      {/* Success Illustration */}
      <View style={styles.illustration}>
        <View style={styles.successCircle}>
          <View style={styles.checkmarkContainer}>
            <Ionicons name="checkmark" size={48} color="#4CAF50" />
          </View>
          <View style={styles.trophyIcon}>
            <Ionicons name="trophy" size={40} color="#D4AF37" />
          </View>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>Challenge Sent!</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        {opponent.name} has 24 hours to accept
      </Text>

      {/* Opponent Info */}
      <View style={styles.opponentCard}>
        <Ionicons name="person-circle" size={48} color="#D4AF37" />
        <View style={styles.opponentInfo}>
          <Text style={styles.opponentName}>{opponent.name}</Text>
          <Text style={styles.opponentUsername}>@{opponent.username}</Text>
          {category && (
            <View style={styles.categoryBadge}>
              <Ionicons name="bookmark" size={12} color="#D4AF37" />
              <Text style={styles.categoryText}>{category}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Information Box */}
      <View style={styles.infoBox}>
        <View style={styles.infoHeader}>
          <Ionicons name="information-circle" size={24} color="#2D5F3F" />
          <Text style={styles.infoTitle}>What happens next?</Text>
        </View>

        <View style={styles.infoSteps}>
          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>
              Answer your questions now
            </Text>
          </View>

          <View style={styles.stepDivider} />

          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>
              {opponent.name} will get the same questions when they accept
            </Text>
          </View>

          <View style={styles.stepDivider} />

          <View style={styles.infoStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>
              Results are revealed after both players complete the quiz
            </Text>
          </View>
        </View>
      </View>

      {/* Notice */}
      <View style={styles.notice}>
        <Ionicons name="time-outline" size={20} color="#FF9800" />
        <Text style={styles.noticeText}>
          You'll be notified when they accept the challenge
        </Text>
      </View>

      <View style={styles.spacer} />

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartQuiz}
          activeOpacity={0.8}
        >
          <Ionicons name="play-circle" size={24} color="#FFFFFF" />
          <Text style={styles.startButtonText}>Start Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Text style={styles.backButtonText}>Back to Quiz Home</Text>
        </TouchableOpacity>
      </View>

      {/* Quiz Modal */}
      <Modal
        visible={showQuiz}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <QuizQuestionScreen
          category={category || 'General'}
          difficulty="Intermediate"
          onComplete={handleQuizComplete}
          onExit={handleQuizExit}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  illustration: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  successCircle: {
    position: 'relative',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#4CAF50',
  },
  trophyIcon: {
    position: 'absolute',
    bottom: -10,
    right: -10,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#F5F5F5',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D5F3F',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  opponentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  opponentInfo: {
    marginLeft: 12,
    flex: 1,
  },
  opponentName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 2,
  },
  opponentUsername: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D4AF37',
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  infoSteps: {
    gap: 0,
  },
  infoStep: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  stepNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#2D5F3F',
    lineHeight: 20,
    paddingTop: 4,
  },
  stepDivider: {
    width: 2,
    height: 20,
    backgroundColor: '#E0E0E0',
    marginLeft: 13,
    marginVertical: 8,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  noticeText: {
    flex: 1,
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '500',
    lineHeight: 20,
  },
  spacer: {
    flex: 1,
  },
  actions: {
    gap: 12,
    paddingBottom: 20,
  },
  startButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  backButton: {
    backgroundColor: 'transparent',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
  },
});
