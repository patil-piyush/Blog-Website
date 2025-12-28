const express = require('express');
const {
  createCommentController,
  getCommentsByBlogController,
  deleteCommentController,
} = require('../controllers/commentController');

const { requireAdmin } = require('../middlewares/authentication');
const { commentRateLimiter } = require('../middlewares/rateLimiter');

const router = express.Router();

// Public
router.post('/comments', commentRateLimiter, createCommentController);
router.get('/comments/:blogId', getCommentsByBlogController);

// Admin
router.delete('/comments/:id', requireAdmin, deleteCommentController);

module.exports = router;
