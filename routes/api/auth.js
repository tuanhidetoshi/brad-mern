const express = require('express');
const router = express.Router();
const authentication = require('../../middlewares/authentication');
const validation = require('../../middlewares/validation');
const user = require('../../middlewares/validation/User');

const User = require('../../models/User');

// @route    Get api/auth
// @desc     Test route
// @access   Public
router.get('/', authentication, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (e) {
        console.log(e.message)
        res.status(500).send({error: 'Server Error'})
    }
})

// @route    Post api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post('/', [validation(user.loginSchema)], async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        
        if (!user) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const isMatchPassword = await user.comparePassword(password);

        if (!isMatchPassword) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        const token = await user.generateToken();

        res.send({token})

    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'})
    }
})

module.exports = router;