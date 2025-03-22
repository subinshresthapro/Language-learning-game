/**
 * Unit3_Numbers.js
 * 
 * Thematic unit for numbers and counting in Nepali
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

// Vocabulary Items - Numbers
const numberVocabularyItems = [
  new VocabularyItem({
    id: 'number_01',
    nepaliWord: 'एक',
    englishTranslation: 'One',
    pronunciation: 'ek',
    phoneticGuide: 'ek',
    audioFile: 'ek.mp3',
    imageAsset: 'number_one.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मसँग एक किताब छ। (I have one book.)',
      'एक, दुई, तीन। (One, two, three.)'
    ],
    tags: ['number', 'basic', 'counting']
  }),
  
  new VocabularyItem({
    id: 'number_02',
    nepaliWord: 'दुई',
    englishTranslation: 'Two',
    pronunciation: 'dui',
    phoneticGuide: 'du-i',
    audioFile: 'dui.mp3',
    imageAsset: 'number_two.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मसँग दुई भाइ छन्। (I have two brothers.)',
      'दुई र दुई चार हुन्छ। (Two and two make four.)'
    ],
    tags: ['number', 'basic', 'counting']
  }),
  
  new VocabularyItem({
    id: 'number_03',
    nepaliWord: 'तीन',
    englishTranslation: 'Three',
    pronunciation: 'teen',
    phoneticGuide: 'teen',
    audioFile: 'teen.mp3',
    imageAsset: 'number_three.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'त्यहाँ तीन रुख छन्। (There are three trees.)',
      'मसँग तीन केरा छन्। (I have three bananas.)'
    ],
    tags: ['number', 'basic', 'counting']
  }),
  
  new VocabularyItem({
    id: 'number_04',
    nepaliWord: 'चार',
    englishTranslation: 'Four',
    pronunciation: 'chaar',
    phoneticGuide: 'chaar',
    audioFile: 'chaar.mp3',
    imageAsset: 'number_four.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'एक गाडीमा चार पाङ्ग्रा हुन्छन्। (A car has four wheels.)',
      'मसँग चार किताब छन्। (I have four books.)'
    ],
    tags: ['number', 'basic', 'counting']
  }),
  
  new VocabularyItem({
    id: 'number_05',
    nepaliWord: 'पाँच',
    englishTranslation: 'Five',
    pronunciation: 'paanch',
    phoneticGuide: 'paanch',
    audioFile: 'paanch.mp3',
    imageAsset: 'number_five.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'हातमा पाँच औंला हुन्छन्। (There are five fingers on a hand.)',
      'मसँग पाँच रुपैयाँ छन्। (I have five rupees.)'
    ],
    tags: ['number', 'basic', 'counting']
  }),
  
  new VocabularyItem({
    id: 'number_06',
    nepaliWord: 'छ',
    englishTranslation: 'Six',
    pronunciation: 'chha',
    phoneticGuide: 'chha',
    audioFile: 'chha.mp3',
    imageAsset: 'number_six.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'हप्तामा छ दिन हुन्छन्। (There are six days in a week.)',
      'मसँग छ सेब छन्। (I have six apples.)'
    ],
    tags: ['number', 'basic', 'counting']
  }),
  
  new VocabularyItem({
    id: 'number_07',
    nepaliWord: 'सात',
    englishTranslation: 'Seven',
    pronunciation: 'saat',
    phoneticGuide: 'saat',
    audioFile: 'saat.mp3',
    imageAsset: 'number_seven.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'हप्तामा सात दिन हुन्छन्। (There are seven days in a week.)',
      'मसँग सात किताब छन्। (I have seven books.)'
    ],
    tags: ['number', 'basic', 'counting']
  }),
  
  new VocabularyItem({
    id: 'number_08',
    nepaliWord: 'आठ',
    englishTranslation: 'Eight',
    pronunciation: 'aath',
    phoneticGuide: 'aath',
    audioFile: 'aath.mp3',
    imageAsset: 'number_eight.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'आठ र दुई दश हुन्छ। (Eight and two make ten.)',
      'मसँग आठ केरा छन्। (I have eight bananas.)'
    ],
    tags: ['number', 'basic', 'counting']
  }),
  
  new VocabularyItem({
    id: 'number_09',
    nepaliWord: 'नौ',
    englishTranslation: 'Nine',
    pronunciation: 'nau',
    phoneticGuide: 'nau',
    audioFile: 'nau.mp3',
    imageAsset: 'number_nine.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'नौ र एक दश हुन्छ। (Nine and one make ten.)',
      'मसँग नौ फूल छन्। (I have nine flowers.)'
    ],
    tags: ['number', 'basic', 'counting']
  }),
  
  new VocabularyItem({
    id: 'number_10',
    nepaliWord: 'दश',
    englishTranslation: 'Ten',
    pronunciation: 'dash',
    phoneticGuide: 'dash',
    audioFile: 'dash.mp3',
    imageAsset: 'number_ten.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'दश र दश बीस हुन्छ। (Ten and ten make twenty.)',
      'मसँग दश रुपैयाँ छन्। (I have ten rupees.)'
    ],
    tags: ['number', 'basic', 'counting']
  })
];

// Vocabulary Items - Counting Words
const countingVocabularyItems = [
  new VocabularyItem({
    id: 'counting_01',
    nepaliWord: 'गन्ती',
    englishTranslation: 'Counting',
    pronunciation: 'ganti',
    phoneticGuide: 'gan-ti',
    audioFile: 'ganti.mp3',
    imageAsset: 'counting_general.png',
    category: 'numbers',
    subcategory: 'counting',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'गन्ती गरौं। (Let\'s count.)',
      'एक देखि दश सम्म गन्ती गर। (Count from one to ten.)'
    ],
    tags: ['counting', 'activity', 'math']
  }),
  
  new VocabularyItem({
    id: 'counting_02',
    nepaliWord: 'जोड',
    englishTranslation: 'Addition',
    pronunciation: 'jod',
    phoneticGuide: 'jod',
    audioFile: 'jod.mp3',
    imageAsset: 'counting_addition.png',
    category: 'numbers',
    subcategory: 'math',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'दुई र तीन जोड्दा पाँच हुन्छ। (Two plus three equals five.)',
      'जोड गरौं। (Let\'s add.)'
    ],
    tags: ['math', 'operation', 'addition']
  }),
  
  new VocabularyItem({
    id: 'counting_03',
    nepaliWord: 'घटाउ',
    englishTranslation: 'Subtraction',
    pronunciation: 'ghatau',
    phoneticGuide: 'gha-tau',
    audioFile: 'ghatau.mp3',
    imageAsset: 'counting_subtraction.png',
    category: 'numbers',
    subcategory: 'math',
    difficulty: DIFFICULTY_LEVELS.LEVEL_3.id,
    examples: [
      'पाँचबाट दुई घटाउँदा तीन हुन्छ। (Five minus two equals three.)',
      'घटाउ गरौं। (Let\'s subtract.)'
    ],
    tags: ['math', 'operation', 'subtraction']
  }),
  
  new VocabularyItem({
    id: 'counting_04',
    nepaliWord: 'कति',
    englishTranslation: 'How many',
    pronunciation: 'kati',
    phoneticGuide: 'ka-ti',
    audioFile: 'kati.mp3',
    imageAsset: 'counting_howmany.png',
    category: 'numbers',
    subcategory: 'question',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'तिम्रो उमेर कति हो? (How old are you?)',
      'तिमीसँग कति किताब छन्? (How many books do you have?)'
    ],
    tags: ['question', 'quantity', 'everyday']
  }),
  
  new VocabularyItem({
    id: 'counting_05',
    nepaliWord: 'धेरै',
    englishTranslation: 'Many',
    pronunciation: 'dherai',
    phoneticGuide: 'dhe-rai',
    audioFile: 'dherai.mp3',
    imageAsset: 'counting_many.png',
    category: 'numbers',
    subcategory: 'quantity',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'त्यहाँ धेरै मान्छे छन्। (There are many people there.)',
      'मसँग धेरै किताब छन्। (I have many books.)'
    ],
    tags: ['quantity', 'adjective', 'everyday']
  })
];

// Combine vocabulary items
const vocabularyItems = [...numberVocabularyItems, ...countingVocabularyItems];

// Phrases
const phrases = [
  new Phrase({
    id: 'phrase_number_01',
    nepaliPhrase: 'एक देखि दश सम्म गन्ती गरौं।',
    englishTranslation: 'Let\'s count from one to ten.',
    pronunciation: 'ek dekhi dash samma ganti garau',
    phoneticGuide: 'ek de-khi dash sam-ma gan-ti ga-rau',
    audioFile: 'ek_dekhi_dash_samma.mp3',
    imageAsset: 'phrase_counting.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Counting activity',
    vocabularyWords: numberVocabularyItems.map(item => item.id),
    grammarPoints: ['grammar_number_01']
  }),
  
  new Phrase({
    id: 'phrase_number_02',
    nepaliPhrase: 'तिमीसँग कति ____ छन्?',
    englishTranslation: 'How many ____ do you have?',
    pronunciation: 'timisanga kati ____ chhan',
    phoneticGuide: 'ti-mi-san-ga ka-ti ____ chhan',
    audioFile: 'timisanga_kati_chhan.mp3',
    imageAsset: 'phrase_howmany.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Asking about quantity',
    vocabularyWords: ['counting_04'],
    grammarPoints: ['grammar_number_02']
  }),
  
  new Phrase({
    id: 'phrase_number_03',
    nepaliPhrase: 'मसँग ____ ____ छन्।',
    englishTranslation: 'I have ____ ____.',
    pronunciation: 'masanga ____ ____ chhan',
    phoneticGuide: 'ma-san-ga ____ ____ chhan',
    audioFile: 'masanga_chhan.mp3',
    imageAsset: 'phrase_ihave.png',
    category: 'numbers',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Expressing possession with numbers',
    vocabularyWords: numberVocabularyItems.map(item => item.id),
    grammarPoints: ['grammar_number_03']
  }),
  
  new Phrase({
    id: 'phrase_number_04',
    nepaliPhrase: '____ र ____ ____ हुन्छ।',
    englishTranslation: '____ and ____ make ____.',
    pronunciation: '____ ra ____ ____ hunchha',
    phoneticGuide: '____ ra ____ ____ hun-chha',
    audioFile: 'ra_hunchha.mp3',
    imageAsset: 'phrase_addition.png',
    category: 'numbers',
    subcategory: 'math',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Simple addition',
    vocabularyWords: [...numberVocabularyItems.map(item => item.id), 'counting_02'],
    grammarPoints: ['grammar_number_04']
  }),
  
  new Phrase({
    id: 'phrase_number_05',
    nepaliPhrase: 'तिम्रो उमेर कति हो?',
    englishTranslation: 'How old are you?',
    pronunciation: 'timro umer kati ho',
    phoneticGuide: 'tim-ro u-mer ka-ti ho',
    audioFile: 'timro_umer_kati_ho.mp3',
    imageAsset: 'phrase_howold.png',
    category: 'numbers',
    subcategory: 'age',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Asking about age',
    vocabularyWords: ['counting_04'],
    grammarPoints: ['grammar_number_02']
  }),
  
  new Phrase({
    id: 'phrase_number_06',
    nepaliPhrase: 'मेरो उमेर ____ वर्ष हो।',
    englishTranslation: 'I am ____ years old.',
    pronunciation: 'mero umer ____ barsha ho',
    phoneticGuide: 'me-ro u-mer ____ bar-sha ho',
    audioFile: 'mero_umer_barsha_ho.mp3',
    imageAsset: 'phrase_myage.png',
    category: 'numbers',
    subcategory: 'age',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Telling age',
    vocabularyWords: numberVocabularyItems.map(item => item.id),
    grammarPoints: ['grammar_number_01']
  })
];

// Grammar Points
const grammarPoints = [
  new GrammarPoint({
    id: 'grammar_number_01',
    title: 'Counting in Nepali: "एक देखि दश सम्म" (ek dekhi dash samma)',
    nepaliPattern: '[Number 1] देखि [Number 2] सम्म',
    englishExplanation: 'The pattern "[Number 1] देखि [Number 2] सम्म" is used to express "from [Number 1] to [Number 2]". This is commonly used when counting or specifying ranges.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'एक देखि दश सम्म (From one to ten)',
      'सोमबार देखि शुक्रबार सम्म (From Monday to Friday)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_number_02',
    title: 'Asking Quantity: "कति" (kati)',
    nepaliPattern: 'कति [Noun]?',
    englishExplanation: 'The question word "कति" (kati) means "how many" or "how much" and is used to ask about quantities.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'तिमीसँग कति किताब छन्? (How many books do you have?)',
      'यसको मूल्य कति हो? (How much does this cost?)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_number_03',
    title: 'Possession with Numbers: "मसँग [Number] [Noun] छन्" (masanga [Number] [Noun] chhan)',
    nepaliPattern: 'मसँग [Number] [Noun] छन्।',
    englishExplanation: 'The pattern "मसँग [Number] [Noun] छन्" is used to express "I have [Number] [Noun]". Note that "छन्" (chhan) is the plural form of "छ" (chha).',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'मसँग पाँच किताब छन्। (I have five books.)',
      'मसँग दुई भाइ छन्। (I have two brothers.)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_number_04',
    title: 'Simple Addition: "[Number 1] र [Number 2] [Result] हुन्छ" ([Number 1] ra [Number 2] [Result] hunchha)',
    nepaliPattern: '[Number 1] र [Number 2] [Result] हुन्छ।',
    englishExplanation: 'The pattern "[Number 1] र [Number 2] [Result] हुन्छ" is used to express "[Number 1] and [Number 2] make [Result]". This is used for simple addition.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'दुई र तीन पाँच हुन्छ। (Two and three make five.)',
      'चार र छ दश हुन्छ। (Four and six make ten.)'
    ]
  })
];

// Pronunciation Guides
const pronunciationGuides = [
  new PronunciationGuide({
    id: 'pron_guide_number_01',
    word: 'एक',
    phoneticRepresentation: 'ek',
    syllableBreakdown: ['एक'],
    audioFile: 'ek_guide.mp3',
    pronunciationTips: [
      'The "e" is pronounced like "e" in "egg"',
      'The "k" is a hard sound, similar to English'
    ]
  }),
  
  new PronunciationGuide({
    id: 'pron_guide_number_02',
    word: 'दुई',
    phoneticRepresentation: 'dui',
    syllableBreakdown: ['दु', 'ई'],
    audioFile: 'dui_guide.mp3',
    pronunciationTips: [
      'The "du" is pronounced with a short "u" sound',
      'The "i" is pronounced like "ee" in "see"',
      'The two vowels are pronounced separately, not as a diphthong'
    ]
  }),
  
  new PronunciationGuide({
    id: 'pron_guide_number_03',
    word: 'तीन',
    phoneticRepresentation: 'teen',
    syllableBreakdown: ['तीन'],
    audioFile: 'teen_guide.mp3',
    pronunciationTips: [
      'The "ee" is a long vowel sound, like in "seen"',
      'The "n" is pronounced clearly at the end'
    ]
  })
];

// Create Thematic Unit
const numbersUnit = new ThematicUnit({
  id: 'unit_numbers',
  title: 'Numbers and Counting',
  description: 'Learn Nepali numbers, counting, and basic mathematical expressions.',
  difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
  category: 'numbers',
  vocabularyItems: vocabularyItems.map(item => item.id),
  phrases: phrases.map(phrase => phrase.id),
  grammarPoints: grammarPoints.map(point => point.id),
  learningObjectives: [
    'Count from one to ten in Nepali',
    'Ask and answer questions about quantities',
    'Express possession with numbers',
    'Perform simple addition in Nepali',
    'Ask and tell age in Nepali'
  ],
  rocketThemeConnection: 'Counting down for rocket launch! Learn numbers in Nepali to help your rocket blast off into space. 10, 9, 8... दश, नौ, आठ...',
  completionCriteria: {
    vocabularyMastery: 80,
    phraseMastery: 70,
    quizScore: 70
  }
});

// Export all content
export const UNIT_NUMBERS = {
  unit: numbersUnit,
  vocabularyItems,
  phrases,
  grammarPoints,
  pronunciationGuides
};

export default UNIT_NUMBERS;
