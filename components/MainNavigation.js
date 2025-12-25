import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './screens/HomeScreen';
import ExploreScreen from './screens/ExploreScreen';
import QuizScreen from './screens/QuizScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import ProfileScreen from './screens/ProfileScreen';

export default function MainNavigation({ userData }) {
  const [activeTab, setActiveTab] = useState('home');
  const [notificationCount, setNotificationCount] = useState(5); // Demo count
  const [challengeCount, setChallengeCount] = useState(2); // Demo count

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: 'home',
      iconOutline: 'home-outline',
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: 'compass',
      iconOutline: 'compass-outline',
    },
    {
      id: 'quiz',
      label: 'Quiz',
      icon: 'trophy',
      iconOutline: 'trophy-outline',
      badge: challengeCount,
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'notifications',
      iconOutline: 'notifications-outline',
      badge: notificationCount,
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: 'person',
      iconOutline: 'person-outline',
    },
  ];

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen userData={userData} />;
      case 'explore':
        return <ExploreScreen userData={userData} />;
      case 'quiz':
        return <QuizScreen userData={userData} />;
      case 'notifications':
        return <NotificationsScreen userData={userData} />;
      case 'profile':
        return <ProfileScreen userData={userData} />;
      default:
        return <HomeScreen userData={userData} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Screen Content */}
      <View style={styles.content}>
        {renderScreen()}
      </View>

      {/* Bottom Navigation Bar */}
      <View style={styles.bottomNav}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabButton}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.7}
            >
              <View style={styles.tabIconContainer}>
                <Ionicons
                  name={isActive ? tab.icon : tab.iconOutline}
                  size={24}
                  color={isActive ? '#D4AF37' : '#999'}
                />
                {tab.badge > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {tab.badge > 9 ? '9+' : tab.badge}
                    </Text>
                  </View>
                )}
              </View>
              <Text
                style={[
                  styles.tabLabel,
                  isActive && styles.tabLabelActive
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingBottom: 8,
    paddingTop: 8,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabIconContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  tabLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
  tabLabelActive: {
    color: '#D4AF37',
    fontWeight: '600',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -8,
    backgroundColor: '#FF4444',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
