const express = require('express');
const router = express.Router();
const eventCtrl = require('../controllers/eventController');

// Event create karne ka route
router.post('/', eventCtrl.createEvent);

// Event details fetch by ID
router.get('/:id', eventCtrl.getEventDetails);

// Register a user to an event
router.post('/:id/register', eventCtrl.registerForEvent);

// Cancel registration
router.post('/:id/cancel', eventCtrl.cancelRegistration);

// List all upcoming events
router.get('/', eventCtrl.listUpcomingEvents);

// Stats of a specific event
router.get('/:id/stats', eventCtrl.eventStats);

module.exports = router;
