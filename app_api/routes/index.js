const express = require('express'); //Express app
const router = express.Router(); // Router logic

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');

// define route for our trips endpoint 
router
    .route('/trips')
    .get(tripsController.tripsList) // GET method routes tripList
    .post(tripsController.tripsAddTrip); // Post Method Adds a Trip

// GET Method routes tripsFindByCode -Requires paramerters 
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(tripsController.tripsUpdateTrip);

module.exports = router;