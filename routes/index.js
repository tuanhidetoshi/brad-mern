const express = require('express');
const router = express.Router();
const authentication = require('../middlewares/authentication');

router.use('/auth', require('./api/auth'));
router.use('/users', require('./api/users'));
router.use('/profile', authentication, require('./api/profile'));
router.use('/posts', authentication, require('./api/posts'));

module.exports = router;