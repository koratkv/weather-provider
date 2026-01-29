# Weather Provider

A full-stack weather application with user authentication, saved cities, and search history tracking.

## Overview

Weather Provider is a full-stack MERN application that allows users to search for weather information, save their favorite cities, and track their search history. The application features secure user authentication with JWT tokens and password encryption.

## Project Structure

```
weather-provider/
├── backend/                 # Express.js REST API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── database/       # MongoDB connection
│   │   ├── middleware/     # Authentication middleware
│   │   ├── routes/         # API routes
│   │   └── schemas/        # Mongoose schemas
│   ├── index.js            # Server entry point
│   └── package.json
└── client/                 # React + Vite frontend
    ├── src/
    │   ├── App.jsx         # Main component
    │   ├── main.jsx        # Entry point
    │   └── assets/         # Static assets
    ├── vite.config.js
    └── package.json
```

## Features

### Backend
- **User Authentication**: Sign up and login with JWT token support
- **User Management**: Profile management, password changes, account deletion
- **Saved Cities**: Add/remove cities to personal favorites
- **Search History**: Track and manage viewed weather history
- **Security**: Password encryption with bcrypt, JWT-based protected routes
- **CORS Support**: Configured for frontend communication
- **Error Handling**: Centralized error handler with environment-based logging

### Frontend
- **React 19** with modern hooks
- **Vite** for fast development and optimized builds
- **ESLint** for code quality

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 19** - UI library
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

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
