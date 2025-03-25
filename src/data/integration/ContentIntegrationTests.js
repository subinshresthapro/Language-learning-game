/**
 * ContentIntegrationTests.js
 * 
 * Tests for the integration of Nepali language content with the game engine
 * Verifies proper functioning of content loading, transitions, and game mechanics
 */

import ContentIntegration from './ContentIntegration';
import ContentManager from './GameContentTransitions';
import { LevelManager } from '../../components/game/LevelManager';
import { RewardSystem } from '../../components/rewards/RewardSystem';
import { LearningProgressTracker } from '../../components/learning/LearningProgressTracker';

/**
 * Test content integration with game engine
 * @returns {Object} - Test results
 */
const testContentIntegration = () => {
  console.log('Testing content integration with game engine...');
  
  const results = {
    success: true,
    tests: {
      initialization: false,
      contentLoading: false,
      activityGeneration: false,
      progressTracking: false,
      rewardSystem: false
    },
    errors: []
  };
  
  try {
    // Test initialization
    const levelManager = new LevelManager();
    const rewardSystem = new RewardSystem();
    const learningProgressTracker = new LearningProgressTracker();
    const userProgress = {
      userId: 'test-user',
      vocabularyProgress: {},
      phraseProgress: {},
      grammarProgress: {},
      unitProgress: {},
      pathProgress: {},
      lastSession: new Date().toISOString(),
      totalLearningTime: 0,
      streakDays: 0,
      lastStreakDate: new Date().toISOString()
    };
    
    ContentIntegration.initialize(
      levelManager,
      rewardSystem,
      learningProgressTracker,
      userProgress
    );
    
    results.tests.initialization = true;
    console.log('✓ Initialization test passed');
    
    // Test content loading
    const levelContent = ContentIntegration.loadLevelContent(0);
    if (!levelContent || !levelContent.thematicUnit) {
      throw new Error('Failed to load level content');
    }
    
    results.tests.contentLoading = true;
    console.log('✓ Content loading test passed');
    
    // Test activity generation
    const activities = ContentIntegration.generateLearningActivities(3);
    if (!activities || activities.length !== 3) {
      throw new Error('Failed to generate learning activities');
    }
    
    results.tests.activityGeneration = true;
    console.log('✓ Activity generation test passed');
    
    // Test progress tracking
    const activity = activities[0];
    const activityResults = {
      score: 85,
      itemResults: [
        {
          item: levelContent.vocabularyItems[0],
          performance: 4
        },
        {
          item: levelContent.vocabularyItems[1],
          performance: 5
        }
      ]
    };
    
    const progressUpdate = ContentIntegration.processActivityCompletion(activity, activityResults);
    if (!progressUpdate || !progressUpdate.updatedItems || progressUpdate.updatedItems.length !== 2) {
      throw new Error('Failed to process activity completion');
    }
    
    results.tests.progressTracking = true;
    console.log('✓ Progress tracking test passed');
    
    // Test reward system
    if (!progressUpdate.rewards || !progressUpdate.rewards.stars) {
      throw new Error('Failed to calculate rewards');
    }
    
    results.tests.rewardSystem = true;
    console.log('✓ Reward system test passed');
    
    console.log('All content integration tests passed!');
  } catch (error) {
    results.success = false;
    results.errors.push(error.message);
    console.error('Content integration test failed:', error);
  }
  
  return results;
};

/**
 * Test content manager and transitions
 * @returns {Object} - Test results
 */
const testContentManager = () => {
  console.log('Testing content manager and transitions...');
  
  const results = {
    success: true,
    tests: {
      contentLoading: false,
      activityGeneration: false,
      cacheManagement: false
    },
    errors: []
  };
  
  try {
    // Test content loading
    const levelContent = ContentManager.loadLevelContent(0);
    if (!levelContent) {
      throw new Error('Failed to load level content');
    }
    
    results.tests.contentLoading = true;
    console.log('✓ Content manager loading test passed');
    
    // Test activity generation
    const activities = ContentManager.generateActivities(3);
    if (!activities || activities.length !== 3) {
      throw new Error('Failed to generate activities');
    }
    
    results.tests.activityGeneration = true;
    console.log('✓ Content manager activity generation test passed');
    
    // Test cache management
    ContentManager.clearCache(0);
    if (ContentManager.loadedContent[0]) {
      throw new Error('Failed to clear cache');
    }
    
    results.tests.cacheManagement = true;
    console.log('✓ Content manager cache management test passed');
    
    console.log('All content manager tests passed!');
  } catch (error) {
    results.success = false;
    results.errors.push(error.message);
    console.error('Content manager test failed:', error);
  }
  
  return results;
};

/**
 * Run all integration tests
 * @returns {Object} - Combined test results
 */
export const runIntegrationTests = () => {
  console.log('Running all integration tests...');
  
  const integrationResults = testContentIntegration();
  const managerResults = testContentManager();
  
  const combinedResults = {
    success: integrationResults.success && managerResults.success,
    contentIntegration: integrationResults,
    contentManager: managerResults
  };
  
  console.log('Integration tests completed.');
  console.log('Success:', combinedResults.success);
  
  return combinedResults;
};

export default {
  testContentIntegration,
  testContentManager,
  runIntegrationTests
};