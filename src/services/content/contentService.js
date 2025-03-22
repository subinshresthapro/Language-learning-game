/**
 * Content Service for NepaliJets app
 * Handles language content storage, retrieval, and management
 */

import { firestore } from '../../config/firebase';
import { 
  collection, doc, setDoc, getDoc, getDocs, 
  query, where, orderBy, limit, updateDoc 
} from 'firebase/firestore';
import storageService from '../storage/storageService';

// Local storage keys
const STORAGE_KEYS = {
  VOCABULARY: 'nepali_vocabulary',
  PHRASES: 'nepali_phrases',
  GRAMMAR: 'nepali_grammar',
  THEMATIC_UNITS: 'nepali_thematic_units',
  PRONUNCIATION_GUIDES: 'nepali_pronunciation_guides',
  LEARNING_PATHS: 'nepali_learning_paths',
  USER_PROGRESS: 'user_language_progress'
};

// Firestore collection names
const COLLECTIONS = {
  VOCABULARY: 'vocabulary',
  PHRASES: 'phrases',
  GRAMMAR: 'grammar',
  THEMATIC_UNITS: 'thematic_units',
  PRONUNCIATION_GUIDES: 'pronunciation_guides',
  LEARNING_PATHS: 'learning_paths',
  USER_PROGRESS: 'language_progress'
};

/**
 * Save vocabulary items to local storage
 * @param {Array} vocabularyItems - Array of vocabulary items
 * @returns {Promise} - Promise with success status
 */
export const saveVocabularyToLocal = async (vocabularyItems) => {
  try {
    return await storageService.saveToLocalStorage(STORAGE_KEYS.VOCABULARY, vocabularyItems);
  } catch (error) {
    console.error('Error saving vocabulary to local storage:', error);
    throw error;
  }
};

/**
 * Get vocabulary items from local storage
 * @returns {Promise} - Promise with vocabulary items
 */
export const getVocabularyFromLocal = async () => {
  try {
    return await storageService.getFromLocalStorage(STORAGE_KEYS.VOCABULARY);
  } catch (error) {
    console.error('Error getting vocabulary from local storage:', error);
    throw error;
  }
};

/**
 * Save phrases to local storage
 * @param {Array} phrases - Array of phrases
 * @returns {Promise} - Promise with success status
 */
export const savePhrasesToLocal = async (phrases) => {
  try {
    return await storageService.saveToLocalStorage(STORAGE_KEYS.PHRASES, phrases);
  } catch (error) {
    console.error('Error saving phrases to local storage:', error);
    throw error;
  }
};

/**
 * Get phrases from local storage
 * @returns {Promise} - Promise with phrases
 */
export const getPhrasesFromLocal = async () => {
  try {
    return await storageService.getFromLocalStorage(STORAGE_KEYS.PHRASES);
  } catch (error) {
    console.error('Error getting phrases from local storage:', error);
    throw error;
  }
};

/**
 * Save grammar points to local storage
 * @param {Array} grammarPoints - Array of grammar points
 * @returns {Promise} - Promise with success status
 */
export const saveGrammarToLocal = async (grammarPoints) => {
  try {
    return await storageService.saveToLocalStorage(STORAGE_KEYS.GRAMMAR, grammarPoints);
  } catch (error) {
    console.error('Error saving grammar to local storage:', error);
    throw error;
  }
};

/**
 * Get grammar points from local storage
 * @returns {Promise} - Promise with grammar points
 */
export const getGrammarFromLocal = async () => {
  try {
    return await storageService.getFromLocalStorage(STORAGE_KEYS.GRAMMAR);
  } catch (error) {
    console.error('Error getting grammar from local storage:', error);
    throw error;
  }
};

/**
 * Save thematic units to local storage
 * @param {Array} thematicUnits - Array of thematic units
 * @returns {Promise} - Promise with success status
 */
export const saveThematicUnitsToLocal = async (thematicUnits) => {
  try {
    return await storageService.saveToLocalStorage(STORAGE_KEYS.THEMATIC_UNITS, thematicUnits);
  } catch (error) {
    console.error('Error saving thematic units to local storage:', error);
    throw error;
  }
};

