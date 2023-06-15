const crypto = require('crypto');
const hashKey = process.env.HASH_KEY;

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256');

    const stringToBeHashed = password + hashKey + salt;
    const hashedPassword = hash.update(stringToBeHashed).digest('hex');

    return `${hashedPassword}%${salt}`;
}

module.exports = hashPassword;
