const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const hashPassword = require('../utils/hashPassword');
const jwtHelper = require('../utils/jwtHelper');

// POST /api/user/login
router.post('/login', async (req, res) => {
    /* 
        Login a user
    */
    const { username, password } = req.body;

    // TODO: Validate username,password

    const tokenPayload = {
        'subject': username,
        'audience': 'user'
    };

    const token = jwtHelper.generateToken(tokenPayload);

    // Send the token in the Authorization header
    res.set('Authorization', `Bearer ${token}`);

    res.status(200).json({});
});

// POST /api/user/register?type=guest/user
router.post('/register', async (req, res) => {
    /* 
        Register a new user or create a guest
    */
    const type = req.query.type;

    if (!type) {
        res.status(400).json({ error: 'Invalid query. No "type" query provided.' });
        return;
    }

    if (type !== 'guest' && type !== 'user') {
        res.status(400).json({ error: 'Invalid user type. Must be "guest" or "user".' });
        return;
    }

    const { ...credentials } = req.body;
    const user = new User();

    if (type === 'guest') {
        const { username } = credentials;

        user.$set({ type, username });

        const tokenPayload = {
            'subject': username,
            'audience': 'guest'
        };

        const token = jwtHelper.generateToken(tokenPayload);

        // Send the token in the Authorization header
        res.set('Authorization', `Bearer ${token}`);

        res.status(200).json({ message: 'Guest registration successful.' });
        return;
    }

    if (!credentials || typeof credentials !== 'object' || Object.keys(credentials).length === 0) {
        res.status(400).json({ error: 'Invalid credentials provided.' });
        return;
    }

    const { username, password } = credentials;
    const hashedPassword = hashPassword(password);

    user.$set({ type, username, password: hashedPassword });

    res.status(200).json({ message: 'User registration successful.' });
    return;
})

module.exports = router;