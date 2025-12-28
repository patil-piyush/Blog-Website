const express = require('express');
const {
  getAllBlogsController,
  getBlogBySlugController,
} = require('../controllers/blogController');

const router = express.Router();

// Public blog routes
router.get('/blogs', getAllBlogsController);
router.get('/blogs/:slug', getBlogBySlugController);

module.exports = router;
