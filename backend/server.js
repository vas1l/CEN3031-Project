const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// routes
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const forumRoutes = require('./routes/forumRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// load environment variables and check
dotenv.config();

if (
  !process.env.PORT ||
  !process.env.MONGODB_URI ||
  !process.env.JWT_SECRET_KEY
) {
  throw new Error('Missing necessary environment variables.');
}

const app = express();

// Cors
const corsOptions = {
  origin: 'http://localhost:5173', // for dev
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Parse JSON bodies
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the server
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

// Mount routes
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/forum', forumRoutes); 
app.use('/api/feeling', dashboardRoutes);