/**
 * Unit1_Greetings.js
 * 
 * Thematic unit for greetings and basic expressions in Nepali
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

// Vocabulary Items
const vocabularyItems = [
  new VocabularyItem({
    id: 'greeting_01',
    nepaliWord: 'नमस्ते',
    englishTranslation: 'Hello',
    pronunciation: 'namaste',
    phoneticGuide: 'na-ma-s-te',
    audioFile: 'namaste.mp3',
    imageAsset: 'greeting_hello.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'नमस्ते, मेरो नाम राम हो। (Hello, my name is Ram.)',
      'नमस्ते, तपाईंलाई कस्तो छ? (Hello, how are you?)'
    ],
    tags: ['greeting', 'formal', 'informal', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'greeting_02',
    nepaliWord: 'नमस्कार',
    englishTranslation: 'Greetings',
    pronunciation: 'namaskaar',
    phoneticGuide: 'na-ma-s-kaar',
    audioFile: 'namaskaar.mp3',
    imageAsset: 'greeting_formal.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'सबैलाई नमस्कार! (Greetings to everyone!)',
      'मेरो नमस्कार स्वीकार गर्नुहोस्। (Please accept my greetings.)'
    ],
    tags: ['greeting', 'formal', 'respectful']
  }),
  
  new VocabularyItem({
    id: 'greeting_03',
    nepaliWord: 'धन्यवाद',
    englishTranslation: 'Thank you',
    pronunciation: 'dhanyavaad',
    phoneticGuide: 'dhan-ya-vaad',
    audioFile: 'dhanyavaad.mp3',
    imageAsset: 'greeting_thankyou.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मद्दतको लागि धन्यवाद। (Thank you for your help.)',
      'धन्यवाद, तपाईं धेरै दयालु हुनुहुन्छ। (Thank you, you are very kind.)'
    ],
    tags: ['gratitude', 'polite', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'greeting_04',
    nepaliWord: 'स्वागत छ',
    englishTranslation: 'Welcome',
    pronunciation: 'swaagat chha',
    phoneticGuide: 'swaa-gat chha',
    audioFile: 'swaagat_chha.mp3',
    imageAsset: 'greeting_welcome.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'हाम्रो घरमा स्वागत छ। (Welcome to our home.)',
      'नेपालमा तपाईंलाई स्वागत छ। (Welcome to Nepal.)'
    ],
    tags: ['greeting', 'hospitality', 'formal']
  }),
  
  new VocabularyItem({
    id: 'greeting_05',
    nepaliWord: 'शुभ बिहानी',
    englishTranslation: 'Good morning',
    pronunciation: 'shubha bihaani',
    phoneticGuide: 'shu-bha bi-haa-ni',
    audioFile: 'shubha_bihaani.mp3',
    imageAsset: 'greeting_morning.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'शुभ बिहानी, राम्रो निद्रा लाग्यो? (Good morning, did you sleep well?)',
      'शुभ बिहानी, आज मौसम राम्रो छ। (Good morning, the weather is nice today.)'
    ],
    tags: ['greeting', 'morning', 'time-specific']
  }),
  
  new VocabularyItem({
    id: 'greeting_06',
    nepaliWord: 'शुभ रात्री',
    englishTranslation: 'Good night',
    pronunciation: 'shubha raatri',
    phoneticGuide: 'shu-bha raa-tri',
    audioFile: 'shubha_raatri.mp3',
    imageAsset: 'greeting_night.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'शुभ रात्री, राम्रो सपना देख्नुहोस्। (Good night, have sweet dreams.)',
      'अब म सुत्न जान्छु, शुभ रात्री। (I'm going to sleep now, good night.)'
    ],
    tags: ['greeting', 'night', 'time-specific']
  }),
  
  new VocabularyItem({
    id: 'greeting_07',
    nepaliWord: 'माफ गर्नुहोस्',
    englishTranslation: 'Excuse me / Sorry',
    pronunciation: 'maaf garnuhos',
    phoneticGuide: 'maaf gar-nu-hos',
    audioFile: 'maaf_garnuhos.mp3',
    imageAsset: 'greeting_sorry.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'माफ गर्नुहोस्, मलाई बाटो थाहा छैन। (Excuse me, I don't know the way.)',
      'ढिलो आएकोमा माफ गर्नुहोस्। (Sorry for being late.)'
    ],
    tags: ['apology', 'polite', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'greeting_08',
    nepaliWord: 'कृपया',
    englishTranslation: 'Please',
    pronunciation: 'kripayaa',
    phoneticGuide: 'kri-pa-yaa',
    audioFile: 'kripayaa.mp3',
    imageAsset: 'greeting_please.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'कृपया, मलाई मद्दत गर्नुहोस्। (Please, help me.)',
      'कृपया, यहाँ बस्नुहोस्। (Please, sit here.)'
    ],
    tags: ['polite', 'request', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'greeting_09',
    nepaliWord: 'हजुर',
    englishTranslation: 'Yes (respectful)',
    pronunciation: 'hajur',
    phoneticGuide: 'ha-jur',
    audioFile: 'hajur.mp3',
    imageAsset: 'greeting_yes.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'हजुर, म तपाईंलाई मद्दत गर्न सक्छु। (Yes, I can help you.)',
      'हजुर, म बुझ्छु। (Yes, I understand.)'
    ],
    tags: ['agreement', 'respectful', 'formal']
  }),
  
  new VocabularyItem({
    id: 'greeting_10',
    nepaliWord: 'होइन',
    englishTranslation: 'No',
    pronunciation: 'hoina',
    phoneticGuide: 'ho-i-na',
    audioFile: 'hoina.mp3',
    imageAsset: 'greeting_no.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'होइन, म त्यहाँ जान सक्दिन। (No, I cannot go there.)',
      'होइन, यो मेरो होइन। (No, this is not mine.)'
    ],
    tags: ['disagreement', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'greeting_11',
    nepaliWord: 'मेरो नाम',
    englishTranslation: 'My name',
    pronunciation: 'mero naam',
    phoneticGuide: 'me-ro naam',
    audioFile: 'mero_naam.mp3',
    imageAsset: 'greeting_name.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरो नाम सारा हो। (My name is Sara.)',
      'मेरो नाम के हो भन्नुहोस्? (Please tell me your name?)'
    ],
    tags: ['introduction', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'greeting_12',
    nepaliWord: 'तपाईंलाई कस्तो छ?',
    englishTranslation: 'How are you?',
    pronunciation: 'tapaaĩlaai kasto chha',
    phoneticGuide: 'ta-paa-ĩ-laa-i kas-to chha',
    audioFile: 'tapaaĩlaai_kasto_chha.mp3',
    imageAsset: 'greeting_howareyou.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'नमस्ते, तपाईंलाई कस्तो छ? (Hello, how are you?)',
      'आज तपाईंलाई कस्तो छ? (How are you today?)'
    ],
    tags: ['question', 'everyday', 'conversation']
  })
];

// Phrases
const phrases = [
  new Phrase({
    id: 'phrase_greeting_01',
    nepaliPhrase: 'मेरो नाम ____ हो।',
    englishTranslation: 'My name is ____.',
    pronunciation: 'mero naam ____ ho',
    phoneticGuide: 'me-ro naam ____ ho',
    audioFile: 'mero_naam_ho.mp3',
    imageAsset: 'phrase_myname.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Introduction',
    vocabularyWords: ['greeting_11'],
    grammarPoints: ['grammar_01']
  }),
  
  new Phrase({
    id: 'phrase_greeting_02',
    nepaliPhrase: 'तपाईंको नाम के हो?',
    englishTranslation: 'What is your name?',
    pronunciation: 'tapaaĩko naam ke ho',
    phoneticGuide: 'ta-paa-ĩ-ko naam ke ho',
    audioFile: 'tapaaĩko_naam_ke_ho.mp3',
    imageAsset: 'phrase_yourname.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Introduction',
    vocabularyWords: ['greeting_11'],
    grammarPoints: ['grammar_02']
  }),
  
  new Phrase({
    id: 'phrase_greeting_03',
    nepaliPhrase: 'मलाई भेटेर खुशी लाग्यो।',
    englishTranslation: 'Nice to meet you.',
    pronunciation: 'malaai bhetera khushi laagyo',
    phoneticGuide: 'ma-laa-i bhe-te-ra khu-shi laag-yo',
    audioFile: 'malaai_bhetera_khushi_laagyo.mp3',
    imageAsset: 'phrase_nicetomeetyou.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Introduction',
    vocabularyWords: [],
    grammarPoints: []
  }),
  
  new Phrase({
    id: 'phrase_greeting_04',
    nepaliPhrase: 'म ठिक छु, धन्यवाद।',
    englishTranslation: 'I am fine, thank you.',
    pronunciation: 'ma thik chhu, dhanyavaad',
    phoneticGuide: 'ma thik chhu, dhan-ya-vaad',
    audioFile: 'ma_thik_chhu_dhanyavaad.mp3',
    imageAsset: 'phrase_fine.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Conversation',
    vocabularyWords: ['greeting_03'],
    grammarPoints: []
  }),
  
  new Phrase({
    id: 'phrase_greeting_05',
    nepaliPhrase: 'फेरि भेटौंला।',
    englishTranslation: 'See you again.',
    pronunciation: 'pheri bhetaũla',
    phoneticGuide: 'phe-ri bhe-taũ-la',
    audioFile: 'pheri_bhetaũla.mp3',
    imageAsset: 'phrase_seeyou.png',
    category: 'greetings',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Farewell',
    vocabularyWords: [],
    grammarPoints: []
  })
];

// Grammar Points
const grammarPoints = [
  new GrammarPoint({
    id: 'grammar_01',
    title: 'Basic Sentence Structure: "X हो" (X ho)',
    nepaliPattern: '[Subject] [Noun] हो।',
    englishExplanation: 'The pattern "X हो" (X ho) is used to say "X is" or "It is X". This is a basic sentence structure in Nepali.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरो नाम सारा हो। (My name is Sara.)',
      'यो किताब हो। (This is a book.)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_02',
    title: 'Question Words: "के" (ke)',
    nepaliPattern: '[Question word] [Subject/Object]?',
    englishExplanation: 'The question word "के" (ke) means "what" and is used to ask about things, names, etc.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'तपाईंको नाम के हो? (What is your name?)',
      'यो के हो? (What is this?)'
    ]
  })
];

// Pronunciation Guides
const pronunciationGuides = [
  new PronunciationGuide({
    id: 'pron_guide_01',
    word: 'नमस्ते',
    phoneticRepresentation: 'namaste',
    syllableBreakdown: ['न', 'म', 'स्', 'ते'],
    audioFile: 'namaste_guide.mp3',
    pronunciationTips: [
      'The stress is on the second syllable: na-MAS-te',
      'The "s" sound is slightly different from English - place your tongue a bit further back',
      'The final "e" is pronounced like "ay" in "say"'
    ]
  }),
  
  new PronunciationGuide({
    id: 'pron_guide_02',
    word: 'धन्यवाद',
    phoneticRepresentation: 'dhanyavaad',
    syllableBreakdown: ['ध', 'न्य', 'वा', 'द'],
    audioFile: 'dhanyavaad_guide.mp3',
    pronunciationTips: [
      'The "dh" sound is aspirated - say "d" with a puff of air',
      'The "ny" sound is similar to the "ny" in "canyon"',
      'The final "d" is unaspirated and soft'
    ]
  })
];

// Create Thematic Unit
const greetingsUnit = new ThematicUnit({
  id: 'unit_greetings',
  title: 'Greetings and Basic Expressions',
  description: 'Learn common Nepali greetings, introductions, and basic expressions for everyday conversations.',
  difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
  category: 'greetings',
  vocabularyItems: vocabularyItems.map(item => item.id),
  phrases: phrases.map(phrase => phrase.id),
  grammarPoints: grammarPoints.map(point => point.id),
  learningObjectives: [
    'Greet people in Nepali using appropriate expressions',
    'Introduce yourself and ask others' names',
    'Use basic polite expressions like "please" and "thank you"',
    'Understand and respond to simple questions about wellbeing'
  ],
  rocketThemeConnection: 'Greetings are your launch pad for communication! Master these basics to blast off on your Nepali language journey.',
  completionCriteria: {
    vocabularyMastery: 80,
    phraseMastery: 70,
    quizScore: 70
  }
});

// Export all content
export const UNIT_GREETINGS = {
  unit: greetingsUnit,
  vocabularyItems,
  phrases,
  grammarPoints,
  pronunciationGuides
};

export default UNIT_GREETINGS;
