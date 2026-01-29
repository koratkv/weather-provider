const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authMiddleware = async (request, response, next) => {
    try {
        const token = request.headers.authorization?.split(" ")[1];

        if (!token) {
            return response.status(401).json({
                success: false,
                message: "No token provided",
            });
        }

        const verified = jwt.verify(token, JWT_SECRET_KEY);
        request.userId = verified.userId;
        
        console.log("Token verified, userId:", request.userId);
        
        next();
    }
    catch (error) {
        console.error("Auth middleware error:", error.message);
        return response.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

module.exports = authMiddleware;