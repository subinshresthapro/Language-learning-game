/**
 * ContentIntegration.js
 * 
 * Integrates Nepali language content with the game engine
 * Connects content to game mechanics and aligns reward systems with learning objectives
 */

import { LevelManager } from '../../components/game/LevelManager';
import { RewardSystem } from '../../components/rewards/RewardSystem';
import { LearningProgressTracker } from '../../components/learning/LearningProgressTracker';
import { SpacedRepetitionSystem, DifficultyScalingSystem, AdaptiveLearningPath } from '../../services/learning/learningAlgorithms';
import contentService from '../../services/content/contentService';
import pronunciationService from '../../services/pronunciation/pronunciationService';

// Import thematic units
import UNIT_GREETINGS from '../thematicUnits/Unit1_Greetings';
import UNIT_COLORS_SHAPES from '../thematicUnits/Unit2_ColorsShapes';
import UNIT_NUMBERS from '../thematicUnits/Unit3_Numbers';
import UNIT_FAMILY from '../thematicUnits/Unit4_Family';
import UNIT_ANIMALS_NATURE from '../thematicUnits/Unit5_AnimalsNature';

/**
 * ContentGameIntegration
 * Manages the integration of language content with game mechanics
 */
class ContentGameIntegration {
  constructor() {
    this.thematicUnits = [
      UNIT_GREETINGS,
      UNIT_COLORS_SHAPES,
      UNIT_NUMBERS,
      UNIT_FAMILY,
      UNIT_ANIMALS_NATURE
    ];
    
    this.levelManager = null;
    this.rewardSystem = null;
    this.learningProgressTracker = null;
    this.spacedRepetitionSystem = new SpacedRepetitionSystem();
    this.difficultyScalingSystem = new DifficultyScalingSystem();
    this.adaptiveLearningPath = null;
    
    this.currentUnit = null;
    this.currentVocabulary = [];
    this.currentPhrases = [];
    this.userProgress = null;
  }

  /**
   * Initialize the content integration
   * @param {Object} levelManager - Level manager instance
   * @param {Object} rewardSystem - Reward system instance
   * @param {Object} learningProgressTracker - Learning progress tracker instance
   * @param {Object} userProgress - User progress data
   */
  initialize(levelManager, rewardSystem, learningProgressTracker, userProgress) {
    this.levelManager = levelManager;
    this.rewardSystem = rewardSystem;
    this.learningProgressTracker = learningProgressTracker;
    this.userProgress = userProgress;
    
    // Initialize adaptive learning path with user progress
    this.adaptiveLearningPath = new AdaptiveLearningPath(
      userProgress,
      this.getAllVocabularyItems()
    );
    
    // Map thematic units to game levels
    this.mapUnitsToLevels();
    
    // Initialize audio components
    this.initializeAudioComponents();
    
    console.log('Content integration initialized');
  }

  /**
   * Map thematic units to game levels
   */
  mapUnitsToLevels() {
    if (!this.levelManager) {
      console.error('Level manager not initialized');
      return;
    }
    
    // Get all levels from level manager
    const levels = this.levelManager.getLevels();
    
    // Map each thematic unit to a level
    this.thematicUnits.forEach((unitData, index) => {
      if (index < levels.length) {
        const level = levels[index];
        const unit = unitData.unit;
        
        // Set level content
        level.setContent({
          title: unit.title,
          description: unit.description,
          thematicUnit: unit,
          vocabularyItems: unitData.vocabularyItems,
          phrases: unitData.phrases,
          grammarPoints: unitData.grammarPoints,
          pronunciationGuides: unitData.pronunciationGuides,
          difficulty: unit.difficulty,
          rocketThemeConnection: unit.rocketThemeConnection,
          learningObjectives: unit.learningObjectives
        });
        
        // Set completion criteria
        level.setCompletionCriteria(unit.completionCriteria);
        
        // Set level unlocked status based on user progress
        if (this.userProgress && this.userProgress.unitProgress) {
          const unitProgress = this.userProgress.unitProgress[unit.id];
          if (unitProgress) {
            level.setUnlocked(unitProgress.unlocked);
            level.setCompleted(unitProgress.completed);
            level.setProgress(unitProgress.progress);
          } else if (index === 0) {
            // First level is always unlocked
            level.setUnlocked(true);
          }
        } else if (index === 0) {
          // First level is always unlocked
          level.setUnlocked(true);
        }
      }
    });
    
    console.log('Thematic units mapped to levels');
  }

  /**
   * Initialize audio components
   */
  async initializeAudioComponents() {
    try {
      await pronunciationService.initializeAudioDirectories();
      console.log('Audio components initialized');
    } catch (error) {
      console.error('Error initializing audio components:', error);
    }
  }

  /**
   * Get all vocabulary items from all units
   * @returns {Array} - All vocabulary items
   */
  getAllVocabularyItems() {
    let allItems = [];
    this.thematicUnits.forEach(unitData => {
      allItems = [...allItems, ...unitData.vocabularyItems];
    });
    return allItems;
  }

