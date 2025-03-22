/**
 * Unit5_AnimalsNature.js
 * 
 * Thematic unit for animals and nature in Nepali
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

// Vocabulary Items - Animals
const animalVocabularyItems = [
  new VocabularyItem({
    id: 'animal_01',
    nepaliWord: 'कुकुर',
    englishTranslation: 'Dog',
    pronunciation: 'kukur',
    phoneticGuide: 'ku-kur',
    audioFile: 'kukur.mp3',
    imageAsset: 'animal_dog.png',
    category: 'animals',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरो कुकुर धेरै रमाइलो छ। (My dog is very playful.)',
      'कुकुर भुक्छ। (The dog barks.)'
    ],
    tags: ['animal', 'pet', 'domestic']
  }),
  
  new VocabularyItem({
    id: 'animal_02',
    nepaliWord: 'बिरालो',
    englishTranslation: 'Cat',
    pronunciation: 'biralo',
    phoneticGuide: 'bi-ra-lo',
    audioFile: 'biralo.mp3',
    imageAsset: 'animal_cat.png',
    category: 'animals',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'बिरालो दूध पिउँछ। (The cat drinks milk.)',
      'मेरो बिरालो कालो छ। (My cat is black.)'
    ],
    tags: ['animal', 'pet', 'domestic']
  }),
  
  new VocabularyItem({
    id: 'animal_03',
    nepaliWord: 'हात्ती',
    englishTranslation: 'Elephant',
    pronunciation: 'haatti',
    phoneticGuide: 'haat-ti',
    audioFile: 'haatti.mp3',
    imageAsset: 'animal_elephant.png',
    category: 'animals',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'हात्ती एक ठूलो जनावर हो। (The elephant is a big animal.)',
      'हात्तीको लामो सुँड हुन्छ। (The elephant has a long trunk.)'
    ],
    tags: ['animal', 'wild', 'large']
  }),
  
  new VocabularyItem({
    id: 'animal_04',
    nepaliWord: 'माछा',
    englishTranslation: 'Fish',
    pronunciation: 'maachaa',
    phoneticGuide: 'maa-chaa',
    audioFile: 'maachaa.mp3',
    imageAsset: 'animal_fish.png',
    category: 'animals',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'माछा पानीमा बस्छ। (Fish live in water.)',
      'माछाको पखेटा हुन्छ। (Fish have fins.)'
    ],
    tags: ['animal', 'aquatic', 'water']
  }),
  
  new VocabularyItem({
    id: 'animal_05',
    nepaliWord: 'चरा',
    englishTranslation: 'Bird',
    pronunciation: 'charaa',
    phoneticGuide: 'cha-raa',
    audioFile: 'charaa.mp3',
    imageAsset: 'animal_bird.png',
    category: 'animals',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'चरा आकाशमा उड्छ। (Birds fly in the sky.)',
      'चराको पखेटा हुन्छ। (Birds have wings.)'
    ],
    tags: ['animal', 'flying', 'sky']
  }),
  
  new VocabularyItem({
    id: 'animal_06',
    nepaliWord: 'बाघ',
    englishTranslation: 'Tiger',
    pronunciation: 'baagh',
    phoneticGuide: 'baagh',
    audioFile: 'baagh.mp3',
    imageAsset: 'animal_tiger.png',
    category: 'animals',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'बाघ जङ्गलमा बस्छ। (The tiger lives in the forest.)',
      'बाघ धेरै शक्तिशाली छ। (The tiger is very powerful.)'
    ],
    tags: ['animal', 'wild', 'predator']
  }),
  
  new VocabularyItem({
    id: 'animal_07',
    nepaliWord: 'बाँदर',
    englishTranslation: 'Monkey',
    pronunciation: 'baadar',
    phoneticGuide: 'baa-dar',
    audioFile: 'baadar.mp3',
    imageAsset: 'animal_monkey.png',
    category: 'animals',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'बाँदर रुखमा चढ्छ। (The monkey climbs trees.)',
      'बाँदर केरा खान्छ। (The monkey eats bananas.)'
    ],
    tags: ['animal', 'wild', 'primate']
  })
];

// Vocabulary Items - Nature
const natureVocabularyItems = [
  new VocabularyItem({
    id: 'nature_01',
    nepaliWord: 'रुख',
    englishTranslation: 'Tree',
    pronunciation: 'rukh',
    phoneticGuide: 'rukh',
    audioFile: 'rukh.mp3',
    imageAsset: 'nature_tree.png',
    category: 'nature',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'रुखमा फल छ। (There is fruit on the tree.)',
      'रुख हरियो छ। (The tree is green.)'
    ],
    tags: ['nature', 'plant', 'forest']
  }),
  
  new VocabularyItem({
    id: 'nature_02',
    nepaliWord: 'फूल',
    englishTranslation: 'Flower',
    pronunciation: 'phool',
    phoneticGuide: 'phool',
    audioFile: 'phool.mp3',
    imageAsset: 'nature_flower.png',
    category: 'nature',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'फूल राम्रो छ। (The flower is beautiful.)',
      'फूलको सुगन्ध मिठो छ। (The flower\'s fragrance is sweet.)'
    ],
    tags: ['nature', 'plant', 'garden']
  }),
  
  new VocabularyItem({
    id: 'nature_03',
    nepaliWord: 'पानी',
    englishTranslation: 'Water',
    pronunciation: 'paani',
    phoneticGuide: 'paa-ni',
    audioFile: 'paani.mp3',
    imageAsset: 'nature_water.png',
    category: 'nature',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'पानी पिउनुहोस्। (Please drink water.)',
      'नदीमा पानी छ। (There is water in the river.)'
    ],
    tags: ['nature', 'element', 'liquid']
  }),
  
  new VocabularyItem({
    id: 'nature_04',
    nepaliWord: 'आकाश',
    englishTranslation: 'Sky',
    pronunciation: 'aakaash',
    phoneticGuide: 'aa-kaash',
    audioFile: 'aakaash.mp3',
    imageAsset: 'nature_sky.png',
    category: 'nature',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'आकाश निलो छ। (The sky is blue.)',
      'आकाशमा बादल छ। (There are clouds in the sky.)'
    ],
    tags: ['nature', 'element', 'space']
  }),
  
  new VocabularyItem({
    id: 'nature_05',
    nepaliWord: 'सूर्य',
    englishTranslation: 'Sun',
    pronunciation: 'surya',
    phoneticGuide: 'sur-ya',
    audioFile: 'surya.mp3',
    imageAsset: 'nature_sun.png',
    category: 'nature',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'सूर्य उज्यालो छ। (The sun is bright.)',
      'सूर्य पूर्वबाट उदाउँछ। (The sun rises from the east.)'
    ],
    tags: ['nature', 'space', 'celestial']
  }),
  
  new VocabularyItem({
    id: 'nature_06',
    nepaliWord: 'चन्द्रमा',
    englishTranslation: 'Moon',
    pronunciation: 'chandramaa',
    phoneticGuide: 'chan-dra-maa',
    audioFile: 'chandramaa.mp3',
    imageAsset: 'nature_moon.png',
    category: 'nature',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'चन्द्रमा रातमा देखिन्छ। (The moon is visible at night.)',
      'चन्द्रमा सेतो छ। (The moon is white.)'
    ],
    tags: ['nature', 'space', 'celestial']
  }),
  
  new VocabularyItem({
    id: 'nature_07',
    nepaliWord: 'तारा',
    englishTranslation: 'Star',
    pronunciation: 'taaraa',
    phoneticGuide: 'taa-raa',
    audioFile: 'taaraa.mp3',
    imageAsset: 'nature_star.png',
    category: 'nature',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'आकाशमा धेरै तारा छन्। (There are many stars in the sky.)',
      'तारा चम्किलो छ। (The star is shiny.)'
    ],
    tags: ['nature', 'space', 'celestial']
  }),
  
  new VocabularyItem({
    id: 'nature_08',
    nepaliWord: 'पहाड',
    englishTranslation: 'Mountain',
    pronunciation: 'pahaad',
    phoneticGuide: 'pa-haad',
    audioFile: 'pahaad.mp3',
    imageAsset: 'nature_mountain.png',
    category: 'nature',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'नेपालमा अग्ला पहाड छन्। (There are tall mountains in Nepal.)',
      'पहाडमा हिउँ छ। (There is snow on the mountain.)'
    ],
    tags: ['nature', 'landform', 'geography']
  })
];

// Combine vocabulary items
const vocabularyItems = [...animalVocabularyItems, ...natureVocabularyItems];

// Phrases
const phrases = [
  new Phrase({
    id: 'phrase_animal_01',
    nepaliPhrase: 'यो ____ हो।',
    englishTranslation: 'This is a ____.',
    pronunciation: 'yo ____ ho',
    phoneticGuide: 'yo ____ ho',
    audioFile: 'yo_ho.mp3',
    imageAsset: 'phrase_thisis.png',
    category: 'animals',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Identifying animals',
    vocabularyWords: animalVocabularyItems.map(item => item.id),
    grammarPoints: ['grammar_animal_01']
  }),
  
  new Phrase({
    id: 'phrase_animal_02',
    nepaliPhrase: '____ के गर्छ?',
    englishTranslation: 'What does the ____ do?',
    pronunciation: '____ ke garchha',
    phoneticGuide: '____ ke gar-chha',
    audioFile: 'ke_garchha.mp3',
    imageAsset: 'phrase_whatdoes.png',
    category: 'animals',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Asking about animal actions',
    vocabularyWords: animalVocabularyItems.map(item => item.id),
    grammarPoints: ['grammar_animal_02']
  }),
  
  new Phrase({
    id: 'phrase_animal_03',
    nepaliPhrase: '____ ____ मा बस्छ।',
    englishTranslation: 'The ____ lives in the ____.',
    pronunciation: '____ ____ ma baschha',
    phoneticGuide: '____ ____ ma bas-chha',
    audioFile: 'ma_baschha.mp3',
    imageAsset: 'phrase_livesin.png',
    category: 'animals',
    subcategory: 'nature',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Describing animal habitats',
    vocabularyWords: [...animalVocabularyItems.map(item => item.id), ...natureVocabularyItems.map(item => item.id)],
    grammarPoints: ['grammar_animal_03']
  }),
  
  new Phrase({
    id: 'phrase_nature_01',
    nepaliPhrase: 'मलाई ____ मन पर्छ।',
    englishTranslation: 'I like ____.',
    pronunciation: 'malaai ____ man parchha',
    phoneticGuide: 'ma-laa-i ____ man par-chha',
    audioFile: 'malaai_man_parchha.mp3',
    imageAsset: 'phrase_ilike.png',
    category: 'nature',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Expressing preferences about nature',
    vocabularyWords: natureVocabularyItems.map(item => item.id),
    grammarPoints: ['grammar_nature_01']
  }),
  
  new Phrase({
    id: 'phrase_nature_02',
    nepaliPhrase: '____ कस्तो छ?',
    englishTranslation: 'How is the ____?',
    pronunciation: '____ kasto chha',
    phoneticGuide: '____ kas-to chha',
    audioFile: 'kasto_chha.mp3',
    imageAsset: 'phrase_howis.png',
    category: 'nature',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Asking about nature',
    vocabularyWords: natureVocabularyItems.map(item => item.id),
    grammarPoints: ['grammar_nature_02']
  }),
  
  new Phrase({
    id: 'phrase_nature_03',
    nepaliPhrase: '____ ____ छ।',
    englishTranslation: 'The ____ is ____.',
    pronunciation: '____ ____ chha',
    phoneticGuide: '____ ____ chha',
    audioFile: 'chha.mp3',
    imageAsset: 'phrase_is.png',
    category: 'nature',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Describing nature',
    vocabularyWords: natureVocabularyItems.map(item => item.id),
    grammarPoints: ['grammar_nature_03']
  })
];

// Grammar Points
const grammarPoints = [
  new GrammarPoint({
    id: 'grammar_animal_01',
    title: 'Identifying Objects: "यो X हो" (yo X ho)',
    nepaliPattern: 'यो [Noun] हो।',
    englishExplanation: 'The pattern "यो X हो" (yo X ho) is used to say "This is X". This is a basic sentence structure in Nepali for identifying objects or animals.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'यो कुकुर हो। (This is a dog.)',
      'यो बिरालो हो। (This is a cat.)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_animal_02',
    title: 'Asking About Actions: "X के गर्छ?" (X ke garchha)',
    nepaliPattern: '[Subject] के गर्छ?',
    englishExplanation: 'The pattern "X के गर्छ?" (X ke garchha) is used to ask "What does X do?". This is used to inquire about the actions or behaviors of animals or people.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'कुकुर के गर्छ? (What does the dog do?)',
      'चरा के गर्छ? (What does the bird do?)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_animal_03',
    title: 'Describing Habitats: "X Y मा बस्छ" (X Y ma baschha)',
    nepaliPattern: '[Animal] [Place] मा बस्छ।',
    englishExplanation: 'The pattern "X Y मा बस्छ" (X Y ma baschha) is used to say "X lives in Y". This is used to describe where animals live or their habitats.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'माछा पानीमा बस्छ। (Fish live in water.)',
      'बाघ जङ्गलमा बस्छ। (The tiger lives in the forest.)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_nature_01',
    title: 'Expressing Preferences: "मलाई X मन पर्छ" (malaai X man parchha)',
    nepaliPattern: 'मलाई [Object] मन पर्छ।',
    englishExplanation: 'The pattern "मलाई X मन पर्छ" (malaai X man parchha) is used to express "I like X". Literally, it translates to "X is pleasing to me".',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मलाई फूल मन पर्छ। (I like flowers.)',
      'मलाई पानी मन पर्छ। (I like water.)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_nature_02',
    title: 'Asking About State: "X कस्तो छ?" (X kasto chha)',
    nepaliPattern: '[Subject] कस्तो छ?',
    englishExplanation: 'The pattern "X कस्तो छ?" (X kasto chha) is used to ask "How is X?" or "What is X like?". This is used to inquire about the state or condition of something.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'आकाश कस्तो छ? (How is the sky?)',
      'फूल कस्तो छ? (What is the flower like?)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_nature_03',
    title: 'Describing State: "X Y छ" (X Y chha)',
    nepaliPattern: '[Subject] [Adjective] छ।',
    englishExplanation: 'The pattern "X Y छ" (X Y chha) is used to say "X is Y". This is a basic sentence structure in Nepali for describing the state or quality of something.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'आकाश निलो छ। (The sky is blue.)',
      'फूल राम्रो छ। (The flower is beautiful.)'
    ]
  })
];

// Pronunciation Guides
const pronunciationGuides = [
  new PronunciationGuide({
    id: 'pron_guide_animal_01',
    word: 'कुकुर',
    phoneticRepresentation: 'kukur',
    syllableBreakdown: ['कु', 'कुर'],
    audioFile: 'kukur_guide.mp3',
    pronunciationTips: [
      'The "ku" is pronounced with a short "u" sound, like in "put"',
      'The "kur" is pronounced with a rolled "r" at the end'
    ]
  }),
  
  new PronunciationGuide({
    id: 'pron_guide_animal_02',
    word: 'बिरालो',
    phoneticRepresentation: 'biralo',
    syllableBreakdown: ['बि', 'रा', 'लो'],
    audioFile: 'biralo_guide.mp3',
    pronunciationTips: [
      'The "bi" is pronounced with a short "i" sound, like in "bit"',
      'The "ra" is pronounced with a short "a" sound',
      'The "lo" is pronounced with a short "o" sound'
    ]
  }),
  
  new PronunciationGuide({
    id: 'pron_guide_nature_01',
    word: 'आकाश',
    phoneticRepresentation: 'aakaash',
    syllableBreakdown: ['आ', 'का', 'श'],
    audioFile: 'aakaash_guide.mp3',
    pronunciationTips: [
      'The "aa" is a long vowel sound, like in "father"',
      'The "kaa" is also a long vowel sound',
      'The "sh" is pronounced like "sh" in "ship"'
    ]
  }),
  
  new PronunciationGuide({
    id: 'pron_guide_nature_02',
    word: 'पहाड',
    phoneticRepresentation: 'pahaad',
    syllableBreakdown: ['प', 'हा', 'ड'],
    audioFile: 'pahaad_guide.mp3',
    pronunciationTips: [
      'The "pa" is pronounced with a short "a" sound',
      'The "haa" is a long vowel sound',
      'The "d" at the end is pronounced clearly'
    ]
  })
];

// Create Thematic Unit
const animalsNatureUnit = new ThematicUnit({
  id: 'unit_animals_nature',
  title: 'Animals and Nature',
  description: 'Learn Nepali words for animals, natural elements, and how to describe the world around you.',
  difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
  category: 'animals_nature',
  vocabularyItems: vocabularyItems.map(item => item.id),
  phrases: phrases.map(phrase => phrase.id),
  grammarPoints: grammarPoints.map(point => point.id),
  learningObjectives: [
    'Identify and name common animals in Nepali',
    'Identify and name elements of nature in Nepali',
    'Describe animal behaviors and habitats',
    'Express preferences about nature',
    'Ask and answer questions about the natural world'
  ],
  rocketThemeConnection: 'As your rocket soars through the sky, you\'ll see animals and nature below! Learn to describe the beautiful world your rocket flies over in Nepali.',
  completionCriteria: {
    vocabularyMastery: 80,
    phraseMastery: 70,
    quizScore: 70
  }
});

// Export all content
export const UNIT_ANIMALS_NATURE = {
  unit: animalsNatureUnit,
  vocabularyItems,
  phrases,
  grammarPoints,
  pronunciationGuides
};

export default UNIT_ANIMALS_NATURE;
