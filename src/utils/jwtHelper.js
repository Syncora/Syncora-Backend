const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;

if (!secretKey || secretKey === undefined) {
    throw new Error('JWT secret key not found!');
};

function generateToken(data) {

    const tokenOptions = {
        expiresIn: '1h'
    };

    const tokenPayload = {
        sub: data.uuid,
        name: data.username,
        aud: data.type,
        iss: 'Syncora',
        iat: Date.now(),
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
