import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Demo leaderboard data
const DEMO_LEADERBOARD = [
  {
    id: '1',
    name: 'Fatima Hassan',
    username: 'fatima_h',
    points: 3200,
    level: 15,
    avatar: 'person',
  },
  {
    id: '2',
    name: 'Ahmad Ibrahim',
    username: 'ahmad_i',
    points: 2850,
    level: 11,
    avatar: 'person',
  },
  {
    id: '3',
    name: 'Zaynab Khan',
    username: 'zaynab_k',
    points: 2600,
    level: 10,
    avatar: 'person',
  },
  {
    id: '4',
    name: 'Aisha Mohamed',
    username: 'aisha_m',
    points: 2450,
    level: 9,
    avatar: 'person',
  },
  {
    id: '5',
    name: 'Yusuf Ali',
    username: 'yusuf_ali',
    points: 2100,
    level: 8,
    avatar: 'person',
  },
  {
    id: '6',
    name: 'Omar Abdullah',
    username: 'omar_a',
    points: 1850,
    level: 7,
    avatar: 'person',
  },
  {
    id: '7',
    name: 'Khadija Ahmed',
    username: 'khadija_a',
    points: 1750,
    level: 7,
    avatar: 'person',
  },
  {
    id: '8',
    name: 'Ibrahim Yusuf',
    username: 'ibrahim_y',
    points: 1650,
    level: 6,
    avatar: 'person',
  },
  {
    id: '9',
    name: 'Maryam Ali',
    username: 'maryam_a',
    points: 1550,
    level: 6,
    avatar: 'person',
  },
  {
    id: '10',
    name: 'Hassan Omar',
    username: 'hassan_o',
    points: 1450,
    level: 5,
    avatar: 'person',
  },
];

