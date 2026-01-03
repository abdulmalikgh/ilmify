import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import RoundAnimationScreen from './RoundAnimationScreen';

// Demo questions
const DEMO_QUESTIONS = [
  {
    id: 1,
    question: 'How many times is prayer (Salah) mentioned in the Quran?',
    type: 'multiple_choice',
    options: ['5 times', '67 times', '700 times', 'Over 100 times'],
    correctAnswer: 3,
    creator: 'Sheikh Ahmad',
  },
  {
    id: 2,
    question: 'What is the first Surah revealed in the Quran?',
    type: 'multiple_choice',
    options: ['Al-Fatiha', 'Al-Alaq', 'Al-Nas', 'Al-Baqarah'],
    correctAnswer: 1,
    creator: 'Imam Yusuf',
  },
  {
    id: 3,
    question: 'Is Zakat one of the Five Pillars of Islam?',
    type: 'true_false',
    options: ['True', 'False'],
    correctAnswer: 0,
  },
  {
    id: 4,
    question: 'Which Surah is known as the heart of the Quran?',
    type: 'multiple_choice',
    options: ['Surah Yaseen', 'Surah Al-Kahf', 'Surah Ar-Rahman', 'Surah Al-Mulk'],
    correctAnswer: 0,
    creator: 'Dr. Fatima',
  },
  {
    id: 5,
    question: 'Is fasting during Ramadan obligatory for all Muslims?',
    type: 'true_false',
    options: ['True', 'False'],
    correctAnswer: 0,
  },
];

