const express = require('express');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/me', authMiddleware, (req, res) => {
    res.json({ userId: req.userId });
});

module.exports = router;
