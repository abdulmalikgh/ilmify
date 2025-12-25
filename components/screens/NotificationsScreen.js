import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NOTIFICATIONS = [
  {
    id: 1,
    type: 'challenge',
    icon: 'trophy',
    iconColor: '#FF9800',
    title: 'New Challenge',
    message: 'Ahmad challenged you to a quiz',
    time: '2h ago',
    unread: true,
  },
  {
    id: 2,
    type: 'answer',
    icon: 'chatbubble',
    iconColor: '#4CAF50',
    title: 'New Answer',
    message: 'Fatima answered your question about Wudu',
    time: '5h ago',
    unread: true,
  },
  {
    id: 3,
    type: 'like',
    icon: 'heart',
    iconColor: '#F44336',
    title: 'New Like',
    message: 'Your post received 10 likes',
    time: '1d ago',
    unread: false,
  },
  {
    id: 4,
    type: 'achievement',
    icon: 'ribbon',
    iconColor: '#D4AF37',
    title: 'Achievement Unlocked',
    message: 'You earned the "Week Streak" badge!',
    time: '2d ago',
    unread: false,
  },
  {
    id: 5,
    type: 'follow',
    icon: 'person-add',
    iconColor: '#2196F3',
    title: 'New Follower',
    message: 'Yusuf started following you',
    time: '3d ago',
    unread: false,
  },
];

export default function NotificationsScreen({ userData }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
        <TouchableOpacity>
          <Text style={styles.markAllRead}>Mark all read</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>

          {/* Notifications List */}
          {NOTIFICATIONS.map((notification) => (
            <TouchableOpacity
              key={notification.id}
              style={[
                styles.notificationCard,
                notification.unread && styles.notificationUnread
              ]}
              activeOpacity={0.7}
            >
              <View style={[styles.notificationIcon, { backgroundColor: notification.iconColor + '20' }]}>
                <Ionicons name={notification.icon} size={24} color={notification.iconColor} />
              </View>

              <View style={styles.notificationContent}>
                <Text style={styles.notificationTitle}>{notification.title}</Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>

              {notification.unread && (
                <View style={styles.unreadDot} />
              )}
            </TouchableOpacity>
          ))}

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
  markAllRead: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '600',
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
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  notificationUnread: {
    backgroundColor: '#E8F5E9',
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#D4AF37',
    marginLeft: 8,
    marginTop: 4,
  },
});
