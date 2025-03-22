/**
 * Unit2_ColorsShapes.js
 * 
 * Thematic unit for colors and shapes in Nepali
 * Designed for children aged 4-7 who are native English speakers
 */

import { 
  VocabularyItem, 
  Phrase, 
  GrammarPoint, 
  ThematicUnit, 
  PronunciationGuide,
  DIFFICULTY_LEVELS
} from '../../models/LanguageContent';

// Vocabulary Items - Colors
const colorVocabularyItems = [
  new VocabularyItem({
    id: 'color_01',
    nepaliWord: 'रातो',
    englishTranslation: 'Red',
    pronunciation: 'raato',
    phoneticGuide: 'raa-to',
    audioFile: 'raato.mp3',
    imageAsset: 'color_red.png',
    category: 'colors',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'यो फूल रातो छ। (This flower is red.)',
      'मलाई रातो रङ मन पर्छ। (I like the color red.)'
    ],
    tags: ['color', 'basic', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'color_02',
    nepaliWord: 'निलो',
    englishTranslation: 'Blue',
    pronunciation: 'nilo',
    phoneticGuide: 'ni-lo',
    audioFile: 'nilo.mp3',
    imageAsset: 'color_blue.png',
    category: 'colors',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'आकाश निलो छ। (The sky is blue.)',
      'मेरो निलो कलम छ। (I have a blue pen.)'
    ],
    tags: ['color', 'basic', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'color_03',
    nepaliWord: 'पहेंलो',
    englishTranslation: 'Yellow',
    pronunciation: 'pahelo',
    phoneticGuide: 'pa-he-lo',
    audioFile: 'pahelo.mp3',
    imageAsset: 'color_yellow.png',
    category: 'colors',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'यो केरा पहेंलो छ। (This banana is yellow.)',
      'सूर्य पहेंलो छ। (The sun is yellow.)'
    ],
    tags: ['color', 'basic', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'color_04',
    nepaliWord: 'हरियो',
    englishTranslation: 'Green',
    pronunciation: 'hariyo',
    phoneticGuide: 'ha-ri-yo',
    audioFile: 'hariyo.mp3',
    imageAsset: 'color_green.png',
    category: 'colors',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'घाँस हरियो छ। (The grass is green.)',
      'यो पात हरियो छ। (This leaf is green.)'
    ],
    tags: ['color', 'basic', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'color_05',
    nepaliWord: 'कालो',
    englishTranslation: 'Black',
    pronunciation: 'kaalo',
    phoneticGuide: 'kaa-lo',
    audioFile: 'kaalo.mp3',
    imageAsset: 'color_black.png',
    category: 'colors',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरो कपाल कालो छ। (My hair is black.)',
      'यो कालो कार हो। (This is a black car.)'
    ],
    tags: ['color', 'basic', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'color_06',
    nepaliWord: 'सेतो',
    englishTranslation: 'White',
    pronunciation: 'seto',
    phoneticGuide: 'se-to',
    audioFile: 'seto.mp3',
    imageAsset: 'color_white.png',
    category: 'colors',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'हिउँ सेतो छ। (Snow is white.)',
      'यो सेतो कमिज हो। (This is a white shirt.)'
    ],
    tags: ['color', 'basic', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'color_07',
    nepaliWord: 'सुन्तला',
    englishTranslation: 'Orange',
    pronunciation: 'suntala',
    phoneticGuide: 'sun-ta-la',
    audioFile: 'suntala.mp3',
    imageAsset: 'color_orange.png',
    category: 'colors',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'यो सुन्तला रङको फल हो। (This is an orange-colored fruit.)',
      'मेरो सुन्तला रङको जुत्ता छ। (I have orange shoes.)'
    ],
    tags: ['color', 'intermediate', 'everyday']
  })
];

