const express = require('express');
const passport = require('passport');
const router = express.Router();

// Handle login
router.get('/', function (req, res) {
    res.render('login');
});

router.post('/', passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/counter');
    });

module.exports = router;

