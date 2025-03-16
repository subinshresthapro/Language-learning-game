/**
 * RewardFeedback.js
 * 
 * Visual and audio feedback components for rewards in NepaliJets
 * Handles animations, sound effects, and visual celebrations for achievements
 */

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';
import { Audio } from 'expo-av';
import { useAnimation } from '../animation/AnimationSystem';
import { useReward } from './RewardSystem';

/**
 * Star Burst Animation Component
 * Displays an animated star burst when stars are earned
 */
const StarBurst = ({ count, onComplete }) => {
  const { createCelebrationAnimation, startAnimation } = useAnimation();
  const animationId = 'star_burst_animation';
  const [animValues, setAnimValues] = useState(null);
  
  useEffect(() => {
    // Create the celebration animation
    const values = createCelebrationAnimation(animationId, {
      duration: 2000,
    });
    
    setAnimValues(values);
    
    // Start the animation
    startAnimation(animationId, ({ finished }) => {
      if (finished && onComplete) {
        onComplete();
      }
    });
    
    // Play sound effect
    playStarSound();
    
    return () => {
      // Clean up sound
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  
  // Sound effect reference
  const [sound, setSound] = useState();
  
  // Play star sound effect
  const playStarSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/star_earned.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  
  // Render stars based on count
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push(
        <Animated.Image
          key={`star_${i}`}
          source={require('../../assets/images/star_gold.png')}
          style={[
            styles.starImage,
            {
              transform: [
                { scale: animValues ? animValues.scale : 1 },
                { translateX: 50 * (i - (count - 1) / 2) },
                { rotate: animValues ? animValues.rotation : '0deg' }
              ],
              opacity: animValues ? animValues.opacity : 0
            }
          ]}
        />
      );
    }
    return stars;
  };
  
  if (!animValues) return null;
  
  return (
    <View style={styles.starBurstContainer}>
      {renderStars()}
      <Animated.Text
        style={[
          styles.starCountText,
          {
            opacity: animValues.opacity,
            transform: [{ scale: animValues.scale }]
          }
        ]}
      >
        {count > 1 ? `${count} Stars!` : '1 Star!'}
      </Animated.Text>
    </View>
  );
};

/**
 * Badge Unlock Animation Component
 * Displays an animated badge reveal when a badge is earned
 */
const BadgeUnlock = ({ badge, onComplete }) => {
  const { createAnimation, startAnimation } = useAnimation();
  const scaleAnimId = 'badge_scale_animation';
  const rotateAnimId = 'badge_rotate_animation';
  const shineAnimId = 'badge_shine_animation';
  
  const [scaleValue, setScaleValue] = useState(null);
  const [rotateValue, setRotateValue] = useState(null);
  const [shineValue, setShineValue] = useState(null);
  
  useEffect(() => {
    // Create scale animation
    const scale = createAnimation(scaleAnimId, {
      type: 'timing',
      initialValue: 0.1,
      finalValue: 1,
      duration: 1000,
      easing: 'bounce',
    });
    
    // Create rotation animation
    const rotate = createAnimation(rotateAnimId, {
      type: 'timing',
      initialValue: 0,
      finalValue: 1,
      duration: 800,
      easing: 'ease-out',
    });
    
    // Create shine animation
    const shine = createAnimation(shineAnimId, {
      type: 'timing',
      initialValue: -100,
      finalValue: 100,
      duration: 1500,
      easing: 'linear',
    });
    
    setScaleValue(scale);
    setRotateValue(rotate);
    setShineValue(shine);
    
    // Start animations in sequence
    startAnimation(scaleAnimId, () => {
      startAnimation(rotateAnimId);
      startAnimation(shineAnimId, ({ finished }) => {
        if (finished && onComplete) {
          setTimeout(onComplete, 1000);
        }
      });
    });
    
    // Play sound effect
    playBadgeSound();
    
    return () => {
      // Clean up sound
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  
  // Sound effect reference
  const [sound, setSound] = useState();
  
  // Play badge sound effect
  const playBadgeSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/badge_earned.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  
  // Create interpolated rotation value
  const spin = rotateValue?.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  if (!scaleValue || !rotateValue || !shineValue) return null;
  
  return (
    <View style={styles.badgeUnlockContainer}>
      <View style={styles.badgeContainer}>
        <Animated.Image
          source={{ uri: badge.imageAsset }}
          style={[
            styles.badgeImage,
            {
              transform: [
                { scale: scaleValue },
                { rotate: spin }
              ]
            }
          ]}
        />
        <Animated.View
          style={[
            styles.badgeShine,
            {
              transform: [{ translateX: shineValue }]
            }
          ]}
        />
      </View>
      <Animated.Text
        style={[
          styles.badgeNameText,
          { opacity: scaleValue }
        ]}
      >
        {badge.name}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.badgeDescriptionText,
          { opacity: scaleValue }
        ]}
      >
        {badge.description}
      </Animated.Text>
    </View>
  );
};

/**
 * Collectible Acquisition Animation Component
 * Displays an animated collectible reveal when a part is acquired
 */
const CollectibleAcquisition = ({ collectible, onComplete }) => {
  const { createAnimation, startAnimation } = useAnimation();
  const scaleAnimId = 'collectible_scale_animation';
  const floatAnimId = 'collectible_float_animation';
  const glowAnimId = 'collectible_glow_animation';
  
  const [scaleValue, setScaleValue] = useState(null);
  const [floatValue, setFloatValue] = useState(null);
  const [glowValue, setGlowValue] = useState(null);
  
  useEffect(() => {
    // Create scale animation
    const scale = createAnimation(scaleAnimId, {
      type: 'timing',
      initialValue: 0.1,
      finalValue: 1,
      duration: 800,
      easing: 'back',
    });
    
    // Create floating animation
    const float = createAnimation(floatAnimId, {
      type: 'timing',
      initialValue: 0,
      finalValue: 1,
      duration: 2000,
      easing: 'linear',
    });
    
    // Create glow animation
    const glow = createAnimation(glowAnimId, {
      type: 'timing',
      initialValue: 0,
      finalValue: 1,
      duration: 1500,
      easing: 'linear',
    });
    
    setScaleValue(scale);
    setFloatValue(float);
    setGlowValue(glow);
    
    // Start animations
    startAnimation(scaleAnimId);
    startAnimation(floatAnimId);
    startAnimation(glowAnimId, ({ finished }) => {
      if (finished && onComplete) {
        setTimeout(onComplete, 1500);
      }
    });
    
    // Play sound effect
    playCollectibleSound();
    
    return () => {
      // Clean up sound
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  
  // Sound effect reference
  const [sound, setSound] = useState();
  
  // Play collectible sound effect
  const playCollectibleSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/collectible_earned.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  
  // Create interpolated float value for bobbing effect
  const translateY = floatValue?.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -15, 0],
  });
  
  // Create interpolated glow value
  const glowOpacity = glowValue?.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.8, 0],
  });
  
  if (!scaleValue || !floatValue || !glowValue) return null;
  
  return (
    <View style={styles.collectibleContainer}>
      <View style={styles.collectibleImageContainer}>
        <Animated.View
          style={[
            styles.collectibleGlow,
            {
              opacity: glowOpacity,
              transform: [{ scale: Animated.add(1, Animated.multiply(glowValue, 0.3)) }]
            }
          ]}
        />
        <Animated.Image
          source={{ uri: collectible.imageAsset }}
          style={[
            styles.collectibleImage,
            {
              transform: [
                { scale: scaleValue },
                { translateY }
              ]
            }
          ]}
        />
      </View>
      <Animated.Text
        style={[
          styles.collectibleNameText,
          { opacity: scaleValue }
        ]}
      >
        {collectible.name}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.collectibleDescriptionText,
          { opacity: scaleValue }
        ]}
      >
        {collectible.description}
      </Animated.Text>
      <Animated.Text
        style={[
          styles.collectibleRarityText,
          styles[`${collectible.rarity}Text`],
          { opacity: scaleValue }
        ]}
      >
        {collectible.rarity.charAt(0).toUpperCase() + collectible.rarity.slice(1)}
      </Animated.Text>
    </View>
  );
};

