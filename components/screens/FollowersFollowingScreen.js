import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Demo data
const DEMO_FOLLOWERS = [
  { id: '1', fullName: 'Aisha Rahman', username: 'aisha_r', isFollowing: true },
  { id: '2', fullName: 'Omar Abdullah', username: 'omar_a', isFollowing: false },
  { id: '3', fullName: 'Fatima Hassan', username: 'fatima_h', isFollowing: true },
  { id: '4', fullName: 'Ibrahim Yusuf', username: 'ibrahim_y', isFollowing: true },
  { id: '5', fullName: 'Zainab Hassan', username: 'zainab_h', isFollowing: false },
];

const DEMO_FOLLOWING = [
  { id: '1', fullName: 'Ahmad Ibrahim', username: 'ahmad_i', isFollowing: true },
  { id: '3', fullName: 'Fatima Hassan', username: 'fatima_h', isFollowing: true },
  { id: '6', fullName: 'Yusuf Ali', username: 'yusuf_ali', isFollowing: true },
  { id: '7', fullName: 'Mariam Ahmed', username: 'mariam_a', isFollowing: true },
];

export default function FollowersFollowingScreen({ initialTab = 'followers', onBack, onUserPress }) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'followers' | 'following'
  const [searchQuery, setSearchQuery] = useState('');
  const [followers, setFollowers] = useState(DEMO_FOLLOWERS);
  const [following, setFollowing] = useState(DEMO_FOLLOWING);

  const handleFollowToggle = (userId, listType) => {
    const updateList = listType === 'followers' ? setFollowers : setFollowing;
    const currentList = listType === 'followers' ? followers : following;

    updateList(currentList.map(user =>
      user.id === userId
        ? { ...user, isFollowing: !user.isFollowing }
        : user
    ));
  };

  const filterUsers = (users) => {
    if (!searchQuery.trim()) return users;

    const query = searchQuery.toLowerCase();
    return users.filter(user =>
      user.fullName.toLowerCase().includes(query) ||
      user.username.toLowerCase().includes(query)
    );
  };

  const renderUserItem = (user, listType) => (
    <TouchableOpacity
      key={user.id}
      style={styles.userItem}
      onPress={() => onUserPress?.(user.id)}
      activeOpacity={0.7}
    >
      {/* Avatar */}
      <Ionicons name="person-circle" size={48} color="#D4AF37" />

      {/* User Info */}
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{user.fullName}</Text>
        <Text style={styles.userUsername}>@{user.username}</Text>
      </View>

      {/* Follow Button */}
      <TouchableOpacity
        style={[styles.followButton, user.isFollowing && styles.followingButton]}
        onPress={(e) => {
          e.stopPropagation();
          handleFollowToggle(user.id, listType);
        }}
        activeOpacity={0.7}
      >
        <Text style={[styles.followButtonText, user.isFollowing && styles.followingButtonText]}>
          {user.isFollowing ? 'Following' : 'Follow'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderEmptyState = (type) => {
    const emptyStates = {
      followers: {
        icon: 'people-outline',
        title: 'No followers yet',
        message: 'When people follow you, they\'ll appear here',
      },
      following: {
        icon: 'person-add-outline',
        title: 'Not following anyone',
        message: 'Start following others to see them here',
      },
    };

    const state = emptyStates[type];

    return (
      <View style={styles.emptyState}>
        <Ionicons name={state.icon} size={64} color="#D4AF37" />
        <Text style={styles.emptyTitle}>{state.title}</Text>
        <Text style={styles.emptyMessage}>{state.message}</Text>
      </View>
    );
  };

  const currentList = activeTab === 'followers' ? followers : following;
  const filteredList = filterUsers(currentList);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#2D5F3F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {activeTab === 'followers' ? 'Followers' : 'Following'}
          </Text>
          <View style={styles.headerRight} />
        </View>

        {/* Tab Toggle */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'followers' && styles.tabActive]}
            onPress={() => setActiveTab('followers')}
          >
            <Text style={[styles.tabText, activeTab === 'followers' && styles.tabTextActive]}>
              Followers
            </Text>
            <Text style={[styles.tabCount, activeTab === 'followers' && styles.tabCountActive]}>
              {followers.length}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'following' && styles.tabActive]}
            onPress={() => setActiveTab('following')}
          >
            <Text style={[styles.tabText, activeTab === 'following' && styles.tabTextActive]}>
              Following
            </Text>
            <Text style={[styles.tabCount, activeTab === 'following' && styles.tabCountActive]}>
              {following.length}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* User List */}
        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {filteredList.length > 0 ? (
            filteredList.map(user => renderUserItem(user, activeTab))
          ) : searchQuery.trim() ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={64} color="#D4AF37" />
              <Text style={styles.emptyTitle}>No results found</Text>
              <Text style={styles.emptyMessage}>Try searching with a different keyword</Text>
            </View>
          ) : (
            renderEmptyState(activeTab)
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
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
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  headerRight: {
    width: 60,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#D4AF37',
  },
  tabText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#666',
  },
  tabTextActive: {
    color: '#2D5F3F',
    fontWeight: '600',
  },
  tabCount: {
    fontSize: 13,
    color: '#999',
    fontWeight: '500',
  },
  tabCountActive: {
    color: '#2D5F3F',
    fontWeight: '600',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2D5F3F',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 2,
  },
  userUsername: {
    fontSize: 14,
    color: '#666',
  },
  followButton: {
    backgroundColor: '#2D5F3F',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  followingButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#2D5F3F',
  },
  followButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  followingButtonText: {
    color: '#2D5F3F',
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
