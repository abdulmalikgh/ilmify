import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

export default function QuizQuestionScreen({ category, difficulty, onComplete, onExit }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Mock questions with explanations
  const questions = [
    {
      id: 1,
      question: "What is the first Surah in the Quran?",
      options: ["Al-Fatiha", "Al-Baqarah", "Al-Ikhlas", "An-Nas"],
      correctAnswer: 0,
      explanation: "Al-Fatiha (The Opening) is the first chapter of the Quran. It is recited in every unit of the Muslim prayer (salah).",
      reference: "Quran 1:1-7",
      category: "Quran"
    },
    {
      id: 2,
      question: "How many verses are in Surah Al-Fatiha?",
      options: ["5", "6", "7", "8"],
      correctAnswer: 2,
      explanation: "Surah Al-Fatiha contains 7 verses (ayat). It is also known as As-Sab'al-Mathani (The Seven Oft-Repeated Verses).",
      reference: "Quran 15:87",
      category: "Quran"
    },
    {
      id: 3,
      question: "What does 'Bismillah' mean?",
      options: ["In the name of Allah", "Praise be to Allah", "Allah is Great", "There is no god but Allah"],
      correctAnswer: 0,
      explanation: "Bismillah ar-Rahman ar-Rahim means 'In the name of Allah, the Most Gracious, the Most Merciful.' It begins every chapter of the Quran except one.",
      reference: "Quran 27:30",
      category: "Quran"
    },
    {
      id: 4,
      question: "Which Surah is known as the heart of the Quran?",
      options: ["Al-Fatiha", "Yasin", "Al-Mulk", "Ar-Rahman"],
      correctAnswer: 1,
      explanation: "Surah Yasin (Chapter 36) is often referred to as the 'heart of the Quran' as mentioned in various hadith traditions.",
      reference: "Hadith: Tirmidhi 2887",
      category: "Quran"
    },
    {
      id: 5,
      question: "In which city was the Quran first revealed?",
      options: ["Medina", "Mecca", "Jerusalem", "Damascus"],
      correctAnswer: 1,
      explanation: "The Quran was first revealed to Prophet Muhammad (peace be upon him) in Mecca, specifically in the Cave of Hira.",
      reference: "Sahih Bukhari 3",
      category: "Quran"
    },
  ];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Auto-advance after feedback
  useEffect(() => {
    if (showFeedback) {
      const timer = setTimeout(() => {
        handleMoveToNext();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showFeedback]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSelectAnswer = (answerIndex) => {
    if (showFeedback) return; // Don't allow changing answer during feedback

    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerIndex,
    });
  };

  const handleSubmitAnswer = () => {
    setShowFeedback(true);
  };

  const handleMoveToNext = () => {
    setShowFeedback(false);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0 && !showFeedback) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    // Calculate results
    let correct = 0;
    const answers = [];

    questions.forEach((q, index) => {
      const isCorrect = selectedAnswers[index] === q.correctAnswer;
      if (isCorrect) correct++;

      answers.push({
        question: q.question,
        userAnswer: selectedAnswers[index] !== undefined ? q.options[selectedAnswers[index]] : "Not answered",
        correctAnswer: q.options[q.correctAnswer],
        isCorrect,
        explanation: q.explanation,
        reference: q.reference,
      });
    });

    const score = (correct / questions.length) * 100;
    onComplete({
      totalQuestions: questions.length,
      correctAnswers: correct,
      incorrectAnswers: questions.length - correct,
      score: Math.round(score),
      timeSpent: 300 - timeRemaining,
      difficulty,
      category,
      answers, // Include detailed answers for review
    });
  };

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;
  const isCorrect = selectedAnswers[currentQuestion] === currentQ.correctAnswer;

  if (showExitConfirm) {
    return (
      <View style={styles.container}>
        <View style={styles.exitConfirmContainer}>
          <View style={styles.exitConfirmCard}>
            <Ionicons name="warning-outline" size={64} color="#FF9800" />
            <Text style={styles.exitConfirmTitle}>Exit Quiz?</Text>
            <Text style={styles.exitConfirmText}>
              Your progress will be lost if you exit now.
            </Text>
            <View style={styles.exitConfirmButtons}>
              <TouchableOpacity
                style={[styles.exitConfirmButton, styles.exitConfirmButtonCancel]}
                onPress={() => setShowExitConfirm(false)}
                activeOpacity={0.7}
              >
                <Text style={styles.exitConfirmButtonTextCancel}>Continue Quiz</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.exitConfirmButton, styles.exitConfirmButtonExit]}
                onPress={onExit}
                activeOpacity={0.7}
              >
                <Text style={styles.exitConfirmButtonTextExit}>Exit</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => setShowExitConfirm(true)}
          activeOpacity={0.7}
        >
          <Ionicons name="close" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerCategory}>{category}</Text>
          <Text style={styles.headerQuestion}>Question {currentQuestion + 1} of {questions.length}</Text>
        </View>
        <View style={styles.timerContainer}>
          <Ionicons name="time-outline" size={18} color="#FFFFFF" />
          <Text style={styles.timerText}>{formatTime(timeRemaining)}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress}%` }]} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question Card */}
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionNumber}>Question {currentQuestion + 1}</Text>
            <View style={styles.difficultyBadge}>
              <Text style={styles.difficultyBadgeText}>{difficulty}</Text>
            </View>
          </View>
          <Text style={styles.questionText}>{currentQ.question}</Text>
        </View>

        {/* Answer Options */}
        <View style={styles.optionsContainer}>
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswers[currentQuestion] === index;
            const isCorrectOption = index === currentQ.correctAnswer;

            let optionStyle = [styles.optionCard];
            let radioStyle = [styles.optionRadio];
            let textStyle = [styles.optionText];

            if (showFeedback) {
              if (isCorrectOption) {
                optionStyle.push(styles.optionCardCorrect);
                textStyle.push(styles.optionTextCorrect);
                radioStyle.push(styles.optionRadioCorrect);
              } else if (isSelected && !isCorrect) {
                optionStyle.push(styles.optionCardIncorrect);
                textStyle.push(styles.optionTextIncorrect);
                radioStyle.push(styles.optionRadioIncorrect);
              }
            } else if (isSelected) {
              optionStyle.push(styles.optionCardSelected);
              textStyle.push(styles.optionTextSelected);
              radioStyle.push(styles.optionRadioSelected);
            }

            return (
              <TouchableOpacity
                key={index}
                style={optionStyle}
                onPress={() => handleSelectAnswer(index)}
                activeOpacity={0.7}
                disabled={showFeedback}
              >
                <View style={radioStyle}>
                  {!showFeedback && isSelected && <View style={styles.optionRadioInner} />}
                  {showFeedback && isCorrectOption && <Ionicons name="checkmark" size={16} color="#4CAF50" />}
                  {showFeedback && isSelected && !isCorrect && <Ionicons name="close" size={16} color="#FF4444" />}
                </View>
                <Text style={textStyle}>{option}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Feedback Message */}
        {showFeedback && (
          <View style={[styles.feedbackCard, isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect]}>
            <View style={styles.feedbackHeader}>
              <Ionicons
                name={isCorrect ? "checkmark-circle" : "close-circle"}
                size={32}
                color={isCorrect ? "#4CAF50" : "#FF4444"}
              />
              <Text style={[styles.feedbackTitle, isCorrect ? styles.feedbackTitleCorrect : styles.feedbackTitleIncorrect]}>
                {isCorrect ? "Correct!" : "Incorrect"}
              </Text>
            </View>
            {!isCorrect && (
              <Text style={styles.feedbackCorrectAnswer}>
                Correct answer: {currentQ.options[currentQ.correctAnswer]}
              </Text>
            )}
          </View>
        )}

        {/* Question Indicators */}
        <View style={styles.questionIndicators}>
          <Text style={styles.indicatorsLabel}>All Questions:</Text>
          <View style={styles.indicatorsDots}>
            {questions.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicatorDot,
                  selectedAnswers[index] !== undefined && styles.indicatorDotAnswered,
                  index === currentQuestion && styles.indicatorDotCurrent,
                ]}
                onPress={() => !showFeedback && setCurrentQuestion(index)}
                activeOpacity={0.7}
                disabled={showFeedback}
              >
                <Text style={[
                  styles.indicatorDotText,
                  selectedAnswers[index] !== undefined && styles.indicatorDotTextAnswered,
                  index === currentQuestion && styles.indicatorDotTextCurrent,
                ]}>
                  {index + 1}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Navigation Footer */}
      <View style={styles.footer}>
        {!showFeedback ? (
          <>
            <TouchableOpacity
              style={[styles.navButton, currentQuestion === 0 && styles.navButtonDisabled]}
              onPress={handlePrevious}
              disabled={currentQuestion === 0}
              activeOpacity={0.7}
            >
              <Ionicons name="chevron-back" size={20} color={currentQuestion === 0 ? '#CCC' : '#2D5F3F'} />
              <Text style={[styles.navButtonText, currentQuestion === 0 && styles.navButtonTextDisabled]}>
                Previous
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.submitAnswerButton, !isAnswered && styles.submitAnswerButtonDisabled]}
              onPress={handleSubmitAnswer}
              disabled={!isAnswered}
              activeOpacity={0.7}
            >
              <Text style={styles.submitAnswerButtonText}>
                {currentQuestion === questions.length - 1 ? 'Submit' : 'Submit Answer'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleMoveToNext}
            activeOpacity={0.7}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestion === questions.length - 1 ? 'See Results' : 'Next Question'}
            </Text>
            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        )}
      </View>
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
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  exitButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerCategory: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  headerQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  progressBarContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#D4AF37',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  questionCard: {
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
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  difficultyBadge: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D5F3F',
    lineHeight: 26,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  optionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  optionCardSelected: {
    borderColor: '#2D5F3F',
    backgroundColor: '#F0F8F4',
  },
  optionCardCorrect: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  optionCardIncorrect: {
    borderColor: '#FF4444',
    backgroundColor: '#FFEBEE',
  },
  optionRadio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CCC',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionRadioSelected: {
    borderColor: '#2D5F3F',
  },
  optionRadioCorrect: {
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
  },
  optionRadioIncorrect: {
    borderColor: '#FF4444',
    backgroundColor: '#FF4444',
  },
  optionRadioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#2D5F3F',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: '#2D5F3F',
  },
  optionTextCorrect: {
    fontWeight: '600',
    color: '#4CAF50',
  },
  optionTextIncorrect: {
    fontWeight: '600',
    color: '#FF4444',
  },
  feedbackCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
  },
  feedbackCorrect: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  feedbackIncorrect: {
    backgroundColor: '#FFEBEE',
    borderColor: '#FF4444',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  feedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  feedbackTitleCorrect: {
    color: '#4CAF50',
  },
  feedbackTitleIncorrect: {
    color: '#FF4444',
  },
  feedbackCorrectAnswer: {
    fontSize: 15,
    color: '#666',
    marginTop: 4,
  },
  questionIndicators: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  indicatorsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  indicatorsDots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  indicatorDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  indicatorDotAnswered: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  indicatorDotCurrent: {
    backgroundColor: '#2D5F3F',
    borderColor: '#2D5F3F',
  },
  indicatorDotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  indicatorDotTextAnswered: {
    color: '#4CAF50',
  },
  indicatorDotTextCurrent: {
    color: '#FFFFFF',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
    marginHorizontal: 6,
  },
  navButtonTextDisabled: {
    color: '#CCC',
  },
  submitAnswerButton: {
    backgroundColor: '#2D5F3F',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitAnswerButtonDisabled: {
    backgroundColor: '#CCC',
  },
  submitAnswerButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#2D5F3F',
    paddingVertical: 12,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 8,
  },
  exitConfirmContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  exitConfirmCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
  },
  exitConfirmTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginTop: 16,
    marginBottom: 8,
  },
  exitConfirmText: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  exitConfirmButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  exitConfirmButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  exitConfirmButtonCancel: {
    backgroundColor: '#2D5F3F',
  },
  exitConfirmButtonExit: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#FF4444',
  },
  exitConfirmButtonTextCancel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  exitConfirmButtonTextExit: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FF4444',
  },
});
