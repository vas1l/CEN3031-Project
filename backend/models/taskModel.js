const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'], // Ensure task is associated with a user
  },
  title: {
    type: String,
    required: [true, 'Task title is required'],
    minlength: [3, 'Title must be at least 3 characters long'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description can be at most 500 characters'],
  },
  category: {
    type: String,
    enum: ['work', 'personal', 'academic', 'club', 'other'], // Task categories
    default: 'personal',
  },
  startTime: {
    type: Date,
    required: [true, 'Start time is required'],
  },
  endTime: {
    type: Date,
    validate: {
      validator: function (value) {
        return this.startTime <= value; // Ensures end time is after start time
      },
      message: 'End time must be after start time',
    },
  },
  reminder: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to set updatedAt before saving task
taskSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
