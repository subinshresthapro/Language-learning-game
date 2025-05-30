# NepaliJets - Nepali Language Learning Game App

NepaliJets is a language learning game app designed for children aged 4-7 who are native English speakers. The app uses rockets and airplanes as central themes to make learning Nepali fun and engaging.

## Project Overview

- **Name**: NepaliJets
- **Target audience**: Children aged 4-7 who are native English speakers
- **Theme**: Rockets and airplanes
- **Purpose**: Teaching Nepali language (vocabulary, pronunciation, basic grammar, everyday phrases)
- **Platforms**: Cross-platform (web first, then iOS and Android)
- **Framework**: React Native with Expo
- **Current Status**: Module 3 completed - Comprehensive Nepali language content structure implemented

## Module 1: Project Setup & Authentication

This module includes:
- React Native project initialization with Expo
- Well-organized project structure following best practices
- Authentication implementation (Email/password, Google Sign-In, Apple Sign-In)
- User profile system (Basic info, Parent/child account types, Data persistence)
- Navigation framework

## Module 2: Game Engine & Prototype

This module builds upon Module 1 and includes:
- Core game mechanics with rocket/airplane themed progression system
- Animation system for flying objects and visual feedback
- Level structure with increasing difficulty
- Vocabulary matching game prototype with 30 Nepali words
- Reward system with stars, badges, and collectible rocket/airplane parts
- Learning progress tracking for words learned, pronunciation accuracy, and time spent
- Complete learning cycle prototype with interactive elements for children aged 4-7

For detailed documentation on Module 2, see [MODULE_2_DOCUMENTATION.md](./MODULE_2_DOCUMENTATION.md).

## Module 3: Nepali Language Content

This module builds upon Modules 1 and 2 and includes:
- Comprehensive Nepali language content structure with database/storage schema
- Five thematic units with vocabulary, phrases, and grammar organized by difficulty levels
- Pronunciation guides and audio components for language learning
- Learning progression algorithms including spaced repetition and adaptive learning paths
- Integration of language content with the game engine and rocket/airplane theme

For detailed documentation on Module 3, see [MODULE_3_DOCUMENTATION.md](./MODULE_3_DOCUMENTATION.md).

## Project Structure

```
NepaliJets/
├── App.js                  # Main application entry point
├── app.json                # Expo configuration
├── assets/                 # Static assets (images, fonts, etc.)
│   ├── audio/              # Audio files for pronunciation
│   └── images/             # Images for vocabulary items
├── package.json            # Project dependencies
├── MODULE_2_DOCUMENTATION.md # Documentation for Module 2
├── MODULE_3_DOCUMENTATION.md # Documentation for Module 3
└── src/                    # Source code
    ├── api/                # API services and endpoints
    ├── assets/             # Application assets
    │   ├── images/         # Image assets
    │   ├── sounds/         # Sound assets
    │   └── animations/     # Animation assets
    ├── components/         # Reusable components
    │   ├── animation/      # Animation components
    │   ├── auth/           # Authentication components
    │   ├── common/         # Common UI components
    │   ├── game/           # Game-specific components
    │   ├── learning/       # Learning components
    │   │   └── LearningProgressTracker.js # Learning progress tracking
    │   ├── onboarding/     # Onboarding components
    │   ├── profile/        # Profile components
    │   └── rewards/        # Reward system components
    ├── config/             # Configuration files
    │   └── firebase.js     # Firebase configuration
    ├── constants/          # Constants and static data
    │   ├── colors.js       # Color palette
    │   ├── images.js       # Image references
    │   ├── routes.js       # Navigation routes
    │   ├── strings.js      # Text strings
    │   ├── theme.js        # Theme configuration
    │   └── NepaliWordsData.js # Nepali vocabulary dataset
    ├── context/            # React Context providers
    │   ├── AuthContext.js  # Authentication context
    │   └── ProfileContext.js # User profile context
    ├── data/               # Language content data
    │   ├── thematicUnits/  # Thematic units for Nepali content
    │   │   ├── Unit1_Greetings.js      # Greetings unit
    │   │   ├── Unit2_ColorsShapes.js   # Colors and shapes unit
    │   │   ├── Unit3_Numbers.js        # Numbers unit
    │   │   ├── Unit4_Family.js         # Family members unit
    │   │   └── Unit5_AnimalsNature.js  # Animals and nature unit
    │   └── integration/    # Game-content integration
    │       ├── ContentIntegration.js    # Content-game integration
    │       ├── GameContentTransitions.js # UI transitions
    │       └── ContentIntegrationTests.js # Integration tests
    ├── design/             # Design documents
    ├── hooks/              # Custom React hooks
    ├── localization/       # Internationalization
    ├── models/             # Data models
    │   ├── UserProfile.js  # User profile model
    │   └── LanguageContent.js # Language content models
    ├── navigation/         # Navigation configuration
    │   ├── AppNavigator.js # Main app navigation
    │   ├── AuthNavigator.js # Authentication navigation
    │   └── OnboardingNavigator.js # Onboarding navigation
    ├── screens/            # Application screens
    │   ├── auth/           # Authentication screens
    │   ├── game/           # Game screens
    │   ├── learning/       # Learning screens
    │   ├── onboarding/     # Onboarding screens
    │   └── profile/        # Profile screens
    ├── services/           # Business logic services
    │   ├── auth/           # Authentication services
    │   ├── content/        # Content management services
    │   │   └── contentService.js # Content storage and retrieval
    │   ├── learning/       # Learning services
    │   │   └── learningAlgorithms.js # Learning progression algorithms
    │   ├── profile/        # Profile services
    │   ├── pronunciation/  # Pronunciation services
    │   │   └── pronunciationService.js # Audio and pronunciation
    │   └── storage/        # Storage services
    ├── styles/             # Global styles
    └── utils/              # Utility functions
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd NepaliJets
```

