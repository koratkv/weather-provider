# Weather Provider: SkyStack Pro

A premium, full-stack MERN climate engine featuring real-time data, user authentication, and advanced weather interpretation logic.

## Overview
**SkyStack Pro** is a high-performance application that allows users to search for live weather data globally. Beyond simple numbers, it interprets climate data to provide user safety advice and features a professional-grade "Midnight Glass" UI.

## Project Structure
```
weather-provider/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   ├── middleware/
│   │   ├── routes/
│   │   └── schemas/
│   ├── index.js
│   └── package.json
└── sky-stack/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── assets/
    ├── vite.config.js
    └── package.json
```
## Key Features
- Live API Integration: Real-time fetching from OpenWeatherMap.
- Premium UI/UX: Midnight dark theme with Glassmorphism, radial gradients, and responsive Material UI design.
- Climate Interpretation: Intelligent logic that categorizes weather (e.g., "Extreme Heat", "Perfect Climate") and provides safety advice.
- Micro-animations: Smooth transitions using MUI Fade and Paper components.

## Backend Logic
- **User Authentication**: Sign up and login with JWT token support
- **User Management**: Profile management, password changes, account deletion
- **Saved Cities**: Add/remove cities to personal favorites
- **Search History**: Track and manage viewed weather history
- **Security**: Password encryption with bcrypt, JWT-based protected routes
- **CORS Support**: Configured for frontend communication
- **Error Handling**: Centralized error handler with environment-based logging

## Tech Stack
Frontend: React 19, Vite, Material UI (MUI), MUI Icons.

Backend: Node.js, Express.js.

Database: MongoDB (Mongoose).

Security: JWT, Bcrypt, CORS.

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - Login and receive JWT token

### User Profile (Protected)
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `DELETE /api/auth/delete-account` - Delete user account

### Saved Cities (Protected)
- `PUT /api/auth/add-to-saved-cities` - Add city to favorites
- `PUT /api/auth/remove-from-saved-cities` - Remove city from favorites

### Search History (Protected)
- `PUT /api/auth/add-to-history` - Add to viewed history
- `PUT /api/auth/remove-from-history` - Remove from history

### Health Check
- `GET /api/health` - Server status
