/**
 * Learning Algorithms for NepaliJets app
 * Implements spaced repetition, difficulty scaling, and adaptive learning paths
 */

/**
 * Spaced Repetition System (SRS)
 * Implements the SuperMemo-2 algorithm for optimal review scheduling
 */
export class SpacedRepetitionSystem {
  constructor() {
    // Default intervals in days
    this.intervals = [1, 3, 7, 14, 30, 60, 120, 240];
    this.easeFactor = 2.5; // Default ease factor
    this.minimumEaseFactor = 1.3; // Minimum ease factor
  }

  /**
   * Calculate next review date based on performance
   * @param {Object} item - Learning item (vocabulary, phrase, etc.)
   * @param {number} performance - Performance rating (0-5)
   * @returns {Object} - Updated item with next review date
   */
  scheduleNextReview(item, performance) {
    // Initialize if first review
    if (!item.repetitionNumber) {
      item.repetitionNumber = 0;
    }
    if (!item.easeFactor) {
      item.easeFactor = this.easeFactor;
    }
    if (!item.interval) {
      item.interval = 0;
    }

    // Calculate new values based on performance
    if (performance < 3) {
      // If performance is poor, reset repetition but keep ease factor
      item.repetitionNumber = 0;
      item.interval = 1; // Review again tomorrow
    } else {
      // Update ease factor based on performance
      item.easeFactor = Math.max(
        this.minimumEaseFactor,
        item.easeFactor + (0.1 - (5 - performance) * (0.08 + (5 - performance) * 0.02))
      );

      // Calculate next interval
      if (item.repetitionNumber === 0) {
        item.interval = 1; // First successful review
      } else if (item.repetitionNumber === 1) {
        item.interval = 3; // Second successful review
      } else {
        // Calculate interval using ease factor
        item.interval = Math.round(item.interval * item.easeFactor);
      }

      // Increment repetition number
      item.repetitionNumber++;
    }

    // Calculate next review date
    const now = new Date();
    const nextReviewDate = new Date();
    nextReviewDate.setDate(now.getDate() + item.interval);
    item.nextReviewDate = nextReviewDate.toISOString();

    // Update mastery level based on repetition number
    if (item.repetitionNumber >= 8) {
      item.mastered = true;
    }

    return item;
  }

  /**
   * Get items due for review
   * @param {Array} items - Array of learning items
   * @returns {Array} - Items due for review
   */
  getDueItems(items) {
    const now = new Date();
    return items.filter(item => {
      if (!item.nextReviewDate) {
        return true; // New items are always due
      }
      const reviewDate = new Date(item.nextReviewDate);
      return reviewDate <= now;
    });
  }

  /**
   * Get mastery percentage for a collection of items
   * @param {Array} items - Array of learning items
   * @returns {number} - Mastery percentage (0-100)
   */
  getMasteryPercentage(items) {
    if (!items || items.length === 0) {
      return 0;
    }
    
    const masteredCount = items.filter(item => item.mastered).length;
    return Math.round((masteredCount / items.length) * 100);
  }
}

/**
 * Difficulty Scaling System
 * Adjusts content difficulty based on user performance
 */
export class DifficultyScalingSystem {
  constructor() {
    // Performance thresholds for difficulty adjustment
    this.excellentThreshold = 90; // Percentage correct
    this.goodThreshold = 70;
    this.fairThreshold = 50;
    this.poorThreshold = 30;
    
    // Adjustment factors
    this.difficultyLevels = [1, 2, 3]; // Corresponds to DIFFICULTY_LEVELS in LanguageContent.js
    this.maxLevel = 3;
    this.minLevel = 1;
  }

  /**
   * Calculate appropriate difficulty level based on performance
   * @param {number} currentDifficulty - Current difficulty level
   * @param {number} performancePercentage - Performance percentage (0-100)
   * @returns {number} - Recommended difficulty level
   */
  calculateRecommendedDifficulty(currentDifficulty, performancePercentage) {
    if (performancePercentage >= this.excellentThreshold) {
      // Excellent performance, increase difficulty if possible
      return Math.min(this.maxLevel, currentDifficulty + 1);
    } else if (performancePercentage >= this.goodThreshold) {
      // Good performance, maintain current difficulty
      return currentDifficulty;
    } else if (performancePercentage >= this.fairThreshold) {
      // Fair performance, maintain current difficulty but provide more practice
      return currentDifficulty;
    } else {
      // Poor performance, decrease difficulty if possible
      return Math.max(this.minLevel, currentDifficulty - 1);
    }
  }

