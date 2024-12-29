Here’s the revised section with the note about login and registration inputs:

---

# MyCrudia Mobile Application

## Overview

**MyCrudia** is a React Native project built with the **Expo Navigator template**, designed for seamless development and deployment of mobile applications. It leverages modern libraries and tools to enhance user experience, streamline development, and ensure scalability.  

**Note:** The login and registration forms currently share the same input fields. This design choice is intentional, as the app focuses on understanding the fundamentals of React Native rather than implementing a fully functional authentication system.

---

## Setup Guide

### Prerequisites

1. Clone the repository:

   ```bash
   git clone https://github.com/xloyb/MyCrudia.git
   ```

2. Navigate to the project directory:

   ```bash
   cd MyCrudia
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Update the API URL in `src/context/AuthContext.tsx`:

   Replace the value of `API_URL` with your ngrok URL or the backend API endpoint:

   ```typescript
   export const API_URL = "https://your-ngrok-link.app/api/auth";
   ```

5. Start the development server:

   ```bash
   npm run android
   ```

6. (Optional) Use **ngrok** to expose your local backend API to the mobile application for external testing:
   - Install ngrok from [ngrok's website](https://ngrok.com/download).
   - Run the following command in your backend directory:
     ```bash
     ngrok http 3000
     ```
   - Replace the `API_URL` in `AuthContext.tsx` with the public ngrok URL generated.

---

## Features and Libraries Used

### Core Features

- **Expo Router**: Simplifies navigation and routing within the application.
- **JWT Authentication**: Securely stores tokens using `expo-secure-store` for session management.
- **Reusable Components**: UI components and services are modular and easy to extend.

### UI Libraries

1. **react-native-ui-lib**: Provides customizable and pre-styled UI components for a consistent and professional design.
2. **React Native Elements**: Simplifies building high-quality and reusable UI elements.

### Storage and Security

- **expo-secure-store**: Used to store JWT tokens securely, ensuring sensitive user data remains protected.

### Services

All service-related logic can be found in the `app/services` directory. This structure allows for clear separation of concerns and easy maintenance of API requests, business logic, and utility functions.

---

## Project Structure

### `src/context/AuthContext.tsx`

This file contains the application's authentication context, managing:
- **API Requests**: Communicates with the backend to handle authentication flows.
- **JWT Token Storage**: Stores and retrieves the authentication token using `expo-secure-store`.

### `app/services`

The `app/services` directory houses all service-related logic for interacting with the backend API. This separation ensures maintainability and scalability.

### Navigation

The project uses **expo-router** for efficient routing and navigation, allowing developers to define routes declaratively while ensuring a smooth user experience.

---

## Running the Application

1. Start the application in development mode:

   ```bash
   npm run android
   ```

2. Open the Expo Go app on your device or simulator and scan the QR code generated in the terminal to run the application.

---

## Notes

- Ensure your backend API is running and accessible via the `API_URL` specified in `AuthContext.tsx`. If you're using a local server, consider exposing it using ngrok.
- The application uses `react-native-ui-lib` and `React Native Elements` to provide a consistent and visually appealing user interface.
- This project is built using the **Expo Navigator template**, ensuring a streamlined setup and development process. 

---