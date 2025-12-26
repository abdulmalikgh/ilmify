import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuizScreen({ userData }) {
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

          {/* Pending Challenges */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Pending Challenges</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>2</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.challengeCard} activeOpacity={0.7}>
              <View style={styles.challengeAvatar}>
                <Ionicons name="person-circle" size={48} color="#D4AF37" />
              </View>
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeName}>Challenge from Ahmad</Text>
                <Text style={styles.challengeCategory}>Category: Quran</Text>
                <Text style={styles.challengeTime}>2 hours ago</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.challengeCard} activeOpacity={0.7}>
              <View style={styles.challengeAvatar}>
                <Ionicons name="person-circle" size={48} color="#D4AF37" />
              </View>
              <View style={styles.challengeInfo}>
                <Text style={styles.challengeName}>Challenge from Fatima</Text>
                <Text style={styles.challengeCategory}>Category: Hadith</Text>
                <Text style={styles.challengeTime}>5 hours ago</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#999" />
            </TouchableOpacity>
          </View>

          {/* Practice Mode */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Practice Mode</Text>

            <TouchableOpacity style={styles.practiceCard} activeOpacity={0.7}>
              <View style={[styles.practiceIcon, { backgroundColor: '#4CAF5020' }]}>
                <Ionicons name="bulb" size={32} color="#4CAF50" />
              </View>
              <View style={styles.practiceInfo}>
                <Text style={styles.practiceTitle}>Quick Quiz</Text>
                <Text style={styles.practiceDescription}>
                  Test your knowledge with 10 random questions
                </Text>
              </View>
              <Ionicons name="play-circle" size={32} color="#D4AF37" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.practiceCard} activeOpacity={0.7}>
              <View style={[styles.practiceIcon, { backgroundColor: '#2196F320' }]}>
                <Ionicons name="school" size={32} color="#2196F3" />
              </View>
              <View style={styles.practiceInfo}>
                <Text style={styles.practiceTitle}>Category Practice</Text>
                <Text style={styles.practiceDescription}>
                  Choose a specific category to focus on
                </Text>
              </View>
              <Ionicons name="play-circle" size={32} color="#D4AF37" />
            </TouchableOpacity>
          </View>

          {/* Leaderboard Preview */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Leaderboard</Text>
              <TouchableOpacity>
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.leaderboardCard}>
              <Ionicons name="trophy-outline" size={48} color="#D4AF37" />
              <Text style={styles.placeholderTitle}>Climb the Ranks</Text>
              <Text style={styles.placeholderText}>
                Complete quizzes and challenges to appear on the leaderboard
              </Text>
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
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
    marginTop: 12,
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
  practiceCard: {
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
  practiceIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  practiceInfo: {
    flex: 1,
  },
  practiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 4,
  },
  practiceDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  viewAllText: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
  },
  leaderboardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  placeholderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginTop: 16,
    marginBottom: 8,
  },
  placeholderText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
