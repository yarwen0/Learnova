# Learnova 🚀

Learnova is a mobile learning application designed to transform the way users learn by generating personalized learning paths tailored to their needs. It leverages AI to create courses, allows users to track their progress, and explore a variety of educational content.

**Live Application Link:** [https://learnova-0--katl41h5of.expo.app](https://learnova-0--katl41h5of.expo.app)

## Table of Contents

* [Description](#description)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Project Structure](#project-structure)
* [Getting Started (For Developers)](#getting-started-for-developers)
    * [Prerequisites](#prerequisites)
    * [Installation](#installation)
    * [Configuration](#configuration)
    * [Running the Application](#running-the-application)
* [Available Scripts](#available-scripts)
* [Context API](#context-api)
* [Key Functionalities](#key-functionalities)
* [Configuration Files](#configuration-files)

## Description

Learnova empowers users to take control of their learning journey. Users can input their learning goals, and the application, with the help of AI, generates potential course topics and then detailed course structures. The app supports user authentication, course management, progress tracking, and exploration of other courses.

## Features

* **User Authentication:** Secure sign-up and sign-in functionality using Firebase Authentication.
* **AI-Powered Course Generation:** Users can describe what they want to learn, and the app uses Google Generative AI to suggest topics and create detailed course content.
* **Personalized Learning Paths:** Users can select topics of interest to customize their courses.
* **Course Management:** Created courses are saved to Firestore and associated with the user.
* **Progress Tracking:** Users can view their enrolled courses and track their learning progress.
* **Explore Courses:** Discover courses created by others, categorized for easy Browse.
* **Profile Management:** View user details (name, email) and logout functionality.
* **Tab-Based Navigation:** Intuitive navigation with tabs for Home, Explore, Progress, and Profile.
* **Custom UI:** Utilizes custom fonts and styling for a pleasant user experience.
* **Haptic Feedback:** Enhances user interaction.
* **Splash Screen & Icons:** Customized app loading experience.

## Tech Stack

* **Frontend:** React Native
* **Framework:** Expo (SDK 52)
* **Navigation:** Expo Router v4
* **State Management:** React Context API (`UserDetailContext`)
* **Backend & Database:** Firebase (Authentication, Firestore)
* **AI:** Google Generative AI (`@google/generative-ai`)
* **Language:** JavaScript (JSX) and TypeScript (TSX)
* **Styling:** React Native StyleSheet
* **Icons:** `@expo/vector-icons` (Ionicons)
* **Local Storage:** `@react-native-async-storage/async-storage`
* **UI Components:**
    * `expo-blur`
    * `react-native-flip-card`
    * `react-native-progress`
* **Development Tools:**
    * Jest & `jest-expo` for testing
    * Expo CLI
    * TypeScript

## 📁 Project Structure

```
learnova/
├── app/                      # Main application screens and routing logic
│   ├── (tabs)/               # Layout and screens for tab navigation
│   │   ├── _layout.jsx       # Tab navigator configuration
│   │   ├── explore.jsx
│   │   ├── home.jsx
│   │   ├── profile.jsx
│   │   └── progress.jsx
│   ├── addCourse/            # Screen for creating new courses
│   │   └── index.jsx
│   ├── auth/                 # Authentication screens
│   │   ├── signIn.jsx
│   │   └── signUp.jsx
│   ├── _layout.tsx           # Root layout, global providers (UserDetailContext, fonts)
│   └── index.jsx             # Landing/entry screen of the app
├── assets/                   # Static assets (images, fonts)
│   ├── fonts/
│   └── images/
├── components/               # Reusable UI components
│   ├── Explore/
│   │   └── CourseListByCategory.jsx
│   ├── Home/
│   │   ├── CourseList.jsx
│   │   ├── CourseProgress.jsx
│   │   ├── Header.jsx
│   │   ├── NoCourse.jsx
│   │   └── PractiseSection.jsx
│   └── Shared/
│       ├── Button.jsx
│       └── CourseProgressCard.jsx
├── config/                   # Configuration files
│   ├── AiModel.js            # Setup for Google Generative AI
│   └── firebaseConfig.js     # Firebase initialization
├── constant/                 # Static data and UI constants
│   ├── Colors.js
│   ├── Option.js
│   └── Prompt.js
├── context/                  # React Context API setup
│   └── UserDetailContext.js
├── scripts/                  # Project utilities
│   └── reset-project.js
├── app.json                  # Expo config
├── package.json              # NPM dependencies and scripts
├── tsconfig.json             # TypeScript config
└── babel.config.js           # Babel config for Expo
```


## Getting Started (For Developers)

### Prerequisites

* Node.js (LTS version recommended)
* npm or yarn
* Expo CLI: `npm install -g expo-cli`
* Git

### Installation

1.  **Clone the repository (Example):**
    ```bash
    git clone <repository-url>
    cd learnova
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Configuration

1.  **Firebase Setup:**
    * Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).
    * Enable Firestore and Firebase Authentication (Email/Password).
    * Obtain your Firebase project configuration (apiKey, authDomain, projectId, etc.).
    * Create a `config/firebaseConfig.js` file (if it doesn't exist or is gitignored) and add your Firebase configuration:
        ```javascript
        // Example: config/firebaseConfig.js
        import { initializeApp } from "firebase/app";
        import { getAuth } from "firebase/auth";
        import { getFirestore } from "firebase/firestore";

        const firebaseConfig = {
          apiKey: "YOUR_API_KEY",
          authDomain: "YOUR_AUTH_DOMAIN",
          projectId: "YOUR_PROJECT_ID",
          storageBucket: "YOUR_STORAGE_BUCKET",
          messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
          appId: "YOUR_APP_ID"
        };

        const app = initializeApp(firebaseConfig);
        export const auth = getAuth(app);
        export const db = getFirestore(app);
        ```
2.  **Google Generative AI Setup:**
    * Obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    * In `config/AiModel.js` (or wherever your AI models are initialized), ensure your API key is securely configured. It's common practice to use environment variables for this.
        ```javascript
        // Example: config/AiModel.js (conceptual)
        import { GoogleGenerativeAI } from "@google/generative-ai";

        const API_KEY = "YOUR_GOOGLE_AI_API_KEY"; // Replace with your actual key or use process.env

        const genAI = new GoogleGenerativeAI(API_KEY);

        export const GenerateTopicsAIModel = genAI.getGenerativeModel({ model: "gemini-pro" }); // Or your chosen model
        export const GenerateCourseAIModel = genAI.getGenerativeModel({ model: "gemini-pro" }); // Or your chosen model
        ```
    * **Security Note:** Do not commit API keys directly into your repository. Use environment variables or a gitignored configuration file.

### Running the Application

1.  **Start the Expo development server:**
    ```bash
    npm start
    # or
    yarn start
    # or
    expo start
    ```
2.  **Run on a device or emulator/simulator:**
    * **Expo Go App:** Scan the QR code with the Expo Go app (available on Android and iOS).
    * **Android Emulator/Device:** Press `a` in the terminal.
    * **iOS Simulator/Device:** Press `i` in the terminal.
    * **Web Browser:** Press `w` in the terminal.

## Available Scripts

From `package.json`:

* `npm start` or `yarn start`: Starts the Expo development server.
* `npm run android` or `yarn android`: Starts the app on a connected Android device or emulator.
* `npm run ios` or `yarn ios`: Starts the app on an iOS simulator or device (macOS only).
* `npm run web` or `yarn web`: Starts the app in a web browser.
* `npm test` or `yarn test`: Runs tests using Jest.
* `npm run lint` or `yarn lint`: Lints the project files using Expo's lint configuration.
* `npm run reset-project` or `yarn reset-project`: Executes the `./scripts/reset-project.js` script.

## Context API

* **`UserDetailContext` (`app/_layout.tsx` & `app/index.jsx`):**
    * Manages the global state of the logged-in user's details (`userDetail`).
    * Provides `userDetail` and `setUserDetail` to various components for accessing and updating user information.

## Key Functionalities

* **Authentication Flow (`app/auth/`, `app/index.jsx`):**
    * The `app/index.jsx` screen checks the Firebase authentication state. If a user is logged in, it fetches their details from Firestore using their email as the document ID in the `users` collection and navigates to the home screen.
    * Sign-up (`app/auth/signUp.jsx`): Creates a new user with email and password in Firebase Authentication and saves user details (name, email) to the `users` collection in Firestore.
    * Sign-in (`app/auth/signIn.jsx`): Authenticates an existing user and fetches their details from Firestore.
* **AI Course Generation (`app/addCourse/index.jsx`):**
    * Users input a desired learning area.
    * `GenerateTopicsAIModel` is used with a prompt (`Prompt.IDEA`) to suggest relevant topics.
    * Users select preferred topics.
    * `GenerateCourseAIModel` is used with the selected topics and another prompt (`Prompt.COURSE`) to generate a detailed course structure (title, chapters, content, etc.).
    * The generated course is saved to the `Courses` collection in Firestore, including `createdBy` (user's email) and `createdOn` timestamp.
* **Course Display and Interaction:**
    * **Home Screen (`app/(tabs)/home.jsx`):** Displays courses created by the logged-in user. Includes a `CourseProgress` section and a list of their courses.
    * **Explore Screen (`app/(tabs)/explore.jsx`):** Allows users to browse courses by category (defined in `constant/Option.js`).
    * **Progress Screen (`app/(tabs)/progress.jsx`):** Shows a list of courses created by the user, likely focusing on their progress through them. Tapping a course navigates to a detailed `courseView` (route not fully shown but inferred from params).

## Configuration Files

* **`app.json`:** Expo's main configuration file. Defines app metadata (name, version, icon, splash screen), platform-specific settings (iOS, Android, Web), plugins (`expo-router`, `expo-splash-screen`), and experimental features like `typedRoutes`.
* **`package.json`:** Lists project dependencies, development dependencies, and scripts for building, running, and testing the application.
* **`tsconfig.json`:** Configures the TypeScript compiler, including path aliases (`@/*`) and strict mode.

---

This README provides a comprehensive overview of the Learnova application. Feel free to expand on any section or add new ones as the project evolves!