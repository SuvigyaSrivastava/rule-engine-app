// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { createUser, getUsers } = require('../controllers/userController');

// Route to create a user
router.post('/create', createUser);

// Route to get all users
router.get('/', getUsers);

module.exports = router;
