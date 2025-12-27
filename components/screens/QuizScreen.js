import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuizScreen({ userData, onCategoryPress }) {
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
                  <TouchableOpacity style={styles.challengeBtn} activeOpacity={0.7}>
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
                  <TouchableOpacity style={styles.challengeBtn} activeOpacity={0.7}>
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
                  <TouchableOpacity style={styles.challengeBtn} activeOpacity={0.7}>
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
                  <TouchableOpacity style={styles.challengeBtn} activeOpacity={0.7}>
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
                  <TouchableOpacity style={styles.challengeBtn} activeOpacity={0.7}>
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
                  <TouchableOpacity style={styles.challengeBtn} activeOpacity={0.7}>
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

            <TouchableOpacity style={styles.actionCard} activeOpacity={0.7}>
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
});
