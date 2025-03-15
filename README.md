# NepaliJets - Nepali Language Learning Game App

NepaliJets is a language learning game app designed for children aged 4-7 who are native English speakers. The app uses rockets and airplanes as central themes to make learning Nepali fun and engaging.

## Project Overview

- **Name**: NepaliJets
- **Target audience**: Children aged 4-7 who are native English speakers
- **Theme**: Rockets and airplanes
- **Purpose**: Teaching Nepali language (vocabulary, pronunciation, basic grammar, everyday phrases)
- **Platforms**: Cross-platform (web first, then iOS and Android)
- **Framework**: React Native with Expo

## Module 1: Project Setup & Authentication

This module includes:
- React Native project initialization with Expo
- Well-organized project structure following best practices
- Authentication implementation (Email/password, Google Sign-In, Apple Sign-In)
- User profile system (Basic info, Parent/child account types, Data persistence)
- Navigation framework

## Project Structure

```
NepaliJets/
├── App.js                  # Main application entry point
├── app.json                # Expo configuration
├── assets/                 # Static assets (images, fonts, etc.)
├── package.json            # Project dependencies
└── src/                    # Source code
    ├── api/                # API services and endpoints
    ├── assets/             # Application assets
    │   ├── images/         # Image assets
    │   ├── sounds/         # Sound assets
    │   └── animations/     # Animation assets
    ├── components/         # Reusable components
    │   ├── auth/           # Authentication components
    │   ├── common/         # Common UI components
    │   ├── game/           # Game-specific components
    │   ├── learning/       # Learning components
    │   ├── onboarding/     # Onboarding components
    │   └── profile/        # Profile components
    ├── config/             # Configuration files
    │   └── firebase.js     # Firebase configuration
    ├── constants/          # Constants and static data
    │   ├── colors.js       # Color palette
    │   ├── images.js       # Image references
    │   ├── routes.js       # Navigation routes
    │   ├── strings.js      # Text strings
    │   └── theme.js        # Theme configuration
    ├── context/            # React Context providers
    │   ├── AuthContext.js  # Authentication context
    │   └── ProfileContext.js # User profile context
    ├── hooks/              # Custom React hooks
    ├── localization/       # Internationalization
    ├── models/             # Data models
    │   └── UserProfile.js  # User profile model
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
    │   ├── profile/        # Profile services
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

## Next Steps

Future modules will implement:
- Learning modules with Nepali language content
- Game mechanics with rockets and airplanes theme
- Progress tracking and achievements
- Parental controls and settings

## Dependencies

- React Native
- Expo
- React Navigation
- Firebase (Authentication, Firestore, Storage)
- AsyncStorage for local data persistence

## Notes for Developers

- The app uses a context-based state management approach with React Context API
- Firebase is used for authentication and cloud data storage
- The project follows a modular structure for easy maintenance and scalability
- Placeholder components are included for features to be implemented in future modules

## License

[Specify license information here]
