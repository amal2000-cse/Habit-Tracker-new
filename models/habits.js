const mongoose = require('mongoose');

// Define the schema for the 'habits' collection
const habitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    desc: {
        type: String
    },
    dates: [{
        day: String,
        month: String,
        year: String,
        status: String
    }]
}, {
    toJSON: { virtuals: true } // Include virtuals when converting to JSON
});

// Create a Mongoose model based on the schema for the 'habit' collection
const HabitsList = mongoose.model('habit', habitsSchema);

// Export the HabitsList model
module.exports = HabitsList;
