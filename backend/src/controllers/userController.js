const User = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

// Environment Variables
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

// Hashing Password
const hashPassword = async (password) => {
    const saltRounds = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, saltRounds);
}

// Compare Password
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

// JWT Token Generation
const generateToken = (userID) => {
    return jwt.sign({ userId: userID.toString() }, JWT_SECRET_KEY, { expiresIn: "7d" });
}

// User Sign Up 
exports.signup = async ( request, response ) => {
    try {
        const { name, email, password, confirmPassword } = request.body;

        // Missing Input Validation
        if (!name || !email || !password || !confirmPassword) {
            return response.status(400).json({
                success: false,
                message: "Name, Email and Password are required",
            });
        };

        // Email Format Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return response.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        // Passwords Match Check
        if (password !== confirmPassword) {
            return response.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        };

        // Password Strength Validation
        if (password.length < 6) {
            return response.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
        }

        // Existing User Check
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return response.status(400).json({
                success: false,
                message: "User already exists",
            });
        };

        const hashedPassword = await hashPassword(password);
        console.log(hashedPassword);

        // New User Creation and Saving
        const newUser = new User({
            name: name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // Token Generation
        const token = generateToken(newUser._id);

        return response.status(201).json({
            success: true,
            message: "User created successfully",
            token: token,
        });
    }
    catch (error) {
        console.log("Server error during signup");
        return response.status(500).json({
            success: false,
            message: "Server error during signup",
            error: error,
        })
    }
}

// User Login
exports.login = async ( request, response ) => {
    try {
        const { email, password } = request.body;

        // Missing Input Validation
        if (!email || !password) {
            return response.status(400).json({
                sucesss: false,
                message: "Email and Password are required",
            });
        };

        // Find User By Email
        const user = await User.findOne({ email });
        if (!user) {
            return response.status(401).json({
                success: false,
                message: "User does not exist",
            });
        };

        // Password Comparison
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return response.status(401).json({
                success: false,
                message: "Password is incorrect",
            });
        };

        // Generate Token
        const token = generateToken(user._id)

        return response.status(200).json({
            success: true,
            message: "User successfully logged in",
            token: token,
        });
    }
    catch (error) {
        console.log("Server error during login");
        return response.status(500).json({
            success: false,
            message: "Server error during login",
            error: error,
        })
    }
};

// Fetch User Profile
exports.getUserProfile = async ( request, response ) => {
    try {
        const userId = request.userId;

        const user = await User.findById(userId)
            .select("-password");

        if (!user) {
            return response.status(400).json({
                success: false,
                message: "User not found",
            });
        };

        return response.status(200).json({
            success: true,
            user: user,
        });
    }
    catch (error) {
        console.log("Server error fetching user profile");
        return response.status(500).json({
            success: false,
            message: "Server error fetching user profile",
            error: error,
        });
    };
}

// User Profile Updation
exports.updateUserProfile = async ( request, response ) => {
    try {
        const userId = request.userId;
        const { name, email } = request.body;

        const user = await User.findByIdAndUpdate(
            userId,
            {
                name,
                email,
                updatedAt: new Date(),
            },
            { new: true }
        ).select("-password");

        return response.status(200).json({
            success: true,
            message: "User details successfully changed",
            user: user,
        });
    }
    catch (error) {
        console.log("Server error updating user information \n", error);
        response.status(500).json({
            success: false,
            message: "Server error updating user information",
            error: error.message,
        })
    }
}

// Change Password
exports.passwordChange = async ( request, response ) => {
    try {
        const userId = request.userId;
        const { currentPassword, newPassword } = request.body;

        // Input validation
        if (!currentPassword || !newPassword) {
            return response.status(400).json({
                success: false,
                message: "Both current and new passwords are required",
            });
        };
        
        // User exist check
        const user = await User.findById(userId);
        if (!user) {
            return response.status(404).json({
                success: false,
                message: "User does not exist",
            });
        };
        
        // Password validation
        const isPasswordValid = await comparePassword(currentPassword, user.password);
        if (!isPasswordValid) {
            return response.status(404).json({
                success: false,
                message: "Password entered is incorrect",
            });
        };

        // Hashing new password
        const hashedPassword = await hashPassword(newPassword);

        user.password = hashedPassword;
        user.updatedAt = new Date();
        await user.save()

        return response.status(200).json({
            success: true,
            message: "Password changed successfully",
        });
    }
    catch (error) {
        console.log("Server error while changing password \n", error);
        response.status(500).json({
            success: false,
            message: "Server error while changing password",
        });
    };
};

