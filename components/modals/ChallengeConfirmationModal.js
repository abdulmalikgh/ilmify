import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChallengeConfirmationModal({
  visible,
  opponent,
  category,
  onCancel,
  onConfirm
}) {
  if (!opponent) return null;

  const difficulty = 'Intermediate'; // In production, this could be dynamic
  const questionCount = 5;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="trophy" size={48} color="#D4AF37" />
          </View>

          {/* Title */}
          <Text style={styles.title}>Challenge {opponent.name}?</Text>

          {/* Opponent Info */}
          <View style={styles.opponentInfo}>
            <Ionicons name="person-circle" size={64} color="#D4AF37" />
            <Text style={styles.opponentName}>{opponent.name}</Text>
            <Text style={styles.opponentUsername}>@{opponent.username}</Text>
            {opponent.isOnline && (
              <View style={styles.onlineBadge}>
                <View style={styles.onlineDot} />
                <Text style={styles.onlineText}>Online Now</Text>
              </View>
            )}
          </View>

          {/* Challenge Details */}
          <View style={styles.detailsContainer}>
            {category && (
              <View style={styles.detailRow}>
                <View style={styles.detailIcon}>
                  <Ionicons name="bookmark" size={20} color="#D4AF37" />
                </View>
                <View style={styles.detailContent}>
                  <Text style={styles.detailLabel}>Category</Text>
                  <Text style={styles.detailValue}>{category}</Text>
                </View>
              </View>
            )}

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="speedometer" size={20} color="#2D5F3F" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Difficulty</Text>
                <Text style={styles.detailValue}>{difficulty}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="help-circle" size={20} color="#2196F3" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Questions</Text>
                <Text style={styles.detailValue}>{questionCount} questions</Text>
              </View>
            </View>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={20} color="#2D5F3F" />
            <Text style={styles.infoText}>Same questions for both players</Text>
          </View>

          {/* Offline User Notice */}
          {!opponent.isOnline && (
            <View style={styles.offlineNotice}>
              <Ionicons name="time-outline" size={18} color="#FF9800" />
              <Text style={styles.offlineText}>
                They have 24 hours to respond
              </Text>
            </View>
          )}

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
              activeOpacity={0.7}
            >
              <Ionicons name="flash" size={20} color="#FFFFFF" />
              <Text style={styles.confirmButtonText}>Send Challenge</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2D5F3F',
    marginBottom: 24,
    textAlign: 'center',
  },
  opponentInfo: {
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    width: '100%',
  },
  opponentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D5F3F',
    marginTop: 12,
  },
  opponentUsername: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  onlineBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    marginTop: 8,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  onlineText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  detailsContainer: {
    width: '100%',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 12,
    gap: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#2D5F3F',
    flex: 1,
  },
  offlineNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    marginBottom: 16,
    gap: 8,
  },
  offlineText: {
    fontSize: 13,
    color: '#FF9800',
    fontWeight: '500',
    flex: 1,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#D4AF37',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
