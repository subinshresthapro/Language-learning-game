/**
 * WebExport.js
 * 
 * Exports the Nepali language learning game for web embedding
 * Provides a simple API for websites to embed and interact with the game
 */

import React from 'react';
import WebGameEmbed from './WebGameEmbed';
import webIntegration from './WebIntegration';

// Default configuration for web embedding
const DEFAULT_CONFIG = {
  containerId: 'nepali-game-container',
  initialLevel: 0,
  gameMode: 'word_to_picture',
  difficulty: 1,
  wordCount: 5,
  timeLimit: 60,
  categories: ['basic'],
};

/**
 * Initialize and render the game in a container element
 * @param {Object} config - Configuration options
 */
export const initializeGame = (config = {}) => {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  
  // Check if container exists
  if (typeof document !== 'undefined') {
    const container = document.getElementById(finalConfig.containerId);
    if (!container) {
      console.error(`Container element with ID "${finalConfig.containerId}" not found`);
      return false;
    }
    
    // Set parent origin for security if provided
    if (finalConfig.parentOrigin) {
      webIntegration.setParentOrigin(finalConfig.parentOrigin);
    }
    
    // Create a div for React to render into
    const gameRoot = document.createElement('div');
    gameRoot.style.width = '100%';
    gameRoot.style.height = '100%';
    container.appendChild(gameRoot);
    
    // Render the game component (mock implementation for testing)
    if (typeof window !== 'undefined' && window.ReactDOM) {
      window.ReactDOM.render(
        React.createElement(WebGameEmbed, {
          ...finalConfig,
          onGameComplete: results => {
            webIntegration.reportCompletion(results);
            if (finalConfig.onGameComplete) finalConfig.onGameComplete(results);
          },
          onError: error => {
            webIntegration.reportError(error);
            if (finalConfig.onError) finalConfig.onError(error);
          }
        }),
        gameRoot
      );
    } else {
      console.log('Mock initialization - ReactDOM not available');
      // For testing without ReactDOM
      container.innerHTML = `
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; background-color: #4CAF50; color: white; border-radius: 8px; padding: 20px; text-align: center;">
          <h2>Nepali Language Learning Game</h2>
          <p>Game simulation for web embedding test</p>
          <p>Configuration: Level ${finalConfig.initialLevel}, Mode: ${finalConfig.gameMode}</p>
          <div style="margin-top: 20px; font-style: italic;">Mock implementation for testing</div>
        </div>
      `;
      
      // Simulate game ready event
      setTimeout(() => {
        webIntegration.sendMessage('gameReady', { version: '1.0.0' });
        
        // Simulate game progress after 2 seconds
        setTimeout(() => {
          webIntegration.reportProgress({ progress: 0.5, score: 50 });
          
          // Simulate game completion after 5 seconds
          setTimeout(() => {
            const results = { score: 85, stars: 3, completed: true };
            webIntegration.reportCompletion(results);
            if (finalConfig.onGameComplete) finalConfig.onGameComplete(results);
          }, 3000);
        }, 2000);
      }, 1000);
    }
    
    return true;
  }
  
  return false;
};

/**
 * Clean up the game instance
 */
export const cleanupGame = (containerId = DEFAULT_CONFIG.containerId) => {
  webIntegration.cleanup();
  
  if (typeof document !== 'undefined') {
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = '';
    }
  }
  
  console.log('Game cleaned up');
};

// Expose API to window object for non-module usage
if (typeof window !== 'undefined') {
  window.NepaliJetsGame = {
    initialize: initializeGame,
    cleanup: cleanupGame
  };
}

export default {
  initialize: initializeGame,
  cleanup: cleanupGame,
  integration: webIntegration
};
