const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_KEY;

const config = require('../config/tokenConfig.json')
const User = require('../models/userModel');

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
        iss: config.issuer,
        iat: Date.now(),
    };

    return jwt.sign(tokenPayload, secretKey, tokenOptions);
};

async function verifyToken(token) {
    try {
        const decodedToken = jwt.verify(token, secretKey);
        const sub = decodedToken.sub;
        const username = decodedToken.name;

        // Verify sub (UUID)
        await User.findByUUID(sub);

        // Verify name (username)
        await User.findByUsername(username);

        return decodedToken;
    } catch (error) {
        throw { statusCode: 401, message: "Invalid token." };
    }
}



module.exports = {
    generateToken,
    verifyToken
};
