const express = require('express');
const { uploadImageController } = require('../controllers/uploadController');
const { requireAdmin } = require('../middlewares/authentication');

const router = express.Router();

// Admin-only image upload
router.post('/upload', requireAdmin, uploadImageController);

module.exports = router;
