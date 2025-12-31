import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image, Modal, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../PostCard';
import EditProfileScreen from './EditProfileScreen';
import FollowersFollowingScreen from './FollowersFollowingScreen';
import SelectOpponentScreen from './SelectOpponentScreen';
import ChallengeConfirmationModal from '../modals/ChallengeConfirmationModal';
import ChallengeSentScreen from './ChallengeSentScreen';

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

// Interests and knowledge levels (matching onboarding)
const INTERESTS_MAP = {
  quran: { label: 'Quran', icon: 'book' },
  hadith: { label: 'Hadith', icon: 'library' },
  fiqh: { label: 'Fiqh', icon: 'scale' },
  seerah: { label: 'Seerah', icon: 'person' },
  aqeedah: { label: 'Aqeedah', icon: 'heart' },
  history: { label: 'Islamic History', icon: 'time' },
  duas: { label: 'Daily Duas', icon: 'hand-right' },
  arabic: { label: 'Arabic Language', icon: 'language' },
};

const KNOWLEDGE_LEVEL_MAP = {
  beginner: { label: 'Beginner', color: '#88cc00', icon: 'leaf' },
  intermediate: { label: 'Intermediate', color: '#D4AF37', icon: 'book' },
  advanced: { label: 'Advanced', color: '#2D5F3F', icon: 'school' },
};

