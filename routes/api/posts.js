const express = require('express');
const router = express.Router();

const validation = require('../../middlewares/validation');
const post = require('../../middlewares/validation/Post');

// @route    Post api/posts
// @desc     Create a post
// @access   Private
router.get('/', [validation(post.createPostSchema)], (req, res) => {
    res.send('Post router')
})

module.exports = router;