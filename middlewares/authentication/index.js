const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const bearerToken = req.header('Authorization');

    if (!bearerToken) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    const token = bearerToken.split(' ')[1];

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decodedData.user;
        next()
    } catch (e) {
        return res.status(401).json({ error: 'Token is invalid' });
    }
}