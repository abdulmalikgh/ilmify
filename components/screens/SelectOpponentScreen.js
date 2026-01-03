import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Demo users data
const DEMO_USERS = [
  {
    id: '1',
    name: 'Ahmad Ibrahim',
    username: 'ahmad_i',
    isOnline: true,
    lastActive: null,
    isFollowing: true,
    points: 2850,
    level: 11,
    categoryStats: {
      Quran: { accuracy: 92, gamesPlayed: 45 },
      Hadith: { accuracy: 88, gamesPlayed: 32 },
      Seerah: { accuracy: 85, gamesPlayed: 28 },
      Fiqh: { accuracy: 78, gamesPlayed: 20 },
    },
    skillLevel: 'advanced',
  },
  {
    id: '2',
    name: 'Fatima Hassan',
    username: 'fatima_h',
    isOnline: true,
    lastActive: null,
    isFollowing: true,
    points: 3200,
    level: 15,
    categoryStats: {
      Quran: { accuracy: 95, gamesPlayed: 60 },
      Hadith: { accuracy: 91, gamesPlayed: 48 },
      Seerah: { accuracy: 87, gamesPlayed: 35 },
      Fiqh: { accuracy: 82, gamesPlayed: 28 },
    },
    skillLevel: 'advanced',
  },
  {
    id: '3',
    name: 'Yusuf Ali',
    username: 'yusuf_ali',
    isOnline: false,
    lastActive: '2h ago',
    isFollowing: true,
    points: 2100,
    level: 8,
    categoryStats: {
      Quran: { accuracy: 88, gamesPlayed: 38 },
      Hadith: { accuracy: 75, gamesPlayed: 22 },
      Seerah: { accuracy: 90, gamesPlayed: 42 },
      Fiqh: { accuracy: 68, gamesPlayed: 15 },
    },
    skillLevel: 'intermediate',
  },
  {
    id: '4',
    name: 'Aisha Mohamed',
    username: 'aisha_m',
    isOnline: true,
    lastActive: null,
    isFollowing: false,
    points: 2450,
    level: 9,
    categoryStats: {
      Quran: { accuracy: 85, gamesPlayed: 40 },
      Hadith: { accuracy: 82, gamesPlayed: 35 },
      Seerah: { accuracy: 80, gamesPlayed: 30 },
      Fiqh: { accuracy: 77, gamesPlayed: 25 },
    },
    skillLevel: 'intermediate',
  },
  {
    id: '5',
    name: 'Omar Abdullah',
    username: 'omar_a',
    isOnline: false,
    lastActive: '1d ago',
    isFollowing: true,
    points: 1850,
    level: 7,
    categoryStats: {
      Quran: { accuracy: 80, gamesPlayed: 28 },
      Hadith: { accuracy: 78, gamesPlayed: 24 },
      Seerah: { accuracy: 75, gamesPlayed: 20 },
      Fiqh: { accuracy: 72, gamesPlayed: 18 },
    },
    skillLevel: 'intermediate',
  },
  {
    id: '6',
    name: 'Zaynab Khan',
    username: 'zaynab_k',
    isOnline: true,
    lastActive: null,
    isFollowing: false,
    points: 2600,
    level: 10,
    categoryStats: {
      Quran: { accuracy: 87, gamesPlayed: 42 },
      Hadith: { accuracy: 84, gamesPlayed: 38 },
      Seerah: { accuracy: 82, gamesPlayed: 33 },
      Fiqh: { accuracy: 79, gamesPlayed: 27 },
    },
    skillLevel: 'intermediate',
  },
  {
    id: '7',
    name: 'Hassan Ahmed',
    username: 'hassan_a',
    isOnline: false,
    lastActive: '5h ago',
    isFollowing: false,
    points: 2350,
    level: 9,
    categoryStats: {
      Quran: { accuracy: 83, gamesPlayed: 36 },
      Hadith: { accuracy: 80, gamesPlayed: 30 },
      Seerah: { accuracy: 86, gamesPlayed: 40 },
      Fiqh: { accuracy: 75, gamesPlayed: 22 },
    },
    skillLevel: 'intermediate',
  },
];