/**
 * Get thematic units from local storage
 * @returns {Promise} - Promise with thematic units
 */
export const getThematicUnitsFromLocal = async () => {
  try {
    return await storageService.getFromLocalStorage(STORAGE_KEYS.THEMATIC_UNITS);
  } catch (error) {
    console.error('Error getting thematic units from local storage:', error);
    throw error;
  }
};

/**
 * Save pronunciation guides to local storage
 * @param {Array} pronunciationGuides - Array of pronunciation guides
 * @returns {Promise} - Promise with success status
 */
export const savePronunciationGuidesToLocal = async (pronunciationGuides) => {
  try {
    return await storageService.saveToLocalStorage(STORAGE_KEYS.PRONUNCIATION_GUIDES, pronunciationGuides);
  } catch (error) {
    console.error('Error saving pronunciation guides to local storage:', error);
    throw error;
  }
};

/**
 * Get pronunciation guides from local storage
 * @returns {Promise} - Promise with pronunciation guides
 */
export const getPronunciationGuidesFromLocal = async () => {
  try {
    return await storageService.getFromLocalStorage(STORAGE_KEYS.PRONUNCIATION_GUIDES);
  } catch (error) {
    console.error('Error getting pronunciation guides from local storage:', error);
    throw error;
  }
};

/**
 * Save learning paths to local storage
 * @param {Array} learningPaths - Array of learning paths
 * @returns {Promise} - Promise with success status
 */
export const saveLearningPathsToLocal = async (learningPaths) => {
  try {
    return await storageService.saveToLocalStorage(STORAGE_KEYS.LEARNING_PATHS, learningPaths);
  } catch (error) {
    console.error('Error saving learning paths to local storage:', error);
    throw error;
  }
};

/**
 * Get learning paths from local storage
 * @returns {Promise} - Promise with learning paths
 */
export const getLearningPathsFromLocal = async () => {
  try {
    return await storageService.getFromLocalStorage(STORAGE_KEYS.LEARNING_PATHS);
  } catch (error) {
    console.error('Error getting learning paths from local storage:', error);
    throw error;
  }
};

/**
 * Save user language progress to local storage
 * @param {Object} userProgress - User language progress object
 * @returns {Promise} - Promise with success status
 */
export const saveUserProgressToLocal = async (userProgress) => {
  try {
    return await storageService.saveToLocalStorage(STORAGE_KEYS.USER_PROGRESS, userProgress);
  } catch (error) {
    console.error('Error saving user progress to local storage:', error);
    throw error;
  }
};

/**
 * Get user language progress from local storage
 * @returns {Promise} - Promise with user progress
 */
export const getUserProgressFromLocal = async () => {
  try {
    return await storageService.getFromLocalStorage(STORAGE_KEYS.USER_PROGRESS);
  } catch (error) {
    console.error('Error getting user progress from local storage:', error);
    throw error;
  }
};

/**
 * Save vocabulary items to cloud
 * @param {string} userId - User ID
 * @param {Array} vocabularyItems - Array of vocabulary items
 * @returns {Promise} - Promise with success status
 */
export const saveVocabularyToCloud = async (userId, vocabularyItems) => {
  try {
    const batch = [];
    for (const item of vocabularyItems) {
      batch.push(
        setDoc(doc(firestore, `users/${userId}/${COLLECTIONS.VOCABULARY}`, item.id), item)
      );
    }
    await Promise.all(batch);
    return true;
  } catch (error) {
    console.error('Error saving vocabulary to cloud:', error);
    throw error;
  }
};

/**
 * Get vocabulary items from cloud
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with vocabulary items
 */
export const getVocabularyFromCloud = async (userId) => {
  try {
    const vocabCollection = collection(firestore, `users/${userId}/${COLLECTIONS.VOCABULARY}`);
    const vocabSnapshot = await getDocs(vocabCollection);
    const vocabularyItems = [];
    
    vocabSnapshot.forEach((doc) => {
      vocabularyItems.push(doc.data());
    });
    
    return vocabularyItems;
  } catch (error) {
    console.error('Error getting vocabulary from cloud:', error);
    throw error;
  }
};

