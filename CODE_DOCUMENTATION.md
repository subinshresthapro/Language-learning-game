/**
 * Code Documentation for NepaliJets app
 * 
 * This file provides an overview of the code structure and key components
 * to help developers understand and extend the application.
 */

/**
 * AUTHENTICATION SYSTEM
 * 
 * The authentication system is built using Firebase Authentication and consists of:
 * 
 * 1. Firebase Configuration (src/config/firebase.js)
 *    - Initializes Firebase with your project configuration
 *    - Exports Firebase services (auth, firestore, storage)
 * 
 * 2. Authentication Service (src/services/auth/authService.js)
 *    - Provides methods for user authentication operations
 *    - Handles email/password, Google, and Apple authentication
 *    - Manages user profile creation in Firestore
 * 
 * 3. Authentication Context (src/context/AuthContext.js)
 *    - React Context for managing authentication state
 *    - Provides authentication methods to components
 *    - Handles loading and error states
 * 
 * 4. Authentication Components (src/components/auth/*)
 *    - LoginForm: Email/password login
 *    - RegisterForm: User registration
 *    - ForgotPasswordForm: Password reset
 *    - SocialSignIn: Google and Apple sign-in
 * 
 * 5. Authentication Screens (src/screens/auth/*)
 *    - LoginScreen: Contains login form and social sign-in
 *    - RegisterScreen: Contains registration form
 *    - ForgotPasswordScreen: Contains password reset form
 */

/**
 * USER PROFILE SYSTEM
 * 
 * The user profile system manages user data and supports parent/child accounts:
 * 
 * 1. User Profile Model (src/models/UserProfile.js)
 *    - Defines data structures for user profiles
 *    - Supports parent and child account types
 *    - Includes learning progress tracking for children
 * 
 * 2. Profile Service (src/services/profile/profileService.js)
 *    - Handles CRUD operations for user profiles
 *    - Manages parent-child relationships
 *    - Syncs data between local storage and Firestore
 * 
 * 3. Profile Context (src/context/ProfileContext.js)
 *    - React Context for managing profile state
 *    - Provides profile methods to components
 *    - Handles loading and error states
 * 
 * 4. Profile Components (src/components/profile/*)
 *    - ProfileEditForm: Edit user profile
 *    - ChildProfileForm: Add/edit child profiles
 * 
 * 5. Profile Screens (src/screens/profile/*)
 *    - ProfileScreen: Display user profile and child profiles
 */

/**
 * NAVIGATION FRAMEWORK
 * 
 * The navigation system uses React Navigation and consists of:
 * 
 * 1. App Navigator (src/navigation/AppNavigator.js)
 *    - Main navigation container
 *    - Handles authentication state changes
 *    - Routes to appropriate navigators based on auth state
 * 
 * 2. Auth Navigator (src/navigation/AuthNavigator.js)
 *    - Stack navigator for authentication screens
 *    - Handles login, registration, and password reset flows
 * 
 * 3. Onboarding Navigator (src/navigation/OnboardingNavigator.js)
 *    - Stack navigator for onboarding screens
 *    - Guides new users through initial setup
 * 
 * 4. Tab Navigator (inside AppNavigator.js)
 *    - Bottom tab navigation for main app screens
 *    - Includes home, learning, progress, and profile tabs
 * 
 * 5. Profile Navigator (inside AppNavigator.js)
 *    - Stack navigator for profile-related screens
 *    - Handles profile editing and child management
 */

/**
 * DATA PERSISTENCE
 * 
 * The app uses multiple data storage mechanisms:
 * 
 * 1. Firebase Firestore
 *    - Primary cloud database
 *    - Stores user profiles, learning data, and app content
 *    - Enables multi-device synchronization
 * 
 * 2. AsyncStorage
 *    - Local device storage
 *    - Caches user data for offline access
 *    - Improves app performance by reducing network requests
 * 
 * 3. Firebase Storage
 *    - Cloud storage for media files
 *    - Stores user profile pictures and learning materials
 */

/**
 * STYLING AND THEMING
 * 
 * The app uses a consistent styling approach:
 * 
 * 1. Colors (src/constants/colors.js)
 *    - Defines color palette for the entire app
 *    - Includes theme colors for rockets and airplanes
 * 
 * 2. Theme (src/constants/theme.js)
 *    - Defines typography, spacing, and other design elements
 *    - Creates a consistent look and feel
 * 
 * 3. Component-level Styles
 *    - Each component has its own StyleSheet
 *    - Uses constants from the theme for consistency
 */

/**
 * FUTURE DEVELOPMENT
 * 
 * Areas for implementation in future modules:
 * 
 * 1. Learning Content
 *    - Nepali language lessons and exercises
 *    - Audio for pronunciation practice
 *    - Interactive learning activities
 * 
 * 2. Game Mechanics
 *    - Rocket and airplane themed games
 *    - Rewards and progression system
 *    - Achievements and badges
 * 
 * 3. Parental Controls
 *    - Usage monitoring and time limits
 *    - Progress reports
 *    - Content filtering
 * 
 * 4. Offline Support
 *    - Enhanced offline functionality
 *    - Background syncing
 *    - Content preloading
 */
