/**
 * RewardSystem.js
 * 
 * Central reward system for NepaliJets
 * Handles reward distribution, achievement tracking, and collectibles management
 */

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useGame } from '../game/GameManager';
import { useProfile } from '../../context/ProfileContext';

// Create Reward Context
export const RewardContext = createContext();

// Sample rewards data - in production this would come from a database
const REWARDS = {
  stars: {
    bronze: { id: 'star_bronze', value: 1, imageAsset: 'star_bronze.png' },
    silver: { id: 'star_silver', value: 2, imageAsset: 'star_silver.png' },
    gold: { id: 'star_gold', value: 3, imageAsset: 'star_gold.png' },
  },
  badges: [
    { id: 'first_word', name: 'First Word', description: 'Learn your first Nepali word', imageAsset: 'badge_first_word.png', criteria: { wordsLearned: 1 } },
    { id: 'word_collector', name: 'Word Collector', description: 'Learn 10 Nepali words', imageAsset: 'badge_word_collector.png', criteria: { wordsLearned: 10 } },
    { id: 'vocabulary_master', name: 'Vocabulary Master', description: 'Learn 25 Nepali words', imageAsset: 'badge_vocabulary_master.png', criteria: { wordsLearned: 25 } },
    { id: 'perfect_match', name: 'Perfect Match', description: 'Complete a level with 100% accuracy', imageAsset: 'badge_perfect_match.png', criteria: { perfectScore: true } },
    { id: 'speed_learner', name: 'Speed Learner', description: 'Complete a level in half the allotted time', imageAsset: 'badge_speed_learner.png', criteria: { timeBonus: 0.5 } },
    { id: 'daily_streak_3', name: '3-Day Streak', description: 'Learn for 3 consecutive days', imageAsset: 'badge_streak_3.png', criteria: { streak: 3 } },
    { id: 'daily_streak_7', name: '7-Day Streak', description: 'Learn for 7 consecutive days', imageAsset: 'badge_streak_7.png', criteria: { streak: 7 } },
  ],
  collectibles: {
    rocket_parts: [
      { id: 'rocket_nose_basic', name: 'Basic Nose Cone', description: 'Standard rocket nose cone', imageAsset: 'rocket_nose_basic.png', rarity: 'common', category: 'nose' },
      { id: 'rocket_nose_aerodynamic', name: 'Aerodynamic Nose Cone', description: 'Streamlined nose cone for faster flight', imageAsset: 'rocket_nose_aerodynamic.png', rarity: 'rare', category: 'nose' },
      { id: 'rocket_nose_deluxe', name: 'Deluxe Nose Cone', description: 'Premium nose cone with special features', imageAsset: 'rocket_nose_deluxe.png', rarity: 'epic', category: 'nose' },
      { id: 'rocket_body_basic', name: 'Basic Rocket Body', description: 'Standard rocket body', imageAsset: 'rocket_body_basic.png', rarity: 'common', category: 'body' },
      { id: 'rocket_body_reinforced', name: 'Reinforced Rocket Body', description: 'Stronger rocket body for rough flights', imageAsset: 'rocket_body_reinforced.png', rarity: 'rare', category: 'body' },
      { id: 'rocket_body_deluxe', name: 'Deluxe Rocket Body', description: 'Premium rocket body with special features', imageAsset: 'rocket_body_deluxe.png', rarity: 'epic', category: 'body' },
      { id: 'rocket_wings_basic', name: 'Basic Wings', description: 'Standard rocket wings', imageAsset: 'rocket_wings_basic.png', rarity: 'common', category: 'wings' },
      { id: 'rocket_wings_stabilized', name: 'Stabilized Wings', description: 'Wings with better stability', imageAsset: 'rocket_wings_stabilized.png', rarity: 'rare', category: 'wings' },
      { id: 'rocket_wings_deluxe', name: 'Deluxe Wings', description: 'Premium wings with special features', imageAsset: 'rocket_wings_deluxe.png', rarity: 'epic', category: 'wings' },
      { id: 'rocket_engine_basic', name: 'Basic Engine', description: 'Standard rocket engine', imageAsset: 'rocket_engine_basic.png', rarity: 'common', category: 'engine' },
      { id: 'rocket_engine_turbo', name: 'Turbo Engine', description: 'Faster rocket engine', imageAsset: 'rocket_engine_turbo.png', rarity: 'rare', category: 'engine' },
      { id: 'rocket_engine_deluxe', name: 'Deluxe Engine', description: 'Premium engine with special features', imageAsset: 'rocket_engine_deluxe.png', rarity: 'epic', category: 'engine' },
      { id: 'rocket_booster_basic', name: 'Basic Booster', description: 'Standard rocket booster', imageAsset: 'rocket_booster_basic.png', rarity: 'common', category: 'booster' },
      { id: 'rocket_booster_dual', name: 'Dual Booster', description: 'Double booster for extra thrust', imageAsset: 'rocket_booster_dual.png', rarity: 'rare', category: 'booster' },
      { id: 'rocket_booster_deluxe', name: 'Deluxe Booster', description: 'Premium booster with special features', imageAsset: 'rocket_booster_deluxe.png', rarity: 'epic', category: 'booster' },
    ],
    airplane_parts: [
      { id: 'airplane_cockpit_basic', name: 'Basic Cockpit', description: 'Standard airplane cockpit', imageAsset: 'airplane_cockpit_basic.png', rarity: 'common', category: 'cockpit' },
      { id: 'airplane_cockpit_glass', name: 'Glass Cockpit', description: 'Modern cockpit with better visibility', imageAsset: 'airplane_cockpit_glass.png', rarity: 'rare', category: 'cockpit' },
      { id: 'airplane_cockpit_deluxe', name: 'Deluxe Cockpit', description: 'Premium cockpit with special features', imageAsset: 'airplane_cockpit_deluxe.png', rarity: 'epic', category: 'cockpit' },
      { id: 'airplane_body_basic', name: 'Basic Fuselage', description: 'Standard airplane body', imageAsset: 'airplane_body_basic.png', rarity: 'common', category: 'body' },
      { id: 'airplane_body_extended', name: 'Extended Fuselage', description: 'Longer airplane body', imageAsset: 'airplane_body_extended.png', rarity: 'rare', category: 'body' },
      { id: 'airplane_body_deluxe', name: 'Deluxe Fuselage', description: 'Premium airplane body with special features', imageAsset: 'airplane_body_deluxe.png', rarity: 'epic', category: 'body' },
      { id: 'airplane_wings_basic', name: 'Basic Wings', description: 'Standard airplane wings', imageAsset: 'airplane_wings_basic.png', rarity: 'common', category: 'wings' },
      { id: 'airplane_wings_extended', name: 'Extended Wings', description: 'Longer wings for better lift', imageAsset: 'airplane_wings_extended.png', rarity: 'rare', category: 'wings' },
      { id: 'airplane_wings_deluxe', name: 'Deluxe Wings', description: 'Premium wings with special features', imageAsset: 'airplane_wings_deluxe.png', rarity: 'epic', category: 'wings' },
      { id: 'airplane_engine_basic', name: 'Basic Engine', description: 'Standard airplane engine', imageAsset: 'airplane_engine_basic.png', rarity: 'common', category: 'engine' },
      { id: 'airplane_engine_twin', name: 'Twin Engine', description: 'Dual engines for more power', imageAsset: 'airplane_engine_twin.png', rarity: 'rare', category: 'engine' },
      { id: 'airplane_engine_deluxe', name: 'Deluxe Engine', description: 'Premium engine with special features', imageAsset: 'airplane_engine_deluxe.png', rarity: 'epic', category: 'engine' },
      { id: 'airplane_tail_basic', name: 'Basic Tail', description: 'Standard airplane tail', imageAsset: 'airplane_tail_basic.png', rarity: 'common', category: 'tail' },
      { id: 'airplane_tail_stabilized', name: 'Stabilized Tail', description: 'Better tail for improved stability', imageAsset: 'airplane_tail_stabilized.png', rarity: 'rare', category: 'tail' },
      { id: 'airplane_tail_deluxe', name: 'Deluxe Tail', description: 'Premium tail with special features', imageAsset: 'airplane_tail_deluxe.png', rarity: 'epic', category: 'tail' },
    ],
    special_items: [
      { id: 'moon_badge', name: 'Moon Explorer', description: 'Reached the moon in your learning journey', imageAsset: 'moon_badge.png', rarity: 'legendary', category: 'special' },
      { id: 'mars_badge', name: 'Mars Explorer', description: 'Reached Mars in your learning journey', imageAsset: 'mars_badge.png', rarity: 'legendary', category: 'special' },
      { id: 'astronaut_helmet', name: 'Astronaut Helmet', description: 'Special helmet for space exploration', imageAsset: 'astronaut_helmet.png', rarity: 'epic', category: 'special' },
      { id: 'pilot_goggles', name: 'Pilot Goggles', description: 'Classic pilot goggles', imageAsset: 'pilot_goggles.png', rarity: 'rare', category: 'special' },
    ]
  }
};

