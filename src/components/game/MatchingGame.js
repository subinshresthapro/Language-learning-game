/**
 * MatchingGame.js
 * 
 * Vocabulary matching game mechanics for NepaliJets
 * Handles word matching, scoring, and game flow
 */

import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useGame } from './GameManager';
import { useLevel } from './LevelManager';
import { useAnimation } from '../animation/AnimationSystem';

// Sample vocabulary data - in production this would come from a database
const SAMPLE_VOCABULARY = [
  { id: '1', nepaliWord: 'नमस्ते', englishTranslation: 'Hello', pronunciation: 'namaste', category: 'greetings', imageAsset: 'hello.png' },
  { id: '2', nepaliWord: 'धन्यवाद', englishTranslation: 'Thank you', pronunciation: 'dhanyavaad', category: 'greetings', imageAsset: 'thankyou.png' },
  { id: '3', nepaliWord: 'रातो', englishTranslation: 'Red', pronunciation: 'raato', category: 'colors', imageAsset: 'red.png' },
  { id: '4', nepaliWord: 'निलो', englishTranslation: 'Blue', pronunciation: 'nilo', category: 'colors', imageAsset: 'blue.png' },
  { id: '5', nepaliWord: 'हरियो', englishTranslation: 'Green', pronunciation: 'hariyo', category: 'colors', imageAsset: 'green.png' },
  { id: '6', nepaliWord: 'पहेंलो', englishTranslation: 'Yellow', pronunciation: 'pahelo', category: 'colors', imageAsset: 'yellow.png' },
  { id: '7', nepaliWord: 'एक', englishTranslation: 'One', pronunciation: 'ek', category: 'numbers', imageAsset: 'one.png' },
  { id: '8', nepaliWord: 'दुई', englishTranslation: 'Two', pronunciation: 'dui', category: 'numbers', imageAsset: 'two.png' },
  { id: '9', nepaliWord: 'तीन', englishTranslation: 'Three', pronunciation: 'teen', category: 'numbers', imageAsset: 'three.png' },
  { id: '10', nepaliWord: 'चार', englishTranslation: 'Four', pronunciation: 'chaar', category: 'numbers', imageAsset: 'four.png' },
  { id: '11', nepaliWord: 'पाँच', englishTranslation: 'Five', pronunciation: 'paanch', category: 'numbers', imageAsset: 'five.png' },
  { id: '12', nepaliWord: 'कुकुर', englishTranslation: 'Dog', pronunciation: 'kukur', category: 'animals', imageAsset: 'dog.png' },
  { id: '13', nepaliWord: 'बिरालो', englishTranslation: 'Cat', pronunciation: 'biralo', category: 'animals', imageAsset: 'cat.png' },
  { id: '14', nepaliWord: 'हात्ती', englishTranslation: 'Elephant', pronunciation: 'haatti', category: 'animals', imageAsset: 'elephant.png' },
  { id: '15', nepaliWord: 'माछा', englishTranslation: 'Fish', pronunciation: 'maachaa', category: 'animals', imageAsset: 'fish.png' },
  { id: '16', nepaliWord: 'आमा', englishTranslation: 'Mother', pronunciation: 'aama', category: 'family', imageAsset: 'mother.png' },
  { id: '17', nepaliWord: 'बुबा', englishTranslation: 'Father', pronunciation: 'buba', category: 'family', imageAsset: 'father.png' },
  { id: '18', nepaliWord: 'दिदी', englishTranslation: 'Sister', pronunciation: 'didi', category: 'family', imageAsset: 'sister.png' },
  { id: '19', nepaliWord: 'दाई', englishTranslation: 'Brother', pronunciation: 'dai', category: 'family', imageAsset: 'brother.png' },
  { id: '20', nepaliWord: 'बच्चा', englishTranslation: 'Child', pronunciation: 'baccha', category: 'family', imageAsset: 'child.png' },
  { id: '21', nepaliWord: 'खाना', englishTranslation: 'Food', pronunciation: 'khaana', category: 'basic', imageAsset: 'food.png' },
  { id: '22', nepaliWord: 'पानी', englishTranslation: 'Water', pronunciation: 'paani', category: 'basic', imageAsset: 'water.png' },
  { id: '23', nepaliWord: 'स्कुल', englishTranslation: 'School', pronunciation: 'school', category: 'basic', imageAsset: 'school.png' },
  { id: '24', nepaliWord: 'किताब', englishTranslation: 'Book', pronunciation: 'kitaab', category: 'basic', imageAsset: 'book.png' },
  { id: '25', nepaliWord: 'खेल्नु', englishTranslation: 'Play', pronunciation: 'khelnu', category: 'basic', imageAsset: 'play.png' },
  { id: '26', nepaliWord: 'सुन्नु', englishTranslation: 'Listen', pronunciation: 'sunnu', category: 'basic', imageAsset: 'listen.png' },
  { id: '27', nepaliWord: 'हेर्नु', englishTranslation: 'Look', pronunciation: 'hernu', category: 'basic', imageAsset: 'look.png' },
  { id: '28', nepaliWord: 'बोल्नु', englishTranslation: 'Speak', pronunciation: 'bolnu', category: 'basic', imageAsset: 'speak.png' },
  { id: '29', nepaliWord: 'पढ्नु', englishTranslation: 'Read', pronunciation: 'padhnu', category: 'basic', imageAsset: 'read.png' },
  { id: '30', nepaliWord: 'लेख्नु', englishTranslation: 'Write', pronunciation: 'lekhnu', category: 'basic', imageAsset: 'write.png' },
];

