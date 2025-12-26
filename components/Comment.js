import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function Comment({ comment, onLike, onReply, onAuthorPress, isNested = false }) {
  const [showReplies, setShowReplies] = useState(false);

  const formatTime = (timestamp) => {
    return timestamp || '2h ago';
  };

  const handleAuthorPress = () => {
    onAuthorPress?.(comment.authorId || comment.authorName);
  };

  return (
    <View style={[styles.container, isNested && styles.nestedContainer]}>
      <View style={styles.commentContent}>
        {/* Avatar - Clickable */}
        <TouchableOpacity onPress={handleAuthorPress} activeOpacity={0.7}>
          <Ionicons name="person-circle" size={32} color="#D4AF37" />
        </TouchableOpacity>

        {/* Comment Body */}
        <View style={styles.body}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={handleAuthorPress} activeOpacity={0.7}>
              <Text style={styles.authorName}>{comment.authorName}</Text>
            </TouchableOpacity>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.time}>{formatTime(comment.timestamp)}</Text>
          </View>

          {/* Comment Text */}
          <Text style={styles.text}>{comment.content}</Text>

          {/* Actions */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onLike?.(comment.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={comment.isLiked ? "heart" : "heart-outline"}
                size={16}
                color={comment.isLiked ? "#F44336" : "#666"}
              />
              <Text style={[styles.actionText, comment.isLiked && styles.actionTextActive]}>
                {comment.likes > 0 ? comment.likes : 'Like'}
              </Text>
            </TouchableOpacity>

            {!isNested && (
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => onReply?.(comment.id)}
                activeOpacity={0.7}
              >
                <Text style={styles.actionText}>Reply</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Replies Toggle */}
          {!isNested && comment.replies && comment.replies.length > 0 && (
            <TouchableOpacity
              onPress={() => setShowReplies(!showReplies)}
              style={styles.repliesToggle}
              activeOpacity={0.7}
            >
              <Ionicons
                name={showReplies ? "chevron-up" : "chevron-down"}
                size={14}
                color="#2D5F3F"
              />
              <Text style={styles.repliesToggleText}>
                {showReplies ? 'Hide' : 'View'} {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Nested Replies */}
      {!isNested && showReplies && comment.replies && (
        <View style={styles.repliesContainer}>
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onLike={onLike}
              onAuthorPress={onAuthorPress}
              isNested={true}
            />
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  nestedContainer: {
    marginLeft: 40,
    borderBottomWidth: 0,
  },
  commentContent: {
    flexDirection: 'row',
    gap: 12,
  },
  body: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  authorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  dot: {
    fontSize: 12,
    color: '#999',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  text: {
    fontSize: 14,
    color: '#2D5F3F',
    lineHeight: 20,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666',
  },
  actionTextActive: {
    color: '#F44336',
  },
  repliesToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
  },
  repliesToggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  repliesContainer: {
    marginTop: 8,
  },
});
