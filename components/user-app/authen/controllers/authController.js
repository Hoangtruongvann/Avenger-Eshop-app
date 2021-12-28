const async = require('hbs/lib/async')
const userM = require('../services/users')

exports.login = async(req, res, next) => {
    res.render('../components/user-app/authen/views/login', { layout: 'userLayout' })
}

exports.profile = (req, res, next) => {
    res.render('../components/user-app/authen/views/profile')
}

exports.signup = async(req, res, next) => {
    const response = await userM.addUser(req.body);
    res.redirect('/login')
}
exports.signupGet = function(req, res, next) {

    res.render('../components/user-app/authen/views/signup', { layout: 'userLayout' })
}