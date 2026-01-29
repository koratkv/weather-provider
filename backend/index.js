// Dotenv Config
require("dotenv").config();

// Main Imports
const express = require("express");
const app = express();
const cors = require("cors");

const corsOptions = {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());

// Other File Imports
const connectToDatabase = require("./src/database/database");
const userRoutes = require("./src/routes/userRoutes");
const climateRoutes = require("./src/routes/climateRoutes");

// Dotenv variables
const databaseURL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3000;

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/climate", climateRoutes);

// Health Check Endpoint
app.get("/api/health", ( request, response ) => {
    response.status(200).json({
        message: "Server is up and running",
    });
});

// Error Handler
app.use(( error, request, response, next ) => {
    console.log("Error: ", error);
    response.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? error : undefined,
    });
});

app.listen(PORT, async ( request, response ) => {
    console.log(`App is running at http://localhost:${PORT}`);
    await connectToDatabase(databaseURL);
})

