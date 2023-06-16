const crypto = require('crypto');
const hashKey = process.env.HASH_KEY;

if (!hashKey || hashKey === undefined) {
    throw new Error('Hash key not found!');
};

function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.createHash('sha256');

    const stringToBeHashed = password + hashKey + salt;
    const hashedPassword = hash.update(stringToBeHashed).digest('hex');

    return `${hashedPassword}%${salt}`;
}

module.exports = hashPassword;
