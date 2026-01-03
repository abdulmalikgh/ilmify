import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function ChallengeResultsScreen({
  currentUser,
  opponent,
  category,
  userScore,
  opponentScore,
  totalQuestions,
  roundResults, // Array of { round: 1, userCorrect: true, opponentCorrect: true }
  questions, // Array of question objects with answers
  onShare,
  onRematch,
  onDone,
  onViewAnswers
}) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  if (!currentUser || !opponent) return null;

  // Determine winner
  const isWin = userScore > opponentScore;
  const isTie = userScore === opponentScore;
  const isLoss = userScore < opponentScore;

  // Calculate points earned
  const pointsEarned = isWin ? 50 : isTie ? 30 : 10;

  // Result banner configuration
  const getBannerConfig = () => {
    if (isWin) {
      return {
        text: 'YOU WON! 🏆',
        color: '#4CAF50',
        backgroundColor: '#E8F5E9',
      };
    } else if (isTie) {
      return {
        text: "IT'S A TIE!",
        color: '#D4AF37',
        backgroundColor: '#FFF9E6',
      };
    } else {
      return {
        text: 'YOU LOST',
        color: '#F44336',
        backgroundColor: '#FFEBEE',
      };
    }
  };

  const bannerConfig = getBannerConfig();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.headerTitle}>Challenge Complete!</Text>
        <TouchableOpacity onPress={onDone} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#2D5F3F" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Result Banner */}
        <View style={[styles.resultBanner, { backgroundColor: bannerConfig.backgroundColor }]}>
          <Text style={[styles.resultText, { color: bannerConfig.color }]}>
            {bannerConfig.text}
          </Text>
        </View>

        {/* VS Display with Scores */}
        <View style={styles.vsSection}>
          {/* Current User */}
          <View style={styles.playerContainer}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatarCircle, styles.currentUserAvatar]}>
                <Ionicons name="person" size={48} color="#2D5F3F" />
              </View>
              {isWin && (
                <View style={styles.winnerBadge}>
                  <Text style={styles.winnerBadgeEmoji}>🏆</Text>
                </View>
              )}
            </View>
            <Text style={styles.playerName} numberOfLines={1}>
              {currentUser.name}
            </Text>
            {isWin && <Text style={styles.winnerText}>Winner! 🏆</Text>}
          </View>

          {/* Score Display */}
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{userScore} : {opponentScore}</Text>
          </View>

          {/* Opponent */}
          <View style={styles.playerContainer}>
            <View style={styles.avatarContainer}>
              <View style={[styles.avatarCircle, styles.opponentAvatar]}>
                <Ionicons name="person" size={48} color="#D4AF37" />
              </View>
              {isLoss && (
                <View style={styles.winnerBadge}>
                  <Text style={styles.winnerBadgeEmoji}>🏆</Text>
                </View>
              )}
            </View>
            <Text style={styles.playerName} numberOfLines={1}>
              {opponent.name}
            </Text>
            {isLoss && <Text style={styles.winnerText}>Winner! 🏆</Text>}
          </View>
        </View>

        {/* Points Earned */}
        <View style={styles.pointsSection}>
          <Text style={styles.pointsLabel}>Points Earned</Text>
          <View style={styles.pointsBadge}>
            <Ionicons name="star" size={32} color="#D4AF37" />
            <Text style={styles.pointsValue}>+{pointsEarned} PTS</Text>
          </View>
          <Text style={styles.pointsDescription}>
            {isWin && 'Great job! You earned winner points!'}
            {isTie && 'Both players earn points for the tie!'}
            {isLoss && 'Good effort! You earned participation points!'}
          </Text>
        </View>

        {/* Category Badge */}
        {category && (
          <View style={styles.categoryBadgeContainer}>
            <View style={styles.categoryBadge}>
              <Ionicons name="bookmark" size={16} color="#D4AF37" />
              <Text style={styles.categoryBadgeText}>{category}</Text>
            </View>
          </View>
        )}

        {/* Head-to-Head Breakdown */}
        {roundResults && roundResults.length > 0 && (
          <View style={styles.breakdownSection}>
            <TouchableOpacity
              style={styles.breakdownHeader}
              onPress={() => setShowBreakdown(!showBreakdown)}
              activeOpacity={0.7}
            >
              <Text style={styles.breakdownTitle}>Head-to-Head Breakdown</Text>
              <Ionicons
                name={showBreakdown ? 'chevron-up' : 'chevron-down'}
                size={24}
                color="#2D5F3F"
              />
            </TouchableOpacity>

            {showBreakdown && (
              <View style={styles.breakdownContent}>
                {roundResults.map((round, index) => (
                  <View key={index} style={styles.roundRow}>
                    <Text style={styles.roundLabel}>Round {round.round}</Text>
                    <View style={styles.roundResults}>
                      <View style={styles.roundResult}>
                        <Text style={styles.roundResultLabel}>You</Text>
                        {round.userCorrect ? (
                          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                        ) : (
                          <Ionicons name="close-circle" size={20} color="#F44336" />
                        )}
                      </View>
                      <View style={styles.roundDivider} />
                      <View style={styles.roundResult}>
                        <Text style={styles.roundResultLabel}>{opponent.name}</Text>
                        {round.opponentCorrect ? (
                          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                        ) : (
                          <Ionicons name="close-circle" size={20} color="#F44336" />
                        )}
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        {/* Detailed Review Button */}
        <TouchableOpacity
          style={styles.reviewButton}
          activeOpacity={0.7}
          onPress={() => {
            console.log('View Answers button pressed');
            console.log('onViewAnswers exists?', !!onViewAnswers);
            if (onViewAnswers) {
              onViewAnswers();
            } else {
              console.log('ERROR: onViewAnswers is undefined!');
            }
          }}
        >
          <Ionicons name="document-text-outline" size={24} color="#2D5F3F" />
          <Text style={styles.reviewButtonText}>View Answers</Text>
          <Ionicons name="chevron-forward" size={20} color="#2D5F3F" />
        </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.actionsSection}>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={onShare}
            activeOpacity={0.8}
          >
            <Ionicons name="share-social" size={20} color="#FFFFFF" />
            <Text style={styles.shareButtonText}>SHARE RESULT</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.rematchButton}
            onPress={onRematch}
            activeOpacity={0.8}
          >
            <Ionicons name="refresh" size={20} color="#D4AF37" />
            <Text style={styles.rematchButtonText}>REMATCH</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.doneButton}
            onPress={onDone}
            activeOpacity={0.8}
          >
            <Text style={styles.doneButtonText}>DONE</Text>
          </TouchableOpacity>
        </View>
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
  headerSpacer: {
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  closeButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  resultBanner: {
    paddingVertical: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  vsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  playerContainer: {
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
  },
  currentUserAvatar: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2D5F3F',
  },
  opponentAvatar: {
    backgroundColor: '#FFF9E6',
    borderColor: '#D4AF37',
  },
  winnerBadge: {
    position: 'absolute',
    bottom: -8,
  },
  winnerBadgeEmoji: {
    fontSize: 28,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 4,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  winnerText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#D4AF37',
  },
  scoreContainer: {
    marginHorizontal: 12,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  scoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D5F3F',
    letterSpacing: 2,
  },
  pointsSection: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  pointsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
  },
  pointsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  pointsValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#D4AF37',
  },
  pointsDescription: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
  },
  categoryBadgeContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#D4AF37',
    gap: 6,
  },
  categoryBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  breakdownSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  breakdownContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 12,
  },
  roundRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  roundLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
    flex: 1,
  },
  roundResults: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  roundResult: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  roundResultLabel: {
    fontSize: 13,
    color: '#666',
  },
  roundDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E0E0E0',
  },
  reviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    gap: 12,
    borderWidth: 2,
    borderColor: '#2D5F3F',
  },
  reviewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  actionsSection: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    gap: 12,
  },
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D5F3F',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    elevation: 4,
    shadowColor: '#2D5F3F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  shareButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  rematchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: '#D4AF37',
  },
  rematchButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D4AF37',
    letterSpacing: 1,
  },
  doneButton: {
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  doneButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
});
