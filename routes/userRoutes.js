const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/userController');

// New user create karne ka route
router.post('/', createUser);

module.exports = router;
