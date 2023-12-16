const express = require('express');
const router = express.Router();

// Import the homeController module
const homeController = require('../controller/homecontroller');

// Route for rendering the home page
router.get('/', homeController.home);

// Route for adding a new habit
router.post('/addHabit', homeController.addHabit);

// Route for updating the habit status
router.get('/habitStatus/:habit_id&:date_id&:mark', homeController.habitStatus);

// Route for deleting a habit
router.get('/deleteHabit/:id', homeController.deleteHabit);

// Export the router for use in other parts of the application
module.exports = router;
