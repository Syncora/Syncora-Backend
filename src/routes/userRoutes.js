const express = require('express');
const router = express.Router();
const hashPassword = require('../utils/hashPassword');
const jwtHelper = require('../utils/jwtHelper');
const { v4: uuidv4 } = require('uuid');

const User = require('../models/user');
const Guest = require('../models/guest');

// POST /api/user/login
router.post('/login', async (req, res) => {
    /* 
        Login a user
    */

    const { username, password } = req.body;

    const user = await User.findByUsername(username);
    if (!user) {
        return res.status(404).json({ error: 'User not found.' });
    }

    const passwordMatch = await user.verifyPassword(password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Incorrect password.' });
    }

    const token = jwtHelper.generateToken(user);

    // Set the token as a cookie
    res.cookie('auth_token', `Bearer ${token}`, { httpOnly: true, maxAge: 3600000, secure: true });

    res.status(200).json({ message: 'Login successful.' });
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


    if (type === 'guest') {
        const { username } = credentials;
        const guest = new Guest({ id: uuidv4(), type: 'guest', username });

        const registered = await guest.register();
        if (!registered) {
            return res.status(500).json({ error: `Failed to register guest (${guest.id}).` });
        }

        const token = jwtHelper.generateToken(guest);

        // Set the token as a cookie
        res.cookie('auth_token', `Bearer ${token}`, { httpOnly: true, maxAge: 3600000, secure: true });

        return res.status(200).json({ message: `Guest registration successful (${guest.id}).` });
    }

    if (!credentials || typeof credentials !== 'object' || Object.keys(credentials).length === 0) {
        return res.status(400).json({ error: 'Invalid credentials provided.' });
    }

    const { username, password } = credentials;

    const validUsernameInput = await User.validateUsernameInput(username);
    if (!validUsernameInput) {
        return res.status(400).json({ error: `Invalid username input.` });
    }

    const validPasswordInput = await User.validatePasswordInput(password);
    if (!validPasswordInput) {
        return res.status(400).json({ error: `Invalid password input.` });
    }

    const hashedPassword = await hashPassword(password);
    if (!hashedPassword) {
        return res.status(400).json({ error: 'Failed to hash password.' });
    }

    const user = new User({ uuid: uuidv4(), type: 'user', username, password: hashedPassword });

    const registered = await user.register();
    if (!registered) {
        return res.status(500).json({ error: `Failed to register user (${user.id}).` });
    }

    return res.status(200).json({ message: `User registration successful (${user.id}).` });
});


module.exports = router;