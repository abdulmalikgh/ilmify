import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Comment from '../Comment';

// Demo comments data
const DEMO_COMMENTS = [
  {
    id: '1',
    authorName: 'Aisha Rahman',
    timestamp: '1h ago',
    content: 'I highly recommend "Tafsir Ibn Kathir" - it\'s comprehensive and easy to understand. Also "In the Shade of the Quran" by Sayyid Qutb is excellent!',
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: '1-1',
        authorName: 'Omar Abdullah',
        timestamp: '45m ago',
        content: 'Agreed! Ibn Kathir is a classic. The translation by Safiur Rahman al-Mubarakpuri is very accessible.',
        likes: 3,
        isLiked: false,
      },
    ],
  },
  {
    id: '2',
    authorName: 'Muhammad Ali',
    timestamp: '3h ago',
    content: 'For beginners, I\'d also suggest "Towards Understanding the Quran" by Mawdudi. It\'s very clear and practical.',
    likes: 8,
    isLiked: true,
    replies: [],
  },
  {
    id: '3',
    authorName: 'Zainab Hassan',
    timestamp: '5h ago',
    content: 'Don\'t forget about the tafsir lectures by Nouman Ali Khan! They really help bring the meanings to life.',
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: '3-1',
        authorName: 'Ibrahim Yusuf',
        timestamp: '4h ago',
        content: 'Yes! His linguistic approach is amazing. Really helps understand the nuances of the Arabic.',
        likes: 5,
        isLiked: true,
      },
    ],
  },
];

