/**
 * NepaliWordsData.js
 * 
 * Dataset of 30 Nepali words for the language learning prototype
 * Includes word, translation, pronunciation, category, and difficulty level
 */

const NEPALI_WORDS = [
  // Greetings - Beginner Level
  {
    id: 'word_1',
    nepaliWord: 'नमस्ते',
    englishTranslation: 'Hello',
    pronunciation: 'namaste',
    audioFile: 'namaste.mp3',
    imageAsset: 'hello.png',
    category: 'greetings',
    difficulty: 1,
    example: 'नमस्ते, तपाईंलाई कस्तो छ? (Hello, how are you?)'
  },
  {
    id: 'word_2',
    nepaliWord: 'धन्यवाद',
    englishTranslation: 'Thank you',
    pronunciation: 'dhanyavaad',
    audioFile: 'dhanyavaad.mp3',
    imageAsset: 'thankyou.png',
    category: 'greetings',
    difficulty: 1,
    example: 'मद्दतको लागि धन्यवाद। (Thank you for your help.)'
  },
  {
    id: 'word_3',
    nepaliWord: 'नमस्कार',
    englishTranslation: 'Greetings',
    pronunciation: 'namaskaar',
    audioFile: 'namaskaar.mp3',
    imageAsset: 'greetings.png',
    category: 'greetings',
    difficulty: 1,
    example: 'सबैलाई नमस्कार! (Greetings to everyone!)'
  },
  
  // Colors - Beginner Level
  {
    id: 'word_4',
    nepaliWord: 'रातो',
    englishTranslation: 'Red',
    pronunciation: 'raato',
    audioFile: 'raato.mp3',
    imageAsset: 'red.png',
    category: 'colors',
    difficulty: 1,
    example: 'यो फूल रातो छ। (This flower is red.)'
  },
  {
    id: 'word_5',
    nepaliWord: 'निलो',
    englishTranslation: 'Blue',
    pronunciation: 'nilo',
    audioFile: 'nilo.mp3',
    imageAsset: 'blue.png',
    category: 'colors',
    difficulty: 1,
    example: 'आकाश निलो छ। (The sky is blue.)'
  },
  {
    id: 'word_6',
    nepaliWord: 'हरियो',
    englishTranslation: 'Green',
    pronunciation: 'hariyo',
    audioFile: 'hariyo.mp3',
    imageAsset: 'green.png',
    category: 'colors',
    difficulty: 1,
    example: 'घाँस हरियो छ। (The grass is green.)'
  },
  {
    id: 'word_7',
    nepaliWord: 'पहेंलो',
    englishTranslation: 'Yellow',
    pronunciation: 'pahelo',
    audioFile: 'pahelo.mp3',
    imageAsset: 'yellow.png',
    category: 'colors',
    difficulty: 1,
    example: 'यो केरा पहेंलो छ। (This banana is yellow.)'
  },
  {
    id: 'word_8',
    nepaliWord: 'कालो',
    englishTranslation: 'Black',
    pronunciation: 'kaalo',
    audioFile: 'kaalo.mp3',
    imageAsset: 'black.png',
    category: 'colors',
    difficulty: 1,
    example: 'मेरो कपाल कालो छ। (My hair is black.)'
  },
  
  // Numbers - Beginner Level
  {
    id: 'word_9',
    nepaliWord: 'एक',
    englishTranslation: 'One',
    pronunciation: 'ek',
    audioFile: 'ek.mp3',
    imageAsset: 'one.png',
    category: 'numbers',
    difficulty: 1,
    example: 'मसँग एक किताब छ। (I have one book.)'
  },
  {
    id: 'word_10',
    nepaliWord: 'दुई',
    englishTranslation: 'Two',
    pronunciation: 'dui',
    audioFile: 'dui.mp3',
    imageAsset: 'two.png',
    category: 'numbers',
    difficulty: 1,
    example: 'मसँग दुई भाइ छन्। (I have two brothers.)'
  },
  {
    id: 'word_11',
    nepaliWord: 'तीन',
    englishTranslation: 'Three',
    pronunciation: 'teen',
    audioFile: 'teen.mp3',
    imageAsset: 'three.png',
    category: 'numbers',
    difficulty: 1,
    example: 'त्यहाँ तीन रुख छन्। (There are three trees.)'
  },
  {
    id: 'word_12',
    nepaliWord: 'चार',
    englishTranslation: 'Four',
    pronunciation: 'chaar',
    audioFile: 'chaar.mp3',
    imageAsset: 'four.png',
    category: 'numbers',
    difficulty: 1,
    example: 'एक गाडीमा चार पाङ्ग्रा हुन्छन्। (A car has four wheels.)'
  },
  {
    id: 'word_13',
    nepaliWord: 'पाँच',
    englishTranslation: 'Five',
    pronunciation: 'paanch',
    audioFile: 'paanch.mp3',
    imageAsset: 'five.png',
    category: 'numbers',
    difficulty: 1,
    example: 'हातमा पाँच औंला हुन्छन्। (There are five fingers on a hand.)'
  },
  
  // Animals - Intermediate Level
  {
    id: 'word_14',
    nepaliWord: 'कुकुर',
    englishTranslation: 'Dog',
    pronunciation: 'kukur',
    audioFile: 'kukur.mp3',
    imageAsset: 'dog.png',
    category: 'animals',
    difficulty: 2,
    example: 'मेरो कुकुर धेरै रमाइलो छ। (My dog is very playful.)'
  },
  {
    id: 'word_15',
    nepaliWord: 'बिरालो',
    englishTranslation: 'Cat',
    pronunciation: 'biralo',
    audioFile: 'biralo.mp3',
    imageAsset: 'cat.png',
    category: 'animals',
    difficulty: 2,
    example: 'बिरालो दूध पिउँछ। (The cat drinks milk.)'
  },
  {
    id: 'word_16',
    nepaliWord: 'हात्ती',
    englishTranslation: 'Elephant',
    pronunciation: 'haatti',
    audioFile: 'haatti.mp3',
    imageAsset: 'elephant.png',
    category: 'animals',
    difficulty: 2,
    example: 'हात्ती एक ठूलो जनावर हो। (The elephant is a big animal.)'
  },
  {
    id: 'word_17',
    nepaliWord: 'माछा',
    englishTranslation: 'Fish',
    pronunciation: 'maachaa',
    audioFile: 'maachaa.mp3',
    imageAsset: 'fish.png',
    category: 'animals',
    difficulty: 2,
    example: 'माछा पानीमा बस्छ। (Fish live in water.)'
  },
  {
    id: 'word_18',
    nepaliWord: 'चरा',
    englishTranslation: 'Bird',
    pronunciation: 'charaa',
    audioFile: 'charaa.mp3',
    imageAsset: 'bird.png',
    category: 'animals',
    difficulty: 2,
    example: 'चरा आकाशमा उड्छ। (Birds fly in the sky.)'
  },
  
  // Family - Intermediate Level
  {
    id: 'word_19',
    nepaliWord: 'आमा',
    englishTranslation: 'Mother',
    pronunciation: 'aama',
    audioFile: 'aama.mp3',
    imageAsset: 'mother.png',
    category: 'family',
    difficulty: 2,
    example: 'मेरी आमा धेरै राम्री छिन्। (My mother is very beautiful.)'
  },
  {
    id: 'word_20',
    nepaliWord: 'बुबा',
    englishTranslation: 'Father',
    pronunciation: 'buba',
    audioFile: 'buba.mp3',
    imageAsset: 'father.png',
    category: 'family',
    difficulty: 2,
    example: 'मेरा बुबा काममा जानुहुन्छ। (My father goes to work.)'
  },
  {
    id: 'word_21',
    nepaliWord: 'दिदी',
    englishTranslation: 'Elder Sister',
    pronunciation: 'didi',
    audioFile: 'didi.mp3',
    imageAsset: 'elder_sister.png',
    category: 'family',
    difficulty: 2,
    example: 'मेरी दिदी स्कूल जानुहुन्छ। (My elder sister goes to school.)'
  },
  {
    id: 'word_22',
    nepaliWord: 'दाई',
    englishTranslation: 'Elder Brother',
    pronunciation: 'dai',
    audioFile: 'dai.mp3',
    imageAsset: 'elder_brother.png',
    category: 'family',
    difficulty: 2,
    example: 'मेरा दाई खेल्न मन पराउनुहुन्छ। (My elder brother likes to play.)'
  },
  
  // Basic Verbs - Intermediate Level
  {
    id: 'word_23',
    nepaliWord: 'खानु',
    englishTranslation: 'To eat',
    pronunciation: 'khaanu',
    audioFile: 'khaanu.mp3',
    imageAsset: 'eat.png',
    category: 'verbs',
    difficulty: 2,
    example: 'म भात खान्छु। (I eat rice.)'
  },
  {
    id: 'word_24',
    nepaliWord: 'पिउनु',
    englishTranslation: 'To drink',
    pronunciation: 'piunu',
    audioFile: 'piunu.mp3',
    imageAsset: 'drink.png',
    category: 'verbs',
    difficulty: 2,
    example: 'म पानी पिउँछु। (I drink water.)'
  },
  {
    id: 'word_25',
    nepaliWord: 'जानु',
    englishTranslation: 'To go',
    pronunciation: 'jaanu',
    audioFile: 'jaanu.mp3',
    imageAsset: 'go.png',
    category: 'verbs',
    difficulty: 2,
    example: 'म स्कूल जान्छु। (I go to school.)'
  },
  {
    id: 'word_26',
    nepaliWord: 'आउनु',
    englishTranslation: 'To come',
    pronunciation: 'aaunu',
    audioFile: 'aaunu.mp3',
    imageAsset: 'come.png',
    category: 'verbs',
    difficulty: 2,
    example: 'तिमी कहिले आउँछौ? (When do you come?)'
  },
  
  // Common Objects - Beginner Level
  {
    id: 'word_27',
    nepaliWord: 'किताब',
    englishTranslation: 'Book',
    pronunciation: 'kitaab',
    audioFile: 'kitaab.mp3',
    imageAsset: 'book.png',
    category: 'objects',
    difficulty: 1,
    example: 'यो मेरो किताब हो। (This is my book.)'
  },
  {
    id: 'word_28',
    nepaliWord: 'कलम',
    englishTranslation: 'Pen',
    pronunciation: 'kalam',
    audioFile: 'kalam.mp3',
    imageAsset: 'pen.png',
    category: 'objects',
    difficulty: 1,
    example: 'यो कलम निलो छ। (This pen is blue.)'
  },
  {
    id: 'word_29',
    nepaliWord: 'पानी',
    englishTranslation: 'Water',
    pronunciation: 'paani',
    audioFile: 'paani.mp3',
    imageAsset: 'water.png',
    category: 'objects',
    difficulty: 1,
    example: 'मलाई पानी चाहिन्छ। (I need water.)'
  },
  {
    id: 'word_30',
    nepaliWord: 'खाना',
    englishTranslation: 'Food',
    pronunciation: 'khaana',
    audioFile: 'khaana.mp3',
    imageAsset: 'food.png',
    category: 'objects',
    difficulty: 1,
    example: 'खाना मिठो छ। (The food is delicious.)'
  }
];

export default NEPALI_WORDS;