exports.addToViewedHistory = async ( request, response ) => {
    try {
        const userId = request.userId;
        const city = request.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { cityHistory: city } },
            { new: true } 
        );

        if (!user) {
            return response.status(400).json({
                success: false,
                message: "User not found",
            });
        };

        return response.status(200).json({
            success: true,
            message: "City added successfully",
            city: city,
            cityHistory: user.cityHistory,
        })
    }
    catch (error) {
        console.log("Server error while modifying viewed history \n", error);
        return response.status(500).json({
            success: false,
            message: "Server error while modifying viewed history",
            error: error,
        })
    }
}

exports.removeFromViewedHistory = async ( request, response ) => {
    try {
        const userId = request.userId;
        const { city } = request.body;

        if (!city) {
            return response.status(400).json({
                success: false,
                message: "City name is required",
            });
        }

        const user = await User.findById(userId);

        // Check if the city exists in cityHistory
        const cityExists = user.cityHistory.some(item => item.city === city);

        if (!cityExists) {
            return response.status(404).json({
                success: false,
                message: "City not found in history",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { cityHistory: { city: city } } },
            { new: true }
        );

        if (!updatedUser) {
            return response.status(404).json({
                success: false,
                message: "User not found",
            });
        };

        return response.status(200).json({
            success: true,
            message: "City successfully removed",
            cityHistory: updatedUser.cityHistory,
        })
    }
    catch (error) {
        console.log("Server error while modifying viewed history \n", error);
        return response.status(500).json({
            success: false,
            message: "Server error while modifying viewed history",
            error: error,
        })
    }
}

exports.addToSavedCities = async ( request, response ) => {
    try {
        const userId = request.userId;
        const city = request.body;

        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { savedCities: city } },
            { new: true } 
        );

        if (!user) {
            return response.status(400).json({
                success: false,
                message: "User not found",
            });
        };

        return response.status(200).json({
            success: true,
            message: "City added successfully",
            city: city,
            savedCities: user.savedCities,
        })
    }
    catch (error) {
        console.log("Server error while updating saved cities \n", error);
        return response.status(500).json({
            success: false,
            message: "Server error while updating saved cities",
            error: error,
        })
    }
}

exports.removeFromSavedCities = async ( request, response ) => {
    try {
        const userId = request.userId;
        const { city } = request.body;

        if (!city) {
            return response.status(400).json({
                success: false,
                message: "City name is required",
            });
        }

        const user = await User.findById(userId);

        // Check if the city exists in cityHistory
        const cityExists = user.savedCities.some(item => item.city === city);

        if (!cityExists) {
            return response.status(404).json({
                success: false,
                message: "City not found in history",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { savedCities: { city: city } } },
            { new: true }
        );

        if (!updatedUser) {
            return response.status(404).json({
                success: false,
                message: "User not found",
            });
        };

        return response.status(200).json({
            success: true,
            message: "City successfully removed",
            savedCities: user.savedCities,
        })
    }
    catch (error) {
        console.log("Server error while updating saved cities \n", error);
        return response.status(500).json({
            success: false,
            message: "Server error while updating saved cities",
            error: error,
        })
    }
}

// Account Deletion
exports.deleteAccount = async ( request, response ) => {
    try {
        const userId = request.userId;

        await User.findByIdAndDelete(userId);

        return response.status(200).json({
            success: true,
            message: "User successfully deleted",
        });
    }
    catch (error) {
        console.log("Server error during user deletion");
        response.status(500).json({
            success: false,
            message: "Server error during user deletion",
            error: error,
        });
    };
};


