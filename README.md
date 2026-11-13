# IT313_Ontario_Francismie_LoginSignUp

React Native / Expo implementation for Laboratory 8 – IT313 Mobile Programming.

## Features
- Login, Sign-Up, and Profile screens with state-based screen switching.
- Reusable `FormField` component and controlled TextInput fields.
- Login validation and in-memory user matching.
- Sign-Up validation for name, email, student ID, password, and confirmation.
- KeyboardAvoidingView, ScrollView, keyboardShouldPersistTaps, and Keyboard.dismiss().
- Profile details displayed using FlatList; edit name and confirm logout.

## Project structure
- `App.js` – parent state, LoginScreen, SignupScreen, ProfileScreen, validation, and styles.
- `components/FormField.js` – reusable labeled input and inline error component.
- `README.md` – project notes and run instructions.

## Run the app
1. Install Node.js LTS and VS Code.
2. Extract this project folder.
3. Open the folder in VS Code.
4. Open Terminal > New Terminal and run:
   ```bash
   npm install
   npx expo start
   ```
5. Scan the QR code using Expo Go, or press `a` for Android emulator.

## Test account
- Email: `ana.reyes@ustp.edu.ph`
- Password: `Password123`

This is a classroom-only in-memory simulation. It does not use a backend or real authentication. Do not use a real password.
