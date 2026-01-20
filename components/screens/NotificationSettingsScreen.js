import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Switch } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationSettingsScreen({ onBack }) {
  // Master toggle
  const [pushNotifications, setPushNotifications] = useState(true);

  // Challenge Notifications
  const [newChallenges, setNewChallenges] = useState(true);
  const [challengeAccepted, setChallengeAccepted] = useState(true);
  const [challengeResults, setChallengeResults] = useState(true);
  const [challengeExpired, setChallengeExpired] = useState(false);

  // Social Notifications
  const [newFollowers, setNewFollowers] = useState(true);
  const [likesOnPosts, setLikesOnPosts] = useState(true);
  const [commentsOnPosts, setCommentsOnPosts] = useState(true);
  const [mentions, setMentions] = useState(true);

  // Quiz Reminders
  const [dailyPracticeReminder, setDailyPracticeReminder] = useState(true);
  const [weeklyStreakReminder, setWeeklyStreakReminder] = useState(true);

  const renderSettingItem = (label, value, onValueChange, description = null, disabled = false) => (
    <View style={styles.settingItem}>
      <View style={styles.settingInfo}>
        <Text style={[styles.settingLabel, disabled && styles.settingLabelDisabled]}>
          {label}
        </Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#E0E0E0', true: '#2D5F3F' }}
        thumbColor={value ? '#D4AF37' : '#f4f3f4'}
        disabled={disabled || !pushNotifications}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2D5F3F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification Settings</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Master Toggle */}
        <View style={styles.section}>
          <View style={styles.masterToggle}>
            {renderSettingItem(
              'Push Notifications',
              pushNotifications,
              setPushNotifications,
              'Enable or disable all push notifications'
            )}
          </View>
        </View>

        {/* Challenge Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Challenge Notifications</Text>
          <View style={styles.sectionContent}>
            {renderSettingItem(
              'New Challenges',
              newChallenges,
              setNewChallenges,
              'Get notified when someone challenges you'
            )}
            {renderSettingItem(
              'Challenge Accepted',
              challengeAccepted,
              setChallengeAccepted,
              'Get notified when someone accepts your challenge'
            )}
            {renderSettingItem(
              'Challenge Results',
              challengeResults,
              setChallengeResults,
              'Get notified about challenge outcomes'
            )}
            {renderSettingItem(
              'Challenge Expired',
              challengeExpired,
              setChallengeExpired,
              'Get notified when a challenge expires'
            )}
          </View>
        </View>

        {/* Social Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Social Notifications</Text>
          <View style={styles.sectionContent}>
            {renderSettingItem(
              'New Followers',
              newFollowers,
              setNewFollowers,
              'Get notified when someone follows you'
            )}
            {renderSettingItem(
              'Likes on Posts',
              likesOnPosts,
              setLikesOnPosts,
              'Get notified when someone likes your post'
            )}
            {renderSettingItem(
              'Comments on Posts',
              commentsOnPosts,
              setCommentsOnPosts,
              'Get notified when someone comments on your post'
            )}
            {renderSettingItem(
              'Mentions',
              mentions,
              setMentions,
              'Get notified when someone mentions you'
            )}
          </View>
        </View>

        {/* Quiz Reminders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz Reminders</Text>
          <View style={styles.sectionContent}>
            {renderSettingItem(
              'Daily Practice Reminder',
              dailyPracticeReminder,
              setDailyPracticeReminder,
              'Get reminded to practice daily'
            )}
            {renderSettingItem(
              'Weekly Streak Reminder',
              weeklyStreakReminder,
              setWeeklyStreakReminder,
              'Get reminded to maintain your weekly streak'
            )}
          </View>
        </View>

        {/* Info Note */}
        <View style={styles.infoNote}>
          <Ionicons name="information-circle" size={20} color="#666" />
          <Text style={styles.infoNoteText}>
            Notification preferences are synced across all your devices
          </Text>
        </View>

        {/* Bottom Padding */}
        <View style={{ height: 24 }} />
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
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
    includeFontPadding: false,
  },
  headerSpacer: {
    width: 32,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 16,
  },
  masterToggle: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    marginHorizontal: 16,
    includeFontPadding: false,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#2D5F3F',
    marginBottom: 4,
    includeFontPadding: false,
  },
  settingLabelDisabled: {
    color: '#999',
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    includeFontPadding: false,
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF9E6',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    gap: 12,
  },
  infoNoteText: {
    flex: 1,
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    includeFontPadding: false,
  },
});
