/**
 * GameScreen.js
 * 
 * Main game screen for NepaliJets
 * Integrates game components into a complete learning cycle
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useGame } from '../../components/game/GameManager';
import { useLevel } from '../../components/game/LevelManager';
import { useReward } from '../../components/rewards/RewardSystem';
import { useLearningProgress } from '../../components/learning/LearningProgressTracker';
import { MatchingGame, GAME_MODES } from '../../components/game/MatchingGame';
import { RewardPopup } from '../../components/rewards/RewardFeedback';
import NEPALI_WORDS from '../../constants/NepaliWordsData';

/**
 * Game Screen Component
 * Main screen for the vocabulary learning game
 */
const GameScreen = ({ route }) => {
  const navigation = useNavigation();
  const { gameState, updateScore } = useGame();
  const { loadLevel, completeLevel, currentLevel } = useLevel();
  const { awardStars, awardCollectible, checkAchievements } = useReward();
  const { trackWordLearning, recordActivity } = useLearningProgress();
  
  // Get level ID from route params or default to level 1
  const levelId = route?.params?.levelId || '1';
  
  // Game state
  const [gameMode, setGameMode] = useState(GAME_MODES.WORD_TO_PICTURE);
  const [levelWords, setLevelWords] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [earnedRewards, setEarnedRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Initialize level
  useEffect(() => {
    // Load level data
    const level = loadLevel(levelId);
    
    if (level) {
      // Filter words based on level categories and difficulty
      const filteredWords = NEPALI_WORDS.filter(word => 
        level.wordCategories.includes(word.category) &&
        word.difficulty <= level.difficulty
      );
      
      // Limit to word count specified in level
      const selectedWords = filteredWords.slice(0, level.wordCount);
      
      setLevelWords(selectedWords);
      setLoading(false);
      
      // Record activity
      recordActivity({
        activityId: `level_${levelId}_start`,
        activityType: 'level_start',
        duration: 0,
        wordsStudied: selectedWords.map(w => w.id)
      });
    }
  }, [levelId]);
  
  // Handle game completion
  const handleGameComplete = (result) => {
    setGameCompleted(true);
    
    // Calculate stars based on score
    const { score, stars, matches, totalWords } = result;
    
    // Track words learned
    levelWords.forEach((word, index) => {
      const isLearned = index < matches;
      trackWordLearning(word.id, isLearned);
    });
    
    // Record activity
    recordActivity({
      activityId: `level_${levelId}_complete`,
      activityType: 'level_complete',
      duration: currentLevel.timeLimit - result.timeRemaining,
      wordsStudied: levelWords.map(w => w.id),
      performance: {
        correctAnswers: matches,
        totalQuestions: totalWords,
        averageResponseTime: (currentLevel.timeLimit - result.timeRemaining) / matches
      }
    });
    
    // Complete level and get rewards
    const levelCompleted = completeLevel(score, stars);
    
    // Prepare rewards
    const rewards = [];
    
    // Add stars reward
    rewards.push({ type: 'stars', count: stars });
    
    // Award stars
    awardStars(stars);
    
    // Check if perfect score
    const isPerfect = matches === totalWords;
    
    // Check for achievements
    const achievements = checkAchievements({ 
      wordsLearned: matches,
      perfectScore: isPerfect,
      timeBonus: result.timeRemaining / currentLevel.timeLimit
    });
    
    // Add badge rewards
    achievements.forEach(badge => {
      rewards.push({ type: 'badge', item: badge });
    });
    
    // Add collectible rewards if level completed
    if (levelCompleted && currentLevel.rewards.collectibles) {
      currentLevel.rewards.collectibles.forEach(collectibleId => {
        awardCollectible(collectibleId);
        rewards.push({ 
          type: 'collectible', 
          item: { id: collectibleId, name: 'New Rocket Part', description: 'You earned a new rocket part!' }
        });
      });
    }
    
    // Add celebration for perfect score
    if (isPerfect) {
      rewards.push({ type: 'celebration' });
    }
    
    // Show rewards
    setEarnedRewards(rewards);
    setShowRewards(true);
  };
  
  // Handle game failure
  const handleGameFail = (result) => {
    // Record activity
    recordActivity({
      activityId: `level_${levelId}_fail`,
      activityType: 'level_fail',
      duration: currentLevel.timeLimit - result.timeRemaining,
      wordsStudied: levelWords.map(w => w.id),
      performance: {
        correctAnswers: result.matches,
        totalQuestions: result.totalWords,
        averageResponseTime: (currentLevel.timeLimit - result.timeRemaining) / Math.max(1, result.matches)
      }
    });
    
    // Track words that were learned
    levelWords.slice(0, result.matches).forEach(word => {
      trackWordLearning(word.id, true);
    });
    
    // Show failure message
    setGameCompleted(true);
  };
  
  // Handle rewards completion
  const handleRewardsComplete = () => {
    setShowRewards(false);
    // Navigate back to level select or show level complete screen
    // navigation.navigate('LevelMap');
  };
  
  // Render loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading level...</Text>
      </View>
    );
  }
  
  // Render game intro
  if (!gameStarted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.introContainer}>
          <Text style={styles.levelTitle}>{currentLevel?.name || `Level ${levelId}`}</Text>
          <Text style={styles.levelDescription}>{currentLevel?.description || 'Learn new Nepali words'}</Text>
          
          <Image 
            source={require('../../assets/images/rocket.png')} 
            style={styles.introImage} 
            resizeMode="contain"
          />
          
          <Text style={styles.instructionText}>
            Match the Nepali words with their English meanings or pictures.
          </Text>
          
          <Text style={styles.wordCountText}>
            Words to learn: {levelWords.length}
          </Text>
          
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => setGameStarted(true)}
          >
            <Text style={styles.startButtonText}>Start Learning</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Game content */}
      {!gameCompleted ? (
        <MatchingGame
          mode={gameMode}
          difficulty={currentLevel?.difficulty || 1}
          wordCount={levelWords.length}
          timeLimit={currentLevel?.timeLimit || 60}
          categories={currentLevel?.wordCategories || ['basic']}
          onComplete={handleGameComplete}
          onFail={handleGameFail}
        />
      ) : (
        <View style={styles.completedContainer}>
          <Text style={styles.completedTitle}>Level Complete!</Text>
          <Text style={styles.completedText}>
            Great job learning new Nepali words!
          </Text>
          
          <TouchableOpacity 
            style={styles.nextButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.nextButtonText}>Back to Map</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Rewards popup */}
      <RewardPopup
        visible={showRewards}
        rewards={earnedRewards}
        onClose={handleRewardsComplete}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  introContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  levelDescription: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  introImage: {
    width: 200,
    height: 200,
    marginBottom: 24,
  },
  instructionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  wordCountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 32,
  },
  startButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completedContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
  },
  completedText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 32,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GameScreen;
