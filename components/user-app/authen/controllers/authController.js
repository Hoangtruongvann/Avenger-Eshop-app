const async = require('hbs/lib/async')
const bcrypt = require('bcrypt')
const userM = require('../services/users')

exports.login = async(req, res, next) => {
    res.render('../components/user-app/authen/views/login', { layout: 'userLayout' })
}

exports.profile = async (req, res, next) => {
    const infoUser = await userM.findUserById(req.user.user_id);
    console.log(infoUser.avatar);
    res.render('../components/user-app/authen/views/profile', { layout: 'userLayout', infoUser:infoUser })
}

exports.signup = async(req, res, next) => {
    const us = await userM.findUserByEmail(req.body.email);
    if (us){
        let toast ={};
        toast.content = 'Email already exists';
        
        return res.render('../components/user-app/authen/views/signup', {layout:'userLayout', toast:toast})
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    req.body.avatar = 'https://codenepal.dev/assets/images/default-avatar-rectangle.jpg?v=e4b91e3e3a&fbclid=IwAR1w3q_L6nClGtk9_2a1utLcENO2isRonCpq1zC7NiA5kMUUfOqwjtIy0-g'
    const response = await userM.addUser(req.body);
    res.redirect('/login')
}
exports.signupGet = function(req, res, next) {

    res.render('../components/user-app/authen/views/signup', { layout: 'userLayout' })
}

exports.logout = function(req, res, next) {
    req.logout();
    res.redirect('/login');
}