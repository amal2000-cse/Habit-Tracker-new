const express = require('express');
const app = express();
const port = 8000;

const expressLayout = require('express-ejs-layouts');

// Set up Express to use EJS layouts
app.use(expressLayout);

// Parse URL-encoded bodies for form data
app.use(express.urlencoded({ extended: true }));

// Include routes from the 'routes' module
app.use('/', require('./routes'));

// Serve static files from the 'assets' directory
app.use(express.static('./assets'));

// Enable extraction of styles and scripts from EJS layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', './views');

// Connect to the MongoDB database
const db = require('./config/mongoose');

// Start the server on the specified port
app.listen(port, function(err){
    if(err){
        console.log(`Error starting server on port: ${port}`);
        return;
    }
    console.log(`Server is running on port: ${port}`);
});
