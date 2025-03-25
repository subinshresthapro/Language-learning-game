/**
 * index.js
 * 
 * Entry point for the web export of the Nepali language learning game
 * Exports the game for web embedding
 */

import { AppRegistry } from 'react-native';
import WebExport from './src/web/WebExport';

// Make sure the export is available globally
if (typeof window !== 'undefined') {
  window.NepaliJetsGame = WebExport;
}

export default WebExport;
