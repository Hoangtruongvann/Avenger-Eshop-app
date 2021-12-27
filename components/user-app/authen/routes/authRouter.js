const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const passport = require('passport')
const flash = require('express-flash');

router.post('/signup', authController.signup)

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}),)

router.get('/login',authController.login);

router.get('/profile', authController.profile);

module.exports = router;