// Vocabulary Items - Shapes
const shapeVocabularyItems = [
  new VocabularyItem({
    id: 'shape_01',
    nepaliWord: 'गोलो',
    englishTranslation: 'Circle',
    pronunciation: 'golo',
    phoneticGuide: 'go-lo',
    audioFile: 'golo.mp3',
    imageAsset: 'shape_circle.png',
    category: 'shapes',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'यो गोलो आकार हो। (This is a circular shape.)',
      'बल गोलो छ। (The ball is round.)'
    ],
    tags: ['shape', 'basic', 'geometry']
  }),
  
  new VocabularyItem({
    id: 'shape_02',
    nepaliWord: 'वर्ग',
    englishTranslation: 'Square',
    pronunciation: 'barga',
    phoneticGuide: 'bar-ga',
    audioFile: 'barga.mp3',
    imageAsset: 'shape_square.png',
    category: 'shapes',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'यो वर्ग आकार हो। (This is a square shape.)',
      'यो बक्स वर्ग आकारको छ। (This box is square-shaped.)'
    ],
    tags: ['shape', 'basic', 'geometry']
  }),
  
  new VocabularyItem({
    id: 'shape_03',
    nepaliWord: 'त्रिभुज',
    englishTranslation: 'Triangle',
    pronunciation: 'tribhuj',
    phoneticGuide: 'tri-bhuj',
    audioFile: 'tribhuj.mp3',
    imageAsset: 'shape_triangle.png',
    category: 'shapes',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'यो त्रिभुज आकार हो। (This is a triangular shape.)',
      'त्रिभुजको तीन कोण हुन्छन्। (A triangle has three angles.)'
    ],
    tags: ['shape', 'intermediate', 'geometry']
  }),
  
  new VocabularyItem({
    id: 'shape_04',
    nepaliWord: 'आयत',
    englishTranslation: 'Rectangle',
    pronunciation: 'aayat',
    phoneticGuide: 'aa-yat',
    audioFile: 'aayat.mp3',
    imageAsset: 'shape_rectangle.png',
    category: 'shapes',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'यो आयत आकार हो। (This is a rectangular shape.)',
      'किताब आयत आकारको छ। (The book is rectangular.)'
    ],
    tags: ['shape', 'intermediate', 'geometry']
  }),
  
  new VocabularyItem({
    id: 'shape_05',
    nepaliWord: 'तारा',
    englishTranslation: 'Star',
    pronunciation: 'taaraa',
    phoneticGuide: 'taa-raa',
    audioFile: 'taaraa.mp3',
    imageAsset: 'shape_star.png',
    category: 'shapes',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'आकाशमा तारा छन्। (There are stars in the sky.)',
      'यो तारा आकार हो। (This is a star shape.)'
    ],
    tags: ['shape', 'basic', 'astronomy']
  }),
  
  new VocabularyItem({
    id: 'shape_06',
    nepaliWord: 'हृदय',
    englishTranslation: 'Heart',
    pronunciation: 'hriday',
    phoneticGuide: 'hri-day',
    audioFile: 'hriday.mp3',
    imageAsset: 'shape_heart.png',
    category: 'shapes',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'यो हृदय आकार हो। (This is a heart shape.)',
      'मैले हृदय आकारको चिनो बनाएँ। (I made a heart-shaped symbol.)'
    ],
    tags: ['shape', 'intermediate', 'emotion']
  })
];

// Combine vocabulary items
const vocabularyItems = [...colorVocabularyItems, ...shapeVocabularyItems];

// Phrases
const phrases = [
  new Phrase({
    id: 'phrase_color_01',
    nepaliPhrase: 'यो के रङ हो?',
    englishTranslation: 'What color is this?',
    pronunciation: 'yo ke rang ho',
    phoneticGuide: 'yo ke rang ho',
    audioFile: 'yo_ke_rang_ho.mp3',
    imageAsset: 'phrase_whatcolor.png',
    category: 'colors',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Asking about colors',
    vocabularyWords: [],
    grammarPoints: ['grammar_color_01']
  }),
  
  new Phrase({
    id: 'phrase_color_02',
    nepaliPhrase: 'यो ____ रङ हो।',
    englishTranslation: 'This is ____ color.',
    pronunciation: 'yo ____ rang ho',
    phoneticGuide: 'yo ____ rang ho',
    audioFile: 'yo_rang_ho.mp3',
    imageAsset: 'phrase_thiscolor.png',
    category: 'colors',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Identifying colors',
    vocabularyWords: colorVocabularyItems.map(item => item.id),
    grammarPoints: ['grammar_color_01']
  }),
  
  new Phrase({
    id: 'phrase_color_03',
    nepaliPhrase: 'मलाई ____ रङ मन पर्छ।',
    englishTranslation: 'I like ____ color.',
    pronunciation: 'malaai ____ rang man parchha',
    phoneticGuide: 'ma-laa-i ____ rang man par-chha',
    audioFile: 'malaai_rang_man_parchha.mp3',
    imageAsset: 'phrase_likecolor.png',
    category: 'colors',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Expressing color preferences',
    vocabularyWords: colorVocabularyItems.map(item => item.id),
    grammarPoints: ['grammar_color_02']
  }),
  
  new Phrase({
    id: 'phrase_shape_01',
    nepaliPhrase: 'यो के आकार हो?',
    englishTranslation: 'What shape is this?',
    pronunciation: 'yo ke aakaar ho',
    phoneticGuide: 'yo ke aa-kaar ho',
    audioFile: 'yo_ke_aakaar_ho.mp3',
    imageAsset: 'phrase_whatshape.png',
    category: 'shapes',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Asking about shapes',
    vocabularyWords: [],
    grammarPoints: ['grammar_shape_01']
  }),
  
  new Phrase({
    id: 'phrase_shape_02',
    nepaliPhrase: 'यो ____ आकार हो।',
    englishTranslation: 'This is a ____ shape.',
    pronunciation: 'yo ____ aakaar ho',
    phoneticGuide: 'yo ____ aa-kaar ho',
    audioFile: 'yo_aakaar_ho.mp3',
    imageAsset: 'phrase_thisshape.png',
    category: 'shapes',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Identifying shapes',
    vocabularyWords: shapeVocabularyItems.map(item => item.id),
    grammarPoints: ['grammar_shape_01']
  }),
  
  new Phrase({
    id: 'phrase_colorshape_01',
    nepaliPhrase: 'यो ____ रङको ____ हो।',
    englishTranslation: 'This is a ____ colored ____.',
    pronunciation: 'yo ____ rangko ____ ho',
    phoneticGuide: 'yo ____ rang-ko ____ ho',
    audioFile: 'yo_rangko_ho.mp3',
    imageAsset: 'phrase_coloredshape.png',
    category: 'colors',
    subcategory: 'shapes',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Describing colored shapes',
    vocabularyWords: [...colorVocabularyItems.map(item => item.id), ...shapeVocabularyItems.map(item => item.id)],
    grammarPoints: ['grammar_color_03']
  })
];

