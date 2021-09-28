const express = require('express');
const router = express.Router();

const validation = require('../../middlewares/validation');
const post = require('../../middlewares/validation/Post');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route    Post api/posts
// @desc     Create a post
// @access   Private
router.get('/', [validation(post.createPostSchema)], async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        const {name, avatar} = user;

        const newPost = {
            ...req.body,
            name,
            avatar,
            user: id
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'})
    }
})

module.exports = router;