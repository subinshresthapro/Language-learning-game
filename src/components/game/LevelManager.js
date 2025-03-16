/**
 * LevelManager.js
 * 
 * Manages level progression and difficulty scaling for NepaliJets
 * Handles level loading, progression tracking, and difficulty adjustments
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useGame } from './GameManager';
import { useProfile } from '../../context/ProfileContext';

// Create Level Context
export const LevelContext = createContext();

// Sample level data - in production this would come from a database
const LEVELS = [
  {
    id: '1',
    name: 'Takeoff: First Words',
    description: 'Learn your first Nepali words',
    difficulty: 1,
    minScore: 60,
    timeLimit: 120,
    wordCount: 5,
    wordCategories: ['greetings', 'basic'],
    rewards: {
      stars: 3,
      collectibles: ['rocket_nose_basic'],
      unlocks: ['2']
    },
    theme: 'airport',
    backgroundImage: 'airport_background.png'
  },
  {
    id: '2',
    name: 'Cloud Climb: Colors',
    description: 'Learn colors in Nepali',
    difficulty: 1.2,
    minScore: 65,
    timeLimit: 100,
    wordCount: 6,
    wordCategories: ['colors'],
    rewards: {
      stars: 3,
      collectibles: ['rocket_wings_basic'],
      unlocks: ['3']
    },
    theme: 'clouds',
    backgroundImage: 'clouds_background.png'
  },
  {
    id: '3',
    name: 'Sky High: Numbers',
    description: 'Count in Nepali',
    difficulty: 1.5,
    minScore: 70,
    timeLimit: 90,
    wordCount: 8,
    wordCategories: ['numbers'],
    rewards: {
      stars: 3,
      collectibles: ['rocket_engine_basic'],
      unlocks: ['4']
    },
    theme: 'sky',
    backgroundImage: 'sky_background.png'
  },
  {
    id: '4',
    name: 'Space Bound: Animals',
    description: 'Learn animal names in Nepali',
    difficulty: 1.8,
    minScore: 75,
    timeLimit: 80,
    wordCount: 10,
    wordCategories: ['animals'],
    rewards: {
      stars: 3,
      collectibles: ['rocket_booster_basic'],
      unlocks: ['5']
    },
    theme: 'space',
    backgroundImage: 'space_background.png'
  },
  {
    id: '5',
    name: 'Orbit: Family Words',
    description: 'Learn family-related words in Nepali',
    difficulty: 2,
    minScore: 80,
    timeLimit: 70,
    wordCount: 12,
    wordCategories: ['family'],
    rewards: {
      stars: 3,
      collectibles: ['rocket_cabin_deluxe'],
      unlocks: ['6']
    },
    theme: 'orbit',
    backgroundImage: 'orbit_background.png'
  },
  {
    id: '6',
    name: 'Moon Landing: Review',
    description: 'Review all words learned so far',
    difficulty: 2.5,
    minScore: 85,
    timeLimit: 120,
    wordCount: 15,
    wordCategories: ['greetings', 'basic', 'colors', 'numbers', 'animals', 'family'],
    rewards: {
      stars: 3,
      collectibles: ['moon_badge'],
      unlocks: []
    },
    theme: 'moon',
    backgroundImage: 'moon_background.png'
  }
];

/**
 * Level Provider component that manages level progression
 */
export const LevelProvider = ({ children }) => {
  const { gameState, updateGameState, saveGameProgress } = useGame();
  const { currentProfile } = useProfile();
  
  // Level state
  const [levels, setLevels] = useState(LEVELS);
  const [currentLevel, setCurrentLevel] = useState(null);
  const [unlockedLevels, setUnlockedLevels] = useState(['1']); // Start with first level unlocked
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize level state from user profile
  useEffect(() => {
    if (currentProfile && gameState) {
      try {
        // Load unlocked levels from profile if they exist
        if (currentProfile.unlockedLevels && currentProfile.unlockedLevels.length > 0) {
          setUnlockedLevels(currentProfile.unlockedLevels);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error initializing level state:', err);
        setError('Failed to load level data');
        setLoading(false);
      }
    }
  }, [currentProfile, gameState]);

  // Load a specific level
  const loadLevel = (levelId) => {
    try {
      // Find the level in our levels array
      const levelData = levels.find(level => level.id === levelId);
      
      if (!levelData) {
        throw new Error(`Level ${levelId} not found`);
      }
      
      // Check if level is unlocked
      if (!unlockedLevels.includes(levelId)) {
        throw new Error(`Level ${levelId} is locked`);
      }
      
      // Set current level in local state
      setCurrentLevel(levelData);
      
      // Update game state with current level
      updateGameState({
        currentLevel: levelData
      });
      
      return levelData;
    } catch (err) {
      console.error('Error loading level:', err);
      setError(err.message);
      return null;
    }
  };

  // Complete current level and unlock next levels
  const completeLevel = (score, earnedStars) => {
    if (!currentLevel) return false;
    
    try {
      // Calculate percentage score
      const percentageScore = (score / currentLevel.wordCount) * 100;
      
      // Check if score meets minimum requirement
      if (percentageScore < currentLevel.minScore) {
        return false;
      }
      
      // Get new levels to unlock
      const newUnlocks = currentLevel.rewards.unlocks.filter(
        levelId => !unlockedLevels.includes(levelId)
      );
      
      // Update unlocked levels
      if (newUnlocks.length > 0) {
        const updatedUnlockedLevels = [...unlockedLevels, ...newUnlocks];
        setUnlockedLevels(updatedUnlockedLevels);
        
        // Save to profile
        if (currentProfile) {
          currentProfile.unlockedLevels = updatedUnlockedLevels;
          saveGameProgress();
        }
      }
      
      // Update game state with completion data
      const completionData = {
        levelId: currentLevel.id,
        score: percentageScore,
        stars: earnedStars,
        completedAt: new Date().toISOString(),
        collectiblesEarned: currentLevel.rewards.collectibles
      };
      
      // Add completion data to game state
      updateGameState(prevState => ({
        playerProgress: {
          ...prevState.playerProgress,
          completedLevels: [
            ...(prevState.playerProgress.completedLevels || []),
            completionData
          ]
        }
      }));
      
      return true;
    } catch (err) {
      console.error('Error completing level:', err);
      setError(err.message);
      return false;
    }
  };

  // Get available levels (both locked and unlocked)
  const getAvailableLevels = () => {
    return levels.map(level => ({
      ...level,
      isUnlocked: unlockedLevels.includes(level.id)
    }));
  };

  // Get only unlocked levels
  const getUnlockedLevels = () => {
    return levels.filter(level => unlockedLevels.includes(level.id));
  };

  // Adjust difficulty based on player performance
  const adjustDifficulty = (playerPerformance) => {
    // This would typically adjust game parameters based on player performance
    // For now, we'll use a placeholder implementation
    const difficultyFactor = playerPerformance > 90 ? 1.2 : 
                            playerPerformance > 70 ? 1.0 : 0.8;
    
    return difficultyFactor;
  };

  // Context value
  const value = {
    levels,
    currentLevel,
    unlockedLevels,
    loading,
    error,
    loadLevel,
    completeLevel,
    getAvailableLevels,
    getUnlockedLevels,
    adjustDifficulty
  };

  return (
    <LevelContext.Provider value={value}>
      {children}
    </LevelContext.Provider>
  );
};

// Custom hook to use the level context
export const useLevel = () => {
  const context = useContext(LevelContext);
  if (context === undefined) {
    throw new Error('useLevel must be used within a LevelProvider');
  }
  return context;
};

export default LevelProvider;