/**
 * Save phrases to cloud
 * @param {string} userId - User ID
 * @param {Array} phrases - Array of phrases
 * @returns {Promise} - Promise with success status
 */
export const savePhrasesToCloud = async (userId, phrases) => {
  try {
    const batch = [];
    for (const phrase of phrases) {
      batch.push(
        setDoc(doc(firestore, `users/${userId}/${COLLECTIONS.PHRASES}`, phrase.id), phrase)
      );
    }
    await Promise.all(batch);
    return true;
  } catch (error) {
    console.error('Error saving phrases to cloud:', error);
    throw error;
  }
};

/**
 * Get phrases from cloud
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with phrases
 */
export const getPhrasesFromCloud = async (userId) => {
  try {
    const phrasesCollection = collection(firestore, `users/${userId}/${COLLECTIONS.PHRASES}`);
    const phrasesSnapshot = await getDocs(phrasesCollection);
    const phrases = [];
    
    phrasesSnapshot.forEach((doc) => {
      phrases.push(doc.data());
    });
    
    return phrases;
  } catch (error) {
    console.error('Error getting phrases from cloud:', error);
    throw error;
  }
};

/**
 * Save grammar points to cloud
 * @param {string} userId - User ID
 * @param {Array} grammarPoints - Array of grammar points
 * @returns {Promise} - Promise with success status
 */
export const saveGrammarToCloud = async (userId, grammarPoints) => {
  try {
    const batch = [];
    for (const grammarPoint of grammarPoints) {
      batch.push(
        setDoc(doc(firestore, `users/${userId}/${COLLECTIONS.GRAMMAR}`, grammarPoint.id), grammarPoint)
      );
    }
    await Promise.all(batch);
    return true;
  } catch (error) {
    console.error('Error saving grammar to cloud:', error);
    throw error;
  }
};

/**
 * Get grammar points from cloud
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with grammar points
 */
export const getGrammarFromCloud = async (userId) => {
  try {
    const grammarCollection = collection(firestore, `users/${userId}/${COLLECTIONS.GRAMMAR}`);
    const grammarSnapshot = await getDocs(grammarCollection);
    const grammarPoints = [];
    
    grammarSnapshot.forEach((doc) => {
      grammarPoints.push(doc.data());
    });
    
    return grammarPoints;
  } catch (error) {
    console.error('Error getting grammar from cloud:', error);
    throw error;
  }
};

/**
 * Save thematic units to cloud
 * @param {string} userId - User ID
 * @param {Array} thematicUnits - Array of thematic units
 * @returns {Promise} - Promise with success status
 */
export const saveThematicUnitsToCloud = async (userId, thematicUnits) => {
  try {
    const batch = [];
    for (const unit of thematicUnits) {
      batch.push(
        setDoc(doc(firestore, `users/${userId}/${COLLECTIONS.THEMATIC_UNITS}`, unit.id), unit)
      );
    }
    await Promise.all(batch);
    return true;
  } catch (error) {
    console.error('Error saving thematic units to cloud:', error);
    throw error;
  }
};

/**
 * Get thematic units from cloud
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with thematic units
 */
export const getThematicUnitsFromCloud = async (userId) => {
  try {
    const unitsCollection = collection(firestore, `users/${userId}/${COLLECTIONS.THEMATIC_UNITS}`);
    const unitsSnapshot = await getDocs(unitsCollection);
    const thematicUnits = [];
    
    unitsSnapshot.forEach((doc) => {
      thematicUnits.push(doc.data());
    });
    
    return thematicUnits;
  } catch (error) {
    console.error('Error getting thematic units from cloud:', error);
    throw error;
  }
};

/**
 * Save user language progress to cloud
 * @param {string} userId - User ID
 * @param {Object} userProgress - User language progress object
 * @returns {Promise} - Promise with success status
 */
export const saveUserProgressToCloud = async (userId, userProgress) => {
  try {
    await setDoc(doc(firestore, `users/${userId}/${COLLECTIONS.USER_PROGRESS}`, 'progress'), userProgress);
    return true;
  } catch (error) {
    console.error('Error saving user progress to cloud:', error);
    throw error;
  }
};

