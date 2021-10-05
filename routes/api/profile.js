const express = require('express');
const router = express.Router();
const axios = require('axios');

const validation = require('../../middlewares/validation');
const profile = require('../../middlewares/validation/Profile');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    Get api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', async (req, res) => {
    try {
        const profile = await Profile
            .findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(204).send();
        }

        res.json(profile);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'})
    }
})

// @route    Post api/profile
// @desc     Create or update user profile
// @access   Private
router.post('/', [validation(profile.createOrUpdateSchema)], async (req, res) => {
    const profileFields = req.body;
    profileFields.user = req.user.id;
    try {
        let profile = await Profile.findOne({ user: req.user.id })

        if (profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )
            return res.json(profile)
        }

        profile = new Profile(profileFields);

        await profile.save();
        res.status(201).json(profile);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'})
    }
})

// @route    Get api/profile
// @desc     Get all profiles
// @access   Private
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile
            .find()
            .populate('user', ['name', 'avatar'])

        res.json(profiles);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'})
    }
})

// @route    Get api/profile/user/:user_id
// @desc     Get all profiles by user Id
// @access   Private
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile
            .findOne({ user: req.params.user_id })
            .populate('user', ['name', 'avatar'])

        if (!profile) {
            return res.status(204).send();
        }

        res.json(profile);
    } catch (e) {
        console.log(e.message);
        if (e.kind == 'ObjectId') {
            return res.status(204).send();
        }
        res.status(500).send({error: 'Server Error'})
    }
})

// @route    Delete api/profile
// @desc     Delete profile, user & posts
// @access   Private
router.delete('/', async (req, res) => {
    try {
        await Post.deleteMany({ user: req.user.id });

        await Profile.findOneAndRemove({ user: req.user.id });

        await User.findOneAndRemove({ _id: req.user.id });

        res.send();
    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'});
    }
})

// @route    Put api/profile/experience
// @desc     Add profile experience
// @access   Private
router.put('/experience', [validation(profile.experienceSchema)], async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(req.body);

        await profile.save();

        res.json(profile);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'})
    }
})

// @route    Delete api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
router.delete('/experience/:exp_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience = profile.experience.filter(item => item.id !== req.params.exp_id);

        await profile.save();

        res.json(profile);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'})
    }
})

// @route    Put api/profile/education
// @desc     Add profile education
// @access   Private
router.put('/education', [validation(profile.educationSchema)], async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(req.body);

        await profile.save();

        res.json(profile);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'})
    }
})

// @route    Delete api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
router.delete('/education/:edu_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education = profile.education.filter(item => item.id !== req.params.edu_id);

        await profile.save();

        res.json(profile);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'})
    }
})

// @route    Get api/profile/github/:username
// @desc     Get user repos from github
// @access   Private
router.get('/github/:username', async (req, res) => {
    try {
        const options = {
            method: 'GET',
            url: `https://api.github.com/users/${req.params.username}/repos?per_page=5&
            sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_SECRET}`,
            headers: { 'user-agent': 'node.js' }
        };

        const response = await axios(options);

        res.json(response.data);
    } catch (e) {
        console.log(Object.keys(e.response));
        console.log(e.message);
        if (e.response.status === 404) {
            return res.status(404).send({error: 'Github profile not found'});
        }
        res.status(500).send({error: 'Cannot connect to github'});
    }
})

module.exports = router;