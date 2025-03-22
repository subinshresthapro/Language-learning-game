# Module 3: Nepali Language Content

This document provides comprehensive documentation for Module 3 of the NepaliJets language learning game app for children aged 4-7 who are native English speakers. Module 3 focuses on implementing the Nepali language content structure, pronunciation guides, learning algorithms, and integration with the game engine.

## Table of Contents

1. [Overview](#overview)
2. [Content Structure](#content-structure)
3. [Thematic Units](#thematic-units)
4. [Pronunciation System](#pronunciation-system)
5. [Learning Algorithms](#learning-algorithms)
6. [Game Integration](#game-integration)
7. [Usage Guide](#usage-guide)
8. [File Structure](#file-structure)

## Overview

Module 3 builds upon the foundation established in Modules 1 and 2 by adding comprehensive Nepali language content organized into thematic units. The content is designed to be age-appropriate for children aged 4-7, with difficulty levels that adapt to the learner's progress. The module includes:

- A robust database schema for storing and retrieving language content
- Five thematic units with vocabulary, phrases, grammar points, and pronunciation guides
- Audio components and visual pronunciation guides
- Learning progression algorithms including spaced repetition
- Integration with the game engine to connect language content with game mechanics

All content is designed to integrate with the rocket/airplane theme established in previous modules, creating a cohesive learning experience.

## Content Structure

### Models

The language content is structured using the following models:

#### VocabularyItem

Represents a single Nepali word with its translations, pronunciation, examples, and metadata.

```javascript
{
  id: 'greeting_01',
  nepaliWord: 'नमस्ते',
  englishTranslation: 'Hello',
  pronunciation: 'namaste',
  phoneticGuide: 'na-mas-te',
  audioFile: 'namaste.mp3',
  imageAsset: 'greeting_hello.png',
  category: 'greetings',
  difficulty: 'level_1',
  examples: [
    'नमस्ते, तपाईंलाई कस्तो छ? (Hello, how are you?)',
    'नमस्ते, मेरो नाम राम हो। (Hello, my name is Ram.)'
  ],
  tags: ['greeting', 'basic', 'formal']
}
```

#### Phrase

Represents a complete Nepali phrase or sentence with translations, context, and related vocabulary.

```javascript
{
  id: 'phrase_greeting_01',
  nepaliPhrase: 'तपाईंलाई कस्तो छ?',
  englishTranslation: 'How are you?',
  pronunciation: 'tapaaĩlaai kasto chha',
  phoneticGuide: 'ta-paa-ĩ-laa-i kas-to chha',
  audioFile: 'tapaaĩlaai_kasto_chha.mp3',
  imageAsset: 'phrase_howareyou.png',
  category: 'greetings',
  difficulty: 'level_1',
  context: 'Asking about someone\'s wellbeing',
  vocabularyWords: ['greeting_02', 'question_01'],
  grammarPoints: ['grammar_question_01']
}
```

#### GrammarPoint

Explains a grammatical pattern or rule in Nepali with examples.

```javascript
{
  id: 'grammar_question_01',
  title: 'Question Formation: "कस्तो" (kasto)',
  nepaliPattern: '[Subject] लाई कस्तो छ?',
  englishExplanation: 'The question word "कस्तो" (kasto) means "how" and is used to ask about state or condition.',
  difficulty: 'level_1',
  examples: [
    'तपाईंलाई कस्तो छ? (How are you?)',
    'तिमीलाई कस्तो छ? (How are you? - informal)'
  ]
}
```

#### PronunciationGuide

Provides detailed guidance on pronouncing specific Nepali words.

```javascript
{
  id: 'pron_guide_01',
  word: 'नमस्ते',
  phoneticRepresentation: 'namaste',
  syllableBreakdown: ['न', 'म', 'स्', 'ते'],
  audioFile: 'namaste_guide.mp3',
  pronunciationTips: [
    'The "n" is pronounced as in English',
    'The "ma" syllable is pronounced with a short "a" sound',
    'The "s" is slightly aspirated',
    'The "te" is pronounced with a soft "t" sound'
  ]
}
```

#### ThematicUnit

Organizes related vocabulary, phrases, and grammar points into cohesive learning units.

```javascript
{
  id: 'unit_greetings',
  title: 'Greetings and Basic Expressions',
  description: 'Learn common Nepali greetings and basic expressions for everyday conversations.',
  difficulty: 'level_1',
  category: 'greetings',
  vocabularyItems: ['greeting_01', 'greeting_02', ...],
  phrases: ['phrase_greeting_01', 'phrase_greeting_02', ...],
  grammarPoints: ['grammar_question_01', ...],
  learningObjectives: [
    'Greet people in Nepali',
    'Introduce yourself in Nepali',
    'Ask and answer basic questions about wellbeing'
  ],
  rocketThemeConnection: 'Greet fellow astronauts and mission control in Nepali as you prepare for your rocket journey!',
  completionCriteria: {
    vocabularyMastery: 80,
    phraseMastery: 70,
    quizScore: 70
  }
}
```

### Difficulty Levels

Content is organized into three difficulty levels appropriate for children aged 4-7:

- **Level 1**: Basic words and phrases, simple sentence structures
- **Level 2**: Intermediate vocabulary, more complex sentence patterns
- **Level 3**: Advanced vocabulary, longer phrases, and more complex grammar

## Thematic Units

Module 3 includes five thematic units, each containing 10-15 words/phrases:

### Unit 1: Greetings and Basic Expressions

Basic greetings, introductions, and everyday expressions in Nepali.

**Sample vocabulary**:
- नमस्ते (namaste) - Hello
- धन्यवाद (dhanyavaad) - Thank you
- माफ गर्नुहोस् (maaph garnuhos) - Excuse me/Sorry

**Rocket theme connection**: Greet fellow astronauts and mission control in Nepali as you prepare for your rocket journey!

### Unit 2: Colors and Shapes

Colors, shapes, and descriptive words in Nepali.

**Sample vocabulary**:
- रातो (raato) - Red
- निलो (nilo) - Blue
- गोलो (golo) - Circle
- वर्ग (barga) - Square

**Rocket theme connection**: Colors and shapes help rockets stand out in the sky! Learn to describe your rocket using different colors and shapes to make it unique.

### Unit 3: Numbers and Counting

Numbers 1-10, counting words, and basic mathematical expressions.

**Sample vocabulary**:
- एक (ek) - One
- दुई (dui) - Two
- गन्ती (ganti) - Counting
- कति (kati) - How many

**Rocket theme connection**: Counting down for rocket launch! Learn numbers in Nepali to help your rocket blast off into space. 10, 9, 8... दश, नौ, आठ...

### Unit 4: Family Members

Family relationships and home-related vocabulary.

**Sample vocabulary**:
- आमा (aama) - Mother
- बुबा (buba) - Father
- परिवार (parivaar) - Family
- घर (ghar) - Home/House

**Rocket theme connection**: Just like a rocket needs a launch team, you have a family team supporting you! Learn to introduce your mission control center - your family - in Nepali.

### Unit 5: Animals and Nature

Common animals, natural elements, and environmental vocabulary.

**Sample vocabulary**:
- कुकुर (kukur) - Dog
- बिरालो (biralo) - Cat
- आकाश (aakaash) - Sky
- सूर्य (surya) - Sun

**Rocket theme connection**: As your rocket soars through the sky, you'll see animals and nature below! Learn to describe the beautiful world your rocket flies over in Nepali.

## Pronunciation System

The pronunciation system includes:

1. **Phonetic Guides**: Simplified phonetic representations of Nepali words using English characters
2. **Syllable Breakdown**: Division of words into syllables for easier pronunciation
3. **Audio Components**: High-quality audio recordings of Nepali words and phrases
4. **Pronunciation Tips**: Specific guidance on challenging sounds in Nepali

The `pronunciationService.js` handles audio playback and provides methods for:
- Loading and playing audio files
- Comparing user pronunciation with correct pronunciation
- Providing feedback on pronunciation accuracy

## Learning Algorithms

### Spaced Repetition System

The spaced repetition system schedules reviews of vocabulary and phrases based on the learner's performance. Items that are more difficult for the learner are reviewed more frequently, while well-known items are reviewed less often.

```javascript
// Example scheduling algorithm
const calculateNextReviewInterval = (currentInterval, performance) => {
  // performance is rated 0-5, with 5 being perfect recall
  if (performance < 3) {
    return 1; // Review again in 1 day
  } else {
    return currentInterval * (0.5 + (performance / 5)); // Increase interval based on performance
  }
};
```

### Difficulty Scaling

The difficulty scaling system adjusts the difficulty of content based on the learner's performance:

- If a learner consistently performs well, more challenging content is introduced
- If a learner struggles, easier content is provided for reinforcement
- The system maintains an optimal challenge level to keep learners engaged

### Adaptive Learning Paths

The adaptive learning path algorithm creates personalized learning sequences for each user:

1. Analyzes user performance across different content types
2. Identifies strengths and areas for improvement
3. Prioritizes content that addresses gaps in knowledge
4. Balances new content with review of previously learned material
5. Adapts to changing performance patterns over time

## Game Integration

Module 3 integrates the language content with the game engine through:

### ContentIntegration.js

Connects language content to game mechanics:
- Maps thematic units to game levels
- Generates learning activities from content
- Processes activity completion and updates progress
- Calculates rewards based on performance

### GameContentTransitions.js

Manages transitions between game elements and educational content:
- Handles loading and management of language content
- Provides smooth animations between game and learning activities
- Visualizes learning progress as a rocket journey
- Manages content caching for performance optimization

### ContentIntegrationTests.js

Tests the integration of content with game components:
- Verifies proper initialization of content systems
- Tests content loading and activity generation
- Validates progress tracking and reward calculations
- Ensures proper functioning of transitions and animations

## Usage Guide

### Loading Content

```javascript
// Initialize content integration
import ContentIntegration from './data/integration/ContentIntegration';
import { LevelManager } from './components/game/LevelManager';
import { RewardSystem } from './components/rewards/RewardSystem';
import { LearningProgressTracker } from './components/learning/LearningProgressTracker';

// Initialize components
const levelManager = new LevelManager();
const rewardSystem = new RewardSystem();
const learningProgressTracker = new LearningProgressTracker();
const userProgress = await getUserProgress(); // Load from storage

// Initialize content integration
ContentIntegration.initialize(
  levelManager,
  rewardSystem,
  learningProgressTracker,
  userProgress
);

// Load content for a specific level
const levelContent = ContentIntegration.loadLevelContent(0); // Level index
```

### Generating Activities

```javascript
// Generate learning activities
const activities = ContentIntegration.generateLearningActivities(5); // Number of activities

// Use activities in game
activities.forEach(activity => {
  // Render activity in game UI
  renderActivity(activity);
});
```

### Processing Activity Completion

```javascript
// When user completes an activity
const activityResults = {
  score: 85, // 0-100 score
  itemResults: [
    {
      item: vocabularyItem,
      performance: 4 // 0-5 rating
    },
    // More item results...
  ]
};

// Process completion and get updates
const updates = ContentIntegration.processActivityCompletion(activity, activityResults);

// Apply updates
updateUserInterface(updates.rewards);
updateProgressDisplay(updates.unitProgress);
```

### Using Transitions

```javascript
import { GameToLearningTransition } from './data/integration/GameContentTransitions';

// In a React component
const [showLearning, setShowLearning] = useState(false);

// Render transition
<GameToLearningTransition
  isVisible={showLearning}
  onTransitionComplete={() => console.log('Transition complete')}
>
  <LearningActivity activity={currentActivity} />
</GameToLearningTransition>
```

## File Structure

```
src/
├── models/
│   └── LanguageContent.js       # Content data models
├── services/
│   ├── content/
│   │   └── contentService.js    # Content storage and retrieval
│   ├── pronunciation/
│   │   └── pronunciationService.js # Audio and pronunciation
│   └── learning/
│       └── learningAlgorithms.js # Learning progression algorithms
├── data/
│   ├── thematicUnits/
│   │   ├── Unit1_Greetings.js   # Greetings unit content
│   │   ├── Unit2_ColorsShapes.js # Colors and shapes unit
│   │   ├── Unit3_Numbers.js     # Numbers and counting unit
│   │   ├── Unit4_Family.js      # Family members unit
│   │   └── Unit5_AnimalsNature.js # Animals and nature unit
│   └── integration/
│       ├── ContentIntegration.js # Game-content integration
│       ├── GameContentTransitions.js # UI transitions
│       └── ContentIntegrationTests.js # Integration tests
└── assets/
    ├── audio/                   # Audio files for pronunciation
    └── images/                  # Images for vocabulary items
```

---

This documentation provides a comprehensive overview of Module 3 of the NepaliJets language learning game app. For implementation details, please refer to the code and comments in the respective files.
