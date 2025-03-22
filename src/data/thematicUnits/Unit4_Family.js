/**
 * Unit4_Family.js
 * 
 * Thematic unit for family members in Nepali
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

// Vocabulary Items - Family Members
const familyVocabularyItems = [
  new VocabularyItem({
    id: 'family_01',
    nepaliWord: 'आमा',
    englishTranslation: 'Mother',
    pronunciation: 'aama',
    phoneticGuide: 'aa-ma',
    audioFile: 'aama.mp3',
    imageAsset: 'family_mother.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरी आमा धेरै राम्री छिन्। (My mother is very beautiful.)',
      'मेरी आमाको नाम सीता हो। (My mother\'s name is Sita.)'
    ],
    tags: ['family', 'basic', 'immediate family']
  }),
  
  new VocabularyItem({
    id: 'family_02',
    nepaliWord: 'बुबा',
    englishTranslation: 'Father',
    pronunciation: 'buba',
    phoneticGuide: 'bu-ba',
    audioFile: 'buba.mp3',
    imageAsset: 'family_father.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरा बुबा काममा जानुहुन्छ। (My father goes to work.)',
      'मेरा बुबाको नाम राम हो। (My father\'s name is Ram.)'
    ],
    tags: ['family', 'basic', 'immediate family']
  }),
  
  new VocabularyItem({
    id: 'family_03',
    nepaliWord: 'दिदी',
    englishTranslation: 'Elder Sister',
    pronunciation: 'didi',
    phoneticGuide: 'di-di',
    audioFile: 'didi.mp3',
    imageAsset: 'family_elder_sister.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरी दिदी स्कूल जानुहुन्छ। (My elder sister goes to school.)',
      'मेरी दिदीको नाम रीता हो। (My elder sister\'s name is Rita.)'
    ],
    tags: ['family', 'basic', 'sibling']
  }),
  
  new VocabularyItem({
    id: 'family_04',
    nepaliWord: 'दाई',
    englishTranslation: 'Elder Brother',
    pronunciation: 'dai',
    phoneticGuide: 'da-i',
    audioFile: 'dai.mp3',
    imageAsset: 'family_elder_brother.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरा दाई खेल्न मन पराउनुहुन्छ। (My elder brother likes to play.)',
      'मेरा दाईको नाम हरि हो। (My elder brother\'s name is Hari.)'
    ],
    tags: ['family', 'basic', 'sibling']
  }),
  
  new VocabularyItem({
    id: 'family_05',
    nepaliWord: 'बहिनी',
    englishTranslation: 'Younger Sister',
    pronunciation: 'bahini',
    phoneticGuide: 'ba-hi-ni',
    audioFile: 'bahini.mp3',
    imageAsset: 'family_younger_sister.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरी बहिनी सानी छिन्। (My younger sister is small.)',
      'मेरी बहिनीको नाम गीता हो। (My younger sister\'s name is Gita.)'
    ],
    tags: ['family', 'basic', 'sibling']
  }),
  
  new VocabularyItem({
    id: 'family_06',
    nepaliWord: 'भाई',
    englishTranslation: 'Younger Brother',
    pronunciation: 'bhai',
    phoneticGuide: 'bha-i',
    audioFile: 'bhai.mp3',
    imageAsset: 'family_younger_brother.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरो भाई स्कूल जान्छ। (My younger brother goes to school.)',
      'मेरो भाईको नाम राजु हो। (My younger brother\'s name is Raju.)'
    ],
    tags: ['family', 'basic', 'sibling']
  }),
  
  new VocabularyItem({
    id: 'family_07',
    nepaliWord: 'हजुरआमा',
    englishTranslation: 'Grandmother',
    pronunciation: 'hajuraama',
    phoneticGuide: 'ha-jur-aa-ma',
    audioFile: 'hajuraama.mp3',
    imageAsset: 'family_grandmother.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'मेरी हजुरआमा धेरै बुढी हुनुहुन्छ। (My grandmother is very old.)',
      'मेरी हजुरआमाले कथा सुनाउनुहुन्छ। (My grandmother tells stories.)'
    ],
    tags: ['family', 'intermediate', 'extended family']
  }),
  
  new VocabularyItem({
    id: 'family_08',
    nepaliWord: 'हजुरबुबा',
    englishTranslation: 'Grandfather',
    pronunciation: 'hajurbuba',
    phoneticGuide: 'ha-jur-bu-ba',
    audioFile: 'hajurbuba.mp3',
    imageAsset: 'family_grandfather.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'मेरा हजुरबुबा धेरै बुढा हुनुहुन्छ। (My grandfather is very old.)',
      'मेरा हजुरबुबाले मलाई खेलौना किनिदिनुभयो। (My grandfather bought me a toy.)'
    ],
    tags: ['family', 'intermediate', 'extended family']
  }),
  
  new VocabularyItem({
    id: 'family_09',
    nepaliWord: 'काका',
    englishTranslation: 'Uncle (father\'s brother)',
    pronunciation: 'kaakaa',
    phoneticGuide: 'kaa-kaa',
    audioFile: 'kaakaa.mp3',
    imageAsset: 'family_uncle.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'मेरा काका काठमाडौंमा बस्नुहुन्छ। (My uncle lives in Kathmandu.)',
      'मेरा काकाको एउटा गाडी छ। (My uncle has a car.)'
    ],
    tags: ['family', 'intermediate', 'extended family']
  }),
  
  new VocabularyItem({
    id: 'family_10',
    nepaliWord: 'काकी',
    englishTranslation: 'Aunt (uncle\'s wife)',
    pronunciation: 'kaaki',
    phoneticGuide: 'kaa-ki',
    audioFile: 'kaaki.mp3',
    imageAsset: 'family_aunt.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'मेरी काकी राम्रो पकाउनुहुन्छ। (My aunt cooks well.)',
      'मेरी काकीले मलाई मिठाई दिनुभयो। (My aunt gave me sweets.)'
    ],
    tags: ['family', 'intermediate', 'extended family']
  }),
  
  new VocabularyItem({
    id: 'family_11',
    nepaliWord: 'परिवार',
    englishTranslation: 'Family',
    pronunciation: 'parivaar',
    phoneticGuide: 'pa-ri-vaar',
    audioFile: 'parivaar.mp3',
    imageAsset: 'family_whole.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरो परिवार ठूलो छ। (My family is big.)',
      'मेरो परिवारमा छ जना छन्। (There are six people in my family.)'
    ],
    tags: ['family', 'basic', 'group']
  }),
  
  new VocabularyItem({
    id: 'family_12',
    nepaliWord: 'घर',
    englishTranslation: 'Home/House',
    pronunciation: 'ghar',
    phoneticGuide: 'ghar',
    audioFile: 'ghar.mp3',
    imageAsset: 'family_home.png',
    category: 'family',
    subcategory: 'home',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरो घर ठूलो छ। (My house is big.)',
      'म घर जान्छु। (I am going home.)'
    ],
    tags: ['home', 'basic', 'place']
  })
];

// Phrases
const phrases = [
  new Phrase({
    id: 'phrase_family_01',
    nepaliPhrase: 'यो मेरो परिवार हो।',
    englishTranslation: 'This is my family.',
    pronunciation: 'yo mero parivaar ho',
    phoneticGuide: 'yo me-ro pa-ri-vaar ho',
    audioFile: 'yo_mero_parivaar_ho.mp3',
    imageAsset: 'phrase_myfamily.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Introducing family',
    vocabularyWords: ['family_11'],
    grammarPoints: ['grammar_family_01']
  }),
  
  new Phrase({
    id: 'phrase_family_02',
    nepaliPhrase: 'यो मेरी/मेरा ____ हुनुहुन्छ।',
    englishTranslation: 'This is my ____.',
    pronunciation: 'yo meri/mera ____ hunuhunchha',
    phoneticGuide: 'yo me-ri/me-ra ____ hu-nu-hun-chha',
    audioFile: 'yo_meri_mera_hunuhunchha.mp3',
    imageAsset: 'phrase_thisis.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    context: 'Introducing family members',
    vocabularyWords: familyVocabularyItems.map(item => item.id),
    grammarPoints: ['grammar_family_02']
  }),
  
  new Phrase({
    id: 'phrase_family_03',
    nepaliPhrase: 'मेरो परिवारमा ____ जना छन्।',
    englishTranslation: 'There are ____ people in my family.',
    pronunciation: 'mero parivaarma ____ janaa chhan',
    phoneticGuide: 'me-ro pa-ri-vaar-ma ____ ja-naa chhan',
    audioFile: 'mero_parivaarma_janaa_chhan.mp3',
    imageAsset: 'phrase_familysize.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Describing family size',
    vocabularyWords: ['family_11'],
    grammarPoints: ['grammar_family_03']
  }),
  
  new Phrase({
    id: 'phrase_family_04',
    nepaliPhrase: 'तिम्रो परिवारमा को-को हुनुहुन्छ?',
    englishTranslation: 'Who are the members of your family?',
    pronunciation: 'timro parivaarma ko-ko hunuhunchha',
    phoneticGuide: 'tim-ro pa-ri-vaar-ma ko-ko hu-nu-hun-chha',
    audioFile: 'timro_parivaarma_koko_hunuhunchha.mp3',
    imageAsset: 'phrase_whofamily.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Asking about family members',
    vocabularyWords: ['family_11'],
    grammarPoints: ['grammar_family_04']
  }),
  
  new Phrase({
    id: 'phrase_family_05',
    nepaliPhrase: 'मेरो घरमा मेरो परिवार बस्छ।',
    englishTranslation: 'My family lives in my house.',
    pronunciation: 'mero gharma mero parivaar baschha',
    phoneticGuide: 'me-ro ghar-ma me-ro pa-ri-vaar bas-chha',
    audioFile: 'mero_gharma_mero_parivaar_baschha.mp3',
    imageAsset: 'phrase_familyhome.png',
    category: 'family',
    subcategory: 'home',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Describing where family lives',
    vocabularyWords: ['family_11', 'family_12'],
    grammarPoints: ['grammar_family_05']
  }),
  
  new Phrase({
    id: 'phrase_family_06',
    nepaliPhrase: 'म मेरो परिवारलाई माया गर्छु।',
    englishTranslation: 'I love my family.',
    pronunciation: 'ma mero parivaarlaai maayaa garchhu',
    phoneticGuide: 'ma me-ro pa-ri-vaar-laa-i maa-yaa gar-chhu',
    audioFile: 'ma_mero_parivaarlaai_maayaa_garchhu.mp3',
    imageAsset: 'phrase_lovefamily.png',
    category: 'family',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    context: 'Expressing love for family',
    vocabularyWords: ['family_11'],
    grammarPoints: ['grammar_family_06']
  })
];

// Grammar Points
const grammarPoints = [
  new GrammarPoint({
    id: 'grammar_family_01',
    title: 'Possessive Pronouns: "मेरो" (mero)',
    nepaliPattern: 'मेरो [Noun]',
    englishExplanation: 'The possessive pronoun "मेरो" (mero) means "my" and is used before masculine nouns or general terms. For feminine nouns, "मेरी" (meri) is used.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'मेरो परिवार (My family)',
      'मेरो घर (My house)',
      'मेरी आमा (My mother)',
      'मेरा बुबा (My father)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_family_02',
    title: 'Honorific Verb Forms: "हुनुहुन्छ" (hunuhunchha)',
    nepaliPattern: '[Subject] हुनुहुन्छ',
    englishExplanation: 'The verb "हुनुहुन्छ" (hunuhunchha) is an honorific form of "हो" (ho) meaning "is". It is used to show respect when referring to elders or respected family members.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'मेरा बुबा घरमा हुनुहुन्छ। (My father is at home.)',
      'मेरी आमा शिक्षिका हुनुहुन्छ। (My mother is a teacher.)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_family_03',
    title: 'Counting People: "जना" (janaa)',
    nepaliPattern: '[Number] जना',
    englishExplanation: 'When counting people in Nepali, the counter word "जना" (janaa) is used after the number.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'पाँच जना (Five people)',
      'मेरो परिवारमा छ जना छन्। (There are six people in my family.)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_family_04',
    title: 'Question Word: "को-को" (ko-ko)',
    nepaliPattern: 'को-को [Verb]?',
    englishExplanation: 'The reduplicated question word "को-को" (ko-ko) means "who all" or "which people" and is used to ask about multiple people.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'तिम्रो परिवारमा को-को हुनुहुन्छ? (Who are the members of your family?)',
      'तिम्रो स्कूलमा को-को छन्? (Who all are there in your school?)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_family_05',
    title: 'Locative Case: "मा" (ma)',
    nepaliPattern: '[Noun] मा',
    englishExplanation: 'The locative case marker "मा" (ma) is added to a noun to indicate location or place. It corresponds to "in", "at", or "on" in English.',
    difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
    examples: [
      'घरमा (In the house)',
      'स्कूलमा (At school)',
      'मेरो घरमा मेरो परिवार बस्छ। (My family lives in my house.)'
    ]
  }),
  
  new GrammarPoint({
    id: 'grammar_family_06',
    title: 'Expressing Love: "माया गर्नु" (maayaa garnu)',
    nepaliPattern: '[Object] लाई माया गर्नु',
    englishExplanation: 'The phrase "माया गर्नु" (maayaa garnu) means "to love". The object of love takes the dative case marker "लाई" (laai).',
    difficulty: DIFFICULTY_LEVELS.LEVEL_2.id,
    examples: [
      'म मेरो परिवारलाई माया गर्छु। (I love my family.)',
      'म मेरी आमालाई माया गर्छु। (I love my mother.)'
    ]
  })
];

// Pronunciation Guides
const pronunciationGuides = [
  new PronunciationGuide({
    id: 'pron_guide_family_01',
    word: 'आमा',
    phoneticRepresentation: 'aama',
    syllableBreakdown: ['आ', 'मा'],
    audioFile: 'aama_guide.mp3',
    pronunciationTips: [
      'The "aa" is a long vowel sound, like in "father"',
      'The "ma" is pronounced with a short "a" sound'
    ]
  }),
  
  new PronunciationGuide({
    id: 'pron_guide_family_02',
    word: 'बुबा',
    phoneticRepresentation: 'buba',
    syllableBreakdown: ['बु', 'बा'],
    audioFile: 'buba_guide.mp3',
    pronunciationTips: [
      'The "bu" is pronounced with a short "u" sound, like in "put"',
      'The "ba" is pronounced with a short "a" sound'
    ]
  }),
  
  new PronunciationGuide({
    id: 'pron_guide_family_03',
    word: 'परिवार',
    phoneticRepresentation: 'parivaar',
    syllableBreakdown: ['प', 'रि', 'वा', 'र'],
    audioFile: 'parivaar_guide.mp3',
    pronunciationTips: [
      'The "pa" is pronounced with a short "a" sound',
      'The "ri" is pronounced with a short "i" sound, like in "bit"',
      'The "vaa" is a long vowel sound',
      'The "r" at the end is slightly rolled'
    ]
  })
];

// Create Thematic Unit
const familyUnit = new ThematicUnit({
  id: 'unit_family',
  title: 'Family Members',
  description: 'Learn Nepali words for family members and how to talk about your family.',
  difficulty: DIFFICULTY_LEVELS.LEVEL_1.id,
  category: 'family',
  vocabularyItems: familyVocabularyItems.map(item => item.id),
  phrases: phrases.map(phrase => phrase.id),
  grammarPoints: grammarPoints.map(point => point.id),
  learningObjectives: [
    'Identify and name family members in Nepali',
    'Introduce family members using appropriate honorifics',
    'Describe family size and composition',
    'Ask and answer questions about family',
    'Express feelings about family members'
  ],
  rocketThemeConnection: 'Just like a rocket needs a launch team, you have a family team supporting you! Learn to introduce your mission control center - your family - in Nepali.',
  completionCriteria: {
    vocabularyMastery: 80,
    phraseMastery: 70,
    quizScore: 70
  }
});

// Export all content
export const UNIT_FAMILY = {
  unit: familyUnit,
  vocabularyItems: familyVocabularyItems,
  phrases,
  grammarPoints,
  pronunciationGuides
};

export default UNIT_FAMILY;
