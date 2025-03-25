/**
 * WebGameEmbed.js
 * 
 * Provides functionality for embedding the Nepali language learning game in websites
 * Handles initialization, communication, and responsive layout for web embedding
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Mock imports for web compatibility
const MockGameProvider = ({ children }) => <View>{children}</View>;
const MockLevelProvider = ({ children }) => <View>{children}</View>;
const MockAnimationProvider = ({ children }) => <View>{children}</View>;
const MockContentLoader = ({ onContentLoaded }) => {
  useEffect(() => {
    if (onContentLoaded) {
      setTimeout(() => onContentLoaded({ loaded: true }), 1000);
    }
  }, [onContentLoaded]);
  return null;
};
const MockMatchingGame = ({ onComplete }) => {
  useEffect(() => {
    // Simulate game completion after 5 seconds for testing
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete({ score: 85, stars: 3, completed: true });
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [onComplete]);
  
  return (
    <View style={styles.mockGame}>
      <Text style={styles.mockGameText}>Nepali Language Learning Game</Text>
      <Text style={styles.mockGameSubtext}>Game simulation for web embedding test</Text>
    </View>
  );
};

/**
 * WebGameEmbed Component
 * Main component for embedding the game in websites
 */
const WebGameEmbed = ({ 
  containerId = 'nepali-game-container',
  initialLevel = 0,
  gameMode = 'word_to_picture',
  difficulty = 1,
  wordCount = 5,
  timeLimit = 60,
  categories = ['basic'],
  onGameComplete,
  onError
}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [gameConfig, setGameConfig] = useState({
    level: initialLevel,
    mode: gameMode,
    difficulty,
    wordCount,
    timeLimit,
    categories
  });
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: '100%', height: '100%' });

  // Initialize the game when component mounts
  useEffect(() => {
    initializeGame();
    
    // Set up resize observer for responsive layout
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const container = document.getElementById(containerId);
        if (container) {
          const { width, height } = container.getBoundingClientRect();
          setContainerSize({ width, height });
        }
      };
      
      window.addEventListener('resize', handleResize);
      
      // Initial size calculation
      const container = document.getElementById(containerId);
      if (container) {
        containerRef.current = container;
        handleResize();
      } else {
        setError(`Container with ID "${containerId}" not found`);
        if (onError) onError(`Container with ID "${containerId}" not found`);
      }
      
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [containerId]);

  // Initialize the game
  const initializeGame = async () => {
    try {
      // Simulate initialization
      setTimeout(() => {
        setIsInitialized(true);
        console.log('Game initialized successfully');
      }, 1000);
    } catch (err) {
      console.error('Error initializing game:', err);
      setError(`Failed to initialize game: ${err.message}`);
      if (onError) onError(err.message);
    }
  };

  // Handle content loading completion
  const handleContentLoaded = (content) => {
    setContentLoaded(true);
    console.log('Content loaded successfully', content);
  };

  // Handle game completion
  const handleGameComplete = (results) => {
    console.log('Game completed with results:', results);
    if (onGameComplete) {
      onGameComplete(results);
    }
  };

  // Handle game error
  const handleGameError = (err) => {
    setError(err.message);
    if (onError) onError(err.message);
  };

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!isInitialized) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Initializing Nepali language game...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: containerSize.width, height: containerSize.height }]}>
      <MockGameProvider>
        <MockLevelProvider>
          <MockAnimationProvider>
            <MockContentLoader 
              levelIndex={gameConfig.level} 
              onContentLoaded={handleContentLoaded}
            />
            
            {contentLoaded && (
              <MockMatchingGame
                mode={gameConfig.mode}
                difficulty={gameConfig.difficulty}
                wordCount={gameConfig.wordCount}
                timeLimit={gameConfig.timeLimit}
                categories={gameConfig.categories}
                onComplete={handleGameComplete}
                onFail={handleGameError}
              />
            )}
          </MockAnimationProvider>
        </MockLevelProvider>
      </MockGameProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    borderRadius: 8
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center'
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center'
  },
  mockGame: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 20
  },
  mockGameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center'
  },
  mockGameSubtext: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  }
});

export default WebGameEmbed;
