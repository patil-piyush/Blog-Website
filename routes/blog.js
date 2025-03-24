const express = require('express');
const User = require('../models/blog');

const router = express.Router();

router.get('/create-blog', (req, res) => {
    res.render('create-blog');
});

router.get('/edit-blog', (req, res) => {
    res.render('edit-blog');
});

router.get('/delete-blog', (req, res) => {
    res.render('delete-blog');
});


module.exports = router;