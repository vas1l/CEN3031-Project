const express = require('express');
const router = express.Router();
const Post = require('../models/postModel');
const authenticateToken = require('../middleware/validateJWT');

// /api/forum

// get all posts route
router.get('/get-all-posts', authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'username') // only get username and id from User model
      .sort({ createdAt: -1 }); // sort by newest first
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// create new post route
router.post('/create', authenticateToken, async (req, res) => {
  try {
    const { title, content, category } = req.body;

    // create new post instance with user ID from JWT token
    const post = new Post({
      userId: req.user.id, // req.user is set by authenticateToken middleware
      title,
      content,
      category,
    });

    await post.save(); // save to DB

    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// todo: add comment to post route

// todo: delete post route

// todo: like post route. Add by user id so that on the frontend we can display the count without repeats from users

module.exports = router;