// Game modes
const GAME_MODES = {
  WORD_TO_PICTURE: 'word_to_picture',
  WORD_TO_WORD: 'word_to_word',
  SOUND_TO_WORD: 'sound_to_word',
};

/**
 * Vocabulary Matching Game component
 */
const MatchingGame = ({ 
  mode = GAME_MODES.WORD_TO_PICTURE,
  difficulty = 1,
  wordCount = 5,
  timeLimit = 60,
  categories = ['basic'],
  onComplete,
  onFail
}) => {
  const { gameState, updateScore } = useGame();
  const { currentLevel, completeLevel } = useLevel();
  const { createCelebrationAnimation, startAnimation } = useAnimation();
  
  // Game state
  const [words, setWords] = useState([]);
  const [shuffledTargets, setShuffledTargets] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [matches, setMatches] = useState([]);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [celebrationId, setCelebrationId] = useState('match_celebration');
  
  // Initialize game
  useEffect(() => {
    initializeGame();
    
    // Create celebration animation
    createCelebrationAnimation(celebrationId, {
      duration: 1500,
    });
    
    // Set up timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endGame(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    // Clean up
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  // Initialize game with words
  const initializeGame = () => {
    // Filter words by categories
    const filteredWords = SAMPLE_VOCABULARY.filter(word => 
      categories.includes(word.category)
    );
    
    // Randomly select words based on wordCount
    const selectedWords = [];
    const wordsCopy = [...filteredWords];
    
    for (let i = 0; i < wordCount && wordsCopy.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * wordsCopy.length);
      selectedWords.push(wordsCopy[randomIndex]);
      wordsCopy.splice(randomIndex, 1);
    }
    
    setWords(selectedWords);
    
    // Create shuffled targets based on game mode
    const targets = selectedWords.map(word => {
      switch (mode) {
        case GAME_MODES.WORD_TO_PICTURE:
          return { id: word.id, content: word.imageAsset, type: 'image' };
        case GAME_MODES.WORD_TO_WORD:
          return { id: word.id, content: word.englishTranslation, type: 'text' };
        case GAME_MODES.SOUND_TO_WORD:
          return { id: word.id, content: word.nepaliWord, type: 'text' };
        default:
          return { id: word.id, content: word.englishTranslation, type: 'text' };
      }
    });
    
    // Shuffle targets
    const shuffled = [...targets].sort(() => Math.random() - 0.5);
    setShuffledTargets(shuffled);
  };
  
  // Handle word selection
  const handleWordSelect = (word) => {
    // If already matched, do nothing
    if (matches.includes(word.id)) return;
    
    // If already selected, deselect
    if (selectedWord && selectedWord.id === word.id) {
      setSelectedWord(null);
      return;
    }
    
    // Select word
    setSelectedWord(word);
    
    // If target already selected, check for match
    if (selectedTarget) {
      checkForMatch(word, selectedTarget);
    }
  };
  
  // Handle target selection
  const handleTargetSelect = (target) => {
    // If already matched, do nothing
    if (matches.includes(target.id)) return;
    
    // If already selected, deselect
    if (selectedTarget && selectedTarget.id === target.id) {
      setSelectedTarget(null);
      return;
    }
    
    // Select target
    setSelectedTarget(target);
    
    // If word already selected, check for match
    if (selectedWord) {
      checkForMatch(selectedWord, target);
    }
  };
  
  // Check for match between selected word and target
  const checkForMatch = (word, target) => {
    const isMatch = word.id === target.id;
    
    if (isMatch) {
      // Add to matches
      setMatches(prev => [...prev, word.id]);
      
      // Update score
      const pointsEarned = Math.ceil(10 * difficulty);
      setScore(prev => prev + pointsEarned);
      
      // Play celebration animation
      startAnimation(celebrationId);
      
      // Clear selections
      setSelectedWord(null);
      setSelectedTarget(null);
      
      // Check if game is complete
      if (matches.length + 1 >= words.length) {
        // Small delay before ending game
        setTimeout(() => {
          endGame(true);
        }, 1000);
      }
    } else {
      // Clear selections after a short delay
      setTimeout(() => {
        setSelectedWord(null);
        setSelectedTarget(null);
      }, 1000);
      
      // Penalty for incorrect match
      const penalty = Math.ceil(5 * difficulty);
      setScore(prev => Math.max(0, prev - penalty));
    }
  };
  
  // End the game
  const endGame = (success) => {
    setGameOver(true);
    setGameWon(success);
    
    if (success) {
      // Calculate stars based on score and time
      const maxPossibleScore = words.length * Math.ceil(10 * difficulty);
      const scoreRatio = score / maxPossibleScore;
      const timeBonus = timeRemaining / timeLimit;
      
      let stars = 1; // At least 1 star for completion
      
      if (scoreRatio > 0.7 && timeBonus > 0.3) {
        stars = 3; // 3 stars for excellent performance
      } else if (scoreRatio > 0.5) {
        stars = 2; // 2 stars for good performance
      }
      
      // Update global score
      updateScore(score);
      
      // Complete level
      if (currentLevel) {
        completeLevel(score, stars);
      }
      
      // Call onComplete callback
      if (onComplete) {
        onComplete({
          score,
          stars,
          timeRemaining,
          matches: matches.length,
          totalWords: words.length
        });
      }
    } else {
      // Call onFail callback
      if (onFail) {
        onFail({
          score,
          timeRemaining,
          matches: matches.length,
          totalWords: words.length
        });
      }
    }
  };
  
  // Render word item
  const renderWordItem = (word) => {
    const isSelected = selectedWord && selectedWord.id === word.id;
    const isMatched = matches.includes(word.id);
    
    return (
      <TouchableOpacity
        key={word.id}
        style={[
          styles.wordItem,
          isSelected && styles.selectedItem,
          isMatched && styles.matchedItem
        ]}
        onPress={() => handleWordSelect(word)}
        disabled={isMatched || gameOver}
      >
        <Text style={styles.nepaliText}>{word.nepaliWord}</Text>
        <Text style={styles.pronunciationText}>{word.pronunciation}</Text>
      </TouchableOpacity>
    );
  };
  
  // Render target item
  const renderTargetItem = (target) => {
    const isSelected = selectedTarget && selectedTarget.id === target.id;
    const isMatched = matches.includes(target.id);
    
    return (
      <TouchableOpacity
        key={target.id}
        style={[
          styles.targetItem,
          isSelected && styles.selectedItem,
          isMatched && styles.matchedItem
        ]}
        onPress={() => handleTargetSelect(target)}
        disabled={isMatched || gameOver}
      >
        {target.type === 'image' ? (
          <Image source={{ uri: target.content }} style={styles.targetImage} />
        ) : (
          <Text style={styles.englishText}>{target.content}</Text>
        )}
      </TouchableOpacity>
    );
  };
  
  // Render game over screen
  const renderGameOver = () => (
    <View style={styles.gameOverContainer}>
      <Text style={styles.gameOverTitle}>
        {gameWon ? 'Great Job!' : 'Time\'s Up!'}
      </Text>
      <Text style={styles.gameOverScore}>
        Score: {score}
      </Text>
      <Text style={styles.gameOverMatches}>
        Matches: {matches.length} / {words.length}
      </Text>
      <TouchableOpacity
        style={styles.playAgainButton}
        onPress={() => {
          setGameOver(false);
          setGameWon(false);
          setMatches([]);
          setScore(0);
          setTimeRemaining(timeLimit);
          setSelectedWord(null);
          setSelectedTarget(null);
          initializeGame();
        }}
      >
        <Text style={styles.playAgainText}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={styles.container}>
      {/* Game header */}
      <View style={styles.header}>
        <Text style={styles.scoreText}>Score: {score}</Text>
        <Text style={styles.timeText}>Time: {timeRemaining}s</Text>
      </View>
      
      {/* Game content */}
      {!gameOver ? (
        <View style={styles.gameContent}>
          {/* Words section */}
          <View style={styles.wordsContainer}>
            {words.map(renderWordItem)}
          </View>
          
          {/* Targets section */}
          <View style={styles.targetsContainer}>
            {shuffledTargets.map(renderTargetItem)}
          </View>
        </View>
      ) : (
        renderGameOver()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  wordsContainer: {
    flex: 1,
    marginBottom: 16,
    justifyContent: 'center',
  },
  targetsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  wordItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  targetItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedItem: {
    borderColor: '#4a90e2',
    backgroundColor: '#e6f2ff',
  },
  matchedItem: {
    borderColor: '#5cb85c',
    backgroundColor: '#eaffea',
    opacity: 0.7,
  },
  nepaliText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  pronunciationText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
  },
  englishText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  targetImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  gameOverScore: {
    fontSize: 20,
    marginBottom: 8,
  },
  gameOverMatches: {
    fontSize: 18,
    marginBottom: 24,
  },
  playAgainButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  playAgainText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export { MatchingGame, GAME_MODES };
export default MatchingGame;