export default function LeaderboardScreen({ userData }) {
  const [timeFilter, setTimeFilter] = useState('all_time'); // today, this_week, all_time
  const [categoryFilter, setCategoryFilter] = useState('overall'); // overall, quran, hadith, fiqh, seerah

  const timeFilters = [
    { id: 'today', label: 'Today' },
    { id: 'this_week', label: 'This Week' },
    { id: 'all_time', label: 'All Time' },
  ];

  const categoryFilters = [
    { id: 'overall', label: 'Overall' },
    { id: 'quran', label: 'Quran' },
    { id: 'hadith', label: 'Hadith' },
    { id: 'fiqh', label: 'Fiqh' },
    { id: 'seerah', label: 'Seerah' },
  ];

  // Current user's rank (demo)
  const currentUserRank = 47;
  const currentUserPoints = userData?.points || 850;

  // Get top 3 for podium
  const top3 = DEMO_LEADERBOARD.slice(0, 3);
  const remainingRankings = DEMO_LEADERBOARD.slice(3);

  // Rearrange top 3 for podium display: [2nd, 1st, 3rd]
  const podiumOrder = [top3[1], top3[0], top3[2]];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
        <View style={styles.headerIcon}>
          <Ionicons name="trophy" size={24} color="#D4AF37" />
        </View>
      </View>

      {/* Time Filter */}
      <View style={styles.timeFilterContainer}>
        {timeFilters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.timeFilterButton,
              timeFilter === filter.id && styles.timeFilterButtonActive,
            ]}
            onPress={() => setTimeFilter(filter.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.timeFilterText,
                timeFilter === filter.id && styles.timeFilterTextActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryTabs}
        contentContainerStyle={styles.categoryTabsContent}
      >
        {categoryFilters.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryTab,
              categoryFilter === category.id && styles.categoryTabActive,
            ]}
            onPress={() => setCategoryFilter(category.id)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.categoryTabText,
                categoryFilter === category.id && styles.categoryTabTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Top 3 Podium */}
        <View style={styles.podiumSection}>
          <View style={styles.podiumContainer}>
            {podiumOrder.map((user, index) => {
              // Actual ranks: 2nd, 1st, 3rd
              const actualRank = index === 0 ? 2 : index === 1 ? 1 : 3;
              const isFirst = actualRank === 1;
              const isSecond = actualRank === 2;
              const isThird = actualRank === 3;

              return (
                <View
                  key={user.id}
                  style={[
                    styles.podiumItem,
                    isFirst && styles.podiumItemFirst,
                  ]}
                >
                  {/* Rank Badge */}
                  <View
                    style={[
                      styles.rankBadge,
                      isFirst && styles.rankBadgeFirst,
                      isSecond && styles.rankBadgeSecond,
                      isThird && styles.rankBadgeThird,
                    ]}
                  >
                    {isFirst && <Ionicons name="trophy" size={20} color="#FFD700" />}
                    {isSecond && <Ionicons name="trophy" size={18} color="#C0C0C0" />}
                    {isThird && <Ionicons name="trophy" size={16} color="#CD7F32" />}
                  </View>

                  {/* Avatar */}
                  <View
                    style={[
                      styles.podiumAvatar,
                      isFirst && styles.podiumAvatarFirst,
                      isSecond && styles.podiumAvatarSecond,
                      isThird && styles.podiumAvatarThird,
                    ]}
                  >
                    <Ionicons
                      name="person"
                      size={isFirst ? 36 : isSecond ? 32 : 28}
                      color={isFirst ? '#FFD700' : isSecond ? '#C0C0C0' : '#CD7F32'}
                    />
                  </View>

                  {/* Name */}
                  <Text
                    style={[
                      styles.podiumName,
                      isFirst && styles.podiumNameFirst,
                    ]}
                    numberOfLines={1}
                  >
                    {user.name}
                  </Text>

                  {/* Points */}
                  <Text
                    style={[
                      styles.podiumPoints,
                      isFirst && styles.podiumPointsFirst,
                    ]}
                  >
                    {user.points.toLocaleString()} pts
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Full Rankings List */}
        <View style={styles.rankingsList}>
          <View style={styles.rankingsHeader}>
            <Text style={styles.rankingsHeaderText}>Full Rankings</Text>
          </View>

          {remainingRankings.map((user, index) => {
            const rank = index + 4; // Starting from 4th place
            return (
              <View key={user.id} style={styles.rankingItem}>
                {/* Rank Number */}
                <View style={styles.rankNumber}>
                  <Text style={styles.rankNumberText}>{rank}</Text>
                </View>

                {/* Avatar */}
                <View style={styles.rankingAvatar}>
                  <Ionicons name="person" size={28} color="#2D5F3F" />
                </View>

                {/* User Info */}
                <View style={styles.rankingInfo}>
                  <Text style={styles.rankingName}>{user.name}</Text>
                  <Text style={styles.rankingUsername}>@{user.username}</Text>
                </View>

                {/* Points */}
                <View style={styles.rankingPoints}>
                  <Text style={styles.rankingPointsText}>
                    {user.points.toLocaleString()}
                  </Text>
                  <Text style={styles.rankingPointsLabel}>pts</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Bottom padding for fixed bar */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Your Rank - Fixed at Bottom */}
      <View style={styles.yourRankBar}>
        <View style={styles.yourRankContent}>
          <Ionicons name="person-circle" size={32} color="#D4AF37" />
          <View style={styles.yourRankInfo}>
            <Text style={styles.yourRankLabel}>Your Rank</Text>
            <Text style={styles.yourRankNumber}>#{currentUserRank}</Text>
          </View>
          <View style={styles.yourRankPoints}>
            <Text style={styles.yourRankPointsText}>
              {currentUserPoints.toLocaleString()}
            </Text>
            <Text style={styles.yourRankPointsLabel}>pts</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2D5F3F',
    includeFontPadding: false,
  },
  headerIcon: {
    position: 'absolute',
    right: 16,
  },
  timeFilterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    gap: 8,
  },
  timeFilterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  timeFilterButtonActive: {
    backgroundColor: '#2D5F3F',
  },
  timeFilterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    lineHeight: 13,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  timeFilterTextActive: {
    color: '#FFFFFF',
  },
  categoryTabs: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    maxHeight: 56,
  },
  categoryTabsContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  categoryTab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  categoryTabActive: {
    backgroundColor: '#D4AF37',
  },
  categoryTabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
    lineHeight: 13,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  categoryTabTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  podiumSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  podiumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 12,
  },
  podiumItem: {
    alignItems: 'center',
    flex: 1,
  },
  podiumItemFirst: {
    marginBottom: 12,
  },
  rankBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  rankBadgeFirst: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9E6',
  },
  rankBadgeSecond: {
    backgroundColor: '#F5F5F5',
  },
  rankBadgeThird: {
    backgroundColor: '#FFF5E6',
  },
  podiumAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF5E6',
    borderWidth: 3,
    borderColor: '#CD7F32',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  podiumAvatarFirst: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFF9E6',
    borderColor: '#FFD700',
    borderWidth: 4,
  },
  podiumAvatarSecond: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#F5F5F5',
    borderColor: '#C0C0C0',
  },
  podiumAvatarThird: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF5E6',
    borderColor: '#CD7F32',
  },
  podiumName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 4,
    textAlign: 'center',
    width: '100%',
    includeFontPadding: false,
  },
  podiumNameFirst: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  podiumPoints: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    width: '100%',
    includeFontPadding: false,
  },
  podiumPointsFirst: {
    fontSize: 16,
  },
  rankingsList: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  rankingsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  rankingsHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D5F3F',
    includeFontPadding: false,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  rankNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    lineHeight: 14,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  rankingAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#2D5F3F',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rankingInfo: {
    flex: 1,
  },
  rankingName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2D5F3F',
    marginBottom: 2,
    includeFontPadding: false,
  },
  rankingUsername: {
    fontSize: 12,
    color: '#999',
    includeFontPadding: false,
  },
  rankingPoints: {
    alignItems: 'flex-end',
  },
  rankingPointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2D5F3F',
    includeFontPadding: false,
  },
  rankingPointsLabel: {
    fontSize: 11,
    color: '#999',
    includeFontPadding: false,
  },
  yourRankBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2D5F3F',
    borderTopWidth: 1,
    borderTopColor: '#D4AF37',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  yourRankContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  yourRankInfo: {
    flex: 1,
    marginLeft: 12,
  },
  yourRankLabel: {
    fontSize: 12,
    color: '#D4AF37',
    marginBottom: 2,
    includeFontPadding: false,
  },
  yourRankNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  yourRankPoints: {
    alignItems: 'flex-end',
  },
  yourRankPointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D4AF37',
    includeFontPadding: false,
  },
  yourRankPointsLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    includeFontPadding: false,
  },
});
