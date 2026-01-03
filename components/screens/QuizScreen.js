import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import SelectOpponentScreen from './SelectOpponentScreen';
import ChallengePreviewScreen from './ChallengePreviewScreen';
import ChallengeQuestionScreen from './ChallengeQuestionScreen';
import WaitingForOpponentScreen from './WaitingForOpponentScreen';
import ChallengeResultsScreen from './ChallengeResultsScreen';
import ChallengeAnswersReviewScreen from './ChallengeAnswersReviewScreen';
import ChallengeHistoryScreen from './ChallengeHistoryScreen';
import ChallengeSentScreen from './ChallengeSentScreen';
import IncomingChallengeModal from '../modals/IncomingChallengeModal';

export default function QuizScreen({ userData, onCategoryPress }) {
  const [showSelectOpponent, setShowSelectOpponent] = useState(false);
  const [showChallengePreview, setShowChallengePreview] = useState(false);
  const [showChallengeQuiz, setShowChallengeQuiz] = useState(false);
  const [showChallengeSent, setShowChallengeSent] = useState(false);
  const [showChallengeResults, setShowChallengeResults] = useState(false);
  const [showChallengeHistory, setShowChallengeHistory] = useState(false);
  const [showAnswersReview, setShowAnswersReview] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [challengeResults, setChallengeResults] = useState(null);
  const [opponentResults, setOpponentResults] = useState(null);
  const [challengeQuestions, setChallengeQuestions] = useState(null);
  const [showIncomingChallenge, setShowIncomingChallenge] = useState(false);
  const [incomingChallenge, setIncomingChallenge] = useState(null);

  // Current user data for VS screen
  const currentUser = {
    name: userData?.fullName || userData?.username || 'You',
    username: userData?.username || 'user',
    level: 2, // In production: get from userData
    points: 2450,
  };

  // Demo incoming challenge data
  const DEMO_INCOMING_CHALLENGES = [
    {
      id: 'challenge_1',
      challengerName: 'Ahmad Ibrahim',
      challengerUsername: 'ahmad_i',
      category: 'Quran',
      difficulty: 'Intermediate',
      questions: 5,
      type: 'offline',
      expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'challenge_2',
      challengerName: 'Fatima Hassan',
      challengerUsername: 'fatima_h',
      category: 'Hadith',
      difficulty: 'Advanced',
      questions: 5,
      type: 'online',
      expiresAt: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    },
  ];

  const handleChallengeClick = (category = null) => {
    setSelectedCategory(category);
    setShowSelectOpponent(true);
  };

  const handleSelectOpponent = (opponent, category) => {
    setSelectedOpponent(opponent);
    setSelectedCategory(category);
    setShowSelectOpponent(false);
    setShowChallengePreview(true);
  };

  const handleStartChallenge = () => {
    // Start quiz directly for both online and offline
    console.log('Starting challenge quiz:', { opponent: selectedOpponent, category: selectedCategory });
    setShowChallengePreview(false);
    setShowChallengeQuiz(true);
  };

  const handleChallengeComplete = (results) => {
    console.log('Challenge quiz completed with results:', results);
    // In production: Send challenge to opponent with questions and your answers
    // API call: sendChallenge({ opponentId, category, questions, results })

    setChallengeResults(results);
    setShowChallengeQuiz(false);
    setShowChallengeSent(true);
  };

  const handleChallengeExit = () => {
    setShowChallengeQuiz(false);
    setSelectedOpponent(null);
    setSelectedCategory(null);
  };

  const handleBackFromChallengeSent = () => {
    setShowChallengeSent(false);
    setSelectedOpponent(null);
    setSelectedCategory(null);
    setChallengeResults(null);
  };

  const handleViewResults = () => {
    // Simulate opponent completing the challenge
    // In production: This would be triggered by real-time notification/polling
    const mockOpponentResults = {
      correct: Math.floor(Math.random() * 6), // Random score 0-5
      total: 5,
    };

    // Generate demo questions for review BEFORE setting other state
    const demoQuestions = generateDemoQuestions(selectedCategory, challengeResults, mockOpponentResults);

    // Set all state together
    setChallengeQuestions(demoQuestions);
    setOpponentResults(mockOpponentResults);
    setShowChallengeSent(false);
    setShowChallengeResults(true);
  };

  const handleShareResults = () => {
    console.log('Sharing results...');
    // In production: Open share sheet with challenge results
  };

  const handleRematch = () => {
    console.log('Requesting rematch...');
    // Close results and show VS screen again
    setShowChallengeResults(false);
    setOpponentResults(null);
    setChallengeResults(null);
    setShowChallengePreview(true);
  };

  const handleDoneWithResults = () => {
    setShowChallengeResults(false);
    setSelectedOpponent(null);
    setSelectedCategory(null);
    setChallengeResults(null);
    setOpponentResults(null);
    setChallengeQuestions(null);
  };

  const handleViewAnswers = () => {
    console.log('handleViewAnswers called');
    console.log('Current state - showAnswersReview:', showAnswersReview);
    console.log('challengeQuestions:', challengeQuestions);
    console.log('selectedCategory:', selectedCategory);
    console.log('challengeResults:', challengeResults);
    console.log('opponentResults:', opponentResults);
    console.log('currentUser:', currentUser);
    console.log('selectedOpponent:', selectedOpponent);

    // Generate demo questions with answers if not already set
    let questionsToShow = challengeQuestions;
    if (!questionsToShow) {
      console.log('Generating demo questions...');
      questionsToShow = generateDemoQuestions(selectedCategory, challengeResults, opponentResults);
      console.log('Generated questions:', questionsToShow);
      setChallengeQuestions(questionsToShow);
    }
    console.log('About to set showAnswersReview to true with', questionsToShow?.length, 'questions');

    // Close the results modal first, then open the answers review modal
    // This is necessary because React Native can't stack multiple modals
    setShowChallengeResults(false);

    // Use a small delay to ensure the results modal closes before opening the answers review
    setTimeout(() => {
      setShowAnswersReview(true);
      console.log('After setShowAnswersReview(true)');
    }, 300);
  };

  const handleBackFromAnswersReview = () => {
    setShowAnswersReview(false);
  };

  // Generate demo questions with answers for review
  const generateDemoQuestions = (category, userResults, opponentResults) => {
    const categoryName = category || 'Islamic Knowledge';
    const totalQuestions = userResults?.total || 5;
    const questions = [];

    for (let i = 0; i < totalQuestions; i++) {
      const roundResult = userResults?.roundResults?.[i];
      const userCorrect = roundResult?.userCorrect ?? (i < userResults?.correct);
      const opponentCorrect = roundResult?.opponentCorrect ?? (i < opponentResults?.correct);

      // Generate different questions based on category
      const questionData = {
        question: `What is the ${i + 1}st pillar of Islam?`,
        options: [
          'Shahada (Declaration of Faith)',
          'Salah (Prayer)',
          'Zakat (Charity)',
          'Sawm (Fasting)'
        ],
        correctAnswer: i % 4, // Vary correct answer
        userAnswer: userCorrect ? (i % 4) : ((i + 1) % 4),
        opponentAnswer: opponentCorrect ? (i % 4) : ((i + 2) % 4),
        explanation: 'The five pillars of Islam are the foundation of Muslim life. They are: Shahada (faith), Salah (prayer), Zakat (charity), Sawm (fasting during Ramadan), and Hajj (pilgrimage to Mecca).',
        reference: 'Sahih Bukhari, Book 2, Hadith 7'
      };

      // Customize based on actual category
      if (categoryName.toLowerCase().includes('quran')) {
        questionData.question = `Question ${i + 1}: How many chapters (Surahs) are in the Quran?`;
        questionData.options = ['114', '110', '120', '100'];
        questionData.explanation = 'The Quran contains 114 chapters (Surahs), revealed to Prophet Muhammad (PBUH) over a period of approximately 23 years.';
        questionData.reference = 'Quran - Complete Text';
      } else if (categoryName.toLowerCase().includes('hadith')) {
        questionData.question = `Question ${i + 1}: Who compiled Sahih Bukhari?`;
        questionData.options = ['Imam Bukhari', 'Imam Muslim', 'Imam Tirmidhi', 'Imam Ahmad'];
        questionData.explanation = 'Sahih Bukhari was compiled by Imam Muhammad ibn Ismail al-Bukhari and is considered one of the most authentic collections of hadith.';
        questionData.reference = 'Islamic Hadith Studies';
      } else if (categoryName.toLowerCase().includes('seerah')) {
        questionData.question = `Question ${i + 1}: In which year was the Prophet Muhammad (PBUH) born?`;
        questionData.options = ['570 CE', '580 CE', '560 CE', '590 CE'];
        questionData.explanation = 'Prophet Muhammad (PBUH) was born in 570 CE in Mecca, in the Year of the Elephant.';
        questionData.reference = 'Seerah Ibn Hisham';
      }

      questions.push(questionData);
    }

    return questions;
  };

  const handleViewChallengeDetails = (challenge) => {
    console.log('View challenge details:', challenge);

    // Create opponent object from challenge
    const opponent = {
      id: challenge.opponentId || challenge.opponentUsername,
      name: challenge.opponentName,
      username: challenge.opponentUsername,
      level: 5,
    };

    // Set challenge data for results screen
    setSelectedOpponent(opponent);
    setSelectedCategory(challenge.category);

    // Generate mock round results if not available
    const mockRoundResults = [];
    const totalQuestions = challenge.totalQuestions || 5;
    for (let i = 1; i <= totalQuestions; i++) {
      mockRoundResults.push({
        round: i,
        userCorrect: i <= challenge.userScore,
        opponentCorrect: i <= challenge.opponentScore,
      });
    }

    // Set results data
    const resultsData = {
      correct: challenge.userScore,
      total: totalQuestions,
      roundResults: mockRoundResults,
    };

    const opponentResultsData = {
      correct: challenge.opponentScore,
      total: totalQuestions,
    };

    setChallengeResults(resultsData);
    setOpponentResults(opponentResultsData);

    // Generate demo questions for review
    const demoQuestions = generateDemoQuestions(challenge.category, resultsData, opponentResultsData);
    setChallengeQuestions(demoQuestions);

    // Close history and show results
    setShowChallengeHistory(false);
    setShowChallengeResults(true);
  };

  const handleRematchFromHistory = (challenge) => {
    console.log('Rematch from history:', challenge);
    // Create opponent object from challenge
    const opponent = {
      id: challenge.opponentId || challenge.opponentUsername,
      name: challenge.opponentName,
      username: challenge.opponentUsername,
      isOnline: false,
      level: 5,
    };
    setSelectedOpponent(opponent);
    setSelectedCategory(challenge.category);
    setShowChallengeHistory(false);
    setShowChallengePreview(true);
  };

  const handleChallengeAgain = (challenge) => {
    console.log('Challenge again:', challenge);
    // Same as rematch
    handleRematchFromHistory(challenge);
  };

  const handleIncomingChallengeClick = (challenge) => {
    setIncomingChallenge(challenge);
    setShowIncomingChallenge(true);
  };

  const handleAcceptChallenge = (challenge) => {
    console.log('Accepting challenge:', challenge);
    setShowIncomingChallenge(false);

    // In production: Accept challenge via API
    // API call: acceptChallenge(challenge.id)

    // Create opponent object from challenge data
    const opponent = {
      id: challenge.challengerId || 'challenger_1',
      name: challenge.challengerName,
      username: challenge.challengerUsername,
      isOnline: challenge.type === 'online',
      lastActive: challenge.type === 'online' ? null : '2h ago',
      isFollowing: false,
      points: 2850,
      level: 11,
      categoryStats: {
        Quran: { accuracy: 92, gamesPlayed: 45 },
        Hadith: { accuracy: 88, gamesPlayed: 32 },
        Seerah: { accuracy: 85, gamesPlayed: 28 },
        Fiqh: { accuracy: 78, gamesPlayed: 20 },
      },
      skillLevel: 'advanced',
    };

    // Set opponent and category, then show VS screen
    setSelectedOpponent(opponent);
    setSelectedCategory(challenge.category);
    setShowChallengePreview(true);
  };

  const handleDeclineChallenge = (challenge) => {
    console.log('Declining challenge:', challenge);
    setShowIncomingChallenge(false);

    // In production: Decline challenge via API
    // API call: declineChallenge(challenge.id)

    alert('Challenge declined');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz</Text>
        <View style={styles.pointsContainer}>
          <Ionicons name="star" size={16} color="#D4AF37" />
          <Text style={styles.pointsText}>2,450 pts</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* Your Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Stats</Text>

            <View style={styles.statsGrid}>
              {/* Total Quizzes */}
              <View style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: '#2196F320' }]}>
                  <Ionicons name="clipboard-outline" size={24} color="#2196F3" />
                </View>
                <Text style={styles.statValue}>47</Text>
                <Text style={styles.statLabel}>Total Quizzes</Text>
              </View>

              {/* Win Rate */}
              <View style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: '#4CAF5020' }]}>
                  <Ionicons name="trending-up-outline" size={24} color="#4CAF50" />
                </View>
                <Text style={styles.statValue}>78%</Text>
                <Text style={styles.statLabel}>Win Rate</Text>
              </View>

              {/* Current Streak */}
              <View style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: '#FF980020' }]}>
                  <Ionicons name="flame-outline" size={24} color="#FF9800" />
                </View>
                <Text style={styles.statValue}>5</Text>
                <Text style={styles.statLabel}>Current Streak</Text>
              </View>

              {/* Best Category */}
              <View style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: '#9C27B020' }]}>
                  <Ionicons name="trophy-outline" size={24} color="#9C27B0" />
                </View>
                <Text style={styles.statValue}>Quran</Text>
                <Text style={styles.statLabel}>Best Category</Text>
              </View>
            </View>
          </View>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>

            <View style={styles.categoriesGrid}>
              {/* Quran */}
              <TouchableOpacity
                style={styles.categoryCard}
                activeOpacity={0.7}
                onPress={() => onCategoryPress?.('Quran')}
              >
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryIcon}>📖</Text>
                  <Text style={styles.categoryName}>Quran</Text>
                </View>
                <Text style={styles.categoryStats}>250 questions</Text>
                <Text style={styles.categoryBest}>Best: 85%</Text>
                <View style={styles.categoryActions}>
                  <TouchableOpacity style={styles.practiceBtn} activeOpacity={0.7}>
                    <Text style={styles.practiceBtnText}>Practice</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.challengeBtn}
                    activeOpacity={0.7}
                    onPress={() => handleChallengeClick('Quran')}
                  >
                    <Text style={styles.challengeBtnText}>Challenge</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {/* Hadith */}
              <TouchableOpacity
                style={styles.categoryCard}
                activeOpacity={0.7}
                onPress={() => onCategoryPress?.('Hadith')}
              >
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryIcon}>📜</Text>
                  <Text style={styles.categoryName}>Hadith</Text>
                </View>
                <Text style={styles.categoryStats}>180 questions</Text>
                <Text style={styles.categoryBest}>Best: 72%</Text>
                <View style={styles.categoryActions}>
                  <TouchableOpacity style={styles.practiceBtn} activeOpacity={0.7}>
                    <Text style={styles.practiceBtnText}>Practice</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.challengeBtn}
                    activeOpacity={0.7}
                    onPress={() => handleChallengeClick('Hadith')}
                  >
                    <Text style={styles.challengeBtnText}>Challenge</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {/* Fiqh */}
              <TouchableOpacity
                style={styles.categoryCard}
                activeOpacity={0.7}
                onPress={() => onCategoryPress?.('Fiqh')}
              >
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryIcon}>⚖️</Text>
                  <Text style={styles.categoryName}>Fiqh</Text>
                </View>
                <Text style={styles.categoryStats}>200 questions</Text>
                <Text style={styles.categoryBest}>Best: 68%</Text>
                <View style={styles.categoryActions}>
                  <TouchableOpacity style={styles.practiceBtn} activeOpacity={0.7}>
                    <Text style={styles.practiceBtnText}>Practice</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.challengeBtn}
                    activeOpacity={0.7}
                    onPress={() => handleChallengeClick('Fiqh')}
                  >
                    <Text style={styles.challengeBtnText}>Challenge</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {/* Seerah */}
              <TouchableOpacity
                style={styles.categoryCard}
                activeOpacity={0.7}
                onPress={() => onCategoryPress?.('Seerah')}
              >
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryIcon}>🕌</Text>
                  <Text style={styles.categoryName}>Seerah</Text>
                </View>
                <Text style={styles.categoryStats}>150 questions</Text>
                <Text style={styles.categoryBest}>Best: 90%</Text>
                <View style={styles.categoryActions}>
                  <TouchableOpacity style={styles.practiceBtn} activeOpacity={0.7}>
                    <Text style={styles.practiceBtnText}>Practice</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.challengeBtn}
                    activeOpacity={0.7}
                    onPress={() => handleChallengeClick('Seerah')}
                  >
                    <Text style={styles.challengeBtnText}>Challenge</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {/* Aqeedah */}
              <TouchableOpacity
                style={styles.categoryCard}
                activeOpacity={0.7}
                onPress={() => onCategoryPress?.('Aqeedah')}
              >
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryIcon}>🤲</Text>
                  <Text style={styles.categoryName}>Aqeedah</Text>
                </View>
                <Text style={styles.categoryStats}>120 questions</Text>
                <Text style={styles.categoryBest}>Best: 75%</Text>
                <View style={styles.categoryActions}>
                  <TouchableOpacity style={styles.practiceBtn} activeOpacity={0.7}>
                    <Text style={styles.practiceBtnText}>Practice</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.challengeBtn}
                    activeOpacity={0.7}
                    onPress={() => handleChallengeClick('Aqeedah')}
                  >
                    <Text style={styles.challengeBtnText}>Challenge</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>

              {/* Islamic History */}
              <TouchableOpacity
                style={styles.categoryCard}
                activeOpacity={0.7}
                onPress={() => onCategoryPress?.('History')}
              >
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryIcon}>🏛️</Text>
                  <Text style={styles.categoryName}>History</Text>
                </View>
                <Text style={styles.categoryStats}>160 questions</Text>
                <Text style={styles.categoryBest}>Best: 80%</Text>
                <View style={styles.categoryActions}>
                  <TouchableOpacity style={styles.practiceBtn} activeOpacity={0.7}>
                    <Text style={styles.practiceBtnText}>Practice</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.challengeBtn}
                    activeOpacity={0.7}
                    onPress={() => handleChallengeClick('History')}
                  >
                    <Text style={styles.challengeBtnText}>Challenge</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Quick Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>

            <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
              <View style={[styles.actionIcon, { backgroundColor: '#4CAF5020' }]}>
                <Ionicons name="play-circle" size={32} color="#4CAF50" />
              </View>
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>Practice Mode</Text>
                <Text style={styles.actionDescription}>Solo practice with random questions</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              activeOpacity={0.7}
              onPress={() => handleChallengeClick(null)}
            >
              <View style={[styles.actionIcon, { backgroundColor: '#D4AF3720' }]}>
                <Ionicons name="people" size={32} color="#D4AF37" />
              </View>
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>Challenge a Friend</Text>
                <Text style={styles.actionDescription}>Compete against your friends</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Active Challenges */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Challenges</Text>
              <TouchableOpacity onPress={() => setShowChallengeHistory(true)}>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            {DEMO_INCOMING_CHALLENGES.map((challenge) => (
              <TouchableOpacity
                key={challenge.id}
                style={styles.challengeCard}
                activeOpacity={0.7}
                onPress={() => handleIncomingChallengeClick(challenge)}
              >
                <View style={styles.challengeAvatar}>
                  <Ionicons name="person-circle" size={48} color="#D4AF37" />
                  {challenge.type === 'online' && (
                    <View style={styles.onlineIndicatorSmall} />
                  )}
                </View>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeName}>Challenge from {challenge.challengerName}</Text>
                  <Text style={styles.challengeCategory}>Category: {challenge.category}</Text>
                  <Text style={styles.challengeTime}>
                    {challenge.type === 'online' ? 'Online now' : '2 hours ago'}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#999" />
              </TouchableOpacity>
            ))}
          </View>

        </View>
      </ScrollView>

      {/* Select Opponent Modal */}
      <Modal
        visible={showSelectOpponent}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SelectOpponentScreen
          category={selectedCategory}
          onBack={() => setShowSelectOpponent(false)}
          onSelectOpponent={handleSelectOpponent}
        />
      </Modal>

      {/* Challenge Preview Screen */}
      <Modal
        visible={showChallengePreview}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChallengePreviewScreen
          currentUser={currentUser}
          opponent={selectedOpponent}
          category={selectedCategory}
          onBack={() => setShowChallengePreview(false)}
          onStart={handleStartChallenge}
        />
      </Modal>

      {/* Challenge Quiz Screen */}
      <Modal
        visible={showChallengeQuiz}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChallengeQuestionScreen
          currentUser={currentUser}
          opponent={selectedOpponent}
          category={selectedCategory}
          onComplete={handleChallengeComplete}
          onExit={handleChallengeExit}
        />
      </Modal>

      {/* Waiting for Opponent Screen */}
      <Modal
        visible={showChallengeSent}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <WaitingForOpponentScreen
          currentUser={currentUser}
          opponent={selectedOpponent}
          category={selectedCategory}
          userScore={challengeResults?.correct || 0}
          onBack={handleBackFromChallengeSent}
          onViewResults={handleViewResults}
        />
      </Modal>

      {/* Challenge Results Screen */}
      <Modal
        visible={showChallengeResults}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChallengeResultsScreen
          currentUser={currentUser}
          opponent={selectedOpponent}
          category={selectedCategory}
          userScore={challengeResults?.correct || 0}
          opponentScore={opponentResults?.correct || 0}
          totalQuestions={challengeResults?.total || 5}
          roundResults={challengeResults?.roundResults || []}
          questions={challengeQuestions}
          onShare={handleShareResults}
          onRematch={handleRematch}
          onDone={handleDoneWithResults}
          onViewAnswers={handleViewAnswers}
        />
      </Modal>

      {/* Challenge Answers Review Screen */}
      <Modal
        visible={showAnswersReview}
        animationType="slide"
        presentationStyle="fullScreen"
        onShow={() => console.log('Modal onShow - showAnswersReview:', showAnswersReview)}
      >
        <ChallengeAnswersReviewScreen
          currentUser={currentUser}
          opponent={selectedOpponent}
          category={selectedCategory}
          questions={challengeQuestions || []}
          onBack={handleBackFromAnswersReview}
        />
      </Modal>

      {/* Challenge History Screen */}
      <Modal
        visible={showChallengeHistory}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChallengeHistoryScreen
          onBack={() => setShowChallengeHistory(false)}
          onViewDetails={handleViewChallengeDetails}
          onRematch={handleRematchFromHistory}
          onChallengeAgain={handleChallengeAgain}
        />
      </Modal>

      {/* Incoming Challenge Modal */}
      <IncomingChallengeModal
        visible={showIncomingChallenge}
        challenge={incomingChallenge}
        onAccept={handleAcceptChallenge}
        onDecline={handleDeclineChallenge}
        onClose={() => setShowIncomingChallenge(false)}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pointsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
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
    width: 48,
    height: 48,
    borderRadius: 24,
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
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    marginHorizontal: '1.5%',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  categoryStats: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  categoryBest: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 12,
  },
  categoryActions: {
    flexDirection: 'row',
    gap: 8,
  },
  practiceBtn: {
    flex: 1,
    backgroundColor: '#2D5F3F',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  practiceBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  challengeBtn: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  challengeBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 13,
    color: '#666',
  },
  badge: {
    backgroundColor: '#FF4444',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  challengeAvatar: {
    marginRight: 12,
  },
  challengeInfo: {
    flex: 1,
  },
  challengeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 4,
  },
  challengeCategory: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  challengeTime: {
    fontSize: 12,
    color: '#999',
  },
  viewAllText: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
  },
  onlineIndicatorSmall: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  successButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  successButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
