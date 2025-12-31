import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import SelectOpponentScreen from './SelectOpponentScreen';
import ChallengeConfirmationModal from '../modals/ChallengeConfirmationModal';
import ChallengeSentScreen from './ChallengeSentScreen';
import IncomingChallengeModal from '../modals/IncomingChallengeModal';

export default function QuizScreen({ userData, onCategoryPress }) {
  const [showSelectOpponent, setShowSelectOpponent] = useState(false);
  const [showChallengeConfirm, setShowChallengeConfirm] = useState(false);
  const [showChallengeSent, setShowChallengeSent] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showIncomingChallenge, setShowIncomingChallenge] = useState(false);
  const [incomingChallenge, setIncomingChallenge] = useState(null);

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
    setShowChallengeConfirm(true);
  };

  const handleConfirmChallenge = () => {
    // In production: Send API call to create challenge
    console.log('Challenge confirmed:', { opponent: selectedOpponent, category: selectedCategory });
    setShowChallengeConfirm(false);

    // Show ChallengeSentScreen for offline opponents
    if (!selectedOpponent.isOnline) {
      setShowChallengeSent(true);
    } else {
      // For online opponents, directly start the quiz
      // TODO: Navigate to quiz screen
      console.log('Starting quiz immediately for online opponent');
    }
  };

  const handleStartQuiz = (results) => {
    console.log('Challenge quiz completed with results:', results);
    // In production: Save challenge answers to API
    // API call: saveChallengeAnswers({ challengeId, results, opponentId: selectedOpponent.id })

    // Close the Challenge Sent screen and show success message
    setShowChallengeSent(false);

    // TODO: Show a success screen or navigate back to quiz home with confirmation
    alert(`Quiz completed! Score: ${results.score}%\n\nYour answers have been saved. We'll notify you when ${selectedOpponent?.name} accepts the challenge!`);
  };

  const handleBackFromChallengeSent = () => {
    setShowChallengeSent(false);
    setSelectedOpponent(null);
    setSelectedCategory(null);
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

    // Navigate to quiz screen to start the challenge
    alert(`Challenge accepted! Starting ${challenge.category} quiz...`);
    // TODO: Navigate to QuizQuestionScreen with challenge data
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
              <TouchableOpacity>
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

      {/* Challenge Confirmation Modal */}
      <ChallengeConfirmationModal
        visible={showChallengeConfirm}
        opponent={selectedOpponent}
        category={selectedCategory}
        onCancel={() => setShowChallengeConfirm(false)}
        onConfirm={handleConfirmChallenge}
      />

      {/* Challenge Sent Screen Modal */}
      <Modal
        visible={showChallengeSent}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChallengeSentScreen
          opponent={selectedOpponent}
          category={selectedCategory}
          onStartQuiz={handleStartQuiz}
          onBack={handleBackFromChallengeSent}
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
});
