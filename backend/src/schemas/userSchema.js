const mongoose = require("mongoose");

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    savedCities: [
        {
            city: { type: String },
            state: { type: String },
            country: { type: String },
            lat: { type: Number },
            lon: { type: Number },
            addedAt: { type: Date },
        }
    ],
    cityHistory: [
        {
            city: { type: String },
            state: { type: String },
            country: { type: String },
            lat: { type: Number },
            lon: { type: Number },
            viewedAt: { type: Date },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

const userSchema = mongoose.model("User", User);

module.exports = userSchema;