const mongoose = require('mongoose');

// Connecting to the MongoDB database
const url="mongodb+srv://amal:suvarnam123@cluster0.rc1clne.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url);

const db = mongoose.connection;

// Event listener for database connection error
db.on('error', console.error.bind(console, 'Error connecting to the database'));

// Event listener for successful database connection
db.once('open', function(){
    console.log('Database connection successful');
});
module.exports = mongoose; // Export the mongoose instance
