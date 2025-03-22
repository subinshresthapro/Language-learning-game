/**
 * LanguageContent.js
 * 
 * Data models for Nepali language content in the NepaliJets app
 * Defines structures for vocabulary, phrases, grammar, and pronunciation
 */

/**
 * VocabularyItem Model
 * Represents a single vocabulary word or term
 */
export class VocabularyItem {
  constructor({
    id,
    nepaliWord,
    englishTranslation,
    pronunciation,
    phoneticGuide,
    audioFile,
    imageAsset,
    category,
    subcategory = null,
    difficulty,
    examples = [],
    relatedWords = [],
    tags = [],
    mastered = false,
    lastPracticed = null,
    practiceCount = 0,
    correctCount = 0
  }) {
    this.id = id;
    this.nepaliWord = nepaliWord;
    this.englishTranslation = englishTranslation;
    this.pronunciation = pronunciation;
    this.phoneticGuide = phoneticGuide;
    this.audioFile = audioFile;
    this.imageAsset = imageAsset;
    this.category = category;
    this.subcategory = subcategory;
    this.difficulty = difficulty;
    this.examples = examples;
    this.relatedWords = relatedWords;
    this.tags = tags;
    this.mastered = mastered;
    this.lastPracticed = lastPracticed;
    this.practiceCount = practiceCount;
    this.correctCount = correctCount;
  }
}

/**
 * Phrase Model
 * Represents a complete phrase or sentence
 */
export class Phrase {
  constructor({
    id,
    nepaliPhrase,
    englishTranslation,
    pronunciation,
    phoneticGuide,
    audioFile,
    imageAsset,
    category,
    difficulty,
    context,
    vocabularyWords = [],
    grammarPoints = [],
    culturalNotes = null,
    mastered = false,
    lastPracticed = null,
    practiceCount = 0,
    correctCount = 0
  }) {
    this.id = id;
    this.nepaliPhrase = nepaliPhrase;
    this.englishTranslation = englishTranslation;
    this.pronunciation = pronunciation;
    this.phoneticGuide = phoneticGuide;
    this.audioFile = audioFile;
    this.imageAsset = imageAsset;
    this.category = category;
    this.difficulty = difficulty;
    this.context = context;
    this.vocabularyWords = vocabularyWords;
    this.grammarPoints = grammarPoints;
    this.culturalNotes = culturalNotes;
    this.mastered = mastered;
    this.lastPracticed = lastPracticed;
    this.practiceCount = practiceCount;
    this.correctCount = correctCount;
  }
}

/**
 * GrammarPoint Model
 * Represents a grammar rule or pattern
 */
export class GrammarPoint {
  constructor({
    id,
    title,
    nepaliPattern,
    englishExplanation,
    difficulty,
    examples = [],
    relatedPoints = [],
    mastered = false,
    lastPracticed = null,
    practiceCount = 0,
    correctCount = 0
  }) {
    this.id = id;
    this.title = title;
    this.nepaliPattern = nepaliPattern;
    this.englishExplanation = englishExplanation;
    this.difficulty = difficulty;
    this.examples = examples;
    this.relatedPoints = relatedPoints;
    this.mastered = mastered;
    this.lastPracticed = lastPracticed;
    this.practiceCount = practiceCount;
    this.correctCount = correctCount;
  }
}

/**
 * ThematicUnit Model
 * Represents a collection of related content organized by theme
 */
