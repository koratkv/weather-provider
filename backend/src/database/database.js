// Database Connection Setup
const mongoose = require("mongoose");

const connectToDatabase = async (URL) => {
    try {
        mongoose.connect(URL);
        console.log("Connected to the database successfully.");
    }
    catch (error) {
        console.log("Error connecting to database: \n", error);
    }
}

module.exports = connectToDatabase;

