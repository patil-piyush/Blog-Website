const express = require('express');
const {
  signInAdminController,
  logOutAdminController,
} = require('../controllers/adminController');

const {
  createBlogController,
  editBlogController,
  deleteBlogController,
} = require('../controllers/blogController');

const { requireAdmin } = require('../middlewares/requireAdmin');

const router = express.Router();

// Auth
router.post('/signin', signInAdminController);
router.post('/logout', logOutAdminController);

// Blog management
router.post('/blogs', requireAdmin, createBlogController);
router.put('/blogs/:id', requireAdmin, editBlogController);
router.delete('/blogs/:id', requireAdmin, deleteBlogController);

module.exports = router;