/**
 * Get user language progress from cloud
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with user progress
 */
export const getUserProgressFromCloud = async (userId) => {
  try {
    const progressDoc = await getDoc(doc(firestore, `users/${userId}/${COLLECTIONS.USER_PROGRESS}`, 'progress'));
    
    if (progressDoc.exists()) {
      return progressDoc.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting user progress from cloud:', error);
    throw error;
  }
};

/**
 * Sync vocabulary items between local storage and cloud
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with synced vocabulary items
 */
export const syncVocabulary = async (userId) => {
  try {
    const localVocabulary = await getVocabularyFromLocal();
    const cloudVocabulary = await getVocabularyFromCloud(userId);
    
    if (!cloudVocabulary || cloudVocabulary.length === 0) {
      if (localVocabulary && localVocabulary.length > 0) {
        await saveVocabularyToCloud(userId, localVocabulary);
      }
      return localVocabulary || [];
    } else if (!localVocabulary || localVocabulary.length === 0) {
      await saveVocabularyToLocal(cloudVocabulary);
      return cloudVocabulary;
    } else {
      // Merge local and cloud data, preferring the most recently updated
      const mergedVocabulary = mergeContentArrays(localVocabulary, cloudVocabulary);
      await saveVocabularyToLocal(mergedVocabulary);
      await saveVocabularyToCloud(userId, mergedVocabulary);
      return mergedVocabulary;
    }
  } catch (error) {
    console.error('Error syncing vocabulary:', error);
    throw error;
  }
};

/**
 * Sync phrases between local storage and cloud
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with synced phrases
 */
export const syncPhrases = async (userId) => {
  try {
    const localPhrases = await getPhrasesFromLocal();
    const cloudPhrases = await getPhrasesFromCloud(userId);
    
    if (!cloudPhrases || cloudPhrases.length === 0) {
      if (localPhrases && localPhrases.length > 0) {
        await savePhrasesToCloud(userId, localPhrases);
      }
      return localPhrases || [];
    } else if (!localPhrases || localPhrases.length === 0) {
      await savePhrasesToLocal(cloudPhrases);
      return cloudPhrases;
    } else {
      // Merge local and cloud data, preferring the most recently updated
      const mergedPhrases = mergeContentArrays(localPhrases, cloudPhrases);
      await savePhrasesToLocal(mergedPhrases);
      await savePhrasesToCloud(userId, mergedPhrases);
      return mergedPhrases;
    }
  } catch (error) {
    console.error('Error syncing phrases:', error);
    throw error;
  }
};

/**
 * Sync grammar points between local storage and cloud
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with synced grammar points
 */
export const syncGrammar = async (userId) => {
  try {
    const localGrammar = await getGrammarFromLocal();
    const cloudGrammar = await getGrammarFromCloud(userId);
    
    if (!cloudGrammar || cloudGrammar.length === 0) {
      if (localGrammar && localGrammar.length > 0) {
        await saveGrammarToCloud(userId, localGrammar);
      }
      return localGrammar || [];
    } else if (!localGrammar || localGrammar.length === 0) {
      await saveGrammarToLocal(cloudGrammar);
      return cloudGrammar;
    } else {
      // Merge local and cloud data, preferring the most recently updated
      const mergedGrammar = mergeContentArrays(localGrammar, cloudGrammar);
      await saveGrammarToLocal(mergedGrammar);
      await saveGrammarToCloud(userId, mergedGrammar);
      return mergedGrammar;
    }
  } catch (error) {
    console.error('Error syncing grammar:', error);
    throw error;
  }
};

/**
 * Sync thematic units between local storage and cloud
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with synced thematic units
 */
export const syncThematicUnits = async (userId) => {
  try {
    const localUnits = await getThematicUnitsFromLocal();
    const cloudUnits = await getThematicUnitsFromCloud(userId);
    
    if (!cloudUnits || cloudUnits.length === 0) {
      if (localUnits && localUnits.length > 0) {
        await saveThematicUnitsToCloud(userId, localUnits);
      }
      return localUnits || [];
    } else if (!localUnits || localUnits.length === 0) {
      await saveThematicUnitsToLocal(cloudUnits);
      return cloudUnits;
    } else {
      // Merge local and cloud data, preferring the most recently updated
      const mergedUnits = mergeContentArrays(localUnits, cloudUnits);
      await saveThematicUnitsToLocal(mergedUnits);
      await saveThematicUnitsToCloud(userId, mergedUnits);
      return mergedUnits;
    }
  } catch (error) {
    console.error('Error syncing thematic units:', error);
    throw error;
  }
};

/**
 * Sync user language progress between local storage and cloud
 * @param {string} userId - User ID
 * @returns {Promise} - Promise with synced user progress
 */
export const syncUserProgress = async (userId) => {
  try {
    const localProgress = await getUserProgressFromLocal();
    const cloudProgress = await getUserProgressFromCloud(userId);
    
    if (!cloudProgress) {
      if (localProgress) {
        await saveUserProgressToCloud(userId, localProgress);
      }
      return localProgress || null;
    } else if (!localProgress) {
      await saveUserProgressToLocal(cloudProgress);
      return cloudProgress;
    } else {
      // Merge progress data, preferring the most recently updated
      const mergedProgress = mergeUserProgress(localProgress, cloudProgress);
      await saveUserProgressToLocal(mergedProgress);
      await saveUserProgressToCloud(userId, mergedProgress);
      return mergedProgress;
    }
  } catch (error) {
    console.error('Error syncing user progress:', error);
    throw error;
  }
};

/**
 * Merge two arrays of content items, preferring the most recently updated
 * @param {Array} localArray - Local array of content items
 * @param {Array} cloudArray - Cloud array of content items
 * @returns {Array} - Merged array of content items
 */
const mergeContentArrays = (localArray, cloudArray) => {
  const mergedMap = new Map();
  
  // Add all local items to the map
  for (const item of localArray) {
    mergedMap.set(item.id, item);
  }
  
  // Add or update with cloud items if they're more recent
  for (const cloudItem of cloudArray) {
    const localItem = mergedMap.get(cloudItem.id);
    
    if (!localItem) {
      // Item only exists in cloud
      mergedMap.set(cloudItem.id, cloudItem);
    } else {
      // Item exists in both, compare last practiced dates if available
      const localDate = localItem.lastPracticed ? new Date(localItem.lastPracticed) : new Date(0);
      const cloudDate = cloudItem.lastPracticed ? new Date(cloudItem.lastPracticed) : new Date(0);
      
      if (cloudDate > localDate) {
        mergedMap.set(cloudItem.id, cloudItem);
      }
    }
  }
  
  return Array.from(mergedMap.values());
};

/**
 * Merge user progress objects, preferring the most recently updated
 * @param {Object} localProgress - Local user progress
 * @param {Object} cloudProgress - Cloud user progress
 * @returns {Object} - Merged user progress
 */
const mergeUserProgress = (localProgress, cloudProgress) => {
  // Determine which progress is more recent
  const localDate = localProgress.lastSession ? new Date(localProgress.lastSession) : new Date(0);
  const cloudDate = cloudProgress.lastSession ? new Date(cloudProgress.lastSession) : new Date(0);
  
  if (cloudDate > localDate) {
    return cloudProgress;
  } else {
    return localProgress;
  }
};

/**
 * Get vocabulary items by category
 * @param {Array} vocabulary - Array of vocabulary items
 * @param {string} category - Category to filter by
 * @returns {Array} - Filtered vocabulary items
 */
export const getVocabularyByCategory = (vocabulary, category) => {
  return vocabulary.filter(item => item.category === category);
};

/**
 * Get vocabulary items by difficulty level
 * @param {Array} vocabulary - Array of vocabulary items
 * @param {number} difficulty - Difficulty level to filter by
 * @returns {Array} - Filtered vocabulary items
 */
export const getVocabularyByDifficulty = (vocabulary, difficulty) => {
  return vocabulary.filter(item => item.difficulty === difficulty);
};

/**
 * Get phrases by category
 * @param {Array} phrases - Array of phrases
 * @param {string} category - Category to filter by
 * @returns {Array} - Filtered phrases
 */
export const getPhrasesByCategory = (phrases, category) => {
  return phrases.filter(phrase => phrase.category === category);
};

/**
 * Get phrases by difficulty level
 * @param {Array} phrases - Array of phrases
 * @param {number} difficulty - Difficulty level to filter by
 * @returns {Array} - Filtered phrases
 */
export const getPhrasesByDifficulty = (phrases, difficulty) => {
  return phrases.filter(phrase => phrase.difficulty === difficulty);
};

/**
 * Get thematic units by category
 * @param {Array} units - Array of thematic units
 * @param {string} category - Category to filter by
 * @returns {Array} - Filtered thematic units
 */
export const getThematicUnitsByCategory = (units, category) => {
  return units.filter(unit => unit.category === category);
};

/**
 * Get thematic units by difficulty level
 * @param {Array} units - Array of thematic units
 * @param {number} difficulty - Difficulty level to filter by
 * @returns {Array} - Filtered thematic units
 */
export const getThematicUnitsByDifficulty = (units, difficulty) => {
  return units.filter(unit => unit.difficulty === difficulty);
};

/**
 * Update vocabulary item mastery status
 * @param {Array} vocabulary - Array of vocabulary items
 * @param {string} itemId - ID of the item to update
 * @param {boolean} mastered - New mastery status
 * @returns {Array} - Updated vocabulary items
 */
export const updateVocabularyMastery = (vocabulary, itemId, mastered) => {
  return vocabulary.map(item => {
    if (item.id === itemId) {
      return { ...item, mastered };
    }
    return item;
  });
};

/**
 * Update phrase mastery status
 * @param {Array} phrases - Array of phrases
 * @param {string} phraseId - ID of the phrase to update
 * @param {boolean} mastered - New mastery status
 * @returns {Array} - Updated phrases
 */
export const updatePhraseMastery = (phrases, phraseId, mastered) => {
  return phrases.map(phrase => {
    if (phrase.id === phraseId) {
      return { ...phrase, mastered };
    }
    return phrase;
  });
};

/**
 * Update thematic unit progress
 * @param {Array} units - Array of thematic units
 * @param {string} unitId - ID of the unit to update
 * @param {number} progress - New progress value (0-100)
 * @returns {Array} - Updated thematic units
 */
export const updateThematicUnitProgress = (units, unitId, progress) => {
  return units.map(unit => {
    if (unit.id === unitId) {
      const completed = progress >= 100;
      return { ...unit, progress, completed };
    }
    return unit;
  });
};

export default {
  // Local storage operations
  saveVocabularyToLocal,
  getVocabularyFromLocal,
  savePhrasesToLocal,
  getPhrasesFromLocal,
  saveGrammarToLocal,
  getGrammarFromLocal,
  saveThematicUnitsToLocal,
  getThematicUnitsFromLocal,
  savePronunciationGuidesToLocal,
  getPronunciationGuidesFromLocal,
  saveLearningPathsToLocal,
  getLearningPathsFromLocal,
  saveUserProgressToLocal,
  getUserProgressFromLocal,
  
  // Cloud operations
  saveVocabularyToCloud,
  getVocabularyFromCloud,
  savePhrasesToCloud,
  getPhrasesFromCloud,
  saveGrammarToCloud,
  getGrammarFromCloud,
  saveThematicUnitsToCloud,
  getThematicUnitsFromCloud,
  saveUserProgressToCloud,
  getUserProgressFromCloud,
  
  // Sync operations
  syncVocabulary,
  syncPhrases,
  syncGrammar,
  syncThematicUnits,
  syncUserProgress,
  
  // Utility functions
  getVocabularyByCategory,
  getVocabularyByDifficulty,
  getPhrasesByCategory,
  getPhrasesByDifficulty,
  getThematicUnitsByCategory,
  getThematicUnitsByDifficulty,
  updateVocabularyMastery,
  updatePhraseMastery,
  updateThematicUnitProgress
};
