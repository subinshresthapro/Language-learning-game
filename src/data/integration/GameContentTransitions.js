/**
 * GameContentTransitions.js
 * 
 * Manages transitions between game elements and educational content
 * Implements content loading and management for the Nepali language learning game
 */

import React, { useEffect, useState } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import ContentIntegration from './ContentIntegration';
import pronunciationService from '../../services/pronunciation/pronunciationService';

/**
 * ContentLoader Component
 * Handles loading and management of language content
 */
export const ContentLoader = ({ levelIndex, onContentLoaded }) => {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        // Load content for the specified level
        const levelContent = ContentIntegration.loadLevelContent(levelIndex);
        
        if (!levelContent) {
          throw new Error(`Failed to load content for level ${levelIndex}`);
        }
        
        // Preload audio files
        if (levelContent.vocabularyItems) {
          for (const item of levelContent.vocabularyItems) {
            if (item.audioFile) {
              await pronunciationService.loadAudio(item.audioFile);
            }
          }
        }
        
        setContent(levelContent);
        if (onContentLoaded) {
          onContentLoaded(levelContent);
        }
      } catch (err) {
        console.error('Error loading content:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadContent();
  }, [levelIndex, onContentLoaded]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading Nepali language content...</Text>
        <RocketLoadingAnimation />
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

  return null; // Render nothing as content is passed to parent via callback
};

/**
 * RocketLoadingAnimation Component
 * Animated rocket for loading screens
 */
const RocketLoadingAnimation = () => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true
        })
      ])
    ).start();
  }, [animation]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -20]
  });

  return (
    <Animated.Text
      style={[
        styles.rocketEmoji,
        {
          transform: [{ translateY }]
        }
      ]}
    >
      🚀
    </Animated.Text>
  );
};

/**
 * GameToLearningTransition Component
 * Handles transitions from game elements to educational content
 */
export const GameToLearningTransition = ({ children, isVisible, onTransitionComplete }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        if (onTransitionComplete) {
          onTransitionComplete();
        }
      });
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start();
    }
  }, [isVisible, animation, onTransitionComplete]);

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0]
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <Animated.View
      style={[
        styles.transitionContainer,
        {
          transform: [{ translateY }],
          opacity
        }
      ]}
    >
      {children}
    </Animated.View>
  );
};

/**
 * LearningToGameTransition Component
 * Handles transitions from educational content back to game elements
 */
export const LearningToGameTransition = ({ children, isVisible, onTransitionComplete }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isVisible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        if (onTransitionComplete) {
          onTransitionComplete();
        }
      });
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start();
    }
  }, [isVisible, animation, onTransitionComplete]);

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1]
  });

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1]
  });

  return (
    <Animated.View
      style={[
        styles.transitionContainer,
        {
          transform: [{ scale }],
          opacity
        }
      ]}
    >
      {children}
    </Animated.View>
  );
};

/**
 * ActivityTransition Component
 * Handles transitions between different learning activities
 */
export const ActivityTransition = ({ children, activityIndex, onTransitionComplete }) => {
  const [animation] = useState(new Animated.Value(0));
  const [currentIndex, setCurrentIndex] = useState(activityIndex);
  const [nextChildren, setNextChildren] = useState(null);

  useEffect(() => {
    if (activityIndex !== currentIndex) {
      setNextChildren(children);
      
      // Animate out
      Animated.timing(animation, {
        toValue: -1,
        duration: 300,
        useNativeDriver: true
      }).start(() => {
        setCurrentIndex(activityIndex);
        
        // Animate in
        Animated.timing(animation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true
        }).start(() => {
          if (onTransitionComplete) {
            onTransitionComplete();
          }
        });
      });
    }
  }, [activityIndex, animation, children, currentIndex, onTransitionComplete]);

  const translateX = animation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [-300, 0, 300]
  });

  const opacity = animation.interpolate({
    inputRange: [-1, -0.5, 0, 0.5, 1],
    outputRange: [0, 1, 1, 1, 0]
  });

  return (
    <Animated.View
      style={[
        styles.activityContainer,
        {
          transform: [{ translateX }],
          opacity
        }
      ]}
    >
      {currentIndex === activityIndex ? children : nextChildren}
    </Animated.View>
  );
};

/**
 * RocketProgressIndicator Component
 * Visualizes learning progress as a rocket journey
 */
export const RocketProgressIndicator = ({ progress, totalSteps }) => {
  const progressPercentage = (progress / totalSteps) * 100;
  
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressTrack}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${progressPercentage}%` }
          ]} 
        />
        <Text style={[styles.rocketEmoji, styles.progressRocket]}>🚀</Text>
      </View>
      <Text style={styles.progressText}>
        {progress} / {totalSteps} Complete
      </Text>
    </View>
  );
};

/**
 * ContentManager
 * Manages content loading and transitions for the game
 */
class ContentManager {
  constructor() {
    this.loadedContent = {};
    this.currentLevel = 0;
    this.currentActivity = 0;
  }

  /**
   * Load content for a specific level
   * @param {number} levelIndex - Level index
   * @returns {Promise} - Promise with level content
   */
  async loadLevelContent(levelIndex) {
    // Check if content is already loaded
    if (this.loadedContent[levelIndex]) {
      return this.loadedContent[levelIndex];
    }
    
    try {
      // Load content from ContentIntegration
      const content = ContentIntegration.loadLevelContent(levelIndex);
      
      if (!content) {
        throw new Error(`Failed to load content for level ${levelIndex}`);
      }
      
      // Store loaded content
      this.loadedContent[levelIndex] = content;
      this.currentLevel = levelIndex;
      
      return content;
    } catch (error) {
      console.error('Error loading level content:', error);
      throw error;
    }
  }

  /**
   * Generate activities for current level
   * @param {number} count - Number of activities to generate
   * @returns {Array} - Learning activities
   */
  generateActivities(count = 5) {
    return ContentIntegration.generateLearningActivities(count);
  }

  /**
   * Process activity completion
   * @param {Object} activity - Completed activity
   * @param {Object} results - Activity results
   * @returns {Object} - Updated progress and rewards
   */
  processActivityCompletion(activity, results) {
    return ContentIntegration.processActivityCompletion(activity, results);
  }

  /**
   * Get learning metrics
   * @returns {Object} - Learning metrics
   */
  getLearningMetrics() {
    return ContentIntegration.generateLearningMetrics();
  }

  /**
   * Clear cached content
   * @param {number} levelIndex - Level index to clear (optional, clears all if not specified)
   */
  clearCache(levelIndex) {
    if (levelIndex !== undefined) {
      delete this.loadedContent[levelIndex];
    } else {
      this.loadedContent = {};
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  loadingText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333'
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    margin: 20
  },
  rocketEmoji: {
    fontSize: 40
  },
  transitionContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden'
  },
  activityContainer: {
    flex: 1,
    width: '100%'
  },
  progressContainer: {
    width: '100%',
    padding: 10,
    alignItems: 'center'
  },
  progressTrack: {
    width: '80%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 10
  },
  progressRocket: {
    position: 'absolute',
    top: -10,
    fontSize: 24
  },
  progressText: {
    marginTop: 10,
    fontSize: 14,
    color: '#333'
  }
});

export default new ContentManager();