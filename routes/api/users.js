const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

const validation = require('../../middlewares/validation');
const user = require('../../middlewares/validation/User')

const User = require('../../models/User');

// @route    Post api/users
// @desc     Register user
// @access   Public
router.post('/', [validation(user.registSchema)], async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({ error: 'User already existed' })
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        })

        user = new User({
            name,
            email,
            password,
            avatar
        })

        await user.save();

        const token = await user.generateToken();

        res.send({token})

    } catch (e) {
        console.log(e.message);
        res.status(500).send({error: 'Server Error'})
    }
})

module.exports = router;