export default function PostDetailScreen({ post, userData, onBack, onAuthorPress }) {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState(DEMO_COMMENTS);
  const [sortBy, setSortBy] = useState('top'); // 'top' | 'newest'
  const [localPost, setLocalPost] = useState(post);

  const handleAuthorPress = (userId) => {
    onAuthorPress?.(userId);
  };

  const formatDate = (timestamp) => {
    // In production, use a library like date-fns or moment
    return timestamp || 'Dec 15, 2024';
  };

  const handleLike = () => {
    setLocalPost({
      ...localPost,
      isLiked: !localPost.isLiked,
      likes: localPost.isLiked ? localPost.likes - 1 : localPost.likes + 1,
    });
  };

  const handleCommentLike = (commentId) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          isLiked: !comment.isLiked,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
        };
      }
      // Handle nested replies
      if (comment.replies) {
        return {
          ...comment,
          replies: comment.replies.map(reply =>
            reply.id === commentId
              ? {
                  ...reply,
                  isLiked: !reply.isLiked,
                  likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                }
              : reply
          ),
        };
      }
      return comment;
    }));
  };

  const handleSubmitComment = () => {
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now().toString(),
      authorName: userData?.fullName || 'User',
      timestamp: 'Just now',
      content: commentText.trim(),
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setComments([newComment, ...comments]);
    setCommentText('');

    // Update comment count on post
    setLocalPost({
      ...localPost,
      comments: localPost.comments + 1,
    });
  };

  const handleReply = (commentId) => {
    // In production, this would focus the input and set reply context
    console.log('Reply to:', commentId);
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === 'newest') {
      return b.id.localeCompare(a.id);
    }
    // 'top' - sort by likes
    return b.likes - a.likes;
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2D5F3F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="share-outline" size={24} color="#2D5F3F" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Post Card */}
        <View style={styles.postCard}>
          {/* Author Info */}
          <View style={styles.authorSection}>
            <TouchableOpacity
              style={styles.authorInfoClickable}
              onPress={() => handleAuthorPress(localPost.authorId || localPost.authorUsername)}
              activeOpacity={0.7}
            >
              <Ionicons name="person-circle" size={48} color="#D4AF37" />
              <View style={styles.authorDetails}>
                <Text style={styles.authorName}>{localPost.authorName}</Text>
                <Text style={styles.authorUsername}>@{localPost.authorUsername}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          {/* Post Content */}
          <View style={styles.contentSection}>
            {localPost.category && (
              <View style={styles.categoryBadge}>
                <Ionicons name="bookmark" size={12} color="#D4AF37" />
                <Text style={styles.categoryText}>{localPost.category}</Text>
              </View>
            )}
            <Text style={styles.postText}>{localPost.content}</Text>
            <Text style={styles.timestamp}>{formatDate(localPost.timestamp)}</Text>
          </View>

          {/* Engagement Bar */}
          <View style={styles.engagementBar}>
            <View style={styles.statItem}>
              <Ionicons name="heart" size={18} color="#F44336" />
              <Text style={styles.statText}>{localPost.likes} {localPost.likes === 1 ? 'Like' : 'Likes'}</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="chatbubble" size={18} color="#2D5F3F" />
              <Text style={styles.statText}>{localPost.comments} {localPost.comments === 1 ? 'Comment' : 'Comments'}</Text>
            </View>
            <TouchableOpacity style={styles.statItem}>
              <Ionicons name="share-outline" size={18} color="#2D5F3F" />
              <Text style={styles.statText}>Share</Text>
            </TouchableOpacity>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={handleLike}
              activeOpacity={0.7}
            >
              <Ionicons
                name={localPost.isLiked ? "heart" : "heart-outline"}
                size={22}
                color={localPost.isLiked ? "#F44336" : "#666"}
              />
              <Text style={[styles.actionButtonText, localPost.isLiked && styles.actionButtonTextActive]}>
                Like
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Ionicons name="chatbubble-outline" size={22} color="#666" />
              <Text style={styles.actionButtonText}>Comment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
              <Ionicons
                name={localPost.isBookmarked ? "bookmark" : "bookmark-outline"}
                size={22}
                color={localPost.isBookmarked ? "#D4AF37" : "#666"}
              />
              <Text style={styles.actionButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Comments Section */}
        <View style={styles.commentsSection}>
          {/* Comments Header */}
          <View style={styles.commentsHeader}>
            <Text style={styles.commentsTitle}>Comments ({comments.length})</Text>
            <View style={styles.sortOptions}>
              <TouchableOpacity
                style={[styles.sortButton, sortBy === 'top' && styles.sortButtonActive]}
                onPress={() => setSortBy('top')}
              >
                <Text style={[styles.sortButtonText, sortBy === 'top' && styles.sortButtonTextActive]}>
                  Top
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sortButton, sortBy === 'newest' && styles.sortButtonActive]}
                onPress={() => setSortBy('newest')}
              >
                <Text style={[styles.sortButtonText, sortBy === 'newest' && styles.sortButtonTextActive]}>
                  Newest
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Comments List */}
          <View style={styles.commentsList}>
            {sortedComments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onLike={handleCommentLike}
                onReply={handleReply}
                onAuthorPress={handleAuthorPress}
              />
            ))}
          </View>
        </View>

        {/* Bottom padding for fixed input */}
        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Comment Input - Fixed at Bottom */}
      <View style={styles.commentInputContainer}>
        <Ionicons name="person-circle" size={32} color="#D4AF37" />
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          placeholderTextColor="#999"
          value={commentText}
          onChangeText={setCommentText}
          multiline
          maxLength={500}
        />
        <TouchableOpacity
          onPress={handleSubmitComment}
          disabled={!commentText.trim()}
          style={[
            styles.sendButton,
            !commentText.trim() && styles.sendButtonDisabled
          ]}
        >
          <Ionicons
            name="send"
            size={20}
            color={commentText.trim() ? "#2D5F3F" : "#CCC"}
          />
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
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
    flexDirection: 'row',
    width: 60,
    justifyContent: 'flex-end',
  },
  headerButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  postCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderBottomWidth: 8,
    borderBottomColor: '#F0F0F0',
  },
  authorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  authorInfoClickable: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorDetails: {
    flex: 1,
    marginLeft: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 2,
  },
  authorUsername: {
    fontSize: 14,
    color: '#666',
  },
  moreButton: {
    padding: 4,
  },
  contentSection: {
    marginBottom: 16,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 12,
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D4AF37',
  },
  postText: {
    fontSize: 16,
    color: '#2D5F3F',
    lineHeight: 24,
    marginBottom: 12,
  },
  timestamp: {
    fontSize: 14,
    color: '#999',
  },
  engagementBar: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    gap: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 14,
    color: '#2D5F3F',
    fontWeight: '500',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  actionButtonTextActive: {
    color: '#F44336',
  },
  commentsSection: {
    backgroundColor: '#FFFFFF',
    paddingTop: 16,
  },
  commentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  sortOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  sortButtonActive: {
    backgroundColor: '#2D5F3F',
  },
  sortButtonText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  sortButtonTextActive: {
    color: '#FFFFFF',
  },
  commentsList: {
    paddingHorizontal: 16,
  },
  bottomPadding: {
    height: 80,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  commentInput: {
    flex: 1,
    fontSize: 15,
    color: '#2D5F3F',
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
