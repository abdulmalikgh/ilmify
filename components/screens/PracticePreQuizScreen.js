import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PracticePreQuizScreen({ category, difficulty, onBack, onStart }) {
  const categoryIcons = {
    Quran: '📖',
    Hadith: '📜',
    Fiqh: '⚖️',
    Seerah: '🕌',
    Aqeedah: '🤲',
    History: '🏛️',
  };

  const difficultyColors = {
    Easy: '#4CAF50',
    Medium: '#FF9800',
    Hard: '#FF4444',
  };

  const difficultyStars = {
    Easy: 1,
    Medium: 2,
    Hard: 3,
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Practice Mode</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Category Display */}
        <View style={styles.categoryDisplay}>
          <Text style={styles.categoryIcon}>{categoryIcons[category]}</Text>
          <Text style={styles.categoryName}>{category}</Text>
        </View>

        {/* Quiz Details Card */}
        <View style={styles.detailsCard}>
          <Text style={styles.sectionLabel}>Quiz Details</Text>

          {/* Difficulty */}
          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Ionicons name="speedometer-outline" size={20} color="#666" />
              <Text style={styles.detailLabelText}>Difficulty</Text>
            </View>
            <View style={styles.difficultyBadge}>
              {[...Array(difficultyStars[difficulty])].map((_, i) => (
                <Ionicons
                  key={i}
                  name="star"
                  size={16}
                  color={difficultyColors[difficulty]}
                  style={{ marginLeft: i > 0 ? 2 : 0 }}
                />
              ))}
              <Text style={[styles.difficultyText, { color: difficultyColors[difficulty] }]}>
                {difficulty}
              </Text>
            </View>
          </View>

          {/* Number of Questions */}
          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Ionicons name="help-circle-outline" size={20} color="#666" />
              <Text style={styles.detailLabelText}>Questions</Text>
            </View>
            <Text style={styles.detailValue}>5 Questions</Text>
          </View>

          {/* Estimated Time */}
          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Ionicons name="time-outline" size={20} color="#666" />
              <Text style={styles.detailLabelText}>Time Limit</Text>
            </View>
            <Text style={styles.detailValue}>5 minutes</Text>
          </View>

          {/* Points */}
          <View style={styles.detailRow}>
            <View style={styles.detailLabel}>
              <Ionicons name="star-outline" size={20} color="#666" />
              <Text style={styles.detailLabelText}>Potential Points</Text>
            </View>
            <Text style={[styles.detailValue, { color: '#D4AF37', fontWeight: '600' }]}>
              +{difficulty === 'Easy' ? '50' : difficulty === 'Medium' ? '100' : '150'} pts
            </Text>
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>Instructions</Text>
          <View style={styles.instructionItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.instructionText}>Answer all questions to complete the quiz</Text>
          </View>
          <View style={styles.instructionItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.instructionText}>You can skip and come back to questions</Text>
          </View>
          <View style={styles.instructionItem}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
            <Text style={styles.instructionText}>Timer starts when you begin</Text>
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity
          style={styles.startButton}
          activeOpacity={0.7}
          onPress={onStart}
        >
          <Ionicons name="play-circle" size={24} color="#FFFFFF" />
          <Text style={styles.startButtonText}>Start Practice</Text>
        </TouchableOpacity>
      </ScrollView>
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
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  placeholder: {
    width: 32,
  },
  content: {
    flex: 1,
    padding: 16,
    paddingBottom: 32,
  },
  categoryDisplay: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  categoryIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabelText: {
    fontSize: 15,
    color: '#666',
    marginLeft: 8,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  difficultyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  instructionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 12,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
    flex: 1,
  },
  startButton: {
    backgroundColor: '#2D5F3F',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 8,
  },
});
