import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Demo notifications data with different types
const DEMO_NOTIFICATIONS = [
  {
    id: 1,
    type: 'challenge_received',
    user: {
      name: 'Ahmad Ibrahim',
      username: 'ahmad_i',
    },
    category: 'Seerah',
    time: '2 hours ago',
    unread: true,
  },
  {
    id: 2,
    type: 'challenge_result',
    user: {
      name: 'Fatima Hassan',
      username: 'fatima_h',
    },
    category: 'Fiqh',
    score: { user: 4, opponent: 2 },
    result: 'won',
    time: '3 hours ago',
    unread: true,
  },
  {
    id: 3,
    type: 'challenge_expired',
    user: {
      name: 'Yusuf Ali',
      username: 'yusuf_ali',
    },
    category: 'Quran',
    time: '1 day ago',
    unread: false,
  },
  {
    id: 4,
    type: 'new_follower',
    user: {
      name: 'Aisha Mohamed',
      username: 'aisha_m',
    },
    time: '5 hours ago',
    unread: true,
  },
  {
    id: 5,
    type: 'post_like',
    user: {
      name: 'Omar Abdullah',
      username: 'omar_a',
    },
    post: {
      preview: 'What are the conditions of Salah...',
    },
    time: '6 hours ago',
    unread: false,
  },
  {
    id: 6,
    type: 'comment',
    user: {
      name: 'Zaynab Khan',
      username: 'zaynab_k',
    },
    comment: {
      preview: 'JazakAllah khair for this explanation...',
    },
    post: {
      preview: 'Understanding the pillars of Islam',
    },
    time: '8 hours ago',
    unread: false,
  },
  {
    id: 7,
    type: 'achievement',
    achievement: {
      title: 'Week Streak',
      icon: 'ribbon',
    },
    time: '2 days ago',
    unread: false,
  },
];

