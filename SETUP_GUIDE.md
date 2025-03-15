# NepaliJets - Setup Guide

This guide provides detailed instructions for setting up and running the NepaliJets language learning app.

## Development Environment Setup

### Required Software
- **Node.js**: Version 14.0.0 or newer
- **npm**: Version 6.0.0 or newer (comes with Node.js)
- **Expo CLI**: For React Native development with Expo

### Installing Dependencies

1. Install Node.js and npm:
   - Download and install from [nodejs.org](https://nodejs.org/)
   - Verify installation:
     ```bash
     node --version
     npm --version
     ```

2. Install Expo CLI globally:
   ```bash
   npm install -g expo-cli
   ```

3. Install project dependencies:
   ```bash
   cd NepaliJets
   npm install
   ```

## Firebase Configuration

The app uses Firebase for authentication, database, and storage. Follow these steps to set up Firebase:

1. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click "Add project" and follow the setup wizard
   - Enable Google Analytics if desired

2. Configure Authentication:
   - In Firebase Console, go to "Authentication" > "Sign-in method"
   - Enable Email/Password authentication
   - Enable Google Sign-in
   - Enable Apple Sign-in (requires Apple Developer account)

3. Set up Firestore Database:
   - Go to "Firestore Database" > "Create database"
   - Start in production mode or test mode
   - Choose a database location close to your target users

4. Set up Firebase Storage:
   - Go to "Storage" > "Get started"
   - Follow the setup wizard

5. Get Firebase configuration:
   - Go to Project settings > General
   - Scroll down to "Your apps" section
   - Click the web app icon (</>) to register a web app if you haven't already
   - Copy the Firebase configuration object

6. Update Firebase configuration in the app:
   - Open `src/config/firebase.js`
   - Replace the placeholder configuration with your Firebase config:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
       measurementId: "YOUR_MEASUREMENT_ID"
     };
     ```

## Running the App

1. Start the development server:
   ```bash
   npm start
   # or
   expo start
   ```

2. Run on a device or emulator:
   - For Android: Press `a` in the terminal or click "Run on Android device/emulator" in the Expo DevTools
   - For iOS: Press `i` in the terminal or click "Run on iOS simulator" in the Expo DevTools
   - For web: Press `w` in the terminal or click "Run in web browser" in the Expo DevTools

3. Run on a physical device:
   - Install the Expo Go app on your device
   - Scan the QR code displayed in the terminal or Expo DevTools
   - Make sure your device is on the same network as your development machine

## Troubleshooting

### Common Issues

1. **Module not found errors**:
   - Ensure all dependencies are installed: `npm install`
   - Restart the development server: Press `r` in the terminal

2. **Firebase connection issues**:
   - Verify your Firebase configuration is correct
   - Check that your Firebase project has the necessary services enabled
   - Ensure your device/emulator has internet access

3. **Expo build errors**:
   - Clear Expo cache: `expo r -c`
   - Update Expo CLI: `npm install -g expo-cli`

4. **Authentication errors**:
   - Ensure Firebase Authentication is properly configured
   - For Google Sign-In, verify the OAuth client ID is correctly set up
   - For Apple Sign-In, ensure you have the necessary Apple Developer credentials

## Deployment

### Expo Build

To create standalone builds for app stores:

1. Configure app.json:
   - Update the app name, slug, version, etc.
   - Add icons and splash screens

2. Build for Android:
   ```bash
   expo build:android
   ```

3. Build for iOS:
   ```bash
   expo build:ios
   ```

### Web Deployment

To deploy the web version:

1. Build the web app:
   ```bash
   expo build:web
   ```

2. Deploy to a hosting service like Firebase Hosting, Netlify, or Vercel.

## Additional Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Navigation Documentation](https://reactnavigation.org/docs/getting-started)