  /**
   * Filter content based on recommended difficulty
   * @param {Array} contentItems - Array of content items
   * @param {number} recommendedDifficulty - Recommended difficulty level
   * @param {boolean} includeEasier - Whether to include easier items
   * @returns {Array} - Filtered content items
   */
  filterContentByDifficulty(contentItems, recommendedDifficulty, includeEasier = true) {
    if (includeEasier) {
      // Include current and easier difficulties
      return contentItems.filter(item => item.difficulty <= recommendedDifficulty);
    } else {
      // Only include exact difficulty match
      return contentItems.filter(item => item.difficulty === recommendedDifficulty);
    }
  }

  /**
   * Generate a mixed difficulty set for balanced learning
   * @param {Array} contentItems - Array of content items
   * @param {number} recommendedDifficulty - Recommended difficulty level
   * @param {number} setSize - Desired set size
   * @returns {Array} - Mixed difficulty content set
   */
  generateMixedDifficultySet(contentItems, recommendedDifficulty, setSize) {
    // Group items by difficulty
    const itemsByDifficulty = {};
    this.difficultyLevels.forEach(level => {
      itemsByDifficulty[level] = contentItems.filter(item => item.difficulty === level);
    });
    
    // Calculate distribution percentages based on recommended difficulty
    let distribution;
    if (recommendedDifficulty === 1) {
      distribution = { 1: 0.8, 2: 0.2, 3: 0 };
    } else if (recommendedDifficulty === 2) {
      distribution = { 1: 0.2, 2: 0.6, 3: 0.2 };
    } else {
      distribution = { 1: 0.1, 2: 0.3, 3: 0.6 };
    }
    
    // Create mixed set
    const mixedSet = [];
    Object.keys(distribution).forEach(level => {
      const levelItems = itemsByDifficulty[level] || [];
      const count = Math.round(setSize * distribution[level]);
      
      // Randomly select items of this difficulty
      const selectedItems = this.getRandomItems(levelItems, count);
      mixedSet.push(...selectedItems);
    });
    
    // If we don't have enough items, fill with available items
    if (mixedSet.length < setSize) {
      const allItems = contentItems.filter(item => !mixedSet.includes(item));
      const additionalItems = this.getRandomItems(allItems, setSize - mixedSet.length);
      mixedSet.push(...additionalItems);
    }
    
    return mixedSet;
  }
  
  /**
   * Get random items from an array
   * @param {Array} items - Array of items
   * @param {number} count - Number of items to select
   * @returns {Array} - Randomly selected items
   */
  getRandomItems(items, count) {
    if (!items || items.length === 0) {
      return [];
    }
    
    const shuffled = [...items].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, items.length));
  }
}

/**
 * Adaptive Learning Path
 * Creates personalized learning sequences based on user progress
 */
export class AdaptiveLearningPath {
  constructor(userProgress, contentItems) {
    this.userProgress = userProgress || {};
    this.contentItems = contentItems || [];
    this.recommendedPath = [];
  }

  /**
   * Generate a personalized learning path
   * @param {number} pathLength - Desired path length
   * @returns {Array} - Personalized learning path
   */
  generatePersonalizedPath(pathLength = 10) {
    // Start with due review items from spaced repetition
    const srs = new SpacedRepetitionSystem();
    const dueItems = srs.getDueItems(this.contentItems);
    
    // Calculate current mastery and recommended difficulty
    const masteryPercentage = srs.getMasteryPercentage(this.contentItems);
    
    const difficultySystem = new DifficultyScalingSystem();
    const currentDifficulty = this.getCurrentDifficulty();
    const recommendedDifficulty = difficultySystem.calculateRecommendedDifficulty(
      currentDifficulty,
      masteryPercentage
    );
    
    // Start with due items
    this.recommendedPath = [...dueItems];
    
    // If we need more items to reach desired path length
    if (this.recommendedPath.length < pathLength) {
      // Get unmastered items at recommended difficulty
      const unmasteredItems = this.contentItems.filter(
        item => !item.mastered && !this.recommendedPath.includes(item)
      );
      
      // Generate mixed difficulty set from unmastered items
      const remainingCount = pathLength - this.recommendedPath.length;
      const mixedSet = difficultySystem.generateMixedDifficultySet(
        unmasteredItems,
        recommendedDifficulty,
        remainingCount
      );
      
      this.recommendedPath.push(...mixedSet);
    }
    
    // Trim to desired length if needed
    if (this.recommendedPath.length > pathLength) {
      this.recommendedPath = this.recommendedPath.slice(0, pathLength);
    }
    
    return this.recommendedPath;
  }

