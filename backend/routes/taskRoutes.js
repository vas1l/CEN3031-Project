const express = require('express');
const Task = require('../models/taskModel');
const authenticateToken = require('../middleware/validateJWT');
const router = express.Router();

// Create a new task
router.post('/create', authenticateToken, async (req, res) => {
  const { title, description, category, startTime, endTime, reminder } = req.body;

  if (!title || !startTime) {
    return res.status(400).json({ error: 'Title and start time are required' });
  }

  try {
    const newTask = new Task({
      userId: req.user.id,
      title,
      description,
      category,
      startTime,
      endTime,
      reminder,
    });

    await newTask.save();
    res.status(201).json({
      message: 'Task created successfully',
      task: newTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while creating task' });
  }
});
// Get tasks for a user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id }).sort({ startTime: 1 });
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching tasks' });
  }
});
// Get a single task by id

// Update task by id

// Delete task by id



module.exports = router;
