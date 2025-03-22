/**
 * Pronunciation Service for NepaliJets app
 * Handles audio playback, pronunciation guides, and feedback mechanisms
 */

import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import contentService from '../content/contentService';

// Audio playback states
export const PLAYBACK_STATUS = {
  LOADING: 'loading',
  PLAYING: 'playing',
  PAUSED: 'paused',
  STOPPED: 'stopped',
  ERROR: 'error'
};

// Audio directory paths
const AUDIO_DIRS = {
  VOCABULARY: `${FileSystem.documentDirectory}audio/vocabulary/`,
  PHRASES: `${FileSystem.documentDirectory}audio/phrases/`,
  PRONUNCIATION_GUIDES: `${FileSystem.documentDirectory}audio/guides/`
};

// Ensure audio directories exist
export const initializeAudioDirectories = async () => {
  try {
    const dirs = Object.values(AUDIO_DIRS);
    for (const dir of dirs) {
      const dirInfo = await FileSystem.getInfoAsync(dir);
      if (!dirInfo.exists) {
        await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
      }
    }
    return true;
  } catch (error) {
    console.error('Error initializing audio directories:', error);
    throw error;
  }
};

/**
 * Load audio file
 * @param {string} audioFile - Audio file name or URI
 * @returns {Promise} - Promise with sound object
 */
export const loadAudio = async (audioFile) => {
  try {
    let audioUri = audioFile;
    
    // Check if the audio file is a remote URL
    if (!audioFile.startsWith('http') && !audioFile.startsWith('file')) {
      // Check if the file exists in local directories
      for (const dir of Object.values(AUDIO_DIRS)) {
        const localPath = `${dir}${audioFile}`;
        const fileInfo = await FileSystem.getInfoAsync(localPath);
        
        if (fileInfo.exists) {
          audioUri = localPath;
          break;
        }
      }
    }
    
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioUri },
      { shouldPlay: false }
    );
    
    return sound;
  } catch (error) {
    console.error('Error loading audio:', error);
    throw error;
  }
};

/**
 * Play audio file
 * @param {string} audioFile - Audio file name or URI
 * @returns {Promise} - Promise with playback status
 */
