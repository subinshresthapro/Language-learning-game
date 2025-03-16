/**
 * GameManager.js
 * 
 * Central game state management component for NepaliJets
 * Handles game initialization, state updates, and coordination between game components
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProfile } from '../../context/ProfileContext';

// Create Game Context
export const GameContext = createContext();

/**
 * Game Provider component that wraps the game components and provides game state
 */
export const GameProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { currentProfile, updateProfile } = useProfile();
  
  // Game state
  const [gameState, setGameState] = useState({
    currentLevel: null,
    playerProgress: {
      currentScore: 0,
      stars: 0,
      collectibles: [],
      achievements: []
    },
    gameSettings: {
      soundEnabled: true,
      difficultyPreference: 'beginner',
      animationSpeed: 1.0
    }
  });

  // Loading state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize game state from user profile
  useEffect(() => {
    if (currentProfile) {
      try {
        // Load game progress from profile if it exists
        if (currentProfile.gameProgress) {
          setGameState(prevState => ({
            ...prevState,
            playerProgress: {
              ...prevState.playerProgress,
              ...currentProfile.gameProgress
            }
          }));
        }
        
        // Load game settings from profile if they exist
        if (currentProfile.gameSettings) {
          setGameState(prevState => ({
            ...prevState,
            gameSettings: {
              ...prevState.gameSettings,
              ...currentProfile.gameSettings
            }
          }));
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error initializing game state:', err);
        setError('Failed to load game data');
        setLoading(false);
      }
    }
  }, [currentProfile]);

  // Save game progress to profile
  const saveGameProgress = async () => {
    if (currentProfile && currentUser) {
      try {
        await updateProfile({
          ...currentProfile,
          gameProgress: gameState.playerProgress,
          gameSettings: gameState.gameSettings
        });
        return true;
      } catch (err) {
        console.error('Error saving game progress:', err);
        setError('Failed to save game progress');
        return false;
      }
    }
    return false;
  };

  // Update game state
  const updateGameState = (updates) => {
    setGameState(prevState => ({
      ...prevState,
      ...updates
    }));
  };

  // Load a specific level
  const loadLevel = (levelId) => {
    // This would typically fetch level data from a levels database
    // For now, we'll use a placeholder implementation
    const levelData = {
      id: levelId,
      name: `Level ${levelId}`,
      difficulty: parseInt(levelId, 10) * 0.5,
      wordCount: 5 + parseInt(levelId, 10),
      timeLimit: 60,
      minScore: 70,
      wordCategories: ['basic', 'colors', 'numbers'],
      rewards: {
        stars: parseInt(levelId, 10) % 3 + 1,
        collectibles: [],
        unlocks: []
      }
    };

    setGameState(prevState => ({
      ...prevState,
      currentLevel: levelData
    }));

    return levelData;
  };

  // Update player score
  const updateScore = (points) => {
    setGameState(prevState => ({
      ...prevState,
      playerProgress: {
        ...prevState.playerProgress,
        currentScore: prevState.playerProgress.currentScore + points
      }
    }));
  };

  // Award stars to player
  const awardStars = (starCount) => {
    setGameState(prevState => ({
      ...prevState,
      playerProgress: {
        ...prevState.playerProgress,
        stars: prevState.playerProgress.stars + starCount
      }
    }));
  };

  // Add collectible to player inventory
  const addCollectible = (collectible) => {
    setGameState(prevState => ({
      ...prevState,
      playerProgress: {
        ...prevState.playerProgress,
        collectibles: [...prevState.playerProgress.collectibles, collectible]
      }
    }));
  };

  // Update game settings
  const updateSettings = (settings) => {
    setGameState(prevState => ({
      ...prevState,
      gameSettings: {
        ...prevState.gameSettings,
        ...settings
      }
    }));
  };

  // Complete current level
  const completeLevel = (score, earnedStars) => {
    // Update player progress
    setGameState(prevState => {
      // Check if this level was already completed
      const levelAlreadyCompleted = prevState.playerProgress.completedLevels && 
        prevState.playerProgress.completedLevels.includes(prevState.currentLevel.id);
      
      // Only add stars if this is a new completion or if the player earned more stars
      const previousStars = levelAlreadyCompleted ? 
        (prevState.playerProgress.levelStars?.[prevState.currentLevel.id] || 0) : 0;
      
      const newStars = Math.max(previousStars, earnedStars);
      
      return {
        ...prevState,
        playerProgress: {
          ...prevState.playerProgress,
          currentScore: prevState.playerProgress.currentScore + score,
          stars: prevState.playerProgress.stars + (newStars - previousStars),
          completedLevels: [
            ...(prevState.playerProgress.completedLevels || []),
            ...(!levelAlreadyCompleted ? [prevState.currentLevel.id] : [])
          ],
          levelStars: {
            ...(prevState.playerProgress.levelStars || {}),
            [prevState.currentLevel.id]: newStars
          }
        }
      };
    });
    
    // Save progress
    saveGameProgress();
    
    return true;
  };

  // Reset game state (for testing)
  const resetGame = () => {
    setGameState({
      currentLevel: null,
      playerProgress: {
        currentScore: 0,
        stars: 0,
        collectibles: [],
        achievements: []
      },
      gameSettings: {
        soundEnabled: true,
        difficultyPreference: 'beginner',
        animationSpeed: 1.0
      }
    });
  };

  // Context value
  const value = {
    gameState,
    loading,
    error,
    updateGameState,
    loadLevel,
    updateScore,
    awardStars,
    addCollectible,
    updateSettings,
    completeLevel,
    saveGameProgress,
    resetGame
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
};

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

export default GameProvider;
