🌤️ Weather Provider: SkyStack Pro
A premium, full-stack MERN climate engine featuring real-time data, user authentication, and advanced weather interpretation logic.

🚀 Overview
SkyStack Pro is a high-performance application that allows users to search for live weather data globally. Beyond simple numbers, it interprets climate data to provide user safety advice and features a professional-grade "Midnight Glass" UI.
'''
📂 Project Structure
weather-provider/
├── backend/                # Express.js REST API
│   ├── src/
│   │   ├── controllers/    # Route handlers
│   │   ├── database/       # MongoDB connection
│   │   ├── middleware/     # Authentication middleware
│   │   ├── routes/         # API routes
│   │   └── schemas/        # Mongoose schemas
│   ├── index.js            # Server entry point
│   └── package.json
└── sky-stack/              # React 19 + Vite Frontend (MUI)
    ├── src/
    │   ├── App.jsx         # Main UI & Climate Logic
    │   ├── main.jsx        # Entry point
    │   └── assets/         # Static assets
    ├── vite.config.js
    └── package.json
✨ Key Features
💻 SkyStack Pro Frontend (New!)
Live API Integration: Real-time fetching from OpenWeatherMap.

''' 

Premium UI/UX: Midnight dark theme with Glassmorphism, radial gradients, and responsive Material UI design.

Climate Interpretation: Intelligent logic that categorizes weather (e.g., "Extreme Heat", "Perfect Climate") and provides safety advice.

Micro-animations: Smooth transitions using MUI Fade and Paper components.

⚙️ Backend Logic
User Authentication: Secure Sign-up/Login with JWT tokens and bcrypt encryption.

Data Persistence: MongoDB integration to save favorite cities and search history.

Protected Routes: Middleware to ensure weather history is tied to specific user accounts.

Health Checks: API status monitoring.

🛠️ Tech Stack
Frontend: React 19, Vite, Material UI (MUI), MUI Icons.

Backend: Node.js, Express.js.

Database: MongoDB (Mongoose).

Security: JWT, bcrypt, CORS.

📡 API Endpoints
Authentication
POST /api/auth/signup - Create new account

POST /api/auth/login - Login and receive JWT token

User Data (Protected)
GET /api/auth/profile - Get user profile

PUT /api/auth/add-to-saved-cities - Save a favorite city

PUT /api/auth/add-to-history - Track viewed weather data
