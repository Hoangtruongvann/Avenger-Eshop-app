const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../components/user-app/authen/services/users')
const flash = require('express-flash');

function initialize(passport) {
    const authenticateUser = async (req, email, password, done) => {
        
        const user = await User.findUserByEmail(email);
        if (user == null) {
            return done(null, false, { message: 'No user with that email' });
        }

        if(req.body.remember == 'true'){
            req.session.cookie.maxAge = 1000*60*60*24;
        }
        

        try {   
            if (await bcrypt.compare(password, user.password)) {
            // if (password == user.password) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (e) {
            return done(e);
        }
    };

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
      },authenticateUser));
    passport.serializeUser((user, done) => done(null, user.user_id));
    passport.deserializeUser(async (_id, done) => {
        let us = await User.findUserById(_id);
        return done(null, us);
    });
}

module.exports = initialize;
