const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    console.log("Dashboard Session Data:", req.session);
    if (!req.session.user) return res.status(401).json({ message: "Unauthorized" });

    res.send(`Welcome, ${req.session.user.fullname}!`);
});

module.exports = router;
