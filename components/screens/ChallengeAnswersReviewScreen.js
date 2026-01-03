import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChallengeAnswersReviewScreen({
  currentUser,
  opponent,
  category,
  questions, // Array of questions with user/opponent answers
  onBack
}) {
  console.log('ChallengeAnswersReviewScreen rendered');
  console.log('currentUser:', currentUser);
  console.log('opponent:', opponent);
  console.log('category:', category);
  console.log('questions:', questions?.length, 'questions');

  // If essential data is missing, show error state
  if (!currentUser || !opponent) {
    console.log('SHOWING ERROR: Missing currentUser or opponent');
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#2D5F3F" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Challenge Review</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#F44336" />
          <Text style={styles.emptyTitle}>Unable to load review</Text>
          <Text style={styles.emptyMessage}>Player data is missing</Text>
        </View>
      </SafeAreaView>
    );
  }

  // If questions are missing, show loading or error state
  if (!questions || questions.length === 0) {
    console.log('SHOWING ERROR: Missing questions or empty array');
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color="#2D5F3F" />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>Challenge Review</Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.emptyContainer}>
          <Ionicons name="document-text-outline" size={64} color="#D4AF37" />
          <Text style={styles.emptyTitle}>No questions available</Text>
          <Text style={styles.emptyMessage}>Questions are still loading or unavailable</Text>
        </View>
      </SafeAreaView>
    );
  }

  const renderAnswerStatus = (isUserAnswer, isCorrect, isSelected) => {
    if (isCorrect) {
      return (
        <View style={styles.answerIconContainer}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <Text style={styles.correctLabel}>Correct Answer</Text>
        </View>
      );
    }

    if (isSelected && !isCorrect) {
      return (
        <View style={styles.answerIconContainer}>
          <Ionicons name="close-circle" size={20} color="#F44336" />
        </View>
      );
    }

    return null;
  };

  const renderQuestion = (question, index) => {
    const userAnswerIndex = question.userAnswer;
    const opponentAnswerIndex = question.opponentAnswer;
    const correctAnswerIndex = question.correctAnswer;

    return (
      <View key={index} style={styles.questionCard}>
        {/* Question Number and Text */}
        <View style={styles.questionHeader}>
          <View style={styles.questionNumberBadge}>
            <Text style={styles.questionNumberText}>Q{index + 1}</Text>
          </View>
          <Text style={styles.questionText}>{question.question}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option, optionIndex) => {
            const isCorrect = optionIndex === correctAnswerIndex;
            const isUserAnswer = optionIndex === userAnswerIndex;
            const isOpponentAnswer = optionIndex === opponentAnswerIndex;

            let optionStyle = [styles.option];
            if (isCorrect) {
              optionStyle.push(styles.correctOption);
            } else if (isUserAnswer || isOpponentAnswer) {
              optionStyle.push(styles.incorrectOption);
            }

            return (
              <View key={optionIndex} style={optionStyle}>
                <View style={styles.optionContent}>
                  <Text style={styles.optionLetter}>
                    {String.fromCharCode(65 + optionIndex)}.
                  </Text>
                  <Text style={styles.optionText}>{option}</Text>
                </View>

                {/* Show who selected this answer */}
                <View style={styles.selectionIndicators}>
                  {isUserAnswer && (
                    <View style={styles.playerIndicator}>
                      <Text style={styles.playerIndicatorText}>You</Text>
                      {renderAnswerStatus(true, isCorrect, true)}
                    </View>
                  )}
                  {isOpponentAnswer && (
                    <View style={styles.playerIndicator}>
                      <Text style={styles.playerIndicatorText}>
                        {opponent.name}
                      </Text>
                      {renderAnswerStatus(false, isCorrect, true)}
                    </View>
                  )}
                  {isCorrect && !isUserAnswer && !isOpponentAnswer && (
                    renderAnswerStatus(false, true, false)
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Explanation and Reference */}
        {question.explanation && (
          <View style={styles.explanationSection}>
            <View style={styles.explanationHeader}>
              <Ionicons name="bulb" size={18} color="#D4AF37" />
              <Text style={styles.explanationTitle}>Explanation</Text>
            </View>
            <Text style={styles.explanationText}>{question.explanation}</Text>
          </View>
        )}

        {question.reference && (
          <View style={styles.referenceSection}>
            <View style={styles.referenceHeader}>
              <Ionicons name="book" size={18} color="#2D5F3F" />
              <Text style={styles.referenceTitle}>Reference</Text>
            </View>
            <Text style={styles.referenceText}>{question.reference}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#2D5F3F" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>Challenge Review</Text>
          {category && <Text style={styles.headerSubtitle}>{category}</Text>}
        </View>
        <View style={styles.headerSpacer} />
      </View>

      {/* Players Info Bar */}
      <View style={styles.playersBar}>
        <View style={styles.playerInfo}>
          <View style={styles.playerAvatar}>
            <Ionicons name="person" size={20} color="#2D5F3F" />
          </View>
          <Text style={styles.playerBarName} numberOfLines={1}>
            {currentUser.name}
          </Text>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.playerInfo}>
          <View style={[styles.playerAvatar, styles.opponentAvatar]}>
            <Ionicons name="person" size={20} color="#D4AF37" />
          </View>
          <Text style={styles.playerBarName} numberOfLines={1}>
            {opponent.name}
          </Text>
        </View>
      </View>

      {/* Questions List */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {questions.map((question, index) => renderQuestion(question, index))}

        {/* Bottom Spacer */}
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Done Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={onBack}
          activeOpacity={0.8}
        >
          <Text style={styles.doneButtonText}>DONE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  headerSubtitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
    marginTop: 2,
  },
  headerSpacer: {
    width: 40,
  },
  playersBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  playerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2D5F3F',
  },
  opponentAvatar: {
    backgroundColor: '#FFF9E6',
    borderColor: '#D4AF37',
  },
  playerBarName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
    flex: 1,
  },
  vsText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginHorizontal: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    marginBottom: 16,
  },
  questionNumberBadge: {
    backgroundColor: '#2D5F3F',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  questionText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    lineHeight: 24,
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  option: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  correctOption: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  optionLetter: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
    minWidth: 24,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: '#2D5F3F',
    lineHeight: 22,
  },
  selectionIndicators: {
    gap: 8,
  },
  playerIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerIndicatorText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  answerIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  correctLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  explanationSection: {
    backgroundColor: '#FFF9E6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  explanationText: {
    fontSize: 14,
    color: '#2D5F3F',
    lineHeight: 20,
  },
  referenceSection: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2D5F3F',
  },
  referenceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  referenceTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  referenceText: {
    fontSize: 14,
    color: '#2D5F3F',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  bottomSpacer: {
    height: 20,
  },
  footer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    padding: 16,
  },
  doneButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  doneButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2D5F3F',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
});
