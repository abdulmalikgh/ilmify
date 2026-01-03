import { View, Text, ScrollView, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity, Modal } from 'react-native';
import { useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../PostCard';
import CreatePostModal from '../CreatePostModal';
import PostDetailScreen from './PostDetailScreen';
import ProfileScreen from './ProfileScreen';
import SelectOpponentScreen from './SelectOpponentScreen';
import ChallengePreviewScreen from './ChallengePreviewScreen';
import ChallengeQuestionScreen from './ChallengeQuestionScreen';
import WaitingForOpponentScreen from './WaitingForOpponentScreen';
import ChallengeResultsScreen from './ChallengeResultsScreen';
import ChallengeAnswersReviewScreen from './ChallengeAnswersReviewScreen';
import IncomingChallengeModal from '../modals/IncomingChallengeModal';

// Demo posts data
const DEMO_POSTS = [
  {
    id: '1',
    authorName: 'Ahmad Ibrahim',
    authorUsername: 'ahmad_i',
    timestamp: '2h ago',
    category: 'Quran',
    content: 'Just learned about the beautiful tafsir of Surah Al-Fatiha. The depth of meaning in just 7 verses is incredible! Does anyone have recommendations for good tafsir books?',
    likes: 24,
    comments: 8,
    shares: 3,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    type: 'quiz_result',
    authorName: 'Fatima Hassan',
    authorUsername: 'fatima_h',
    timestamp: '3h ago',
    category: 'Hadith',
    content: 'Just completed a Hadith quiz! Think you can beat my score?',
    quizResult: {
      score: 85,
      correct: 17,
      total: 20,
      time: '3:45',
      category: 'Hadith',
    },
    likes: 42,
    comments: 12,
    shares: 8,
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '3',
    authorName: 'Fatima Hassan',
    authorUsername: 'fatima_h',
    timestamp: '5h ago',
    category: 'Hadith',
    content: 'Reminder: "The best of you are those who are best to their families" - Prophet Muhammad (PBUH). Let\'s strive to be kind and patient with our loved ones today!',
    likes: 156,
    comments: 23,
    shares: 45,
    isLiked: true,
    isBookmarked: true,
  },
  {
    id: '4',
    type: 'quiz_result',
    authorName: 'Yusuf Ali',
    authorUsername: 'yusuf_ali',
    timestamp: '1d ago',
    category: 'Quran',
    content: 'New personal best on Quran quiz! Alhamdulillah',
    quizResult: {
      score: 95,
      correct: 19,
      total: 20,
      time: '2:30',
      category: 'Quran',
    },
    likes: 78,
    comments: 18,
    shares: 15,
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: '5',
    authorName: 'Yusuf Ali',
    authorUsername: 'yusuf_ali',
    timestamp: '1d ago',
    category: 'Fiqh',
    content: 'What is the ruling on combining prayers while traveling? I have a long journey coming up and want to make sure I understand the conditions correctly.',
    likes: 12,
    comments: 15,
    shares: 2,
    isLiked: false,
    isBookmarked: false,
  },
];

export default function HomeScreen({ userData }) {
  const [activeTab, setActiveTab] = useState('forYou'); // 'following', 'forYou', 'latest'
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showPostDetail, setShowPostDetail] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showSelectOpponent, setShowSelectOpponent] = useState(false);
  const [showChallengePreview, setShowChallengePreview] = useState(false);
  const [showChallengeQuiz, setShowChallengeQuiz] = useState(false);
  const [showChallengeSent, setShowChallengeSent] = useState(false);
  const [showChallengeResults, setShowChallengeResults] = useState(false);
  const [showAnswersReview, setShowAnswersReview] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [challengeResults, setChallengeResults] = useState(null);
  const [opponentResults, setOpponentResults] = useState(null);
  const [challengeQuestions, setChallengeQuestions] = useState(null);
  const [showIncomingChallenge, setShowIncomingChallenge] = useState(false);
  const [incomingChallenge, setIncomingChallenge] = useState(null);

  // Current user data for VS screen
  const currentUser = {
    name: userData?.fullName || userData?.username || 'You',
    username: userData?.username || 'user',
    level: 1, // In production: get from userData
    points: 0,
  };

  // Demo incoming challenge data
  const DEMO_INCOMING_CHALLENGE = {
    id: 'challenge_1',
    challengerName: 'Ahmad Ibrahim',
    challengerUsername: 'ahmad_i',
    category: 'Quran',
    difficulty: 'Intermediate',
    questions: 5,
    type: 'offline', // or 'online'
    expiresAt: new Date(Date.now() + 23 * 60 * 60 * 1000).toISOString(), // 23 hours from now
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setPosts(DEMO_POSTS);
      setRefreshing(false);
    }, 1500);
  }, []);

  const loadMorePosts = () => {
    if (loading) return;

    setLoading(true);
    // Simulate loading more posts
    setTimeout(() => {
      setLoading(false);
      // In production, append new posts
    }, 1500);
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;

    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      loadMorePosts();
    }
  };

  const handleLike = (postId) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handleComment = (postId) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setShowPostDetail(true);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setShowPostDetail(true);
  };

  const handleClosePostDetail = () => {
    setShowPostDetail(false);
    setSelectedPost(null);
  };

  const handleShare = (postId) => {
    console.log('Share post:', postId);
    // TODO: Open share sheet
  };

  const handleChallenge = (post) => {
    console.log('Challenge from quiz result:', post);

    // Create opponent object from the post author
    const opponent = {
      id: post.authorId || post.authorUsername,
      name: post.authorName,
      username: post.authorUsername,
      isOnline: Math.random() > 0.5, // Demo: random online status
      lastActive: '2h ago',
      isFollowing: false,
      points: 2450,
      categoryStats: {
        Quran: { accuracy: 88, gamesPlayed: 32 },
        Hadith: { accuracy: 85, gamesPlayed: 28 },
        Seerah: { accuracy: 90, gamesPlayed: 35 },
        Fiqh: { accuracy: 78, gamesPlayed: 22 },
      },
      skillLevel: 'intermediate',
    };

    setSelectedOpponent(opponent);
    setSelectedCategory(post.quizResult?.category || null);
    setShowChallengePreview(true);
  };

  const handleSelectOpponent = (opponent, category) => {
    setSelectedOpponent(opponent);
    setSelectedCategory(category);
    setShowSelectOpponent(false);
    setShowChallengePreview(true);
  };

  const handleStartChallenge = () => {
    // Start quiz directly for both online and offline
    console.log('Starting challenge quiz:', { opponent: selectedOpponent, category: selectedCategory });
    setShowChallengePreview(false);
    setShowChallengeQuiz(true);
  };

  const handleChallengeComplete = (results) => {
    console.log('Challenge quiz completed with results:', results);
    // In production: Send challenge to opponent with questions and your answers
    // API call: sendChallenge({ opponentId, category, questions, results })

    setChallengeResults(results);
    setShowChallengeQuiz(false);
    setShowChallengeSent(true);
  };

  const handleChallengeExit = () => {
    setShowChallengeQuiz(false);
    setSelectedOpponent(null);
    setSelectedCategory(null);
  };

  const handleBackFromChallengeSent = () => {
    setShowChallengeSent(false);
    setSelectedOpponent(null);
    setSelectedCategory(null);
    setChallengeResults(null);
  };

  const handleViewResults = () => {
    // Simulate opponent completing the challenge
    const mockOpponentResults = {
      correct: Math.floor(Math.random() * 6),
      total: 5,
    };

    // Generate demo questions for review BEFORE setting other state
    const demoQuestions = generateDemoQuestions(selectedCategory, challengeResults, mockOpponentResults);

    // Set all state together
    setChallengeQuestions(demoQuestions);
    setOpponentResults(mockOpponentResults);
    setShowChallengeSent(false);
    setShowChallengeResults(true);
  };

  const handleShareResults = () => {
    console.log('Sharing results...');
  };

  const handleRematch = () => {
    console.log('Requesting rematch...');
    setShowChallengeResults(false);
    setOpponentResults(null);
    setChallengeResults(null);
    setShowChallengePreview(true);
  };

  const handleDoneWithResults = () => {
    setShowChallengeResults(false);
    setSelectedOpponent(null);
    setSelectedCategory(null);
    setChallengeResults(null);
    setOpponentResults(null);
    setChallengeQuestions(null);
  };

  const handleViewAnswers = () => {
    let questionsToShow = challengeQuestions;
    if (!questionsToShow) {
      questionsToShow = generateDemoQuestions(selectedCategory, challengeResults, opponentResults);
      setChallengeQuestions(questionsToShow);
    }

    // Close the results modal first, then open the answers review modal
    // This is necessary because React Native can't stack multiple modals
    setShowChallengeResults(false);

    // Use a small delay to ensure the results modal closes before opening the answers review
    setTimeout(() => {
      setShowAnswersReview(true);
    }, 300);
  };

  const handleBackFromAnswersReview = () => {
    setShowAnswersReview(false);
  };

  const generateDemoQuestions = (category, userResults, opponentResults) => {
    const categoryName = category || 'Islamic Knowledge';
    const totalQuestions = userResults?.total || 5;
    const questions = [];

    for (let i = 0; i < totalQuestions; i++) {
      const roundResult = userResults?.roundResults?.[i];
      const userCorrect = roundResult?.userCorrect ?? (i < userResults?.correct);
      const opponentCorrect = roundResult?.opponentCorrect ?? (i < opponentResults?.correct);

      const questionData = {
        question: `What is the ${i + 1}st pillar of Islam?`,
        options: [
          'Shahada (Declaration of Faith)',
          'Salah (Prayer)',
          'Zakat (Charity)',
          'Sawm (Fasting)'
        ],
        correctAnswer: i % 4,
        userAnswer: userCorrect ? (i % 4) : ((i + 1) % 4),
        opponentAnswer: opponentCorrect ? (i % 4) : ((i + 2) % 4),
        explanation: 'The five pillars of Islam are the foundation of Muslim life. They are: Shahada (faith), Salah (prayer), Zakat (charity), Sawm (fasting during Ramadan), and Hajj (pilgrimage to Mecca).',
        reference: 'Sahih Bukhari, Book 2, Hadith 7'
      };

      if (categoryName.toLowerCase().includes('quran')) {
        questionData.question = `Question ${i + 1}: How many chapters (Surahs) are in the Quran?`;
        questionData.options = ['114', '110', '120', '100'];
        questionData.explanation = 'The Quran contains 114 chapters (Surahs), revealed to Prophet Muhammad (PBUH) over a period of approximately 23 years.';
        questionData.reference = 'Quran - Complete Text';
      } else if (categoryName.toLowerCase().includes('hadith')) {
        questionData.question = `Question ${i + 1}: Who compiled Sahih Bukhari?`;
        questionData.options = ['Imam Bukhari', 'Imam Muslim', 'Imam Tirmidhi', 'Imam Ahmad'];
        questionData.explanation = 'Sahih Bukhari was compiled by Imam Muhammad ibn Ismail al-Bukhari and is considered one of the most authentic collections of hadith.';
        questionData.reference = 'Islamic Hadith Studies';
      } else if (categoryName.toLowerCase().includes('seerah')) {
        questionData.question = `Question ${i + 1}: In which year was the Prophet Muhammad (PBUH) born?`;
        questionData.options = ['570 CE', '580 CE', '560 CE', '590 CE'];
        questionData.explanation = 'Prophet Muhammad (PBUH) was born in 570 CE in Mecca, in the Year of the Elephant.';
        questionData.reference = 'Seerah Ibn Hisham';
      }

      questions.push(questionData);
    }

    return questions;
  };

  const handleShowIncomingChallenge = () => {
    setIncomingChallenge(DEMO_INCOMING_CHALLENGE);
    setShowIncomingChallenge(true);
  };

  const handleAcceptChallenge = (challenge) => {
    console.log('Accepting challenge:', challenge);
    setShowIncomingChallenge(false);

    // In production: Accept challenge via API
    // API call: acceptChallenge(challenge.id)

    // Create opponent object from challenge data
    const opponent = {
      id: challenge.challengerId || 'challenger_1',
      name: challenge.challengerName,
      username: challenge.challengerUsername,
      isOnline: challenge.type === 'online',
      lastActive: challenge.type === 'online' ? null : '2h ago',
      isFollowing: false,
      points: 2850,
      level: 11,
      categoryStats: {
        Quran: { accuracy: 92, gamesPlayed: 45 },
        Hadith: { accuracy: 88, gamesPlayed: 32 },
        Seerah: { accuracy: 85, gamesPlayed: 28 },
        Fiqh: { accuracy: 78, gamesPlayed: 20 },
      },
      skillLevel: 'advanced',
    };

    // Set opponent and category, then show VS screen
    setSelectedOpponent(opponent);
    setSelectedCategory(challenge.category);
    setShowChallengePreview(true);
  };

  const handleDeclineChallenge = (challenge) => {
    console.log('Declining challenge:', challenge);
    setShowIncomingChallenge(false);

    // In production: Decline challenge via API
    // API call: declineChallenge(challenge.id)

    alert('Challenge declined');
  };

  const handleCreatePost = (newPost) => {
    // Add new post to the top of the feed
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleAuthorPress = (userId) => {
    console.log('Navigate to user profile:', userId);
    setSelectedUserId(userId);
    setShowUserProfile(true);
  };

  const handleCloseUserProfile = () => {
    setShowUserProfile(false);
    setSelectedUserId(null);
  };

  const renderEmptyState = () => {
    if (activeTab === 'following') {
      return (
        <View style={styles.emptyState}>
          <Ionicons name="people-outline" size={64} color="#D4AF37" />
          <Text style={styles.emptyTitle}>No posts yet</Text>
          <Text style={styles.emptyText}>
            Follow others to see their posts here
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.emptyState}>
        <Ionicons name="create-outline" size={64} color="#D4AF37" />
        <Text style={styles.emptyTitle}>No posts available</Text>
        <Text style={styles.emptyText}>
          Be the first to share something!
        </Text>
      </View>
    );
  };

  const getFilteredPosts = () => {
    // In production, filter posts based on active tab
    if (activeTab === 'following') {
      return []; // Return empty for demo
    }
    return posts;
  };

  const filteredPosts = getFilteredPosts();

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
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Ionicons name="search" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={handleShowIncomingChallenge}
          >
            <Ionicons name="notifications" size={24} color="#FFFFFF" />
            {/* Demo notification badge */}
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>1</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsCard}>
        <View style={styles.statItem}>
          <Ionicons name="trophy" size={20} color="#D4AF37" />
          <View style={styles.statTextContainer}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Points</Text>
          </View>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          <View style={styles.statTextContainer}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Won Today</Text>
          </View>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Ionicons name="flame" size={20} color="#FF9800" />
          <View style={styles.statTextContainer}>
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </View>

      {/* Feed Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'following' && styles.tabActive]}
          onPress={() => setActiveTab('following')}
        >
          <Text style={[styles.tabText, activeTab === 'following' && styles.tabTextActive]}>
            Following
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'forYou' && styles.tabActive]}
          onPress={() => setActiveTab('forYou')}
        >
          <Text style={[styles.tabText, activeTab === 'forYou' && styles.tabTextActive]}>
            For You
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'latest' && styles.tabActive]}
          onPress={() => setActiveTab('latest')}
        >
          <Text style={[styles.tabText, activeTab === 'latest' && styles.tabTextActive]}>
            Latest
          </Text>
        </TouchableOpacity>
      </View>

      {/* Feed Content */}
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#D4AF37"
            colors={['#D4AF37']}
          />
        }
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        <View style={styles.content}>
          {filteredPosts.length === 0 ? (
            renderEmptyState()
          ) : (
            <>
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onLike={handleLike}
                  onComment={handleComment}
                  onShare={handleShare}
                  onChallenge={handleChallenge}
                  onClick={() => handlePostClick(post)}
                  onAuthorPress={handleAuthorPress}
                />
              ))}

              {/* Loading Indicator */}
              {loading && (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#D4AF37" />
                  <Text style={styles.loadingText}>Loading more posts...</Text>
                </View>
              )}
            </>
          )}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowCreatePost(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Create Post Modal */}
      <CreatePostModal
        visible={showCreatePost}
        onClose={() => setShowCreatePost(false)}
        onSubmit={handleCreatePost}
        userData={userData}
      />

      {/* Post Detail Screen */}
      <Modal
        visible={showPostDetail && !!selectedPost}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        {selectedPost && (
          <PostDetailScreen
            post={selectedPost}
            userData={userData}
            onBack={handleClosePostDetail}
            onAuthorPress={handleAuthorPress}
          />
        )}
      </Modal>

      {/* User Profile Screen */}
      <Modal
        visible={showUserProfile}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ProfileScreen
          userData={null}
          isOwnProfile={false}
          showBackButton={true}
          onBack={handleCloseUserProfile}
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

      {/* Challenge Preview Screen */}
      <Modal
        visible={showChallengePreview}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChallengePreviewScreen
          currentUser={currentUser}
          opponent={selectedOpponent}
          category={selectedCategory}
          onBack={() => setShowChallengePreview(false)}
          onStart={handleStartChallenge}
        />
      </Modal>

      {/* Challenge Quiz Screen */}
      <Modal
        visible={showChallengeQuiz}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChallengeQuestionScreen
          currentUser={currentUser}
          opponent={selectedOpponent}
          category={selectedCategory}
          onComplete={handleChallengeComplete}
          onExit={handleChallengeExit}
        />
      </Modal>

      {/* Waiting for Opponent Screen */}
      <Modal
        visible={showChallengeSent}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <WaitingForOpponentScreen
          currentUser={currentUser}
          opponent={selectedOpponent}
          category={selectedCategory}
          userScore={challengeResults?.correct || 0}
          onBack={handleBackFromChallengeSent}
          onViewResults={handleViewResults}
        />
      </Modal>

      {/* Challenge Results Screen */}
      <Modal
        visible={showChallengeResults}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChallengeResultsScreen
          currentUser={currentUser}
          opponent={selectedOpponent}
          category={selectedCategory}
          userScore={challengeResults?.correct || 0}
          opponentScore={opponentResults?.correct || 0}
          totalQuestions={challengeResults?.total || 5}
          roundResults={challengeResults?.roundResults || []}
          questions={challengeQuestions}
          onShare={handleShareResults}
          onRematch={handleRematch}
          onDone={handleDoneWithResults}
          onViewAnswers={handleViewAnswers}
        />
      </Modal>

      {/* Challenge Answers Review Screen */}
      <Modal
        visible={showAnswersReview}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <ChallengeAnswersReviewScreen
          currentUser={currentUser}
          opponent={selectedOpponent}
          category={selectedCategory}
          questions={challengeQuestions || []}
          onBack={handleBackFromAnswersReview}
        />
      </Modal>

      {/* Incoming Challenge Modal */}
      <IncomingChallengeModal
        visible={showIncomingChallenge}
        challenge={incomingChallenge}
        onAccept={handleAcceptChallenge}
        onDecline={handleDeclineChallenge}
        onClose={() => setShowIncomingChallenge(false)}
      />
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
    paddingBottom: 16,
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
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  notificationButton: {
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2D5F3F',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: 'bold',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    justifyContent: 'center',
  },
  statTextContainer: {
    alignItems: 'flex-start',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
  },
  tabsContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 4,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#2D5F3F',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 48,
    alignItems: 'center',
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D5F3F',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#D4AF37',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  successOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  successButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    paddingHorizontal: 48,
    borderRadius: 12,
  },
  successButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
