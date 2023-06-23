const tokenConfig = require('../config/tokenConfig.json');
const jwtHelper = require('../utils/jwtHelper');
const User = require('../models/userModel');

async function authorizationMiddleware(req, res, next) {
    const bearerRealm = `Bearer realm=${tokenConfig.issuer}`;
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        res.set('WWW-Authenticate', bearerRealm);
        return res.status(401).json({ error: 'Authorization header required.' });
    };

    const [scheme, token] = authorizationHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
        res.set('WWW-Authenticate', bearerRealm);
        return res.status(401).json({ error: 'Invalid authentication scheme or token format.' });
    };

    try {
        const decodedToken = await jwtHelper.verifyToken(token);

        // Check if user uuid exist
        const userUUIDExist = await User.findByUUID(decodedToken.sub);
        if (!userUUIDExist) {
            return res.status(404).json({ error: 'User not found.' });
        }

        // Check if user name exist
        const userNameExist = await User.findByUsername(decodedToken.name);
        if (!userNameExist) {
            return res.status(404).json({ error: 'User not found. ' });
        }

        req.user = decodedToken;

        next();
    } catch (error) {
        res.set('WWW-Authenticate', bearerRealm);
        return res.status(error.statusCode).json({ error: error.message });
    }
};

module.exports = authorizationMiddleware;
