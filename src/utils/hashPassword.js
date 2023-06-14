const crypto = require('crypto');
const privateKey = process.env.PRIVATE_KEY;

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256');
    const stringToBeHashed = password + privateKey + salt;

    hash.update(stringToBeHashed);

    const hashedPassword = hash.digest('hex');

    return `${hashedPassword}%${salt}`;
}

module.exports = hashPassword;