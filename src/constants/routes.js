/**
 * Route constants for NepaliJets app
 * Defines all navigation routes used in the app
 */

export const ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: 'Login',
    REGISTER: 'Register',
    FORGOT_PASSWORD: 'ForgotPassword',
    RESET_PASSWORD: 'ResetPassword',
  },
  
  // Onboarding routes
  ONBOARDING: {
    WELCOME: 'Welcome',
    USER_TYPE: 'UserType',
    CHILD_INFO: 'ChildInfo',
    PARENT_INFO: 'ParentInfo',
    TUTORIAL: 'Tutorial',
  },
  
  // Main app routes
  APP: {
    HOME: 'Home',
    PROFILE: 'Profile',
    SETTINGS: 'Settings',
  },
  
  // Game routes
  GAME: {
    DASHBOARD: 'GameDashboard',
    ROCKET_MISSION: 'RocketMission',
    AIRPLANE_ADVENTURE: 'AirplaneAdventure',
  },
  
  // Learning routes
  LEARNING: {
    MODULES: 'LearningModules',
    VOCABULARY: 'Vocabulary',
    PRONUNCIATION: 'Pronunciation',
    GRAMMAR: 'Grammar',
    PHRASES: 'Phrases',
    QUIZ: 'Quiz',
  },
  
  // Profile routes
  PROFILE: {
    VIEW: 'ViewProfile',
    EDIT: 'EditProfile',
    PROGRESS: 'Progress',
    ACHIEVEMENTS: 'Achievements',
  },
  
  // Parent control routes
  PARENT: {
    DASHBOARD: 'ParentDashboard',
    CHILD_PROGRESS: 'ChildProgress',
    SETTINGS: 'ParentSettings',
    TIME_LIMITS: 'TimeLimits',
  },
};

export default ROUTES;
