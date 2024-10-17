const express = require('express');
const User = require('../models/userModel');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { firstname, lastname, username, email, password } = req.body;

  if (!firstname || !lastname || !username || !email || !password) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  try {
    const newUser = new User({
      firstname,
      lastname,
      username,
      email,
      password,
    });

    await newUser.save();
    res.status(201).json({
      message: 'User created successfully',
      user: newUser,
    });
  } catch (error) {
    // Username or email may already exist: return error with the duplicate field
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern)[0];
      return res
        .status(400)
        .json({ error: `${duplicateField} already exists` });
    }
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get using username
router.get('/:userName', async (req, res) => {
  const username = req.params.userName;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        mssg: `User (${username}) not found`,
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      mssg: 'Server error',
      error: error,
    });
  }
});

router.post('/login', async (req, res) => {
  res.json({ message: 'Login a user' });
});

router.post('/logout', async (req, res) => {
  res.json({ mssg: 'Logout a user' });
});

module.exports = router;
