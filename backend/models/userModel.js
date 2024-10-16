const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [1, 'First name must be at least 1 character long'],
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [1, 'Last name must be at least 1 character long'],
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email is not valid'], // Email validation
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save hook to hash the password before saving the user
userSchema.pre('save', async function (next) {
  // Only hash password if modified or new
  if (!this.isModified('password')) return next();

  try {
    // Hash the password with a salt factor of 10
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password during login
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
