const mongoose = require('mongoose');

// Connecting to the MongoDB database
mongoose.connect('mongodb://0.0.0.0:27017/habit_tracker_db');

const db = mongoose.connection;

// Event listener for database connection error
db.on('error', console.error.bind(console, 'Error connecting to the database'));

// Event listener for successful database connection
db.once('open', function(){
    console.log('Database connection successful');
});
