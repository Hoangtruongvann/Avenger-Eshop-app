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