/**
 * LearningProgressTracker.js
 * 
 * Learning progress tracking system for NepaliJets
 * Handles tracking words/phrases learned, pronunciation accuracy, time spent, and achievements
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useGame } from '../game/GameManager';
import { useProfile } from '../../context/ProfileContext';
import { useReward } from '../rewards/RewardSystem';

// Create Learning Progress Context
export const LearningProgressContext = createContext();

/**
 * Learning Progress Provider component that manages learning metrics
 */
export const LearningProgressProvider = ({ children }) => {
  const { gameState, updateGameState, saveGameProgress } = useGame();
  const { currentProfile } = useProfile();
  const { checkAchievements } = useReward();
  
  // Learning progress state
  const [learningStats, setLearningStats] = useState({
    totalWordsLearned: 0,
    totalPhrasesPracticed: 0,
    averagePronunciationScore: 0,
    totalLearningTime: 0, // in minutes
    learningStreak: 0,
    lastSessionDate: null
  });
  
  const [vocabularyProgress, setVocabularyProgress] = useState([]);
  const [sessionHistory, setSessionHistory] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize learning progress state from user profile
  useEffect(() => {
    if (currentProfile && gameState) {
      try {
        // Load learning stats from profile if they exist
        if (gameState.playerProgress && gameState.playerProgress.learningStats) {
          setLearningStats(gameState.playerProgress.learningStats);
        }
        
        // Load vocabulary progress from profile if it exists
        if (gameState.playerProgress && gameState.playerProgress.vocabularyProgress) {
          setVocabularyProgress(gameState.playerProgress.vocabularyProgress);
        }
        
        // Load session history from profile if it exists
        if (gameState.playerProgress && gameState.playerProgress.sessionHistory) {
          setSessionHistory(gameState.playerProgress.sessionHistory);
        }
        
        // Start a new session
        startNewSession();
        
        setLoading(false);
      } catch (err) {
        console.error('Error initializing learning progress state:', err);
        setError('Failed to load learning progress data');
        setLoading(false);
      }
    }
  }, [currentProfile, gameState]);

  // Start a new learning session
  const startNewSession = () => {
    const now = new Date();
    
    // Check if we need to update streak
    let updatedStreak = learningStats.learningStreak || 0;
    const lastDate = learningStats.lastSessionDate ? new Date(learningStats.lastSessionDate) : null;
    
    if (lastDate) {
      // Check if last session was yesterday
      const yesterday = new Date(now);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (lastDate.toDateString() === yesterday.toDateString()) {
        // Increment streak
        updatedStreak += 1;
      } else if (lastDate.toDateString() !== now.toDateString()) {
        // Reset streak if not today and not yesterday
        updatedStreak = 1;
      }
    } else {
      // First session ever
      updatedStreak = 1;
    }
    
    // Create new session
    const newSession = {
      sessionId: `session_${now.getTime()}`,
      startTime: now.toISOString(),
      activities: [],
      metrics: {
        focusScore: 0,
        progressMade: 0,
        reviewCompleted: 0
      }
    };
    
    setCurrentSession(newSession);
    
    // Update learning stats with new streak and last session date
    const updatedStats = {
      ...learningStats,
      learningStreak: updatedStreak,
      lastSessionDate: now.toISOString()
    };
    
    setLearningStats(updatedStats);
    
    // Update game state
    updateGameState(prevState => ({
      playerProgress: {
        ...prevState.playerProgress,
        learningStats: updatedStats
      }
    }));
    
    // Save progress
    saveGameProgress();
    
    // Check for streak achievements
    checkAchievements({ streak: updatedStreak });
    
    return newSession;
  };

  // End current learning session
  const endCurrentSession = () => {
    if (!currentSession) return null;
    
    const now = new Date();
    
    // Calculate session duration
    const startTime = new Date(currentSession.startTime);
    const durationMinutes = (now - startTime) / (1000 * 60);
    
    // Update session with end time and duration
    const completedSession = {
      ...currentSession,
      endTime: now.toISOString(),
      duration: durationMinutes
    };
    
    // Add to session history
    const updatedSessionHistory = [...sessionHistory, completedSession];
    setSessionHistory(updatedSessionHistory);
    
    // Update total learning time
    const updatedStats = {
      ...learningStats,
      totalLearningTime: (learningStats.totalLearningTime || 0) + durationMinutes
    };
    
    setLearningStats(updatedStats);
    
    // Update game state
    updateGameState(prevState => ({
      playerProgress: {
        ...prevState.playerProgress,
        learningStats: updatedStats,
        sessionHistory: updatedSessionHistory
      }
    }));
    
    // Save progress
    saveGameProgress();
    
    // Reset current session
    setCurrentSession(null);
    
    return completedSession;
  };

  // Record activity in current session
  const recordActivity = (activity) => {
    if (!currentSession) {
      // Start a new session if none exists
      const newSession = startNewSession();
      setCurrentSession(prev => ({
        ...newSession,
        activities: [...(newSession.activities || []), activity]
      }));
    } else {
      // Add to existing session
      setCurrentSession(prev => ({
        ...prev,
        activities: [...(prev.activities || []), activity]
      }));
    }
  };

  // Track word exposure and learning
  const trackWordLearning = (wordId, success, pronunciationScore = null) => {
    try {
      // Find word in vocabulary progress
      const existingWordIndex = vocabularyProgress.findIndex(w => w.wordId === wordId);
      
      if (existingWordIndex >= 0) {
        // Update existing word
        const existingWord = vocabularyProgress[existingWordIndex];
        
        const updatedWord = {
          ...existingWord,
          exposureCount: existingWord.exposureCount + 1,
          successfulRecalls: success ? existingWord.successfulRecalls + 1 : existingWord.successfulRecalls,
          lastPracticed: new Date().toISOString(),
          pronunciationScore: pronunciationScore !== null ? 
            (existingWord.pronunciationScore + pronunciationScore) / 2 : // Average if new score provided
            existingWord.pronunciationScore
        };
        
        // Calculate mastery level (0-3)
        let masteryLevel = existingWord.masteryLevel || 0;
        
        if (success) {
          if (updatedWord.exposureCount >= 5 && updatedWord.successfulRecalls >= 3 && 
              (pronunciationScore === null || pronunciationScore >= 70)) {
            masteryLevel = 3; // Mastered
          } else if (updatedWord.exposureCount >= 3 && updatedWord.successfulRecalls >= 1) {
            masteryLevel = 2; // Practicing
          } else if (updatedWord.exposureCount >= 1) {
            masteryLevel = 1; // Introduced
          }
        }
        
        updatedWord.masteryLevel = masteryLevel;
        
        // Update vocabulary progress
        const updatedVocabularyProgress = [...vocabularyProgress];
        updatedVocabularyProgress[existingWordIndex] = updatedWord;
        
        setVocabularyProgress(updatedVocabularyProgress);
        
        // Update game state
        updateGameState(prevState => ({
          playerProgress: {
            ...prevState.playerProgress,
            vocabularyProgress: updatedVocabularyProgress
          }
        }));
        
        return updatedWord;
      } else {
        // Add new word
        const newWord = {
          wordId,
          exposureCount: 1,
          successfulRecalls: success ? 1 : 0,
          lastPracticed: new Date().toISOString(),
          masteryLevel: success ? 1 : 0, // Introduced if successful, Not Started if not
          pronunciationScore: pronunciationScore !== null ? pronunciationScore : 0
        };
        
        // Update vocabulary progress
        const updatedVocabularyProgress = [...vocabularyProgress, newWord];
        
        setVocabularyProgress(updatedVocabularyProgress);
        
        // Update total words learned count
        const updatedStats = {
          ...learningStats,
          totalWordsLearned: learningStats.totalWordsLearned + 1
        };
        
        setLearningStats(updatedStats);
        
        // Update game state
        updateGameState(prevState => ({
          playerProgress: {
            ...prevState.playerProgress,
            learningStats: updatedStats,
            vocabularyProgress: updatedVocabularyProgress
          }
        }));
        
        // Check for word learning achievements
        checkAchievements({ wordsLearned: updatedStats.totalWordsLearned });
        
        return newWord;
      }
    } catch (err) {
      console.error('Error tracking word learning:', err);
      setError(err.message);
      return null;
    }
  };

  // Track pronunciation practice
  const trackPronunciation = (wordId, score) => {
    try {
      // Ensure score is between 0-100
      const normalizedScore = Math.max(0, Math.min(100, score));
      
      // Track word with pronunciation score
      const updatedWord = trackWordLearning(wordId, normalizedScore >= 70, normalizedScore);
      
      // Update average pronunciation score
      const allScores = vocabularyProgress
        .filter(w => w.pronunciationScore > 0)
        .map(w => w.pronunciationScore);
      
      if (allScores.length > 0) {
        const averageScore = allScores.reduce((sum, score) => sum + score, 0) / allScores.length;
        
        const updatedStats = {
          ...learningStats,
          averagePronunciationScore: averageScore
        };
        
        setLearningStats(updatedStats);
        
        // Update game state
        updateGameState(prevState => ({
          playerProgress: {
            ...prevState.playerProgress,
            learningStats: updatedStats
          }
        }));
      }
      
      return updatedWord;
    } catch (err) {
      console.error('Error tracking pronunciation:', err);
      setError(err.message);
      return null;
    }
  };

  // Get words by mastery level
  const getWordsByMasteryLevel = (level) => {
    return vocabularyProgress.filter(word => word.masteryLevel === level);
  };

  // Get all mastered words
  const getMasteredWords = () => {
    return vocabularyProgress.filter(word => word.masteryLevel === 3);
  };

  // Get words that need review (practiced but not mastered, not reviewed recently)
  const getWordsNeedingReview = () => {
    const now = new Date();
    const threeDaysAgo = new Date(now);
    threeDaysAgo.setDate(now.getDate() - 3);
    
    return vocabularyProgress.filter(word => {
      // Words that are being practiced (level 1-2) but haven't been reviewed recently
      return (word.masteryLevel === 1 || word.masteryLevel === 2) && 
             new Date(word.lastPracticed) < threeDaysAgo;
    });
  };

  // Get learning statistics
  const getLearningStatistics = () => {
    return {
      ...learningStats,
      masteredWordsCount: getMasteredWords().length,
      practicingWordsCount: getWordsByMasteryLevel(2).length,
      introducedWordsCount: getWordsByMasteryLevel(1).length,
      notStartedWordsCount: getWordsByMasteryLevel(0).length,
      wordsNeedingReviewCount: getWordsNeedingReview().length
    };
  };

  // Get session statistics
  const getSessionStatistics = () => {
    // Calculate average session duration
    const sessionDurations = sessionHistory
      .filter(session => session.duration)
      .map(session => session.duration);
    
    const averageSessionDuration = sessionDurations.length > 0 ?
      sessionDurations.reduce((sum, duration) => sum + duration, 0) / sessionDurations.length :
      0;
    
    // Calculate sessions per day
    const sessionDates = sessionHistory.map(session => 
      new Date(session.startTime).toDateString()
    );
    
    const uniqueDates = [...new Set(sessionDates)];
    const sessionsPerDay = uniqueDates.length > 0 ?
      sessionHistory.length / uniqueDates.length :
      0;
    
    return {
      totalSessions: sessionHistory.length,
      averageSessionDuration,
      sessionsPerDay,
      currentStreak: learningStats.learningStreak || 0,
      totalLearningTime: learningStats.totalLearningTime || 0
    };
  };

  // Context value
  const value = {
    learningStats,
    vocabularyProgress,
    sessionHistory,
    currentSession,
    loading,
    error,
    startNewSession,
    endCurrentSession,
    recordActivity,
    trackWordLearning,
    trackPronunciation,
    getWordsByMasteryLevel,
    getMasteredWords,
    getWordsNeedingReview,
    getLearningStatistics,
    getSessionStatistics
  };

  return (
    <LearningProgressContext.Provider value={value}>
      {children}
    </LearningProgressContext.Provider>
  );
};

// Custom hook to use the learning progress context
export const useLearningProgress = () => {
  const context = useContext(LearningProgressContext);
  if (context === undefined) {
    throw new Error('useLearningProgress must be used within a LearningProgressProvider');
  }
  return context;
};

export default LearningProgressProvider;
