# Reward System Design Document

## Overview

This document outlines the design for the NepaliJets reward system, which will motivate children aged 4-7 to continue learning Nepali language through engaging rewards and achievements.

## Core Components

### 1. Reward System Architecture

The reward system will be structured with the following components:

```
RewardSystem/
├── Core/
│   ├── RewardManager.js       # Central reward distribution logic
│   ├── AchievementTracker.js  # Achievement tracking and unlocking
│   └── MilestoneManager.js    # Progress milestones and celebrations
├── Collectibles/
│   ├── CollectiblesInventory.js # Inventory management
│   ├── RocketParts.js         # Rocket/airplane parts collection
│   └── CustomizationSystem.js # Vehicle customization
├── Feedback/
│   ├── VisualFeedback.js      # Visual reward animations
│   ├── AudioFeedback.js       # Sound effects and celebrations
│   └── HapticFeedback.js      # Device vibration (where supported)
└── Display/
    ├── BadgeDisplay.js        # Visual badge showcase
    ├── AchievementPopup.js    # Achievement notification
    └── RewardAnimation.js     # Reward earning animations
```

### 2. Stars and Badges System

Stars and badges will be awarded for completing lessons and achieving milestones:

- **Star Rating**: 1-3 stars per level based on performance
- **Badge Types**:
  - Completion Badges: For finishing lessons/topics
  - Mastery Badges: For perfect scores
  - Streak Badges: For consistent daily practice
  - Special Badges: For unique achievements

#### Implementation Approach:
- Store badge and star data in user profile
- Create visually appealing badge designs
- Implement badge showcase screen
- Create star earning animations

### 3. Collectible Rocket/Airplane Parts

Players will collect parts to customize their rocket/airplane:

- **Part Categories**:
  - Body parts (fuselage, wings)
  - Engines and boosters
  - Decorative elements (colors, decals)
  - Special features (lights, sounds)

- **Collection Mechanics**:
  - Parts awarded for specific achievements
  - Rarity levels for parts (common to legendary)
  - Set bonuses for collecting related parts

#### Implementation Approach:
- Create visual inventory system
- Implement part attachment logic
- Design customization interface
- Store collected parts in user profile

### 4. Visual and Audio Feedback

Feedback will reinforce achievements and correct answers:

- **Visual Feedback**:
  - Particle effects (stars, confetti)
  - Animated characters celebrating
  - Progress bar fills and pulses
  - Flying objects animations

- **Audio Feedback**:
  - Success sounds and jingles
  - Congratulatory voice messages
  - Achievement fanfares
  - Ambient reward music

#### Implementation Approach:
- Create reusable animation components
- Implement sound effect manager
- Design celebration sequences
- Ensure feedback is age-appropriate

## Data Models

### Reward Item Model

```javascript
{
  id: String,
  name: String,
  description: String,
  type: String, // 'star', 'badge', 'part'
  rarity: String, // 'common', 'rare', 'epic', 'legendary'
  imageAsset: String,
  animationAsset: String,
  soundAsset: String,
  unlockCriteria: {
    achievementId: String,
    scoreRequired: Number,
    levelsCompleted: Array<String>
  }
}
```

### Achievement Model

```javascript
{
  id: String,
  name: String,
  description: String,
  category: String, // 'completion', 'mastery', 'streak', 'special'
  icon: String,
  progress: {
    current: Number,
    target: Number,
    isCompleted: Boolean
  },
  rewards: Array<RewardItem>,
  dateUnlocked: Date
}
```

### Player Rewards Model

```javascript
{
  userId: String,
  totalStars: Number,
  starsByLevel: Object, // levelId: starCount
  badges: Array<{
    badgeId: String,
    dateEarned: Date,
    isNew: Boolean
  }>,
  collectibles: Array<{
    partId: String,
    dateAcquired: Date,
    isEquipped: Boolean,
    position: String // for equipped parts
  }>,
  achievements: Array<Achievement>
}
```

## User Interface Components

### Reward Screen Components

- **StarDisplay**: Shows stars earned per level
- **BadgeGallery**: Displays earned badges with details
- **CollectiblesInventory**: Shows collected parts
- **AchievementList**: Lists all achievements and progress
- **CustomizationWorkshop**: Interface for customizing rocket/airplane

### Feedback Components

- **StarBurst**: Animated star explosion effect
- **BadgeUnlock**: Badge reveal animation
- **PartAcquisition**: New part showcase
- **CelebrationOverlay**: Full-screen celebration effect

## Integration Points

### Game Engine Integration

- Trigger rewards based on game performance
- Update player progress after reward distribution
- Synchronize reward state with game state

### Learning Progress Integration

- Award badges based on learning milestones
- Track vocabulary mastery for achievements
- Reward consistent practice and improvement

### Profile Integration

- Store reward data in user profile
- Display achievements on profile screen
- Support multiple child profiles with separate rewards

## Technical Considerations

### Performance Optimization

- Lazy load reward assets
- Cache frequently used animations
- Optimize particle effects for mobile devices

### Accessibility

- Ensure rewards are perceivable without relying solely on color
- Provide alternative feedback for users with audio/visual impairments
- Consider reduced motion settings for animations

### Testing Strategy

- Unit tests for reward distribution logic
- Visual tests for animations and effects
- User testing with target age group for engagement
