import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Demo challenge history data
const DEMO_PENDING_CHALLENGES = [
  {
    id: 'pending_1',
    opponentName: 'Fatima Hassan',
    opponentUsername: 'fatima_h',
    category: 'Fiqh',
    userScore: 4,
    totalQuestions: 5,
    sentAt: '2 hours ago',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'pending_2',
    opponentName: 'Ahmad Ibrahim',
    opponentUsername: 'ahmad_i',
    category: 'Quran',
    userScore: 5,
    totalQuestions: 5,
    sentAt: '5 hours ago',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
];

const DEMO_COMPLETED_CHALLENGES = [
  {
    id: 'completed_1',
    opponentName: 'Yusuf Ali',
    opponentUsername: 'yusuf_ali',
    category: 'Seerah',
    userScore: 4,
    opponentScore: 2,
    totalQuestions: 5,
    result: 'won',
    pointsEarned: 50,
    completedAt: 'Dec 15, 2024',
    timestamp: new Date('2024-12-15').toISOString(),
  },
  {
    id: 'completed_2',
    opponentName: 'Aisha Rahman',
    opponentUsername: 'aisha_r',
    category: 'Hadith',
    userScore: 3,
    opponentScore: 3,
    totalQuestions: 5,
    result: 'tie',
    pointsEarned: 30,
    completedAt: 'Dec 14, 2024',
    timestamp: new Date('2024-12-14').toISOString(),
  },
  {
    id: 'completed_3',
    opponentName: 'Omar Said',
    opponentUsername: 'omar_s',
    category: 'Fiqh',
    userScore: 2,
    opponentScore: 4,
    totalQuestions: 5,
    result: 'lost',
    pointsEarned: 10,
    completedAt: 'Dec 13, 2024',
    timestamp: new Date('2024-12-13').toISOString(),
  },
];

const DEMO_EXPIRED_CHALLENGES = [
  {
    id: 'expired_1',
    opponentName: 'Ibrahim Khalil',
    opponentUsername: 'ibrahim_k',
    category: 'Quran',
    sentAt: 'Dec 14, 2024',
    timestamp: new Date('2024-12-14').toISOString(),
  },
  {
    id: 'expired_2',
    opponentName: 'Mariam Ali',
    opponentUsername: 'mariam_a',
    category: 'Aqeedah',
    sentAt: 'Dec 12, 2024',
    timestamp: new Date('2024-12-12').toISOString(),
  },
];

const CATEGORIES = ['All', 'Quran', 'Hadith', 'Fiqh', 'Seerah', 'Aqeedah', 'History'];

export default function ChallengeHistoryScreen({ onBack, onViewDetails, onRematch, onChallengeAgain }) {
  const [activeTab, setActiveTab] = useState('completed'); // 'pending', 'completed', 'expired'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  const handleCancel = (challengeId) => {
    console.log('Cancel challenge:', challengeId);
    // In production: API call to cancel challenge
  };

  const handleViewDetails = (challenge) => {
    console.log('View challenge details:', challenge);
    onViewDetails?.(challenge);
  };

  const handleRematch = (challenge) => {
    console.log('Request rematch:', challenge);
    onRematch?.(challenge);
  };

  const handleChallengeAgain = (challenge) => {
    console.log('Challenge again:', challenge);
    onChallengeAgain?.(challenge);
  };

  const getFilteredChallenges = (challenges) => {
    if (selectedCategory === 'All') return challenges;
    return challenges.filter(c => c.category === selectedCategory);
  };

  const renderPendingChallenge = (challenge) => (
    <View key={challenge.id} style={styles.challengeCard}>
      <View style={styles.challengeHeader}>
        <View style={styles.opponentAvatar}>
          <Ionicons name="person-circle" size={48} color="#D4AF37" />
        </View>
        <View style={styles.challengeInfo}>
          <Text style={styles.vsText}>vs {challenge.opponentName}</Text>
          <View style={styles.categoryBadge}>
            <Ionicons name="bookmark" size={12} color="#D4AF37" />
            <Text style={styles.categoryText}>{challenge.category}</Text>
          </View>
          <Text style={styles.scoreText}>Your score: {challenge.userScore}/{challenge.totalQuestions}</Text>
          <View style={styles.statusRow}>
            <Ionicons name="time-outline" size={14} color="#FF9800" />
            <Text style={styles.waitingText}>Waiting for opponent...</Text>
          </View>
          <Text style={styles.timestamp}>Sent {challenge.sentAt}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => handleCancel(challenge.id)}
        activeOpacity={0.7}
      >
        <Text style={styles.cancelButtonText}>CANCEL</Text>
      </TouchableOpacity>
    </View>
  );

  const renderCompletedChallenge = (challenge) => {
    const resultConfig = {
      won: { text: 'Won! 🏆', color: '#4CAF50', backgroundColor: '#E8F5E9' },
      lost: { text: 'Lost', color: '#F44336', backgroundColor: '#FFEBEE' },
      tie: { text: 'Tie', color: '#D4AF37', backgroundColor: '#FFF9E6' },
    };
    const config = resultConfig[challenge.result];

    return (
      <View key={challenge.id} style={styles.challengeCard}>
        <View style={styles.challengeHeader}>
          <View style={styles.opponentAvatar}>
            <Ionicons name="person-circle" size={48} color="#D4AF37" />
            {challenge.result === 'won' && (
              <View style={styles.winnerBadgeSmall}>
                <Text style={styles.winnerBadgeEmoji}>🏆</Text>
              </View>
            )}
          </View>
          <View style={styles.challengeInfo}>
            <View style={styles.opponentRow}>
              <Text style={styles.vsText}>vs {challenge.opponentName}</Text>
              <View style={[styles.resultBadge, { backgroundColor: config.backgroundColor }]}>
                <Text style={[styles.resultText, { color: config.color }]}>{config.text}</Text>
              </View>
            </View>
            <View style={styles.categoryBadge}>
              <Ionicons name="bookmark" size={12} color="#D4AF37" />
              <Text style={styles.categoryText}>{challenge.category}</Text>
            </View>
            <Text style={styles.scoreText}>
              Score: {challenge.userScore} - {challenge.opponentScore}
            </Text>
            <View style={styles.pointsRow}>
              <Ionicons name="star" size={14} color="#D4AF37" />
              <Text style={styles.pointsText}>+{challenge.pointsEarned} pts</Text>
            </View>
            <Text style={styles.timestamp}>{challenge.completedAt}</Text>
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => handleViewDetails(challenge)}
            activeOpacity={0.7}
          >
            <Text style={styles.detailsButtonText}>VIEW DETAILS</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.rematchButton}
            onPress={() => handleRematch(challenge)}
            activeOpacity={0.7}
          >
            <Ionicons name="refresh" size={16} color="#2D5F3F" />
            <Text style={styles.rematchButtonText}>REMATCH</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderExpiredChallenge = (challenge) => (
    <View key={challenge.id} style={styles.challengeCard}>
      <View style={styles.challengeHeader}>
        <View style={styles.opponentAvatar}>
          <Ionicons name="person-circle" size={48} color="#999" />
        </View>
        <View style={styles.challengeInfo}>
          <Text style={styles.vsText}>vs {challenge.opponentName}</Text>
          <View style={styles.categoryBadge}>
            <Ionicons name="bookmark" size={12} color="#999" />
            <Text style={[styles.categoryText, { color: '#999' }]}>{challenge.category}</Text>
          </View>
          <View style={styles.statusRow}>
            <Ionicons name="close-circle-outline" size={14} color="#F44336" />
            <Text style={styles.expiredText}>No response</Text>
          </View>
          <Text style={styles.timestamp}>{challenge.sentAt}</Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.challengeAgainButton}
        onPress={() => handleChallengeAgain(challenge)}
        activeOpacity={0.7}
      >
        <Text style={styles.challengeAgainButtonText}>CHALLENGE AGAIN</Text>
      </TouchableOpacity>
    </View>
  );

  const renderContent = () => {
    let challenges = [];
    let renderFunction = null;

    switch (activeTab) {
      case 'pending':
        challenges = getFilteredChallenges(DEMO_PENDING_CHALLENGES);
        renderFunction = renderPendingChallenge;
        break;
      case 'completed':
        challenges = getFilteredChallenges(DEMO_COMPLETED_CHALLENGES);
        renderFunction = renderCompletedChallenge;
        break;
      case 'expired':
        challenges = getFilteredChallenges(DEMO_EXPIRED_CHALLENGES);
        renderFunction = renderExpiredChallenge;
        break;
      default:
        return null;
    }

    if (challenges.length === 0) {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="trophy-outline" size={64} color="#D4AF37" />
          <Text style={styles.emptyTitle}>No challenges here</Text>
          <Text style={styles.emptyMessage}>
            {activeTab === 'pending' && "You don't have any pending challenges"}
            {activeTab === 'completed' && "You haven't completed any challenges yet"}
            {activeTab === 'expired' && "No expired challenges"}
          </Text>
        </View>
      );
    }

    return challenges.map(challenge => renderFunction(challenge));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2D5F3F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Challenge History</Text>
        <TouchableOpacity
          onPress={() => setShowCategoryFilter(!showCategoryFilter)}
          style={styles.filterButton}
        >
          <Ionicons name="funnel-outline" size={24} color="#2D5F3F" />
        </TouchableOpacity>
      </View>

      {/* Category Filter */}
      {showCategoryFilter && (
        <View style={styles.filterSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryFilters}
          >
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryFilterChip,
                  selectedCategory === category && styles.categoryFilterChipActive,
                ]}
                onPress={() => setSelectedCategory(category)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.categoryFilterText,
                    selectedCategory === category && styles.categoryFilterTextActive,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'pending' && styles.tabActive]}
          onPress={() => setActiveTab('pending')}
        >
          <Text style={[styles.tabText, activeTab === 'pending' && styles.tabTextActive]}>
            Pending
          </Text>
          {DEMO_PENDING_CHALLENGES.length > 0 && (
            <View style={styles.tabBadge}>
              <Text style={styles.tabBadgeText}>{DEMO_PENDING_CHALLENGES.length}</Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.tabActive]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.tabTextActive]}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'expired' && styles.tabActive]}
          onPress={() => setActiveTab('expired')}
        >
          <Text style={[styles.tabText, activeTab === 'expired' && styles.tabTextActive]}>
            Expired
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>{renderContent()}</View>
      </ScrollView>
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
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D5F3F',
    flex: 1,
    textAlign: 'center',
  },
  filterButton: {
    padding: 8,
  },
  filterSection: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingVertical: 12,
  },
  categoryFilters: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryFilterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoryFilterChipActive: {
    backgroundColor: '#2D5F3F',
    borderColor: '#2D5F3F',
  },
  categoryFilterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  categoryFilterTextActive: {
    color: '#FFFFFF',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  tabActive: {
    borderBottomColor: '#D4AF37',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  tabTextActive: {
    color: '#2D5F3F',
    fontWeight: '600',
  },
  tabBadge: {
    backgroundColor: '#D4AF37',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  tabBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  challengeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  challengeHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  opponentAvatar: {
    marginRight: 12,
    position: 'relative',
  },
  winnerBadgeSmall: {
    position: 'absolute',
    bottom: -4,
    right: -4,
  },
  winnerBadgeEmoji: {
    fontSize: 20,
  },
  challengeInfo: {
    flex: 1,
  },
  opponentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  vsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 6,
  },
  resultBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  resultText: {
    fontSize: 12,
    fontWeight: '600',
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
    marginBottom: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  scoreText: {
    fontSize: 14,
    color: '#2D5F3F',
    marginBottom: 4,
    fontWeight: '500',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  waitingText: {
    fontSize: 13,
    color: '#FF9800',
    fontWeight: '500',
  },
  expiredText: {
    fontSize: 13,
    color: '#F44336',
    fontWeight: '500',
  },
  pointsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  pointsText: {
    fontSize: 13,
    color: '#D4AF37',
    fontWeight: '600',
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#2D5F3F',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  rematchButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    borderWidth: 1,
    borderColor: '#2D5F3F',
  },
  rematchButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  challengeAgainButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  challengeAgainButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D5F3F',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
