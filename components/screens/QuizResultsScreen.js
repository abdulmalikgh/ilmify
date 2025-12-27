import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function QuizResultsScreen({ results, onRetry, onBackToCategory, onBackToHome }) {
  const {
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    score,
    timeSpent,
    difficulty,
    category,
    answers = [], // Array of answer objects with details
  } = results;

  const [expandedAnswers, setExpandedAnswers] = useState({});

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = () => {
    if (score >= 90) return { message: "Excellent!", emoji: "🎉", color: "#4CAF50" };
    if (score >= 70) return { message: "Well Done!", emoji: "👏", color: "#8BC34A" };
    if (score >= 50) return { message: "Good Effort!", emoji: "👍", color: "#FF9800" };
    return { message: "Keep Practicing!", emoji: "💪", color: "#FF5722" };
  };

  const performance = getPerformanceMessage();
  const pointsEarned = Math.round((score / 100) * (difficulty === 'Easy' ? 50 : difficulty === 'Medium' ? 100 : 150));

  const toggleAnswer = (index) => {
    setExpandedAnswers({
      ...expandedAnswers,
      [index]: !expandedAnswers[index],
    });
  };

  const handleShareResult = () => {
    // This would integrate with your app's sharing functionality
    Alert.alert(
      'Share Result',
      `I scored ${score}% on the ${category} ${difficulty} quiz! 🎉\n\n${correctAnswers}/${totalQuestions} correct answers\n+${pointsEarned} points earned`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Share', onPress: () => console.log('Sharing result...') }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz Complete!</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Performance Badge */}
        <View style={styles.performanceCard}>
          <Text style={styles.performanceEmoji}>{performance.emoji}</Text>
          <Text style={[styles.performanceMessage, { color: performance.color }]}>
            {performance.message}
          </Text>
          <Text style={styles.scoreText}>{score}%</Text>
          <Text style={styles.scoreLabel}>Your Score</Text>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {/* Correct Answers */}
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#4CAF5020' }]}>
              <Ionicons name="checkmark-circle" size={32} color="#4CAF50" />
            </View>
            <Text style={styles.statValue}>{correctAnswers}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>

          {/* Incorrect Answers */}
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#FF444420' }]}>
              <Ionicons name="close-circle" size={32} color="#FF4444" />
            </View>
            <Text style={styles.statValue}>{incorrectAnswers}</Text>
            <Text style={styles.statLabel}>Incorrect</Text>
          </View>

          {/* Time Spent */}
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#2196F320' }]}>
              <Ionicons name="time" size={32} color="#2196F3" />
            </View>
            <Text style={styles.statValue}>{formatTime(timeSpent)}</Text>
            <Text style={styles.statLabel}>Time</Text>
          </View>

          {/* Points Earned */}
          <View style={styles.statCard}>
            <View style={[styles.statIconContainer, { backgroundColor: '#D4AF3720' }]}>
              <Ionicons name="star" size={32} color="#D4AF37" />
            </View>
            <Text style={styles.statValue}>+{pointsEarned}</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>Quiz Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Category</Text>
            <Text style={styles.detailValue}>{category}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Difficulty</Text>
            <Text style={styles.detailValue}>{difficulty}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Questions</Text>
            <Text style={styles.detailValue}>{totalQuestions}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Accuracy</Text>
            <Text style={[styles.detailValue, { color: performance.color, fontWeight: '600' }]}>
              {score}%
            </Text>
          </View>
        </View>

        {/* Achievements/Badges (if any) */}
        {score === 100 && (
          <View style={styles.achievementCard}>
            <Ionicons name="trophy" size={48} color="#D4AF37" />
            <Text style={styles.achievementTitle}>Perfect Score!</Text>
            <Text style={styles.achievementText}>
              You answered all questions correctly. Amazing!
            </Text>
          </View>
        )}

        {score >= 80 && pointsEarned >= 120 && (
          <View style={styles.achievementCard}>
            <Ionicons name="flame" size={48} color="#FF9800" />
            <Text style={styles.achievementTitle}>On Fire!</Text>
            <Text style={styles.achievementText}>
              Keep up the great performance!
            </Text>
          </View>
        )}

        {/* Answers Review */}
        {answers.length > 0 && (
          <View style={styles.answersSection}>
            <Text style={styles.answersSectionTitle}>Answers Review</Text>

            {answers.map((answer, index) => (
              <View key={index} style={styles.answerItem}>
                <TouchableOpacity
                  style={styles.answerHeader}
                  onPress={() => toggleAnswer(index)}
                  activeOpacity={0.7}
                >
                  <View style={styles.answerHeaderLeft}>
                    <View style={[
                      styles.answerNumberBadge,
                      answer.isCorrect ? styles.answerNumberBadgeCorrect : styles.answerNumberBadgeIncorrect
                    ]}>
                      <Text style={styles.answerNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.answerQuestionText} numberOfLines={2}>
                      {answer.question}
                    </Text>
                  </View>
                  <View style={styles.answerHeaderRight}>
                    <Ionicons
                      name={answer.isCorrect ? "checkmark-circle" : "close-circle"}
                      size={24}
                      color={answer.isCorrect ? "#4CAF50" : "#FF4444"}
                    />
                    <Ionicons
                      name={expandedAnswers[index] ? "chevron-up" : "chevron-down"}
                      size={20}
                      color="#999"
                      style={{ marginLeft: 8 }}
                    />
                  </View>
                </TouchableOpacity>

                {expandedAnswers[index] && (
                  <View style={styles.answerDetails}>
                    <View style={styles.answerRow}>
                      <Text style={styles.answerLabel}>Your Answer:</Text>
                      <Text style={[
                        styles.answerValue,
                        answer.isCorrect ? styles.answerValueCorrect : styles.answerValueIncorrect
                      ]}>
                        {answer.userAnswer}
                      </Text>
                    </View>

                    {!answer.isCorrect && (
                      <View style={styles.answerRow}>
                        <Text style={styles.answerLabel}>Correct Answer:</Text>
                        <Text style={[styles.answerValue, styles.answerValueCorrect]}>
                          {answer.correctAnswer}
                        </Text>
                      </View>
                    )}

                    {answer.explanation && (
                      <View style={styles.explanationBox}>
                        <View style={styles.explanationHeader}>
                          <Ionicons name="information-circle" size={20} color="#2196F3" />
                          <Text style={styles.explanationTitle}>Explanation</Text>
                        </View>
                        <Text style={styles.explanationText}>{answer.explanation}</Text>
                        {answer.reference && (
                          <Text style={styles.referenceText}>Reference: {answer.reference}</Text>
                        )}
                      </View>
                    )}
                  </View>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleShareResult}
            activeOpacity={0.7}
          >
            <Ionicons name="share-social" size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Share Result</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onRetry}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh" size={20} color="#2D5F3F" />
            <Text style={styles.secondaryButtonText}>Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={onBackToCategory}
            activeOpacity={0.7}
          >
            <Ionicons name="list" size={20} color="#2D5F3F" />
            <Text style={styles.secondaryButtonText}>Back to {category}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tertiaryButton}
            onPress={onBackToHome}
            activeOpacity={0.7}
          >
            <Text style={styles.tertiaryButtonText}>Back to Quiz Home</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2D5F3F',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  performanceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  performanceEmoji: {
    fontSize: 72,
    marginBottom: 16,
  },
  performanceMessage: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    marginHorizontal: '1.5%',
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    fontSize: 15,
    color: '#666',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  achievementCard: {
    backgroundColor: '#FFF8E1',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  achievementTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginTop: 12,
    marginBottom: 8,
  },
  achievementText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  actionsContainer: {
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#2D5F3F',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#2D5F3F',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginLeft: 8,
  },
  tertiaryButton: {
    padding: 16,
    alignItems: 'center',
  },
  tertiaryButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#666',
  },
  answersSection: {
    marginBottom: 24,
  },
  answersSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 16,
  },
  answerItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  answerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  answerHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 12,
  },
  answerHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerNumberBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  answerNumberBadgeCorrect: {
    backgroundColor: '#E8F5E9',
  },
  answerNumberBadgeIncorrect: {
    backgroundColor: '#FFEBEE',
  },
  answerNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  answerQuestionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
    flex: 1,
  },
  answerDetails: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  answerRow: {
    marginTop: 12,
  },
  answerLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  answerValue: {
    fontSize: 15,
    fontWeight: '600',
  },
  answerValueCorrect: {
    color: '#4CAF50',
  },
  answerValueIncorrect: {
    color: '#FF4444',
  },
  explanationBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
    marginLeft: 6,
  },
  explanationText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  referenceText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
});
