/**
 * LevelMapScreen.js
 * 
 * Level selection screen for NepaliJets
 * Displays rocket/airplane themed progression map with levels
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useLevel } from '../../components/game/LevelManager';
import { useReward } from '../../components/rewards/RewardSystem';
import { useLearningProgress } from '../../components/learning/LearningProgressTracker';
import { useAnimation } from '../../components/animation/AnimationSystem';

/**
 * Level Map Screen Component
 * Displays a rocket/airplane themed progression map
 */
const LevelMapScreen = () => {
  const navigation = useNavigation();
  const { getAvailableLevels, unlockedLevels } = useLevel();
  const { earnedStars, collectibles } = useReward();
  const { getLearningStatistics } = useLearningProgress();
  const { createFlyingAnimation, startAnimation } = useAnimation();
  
  // State
  const [levels, setLevels] = useState([]);
  const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0 });
  const [animationId] = useState('rocket_flight');
  
  // Initialize level data
  useEffect(() => {
    const availableLevels = getAvailableLevels();
    setLevels(availableLevels);
    
    // Create rocket animation
    createFlyingAnimation(animationId, {
      startX: 50,
      startY: 400,
      endX: 300,
      endY: 100,
      duration: 3000,
      easing: 'ease-out',
      autoStart: true
    });
  }, [unlockedLevels]);
  
  // Handle level selection
  const handleLevelSelect = (level) => {
    if (level.isUnlocked) {
      // Animate rocket to level position
      const startX = rocketPosition.x;
      const startY = rocketPosition.y;
      const endX = 50 + (level.id - 1) * 60;
      const endY = 400 - (level.id - 1) * 50;
      
      createFlyingAnimation('level_select_animation', {
        startX,
        startY,
        endX,
        endY,
        duration: 1000,
        easing: 'ease-out',
        autoStart: true
      });
      
      // Navigate to game screen after animation
      setTimeout(() => {
        navigation.navigate('Game', { levelId: level.id });
      }, 1200);
    }
  };
  
  // Render level marker
  const renderLevelMarker = (level, index) => {
    const isUnlocked = level.isUnlocked;
    const isCompleted = false; // This would come from progress data
    
    return (
      <TouchableOpacity
        key={level.id}
        style={[
          styles.levelMarker,
          isUnlocked ? styles.unlockedLevel : styles.lockedLevel,
          isCompleted ? styles.completedLevel : null,
          { left: 50 + index * 60, top: 400 - index * 50 }
        ]}
        onPress={() => handleLevelSelect(level)}
        disabled={!isUnlocked}
      >
        <Text style={styles.levelNumber}>{level.id}</Text>
        {!isUnlocked && (
          <Image
            source={require('../../assets/images/lock.png')}
            style={styles.lockIcon}
          />
        )}
      </TouchableOpacity>
    );
  };
  
  // Get learning statistics
  const stats = getLearningStatistics();
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Image
              source={require('../../assets/images/star.png')}
              style={styles.statIcon}
            />
            <Text style={styles.statText}>{earnedStars}</Text>
          </View>
          <View style={styles.statItem}>
            <Image
              source={require('../../assets/images/word.png')}
              style={styles.statIcon}
            />
            <Text style={styles.statText}>{stats.totalWordsLearned}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.rocketButton}
          onPress={() => navigation.navigate('RocketCustomization')}
        >
          <Image
            source={require('../../assets/images/rocket_small.png')}
            style={styles.rocketIcon}
          />
          <Text style={styles.rocketButtonText}>My Rocket</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        style={styles.mapContainer}
        contentContainerStyle={styles.mapContent}
      >
        <Image
          source={require('../../assets/images/map_background.png')}
          style={styles.mapBackground}
          resizeMode="cover"
        />
        
        {/* Path connecting levels */}
        <View style={styles.pathContainer}>
          {levels.map((level, index) => {
            if (index === levels.length - 1) return null;
            
            const startX = 50 + index * 60 + 15;
            const startY = 400 - index * 50 + 15;
            const endX = 50 + (index + 1) * 60 + 15;
            const endY = 400 - (index + 1) * 50 + 15;
            
            const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;
            const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
            
            return (
              <View
                key={`path_${index}`}
                style={[
                  styles.path,
                  {
                    width: distance,
                    left: startX,
                    top: startY,
                    transform: [{ rotate: `${angle}deg` }],
                    backgroundColor: level.isUnlocked && levels[index + 1].isUnlocked ? '#4CAF50' : '#ccc'
                  }
                ]}
              />
            );
          })}
        </View>
        
        {/* Level markers */}
        {levels.map((level, index) => renderLevelMarker(level, index))}
        
        {/* Animated rocket */}
        <Image
          source={require('../../assets/images/rocket.png')}
          style={[
            styles.rocketImage,
            {
              transform: [
                { translateX: rocketPosition.x },
                { translateY: rocketPosition.y },
                { rotate: '-45deg' }
              ]
            }
          ]}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statsContainer: {
    flexDirection: 'row',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statIcon: {
    width: 24,
    height: 24,
    marginRight: 4,
  },
  statText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rocketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a90e2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  rocketIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  rocketButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
  },
  mapContent: {
    position: 'relative',
    height: 800,
  },
  mapBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  pathContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  path: {
    height: 4,
    position: 'absolute',
    transformOrigin: 'left center',
  },
  levelMarker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  unlockedLevel: {
    backgroundColor: '#4a90e2',
    borderColor: '#2196F3',
  },
  lockedLevel: {
    backgroundColor: '#9E9E9E',
    borderColor: '#757575',
  },
  completedLevel: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
  },
  levelNumber: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  lockIcon: {
    position: 'absolute',
    width: 16,
    height: 16,
    top: -5,
    right: -5,
  },
  rocketImage: {
    position: 'absolute',
    width: 60,
    height: 60,
    left: 0,
    top: 0,
  },
});

export default LevelMapScreen;
