const bcrypt = require('bcrypt');
const hashKey = process.env.HASH_KEY;
const saltRounds = process.env.SALT_ROUNDS;

if (!hashKey || hashKey === undefined || !saltRounds || saltRounds === undefined) {
    throw new Error('Missing required environment variables for hashing password or salting!');
};

async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(parseInt(saltRounds));

        const stringToBeHashed = password + hashKey;
        const hashedPassword = await bcrypt.hash(stringToBeHashed, salt);

        return hashedPassword;
    } catch (error) {
        throw { statusCode: 500, message: 'An error occurred while hashing the password.' };
    }
}

module.exports = hashPassword;
