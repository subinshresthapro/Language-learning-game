/**
 * AnimationSystem.js
 * 
 * Animation framework for NepaliJets
 * Handles sprite animations, motion effects, and transitions
 */

import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { Animated, Easing } from 'react-native';
import { useGame } from '../game/GameManager';

// Create Animation Context
export const AnimationContext = createContext();

/**
 * Animation Provider component that manages animations throughout the app
 */
export const AnimationProvider = ({ children }) => {
  const { gameState } = useGame();
  
  // Animation registry to keep track of all animations
  const [animations, setAnimations] = useState({});
  
  // Animation speed factor (can be adjusted in settings)
  const [speedFactor, setSpeedFactor] = useState(gameState?.gameSettings?.animationSpeed || 1.0);
  
  // Update speed factor when game settings change
  useEffect(() => {
    if (gameState?.gameSettings?.animationSpeed) {
      setSpeedFactor(gameState.gameSettings.animationSpeed);
    }
  }, [gameState?.gameSettings?.animationSpeed]);

  // Create a new animation
  const createAnimation = (id, config) => {
    const { type, initialValue, finalValue, duration, easing, autoStart } = config;
    
    // Create the animation value
    const animValue = new Animated.Value(initialValue);
    
    // Create the animation
    let animation;
    
    switch (type) {
      case 'timing':
        animation = Animated.timing(animValue, {
          toValue: finalValue,
          duration: duration / speedFactor, // Adjust duration based on speed factor
          easing: getEasingFunction(easing),
          useNativeDriver: true,
        });
        break;
      case 'spring':
        animation = Animated.spring(animValue, {
          toValue: finalValue,
          friction: config.friction || 7,
          tension: config.tension || 40,
          useNativeDriver: true,
        });
        break;
      case 'decay':
        animation = Animated.decay(animValue, {
          velocity: config.velocity || 0.5,
          deceleration: config.deceleration || 0.997,
          useNativeDriver: true,
        });
        break;
      default:
        animation = Animated.timing(animValue, {
          toValue: finalValue,
          duration: duration / speedFactor,
          easing: Easing.linear,
          useNativeDriver: true,
        });
    }
    
    // Add to registry
    setAnimations(prev => ({
      ...prev,
      [id]: {
        value: animValue,
        animation,
        config,
        isPlaying: false,
      }
    }));
    
    // Auto-start if specified
    if (autoStart) {
      setTimeout(() => startAnimation(id), 0);
    }
    
    return animValue;
  };

  // Start an animation
  const startAnimation = (id, callback) => {
    const anim = animations[id];
    
    if (!anim) {
      console.warn(`Animation with id ${id} not found`);
      return;
    }
    
    // Update state
    setAnimations(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isPlaying: true,
      }
    }));
    
    // Start the animation
    anim.animation.start(({ finished }) => {
      // Update state when animation completes
      if (finished) {
        setAnimations(prev => ({
          ...prev,
          [id]: {
            ...prev[id],
            isPlaying: false,
          }
        }));
      }
      
      // Call callback if provided
      if (callback && typeof callback === 'function') {
        callback({ finished });
      }
    });
  };

  // Stop an animation
  const stopAnimation = (id) => {
    const anim = animations[id];
    
    if (!anim) {
      console.warn(`Animation with id ${id} not found`);
      return;
    }
    
    // Stop the animation
    anim.animation.stop();
    
    // Update state
    setAnimations(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        isPlaying: false,
      }
    }));
  };

  // Reset an animation to its initial value
  const resetAnimation = (id) => {
    const anim = animations[id];
    
    if (!anim) {
      console.warn(`Animation with id ${id} not found`);
      return;
    }
    
    // Stop the animation
    stopAnimation(id);
    
    // Reset to initial value
    anim.value.setValue(anim.config.initialValue);
  };

  // Create a sequence of animations
  const createSequence = (id, animationIds, config = {}) => {
    const sequence = animationIds.map(animId => animations[animId]?.animation);
    
    if (sequence.includes(undefined)) {
      console.warn('Some animations in sequence not found');
      return;
    }
    
    const sequenceAnimation = Animated.sequence(sequence);
    
    // Add to registry
    setAnimations(prev => ({
      ...prev,
      [id]: {
        animation: sequenceAnimation,
        config: {
          type: 'sequence',
          ...config,
        },
        isPlaying: false,
      }
    }));
    
    // Auto-start if specified
    if (config.autoStart) {
      setTimeout(() => startAnimation(id), 0);
    }
    
    return sequenceAnimation;
  };

  // Create parallel animations
  const createParallel = (id, animationIds, config = {}) => {
    const animations_array = animationIds.map(animId => animations[animId]?.animation);
    
    if (animations_array.includes(undefined)) {
      console.warn('Some animations in parallel not found');
      return;
    }
    
    const parallelAnimation = Animated.parallel(animations_array);
    
    // Add to registry
    setAnimations(prev => ({
      ...prev,
      [id]: {
        animation: parallelAnimation,
        config: {
          type: 'parallel',
          ...config,
        },
        isPlaying: false,
      }
    }));
    
    // Auto-start if specified
    if (config.autoStart) {
      setTimeout(() => startAnimation(id), 0);
    }
    
    return parallelAnimation;
  };

  // Helper function to get easing function
  const getEasingFunction = (easingType) => {
    switch (easingType) {
      case 'linear':
        return Easing.linear;
      case 'ease-in':
        return Easing.in(Easing.ease);
      case 'ease-out':
        return Easing.out(Easing.ease);
      case 'ease-in-out':
        return Easing.inOut(Easing.ease);
      case 'bounce':
        return Easing.bounce;
      case 'elastic':
        return Easing.elastic(1);
      case 'back':
        return Easing.back(1.5);
      default:
        return Easing.linear;
    }
  };

  // Create a flying object animation
  const createFlyingAnimation = (id, config = {}) => {
    const {
      startX = 0,
      startY = 0,
      endX = 300,
      endY = 0,
      duration = 2000,
      easing = 'ease-out',
      autoStart = false,
    } = config;
    
    // Create position values
    const posX = new Animated.Value(startX);
    const posY = new Animated.Value(startY);
    
    // Create the animation
    const animation = Animated.parallel([
      Animated.timing(posX, {
        toValue: endX,
        duration: duration / speedFactor,
        easing: getEasingFunction(easing),
        useNativeDriver: true,
      }),
      Animated.timing(posY, {
        toValue: endY,
        duration: duration / speedFactor,
        easing: getEasingFunction(easing),
        useNativeDriver: true,
      }),
    ]);
    
    // Add to registry
    setAnimations(prev => ({
      ...prev,
      [id]: {
        posX,
        posY,
        animation,
        config: {
          type: 'flying',
          ...config,
        },
        isPlaying: false,
      }
    }));
    
    // Auto-start if specified
    if (autoStart) {
      setTimeout(() => startAnimation(id), 0);
    }
    
    return { posX, posY };
  };

  // Create a rocket launch animation
  const createRocketLaunchAnimation = (id, config = {}) => {
    const {
      startY = 300,
      endY = -100,
      duration = 3000,
      wobbleAmount = 10,
      autoStart = false,
    } = config;
    
    // Create position values
    const posY = new Animated.Value(startY);
    const wobbleX = new Animated.Value(0);
    const scale = new Animated.Value(1);
    
    // Create the wobble animation
    const wobbleAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(wobbleX, {
          toValue: wobbleAmount,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(wobbleX, {
          toValue: -wobbleAmount,
          duration: 400,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(wobbleX, {
          toValue: 0,
          duration: 200,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    );
    
    // Create the launch animation
    const launchAnimation = Animated.parallel([
      Animated.timing(posY, {
        toValue: endY,
        duration: duration / speedFactor,
        easing: Easing.cubic,
        useNativeDriver: true,
      }),
      wobbleAnimation,
      Animated.sequence([
        Animated.delay(duration * 0.1),
        Animated.timing(scale, {
          toValue: 0.8,
          duration: duration * 0.3,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ]);
    
    // Add to registry
    setAnimations(prev => ({
      ...prev,
      [id]: {
        posY,
        wobbleX,
        scale,
        animation: launchAnimation,
        config: {
          type: 'rocketLaunch',
          ...config,
        },
        isPlaying: false,
      }
    }));
    
    // Auto-start if specified
    if (autoStart) {
      setTimeout(() => startAnimation(id), 0);
    }
    
    return { posY, wobbleX, scale };
  };

  // Create a celebration animation
  const createCelebrationAnimation = (id, config = {}) => {
    const {
      duration = 2000,
      autoStart = false,
    } = config;
    
    // Create animation values
    const scale = new Animated.Value(0);
    const opacity = new Animated.Value(0);
    const rotation = new Animated.Value(0);
    
    // Create the animation
    const celebrationAnimation = Animated.sequence([
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: duration * 0.4 / speedFactor,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: duration * 0.2 / speedFactor,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 1,
          duration: duration * 0.4 / speedFactor,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 1,
          duration: duration * 0.2 / speedFactor,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.delay(duration * 0.4),
      ]),
      Animated.parallel([
        Animated.timing(scale, {
          toValue: 0,
          duration: duration * 0.4 / speedFactor,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: duration * 0.4 / speedFactor,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]),
    ]);
    
    // Add to registry
    setAnimations(prev => ({
      ...prev,
      [id]: {
        scale,
        opacity,
        rotation,
        animation: celebrationAnimation,
        config: {
          type: 'celebration',
          ...config,
        },
        isPlaying: false,
      }
    }));
    
    // Create interpolated rotation value
    const spin = rotation.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    
    // Auto-start if specified
    if (autoStart) {
      setTimeout(() => startAnimation(id), 0);
    }
    
    return { scale, opacity, rotation: spin };
  };

  // Context value
  const value = {
    animations,
    createAnimation,
    startAnimation,
    stopAnimation,
    resetAnimation,
    createSequence,
    createParallel,
    createFlyingAnimation,
    createRocketLaunchAnimation,
    createCelebrationAnimation,
    speedFactor,
    setSpeedFactor,
  };

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};

// Custom hook to use the animation context
export const useAnimation = () => {
  const context = useContext(AnimationContext);
  if (context === undefined) {
    throw new Error('useAnimation must be used within an AnimationProvider');
  }
  return context;
};

export default AnimationProvider;
