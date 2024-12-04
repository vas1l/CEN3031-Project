const mongoose = require('mongoose');

const feelingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'], // Links the feeling to a specific user
  },
  date: {
    type: Date,
    required: true,
    default: function() {
      // Ensure the date is set to the start of the day (midnight)
      const now = new Date();
      return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  },
},
  scale: {
    type: Number,
    required: [true, 'Feeling scale is required'], // Records the scale from 1 to 10
    min: [1, 'Scale must be at least 1'], // Minimum value for the scale
    max: [10, 'Scale cannot exceed 10'], // Maximum value for the scale
  },
});

const Feeling = mongoose.model('Feeling', feelingSchema);
module.exports = Feeling;