/**
 * Celebration Overlay Component
 * Displays a full-screen celebration effect for major achievements
 */
const CelebrationOverlay = ({ onComplete }) => {
  const { createAnimation, startAnimation } = useAnimation();
  const confettiAnimId = 'confetti_animation';
  const textAnimId = 'celebration_text_animation';
  
  const [confettiValues, setConfettiValues] = useState([]);
  const [textValue, setTextValue] = useState(null);
  
  useEffect(() => {
    // Create confetti animations (multiple particles)
    const confetti = [];
    for (let i = 0; i < 30; i++) {
      const id = `${confettiAnimId}_${i}`;
      const startX = Math.random() * 400 - 50;
      const startY = -50;
      const endY = 800 + Math.random() * 200;
      const duration = 3000 + Math.random() * 2000;
      
      const x = createAnimation(`${id}_x`, {
        type: 'timing',
        initialValue: startX,
        finalValue: startX + (Math.random() * 200 - 100),
        duration,
        easing: 'linear',
      });
      
      const y = createAnimation(`${id}_y`, {
        type: 'timing',
        initialValue: startY,
        finalValue: endY,
        duration,
        easing: 'linear',
      });
      
      const rotate = createAnimation(`${id}_rotate`, {
        type: 'timing',
        initialValue: 0,
        finalValue: Math.random() * 10,
        duration,
        easing: 'linear',
      });
      
      confetti.push({ id, x, y, rotate });
      
      startAnimation(`${id}_x`);
      startAnimation(`${id}_y`);
      startAnimation(`${id}_rotate`);
    }
    
    setConfettiValues(confetti);
    
    // Create text animation
    const text = createAnimation(textAnimId, {
      type: 'timing',
      initialValue: 0,
      finalValue: 1,
      duration: 1000,
      easing: 'bounce',
    });
    
    setTextValue(text);
    startAnimation(textAnimId);
    
    // Play celebration sound
    playCelebrationSound();
    
    // Set timeout for completion
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 5000);
    
    return () => {
      clearTimeout(timer);
      // Clean up sound
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);
  
  // Sound effect reference
  const [sound, setSound] = useState();
  
  // Play celebration sound effect
  const playCelebrationSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../assets/sounds/celebration.mp3')
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  
  // Render confetti particles
  const renderConfetti = () => {
    return confettiValues.map((confetti, index) => {
      const size = 10 + Math.random() * 20;
      const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      const spin = confetti.rotate.interpolate({
        inputRange: [0, 10],
        outputRange: ['0deg', '3600deg'],
      });
      
      return (
        <Animated.View
          key={index}
          style={[
            styles.confettiParticle,
            {
              width: size,
              height: size,
              backgroundColor: color,
              transform: [
                { translateX: confetti.x },
                { translateY: confetti.y },
                { rotate: spin }
              ]
            }
          ]}
        />
      );
    });
  };
  
  if (!textValue) return null;
  
  return (
    <View style={styles.celebrationContainer}>
      {renderConfetti()}
      <Animated.Text
        style={[
          styles.celebrationText,
          {
            transform: [{ scale: textValue }]
          }
        ]}
      >
        Amazing Job!
      </Animated.Text>
    </View>
  );
};

/**
 * Reward Popup Component
 * Main component for displaying reward feedback
 */
const RewardPopup = ({ visible, rewards, onClose }) => {
  const [currentRewardIndex, setCurrentRewardIndex] = useState(0);
  const [showingReward, setShowingReward] = useState(false);
  
  useEffect(() => {
    if (visible && rewards && rewards.length > 0) {
      setCurrentRewardIndex(0);
      setShowingReward(true);
    } else {
      setShowingReward(false);
    }
  }, [visible, rewards]);
  
  // Handle completion of current reward animation
  const handleRewardComplete = () => {
    if (currentRewardIndex < rewards.length - 1) {
      // Show next reward
      setCurrentRewardIndex(prevIndex => prevIndex + 1);
    } else {
      // All rewards shown, close popup
      setShowingReward(false);
      if (onClose) {
        onClose();
      }
    }
  };
  
  // Render current reward
  const renderCurrentReward = () => {
    if (!rewards || rewards.length === 0 || currentRewardIndex >= rewards.length) {
      return null;
    }
    
    const reward = rewards[currentRewardIndex];
    
    switch (reward.type) {
      case 'stars':
        return <StarBurst count={reward.count} onComplete={handleRewardComplete} />;
      case 'badge':
        return <BadgeUnlock badge={reward.item} onComplete={handleRewardComplete} />;
      case 'collectible':
        return <CollectibleAcquisition collectible={reward.item} onComplete={handleRewardComplete} />;
      case 'celebration':
        return <CelebrationOverlay onComplete={handleRewardComplete} />;
      default:
        return null;
    }
  };
  
  if (!visible || !showingReward) return null;
  
  return (
    <View style={styles.popupContainer}>
      <View style={styles.popupContent}>
        {renderCurrentReward()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  popupContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  popupContent: {
    width: '80%',
    aspectRatio: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  
  // Star Burst styles
  starBurstContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  starImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  starCountText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700',
    marginTop: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  
  // Badge Unlock styles
  badgeUnlockContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  badgeContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
  },
  badgeImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  badgeShine: {
    position: 'absolute',
    width: 30,
    height: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    transform: [{ rotate: '45deg' }],
  },
  badgeNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  badgeDescriptionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  
  // Collectible Acquisition styles
  collectibleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  collectibleImageContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  collectibleImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  collectibleGlow: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFD700',
  },
  collectibleNameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  collectibleDescriptionText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  collectibleRarityText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  commonText: {
    color: '#6D6D6D',
  },
  rareText: {
    color: '#0070DD',
  },
  epicText: {
    color: '#A335EE',
  },
  legendaryText: {
    color: '#FF8000',
  },
  
  // Celebration Overlay styles
  celebrationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confettiParticle: {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'red',
  },
  celebrationText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export { RewardPopup, StarBurst, BadgeUnlock, CollectibleAcquisition, CelebrationOverlay };
export default RewardPopup;