  /**
   * Get current difficulty level based on user progress
   * @returns {number} - Current difficulty level
   */
  getCurrentDifficulty() {
    // Default to level 1 if no progress data
    if (!this.userProgress || !this.userProgress.vocabularyProgress) {
      return 1;
    }
    
    // Calculate mastery percentages by difficulty level
    const masteryByLevel = {};
    let totalItemsByLevel = {};
    
    // Count items and mastered items by difficulty level
    this.contentItems.forEach(item => {
      const level = item.difficulty || 1;
      
      if (!totalItemsByLevel[level]) {
        totalItemsByLevel[level] = 0;
        masteryByLevel[level] = 0;
      }
      
      totalItemsByLevel[level]++;
      
      if (item.mastered) {
        masteryByLevel[level]++;
      }
    });
    
    // Calculate percentages
    Object.keys(totalItemsByLevel).forEach(level => {
      masteryByLevel[level] = (masteryByLevel[level] / totalItemsByLevel[level]) * 100;
    });
    
    // Determine current level based on mastery percentages
    if (masteryByLevel[1] >= 70 && masteryByLevel[2] >= 50) {
      return 3; // Advanced
    } else if (masteryByLevel[1] >= 70) {
      return 2; // Intermediate
    } else {
      return 1; // Beginner
    }
  }

  /**
   * Update learning path based on recent performance
   * @param {Array} completedItems - Recently completed items with performance data
   * @returns {Array} - Updated learning path
   */
  updatePath(completedItems) {
    if (!completedItems || completedItems.length === 0) {
      return this.recommendedPath;
    }
    
    // Update SRS scheduling for completed items
    const srs = new SpacedRepetitionSystem();
    completedItems.forEach(item => {
      const performance = item.lastPerformance || 3;
      const updatedItem = srs.scheduleNextReview(item, performance);
      
      // Update item in content items
      const index = this.contentItems.findIndex(i => i.id === updatedItem.id);
      if (index !== -1) {
        this.contentItems[index] = updatedItem;
      }
      
      // Remove from current path if it exists
      const pathIndex = this.recommendedPath.findIndex(i => i.id === updatedItem.id);
      if (pathIndex !== -1) {
        this.recommendedPath.splice(pathIndex, 1);
      }
    });
    
    // Regenerate path to fill gaps
    return this.generatePersonalizedPath(this.recommendedPath.length + completedItems.length);
  }

  /**
   * Get learning metrics based on current progress
   * @returns {Object} - Learning metrics
   */
  getLearningMetrics() {
    const srs = new SpacedRepetitionSystem();
    const masteryPercentage = srs.getMasteryPercentage(this.contentItems);
    
    // Calculate metrics by category
    const categoryCounts = {};
    const categoryMastery = {};
    
    this.contentItems.forEach(item => {
      const category = item.category || 'uncategorized';
      
      if (!categoryCounts[category]) {
        categoryCounts[category] = 0;
        categoryMastery[category] = 0;
      }
      
      categoryCounts[category]++;
      
      if (item.mastered) {
        categoryMastery[category]++;
      }
    });
    
    // Calculate percentages
    Object.keys(categoryCounts).forEach(category => {
      categoryMastery[category] = Math.round(
        (categoryMastery[category] / categoryCounts[category]) * 100
      );
    });
    
    return {
      overallMastery: masteryPercentage,
      categoryMastery,
      totalItems: this.contentItems.length,
      masteredItems: this.contentItems.filter(item => item.mastered).length,
      currentDifficulty: this.getCurrentDifficulty()
    };
  }
}

/**
 * Mastery Tracking System
 * Tracks and visualizes learning progress
 */
export class MasteryTrackingSystem {
  constructor(userProgress) {
    this.userProgress = userProgress || {};
    this.masteryLevels = {
      INTRODUCED: 'introduced',
      PRACTICING: 'practicing',
      MASTERED: 'mastered'
    };
  }

  /**
   * Update mastery level for a content item
   * @param {Object} item - Content item
   * @param {number} performance - Performance rating (0-5)
   * @returns {Object} - Updated item with new mastery level
   */
  updateMasteryLevel(item, performance) {
    // Initialize if needed
    if (!item.masteryLevel) {
      item.masteryLevel = this.masteryLevels.INTRODUCED;
    }
    if (!item.practiceCount) {
      item.practiceCount = 0;
    }
    if (!item.correctCount) {
      item.correctCount = 0;
    }
    
    // Update practice counts
    item.practiceCount++;
    if (performance >= 4) {
      item.correctCount++;
    }
    
    // Calculate success rate
    const successRate = (item.correctCount / item.practiceCount) * 100;
    
    // Update mastery level based on practice count and success rate
    if (item.practiceCount >= 10 && successRate >= 80) {
      item.masteryLevel = this.masteryLevels.MASTERED;
      item.mastered = true;
    } else if (item.practiceCount >= 3 && successRate >= 60) {
      item.masteryLevel = this.masteryLevels.PRACTICING;
    } else {
      item.masteryLevel = this.masteryLevels.INTRODUCED;
    }
    
    // Update last practiced timestamp
    item.lastPracticed = new Date().toISOString();
    item.lastPerformance = performance;
    
    return item;
  }

