/**
 * Image constants for NepaliJets app
 * References to all images used in the app
 */

export const IMAGES = {
  // Logo and branding
  LOGO: require('../../assets/images/logo.png'),
  
  // Onboarding images
  ONBOARDING: {
    WELCOME: require('../../assets/images/onboarding/welcome.png'),
    PARENT: require('../../assets/images/onboarding/parent.png'),
    CHILD: require('../../assets/images/onboarding/child.png'),
    TUTORIAL: require('../../assets/images/onboarding/tutorial.png'),
  },
  
  // Game theme images
  ROCKET: {
    SMALL: require('../../assets/images/rocket/small.png'),
    MEDIUM: require('../../assets/images/rocket/medium.png'),
    LARGE: require('../../assets/images/rocket/large.png'),
    FLAME: require('../../assets/images/rocket/flame.png'),
  },
  
  AIRPLANE: {
    SMALL: require('../../assets/images/airplane/small.png'),
    MEDIUM: require('../../assets/images/airplane/medium.png'),
    LARGE: require('../../assets/images/airplane/large.png'),
    PROPELLER: require('../../assets/images/airplane/propeller.png'),
  },
  
  // Background elements
  BACKGROUNDS: {
    SPACE: require('../../assets/images/backgrounds/space.png'),
    SKY: require('../../assets/images/backgrounds/sky.png'),
    CLOUDS: require('../../assets/images/backgrounds/clouds.png'),
    MOUNTAINS: require('../../assets/images/backgrounds/mountains.png'),
  },
  
  // UI elements
  UI: {
    BUTTON: require('../../assets/images/ui/button.png'),
    CARD: require('../../assets/images/ui/card.png'),
    STAR: require('../../assets/images/ui/star.png'),
    MEDAL: require('../../assets/images/ui/medal.png'),
    TROPHY: require('../../assets/images/ui/trophy.png'),
  },
  
  // Auth icons
  AUTH: {
    GOOGLE: require('../../assets/images/auth/google.png'),
    APPLE: require('../../assets/images/auth/apple.png'),
    EMAIL: require('../../assets/images/auth/email.png'),
  },
  
  // Profile avatars
  AVATARS: {
    DEFAULT: require('../../assets/images/avatars/default.png'),
    ROCKET_PILOT: require('../../assets/images/avatars/rocket_pilot.png'),
    AIRPLANE_PILOT: require('../../assets/images/avatars/airplane_pilot.png'),
  },
};

// Note: These image imports will throw errors until the actual image files are added to the assets directory
// For development purposes, you can comment out the requires until the images are available

export default IMAGES;
