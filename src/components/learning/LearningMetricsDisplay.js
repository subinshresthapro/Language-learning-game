/**
 * LearningMetricsDisplay.js
 * 
 * Component for displaying learning progress metrics
 * Shows words learned, pronunciation accuracy, time spent, and achievements
 */

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLearningProgress } from './LearningProgressTracker';

/**
 * Learning Metrics Display Component
 * Shows comprehensive learning statistics
 */
const LearningMetricsDisplay = () => {
  const { 
    getLearningStatistics, 
    getSessionStatistics,
    getMasteredWords,
    getWordsNeedingReview,
    loading,
    error
  } = useLearningProgress();
  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading learning metrics...</Text>
      </View>
    );
  }
  
  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }
  
  const learningStats = getLearningStatistics();
  const sessionStats = getSessionStatistics();
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Vocabulary Progress</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Words Learned:</Text>
          <Text style={styles.statValue}>{learningStats.totalWordsLearned}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Mastered Words:</Text>
          <Text style={styles.statValue}>{learningStats.masteredWordsCount}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Practicing Words:</Text>
          <Text style={styles.statValue}>{learningStats.practicingWordsCount}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Introduced Words:</Text>
          <Text style={styles.statValue}>{learningStats.introducedWordsCount}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Words Needing Review:</Text>
          <Text style={styles.statValue}>{learningStats.wordsNeedingReviewCount}</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pronunciation</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Average Accuracy:</Text>
          <Text style={styles.statValue}>{Math.round(learningStats.averagePronunciationScore)}%</Text>
        </View>
        <View style={styles.pronunciationBar}>
          <View 
            style={[
              styles.pronunciationFill, 
              { width: `${Math.round(learningStats.averagePronunciationScore)}%` }
            ]} 
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learning Time</Text>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Learning Time:</Text>
          <Text style={styles.statValue}>{Math.round(sessionStats.totalLearningTime)} minutes</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Total Sessions:</Text>
          <Text style={styles.statValue}>{sessionStats.totalSessions}</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Average Session:</Text>
          <Text style={styles.statValue}>{Math.round(sessionStats.averageSessionDuration)} minutes</Text>
        </View>
        <View style={styles.statRow}>
          <Text style={styles.statLabel}>Current Streak:</Text>
          <Text style={styles.statValue}>{sessionStats.currentStreak} days</Text>
        </View>
      </View>
    </ScrollView>
  );
};

/**
 * Vocabulary Progress Chart Component
 * Visual representation of vocabulary mastery levels
 */
const VocabularyProgressChart = () => {
  const { getLearningStatistics, loading, error } = useLearningProgress();
  
  if (loading || error) return null;
  
  const stats = getLearningStatistics();
  const total = stats.totalWordsLearned || 1; // Avoid division by zero
  
  const masteredPercentage = (stats.masteredWordsCount / total) * 100;
  const practicingPercentage = (stats.practicingWordsCount / total) * 100;
  const introducedPercentage = (stats.introducedWordsCount / total) * 100;
  
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Vocabulary Mastery</Text>
      <View style={styles.chart}>
        <View style={[styles.chartBar, styles.masteredBar, { width: `${masteredPercentage}%` }]} />
        <View style={[styles.chartBar, styles.practicingBar, { width: `${practicingPercentage}%` }]} />
        <View style={[styles.chartBar, styles.introducedBar, { width: `${introducedPercentage}%` }]} />
      </View>
      <View style={styles.chartLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.masteredBar]} />
          <Text style={styles.legendText}>Mastered</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.practicingBar]} />
          <Text style={styles.legendText}>Practicing</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.introducedBar]} />
          <Text style={styles.legendText}>Introduced</Text>
        </View>
      </View>
    </View>
  );
};

/**
 * Learning Streak Display Component
 * Shows the current learning streak with visual indicators
 */
const LearningStreakDisplay = () => {
  const { getSessionStatistics, loading, error } = useLearningProgress();
  
  if (loading || error) return null;
  
  const { currentStreak } = getSessionStatistics();
  
  // Generate streak dots
  const renderStreakDots = () => {
    const dots = [];
    for (let i = 0; i < 7; i++) {
      dots.push(
        <View 
          key={i} 
          style={[
            styles.streakDot,
            i < currentStreak ? styles.activeStreakDot : styles.inactiveStreakDot
          ]} 
        />
      );
    }
    return dots;
  };
  
  return (
    <View style={styles.streakContainer}>
      <Text style={styles.streakTitle}>Learning Streak</Text>
      <Text style={styles.streakCount}>{currentStreak} days</Text>
      <View style={styles.streakDotsContainer}>
        {renderStreakDots()}
      </View>
      <Text style={styles.streakMessage}>
        {currentStreak === 0 ? "Start learning today!" :
         currentStreak < 3 ? "Keep going!" :
         currentStreak < 7 ? "Great progress!" :
         "Amazing dedication!"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  statValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  pronunciationBar: {
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginTop: 8,
    overflow: 'hidden',
  },
  pronunciationFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  
  // Chart styles
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chart: {
    height: 24,
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  chartBar: {
    height: '100%',
  },
  masteredBar: {
    backgroundColor: '#4CAF50', // Green
  },
  practicingBar: {
    backgroundColor: '#2196F3', // Blue
  },
  introducedBar: {
    backgroundColor: '#FFC107', // Amber
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  
  // Streak styles
  streakContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  streakTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  streakCount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 12,
  },
  streakDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 12,
  },
  streakDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  activeStreakDot: {
    backgroundColor: '#FF9800',
  },
  inactiveStreakDot: {
    backgroundColor: '#E0E0E0',
  },
  streakMessage: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

export { LearningMetricsDisplay, VocabularyProgressChart, LearningStreakDisplay };
export default LearningMetricsDisplay;