  /**
   * Get all phrases from all units
   * @returns {Array} - All phrases
   */
  getAllPhrases() {
    let allPhrases = [];
    this.thematicUnits.forEach(unitData => {
      allPhrases = [...allPhrases, ...unitData.phrases];
    });
    return allPhrases;
  }

  /**
   * Load content for a specific level
   * @param {number} levelIndex - Level index
   * @returns {Object} - Level content
   */
  loadLevelContent(levelIndex) {
    if (!this.levelManager) {
      console.error('Level manager not initialized');
      return null;
    }
    
    // Get level
    const level = this.levelManager.getLevel(levelIndex);
    if (!level) {
      console.error(`Level ${levelIndex} not found`);
      return null;
    }
    
    // Get level content
    const content = level.getContent();
    if (!content) {
      console.error(`Content for level ${levelIndex} not found`);
      return null;
    }
    
    // Set current unit and content
    this.currentUnit = content.thematicUnit;
    this.currentVocabulary = content.vocabularyItems;
    this.currentPhrases = content.phrases;
    
    return content;
  }

  /**
   * Generate learning activities for current level
   * @param {number} count - Number of activities to generate
   * @returns {Array} - Learning activities
   */
  generateLearningActivities(count = 5) {
    if (!this.currentUnit || !this.currentVocabulary || !this.currentPhrases) {
      console.error('Current unit or content not set');
      return [];
    }
    
    const activities = [];
    
    // Activity types
    const activityTypes = [
      'vocabulary_matching',
      'word_to_picture',
      'listen_and_select',
      'pronunciation_practice',
      'phrase_completion',
      'grammar_practice'
    ];
    
    // Generate activities
    for (let i = 0; i < count; i++) {
      const type = activityTypes[i % activityTypes.length];
      const activity = this.createActivity(type);
      if (activity) {
        activities.push(activity);
      }
    }
    
    return activities;
  }

  /**
   * Create a learning activity
   * @param {string} type - Activity type
   * @returns {Object} - Learning activity
   */
  createActivity(type) {
    if (!this.currentVocabulary || !this.currentPhrases) {
      return null;
    }
    
    // Get items for activity based on adaptive learning path
    const items = this.adaptiveLearningPath.generatePersonalizedPath(5);
    
    // Create activity based on type
    switch (type) {
      case 'vocabulary_matching':
        return {
          type: 'vocabulary_matching',
          title: 'Match the Words',
          description: 'Match the Nepali words with their English translations',
          items: items.slice(0, 5),
          difficulty: this.currentUnit.difficulty,
          rocketThemeElement: 'Fuel your rocket by matching words correctly!'
        };
        
      case 'word_to_picture':
        return {
          type: 'word_to_picture',
          title: 'Word to Picture',
          description: 'Match the Nepali words with the correct pictures',
          items: items.slice(0, 5),
          difficulty: this.currentUnit.difficulty,
          rocketThemeElement: 'Help your rocket navigate by identifying the correct images!'
        };
        
      case 'listen_and_select':
        return {
          type: 'listen_and_select',
          title: 'Listen and Select',
          description: 'Listen to the Nepali word and select the correct option',
          items: items.slice(0, 5),
          audioService: pronunciationService,
          difficulty: this.currentUnit.difficulty,
          rocketThemeElement: 'Tune your rocket\'s communication system by listening carefully!'
        };
        
      case 'pronunciation_practice':
        return {
          type: 'pronunciation_practice',
          title: 'Pronunciation Practice',
          description: 'Practice pronouncing Nepali words',
          items: items.slice(0, 3),
          pronunciationService: pronunciationService,
          difficulty: this.currentUnit.difficulty,
          rocketThemeElement: 'Train like an astronaut by practicing your Nepali communication skills!'
        };
        
      case 'phrase_completion':
        return {
          type: 'phrase_completion',
          title: 'Complete the Phrase',
          description: 'Fill in the missing word in the Nepali phrase',
          phrases: this.currentPhrases.slice(0, 3),
          vocabulary: this.currentVocabulary,
          difficulty: this.currentUnit.difficulty,
          rocketThemeElement: 'Complete your rocket\'s mission instructions in Nepali!'
        };
        
      case 'grammar_practice':
        return {
          type: 'grammar_practice',
          title: 'Grammar Practice',
          description: 'Practice Nepali grammar patterns',
          grammarPoints: this.currentUnit.grammarPoints.slice(0, 2),
          vocabulary: this.currentVocabulary,
          difficulty: this.currentUnit.difficulty,
          rocketThemeElement: 'Build your rocket\'s structure with proper Nepali grammar!'
        };
        
      default:
        return null;
    }
  }