/**
 * Reward Provider component that manages rewards and achievements
 */
export const RewardProvider = ({ children }) => {
  const { gameState, updateGameState, saveGameProgress } = useGame();
  const { currentProfile } = useProfile();
  
  // Reward state
  const [earnedStars, setEarnedStars] = useState(0);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [collectibles, setCollectibles] = useState([]);
  const [equippedItems, setEquippedItems] = useState({});
  const [newRewards, setNewRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize reward state from user profile
  useEffect(() => {
    if (currentProfile && gameState) {
      try {
        // Load stars from profile if they exist
        if (gameState.playerProgress && gameState.playerProgress.stars !== undefined) {
          setEarnedStars(gameState.playerProgress.stars);
        }
        
        // Load badges from profile if they exist
        if (gameState.playerProgress && gameState.playerProgress.badges) {
          setEarnedBadges(gameState.playerProgress.badges);
        }
        
        // Load collectibles from profile if they exist
        if (gameState.playerProgress && gameState.playerProgress.collectibles) {
          setCollectibles(gameState.playerProgress.collectibles);
        }
        
        // Load equipped items from profile if they exist
        if (gameState.playerProgress && gameState.playerProgress.equippedItems) {
          setEquippedItems(gameState.playerProgress.equippedItems);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error initializing reward state:', err);
        setError('Failed to load reward data');
        setLoading(false);
      }
    }
  }, [currentProfile, gameState]);

  // Award stars to the player
  const awardStars = (count) => {
    try {
      // Update local state
      setEarnedStars(prev => prev + count);
      
      // Update game state
      updateGameState(prevState => ({
        playerProgress: {
          ...prevState.playerProgress,
          stars: (prevState.playerProgress.stars || 0) + count
        }
      }));
      
      // Add to new rewards
      setNewRewards(prev => [...prev, { type: 'stars', count }]);
      
      // Save progress
      saveGameProgress();
      
      return true;
    } catch (err) {
      console.error('Error awarding stars:', err);
      setError(err.message);
      return false;
    }
  };

  // Award a badge to the player
  const awardBadge = (badgeId) => {
    try {
      // Check if badge exists
      const badge = REWARDS.badges.find(b => b.id === badgeId);
      if (!badge) {
        throw new Error(`Badge ${badgeId} not found`);
      }
      
      // Check if already earned
      if (earnedBadges.some(b => b.id === badgeId)) {
        return false; // Already earned
      }
      
      // Create badge with earned date
      const newBadge = {
        ...badge,
        earnedAt: new Date().toISOString(),
        isNew: true
      };
      
      // Update local state
      setEarnedBadges(prev => [...prev, newBadge]);
      
      // Update game state
      updateGameState(prevState => ({
        playerProgress: {
          ...prevState.playerProgress,
          badges: [...(prevState.playerProgress.badges || []), newBadge]
        }
      }));
      
      // Add to new rewards
      setNewRewards(prev => [...prev, { type: 'badge', item: newBadge }]);
      
      // Save progress
      saveGameProgress();
      
      return true;
    } catch (err) {
      console.error('Error awarding badge:', err);
      setError(err.message);
      return false;
    }
  };

  // Award a collectible to the player
  const awardCollectible = (collectibleId) => {
    try {
      // Find the collectible in our data
      let collectible = null;
      
      // Check rocket parts
      if (!collectible) {
        collectible = REWARDS.collectibles.rocket_parts.find(c => c.id === collectibleId);
      }
      
      // Check airplane parts
      if (!collectible) {
        collectible = REWARDS.collectibles.airplane_parts.find(c => c.id === collectibleId);
      }
      
      // Check special items
      if (!collectible) {
        collectible = REWARDS.collectibles.special_items.find(c => c.id === collectibleId);
      }
      
      if (!collectible) {
        throw new Error(`Collectible ${collectibleId} not found`);
      }
      
      // Check if already collected
      if (collectibles.some(c => c.id === collectibleId)) {
        return false; // Already collected
      }
      
      // Create collectible with acquisition date
      const newCollectible = {
        ...collectible,
        acquiredAt: new Date().toISOString(),
        isNew: true,
        isEquipped: false
      };
      
      // Update local state
      setCollectibles(prev => [...prev, newCollectible]);
      
      // Update game state
      updateGameState(prevState => ({
        playerProgress: {
          ...prevState.playerProgress,
          collectibles: [...(prevState.playerProgress.collectibles || []), newCollectible]
        }
      }));
      
      // Add to new rewards
      setNewRewards(prev => [...prev, { type: 'collectible', item: newCollectible }]);
      
      // Save progress
      saveGameProgress();
      
      return true;
    } catch (err) {
      console.error('Error awarding collectible:', err);
      setError(err.message);
      return false;
    }
  };

  // Equip a collectible
  const equipCollectible = (collectibleId) => {
    try {
      // Find the collectible in player's collection
      const collectible = collectibles.find(c => c.id === collectibleId);
      
      if (!collectible) {
        throw new Error(`Collectible ${collectibleId} not found in player's collection`);
      }
      
      // Update equipped items
      const updatedEquippedItems = { ...equippedItems };
      
      // If it's a rocket or airplane part, replace any existing part in the same category
      if (collectible.category !== 'special') {
        updatedEquippedItems[collectible.category] = collectibleId;
      } else {
        // For special items, just add it
        updatedEquippedItems.special = collectibleId;
      }
      
      // Update local state
      setEquippedItems(updatedEquippedItems);
      
      // Update collectibles to mark as equipped
      setCollectibles(prev => prev.map(c => ({
        ...c,
        isEquipped: c.id === collectibleId || 
                   (c.category !== collectible.category && c.isEquipped)
      })));
      
      // Update game state
      updateGameState(prevState => ({
        playerProgress: {
          ...prevState.playerProgress,
          equippedItems: updatedEquippedItems,
          collectibles: prevState.playerProgress.collectibles.map(c => ({
            ...c,
            isEquipped: c.id === collectibleId || 
                       (c.category !== collectible.category && c.isEquipped)
          }))
        }
      }));
      
      // Save progress
      saveGameProgress();
      
      return true;
    } catch (err) {
      console.error('Error equipping collectible:', err);
      setError(err.message);
      return false;
    }
  };

  // Unequip a collectible
  const unequipCollectible = (collectibleId) => {
    try {
      // Find the collectible in player's collection
      const collectible = collectibles.find(c => c.id === collectibleId);
      
      if (!collectible) {
        throw new Error(`Collectible ${collectibleId} not found in player's collection`);
      }
      
      // Update equipped items
      const updatedEquippedItems = { ...equippedItems };
      
      // Remove from equipped items
      if (collectible.category !== 'special') {
        if (updatedEquippedItems[collectible.category] === collectibleId) {
          delete updatedEquippedItems[collectible.category];
        }
      } else {
        if (updatedEquippedItems.special === collectibleId) {
          delete updatedEquippedItems.special;
        }
      }
      
      // Update local state
      setEquippedItems(updatedEquippedItems);
      
      // Update collectibles to mark as not equipped
      setCollectibles(prev => prev.map(c => ({
        ...c,
        isEquipped: c.id !== collectibleId && c.isEquipped
      })));
      
      // Update game state
      updateGameState(prevState => ({
        playerProgress: {
          ...prevState.playerProgress,
          equippedItems: updatedEquippedItems,
          collectibles: prevState.playerProgress.collectibles.map(c => ({
            ...c,
            isEquipped: c.id !== collectibleId && c.isEquipped
          }))
        }
      }));
      
      // Save progress
      saveGameProgress();
      
      return true;
    } catch (err) {
      console.error('Error unequipping collectible:', err);
      setError(err.message);
      return false;
    }
  };

  // Check for achievements based on game performance
  const checkAchievements = (performance) => {
    try {
      const { wordsLearned, perfectScore, timeBonus, streak } = performance;
      const newlyEarnedBadges = [];
      
      // Check word-based badges
      if (wordsLearned) {
        REWARDS.badges.forEach(badge => {
          if (badge.criteria.wordsLearned && wordsLearned >= badge.criteria.wordsLearned) {
            if (!earnedBadges.some(b => b.id === badge.id)) {
              awardBadge(badge.id);
              newlyEarnedBadges.push(badge);
            }
          }
        });
      }
      
      // Check perfect score badges
      if (perfectScore) {
        REWARDS.badges.forEach(badge => {
          if (badge.criteria.perfectScore) {
            if (!earnedBadges.some(b => b.id === badge.id)) {
              awardBadge(badge.id);
              newlyEarnedBadges.push(badge);
            }
          }
        });
      }
      
      // Check time bonus badges
      if (timeBonus) {
        REWARDS.badges.forEach(badge => {
          if (badge.criteria.timeBonus && timeBonus >= badge.criteria.timeBonus) {
            if (!earnedBadges.some(b => b.id === badge.id)) {
              awardBadge(badge.id);
              newlyEarnedBadges.push(badge);
            }
          }
        });
      }
      
      // Check streak badges
      if (streak) {
        REWARDS.badges.forEach(badge => {
          if (badge.criteria.streak && streak >= badge.criteria.streak) {
            if (!earnedBadges.some(b => b.id === badge.id)) {
              awardBadge(badge.id);
              newlyEarnedBadges.push(badge);
            }
          }
        });
      }
      
      return newlyEarnedBadges;
    } catch (err) {
      console.error('Error checking achievements:', err);
      setError(err.message);
      return [];
    }
  };

  // Clear new rewards notification
  const clearNewRewards = () => {
    setNewRewards([]);
    
    // Update badges to mark as not new
    setEarnedBadges(prev => prev.map(b => ({
      ...b,
      isNew: false
    })));
    
    // Update collectibles to mark as not new
    setCollectibles(prev => prev.map(c => ({
      ...c,
      isNew: false
    })));
    
    // Update game state
    updateGameState(prevState => ({
      playerProgress: {
        ...prevState.playerProgress,
        badges: prevState.playerProgress.badges?.map(b => ({
          ...b,
          isNew: false
        })),
        collectibles: prevState.playerProgress.collectibles?.map(c => ({
          ...c,
          isNew: false
        }))
      }
    }));
    
    // Save progress
    saveGameProgress();
  };

  // Get all available collectibles (both earned and not earned)
  const getAllCollectibles = () => {
    const allCollectibles = [
      ...REWARDS.collectibles.rocket_parts,
      ...REWARDS.collectibles.airplane_parts,
      ...REWARDS.collectibles.special_items
    ];
    
    return allCollectibles.map(c => {
      const earned = collectibles.find(ec => ec.id === c.id);
      return earned ? earned : { ...c, isEarned: false };
    });
  };

  // Get all available badges (both earned and not earned)
  const getAllBadges = () => {
    return REWARDS.badges.map(b => {
      const earned = earnedBadges.find(eb => eb.id === b.id);
      return earned ? earned : { ...b, isEarned: false };
    });
  };

  // Context value
  const value = {
    earnedStars,
    earnedBadges,
    collectibles,
    equippedItems,
    newRewards,
    loading,
    error,
    awardStars,
    awardBadge,
    awardCollectible,
    equipCollectible,
    unequipCollectible,
    checkAchievements,
    clearNewRewards,
    getAllCollectibles,
    getAllBadges,
    REWARDS
  };

  return (
    <RewardContext.Provider value={value}>
      {children}
    </RewardContext.Provider>
  );
};

// Custom hook to use the reward context
export const useReward = () => {
  const context = useContext(RewardContext);
  if (context === undefined) {
    throw new Error('useReward must be used within a RewardProvider');
  }
  return context;
};

export default RewardProvider;
