const express = require('express');
const router = express.Router();

// Handle Logout
router.get('/', function (req, res) {
    req.logout();
    res.redirect('/login');
});

module.exports = router;