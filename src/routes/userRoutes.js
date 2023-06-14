const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const hashPassword = require('../utils/hashPassword');

// POST /api/user
router.post('/', async (req, res) => {
    /* 
        Register a new user or create a guest

        TODO:
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

        res.status(200).send();
        return;
    }

    if (!Credentials || typeof Credentials !== 'object' || Object.keys(Credentials).length === 0) {
        res.status(400).json({ error: 'Invalid credentials provided.' });
        return;
    }

    const { username, password } = Credentials;
    const hashedPassword = hashPassword(password);

    user.$set({ type, username, password: hashedPassword });

    res.status(200).send();
})

module.exports = router;