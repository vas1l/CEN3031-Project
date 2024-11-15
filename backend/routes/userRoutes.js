const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const authenticateToken = require('../middleware/validateJWT');
const router = express.Router();

// Signup
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

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  // Check user exists
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }

  // Check password is correct
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }

  // JWT
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '24hr' }
  );

  // For testing in Postman
  // res.json({ success: true, token });

  res
    .cookie('token', token, {
      httpOnly: true,
      // Set secure and sameSite different for production
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    })
    .json({ sucess: true });
});

// Logout
router.post('/logout', async (req, res) => {
  // Clear cookie from browser
  res.clearCookie('token', {
    httpOnly: true,
    // Set secure and sameSite different for production
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  });
  res.json({ mssg: 'Logged out successfully' });
});

// Get user with JWT
router.get('/getbyjwt', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        mssg: 'User not found',
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mssg: 'Internal server error',
    });
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

// // Delete by username
// router.delete('/:userName', async (req, res) => {
//   try {
//     const user = req.params.userName;
//     if (!user) {
//       return res.status(404).json({
//         mssg: `User (${username}) not found`,
//       });
//     } else {
//       await User.deleteOne({ username: user });
//       res.json({ mssg: `User (${username}) deleted` });
//     }
//   } catch (error) {
//     res.status(500).json({
//       mssg: 'Server error',
//       error: error,
//     });
//   }
// });

module.exports = router;
