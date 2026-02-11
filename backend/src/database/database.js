// Database Connection Setup
const mongoose = require("mongoose");

const connectToDatabase = async (URL) => {
    try {
        await mongoose.connect(URL);
        console.log("Connected to the database successfully.");
    }
    catch (error) {
        console.log("Error connecting to database: \n", error);
        process.exit(1);
    }
}

module.exports = connectToDatabase;