// Grammar Points
const grammarPoints = [
  new GrammarPoint({
    id: 'grammar_color_01',
    title: 'Color Descriptions: "X रङ" (X rang)',
    nepaliPattern: '[Color] रङ',
    englishExplanation: 'In Nepali, colors are described using the word "रङ" (rang) which means "color". The color adjective comes before the word "रङ".',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'रातो रङ (Red color)',
      'निलो रङ (Blue color)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_color_02',
    title: 'Expressing Preferences: "मलाई X मन पर्छ" (malaai X man parchha)',
    nepaliPattern: 'मलाई [Object] मन पर्छ।',
    englishExplanation: 'The pattern "मलाई X मन पर्छ" is used to express "I like X". Literally, it translates to "X is pleasing to me".',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'मलाई रातो रङ मन पर्छ। (I like the color red.)',
      'मलाई खेल्न मन पर्छ। (I like to play.)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_color_03',
    title: 'Possessive Case: "X को Y" (X ko Y)',
    nepaliPattern: '[Noun 1] को [Noun 2]',
    englishExplanation: 'The possessive case in Nepali is formed using "को" (ko) between two nouns, indicating that the first noun possesses or is related to the second noun.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'रातो रङको बल (A red-colored ball)',
      'निलो रङको आकाश (Blue-colored sky)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_shape_01',
    title: 'Shape Descriptions: "X आकार" (X aakaar)',
    nepaliPattern: '[Shape] आकार',
    englishExplanation: 'In Nepali, shapes are described using the word "आकार" (aakaar) which means "shape". The shape noun comes before the word "आकार".',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'गोलो आकार (Circular shape)',
      'वर्ग आकार (Square shape)'
    ]
  })
];

// Pronunciation Guides
const pronunciationGuides = [
  new PronunciationGuide({
    id: 'pron_guide_color_01',
    word: 'रातो',
    phoneticRepresentation: 'raato',
    syllableBreakdown: ['रा', 'तो'],
    audioFile: 'raato_guide.mp3',
    pronunciationTips: [
      'The "r" is slightly rolled',
      'The "aa" sound is long, like in "father"',
      'The "to" is pronounced with a short "o" sound'
    ]
  }),
  
  new PronunciationGuide({
    id: 'pron_guide_color_02',
    word: 'निलो',
    phoneticRepresentation: 'nilo',
    syllableBreakdown: ['नि', 'लो'],
    audioFile: 'nilo_guide.mp3',
    pronunciationTips: [
      'The "ni" is pronounced with a short "i" sound, like in "bit"',
      'The "lo" is pronounced with a short "o" sound'
    ]
  }),
  
  new PronunciationGuide({
    id: 'pron_guide_shape_01',
    word: 'गोलो',
    phoneticRepresentation: 'golo',
    syllableBreakdown: ['गो', 'लो'],
    audioFile: 'golo_guide.mp3',
    pronunciationTips: [
      'The "go" is pronounced with a short "o" sound',
      'The "lo" is also pronounced with a short "o" sound'
    ]
  })
];

// Create Thematic Unit
const colorsShapesUnit = new ThematicUnit({
  id: 'unit_colors_shapes',
  title: 'Colors and Shapes',
  description: 'Learn Nepali words for colors and shapes, and how to describe objects using these attributes.',
  difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
  category: 'colors_shapes',
  vocabularyItems: vocabularyItems.map(item => item.id),
  phrases: phrases.map(phrase => phrase.id),
  grammarPoints: grammarPoints.map(point => point.id),
  learningObjectives: [
    'Identify and name common colors in Nepali',
    'Identify and name basic shapes in Nepali',
    'Ask and answer questions about colors and shapes',
    'Describe objects using color and shape attributes',
    'Express preferences for different colors'
  ],
  rocketThemeConnection: 'Colors and shapes help rockets stand out in the sky! Learn to describe your rocket using different colors and shapes to make it unique.',
  completionCriteria: {
    vocabularyMastery: 80,
    phraseMastery: 70,
    quizScore: 70
  }
});

// Export all content
export const UNIT_COLORS_SHAPES = {
  unit: colorsShapesUnit,
  vocabularyItems,
  phrases,
  grammarPoints,
  pronunciationGuides
};

export default UNIT_COLORS_SHAPES;
