/**
 * WebIntegration.js
 * 
 * Provides utilities for integrating the Nepali language learning game with web platforms
 * Handles web-specific functionality and communication with parent websites
 */

// Mock implementation for web testing

/**
 * WebIntegration class
 * Manages communication between the game and the parent website
 */
class WebIntegration {
  constructor() {
    this.isWeb = typeof window !== 'undefined';
    this.parentOrigin = '*'; // Default to allow any origin
    this.isEmbedded = false;
    this.messageHandlers = {};
    
    // Initialize if in web environment
    if (this.isWeb) {
      this.initialize();
    }
  }

  /**
   * Initialize web integration
   */
  initialize() {
    // Check if running in an iframe (embedded)
    this.isEmbedded = this.isWeb && window.self !== window.top;
    
    // Set up message listener for communication with parent website
    if (this.isWeb) {
      window.addEventListener('message', this.handleMessage.bind(this));
      
      // Notify parent that game is ready
      this.sendMessage('gameReady', { version: '1.0.0' });
    }
    
    console.log('Web integration initialized', { isEmbedded: this.isEmbedded });
  }

  /**
   * Set allowed parent origin for security
   * @param {string} origin - Parent website origin
   */
  setParentOrigin(origin) {
    this.parentOrigin = origin;
  }

  /**
   * Send message to parent website
   * @param {string} type - Message type
   * @param {Object} data - Message data
   */
  sendMessage(type, data = {}) {
    if (!this.isWeb || !this.isEmbedded) {
      console.log('Mock message sent:', type, data);
      return;
    }
    
    try {
      window.parent.postMessage({
        source: 'NepaliJetsGame',
        type,
        data
      }, this.parentOrigin);
      console.log('Message sent to parent:', type, data);
    } catch (error) {
      console.error('Error sending message to parent:', error);
    }
  }

  /**
   * Handle incoming message from parent website
   * @param {MessageEvent} event - Message event
   */
  handleMessage(event) {
    // Validate message origin if specific origin is set
    if (this.parentOrigin !== '*' && event.origin !== this.parentOrigin) {
      return;
    }
    
    // Validate message structure
    const { source, type, data } = event.data || {};
    if (source !== 'NepaliJetsParent' || !type) {
      return;
    }
    
    console.log('Message received from parent:', type, data);
    
    // Handle message based on type
    if (this.messageHandlers[type]) {
      this.messageHandlers[type](data);
    } else {
      console.log('Unhandled message type:', type);
    }
  }

  /**
   * Register message handler
   * @param {string} type - Message type
   * @param {Function} handler - Message handler function
   */
  registerMessageHandler(type, handler) {
    this.messageHandlers[type] = handler;
    console.log('Registered handler for message type:', type);
  }

  /**
   * Unregister message handler
   * @param {string} type - Message type
   */
  unregisterMessageHandler(type) {
    delete this.messageHandlers[type];
    console.log('Unregistered handler for message type:', type);
  }

  /**
   * Report game progress to parent website
   * @param {Object} progress - Game progress data
   */
  reportProgress(progress) {
    console.log('Reporting progress:', progress);
    this.sendMessage('gameProgress', progress);
  }

  /**
   * Report game completion to parent website
   * @param {Object} results - Game completion results
   */
  reportCompletion(results) {
    console.log('Reporting completion:', results);
    this.sendMessage('gameComplete', results);
  }

  /**
   * Report error to parent website
   * @param {string} error - Error message
   */
  reportError(error) {
    console.log('Reporting error:', error);
    this.sendMessage('gameError', { error });
  }

  /**
   * Clean up web integration
   */
  cleanup() {
    if (this.isWeb) {
      window.removeEventListener('message', this.handleMessage.bind(this));
      console.log('Web integration cleaned up');
    }
  }
}

// Create singleton instance
const webIntegration = new WebIntegration();

export default webIntegration;