export default function ProfileScreen({ userData, onNavigate, isOwnProfile = true, showBackButton = false, onBack }) {
  const [activeTab, setActiveTab] = useState('posts'); // 'posts' | 'questions' | 'answers' | 'quizResults'
  const [isFollowing, setIsFollowing] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showFollowersList, setShowFollowersList] = useState(false);
  const [followersListTab, setFollowersListTab] = useState('followers');
  const [showSelectOpponent, setShowSelectOpponent] = useState(false);
  const [showChallengeConfirm, setShowChallengeConfirm] = useState(false);
  const [showChallengeSent, setShowChallengeSent] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    interests: userData?.interests || ['quran', 'hadith', 'seerah'],
    knowledgeLevel: userData?.knowledgeLevel || 'intermediate',
  };

  const handleStatPress = (statType) => {
    if (statType === 'followers' || statType === 'following') {
      setFollowersListTab(statType);
      setShowFollowersList(true);
    }
  };

  const handleEditProfile = () => {
    setShowEditProfile(true);
  };

  const handleSaveProfile = (updatedData) => {
    console.log('Profile updated:', updatedData);
    // In production: API call to update profile
    // Then update userData state
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
    // In production: API call to follow/unfollow
  };

  const handleChallenge = () => {
    // Create opponent object from the current user profile
    const opponent = {
      id: userData?.id || 'user1',
      name: userInfo.fullName,
      username: userInfo.username,
      isOnline: Math.random() > 0.5, // Demo: random online status
      lastActive: '2h ago',
      isFollowing: isFollowing,
      points: stats.points,
      categoryStats: {
        Quran: { accuracy: 88, gamesPlayed: 32 },
        Hadith: { accuracy: 85, gamesPlayed: 28 },
        Seerah: { accuracy: 90, gamesPlayed: 35 },
        Fiqh: { accuracy: 78, gamesPlayed: 22 },
      },
      skillLevel: 'intermediate',
    };

    setSelectedOpponent(opponent);
    setSelectedCategory(null);
    setShowChallengeConfirm(true);
  };

  const handleSelectOpponent = (opponent, category) => {
    setSelectedOpponent(opponent);
    setSelectedCategory(category);
    setShowSelectOpponent(false);
    setShowChallengeConfirm(true);
  };

  const handleConfirmChallenge = () => {
    console.log('Challenge confirmed:', { opponent: selectedOpponent, category: selectedCategory });
    setShowChallengeConfirm(false);

    if (!selectedOpponent.isOnline) {
      setShowChallengeSent(true);
    } else {
      console.log('Starting quiz immediately for online opponent');
    }
  };

  const handleStartQuiz = (results) => {
    console.log('Challenge quiz completed with results:', results);
    // In production: Save challenge answers to API
    setShowChallengeSent(false);

    // Show success message
    alert(`Quiz completed! Score: ${results.score}%\n\nYour answers have been saved. We'll notify you when ${selectedOpponent?.name} accepts the challenge!`);
  };

  const handleBackFromChallengeSent = () => {
    setShowChallengeSent(false);
    setSelectedOpponent(null);
    setSelectedCategory(null);
  };

  const handleShareProfile = () => {
    console.log('Share profile');
    // In production: Share sheet
  };

  const handleReportUser = () => {
    console.log('Report user');
    // In production: onNavigate?.('reportUser', { userId: userData?.id });
  };

  const handleBlockUser = () => {
    console.log('Block user');
    // In production: Show confirmation dialog
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

  const Container = showBackButton ? SafeAreaView : View;

  return (
    <Container style={styles.container}>
      {/* Header with Back Button (for modal view) */}
      {showBackButton && (
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#2D5F3F" />
          </TouchableOpacity>
          <Text style={styles.modalHeaderTitle}>Profile</Text>
          <View style={styles.headerRight} />
        </View>
      )}

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
          {isOwnProfile && (
            <TouchableOpacity style={styles.editCoverButton} onPress={handleEditProfile}>
              <Ionicons name="camera" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          )}
          {!isOwnProfile && (
            <TouchableOpacity style={styles.menuButton} onPress={() => setShowMenu(!showMenu)}>
              <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>

        {/* Profile Info Section */}
        <View style={styles.profileSection}>
          {/* Profile Picture */}
          <View style={styles.profilePictureContainer}>
            <View style={styles.profilePicture}>
              <Ionicons name="person-circle" size={100} color="#D4AF37" />
            </View>
            {isOwnProfile && (
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>

          {/* Action Buttons */}
          {isOwnProfile ? (
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Ionicons name="create-outline" size={18} color="#2D5F3F" />
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.followButton, isFollowing && styles.followingButton]}
                onPress={handleFollowToggle}
              >
                <Ionicons
                  name={isFollowing ? "checkmark" : "person-add"}
                  size={18}
                  color={isFollowing ? "#2D5F3F" : "#FFFFFF"}
                />
                <Text style={[styles.followButtonText, isFollowing && styles.followingButtonText]}>
                  {isFollowing ? 'Following' : 'Follow'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.challengeButton} onPress={handleChallenge}>
                <Ionicons name="trophy" size={18} color="#2D5F3F" />
                <Text style={styles.challengeButtonText}>Challenge</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Name and Username */}
          <Text style={styles.profileName}>{userInfo.fullName}</Text>
          <View style={styles.usernameRow}>
            <Text style={styles.profileUsername}>@{userInfo.username}</Text>
            {userInfo.knowledgeLevel && KNOWLEDGE_LEVEL_MAP[userInfo.knowledgeLevel] && (
              <View style={[styles.knowledgeBadge, { backgroundColor: KNOWLEDGE_LEVEL_MAP[userInfo.knowledgeLevel].color }]}>
                <Ionicons
                  name={KNOWLEDGE_LEVEL_MAP[userInfo.knowledgeLevel].icon}
                  size={12}
                  color="#FFFFFF"
                />
                <Text style={styles.knowledgeBadgeText}>
                  {KNOWLEDGE_LEVEL_MAP[userInfo.knowledgeLevel].label}
                </Text>
              </View>
            )}
          </View>

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

          {/* Interests */}
          {userInfo.interests && userInfo.interests.length > 0 && (
            <View style={styles.interestsSection}>
              <Text style={styles.interestsTitle}>Learning Interests</Text>
              <View style={styles.interestsChips}>
                {userInfo.interests.map((interestId) => {
                  const interest = INTERESTS_MAP[interestId];
                  if (!interest) return null;
                  return (
                    <View key={interestId} style={styles.interestChipSmall}>
                      <Ionicons name={interest.icon} size={14} color="#2D5F3F" />
                      <Text style={styles.interestChipSmallText}>{interest.label}</Text>
                    </View>
                  );
                })}
              </View>
            </View>
          )}

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

      {/* Three-Dot Menu Modal */}
      {!isOwnProfile && (
        <Modal
          visible={showMenu}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowMenu(false)}
        >
          <TouchableOpacity
            style={styles.menuOverlay}
            activeOpacity={1}
            onPress={() => setShowMenu(false)}
          >
            <View style={styles.menuModal}>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => {
                  handleShareProfile();
                  setShowMenu(false);
                }}
              >
                <Ionicons name="share-outline" size={22} color="#2D5F3F" />
                <Text style={styles.menuOptionText}>Share Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => {
                  handleReportUser();
                  setShowMenu(false);
                }}
              >
                <Ionicons name="flag-outline" size={22} color="#F44336" />
                <Text style={[styles.menuOptionText, styles.menuOptionDanger]}>Report User</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => {
                  handleBlockUser();
                  setShowMenu(false);
                }}
              >
                <Ionicons name="ban-outline" size={22} color="#F44336" />
                <Text style={[styles.menuOptionText, styles.menuOptionDanger]}>Block User</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
      )}

      {/* Edit Profile Modal */}
      <Modal
        visible={showEditProfile}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <EditProfileScreen
          userData={userInfo}
          onBack={() => setShowEditProfile(false)}
          onSave={handleSaveProfile}
        />
      </Modal>

      {/* Followers/Following List Modal */}
      <Modal
        visible={showFollowersList}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <FollowersFollowingScreen
          initialTab={followersListTab}
          onBack={() => setShowFollowersList(false)}
          onUserPress={(userId) => {
            console.log('Navigate to user profile:', userId);
            // In production: navigate to user's profile
          }}
        />
      </Modal>

      {/* Select Opponent Modal */}
      <Modal
        visible={showSelectOpponent}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <SelectOpponentScreen
          category={selectedCategory}
          onBack={() => setShowSelectOpponent(false)}
          onSelectOpponent={handleSelectOpponent}
        />
      </Modal>

      {/* Challenge Confirmation Modal */}
      <ChallengeConfirmationModal
        visible={showChallengeConfirm}
        opponent={selectedOpponent}
        category={selectedCategory}
        onCancel={() => setShowChallengeConfirm(false)}
        onConfirm={handleConfirmChallenge}
      />

      {/* Challenge Sent Screen Modal */}
      <Modal
        visible={showChallengeSent}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChallengeSentScreen
          opponent={selectedOpponent}
          category={selectedCategory}
          onStartQuiz={handleStartQuiz}
          onBack={handleBackFromChallengeSent}
        />
      </Modal>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  backButton: {
    padding: 4,
    width: 60,
  },
  headerRight: {
    width: 60,
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
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  profileUsername: {
    fontSize: 15,
    color: '#666',
  },
  knowledgeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  knowledgeBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FFFFFF',
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
    marginBottom: 16,
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
  interestsSection: {
    marginBottom: 16,
  },
  interestsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 8,
  },
  interestsChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestChipSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  interestChipSmallText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#2D5F3F',
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
  menuButton: {
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
  actionButtons: {
    position: 'absolute',
    top: 16,
    right: 20,
    flexDirection: 'row',
    gap: 8,
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D5F3F',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
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
  challengeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4AF37',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  challengeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  menuOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: '80%',
    maxWidth: 300,
    overflow: 'hidden',
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuOptionText: {
    fontSize: 16,
    color: '#2D5F3F',
    fontWeight: '500',
  },
  menuOptionDanger: {
    color: '#F44336',
  },
});
