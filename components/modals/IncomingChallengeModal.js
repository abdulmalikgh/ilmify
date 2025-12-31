import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function IncomingChallengeModal({
  visible,
  challenge,
  onAccept,
  onDecline,
  onClose
}) {
  const [timeLeft, setTimeLeft] = useState('');

  // Calculate time remaining
  useEffect(() => {
    if (!challenge?.expiresAt) return;

    const updateTimer = () => {
      const now = new Date().getTime();
      const expiry = new Date(challenge.expiresAt).getTime();
      const difference = expiry - now;

      if (difference <= 0) {
        setTimeLeft('Expired');
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${hours}h ${minutes}m`);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [challenge?.expiresAt]);

  if (!challenge) return null;

  const handleAccept = () => {
    onAccept?.(challenge);
  };

  const handleDecline = () => {
    onDecline?.(challenge);
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          {/* Close Button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>

          {/* Challenge Icon */}
          <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
              <Ionicons name="flash" size={40} color="#D4AF37" />
            </View>
          </View>

          {/* Title */}
          <Text style={styles.title}>New Challenge!</Text>

          {/* Challenger Info */}
          <View style={styles.challengerInfo}>
            <Ionicons name="person-circle" size={64} color="#D4AF37" />
            <View style={styles.challengerDetails}>
              <Text style={styles.challengerName}>{challenge.challengerName}</Text>
              <Text style={styles.challengerUsername}>@{challenge.challengerUsername}</Text>
              <Text style={styles.challengeText}>challenged you!</Text>
            </View>
          </View>

          {/* Challenge Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="bookmark" size={20} color="#D4AF37" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Category</Text>
                <Text style={styles.detailValue}>{challenge.category}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="speedometer" size={20} color="#2D5F3F" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Difficulty</Text>
                <Text style={styles.detailValue}>{challenge.difficulty || 'Intermediate'}</Text>
              </View>
            </View>

            <View style={styles.detailRow}>
              <View style={styles.detailIcon}>
                <Ionicons name="help-circle" size={20} color="#2196F3" />
              </View>
              <View style={styles.detailContent}>
                <Text style={styles.detailLabel}>Questions</Text>
                <Text style={styles.detailValue}>5 questions</Text>
              </View>
            </View>
          </View>

          {/* Expiry Timer */}
          {challenge.type === 'offline' && timeLeft && (
            <View style={styles.expiryContainer}>
              <Ionicons name="time-outline" size={20} color="#FF9800" />
              <Text style={styles.expiryText}>
                Expires in <Text style={styles.expiryTime}>{timeLeft}</Text>
              </Text>
            </View>
          )}

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Ionicons name="information-circle" size={18} color="#2D5F3F" />
            <Text style={styles.infoText}>
              {challenge.type === 'online'
                ? 'You both will answer at the same time'
                : 'You have 24 hours to accept and complete the quiz'
              }
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.declineButton}
              onPress={handleDecline}
              activeOpacity={0.7}
            >
              <Text style={styles.declineButtonText}>Decline</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.acceptButton}
              onPress={handleAccept}
              activeOpacity={0.7}
            >
              <Ionicons name="checkmark-circle" size={20} color="#FFFFFF" />
              <Text style={styles.acceptButtonText}>Accept</Text>
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
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 4,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF9E6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#D4AF37',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2D5F3F',
    textAlign: 'center',
    marginBottom: 20,
  },
  challengerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  challengerDetails: {
    marginLeft: 12,
    flex: 1,
  },
  challengerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 2,
  },
  challengerUsername: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  challengeText: {
    fontSize: 14,
    color: '#D4AF37',
    fontWeight: '500',
  },
  detailsContainer: {
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
  expiryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  expiryText: {
    fontSize: 14,
    color: '#FF9800',
    fontWeight: '500',
  },
  expiryTime: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#2D5F3F',
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  declineButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  declineButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  acceptButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  acceptButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
