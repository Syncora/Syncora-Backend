const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const hashPassword = require('../utils/hashPassword');

// POST /api/user?type=guest/user
router.post('/', async (req, res) => {
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

        res.status(200).send();
        return;
    }

    if (!credentials || typeof credentials !== 'object' || Object.keys(credentials).length === 0) {
        res.status(400).json({ error: 'Invalid credentials provided.' });
        return;
    }

    const { username, password } = credentials;
    const hashedPassword = hashPassword(password);

    user.$set({ type, username, password: hashedPassword });

    res.status(200).send();
})

module.exports = router;