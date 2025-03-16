# Learning Progress Tracking System Design Document

## Overview

This document outlines the design for the NepaliJets learning progress tracking system, which will monitor and report on children's Nepali language learning journey, providing valuable insights for both children and parents.

## Core Components

### 1. Progress Tracking Architecture

The learning progress tracking system will be structured with the following components:

```
LearningProgressSystem/
├── Core/
│   ├── ProgressManager.js       # Central progress tracking logic
│   ├── MetricsCalculator.js     # Statistical analysis of learning data
│   └── ProgressSerializer.js    # Data persistence and retrieval
├── Tracking/
│   ├── VocabularyTracker.js     # Words/phrases learned tracking
│   ├── PronunciationTracker.js  # Pronunciation accuracy metrics
│   ├── SessionTracker.js        # Time spent learning
│   └── AchievementTracker.js    # Achievement records
├── Reporting/
│   ├── ProgressReports.js       # Generate learning reports
│   ├── VisualizationEngine.js   # Data visualization components
│   └── ParentDashboard.js       # Parent-focused reporting
└── Integration/
    ├── GameProgressSync.js      # Sync with game engine
    ├── RewardProgressSync.js    # Sync with reward system
    └── ProfileProgressSync.js   # Sync with user profile
```

### 2. Words/Phrases Learned Tracking

The system will track vocabulary acquisition and retention:

- **Vocabulary Metrics**:
  - Total words/phrases learned
  - Words by category (numbers, colors, animals, etc.)
  - Mastery levels (introduced, practiced, mastered)
  - Retention rates over time

- **Learning Path**:
  - Sequential vocabulary introduction
  - Spaced repetition scheduling
  - Difficulty progression

#### Implementation Approach:
- Create vocabulary database with metadata
- Implement mastery level algorithms
- Design spaced repetition system
- Track word exposure and successful recalls

### 3. Pronunciation Accuracy Metrics

The system will track pronunciation development:

- **Pronunciation Metrics**:
  - Accuracy scores for attempted words
  - Improvement over time
  - Challenging sounds identification
  - Practice recommendations

- **Measurement Methods**:
  - Pattern matching for younger children
  - Audio recording and analysis for older children
  - Simplified feedback appropriate for age group

#### Implementation Approach:
- Implement basic audio recording capabilities
- Create simplified pronunciation scoring
- Design age-appropriate feedback
- Track improvement trends

### 4. Time Spent Learning

The system will monitor engagement and learning time:

- **Time Metrics**:
  - Total time spent in app
  - Time per learning activity
  - Session frequency and duration
  - Optimal learning times identification

- **Engagement Patterns**:
  - Daily/weekly usage patterns
  - Attention span analysis
  - Activity preferences

#### Implementation Approach:
- Implement session tracking
- Create engagement analytics
- Design time visualization tools
- Set age-appropriate learning duration goals

### 5. Achievement Records

The system will maintain comprehensive achievement history:

- **Achievement Metrics**:
  - Completed levels and activities
  - Earned rewards and badges
  - Milestone completions
  - Learning streaks

- **Progress Visualization**:
  - Achievement timelines
  - Milestone maps
  - Comparative progress views

#### Implementation Approach:
- Create achievement database
- Implement progress visualization components
- Design child-friendly progress displays
- Create parent-focused detailed reports

## Data Models

### Learning Progress Model

```javascript
{
  userId: String,
  learningStats: {
    totalWordsLearned: Number,
    totalPhrasesPracticed: Number,
    averagePronunciationScore: Number,
    totalLearningTime: Number, // in minutes
    learningStreak: Number, // consecutive days
    lastSessionDate: Date
  },
  vocabularyProgress: Array<{
    wordId: String,
    exposureCount: Number,
    successfulRecalls: Number,
    lastPracticed: Date,
    masteryLevel: Number, // 0-3 scale
    pronunciationScore: Number // 0-100 scale
  }>,
  sessionHistory: Array<{
    date: Date,
    duration: Number, // in minutes
    activitiesCompleted: Array<String>,
    wordsStudied: Array<String>,
    pointsEarned: Number
  }>,
  achievementProgress: {
    completedLevels: Array<String>,
    earnedBadges: Array<String>,
    completedMilestones: Array<String>
  }
}
```

### Word Mastery Model

```javascript
{
  wordId: String,
  nepaliWord: String,
  englishTranslation: String,
  category: String,
  difficulty: Number,
  masteryLevels: {
    0: "Not Started",
    1: "Introduced",
    2: "Practicing",
    3: "Mastered"
  },
  masteryRequirements: {
    1: { exposures: 1, recalls: 0 },
    2: { exposures: 3, recalls: 1 },
    3: { exposures: 5, recalls: 3, minScore: 70 }
  }
}
```

### Learning Session Model

```javascript
{
  sessionId: String,
  userId: String,
  startTime: Date,
  endTime: Date,
  duration: Number, // in seconds
  activities: Array<{
    activityId: String,
    activityType: String,
    duration: Number,
    wordsStudied: Array<String>,
    performance: {
      correctAnswers: Number,
      totalQuestions: Number,
      averageResponseTime: Number
    }
  }>,
  metrics: {
    focusScore: Number, // estimated engagement level
    progressMade: Number, // new words/concepts introduced
    reviewCompleted: Number // previously learned items reviewed
  }
}
```

## User Interface Components

### Progress Dashboard Components

- **VocabularyProgress**: Visual representation of words learned
- **PronunciationChart**: Shows pronunciation improvement
- **TimeTracker**: Displays learning time statistics
- **AchievementTimeline**: Shows achievement history
- **FocusMetrics**: Visualizes engagement patterns

### Reporting Components

- **ProgressReport**: Generates comprehensive learning reports
- **ParentInsights**: Parent-focused analytics dashboard
- **LearningRecommendations**: Suggests focus areas
- **MilestoneMap**: Visual journey through learning milestones

## Integration Points

### Game Engine Integration

- Record game performance metrics
- Track vocabulary exposure during gameplay
- Measure time spent in learning activities

### Reward System Integration

- Link achievements to learning progress
- Trigger rewards based on learning milestones
- Track reward history as part of progress

### Profile Integration

- Store learning progress in user profile
- Support multiple child profiles with separate tracking
- Provide parent access to child progress data

## Technical Considerations

### Data Privacy

- Ensure child data is protected and private
- Implement appropriate data retention policies
- Provide parental controls for data sharing

### Performance Optimization

- Optimize data storage for frequent updates
- Implement efficient querying for reports
- Balance tracking granularity with performance

### Offline Support

- Cache progress data for offline use
- Implement synchronization when connection restored
- Prevent data loss during connectivity issues

### Testing Strategy

- Unit tests for tracking algorithms
- Integration tests for data persistence
- Usability testing with parents and children