export const playAudio = async (audioFile) => {
  try {
    const sound = await loadAudio(audioFile);
    await sound.playAsync();
    
    // Return cleanup function to unload sound when done
    return {
      status: PLAYBACK_STATUS.PLAYING,
      stop: async () => {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
    };
  } catch (error) {
    console.error('Error playing audio:', error);
    return { status: PLAYBACK_STATUS.ERROR, error };
  }
};

/**
 * Download audio file from remote URL
 * @param {string} remoteUrl - Remote URL of audio file
 * @param {string} fileName - File name to save as
 * @param {string} category - Category for directory selection (vocabulary, phrases, guides)
 * @returns {Promise} - Promise with local file URI
 */
export const downloadAudio = async (remoteUrl, fileName, category = 'vocabulary') => {
  try {
    // Select appropriate directory
    let directory;
    switch (category) {
      case 'vocabulary':
        directory = AUDIO_DIRS.VOCABULARY;
        break;
      case 'phrases':
        directory = AUDIO_DIRS.PHRASES;
        break;
      case 'guides':
        directory = AUDIO_DIRS.PRONUNCIATION_GUIDES;
        break;
      default:
        directory = AUDIO_DIRS.VOCABULARY;
    }
    
    // Ensure directory exists
    await initializeAudioDirectories();
    
    // Download file
    const localUri = `${directory}${fileName}`;
    const downloadResult = await FileSystem.downloadAsync(remoteUrl, localUri);
    
    if (downloadResult.status === 200) {
      return localUri;
    } else {
      throw new Error(`Download failed with status ${downloadResult.status}`);
    }
  } catch (error) {
    console.error('Error downloading audio:', error);
    throw error;
  }
};

/**
 * Get local audio file URI
 * @param {string} fileName - Audio file name
 * @param {string} category - Category for directory selection (vocabulary, phrases, guides)
 * @returns {Promise} - Promise with local file URI or null if not found
 */
export const getLocalAudioUri = async (fileName, category = 'vocabulary') => {
  try {
    // Select appropriate directory
    let directory;
    switch (category) {
      case 'vocabulary':
        directory = AUDIO_DIRS.VOCABULARY;
        break;
      case 'phrases':
        directory = AUDIO_DIRS.PHRASES;
        break;
      case 'guides':
        directory = AUDIO_DIRS.PRONUNCIATION_GUIDES;
        break;
      default:
        directory = AUDIO_DIRS.VOCABULARY;
    }
    
    const localUri = `${directory}${fileName}`;
    const fileInfo = await FileSystem.getInfoAsync(localUri);
    
    return fileInfo.exists ? localUri : null;
  } catch (error) {
    console.error('Error getting local audio URI:', error);
    throw error;
  }
};

/**
 * Create phonetic representation for Nepali word
 * @param {string} nepaliWord - Nepali word
 * @returns {string} - Phonetic representation
 */
export const createPhoneticRepresentation = (nepaliWord) => {
  // This is a simplified phonetic mapping for demonstration
  // In a production app, this would be more comprehensive
  const phoneticMap = {
    'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo',
    'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'अं': 'am', 'अः': 'aha',
    'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
    'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
    'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
    'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
    'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
    'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'wa', 'श': 'sha',
    'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'क्ष': 'ksha', 'त्र': 'tra', 'ज्ञ': 'gya',
    '०': '0', '१': '1', '२': '2', '३': '3', '४': '4',
    '५': '5', '६': '6', '७': '7', '८': '8', '९': '9',
    'ा': 'aa', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo',
    'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'm', 'ः': 'h',
    '्': ''
  };
  
  // Convert Nepali characters to phonetic representation
  let phonetic = '';
  for (let i = 0; i < nepaliWord.length; i++) {
    const char = nepaliWord[i];
    if (phoneticMap[char]) {
      phonetic += phoneticMap[char];
    } else {
      phonetic += char;
    }
  }
  
  return phonetic;
};

/**
 * Break word into syllables
 * @param {string} nepaliWord - Nepali word
 * @returns {Array} - Array of syllables
 */
export const breakIntoSyllables = (nepaliWord) => {
  // This is a simplified syllable breaking algorithm for demonstration
  // In a production app, this would be more comprehensive
  
  // Vowels in Nepali
  const vowels = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'];
  const vowelMarkers = ['ा', 'ि', 'ी', 'ु', 'ू', 'े', 'ै', 'ो', 'ौ', 'ं', 'ः'];
  
  const syllables = [];
  let currentSyllable = '';
  
  for (let i = 0; i < nepaliWord.length; i++) {
    const char = nepaliWord[i];
    currentSyllable += char;
    
    // If character is a vowel or has a vowel marker, end syllable
    if (vowels.includes(char) || vowelMarkers.includes(char) || i === nepaliWord.length - 1) {
      syllables.push(currentSyllable);
      currentSyllable = '';
    }
  }
  
  // If there's any remaining syllable, add it
  if (currentSyllable) {
    syllables.push(currentSyllable);
  }
  
  return syllables;
};

/**
 * Create pronunciation guide for a word
 * @param {string} nepaliWord - Nepali word
 * @param {string} audioFile - Audio file name
 * @returns {Object} - Pronunciation guide object
 */
export const createPronunciationGuide = (nepaliWord, audioFile) => {
  const phoneticRepresentation = createPhoneticRepresentation(nepaliWord);
  const syllables = breakIntoSyllables(nepaliWord);
  
  return {
    id: `guide_${nepaliWord}`,
    word: nepaliWord,
    phoneticRepresentation,
    syllableBreakdown: syllables,
    audioFile,
    mouthShapeImages: [], // Would be populated with actual images in production
    pronunciationTips: [
      'Listen to the audio carefully',
      'Pay attention to the stress on syllables',
      'Practice each syllable separately before combining'
    ],
    commonErrors: [
      'Incorrect stress placement',
      'Mispronunciation of unique Nepali sounds',
      'Incorrect rhythm or timing'
    ]
  };
};

/**
 * Get pronunciation accuracy feedback
 * @param {string} expected - Expected pronunciation
 * @param {string} actual - Actual pronunciation
 * @returns {Object} - Feedback object with score and suggestions
 */
export const getPronunciationFeedback = (expected, actual) => {
  // This is a simplified feedback mechanism for demonstration
  // In a production app, this would use more sophisticated speech recognition and analysis
  
  // Calculate simple similarity score
  const maxLength = Math.max(expected.length, actual.length);
  let matchCount = 0;
  
  for (let i = 0; i < Math.min(expected.length, actual.length); i++) {
    if (expected[i].toLowerCase() === actual[i].toLowerCase()) {
      matchCount++;
    }
  }
  
  const similarityScore = Math.round((matchCount / maxLength) * 100);
  
  // Generate feedback based on score
  let feedback;
  if (similarityScore >= 90) {
    feedback = 'Excellent pronunciation!';
  } else if (similarityScore >= 70) {
    feedback = 'Good pronunciation. Keep practicing!';
  } else if (similarityScore >= 50) {
    feedback = 'Fair pronunciation. Try listening to the audio again.';
  } else {
    feedback = 'Needs improvement. Listen carefully to each syllable.';
  }
  
  return {
    score: similarityScore,
    feedback,
    suggestions: [
      'Listen to the audio multiple times',
      'Practice each syllable separately',
      'Pay attention to the stress patterns'
    ]
  };
};

/**
 * Generate audio playback sequence for a thematic unit
 * @param {Object} thematicUnit - Thematic unit object
 * @returns {Array} - Array of audio playback items with timing
 */
export const generateAudioSequence = (thematicUnit) => {
  const sequence = [];
  
  // Add unit introduction
  sequence.push({
    type: 'introduction',
    text: `Let's learn about ${thematicUnit.title}`,
    delay: 1000
  });
  
  // Add vocabulary items
  for (const vocabItem of thematicUnit.vocabularyItems) {
    sequence.push({
      type: 'vocabulary',
      item: vocabItem,
      audioFile: vocabItem.audioFile,
      text: `${vocabItem.nepaliWord} means ${vocabItem.englishTranslation}`,
      delay: 3000 // Time between words
    });
  }
  
  // Add phrases
  for (const phrase of thematicUnit.phrases) {
    sequence.push({
      type: 'phrase',
      item: phrase,
      audioFile: phrase.audioFile,
      text: `${phrase.nepaliPhrase} means ${phrase.englishTranslation}`,
      delay: 4000 // Time between phrases
    });
  }
  
  // Add conclusion
  sequence.push({
    type: 'conclusion',
    text: `Great job learning about ${thematicUnit.title}!`,
    delay: 1000
  });
  
  return sequence;
};

export default {
  // Audio playback
  initializeAudioDirectories,
  loadAudio,
  playAudio,
  downloadAudio,
  getLocalAudioUri,
  PLAYBACK_STATUS,
  
  // Pronunciation guides
  createPhoneticRepresentation,
  breakIntoSyllables,
  createPronunciationGuide,
  
  // Feedback mechanisms
  getPronunciationFeedback,
  
  // Audio sequences
  generateAudioSequence
};
