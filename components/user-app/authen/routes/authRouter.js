const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController')
const passport = require('passport')
const flash = require('express-flash');
const authenAccount = require('../../../../middleware/authen')

router.post('/signup', authenAccount.isNotloggedIn, authController.signup)

router.post('/login', authenAccount.isNotloggedIn, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}), )
router.delete('/logout', authenAccount.isLoggedIn, authController.logout)

router.get('/login', authenAccount.isNotloggedIn, authController.login);
router.get('/signup', authenAccount.isNotloggedIn, authController.signupGet);
router.get('/profile', authenAccount.isLoggedIn, authController.profile);

module.exports = router;