const express = require('express');
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Add a Comment
router.post('/', authMiddleware, async (req, res) => {
  try {
    const comment = new Comment({
      post: req.body.postId,
      user: req.user.id,
      content: req.body.content,
    });
    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete a Comment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
