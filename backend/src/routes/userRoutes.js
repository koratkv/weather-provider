const express = require("express");
const userController = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")

const router = express.Router();

// Public Routes
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// Protected Routes
router.get("/profile", authMiddleware, userController.getUserProfile);
router.put("/profile", authMiddleware, userController.updateUserProfile);
router.put("/change-password", authMiddleware, userController.passwordChange);
router.put("/add-to-saved-cities", authMiddleware, userController.addToSavedCities);
router.put("/remove-from-saved-cities", authMiddleware, userController.removeFromSavedCities);
router.put("/add-to-history", authMiddleware, userController.addToViewedHistory);
router.put("/remove-from-history", authMiddleware, userController.removeFromViewedHistory);
router.delete("/delete-account", authMiddleware, userController.deleteAccount);

module.exports = router;