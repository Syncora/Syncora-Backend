const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Guest = require('../models/guest');
const hashPassword = require('../utils/hashPassword');
const jwtHelper = require('../utils/jwtHelper');
const { v4: uuidv4 } = require('uuid');

// POST /api/user/login
router.post('/login', async (req, res) => {
    /* 
        Login a user
    */

    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(404).json({ error: 'User not found. ' });
        }

        const passwordMatch = await user.verifyPassword(password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect password.' });
        }

        const token = jwtHelper.generateToken(user);
        // Set the token as a cookie
        res.cookie('auth_token', `Bearer ${token}`, { httpOnly: true, maxAge: 3600000, secure: true });

        res.status(200).json({ message: 'Login successful.' });
    } catch (error) {
        return res.status(error.statusCode).json({ error: error.message });
    }
});

// POST /api/user/register?type=guest/user
router.post('/register', async (req, res) => {
    /* 
        Register a new user or create a guest
    */
    const type = req.query.type;

    if (!type) {
        return res.status(400).json({ error: 'Invalid query. No "type" query provided.' });
    }

    if (type !== 'guest' && type !== 'user') {
        return res.status(400).json({ error: 'Invalid user type. Must be "guest" or "user".' });
    }

    const { ...credentials } = req.body;

    try {
        if (type === 'guest') {
            const { username } = credentials;
            const guest = new Guest({ uuid: uuidv4(), type: 'guest', username });

            await guest.register();

            const token = jwtHelper.generateToken(guest);

            // Set the token as a cookie
            res.cookie('auth_token', `Bearer ${token}`, { httpOnly: true, maxAge: 3600000, secure: true });

            return res.status(200).json({ message: 'Guest registration successful.' });
        }

        if (!credentials || typeof credentials !== 'object' || Object.keys(credentials).length === 0) {
            return res.status(400).json({ error: 'Invalid credentials provided.' });
        }

        const { username, password } = credentials;
        await User.validateUsernameInput(username);
        await User.validatePasswordInput(password);

        const hashedPassword = await hashPassword(password);
        const user = new User({ uuid: uuidv4(), type: 'user', username, password: hashedPassword });

        await user.register();

        return res.status(200).json({ message: 'User registration successful.' });

    } catch (error) {
        return res.status(error.statusCode).json({ error: error.message });
    }
});


module.exports = router;