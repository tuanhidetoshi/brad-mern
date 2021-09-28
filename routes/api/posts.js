const express = require('express');
const router = express.Router();

const validation = require('../../middlewares/validation');
const post = require('../../middlewares/validation/Post');

const Post = require('../../models/Post');
const User = require('../../models/User');

// @route    Post api/posts
// @desc     Create a post
// @access   Private
router.post('/', [validation(post.createPostSchema)], async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        const {name, avatar} = user;

        const newPost = new Post({
            ...req.body,
            name,
            avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        res.json(post);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'})
    }
})

// @route    Get api/posts
// @desc     Get all posts
// @access   Private
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'})
    }
})

// @route    Get api/posts/:id
// @desc     Get post by Id
// @access   Private
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(204).send();
        }
        res.json(post);
    } catch (e) {
        console.log(e.message);
        if (e.kind == 'ObjectId') {
            return res.status(204).send();
        }
        res.status(500).send({error: 'Server Error'})
    }
})

// @route    Delete api/posts/:id
// @desc     Delete a post by id
// @access   Private
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ error: 'User not authorized' })
        }

        await post.remove();

        res.json();
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ error: 'Server Error' })
    }
})

// @route    Put api/posts/like/:id
// @desc     Like a post
// @access   Private
router.put('/like/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(400).send({ error: 'Post not found' });
        }

        if (post.likes.find(like => (like.user.toString() === req.user.id))) {
            return res.status(400).json({ error: 'Post already liked' })
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();

        res.json(post.likes)
    } catch (e) {
        console.log(e.message)
        if (e.kind == 'ObjectId') {
            return res.status(400).send({ error: 'Post not found' });
        }
        res.status(500).send({ error: 'Server Error' })
    }
})

// @route    Put api/posts/unlike/:id
// @desc     Unlike a post
// @access   Private
router.put('/unlike/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(400).send({ error: 'Post not found' });
        }

        // Check if did not liked
        if (!post.likes.find(like => like.user.toString() === req.user.id)) {
            return res.status(400).json({ error: 'Post was not liked' })
        }

        post.likes = post.likes.filter(like => (like.user.toString() !== req.user.id));

        await post.save();

        res.json(post.likes)
    } catch (e) {
        console.log(e.message)
        if (e.kind == 'ObjectId') {
            return res.status(400).send({ error: 'Post not found' });
        }
        res.status(500).send({ error: 'Server Error' })
    }
})

// @route    Post api/posts/comment/:id
// @desc     Create a comment
// @access   Private
router.post('/comment/:id', [validation(post.commentSchema)], async (req, res) => {
    try {
        const {name, avatar} = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            ...req.body,
            name,
            avatar,
            user: req.user.id
        }

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);
    } catch (e) {
        console.log(e.message)
        if (e.kind == 'ObjectId') {
            return res.status(400).send({ error: 'Post not found' });
        }
        res.status(500).send({ error: 'Server Error' })
    }
})

// @route    Delete api/posts/comment/:id
// @desc     Delete a comment
// @access   Private
router.delete('/comment/:id/:comment_id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        const comment = post.comments.find(comment => comment.id === req.params.comment_id)

        if (!comment) {
            return res.status(400).send({ error: 'Comment do not exist on post' });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(400).send({ error: 'User not authorized' });
        }

        post.comments = post.comments.filter(comment => comment.id !== req.params.comment_id);

        await post.save();

        res.json(post.comments);
    } catch (e) {
        console.log(e.message)
        if (e.kind == 'ObjectId') {
            return res.status(400).send({ error: 'Comment or post not found' });
        }
        res.status(500).send({ error: 'Server Error' })
    }
})

module.exports = router;