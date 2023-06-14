const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

// POST /api/user
router.post('/', async (req, res) => {
    /* 
        Register a new user or create a guest

        TODO:
            - Hash password for user
            - Generate temp password for guest
    */
    const { type, ...Credentials } = req.body;

    if (typeof type != 'string') {
        res.status(400).json({ error: 'Invalid user type.' });
        return;
    }

    if (type !== 'guest' && type !== 'user') {
        res.status(400).json({ error: 'Invalid user type. Must be "guest" or "user".' });
        return;
    }

    const user = new User();

    if (type === 'guest') {
        const { username } = Credentials;
        user.$set({ type, username });

        // Generate temp password for guest account?
        res.status(200).send(user);
        return;
    }

    if (!Credentials || typeof Credentials !== 'object' || Object.keys(Credentials).length === 0) {
        res.status(400).json({ error: 'Invalid credentials provided.' });
        return;
    }

    const { username, password } = Credentials;

    user.$set({ type, username, password });

    res.status(200).send(user);
})

module.exports = router;