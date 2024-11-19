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

// get specific post by id route
router.get('/get-post/:id', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('userId', 'username')
      .populate('comments.userId', 'username');

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post' });
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

// get forum posts by userid (JWT) route
// for the dashboard page
router.get('/get-posts-by-userid', authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.user.id })
      .populate('userId', 'username')
      .populate('likes', 'username')
      .populate('comments.userId', 'username')
      .sort({
        createdAt: -1,
      });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// add comment to post route
router.post('/comment/:postId', authenticateToken, async (req, res) => {
  try {
    const { content } = req.body;
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const comment = {
      userId: req.user.id,
      content: content,
    };

    post.comments.push(comment);
    await post.save();

    // return updated post with populated fields
    const updatedPost = await Post.findById(req.params.postId)
      .populate('userId', 'username')
      .populate('likes', 'username')
      .populate('comments.userId', 'username');

    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: 'Error adding comment' });
  }
});

// todo: delete post route

// like/unlike post route
router.put('/like/:postId', authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const likeIndex = post.likes.findIndex((id) => id.equals(req.user.id));

    // if user hasn't liked post yet, add like. otherwise remove like
    if (likeIndex === -1) {
      post.likes.push(req.user.id);
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error updating post likes' });
  }
});

module.exports = router;
