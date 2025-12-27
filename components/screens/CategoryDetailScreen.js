import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CategoryDetailScreen({ category, onBack }) {
  // Mock data based on category
  const getCategoryData = () => {
    const categories = {
      Quran: {
        icon: '📖',
        color: '#2196F3',
        questionsAnswered: 120,
        accuracyRate: 85,
        rank: 3,
        points: 2450,
        totalQuestions: 250,
      },
      Hadith: {
        icon: '📜',
        color: '#9C27B0',
        questionsAnswered: 85,
        accuracyRate: 72,
        rank: 7,
        points: 1820,
        totalQuestions: 180,
      },
      Fiqh: {
        icon: '⚖️',
        color: '#FF9800',
        questionsAnswered: 95,
        accuracyRate: 68,
        rank: 12,
        points: 1540,
        totalQuestions: 200,
      },
      Seerah: {
        icon: '🕌',
        color: '#4CAF50',
        questionsAnswered: 110,
        accuracyRate: 90,
        rank: 1,
        points: 2890,
        totalQuestions: 150,
      },
      Aqeedah: {
        icon: '🤲',
        color: '#E91E63',
        questionsAnswered: 75,
        accuracyRate: 75,
        rank: 5,
        points: 1650,
        totalQuestions: 120,
      },
      History: {
        icon: '🏛️',
        color: '#795548',
        questionsAnswered: 90,
        accuracyRate: 80,
        rank: 4,
        points: 2100,
        totalQuestions: 160,
      },
    };
    return categories[category] || categories.Quran;
  };

  const data = getCategoryData();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <View style={styles.headerIconContainer}>
            <Text style={styles.headerIcon}>{data.icon}</Text>
          </View>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{category}</Text>
            <Text style={styles.headerSubtitle}>Rank #{data.rank} • {data.points} pts</Text>
          </View>
        </View>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* Your Category Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Category Stats</Text>

            <View style={styles.statsGrid}>
              {/* Questions Answered */}
              <View style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: `${data.color}20` }]}>
                  <Ionicons name="checkmark-circle-outline" size={28} color={data.color} />
                </View>
                <Text style={styles.statValue}>{data.questionsAnswered}/{data.totalQuestions}</Text>
                <Text style={styles.statLabel}>Questions Answered</Text>
              </View>

              {/* Accuracy Rate */}
              <View style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: '#4CAF5020' }]}>
                  <Ionicons name="analytics-outline" size={28} color="#4CAF50" />
                </View>
                <Text style={styles.statValue}>{data.accuracyRate}%</Text>
                <Text style={styles.statLabel}>Accuracy Rate</Text>
              </View>

              {/* Category Rank */}
              <View style={styles.statCard}>
                <View style={[styles.statIconContainer, { backgroundColor: '#D4AF3720' }]}>
                  <Ionicons name="trophy-outline" size={28} color="#D4AF37" />
                </View>
                <Text style={styles.statValue}>#{data.rank}</Text>
                <Text style={styles.statLabel}>Category Rank</Text>
              </View>
            </View>
          </View>

          {/* Difficulty Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Difficulty Selection</Text>

            <TouchableOpacity style={styles.difficultyCard} activeOpacity={0.7}>
              <View style={styles.difficultyInfo}>
                <View style={styles.difficultyHeader}>
                  <Text style={styles.difficultyTitle}>Easy</Text>
                  <View style={[styles.difficultyBadge, { backgroundColor: '#4CAF5020' }]}>
                    <Ionicons name="star" size={16} color="#4CAF50" />
                  </View>
                </View>
                <Text style={styles.difficultyDescription}>
                  Basic questions to build your foundation
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.difficultyCard} activeOpacity={0.7}>
              <View style={styles.difficultyInfo}>
                <View style={styles.difficultyHeader}>
                  <Text style={styles.difficultyTitle}>Medium</Text>
                  <View style={[styles.difficultyBadge, { backgroundColor: '#FF980020' }]}>
                    <Ionicons name="star" size={16} color="#FF9800" />
                    <Ionicons name="star" size={16} color="#FF9800" style={{ marginLeft: 2 }} />
                  </View>
                </View>
                <Text style={styles.difficultyDescription}>
                  Intermediate level to test your knowledge
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.difficultyCard} activeOpacity={0.7}>
              <View style={styles.difficultyInfo}>
                <View style={styles.difficultyHeader}>
                  <Text style={styles.difficultyTitle}>Hard</Text>
                  <View style={[styles.difficultyBadge, { backgroundColor: '#FF444420' }]}>
                    <Ionicons name="star" size={16} color="#FF4444" />
                    <Ionicons name="star" size={16} color="#FF4444" style={{ marginLeft: 2 }} />
                    <Ionicons name="star" size={16} color="#FF4444" style={{ marginLeft: 2 }} />
                  </View>
                </View>
                <Text style={styles.difficultyDescription}>
                  Advanced questions for experts
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Actions */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Actions</Text>

            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <View style={[styles.actionIconContainer, { backgroundColor: '#2D5F3F' }]}>
                <Ionicons name="play-circle-outline" size={24} color="#FFFFFF" />
              </View>
              <Text style={styles.actionButtonText}>Practice</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.actionButtonOutline]} activeOpacity={0.7}>
              <View style={[styles.actionIconContainer, { backgroundColor: 'transparent' }]}>
                <Ionicons name="people-outline" size={24} color="#2D5F3F" />
              </View>
              <Text style={[styles.actionButtonText, { color: '#2D5F3F' }]}>Challenge</Text>
            </TouchableOpacity>
          </View>

          {/* Leaderboard Preview */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Leaderboard</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View Full Leaderboard</Text>
              </TouchableOpacity>
            </View>

            {/* Top 3 Users */}
            <View style={styles.leaderboardCard}>
              {/* 1st Place */}
              <View style={styles.leaderboardItem}>
                <View style={styles.leaderboardRank}>
                  <Ionicons name="trophy" size={24} color="#D4AF37" />
                </View>
                <Ionicons name="person-circle" size={40} color="#D4AF37" style={{ marginRight: 12 }} />
                <View style={styles.leaderboardInfo}>
                  <Text style={styles.leaderboardName}>Ahmad Ibrahim</Text>
                  <Text style={styles.leaderboardScore}>3,450 pts • 95% accuracy</Text>
                </View>
              </View>

              {/* 2nd Place */}
              <View style={styles.leaderboardItem}>
                <View style={styles.leaderboardRank}>
                  <Text style={styles.rankNumber}>2</Text>
                </View>
                <Ionicons name="person-circle" size={40} color="#C0C0C0" style={{ marginRight: 12 }} />
                <View style={styles.leaderboardInfo}>
                  <Text style={styles.leaderboardName}>Fatima Hassan</Text>
                  <Text style={styles.leaderboardScore}>3,120 pts • 92% accuracy</Text>
                </View>
              </View>

              {/* 3rd Place */}
              <View style={styles.leaderboardItem}>
                <View style={styles.leaderboardRank}>
                  <Text style={styles.rankNumber}>3</Text>
                </View>
                <Ionicons name="person-circle" size={40} color="#CD7F32" style={{ marginRight: 12 }} />
                <View style={styles.leaderboardInfo}>
                  <Text style={styles.leaderboardName}>You</Text>
                  <Text style={styles.leaderboardScore}>{data.points} pts • {data.accuracyRate}% accuracy</Text>
                </View>
                <View style={styles.youBadge}>
                  <Text style={styles.youBadgeText}>You</Text>
                </View>
              </View>
            </View>
          </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  headerIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  headerIcon: {
    fontSize: 28,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  placeholder: {
    width: 32,
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
    width: '31%',
    marginHorizontal: '1%',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  difficultyCard: {
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
  difficultyInfo: {
    flex: 1,
  },
  difficultyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  difficultyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginRight: 8,
  },
  difficultyBadge: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  difficultyDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  actionButton: {
    backgroundColor: '#2D5F3F',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2D5F3F',
  },
  actionIconContainer: {
    marginRight: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  viewAllText: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
  },
  leaderboardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  leaderboardRank: {
    width: 32,
    height: 32,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  leaderboardInfo: {
    flex: 1,
  },
  leaderboardName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 2,
  },
  leaderboardScore: {
    fontSize: 12,
    color: '#666',
  },
  youBadge: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  youBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
