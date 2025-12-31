import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PostCard({ post, onLike, onComment, onShare, onClick, onAuthorPress, onChallenge }) {
  const formatTime = (timestamp) => {
    // Simple time formatting - in production use a library like moment.js
    return timestamp || '2h ago';
  };

  const handleAuthorPress = () => {
    onAuthorPress?.(post.authorId || post.authorUsername);
  };

  const handleChallenge = () => {
    onChallenge?.(post);
  };

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.authorInfo}
          onPress={handleAuthorPress}
          activeOpacity={0.7}
        >
          <Ionicons name="person-circle" size={40} color="#D4AF37" />
          <View style={styles.authorDetails}>
            <Text style={styles.authorName}>{post.authorName}</Text>
            <View style={styles.metaInfo}>
              <Text style={styles.authorUsername}>@{post.authorUsername}</Text>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.time}>{formatTime(post.timestamp)}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Content - Clickable */}
      <TouchableOpacity
        style={styles.content}
        onPress={onClick}
        activeOpacity={0.95}
      >
        {post.category && (
          <View style={styles.categoryBadge}>
            <Ionicons name="bookmark" size={12} color="#D4AF37" />
            <Text style={styles.categoryText}>{post.category}</Text>
          </View>
        )}
        <Text style={styles.postText}>{post.content}</Text>

        {/* Quiz Result Card */}
        {post.type === 'quiz_result' && post.quizResult && (
          <View style={styles.quizResultCard}>
            <View style={styles.quizResultHeader}>
              <Ionicons name="trophy" size={24} color="#D4AF37" />
              <Text style={styles.quizResultTitle}>Quiz Result</Text>
            </View>

            <View style={styles.quizResultStats}>
              <View style={styles.quizResultStat}>
                <Text style={styles.quizResultStatValue}>{post.quizResult.score}%</Text>
                <Text style={styles.quizResultStatLabel}>Score</Text>
              </View>
              <View style={styles.quizResultDivider} />
              <View style={styles.quizResultStat}>
                <Text style={styles.quizResultStatValue}>{post.quizResult.correct}/{post.quizResult.total}</Text>
                <Text style={styles.quizResultStatLabel}>Correct</Text>
              </View>
              <View style={styles.quizResultDivider} />
              <View style={styles.quizResultStat}>
                <Text style={styles.quizResultStatValue}>{post.quizResult.time}</Text>
                <Text style={styles.quizResultStatLabel}>Time</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.challengeMeButton}
              onPress={handleChallenge}
              activeOpacity={0.7}
            >
              <Ionicons name="flash" size={18} color="#FFFFFF" />
              <Text style={styles.challengeMeButtonText}>Challenge Me</Text>
            </TouchableOpacity>
          </View>
        )}
      </TouchableOpacity>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onLike?.(post.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={post.isLiked ? "heart" : "heart-outline"}
            size={20}
            color={post.isLiked ? "#F44336" : "#666"}
          />
          <Text style={[styles.actionText, post.isLiked && styles.actionTextActive]}>
            {post.likes || 0}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onComment?.(post.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="chatbubble-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{post.comments || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => onShare?.(post.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="share-outline" size={20} color="#666" />
          <Text style={styles.actionText}>{post.shares || 0}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.7}>
          <Ionicons
            name={post.isBookmarked ? "bookmark" : "bookmark-outline"}
            size={20}
            color={post.isBookmarked ? "#D4AF37" : "#666"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  authorDetails: {
    marginLeft: 12,
    flex: 1,
  },
  authorName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 2,
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  authorUsername: {
    fontSize: 13,
    color: '#666',
  },
  dot: {
    fontSize: 13,
    color: '#999',
  },
  time: {
    fontSize: 13,
    color: '#999',
  },
  moreButton: {
    padding: 4,
  },
  content: {
    marginBottom: 12,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
    gap: 4,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D4AF37',
  },
  postText: {
    fontSize: 15,
    color: '#2D5F3F',
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    gap: 4,
  },
  actionText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },
  actionTextActive: {
    color: '#F44336',
  },
  quizResultCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  quizResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  quizResultTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  quizResultStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  quizResultStat: {
    alignItems: 'center',
    flex: 1,
  },
  quizResultStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 4,
  },
  quizResultStatLabel: {
    fontSize: 12,
    color: '#666',
  },
  quizResultDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  challengeMeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D4AF37',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  challengeMeButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
