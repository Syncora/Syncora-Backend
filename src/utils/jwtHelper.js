const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;

if (!secretKey || secretKey === undefined) {
    throw new Error('JWT secret key not found!');
};

function generateToken(payload, options) {
    const tokenOptions = {
        expiresIn: '1h',
        ...options
    };

    const tokenPayload = {
        sub: payload.subject,
        aud: payload.audience,
        iss: 'Syncora',
        ...payload
    };

    return jwt.sign(tokenPayload, secretKey, tokenOptions);
};

function verifyToken(token) {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken
};
