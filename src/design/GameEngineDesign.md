# NepaliJets Game Engine Design Document

## Overview

This document outlines the design for the NepaliJets game engine components, which will power the Nepali language learning experience for children aged 4-7 who are native English speakers. The game engine is built around a rocket/airplane theme to make learning engaging and fun.

## Core Components

### 1. Game Engine Architecture

The game engine will follow a component-based architecture with the following key modules:

```
GameEngine/
├── Core/
│   ├── GameManager.js       # Central game state management
│   ├── LevelManager.js      # Level progression and difficulty
│   ├── ScoreManager.js      # Points and achievements tracking
│   └── AudioManager.js      # Sound effects and voice playback
├── Animation/
│   ├── AnimationSystem.js   # Animation framework
│   ├── SpriteAnimator.js    # Sprite-based animations
│   └── MotionEffects.js     # Movement and transition effects
├── Gameplay/
│   ├── MatchingGame.js      # Vocabulary matching mechanics
│   ├── PronunciationGame.js # Pronunciation practice (placeholder)
│   └── InteractiveObjects.js # Touchable game elements
└── Rewards/
    ├── RewardSystem.js      # Reward distribution logic
    ├── CollectiblesManager.js # Rocket/airplane parts collection
    └── AchievementManager.js # Badges and milestones
```

### 2. Rocket/Airplane Progression System

The progression system will be structured as a journey through space/sky with multiple destinations:

- **Progression Map**: A visual map showing the child's learning journey
- **Destinations**: Represent learning modules or topics (e.g., "Numbers Planet", "Colors Island")
- **Flight Paths**: Connect destinations and visualize progress
- **Rocket/Airplane Customization**: Parts earned through achievements

#### Implementation Approach:
- Use a map-based navigation UI with animated transitions between destinations
- Store progress data in user profile
- Implement unlocking logic for new destinations based on completion criteria

### 3. Animation System

The animation system will handle all visual effects and character movements:

- **Sprite-based Animation**: For characters and interactive elements
- **Motion Effects**: For flying objects, rewards, and transitions
- **Particle Effects**: For celebrations, achievements, and feedback

#### Implementation Approach:
- Leverage React Native Animated API for performance
- Create reusable animation components
- Implement a timing-based animation scheduler
- Support for gesture-based interactions

### 4. Level Structure

Levels will be organized with increasing difficulty:

- **Level Tiers**: Beginner, Intermediate, Advanced
- **Difficulty Progression**: More words, faster gameplay, complex matching
- **Adaptive Difficulty**: Adjusts based on player performance
- **Level Requirements**: Criteria for unlocking new levels

#### Implementation Approach:
- Define level configuration schema
- Store level data in JSON format
- Implement level loading and initialization
- Create difficulty scaling algorithms

### 5. Vocabulary Matching Game

The core gameplay will involve matching Nepali words to their English equivalents:

- **Game Modes**: 
  - Word-to-Picture: Match Nepali word to image
  - Word-to-Word: Match Nepali to English
  - Sound-to-Word: Match pronunciation to written word
  
- **Interaction Methods**:
  - Drag and Drop: For younger players
  - Tap to Select: For faster gameplay
  
- **Feedback Mechanisms**:
  - Visual cues for correct/incorrect matches
  - Audio feedback with pronunciation
  - Animated celebrations for success

#### Implementation Approach:
- Create reusable card components for words and images
- Implement matching logic with validation
- Design scoring system based on speed and accuracy
- Support for different game modes through configuration

## Data Models

### Game State Model

```javascript
{
  currentLevel: {
    id: String,
    difficulty: Number,
    topic: String,
    wordSet: Array<WordItem>,
    completionCriteria: Object
  },
  playerProgress: {
    currentScore: Number,
    stars: Number,
    collectibles: Array<CollectibleItem>,
    achievements: Array<AchievementItem>
  },
  gameSettings: {
    soundEnabled: Boolean,
    difficultyPreference: String,
    animationSpeed: Number
  }
}
```

### Word Item Model

```javascript
{
  id: String,
  nepaliWord: String,
  englishTranslation: String,
  pronunciation: String,
  audioFile: String,
  imageAsset: String,
  difficulty: Number,
  category: String,
  tags: Array<String>
}
```

### Level Model

```javascript
{
  id: String,
  name: String,
  description: String,
  difficulty: Number,
  minScore: Number,
  timeLimit: Number,
  wordCount: Number,
  wordCategories: Array<String>,
  rewards: {
    stars: Number,
    collectibles: Array<CollectibleItem>,
    unlocks: Array<String>
  }
}
```

## User Interface Components

### Game Screen Components

- **GameBoard**: Main play area for matching games
- **ProgressBar**: Visual indicator of level completion
- **ScoreDisplay**: Shows current points and stars
- **FeedbackOverlay**: Displays success/failure animations
- **RewardPopup**: Shows earned rewards and collectibles

### Map Screen Components

- **ProgressionMap**: Visual journey with destinations
- **RocketDisplay**: Shows player's customized rocket/airplane
- **DestinationMarker**: Interactive points on the map
- **PathAnimation**: Animated travel between destinations

## Integration Points

### Authentication Integration

- Use existing AuthContext to verify user and load profiles
- Store game progress in user profile
- Support multiple child profiles under parent account

### Navigation Integration

- Add game screens to existing navigation structure
- Create transitions between auth flow and game flow
- Implement deep linking for specific game activities

### Data Persistence

- Use existing storage services for saving progress
- Implement caching for game assets and word data
- Support offline play with synchronization

## Technical Considerations

### Performance Optimization

- Use memoization for frequently rendered components
- Implement asset preloading for smooth gameplay
- Optimize animations for lower-end devices

### Accessibility

- Support for text-to-speech for instructions
- Color schemes suitable for color-blind users
- Adjustable game speed for different ability levels

### Testing Strategy

- Unit tests for game logic and scoring
- Component tests for UI elements
- Integration tests for game flow and progression
- User testing with target age group (4-7 years)
