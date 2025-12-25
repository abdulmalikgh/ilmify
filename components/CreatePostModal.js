import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = [
  { id: 'quran', name: 'Quran', icon: 'book' },
  { id: 'hadith', name: 'Hadith', icon: 'library' },
  { id: 'fiqh', name: 'Fiqh', icon: 'scale' },
  { id: 'seerah', name: 'Seerah', icon: 'person' },
  { id: 'aqeedah', name: 'Aqeedah', icon: 'heart' },
  { id: 'history', name: 'History', icon: 'time' },
  { id: 'duas', name: 'Duas', icon: 'hand-right' },
  { id: 'general', name: 'General', icon: 'chatbubble' },
];

export default function CreatePostModal({ visible, onClose, onSubmit, userData }) {
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!content.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const newPost = {
        id: Date.now().toString(),
        authorName: userData?.fullName || 'User',
        authorUsername: userData?.username || 'user',
        timestamp: 'Just now',
        category: selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : null,
        content: content.trim(),
        likes: 0,
        comments: 0,
        shares: 0,
        isLiked: false,
        isBookmarked: false,
      };

      onSubmit?.(newPost);
      setIsSubmitting(false);
      handleClose();
    }, 1000);
  };

  const handleClose = () => {
    setContent('');
    setSelectedCategory(null);
    onClose?.();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.modalContainer}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Ionicons name="close" size={28} color="#2D5F3F" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Create Post</Text>
              <TouchableOpacity
                onPress={handleSubmit}
                disabled={!content.trim() || isSubmitting}
                style={[
                  styles.postButton,
                  (!content.trim() || isSubmitting) && styles.postButtonDisabled
                ]}
              >
                <Text style={[
                  styles.postButtonText,
                  (!content.trim() || isSubmitting) && styles.postButtonTextDisabled
                ]}>
                  {isSubmitting ? 'Posting...' : 'Post'}
                </Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
              {/* User Info */}
              <View style={styles.userInfo}>
                <Ionicons name="person-circle" size={40} color="#D4AF37" />
                <Text style={styles.userName}>{userData?.fullName || 'User'}</Text>
              </View>

              {/* Post Input */}
              <TextInput
                style={styles.input}
                placeholder="What's on your mind? Share knowledge, ask questions..."
                placeholderTextColor="#999"
                multiline
                value={content}
                onChangeText={setContent}
                autoFocus
                maxLength={500}
              />

              {/* Character Count */}
              <Text style={styles.charCount}>{content.length}/500</Text>

              {/* Category Selection */}
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Category (Optional)</Text>
                <View style={styles.categoriesGrid}>
                  {CATEGORIES.map((category) => (
                    <TouchableOpacity
                      key={category.id}
                      style={[
                        styles.categoryChip,
                        selectedCategory === category.id && styles.categoryChipSelected
                      ]}
                      onPress={() => setSelectedCategory(
                        selectedCategory === category.id ? null : category.id
                      )}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={category.icon}
                        size={16}
                        color={selectedCategory === category.id ? '#FFFFFF' : '#2D5F3F'}
                      />
                      <Text style={[
                        styles.categoryChipText,
                        selectedCategory === category.id && styles.categoryChipTextSelected
                      ]}>
                        {category.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Guidelines */}
              <View style={styles.guidelines}>
                <Ionicons name="information-circle-outline" size={20} color="#2D5F3F" />
                <Text style={styles.guidelinesText}>
                  Share respectfully and follow Islamic etiquette
                </Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  closeButton: {
    padding: 4,
    width: 60,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  postButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#D4AF37',
    width: 80,
    alignItems: 'center',
  },
  postButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  postButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1B3A2B',
  },
  postButtonTextDisabled: {
    color: '#999',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 16,
    gap: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  input: {
    fontSize: 16,
    color: '#2D5F3F',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 12,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 6,
  },
  categoryChipSelected: {
    backgroundColor: '#2D5F3F',
    borderColor: '#D4AF37',
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2D5F3F',
  },
  categoryChipTextSelected: {
    color: '#FFFFFF',
  },
  guidelines: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
    gap: 8,
  },
  guidelinesText: {
    flex: 1,
    fontSize: 13,
    color: '#2D5F3F',
    lineHeight: 18,
  },
});
