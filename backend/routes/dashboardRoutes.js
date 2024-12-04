const express = require('express');
const Feeling = require('../models/moodModel'); // Ensure the path is correct
const router = express.Router();

// POST: Create a new feeling entry
// POST: Create or update a feeling entry
router.post('/', async (req, res) => {
    try {
      const { userId, scale } = req.body;
  
      // Validate input
      if (!userId || scale === undefined) {
        return res.status(400).json({ message: 'User ID and scale are required.' });
      }
  
      if (scale < 1 || scale > 10) {
        return res.status(400).json({ message: 'Scale must be between 1 and 10.' });
      }
  
      // Set date to start of the day
      const today = new Date();
      const date = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  
      // Find existing feeling for the user on the same date
      let feeling = await Feeling.findOne({ userId, date });
  
      if (feeling) {
        // Update existing feeling
        feeling.scale = scale;
        await feeling.save();
        res.status(200).json({ message: 'Mood updated successfully.', feeling });
      } else {
        // Create new feeling entry
        feeling = new Feeling({ userId, scale, date });
        await feeling.save();
        res.status(201).json({ message: 'Mood logged successfully.', feeling });
      }
    } catch (error) {
      console.error('Error creating/updating feeling:', error.message);
  
      // Handle duplicate key error
      if (error.code === 11000) {
        return res.status(400).json({ message: 'Mood for today already exists.' });
      }
  
      res.status(500).json({ message: 'An error occurred while processing the mood.' });
    }
  });
// PATCH: Update an existing feeling entry
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Update the feeling entry
    const feeling = await Feeling.findByIdAndUpdate(id, updates, { new: true });

    if (!feeling) {
      return res.status(404).json({ message: 'Feeling not found.' });
    }

    res.status(200).json(feeling);
  } catch (error) {
    console.error('Error updating feeling:', error.message);
    res.status(500).json({ message: 'An error occurred while updating the feeling.' });
  }
});

// GET: Fetch all feelings from the past week
router.get('/past-week/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    // Fetch feelings for the user from the past week
    const feelings = await Feeling.find({
      userId,
      date: { $gte: oneWeekAgo },
    }).sort({ date: 1 });

    res.status(200).json(feelings);
  } catch (error) {
    console.error('Error fetching past week feelings:', error.message);
    res.status(500).json({ message: 'An error occurred while fetching the feelings.' });
  }
});

module.exports = router;