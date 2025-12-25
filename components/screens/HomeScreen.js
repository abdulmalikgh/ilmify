import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ userData }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Assalamu Alaikum</Text>
          <Text style={styles.userName}>
            {userData?.fullName || userData?.username || 'Friend'}
          </Text>
        </View>
        <View style={styles.headerIcons}>
          <Ionicons name="search" size={24} color="#FFFFFF" style={styles.headerIcon} />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* Quick Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Ionicons name="trophy" size={28} color="#D4AF37" />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="checkmark-circle" size={28} color="#4CAF50" />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Completed</Text>
            </View>
            <View style={styles.statCard}>
              <Ionicons name="flame" size={28} color="#FF9800" />
              <Text style={styles.statValue}>0</Text>
              <Text style={styles.statLabel}>Day Streak</Text>
            </View>
          </View>

          {/* Feed Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Community Feed</Text>
            <View style={styles.placeholderCard}>
              <Ionicons name="chatbubbles-outline" size={48} color="#D4AF37" />
              <Text style={styles.placeholderTitle}>No posts yet</Text>
              <Text style={styles.placeholderText}>
                Be the first to share a question or knowledge with the community
              </Text>
            </View>
          </View>

          {/* Daily Quiz */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Challenge</Text>
            <View style={styles.dailyQuizCard}>
              <View style={styles.dailyQuizHeader}>
                <Ionicons name="bulb" size={32} color="#D4AF37" />
                <View style={styles.dailyQuizInfo}>
                  <Text style={styles.dailyQuizTitle}>Today's Quiz</Text>
                  <Text style={styles.dailyQuizSubtitle}>Test your knowledge</Text>
                </View>
              </View>
              <Text style={styles.dailyQuizDescription}>
                Complete today's challenge to earn bonus points and maintain your streak!
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
  greeting: {
    fontSize: 14,
    color: '#E8F5E9',
    marginBottom: 4,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  headerIcon: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 12,
  },
  placeholderCard: {
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
  dailyQuizCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#D4AF37',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dailyQuizHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 12,
  },
  dailyQuizInfo: {
    flex: 1,
  },
  dailyQuizTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 4,
  },
  dailyQuizSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  dailyQuizDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
