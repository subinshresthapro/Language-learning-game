/**
 * User Profile Model for NepaliJets app
 * Defines the structure and types for user profiles
 */

// User profile types
export const USER_TYPES = {
  PARENT: 'parent',
  CHILD: 'child',
};

// Learning level types
export const LEARNING_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
};

// Default parent profile
export const DEFAULT_PARENT_PROFILE = {
  displayName: '',
  email: '',
  photoURL: null,
  accountType: USER_TYPES.PARENT,
  children: [], // Array of child profile references
  preferences: {
    notifications: true,
    dailyReminders: true,
    contentFilters: true,
    timeLimits: {
      enabled: false,
      dailyLimit: 60, // in minutes
    },
  },
  createdAt: null,
  updatedAt: null,
};

// Default child profile
export const DEFAULT_CHILD_PROFILE = {
  displayName: '',
  age: null,
  photoURL: null,
  accountType: USER_TYPES.CHILD,
  parentId: null, // Reference to parent user ID
  learningProgress: {
    level: LEARNING_LEVELS.BEGINNER,
    xp: 0,
    lessonsCompleted: 0,
    vocabulary: {
      learned: [],
      practicing: [],
      mastered: [],
    },
    pronunciation: {
      learned: [],
      practicing: [],
      mastered: [],
    },
    grammar: {
      learned: [],
      practicing: [],
      mastered: [],
    },
    phrases: {
      learned: [],
      practicing: [],
      mastered: [],
    },
  },
  achievements: {
    badges: [],
    trophies: [],
    stars: 0,
  },
  preferences: {
    theme: 'rocket', // 'rocket' or 'airplane'
    avatar: 'default',
    soundEffects: true,
    music: true,
  },
  gameState: {
    currentMission: null,
    unlockedMissions: ['intro'],
    rocketParts: [],
    airplaneParts: [],
  },
  createdAt: null,
  updatedAt: null,
};

export default {
  USER_TYPES,
  LEARNING_LEVELS,
  DEFAULT_PARENT_PROFILE,
  DEFAULT_CHILD_PROFILE,
};