export default function ChallengeQuestionScreen({
  currentUser,
  opponent,
  category,
  onComplete,
  onExit
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [showRoundAnimation, setShowRoundAnimation] = useState(true);
  const [showFeedbackAnimation, setShowFeedbackAnimation] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [textAnswer, setTextAnswer] = useState('');
  const [roundResults, setRoundResults] = useState([]);

  const questions = DEMO_QUESTIONS;
  const currentQ = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const handleCheck = () => {
    if (selectedAnswer === null && currentQ.type !== 'fill_blank') return;

    // Check if answer is correct
    const isCorrect = selectedAnswer === currentQ.correctAnswer;
    setIsAnswerCorrect(isCorrect);

    if (isCorrect) {
      setUserScore(prev => prev + 1);
    }

    // Simulate opponent answer
    const opponentGotItRight = Math.random() > 0.3;
    const opponentCorrectForThisRound = opponentGotItRight;
    if (opponentGotItRight) {
      setOpponentScore(prev => prev + 1);
    }

    // Record this round's results
    const newRoundResult = {
      round: currentQuestion + 1,
      userCorrect: isCorrect,
      opponentCorrect: opponentCorrectForThisRound,
    };
    const updatedRoundResults = [...roundResults, newRoundResult];
    setRoundResults(updatedRoundResults);

    // Show feedback animation
    setShowFeedbackAnimation(true);

    // After 1.5 seconds, hide feedback and proceed
    setTimeout(() => {
      setShowFeedbackAnimation(false);

      if (isLastQuestion) {
        // Quiz complete - include round-by-round results
        const finalUserScore = userScore + (isCorrect ? 1 : 0);
        const results = {
          score: Math.round(finalUserScore / questions.length * 100),
          correct: finalUserScore,
          total: questions.length,
          time: '3:45',
          userScore: finalUserScore,
          opponentScore: opponentScore + (opponentGotItRight ? 1 : 0),
          roundResults: updatedRoundResults,
        };
        onComplete?.(results);
      } else {
        // Next round - show round animation
        setSelectedAnswer(null);
        setTextAnswer('');
        setCurrentQuestion(prev => prev + 1);
        setShowRoundAnimation(true);
      }
    }, 1500);
  };

  const handleRoundComplete = () => {
    setShowRoundAnimation(false);
  };

  if (showRoundAnimation) {
    return (
      <RoundAnimationScreen
        roundNumber={currentQuestion + 1}
        onComplete={handleRoundComplete}
      />
    );
  }

  const getAnswerButtonStyle = (index) => {
    const baseStyle = styles.answerButton;

    // Show selected state
    if (selectedAnswer === index) {
      return [baseStyle, styles.answerButtonSelected];
    }

    return baseStyle;
  };

  const getAnswerTextStyle = (index) => {
    const baseStyle = styles.answerButtonText;

    // Show selected text style
    if (selectedAnswer === index) {
      return [baseStyle, styles.answerButtonTextSelected];
    }

    return baseStyle;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with both players */}
      <View style={styles.header}>
        {/* Current User */}
        <View style={styles.playerSection}>
          <View style={styles.playerAvatar}>
            <Ionicons name="person" size={28} color="#2D5F3F" />
          </View>
          <View style={styles.playerInfo}>
            <Text style={styles.playerName} numberOfLines={1}>
              {currentUser?.name || 'You'}
            </Text>
            <Text style={styles.playerLevel}>Lv {currentUser?.level || 1}</Text>
          </View>
        </View>

        {/* Score Display */}
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            {userScore} : {opponentScore}
          </Text>
        </View>

        {/* Opponent */}
        <View style={[styles.playerSection, styles.playerSectionRight]}>
          <View style={styles.playerInfo}>
            <Text style={[styles.playerName, styles.playerNameRight]} numberOfLines={1}>
              {opponent?.name}
            </Text>
            <Text style={[styles.playerLevel, styles.playerLevelRight]}>Lv {opponent?.level || 1}</Text>
          </View>
          <View style={[styles.playerAvatar, styles.opponentAvatar]}>
            <Ionicons name="person" size={28} color="#D4AF37" />
          </View>
        </View>
      </View>

      {/* Exit Button */}
      <TouchableOpacity
        style={styles.exitButton}
        onPress={onExit}
        activeOpacity={0.7}
      >
        <Ionicons name="close" size={24} color="#666" />
      </TouchableOpacity>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuestion + 1) / questions.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          Question {currentQuestion + 1} of {questions.length}
        </Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Feedback Animation */}
          {showFeedbackAnimation ? (
            <View style={styles.feedbackAnimationContainer}>
              <View style={[
                styles.feedbackAnimationContent,
                isAnswerCorrect ? styles.feedbackCorrectBg : styles.feedbackWrongBg
              ]}>
                <Ionicons
                  name={isAnswerCorrect ? 'checkmark-circle' : 'close-circle'}
                  size={80}
                  color={isAnswerCorrect ? '#4CAF50' : '#F44336'}
                />
                <Text style={[
                  styles.feedbackAnimationText,
                  isAnswerCorrect ? styles.feedbackCorrectText : styles.feedbackWrongText
                ]}>
                  {isAnswerCorrect ? 'CORRECT!' : 'WRONG!'}
                </Text>
              </View>
            </View>
          ) : (
            <>
              {/* Question */}
              <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{currentQ.question}</Text>
                {currentQ.creator && (
                  <Text style={styles.questionCredit}>by {currentQ.creator}</Text>
                )}
              </View>

              {/* Answers */}
              <View style={styles.answersContainer}>
            {currentQ.type === 'multiple_choice' && (
              <>
                {currentQ.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={getAnswerButtonStyle(index)}
                    onPress={() => handleAnswer(index)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.answerButtonContent}>
                      <View
                        style={[
                          styles.answerRadio,
                          selectedAnswer === index && styles.answerRadioSelected,
                        ]}
                      >
                        {selectedAnswer === index && (
                          <View style={styles.answerRadioDot} />
                        )}
                      </View>
                      <Text style={getAnswerTextStyle(index)}>{option}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}

            {currentQ.type === 'true_false' && (
              <View style={styles.trueFalseContainer}>
                {currentQ.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[styles.trueFalseButton, getAnswerButtonStyle(index)]}
                    onPress={() => handleAnswer(index)}
                    activeOpacity={0.7}
                  >
                    <Text style={getAnswerTextStyle(index)}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {currentQ.type === 'fill_blank' && (
              <TextInput
                style={styles.textInput}
                placeholder="Type your answer..."
                value={textAnswer}
                onChangeText={setTextAnswer}
                autoCapitalize="none"
              />
            )}
          </View>
            </>
          )}
        </View>
      </ScrollView>

      {/* Check Button */}
      {!showFeedbackAnimation && (
        <View style={styles.checkButtonContainer}>
          <TouchableOpacity
            style={[
              styles.checkButton,
              (selectedAnswer === null && currentQ.type !== 'fill_blank') && styles.checkButtonDisabled,
            ]}
            onPress={handleCheck}
            activeOpacity={0.8}
            disabled={selectedAnswer === null && currentQ.type !== 'fill_blank'}
          >
            <Text style={styles.checkButtonText}>CHECK</Text>
          </TouchableOpacity>
        </View>
      )}
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
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  playerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerSectionRight: {
    justifyContent: 'flex-end',
  },
  playerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#2D5F3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  opponentAvatar: {
    backgroundColor: '#FFF9E6',
    borderColor: '#D4AF37',
  },
  playerInfo: {
    marginLeft: 8,
    flex: 1,
  },
  playerName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  playerNameRight: {
    textAlign: 'right',
  },
  playerLevel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  playerLevelRight: {
    textAlign: 'right',
  },
  scoreContainer: {
    paddingHorizontal: 16,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  exitButton: {
    position: 'absolute',
    top: 70,
    right: 16,
    zIndex: 10,
    padding: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  progressContainer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#D4AF37',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D5F3F',
    lineHeight: 26,
  },
  questionCredit: {
    fontSize: 12,
    color: '#999',
    marginTop: 12,
    textAlign: 'right',
    fontStyle: 'italic',
  },
  answersContainer: {
    marginBottom: 20,
  },
  answerButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  answerButtonSelected: {
    borderColor: '#2D5F3F',
    backgroundColor: '#F5F5F5',
  },
  answerButtonCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  answerButtonIncorrect: {
    backgroundColor: '#FFEBEE',
    borderColor: '#F44336',
  },
  answerButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  answerRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  answerRadioSelected: {
    borderColor: '#2D5F3F',
  },
  answerRadioCorrect: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  answerRadioIncorrect: {
    borderColor: '#F44336',
    backgroundColor: '#F44336',
  },
  answerRadioDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2D5F3F',
  },
  answerButtonText: {
    fontSize: 16,
    color: '#2D5F3F',
    flex: 1,
  },
  answerButtonTextSelected: {
    fontWeight: '600',
    color: '#2D5F3F',
  },
  answerButtonTextCorrect: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  answerButtonTextIncorrect: {
    color: '#F44336',
    fontWeight: '600',
  },
  trueFalseContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  trueFalseButton: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#2D5F3F',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  feedbackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    gap: 12,
  },
  feedbackContainerCorrect: {
    backgroundColor: '#E8F5E9',
  },
  feedbackContainerIncorrect: {
    backgroundColor: '#FFEBEE',
  },
  feedbackText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  feedbackTextCorrect: {
    color: '#4CAF50',
  },
  feedbackTextIncorrect: {
    color: '#F44336',
  },
  checkButtonContainer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  checkButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  checkButtonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  checkButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  feedbackAnimationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  feedbackAnimationContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    borderRadius: 20,
    minWidth: 280,
  },
  feedbackCorrectBg: {
    backgroundColor: '#E8F5E9',
  },
  feedbackWrongBg: {
    backgroundColor: '#FFEBEE',
  },
  feedbackAnimationText: {
    fontSize: 42,
    fontWeight: 'bold',
    marginTop: 20,
    letterSpacing: 2,
  },
  feedbackCorrectText: {
    color: '#4CAF50',
  },
  feedbackWrongText: {
    color: '#F44336',
  },
});
