import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChallengePreviewScreen({
  currentUser,
  opponent,
  category,
  onStart,
  onBack
}) {
  if (!opponent || !currentUser) return null;

  // Calculate reward points based on category/difficulty
  const rewardPoints = 50;

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
        <Text style={styles.headerTitle}>
          {category ? `${category} Challenge` : 'Challenge'}
        </Text>
        <View style={styles.backButton} />
      </View>

      {/* VS Display */}
      <View style={styles.vsSection}>
        {/* Current User */}
        <View style={styles.playerContainer}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarCircle, styles.currentUserAvatar]}>
              <Ionicons name="person" size={48} color="#2D5F3F" />
            </View>
          </View>
          <Text style={styles.playerName} numberOfLines={1}>
            {currentUser.name || 'You'}
          </Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Level {currentUser.level || 1}</Text>
          </View>
        </View>

        {/* VS Text */}
        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        {/* Opponent */}
        <View style={styles.playerContainer}>
          <View style={styles.avatarContainer}>
            <View style={[styles.avatarCircle, styles.opponentAvatar]}>
              <Ionicons name="person" size={48} color="#D4AF37" />
            </View>
            {opponent.isOnline && (
              <View style={styles.onlineIndicator} />
            )}
          </View>
          <Text style={styles.playerName} numberOfLines={1}>
            {opponent.name}
          </Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Level {opponent.level || 1}</Text>
          </View>
        </View>
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

      {/* Spacer */}
      <View style={styles.spacer} />

      {/* Reward Display */}
      <View style={styles.rewardSection}>
        <Text style={styles.rewardLabel}>WINNER GETS</Text>
        <View style={styles.rewardBadge}>
          <Ionicons name="star" size={24} color="#D4AF37" />
          <Text style={styles.rewardPoints}>{rewardPoints} PTS</Text>
        </View>
      </View>

      {/* Challenge Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Ionicons name="help-circle-outline" size={20} color="#2D5F3F" />
          <Text style={styles.infoText}>5 questions</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={20} color="#2D5F3F" />
          <Text style={styles.infoText}>5 minutes</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="flash-outline" size={20} color="#2D5F3F" />
          <Text style={styles.infoText}>
            {opponent.isOnline ? 'Live match' : 'Async challenge'}
          </Text>
        </View>
      </View>

      {/* Start Button */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={onStart}
        activeOpacity={0.8}
      >
        <Text style={styles.startButtonText}>START</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  vsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 40,
    marginTop: 20,
  },
  playerContainer: {
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
  },
  currentUserAvatar: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2D5F3F',
  },
  opponentAvatar: {
    backgroundColor: '#FFF9E6',
    borderColor: '#D4AF37',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#4CAF50',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 8,
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  levelBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  vsContainer: {
    marginHorizontal: 16,
  },
  vsText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4AF37',
    letterSpacing: 2,
  },
  categoryBadgeContainer: {
    alignItems: 'center',
    marginTop: 8,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D4AF37',
    gap: 8,
  },
  categoryBadgeText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  spacer: {
    flex: 1,
  },
  rewardSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  rewardLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#D4AF37',
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#D4AF37',
    gap: 8,
  },
  rewardPoints: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  infoSection: {
    backgroundColor: '#F5F5F5',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#2D5F3F',
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
});