export default function SelectOpponentScreen({ category = null, onBack, onSelectOpponent }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory] = useState(category);

  const handleSelectOpponent = (user) => {
    onSelectOpponent?.(user, selectedCategory);
  };

  // Filter users based on search query
  const getFilteredUsers = (users) => {
    if (!searchQuery.trim()) return users;

    const query = searchQuery.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    );
  };

  // Get online users
  const getOnlineUsers = () => {
    const onlineUsers = DEMO_USERS.filter(user => user.isOnline);
    return getFilteredUsers(onlineUsers);
  };

  // Get following users
  const getFollowingUsers = () => {
    const followingUsers = DEMO_USERS.filter(user => user.isFollowing);
    return getFilteredUsers(followingUsers);
  };

  // Get suggested users (similar skill level, not following)
  const getSuggestedUsers = () => {
    const suggestedUsers = DEMO_USERS.filter(user =>
      !user.isFollowing && user.skillLevel === 'intermediate'
    );
    return getFilteredUsers(suggestedUsers);
  };

  const renderUserItem = (user) => {
    const categoryStats = selectedCategory && user.categoryStats[selectedCategory];

    return (
      <View key={user.id} style={styles.userItem}>
        <View style={styles.userAvatarContainer}>
          <Ionicons name="person-circle" size={48} color="#D4AF37" />
          {user.isOnline && <View style={styles.onlineIndicator} />}
        </View>

        <View style={styles.userInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{user.name}</Text>
            {user.isOnline && (
              <View style={styles.onlineBadge}>
                <Text style={styles.onlineBadgeText}>Online</Text>
              </View>
            )}
          </View>

          <Text style={styles.userUsername}>@{user.username}</Text>

          {categoryStats ? (
            <Text style={styles.categoryStats}>
              {selectedCategory}: {categoryStats.accuracy}% accuracy
            </Text>
          ) : (
            <Text style={styles.userPoints}>{user.points.toLocaleString()} pts</Text>
          )}

          {!user.isOnline && user.lastActive && (
            <Text style={styles.lastActive}>Active {user.lastActive}</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.challengeButton}
          onPress={() => handleSelectOpponent(user)}
          activeOpacity={0.7}
        >
          <Text style={styles.challengeButtonText}>Challenge</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onlineUsers = getOnlineUsers();
  const followingUsers = getFollowingUsers();
  const suggestedUsers = getSuggestedUsers();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2D5F3F" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Select Opponent</Text>
          {selectedCategory && (
            <View style={styles.categoryBadge}>
              <Ionicons name="bookmark" size={12} color="#D4AF37" />
              <Text style={styles.categoryBadgeText}>{selectedCategory}</Text>
            </View>
          )}
        </View>
        <View style={styles.headerRight} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or username"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Online Now Section */}
        {onlineUsers.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleRow}>
                <View style={styles.onlineDot} />
                <Text style={styles.sectionTitle}>Online Now</Text>
              </View>
              <Text style={styles.sectionCount}>{onlineUsers.length}</Text>
            </View>
            {onlineUsers.map(user => renderUserItem(user))}
          </View>
        )}

        {/* Following Section */}
        {followingUsers.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Following</Text>
              <Text style={styles.sectionCount}>{followingUsers.length}</Text>
            </View>
            {followingUsers.map(user => renderUserItem(user))}
          </View>
        )}

        {/* Suggested Section */}
        {suggestedUsers.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Suggested</Text>
              <Text style={styles.sectionCount}>{suggestedUsers.length}</Text>
            </View>
            <Text style={styles.sectionSubtitle}>Similar skill level • Active challengers</Text>
            {suggestedUsers.map(user => renderUserItem(user))}
          </View>
        )}

        {/* Empty State */}
        {onlineUsers.length === 0 && followingUsers.length === 0 && suggestedUsers.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color="#D4AF37" />
            <Text style={styles.emptyTitle}>No users found</Text>
            <Text style={styles.emptyMessage}>
              {searchQuery ? 'Try a different search term' : 'No users available to challenge'}
            </Text>
          </View>
        )}
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
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 4,
    width: 60,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  headerRight: {
    width: 60,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D4AF37',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2D5F3F',
    paddingVertical: 12,
  },
  clearButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  sectionCount: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
    marginTop: -8,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userAvatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  userName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  onlineBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  onlineBadgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#4CAF50',
  },
  userUsername: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  categoryStats: {
    fontSize: 13,
    color: '#D4AF37',
    fontWeight: '500',
  },
  userPoints: {
    fontSize: 13,
    color: '#666',
  },
  lastActive: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  challengeButton: {
    backgroundColor: '#D4AF37',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  challengeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
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
