const express = require('express');
const router = express.Router();

// POST /api/trivia
router.get('/', async (req, res) => {
    res.status(200).send();
})

module.exports = router;