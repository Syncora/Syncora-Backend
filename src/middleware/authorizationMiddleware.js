const config = require('../config/tokenConfig.json');
const jwtHelper = require('../utils/jwtHelper');
async function authorizationMiddleware(req, res, next) {
    const bearerRealm = `Bearer realm=${config.issuer}`;
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
        req.user = decodedToken;
        next();
    } catch (error) {
        res.set('WWW-Authenticate', bearerRealm);
        return res.status(error.statusCode).json({ error: error.message });
    }

};