export class ThematicUnit {
  constructor({
    id,
    title,
    description,
    difficulty,
    category,
    vocabularyItems = [],
    phrases = [],
    grammarPoints = [],
    learningObjectives = [],
    rocketThemeConnection,
    completionCriteria,
    unlocked = false,
    completed = false,
    progress = 0
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.difficulty = difficulty;
    this.category = category;
    this.vocabularyItems = vocabularyItems;
    this.phrases = phrases;
    this.grammarPoints = grammarPoints;
    this.learningObjectives = learningObjectives;
    this.rocketThemeConnection = rocketThemeConnection;
    this.completionCriteria = completionCriteria;
    this.unlocked = unlocked;
    this.completed = completed;
    this.progress = progress;
  }
}

/**
 * PronunciationGuide Model
 * Represents detailed pronunciation information for a word or phrase
 */
export class PronunciationGuide {
  constructor({
    id,
    word,
    phoneticRepresentation,
    syllableBreakdown = [],
    audioFile,
    mouthShapeImages = [],
    pronunciationTips = [],
    commonErrors = []
  }) {
    this.id = id;
    this.word = word;
    this.phoneticRepresentation = phoneticRepresentation;
    this.syllableBreakdown = syllableBreakdown;
    this.audioFile = audioFile;
    this.mouthShapeImages = mouthShapeImages;
    this.pronunciationTips = pronunciationTips;
    this.commonErrors = commonErrors;
  }
}

/**
 * LearningPath Model
 * Represents a sequence of content for progressive learning
 */
export class LearningPath {
  constructor({
    id,
    title,
    description,
    targetAgeRange,
    units = [],
    prerequisites = [],
    estimatedCompletionTime,
    rocketJourneyMap,
    currentPosition = 0,
    unlocked = false,
    completed = false
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.targetAgeRange = targetAgeRange;
    this.units = units;
    this.prerequisites = prerequisites;
    this.estimatedCompletionTime = estimatedCompletionTime;
    this.rocketJourneyMap = rocketJourneyMap;
    this.currentPosition = currentPosition;
    this.unlocked = unlocked;
    this.completed = completed;
  }
}

/**
 * UserProgress Model
 * Tracks user progress through language content
 */
export class UserProgress {
  constructor({
    userId,
    vocabularyProgress = {},
    phraseProgress = {},
    grammarProgress = {},
    unitProgress = {},
    pathProgress = {},
    lastSession = null,
    totalLearningTime = 0,
    streakDays = 0,
    lastStreakDate = null
  }) {
    this.userId = userId;
    this.vocabularyProgress = vocabularyProgress;
    this.phraseProgress = phraseProgress;
    this.grammarProgress = grammarProgress;
    this.unitProgress = unitProgress;
    this.pathProgress = pathProgress;
    this.lastSession = lastSession;
    this.totalLearningTime = totalLearningTime;
    this.streakDays = streakDays;
    this.lastStreakDate = lastStreakDate;
  }
}

/**
 * Difficulty levels for content
 * Mapped to age-appropriate ranges for children 4-7
 */
export const DIFFICULTY_LEVELS = {
  LEVEL_1: {
    id: 1,
    name: 'Beginner',
    description: 'Simple words and phrases for ages 4-5',
    targetAge: '4-5',
    wordComplexity: 'Simple, concrete nouns and basic verbs',
    sentenceLength: '2-3 words',
    vocabularySize: '5-10 words per unit'
  },
  LEVEL_2: {
    id: 2,
    name: 'Elementary',
    description: 'Basic sentences and common phrases for ages 5-6',
    targetAge: '5-6',
    wordComplexity: 'Common nouns, verbs, and simple adjectives',
    sentenceLength: '3-5 words',
    vocabularySize: '10-12 words per unit'
  },
  LEVEL_3: {
    id: 3,
    name: 'Intermediate',
    description: 'More complex sentences and vocabulary for ages 6-7',
    targetAge: '6-7',
    wordComplexity: 'Expanded vocabulary with some abstract concepts',
    sentenceLength: '5-7 words',
    vocabularySize: '12-15 words per unit'
  }
};

/**
 * Content categories
 */
export const CONTENT_CATEGORIES = {
  GREETINGS: 'greetings',
  COLORS: 'colors',
  SHAPES: 'shapes',
  NUMBERS: 'numbers',
  FAMILY: 'family',
  ANIMALS: 'animals',
  FOOD: 'food',
  BODY: 'body',
  CLOTHING: 'clothing',
  WEATHER: 'weather',
  NATURE: 'nature',
  TRANSPORTATION: 'transportation',
  ACTIONS: 'actions',
  FEELINGS: 'feelings',
  TIME: 'time',
  SCHOOL: 'school',
  HOUSE: 'house',
  TOYS: 'toys'
};

export default {
  VocabularyItem,
  Phrase,
  GrammarPoint,
  ThematicUnit,
  PronunciationGuide,
  LearningPath,
  UserProgress,
  DIFFICULTY_LEVELS,
  CONTENT_CATEGORIES
};