2. Install dependencies:
```bash
npm install
```

3. Firebase Configuration:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password, Google, Apple)
   - Create a Firestore database
   - Update the Firebase configuration in `src/config/firebase.js`

4. Start the development server:
```bash
npm start
```

5. Run on a device or emulator:
   - Press `a` to run on Android emulator
   - Press `i` to run on iOS simulator
   - Scan the QR code with Expo Go app on your device

## Features Implemented in Module 1

### Authentication
- Email/password authentication
- Google Sign-In integration
- Apple Sign-In integration
- Password reset functionality
- Authentication state persistence

### User Profiles
- Parent and child account types
- Profile creation and management
- Profile data persistence (local and cloud)
- Parent-child relationship management

### Navigation
- Authentication flow
- Onboarding experience
- Main app navigation with tabs
- Profile management screens

## Features Implemented in Module 2

### Core Game Mechanics
- Central game state management
- Level progression with difficulty scaling
- Vocabulary matching game with multiple modes
- Interactive elements designed for children aged 4-7

### Animation System
- Sprite-based animations for characters and objects
- Motion effects for flying objects
- Celebration animations for achievements
- Transition effects between screens

### Reward System
- Star rating system for level completion
- Achievement badges for milestones
- Collectible rocket/airplane parts
- Visual and audio feedback for rewards

### Learning Progress Tracking
- Words/phrases learned tracking
- Pronunciation accuracy metrics
- Learning time monitoring
- Achievement records and statistics

### Nepali Language Content
- Dataset of 30 Nepali words across multiple categories
- Translations, pronunciations, and example sentences
- Difficulty levels for progressive learning
- Audio recordings for pronunciation practice

## Features Implemented in Module 3

### Comprehensive Language Content Structure
- Robust database schema for Nepali vocabulary, phrases, and grammar
- Content organized by difficulty levels appropriate for children aged 4-7
- English translations and contextual usage examples
- Thematic organization of content with rocket/airplane integration

### Thematic Units
- Unit 1: Greetings and Basic Expressions (12 vocabulary items, 5 phrases)
- Unit 2: Colors and Shapes (13 vocabulary items, 6 phrases)
- Unit 3: Numbers and Counting (15 vocabulary items, 6 phrases)
- Unit 4: Family Members (12 vocabulary items, 6 phrases)
- Unit 5: Animals and Nature (15 vocabulary items, 6 phrases)

### Pronunciation System
- High-quality Nepali audio pronunciations
- Visual pronunciation guides using phonetic representations
- Syllable breakdown for easier pronunciation
- Pronunciation feedback mechanisms

### Learning Algorithms
- Spaced repetition system for vocabulary retention
- Difficulty scaling based on user performance
- Adaptive learning paths that adjust to individual progress
- Mastery tracking metrics for content

### Game Integration
- Seamless connection between language content and game mechanics
- Reward systems aligned with learning objectives
- Smooth transitions between game elements and educational content
- Content loading and management system

## Next Steps

Future modules will implement:
- Advanced pronunciation practice with voice recognition
- Multiplayer challenges and competitions
- Enhanced parental controls and detailed progress reports
- Additional customization options for rockets and airplanes
- Cultural context lessons about Nepal and its traditions

## Dependencies

- React Native
- Expo
- React Navigation
- Firebase (Authentication, Firestore, Storage)
- AsyncStorage for local data persistence
- Expo Audio for sound effects
- React Native Animated for animations

## Notes for Developers

- The app uses a context-based state management approach with React Context API
- Firebase is used for authentication and cloud data storage
- The project follows a modular structure for easy maintenance and scalability
- The game engine is designed to be extensible for additional learning activities

## License

[Specify license information here]