import { View, Text, ScrollView, StyleSheet, RefreshControl, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../PostCard';
import CreatePostModal from '../CreatePostModal';

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
    id: '3',
    authorName: 'Yusuf Ali',
    authorUsername: 'yusuf_ali',
    timestamp: '1d ago',
    category: 'Fiqh',
    content: 'Question: What is the ruling on combining prayers while traveling? I have a long journey coming up and want to make sure I understand the conditions correctly.',
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
    console.log('Comment on post:', postId);
    // TODO: Navigate to post detail/comments
  };

  const handleShare = (postId) => {
    console.log('Share post:', postId);
    // TODO: Open share sheet
  };

  const handleCreatePost = (newPost) => {
    // Add new post to the top of the feed
    setPosts(prevPosts => [newPost, ...prevPosts]);
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
        <TouchableOpacity>
          <Ionicons name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
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
});
