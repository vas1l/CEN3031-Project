const express = require('express');
const router = express.Router();

router.post('/signup', async (req, res) => {
  res.json({ mssg: 'POST a new user' });
});

router.get('/:userName', async (req, res) => {
  res.json({ mssg: `Get user with ID: ${req.params.userName}` });
});

router.post('/login', async (req, res) => {
  res.json({ message: 'Login a user' });
});

router.post('/logout', async (req, res) => {
  res.json({ mssg: 'Logout a user' });
});

module.exports = router;
