import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Interests options (from onboarding)
const INTERESTS = [
  { id: 'quran', label: 'Quran', icon: 'book' },
  { id: 'hadith', label: 'Hadith', icon: 'library' },
  { id: 'fiqh', label: 'Fiqh', icon: 'scale' },
  { id: 'seerah', label: 'Seerah', icon: 'person' },
  { id: 'aqeedah', label: 'Aqeedah', icon: 'heart' },
  { id: 'history', label: 'Islamic History', icon: 'time' },
  { id: 'duas', label: 'Daily Duas', icon: 'hand-right' },
  { id: 'arabic', label: 'Arabic Language', icon: 'language' },
];

// Knowledge levels (from onboarding)
const KNOWLEDGE_LEVELS = [
  { id: 'beginner', label: 'Beginner', description: "I'm just starting to learn", icon: 'leaf' },
  { id: 'intermediate', label: 'Intermediate', description: 'I have foundational knowledge', icon: 'book' },
  { id: 'advanced', label: 'Advanced', description: "I've studied formally", icon: 'school' },
];

export default function EditProfileScreen({ userData, onBack, onSave }) {
  const [fullName, setFullName] = useState(userData?.fullName || '');
  const [username, setUsername] = useState(userData?.username || '');
  const [bio, setBio] = useState(userData?.bio || '');
  const [location, setLocation] = useState(userData?.location || '');
  const [interests, setInterests] = useState(userData?.interests || []);
  const [knowledgeLevel, setKnowledgeLevel] = useState(userData?.knowledgeLevel || null);
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const MAX_BIO_LENGTH = 150;

  const checkUsernameAvailability = (value) => {
    if (value === userData?.username) {
      setUsernameAvailable(null);
      return;
    }

    if (value.length < 3) {
      setUsernameAvailable(false);
      return;
    }

    setIsCheckingUsername(true);

    // Simulate API call to check username
    setTimeout(() => {
      // In production: API call to check if username exists
      const taken = ['admin', 'user', 'test'].includes(value.toLowerCase());
      setUsernameAvailable(!taken);
      setIsCheckingUsername(false);
    }, 500);
  };

  const handleUsernameChange = (value) => {
    // Only allow alphanumeric and underscores
    const sanitized = value.toLowerCase().replace(/[^a-z0-9_]/g, '');
    setUsername(sanitized);

    if (sanitized.length >= 3) {
      checkUsernameAvailability(sanitized);
    } else {
      setUsernameAvailable(null);
    }
  };

  const toggleInterest = (interestId) => {
    setInterests(prev =>
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSave = () => {
    // Validation
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name');
      return;
    }

    if (!username.trim() || username.length < 3) {
      Alert.alert('Error', 'Username must be at least 3 characters');
      return;
    }

    if (usernameAvailable === false) {
      Alert.alert('Error', 'This username is already taken');
      return;
    }

    if (bio.length > MAX_BIO_LENGTH) {
      Alert.alert('Error', `Bio must be ${MAX_BIO_LENGTH} characters or less`);
      return;
    }

    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      const updatedData = {
        fullName: fullName.trim(),
        username: username.trim(),
        bio: bio.trim(),
        location: location.trim(),
        interests: interests,
        knowledgeLevel: knowledgeLevel,
      };

      onSave?.(updatedData);
      setIsSaving(false);

      Alert.alert(
        'Success',
        'Profile updated successfully',
        [{ text: 'OK', onPress: onBack }]
      );
    }, 1000);
  };

  const hasChanges = () => {
    const interestsChanged = JSON.stringify(interests.sort()) !== JSON.stringify((userData?.interests || []).sort());
    const knowledgeLevelChanged = knowledgeLevel !== (userData?.knowledgeLevel || null);

    return (
      fullName !== (userData?.fullName || '') ||
      username !== (userData?.username || '') ||
      bio !== (userData?.bio || '') ||
      location !== (userData?.location || '') ||
      interestsChanged ||
      knowledgeLevelChanged
    );
  };

  const handleCancel = () => {
    if (hasChanges()) {
      Alert.alert(
        'Discard Changes?',
        'You have unsaved changes. Are you sure you want to discard them?',
        [
          { text: 'Keep Editing', style: 'cancel' },
          { text: 'Discard', style: 'destructive', onPress: onBack },
        ]
      );
    } else {
      onBack?.();
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity
            onPress={handleSave}
            disabled={isSaving || !hasChanges() || usernameAvailable === false}
            style={styles.saveButton}
          >
            <Text style={[
              styles.saveText,
              (isSaving || !hasChanges() || usernameAvailable === false) && styles.saveTextDisabled
            ]}>
              {isSaving ? 'Saving...' : 'Save'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Picture */}
          <View style={styles.profilePictureSection}>
            <View style={styles.profilePicture}>
              <Ionicons name="person-circle" size={100} color="#D4AF37" />
            </View>
            <TouchableOpacity style={styles.changePictureButton}>
              <Text style={styles.changePictureText}>Change Profile Picture</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            {/* Full Name */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Full Name</Text>
              <TextInput
                style={styles.textInput}
                value={fullName}
                onChangeText={setFullName}
                placeholder="Enter your full name"
                placeholderTextColor="#999"
                maxLength={50}
              />
            </View>

            {/* Username */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Username</Text>
              <View style={styles.usernameContainer}>
                <Text style={styles.atSymbol}>@</Text>
                <TextInput
                  style={styles.usernameInput}
                  value={username}
                  onChangeText={handleUsernameChange}
                  placeholder="username"
                  placeholderTextColor="#999"
                  maxLength={30}
                  autoCapitalize="none"
                />
                {isCheckingUsername && (
                  <Ionicons name="ellipsis-horizontal" size={20} color="#999" />
                )}
                {!isCheckingUsername && usernameAvailable === true && (
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                )}
                {!isCheckingUsername && usernameAvailable === false && (
                  <Ionicons name="close-circle" size={20} color="#F44336" />
                )}
              </View>
              {usernameAvailable === false && (
                <Text style={styles.errorText}>This username is already taken</Text>
              )}
              {usernameAvailable === true && username !== userData?.username && (
                <Text style={styles.successText}>This username is available</Text>
              )}
            </View>

            {/* Bio */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelRow}>
                <Text style={styles.fieldLabel}>Bio</Text>
                <Text style={[
                  styles.charCounter,
                  bio.length > MAX_BIO_LENGTH && styles.charCounterError
                ]}>
                  {bio.length}/{MAX_BIO_LENGTH}
                </Text>
              </View>
              <TextInput
                style={[styles.textInput, styles.bioInput]}
                value={bio}
                onChangeText={setBio}
                placeholder="Tell us about yourself..."
                placeholderTextColor="#999"
                multiline
                maxLength={MAX_BIO_LENGTH + 50} // Allow typing beyond limit to show error
                textAlignVertical="top"
              />
            </View>

            {/* Location */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Location</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={20} color="#666" />
                <TextInput
                  style={styles.locationInput}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="City, Country"
                  placeholderTextColor="#999"
                  maxLength={100}
                />
              </View>
            </View>

            {/* Interests */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Interests</Text>
              <Text style={styles.fieldHint}>Select topics you want to learn about</Text>
              <View style={styles.interestsGrid}>
                {INTERESTS.map((interest) => {
                  const isSelected = interests.includes(interest.id);
                  return (
                    <TouchableOpacity
                      key={interest.id}
                      style={[
                        styles.interestChip,
                        isSelected && styles.interestChipSelected
                      ]}
                      onPress={() => toggleInterest(interest.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons
                        name={interest.icon}
                        size={16}
                        color={isSelected ? '#FFFFFF' : '#2D5F3F'}
                      />
                      <Text style={[
                        styles.interestChipText,
                        isSelected && styles.interestChipTextSelected
                      ]}>
                        {interest.label}
                      </Text>
                      {isSelected && (
                        <Ionicons name="checkmark-circle" size={16} color="#FFFFFF" />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Knowledge Level */}
            <View style={styles.fieldContainer}>
              <Text style={styles.fieldLabel}>Knowledge Level</Text>
              <Text style={styles.fieldHint}>Select your current Islamic knowledge level</Text>
              {KNOWLEDGE_LEVELS.map((level) => {
                const isSelected = knowledgeLevel === level.id;
                return (
                  <TouchableOpacity
                    key={level.id}
                    style={[
                      styles.levelOption,
                      isSelected && styles.levelOptionSelected
                    ]}
                    onPress={() => setKnowledgeLevel(level.id)}
                    activeOpacity={0.7}
                  >
                    <View style={styles.levelIconContainer}>
                      <Ionicons
                        name={level.icon}
                        size={24}
                        color={isSelected ? '#D4AF37' : '#666'}
                      />
                    </View>
                    <View style={styles.levelTextContainer}>
                      <Text style={[
                        styles.levelLabel,
                        isSelected && styles.levelLabelSelected
                      ]}>
                        {level.label}
                      </Text>
                      <Text style={styles.levelDescription}>{level.description}</Text>
                    </View>
                    <Ionicons
                      name={isSelected ? "radio-button-on" : "radio-button-off"}
                      size={24}
                      color={isSelected ? "#D4AF37" : "#CCCCCC"}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Save Button (Mobile) */}
          <TouchableOpacity
            style={[
              styles.saveChangesButton,
              (isSaving || !hasChanges() || usernameAvailable === false) && styles.saveChangesButtonDisabled
            ]}
            onPress={handleSave}
            disabled={isSaving || !hasChanges() || usernameAvailable === false}
          >
            <Text style={styles.saveChangesButtonText}>
              {isSaving ? 'Saving Changes...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>

          <View style={styles.bottomPadding} />
        </ScrollView>
      </View>
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
  cancelButton: {
    padding: 4,
  },
  cancelText: {
    fontSize: 16,
    color: '#666',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D5F3F',
  },
  saveButton: {
    padding: 4,
  },
  saveText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  saveTextDisabled: {
    color: '#CCC',
  },
  scrollView: {
    flex: 1,
  },
  profilePictureSection: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 32,
    marginBottom: 8,
  },
  profilePicture: {
    marginBottom: 16,
  },
  changePictureButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  changePictureText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
  },
  formSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#2D5F3F',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  usernameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  atSymbol: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
  usernameInput: {
    flex: 1,
    fontSize: 15,
    color: '#2D5F3F',
    padding: 0,
  },
  bioInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 8,
  },
  locationInput: {
    flex: 1,
    fontSize: 15,
    color: '#2D5F3F',
    padding: 0,
  },
  charCounter: {
    fontSize: 12,
    color: '#999',
  },
  charCounterError: {
    color: '#F44336',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 12,
    color: '#F44336',
    marginTop: 4,
  },
  successText: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
  },
  saveChangesButton: {
    backgroundColor: '#2D5F3F',
    marginHorizontal: 20,
    marginTop: 8,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveChangesButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  saveChangesButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bottomPadding: {
    height: 40,
  },
  fieldHint: {
    fontSize: 13,
    color: '#999',
    marginBottom: 12,
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  interestChip: {
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
  interestChipSelected: {
    backgroundColor: '#2D5F3F',
    borderColor: '#D4AF37',
  },
  interestChipText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#2D5F3F',
  },
  interestChipTextSelected: {
    color: '#FFFFFF',
  },
  levelOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },
  levelOptionSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#D4AF37',
  },
  levelIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  levelTextContainer: {
    flex: 1,
  },
  levelLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 2,
  },
  levelLabelSelected: {
    color: '#2D5F3F',
  },
  levelDescription: {
    fontSize: 13,
    color: '#666',
  },
});
