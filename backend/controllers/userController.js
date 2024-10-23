// backend/controllers/userController.js

const User = require('../models/User');

// Create a new user
exports.createUser = async (req, res) => {
  const { name, age, salary, department, experience } = req.body;

  try {
    const newUser = new User({ name, age, salary, department, experience });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: 'Error creating user' });
  }
};

// Fetch all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
};
