/**
 * Theme configuration for NepaliJets app
 * Child-friendly UI elements with rocket and airplane theme
 */

import { COLORS } from './colors';

export const FONTS = {
  regular: {
    fontFamily: 'System',
    fontWeight: '400',
  },
  medium: {
    fontFamily: 'System',
    fontWeight: '500',
  },
  bold: {
    fontFamily: 'System',
    fontWeight: '700',
  },
  sizes: {
    h1: 24, // Main titles
    h2: 20, // Section titles
    h3: 18, // Sub-section titles
    body1: 16, // Primary text
    body2: 14, // Secondary text
    caption: 12, // Small text
  },
};

export const SPACING = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
  xxl: 48,
};

export const SIZES = {
  // Screen dimensions will be calculated dynamically
  buttonHeight: 48,
  iconSize: {
    small: 16,
    medium: 24,
    large: 32,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 16,
    pill: 24,
  },
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 4,
  },
  large: {
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 8,
  },
};

export const THEME = {
  colors: COLORS,
  fonts: FONTS,
  spacing: SPACING,
  sizes: SIZES,
  shadows: SHADOWS,
};

export default THEME;