export default function NotificationsScreen({ userData }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [notifications, setNotifications] = useState(DEMO_NOTIFICATIONS);

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'challenges', label: 'Challenges' },
    { id: 'social', label: 'Social' },
    { id: 'system', label: 'System' },
  ];

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const handleAcceptChallenge = (notificationId) => {
    console.log('Accept challenge:', notificationId);
    // Handle accept challenge logic
  };

  const handleDeclineChallenge = (notificationId) => {
    console.log('Decline challenge:', notificationId);
    // Handle decline challenge logic
  };

  const handleViewDetails = (notificationId) => {
    console.log('View details:', notificationId);
    // Handle view details logic
  };

  const handleFollowBack = (notificationId) => {
    console.log('Follow back:', notificationId);
    // Handle follow back logic
  };

  // Filter notifications based on active filter
  const filteredNotifications = notifications.filter((notification) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'challenges') {
      return ['challenge_received', 'challenge_result', 'challenge_expired'].includes(notification.type);
    }
    if (activeFilter === 'social') {
      return ['new_follower', 'post_like', 'comment'].includes(notification.type);
    }
    if (activeFilter === 'system') {
      return ['achievement'].includes(notification.type);
    }
    return true;
  });

  const renderNotification = (notification) => {
    switch (notification.type) {
      case 'challenge_received':
        return (
          <View key={notification.id} style={[styles.notificationCard, notification.unread && styles.unreadCard]}>
            <View style={styles.notificationHeader}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={24} color="#2D5F3F" />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>
                  <Text style={styles.userName}>{notification.user.name}</Text>
                  {' challenged you in '}
                  <Text style={styles.categoryText}>{notification.category}</Text>
                </Text>
                <Text style={styles.timeText}>{notification.time}</Text>
              </View>
              {notification.unread && <View style={styles.unreadDot} />}
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleAcceptChallenge(notification.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.declineButton}
                onPress={() => handleDeclineChallenge(notification.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.declineButtonText}>Decline</Text>
              </TouchableOpacity>
            </View>
          </View>
        );

      case 'challenge_result':
        return (
          <View key={notification.id} style={[styles.notificationCard, notification.unread && styles.unreadCard]}>
            <View style={styles.notificationHeader}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={24} color="#2D5F3F" />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>
                  <Text style={styles.resultText}>You {notification.result}</Text>
                  {' against '}
                  <Text style={styles.userName}>{notification.user.name}</Text>
                  {'!'}
                </Text>
                <Text style={styles.challengeDetails}>
                  Category: {notification.category} • Score: {notification.score.user}-{notification.score.opponent}
                </Text>
                <Text style={styles.timeText}>{notification.time}</Text>
              </View>
              {notification.unread && <View style={styles.unreadDot} />}
            </View>
            <TouchableOpacity
              style={styles.viewDetailsButton}
              onPress={() => handleViewDetails(notification.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.viewDetailsButtonText}>View Details</Text>
              <Ionicons name="chevron-forward" size={16} color="#2D5F3F" />
            </TouchableOpacity>
          </View>
        );

      case 'challenge_expired':
        return (
          <View key={notification.id} style={[styles.notificationCard, notification.unread && styles.unreadCard]}>
            <View style={styles.notificationHeader}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={24} color="#999" />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>
                  {'Challenge from '}
                  <Text style={styles.userName}>{notification.user.name}</Text>
                  {' expired'}
                </Text>
                <Text style={styles.challengeDetails}>Category: {notification.category}</Text>
                <Text style={styles.timeText}>{notification.time}</Text>
              </View>
              {notification.unread && <View style={styles.unreadDot} />}
            </View>
          </View>
        );

      case 'new_follower':
        return (
          <View key={notification.id} style={[styles.notificationCard, notification.unread && styles.unreadCard]}>
            <View style={styles.notificationHeader}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={24} color="#2D5F3F" />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>
                  <Text style={styles.userName}>{notification.user.name}</Text>
                  {' started following you'}
                </Text>
                <Text style={styles.timeText}>{notification.time}</Text>
              </View>
              {notification.unread && <View style={styles.unreadDot} />}
            </View>
            <TouchableOpacity
              style={styles.followBackButton}
              onPress={() => handleFollowBack(notification.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.followBackButtonText}>Follow Back</Text>
            </TouchableOpacity>
          </View>
        );

      case 'post_like':
        return (
          <View key={notification.id} style={[styles.notificationCard, notification.unread && styles.unreadCard]}>
            <View style={styles.notificationHeader}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={24} color="#2D5F3F" />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>
                  <Text style={styles.userName}>{notification.user.name}</Text>
                  {' liked your post'}
                </Text>
                <Text style={styles.postPreview}>"{notification.post.preview}"</Text>
                <Text style={styles.timeText}>{notification.time}</Text>
              </View>
              {notification.unread && <View style={styles.unreadDot} />}
            </View>
          </View>
        );

      case 'comment':
        return (
          <View key={notification.id} style={[styles.notificationCard, notification.unread && styles.unreadCard]}>
            <View style={styles.notificationHeader}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person" size={24} color="#2D5F3F" />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>
                  <Text style={styles.userName}>{notification.user.name}</Text>
                  {' commented on your post'}
                </Text>
                <Text style={styles.commentPreview}>"{notification.comment.preview}"</Text>
                <Text style={styles.timeText}>{notification.time}</Text>
              </View>
              {notification.unread && <View style={styles.unreadDot} />}
            </View>
          </View>
        );

      case 'achievement':
        return (
          <View key={notification.id} style={[styles.notificationCard, notification.unread && styles.unreadCard]}>
            <View style={styles.notificationHeader}>
              <View style={[styles.avatarContainer, styles.achievementIcon]}>
                <Ionicons name={notification.achievement.icon} size={24} color="#D4AF37" />
              </View>
              <View style={styles.notificationContent}>
                <Text style={styles.notificationText}>
                  {'Achievement Unlocked'}
                </Text>
                <Text style={styles.achievementTitle}>You earned the "{notification.achievement.title}" badge!</Text>
                <Text style={styles.timeText}>{notification.time}</Text>
              </View>
              {notification.unread && <View style={styles.unreadDot} />}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity onPress={handleMarkAllRead} activeOpacity={0.7}>
          <Text style={styles.markAllRead}>Mark All Read</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterTab,
              activeFilter === filter.id && styles.filterTabActive,
            ]}
            onPress={() => setActiveFilter(filter.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterTabText,
                activeFilter === filter.id && styles.filterTabTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map(renderNotification)
          ) : (
            // Empty State
            <View style={styles.emptyState}>
              <View style={styles.emptyIconContainer}>
                <Ionicons name="notifications-off-outline" size={80} color="#E0E0E0" />
              </View>
              <Text style={styles.emptyStateTitle}>No notifications yet</Text>
              <Text style={styles.emptyStateDescription}>
                When someone interacts with you, you'll see it here
              </Text>
            </View>
          )}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5F3F',
    includeFontPadding: false,
  },
  markAllRead: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
    includeFontPadding: false,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: 8,
  },
  filterTab: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  filterTabActive: {
    backgroundColor: '#2D5F3F',
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    includeFontPadding: false,
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  notificationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  unreadCard: {
    backgroundColor: '#E8F5E9',
    borderLeftWidth: 3,
    borderLeftColor: '#D4AF37',
  },
  notificationHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#2D5F3F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementIcon: {
    backgroundColor: '#FFF9E6',
    borderColor: '#D4AF37',
  },
  notificationContent: {
    flex: 1,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
    includeFontPadding: false,
  },
  userName: {
    fontWeight: '600',
    color: '#2D5F3F',
  },
  categoryText: {
    fontWeight: '600',
    color: '#D4AF37',
  },
  resultText: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  challengeDetails: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    includeFontPadding: false,
  },
  postPreview: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 4,
    includeFontPadding: false,
  },
  commentPreview: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 4,
    includeFontPadding: false,
  },
  achievementTitle: {
    fontSize: 13,
    color: '#D4AF37',
    fontWeight: '600',
    marginBottom: 4,
    includeFontPadding: false,
  },
  timeText: {
    fontSize: 12,
    color: '#999',
    includeFontPadding: false,
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D4AF37',
    marginLeft: 8,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 8,
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#2D5F3F',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    includeFontPadding: false,
  },
  declineButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  declineButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
    includeFontPadding: false,
  },
  viewDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    gap: 4,
  },
  viewDetailsButtonText: {
    color: '#2D5F3F',
    fontSize: 14,
    fontWeight: '600',
    includeFontPadding: false,
  },
  followBackButton: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#2D5F3F',
    alignItems: 'center',
  },
  followBackButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    includeFontPadding: false,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    marginBottom: 24,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 8,
    includeFontPadding: false,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
    includeFontPadding: false,
  },
});