  /**
   * Get mastery distribution for a collection of items
   * @param {Array} items - Collection of content items
   * @returns {Object} - Mastery distribution by level
   */
  getMasteryDistribution(items) {
    if (!items || items.length === 0) {
      return {
        [this.masteryLevels.INTRODUCED]: 0,
        [this.masteryLevels.PRACTICING]: 0,
        [this.masteryLevels.MASTERED]: 0
      };
    }
    
    const distribution = {
      [this.masteryLevels.INTRODUCED]: 0,
      [this.masteryLevels.PRACTICING]: 0,
      [this.masteryLevels.MASTERED]: 0
    };
    
    items.forEach(item => {
      const level = item.masteryLevel || this.masteryLevels.INTRODUCED;
      distribution[level]++;
    });
    
    // Convert to percentages
    Object.keys(distribution).forEach(level => {
      distribution[level] = Math.round((distribution[level] / items.length) * 100);
    });
    
    return distribution;
  }

  /**
   * Calculate learning streak
   * @param {Array} sessions - Learning sessions with timestamps
   * @returns {Object} - Streak information
   */
  calculateStreak(sessions) {
    if (!sessions || sessions.length === 0) {
      return { currentStreak: 0, longestStreak: 0, lastActiveDate: null };
    }
    
    // Sort sessions by date
    const sortedSessions = [...sessions].sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    // Get most recent session date
    const lastSession = new Date(sortedSessions[0].timestamp);
    lastSession.setHours(0, 0, 0, 0);
    
    // Check if streak is broken
    if (lastSession < yesterday) {
      return { currentStreak: 0, longestStreak: 0, lastActiveDate: lastSession };
    }
    
    // Calculate current streak
    let currentStreak = 0;
    let longestStreak = 0;
    let currentDate = today;
    let activeDates = new Set();
    
    // Add all session dates to a set
    sortedSessions.forEach(session => {
      const sessionDate = new Date(session.timestamp);
      sessionDate.setHours(0, 0, 0, 0);
      activeDates.add(sessionDate.toISOString());
    });
    
    // Count consecutive days backward from today/yesterday
    const startDate = lastSession.getTime() === today.getTime() ? today : yesterday;
    currentDate = startDate;
    
    while (true) {
      const dateString = currentDate.toISOString();
      if (activeDates.has(dateString)) {
        currentStreak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    // Find longest streak
    longestStreak = currentStreak;
    
    return {
      currentStreak,
      longestStreak,
      lastActiveDate: lastSession
    };
  }

  /**
   * Generate progress report
   * @param {Array} contentItems - All content items
   * @param {Array} sessions - Learning sessions
   * @returns {Object} - Progress report
   */
  generateProgressReport(contentItems, sessions) {
    if (!contentItems || contentItems.length === 0) {
      return {
        masteryDistribution: {},
        streak: { currentStreak: 0, longestStreak: 0 },
        totalLearningTime: 0,
        averageSessionTime: 0,
        itemsPerCategory: {},
        masteryPerCategory: {},
        recentPerformance: []
      };
    }
    
    // Calculate mastery distribution
    const masteryDistribution = this.getMasteryDistribution(contentItems);
    
    // Calculate streak
    const streak = this.calculateStreak(sessions);
    
    // Calculate learning time
    let totalLearningTime = 0;
    sessions.forEach(session => {
      totalLearningTime += session.duration || 0;
    });
    
    // Calculate average session time
    const averageSessionTime = sessions.length > 0 ? totalLearningTime / sessions.length : 0;
    
    // Calculate items per category
    const itemsPerCategory = {};
    const masteredPerCategory = {};
    
    contentItems.forEach(item => {
      const category = item.category || 'uncategorized';
      
      if (!itemsPerCategory[category]) {
        itemsPerCategory[category] = 0;
        masteredPerCategory[category] = 0;
      }
      
      itemsPerCategory[category]++;
      
      if (item.mastered) {
        masteredPerCategory[category]++;
      }
    });
    
    // Calculate mastery percentage per category
    const masteryPerCategory = {};
    Object.keys(itemsPerCategory).forEach(category => {
      masteryPerCategory[category] = Math.round(
        (masteredPerCategory[category] / itemsPerCategory[category]) * 100
      );
    });
    
    // Get recent performance (last 10 sessions)
    const recentSessions = [...sessions]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
    
    const recentPerformance = recentSessions.map(session => ({
      date: session.timestamp,
      score: session.score || 0,
      itemsStudied: session.itemsStudied || 0,
      duration: session.duration || 0
    }));
    
    return {
      masteryDistribution,
      streak,
      totalLearningTime,
      averageSessionTime,
      itemsPerCategory,
      masteryPerCategory,
      recentPerformance
    };
  }
}

export default {
  SpacedRepetitionSystem,
  DifficultyScalingSystem,
  AdaptiveLearningPath,
  MasteryTrackingSystem
};
