import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../PostCard';

// Demo achievement badges
const ACHIEVEMENT_BADGES = [
  { id: 1, name: 'Quran Master', description: '100 Quran questions correct', icon: 'book', color: '#4CAF50' },
  { id: 2, name: 'Challenger', description: 'Won 10 challenges', icon: 'trophy', color: '#D4AF37' },
  { id: 3, name: 'Helpful', description: '50 answers marked as helpful', icon: 'heart', color: '#F44336' },
  { id: 4, name: 'Consistent', description: '30 day streak', icon: 'flame', color: '#FF9800' },
  { id: 5, name: 'Scholar', description: 'Completed 20 courses', icon: 'school', color: '#2196F3' },
];

// Demo user posts (empty for now)
const USER_POSTS = [];

export default function ProfileScreen({ userData, onNavigate }) {
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'questions' | 'answers' | 'quizResults'

  // User stats (in production, these would come from userData)
  const stats = {
    posts: 24,
    followers: 156,
    following: 89,
    points: 2450,
  };

  // User info (in production, these would come from userData)
  const userInfo = {
    fullName: userData?.fullName || 'Muhammad Ali',
    username: userData?.username || 'muhammad_ali',
    bio: 'Seeking knowledge and sharing what I learn. Passionate about Quran, Hadith, and Islamic history.',
    location: 'Riyadh, Saudi Arabia',
    joinDate: 'December 2024',
    coverImage: null, // URL to cover image
  };

  const handleStatPress = (statType) => {
    if (statType === 'followers' || statType === 'following') {
      console.log(`Navigate to ${statType} list`);
      // In production: onNavigate?.(statType);
    }
  };

  const handleEditProfile = () => {
    console.log('Edit profile');
    // In production: onNavigate?.('editProfile');
  };

  const renderEmptyState = (tab) => {
    const emptyStates = {
      posts: {
        icon: 'create-outline',
        title: 'No posts yet',
        message: 'Share your thoughts and questions with the community',
      },
      questions: {
        icon: 'help-circle-outline',
        title: 'No questions asked',
        message: 'Ask questions to learn from the community',
      },
      answers: {
        icon: 'chatbubble-outline',
        title: 'No answers given',
        message: 'Help others by answering their questions',
      },
      quizResults: {
        icon: 'trophy-outline',
        title: 'No quiz results',
        message: 'Take quizzes to test your knowledge',
      },
    };

    const state = emptyStates[tab];

    return (
      <View style={styles.emptyState}>
        <Ionicons name={state.icon} size={64} color="#D4AF37" />
        <Text style={styles.emptyTitle}>{state.title}</Text>
        <Text style={styles.emptyMessage}>{state.message}</Text>
      </View>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return USER_POSTS.length > 0 ? (
          USER_POSTS.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              onLike={() => {}}
              onComment={() => {}}
              onShare={() => {}}
            />
          ))
        ) : (
          renderEmptyState('posts')
        );

      case 'questions':
        return renderEmptyState('questions');

      case 'answers':
        return renderEmptyState('answers');

      case 'quizResults':
        return renderEmptyState('quizResults');

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Cover Image */}
        <View style={styles.coverContainer}>
          {userInfo.coverImage ? (
            <Image source={{ uri: userInfo.coverImage }} style={styles.coverImage} />
          ) : (
            <View style={styles.coverPlaceholder}>
              <Ionicons name="image-outline" size={40} color="#FFFFFF50" />
            </View>
          )}
          <TouchableOpacity style={styles.editCoverButton} onPress={handleEditProfile}>
            <Ionicons name="camera" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Profile Info Section */}
        <View style={styles.profileSection}>
          {/* Profile Picture */}
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              <Ionicons name="person-circle" size={100} color="#D4AF37" />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Edit Button */}
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Ionicons name="create-outline" size={18} color="#2D5F3F" />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* Name and Username */}
          <Text style={styles.profileName}>{userInfo.fullName}</Text>
          <Text style={styles.profileUsername}>@{userInfo.username}</Text>

          {/* Bio */}
          {userInfo.bio && <Text style={styles.bio}>{userInfo.bio}</Text>}

          {/* Location and Join Date */}
          <View style={styles.metaInfo}>
            {userInfo.location && (
              <View style={styles.metaItem}>
                <Ionicons name="location-outline" size={16} color="#666" />
                <Text style={styles.metaText}>{userInfo.location}</Text>
              </View>
            )}
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={16} color="#666" />
              <Text style={styles.metaText}>Joined {userInfo.joinDate}</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => handleStatPress('followers')}
              activeOpacity={0.7}
            >
              <Text style={styles.statValue}>{stats.followers}</Text>
              <Text style={[styles.statLabel, styles.statLabelInteractive]}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.statItem}
              onPress={() => handleStatPress('following')}
              activeOpacity={0.7}
            >
              <Text style={styles.statValue}>{stats.following}</Text>
              <Text style={[styles.statLabel, styles.statLabelInteractive]}>Following</Text>
            </TouchableOpacity>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{stats.points.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
          </View>
        </View>

        {/* Achievement Badges */}
        <View style={styles.achievementsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Achievement Badges</Text>
            <TouchableOpacity onPress={() => console.log('View all achievements')}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.badgesContainer}
          >
            {ACHIEVEMENT_BADGES.map((badge) => (
              <View key={badge.id} style={styles.badgeCard}>
                <View style={[styles.badgeIcon, { backgroundColor: badge.color }]}>
                  <Ionicons name={badge.icon} size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.badgeName}>{badge.name}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Content Tabs */}
        <View style={styles.tabsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsScrollContent}
          >
            <TouchableOpacity
              style={[styles.tab, activeTab === 'posts' && styles.tabActive]}
              onPress={() => setActiveTab('posts')}
            >
              <Text style={[styles.tabText, activeTab === 'posts' && styles.tabTextActive]}>
                Posts
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'questions' && styles.tabActive]}
              onPress={() => setActiveTab('questions')}
            >
              <Text style={[styles.tabText, activeTab === 'questions' && styles.tabTextActive]}>
                Questions
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'answers' && styles.tabActive]}
              onPress={() => setActiveTab('answers')}
            >
              <Text style={[styles.tabText, activeTab === 'answers' && styles.tabTextActive]}>
                Answers
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'quizResults' && styles.tabActive]}
              onPress={() => setActiveTab('quizResults')}
            >
              <Text style={[styles.tabText, activeTab === 'quizResults' && styles.tabTextActive]}>
                Quiz Results
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* Content Display */}
        <View style={styles.contentContainer}>{renderContent()}</View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  coverContainer: {
    height: 160,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  coverPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2D5F3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editCoverButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#00000050',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 20,
    marginBottom: 8,
  },
  profilePictureContainer: {
    marginTop: -50,
    marginBottom: 12,
    position: 'relative',
    alignSelf: 'flex-start',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFFFFF',
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2D5F3F',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    top: 16,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 4,
  },
  profileUsername: {
    fontSize: 15,
    color: '#666',
    marginBottom: 12,
  },
  bio: {
    fontSize: 15,
    color: '#2D5F3F',
    lineHeight: 22,
    marginBottom: 12,
  },
  metaInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 20,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 14,
    color: '#666',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: '#666',
  },
  statLabelInteractive: {
    color: '#2D5F3F',
    fontWeight: '500',
  },
  achievementsSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#D4AF37',
  },
  badgesContainer: {
    paddingHorizontal: 20,
    gap: 12,
  },
  badgeCard: {
    width: 140,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  badgeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 4,
    textAlign: 'center',
  },
  badgeDescription: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabsScrollContent: {
    paddingHorizontal: 20,
  },
  tab: {
    paddingVertical: 16,
    paddingHorizontal: 16,
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
  contentContainer: {
    backgroundColor: '#FFFFFF',
    minHeight: 300,
    paddingVertical: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
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