  /**
   * Process activity completion and update progress
   * @param {Object} activity - Completed activity
   * @param {Object} results - Activity results
   * @returns {Object} - Updated progress and rewards
   */
  processActivityCompletion(activity, results) {
    if (!this.userProgress || !this.rewardSystem || !this.learningProgressTracker) {
      console.error('User progress, reward system, or learning tracker not initialized');
      return null;
    }
    
    // Calculate performance score (0-100)
    const performanceScore = results.score || 0;
    
    // Update learning progress
    const updatedItems = [];
    if (results.itemResults) {
      results.itemResults.forEach(itemResult => {
        const item = itemResult.item;
        const performance = itemResult.performance; // 0-5 scale
        
        // Update mastery level
        const updatedItem = this.learningProgressTracker.updateMasteryLevel(item, performance);
        updatedItems.push(updatedItem);
        
        // Schedule next review with spaced repetition
        this.spacedRepetitionSystem.scheduleNextReview(updatedItem, performance);
      });
    }
    
    // Update adaptive learning path
    this.adaptiveLearningPath.updatePath(updatedItems);
    
    // Calculate rewards based on performance
    const rewards = this.calculateRewards(activity, performanceScore);
    
    // Apply rewards
    this.rewardSystem.addRewards(rewards);
    
    // Update unit progress
    if (this.currentUnit) {
      const unitId = this.currentUnit.id;
      if (!this.userProgress.unitProgress) {
        this.userProgress.unitProgress = {};
      }
      if (!this.userProgress.unitProgress[unitId]) {
        this.userProgress.unitProgress[unitId] = {
          unlocked: true,
          completed: false,
          progress: 0,
          activitiesCompleted: 0,
          totalActivities: 10 // Assuming 10 activities per unit
        };
      }
      
      const unitProgress = this.userProgress.unitProgress[unitId];
      unitProgress.activitiesCompleted += 1;
      
      // Calculate overall progress percentage
      unitProgress.progress = Math.round(
        (unitProgress.activitiesCompleted / unitProgress.totalActivities) * 100
      );
      
      // Check if unit is completed
      if (unitProgress.progress >= 100) {
        unitProgress.completed = true;
        
        // Unlock next unit if available
        const currentUnitIndex = this.thematicUnits.findIndex(
          unitData => unitData.unit.id === unitId
        );
        
        if (currentUnitIndex >= 0 && currentUnitIndex < this.thematicUnits.length - 1) {
          const nextUnitId = this.thematicUnits[currentUnitIndex + 1].unit.id;
          if (!this.userProgress.unitProgress[nextUnitId]) {
            this.userProgress.unitProgress[nextUnitId] = {
              unlocked: true,
              completed: false,
              progress: 0,
              activitiesCompleted: 0,
              totalActivities: 10
            };
          } else {
            this.userProgress.unitProgress[nextUnitId].unlocked = true;
          }
        }
      }
    }
    
    // Save updated progress
    this.saveUserProgress();
    
    return {
      updatedItems,
      rewards,
      unitProgress: this.currentUnit ? this.userProgress.unitProgress[this.currentUnit.id] : null
    };
  }

  /**
   * Calculate rewards based on activity performance
   * @param {Object} activity - Completed activity
   * @param {number} performanceScore - Performance score (0-100)
   * @returns {Object} - Rewards
   */
  calculateRewards(activity, performanceScore) {
    // Base rewards
    const rewards = {
      stars: 0,
      points: 0,
      badges: [],
      rocketParts: [],
      unlocks: []
    };
    
    // Calculate stars (0-3) based on performance
    if (performanceScore >= 90) {
      rewards.stars = 3;
    } else if (performanceScore >= 70) {
      rewards.stars = 2;
    } else if (performanceScore >= 50) {
      rewards.stars = 1;
    }
    
    // Calculate points
    rewards.points = Math.round(performanceScore * 10);
    
    // Add badges based on activity type and performance
    if (performanceScore >= 80) {
      switch (activity.type) {
        case 'vocabulary_matching':
          rewards.badges.push('vocabulary_master');
          break;
        case 'word_to_picture':
          rewards.badges.push('visual_learner');
          break;
        case 'listen_and_select':
          rewards.badges.push('keen_listener');
          break;
        case 'pronunciation_practice':
          rewards.badges.push('pronunciation_pro');
          break;
        case 'phrase_completion':
          rewards.badges.push('phrase_builder');
          break;
        case 'grammar_practice':
          rewards.badges.push('grammar_guru');
          break;
      }
    }
    
    // Add rocket parts based on unit theme and performance
    if (this.currentUnit && performanceScore >= 70) {
      switch (this.currentUnit.category) {
        case 'greetings':
          rewards.rocketParts.push('rocket_cockpit');
          break;
        case 'colors_shapes':
          rewards.rocketParts.push('rocket_wings');
          break;
        case 'numbers':
          rewards.rocketParts.push('rocket_engine');
          break;
        case 'family':
          rewards.rocketParts.push('rocket_cabin');
          break;
        case 'animals_nature':
          rewards.rocketParts.push('rocket_tail');
          break;
      }
    }
    
    return rewards;
  }

  /**
   * Save user progress
   */
  async saveUserProgress() {
    if (!this.userProgress) {
      return;
    }
    
    try {
      // Update las<response clipped><NOTE>To save on context only part of this file has been shown to you. You should retry this tool after you have searched inside the file with `grep -n` in order to find the line numbers of what you are looking for.</NOTE>